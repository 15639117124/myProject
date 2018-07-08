BUI.use(['bui/form', 'bui/grid', 'bui/data','bui/overlay'],
    function (Form, Grid, Data,Overlay) {
        var contextPath = "../";
        var url_query  = contextPath+"tradeTdaysInfo/queryRedeemProductInfo.json";
        var url_queryRedeem= contextPath+"product/queryOneDateInfo.json";
        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var Store = Data.Store, productInfoColumns = [
            {title: '产品代码', dataIndex: 'productId', width: 200,renderer:function(value,obj){
                return '<a href="../../trade/tradeInfoForFinManager.html?productId='+value+'">'+value+'</a>';
            }},
            {title: '产品名称', dataIndex: 'productName', width: 200},
            {title: '起息日期', dataIndex: 'qxDate', width: 100},
            {title: '到期日期', dataIndex: 'dqDate', width: 100},
            {title: '赎回开放', dataIndex: 'redeemFlag', width: 100},
            {
                title : "赎回周期",
                dataIndex : "productId",
                renderer : function() {
                    return '<span class="grid-command btn-next">详情</span>';
                },
                width : '60px'
            },
            {title: '产品期限', dataIndex: 'qxDays', width: 100},
            {
                title: '期限单位', dataIndex: 'qxUnit', width: 100, renderer: function (value) {
                if (value == "D") {
                    return "天";
                }else if (value == "M") {
                    return "月";
                }else if (value == "Y") {
                    return "年";
                }
                return value;
             }
            },
            {title: '可赎回起始日', dataIndex: 'redeemBegin', width: 100},
            {title: '可赎回截止日', dataIndex: 'redeemEnd', width: 100},
            {title: '可赎回起期',dataIndex:'redeemBeginDate',width:150},
            {title: '可赎回止期',dataIndex:'redeemEndDate',width:150},
            {title: 'T起始', dataIndex: 'tBeginDate', width: 100},
            {title: 'T截止', dataIndex: 'tEndDate', width: 100}
        ];
        var store = new Store(
            {
                url: url_query,
                pageSize: 30,
                params: form1.serializeToObject(),
                autoLoad: false
            });
        var grid = new Grid.Grid({
            render: '#productInfoGrid',
            columns: productInfoColumns,
            width: '100%',
            loadMask: true,
            store: store,
            bbar: {
                pagingBar: true
            }, plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });
        grid.render();

        var redeemColumns = [
            {title: '产品代码', dataIndex: 'productId', width: 200},
            {title: '产品名称', dataIndex: 'productName', width: 200},
            {title: '可赎回起期',dataIndex:'redeemBeginDate',width:150},
            {title: '可赎回止期',dataIndex:'redeemEndDate',width:150},
            {title: 'T日起始',dataIndex:'tBeginDate',width:150},
            {title: 'T日截止',dataIndex:'tEndDate',width:150},
        ];
        var redeemStore=new Data.Store({
            url: url_queryRedeem,
            pageSize: 30,
            autoLoad: false
        });
        var redeemGrid = new Grid.Grid({
            render: '#redeemGrid',
            columns: redeemColumns,
            width: '100%',
            loadMask: true,
            store: redeemStore,
            bbar: {
                pagingBar: false
            },
            autoRender: true
        });
        var redeemDialog = new Overlay.Dialog({
            width:"60%",
            title:"赎回周期列表",
            contentId:"redeemDialog",
            buttons:[{
                text : '关闭',
                elCls : 'button',
                handler : function() {
                    this.close();
                }
            },{
                text : '导出',
                elCls : 'button button-info',
                handler : function() {
                    var productId = grid.getSelected().productId;
                    window.open("../product/exportRedeemDateInfo.json?productId="+productId);
                }
            }]
        });

        grid.on("cellclick",function (ev) {
            var sender = $(ev.domTarget);
            //点击的Dom
            var record = ev.record;
            //跳转到详情页面
            if(sender.hasClass('btn-next')){
                redeemDialog.show();
                redeemStore.load({productId:record.productId})
            }
        })
        $("#btnSearch").on('click', function () {
            // 序列化成对象
            var obj = form1.serializeToObject();
            obj.start = 0; // 返回第一页
            store.load(obj);
        });
        $("#download").on('click',function () {
            form1.set("action","../tradeTdaysInfo/exportRedeemProductInfo.json");
            form1.submit();
        });
        var date = new Date();
        $("#startDate").val(date.format("yyyy-MM-dd"));
        $("#endDate").val(date.format("yyyy-MM-dd"));
    });