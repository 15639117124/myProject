


function findAsset(loginName) {
    $.get("/udJrzcAllo/findAsset.json",{"loginName":loginName},function (res) {
        if(res==""){
            res = 0;
            $("#asset").find("a").html((res/10000).toFixed(2));
        }else {
            $("#asset").find("a").html((res/10000).toFixed(2));
        }
    })
}
function findOnlineAsset(loginName) {
    $.get("/udJrzcAllo/findOnlineAsset.json" ,{"loginName":loginName},function (res) {
        if(res==""){
            $("#onlineAsset").html("<a href=../../customer/investInfo.html>0.00</a>");
        }else {
            $("#onlineAsset").html("<a href=../../customer/investInfo.html>"+(res/10000).toFixed(2)+"</a>")
        }
    })
}
function findOfflineAsset(loginName) {
    $.get("/udJrzcAllo/findOfflineAsset.json",{"loginName":loginName},function (res) {
        if(res==""){
            $("#offlineAsset").html("<a href=../../trade/tradeImport.html>0.00</a>");
        }else {
            $("#offlineAsset").html("<a href=../../trade/tradeImport.html>"+(res/10000).toFixed(2)+"</a>");
        }

    })
}
//查询线上最近到期的总资金
function findOnlineRecent(loginName) {
    $.post("/tbCustomer/findOnlineRecent.json",{"loginName":loginName},function (res) {
        if(res==""){
            res="0.00";
            $("#onlineRecent").html("<a href=../../customer/investInfo.html?onlineRecent>"+res+"</a>");
        }else {
            //$("#onlineRecent").html((res/10000).toFixed(2));
            $("#onlineRecent").html("<a href='../../customer/investInfo.html?onlineRecent'>"+(res/10000).toFixed(2)+"</a>")
        }

    })
}
//线下最近到期
function findOfflineRecent(loginName) {
    $.get("/tbCustomer/findOfflineRecent.json",{"loginName":loginName},function (res) {
        if(res==""){

            $("#offlineRecent").html("<a href=../../trade/tradeImport.html?offlineRecent>0.00</a>");
        }else{
            //$("#offlineRecent").html((res/10000).AutoFit(2));
            $("#offlineRecent").html("<a href=../../trade/tradeImport.html?offlineRecent>"+(res/10000).toFixed(2)+"</a>");
        }

    })
}
//线上闲置资金
function findBanlance(loginName) {
    $.get("tbCustomer/findBanlance.json",{"loginName":loginName},function (res) {
//            $("#onlieBanlance").find("a").html((res/10000).toFixed(2));
        if(res==""){
            res="0.00"
            $("#onlieBanlance").html("<a href=../../customer/tbCustomer.html>"+res+"</a>");
        }else{
            //$("#onlieBanlance").html((res/10000).toFixed(4));
            $("#onlieBanlance").html("<a href=../../customer/tbCustomer.html>"+(res/10000).toFixed(4)+"</a>");
        }

    })
}


//当前登录人管理的客户总数
function findSumCustomer(loginName) {
    $.get("tbCustomer/findSumCustomer.json",{"loginName":loginName},function (res) {
        if(res==""){
            res = "0.00";
            $("#sumCustomer").find("a").html(res);
        }else {
            $("#sumCustomer").find("a").html(res);
        }

    })
}
//当前登录人管理的一级客户数
function findLevel_OneCustomer(loginName) {
    $.get("tbCustomer/findLevel_OneCustomer.json",{"loginName":loginName},function (res) {
        if(res==""){
            res="0.00"
            $("#Level_OneCustomer").find("a").html(res);
        }else{
            $("#Level_OneCustomer").find("a").html(res);
        }

    })
}
//当前登录人管理的二级客户数
function Level_TwoCustomer(loginName) {
    $.get("tbCustomer/findLevel_TwoCustomer.json",{"loginName":loginName},function (res) {
        if(res==""){
            res="0.00"
            $("#Level_TwoCustomer").find("a").html(res);
        }else {
            $("#Level_TwoCustomer").find("a").html(res);
        }

    })
}
//当前登录人的有效客户数
function findEffective_customer(loginName) {
    $.ajax({
        url:"tbCustomer/findEffective_customer.json",
        type:'post',
        data:{"loginName":loginName},
        success:function (result) {
            if(result.success){
                if(result.value==""||result.value==0){

                    $("#effective_customer").find("a").html("0.00");
                }else {
                    $("#effective_customer").find("a").html(result.value);
                }
            }

        }
    });
}

