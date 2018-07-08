
var editFlag = true;
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";

        var url_findOnlineAndOflineInvest = contextPath + 'accrual/findOnlineAndOflineInvest.json';

        var url_update = contextPath + "accrual/updatePercentage.json";
        var url_create = contextPath + "accruaual/updatePercentage.json\";\n" +
            "        var url_create = contextPath + \"accrualPercentage/createAccrualPercentage.json";
        var url_delete = contextPath + "accrualPercentage/deleteByPrimaryKey.json"

        var url_findAccrualDetail = contextPath+"accrual/findAccrualDetail.json";
        var url_cal = contextPath+'accrual/addAccrual.json';

        /************************************************************************************************/






        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });




        form1.render();

        var Store = Data.Store,
            Columns = [
                {title:'id',dataIndex:'id',width:0},
                {title: '客户名称',dataIndex:'customerName',width:100},
                {title: '产品名称', dataIndex: 'productName', width: 200},
                {title:'预期收益',dataIndex:'rate',width:80},
                {title: '起息日期', dataIndex: 'timeSettled', width: 80},
                {title: '到期日期', dataIndex: 'finalTime', width: 80},
                {title: '期限', dataIndex: 'timeLimit', width: 50},
                {title: '是否循环', dataIndex: 'isCycle', width: 60},
                {title:'产品类型',dataIndex:'productType',width:100,renderer:function (value) {
                    if(value=="FIXED"){
                        return '固定收益';
                    }
                    else
                    {
                        return value;
                    }
                }},
                {title: '融资方', dataIndex: 'referred', width: 100},
                {title: '来源', dataIndex: 'onLineOrOffLine', width: 50,renderer:function (value) {
                   if(value=="01"){
                       return '线上'
                   }else{
                       return '线下'
                   }
                }},
                {title: '交易日期', dataIndex: 'tradDate', width: 100},
                {title: '状态', dataIndex: 'status', width: 50},
                {title: '投资金额', dataIndex: 'amount', width: 100},
                {title: '归属机构', dataIndex: 'orgName', width: 100},
                {title: '归属人', dataIndex: 'ownerName', width: 80},
                {title: '计提比例', dataIndex: 'percentage', width: 80,renderer:function (value) {
                    return (Math.round(value*10000)/100).toFixed(2)+"%";
                }},
                {title: '修正比例', dataIndex: 'updatePercentage', width: 80},
                {title: '提前赎回', dataIndex: 'initialAccrualAmount', width: 60,renderer:function (value) {
                    return '否'
                }},
                {title: '计提总金额', dataIndex: 'initialAccrualAmount', width: 100,renderer:function (value) {
                    return parseFloat(value).toFixed(2)
                }},
                {title: "计提明细",
                    dataIndex: "id",
                    renderer: function () {
                        return '<span class="grid-command btn-next">查看</span>';
                    },
                    width: "60px"},

            ];


        var store = new Store(
            {
                url: url_findOnlineAndOflineInvest,
                pageSize: 30,
                params: form1.serializeToObject(),
                //autoLoad: true,

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

            var a = $("#b_beginDate").val();
            var b = $("#b_endDate").val();
            var c = $("#onLineOrOffLine").val();
            if(a==null||a==""||b==null||b==""){
                BUI.Message.Alert("请选择起息日期！")
            }else if(c==null||c==''){
                BUI.Message.Alert("请选择来源");
            } else {
                var obj = form1.serializeToObject();
                //obj.start = 0; // 返回第一页
                store.load(obj);
                return false;
            }


        })


        $("#onLineOrOffLine").on("change", function (ev) {
            var onLineOrOffLine = $("#onLineOrOffLine").val();
            if (onLineOrOffLine == "offLine") {
                $("#status").hide();
            } else {
                $("#status").show();
            }
        })



        //update
        var accrualForm = new Form.HForm({
            srcNode: "#accrualForm"
        });
        accrualForm.render();
        var accrualDialog = new Overlay.Dialog({
            width: "78%",
            contentId: "content",
            buttons: [{
                text: "保存并计算",
                elCls: "button button-primary",
                handler: function () {
                    accrualForm.valid();
                    if (!accrualForm.isValid()) {
                        return;
                    }

                    var obj = accrualForm.serializeToObject();
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
                                accrualDialog.close();
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

            accrualForm.setRecord(record);


            editFlag = true;
            //productInfoDialog.set('title', '编辑产品信息');
            accrualDialog.show();
            //hideOrShow(record);
        });



        var accrualDetailColumns = [
            {title: '产品名称', dataIndex: 'productName', width: 80},
            {title: '开始时间', dataIndex: 'beginDate', width: 150},
            {title: '结束时间', dataIndex: 'endDate', width: 150},
            {title: '提前终止时间', dataIndex: '', width: 100},
            {title: '投资金额', dataIndex: 'amount', width: 100},
            {title: '计提比例', dataIndex: 'accrualPercentage', width: 125},
            {title: '修正比例', dataIndex: 'updatePercentage', width: 125},
            {title: '提前赎回', dataIndex: '', width: 125},
            {title: '计提金额', dataIndex: 'initialAccrualAmount', width: 125,renderer:function (value) {
                return parseFloat(value).toFixed(2)
            }},
            {title: '下发比例', dataIndex: 'monthIssuedPercentage', width: 125,renderer:function (value,obj) {
                if(obj.flag==0){
                    return value;
                }else if(obj.flag==1){
                    return 1-parseFloat(value);
                }
            }},
            {title: '下发月份', dataIndex: 'issuedMonth', width: 125},
        ];
        var accrualDetailStore = new Data.Store({
            url: url_findAccrualDetail,
            pageSize: 30,
            autoLoad: false
        });
        accrualDetailStore.on('exception', function (ev) {
            BUI.Message.Alert(ev.error, "error");
        });
        var accrualDetailGrid = new Grid.Grid({
            render: '#accrualDetailGrid',
            columns: accrualDetailColumns,
            width: '100%',
            height:'60%',
            loadMask: true,
            store: accrualDetailStore,
            bbar: {
                pagingBar: false
            },
            autoRender: true
        });
        accrualDetailGrid.render();
        var accrualDetailDialog = new Overlay.Dialog({
            width: "80%",
            title: "客户利息收益列表",
            contentId: "accrualDetailDialog",
            buttons: [{
                text: '关闭',
                elCls: 'button',
                handler: function () {
                    this.close();
                }
            }
            // , {
            //     text: '导出',
            //     elCls: 'button button-info',
            //     handler: function () {
            //         var id = grid.getSelected().id;
            //         window.open("../customerFee/downloadCustomerFee.json?id=" + id);
            //     }
            // }
            ]
        });
        grid.on("cellclick", function (ev) {
            var sender = $(ev.domTarget);
            var record = ev.record;
            if (sender.hasClass('btn-next')) {
                accrualDetailDialog.show();
                accrualDetailStore.load(record);
            }
        });


        $("#cal").on("click",function () {
            $.ajax({
                url :'../accrual/addAccrual.json',
                type:'post',
                data:form1.serializeToObject(),
                success:function () {
                    BUI.Message.Alert("计算成功");
                }

            })
        })



        $("#export").click(function () {

            var a = $("#b_beginDate").val();
            var b = $("#b_endDate").val();
            var c = $("#onLineOrOffLine").val();
            if(a==null||a==""||b==null||b==""){
                BUI.Message.Alert("请选择起息日期！")
            }else if(c==null||c==''){
                BUI.Message.Alert("请选择来源");
            } else {
                var obj = form1.serializeToObject();
                window.open("../accrual/exportInfo.json?onlineAndOfflineInvestCond=" + JSON.stringify(obj));
            }
        })


    });













