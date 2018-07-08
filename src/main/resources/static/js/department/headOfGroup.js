$(document).ready(function () {

    // $.ajaxSetup({
    //     async: false
    // });
    findAssetOfGroup();
    findOnlineAssetOfGroup();
    findOfflineAssetOfGroup();
    weekOfIncrementalOfGroup();
    seasonOfIncrementalOfGroup();
    onlineRecentOfGroup();
    offlineRecentOfGroup();
    findBanlanceOfGroup();
    seasonAverageDailyOfGroup();
    sad_weekOfIncrementalOfGroup();
    sad_seasonOfIncrementalOfGroup();
    findSumCustomerOfGroup();
    findLevel_OneCustomerOfGroup();
    findLevel_TwoCustomerOfGroup();

    findGroup_effective_customer();
    findGroup_flow_customer();
    findGroup_noCard_customer();

    groupOverview();
    $("#online_oneWeek").trigger("click");
    $("#offline_oneWeek").trigger("click")
    $("#s_chart1").trigger("change");
    $("#s_chart2").trigger("change");
    $("#s_chart3").trigger("change");
    $("#s_chart5").trigger("change");
    $("#s_chart6").trigger("change");
    findOrgNoAndJrzcyeOfGroup();
    findCastProduct();

    setTimeout('grouptablesorter()',2000);



    // BUI.use('bui/overlay',function(Overlay){
    //     var dialog = new Overlay.Dialog({
    //         title:'',
    //         width:500,
    //         height:300,
    //         mask:false,
    //         buttons:[],
    //         bodyContent:'<p>这是一个非模态窗口,并且不带按钮</p>'
    //     });
    //
    //     setTimeout(
    //         aa()
    //         ,4000
    //     );
    //     function aa() {
    //         $(".trClass").mouseover(function () {
    //             //$(this).css("background-color","#eeeeee");
    //             dialog.show();
    //         });
    //         $(".trClass").mouseout(function () {
    //             dialog.close();
    //         });
    //
    //     }
    //
    // });

})
//
function grouptablesorter() {
    $.tablesorter.defaults.headers = {0: {sorter: false}};
    $(".tablesorter").tablesorter({sortList:[[1,1]]});

}

function findAssetOfGroup() {
    $.get("/udJrzcAllo/findAssetOfGroup.json",function (res) {
        if(res!=null&&res!=""){
            $("#assetOfGroup").html(fmoney(((res/10000).toFixed(2)),3));
        }else {
            $("#assetOfGroup").html("0.00");
        }

    })
}

function findOnlineAssetOfGroup() {
    $.get("/udJrzcAllo/findOnlineAssetOfGroup.json",function (res) {

        if(res!=null&&res!=""){
            $("#onlineAssetOfGroup").html(fmoney(((res/10000).toFixed(2)),3));
        }else {
            $("#onlineAssetOfGroup").html("0.00");
        }
    })
}

function findOfflineAssetOfGroup() {
    $.get("/udJrzcAllo/findOfflineAssetOfGroup.json",function (res) {

        if(res!=null&&res!=""){
            $("#offlineAssetOfGroup").html(fmoney(((res/10000).toFixed(2)),3));
        }else {
            $("#offlineAssetOfGroup").html("0.00");
        }
    })
}

function weekOfIncrementalOfGroup() {
    $.get("/udJrzcAllo/weekOfIncrementalOfGroup.json",function (res) {

        if(res!=null&&res!=""){
            if(res<0){
                $("#weekOfIncrementalOfGroup").css("color","#00CC00")
                $("#weekOfIncrementalOfGroup").html("-"+fmoney(((Math.abs(res)/10000).toFixed(2)),3));
            }else {
                $("#weekOfIncrementalOfGroup").css("color","#F80000")
                $("#weekOfIncrementalOfGroup").html(fmoney(((Math.abs(res)/10000).toFixed(2)),3));
            }

        }else {
            $("#weekOfIncrementalOfGroup").html("0.00");
        }
    })
}

