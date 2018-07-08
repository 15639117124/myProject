function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null)
        return unescape(decodeURI(r[2]));
    return null; //返回参数值
}
var productId = getUrlParam("productId");
$("#productIdInit").val(productId);
var dialog;
BUI.use(['bui/form', 'bui/grid', 'bui/data'],
    function (Form, Grid, Data) {
        var contextPath = "../";
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();
        var columns = [
            {title: '文件批次号', dataIndex: 'excelId', width: 150},
            {title: '产品代码', dataIndex: 'productId', width: 200},
            {title: '产品名称', dataIndex: 'productName', width: 200},
            {title: '客户名称', dataIndex: 'accountName', width: 200},
            {title: '认购类型', dataIndex: 'productType', width: 100},
            {title: '期限数', dataIndex: 'qxDays', width: 100},
            {
                title: '期限单位', dataIndex: 'qxUnit', width: 100, renderer: function (value) {
                if (value == "D") {
                    return "天";
                } else if (value == "M") {
                    return "月";
                } else if (value == "Y") {
                    return "年";
                }
                return value;
            }
            },

            {title: '认购收益率%', dataIndex: 'rate', width: 100},
            {title: '交易日期', dataIndex: 'transDate', width: 100},
            {title: '认购金额', dataIndex: 'buyMoney', width: 100},
            {title: '摘要', dataIndex: 'summary', width: 100},
            {title: '卡号', dataIndex: 'cardNo', width: 100},
            {title: '账号名称', dataIndex: 'accountName', width: 100},
            {title: '开户行', dataIndex: 'bankName', width: 200},
            {title: '开户行号', dataIndex: 'bankNo', width: 200},
            {title: '终止状态', dataIndex: 'terminateFlag', width: 100},
            {title: '终止日期', dataIndex: 'oprTerminateDate', width: 100},
            {title: '赎回标志', dataIndex: 'redeemFlag', width: 100},
            {title: '审核标志', dataIndex: 'examFlag', width: 100},
            {title: '审核备注', dataIndex: 'oprExamRemark', width: 100},
        ];
        var store = new Data.Store(
            {
                url: contextPath + "tradeDetail/queryInvestorTradeDetailInfo.json",
                pageSize: 30,
                params: form1.serializeToObject(),
                autoLoad: false
            });
        if (productId) {
            store.load();
        }
        var grid = new Grid.Grid({
            render: '#channelRateListGrid',
            columns: columns,
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
        });
        $("#exportTradeDetailExcel").on('click', function () {
            form1.set("action", "../tradeDetail/exportInvestorTradeInfo.json");
            form1.submit();

        });
    });