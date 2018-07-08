BUI.use(['bui/form', 'bui/data', 'bui/grid'],
    function(Form, Data, Grid) {
        var contextPath = "../productUserPrivilege/";
        var url_query  = contextPath + 'query.json';
        var url_create = contextPath + 'create.json';
        var url_update = contextPath + 'update.json';
        var url_delete = contextPath + 'delete.json';

        var queryForm = new Form.HForm({
            srcNode: '#queryForm',
            autoRender: true
        });

        var columns = [
            {title: '产品代码', dataIndex: 'productId', width: 200},
            {title: '产品名称', dataIndex: 'productName', width: 200},
            {title: '用户姓名', dataIndex: 'userName', width: 100},
            {title: '登陆名', dataIndex: 'loginName', width: 100}
        ];
        var store = new Data.Store({
            proxy:{
                method:"POST",
                dataType:"json"
            },
            url:url_query,
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
            emptyDataTpl : '<div class="centered"><img alt="Crying" src="../../custom/img/crying.png"><h2>数据不存在，请检查查询条件</h2></div>',
            bbar: {
                pagingBar: true
            },
            plugins : [Grid.Plugins.RadioSelection],
            autoRender: true
        });
        var form = new Form.HForm({
            srcNode: '#form'
        });

        form.render();
        grid.on('itemclick', function(ev) {
            form.enable();
            var item = ev.item;
            form.setRecord(item);
            form.disable();
            disableBtnEdit();
        });

        $('#btnSearch').on('click', function() {
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

        $('#add').on('click', function() {

            operation = 'add';
            form.enable();
            enableBtnEdit();

            form.clearFields();
            form.valid();
        });

        $('#edit').on('click', function() {
            var item = grid.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择一条记录', 'error');
                return;
            }

            operation = 'edit';
            enableBtnEdit();
            form.enable();
        });

        $('#delete').on('click', function() {
            var item = grid.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择要删除的记录', 'error');
                return;
            }

            BUI.Message.Confirm("确定要删除当前记录吗？", function() {

                $.ajax({
                    url: url_delete,
                    type: 'post',
                    data: {id: item.id},
                    success: function(data) {
                        if (data.success) {
                            BUI.Message.Alert('删除成功', 'success');
                            store.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                        }
                    }
                })

            }, 'question');

        });

        $('#btnReset').on('click', function() {

            if (operation === 'add') {
                form.clearFields();
            }else if (operation === 'edit') {
                var item = grid.getSelected();
                form.setRecord(item);

            }
        });

        $('#btnSave').on('click', function() {
            form.valid();
            var item = grid.getSelected();
            if (!form.isValid()) {
                return;
            }

            var data = form.toObject();
            disableBtnEdit();
            if (operation === 'edit') {
                data.id = item.id;
                $.ajax({
                    url: url_update,
                    type: 'post',
                    data: data,
                    success: function(data) {
                        if (data.success) {
                            BUI.Message.Alert('修改成功', 'success');
                            store.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                            enableBtnEdit();
                        }
                    }
                })

            }else{
                $.ajax({
                    url: url_create,
                    type: 'post',
                    data: data,
                    success: function(data) {
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
            }
        });
    });