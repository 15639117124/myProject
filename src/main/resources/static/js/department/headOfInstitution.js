
var loginName = getCharFromUtf8(location.search).substring(12);

var from = getCharFromUtf8(location.search).substring(1,12);
if(from!="headofgroup"){
    loginName="";
}


function findAssetOfOrgNo(loginName) {
    $.get("/department/findAssetOfOrgNo.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            $("#assetOfOrgNo").html((res/10000).toFixed(2));
        }else {
            $("#assetOfOrgNo").html("0.00");
        }

    })
}

function findOnlineAssetOfOrgNo(loginName) {
    $.get("/department/findOnlineAssetOfOrgNo.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            $("#onlineAsset").html((res/10000).toFixed(2));
        }else{
            $("#onlineAsset").html("0.00");
        }

    })
}
function findOfflineAssetOfOrgNo(loginName) {
    $.get("/department/findOfflineAssetOfOrgNo.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            $("#offlineAsset").html((res/10000).toFixed(2));
        }else{
            $("#offlineAsset").html("0.00");
        }

    })
}
function weekOfIncremental(loginName) {
    $.get("/department/weekOfIncremental.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            if(res>0){
                $("#weekOfIncremental").css("color","#F80000")
            }else if(res<0){
                $("#weekOfIncremental").css("color","#00CC00")
            }
            $("#weekOfIncremental").html((res/10000).toFixed(2))
        }else{
            $("#weekOfIncremental").html("0.00")
        }

    })
}
function seasonOfIncremental(loginName) {
    $.get("/department/seasonOfIncremental.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            if(res>0){
                $("#seasonOfIncremental").css("color","#F80000")
            }else if(res<0){
                $("#seasonOfIncremental").css("color","#00CC00")
            }
            $("#seasonOfIncremental").html((res/10000).toFixed(2));
        }else{
            $("#seasonOfIncremental").html("0.00");
        }

    })
}
function onlineRecentOfOrgNo(loginName) {
    $.get("/department/onlineRecentOfOrgNo.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            $("#onlineRecentOfOrgNo").html((res/10000).toFixed(2));
        }else{
            $("#onlineRecentOfOrgNo").html("0.00");
        }

    })
}
function offlineRecentOfOrgNo(loginName) {
    $.get("/department/offlineRecentOfOrgNo.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            $("#offlineRecentOfOrgNo").html((res/10000).toFixed(2));
        }else{
            $("#offlineRecentOfOrgNo").html("0.00");
        }

    })
}
function findBanlanceOfOrgNo(loginName) {
    $.get("/department/findBanlanceOfOrgNo.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            $("#onlieBanlanceOfOrgNo").html((res/10000).toFixed(2));
        }else{
            $("#onlieBanlanceOfOrgNo").html("0.00");
        }

    })
}
function seasonAverageDaily(loginName) {
    $.get("/department/seasonAverageDaily.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            $("#seasonAverageDaily").html((res/10000).toFixed(2));
        }else{
            $("#seasonAverageDaily").html("0.00");
        }

    })
}
function sad_weekOfIncremental(loginName) {
    $.get("/department/sad_weekOfIncremental.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            if(res>0){
                $("#sad_weekOfIncremental").css("color","#F80000")
            }else if(res<0){
                $("#sad_weekOfIncremental").css("color","#00CC00")
            }
            $("#sad_weekOfIncremental").html((res/10000).toFixed(2));
        }else{
            $("#sad_weekOfIncremental").html("0.00");
        }

    })
}
function sad_seasonOfIncremental(loginName) {
    $.get("/department/sad_seasonOfIncremental.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            if(res>0){
                $("#sad_seasonOfIncremental").css("color","#F80000")
            }else if(res<0){
                $("#sad_seasonOfIncremental").css("color","#00CC00")
            }
            $("#sad_seasonOfIncremental").html((res/10000).toFixed(2));
        }else{
            $("#sad_seasonOfIncremental").html("0.00");
        }


    })
}

