BUI.use(['bui/extensions/treepicker', 'bui/tree', 'bui/select', 'bui/form', 'bui/data', 'bui/grid'],
    function (TreePicker, Tree, Select, Form, Data, Grid) {

        var contextPath = "../commDataPrivilege/";

        var url_query = contextPath + 'queryCommDataPrivilege.json';
        var url_delete = contextPath + 'deleteCommDataPrivilege.json';
        var url_update = contextPath + 'updateCommDataPrivilege.json';
        var url_create = contextPath + 'createCommDataPrivilege.json';
        var url_queryOrgInfo = '../orgInfo/queryOrgInfoTree.json';
        var queryForm = new Form.HForm({
            srcNode: '#queryForm',
            autoRender: true
        });

        var columns = [{
            title: "id",
            dataIndex: "id",
            width: '50'
        }, {
            title: "工号",
            dataIndex: "staffId",
            width: '100'
        }, {
            title: "姓名",
            dataIndex: "staffName",
            width: '100'
        }, {
            title: "机构名称",
            dataIndex: "orgName",
            width: '100'
        }, {
            title: "属性ID",
            dataIndex: "attributeId",
            width: '100'
        }, {
            title: "创建时间",
            dataIndex: "createTime",
            width: '100'
        }, {
            title: "备注",
            dataIndex: "attributeRemark"
        }];

        var dataPrivilegeStore = new Data.Store({
            proxy: {
                method: "POST",
                dataType: "json"
            },
            url: url_query,
            pageSize: 30,
            params: queryForm.toObject(),
            autoLoad: false
        });
        var dataPrivilegeGrid = new Grid.Grid({
            render: '#dataPrivilegeGrid',
            columns: columns,
            width: '100%',
            loadMask: true,
            store: dataPrivilegeStore,
            emptyDataTpl: '<div class="centered"><img alt="Crying" src="../../custom/img/crying.png"><h2>数据不存在，请检查查询条件</h2></div>',
            bbar: {
                pagingBar: true
            },
            plugins: [Grid.Plugins.RadioSelection],
            autoRender: true
        });
        var dataPrivilegeForm = new Form.HForm({
            srcNode: '#dataPrivilegeForm'
        });

        dataPrivilegeForm.render();

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
        var orgPicker = new TreePicker({
            trigger: '#orgName',
            valueField: '#orgNo', //如果需要列表返回的value，放在隐藏域，那么指定隐藏域
            width: 250,  //指定宽度
            children: [orgTree] //配置picker内的列表
        });

        orgPicker.render();

        dataPrivilegeGrid.on('itemclick', function (ev) {
            dataPrivilegeForm.enable();
            var item = ev.item;
            dataPrivilegeForm.setRecord(item);
            dataPrivilegeForm.disable();
        });

        $('#btnSearch').on('click', function () {
            dataPrivilegeStore.load(queryForm.toObject());
        });
        function enableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', false);
        }

        function disableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', true);
        }

        dataPrivilegeForm.disable();
        disableBtnEdit();
        var operation = '';

        $('#add').on('click', function () {

            operation = 'add';
            dataPrivilegeForm.enable();
            enableBtnEdit();

            dataPrivilegeForm.clearFields();
            dataPrivilegeForm.valid();
        });

        $('#edit').on('click', function () {
            var item = dataPrivilegeGrid.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择一条记录', 'error');
                return;
            }

            operation = 'edit';
            enableBtnEdit();
            dataPrivilegeForm.enable();
        });

        $('#delete').on('click', function () {
            var item = dataPrivilegeGrid.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择要删除的记录', 'error');
                return;
            }

            BUI.Message.Confirm("确定要删除当前记录吗？", function () {

                $.ajax({
                    url: url_delete,
                    type: 'post',
                    data: {id: item.id},
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('删除成功', 'success');
                            dataPrivilegeStore.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                        }
                    }
                })

            }, 'question');

        });

        $('#btnReset').on('click', function () {
            if (operation === 'edit') {
                var item = dataPrivilegeGrid.getSelected();
                dataPrivilegeForm.setRecord(item);

            } else if (operation === 'add') {
                dataPrivilegeForm.clearFields();
            }
        });
        function initAttributeList() {
            var attributeIdSelect = $("#attributeId");
            $.ajax({
                url: "../sysCode/queryByType.json",
                type: "post",
                data: {"type": "数据权限"},
                success: function (data) {
                    $.each(data.value, function () {
                        attributeIdSelect.append("<option value='" + this.code + "'>" + this.value + "</option>")
                    });
                }
            });
        }

        initAttributeList();
        $('#btnSave').on('click', function () {
            if (!dataPrivilegeForm.isValid()) {
                return;
            }
            disableBtnEdit();

            var data = dataPrivilegeForm.toObject();

            var url;
            if (operation === 'add') {
                url = url_create;
            } else {
                url = url_update;
                var item = dataPrivilegeGrid.getSelected();
                data.id = item.id;
            }
            $.ajax({
                url: url,
                type: 'post',
                data: data,
                success: function (data) {
                    if (data.success) {
                        BUI.Message.Alert('操作成功', 'success');
                        dataPrivilegeStore.load(queryForm.toObject());
                    } else {
                        BUI.Message.Alert(data.msg, 'error');
                        enableBtnEdit();
                        dataPrivilegeForm.enable();
                    }
                }
            });
        });
    });