//当前登录人的流失客户数
function findFlow_customer(loginName) {
    $.ajax({
        url:"tbCustomer/findFlow_customer.json",
        type:'post',
        data:{"loginName":loginName},
        success:function (result) {
            if(result.success){
                if(result.value==""||result.value==0){

                    $("#flow_customer").find("a").html("0.00");
                }else {
                    $("#flow_customer").find("a").html(result.value);
                }
            }
        }
    });
}
//当前登录人的未绑卡客户数
function findNoCard_customer(loginName) {
    $.ajax({
        url:"tbCustomer/findNoCard_customer.json",
        type:'post',
        data:{"loginName":loginName},
        success:function (result) {
            if(result.success){
                if(result.value==""||result.value==0){

                    $("#noCard_customer").find("a").html("0.00");
                }else {
                    $("#noCard_customer").find("a").html(result.value);
                }
            }
        }
    });
}


//生日
function findBirthday(loginName) {
    $.get("tbCustomer/findBirthday.json",{"loginName":loginName},function (res) {
        $.each(res,function (i,item) {
            addLine(-1);
            updateLine(-1,this);
        })
    })
}

//线下到期提醒,刷新页面时使用加载
function findProductOffLine(loginName) {
    $.get("tbCustomer/findProductOffLine.json",{"loginName":loginName,"dat":7},function (res) {
        $.each(res,function (i,item) {
            offlineDue_addLine(-1);
            offLine_updateLine(-1,item);
        })
    })
}
function off_click_week(dat,loginName) {
    $("#offlineDue").empty();
    $.get("tbCustomer/findProductOffLine.json",{"loginName":loginName,"dat":dat},function (res) {
        $.each(res,function (i,item) {
            offlineDue_addLine(-1);
            offLine_updateLine(-1,item);
        })
    })
}
//线下到期提醒，增加一个新的tr
function offlineDue_addLine(id) {
    $("#offlineDue").append(
        "<tr id='"+id+"'><td></td><td></td></td></tr>"
    );
}
//线下到期提醒，向tr中动态添加数据
function offLine_updateLine(id, item) {
    //123
    $tr = $("#offlineDue tr[id='" + id + "']");
    $td = $tr.find("td:first");
    $td.html(item.productName);
    $td.html("<a href='../../trade/tradeImport.html?fromassert"+item.productName+"'>"+item.productName+"</a>")
    $td = $td.next();
    $td.html(item.dqDate);
    $tr.attr("id",item.productName);
}

//生日，添加一条空记录
function addLine(id){
    $("#company_content").append(
        "<tr id='"+id+"'><td ></td><td ></td></tr>");
}

//生日，将数据写到记录行
function updateLine(id,item){
    $tr=$("#company_content tr[id='"+id+"']");
    $td=$tr.find("td:first");
    $td.html(item.customerName);
    $td=$td.next();
    $td.html(item.birthday);
    $tr.attr("id",item.id);
}

//线上到期提醒，刷新页面时加载，默认30天
function findLoanTitleAndFinalTime(loginName) {
    $("#onlineDue").empty();
    $.post("tbInvest/findLoanTitleAndFinalTime.json",{"loginName":loginName,"dat":7},function (res) {
        console.log(res);
        $.each(res,function (i,item) {
            onLine_addLine(-1);
            onLine_updateLine(-1,item);
        })
    })
}
//点击按钮查询特定时间范围内的数据（一周，两周）
function clikWeek(week,loginName) {
    $("#onlineDue").empty();
    $.post("tbInvest/findLoanTitleAndFinalTime.json",{"loginName":loginName,"dat":week},function (res) {
        $.each(res,function (i,item) {
            onLine_addLine(-1);
            onLine_updateLine(-1,item);
        })
    })
}


