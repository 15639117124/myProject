

BUI.use(['bui/extensions/treepicker', 'bui/tree', 'bui/form', 'bui/grid', 'bui/data', 'bui/calendar', 'bui/tab', 'bui/overlay'],


    function (TreePicker, Tree, Form, Grid, Data, Calendar, Tab, Overlay) {


        var contextPath = "../";
        var url_findAll = contextPath + 'accrualParameterLeader/findAll.json';
        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';
        var url_update = contextPath + 'accrualParameterLeader/updateByPrimaryKeySelective.json';
        var url_delete = contextPath + 'accrualParameterLeader/deleteByPrimaryKey.json'


        $("#upload").bind("click", function () {
            BUI.Message.Confirm('同一Excel文件请不要重复上传，确定要进行文件上传操作吗？', function () {
                var dialog = new Overlay.Dialog({
                    title: '上传数据',
                    width: '45%',
                    closeAction: "remove",
                    loader: {
                        url: 'accrualParameterLeaderDetail.html',
                        autoLoad: false,
                        lazyLoad: false,
                        callback: function (text) {
                            //insurantDialog.close();
                        }
                    },
                    buttons: [],
                    success: function () {
                        dialog.close();
                    }
                    //,mask:false
                });
                dialog.show();
                dialog.get('loader').load();
            });
        });

        //update
        var accrualParameterForm = new Form.HForm({
            srcNode: "#accrualParameterForm"
        });
        accrualParameterForm.render();
        var accrualParameterDialog = new Overlay.Dialog({
            width: "78%",
            contentId: "content",
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {
                    accrualParameterForm.valid();
                    if (!accrualParameterForm.isValid()) {
                        return;
                    }

                    var obj = accrualParameterForm.serializeToObject();
                    if (editFlag) {
                        obj.id = grid.getSelected().id;
                    }

                    var url = url_update ;
                    //var url = url_create;

                    $.ajax({
                        type: "POST",
                        url: url,
                        data: obj,
                        success: function (result) {
                            if (result.success) {
                                //将后台的对象不刷新页面，重新装载表格
                                BUI.Message.Alert('操作成功！', 'success');
                                store.load();
                                //grid.render();
                                accrualParameterDialog.close();
                            } else {
                                BUI.Message.Alert(result.msg, 'error');
                                return;
                            }
                        }
                    });
                    this.close();
                }
            }, {
                text: '关闭',
                elCls: 'button',
                handler: function () {
                    this.close();
                }
            }]
        });

        $('#edit').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }

            accrualParameterForm.setRecord(record);

            editFlag = true;
            //productInfoDialog.set('title', '编辑产品信息');
            accrualParameterDialog.show();
            //hideOrShow(record);
        });


        $("#delete").on("click",function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }


            alert("确定要删除吗？");

            var id = grid.getSelected().id;
            $.ajax({
                type:'post',
                url:url_delete,
                data:{id:id},
                success:function (result) {
                    if(result.success){
                        BUI.Message.Alert("删除成功")
                        store.load();
                    }else {
                        BUI.Message.Alert("删除失败");
                    }
                }
            });
        })


        $("#exportChannelRate").on('click', function () {
            window.open("../doc/TbFeeAccrualParameterLeaderMapper.xls");
        });

        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var Store = Data.Store,
            Columns = [
                {title:'经营机构号',dataIndex:'orgNo',widht:200},
                {title: '经营机构',dataIndex:'orgName',width:200},
                {title: '负责人', dataIndex: 'leader', width: 200},
                {title:'月份',dataIndex:'yearMonth',width:100},
                {title: '科目',dataIndex:'subjects',width:200},
                {title: '金额', dataIndex: 'amount', width: 100},
                {title:'备注',dataIndex:'remark',width:500}
            ];


        var store = new Store(
            {
                url: url_findAll,
                pageSize: 30,
                params: form1.serializeToObject(),
                autoLoad: true,
                //root:'data'
            });
        //store.load();
        var grid = new Grid.Grid({
            render: '#InfoGrid',
            columns: Columns,
            width: '100%',
            loadMask: true,
            store: store,
            bbar: {
                pagingBar: true
            },
            //plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });
        grid.render();


        $("#btnSearch").on("click",function () {
            var obj = form1.serializeToObject();
            obj.start = 0; // 返回第一页
            store.load(obj);
            return false;
        })



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

    })


