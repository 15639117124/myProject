
//@ sourceURL=customer.js
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";

        var url_findDueTO = contextPath+'tbCustomer/findDueTo.json';
        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';
        var url_findInvestByOnlineId =contextPath+'tbInvest/findInvestAndCustomer.json';

        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var Store = Data.Store, Columns = [

            {title:'经营机构',dataIndex:'ownerOrg',width:200},
            {title:'负责人',dataIndex:'z',width:100},
            {title:'开始时间',dataIndex:'beginDate',width:200},
            {title:'到期时间',dataIndex:'endDate',width:200},
            {title:'线上到期(万)',dataIndex:'x',width:200,renderer:function (value) {
                return (value/10000).toFixed(2);
            }},
            {title:'线下到期(万)',dataIndex:'y',width:200,renderer:function (value) {
                return (value/10000).toFixed(2);
            }},
            {title:'总到期(万)',dataIndex:'x',width:200,renderer:function (value,obj) {
                if(obj.x==null||obj.x==""){
                    var a = parseInt(obj.y);
                }else if (obj.y==null||obj.y==""){
                    var a = parseInt(obj.x);
                }else {
                    var a = parseInt(obj.x)+parseInt(obj.y);
                }

                return (a/10000).toFixed(2);
            } }

        ];

        $("#btnSearch").on('click', function () {
            var a = $("#beginDate").val();
            var b = $("#endDate").val();

            if(a==null||a==""||b==null||b==""){
                alert("查询时间为必填项")
            }else {
                if($("#orgNo").val()!=""&&$("#orgNo").val()!=null){
                    $("#ifSales").val("false")
                }
                // 序列化成对象
                var obj = form1.serializeToObject();
                obj.start = 0; // 返回第一页
                store.load(obj);
                return false;
            }

        });


        var store = new Store(
            {
                url: url_findDueTO,
                pageSize: 30,
                params: form1.serializeToObject(),
                autoLoad: false,
            });

        // store.load();
        var grid = new Grid.Grid({
            render: '#InfoGrid',
            columns: Columns,
            width: '100%',
            loadMask: true,
            store: store
            // bbar: {
            //     pagingBar: true
            // }
            //, plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });
        grid.render();


        $("#exportDueTo").click(function () {
            var obj = form1.serializeToObject();
            window.open("../tbCustomer/export.json?customerCond=" + JSON.stringify(obj));
        })


        $("#exportOnlineDueTo").click(function () {
            var obj = form1.serializeToObject();
            var a = $("#beginDate").val();
            if(a==null||a==""){
                BUI.Message.Alert("请选择查询时间！")
            }else {
                var obj = form1.serializeToObject();
                window.open("../tbInvest/exportOnlineDueTo.json?customerAndInvestCond=" + JSON.stringify(obj));
            }
        })


        $("#exportOffLineDueTo").click(function () {
            var obj = form1.serializeToObject();
            var a = $("#beginDate").val();
            if(a==null||a==""){
                BUI.Message.Alert("请选择查询时间！")
            }else {
                var obj = form1.serializeToObject();
                window.open("../tradeDetail/exportOffLineDueTo.json?tradeDetailInfoCond=" + JSON.stringify(obj));
            }
        })



        $("#checkIfSales").click(function () {
            if ($(this).prop("checked")) {
                $("#ifSales").val("false");
                form1.render();
            } else {
                $("#ifSales").val("true")
            }
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



    });












