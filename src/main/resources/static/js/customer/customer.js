
//@ sourceURL=customer.js

BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";
        var url_queryAll = contextPath + "tbCustomer/find.json";
        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';

        /************************************************************************************************/


        var msg = getCharFromUtf8(location.search).substring(5);
        var msg1 = getCharFromUtf8(location.search).substring(5,10);
        if(msg=="nob"){
            $("input[name='no_customer']").val("no" );

        }else if(msg=="leave"){
            $("input[name='ifOnlineInvest']").val("Y" );
            $("input[name='ifOfflineInvest']").val("Y");
            $("input[name='queryCondition']").val("(tc.asset+tc.banlance)<1000");
        }else if(msg=="level_one"){
            $("select[name='referral'] option[value='referral_one']").attr("selected","selected");
        }else if(msg=="level_two"){
            $("select[name='referral'] option[value='referral_two']").attr("selected","selected");
        }else if(msg=="effective"){
            $("input[name='assetMin']").val("50000")
        }else if(msg=="flow"){
            $("input[name='assetMax']").val("49999.9999");
            $("input[name='customerName_flag']").val("isNotNull")
        }else if(msg=="nocard"){
            $("input[name='customerName_flag']").val("isNull")
        }else if(msg=='group_sum'||msg== 'group_department'||msg=='group_weiluo'||msg=='group_effective'||msg=='group_flow'||msg=='group_noCard'){
            $("input[name='orgNo_flag']").val(msg)
        }else if(msg=='group_effective'){
            $("input[name='assetMin']").val("50000")
        }else if(msg=='group_flow'){
            $("input[name='assetMax']").val("49999.9999");
        }


        if(msg1=='group'){
            $("input[name='group_flag']").val(msg1)
        }


        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });


        form1.render();

        var Store = Data.Store,
            Columns = [
            {title: '客户名称',dataIndex:'customerName',width:100,elCls : 'center',renderer:function (value,obj) {
                if(value==null){
                    value='未实名'
                }
                return '<a href="../../customer/customerInfo.html?customerId=' + obj.id + '">'+value+'</a>';
            }},

            {title:'生日',dataIndex:'birthday',elCls : 'center',width:100},

            {title: '总资产', dataIndex: 'asset', width: 100,elCls : 'center',renderer:function (value) {

                //value = parseInt(value);
                if(value==null){
                    return '0.00'
                }else {
                    return fmoney(value.toFixed(2)/10000);
                }

            }},
                {title:'线上最近购买时间', dataIndex:'onlineNearestPurchaseDate',width:120,elCls : 'center'},

                {title:'线上最近到期时间', dataIndex:'onlineNearestArriveDate',width:120,elCls : 'center'},

            {title:'线上金融资产', dataIndex:'onlineAsset',width:100,elCls : 'center',renderer:function(value){
                return fmoney(value.toFixed(2)/10000);
            }},
            {title:'线上闲置资产', dataIndex:'banlance',width:100,elCls : 'center',renderer:function(value){
                if(value==null){
                    return '0.00'
                }else {
                    return fmoney(value.toFixed(2)/10000);
                }
            }},

            {title:'线下金融资产',dataIndex:'offlineAsset',width:100,elCls : 'center',renderer:function(value){
                if(value==null){
                    return '0.00'
                }else {
                    return fmoney(value.toFixed(2)/10000);
                }
            }},
                {title:'季日均',dataIndex:'cjajrj',elCls : 'center',width:100,renderer:function (value) {
                    if(value==null){
                        return '0.00'
                    }else {
                        return fmoney(parseFloat(parseFloat(value)/10000,3).toFixed(2),3);
                    }

                }},

            //用于查询当前登录人的一级客户和二级客户
            {title:'推荐类型',dataIndex:'referral',elCls : 'center',width:100},

                {title:'来源',dataIndex:'channel',elCls : 'center',width:100},
                {title:'注册时间',dataIndex:'onlineRegisterDate',elCls : 'center',width:100},
                {title:'推荐人名称',dataIndex:'referralUserName1',elCls : 'center',width:100},
                {title:'归属人名称',dataIndex:'owner',elCls : 'center',width:100},
                {title:'归属机构名称',dataIndex:'ownerOrg',elCls : 'center',width:100}


        ];


        var store = new Store(
            {
                url: url_queryAll,
                pageSize: 600,
                params: form1.serializeToObject(),
                autoLoad: true,
                //root:'data'


            });



        //store.load();
        var grid = new Grid.Grid({
            render: '#InfoGrid',
            columns: Columns,
            width: '100%',
            loadMask: true,
            innerBorder: false,
            store: store,
            bbar: {
                pagingBar: true
            },
            //plugins: [Grid.Plugins.RadioSelection], autoRender: true
        });
        grid.render();




        var redeemDialog = new Overlay.Dialog(
            {
            width: "60%",
            title: "赎回周期列表",
            contentId: "redeemDialog",
            buttons: [{
                text: '关闭',
                elCls: 'button',
                handler: function () {
                    this.close();
                }
            },
                {
                text:'客户详情',
                ecCls:'button button-info',
                handler:function(){

                    var customerId = grid.getSelected().customerId;
                    window.open("../../customer/customerInfo.html?customerId"+customerId);
                }
            },
                {
                text: '导出',
                elCls: 'button button-info customerInfo',
                handler: function () {
                    var productId = grid.getSelected().productId;
                    window.open("../product/exportRedeemDateInfo.json?productId=" + productId);
                }
            }
            ]
        });

        grid.on("cellclick", function (ev) {
            var sender = $(ev.domTarget);
            //点击的Dom
            var record = ev.record;
            //跳转到详情页面
            if (sender.hasClass('btn-next')) {
                redeemDialog.show();
                redeemStore.load({productId: record.productId})
            }
        })
        $("#btnSearch").on('click', function () {
            // 序列化成对象
            $("input[name='no_customer']").val("" );
            $("input[name='ifOnlineInvest']").val("" );
            $("input[name='ifOfflineInvest']").val("");
            $("input[name='queryCondition']").val("");
            var obj = form1.serializeToObject();
            obj.start = 0; // 返回第一页
            store.load(obj);
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
        $("#tbCustomer_exportExcel").click(function () {
            var obj = form1.serializeToObject();
            window.open("../tbCustomer/exportCustomerInfo.json?customerCond=" + JSON.stringify(obj));
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


//显示当前页总金额

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



