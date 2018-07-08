

var status ;
BUI.use(['bui/extensions/treepicker', 'bui/tree', 'bui/form', 'bui/grid', 'bui/data', 'bui/calendar', 'bui/tab', 'bui/overlay'],


    function (TreePicker, Tree, Form, Grid, Data, Calendar, Tab, Overlay) {


        var contextPath = "../";
        var url_findByYearMonth = contextPath + 'feeReimbursement/findByYearMonth.json';

         var url_update = contextPath + 'feeReimbursement/updateByYearMonth.json';
         var url_senMail = contextPath+'feeReimbursement/senMail.json';
         var url_findByYearMonthAndStaffId = contextPath+'feeReimbursement/findByYearMonthAndStaffId.json';
         var url_freezeSubmit = contextPath+'feeReimbursement/freezeSubmit.json'
         // var url_delete = contextPath + 'accrualParameter/deleteByPrimaryKey.json'


        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var Store = Data.Store,
            Columns = [
                {title: '月份',dataIndex:'yearmonth',width:100},
                {title: '经营机构', dataIndex: 'orgName', width: 100},
                {title:'理财经理',dataIndex:'staffName',width:100},
                {title: '上月结余',dataIndex:'',width:100},
                {title: '本月下发', dataIndex: 'monthIssueAmount', width: 100},
                {title:'杂项',dataIndex:'otherAmount',width:100},
                {id:'operationFee',title: '运营费用',dataIndex:'operationFee',width:100},
                {id:'allowance',title: '管理津贴', dataIndex: 'allowance', width: 100},
                {title:'可报销额度',dataIndex:'monthQuota',width:100},
                {title: '报销金额',dataIndex:'monthQuota',width:100},
                {title: '当月结余', dataIndex: 'balance', width: 100},
                {title:'当前状态',dataIndex:'status',width:100},
                {title:'备注',dataIndex:'',width:200}
            ];


        var store = new Store(
            {
                url: url_findByYearMonth,
                pageSize: 30,
                params: form1.serializeToObject(),
               // autoLoad: true,

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

            if($("#yearmonth").val()==""||$("#yearmonth").val==""){
                BUI.Message.Alert("年月份不能为空！")
            }else {
                var obj = form1.serializeToObject();
                obj.start = 0; // 返回第一页
                store.load(obj);
                return false;
            }

        })



        //update
        var submitReimbursementForm = new Form.HForm({
            srcNode: "#submitReimbursement"
        });
        submitReimbursementForm.render();
        var submitReimbursementDialog = new Overlay.Dialog({
            width: "50%",
            contentId: "content",
            buttons: [{
                text: "提交",
                elCls: "button button-primary",
                handler: function () {
                    submitReimbursementForm.valid();
                    if (!submitReimbursementForm.isValid()) {
                        return;
                    }

                    var obj = submitReimbursementForm.serializeToObject();
                    if (editFlag) {
                        obj.id = grid.getSelected().id;
                    }
                    obj.status = status;
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
                                submitReimbursementDialog.close();
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


        //运营审核和财务审核的时候弹出
        var auditReimbursementDialog = new Overlay.Dialog({
            width: "50%",
            contentId: "content",
            buttons: [{
                text: "通过",
                elCls: "button button-primary",
                handler: function () {
                    submitReimbursementForm.valid();
                    if (!submitReimbursementForm.isValid()) {
                        return;
                    }

                    var obj = submitReimbursementForm.serializeToObject();
                    if (editFlag) {
                        obj.id = grid.getSelected().id;
                    }
                    obj.status = status;
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
                                submitReimbursementDialog.close();
                            } else {
                                BUI.Message.Alert(result.msg, 'error');
                                return;
                            }
                        }
                    });
                    this.close();
                }
            },
                {
                    text: "驳回",
                    elCls: "button button-primary",
                    handler:function () {
                        submitReimbursementForm.valid();
                        if (!submitReimbursementForm.isValid()) {
                            return;
                        }
                        var obj = submitReimbursementForm.serializeToObject();
                        if (editFlag) {
                            obj.id = grid.getSelected().id;
                        }
                        obj.status = "CANCELED";
                        var url = url_update ;
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: obj,
                            success: function (result) {
                                if (result.success) {
                                    //将后台的对象不刷新页面，重新装载表格
                                    BUI.Message.Alert('操作成功！', 'success');
                                    store.load();
                                    submitReimbursementDialog.close();
                                } else {
                                    BUI.Message.Alert(result.msg, 'error');
                                    return;
                                }
                            }
                        });
                        this.close();

                    }
                },
                {
                text: '关闭',
                elCls: 'button',
                handler: function () {
                    this.close();
                }
            }]
        });


        $('#reimbursement').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
                $.ajax({
                    url: url_findByYearMonthAndStaffId,
                    data: record,
                    type: 'post',
                    success: function (result) {
                        if (result.success) {
                            if (result.value.submitStatus == 'READY') {
                                if(result.value.operaRemark==null || result.value.operaRemark ==''){
                                    $("#operaRemark").hide();
                                }else {
                                    $("input[name='operaRemark']").attr("readonly","readonly");
                                }
                                if(result.value.financialRemark==null||result.value.financialRemark==''){
                                    $("#financialRemark").hide();
                                }else {
                                    $("input[name='financialRemark']").attr("readonly","readonly");
                                }

                                submitReimbursementForm.setRecord(record);
                                editFlag = true;
                                status = 'INREVIEW';
                                submitReimbursementDialog.show();


                            } else {
                                BUI.Message.Alert("状态为'" + result.value.status + "'，不能提交报销");
                            }
                        }
                    }

                });



        });


        $('#operationalAudit').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
            $.ajax({
                url:url_findByYearMonthAndStaffId,
                data:record,
                type:'post',
                success:function (result) {
                    if(result.success){
                        if(result.value.status=='INREVIEW'){
                            $("input[name='remark']").attr("readonly","readonly")
                            $("input[name='financialRemark']").attr("readonly","readonly");
                            submitReimbursementForm.setRecord(record);
                            editFlag = true;
                            status = "INADUIT";
                            auditReimbursementDialog.show();
                        }else {
                            BUI.Message.Alert("状态为'" + result.value.status + "'，不能进行运营审核");
                        }
                    }
                }
            })



        });

        $('#financialAudit').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }

            $.ajax({
                url:url_findByYearMonthAndStaffId,
                data:record,
                type:'post',
                success:function (result) {
                    if(result.success){
                        if(result.value.status=='INADUIT'){
                            $("input[name='remark']").attr("readonly","readonly")
                            $("input[name='operaRemark']").attr("readonly","readonly");
                            submitReimbursementForm.setRecord(record);
                            editFlag = true;
                            status = "FINISHED";
                            auditReimbursementDialog.show();
                        }else {
                            BUI.Message.Alert("状态为'"+result.value.status+"'不能进行财务审核")
                        }
                    }
                }
            });


        });
        //通知报销并发送邮件，通知报销后理财经理可以发送邮件
        $("#noticeReimbursement").on('click',function () {
            var obj = form1.serializeToObject();
            obj.submitStatus = "READY";
            $.ajax({
                type:'post',
                url:url_senMail,
                data:obj,
                success:function (result){
                    if(result.success){
                        BUI.Message.Alert("发送成功");
                    }else {
                        BUI.Message.Alert("发送失败")
                    }
            }
            })
        })
        //冻结提交，冻结提交后理财经理不能再提交报销

        $("#freezeSubmit").on("click",function () {
            var obj = form1.serializeToObject();

            obj.submitStatus = "FROZEN";
            $.ajax({
                url:url_freezeSubmit,
                type:'post',
                data:obj,
                success:function (result) {
                    if(result.success){
                        BUI.Message.Alert("已冻结提交")
                    }
                }
            });
        });



        $("#cashAmount").change(function () {
            var cashAmount=0;
            var couponAmount=0;
            if($("#cashAmount").val()==null||$("#cashAmount").val()==''){
                cashAmount=0;
            }else {
                cashAmount= parseInt($("#cashAmount").val());
            }
            if($("#couponAmount").val()==null||$("#couponAmount").val()==''){
                couponAmount=0;
            }else {
                var couponAmount = parseInt($("#couponAmount").val());
            }

            var amount = $("#monthQuota").val()-cashAmount-(couponAmount*4500);
            $("#balance").val(amount);
        })

        $("#couponAmount").change(function () {
            var cashAmount=0;
            var couponAmount=0;
            if($("#cashAmount").val()==null||$("#cashAmount").val()==''){
                cashAmount=0;
            }else {
                cashAmount= parseInt($("#cashAmount").val());
            }
            if($("#couponAmount").val()==null||$("#couponAmount").val()==''){
                couponAmount=0;
            }else {
                var couponAmount = parseInt($("#couponAmount").val());
            }

            var amount = $("#monthQuota").val()-cashAmount-(couponAmount*4500);
            $("#balance").val(amount);
        })

    })