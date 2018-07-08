
var editFlag = true;
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";




        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';
        var url_findAccrualDetail = contextPath+"accrual/findAccrualDetailByStaffId.json";
        var url_findAccrual = contextPath+"accrual/findAccrual.json";

        /************************************************************************************************/



        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });


        form1.render();

        var Store = Data.Store,
            Columns = [

                {title: '经营机构',dataIndex:'orgName',width:100},

                {title: '理财经理', dataIndex: 'staffName', width: 100},
                {title:'下发月份',dataIndex:'issuedMonth',width:80},
                {title: '科目', dataIndex: 'subjects', width: 100},
                {title: '计提金额', dataIndex: 'sumInitialAccrualAmount', width: 100,renderer:function (value) {
                    return parseFloat(value).toFixed(2)
                }},
                {title: '状态', dataIndex: 'status', width: 100,renderer:function () {
                    return '有效'
                }},
                {title: "计提明细",
                    dataIndex: "id",
                    renderer: function () {
                        return '<span class="grid-command btn-next">查看</span>';
                    },
                    width: '100px'},

            ];


        var store = new Store(
            {
                url: url_findAccrual,
                pageSize: 30,
                params: form1.serializeToObject(),
                //autoLoad: true,
            });


        //store.load();
        var grid = new Grid.Grid({
            render: '#InfoGrid',
            columns: Columns,
            width: '100%',
            loadMask: true,
            store: store,
            bbar: {
                pagingBar: true
            },
            //plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });
        grid.render();



        $("#btnSearch").on("click",function () {
                if($("#issuedMonth").val()==null||$("#issuedMonth").val()==""){
                    BUI.Message.Alert("请输入年月份")
                }else {
                    var obj = form1.serializeToObject();
                    obj.start = 0; // 返回第一页
                    store.load(obj);
                    return false;
                }

        })


        $("#onLineOrOffLine").on("change", function (ev) {
            var onLineOrOffLine = $("#onLineOrOffLine").val();
            if (onLineOrOffLine == "offLine") {
                $("#status").hide();
            } else {
                $("#status").show();
            }
        })



        // //update
        // var accrualForm = new Form.HForm({
        //     srcNode: "#accrualForm"
        // });
        // accrualForm.render();
        // var accrualDialog = new Overlay.Dialog({
        //     width: "800",
        //     height:'500',
        //     contentId: "content",
        //     buttons: [{
        //         text: "保存",
        //         elCls: "button button-primary",
        //         handler: function () {
        //             accrualForm.valid();
        //             if (!accrualForm.isValid()) {
        //                 return;
        //             }
        //
        //             var obj = accrualForm.serializeToObject();
        //             if (editFlag) {
        //                 obj.id = grid.getSelected().id;
        //             }
        //
        //             var url = url_update ;
        //             //var url = url_create;
        //
        //             $.ajax({
        //                 type: "POST",
        //                 url: url,
        //                 data: obj,
        //                 success: function (result) {
        //                     if (result.success) {
        //                         //将后台的对象不刷新页面，重新装载表格
        //                         BUI.Message.Alert('操作成功！', 'success');
        //                         store.load();
        //                         //grid.render();
        //                         accrualDialog.close();
        //                     } else {
        //                         BUI.Message.Alert(result.msg, 'error');
        //                         return;
        //                     }
        //                 }
        //             });
        //             this.close();
        //         }
        //     }, {
        //         text: '关闭',
        //         elCls: 'button',
        //         handler: function () {
        //             this.close();
        //         }
        //     }]
        // });
        //
        // $('#edit').on('click', function () {
        //     var record = grid.getSelected();
        //     if (!record) {
        //         BUI.Message.Alert('请选择一条数据!', 'warning');
        //         return;
        //     }
        //
        //     accrualForm.setRecord(record);
        //
        //
        //     editFlag = true;
        //     //productInfoDialog.set('title', '编辑产品信息');
        //     accrualDialog.show();
        //     //hideOrShow(record);
        // });



        var accrualDetailColumns = [
            {title: '客户名称', dataIndex: 'customerName', width: 80},
            {title: '产品名称', dataIndex: 'productName', width: 150},
            // {title: '预期收益', dataIndex: 'rate', width: 150},
            {title: '起息日期', dataIndex: 'beginDate', width: 100},
            {title: '到期日期', dataIndex: 'endDate', width: 100},
            {title: '期限', dataIndex: 'qxDays', width: 125},
            {title: '来源', dataIndex: 'source', width: 125},
            {title: '交易日期', dataIndex: 'submitTime', width: 125},
            {title: '投资金额', dataIndex: 'amount', width: 125},
            {title: '提前赎回', dataIndex: 'earlyRedem', width: 125},
            {title: '计提金额', dataIndex: 'initialAccrualAmount', width: 125,renderer:function (value) {
                return parseFloat(value).toFixed(2)
            }},
            // {title: '备注', dataIndex: 'remark', width: 125},
            {title: '下发月份', dataIndex: 'issuedMonth', width: 125}
        ];
        var accrualDetailStore = new Data.Store({
            url: url_findAccrualDetail,
            pageSize: 30,
            autoLoad: false
        });
        accrualDetailStore.on('exception', function (ev) {
            BUI.Message.Alert(ev.error, "error");
        });
        var accrualDetailGrid = new Grid.Grid({
            render: '#accrualDetailGrid',
            columns: accrualDetailColumns,
            width: '100%',
            //height:'60%',
            loadMask: true,
            store: accrualDetailStore
            ,
            bbar: {
                pagingBar: false
            },
            autoRender: true
        });
        accrualDetailGrid.render();
        var accrualDetailDialog = new Overlay.Dialog({
            width: "80%",
            title: "业务计提详情表",
            contentId: "accrualDetailDialog",
            buttons: [{
                text: '关闭',
                elCls: 'button',
                handler: function () {
                    this.close();
                }
            }
                , {
                    text: '导出',
                    elCls: 'button button-info',
                    handler: function () {
                        var id = grid.getSelected().id;
                        //window.open("../customerFee/downloadCustomerFee.json?id=" + id);
                    }
                }
            ]
        });
        grid.on("cellclick", function (ev) {
            //$("#accrualDetailGrid").empty()
            var sender = $(ev.domTarget);
            var record = ev.record;
            if (sender.hasClass('btn-next')) {
                accrualDetailDialog.show();
                accrualDetailStore.load(record);
            }
        });


        $("#cal").on("click",function () {
            $.ajax({
                url :'../accrual/addAccrual.json',
                type:'post',
                data:form1.serializeToObject(),
                success:function () {
                    BUI.Message.Alert("计算成功");
                }

            })
        })


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
        var combackOrgTree = new Tree.TreeList({
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
        var comebackOrgPicker = new TreePicker({
            trigger: '#comebackOrgName',
            valueField: '#comebackOrgNo', //如果需要列表返回的value，放在隐藏域，那么指定隐藏域
            width: 250,  //指定宽度
            children: [combackOrgTree] //配置picker内的列表
        });

        orgPicker.render();
        comebackOrgPicker.render();



        $("#export").click(function () {

            if($("#issuedMonth").val()==null||$("#issuedMonth").val()==""){
                BUI.Message.Alert("请输入年月份")
            }else {
                var obj = form1.serializeToObject();
                obj.start = 0; // 返回第一页
                window.open("../accrual/exportAccrual.json?accrualCond=" + JSON.stringify(obj));
            }

        })



    });













