
//@ sourceURL=customer.js
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";


        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';
        var url_findInvestByOnlineId =contextPath+'tbInvest/findInvestAndCustomer.json';

        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var Store = Data.Store, Columns = [

            {title:'产品名称',dataIndex:'loanTitle',width:200},
            {title:'客户名称',dataIndex:'customerName',width:100},
            {title:'投资金额',dataIndex:'amount',width:100,renderer:function (value,obj) {
                if(obj.statusCode=='ASSIGNED'){
                    return parseFloat(obj.originalAmount).toFixed(0);
                }else {
                    return parseFloat(value).toFixed(0);
                }
            }},
            {title:'预期收益率',dataIndex:'rate',width:70},
            {title:'期限',dataIndex:'duration',width:70},
            {title:'起息日期',dataIndex:'timeSettled',width:100},
            {title:'到期日期',dataIndex:'finalTime',width:100},
            // {title:'循环周期',dataIndex:'',width:100},

            {title:'循环起息',dataIndex:'currentValueDateTime',width:100,renderer:function (value,obj) {
                if(obj.isCycleInvest=='是'){
                    return value;
                }
            }},
            {title:'循环到期',dataIndex:'currentFinalTime',width:100,renderer:function (value,obj) {
                if(obj.isCycleInvest=='是'){
                    return value;
                }
            }},
            {title:'当前期',dataIndex:'currentPeriod',width:100,renderer:function (value,obj) {
                if(obj.isCycleInvest=='是'){
                    return value;
                }
            }},
            // {title:'最近赎回截止日',dataIndex:'status',width:200,renderer:function (value,obj) {
            //     if(value=="计息中"){
            //
            //         var finalTime = obj.finalTime.replace('年','-').replace('月','-').replace('日','');//结息日
            //         var timeSettled = obj.timeSettled.replace('年','-').replace('月','-').replace('日','');//起息日
            //         var currentValueDateTime = obj.currentValueDateTime.replace('年','-').replace('月','-').replace('日','');//当前起息日
            //         var currentFinalTime = obj.currentFinalTime.replace('年','-').replace('月','-').replace('日','');//当前结息日
            //         var date = new Date();
            //         //alert(formatDate(date));
            //         var nowDate = formatDate(date);
            //         var durationNum = DateDiff(finalTime,timeSettled)/obj.duration;
            //
            //
            //         if(obj.isCycleInvest=="是"){
            //
            //             if(obj.currentPeriod==durationNum&&CompareTheDate(date_add(currentFinalTime,-15),nowDate)){
            //                 return "";
            //
            //             }else if(CompareTheDate(currentValueDateTime,nowDate)&&CompareTheDate(nowDate,date_add(currentFinalTime,-15))){
            //
            //                 return date_add(currentFinalTime,-15).replace('-','年').replace('-','月')+"日";
            //             }else{
            //                 return date_add(date_add(currentFinalTime,obj.duration),-15).replace('-','年').replace('-','月')+"日";
            //             }
            //         }else {
            //             return "";
            //         }
            //     }
            // }},

            {title:'到期日',dataIndex:'duration',width:100,renderer:function(value,obj){
                //var durationNum = (obj.finalTime-obj.timeSettled)/value;

                //结息日
                var finalTime = obj.finalTime.replace('年','-').replace('月','-').replace('日','');
                //起息日
                var timeSettled = obj.timeSettled.replace('年','-').replace('月','-').replace('日','');
                //赎回日期
                var redeemTime = obj.redeemTime.replace('年','-').replace('月','-').replace('日','');
                //当前起息日
                var currentValueDateTime = obj.currentValueDateTime.replace('年','-').replace('月','-').replace('日','');
                //当前结息日
                var currentFinalTime = obj.currentFinalTime.replace('年','-').replace('月','-').replace('日','');

                //期数
                var durationNum = DateDiff(finalTime,timeSettled)/value;

                //第几期赎回
                var redeemPeriod = obj.redeemPeriod;

                if(obj.isCycleInvest=="是"&&obj.status=="赎回中"&& redeemPeriod!=0){
                    return date_add(timeSettled,(redeemPeriod*value));

                    // if(obj.currentPeriod==durationNum){
                    //     return obj.finalTime;
                    //
                    // }else if(CompareTheDate(date_add(currentValueDateTime,-15),redeemTime)&&CompareTheDate(redeemTime,date_add(currentFinalTime,-15))){
                    //
                    //     return obj.currentFinalTime;
                    // }else{
                    //     return date_add(currentFinalTime,obj.duration).replace('-','年').replace('-','月')+"日";
                    // }
                }else {
                    return "";
                }

        }},
            {title:'投资类型',dataIndex:'submitTime',width:100,renderer:function (value,obj) {
                var timeSettled = obj.timeSettled.replace('年','-').replace('月','-').replace('日','');
                var submitTime = value.replace('年','-').replace('月','-').replace('日','');
                if(CompareTheDate(timeSettled,submitTime)){
                    return "购买转让";
                }else {
                    return "直接投资";
                }
            }},
            {title:'交易日期',dataIndex:'submitTime',width:100},
            {title:'状态',dataIndex:'status',width:100,renderer:function(value,obj){
               // alert(obj.status);
                return '<span class="grid-command btn-nex" >'+value+'</span>'
        }},
            {title:'最近赎回截止日',dataIndex:'status',width:200,renderer:function (value,obj) {
                if(value=="计息中"){

                    var finalTime = obj.finalTime.replace('年','-').replace('月','-').replace('日','');//结息日
                    var timeSettled = obj.timeSettled.replace('年','-').replace('月','-').replace('日','');//起息日
                    var currentValueDateTime = obj.currentValueDateTime.replace('年','-').replace('月','-').replace('日','');//当前起息日
                    var currentFinalTime = obj.currentFinalTime.replace('年','-').replace('月','-').replace('日','');//当前结息日
                    var date = new Date();
                    //alert(formatDate(date));
                    var nowDate = formatDate(date);
                    var durationNum = DateDiff(finalTime,timeSettled)/obj.duration;

                    if(obj.isCycleInvest=="是"){

                        if(obj.currentPeriod==durationNum&&CompareTheDate(date_add(currentFinalTime,-15),nowDate)){
                            return "";

                        }else if(CompareTheDate(currentValueDateTime,nowDate)&&CompareTheDate(nowDate,date_add(currentFinalTime,-15))){

                            return date_add(currentFinalTime,-15).replace('-','年').replace('-','月')+"日";
                        }else{
                            return date_add(date_add(currentFinalTime,obj.duration),-15).replace('-','年').replace('-','月')+"日";
                        }
                    }else {
                        return "";
                    }
                }
            }},
            {title:'归属机构',dataIndex:'ownerOrg',width:100},
            {title:'归属人',dataIndex:'owner',width:100},
            {title:'融资方信息',dataIndex:'assetInfo',width:200}

        ];
        //alert(getCharFromUtf8(location.search).substring(1,11));
        var str = getCharFromUtf8(location.search).substring(1,4);
        var str1 = "fro";
        var str2 = "onl";

        if(str==str1){
            $("input[name='loanTitle']").val(getCharFromUtf8(location.search).substring(11));
        }
        else if(str==str2){
            $("#isFromAssert").val("true")
            //url_findInvestByOnlineId = contextPath+'tbInvest/findInvestAndCustomerFromOnlineRecent.json';
            // var myDate = new Date().Format("yyyy-MM-dd");
            // var myDate2 = new Date.fun_date(7).Format("yyyy-MM-dd")
            // $("input[name='e_beginDate']").val(myDate);
            // $("input[name='e_endDate']").val(myDate2);
        };

        var store = new Store(
            {
                url: url_findInvestByOnlineId,
                pageSize: 30,
                params: form1.serializeToObject(),
                //autoLoad: true,
            });

        store.load(form1.serializeToObject(),function () {
            $("#isFromAssert").val("")
        });
        var grid = new Grid.Grid({
            render: '#InfoGrid',
            columns: Columns,
            width: '100%',
            loadMask: true,
            store: store,
            bbar: {
                pagingBar: true
            }
            //, plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });
        grid.render();


        $("#btnSearch").on('click', function () {


            // 序列化成对象
            var obj = form1.serializeToObject();

            obj.start = 0; // 返回第一页
            store.load(obj,function () {
                $("#isFromAssert").val("");
            });
            return false;
        });
        $("#download").on('click', function () {
            form1.set("action", "exportDateInfo.json");
            form1.submit();
        });
        var date = new Date();
        $("#startDate").val(date.format("yyyy-MM-dd"));
        $("#endDate").val(date.format("yyyy-MM-dd"));

        $("#info").click(function(){
            var customerId = grid.getSelected().id;
            window.open("../../customer/customerInfo.html?customerId="+customerId);
        })
        $("#exportExcel").click(function () {
            var obj = form1.serializeToObject();
            window.open("../tbInvest/exportInfo.json?customerAndInvestCond=" + JSON.stringify(obj));
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

//判断渠道来源
function channel(){
    var ifOnlineInvest=$("#ifOnlineInvest").get(0).val();
    var ifOfflineInvest=$("#ifOfflineInvest").get(0).val();
    if(ifOnlineInvest=="Y" && ifOfflineInvest!="Y"){
        $("#channel").html("线上");
    }else if(ifOnlineInvest!="Y" && ifOfflineInvest=="Y"){
        $("#channel").html("线下");
    }else {
        $("#channel").html("线上线下");
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

//一个日期加（减）一个天数得到一个新的日期
function date_add(dateTemp, days) {
    var dateTemp = dateTemp.split("-");
    var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式
    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
    var rDate = new Date(millSeconds);
    var year = rDate.getFullYear();
    var month = rDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var date = rDate.getDate();
    if (date < 10) date = "0" + date;
    return (year + "-" + month + "-" + date);
}

//比较两个日期（格式："2017-12-14"）相差的天数
function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays
    aDate  =  sDate1.split("-")
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
    aDate  =  sDate2.split("-")
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
    return  iDays
}

//比较两个日期（格式："2017-12-14"）的大小，当date2>date1,返回true
function CompareTheDate(date1,date2){
    var oDate1 = new Date(date1);
    var oDate2 = new Date(date2);
    if(oDate1.getTime() > oDate2.getTime()){
        return false;
    } else {
        return true;
    }
}//格式化日期
var formatDate = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};

//将编码转换成字符
function utf8ToChar(str) {
    var iCode, iCode1, iCode2;
    iCode = parseInt("0x" + str.substr(1, 2));
    iCode1 = parseInt("0x" + str.substr(4, 2));
    iCode2 = parseInt("0x" + str.substr(7, 2));
    return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));
}

//获取七天前或七天后的日期