function seasonOfIncrementalOfGroup() {
    $.get("/udJrzcAllo/seasonOfIncrementalOfGroup.json",function (res) {

        if(res!=null&&res!=""){
            if(res<0){
                $("#seasonOfIncrementalOfGroup").css("color","#00CC00")
                $("#seasonOfIncrementalOfGroup").html("-"+fmoney(((Math.abs(res)/10000).toFixed(2)),3));
            }else {
                $("#seasonOfIncrementalOfGroup").css("color","#F80000")
                $("#seasonOfIncrementalOfGroup").html(fmoney(((Math.abs(res)/10000).toFixed(2)),3));
            }
        }else {
            $("#seasonOfIncrementalOfGroup").html("0.00");
        }
    })
}

function onlineRecentOfGroup() {
    $.get("/tbInvest/onlineRecentOfGroup.json",function (res) {
        if(res!=null&&res!=""){
            $("#onlineRecentOfGroup").html(fmoney(((res/10000).toFixed(2)),3));
        }else {
            $("#onlineRecentOfGroup").html("0.00");
        }
    })
}

function offlineRecentOfGroup() {
    $.get("/tradeDetail/offlineRecentOfGroup.json",function (res) {

        if(res!=null&&res!=""){
            $("#offlineRecentOfGroup").html(fmoney(((res/10000).toFixed(2)),3));
        }else {
            $("#offlineRecentOfGroup").html("0.00");
        }
    })
}

function findBanlanceOfGroup() {
    $.get("/tbCustomer/findBanlanceOfGroup.json",function (res) {

        if(res!=null&&res!=""){
            $("#banlanceOfGroup").html(fmoney(((res/10000).toFixed(2)),3));
        }else {
            $("#banlanceOfGroup").html("0.00");
        }
    })
}

function seasonAverageDailyOfGroup() {
    $.get("/udJrzcAllo/seasonAverageDailyOfGroup.json",function (res) {

        if(res!=null&&res!=""){
            $("#seasonAverageDailyOfGroup").html(fmoney(((res/10000).toFixed(2)),3));
        }else {
            $("#seasonAverageDailyOfGroup").html("0.00");
        }
    })
}

function sad_weekOfIncrementalOfGroup() {
    $.get("/udJrzcAllo/sad_weekOfIncrementalOfGroup.json",function (res) {
        if(res!=null&&res!=""){

            if(res<0){
                $("#sad_weekOfIncrementalOfGroup").css("color","#00CC00")
                $("#sad_weekOfIncrementalOfGroup").html("-"+fmoney(((Math.abs(res)/10000).toFixed(2)),3));
            }else {
                $("#sad_weekOfIncrementalOfGroup").css("color","#F80000")
                $("#sad_weekOfIncrementalOfGroup").html(fmoney(((Math.abs(res)/10000).toFixed(2)),3));
            }

        }else {
            $("#sad_weekOfIncrementalOfGroup").html("0.00");
        }
    })
}

function sad_seasonOfIncrementalOfGroup() {
    $.get("/udJrzcAllo/sad_seasonOfIncrementalOfGroup.json",function (res) {

        if(res!=null&&res!=""){
            if(res<0){
                $("#sad_seasonOfIncrementalOfGroup").css("color","#00CC00")
                $("#sad_seasonOfIncrementalOfGroup").html("-"+fmoney(((Math.abs(res)/10000).toFixed(2)),3));
            }else {
                $("#sad_seasonOfIncrementalOfGroup").css("color","#F80000")
                $("#sad_seasonOfIncrementalOfGroup").html(fmoney(((Math.abs(res)/10000).toFixed(2)),3));
            }
        }else {
            $("#sad_seasonOfIncrementalOfGroup").html("0.00");
        }
    })
}
//集团总客户数
function findSumCustomerOfGroup() {
    $.get("/tbCustomer/findSumCustomerOfGroup.json",function (res) {
        $("#sumCustomerOfGroup").find("a").html(res);
    })
}

//集团机构客户数
function findLevel_OneCustomerOfGroup() {
    $.get("/tbCustomer/findLevel_OneCustomerOfGroup.json",function (res) {
        $("#Level_OneCustomerOfGroup").find("a").html(res);
    })
}

