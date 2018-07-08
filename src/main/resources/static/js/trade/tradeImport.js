function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null)
        return unescape(decodeURI(r[2]));
    return null; //返回参数值
}
getUrlParam("offlineRecent");
var productId = getUrlParam("productId");
$("#productIdInit").val(productId);
var dialog;
var editFlag = true;
BUI.use(['bui/extensions/treepicker', 'bui/tree', 'bui/form', 'bui/grid', 'bui/data', 'bui/calendar', 'bui/tab', 'bui/overlay'],
    function (TreePicker, Tree, Form, Grid, Data, Calendar, Tab, Overlay) {
        var contextPath = "../";
        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';
        var url_queryCustomerFee = contextPath + 'customerFee/queryCustomerFee.json';
        var url_delete = contextPath + 'tradeDetail/undoRedeem.json';
        var url_queryTradeDetailInfo = contextPath+'tradeDetail/queryTradeDetailInfo.json';
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
                            //insurantDialog.close();
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
            {title: '产品名称', dataIndex: 'productName', width: 200},
            {title: '客户名称', dataIndex: 'accountName', width: 200},
            {title: '投资金额', dataIndex: 'buyMoney', width: 100},
            {title: '预期收益率', dataIndex: 'rate', width: 80},
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
            {title: '起息日期', dataIndex: 'qxDate', width: 80},
            {title: '到期日期', dataIndex: 'dqDate', width: 80},
            {title: '循环起息日期', dataIndex: 'tBeginDate', width: 80},
            {title: '循环到期日期', dataIndex: 'tEndDate', width: 80},
            {title:'当前期',dataIndex:'tNo',width:100,renderer:function(value, obj){
                if(value!=null&&value!=""){
                    return  parseInt(value.substring(1))+1;
                }
            }},
            {title: '交易日期', dataIndex: 'transDate', width: 80},
            {title: '归属机构', dataIndex: 'orgName', width: 200},
            {title: '归属人', dataIndex: 'userName', width: 80},
            {title: '合同编号', dataIndex: 'contractId', width: 100},
            {title: '文件批次号', dataIndex: 'excelId', width: 180},
            {title: '产品代码', dataIndex: 'productId', width: 200},
            {title: '认购类型', dataIndex: 'productType', width: 60},
            {
                title: "用户收益",
                dataIndex: "id",
                renderer: function () {
                    return '<span class="grid-command btn-next">收益详情</span>';
                },
                width: '60px'
            },
            {title: '卡号', dataIndex: 'cardNo', width: 200},
            {title: '开户行', dataIndex: 'bankName', width: 200},
            {title: '开户行号', dataIndex: 'bankNo', width: 200},
            {title: '终止状态', dataIndex: 'terminateFlag', width: 60},
            {title: '终止日期', dataIndex: 'oprTerminateDate', width: 80},
            {title: '终止操作人', dataIndex: 'oprTerminateId', width: 80},
            {title: '终止备注', dataIndex: 'oprTerminateRemark', width: 100},

            {title: '赎回标志', dataIndex: 'redeemOpenType', width: 80,renderer:function (value,obj) {
                if(value=='开放'&&obj.redeemFlag=='未赎回'){
                    return '<span class="grid-command btn-nex">'+obj.redeemFlag+'</span>'
                }else {
                    return obj.redeemFlag;
                }

        }},
            {title:'到期日',dataIndex:'tEndDate',width:100,renderer:function (value,obj) {
                if(value!=null && obj.redeemFlag=="赎回中"){
                    return value;
                }
            }},
            {title: '赎回日期', dataIndex: 'oprRedeemDate', width: 80},
            {title: '终止日期', dataIndex: 'oprTerminateDate', width: 80},
            {title: '审核标志', dataIndex: 'examFlag', width: 60},
            {title: '审核备注', dataIndex: 'oprExamRemark', width: 100},
            {title: '备注', dataIndex: 'summary', width: 100},
            {title: '融资方信息',dataIndex:'productName',width:200}
        ];

        var str1 = getCharFromUtf8(location.search).substring(1);


        if("fromassert"==str1.substring(0,10)){
            $("input[name='productName']").val(getCharFromUtf8(location.search).substring(11));
        }else if(str1=="offlinerecent"){
            url_queryTradeDetailInfo = contextPath+'tradeDetail/queryByLinkOnWeek.json';

        }

        var store = new Data.Store(
            {
                url: url_queryTradeDetailInfo,
                pageSize: 30,
                params: form1.serializeToObject(),
                autoLoad: true
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
            {title: '本息和(元)', dataIndex: 'capitalFee', width: 125,renderer:function (value) {
                return value;
            }}
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

        //最近赎回截止日和赎回到期日
        var redemptionColumns = [
            {title: '最近赎回截止日', dataIndex: 'redeemEndDate', width: 200},
            {title: '赎回到期日', dataIndex: 'tEndDate', width: 200}
        ];

        var redemptionStore = new Data.Store({
            url: '../tradeTdaysInfo/findByProductId.json',
            pageSize: 30,
            autoLoad: false
        });


        // redemptionStore.on('exception', function (ev) {
        //     BUI.Message.Alert(ev.error, "error");
        // });

        var redemptionGrid = new Grid.Grid({
            render: '#redemptionGrid',
            columns: redemptionColumns,
            width: '100%',
            loadMask: true,
            store: redemptionStore,
            bbar: {
                pagingBar: false
            },
            autoRender: true
        });

        redemptionGrid.render();

        var redemptionDialog = new Overlay.Dialog({
            width: "30%",
            title: "最近赎回截止日",
            contentId: "redemptionDialog",
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
            if (sender.hasClass('btn-nex')) {
                redemptionDialog.show();
                redemptionStore.load(record);
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
        var assignRedeemForm = new Form.HForm({
            srcNode: "#assignRedeemForm"
        });
        assignRedeemForm.render();
        var terminateForm = new Form.HForm({
            srcNode: "#terminateForm"
        });
        terminateForm.render();
        var assignRedeemDialog = new Overlay.Dialog({
            width: "300",
            contentId: "assignRedeemDialog",
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {
                    var obj = assignRedeemForm.serializeToObject();
                    var id = grid.getSelected().id;
                    obj.id = id;
                    $.ajax({
                        type: "POST",
                        url: "../tradeDetail/assignRedeem.json",
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
        var terminateDialog = new Overlay.Dialog({
            width: "300",
            contentId: "terminateDialog",
            title: '终止',
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {
                    var obj = terminateForm.serializeToObject();
                    var id = grid.getSelected().id;
                    obj.id = id;
                    $.ajax({
                        type: "POST",
                        url: "../tradeDetail/terminate.json",
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
                    data: {id: record.id},
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('取消赎回成功', 'success');
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
            if (!record.oprExamRemark) {
                record.oprExamRemark = '无';
            }
            examForm.setRecord(record);
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

        /*******进行该客户的终止***********/
        $('#terminate').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
            terminateDialog.show();

        });
    });


//将URL中的UTF-8字符串转成中文字符串
function getCharFromUtf8(str) {
    var cstr = "";
    var nOffset = 0;
    if (str == "")
        return "";
    str = str.toLowerCase();
    nOffset = str.indexOf("%e");
    if (nOffset == -1)
        return str;
    while (nOffset != -1) {
        cstr += str.substr(0, nOffset);
        str = str.substr(nOffset, str.length - nOffset);
        if (str == "" || str.length < 9)
            return cstr;
        cstr += utf8ToChar(str.substr(0, 9));
        str = str.substr(9, str.length - 9);
        nOffset = str.indexOf("%e");
    }
    return cstr + str;
}

//将编码转换成字符
function utf8ToChar(str) {
    var iCode, iCode1, iCode2;
    iCode = parseInt("0x" + str.substr(1, 2));
    iCode1 = parseInt("0x" + str.substr(4, 2));
    iCode2 = parseInt("0x" + str.substr(7, 2));
    return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));
}