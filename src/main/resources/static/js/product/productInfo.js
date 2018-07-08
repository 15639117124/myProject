var dialog;
var store = null;
var value = null;
var editFlag = true;
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/calendar', 'bui/tab', 'bui/overlay'],
    function (Form, Grid, Data, Calendar, Tab, Overlay) {
        var contextPath = "../";
        var url_query = contextPath + "product/queryProductInfo.json";
        var url_update = contextPath + "product/updateProductInfo.json";
        var url_create = contextPath + "product/createProductInfo.json";
        var url_delete = contextPath + "product/deleteProductInfo.json";
        var url_redeem = contextPath + "product/redeemProductInfo.json";
        var url_queryRedeem = contextPath + "product/queryRedeemDateInfo.json";
        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var Store = Data.Store, productInfoColumns = [
            {
                title: '产品代码', dataIndex: 'productId', width: 200, renderer: function (value, obj) {
                return '<a href="../../product/productPreProfit.html?productId=' + value + '">' + value + '</a>';
            }
            },
            {title: '产品名称', dataIndex: 'productName', width: 200},
            {title: '起息日期', dataIndex: 'qxDate', width: 100},
            {title: '到期日期', dataIndex: 'dqDate', width: 100},
            {
                title: "赎回周期",
                dataIndex: "productId",
                renderer: function () {
                    return '<span class="grid-command btn-next">详情</span>';
                },
                width: '60px'
            },
            {title: '申购开放类型', dataIndex: 'buyOpenType', width: 100},
            {title: '赎回开放类型', dataIndex: 'redeemOpenType', width: 100},
            {title: '申购开放周期', dataIndex: 'buyOpenPeriod', width: 100},

            {
                title: '赎回开放周期', dataIndex: 'openRedeemPeriod', width: 100, renderer: function (value) {
                if (value == "0") {
                    return "按天";
                } else if (value == "1") {
                    return "每月";
                } else if (value == "3") {
                    return "每季度";
                } else if (value == "6") {
                    return "每半年";
                } else if (value == "12") {
                    return "每年";
                } else if (value == "-1") {
                    return "无";
                }
                return value;
            }
            },

            {title: '结息类型', dataIndex: 'jxType', width: 100},

            {title: '产品类型', dataIndex: 'productType', width: 100},
            {title: '融资方', dataIndex: 'financiersId', width: 100},
            {title: '提前还款', dataIndex: 'prePaymentFlag', width: 100},
            {title: '终止日期', dataIndex: 'terminalDate', width: 100},

            {title: '是否计算活期', dataIndex: 'depositsFlag', width: 100},
            {title: '是否分阶段', dataIndex: 'dividePhaseFlag', width: 100},
            {title: '产品期限', dataIndex: 'qxDays', width: 100},
            {
                title: '期限单位', dataIndex: 'qxUnit', width: 100, renderer: function (value) {
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
            {title: '可赎回起始日', dataIndex: 'redeemBegin', width: 100},
            {title: '可赎回截止日', dataIndex: 'redeemEnd', width: 100}
        ];
        store = new Store(
            {
                url: url_query,
                pageSize: 30,
                params: form1.serializeToObject(),
                autoLoad: false
            });
        var grid = new Grid.Grid({
            render: '#productInfoGrid',
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
        /*******加载弹出框***********/
        var productInfoForm = new Form.HForm({
            srcNode: "#productInfoForm"
        });
        productInfoForm.render();

        var productInfoDialog = new Overlay.Dialog({
            width: "78%",
            contentId: "productInfoDialog",
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {
                    productInfoForm.valid();
                    if (!productInfoForm.isValid()) {
                        return;
                    }

                    var redeemBegin = Number($.trim($("#redeemBegin").val()));
                    var redeemEnd = Number($.trim($("#redeemEnd").val()));

                    if (redeemBegin < redeemEnd) {
                        BUI.Message.Alert("可赎回起始天不能小于截至天", "warning");
                        return;
                    }
                    var openRedeemPeriod = $("#openRedeemPeriodValue").val();
                    var qxUnit = $("#productInfoForm select[name='qxUnit']").val();
                    if (openRedeemPeriod == '0' && qxUnit != 'D') {
                        BUI.Message.Alert("赎回期限单位为天的时候,产品期限单位也必须为天", "error");
                        return;
                    }
                    var obj = productInfoForm.serializeToObject();
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
                                productInfoDialog.close();
                            } else {
                                BUI.Message.Alert(result.msg, 'error');
                                return;
                            }
                        }
                    });
                    // this.close();
                }
            }, {
                text: '关闭',
                elCls: 'button',
                handler: function () {
                    this.close();
                }
            }]
        });
        $("#export").on("click", function () {
            form1.set("action", "../product/exportProductInfo.json");
            form1.submit();
        })
        $('#add').on('click', function () {
            productInfoDialog.set('initRecord', {});
            $('#productId').attr("readonly", false);
            editFlag = false;
            productInfoDialog.set('title', '添加产品信息');
            productInfoForm.clearFields();
            productInfoDialog.show();
            showAll();

        });
        $('#edit').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }

            productInfoForm.setRecord(record);
            $('#productId').attr("readonly", "readonly");
            editFlag = true;
            productInfoDialog.set('title', '编辑产品信息');
            productInfoDialog.show();
            hideOrShow(record);

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

        $("#redeem").on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
            var id = record.id;
            $.ajax({
                type: "POST",
                url: url_redeem,
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

        var redeemColumns = [
            {title: '产品代码', dataIndex: 'productId', width: 200},
            {title: '产品名称', dataIndex: 'productName', width: 200},
            {title: '可赎回起期', dataIndex: 'redeemBeginDate', width: 150},
            {title: '可赎回止期', dataIndex: 'redeemEndDate', width: 150}
        ];
        var redeemStore = new Data.Store({
            url: url_queryRedeem,
            pageSize: 30,
            autoLoad: false
        });
        var redeemGrid = new Grid.Grid({
            render: '#redeemGrid',
            columns: redeemColumns,
            width: '100%',
            loadMask: true,
            store: redeemStore,
            bbar: {
                pagingBar: false
            },
            autoRender: true
        });
        var redeemDialog = new Overlay.Dialog({
            width: "60%",
            title: "赎回周期列表",
            contentId: "redeemDialog",
            buttons: [{
                text: '关闭',
                elCls: 'button',
                handler: function () {
                    this.close();
                }
            }, {
                text: '导出',
                elCls: 'button button-info',
                handler: function () {
                    var productId = grid.getSelected().productId;
                    window.open("../product/exportRedeemDateInfo.json?productId=" + productId);
                }
            }]
        });
        grid.on("cellclick", function (ev) {
            var sender = $(ev.domTarget);
            var record = ev.record;
            if (sender.hasClass('btn-next')) {
                redeemDialog.show();
                redeemStore.load({productId: record.productId})
            }
        });

        $("#buyOpenType").on("change", function (ev) {
            var buyOpenType = $("#buyOpenType").val();
            if (buyOpenType == "不开放") {
                $("#buyOpenPeriod").hide();
                $("#openRedeemPeriodValue").val("-1")
                $("#tDays").val(0);
            } else {
                $("#buyOpenPeriod").show();
            }
        })
        $("#redeemOpenType").on("change", function (ev) {
            var redeemOpenType = $("#redeemOpenType").val();
            hideOrShowByRedeemOpenType(redeemOpenType)
        });
        $("#openRedeemPeriodValue").on("change", function (ev) {
            var openRedeemPeriodValue = $("#openRedeemPeriodValue").val();
            if (openRedeemPeriodValue == "0") {
                $("#tDaysSpan").show();
            } else {
                $("#tDaysSpan").hide();
            }
        });
        function hideOrShow(record) {
            var buyOpenType = record.buyOpenType;

            hideOrShowByBuyOpenType(buyOpenType);
            hideOrShowByRedeemOpenType(record.redeemOpenType);
            var openRedeemPeriod = record.openRedeemPeriod;
            if (openRedeemPeriod == "0") {
                $("#tDaysSpan").show();
            } else {
                $("#tDaysSpan").hide();
            }

        }

        function hideOrShowByBuyOpenType(buyOpenType) {
            if (buyOpenType == '不开放') {
                $("#buyOpenPeriod").hide();
            } else {
                $("#buyOpenPeriod").show();
            }
        }

        function showAll() {
            $("#openRedeemPeriod").show();
            $("#tDaysSpan").show();
            $("#redeemDaysDiv").show();
        }

        function hideOrShowByRedeemOpenType(redeemOpenType) {
            if (redeemOpenType == "不开放") {
                $("#openRedeemPeriod").hide();
                $("#redeemDaysDiv").hide();
                $("#redeemBegin").val(0);
                $("#redeemEnd").val(0);
            } else {
                $("#openRedeemPeriod").show();
                $("#redeemDaysDiv").show();
                // $("#redeemBegin").val(20);
                // $("#redeemEnd").val(15);
            }
        }
    });