//线上到期提醒，添加一条空的tr
function onLine_addLine(id) {
    $("#onlineDue").append(
        "<tr id='"+id+"'><td></td><td></td></tr>"
    );
}
//往动态创建的tr中添加数据
function onLine_updateLine(id,item) {
    $tr=$("#onlineDue tr[id='"+id+"']");
    $td = $tr.find("td:first");
    $td.html("<a href='../../customer/investInfo.html?fromassert" + item.loanTitle + "'>" + item.loanTitle + "</a>");
    $td = $td.next();
    $td.html(item.finalTime);
    $tr.attr("id",item.finalTime);
}
function offlineDue_addLine(id) {
    $("#offlineDue").append(
        "<tr id='"+id+"'><td></td><td></td></td></tr>"
    );
}
function offLine_updateLine(id,item) {
    $tr=$("#offlineDue tr[id='"+id+"']");
    $td = $tr.find("td:first");
    $td.html(item.productName);
    $td.html("<a href='../../trade/tradeImport.html?fromassert"+item.productName+"'>"+item.productName+"</a>")
    $td = $td.next();
    $td.html(item.dqDate);
    $tr.attr("id",item.productName);
}






function lineChart_one(loginName) {
    $("#lineChart_one").change(function () {
        line_one(loginName,this.value)
    })
}

function lineChart_two(loginName) {
    $("#lineChart_two").change(function () {
        line_two(loginName,this.value)
    })
}

function averageDailys(loginName) {
    $("#averageDaily").change(function () {
        averageDaily(loginName,this.value)
    })
}
function coluChart_one(loginName,from) {
    $("#coluChart_one").change(function () {
        chart_one(from,loginName,this.value)
    })
}
function coluChart_two(loginName,from) {
    $("#coluChart_two").change(function () {
        chart_two(from,loginName,this.value)
    })
}


function findByLoginName(loginName,from) {
    $("#oftitle").hide();
    if(from=="headofinstitution"){
        $("#oftitle").show();
        $.get("/staff/selectByStaffId.json",{"loginName":loginName},function (res) {
            $("#ontitle").html(res.orgName+"->"+res.staffName);
        })
    }

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










//图表实现按周、月、季、年展示数据

//线图1
function line_one(loginName,num) {


    $.get("/BiDailyManagers/findByNum.json",{"loginName":loginName,"num":num}, function (res) {
        var data1 = [];
        var data2 = [];
        $.each(res, function (i, item) {
            var ymd = item.belongDate;
            var md = ymd.substring(5);
            data1.push(md);
            data2.push(item.customerNumbers);
        })

        var myChart1 = echarts.init(document.getElementById('c1'));
        var option = {


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
                type:'value'
            },

            series: [
                {
                    name:'客户数量',
                    type:'line',
                    stack: '总量',
                    data:data2
                }

            ]
        };
        myChart1.setOption(option);


    })
}


//线图2
function line_two(loginName,num) {

    $.get("/BiDailyManagers/findByNum.json",{"loginName":loginName,"num":num}, function (res) {
        var data3 = [];
        var data4 = []

        $.each(res, function (i, item) {
            var datas2 = {};
            var ymd = item.belongDate;
            var md = ymd.substring(5);

            data3.push(md);
            data4.push((item.investAmounts)/10000);
        })
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
                    name:'资产规模',
                    type:'line',
                    stack: '总量',
                    data:data4
                }

            ]
        };
        myChart2.setOption(option2);


    })
}

