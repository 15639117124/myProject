BUI.use(['bui/extensions/treepicker', 'bui/tree', 'bui/form', 'bui/grid', 'bui/data', 'bui/calendar', 'bui/tab', 'bui/overlay'],
    function (TreePicker, Tree, Form, Grid, Data, Calendar, Tab, Overlay) {
        var contextPath = "../";
        /**上传清单***/
        $("#importDataOnline").bind("click", function () {
            BUI.Message.Confirm('同一Excel文件请不要重复上传，确定要进行文件上传操作吗？', function () {
                var dialog = new Overlay.Dialog({
                    title: '线上交易数据上传',
                    width: '30%',
                    closeAction: "remove",
                    loader: {
                        url: 'tradeInfoOnlineImport.html',
                        autoLoad: false,
                        lazyLoad: false,
                        callback: function (text) {

                        }
                    },
                    buttons: [],
                    success: function () {
                        dialog.close();
                    }
                    //,mask:false
                });
                dialog.show();
                dialog.get('loader').load();
            });
        });
        /**上传清单***/

        /**********************************************渠道费信息Start**************************************************/
        var form = new Form.HForm({
            srcNode: '#J_Form'
        });

        form.render();
        var columns = [
            {title: '批次号', dataIndex: 'fileName', width: 200},
            {title: '序号', dataIndex: 'id', width: 50},
            {title: '项目名称', dataIndex: 'projectName', width: 200},
            {title: '产品名称', dataIndex: 'productName', width: 200},
            {title: '产品代码', dataIndex: 'productId', width: 200},
            {title: '客户名称', dataIndex: 'accountName', width: 200},
            {title: '证件类型', dataIndex: 'idCardType', width: 200},
            {title: '证件号', dataIndex: 'idCardNo', width: 200},
            {title: '起息日期', dataIndex: 'qxDate', width: 80},
            {title: '到期日期', dataIndex: 'dqDate', width: 80},
            {title: '客户名称', dataIndex: 'accountName', width: 200},
            {title: '认购金额', dataIndex: 'buyMoney', width: 100},
            {title: '期限数', dataIndex: 'qxDays', width: 50},
            {
                title: '期限单位', dataIndex: 'qxUnit', width: 60, renderer: function (value) {
                if (value == "D") {
                    return "天";
                } else if (value == "M") {
                    return "月";
                } else if (value == "Y") {
                    return "年";
                }
                return value;
            }
            },
            {title: '认购收益率%', dataIndex: 'rate', width: 80},
            {title: '状态', dataIndex: 'status', width: 80},
            {title: '推荐人', dataIndex: 'referrals', width: 80},
            {title: '推荐人Id', dataIndex: 'referralsId', width: 80},
            {title: '归属人', dataIndex: 'userName', width: 80},
            {title: '归属人ID', dataIndex: 'userId', width: 80}
        ];
        var store = new Data.Store(
            {
                url: contextPath + "importTradeInfoFromOnline/query.json",
                pageSize: 30,
                params: form.serializeToObject(),
                autoLoad: false
            });

        var grid = new Grid.Grid({
            render: '#channelRateListGrid',
            columns: columns,
            width: '100%',
            loadMask: true,
            store: store,
            emptyDataTpl: '<div class="centered"><img alt="Crying" src="../../custom/img/crying.png"><h2>数据不存在，请检查查询条件</h2></div>',
            bbar: {
                pagingBar: true
            }, plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });
        grid.render();
        $("#btnSearch").on('click', function () {
            // 序列化成对象
            var obj = form.serializeToObject();
            obj.start = 0; // 返回第一页
            store.load(obj);
        });
        $("#importDataTemplate").on('click', function () {
            window.open("../doc/onlineDataTemplate.xls");
        });
        $("#export").on('click', function () {
            form.valid();
            if (!form.isValid()) {
                return;
            }
            form.set("action", "../importTradeInfoFromOnline/export.json");
            form.submit();
        });
    });
