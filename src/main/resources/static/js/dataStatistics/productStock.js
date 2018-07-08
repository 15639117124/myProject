
//@ sourceURL=customer.js
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";

        var url_findDueTO = contextPath+'tbCustomer/findDueTo.json';
        var url_findDepartSales = contextPath + 'orgInfo/salesAndHonour.json';
        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';
        var url_findInvestByOnlineId =contextPath+'tbInvest/findInvestAndCustomer.json';
        var url_findStockByProduct = contextPath+'product/findStockByProduct.json'

        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var Store = Data.Store, Columns = [

            {title:'产品期限',dataIndex:'qxUnit',width:200},


            {title:'存量（万元）',dataIndex:'sumsales',width:150}

        ];

        $("#btnSearch").on('click', function () {

                // 序列化成对象
                var obj = form1.serializeToObject();
                obj.start = 0; // 返回第一页
                store.load(obj,function (data) {
                    findCastProduct(data);
                });
                return false;


        });

        var store = new Store(
            {
                url: url_findStockByProduct,
                pageSize: 30,
                params: form1.serializeToObject(),
                autoLoad: false,

            });

        store.load(form1.serializeToObject(),function (data) {
            findCastProduct(data);
        });
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
            if($(this).prop("checked")){
                alert($(this).prop("checked"));
                $("#ifSales").prop("value","false");
            }else {
                alert($(this).prop("checked"));
                $("#ifSales").prop("value","true")
            }
            store.load();
            grid.render();
        })


        $("#exportStock").click(function () {

            var obj = form1.serializeToObject();

                var obj = form1.serializeToObject();
                window.open("../product/exportStock.json?productInfoCond=" + JSON.stringify(obj));


        })



        $("#exportOnLineStockByProduct").click(function () {

            var obj = form1.serializeToObject();
            window.open("../tbInvest/exportOnLineStockByProduct.json?customerAndInvestCond=" + JSON.stringify(obj));
        })

        $("#exportOffStockByProduct").click(function () {
            var obj = form1.serializeToObject();

            window.open("../tradeDetail/exportOffStockByProduct.json?tradeDetailInfoCond=" + JSON.stringify(obj));
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




function findCastProduct(data) {
    //$.get("/product/findStockByProduct.json", function (res) {
        var data3 = [];

        $.each(data, function (i, item) {
            var datas3 = {};
            // if(item.qxUnit=='D'){
            //     item.qxUnit = '天'
            // }else if(item.qxUnit=='M'){
            //     item.qxUnit = '个月'
            // }else if(item.qxUnit == 'Y'){
            //     item.qxUnit = '年'
            // }
            datas3["name"] = item.qxUnit;
            datas3["value"] = (item.sumsales/10000);
            data3.push(datas3);
        })
        data3.pop();
        var myChart = echarts.init(document.getElementById('c1'));
        option = {
            backgroundColor:['#E8E8E8'],
            title : {
                text: '融资方-销量',

                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: data3
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:data3,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    //})
}







