BUI.use(['bui/form', 'bui/grid', 'bui/data'],
    function (Form, Grid, Data) {
        var contextPath = "../importTradeInfoFromOnline/";

        var url_query = contextPath + "queryFileList.json";
        var url_delete = contextPath + "deleteBatch.json";
        var form = new Form.HForm({
            srcNode: '#J_Form'
        });

        form.render();
        var columns = [
            {title: '文件批次', dataIndex: 'batchNo', width: 200},
            {title: '导入日期', dataIndex: 'importDate', width: 100},
            {title: '导入人工号', dataIndex: 'importId', width: 100},
            {title: '数据量(条)', dataIndex: 'recordCount', width: 100}
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
            plugins: [Grid.Plugins.RadioSelection],
            autoRender: true
        });
        grid.render();

        $("#btnSearch").on('click', function () {
            // 序列化成对象
            var obj = form.serializeToObject();
            obj.start = 0; // 返回第一页
            store.load(obj);
        });
        $("#delete").on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert("请选择一条记录", "warning");
                return;
            }
            BUI.Message.Confirm("确定要删除" + record.batchNo + "批次吗？", function () {
                $.ajax({
                    url: url_delete,
                    type: 'post',
                    data: {fileName: record.batchNo},
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('删除成功', 'success');
                            store.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                        }
                    }
                })

            }, 'question');
        });

    });