//集团未落客户数
function findLevel_TwoCustomerOfGroup() {
    $.get("/tbCustomer/findLevel_TwoCustomerOfGroup.json",function (res) {
        $("#Level_TwoCustomerOfGroup").find("a").html(res);
    })
}
//集团有效客户数
function findGroup_effective_customer() {
    $.ajax({
        url:"/tbCustomer/findGroup_effective_customer.json",
        type:'get',
        success:function (result) {
            if(result==""||result==0){
                $("#group_effective_customer").find("a").html("0.00");
            }else {
                $("#group_effective_customer").find("a").html(result);
            }
        }
    })
}

//集团流失客户数
function findGroup_flow_customer() {
    $.ajax({
        url:"/tbCustomer/findGroup_flow_customer.json",
        type:'post',
        success:function (result) {
            if(result==""||result==0){
                $("#group_flow_customer").find("a").html("0.00");
            }else {
                $("#group_flow_customer").find("a").html(result);
            }
        }
    })
}

//集团为绑卡客户数
function findGroup_noCard_customer() {
    $.ajax({
        url:"/tbCustomer/findGroup_noCard_customer.json",
        type:'post',
        success:function (result) {
            if(result==""||result==0){
                $("#group_noCard_customer").find("a").html("0.00");
            }else {
                $("#group_noCard_customer").find("a").html(result);
            }
        }
    })
}


function groupOverview() {
    $("#groupOverview").empty();
    $.get("/BiDailyManagers/groupOverview.json",function (res) {
        $.each(res,function (i,item) {
            groupOverview_addLine(-1);
            groupOverview_updateLine(-1,item);
        })
    })
}
function groupOverview_addLine(id) {
    $("#groupOverview").append("<tr id='"+id+"'><td></td><td></td><td></td><td></td><td></td><td></td></tr>")
}

function groupOverview_updateLine(id,item) {
    $tr =$("#groupOverview tr[id='"+id+"']")
    $tr.attr("id",item.ownerId);
    $tr.attr("class","trClass");
    $td = $tr.find("td:first")
    //$td.html(item.ownerOrg);
    $td.html("<a href='headOfInstitution.html?headOfGroup"+item.ownerId+"'>"+item.ownerOrg+"</a>")
    $td = $td.next();
    $td.html((item.investAmounts/10000).toFixed(2));

    $td = $td.next();
    $td.html((item.status/10000).toFixed(2));
    $td=$td.next();
    $td.html(item.customerNumbers);
    $td = $td.next();
    $td.html(item.nobankNumbers);
    $td=$td.next();
    $td.html(item.leaveNumbers)
}

function onlineRecentOfGroupRemind(time) {
    $("#onlineRecentOfGroupRemind").empty();
    $.get("/tbInvest/onlineRecentOfGroupRemind.json",{"time":time},function (res) {
        $.each(res,function (i,item) {
            onLine_addLine(-1);
            onLine_updateLine(-1,item);
        })
    })
}

function onLine_addLine(id) {
    $("#onlineRecentOfGroupRemind").append(
        "<tr id='"+id+"'><td></td><td></td></tr>"
    );
}
//往动态创建的tr中添加数据
function onLine_updateLine(id,item) {
    $tr=$("#onlineRecentOfGroupRemind tr[id='"+id+"']");
    $td = $tr.find("td:first");
    $td.html("<a href='headOfInstitution.html?headOfGroup"+item.ownerId+"'>"+item.ownerOrg+"</a>");
    $td = $td.next();
    $td.html((item.amount/10000).toFixed(2));
    $tr.attr("id",item.ownerOrgId);
}

function offlineRecentOfGroupRemind(time) {
    $("#offlineRecentOfGroupRemind").empty();
    $.get("/tradeDetail/offlineRecentOfGroupRemind.json",{"time":time},function (res) {
        $.each(res,function (i,item) {
            offLine_addLine(-1);
            offLine_updateLine(-1,item)
        })
    })
}
function offLine_addLine(id) {
    $("#offlineRecentOfGroupRemind").append(
        "<tr id='"+id+"'><td></td><td></td></tr>"
    );
}
//往动态创建的tr中添加数据

