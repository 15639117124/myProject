var dialog;
var store = null;
var value = null;
var editFlag = true;

BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/calendar', 'bui/tab', 'bui/overlay'],
function (Form, Grid, Data, Calendar, Tab, Overlay) {
        var contextPath = "../";
        var url_query = contextPath + "admin/getMonitorData.json";

        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();


        var Store = Data.Store, dataColumns = [
                    {title: '任务名称', dataIndex: 'tableName', width: 200},
                    {title: '总数', dataIndex: 'counts', width: 200},
                    {title: '所属日期', dataIndex: 'belongDate', width: 200},
                    {title: '类别', dataIndex: 'type', width: 200},
                    {title: '发生时间', dataIndex: 'syncTime', width: 200},
                    {title: '是否处理', dataIndex: 'taskName', width: 200},
                ];
                store = new Store(
                    {
                        url: url_query,
                        pageSize: 30,
                        params: form1.serializeToObject(),
                        autoLoad: false
                    });
                var grid = new Grid.Grid({
                    render: '#dataMonitorGrid',
                    columns: dataColumns,
                    width: '100%',
                    loadMask: true,
                    store: store,

                });
                grid.render();

                $("#btnSearch").on('click', function () {
                    // 序列化成对象
                    var obj = form1.serializeToObject();
                    obj.start = 0; // 返回第一页
                    store.load(obj);
                    return false;
                });

       } );