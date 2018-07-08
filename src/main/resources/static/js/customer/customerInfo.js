
var customerId = getUrlParam("customerId");//从客户列表页传来的参数




BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/tab'],
    function (Form, Grid, Data, Overlay,Tab) {
        var contextPath = "../";
        var queryInvest = contextPath + "tbInvest/findByCustomerId.json";
        var findCoupon = contextPath+"Coupon/findCoupon.json";
        var findByIdCardNo = contextPath+"tradeDetail/findByIdCard.json";


        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });


        form1.render();

        //投资
        var Store = Data.Store,
            Columns = [
            {title: '产品名称',dataIndex:'loanTitle',width:200},
            {title: '年化收益',dataIndex:'rate',width:100},
            {title: '投资金额',dataIndex:'amount',width:100},
            {title: '预期收益',dataIndex:'actualAmountNew',width:100},
            {title: '起息日',dataIndex:'timeSettled',width:100},
            {title: '到期日',dataIndex:'finalTime',width:100},
            {title: '状态',dataIndex:'status',width:100},
            {title: '红包使用情况',dataIndex:'name',width:200,renderer:function (value,obj) {
                    //return '2.1%加息券，额外收益为60.41元';
                if(obj.couponInvestId==null){
                    return '';
                }else {
                    if(obj.parValue==null){
                        obj.parValue = '';
                    }
                    if(obj.name==null){
                        obj.name='';
                    }
                    if(obj.actualAmountCoupon==null){
                        obj.actualAmountCoupon='';
                    }
                    return''+obj.parValue+''+obj.name+',额外收益为:'+obj.actualAmountCoupon+'';
                }

            } },
                {title:'融资方信息', dataIndex:'assetInfo',width:200}
        ],
            ColumnsOnoff = [
                {title: '产品名称',dataIndex:'productName',width:200},
                {title: '年化收益',dataIndex:'rate',width:100},
                {title: '投资金额',dataIndex:'buyMoney',width:100},
                {title: '预期收益',dataIndex:'interestFee',width:100},
                {title: '起息日',dataIndex:'qxDate',width:100},
                {title: '到期日',dataIndex:'dqDate',width:100},
                {title: '状态',dataIndex:'redeemFlag',width:100},
                {title: '红包使用情况',width:200},
                {title: '融资方信息',dataIndex:'productName',width:200}

            ]
        ;
        //线上投资
        var store = new Store(
            {
                url: queryInvest,
                pageSize: 30,
                params: onlineId,
                autoLoad: false


            });

        //线下投资，在投产品
        var storeTrade = new Store({
            url:findByIdCardNo,
            pageSize:30,
            params:{idCardNo:idCardNo,status:"payment"},
            autoLoad:false
        })


        //红包
        var StoreCoupon = Date.Store,
            ColumnsCoupon = [
                {title:'奖券包名称',dataIndex:'name',width:100},
                {title:'奖券包面值',dataIndex:'parValue',width:100},
                {title:'奖券包类型',dataIndex:'type',width:100},
                {title:'到期时间',dataIndex:'timeExpire',width:100}
            ];
        //红包
        var storeCoupon = new Store({
            url :findCoupon,
            pageSize: 30,
            params:{onlineId:onlineId,statusCode:statusCode},
            autoLoad:false
        });


        $("#offLine").hide();
        store.load({customerId:onlineId,statusCode:"product"});

        $("#onlineInvest").css("background-color","#D0D0D0").attr("status","Y");
        $("#Investproduct").css("background-color","#D0D0D0").attr("status","Y");
        $("#onlineInvest").click(function () {
            $("#offlineInvest").css("background-color","").attr("status","N")
            $("#onlineInvest").css("background-color","#D0D0D0").attr("status","Y")
            $("#offLine").hide();
            $("#InfoGrid").show();
            if($("#Investproduct").attr("status")=="Y" && $("#payment").attr("status") !="Y"){

                store.load({customerId:onlineId,statusCode:"product"});
                var column = grid.findColumn(3);
                column.set('title','预期收益');
                //线上，安全兑付
            }else {
                store.load({customerId:onlineId,statusCode:"payment"});
                var column = grid.findColumn(3);
                column.set('title','实际收益');
            }

        })
        $("#offlineInvest").click(function () {
            $("#onlineInvest").css("background-color","").attr("status","N")
            $("#offlineInvest").css("background-color","#D0D0D0").attr("status","Y")
            $("#InfoGrid").hide();
            $("#offLine").show();
            if($("#Investproduct").attr("status")=="Y" && $("#payment").attr("status") !="Y"){
                if(platform=="TAHONE"){
                    storeTrade.load({idcardNo:idCardNo,castOrPay:"product"});
                    var column = gridOffline.findColumn(3);
                    column.set('title','预期收益');
                }

                //线下，安全兑付
            }else {
                if(platform=="TAHONE"){
                    storeTrade.load({idcardNo:idCardNo,castOrPay:"payment"});
                    var column = gridOffline.findColumn(3);
                    column.set('title','实际收益');
                }
            }

        })
        $("#Investproduct").click(function () {
            $("#payment").css("background-color","").attr("status","N");
            $("#Investproduct").css("background-color","#D0D0D0").attr("status","Y");
            //线上，在投产品
            if($("#onlineInvest").attr("status")=="Y" && $("#offlineInvest").attr("status")!="Y"){
                store.load({customerId:onlineId,statusCode:"product"});
                var column = grid.findColumn(3);
                column.set('title','预期收益');
            }
            //线下，在投产品
            else{
                if(platform=="TAHONE"){
                    storeTrade.load({idcardNo:idCardNo,castOrPay:"product"});
                    var column = gridOffline.findColumn(3);
                    column.set('title','预期收益');
                }
            }
        })
        $("#payment").click(function () {
            $("#Investproduct").css("background-color","").attr("status","N");
            $("#payment").css("background-color","#D0D0D0").attr("status","Y");
            //线下，安全兑付
            if($("#onlineInvest").attr("status")!="Y" && $("#offlineInvest").attr("status")=="Y"){
                if(platform=="TAHONE"){
                    storeTrade.load({idcardNo:idCardNo,castOrPay:"payment"});
                    var column = gridOffline.findColumn(3);
                    column.set('title','实际收益');
                }
            }
            //线上，安全兑付
            else {
                store.load({customerId:onlineId,statusCode:"payment"});
                var column = grid.findColumn(3);
                column.set('title','实际收益');
            }
        })


        var statusCode = $("#placed").attr("id");
        storeCoupon.load({onlineId:onlineId,statusCode:statusCode});
        $("#placed").css("background-color","#D0D0D0");
        $("#placed").click(function () {
            var statusCode = $("#placed").attr("id");
            storeCoupon.load({onlineId:onlineId,statusCode:statusCode});
            $("#placed").css("background-color","#D0D0D0");
            $("#used").css("background-color","");
        });
        $("#used").click(function () {
            var statusCode = $("#used").attr("id");
            storeCoupon.load({onlineId:onlineId,statusCode:statusCode});
            $("#used").css("background-color","#D0D0D0");
            $("#placed").css("background-color","");
        })
        //线上投资，在投产品
        var grid = new Grid.Grid({
            render: '#InfoGrid',
            columns: Columns,
            width: '100%',
            loadMask: true,
            store: store,
            // bbar: {
            //     pagingBar: true
            // }, plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });


        //线下投资,在投产品
        var gridOffline = new Grid.Grid({
            render: '#offLine',
            columns: ColumnsOnoff,
            width: '100%',
            loadMask: true,
            store: storeTrade,
            // bbar: {
            //     pagingBar: true
            // }, plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });
        //红包
        var gridCoupon = new Grid.Grid({
            render:'#InfoGridCoupon',
            columns:ColumnsCoupon,
            width:'100%',
            loadMask:true,
            store:storeCoupon,
            bbar:{
                pagingBar:true
            }
            //,plugins:[Grid.Plugins.RadioSelection],autoRender:true
        })




        grid.render();
        gridCoupon.render();
        gridOffline.render();
    })

function coupon(statusCode) {
    $.post("",{"customerId":customerId ,"status":statusCode},function (data) {

    })
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null)
        return unescape(decodeURI(r[2]));
    return null; //返回参数值
}

var onlineId = null;
var idCardNo = null;
var platform = null;




function findInfo(){

    $.post("/tbCustomer/findById.json",{"customerId":customerId},function(res){

        $("#customerName").html(res.customerName);
        $("#asset").html(fmoney(res.asset,3));
        $("#onlineAsset").html(fmoney(res.onlineAsset,3));
        $("#offlineAsset").html(fmoney(res.offlineAsset,3));
        $("#sex").html(res.sex);
        var birthday = res.birthday;
        if(birthday!=null && birthday!=""){
            var year = birthday.substring(0,4);
            var date = new Date();
            var newyear = date.getFullYear();
            var age = newyear-year;
            $("#age").html(age);

        }else {
            $("#age").html("")
        }



        $("#onlineRegisterDate").html(res.onlineRegisterDate);
        $("#offlineFirstInvestDate").html(res.offlineFirstInvestDate);

        //手机号脱敏

        var mob = res.mobile;
        if(mob!=''&& mob!=null){
            if(mob.length ==11){
                var three = mob.substring(0,3);
                var four = mob.substring(7);
                var mobile = three+"****"+four;
            }


        }


        $("#mobile").html(mobile);
        $("#province").html(res.province);
        if(res.onlineRisk=="" || res.onlineRisk==null){
            $("#timeLastUpdate").hide();
            $("#riskDate").hide();
            $("#saveRisk").hide();

            $("#onlineRisk").html("<input id='entry' type='button' value='录入' onclick='risk()'/>")
        }else {
            $("#riskDate").hide();
            $("#saveRisk").hide();
            if(res.onlineRisk=="C1"){
                $("#onlineRisk").html("保守型");
            }else if(res.onlineRisk=="C2"){
                $("#onlineRisk").html("稳健型");
            }else if(res.onlineRisk=="C3"){
                $("#onlineRisk").html("平衡型");
            }else if(res.onlineRisk=="C4"){
                $("#onlineRisk").html("进取性");
            }else if(res.onlineRisk=="C5"){
                $("#onlineRisk").html("激进型");
            }
            $("#timeLastUpdate").show();
            $("#timeLastUpdate").html('&nbsp;'+res.timeLastUpdate);
        }



        $("#birthday").html(res.birthday);
        $("#city").html(res.city);

        var idnum = res.idNumber;

        var idnumber = null;
        if(idnum!=null && idnum !=""){
            if(idnum.length == 18){
                var  q = idnum.substring(0,9);
                var h = idnum.substring(13);
                var idnumber = q+"****"+h;
            }else {

                var q = idnum.substring(0,idnum.length-7);
                var h = idnum.substring(idnum.length-3);
                var idnumber = q+"****"+h;
            }
        }
        $("#idNumber").html(idnumber);

        $("#assetLevel").html(res.assetLevel);
        $("#owner").html(res.owner);

        $("#referralUserName1").html(res.referralUserName1);
        $("#referralUserName2").html(res.referralUserName2);
        $("#referralUserName3").html(res.referralUserName3);
        $("#id").html(res.id);
        $("#interest").val(res.interest);
        $("#address").val(res.address);
        $("#family").val(res.family);
        $("#investPreference").val(res.investPreference);
        $("#remark").val(res.remark);
        onlineId = res.onlineId;
        idCardNo = res.idNumber;
        platform = res.platform;
        level();
    })
}



//判断资产等级
function level() {

    var asset = $("#asset").html();
    $.post("/daAssetLevel/findByAsset.json",{"asset":asset},function (res) {
        if(res!=null){
            $("#assetLevel").html(res.description);
        }

    })
}

//移除只读属性
function removeReadonly(){
    $(".editable").removeAttr("readonly");

}
//添加只读属性
function addReadonly() {
    $(".editable").attr("readonly","readonly");

}


$("#update").click(function(){
    removeReadonly()
})

$("#save").click(function () {
    update();
    addReadonly();
})


function update(){
    var id = $("#id").html();

    var remark = $("#remark").val();
    var interest = $("#interest").val();
    var address = $("#address").val();
    var family = $("#family").val();
    var investPreference = $("#investPreference").val();

    //var data=form_f_edit.serializeToObject();
    $.post("/tbCustomer/updateById.json",
        {
        "id":id,
        "remark":remark,
        "interest":interest,
        "address":address,
        "family":family,
        "investPreference":investPreference}
        //form_f_edit.serializeToObject()

        ,function (res) {

        findInfo();
        alert("已保存修改！！！");

    })
}


findBankCard();

//当前客户绑定的银行卡查询
function findBankCard() {
    $("#tbod").empty();
    $.get("/banks/findBanks.json",{"customerId":customerId},function (res) {
        if(res!=null){
            $.each(res,function (i,item) {
                addLine(i);
                updateLine(i,item);
            })
        }

    })
}

function addLine(id) {
    //$("#tbod").empty();
    $("#tbod").append(
        "<tr id='"+id+"'>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>"+
        "</tr>"
    )
}

function updateLine(id,item) {
    if(item.sourceType=="01"){
        item.sourceType = "线下"
    }else if(item.sourceType=="10"){
        item.sourceType = "线上"
    }else if(item.sourceType=="11"){
        item.sourceType = "线上线下"
    }
    $tr = $("#tbod tr[id='"+id+"']");
    $td = $tr.find("td:first");
    $td.html(item.bankName);
    $td = $td.next();
    $td.html(item.cardNo);
    $td = $td.next();
    $td.html(item.sourceType);
    $td = $td.next();
    if(item.status=='03'){
        $td.html('在用');
    }else {
        $td.html('不在用')
    }
    $td=$td.next();
    if(item.isDefaultAccount==false){
        $td.html("否")
    }else {
        $td.html("是")
    }
    $td = $td.next();
    $td.html(item.remark);
    $td.attr("name","remark")
    $td.attr("value",item.remark);
    $td = $td.next();
    $td.html('<input  type="button" class="button button-primary "  value="编辑备注" onclick="cidet('+item.id+')"/> <input  type="button" class="button button-info " onclick="csave('+item.id+')"  value="保存"/>')
    $tr.attr("id",item.id);
}
//编辑银行卡列表的备注
function cidet(id) {
    $td=$("tr[id='"+id+"'] td[name='remark']");
    var text = $td.val();
    $td.html("");
    $td.append("<input style='width: 300px' type='text' placeholder='"+text+"'/>");
}

function csave(id) {
    var tex = $("tr[id='"+id+"'] td[name='remark'] input").val();
    if(tex==""){
        alert("确定不对备注做任何更改？");
        findBankCard();
        return null;
    }
    $.post("/banks/updateRemark.json",{"id":id,"remark":tex},function () {
        findBankCard();

    })
}

//风险测评录入


function risk() {

    $("#onlineRisk").empty();
    $("#onlineRisk").append("<select id='risk' style='width: 80px'>" +
        "<option value=''>请选择</option>" +
        "<option value='C1'>保守型</option>" +
        "<option value='C2'>稳健型</option>" +
        "<option value='C3'>平衡型</option>" +
        "<option value='C4'>进取型</option>" +
        "<option value='C5'>激进型</option>" +
        "</select>");
        $("#riskDate").show();
        $("#saveRisk").show();
        // $("#timeLastUpdate").empty();
        //
        //  $("#timeLastUpdate").append('<label class="control-label">风险测评时间：</label><input id="riskData" data-tip="{text : \'风险测评时间\'}" type="text" name="" class="input-small calendar bui-form-group"/>&nbsp;' +
        // '<input id="saveRisk" type="button" value="保存" onclick="saveRisk_a()"/>')

}

// $("#saveRisk").click(function(){
//     alert("haha");
// })
//更新风险等级的值以及时间

function saveRisk_a() {

    var risk = $("#risk").val();
    var riskDate = $("#riskDate").val();
    if((risk==null || risk =="")&&(riskDate==null||riskDate=="")){
        alert("请选择风险等级！")

    }else if((risk==null||risk=="")&&(riskDate!=null&&riskDate!="")){
        alert("请选择风险等级！")

    }else if((risk!=null||risk!="")&&(riskDate==null||riskDate=="")){
            alert("风险测评时间将采用当前时间？")
            var date = new Date();
            var riskDate = formatDate(date).replace('-','年').replace('-','月')+"日";
            $.post("/tbCustomer/updateRisk.json",{"customerId":customerId,"risk":risk,"riskData":riskDate},function () {
                findInfo();
            })
    }else {
        $.post("/tbCustomer/updateRisk.json",{"customerId":customerId,"risk":risk,"riskData":riskDate},function () {
            findInfo();
        })
    }
}




findInfo();

//格式化日期
var formatDate = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};

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



$.get("/cusJrzcAllo/findJrj.json", {"customerId":customerId,"cycle": "month"}, function (res) {

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
    var myChart = echarts.init(document.getElementById('b1'));
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


function findJrj(customerId,num) {
    //$("#b4").empty();
    $.get("/cusJrzcAllo/findJrj.json",{"customerId":customerId,"cycle":num},function (res) {

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
        var myChart = echarts.init(document.getElementById('b1'));
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

$(document).ready(function () {


    $("#averageDaily").change(function () {
        findJrj(customerId,this.value)
    })
})
