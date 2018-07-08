
//@ sourceURL=customer.js
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";

        var url_findDueTO = contextPath+'tbCustomer/findDueTo.json';
        var url_findStock = contextPath + 'orgInfo/findStock.json';
        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';
        var url_findInvestByOnlineId =contextPath+'tbInvest/findInvestAndCustomer.json';

        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var Store = Data.Store, Columns = [

            {title:'经营机构',dataIndex:'orgName',width:200},
            {title:'负责人',dataIndex:'leader',width:100},
            {title:'线上存量(万)',dataIndex:'onLine',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }},
            {title:'线下存量(万)',dataIndex:'offLine',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }},
            {title:'总存量(万)',dataIndex:'sumLine',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }}


        ];

        $("#btnSearch").on('click', function () {

                if($("#orgNo").val()!=""&&$("#orgNo").val()!=null){
                    $("#ifSales").val("false")
                }
                // 序列化成对象
                var obj = form1.serializeToObject();
                obj.start = 0; // 返回第一页
                store.load(obj);
                return false;


        });

        var store = new Store(
            {
                url: url_findStock,
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

        $("#checkIfSales").click(function () {

            if ($(this).prop("checked")) {
                //alert($(this).prop("checked"));
                //$("#ifSales").prop("value", "false");
                $("#ifSales").val("false");


                form1.render();
            } else {
                $("#ifSales").val("true")
                //$("#ifSales").prop("value", "true")
            }
            // store.load();
            // grid.render();

        })


        $("#exportStock").click(function () {

            var obj = form1.serializeToObject();

                var obj = form1.serializeToObject();
                window.open("../orgInfo/exportStock.json?orgInfoCond=" + JSON.stringify(obj));


        })

        $("#exportOnLineStock").click(function () {
            var obj = form1.serializeToObject();

                var obj = form1.serializeToObject();
                window.open("../tbInvest/exportOnLineStock.json?customerAndInvestCond=" + JSON.stringify(obj));

        })

        $("#exportOffLineStock").click(function () {
            var obj = form1.serializeToObject();

            var obj = form1.serializeToObject();
            window.open("../tradeDetail/exportOffLineStock.json?tradeDetailInfoCond=" + JSON.stringify(obj));

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












