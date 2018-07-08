
//@ sourceURL=customer.js
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";


        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';

        var url_findSalesAndHonour = contextPath+'financiers/findSalesAndHonour.json'

        var url_findAll = contextPath+'financiers/findAll.json'

        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var Store = Data.Store, Columns = [

            {title:'融资方名称',dataIndex:'referred',width:200},
            {title:'统计开始时间',dataIndex:'beginDate',width:200},
            {title:'统计结束时间',dataIndex:'endDate',width:200},

            {title:'销量(万)',dataIndex:'sumsales',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }},
            {title:'兑付量(万)',dataIndex:'sumhonour',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }},
            {title:'存量(万)',dataIndex:'stock',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }}

        ];

        $("#btnSearch").on('click', function () {
                // 序列化成对象
                var obj = form1.serializeToObject();
                obj.start = 0; // 返回第一页
                store.load(obj,function (data) {
                    findCast(data);
                });
                return false;


        });

        var store = new Store(
            {
                url: url_findSalesAndHonour,
                pageSize: 30,
                params: form1.serializeToObject(),
                autoLoad: false,
            });

        // store.load(form1.serializeToObject(),function (data) {
        //     findCast(data);
        // });

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


        $("#exportSales").click(function () {

            var obj = form1.serializeToObject();
            var a = $("#beginDate").val();
            if(a==null||a==""){
                BUI.Message.Alert("请选择查询时间！")
            }else {
                var obj = form1.serializeToObject();

                window.open("../financiers/exportSales.json?financiersCond=" + JSON.stringify(obj));
            }

        })


        $("#onLineexportSalesByFinanciers").click(function () {

            var obj = form1.serializeToObject();
            var a = $("#beginDate").val();
            if(a==null||a==""){
                BUI.Message.Alert("请选择查询时间！")
            }else {
                var obj = form1.serializeToObject();

                window.open("../financiers/exportSalesDetail.json?financiersCond=" + JSON.stringify(obj));
            }

        })


        $.ajax({
            url:url_findAll,

            type:'get',
            success:function (data) {
                if(data.success){
                    $.each(data.value,function (i,item) {
                        $("#onlineFinanciersid").append("<option value='"+item.onlineFinanciersid+"'>"+item.referred+"</option>");
                    })
                }
            }
        })


    });




function findCast(data) {
    var data3 = [];

    $.each(data, function (i, item) {
        var datas3 = {};

        datas3["name"] = item.referred;
        datas3["value"] = (item.sumsales/10000);
        data3.push(datas3);
    })
    data3.pop();
    var myChart = echarts.init(document.getElementById('c1'));
    option = {
        backgroundColor:['#E8E8E8'],
        title : {
            text: '销量-融资方',

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


}













