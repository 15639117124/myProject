
var editFlag = true;
var imgStr = "";//记录图片的base64字符串编码
var settlementOrLiquidation ="";//标示凭证图片对应的是起息结算还是到期清算
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree','bui/tab','bui/uploader'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree,Tab,Uploader) {
        var contextPath = "../";

        var url_findInvest = contextPath + 'managefeeParameter/findInvest.json';

        var url_financiers_findAll = contextPath+'financiers/findAll.json'

        var url_calculateByInvest = contextPath + "managefeeParameter/calculateByInvest.json";

        var url_managefeeParameter_findAll = contextPath+"managefeeParameter/findAll.json";

        var url_managefeeDetailfindAll = contextPath+"managefeeDetail/findAll.json";

        var url_findSumByRecord = contextPath+"managefeeDetail/findSumByRecord.json";

        var url_updateRecordInstitName = contextPath+"managefeeDetail/updateRecordInstitName.json";

        var url_managefeeDetailDelete = contextPath+"managefeeDetail/deleteByPrimaryKey.json";

        var url_findDays = contextPath+"managefeeParameter/findDays.json";

        var url_recordInstit_find = contextPath+"recordInstit/find.json";

        var url_updateSingleStatus = contextPath+"managefeeDetail/updateSingleStatus.json";

        var url_updateSettleBatch = contextPath+"managefeeDetail/updateSettleBatch.json";

        var url_updateLiquidationBatch = contextPath+"managefeeDetail/updateLiquidationBatch.json";

        var url_managefeeImg_findBySettlement = contextPath+"managefeeImg/findBySettlement.json"
        /************************************************************************************************/




        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });


        var managefeeParameterForm = new Form.HForm({
            srcNode: "#managefeeParameterForm"
        });


        form1.render();

        var Store = Data.Store,
            Columns = [
                {title: '产品名称',dataIndex:'productName',width:200},
                {title: '起息日期', dataIndex: 'beginDate', width: 100},
                {title: '期限',dataIndex:'tbeginDate',width:80,renderer:function (value,obj) {
                    return DateDiff(value,obj.tendDate);

                }},
                {title: '期限单位',dataIndex:'qxUnit',width:80,renderer:function (value) {
                    return '天'
                }},
                {title: '来源', dataIndex: 'onLineOrOffLine', width: 50},
                {title:'募集金额(元)',dataIndex:'amount',width:100,renderer:function (value) {
                    if(value==0){
                        return '';
                    }else {
                        return parseFloat(value).toFixed(0);
                    }
                }},
                {title: '募集类型',dataIndex:'productType',width:80},
                {title: '状态', dataIndex: 'status', width: 100}



            ];


        var store = new Store(
            {
                url: url_findInvest,
                pageSize: 30,
                params: managefeeParameterForm.serializeToObject(),
                //autoLoad: true,
                //root:'data'
                
            });

        //store.load();
        var grid = new Grid.Grid({
            render: '#productInfoGrid',
            columns: Columns,
            width: '100%',
            height:'20%',
            loadMask: true,

            store: store,
            // bbar: {
            //     pagingBar: true
            // }
            //plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });
        grid.render();
        var datas = [];
        $("#clear").on("click",function (ev) {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }

            alert('确定要移除吗!');

            store.remove(record);

            datas=store.findAll();

        })





        var Store = Data.Store,
            mainColumns = [
                {title: '起息日',dataIndex:'fromDate',width:80,elCls : 'center'},
                {title: '到期日', dataIndex: 'toDate', width: 80,elCls : 'center'},
                {title: '产品名称',dataIndex:'productName',width:120,elCls : 'center'},
                {title: '期限(天)', dataIndex: 'investDays', width: 60,elCls : 'center'},
                {title:'募集金额',dataIndex:'amount',width:80,elCls : 'center',renderer:function (value) {
                    if(value=='.00'){
                        return '0.00';
                    }else {
                        return value;
                    }
                }},
                {title: '总成本(%)',dataIndex:'costPropo',width:80,elCls : 'center',renderer:function (value) {
                    if(value>0)
                    {
                        return (Math.round(value * 10000)/100).toFixed(2) + '%';
                    }
                }},

                {title: '总成本', dataIndex: 'cost', width: 80,elCls : 'center'},
                {title:'备案费用',dataIndex:'registrationFee',width:60,elCls : 'center',renderer:function (value) {
                    if(value!=null){
                        return parseFloat(value).toFixed(2)
                    }
                }},
                {title:'起息应付',dataIndex:'fromDatePay',width:80,elCls : 'center',renderer:function (value) {
                    if(value=='.00'){
                        return '0.00';
                    }else {
                        return value;
                    }
                }},
                {title: '划转金额',dataIndex:'transferAmount',width:80,elCls : 'center',renderer:function (value) {
                    if(value=='.00'){
                        return '0.00';
                    }else {
                        return value;
                    }
                }},
                {title: '结算状态', dataIndex: 'settleStatus', width: 60,elCls : 'center',renderer:function (value) {
                    if(value=='UNPAID'){
                        return '未支付'
                    }else if(value=='PARTPAID'){
                        return '部分支付'
                    }else if(value=='PAID'){
                        return '<span class="label label-success">已支付</span>'
                    }
                }},
                {title:'结算凭证',dataIndex:'id',width:60,elCls : 'center',renderer:function (value,obj) {
                    if(obj.isSettlementImg==null){
                        return '未上传'
                    }else if(obj.isSettlementImg=="settlement"){
                        return '<span class="grid-command btn-next settlement">查看</span>';
                    }else if(obj.isSettlementImg=="last"){
                        return '';
                    }

                }},
                {title:'到期支付成本',dataIndex:'expiringCost',elCls : 'center',width:100,renderer:function (value) {
                    if(value=='.00'){
                        return '0.00';
                    }else {
                        return value;
                    }
                }},
                {title: '到期支付金额',dataIndex:'expiringAmount',width:100,elCls : 'center',renderer:function (value) {
                    if(value=='.00'){
                        return '0.00';
                    }else {
                        return value;
                    }
                }},
                {title: '清算状态', dataIndex: 'liquiStatus', width: 80,elCls : 'center',renderer:function (value) {
                    if(value=='UNPAID'){
                        return '未支付'
                    }else if(value=='PARTPAID'){
                        return '部分支付'
                    }else if(value=='PAID'){
                        return '<span class="label label-success">已支付</span>'
                    }
                }},
                {title:'清算凭证',dataIndex:'id',width:80,elCls : 'center',renderer:function (value,obj) {
                    if(obj.isLiquidationImg==null){
                        return '未上传'
                    }else if(obj.isLiquidationImg=="liquidation"){
                        return '<span class="grid-command btn-next liquidation">查看</span>';
                    }else if(obj.isLiquidationImg=="last"){
                        return '';
                    }

                }},
                {title:'募集类型',dataIndex:'type',elCls : 'center',width:80},
                {title: '来源',dataIndex:'source',elCls : 'center',width:50},
                {title: '备案名称', dataIndex: 'recordInstitNum',elCls : 'center', width: 80},
                {title:'备注',dataIndex:'settleRemark',width:200,elCls : 'center',renderer:function (value,obj) {
                    if(value==null||value==""&&obj.liquiRemark==null||obj.liquiRemark==""){
                        return '';
                    }else if(value==null||value==""){
                        return obj.liquiRemark
                    }else if(obj.liquiRemark==null||obj.liquiRemark==""){
                        return value;
                    }else if(value!=null&&value!=""&&obj.liquiRemark!=null&&obj.liquiRemark!=""){
                        return value+";"+obj.liquiRemark;
                    }
                }}
            ];



        var mainstore = new Store(
            {
                url: url_managefeeDetailfindAll,
                pageSize: 30,
                params: form1.serializeToObject(),
                autoLoad: true,

                //root:'data'

            });




        //store.load();
        var maingrid = new Grid.Grid({
            render: '#InfoGrid',
            columns: mainColumns,
            width: '100%',
            loadMask: true,
            store: mainstore,
            itemStatusFields: { //设置数据跟状态的对应关系
                selected: 'selected'
            },
            plugins: [Grid.Plugins.CheckSelection],
            autoRender: true

        });
        maingrid.render();


        mainstore.load(form1.serializeToObject());



        managefeeParameterForm.render();
        var managefeeParameterDialog = new Overlay.Dialog({
            width: "78%",

            contentId: "content",
            buttons: [{
                text:"匹配",
                elCls: "button button-primary",
                    handler:function () {

                        managefeeParameterForm.valid();
                        if (!managefeeParameterForm.isValid()) {
                            return;
                        }

                    var obj = managefeeParameterForm.serializeToObject();
                    obj.start = 0; // 返回第一页
                    store.load(obj,function (data) {
                        datas = data;


                    });


                }
            },
                {
                text: "保存",
                elCls: "button button-primary,parameterSave",
                handler:function () {
                    managefeeParameterForm.valid();
                    if (!managefeeParameterForm.isValid()) {
                        return;
                    }
                    var obj = managefeeParameterForm.serializeToObject();
                    // if (editFlag) {
                    //     obj.id = grid.getSelected().id;
                    // }
                    var obj1 = form1.serializeToObject();

                    var num = $("#num").val();
                    $.ajax({
                        type: "POST",
                        url: url_calculateByInvest,
                        //data: {"managefeeParameterCond":obj,"record":grid.getSelected()} ,
                        data:{"num":num,"record":JSON.stringify(datas)},
                        //data:obj,

                        success: function (result) {
                            if (result.success) {
                                //将后台的对象不刷新页面，重新装载表格
                                BUI.Message.Alert('操作成功！', 'success');
                                mainstore.load(obj1);


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







        $("#btnSearch").on("click",function () {
            //$("#dataInfo").trigger("click");
            var obj = form1.serializeToObject();
            obj.start = 0; // 返回第一页
            mainstore.load(obj);



        })



        $("#add").on('click',function () {
            editFlag = false;
            managefeeParameterDialog.show();
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


        $.ajax({
            url:url_managefeeParameter_findAll,

            type:'get',
            success:function (data) {

                    $.each(data.rows,function (i,item) {
                        $("#num").append("<option value='"+item.num+"'>"+item.num+"</option>");


                })
            }
        })

        $.ajax({
            url:url_recordInstit_find,

            type:'get',
            success:function (data) {

                $.each(data,function (i,item) {
                    $("#recordInstitNum").append("<option value='"+item.num+"'>"+item.recordName+"</option>");


                })
            }
        })



        queryDays();

        $("#onlineFinanciersid").on("change",function () {
            queryDays();
        });
        $("#qxDate").on("change",function () {
            queryDays();
        });


        function queryDays() {
            $("select[name='qxDays']").empty();
            $("select[name='qxDays']").append("<option value=''>请选择</option>")
            var financiersCode = $("#onlineFinanciersid").val();
            var qxDate = $("#qxDate").val();
            $.ajax({
                url:url_findDays,
                data:{"financiersCode":financiersCode,"qxDate":qxDate},
                success:function (data) {
                    $.each(data,function (i,item) {
                        $("select[name='qxDays']").append("<option value='"+item.qxDays+""+item.qxUnit+"'>"+item.qxDays+""+item.qxUnit+"</option>")

                    })

                }
            })

        }






        //汇总相关控件
        var tab = new Tab.TabPanel({
            srcNode : '#tab',
            elCls : 'nav-tabs',
            itemStatusCls : {
                'selected' : 'active'
            },
            panelContainer : '#panel'//如果不指定容器的父元素，会自动生成
            //selectedEvent : 'mouseenter',//默认为click,可以更改事件

        });

        tab.render();

        $("#dataInfo").click(function () {
            var obj = form1.serializeToObject();
            obj.start = 0; // 返回第一页
            mainstore.load(obj);
        })


        $("#exportInfo").click(function () {

            var obj = form1.serializeToObject();

            window.open("../managefeeDetail/exportInfo.json?managefeeDetailCond=" + JSON.stringify(obj));


        })


        $("#dataSum").click(function () {
            var obj = form1.serializeToObject();
            obj.start = 0; // 返回第一页
            sumMainstore.load(obj);
        })


        $("#exportSum").click(function () {

            var obj = form1.serializeToObject();


                window.open("../managefeeDetail/exportSum.json?managefeeDetailCond=" + JSON.stringify(obj));


        })






        var Store = Data.Store,
            sumMainColumns = [
                {title: '备案名称',dataIndex:'recordInstit',width:200},
                {title: '融资方', dataIndex: 'financiersReferred', width: 100},
                {title: '起息日',dataIndex:'fromDate',width:100},
                {title: '到期日',dataIndex:'toDate',width:100},
                {title: '期限', dataIndex: 'days', width: 100},
                {title: '管理费用规则',dataIndex:'managefeeParameterNum',width:120},
                {title: '募集类型',dataIndex:'type',width:100},
                {title: '募集金额(元)', dataIndex: 'sumamount', width: 100,renderer:function (value) {
                    if(value!=null && value!=''){
                        return parseFloat(value).toFixed(2)
                    }
                }},
                {title:'资金总成本(元)',dataIndex:'sumcost',width:100,renderer:function (value) {
                    if(value!=null && value!=''){
                        return parseFloat(value).toFixed(2)
                    }
                }},
                {title: '起息应付',dataIndex:'fromDatePay',width:100,renderer:function (value) {
                    if(value!=null && value!=''){
                        return parseFloat(value).toFixed(2)
                    }
                }},
                {title: '备案费',dataIndex:'registrationFee',width:100,renderer:function (value) {
                    if(value!=null && value!=''){
                        return parseFloat(value).toFixed(2)
                    }
                }},
                {title: '划转金额',dataIndex:'transferAmount',width:100,renderer:function (value) {
                    if(value!=null && value!=''){
                        return parseFloat(value).toFixed(2)
                    }
                }},
                {title: '结算状态',dataIndex:'settleStatus',width:100,renderer:function (value) {
                    if(value=='UNPAID'){
                        return '未支付'
                    }else if(value=='PARTPAID'){
                        return '部分支付'
                    }else if(value=='PAID'){
                        return '已支付'
                    }
                }},
                {title: '到期支付成本',dataIndex:'expiringCost',width:100,renderer:function (value) {
                    if(value!=null && value!=''){
                        return parseFloat(value).toFixed(2)
                    }
                }},
                {title: '到期支付金额',dataIndex:'expiringAmount',width:100,renderer:function (value) {
                    if(value!=null && value!=''){
                        return parseFloat(value).toFixed(2)
                    }
                }},

                {title: '清算状态',dataIndex:'liquiStatus',width:100,renderer:function (value) {
                    if(value=='UNPAID'){
                        return '未支付'
                    }else if(value=='PARTPAID'){
                        return '部分支付'
                    }else if(value=='PAID'){
                        return '已支付'
                    }
                }},

            ];


        var sumMainstore = new Store(
            {
                url: url_findSumByRecord,
                pageSize: 30,
                params: form1.serializeToObject(),
                //autoLoad: true,
                //root:'data'

            });

        //store.load();
        var sumMaingrid = new Grid.Grid({
            render: '#InfoGrid2',
            columns: sumMainColumns,
            width: '100%',
            loadMask: true,
            store: sumMainstore,
            bbar: {
                pagingBar: true
            }
            //plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });
        sumMaingrid.render();



        //内部核算相关控件
        var Store = Data.Store,
            internalAccountColumns = [
                {title:'融资方',dataIndex:'financiersReferred',width:100},
                {title: '起息日',dataIndex:'fromDate',width:100},
                {title: '到期日', dataIndex: 'toDate', width: 100},
                {title:'募集金额(元)',dataIndex:'amount',width:100,renderer:function (value) {
                    if(value=='.00'){
                        return '0.00';
                    }else {
                        return value;
                    }
                }},
                {title: '总成本(%)',dataIndex:'costPropo',width:80,renderer:function (value) {
                    if(value>0)
                    {
                        return (Math.round(value * 10000)/100).toFixed(2) + '%';
                    }
                }},
                {title: '总成本(元)', dataIndex: 'cost', width: 100},
                {title:'年化收益率(%)',dataIndex:'rate',width:100},
                {title:'投资天数',dataIndex:'investDays',width:100},
                {title:'产品利息',dataIndex:'productInterest',width:100},

                {title: '管理费(元)', dataIndex: 'managementFee', width: 100},
                {title:'承销费(元)',dataIndex:'underwritingFee',width:100},
                {title:'备案费率（%）',dataIndex:'registrationFeePropo',width:100},
                {title:'备案费(元)',dataIndex:'registrationFee',width:100}


            ];



        var internalAccountstore = new Store(
            {
                url: url_managefeeDetailfindAll,
                pageSize: 30,
                params: form1.serializeToObject(),
                //autoLoad: true,

                //root:'data'

            });




        //store.load();
        var internalAccountgrid = new Grid.Grid({
            render: '#InfoGrid3',
            columns: internalAccountColumns,
            width: '100%',
            //loadMask: true,
            store: internalAccountstore,

            //plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });
        internalAccountgrid.render();

        $("#internalAccount").click(function () {
            var obj = form1.serializeToObject();
            obj.start = 0; // 返回第一页
            internalAccountstore.load(obj);
        })





        $("#exportInternalAccount").click(function () {
            var obj = form1.serializeToObject();
            window.open("../managefeeDetail/exportInternalAccount.json?managefeeDetailCond=" + JSON.stringify(obj));
        })

        $("#exportSumInternalAccount").click(function () {
            var obj = form1.serializeToObject();
            window.open("../managefeeDetail/exportSumInternalAccount.json?managefeeDetailCond=" + JSON.stringify(obj));


        })



        $('#edit').on('click', function () {
            var record = maingrid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择至少一条数据!', 'warning');
                return;
            }
            var editArr = [];
            var items = maingrid.getItems();
            for (var i = 0; i < items.length; i++) {
                var entry = items[i];

                if (entry.selected ) {
                    editArr.push(entry.id);
                }
            }

            if (editArr.length == 0) {// 无修改项， 不需要触发后台操作
                return;
            }

            // managefeeInfoForm.setRecord(record);
            //
            // if($("select[name='liquiStatus']").val()=="PAID"){
            //     BUI.Message.Alert("本产品已经清算完毕，不支持修改")
            //     return;
            // }
            // if($("select[name='liquiStatus']").val()!="PAID"&&$("select[name='settleStatus']").val()=="PAID"){
            //     $("select[name='settleStatus']").attr("disabled","disabled");
            //     $("input[name='ownerNo']").attr("readonly","readonly");
            //     $("input[name='remark']").attr("readonly","readonly");
            // }
            //
            // $('#accruedCode').attr("readonly", "readonly");
            editFlag = true;
            //productInfoDialog.set('title', '编辑产品信息');
            managefeeInfoDialog.show();
            //hideOrShow(record);

        });



        var managefeeInfoForm = new Form.HForm({
            srcNode: "#managefeeInfoForm"
        });
        managefeeInfoForm.render();
        var managefeeInfoDialog = new Overlay.Dialog({
            width: "78%",
            contentId: "contentInfo",
            buttons: [
                {
                    text: "保存",
                    elCls: "button button-primary",
                    handler: function () {


                        var obj = managefeeInfoForm.serializeToObject();
                        obj.id = maingrid.getSelected().id;
                        // if (editFlag) {
                        //     obj.id = grid.getSelected().id;
                        // }
                        var obj1 = form1.serializeToObject();

                        var recordInstitNum = $("#recordInstitNum").val();
                        var editArr = [];
                        var items = maingrid.getItems();
                        for (var i = 0; i < items.length; i++) {
                            var entry = items[i];

                            if (entry.selected ) {
                                editArr.push(entry.id);
                            }
                        }

                        $.ajax({
                            type: "POST",
                            url: url_updateRecordInstitName,
                            data: {editArr:JSON.stringify(editArr),recordInstitNum:recordInstitNum},
                            success: function (result) {
                                if (result.success) {
                                    //将后台的对象不刷新页面，重新装载表格
                                    BUI.Message.Alert('操作成功！', 'success');
                                    mainstore.load(obj1);
                                    //grid.render();
                                    managefeeInfoDialog.close();
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





        $("#delete").on("click",function () {
            var record = maingrid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }


            alert("确定要删除吗？");

            var id = maingrid.getSelected().id;
            $.ajax({
                type:'post',
                url:url_managefeeDetailDelete,
                data:{id:id},
                success:function (result) {
                    if(result.success){
                        BUI.Message.Alert("删除成功")
                        mainstore.load();
                    }else {
                        BUI.Message.Alert("删除失败");
                    }
                }
            });
            
        })




        //单笔/批量编辑起息结算
        var editSettleForm = new Form.HForm({
            srcNode: "#editSettleForm"
        });


        $("#settle").on("click",function () {
            // $("#liquidationStatusButton").on("click",function () {
            //     $("#editSettleRoot").empty()
            // })
            var record = maingrid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择至少一条数据!', 'warning');
                return;
            }
            var editArr = [];
            var sumFromDatePay = 0;
            var sumFromDateAmount = 0;
            var items = maingrid.getItems();

            for (var i = 0; i < items.length; i++) {
                var entry = items[i];
                if (entry.selected ) {
                    if(entry.settleStatus=="PAID"){
                        BUI.Message.Alert("产品"+entry.productName+"已经完成结算，不能进行此操作！")
                        return false;
                    }
                    editArr.push(entry.id);
                    sumFromDatePay+=parseFloat(entry.fromDatePay);
                    if(entry.fromDateAmount!=null&&entry.fromDateAmount!=""){

                        sumFromDateAmount+=parseFloat(entry.fromDateAmount);
                    }

                }
            }
            if (editArr.length == 0) {// 无修改项， 不需要触发后台操作
                return;
            }else if(editArr.length==1){
                editSettleForm.setRecord(record);
                $("#editSettleForm input[name=productName]").attr("readonly","readonly");
                $("#editSettleForm input[name=fromDate]").attr("readonly","readonly");
                $("#editSettleForm input[name=toDate]").attr("readonly","readonly");
                $("#editSettleForm input[name=amount]").attr("readonly","readonly");
                $("#editSettleForm input[name=investDays]").attr("readonly","readonly");
                $("#editSettleForm input[name=cost]").attr("readonly","readonly");
                $("#editSettleForm input[name=fromDatePay]").attr("readonly","readonly");
                //$("#liquidationStatusRoot").remove();
                $("#upload").remove();
                $("#editSettleFormUpload").append('<div id="upload" class="row-fluid show-grid">\n' +
                    '            <div id="zyupload"  class="zyupload" style="margin-left: 10px">\n' +
                    '\n' +
                    '            </div>\n' +
                    '            \n' +
                    '\n' +
                    '        </div>')
                initzyupload();
                editSettleDialog.show();
            }else if(editArr.length>1){
                $("#editSettleBatchForm input[name=sumFromDatePay]").val(sumFromDatePay.toFixed(2)).attr("readonly","readonly");
                $("#editSettleBatchForm input[name=sumFromDateAmount]").val(sumFromDatePay.toFixed(2)).attr("readonly","readonly");
                $("#upload").remove();
                $("#editSettleBatchFormUpload").append('<div id="upload" class="row-fluid show-grid">\n' +
                    '            <div id="zyupload"  class="zyupload" style="margin-left: 10px">\n' +
                    '\n' +
                    '            </div>\n' +
                    '            \n' +
                    '\n' +
                    '        </div>')
                initzyupload();
                editSettleBatchDialog.show();
            }





        })


        //单笔编辑起息结算弹出框
        editSettleForm.render();
        var editSettleDialog = new Overlay.Dialog({
            width: "78%",
            contentId: "editSettle",
            buttons: [
                {
                    text: "保存",
                    elCls: "button button-primary",
                    handler: function () {


                        var obj = editSettleForm.serializeToObject();
                        obj.imgStr=imgStr;
                        settlementOrLiquidation = "settlement"
                        obj.settlementOrLiquidation = settlementOrLiquidation;
                        obj.id = maingrid.getSelected().id;
                        // if (editFlag) {
                        //     obj.id = grid.getSelected().id;
                        // }
                        var obj1 = form1.serializeToObject();



                        $.ajax({
                            type: "POST",
                            url: url_updateSingleStatus,
                            data: obj,
                            success: function (result) {
                                if (result.success) {
                                    //将后台的对象不刷新页面，重新装载表格
                                    BUI.Message.Alert('操作成功！', 'success');
                                    mainstore.load(obj1);
                                    //grid.render();
                                    editSettleDialog.close();
                                    $("#upload").remove();
                                    imgStr = "";//编辑成功后将此状态设置为空
                                    settlementOrLiquidation ="";//编辑成功后将此状态设置为空
                                } else {
                                    $("#upload").remove();
                                    imgStr = ""
                                    BUI.Message.Alert(result.msg, 'error');
                                    return false;
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


        //单笔/批量编辑到期清算
        var liquidationStatusForm = new Form.HForm({
            srcNode: "#liquidationStatusForm"
        });

       $("#liquidation").on("click",function () {
           var record = maingrid.getSelected();
           if (!record) {
               BUI.Message.Alert('请选择至少一条数据!', 'warning');
               return;
           }

           var editArr = [];
           var sumExpiringAmount = 0;
           var sumEndDateAmount = 0;
           var items = maingrid.getItems();

           for (var i = 0; i < items.length; i++) {
               var entry = items[i];
               if (entry.selected ) {
                   if(entry.settleStatus!="PAID"){
                       BUI.Message.Alert("产品"+entry.productName+"没有完成结算，不能进行此操作！")
                       return false;
                   }
                   editArr.push(entry.id);
                   if(entry.expiringAmount!=null&&entry.expiringAmount!=""){
                       sumExpiringAmount+=parseFloat(entry.expiringAmount);
                   }

                   if(entry.endDateAmount!=null&&entry.endDateAmount!=""){
                       sumEndDateAmount+=parseFloat(entry.endDateAmount);
                   }

               }
           }
           if(editArr.length>1){

               $("#editLiquidationBatchForm input[name=sumExpiringAmount]").val(sumExpiringAmount.toFixed(2)).attr("readonly","readonly");
               $("#editLiquidationBatchForm input[name=sumEndDateAmount]").val(sumEndDateAmount.toFixed(2)).attr("readonly","readonly");
               $("#upload").remove();
               $("#editLiquidationBatchFormUpload").append('<div id="upload" class="row-fluid show-grid">\n' +
                   '            <div id="zyupload"  class="zyupload" style="margin-left: 10px">\n' +
                   '\n' +
                   '            </div>\n' +
                   '            \n' +
                   '\n' +
                   '        </div>')
               initzyupload();
               editLiquidationBatchDialog.show()
           }else if(editArr.length==1&&record.settleStatus=="PAID"){
               liquidationStatusForm.setRecord(record);
               $("#liquidationStatusForm input[name=productName]").attr("readonly","readonly");
               $("#liquidationStatusForm input[name=fromDate]").attr("readonly","readonly");
               $("#liquidationStatusForm input[name=toDate]").attr("readonly","readonly");
               $("#liquidationStatusForm input[name=amount]").attr("readonly","readonly");
               $("#liquidationStatusForm input[name=investDays]").attr("readonly","readonly");
               $("#liquidationStatusForm input[name=cost]").attr("readonly","readonly");
               $("#liquidationStatusForm input[name=fromDatePay]").attr("readonly","readonly");
               $("#liquidationStatusForm input[name=settleStatus]").val("已支付").attr("readonly","readonly");
               $("#liquidationStatusForm input[name=expiringAmount]").attr("readonly","readonly");
               $("#upload").remove();
               $("#liquidationStatusFormUpload").append('<div id="upload" class="row-fluid show-grid">\n' +
                   '            <div id="zyupload"  class="zyupload" style="margin-left: 10px">\n' +
                   '\n' +
                   '            </div>\n' +
                   '            \n' +
                   '\n' +
                   '        </div>')
               initzyupload();
               liquidationStatusDialog.show();
           }


       })



        //修改到期清算状态代码
        liquidationStatusForm.render();
        var liquidationStatusDialog = new Overlay.Dialog({
            width: "78%",
            contentId: "liquidationStatus",
            buttons: [
                {
                    text: "保存",
                    elCls: "button button-primary",
                    handler: function () {


                        var obj = liquidationStatusForm.serializeToObject();
                        obj.imgStr=imgStr;
                        settlementOrLiquidation = "liquidation"
                        obj.settlementOrLiquidation = settlementOrLiquidation;
                        obj.id = maingrid.getSelected().id;
                        // if (editFlag) {
                        //     obj.id = grid.getSelected().id;
                        // }
                        var obj1 = form1.serializeToObject();



                        $.ajax({
                            type: "POST",
                            url: url_updateSingleStatus,
                            data: obj,
                            success: function (result) {
                                if (result.success) {
                                    //将后台的对象不刷新页面，重新装载表格
                                    BUI.Message.Alert('操作成功！', 'success');
                                    mainstore.load(obj1);
                                    //grid.render();
                                    liquidationStatusDialog.close();
                                    $("#upload").remove();
                                    imgStr = "";//编辑成功后将此状态设置为空
                                    settlementOrLiquidation ="";//编辑成功后将此状态设置为空
                                } else {
                                    $("#upload").remove();
                                    imgStr = ""
                                    BUI.Message.Alert(result.msg, 'error');
                                    return false;
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


        //批量编辑起息结算的弹出框
        var editSettleBatchForm = new Form.HForm({
            srcNode: "#editSettleBatchForm"
        });
        editSettleBatchForm.render();

        var editSettleBatchDialog = new Overlay.Dialog({
            width: "78%",
            contentId: "editSettleBatch",
            buttons: [
                {
                    text: "保存",
                    elCls: "button button-primary",
                    handler: function () {


                        var obj = editSettleBatchForm.serializeToObject();
                        obj.id = maingrid.getSelected().id;
                        // if (editFlag) {
                        //     obj.id = grid.getSelected().id;
                        // }
                        var obj1 = form1.serializeToObject();

                        var settleStatus = $("#editSettleBatchForm select[name=settleStatus]").val();
                        var settleRemark = $("#editSettleBatchForm input[name=settleRemark]").val();
                        var editArr = [];
                        var items = maingrid.getItems();
                        var imgBase64=imgStr;
                        var settlementOrLiquidation = "settlement"
                        for (var i = 0; i < items.length; i++) {
                            var entry = items[i];

                            if (entry.selected ) {
                                editArr.push(entry.id);
                            }
                        }

                        $.ajax({
                            type: "POST",
                            url: url_updateSettleBatch,
                            data: {
                                editArr:JSON.stringify(editArr),
                                settleStatus:settleStatus,
                                settleRemark:settleRemark,
                                imgBase64:imgBase64,
                                settlementOrLiquidation:settlementOrLiquidation
                            },
                            success: function (result) {
                                if (result.success) {
                                    //将后台的对象不刷新页面，重新装载表格
                                    BUI.Message.Alert('操作成功！', 'success');
                                    mainstore.load(obj1);
                                    //grid.render();
                                    $("#upload").remove();
                                    imgStr = ""
                                    editSettleBatchDialog.close();
                                } else {
                                    imgStr = ""
                                    $("#upload").remove();
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




        //批量编辑到期清算的弹出框
        var editLiquidationBatchForm = new Form.HForm({
            srcNode: "#editLiquidationBatchForm"
        });
        editLiquidationBatchForm.render();
        var editLiquidationBatchDialog = new Overlay.Dialog({
            width: "78%",
            contentId: "editLiquidationBatch",
            buttons: [
                {
                    text: "保存",
                    elCls: "button button-primary",
                    handler: function () {


                        var obj = editLiquidationBatchForm.serializeToObject();
                        obj.id = maingrid.getSelected().id;
                        // if (editFlag) {
                        //     obj.id = grid.getSelected().id;
                        // }
                        var obj1 = form1.serializeToObject();

                        var liquiStatus = $("#editLiquidationBatchForm select[name=liquiStatus]").val();
                        var liquiRemark = $("#editLiquidationBatchForm input[name=liquiRemark]").val();

                        var imgBase64=imgStr;
                        var settlementOrLiquidation = "liquidation"


                        var editArr = [];
                        var items = maingrid.getItems();
                        for (var i = 0; i < items.length; i++) {
                            var entry = items[i];

                            if (entry.selected ) {
                                editArr.push(entry.id);
                            }
                        }

                        $.ajax({
                            type: "POST",
                            url: url_updateLiquidationBatch,
                            data: {
                                editArr:JSON.stringify(editArr),
                                liquiStatus:liquiStatus,
                                liquiRemark:liquiRemark,
                                imgBase64:imgBase64,
                                settlementOrLiquidation:settlementOrLiquidation
                            },
                            success: function (result) {
                                if (result.success) {
                                    //将后台的对象不刷新页面，重新装载表格
                                    BUI.Message.Alert('操作成功！', 'success');
                                    mainstore.load(obj1);
                                    //grid.render();
                                    $("#upload").remove();
                                    imgStr = ""
                                    editLiquidationBatchDialog.close();
                                } else {
                                    $("#upload").remove();
                                    imgStr = ""
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






        var showImgDialog = new Overlay.Dialog({
            width: "80%",
            height:"80%",
            title: "凭证",
            contentId: "show",
            autoRender:false,
            buttons: [{
                text: '关闭',
                elCls: 'button',
                handler: function () {

                    this.close();

                }
            }]
        });
        maingrid.on("cellclick", function (ev) {
            var sender = $(ev.domTarget);
            var record = ev.record;
            if (sender.hasClass('settlement')) {
                record.settlementOrLiquidation = "settlement";
                $("#showImg").empty();
                $.ajax({

                    type: "POST",
                    url: url_managefeeImg_findBySettlement,
                    data: record,
                    async: false,
                    success: function (result) {

                                $.each(result,function (i,item) {

                                var imgBase64 = "data:image/png;base64,"+item.baseImg;
                                var img = $("<img>");
                                img.attr("src",imgBase64);
                                $("#showImg").append(img);

                            })

                            showImgDialog.show();

                    }
                });


            }else if(sender.hasClass('liquidation')){
                record.settlementOrLiquidation = "liquidation";
                $("#showImg").empty();
                $.ajax({
                    type: "POST",
                    url: url_managefeeImg_findBySettlement,
                    data: record,
                    async: false,
                    success: function (result) {
                        $.each(result,function (i,item) {
                            var imgBase64 = "data:image/png;base64,"+item.baseImg;
                            var img = $("<img style='width: 200px' height='200px'>");
                            img.attr("src",imgBase64);
                            $("#showImg").append(img);

                        })
                        showImgDialog.show();

                    }
                });

            }
        });

    });



//比较两个日期（格式："2017-12-14"）相差的天数
function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays
    aDate  =  sDate1.split("-")
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
    aDate  =  sDate2.split("-")
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
    return  iDays
}







function initzyupload() {


        // 初始化插件
        $("#zyupload").zyUpload({
            width            :   "650px",                 // 宽度
            height           :   "400px",                 // 宽度
            itemWidth        :   "140px",                 // 文件项的宽度
            itemHeight       :   "115px",                 // 文件项的高度
            url              :   "../managefeeDetail/uploadFlie.json",  // 上传文件的路径
            fileType         :   ["jpg","png","js","exe"],// 上传文件的类型
            fileSize         :   51200000,                // 上传文件的大小
            multiple         :   false,                    // 是否可以多个文件上传

            dragDrop         :   true,                    // 是否可以拖动上传文件
            tailor           :   true,                    // 是否可以裁剪图片
            del              :   true,                    // 是否可以删除文件
            finishDel        :   false,  				  // 是否在上传文件完成后删除预览
            /* 外部获得的回调接口 */
            onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                console.info("当前选择了以下文件：");
                console.info(selectFiles);
            },
            onDelete: function(file, files){              // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
                console.info("当前删除了此文件：");
                console.info(file.name);
            },

            onSuccess: function(file, response){          // 文件上传成功的回调方法
                console.info("此文件上传成功：");
                console.info(file.name);
                console.info("此文件上传到服务器地址：");
                console.info(response);
                //$("#uploadInf").append("<p>上传成功，文件地址是：" + response + "</p>");

                if(imgStr!=""){
                    response = ","+response;
                }
                imgStr = imgStr+response;




            },
            onFailure: function(file, response){          // 文件上传失败的回调方法
                console.info("此文件上传失败：");
                console.info(file.name);
            },
            onComplete: function(response){           	  // 上传完成的回调方法
                console.info("文件上传完成");
                console.info(response);
            }
        });


}






// var editSettleImgStr = "";
// $(function(){
//     // 初始化插件
//     $("#editSettleUpload").zyUpload({
//         width            :   "650px",                 // 宽度
//         height           :   "400px",                 // 高度
//         itemWidth        :   "140px",                 // 文件项的宽度
//         itemHeight       :   "115px",                 // 文件项的高度
//         url              :   "../managefeeDetail/uploadFlie.json",  // 上传文件的路径
//         fileType         :   ["jpg","png","js","exe"],// 上传文件的类型
//         fileSize         :   51200000,                // 上传文件的大小
//         multiple         :   false,                    // 是否可以多个文件上传
//
//         dragDrop         :   true,                    // 是否可以拖动上传文件
//         tailor           :   true,                    // 是否可以裁剪图片
//         del              :   true,                    // 是否可以删除文件
//         finishDel        :   false,  				  // 是否在上传文件完成后删除预览
//         /* 外部获得的回调接口 */
//         onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
//             console.info("当前选择了以下文件：");
//             console.info(selectFiles);
//         },
//         onDelete: function(file, files){              // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
//             console.info("当前删除了此文件：");
//             console.info(file.name);
//         },
//
//         onSuccess: function(file, response){          // 文件上传成功的回调方法
//             console.info("此文件上传成功：");
//             console.info(file.name);
//             console.info("此文件上传到服务器地址：");
//             console.info(response);
//             $("#uploadInf").append("<p>上传成功，文件地址是：" + response + "</p>");
//             if(imgStr!=null){
//                 response = ","+response;
//             }
//             imgStr = imgStr+response;
//             //$("#staging").clear();
//             $("#staging").append("<p id = 'imgString'>"+imgStr+"</p>")
//
//
//         },
//         onFailure: function(file, response){          // 文件上传失败的回调方法
//             console.info("此文件上传失败：");
//             console.info(file.name);
//         },
//         onComplete: function(response){           	  // 上传完成的回调方法
//             console.info("文件上传完成");
//             console.info(response);
//         }
//     });
//
// });
