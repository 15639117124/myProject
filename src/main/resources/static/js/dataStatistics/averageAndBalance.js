
//@ sourceURL=customer.js
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";

        var url_findDueTO = contextPath+'tbCustomer/findDueTo.json';
        var url_findAverageAndBalance = contextPath + 'udJrzcAllo/findAverageAndBalance.json';
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


            {title:'线下余额(万)',dataIndex:'offLineYe',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }},
            {title:'线上余额(万)',dataIndex:'onLineYe',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }},
            {title:'累计存量(万)',dataIndex:'jrzcYe',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }},
            {title:'周新增(万)',dataIndex:'yeWeek',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }},
            {title:'月新增(万)',dataIndex:'yeMonth',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }},
            {title:'季新增(万)',dataIndex:'yeQuarter',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }},
            {title:'季度日均(万)',dataIndex:'jrzcJrj',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }},
            {title:'职务',dataIndex:'position',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }},
            {title:'入职时间',dataIndex:'inductionTime',width:200,renderer:function (value) {
                if(value==null){
                    return"";
                }else {
                    return (value/10000).toFixed(1);
                }

            }},
            {title:'日期',dataIndex:'sjDate',width:200}

        ];

        $("#btnSearch").on('click', function () {
            var a = $("#beginDate").val();

            if(a==null||a==""){
                alert("查询时间为必填项")
            }else {
                // 序列化成对象
                if($("#orgNo").val()!=""&&$("#orgNo").val()!=null){
                    $("#ifSales").val("false")
                }
                var obj = form1.serializeToObject();
                obj.start = 0; // 返回第一页
                store.load(obj);
                return false;
            }

        });

        var store = new Store(
            {
                url: url_findAverageAndBalance,
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


        $("#exportExcel").click(function () {

            var obj = form1.serializeToObject();
            var a = $("#beginDate").val();
            if(a==null||a==""){
                BUI.Message.Alert("请选择查询时间！")
            }else {
                var obj = form1.serializeToObject();
                window.open("../udJrzcAllo/exportAverageAndBalance.json?udJrzcAlloCond=" + JSON.stringify(obj));
            }

        })


        $("#exportUja").click(function () {

            var obj = form1.serializeToObject();
            var a = $("#beginDate").val();
            if(a==null||a==""){
                BUI.Message.Alert("请选择查询时间！")
            }else {
                var obj = form1.serializeToObject();
                window.open("../udJrzcAllo/exportUja.json?udJrzcAlloCond=" + JSON.stringify(obj));
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












