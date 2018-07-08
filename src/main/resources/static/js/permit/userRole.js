BUI.use(['bui/form', 'bui/data', 'bui/select', 'bui/grid'],
    function (Form, Data, Select, Grid) {

        var contextPath = "../";

        var url_queryAllUsers = contextPath + 'permit/user/queryUsers.json';
        var url_queryUserRoles = contextPath + 'permit/userRole/queryRoleByUser.json';
        var url_permitRoles = contextPath + 'permit/userRole/permitUserRole.json';

        var queryForm = new Form.HForm({
            srcNode: '#queryForm',
            autoRender: true
        });

        var columns = [{
            title: '角色名',
            dataIndex: 'roleName',
            width: '50%'
        }, {
            title: '角色描述',
            dataIndex: 'roleDesc',
            width: '50%'
        }];
        var roleStore = new Data.Store({
            url: url_queryUserRoles,
            autoLoad: false
        });
        var roleGrid = new Grid.Grid({
            render: '#roleGrid',
            columns: columns,
            width: '100%',
            loadMask: true,
            store: roleStore,
            itemStatusFields: { //设置数据跟状态的对应关系
                selected: 'selected'
            },
            plugins: [Grid.Plugins.CheckSelection],
            emptyDataTpl: '<div class="centered"><img alt="Crying" src="../../custom/img/crying.png"><h2>数据不存在，请检查查询条件</h2></div>',
            autoRender: true,
        });

        $('#btnSearch').on('click', function () {
            userStore.load(queryForm.toObject());
        });

        var userStore = new Data.Store({
            proxy: {
                method: 'POST',
                dataType: 'json'
            },
            url: url_queryAllUsers,
            pageSize: 30,
            params: {
                userId: null
            },
            autoLoad: false
        });
        var columns = [{
            title: '用户名',
            dataIndex: 'userName',
            width: '50%'
        }, {
            title: '登陆名',
            dataIndex: 'loginName',
            width: '50%'
        }];
        var userGrid = new Grid.Grid({
            render: '#userGrid',
            columns: columns,
            width: '100%',
            loadMask: true,
            store: userStore,
            emptyDataTpl: '<div class="centered"><img alt="Crying" src="../../custom/img/crying.png"><h2>数据不存在，请检查查询条件</h2></div>',
            bbar: {
                pagingBar: true
            },
            autoRender: true,
        });
        userGrid.on('itemclick', function (ev) {
            var item = ev.item;
            $('#userId').val(item.id);
            roleGrid.clearSelection();
            roleStore.load({
                userId: item.id
            });

        });
        $('#btnPermit').on('click', function () {
            var addArr = [];
            var delArr = [];
            var items = roleGrid.getItems();
            for (var i = 0; i < items.length; i++) {
                var entry = items[i];

                if (entry.selected && !entry.permit) {
                    addArr.push(entry.roleId);
                } else if (entry.permit && !entry.selected) {
                    delArr.push(entry.roleId);
                }
            }

            if (addArr.length == 0 && delArr.length == 0) {// 无修改项， 不需要触发后台操作
                return;
            }
            BUI.Message.Confirm("用户角色已更新，是否保存?", function () {
                $('#btnPermit').attr('disabled', true);
                $.ajax({
                    url: url_permitRoles,
                    type: 'post',
                    data: {
                        userId: $('#userId').val(),
                        addIds: JSON.stringify(addArr),
                        delIds: JSON.stringify(delArr)
                    },
                    success: function (data) {
                        $('#btnPermit').attr('disabled', false);
                        if (data.success) {
                            BUI.Message.Alert('修改成功', 'success');
                            roleStore.load({
                                systemId: $('#systemId').val(),
                                userId: $('#userId').val()
                            });
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                        }
                    }
                })
            }, 'question');

        });
    });