//统计总客户数
function findSumCustomerOfOrgNo(loginName) {
    $.get("/department/findSumCustomerOfOrgNo.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            $("#sumCustomerOfOrgNo").html(res)
        }else {
            $("#sumCustomerOfOrgNo").html("0.00")
        }
    })
}
//一级客户数
function Level_OneCustomer(loginName) {
    $.get("/department/findLevel_OneCustomerOfOrgNo.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            $("#Level_OneCustomer").html(res)
        }else {
            $("#Level_OneCustomer").html("0.00")
        }

    })
}
//二级客户数
function Level_TwoCustomer(loginName) {
    $.get("/department/findLevel_TwoCustomerOfOrgNo.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            $("#Level_TwoCustomer").html(res);
        }else {
            $("#level_twocustomer").html("0.00");
        }
    })
}


//有效客户数
function findDepart_effective_customer(loginName) {
    $.get("/department/findDepart_effective_customer.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            $("#depart_effective_customer").html(res)
        }else {
            $("#depart_effective_customer").html("0.00")
        }
    })
}

//流失客户数
function findDepart_flow_customer(loginName) {
    $.get("/department/findDepart_flow_customer.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            $("#depart_flow_customer").html(res)
        }else {
            $("#depart_flow_customer").html("0.00")
        }
    })
}
//为绑卡客户数
function findDepart_noCard_customer(loginName) {
    $.get("/department/findDepart_noCard_customer.json",{"loginName":loginName},function (res) {
        if(res!=null&&res!=""){
            $("#depart_noCard_customer").html(res)
        }else {
            $("#depart_noCard_customer").html("0.00")
        }
    })
}

//线上到期提醒
function onlineRecentOfOrgNoRemind(time) {

    $("#onlineRecentOfOrgNoRemind").empty();
    $.get("/department/onlineRecentOfOrgNoRemind.json",{"loginName":loginName,"time":time},function (res) {
        $.each(res,function (i,item) {
            onLine_addLine(-1);
            onLine_updateLine(-1,item)
        })

    })
}
function onLine_addLine(id) {
    $("#onlineRecentOfOrgNoRemind").append(
        "<tr id='"+id+"'><td></td><td></td></tr>"
    );
}
//往动态创建的tr中添加数据
function onLine_updateLine(id,item) {
    $tr=$("#onlineRecentOfOrgNoRemind tr[id='"+id+"']");
    $td = $tr.find("td:first");
    $td.html("<a href='../../../myAssert.html?headOfInstitution"+item.loginName+"'>"+item.name+"</a>");
    $td = $td.next();
    $td.html((item.amount/10000).toFixed(2));
    $tr.attr("id",item.id);
}
//线下到期提醒
function offlineRecentOfOrgNoRemind(time) {
    $("#offlineRecentOfOrgNoRemind").empty();
    $.get("/department/offlineRecentOfOrgNoRemind.json",{"loginName":loginName,"time":time},function (res) {
        $.each(res,function (i,item) {
            offLine_addLine(-1);
            offLine_updateLine(-1,item)
        })

    })
}
function offLine_addLine(id) {
    $("#offlineRecentOfOrgNoRemind").append(
        "<tr id='"+id+"'><td></td><td></td></tr>"
    );
}
//往动态创建的tr中添加数据

function offLine_updateLine(id,item) {

    $tr=$("#offlineRecentOfOrgNoRemind tr[id='"+id+"']");
    $td = $tr.find("td:first");
    $td.html("<a href='../../../myAssert.html?headOfInstitution"+item.userId+"'>"+item.userName+"</a>");
    $td = $td.next();
    $td.html((item.buyMoney/10000).toFixed(2));
    $tr.attr("id",item.id)
}

function teamOverview(loginName) {
    $.get("/department/teamOverview.json",{"loginName":loginName},function (res) {
        $.each(res,function(i,item){
            teamOverview_addLine(-1);
            teamOverview_updateLine(-1,item);
        })
    })
}

function teamOverview_addLine(id) {
    $("#teamOverview").append("<tr id='"+id+"'><td></td><td></td><td></td><td></td><td></td><td></td></tr>")
}