function offLine_updateLine(id,item) {

    $tr=$("#offlineRecentOfGroupRemind tr[id='"+id+"']");
    $td = $tr.find("td:first");
    $td.html("<a href='headOfInstitution.html?headOfGroup"+item.userId+"'>"+item.orgName+"</a>");
    $td = $td.next();
    $td.html((item.buyMoney/10000).toFixed(2));
    $tr.attr("id",item.orgNo)
}



//线图1，线图2，柱状图1，柱状图2
function chart1(cycle) {
    $.get("/BiDailyManagers/findBiDailyGroup.json",{"cycle":cycle}, function (res) {
        var data1 = [];
        var data2 = [];
        $.each(res, function (i, item) {
            var ymd = item.belongDate;
            var md = ymd.substring(5);
            data1.push(md);
            data2.push(item.customerNumbers);
        });
        //线图1
        var myChart1 = echarts.init(document.getElementById('c1'));
        var option = {
            yAxis: [
                {
                    type: 'value',
                    name: '客户数量'
                }
            ],

            title: {
                text: '客户数量',
                left: 'center'
            },
            backgroundColor: ['#E8E8E8'],
            color: ['#3398DB'],
            tooltip: {},
            xAxis: {
                // type: 'category',
                boundaryGap: false,
                data: data1
            },
            yAxis: {
                type: 'value'
            },

            series: [
                {
                    name: '客户数量',
                    type: 'line',
                    stack: '总量',
                    data: data2
                }

            ]
        };
        myChart1.setOption(option);
    });
};

function chart2(cycle) {
    $.get("/BiDailyManagers/findBiDailyGroup.json",{"cycle":cycle}, function (res) {
        var data3 = [];
        var data4 = []
        $.each(res, function (i, item) {
            var ymd = item.belongDate;
            var md = ymd.substring(5);

            data3.push(md);
            data4.push((item.investAmounts) / 10000);
        });

        //线图2
        var myChart2 = echarts.init(document.getElementById('c2'));
        var option2 = {
            title: {
                text: '资产规模',
                left: 'center'
            },
            yAxis: [
                {
                    type: 'value',
                    name: '资产规模'
                }
            ],
            backgroundColor: ['#E8E8E8'],
            color: ['#3398DB'],
            xAxis: {
                // type: 'category',
                boundaryGap: false,
                data: data3
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '资产规模',
                    type: 'line',
                    stack: '总量',
                    data: data4
                }

            ]
        };
        myChart2.setOption(option2);

    })
};

