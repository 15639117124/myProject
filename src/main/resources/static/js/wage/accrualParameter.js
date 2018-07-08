BUI.use(['bui/extensions/treepicker', 'bui/tree', 'bui/form', 'bui/grid', 'bui/data', 'bui/calendar', 'bui/tab', 'bui/overlay'],


    function (TreePicker, Tree, Form, Grid, Data, Calendar, Tab, Overlay) {


        var contextPath = "../";
        var url_findAll = contextPath + 'accrualParameter/findAll.json';

        var url_update = contextPath + 'accrualParameter/updateByPrimaryKeySelective.json';
        var url_delete = contextPath + 'accrualParameter/deleteByPrimaryKey.json'


        $("#upload").bind("click", function () {
            BUI.Message.Confirm('同一Excel文件请不要重复上传，确定要进行文件上传操作吗？', function () {
                var dialog = new Overlay.Dialog({
                    title: '上传数据',
                    width: '45%',
                    closeAction: "remove",
                    loader: {
                        url: 'accrualParameterDetail.html',
                        autoLoad: false,
                        lazyLoad: false,
                        callback: function (text) {
                            //insurantDialog.close();
                        }
                    },
                    buttons: [],
                    success: function () {
                        dialog.close();
                    }
                    //,mask:false
                });
                dialog.show();
                dialog.get('loader').load();
            });
        });

        //update
        var accrualParameterForm = new Form.HForm({
            srcNode: "#accrualParameterForm"
        });
        accrualParameterForm.render();
        var accrualParameterDialog = new Overlay.Dialog({
            width: "78%",
            contentId: "content",
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {
                    accrualParameterForm.valid();
                    if (!accrualParameterForm.isValid()) {
                        return;
                    }

                    var obj = accrualParameterForm.serializeToObject();
                    if (editFlag) {
                        obj.id = grid.getSelected().id;
                    }

                    var url = url_update ;
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
                                accrualParameterDialog.close();
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

        $('#edit').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }

            accrualParameterForm.setRecord(record);
            $('#staffName').attr("readonly", "readonly");
            $('#staffId').attr("readonly", "readonly");
            $('#yearMonth').attr("readonly", "readonly");
            editFlag = true;
            //productInfoDialog.set('title', '编辑产品信息');
            accrualParameterDialog.show();
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




        $("#exportChannelRate").on('click', function () {
            window.open("../doc/AccrualParameter.xls");
        });


        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });




        form1.render();

        var Store = Data.Store,
            Columns = [
                {title: '姓名',dataIndex:'staffName',width:200},
                {title: '工号', dataIndex: 'staffId', width: 200},
                {title:'月份',dataIndex:'yearMonth',width:200},
                {title: '达标率',dataIndex:'kpiAchievedPercentage',width:200,renderer:function (value) {
                    return (Math.round(value*10000)/100).toFixed(2)+"%";
                }},
                {title: '当月下发比例', dataIndex: 'monthIssuedPercentage', width: 200,renderer:function (value) {
                    return (Math.round(value*10000)/100).toFixed(2)+"%";
                }},
                {title:'预留下发比例',dataIndex:'reservedPercentage',width:200,renderer:function (value) {
                    return (Math.round(value*10000)/100).toFixed(2)+"%";
                }}
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


        $("#btnSearch").on("click",function () {
            var obj = form1.serializeToObject();
            obj.start = 0; // 返回第一页
            store.load(obj);
            return false;
        })

    })