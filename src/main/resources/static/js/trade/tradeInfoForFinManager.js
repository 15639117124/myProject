function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null)
        return unescape(decodeURI(r[2]));
    return null; //返回参数值
}
var productId = getUrlParam("productId");
$("#productIdInit").val(productId);
var dialog;
var editFlag = true;
BUI.use(['bui/extensions/treepicker', 'bui/tree', 'bui/form', 'bui/grid', 'bui/data', 'bui/calendar', 'bui/tab', 'bui/overlay'],
    function (TreePicker, Tree, Form, Grid, Data, Calendar, Tab, Overlay) {
        var contextPath = "../";
        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';
        var url_queryCustomerFee = contextPath + 'customerFee/queryCustomerFee.json';
        /**上传清单***/
        $("#importChannelRate").bind("click", function () {
            BUI.Message.Confirm('同一Excel文件请不要重复上传，确定要进行文件上传操作吗？', function () {
                var dialog = new Overlay.Dialog({
                    title: '上传Ukey数据',
                    width: '45%',
                    closeAction: "remove",
                    loader: {
                        url: 'tradeImportDetail.html',
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
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();
        var columns = [
            {title: '文件批次号', dataIndex: 'excelId', width: 150},
            {title: '产品代码', dataIndex: 'productId', width: 200},
            {title: '产品名称', dataIndex: 'productName', width: 200},
            {title: '起息日期', dataIndex: 'qxDate', width: 80},
            {title: '到期日期', dataIndex: 'dqDate', width: 80},
            {title: '循环起息日期', dataIndex: 'tBeginDate', width: 80},
            {title: '循环到期日期', dataIndex: 'tEndDate', width: 80},

            {title: '交易日期', dataIndex: 'transDate', width: 100},
            {title: '客户名称', dataIndex: 'accountName', width: 200},
            {title: '认购金额', dataIndex: 'buyMoney', width: 100},
            {title: '期限数', dataIndex: 'qxDays', width: 100},
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
            {title: '认购类型', dataIndex: 'productType', width: 100},
            {title: '认购收益率%', dataIndex: 'rate', width: 100},
            {
                title: "用户收益",
                dataIndex: "id",
                renderer: function () {
                    return '<span class="grid-command btn-next">收益详情</span>';
                },
                width: '60px'
            },
            {title: '合同编号', dataIndex: 'contractId', width: 100},
            {title: '归属机构', dataIndex: 'orgName', width: 80},
            {title: '归属人', dataIndex: 'userName', width: 80},
            {title: '备注', dataIndex: 'summary', width: 100},
            {title: '终止状态', dataIndex: 'terminateFlag', width: 100},
            {title: '终止日期', dataIndex: 'oprTerminateDate', width: 100},
            {title: '终止操作人', dataIndex: 'oprTerminateId', width: 100},
            {title: '终止备注', dataIndex: 'oprTerminateRemark', width: 100},
            {title: '赎回标志', dataIndex: 'redeemFlag', width: 100}
        ];
        var store = new Data.Store(
            {
                url: contextPath + "tradeDetail/queryTradeDetailInfo.json",
                pageSize: 30,
                params: form1.serializeToObject(),
                autoLoad: false
            });
        if (productId) {
            store.load();
        }
        var grid = new Grid.Grid({
            render: '#channelRateListGrid',
            columns: columns,
            width: '100%',
            loadMask: true,
            store: store,
            bbar: {
                pagingBar: true
            }, plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });
        grid.render();

        var customerFeeColumns = [
            {title: '客户姓名', dataIndex: 'accountName', width: 80},
            {title: '产品Id', dataIndex: 'productId', width: 150},
            {title: '产品名称', dataIndex: 'productName', width: 150},
            {title: '费用起始时间', dataIndex: 'startDate', width: 100},
            {title: '费用截止时间', dataIndex: 'endDate', width: 100},
            {title: '活期利息(元)', dataIndex: 'currentFee', width: 125},
            {title: '客户收益(元)', dataIndex: 'interestFee', width: 125},
            {title: '本息和(元)', dataIndex: 'capitalFee', width: 125}
        ];
        var customerFeeStore = new Data.Store({
            url: url_queryCustomerFee,
            pageSize: 30,
            autoLoad: false
        });
        customerFeeStore.on('exception', function (ev) {
            BUI.Message.Alert(ev.error, "error");
        });
        var customerFeeGrid = new Grid.Grid({
            render: '#customerFeeGrid',
            columns: customerFeeColumns,
            width: '100%',
            loadMask: true,
            store: customerFeeStore,
            bbar: {
                pagingBar: false
            },
            autoRender: true
        });
        customerFeeGrid.render();
        var customerFeeDialog = new Overlay.Dialog({
            width: "80%",
            title: "客户利息收益列表",
            contentId: "customerFeeDialog",
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
                    var id = grid.getSelected().id;
                    window.open("../customerFee/downloadCustomerFee.json?id=" + id);
                }
            }]
        });
        grid.on("cellclick", function (ev) {
            var sender = $(ev.domTarget);
            var record = ev.record;
            if (sender.hasClass('btn-next')) {
                customerFeeDialog.show();
                customerFeeStore.load(record);
            }
        });
        // 加载组织机构树
        var orgStore = new Data.TreeStore({
            root: {
                value: '0',
                text: '0'
            },
            url: url_queryOrgInfo,
            autoLoad: true
        });
        var orgTree = new Tree.TreeList({
            store: orgStore,
            checkType: 'none',
            showLine: true
        });
        var orgPicker = new TreePicker({
            trigger: '#orgName',
            valueField: '#orgNo', //如果需要列表返回的value，放在隐藏域，那么指定隐藏域
            width: 250,  //指定宽度
            children: [orgTree] //配置picker内的列表
        });

        orgPicker.render();

        $("#btnSearch").on('click', function () {
            // 序列化成对象
            var obj = form1.serializeToObject();
            obj.start = 0; // 返回第一页
            store.load(obj);
        });
        $("#exportChannelRate").on('click', function () {
            window.open("../doc/TradeDetailTemplate.xls");
        });
        /*******加载详情弹出框***********/
        var tradeDetailForm = new Form.HForm({
            srcNode: "#tradeDetailForm"
        });
        tradeDetailForm.render();

        var examForm = new Form.HForm({
            srcNode: "#examForm"
        });
        examForm.render();
        /*******加载审核弹出框*******×**/
        var examDialog = new Overlay.Dialog({
            width: "500",
            contentId: "examDialog",
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {
                    var obj = examForm.serializeToObject();
                    var id = grid.getSelected().id;
                    obj.id = id;
                    $.ajax({
                        type: "POST",
                        url: "../tradeDetail/examTradeInfo.json",
                        data: obj,
                        success: function (result) {
                            if (result.success) {
                                BUI.Message.Alert("操作成功！", "success");
                                store.load();
                                examDialog.close();
                                tradeDetailDialog.close();
                            } else {
                                BUI.Message.Alert(result.msg, "warning");
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
        var assignRedeemDialog = new Overlay.Dialog({
            width: "500",
            contentId: "assignRedeemDialog",
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {
                    var obj = examForm.serializeToObject();
                    var id = grid.getSelected().id;
                    obj.id = id;
                    $.ajax({
                        type: "POST",
                        url: "../tradeDetail/examTradeInfo.json",
                        data: obj,
                        success: function (result) {
                            if (result.success) {
                                BUI.Message.Alert("操作成功！", "success");
                                store.load();
                                assignRedeemDialog.close();
                            } else {
                                BUI.Message.Alert(result.msg, "warning");
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
        var tradeDetailDialog = new Overlay.Dialog({
            width: "95%",
            contentId: "tradeDetailDialog",
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {
                    tradeDetailForm.valid();
                    if (!tradeDetailForm.isValid()) {
                        return;
                    }
                    var obj = tradeDetailForm.toObject();
                    if (obj.idCardType == '身份证' && obj.idCardNo) {
                        var idCardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                        if (!idCardReg.test(obj.idCardNo)) {
                            BUI.Message.Alert("身份证号错误", "warning");
                            return;
                        }
                    }

                    var url;
                    if (editFlag) {
                        url = contextPath + "tradeDetail/updateTradeDetailInfo.json"
                        obj.id = grid.getSelected().id;
                    } else {
                        url = contextPath + "tradeDetail/insertTradeDetailInfo.json"
                    }
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: obj,
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
                    this.close();
                }
            }, {
                text: '审核',
                elCls: 'button button-info',
                handler: function () {
                    examDialog.show();
                }
            }, {
                text: '关闭',
                elCls: 'button',
                handler: function () {
                    this.close();
                }
            }]
        });
        $("#cancelRedeem").on("click", function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
            BUI.Message.Confirm("确定取消赎回吗？", function () {
                $.ajax({
                    url: url_delete,
                    type: 'post',
                    data: {id: item.id},
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('删除成功', 'success');
                            store.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                        }
                    }
                });

            }, 'question');
        });
        $("#assignRedeem").on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
            assignRedeemDialog.set('title', '指定赎回日期');
            assignRedeemDialog.show();
        })
        $("#exportTradeDetailExcel").on('click', function () {
            var obj = form1.serializeToObject();
            window.open("../tradeDetail/exportTradeDetailInfo.json?tradeDetailInfoCond=" + JSON.stringify(obj));

        });

        $('#add').on('click', function () {
            tradeDetailForm.set('initRecord', {});
            $('#productId').attr("disabled", false);
            editFlag = false;
            tradeDetailDialog.set('title', '添加交易信息');
            tradeDetailDialog.show();
            $('#tradeDetailForm .examFlag').removeAttr("readonly");
        });
        $('#redeem').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
            BUI.Message.Confirm('确认要赎回产品：' + record.productId + "吗?", function () {
                $.ajax({
                    type: "POST",
                    url: "../tradeDetail/redeem.json",
                    data: {"id": record.id},
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
            }, 'question');

        });

        $('#delete').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
            BUI.Message.Confirm('确认要删除记录：' + record.productId + "吗?", function () {
                $.ajax({
                    type: "POST",
                    url: "../tradeDetail/delete.json",
                    data: {"id": record.id},
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
            }, 'question');

        });

        $('#edit').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
            tradeDetailForm.setRecord(record);
            editFlag = true;
            var examFlag = record.examFlag;
            if (examFlag == "审核通过") {
                $('#tradeDetailForm .examFlag').attr('readonly', true);
            } else {
                $('#tradeDetailForm .examFlag').removeAttr("readonly");

            }
            tradeDetailDialog.set('title', '编辑交易信息');
            tradeDetailDialog.show();

        });

        $('#refreshRate').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
            BUI.Message.Confirm('确认要刷新产品：' + record.productId + "收益率吗?", function () {
                $.ajax({
                    type: "POST",
                    url: "../tradeDetail/refreshRate.json",
                    data: {"id": record.id},
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
            }, 'question');
        });
    });