//柱状图1
function chart_one(from,loginName,num) {
    //$("#b2").empty();

    $.get("/BiDailyManagers/findByNum.json",{"loginName":loginName,"num":num}, function (res) {
        var data4_1 = [];
        var data4_2 = [];
        $.each(res, function (i, item) {
            var ymd = item.belongDate;
            var md = ymd.substring(5);
            data4_1.push(md);
            data4_2.push(item.nobankNumbers);
        })
        var myChart = echarts.init(document.getElementById('b2'));

        var option = {
            backgroundColor:['#E8E8E8'],
            color: ['#3398DB'],
            tooltip: {},
            legend: {
                data: ['未绑卡客户']
            },
            xAxis: {
                data: data4_1
            },
            yAxis: {
                name:'未绑卡客户数量'
            },
            series: [{
                name: '未绑卡客户',
                type: 'bar',
                data: data4_2
            }]
        };
        myChart.setOption(option);
        if(from=="headofinstitution"){

        }else {
            myChart.on("click",function (params) {
                //$("#b3").append("<a id='toCustomer' style='display: none' href='../../customer/tbCustomer.html?index="+params.name+"'><button id='btn' type='button'></button></a>")
                $("#b3").append("<a id='toCustomer' style='display: none' href='../../customer/tbCustomer.html?mes=nob'><button id='btn' type='button'></button></a>")

                $("#btn").trigger("click");

            })
        }


    })

}


function chart_two(from,loginName,num) {
    //$("#b3").empty();
    $.get("/BiDailyManagers/findByNum.json",{"loginName":loginName,"num":num}, function (res) {
        var data5_1 = [];
        var data5_2 = [];
        $.each(res, function (i, item) {
            var ymd = item.belongDate;
            var md = ymd.substring(5);
            data5_1.push(md);
            data5_2.push(item.nobankNumbers);
        })
            var myChart = echarts.init(document.getElementById('b3'));
            var option = {
                backgroundColor:['#E8E8E8'],
                color: ['#3398DB'],
                tooltip: {},
                legend: {
                    data: ['客户流失量']
                },

                xAxis: {
                    data: data5_1
                },
                yAxis: {
                    name:'客户流失数量'
                },
                series: [{
                    name: '客户流失量',
                    type: 'bar',
//                data: [5, 20, 36, 10, 10, 20]
                    data: data5_2
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            if(from=="headofinstitution"){

            }else {
                myChart.on("click",function (params) {
                    $("#b3").append("<a id='toCustomer' style='display: none' href='../../customer/tbCustomer.html?mes=leave'><button id='btn' type='button'></button></a>")
                    $("#btn").trigger("click");
                })
            }


    })



}

function averageDaily(loginName,num) {
    //$("#b4").empty();
    $.get("../udJrzcAllo/findAverageDailyByChart.json",{"loginName":loginName,"cycle":num},function (res) {

        var datax = [];
        var datamonth=[];
        var dataquarter=[];
        var datayear=[];
        $.each(res,function (i,item) {

            datamonth.push((item.jrzcYrj/10000).toFixed(2));
            dataquarter.push((item.jrzcJrj/10000).toFixed(2));
            datayear.push((item.jrzcNrj/10000).toFixed(2));

            var ymd = item.sjrq;
            var md = ymd.substring(5);
            datax.push(md);

        })
        var myChart = echarts.init(document.getElementById('b4'));
        option = {
            backgroundColor:['#E8E8E8'],
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['月日均','季日均','年日均']
            },

            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : datax
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name :'日均（万）'
                }
            ],
            series : [
                {
                    name:'月日均',
                    type:'line',
                    stack: '1',
                    data:datamonth
                },
                {
                    name:'季日均',
                    type:'line',
                    stack: '2',
                    data:dataquarter
                },
                {
                    name:'年日均',
                    type:'line',
                    stack: '3',
                    data:datayear
                }
            ]
        };
        myChart.setOption(option);
    })
}


