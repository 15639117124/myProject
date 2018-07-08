BUI.setDebug(true);

BUI.use(['bui/form', 'bui/tree', 'bui/data', 'bui/overlay', 'bui/select'],
    function (Form, Tree, Data, Overlay, Select) {

        var contextPath = "../";

        var url_queryRoles = contextPath + 'permit/role/queryRoleTree.json';
        var url_createRole = contextPath + 'permit/role/createRole.json';
        var url_updateRole = contextPath + 'permit/role/updateRole.json';
        var url_deleteRole = contextPath + 'permit/role/deleteRole.json';

        var store = new Data.TreeStore({
            url: url_queryRoles
        });
        store.load();
        // 由于这个树，不显示根节点，所以可以不指定根节点
        var tree = new Tree.TreeList({
            render: '#roleTree',
            store: store,
            checkType: 'none',
            showLine: true // 显示连接线
        });
        tree.render();

        tree.on('itemclick', function (ev) {
            disableBtnEdit();
            disableEdit();
            var item = ev.item;

            $('#roleName').val(item.text);
            $('#roleDesc').val(item.remark);
        });

        function enableEdit() {
            $('#roleName, #roleDesc').attr('disabled', false);
        }

        function enableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', false);
        }

        function disableEdit() {
            $('#roleName, #roleDesc').attr('disabled', true);
        }

        function disableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', true);
        }

        disableEdit();

        $('#btnSave, #btnReset').attr('disabled', true);

        $('#btnSearch').on('click', function () {

            if (!$('#systemId').val()) {
                BUI.Message.Alert("请选定系统", "error");
                return;
            }

            store.load({
                systemId: $('#systemId').val()
            });
        });

        var operation = '';

        $('#addRole').on('click', function () {
            operation = 'add';
            enableEdit();
            enableBtnEdit();

            $('#roleName, #roleDesc').val('');
        });

        $('#editRole').on('click', function () {
            var item = tree.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择可编辑的角色', 'error');
                return;
            }

            operation = 'edit';
            enableEdit();
            enableBtnEdit();
        });

        $('#delRole').on('click', function () {
            var item = tree.getSelected();

            var item = tree.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择要删除的角色', 'error');
                return;
            }


            var message = item.children.length > 0 ? '确定删除当前选中角色及其所有子角色' : '确定删除当前选中角色';

            BUI.Message.Confirm(message, function () {

                $.ajax({
                    url: url_deleteRole,
                    type: 'post',
                    data: {roleId: item.id},
                    success: function (data) {
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

        $('#btnReset').on('click', function () {

            if (operation === 'edit') {
                var item = tree.getSelected();
                $('#roleName').val(item.text);
                $('#roleDesc').val(item.value);
            } else if (operation === 'add') {
                $('#roleName, #roleDesc').val('');
            }
        });

        $('#refreshRole').on('click', function () {
            if (store.hasData()) {
                store.load();
            }
        });

        var roleForm = new Form.HForm({
            srcNode: '#roleForm',
            autoRender: true
        });

        $('#btnSave').on('click', function () {
            var item = tree.getSelected();
            roleForm.valid();

            if (!roleForm.isValid()) {
                return;
            }

            var data = roleForm.toObject();

            disableBtnEdit();
            disableEdit();


            BUI.Message.Confirm('是否保存?', function () {
                if (operation === 'add') {
                    //var pid = item.pid === '-1' ? '0': item.pid;
                    if (!item) {
                        data.parentId = '0';
                    } else {

//				var pid = item.id;
//				data.parentId = pid;
                        data.parentId = item.id;
                    }
                    data.systemId = $('#systemId').val();
                    $.ajax({
                        url: url_createRole,
                        type: 'post',
                        data: data,
                        success: function (data) {
                            if (data.success) {
                                BUI.Message.Alert('添加成功', 'success');
                                store.load();
                            } else {
                                BUI.Message.Alert(data.msg, 'error');
                                enableBtnEdit();
                                enableEdit();
                            }
                        }
                    })

                } else if (operation === 'edit') {
                    data.id = item.id;
                    $.ajax({
                        url: url_updateRole,
                        type: 'post',
                        data: data,
                        success: function (data) {
                            if (data.success) {
                                BUI.Message.Alert('修改成功', 'success');
                                store.load();
                            } else {
                                BUI.Message.Alert(data.msg, 'error');
                                enableBtnEdit();
                                enableEdit();
                            }

                        }
                    })

                }


            }, 'question');


        });

    });