BUI.use(['bui/form', 'bui/tree', 'bui/data', 'bui/grid'],
    function (Form, Tree, Data, Grid) {

        var contextPath = "../";

        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';
        var url_createOrgInfo = contextPath + 'orgInfo/createOrgInfo.json';
        var url_updateOrgInfo = contextPath + 'orgInfo/updateOrgInfo.json';
        var url_queryHisByNo = contextPath + 'orgInfo/queryHisByNo.json'

        var orgInfoForm = new Form.HForm({
            srcNode: '#orgInfoForm',
            autoRender: true
        });

        var store = new Data.TreeStore({
            url: url_queryOrgInfo
        });

        // 由于这个树，不显示根节点，所以可以不指定根节点
        var tree = new Tree.TreeList({
            render: '#orgInfoTree',
            store: store,
            checkType: 'none',
            showLine: true // 显示连接线
        });
        tree.render();
        store.load();
        orgInfoForm.render();

        var columns = [{
            title: "机构代码",
            dataIndex: "orgNo",
            width: '100'
        }, {
            title: "机构名称",
            dataIndex: "orgName",
            width: '150'
        }, {
            title: "起始时间",
            dataIndex: "beginDate",
            width: '100'
        }, {
            title: "截止时间",
            dataIndex: "endDate",
            width: '100'
        },{
            title:"是否销售机构",
            dataIndex:"ifSales",
            width:'100'
        },{
            title:"负责人",
            dataIndex:'leader',
            width:'100'
        }
        ];

        var orgInfoStore = new Data.Store({
            proxy: {
                method: "POST",
                dataType: "json"
            },
            url: url_queryHisByNo,
            autoLoad: false
        });
        var orgInfoGrid = new Grid.Grid({
            render: '#orgInfoGrid',
            columns: columns,
            width: '100%',
            loadMask: true,
            store: orgInfoStore,
            autoRender: true
        });
        tree.on('itemclick', function (ev) {
            orgInfoForm.enable();
            var item = ev.item;
            orgInfoForm.setRecord({
                orgNo: item.id,
                orgName: item.text,
                beginDate: item.value,

            });
            orgInfoForm.disable();
            disableBtnEdit();
            orgInfoStore.load({orgNo: item.id},function (data) {

                $.each(data,function (i,item) {
                    $("#ifSales").val(item.ifSales);
                    $("#leader").val(item.leader);

                })
            });
        });
        function enableBtnEdit() {
            $('#btnSave').attr('disabled', false);
        }

        function disableBtnEdit() {
            $('#btnSave').attr('disabled', true);
        }

        orgInfoForm.disable();

        var operation = '';

        $('#addOrgInfo').on('click', function () {
            var item = tree.getSelected();
            if (!item) {
                BUI.Message.Alert('请先选中一个父机构', 'error');
                return;
            }
            operation = 'add';
            orgInfoForm.enable();
            enableBtnEdit();
            $('#orgNo,#beginDate').attr('readonly', false);
            orgInfoForm.clearFields();
            orgInfoForm.valid();
        });

        $('#editOrgInfo').on('click', function () {
            var item = tree.getSelected();
            $('#beginDate').attr("readonly", "readonly");
            if (item == null) {
                BUI.Message.Alert('请先选择一个机构', 'error');
                return;
            }

            operation = 'edit';
            enableBtnEdit();
            orgInfoForm.enable();
            $('#orgNo,#beginDate').attr('readonly', true);
            $('#beginDate').attr('disabled', true);
        });
        $('#refreshOrgInfo').on('click', function () {
            if (store.hasData()) {
                store.load();
            }
        });

        $('#btnSave').on('click', function () {
            var item = tree.getSelected();

            if (!orgInfoForm.isValid()) {
                return;
            }

            var data = orgInfoForm.toObject();
            disableBtnEdit();

            if (operation === 'add') {
                var orgNo = data.orgNo;
                if (!orgNo || orgNo.length != 2) {
                    BUI.Message.Alert("机构代码必须是两位字母或数字", 'warning');
                    return;
                }
                data.parentId = item.id;//父ID
                data.orgNo = item.id + data.orgNo;//拼装机构代码
                $.ajax({
                    url: url_createOrgInfo,
                    type: 'post',
                    data: data,
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('添加成功', 'success');
                            store.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                            enableBtnEdit();
                            orgInfoForm.enable();
                        }
                    }
                })

            } else if (operation === 'edit') {
                data.orgNo = item.id;
                data.parentId = item.pid;
                $.ajax({
                    url: url_updateOrgInfo,
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

    });