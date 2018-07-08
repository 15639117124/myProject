BUI.use(['bui/select', 'bui/picker', 'bui/form', 'bui/data', 'bui/grid'],
    function (Select, Picker, Form, Data, Grid) {
        var url_queryProductInfo = "/test";
        var columns = [{
            id: 'productId',
            title: '产品代码',
            dataIndex: 'productId',
            width: '50%'
        }, {
            title: '产品名称',
            dataIndex: 'productName',
            width: '50%'
        }], data = [], grid = new Grid.SimpleGrid({
            dataField: 'productName',
            columns: columns,
            textGetter: function (item) { // 返回选中的文本
                return item.b;
            },
            items: data
        }), picker = new Picker.ListPicker({
            width: 300, // 指定宽度
            children: [grid]
            // 配置picker内的列表
        });
        var suggest = new Select.Suggest({
            render: '#productInfo',
            picker: picker,
            name: 'suggest',
            url: 'url_queryProductInfo'
        });
        suggest.render();

        var amountColumns = [{
            title: "title1",
            dataIndex: "data1",
            width: 100,
            editor: {
                xtype: 'text',
                rules: {
                    required: true
                }
            }
        }, {
            title: "title2",
            dataIndex: "data2",
            width: 100,
            editor: {
                xtype: 'text',
                rules: {
                    required: true
                }
            }
        }, {
            title: "title3",
            dataIndex: "data3",
            width: 100,
            editor: {
                xtype: 'text',
                rules: {
                    required: true
                }
            }
        }];

        var amountStore = new Data.Store({
            url: url_queryProductInfo,
            autoLoad: true
        });
        var amountEditing = new Grid.Plugins.CellEditing();
        var amountGrid = new Grid.Grid({
            render: '#amountGrid',
            columns: amountColumns,
            width: 700,
            forceFit: true,
            store: amountStore,
            plugins: [Grid.Plugins.RadioSelection, amountEditing]
        });
        amountGrid.on('itemclick', function (ev) {
            timeGrid.clearItems();
            var item = ev.item;
            var times = item.times;
            if (times) {
                timeGrid.setItems(times);
            }
        });
        amountGrid.render();
        $('#addAmount').on('click', function () {
            var newData = {
                data1: '请输入学校名称'
            };
            amountStore.add(newData);
            amountEditing.edit(newData, 'data1'); // 添加记录后，直接编辑
        });
        $('#deleteAmount').on('click', function () {
            var selections = amountGrid.getSelection();
            amountStore.remove(selections);
        });

        var timeColumns = [{
            title: "title1",
            dataIndex: "data1",
            width: "30%",
            editor: {
                xtype: 'text',
                rules: {
                    required: true
                }
            }
        }, {
            title: "title2",
            dataIndex: "data2",
            width: "30%",
            editor: {
                xtype: 'text',
                rules: {
                    required: true
                }
            }
        }, {
            title: "title3",
            dataIndex: "data3",
            width: "30%",
            editor: {
                xtype: 'text',
                rules: {
                    required: true
                }
            }
        }];
        var timeStore = new Data.Store({
            url: url_queryProductInfo,
            autoLoad: true
        });
        var timeEditing = new Grid.Plugins.CellEditing();
        var timeGrid = new Grid.Grid({
            render: '#timeGrid',
            columns: timeColumns,
            width: 700,
            forceFit: true,
            store: timeStore,
            plugins: [Grid.Plugins.CheckSelection, timeEditing]
        });
        timeGrid.render();
        $('#saveTime').on('click', function () {
            var record = amountGrid.getSelected();
            if (!record) {
                BUI.Message.Alert("请选择一条记录", "error");
                return;
            }
            var items = timeGrid.getItems();
            if (!items || items.length == 0) {
                BUI.Message.Alert("数据为空，请检查", "error");
                return;
            }
            record.times = JSON.parse(JSON.stringify(items));
        });
        $('#addTime').on('click', function () {
            var record = amountGrid.getSelected();
            if (!record) {
                BUI.Message.Alert("请选择一条记录", "error");
                return;
            }

            var newData = {
                data1: '请输入学校名称'
            };
            timeStore.add(newData);
            timeEditing.edit(newData, 'data1'); // 添加记录后，直接编辑
        });
        $('#deleteTime').on('click', function () {
            var selections = timeGrid.getSelection();
            timeStore.remove(selections);
        });
        $("#saveAll").on('click', function () {
            var amount = JSON.stringify(amountGrid.getItems());

            $.ajax({
                url: url_queryProductInfo,
                type: 'post',
                dataType: "json",
                data: {amount: amount},
                success: function (data) {
                    if (data.result) {
                        BUI.Message.Alert('删除成功', 'success');
                        store.load(queryForm.toObject());
                    } else {
                        BUI.Message.Alert(data.msg, 'error');
                    }
                }
            })
        });
    });