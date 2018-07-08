
var editFlag = true;
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";

        var url_findAll = contextPath + 'product/findProductOnAccrual.json';

        var url_update = contextPath + "product/updateOnLineOrOffLineProduct.json";
        var url_create = contextPath + "accrualPercentage/createAccrualPercentage.json";
        var url_delete = contextPath + "product/deleteOnLineOrOffLineProduct.json";
        var url_percentage_findAll = contextPath+"accrualPercentage/findAll.json";

        /************************************************************************************************/



        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });


        form1.render();

        var Store = Data.Store,
            Columns = [
                {title: '产品代码',dataIndex:'productId',width:300},
                {title: '产品名称', dataIndex: 'productName', width: 150},
                {title:'起息日期',dataIndex:'qxDate',width:80},
                {title:'到期日期',dataIndex:'dqDate',width:80},
                {title:'产品期限',dataIndex:'qxDays',width:80,renderer:function (value,obj) {
                    if(obj.qxUnit=='Y'){
                        return value+'年';
                    }else if(obj.qxUnit=='M'){
                        return value+'月';
                    }else {
                        return value+'天';
                    }
                }},
                {title:'预期收益率',dataIndex:'productId',width:80,renderer:function (value,obj){
                    if(obj.onLineOrOffLine == "线上"){
                        return ((obj.rate)/100).toFixed(2) + '%';
                        
                    }
                    return '<a href="../../product/productPreProfit.html?productId=' + value + '">查看</a>';
                }},
                {title:'是否循环',dataIndex:'redeemOpenType',width:60,renderer:function (value) {
                    if(value=='开放'){
                        return '是'
                    }else {
                        return '否'
                    }
                }},
                {title:'产品类型',dataIndex:'productType',width:100,renderer:function (value) {
                    if(value=="FIXED"){
                        return '固定收益';
                    }
                    else
                    {
                        return value;
                    }
                }},
                {title:'融资方编号',dataIndex:'financiersCode',width:100},
                {title:'来源',dataIndex:'onLineOrOffLine',width:100,renderer:function (value) {
                    if(value=="线上"){
                        return '线上'
                    }else {
                        return '线下'
                    }
                }},
                {title:'状态',dataIndex:'status',width:100,renderer:function (value) {
                    if(value=="SCHEDULED"){
                        return '预热';
                    }else if(value=="OPENED"){
                        return '售卖中';
                    }else if(value=="FINISHED"){
                        return '已售罄';
                    }else if(value=="FAILED"){
                        return '已售罄';
                    }else if(value=="SETTLED"){
                        return '计息中';
                    }else if(value=="CLEARED"){
                        return '已结息';
                    }else if(value=="OVERDUE"){
                        return '待收款';
                    }else if(value=="BREACH"){
                        return '待收款'
                    }else if(value=="CANCELED"){
                        return '已取消'
                    }

                }},
                {title:'计提比例',dataIndex:'accrualPercentageCode',width:100}
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




        var accrualProductForm = new Form.HForm({
            srcNode: "#accrualProductForm"
        });
        accrualProductForm.render();
        var accrualProductDialog = new Overlay.Dialog({
            width: "78%",
            contentId: "content",
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {
                    accrualProductForm.valid();
                    if (!accrualProductForm.isValid()) {
                        return;
                    }

                    var obj = accrualProductForm.serializeToObject();
                    if (editFlag) {
                        obj.id = grid.getSelected().id;
                    }

                    //var url = editFlag ? url_update  : url_create;
                    var url = url_update;

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
                                accrualProductDialog.close();
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

            accrualProductForm.setRecord(record);
            $('#productId').attr("readonly", "readonly");
            $('#productName').attr("readonly", "readonly");
            $('#qxDate').attr("readonly", "readonly");
            $('#dqDate').attr("readonly", "readonly");
            $('#qxDays').attr("readonly", "readonly");
            $('#detailRate').attr("readonly", "readonly");
            $('#redeemOpenType').attr("readonly", "readonly");
            $('#productType').attr("readonly", "readonly");
            $('#financiersCode').attr("readonly", "readonly");
            $('#onLineOrOffLine').attr("readonly", "readonly");
            $('#status').attr("readonly", "readonly");

            editFlag = true;
            //productInfoDialog.set('title', '编辑产品信息');
            accrualProductDialog.show();
            //hideOrShow(record);

        });


        $("#delete").on("click",function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }


            alert("确定要删除吗？");

            var productId = grid.getSelected().productId;
            var onLineOrOffLine = grid.getSelected().onLineOrOffLine;
            var obj = accrualProductForm.serializeToObject();
            $.ajax({
                type:'post',
                url:url_delete,
                data:{productId:productId,onLineOrOffLine:onLineOrOffLine},
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
            url:url_percentage_findAll,
            type:'get',
            success:function (result) {
                $.each(result,function (i,item) {
                    $("#accrualPercentageCode").append("<option value='"+item.accruedCode+"'>"+item.accruedCode+"</option>")
                })

            }
        })


    });













