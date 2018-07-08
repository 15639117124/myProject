BUI.use(['bui/extensions/treepicker', 'bui/tree', 'bui/select', 'bui/form', 'bui/data', 'bui/calendar', 'bui/grid'],
    function (TreePicker, Tree, Select, Form, Data, Calendar, Grid) {
        var contextPath = "../customerAttribution/";
        var url_query = contextPath + 'query.json';
        var url_update = contextPath + 'update.json';
        var url_create = contextPath + 'create.json';

        var queryForm = new Form.HForm({
            srcNode: '#queryForm',
            autoRender: true
        });

        var columns = [{
            title: "客户姓名",
            dataIndex: "customerName",
            width: '100'
        }, {
            title: "证件类型",
            dataIndex: "idCardType",
            width: '100'
        }, {
            title: "证件号码",
            dataIndex: "idCardNo",
            width: '200'
        }, {
            title: "归属人ID",
            dataIndex: "userId",
            width: '100'
        }, {
            title: "归属人",
            dataIndex: "userName",
            width: '100'
        }, {
            title: "机构名称",
            dataIndex: "orgName",
            width: '100'
        }, {
            title: "起始日期",
            dataIndex: "beginDate",
            width: '120'
        }, {
            title: "截止日期",
            dataIndex: "endDate",
            width: '120'
        }];

        var store = new Data.Store({
            proxy: {
                method: "POST",
                dataType: "json"
            },
            url: url_query,
            pageSize: 30,
            params: queryForm.toObject(),
            autoLoad: false
        });
        var grid = new Grid.Grid({
            render: '#grid',
            columns: columns,
            width: '100%',
            loadMask: true,
            store: store,
            emptyDataTpl: '<div class="centered"><img alt="Crying" src="../../custom/img/crying.png"><h2>数据不存在，请检查查询条件</h2></div>',
            bbar: {
                pagingBar: true
            },
            plugins: [Grid.Plugins.RadioSelection],
            autoRender: true
        });

        var editForm = new Form.HForm({
            srcNode: '#editForm'
        });
        editForm.render();

        grid.on('itemclick', function (ev) {
            editForm.enable();
            var item = ev.item;
            editForm.setRecord(item);
            editForm.disable();
        });

        $('#btnSearch').on('click', function () {
            store.load(queryForm.toObject());
        });
        function enableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', false);
        }

        function disableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', true);
        }

        editForm.disable();
        disableBtnEdit();
        var operation = '';

        $('#add').on('click', function () {

            operation = 'add';
            editForm.enable();
            enableBtnEdit();
            dealWithReadonlyFields("editForm", false);
            editForm.clearFields();
            editForm.valid();
        });

        $('#edit').on('click', function () {
            var item = grid.getSelected();
            dealWithReadonlyFields("editForm", true);
            if (item == null) {
                BUI.Message.Alert('请选择用户', 'error');
                return;
            }

            operation = 'edit';
            enableBtnEdit();
            editForm.enable();
        });

        $('#btnReset').on('click', function () {

            if (operation === 'edit') {
                var item = grid.getSelected();
                editForm.setRecord({
                    userName: item.userName,
                    loginName: item.loginName,
                    userId: item.userId,
                });

            } else if (operation === 'add') {
                editForm.clearFields();
            }
        });
        $('#export').on('click', function () {
            queryForm.set("action", "../customerAttribution/export.json");
            queryForm.submit();
        });

        $('#btnSave').on('click', function () {
            if (!editForm.isValid()) {
                return;
            }

            var data = editForm.toObject();

            disableBtnEdit();

            if (operation === 'add') {
                $.ajax({
                    url: url_create,
                    type: 'post',
                    data: data,
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('添加成功', 'success');
                            store.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                            enableBtnEdit();
                            editForm.enable();
                        }
                    }
                });

            } else if (operation === 'edit') {
                var item = grid.getSelected();
                data.id = item.id;
                $.ajax({
                    url: url_update,
                    type: 'post',
                    data: data,
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('修改成功', 'success');
                            store.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                            enableBtnEdit();
                        }

                    }
                })

            }
        });
    });