var dialog;
var store = null;
var value = null;
BUI.use(['bui/form', 'bui/grid', 'bui/data'],
    function (Form, Grid, Data) {
        var contextPath = "../productFee/";
        var url_query = contextPath + "queryProductTypeFee.json";
        /**********************************************渠道费信息Start**************************************************/
        var queryForm = new Form.HForm({
            srcNode: '#J_Form'
        });

        queryForm.render();

        var Store = Data.Store, columns = [
            {
                title: '产品代码', dataIndex: 'productId', width: 200, renderer: function (value, obj) {
                return '<a href="../../product/productPreProfit.html?productId=' + value + '">' + value + '</a>';
            }
            },
            {title: '产品名称', dataIndex: 'productName', width: 200},
            {title: '起始时间', dataIndex: 'startDate', width: 100},
            {title: '截止时间', dataIndex: 'endDate', width: 100},
            {title: '投资者类型', dataIndex: 'productType', width: 100},
            {title: '投资者金额', dataIndex: 'buyMoney', width: 100},
            {title: '管理费(元)', dataIndex: 'managementFee', width: 100},
            {title: '承销费(元)', dataIndex: 'consignmentFee', width: 100},
            {title: '备案费(元)', dataIndex: 'registrationFee', width: 100}
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
            bbar: {
                pagingBar: true
            }, plugins: [Grid.Plugins.RadioSelection], autoRender: true
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
        });
        $("#download").on('click', function () {
            queryForm.valid();
            if (!queryForm.isValid()) {
                return;
            }
            queryForm.set("action", "../productFee/downloadCommissionFee.json");
            queryForm.submit();
        })
    });