BUI.use(['bui/extensions/treepicker', 'bui/tree', 'bui/select', 'bui/form', 'bui/data', 'bui/grid'],
    function (TreePicker, Tree, Select, Form, Data, Grid) {

        var contextPath = "../";

        var url_query = contextPath + 'sysCode/queryByCond.json';
        var url_delete = contextPath + 'sysCode/delete.json';
        var url_update = contextPath + 'sysCode/update.json';
        var url_insert = contextPath + 'sysCode/insert.json';
        var queryForm = new Form.HForm({
            srcNode: '#queryForm',
            autoRender: true
        });

        var columns = [{
            title: "编码",
            dataIndex: "code",
            width: '100px'
        }, {
            title: "值",
            dataIndex: "value",
            width: '200px'
        }, {
            title: "类型",
            dataIndex: "type",
            width: '100px'
        }, {
            title: "描述",
            dataIndex: "description",
            width: '200px'
        }, {
            title: "备注",
            dataIndex: "remark",
            width: '100%'
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

        var form = new Form.HForm({
            srcNode: '#form'
        });
        form.render();

        grid.on('itemclick', function (ev) {
            form.enable();
            var item = ev.item;
            form.setRecord(item);
            form.disable();
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

        form.disable();
        disableBtnEdit();
        var operation = '';

        $('#add').on('click', function () {

            operation = 'add';
            form.enable();
            enableBtnEdit();

            form.clearFields();
            form.valid();
        });

        $('#edit').on('click', function () {
            var item = grid.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择用户', 'error');
                return;
            }

            operation = 'edit';
            enableBtnEdit();
            form.enable();
        });

        $('#delete').on('click', function () {
            var item = grid.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择要删除的用户', 'error');
                return;
            }

            BUI.Message.Confirm("确定要删除当前用户吗？", function () {

                $.ajax({
                    url: url_delete,
                    type: 'post',
                    data: {id: item.id},
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('删除成功', 'success');
                            store.load(queryForm.toObject());
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                        }
                    }
                })

            }, 'question');

        });

        $('#btnReset').on('click', function () {

            if (operation === 'edit') {
                var item = grid.getSelected();
                form.setRecord({
                    userName: item.userName,
                    loginName: item.loginName,
                    userId: item.userId,
                });

            } else if (operation === 'add') {
                form.clearFields();
            }
        });

        $('#btnSave').on('click', function () {
            if (!form.isValid()) {
                return;
            }

            var data = form.toObject();

            disableBtnEdit();

            if (operation === 'add') {
                $.ajax({
                    url: url_insert,
                    type: 'post',
                    data: data,
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('添加成功', 'success');
                            store.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                            enableBtnEdit();
                            form.enable();
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