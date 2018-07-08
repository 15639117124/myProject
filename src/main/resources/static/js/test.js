
var editFlag = true;
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";

        var url_findAll = contextPath + 'accrualPercentage/findAll.json';

        var url_update = contextPath + "accrualPercentage/updateByPrimaryKeySelective.json";
        var url_create = contextPath + "accrualPercentage/createAccrualPercentage.json";
        var url_delete = contextPath + "accrualPercentage/deleteByPrimaryKey.json"

        /************************************************************************************************/






        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });




        form1.render();

        var Store = Data.Store,
            Columns = [
                {title: '姓名',dataIndex:'name',width:200},
                {title: '年龄', dataIndex: '', width: 200},
                {title:'工龄',dataIndex:'',width:500},
                {title:'岗位',dataIndex:'',width:500}
            ];


        var store = new Store(
            {
                url: url_findAll,
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



        var accrualPercentageForm = new Form.HForm({
            srcNode: "#accrualPercentageForm"
        });
        accrualPercentageForm.render();
        var accrualPercentageDialog = new Overlay.Dialog({
            width: "78%",
            contentId: "content",
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {
                    accrualPercentageForm.valid();
                    if (!accrualPercentageForm.isValid()) {
                        return;
                    }

                    var obj = accrualPercentageForm.serializeToObject();
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
                                accrualPercentageDialog.close();
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
            accrualPercentageDialog.show();
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

            accrualPercentageForm.setRecord(record);
            $('#accruedCode').attr("readonly", "readonly");
            editFlag = true;
            //productInfoDialog.set('title', '编辑产品信息');
            accrualPercentageDialog.show();
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



    });













