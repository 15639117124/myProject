var dialog;
var store = null;
var value = null;
var editFlag = true;
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/calendar', 'bui/tab', 'bui/overlay'],
    function (Form, Grid, Data, Calendar, Tab, Overlay) {
        var contextPath = "../productFeeConfig/";
        var url_query = contextPath + "queryProductFeeConfigInfo.json";
        var url_update = contextPath + "updateProductFeeConfigInfo.json";
        var url_create = contextPath + "createProductFeeConfigInfo.json";
        var url_delete = contextPath + "deleteProductFeeConfigInfo.json";
        /**********************************************渠道费信息Start**************************************************/
        var queryForm = new Form.HForm({
            srcNode: '#J_Form'
        });

        queryForm.render();

        var Store = Data.Store, columns = [
            {
                title: '产品代码', dataIndex: 'productId', width: 200, renderer: function (value, obj) {
                return '<a href="../../product/productPreProfit.html?productId=' + value + '">' + value + '</a>';
            }
            },
            {title: '产品名称', dataIndex: 'productName', width: 200},
            {title: '管理费类型', dataIndex: 'managementFeeType', width: 100},
            {title: '管理费率%', dataIndex: 'managementFeeRate', width: 100},
            {title: '总成本%', dataIndex: 'managementFeeTotal', width: 100},
            {title: '管理费扣除他项(元)', dataIndex: 'managementFeeOther', width: 100},
            {title: '管理费扣除备案费', dataIndex: 'managementRegistrationFeeFlag', width: 100},
            {title: '管理费扣除承销费', dataIndex: 'managementConsignmentFeeFlag', width: 100},
            {title: '管理费是否循环', dataIndex: 'managementCycleFlag', width: 100},
            {title: '承销费类型', dataIndex: 'consignmentFeeType', width: 100},
            {title: '承销费率%', dataIndex: 'consignmentFeeRate', width: 100},
            {title: '承销费扣除他项(元)', dataIndex: 'consignmentFeeOther', width: 100},
            {title: '承销费是否循环', dataIndex: 'consignmentCycleFlag', width: 100},
            {title: '备案费类型', dataIndex: 'registrationFeeType', width: 100},
            {title: '备案费率%', dataIndex: 'registrationFeeRate', width: 100},
            {title: '备案费扣除他项(元)', dataIndex: 'registrationFeeOther', width: 100},
            {title: '备案费是否循环', dataIndex: 'registrationCycleFlag', width: 100}
        ];
        store = new Store(
            {
                url: url_query,
                pageSize: 30,
                params: queryForm.serializeToObject(),
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
            }, plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });
        grid.render();

        $("#btnSearch").on('click', function () {
            // 序列化成对象
            var obj = queryForm.serializeToObject();
            obj.start = 0; // 返回第一页
            store.load(obj);
            return false;
        });
        /*******加载弹出框***********/
        var form = new Form.HForm({
            srcNode: "#form"
        });
        form.render();

        var dialog = new Overlay.Dialog({
            width: "85%",
            contentId: "dialog",
            buttons: [{
                text: "保存",
                elCls: "button button-primary",
                handler: function () {
                    form.valid();
                    if (!form.isValid()) {
                        return;
                    }

                    var obj = form.serializeToObject();
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
                                dialog.close();
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

        $('#add').on('click', function () {
            dialog.set('initRecord', {});
            $('#productId').removeAttr("readonly");
            $('#productName').removeAttr("readonly");
            editFlag = false;
            dialog.set('title', '添加产品信息');
            form.clearFields();
            dialog.show();
            $("#form input[name='registrationFeeOther']").val(0);
            $("#form input[name='consignmentFeeOther']").val(0);
            $("#form input[name='managementFeeOther']").val(0);
            controlManagementFeeType("总成本");
            controlRegistrationFeeType("一次性");
            controlConsignmentFeeType("一次性")
        });
        $('#edit').on('click', function () {
            var record = grid.getSelected();
            if (!record) {
                BUI.Message.Alert('请选择一条数据!', 'warning');
                return;
            }
            form.setRecord(record);
            // $('#productId').attr("disabled",true);
            $('#productId').attr("readonly", "readonly");
            $('#productName').attr("readonly", "readonly");

            controlManagementFeeType(record.managementFeeType);
            controlRegistrationFeeType(record.registrationFeeType);
            controlConsignmentFeeType(record.consignmentFeeType);


            editFlag = true;
            dialog.set('title', '编辑产品信息');
            dialog.show();

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
        $("#managementFeeType").on("change", function (ev) {
            var managementFeeType = $("#managementFeeType").val();
            controlManagementFeeType(managementFeeType);
        });
        $("#registrationFeeType").on("change", function (ev) {
            var registrationFeeType = $("#registrationFeeType").val();
            controlRegistrationFeeType(registrationFeeType);
        });
        $("#consignmentFeeType").on("change", function (ev) {
            var consignmentFeeType = $("#consignmentFeeType").val();
            controlConsignmentFeeType(consignmentFeeType)
        });

        function controlManagementFeeType(managementFeeType) {
            var managementFeeRate = $("#form input[name='managementFeeRate']");
            if (managementFeeType != "总成本") {
                $("#managementFeeTotal").hide();
                managementFeeRate.removeAttr("readonly");
            } else {
                $("#managementFeeTotal").show();
                managementFeeRate.val(0);
                managementFeeRate.attr("readonly", "readonly");
            }
            if (managementFeeType == '无') {
                $("#managementCycleFlag").hide();
            } else {
                $("#managementCycleFlag").show();
            }
        }

        function controlRegistrationFeeType(registrationFeeType) {
            if (registrationFeeType == "无") {
                $("#registrationCycleFlag").hide();
            } else {
                $("#registrationCycleFlag").show();

            }
        }

        function controlConsignmentFeeType(consignmentFeeType) {
            if (consignmentFeeType == "无") {
                $("#consignmentCycleFlag").hide();
            } else {
                $("#consignmentCycleFlag").show();
            }
        }
    });