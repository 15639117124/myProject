



function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null)
        return unescape(decodeURI(r[2]));
    return null; //返回参数值
}
var productId = getUrlParam("productId");
$("#productIdQueryForm").val(productId);

BUI.use(['bui/form', 'bui/data', 'bui/grid', 'bui/overlay'],
    function (Form, Data, Grid, Overlay) {
        var contextPath = "../";

        var url_query = contextPath + 'productPreProfit/queryProductPreProfit.json';
        var url_create = contextPath + 'productPreProfit/createProductPreProfit.json';
        var url_update = contextPath + 'productPreProfit/updateProductPreProfit.json';
        var url_delete = contextPath + 'productPreProfit/deleteProductPreProfit.json';

        $("#upload").bind("click", function () {
            BUI.Message.Confirm('同一Excel文件请不要重复上传，确定要进行文件上传操作吗？', function () {
                var dialog = new Overlay.Dialog({
                    title: '产品预期收益率导入',
                    width: '30%',
                    closeAction: "remove",
                    loader: {
                        url: 'uploadProductPreProfit.html',
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

        var queryForm = new Form.HForm({
            srcNode: '#queryForm',
            autoRender: true
        });

        var columns = [
            {title: '产品代码', dataIndex: 'productId', width: 150},
            {title: '产品名称', dataIndex: 'productName', width: 150},
            {title: '投资者类型', dataIndex: 'buyType', width: 80},
            {title: '阶段开始', dataIndex: 'divideBeginDate', width: 80},
            {title: '阶段截止', dataIndex: 'divideEndDate', width: 80},
            {title: '认购金额起点', dataIndex: 'buyMoneyBegin', width: 90},
            {title: '认购金额止点', dataIndex: 'buyMoneyEnd', width: 90},
            {title: '预期收益率%', dataIndex: 'rate', width: 80},
            {title: '产品期限说明', dataIndex: 'productDescription', width: 100}
        ];
        var productPreProfitStore = new Data.Store({
            proxy: {
                method: "POST",
                dataType: "json"
            },
            url: url_query,
            pageSize: 30,
            params: queryForm.toObject(),
            autoLoad: false
        });
        var productPreProfitGrid = new Grid.Grid({
            render: '#productPreProfitGrid',
            columns: columns,
            width: '100%',
            loadMask: true,
            store: productPreProfitStore,
            emptyDataTpl: '<div class="centered"><img alt="Crying" src="../../custom/img/crying.png"><h2>数据不存在，请检查查询条件</h2></div>',
            bbar: {
                pagingBar: true
            },
            plugins: [Grid.Plugins.RadioSelection],
            autoRender: true
        });
        var productPreProfitForm = new Form.HForm({
            srcNode: '#productPreProfitForm'
        });

        productPreProfitForm.render();
        productPreProfitGrid.on('itemclick', function (ev) {
            productPreProfitForm.enable();
            var item = ev.item;
            productPreProfitForm.setRecord(item);
            productPreProfitForm.disable();
            disableBtnEdit();
        });

        $('#btnSearch').on('click', function () {
            productPreProfitStore.load(queryForm.toObject());
        });
        if (productId) {
            productPreProfitStore.load(queryForm.toObject());
        }
        function enableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', false);
        }

        function disableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', true);
        }

        productPreProfitForm.disable();
        disableBtnEdit();
        var operation = '';

        $('#add').on('click', function () {

            operation = 'add';
            productPreProfitForm.enable();
            enableBtnEdit();

            productPreProfitForm.clearFields();
            productPreProfitForm.valid();
            $("#btnSave").html("新增");
        });

        $('#edit').on('click', function () {
            var item = productPreProfitGrid.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择一条记录', 'error');
                return;
            }

            operation = 'edit';
            enableBtnEdit();
            productPreProfitForm.enable();
            $("#btnSave").html("修改");
        });
        $('#copy').on('click', function () {
            var item = productPreProfitGrid.getSelected();
            productPreProfitForm.setRecord(item);
            if (item == null) {
                BUI.Message.Alert('请选择一条记录', 'error');
                return;
            }

            operation = 'copy';
            enableBtnEdit();
            productPreProfitForm.enable();
            $("#btnSave").html("复制提交");
        });
        $("#download").on('click', function () {
            window.open("../doc/productPreProfitTemplate.xls");
        });
        $('#delete').on('click', function () {
            var item = productPreProfitGrid.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择要删除的记录', 'error');
                return;
            }

            BUI.Message.Confirm("确定要删除当前记录吗？", function () {

                $.ajax({
                    url: url_delete,
                    type: 'post',
                    data: {id: item.id},
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('删除成功', 'success');
                            productPreProfitStore.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                        }
                    }
                })

            }, 'question');

        });

        $('#btnReset').on('click', function () {

            if (operation === 'add') {
                productPreProfitForm.clearFields();
            } else if (operation === 'edit') {
                var item = productPreProfitGrid.getSelected();
                productPreProfitForm.setRecord(item);

            }
        });

        $('#btnSave').on('click', function () {
            productPreProfitForm.valid();
            var item = productPreProfitGrid.getSelected();
            if (!productPreProfitForm.isValid()) {
                return;
            }
            var buyMoneyBegin = Number($.trim($("#buyMoneyBegin").val()));
            var buyMoneyEnd = Number($.trim($("#buyMoneyEnd").val()));
            if (buyMoneyBegin > buyMoneyEnd) {
                BUI.Message.Alert("认购金额起点不能大于止点", "warning");
                return;
            }
            var data = productPreProfitForm.toObject();
            disableBtnEdit();
            if (operation === 'edit') {
                data.id = item.id;
                $.ajax({
                    url: url_update,
                    type: 'post',
                    data: data,
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('修改成功', 'success');
                            productPreProfitStore.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                            enableBtnEdit();
                        }
                    }
                })

            } else {
                $.ajax({
                    url: url_create,
                    type: 'post',
                    data: data,
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('添加成功', 'success');
                            productPreProfitStore.load();
                        } else {
                            BUI.Message.Alert(data.msg, 'error');
                            enableBtnEdit();
                            productPreProfitForm.enable();
                        }
                    }
                });
            }
        });
    });