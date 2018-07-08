BUI.use(['bui/form', 'bui/grid', 'bui/data'],
    function (Form, Grid, Data) {
        var contextPath = "../";

        var url_query = contextPath + "tradeDetail/queryTradeDetailExcelInfo.json";
        var url_delete = contextPath + "tradeDetail/deleteTradeDetailInfoExcel.json";
        var url_download = contextPath + "tradeDetail/downloadSameTradeDetailInfo.json";
        var form = new Form.HForm({
            srcNode: '#J_Form'
        });

        form.render();
        var columns = [
            {title: '文件批次', dataIndex: 'excelId', width: 200},
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
            render: '#tradeFileGrid',
            columns: columns,
            width: '100%',
            loadMask: true,
            store: store,
            bbar: {
                pagingBar: true
            },
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
            BUI.Message.Confirm("确定要删除" + record.excelId + "批次吗？", function () {
                $.ajax({
                    url: url_delete,
                    type: 'post',
                    data: {excelId: record.excelId},
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


        $("#sameDownload").on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert("请选择一条记录", "warning");
                return;
            }
            window.open(url_download + "?excelId=" + record.excelId);
        });

    });