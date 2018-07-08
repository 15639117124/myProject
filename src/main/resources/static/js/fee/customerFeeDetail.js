var dialog;
var store = null;
var value = null;
BUI.use(['bui/form', 'bui/grid', 'bui/data'],
    function (Form, Grid, Data) {
        var contextPath = "../customerFee/";
        var url_query = contextPath + "queryProductCustomerFeeDetail.json";
        /**********************************************渠道费信息Start**************************************************/
        var queryForm = new Form.HForm({
            srcNode: '#J_Form'
        });

        queryForm.render();

        var Store = Data.Store, columns = [
            {title: '客户名称', dataIndex: 'accountName', width: 100},
            {title: '卡号', dataIndex: 'cardNo', width: 150},
            {title: '证件类型', dataIndex: 'idCardType', width: 80},
            {title: '证件号码', dataIndex: 'idCardNo', width: 200},
            {title: '认购金额(元)', dataIndex: 'buyMoney', width: 100},
            {title: '产品名称', dataIndex: 'productName', width: 200},
            {
                title: '产品代码', dataIndex: 'productId', width: 200, renderer: function (value, obj) {
                return '<a href="../../product/productPreProfit.html?productId=' + value + '">' + value + '</a>';
            }
            },
            {title: '起始时间', dataIndex: 'startDate', width: 100},
            {title: '截止时间', dataIndex: 'endDate', width: 100},
            {title: '活期利息(元)', dataIndex: 'currentFee', width: 100},
            {title: '利息(元)', dataIndex: 'interestFee', width: 100},
            {title: '本息和(元)', dataIndex: 'capitalFee', width: 100}
        ];
        store = new Store(
            {
                url: url_query,
                pageSize: 30,
                params: queryForm.serializeToObject(),
                autoLoad: false
            });
        store.on('exception', function (ev) {
            BUI.Message.Alert(ev.error, "error");
        });
        var grid = new Grid.Grid({
            render: '#grid',
            columns: columns,
            width: '100%',
            loadMask: true,
            store: store,
            autoRender: true
        });
        grid.render();

        $("#btnSearch").on('click', function () {
            queryForm.valid();
            if (!queryForm.isValid()) {
                return;
            }
            // 序列化成对象
            var obj = queryForm.serializeToObject();
            obj.start = 0; // 返回第一页
            store.load(obj);
            return false;
        });
        $("#export").on('click', function () {
            queryForm.valid();
            if (!queryForm.isValid()) {
                return;
            }
            queryForm.set("action", "../customerFee/exportProductCustomerFeeDetail.json");
            queryForm.submit();
        })
    });