BUI.use(['bui/form', 'bui/tree', 'bui/data', 'bui/grid'],
    function (Form, Tree, Data, Grid) {
        var contextPath = "../";
        var url_queryResources = contextPath + 'permit/resource/queryResources.json';
        var url_createResource = contextPath + 'permit/resource/createResource.json';
        var url_updateResource = contextPath + 'permit/resource/updateResource.json';
        var url_deleteResource = contextPath + 'permit/resource/deleteResource.json';
        var queryEleByPageId = contextPath + 'permit/element/queryByPageId.json';
        var url_updateElements = contextPath + 'permit/element/updateElements.json';
        var url_deleteElements = contextPath + 'permit/element/deleteElements.json';

        var treeSelectedItem = null;
        var resourceForm = new Form.HForm({
            srcNode: '#resourceForm',
            autoRender: true
        });

        var store = new Data.TreeStore({
            url: url_queryResources
        });

        // 由于这个树，不显示根节点，所以可以不指定根节点
        var tree = new Tree.TreeList({
            render: '#resourceTree',
            store: store,
            checkType: 'none',
            showLine: true // 显示连接线
        });
        tree.render();
        store.load();
        resourceForm.render();

        tree.on('itemclick', function (ev) {
            resourceForm.enable();
            treeSelectedItem = ev.item;
            resourceForm.setRecord({
                resourceName: treeSelectedItem.text,
                resourceValue: treeSelectedItem.value,
                remark: treeSelectedItem.desc,
                resourceType: treeSelectedItem.type,
                quantity: treeSelectedItem.quantity,
                isLeaf: treeSelectedItem.isLeaf
            });

            resourceForm.disable();
            var pageId = treeSelectedItem.id;
            if (pageId) {
                elementStore.load({pageId: pageId});
            }
        });


        function enableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', false);
        }

        function disableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', true);
        }

        resourceForm.disable();

        $('#btnSave, #btnReset').attr('disabled', true);

        $('#btnSearch').on('click', function () {

            if (!$('#systemId').val()) {
                BUI.Message.Alert("请选定系统", "error");
                return;
            }

            var data = resourceForm.toObject();

//		if (!data.resourceType) {
//			data.resourceType = null;
//		}

            store.load(data);
        });

        var operation = '';

        $('#addResource').on('click', function () {
            operation = 'add';
            resourceForm.enable();
            enableBtnEdit();

            resourceForm.clearFields();
            resourceForm.valid();
        });

        $('#editResource').on('click', function () {
            var item = tree.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择可编辑的节点', 'error');
                return;
            }

            operation = 'edit';
            enableBtnEdit();
            resourceForm.enable();
        });

        $('#delResource').on('click', function () {
            var item = tree.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择要删除的节点', 'error');
                return;
            }

            var message = item.children.length > 0 ? '确定删除当前选中资源及其所有子资源' : '确定删除当前选中资源';

            BUI.Message.Confirm(message, function () {

                $.ajax({
                    url: url_deleteResource,
                    type: 'post',
                    data: {resourceId: item.id},
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
                resourceForm.setRecord({
                    resourceName: item.text,
                    resourceValue: item.value,
                    remark: item.desc,
                    resourceType: item.type,

                });

            } else if (operation === 'add') {
                resourceForm.clearFields();
            }
        });

        $('#refreshRss').on('click', function () {
            if (store.hasData()) {
                store.load();
            }

        });

        $('#btnSave').on('click', function () {
            var item = tree.getSelected();

            if (!resourceForm.isValid()) {
                return;
            }

            var data = resourceForm.toObject();

            disableBtnEdit();

            if (operation === 'add') {
                if (!item) {
                    data.parentId = '0';
                } else {
                    data.parentId = item.id;
                }

                $.ajax({
                    url: url_createResource,
                    type: 'post',
                    data: data,
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('添加成功', 'success');
                            store.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                            enableBtnEdit();
                            resourceForm.enable();
                        }
                    }
                })

            } else if (operation === 'edit') {
                data.id = item.id;
                $.ajax({
                    url: url_updateResource,
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
                });

            }
        });

        var columns = [
            {title: '元素Id', dataIndex: 'elementId', editor: {xtype: 'text', rules: {required: true}}},
            {title: '元素名称', dataIndex: 'elementDesc', editor: {xtype: 'text', rules: {required: true}}},
            {title: '页面ID', dataIndex: 'pageId', editor: {xtype: 'text', rules: {required: true}}},
            {title: '页面路径', dataIndex: 'pageValue', editor: {xtype: 'text'}}
        ];
        var elementStore = new Data.Store({
            url: queryEleByPageId
        });
        var editing = new Grid.Plugins.CellEditing();

        var elementGrid = new Grid.Grid({
            render: '#elementGrid',
            columns: columns,
            forceFit: true,
            store: elementStore,
            plugins: [Grid.Plugins.CheckSelection, editing],
            tbar: {
                items: [{
                    btnCls: 'button button-small',
                    text: '<i class="icon-plus"></i>添加',
                    listeners: {'click': addFunction}
                }, {
                    btnCls: 'button button-small',
                    text: '<i class="icon-remove"></i>删除',
                    listeners: {
                        'click': delFunction
                    }
                }]
            }
        });
        elementGrid.render();
        function addFunction() {
            if (!treeSelectedItem) {
                return;
            }
            var newData = {pageId: treeSelectedItem.id, pageValue: treeSelectedItem.value};
            elementStore.add(newData);
            editing.edit(newData, 'elementId'); //添加记录后，直接编辑
        }

        function delFunction() {
            var selections = elementGrid.getSelection();
            var delIds = [];
            $.each(selections, function (i, item) {
                delIds.push(item.id);
            });
            if (delIds.length > 0) {
                $.ajax({
                    url: url_deleteElements,
                    type: 'post',
                    data: {elementIds: JSON.stringify(delIds)},
                    success: function (result) {
                        if (!result.success) {
                            BUI.Message.Alert(data.msg, 'error');
                            elementStore.load({pageId: treeSelectedItem.id});
                        }
                    }
                });
            }
            elementStore.remove(selections);
        }

        var elementForm = new Form.Form({
            srcNode: "#elementForm",
            url: 'action.json'
        });
        elementForm.render();

        $("#saveElement").on('click', function () {
            if (!editing.isValid()) {
                return false;
            }
            var allRecords = elementGrid.getItems();
            if (!allRecords) {
                BUI.Message.alert("没有数据要保存");
            }
            $.ajax({
                url: url_updateElements,
                type: 'post',
                data: {allRecords: JSON.stringify(allRecords)},
                success: function (data) {
                    if (data.success) {
                        BUI.Message.Alert('修改成功', 'success');
                        store.load();
                    } else {
                        BUI.Message.Alert(data.msg, 'error');
                        enableBtnEdit();
                    }

                }
            });
        })
    });