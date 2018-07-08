
var editFlag = true;
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";

        var url_findAll = contextPath + 'managefeeParameter/findAll.json';

        var url_update = contextPath + "managefeeParameter/updateByPrimaryKeySelective.json";
        var url_create = contextPath + "managefeeParameter/insertSelective.json";
        var url_delete = contextPath + "managefeeParameter/deleteByPrimaryKey.json"

        var url_financiers_findAll = contextPath+'financiers/findAll.json'

        /************************************************************************************************/




        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });



        form1.render();

        var Store = Data.Store,
            Columns = [
                {title: '编号',dataIndex:'num',width:200},
                {title: '说明', dataIndex: 'instruct', width: 200},
                {title:'融资方',dataIndex:'financiersReferred',width:200},
                {title: '期限',dataIndex:'days',width:200},
                {title: '产品类型', dataIndex: 'productType', width: 200},
                {title:'总成本费率(%)',dataIndex:'costPropo',width:200,renderer:function (value) {
                    return (Math.round(value * 10000)/100).toFixed(2) + '%';
                }},
                {title: '承销费率(%)',dataIndex:'underwritingFeePropo',width:200,renderer:function (value) {
                    return (Math.round(value * 10000)/100).toFixed(2) + '%';
                }},
                {title: '备案费率(%)', dataIndex: 'registrationFeePropo', width: 200,renderer:function (value) {
                    return (Math.round(value * 10000)/100).toFixed(2) + '%';
                }},
                {title:'起息付资金成本(%)',dataIndex:'qxDatePay',width:200,renderer:function (value) {
                    return (Math.round(value * 10000)/100).toFixed(2) + '%';
                }},
                {title: '修正费率(%)',dataIndex:'correctionFee',width:200,renderer:function (value) {
                    return (Math.round(value * 10000)/100).toFixed(2) + '%';
                }},
                {title: '备案机构', dataIndex: 'recordInstitutions', width: 200},
                {title:'代收备案费',dataIndex:'isReductRecordFee',width:200}

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



        var managefeeParameterForm = new Form.HForm({
            srcNode: "#managefeeParameterForm"
        });
        managefeeParameterForm.render();
        var managefeeParameterDialog = new Overlay.Dialog({
            width: "78%",
            contentId: "content",
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {

                    managefeeParameterForm.valid();
                    if (!managefeeParameterForm.isValid()) {
                        return;
                    }

                    var obj = managefeeParameterForm.serializeToObject();
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
                                managefeeParameterDialog.close();
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
            managefeeParameterDialog.show();
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

            managefeeParameterForm.setRecord(record);
            $('#accruedCode').attr("readonly", "readonly");
            editFlag = true;
            //productInfoDialog.set('title', '编辑产品信息');
            managefeeParameterDialog.show();
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


        $.ajax({
            url:url_financiers_findAll,

            type:'get',
            success:function (data) {
                if(data.success){
                    $.each(data.value,function (i,item) {
                        $("select[name='financiersCode']").append("<option value='"+item.onlineFinanciersid+"'>"+item.referred+"</option>");
                    })
                }
            }
        })




            $("#costPropo").blur(function () {
                $("#costPropo").next().remove();
                var val = $("#costPropo").val();
                var ids = $("#costPropo").attr("id");
                checkInput(val,ids);
            })
            $("#underwritingFeePropo").blur(function () {
                $("#underwritingFeePropo").next().remove();
                var val = $("#underwritingFeePropo").val();
                var ids = $("#underwritingFeePropo").attr("id");
                checkInput(val,ids);
            })
            $("#registrationFeePropo").blur(function () {
                $("#registrationFeePropo").next().remove();
                var val = $("#registrationFeePropo").val();
                var ids = $("#registrationFeePropo").attr("id");
                checkInput(val,ids);
            })
            $("#qxDatePay").blur(function () {
                $("#qxDatePay").next().remove();
                var val = $("#qxDatePay").val();
                var ids = $("#qxDatePay").attr("id");
                checkInput(val,ids);
            })
            $("#correctionFee").blur(function () {
                $("#correctionFee").next().remove();
                var val = $("#correctionFee").val();
                var ids = $("#correctionFee").attr("id");
                checkInput(val,ids);
            })


        function checkInput(val,ids) {
            if(isNaN(Number(val))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
                $("#"+ids).after("<lable>格式错误</lable>").next().css("color","red")
            }else {
                if(val>1){
                    $("#"+ids).after("<lable>不能大于1</lable>").next().css("color","red");

                }else if(val<0){
                    $("#"+ids).after("<lable>不能小于0</lable>").next().css("color","red")
                }else {
                    var val = (Math.round(val * 10000)/100).toFixed(2);
                    $("#"+ids).after("<lable>"+val+"%</lable>").next().css("color","green")
                }
            }
        }

        // function checkOnSaves() {
        //     var valCostcostPropo = $("#costPropo").val();
        //     var valUnderwritingFeePropo = $("#underwritingFeePropo").val();
        //     var valRegistrationFeePropo = $("#registrationFeePropo").val();
        //     var valQxDatePay = $("#qxDatePay").val();
        //     var valCorrectionFee = $("#correctionFee").val();
        //     checkOnSave(valCostcostPropo)
        //     checkOnSave(valUnderwritingFeePropo)
        //     checkOnSave(valRegistrationFeePropo)
        //     checkOnSave(valQxDatePay)
        //     checkOnSave(valCorrectionFee)
        // }
        //
        // function checkOnSave(val) {
        //     if(isNaN(Number(val))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
        //         alert("参数格式错误");
        //         return false;
        //     }else {
        //
        //         if(val>=1){
        //             alert("参数格式错误");
        //             return false;
        //         }else if(val<0){
        //             alert("参数格式错误");
        //             return false;
        //         }
        //     }
        // }



    });


































