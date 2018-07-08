BUI.use(['bui/form', 'bui/grid', 'bui/data'],
    function (Form, Grid, Data) {
        var contextPath = "../udJrzcAllo/";
        var url_query = contextPath + "queryByCond.json";
        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var Store = Data.Store, productInfoColumns = [
            {title: '数据日期', dataIndex: 'sjrq', width: 200},
            {title: '归属人', dataIndex: 'userName', width: 200},
            {title: '归属人工号', dataIndex: 'userId', width: 100},
            {title: '机构号', dataIndex: 'orgNo', width: 100},
            {title: '机构名称', dataIndex: 'orgName', width: 100},
            {title: '金融资产余额(元)', dataIndex: 'jrzcYe', width: 100},
            {title: '金融资产月日均(元)', dataIndex: 'jrzcYrj', width: 120},
            {title: '金融资产季日均(元)', dataIndex: 'jrzcJrj', width: 120},
            {title: '金融资产年日均(元)', dataIndex: 'jrzcNrj', width: 120},
            {title: '线上/下', dataIndex: 'flag', width: 100}
        ];
        var store = new Store(
            {
                url: url_query,
                pageSize: 30,
                params: form1.serializeToObject(),
                autoLoad: false
            });
        var grid = new Grid.Grid({
            render: '#grid',
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

        $("#export").on("click", function () {
            form1.set("action", contextPath + "export.json");
            form1.submit();
        });
    });