function teamOverview_updateLine(id,item) {
    $tr =$("#teamOverview tr[id='"+id+"']")
    $tr.attr("id",item.ownerId);
    $td = $tr.find("td:first")
    $td.html(item.owner);
    $td.html("<a href='../../../myAssert.html?headOfInstitution"+item.ownerId+"'>"+item.owner+"</a>");

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

function findByLoginName(loginName) {
    $.get("/staff/selectByStaffId.json",{"loginName":loginName},function (res) {
        $("#ontitle").html(res.orgName);
    })
}



//线图1，线图2，柱状图1，柱状图2
function chart1(loginName,cycle) {
    if(cycle==""||cycle==null){
        cycle="week"
    }
    $.get("/department/findBiDailyOfOrgNo.json",{"loginName":loginName,"cycle":cycle}, function (res) {
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

function chart2(loginName,cycle) {
    if(cycle==""||cycle==null){
        cycle="week"
    }
    $.get("/department/findBiDailyOfOrgNo.json",{"loginName":loginName,"cycle":cycle}, function (res) {
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

function chart3(loginName,cycle) {
    if(cycle==""||cycle==null){
        cycle="week"
    }
    $.get("/department/findBiDailyOfOrgNo.json",{"loginName":loginName,"cycle":cycle}, function (res) {
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
function chart4(loginName,cycle) {
    if(cycle==""||cycle==null){
        cycle="week"
    }
    $.get("/department/findBiDailyOfOrgNo.json",{"loginName":loginName,"cycle":cycle}, function (res) {
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

//团队成员资产规模
function findUserNameAndJrzcye(loginName) {
    $.get("/department/findUserNameAndJrzcye.json",{"loginName":loginName}, function (res) {
        var data3 = [];
        $.each(res, function (i, item) {
            var datas3 = {};

            datas3["name"] = item.userName;
            datas3["value"] = (((item.jrzcYe)/10000).toFixed(2));
            data3.push(datas3);
        })
        var myChart = echarts.init(document.getElementById('c4'));
        option = {
            backgroundColor:['#E8E8E8'],
            title : {
                text: '团队成员资产规模',

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


//月均、季均、年均图
function chart5(loginName,cycle) {
    if(cycle==""||cycle==null){
        cycle="month"
    }
    $.get("/department/findAverageDailyCyeleOfOrgNo.json", {"loginName":loginName,"cycle": cycle}, function (res) {

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
                    name: '日均（万）'
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

function findCastProduct(loginName) {
    $.get("/department/findCastProduct.json", {"loginName":loginName},function (res) {
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



//实现列排序
function grouptablesorter() {
    $.tablesorter.defaults.headers = {0: {sorter: false}};
    $(".tablesorter").tablesorter({sortList:[[1,1]]});

}



$(document).ready(function () {

    findAssetOfOrgNo(loginName);
    findOnlineAssetOfOrgNo(loginName);
    findOfflineAssetOfOrgNo(loginName);
    weekOfIncremental(loginName);
    seasonOfIncremental(loginName);
    onlineRecentOfOrgNo(loginName);
    offlineRecentOfOrgNo(loginName);
    findBanlanceOfOrgNo(loginName);
    seasonAverageDaily(loginName);
    sad_weekOfIncremental(loginName);
    sad_seasonOfIncremental(loginName);
    findSumCustomerOfOrgNo(loginName);
    Level_OneCustomer(loginName);
    Level_TwoCustomer(loginName);
    findDepart_effective_customer(loginName);
    findDepart_flow_customer(loginName);
    findDepart_noCard_customer(loginName);


    $("#online_oneWeek").trigger("click");
    
    $("#offline_oneWeek").trigger("click");
    teamOverview(loginName);
    chart1(loginName);

    chart2(loginName);
    chart5(loginName);
    chart3(loginName);
    chart4(loginName);

    // $("#s_chart1").trigger("change");
    // $("#s_chart2").trigger("change");
    // $("#s_chart3").trigger("change");
    // $("#s_chart5").trigger("change");
    // $("#s_chart6").trigger("change");

    // transitionChart1(num,loginName);
    // transitionChart2(num,loginName);
    // transitionChart3(num,loginName);
    // transitionChart5(num,loginName);
    // transitionChart6(num,loginName);



        $("#s_chart1").change(function () {
            chart1(loginName,this.value);
        })



        $("#s_chart2").change(function () {
            chart2(loginName,this.value);
        })



        $("#s_chart3").change(function () {
            chart5(loginName,this.value);
        })



        $("#s_chart5").change(function () {
            chart3(loginName,this.value)
        })



        $("#s_chart6").change(function () {
            chart4(loginName,this.value);
        })



    findUserNameAndJrzcye(loginName);
    findCastProduct(loginName);
    findByLoginName(loginName);


    setTimeout('grouptablesorter()',2000);
});
