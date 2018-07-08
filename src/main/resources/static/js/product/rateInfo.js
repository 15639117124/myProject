BUI.use(['bui/form', 'bui/data', 'bui/grid', 'bui/calendar'],
    function (Form, Data, Grid, Calendar) {

        var contextPath = "../";

        var url_query = contextPath + 'rateInfo/queryRateInfo.json';
        var url_create = contextPath + 'rateInfo/createRateInfo.json';
        var url_update = contextPath + 'rateInfo/updateRateInfo.json';
        var url_delete = contextPath + 'rateInfo/deleteRateInfo.json';

        // 加载日期框
        new Calendar.DatePicker({
            trigger: '.calendar',
            autoRender: true
        });
        var queryForm = new Form.HForm({
            srcNode: '#queryForm',
            autoRender: true
        });

        var columns = [
            {title: '起始时间', dataIndex: 'beginDate', width: 100},
            {title: '截止时间', dataIndex: 'endDate', width: 100},
            {title: '利率%', dataIndex: 'rate', width: 100},
            {title: '相关说明', dataIndex: 'remark', width: 100}
        ];
        var rateInfoStore = new Data.Store({
            proxy: {
                method: "POST",
                dataType: "json"
            },
            url: url_query,
            pageSize: 30,
            params: queryForm.toObject(),
            autoLoad: false
        });
        var rateInfoGrid = new Grid.Grid({
            render: '#rateInfoGrid',
            columns: columns,
            width: '100%',
            loadMask: true,
            store: rateInfoStore,
            emptyDataTpl: '<div class="centered"><img alt="Crying" src="../../custom/img/crying.png"><h2>数据不存在，请检查查询条件</h2></div>',
            bbar: {
                pagingBar: true
            },
            plugins: [Grid.Plugins.RadioSelection],
            autoRender: true
        });
        var rateInfoForm = new Form.HForm({
            srcNode: '#rateInfoForm'
        });

        rateInfoForm.render();
        rateInfoGrid.on('itemclick', function (ev) {
            rateInfoForm.enable();
            var item = ev.item;
            rateInfoForm.setRecord(item);
            rateInfoForm.disable();
        });

        $('#btnSearch').on('click', function () {
            rateInfoStore.load(queryForm.toObject());
        });
        function enableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', false);
        }

        function disableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', true);
        }

        rateInfoForm.disable();
        disableBtnEdit();
        var operation = '';

        $('#add').on('click', function () {

            operation = 'add';
            rateInfoForm.enable();
            enableBtnEdit();

            rateInfoForm.clearFields();
            rateInfoForm.valid();
        });

        $('#edit').on('click', function () {
            var item = rateInfoGrid.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择利率', 'error');
                return;
            }

            operation = 'edit';
            enableBtnEdit();
            rateInfoForm.enable();
        });

        $('#delete').on('click', function () {
            var item = rateInfoGrid.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择要删除的利率', 'error');
                return;
            }

            BUI.Message.Confirm("确定要删除当前利率吗？", function () {

                $.ajax({
                    url: url_delete,
                    type: 'post',
                    data: {id: item.id},
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('删除成功', 'success');
                            rateInfoStore.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                        }
                    }
                })

            }, 'question');

        });

        $('#btnReset').on('click', function () {

            if (operation === 'edit') {
                var item = rateInfoGrid.getSelected();
                rateInfoForm.setRecord(item);

            } else if (operation === 'add') {
                rateInfoForm.clearFields();
            }
        });

        $('#btnSave').on('click', function () {
            if (!rateInfoForm.isValid()) {
                return;
            }

            var data = rateInfoForm.toObject();

            disableBtnEdit();

            if (operation === 'add') {
                $.ajax({
                    url: url_create,
                    type: 'post',
                    data: data,
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('添加成功', 'success');
                            rateInfoStore.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                            enableBtnEdit();
                            rateInfoForm.enable();
                        }
                    }
                });

            } else if (operation === 'edit') {
                var item = rateInfoGrid.getSelected();
                data.id = item.id;
                $.ajax({
                    url: url_update,
                    type: 'post',
                    data: data,
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('修改成功', 'success');
                            rateInfoStore.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                            enableBtnEdit();
                        }

                    }
                })

            }
        });
    });