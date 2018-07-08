
var editFlag = true;
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";

        var url_queryByLink = contextPath + 'reimbursementMisc/queryByLink.json';
        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';
        var url_update = contextPath + "reimbursementMisc/updateByPrimaryKeySelective.json";
        var url_create = contextPath + "reimbursementMisc/insert.json";
        var url_delete = contextPath + "accrualPercentage/deleteByPrimaryKey.json"

        /************************************************************************************************/



        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });


        form1.render();

        var Store = Data.Store,
            Columns = [
                {title: '月份',dataIndex:'yearMonth',width:100},
                {title: '经营机构', dataIndex: 'orgName', width: 100},
                {title:'理财经理',dataIndex:'staffName',width:200},
                {title:'员工号',dataIndex:'staffId',width:200},
                {title:'科目',dataIndex:'subjects',width:200},
                {title:'费用',dataIndex:'fee',width:200},
                {title:'备注',dataIndex:'remark',width:200},
            ];


        var store = new Store(
            {
                url: url_queryByLink,
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



        var reimbursementMiscForm = new Form.HForm({
            srcNode: "#reimbursementMiscForm"
        });
        reimbursementMiscForm.render();
        var reimbursementMiscDialog = new Overlay.Dialog({
            width: "78%",
            contentId: "content",
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {
                    reimbursementMiscForm.valid();
                    if (!reimbursementMiscForm.isValid()) {
                        return;
                    }

                    var obj = reimbursementMiscForm.serializeToObject();
                    if (editFlag) {
                        obj.id = grid.getSelected().id;
                    }

                    var url = editFlag ? url_update  : url_create;
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
                                reimbursementMiscDialog.close();
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

        $("#add").on('click',function () {
            editFlag = false;
            reimbursementMiscDialog.show();
        })

        $("#btnSearch").on("click",function () {
            var obj = form1.serializeToObject();
            obj.start = 0; // 返回第一页
            store.load(obj);
            return false;
        })


        $('#edit').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }

            reimbursementMiscForm.setRecord(record);
            $('#accruedCode').attr("readonly", "readonly");
            editFlag = true;
            //productInfoDialog.set('title', '编辑产品信息');
            reimbursementMiscDialog.show();
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
            trigger: '.orgName',
            valueField: '.orgNo', //如果需要列表返回的value，放在隐藏域，那么指定隐藏域
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


    });













