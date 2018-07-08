BUI.use(['bui/form', 'bui/grid', 'bui/data'],
    function (Form, Grid, Data) {
        var contextPath = "../";

        var url_query = contextPath + "exportTradeOnline/query.json";
        var form = new Form.HForm({
            srcNode: '#J_Form'
        });

        form.render();
        var columns = [
            {title: '流水号', dataIndex: 'id', width: 150},
            {title: '手机号', dataIndex: 'telephone', width: 100},
            {title: '身份证号', dataIndex: 'certificateNo', width: 150},
            {title: '其他证件号', dataIndex: 'idCardNo', width: 150},
            {title: '产品代码', dataIndex: 'productId', width: 180},
            {title: '产品名称', dataIndex: 'productName', width: 250},
            {title: '年化收益率%', dataIndex: 'rate', width: 100},
            {title: '起息日期', dataIndex: 'qxDate', width: 80},
            {title: '到期日期', dataIndex: 'dqDate', width: 80},
            {title: '认购金额(元)', dataIndex: 'buyMoney', width: 150},
            {title: '预期收益(元)', dataIndex: 'preProfit', width: 150},
            {title: '状态', dataIndex: 'status', width: 80}
        ];
        var store = new Data.Store(
            {
                url: url_query,
                pageSize: 30,
                params: form.serializeToObject(),
                autoLoad: false
            });
        var grid = new Grid.Grid({
            render: '#grid',
            columns: columns,
            width: '100%',
            loadMask: true,
            store: store,
            bbar: {
                pagingBar: true
            },
            emptyDataTpl: '<div class="centered"><img alt="Crying" src="../../custom/img/crying.png"><h2>数据不存在，请检查查询条件</h2></div>',
            autoRender: true
        });
        grid.render();

        $("#btnSearch").on('click', function () {
            BUI.Message.Alert('计算量比较大,请耐心等待', function () {
                // 序列化成对象
                var obj = form.serializeToObject();
                obj.start = 0; // 返回第一页
                store.load(obj);
            }, 'warning');
        });
        $("#export").on('click', function () {
            form.valid();
            if (!form.isValid()) {
                return;
            }
            form.set("action", "../exportTradeOnline/exportTradeOnline.file");
            form.submit();
        });
    });