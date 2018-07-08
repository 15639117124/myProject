BUI.use(['bui/data', 'bui/tree', 'bui/overlay'],
    function (Data, Tree, OverLay) {

        var contextPath = "../";

        var url_queryAllRoles = contextPath + 'permit/role/queryRoleTree.json';
        var url_queryRssByRoleId = contextPath + 'permit/roleResource/queryRssByRoleId.json';
        var url_permitResources = contextPath + 'permit/roleResource/permitRss.json';
        var url_permitElements = contextPath + 'permit/roleResource/permitElements.json';
        var url_queryEleByRole = contextPath + 'permit/roleResource/queryEleByRole.json';

        var roleStore = new Data.TreeStore({
            url: url_queryAllRoles
        });
        roleStore.load();

        var resourceStore = new Data.TreeStore({
            url: url_queryRssByRoleId,
        });

        var roleTree = new Tree.TreeList({
            render: '#roleTree',
            store: roleStore,
            checkType: 'none',
            loadMask: true,
            showLine: true // 显示连接线
        });
        roleTree.render();


        roleTree.on('itemclick', function (ev) {
            var item = ev.item;
            resourceTree.clearAllChecked();
            resourceStore.load({
                roleId: item.id,
            });

            elementTree.clearAllChecked();
            elementStore.load({roleId: item.id});
        });

        var resourceTree = new Tree.TreeList({
            render: '#resourceTree',
            store: resourceStore,
            showLine: true,
            autoRender: true,
            loadMask: true,
            checkType: 'all',
            height: 600
        });

        function hasCheckedChildNode(node) {
            var children = node.children;
            var stack = [];
            stack = stack.concat(children);
            while (stack.length > 0) {
                var entry = stack.pop();
                if (entry.leaf) {
                    if (entry.checked) {
                        return true;
                    }
                } else {
                    stack = stack.concat(entry.children);
                }
            }
            return false;
        }

        $('#btnPermit').on('click', function () {
            var nodes = resourceTree.getCheckedNodes();
            for (var i = 0; i < nodes.length; i++) {
                if (!nodes[i].leaf && nodes[i].checked != nodes[i].permit) {
                    resourceTree.expandNode(nodes[i]);
                }
            }

            var arr = resourceTree.getItems();
            var dataForAdd = {};
            var dataForDel = {};

            var parent = null;

            for (var i = 0; i < arr.length; i++) {
                var entry = arr[i];
                if (entry.leaf) {
                    if (entry.checked && !entry.permit) {
                        // add permits
                        dataForAdd[entry.id] = entry.id;

                        parent = entry.parent;
                        while (parent && parent.level && !parent.permit) {
                            dataForAdd[parent.id] = parent.id;
                            parent = parent.parent;
                        }
                    } else if (!entry.checked && entry.permit) {
                        // del permits
                        dataForDel[entry.id] = entry.id;

                        parent = entry.parent;

                        while (parent && parent.level && !hasCheckedChildNode(parent)) {
                            dataForDel[parent.id] = parent.id;
                            parent = parent.parent;
                        }

                    }
                }
            }

            var addArr = Object.keys(dataForAdd);
            var delArr = Object.keys(dataForDel);

            if (addArr.length == 0 && delArr.length == 0) {// 无修改项， 不需要触发后台操作
                return;
            }

            BUI.Message.Confirm("权限配置已修改，是否保存?", function () {
                $('#btnPermit').attr('disabled', true);
                $.ajax({
                    url: url_permitResources,
                    type: 'post',
                    data: {
                        roleId: roleTree.getSelected().id,
                        addIds: JSON.stringify(addArr),
                        delIds: JSON.stringify(delArr)
                    },
                    success: function (data) {
                        $('#btnPermit').attr('disabled', false);
                        if (data.success) {
                            BUI.Message.Alert('修改成功', 'success');
                            resourceStore.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                        }
                    }
                })
            }, 'question');

        });

        var elementStore = new Data.TreeStore({
            url: url_queryEleByRole
        });
        var elementTree = new Tree.TreeList({
            render: '#elementTree',
            store: elementStore,
            checkType: 'onlyLeaf',
            loadMask: true,
            showLine: true,
            autoRender: true
        });
        $("#btnElePermit").on('click', function () {
            var allItems = elementTree.getItems();
            var addIds = [];
            var delIds = [];
            $.each(allItems, function (i, item) {
                if (item.checked && !item.permit) {
                    addIds.push(item.id);
                } else if (!item.checked && item.permit) {
                    delIds.push(item.id);
                }
            });
            if (addIds.length == 0 && delIds.length == 0) {
                return;
            }
            BUI.Message.Confirm("页面配置已修改，是否保存?", function () {
                $('#btnElePermit').attr('disabled', true);
                $.ajax({
                    url: url_permitElements,
                    type: 'post',
                    data: {
                        roleId: roleTree.getSelected().id,
                        addIds: JSON.stringify(addIds),
                        delIds: JSON.stringify(delIds)
                    },
                    success: function (result) {
                        $('#btnElePermit').attr('disabled', false);
                        if (result.success) {
                            BUI.Message.Alert('修改成功', 'success');
                            elementStore.load();
                        } else {
                            BUI.Message.Alert(result.msg, 'error');
                        }
                    }
                })
            }, 'question');

        });
    });