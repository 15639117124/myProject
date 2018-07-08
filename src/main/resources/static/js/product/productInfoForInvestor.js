BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/calendar', 'bui/tab', 'bui/overlay'],
    function (Form, Grid, Data, Calendar, Tab, Overlay) {
        var contextPath = "../";
        var url_query  = contextPath+"product/queryProductInfoForInvestor.json";
        var url_queryRedeem= contextPath+"product/queryRedeemDateInfo.json";
        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var Store = Data.Store, productInfoColumns = [
            {title: '产品代码', dataIndex: 'productId', width: 200,renderer:function(value,obj){
                return '<a href="../../product/productPreProfit.html?productId='+value+'">'+value+'</a>';
            }},
            {title: '产品名称', dataIndex: 'productName', width: 200,renderer:function (value,obj) {
                return '<a href="../../investor/tradeInfoForInvestor.html?productId='+obj.productId+'">'+value+'</a>';
            }},
            {title: '起息日期', dataIndex: 'qxDate', width: 100},
            {title: '到期日期', dataIndex: 'dqDate', width: 100},
            {title: '期数', dataIndex: 'periods', width: 100},
            {title: '开放类型', dataIndex: 'openType', width: 100},
            {title: '赎回类型', dataIndex: 'redeemType', width: 100},
            {
                title : "赎回周期",
                dataIndex : "productId",
                renderer : function(value,obj) {
                    return '<span class="grid-command btn-next">详情</span>';
                },
                width : '60px'
            },
            {title: '申购开放类型', dataIndex: 'buyOpenType', width: 100},
            {title: '赎回开放类型', dataIndex: 'redeemOpenType', width: 100},
            {title: '申购开放周期', dataIndex: 'buyOpenPeriod', width: 100},
            {title: '赎回开放周期', dataIndex: 'openRedeemPeriod', width: 100, renderer: function (value) {
                if (value == "0") {
                    return "按天";
                }else if (value == "1") {
                    return "每月";
                }else if (value == "3") {
                    return "每季度";
                }else if (value == "6") {
                    return "每半年";
                }else if (value == "12") {
                    return "每年";
                }else if (value == "-1") {
                    return "无";
                }
                return value;
             }
            },

            {title: '结息类型', dataIndex: 'jxType', width: 100},

            {title: '产品类型', dataIndex: 'productType', width: 100},
            {title: '提前还款', dataIndex: 'prePaymentFlag', width: 100},
            {title: '终止日期', dataIndex: 'terminalDate', width: 100},

            {title: '是否计算活期', dataIndex: 'depositsFlag', width: 100},
            {title: '是否分阶段', dataIndex: 'dividePhaseFlag', width: 100},
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
            {title: '可赎回前推天', dataIndex: 'redeemBegin', width: 100},
            {title: '可赎回后推天', dataIndex: 'redeemEnd', width: 100}
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

        $("#btnSearch").on('click', function () {
            // 序列化成对象
            var obj = form1.serializeToObject();
            obj.start = 0; // 返回第一页
            store.load(obj);
            return false;
        });

        var redeemColumns = [
            {title: '产品代码', dataIndex: 'productId', width: 200},
            {title: '产品名称', dataIndex: 'productName', width: 200},
            {title: '可赎回起期',dataIndex:'redeemBeginDate',width:150},
            {title: '可赎回止期',dataIndex:'redeemEndDate',width:150}
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
        });
        $("#download").on("click",function () {
            form1.set("action",contextPath+"product/exportProductForInvestor.json");
            form1.submit();
        })
    });