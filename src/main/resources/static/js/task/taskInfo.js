var dialog;
var store = null;
var value = null;
var editFlag = true;
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/calendar', 'bui/tab', 'bui/overlay'],
    function (Form, Grid, Data, Calendar, Tab, Overlay) {
        var contextPath = "../task/";
        var url_query = contextPath + "queryTaskInfo.json";
        var url_update = contextPath + "update.json";
        var url_create = contextPath + "create.json";
        var url_runByHand = contextPath + "runByHand.json";
        var url_delete = contextPath + "delete.json";
        var url_queryRecord = contextPath + "queryRecord.json";
        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var Store = Data.Store, columns = [
            {title: '任务名称', dataIndex: 'name', width: 200},
            {title: '任务模块', dataIndex: 'module', width: 100},
            {title: '执行时间', dataIndex: 'cron', width: 150},
            {
                title: "历史记录",
                dataIndex: "id",
                renderer: function () {
                    return '<span class="grid-command btn-next">明细</span>';
                },
                width: '80px'
            },
            {
                title: '有效', dataIndex: 'validFlag', width: 60, renderer: function (value) {
                if (value == "1") {
                    return "是";
                } else if (value == "0") {
                    return "否";
                }
                return value;
            }
            },
            {title: '请求参数', dataIndex: 'param', width: 300},
            {title: '请求地址', dataIndex: 'target', width: '100%'}
        ];
        store = new Store(
            {
                url: url_query,
                pageSize: 30,
                params: form1.serializeToObject(),
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
            plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });
        grid.render();

        $("#btnSearch").on('click', function () {
            // 序列化成对象
            var obj = form1.serializeToObject();
            obj.start = 0; // 返回第一页
            store.load(obj);
            return false;
        });
        /*******加载弹出框***********/
        var taskInfoForm = new Form.HForm({
            srcNode: "#taskInfoForm"
        });
        taskInfoForm.render();

        var taskInfoDialog = new Overlay.Dialog({
            width: "78%",
            contentId: "taskInfoDialog",
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {
                    taskInfoForm.valid();
                    if (!taskInfoForm.isValid()) {
                        return;
                    }
                    var obj = taskInfoForm.serializeToObject();
                    if (editFlag) {
                        obj.id = grid.getSelected().id;
                    }

                    var url = editFlag ? url_update : url_create;

                    $.ajax({
                        type: "POST",
                        url: url,
                        data: obj,
                        success: function (result) {
                            if (result.success) {
                                //将后台的对象不刷新页面，重新装载表格
                                BUI.Message.Alert('操作成功！', 'success');
                                store.load();
                                taskInfoDialog.close();
                            } else {
                                BUI.Message.Alert(result.msg, 'error');
                                return;
                            }
                        }
                    });
                }
            }, {
                text: '关闭',
                elCls: 'button',
                handler: function () {
                    this.close();
                }
            }]
        });

        $('#add').on('click', function () {
            editFlag = false;
            taskInfoDialog.set('title', '添加产品信息');
            taskInfoForm.clearFields();
            taskInfoDialog.show();

        });
        $('#edit').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
            taskInfoForm.setRecord(record);
            editFlag = true;
            taskInfoDialog.set('title', '编辑产品信息');
            taskInfoDialog.show();

        });
        $("#delete").on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
            var id = record.id;
            $.ajax({
                type: "POST",
                url: url_delete,
                data: {id: id},
                success: function (result) {
                    if (result.success) {
                        BUI.Message.Alert('操作成功！', 'success');
                        store.load();
                    } else {
                        BUI.Message.Alert(result.msg, 'error');
                        return;
                    }
                }
            });

        });
        $("#runByHand").on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
            var id = record.id;
            $.ajax({
                type: "POST",
                url: url_runByHand,
                data: {id: id},
                success: function (result) {
                    if (result.success) {
                        BUI.Message.Alert('执行成功！', 'success');
                        store.load();
                    } else {
                        BUI.Message.Alert(result.msg, 'error');
                        return;
                    }
                }
            });

        })
        var recordColumns = [
            {title: '执行IP', dataIndex: 'runIp', width: 100},
            {title: '起始时间', dataIndex: 'createTime', width: 130},
            {title: '结束时间', dataIndex: 'modifyTime', width: 130},
            {
                title: '执行结果', dataIndex: 'result', width: 80, renderer: function (value) {
                if (value == "1") {
                    return "执行成功";
                } else if (value == '2') {
                    return "执行中"
                } else if (value == '3') {
                    return "执行失败"
                } else if (value == '4') {
                    return "执行异常"
                }
                return value;
            }
            },
            {title: '结果描述', dataIndex: 'remark', width: '100%'}
        ];
        var recordStore = new Data.Store({
            url: url_queryRecord,
            pageSize: 30,
            autoLoad: false
        });
        var recordGrid = new Grid.Grid({
            render: '#recordGrid',
            columns: recordColumns,
            width: '100%',
            loadMask: true,
            store: recordStore,
            bbar: {
                pagingBar: false
            },
            autoRender: true
        });
        var recordDialog = new Overlay.Dialog({
            width: "60%",
            title: "执行明细",
            contentId: "recordDialog",
            buttons: [{
                text: '关闭',
                elCls: 'button',
                handler: function () {
                    this.close();
                }
            }]
        });
        grid.on("cellclick", function (ev) {
            var sender = $(ev.domTarget);
            var record = ev.record;
            if (sender.hasClass('btn-next')) {
                recordDialog.set('title', record.name);
                recordDialog.show();
                recordStore.load({taskId: record.id})
            }
        });
    });