function chart3(cycle) {
    $.get("/BiDailyManagers/findBiDailyGroup.json",{"cycle":cycle}, function (res) {
        var data5 = [];
        var data6 = [];
        $.each(res, function (i, item) {
            var ymd = item.belongDate;
            var md = ymd.substring(5);
            data5.push(md);
            data6.push(item.nobankNumbers);

        });
        var myChart3 = echarts.init(document.getElementById('c5'));
        //指定图表的配置项和数据
        var option3 = {
            backgroundColor: ['#E8E8E8'],
            color: ['#3398DB'],
            tooltip: {},
            legend: {
                data: ['未绑卡客户']
            },

            xAxis: {
                data: data5
            },
            yAxis: {
                name: '未绑卡客户数量'
            },
            series: [{
                name: '未绑卡客户',
                type: 'bar',
                data: data6
            }]
        };
        myChart3.setOption(option3);
        // myChart3.on("click", function (params) {
        //     //$("#b3").append("<a id='toCustomer' style='display: none' href='../../customer/tbCustomer.html?index="+params.name+"'><button id='btn' type='button'></button></a>")
        //     $("#b3").append("<a id='toCustomer' style='display: none' href='../../customer/tbCustomer.html?mes=nob'><button id='btn' type='button'></button></a>")
        //
        //     $("#btn").trigger("click");
        // })
    })
};
function chart4(cycle) {
    $.get("/BiDailyManagers/findBiDailyGroup.json",{"cycle":cycle}, function (res) {
        var data7 = [];
        var data8 = [];
        $.each(res, function (i, item) {
            var ymd = item.belongDate;
            var md = ymd.substring(5);
            data7.push(md);
            data8.push(item.leaveNumbers);
        });
        //柱状图2
        var myChart4 = echarts.init(document.getElementById('c6'));
        //指定图表的配置项和数据
        var option4 = {
            backgroundColor: ['#E8E8E8'],
            color: ['#3398DB'],
            tooltip: {},
            legend: {
                data: ['客户流失量']
            },
            xAxis: {
                data: data7
            },
            yAxis: {
                name: '客户流失数量'
            },
            series: [{
                name: '客户流失量',
                type: 'bar',
//                data: [5, 20, 36, 10, 10, 20]
                data: data8
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart4.setOption(option4);
        // myChart4.on("click", function (params) {
        //     //$("#b3").append("<a id='toCustomer' style='display: none' href='../../customer/tbCustomer.html?index="+params.name+"'><button id='btn' type='button'></button></a>")
        //     $("#c6").append("<a id='toCustomer' style='display: none' href='../../customer/tbCustomer.html?mes=leave'><button id='btn' type='button'></button></a>")
        //     $("#btn").trigger("click");
        // })
    })
};


//月均、季均、年均图
function chart5(cycle) {
    $.get("/udJrzcAllo/findAverageDailyCyeleOfGroup.json", {"cycle": cycle}, function (res) {

        var datax = [];
        var datamonth = [];
        var dataquarter = [];
        var datayear = [];
        $.each(res, function (i, item) {

            datamonth.push((item.jrzcYrj / 10000).toFixed(2));
            dataquarter.push((item.jrzcJrj / 10000).toFixed(2));
            datayear.push((item.jrzcNrj / 10000).toFixed(2));

            var ymd = item.sjrq;
            var md = ymd.substring(5);
            datax.push(md);


        })
        var myChart = echarts.init(document.getElementById('c3'));
        option = {
            backgroundColor: ['#E8E8E8'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['月日均', '季日均', '年日均']
            },

            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: datax
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '日均（万元）'
                }
            ],
            series: [
                {
                    name: '月日均',
                    type: 'line',
                    stack: '1',
                    data: datamonth
                },
                {
                    name: '季日均',
                    type: 'line',
                    stack: '2',
                    data: dataquarter
                },
                {
                    name: '年日均',
                    type: 'line',
                    stack: '3',
                    data: datayear
                }
            ]
        };
        myChart.setOption(option);
    })
}


//经营机构资产规模
function findOrgNoAndJrzcyeOfGroup() {
    $.get("/udJrzcAllo/findOrgNoAndJrzcyeOfGroup.json", function (res) {
        var data3 = [];


        $.each(res, function (i, item) {

            var datas3 = {};

            datas3["name"] = item.orgName;
            datas3["value"] = (((item.jrzcYe)/10000).toFixed(2));
            data3.push(datas3);
        })
        var myChart = echarts.init(document.getElementById('c4'));
        option = {
            backgroundColor:['#E8E8E8'],
            title : {
                text: '经营机构资产规模',

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
                    name: '资产规模',
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
    })
}


function findCastProduct() {
    $.get("/tradeDetail/findCastProductOfGroup.json", function (res) {
        var data3 = [];

        $.each(res, function (i, item) {
            var datas3 = {};
            if(item.qxUnit=='D'){
                item.qxUnit = '天'
            }else if(item.qxUnit=='M'){
                item.qxUnit = '个月'
            }else if(item.qxUnit == 'Y'){
                item.qxUnit = '年'
            }
            datas3["name"] = item.qxDays + item.qxUnit;
            datas3["value"] = (item.buyMoney/10000);
            data3.push(datas3);
        })
        var myChart = echarts.init(document.getElementById('c7'));
        option = {
            backgroundColor:['#E8E8E8'],
            title : {
                text: '在投产品（万元）(按期限统计)',

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
    })
}


//格式化金额
function fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}