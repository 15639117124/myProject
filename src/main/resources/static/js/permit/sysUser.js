BUI.use(['bui/extensions/treepicker', 'bui/tree', 'bui/select', 'bui/form', 'bui/data', 'bui/calendar', 'bui/grid', 'bui/overlay'],
    function (TreePicker, Tree, Select, Form, Data, Calendar, Grid, Overlay) {

        var contextPath = "../";

        var url_queryUsers = contextPath + 'permit/user/queryUsers.json';
        var url_deleteUser = contextPath + 'permit/user/deleteUser.json';
        var url_updateUser = contextPath + 'permit/user/updateUser.json';
        var url_createUser = contextPath + 'permit/user/createUser.json';
        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';
        var url_resetPWD = contextPath + '/permit/user/resetPWD.json';
        var url_leaving = contextPath + '/permit/user/leaving.json';
        var queryForm = new Form.HForm({
            srcNode: '#queryForm',//控件的根节点的DOM
            autoRender: true//是否自动渲染
        });

        var columns = [{
            title: "用户名",
            dataIndex: "userName",
            width: '100'
        }, {
            title: "登陆名",
            dataIndex: "loginName",
            width: '100'
        }, {
            title: "上次登陆时间",
            dataIndex: "lastLoginTime",
            width: '150'
        }, {
            title: "状态",
            dataIndex: "validFlag",
            renderer: function (value) {
                if (value == "1") {
                    return "在职";
                } else if (value == "0") {
                    return "离职";
                }
                return value;
            },
            width: '40'
        }];

        var userStore = new Data.Store({
            proxy: {
                method: "POST",
                dataType: "json"
            },
            url: url_queryUsers,
            pageSize: 30,//每页多少条记录
            params: queryForm.toObject(),//初始化时查询的参数
            autoLoad: false//创建对象时是否自动加载
        });
        var userGrid = new Grid.Grid({
            render: '#userGrid',//制定控件的容器
            columns: columns,
            width: '100%',
            loadMask: true,//加载数据时，是否显示等待加载的屏蔽层
            store: userStore,//绑定BUI.Date.Store
            //数据为空时，显示的提示内容
            emptyDataTpl: '<div class="centered"><img alt="Crying" src="../../custom/img/crying.png"><h2>数据不存在，请检查查询条件</h2></div>',
            bbar: {
                pagingBar: true
            },
            plugins: [Grid.Plugins.RadioSelection],//插件集合
            autoRender: true//是否自动渲染,,如果不自动渲染，需要用户调用 render()方法
        });

        var userForm = new Form.HForm({
            srcNode: '#userForm'//控件的根节点
        });
        userForm.render();//渲染
        var comebackForm = new Form.HForm({
            srcNode: '#comebackForm'
        });
        userForm.render();

        var comebackDialog = new Overlay.Dialog({
            width: "300",
            contentId: "comebackDialog",
            title: '终止',
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                    handler: function () {
                    var obj = comebackForm.serializeToObject();
                    var id = userGrid.getSelected().id;
                    obj.id = id;
                    $.ajax({
                        type: "POST",
                        url: "../permit/user/comeback.json",
                        data: obj,
                        success: function (result) {
                            if (result.success) {
                                BUI.Message.Alert("操作成功！", "success");
                                userStore.load();
                                comebackDialog.close();
                            } else {
                                BUI.Message.Alert(result.msg, "warning");
                            }
                        }
                    });
                }
            }, {
                text: '关闭',
                elCls: 'button',
                handler: function () {
                    this.close();
                }
            }]
        });

        // 加载组织机构树
        var orgStore = new Data.TreeStore({
            root: {
                value: '0',
                text: '0'
            },
            url: url_queryOrgInfo,
            autoLoad: true
        });
        var orgTree = new Tree.TreeList({
            store: orgStore,
            checkType: 'none',
            showLine: true
        });
        var combackOrgTree = new Tree.TreeList({
            store: orgStore,
            checkType: 'none',
            showLine: true
        });
        var orgPicker = new TreePicker({
            trigger: '#orgName',
            valueField: '#orgNo', //如果需要列表返回的value，放在隐藏域，那么指定隐藏域
            width: 250,  //指定宽度
            children: [orgTree] //配置picker内的列表
        });
        var comebackOrgPicker = new TreePicker({
            trigger: '#comebackOrgName',
            valueField: '#comebackOrgNo', //如果需要列表返回的value，放在隐藏域，那么指定隐藏域
            width: 250,  //指定宽度
            children: [combackOrgTree] //配置picker内的列表
        });

        orgPicker.render();
        comebackOrgPicker.render();

        userGrid.on('itemclick', function (ev) {
            userForm.enable();
            var item = ev.item;
            userForm.setRecord(item);
            userForm.disable();
        });

        $('#btnSearch').on('click', function () {
            userStore.load(queryForm.toObject());//根据条件查询
        });
        function enableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', false);
        }


        function disableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', true);
        }

        userForm.disable();
        disableBtnEdit();
        var operation = '';

        $('#add').on('click', function () {
            $("#div_password").show();
            operation = 'add';
            userForm.enable();
            enableBtnEdit();
            $('#loginNameStaffId').removeAttr("readonly");
            userForm.clearFields();
            userForm.valid();
        });
        $('#comeback').on('click', function () {
            var validFlag = userGrid.getSelected().validFlag;
            if (validFlag == '1') {
                BUI.Message.Alert("该同事未离职", "warning");
                return;
            }
            comebackDialog.show();
        });

        $('#edit').on('click', function () {
            $("#div_password").hide();
            var item = userGrid.getSelected();
            $('#loginNameStaffId').attr("readonly", true);
            if (item == null) {
                BUI.Message.Alert('请选择用户', 'error');
                return;
            }

            operation = 'edit';
            enableBtnEdit();
            userForm.enable();
        });

        $('#delete').on('click', function () {
            var item = userGrid.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择要删除的用户', 'error');
                return;
            }

            BUI.Message.Confirm("确定要删除当前用户吗？", function () {

                $.ajax({
                    url: url_deleteUser,
                    type: 'post',
                    data: {id: item.id},
                    success: function (data) {
                            if (data.success) {
                            BUI.Message.Alert('删除成功', 'success');
                            userStore.load(queryForm.toObject());
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                        }
                    }
                })

            }, 'question');

        });
        $("#resetPWD").on('click', function () {
            var record = userGrid.getSelected();
            if (!record) {
                BUI.Message.Alert("请先选择一个用户", "warning");
            }
            // BUI.Message.Confirm("确定要重置用户:" + record.userName + "的密码吗?", function () {
            BUI.Message.Confirm("请输入新密码:" + "<input id='newPassword' type='text' />", function () {
                
                if($("#newPassword").val()=="" || $("#newPassword").val()==null){
                    alert("密码不能为空");
                    return null;
                }
                $.ajax({
                    url: url_resetPWD,
                    type: "post",

                    data: {id: record.id,newPassword:$("#newPassword").val()},
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert("重置成功", "success");
                        } else {

                            BUI.Message.Alert("重置失败,请刷新后重试", "error");
                        }
                    }
                });
            }, "question")
        });
        $("#leaving").on('click', function () {
            var record = userGrid.getSelected();
            if (!record) {
                BUI.Message.Alert("请先选择一个用户", "warning");
            }
            BUI.Message.Confirm("用户:" + record.userName + "确定离职吗?", function () {
                $.ajax({
                    url: url_leaving,
                    type: "post",
                    data: {id: record.id},
                    success: function (data) {
                        if (data.success) {
                            userStore.load();
                            BUI.Message.Alert("修改成功", "success");
                        } else {
                            BUI.Message.Alert("修改失败,请刷新后重试", "error");
                        }
                    }
                });
            }, "question")
        });
        $('#btnReset').on('click', function () {

            if (operation === 'edit') {
                var item = userGrid.getSelected();
                userForm.setRecord({
                    userName: item.userName,
                    loginName: item.loginName,
                    userId: item.userId,
                });

            } else if (operation === 'add') {
                userForm.clearFields();
            }
        });

        $('#btnSave').on('click', function () {

            // if (!userForm.isValid()) {
            //     return;
            // }

            var data = userForm.toObject();


            disableBtnEdit();

            if (operation === 'add') {
                if (!userForm.isValid()) {
                    return;
                }
                $.ajax({
                    url: url_createUser,
                    type: 'post',
                    data: data,
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('添加成功', 'success');
                            userStore.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                            enableBtnEdit();
                            userForm.enable();
                        }
                    }
                });

            } else if (operation === 'edit') {

                var item = userGrid.getSelected();
                data.id = item.id;
                $online_id = $("#online_id").val();
                $.ajax({
                    url: url_updateUser,
                    type: 'post',
                    data: data,
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('修改成功', 'success');
                            userStore.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                            enableBtnEdit();
                        }

                    }
                })

            }
        });
    });