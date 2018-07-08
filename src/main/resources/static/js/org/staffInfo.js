var dialog;
var store = null;
var value = null;
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/calendar', 'bui/tab', 'bui/overlay', 'bui/select'],
    function (Form, Grid, Data, Calendar, Tab, Overlay, Select) {
        var contextPath = "../";
        var url_query = contextPath + "staff/queryStaffByCond.json";
        var url_update = contextPath + "staff/updateStaffInfo.json";
        var url_delete = contextPath + "staff/deleteStaffInfo.json";

        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var Store = Data.Store, staffInfoColumns = [
            {title: '工号', dataIndex: 'staffId', width: 100},
            {title: '姓名', dataIndex: 'staffName', width: 100},
            {title: '机构代码', dataIndex: 'orgNo', width: 100},
            {title: '机构名称', dataIndex: 'orgName', width: 200},
            {title: '开始时间', dataIndex: 'beginDate', width: 100},
            {title: '截至时间', dataIndex: 'endDate', width: 100},
            {title: '年龄', dataIndex: 'age', width: 50},
            {title: '邮箱', dataIndex: 'email', width: 200},
            {title: '手机号码', dataIndex: 'mobile', width: 100},
            {title: '证件类型', dataIndex: 'idCardType', width: 100},
            {title: '地址', dataIndex: 'address', width: 100}
        ];
        store = new Store(
            {
                url: url_query,
                pageSize: 30,
                params: form1.serializeToObject(),
                autoLoad: false
            });
        var grid = new Grid.Grid({
            render: '#staffInfoGrid',
            columns: staffInfoColumns,
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
        /*******加载弹出框***********/
        var staffInfoForm = new Form.HForm({
            srcNode: "#staffInfoForm"
        });
        staffInfoForm.render();

        var staffInfoDialog = new Overlay.Dialog({
            width: "95%",
            contentId: "staffInfoDialog",
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {
                    if (!staffInfoForm.isValid()) {
                        return;
                    }
                    var obj = staffInfoForm.serializeToObject();
                    $.ajax({
                        type: "POST",
                        url: url_update,
                        data: obj,
                        success: function (result) {
                            if (result.success) {
                                //将后台的对象不刷新页面，重新装载表格
                                BUI.Message.Alert('操作成功！', 'success');
                                store.load();
                            } else {
                                BUI.Message.Alert(result.msg, 'error');
                                return;
                            }
                        }
                    });
                    this.close();
                }
            }, {
                text: '关闭',
                elCls: 'button',
                handler: function () {
                    this.close();
                }
            }]
        });

        $('#edit').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
            staffInfoForm.setRecord(record);
            // $('#productId').attr("disabled",true);
            staffInfoDialog.set('title', '编辑交易信息');
            staffInfoDialog.show();

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
                        //将后台的对象不刷新页面，重新装载表格
                        BUI.Message.Alert('操作成功！', 'success');
                        store.load();
                    } else {
                        BUI.Message.Alert(result.msg, 'error');
                        return;
                    }
                }
            });

        });
    });