//v2
function chartV2(loginName,from) {


    $.get("/BiDailyManagers/find.json",{"loginName":loginName},function (res) {
        var data1 = [];
        var data2 = [];

        var data3 = [];
        var data4 = []

        var data5 = [];
        var data6 = [];

        var data7 = [];
        var data8 = [];

        $.each(res,function (i,item) {
            var ymd = item.belongDate;
            var md = ymd.substring(5);

            data1.push(md);
            data2.push(item.customerNumbers);

            data3.push(md);
            data4.push((item.investAmounts)/10000);

            data5.push(md);
            data6.push(item.nobankNumbers);

            data7.push(md);
            data8.push(item.leaveNumbers);
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
                type:''
            },

            series: [
                {
                    name:'客户数量',
                    type:'line',
                    stack: '总量',
                    data:data2
                }

            ]
        };
        myChart1.setOption(option);



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
                    name:'资产规模',
                    type:'line',
                    stack: '总量',
                    data:data4
                }

            ]
        };
        myChart2.setOption(option2);


        var myChart3 = echarts.init(document.getElementById('b2'));

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
        if(from=="headofinstitution"){
        }else {
            myChart3.on("click", function (params) {
                //$("#b3").append("<a id='toCustomer' style='display: none' href='../../customer/tbCustomer.html?index="+params.name+"'><button id='btn' type='button'></button></a>")
                $("#b3").append("<a id='toCustomer' style='display: none' href='../../customer/tbCustomer.html?mes=nob'><button id='btn' type='button'></button></a>")
                $("#btn").trigger("click");
            })
        }



        //柱状图2

        var myChart4 = echarts.init(document.getElementById('b3'));

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
        if(from=="headofinstitution"){

        }else {
            myChart4.on("click", function (params) {
                $("#b3").append("<a id='toCustomer' style='display: none' href='../../customer/tbCustomer.html?mes=leave'><button id='btn' type='button'></button></a>")
                $("#btn").trigger("click");
            })
        }
    })

    //饼图
    $.get("/tradeDetail/findPieChart.json",{"loginName":loginName}, function (res) {
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
        var myChart = echarts.init(document.getElementById('b1'));
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

    //柱状图1



//月均、季均、年均图
    $.get("../udJrzcAllo/findAverageDailyByChart.json", {"loginName":loginName,"cycle": "month"}, function (res) {

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
        var myChart = echarts.init(document.getElementById('b4'));
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


$(document).ready(function () {
    // $.ajaxSetup({
    //     async: false
    // });
    var loginName = getCharFromUtf8(location.search).substring(18);

    var from = getCharFromUtf8(location.search).substring(1,18);

    //findAssets();
    findAsset(loginName);
    findOnlineAsset(loginName);
    findOfflineAsset(loginName);
    findOnlineRecent(loginName);
    findOfflineRecent(loginName);
    findBanlance(loginName);
    findBirthday(loginName);
    findSumCustomer(loginName);
    findLevel_OneCustomer(loginName);
    Level_TwoCustomer(loginName);

    findEffective_customer(loginName);
    findFlow_customer(loginName);
    findNoCard_customer(loginName);

    findLoanTitleAndFinalTime(loginName);
    findProductOffLine(loginName);

    // lineChart_one(loginName);
    // lineChart_two(loginName);
    // averageDailys(loginName);
    // coluChart_one(loginName,from);
    // coluChart_two(loginName,from);



        $("#lineChart_one").change(function () {
            line_one(loginName,this.value)
        })



        $("#lineChart_two").change(function () {
            line_two(loginName,this.value)
        })



        $("#averageDaily").change(function () {
            averageDaily(loginName,this.value)
        })


        $("#coluChart_one").change(function () {
            chart_one(from,loginName,this.value)
        })


        $("#coluChart_two").change(function () {
            chart_two(from,loginName,this.value)
        })


    chartV2(loginName,from);
    findByLoginName(loginName,from);

    if(from=="headofinstitution"){
        $("a").attr("href","javascript:return false;");
        $("a").css("color","#000000")
    }


})