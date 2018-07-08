BUI.use(['bui/navlist', 'bui/mainlayout', 'bui/list', 'bui/overlay', 'bui/menu', 'bui/grid', 'bui/tooltip', 'bui/data', 'bui/toolbar', 'bui/tab'],
    function (NavList, MainLayout, List, Overlay, Menu, Grid, Tooltip, Data, Toolbar, Tab) {
        $.ajax({
            url: "/login/getName.json",
            type: 'post',
            async: false,
            success: function (data) {
                if (data.success) {
                    $("#welcome").text(data.value);
            } else {
                    window.location = "/login.html";
                }
            }
        });
        //主页面板布局
        new MainLayout({
            srcNode: '#mainlayout',
            topHeight: "110"
        }).render();
        var listData = [];

        $.ajax({
            url: "/permit/getMenu.json",
            type: 'post',
            async: false,
            success: function (data) {
                if (data.success) {
                    listData = data.value;
                } else {
                    BUI.Message.alert(data.msg);
                }
            }
        });
        //左侧导航菜单
        var navMenu = new NavList({
            srcNode: '#navlist',
            data: listData,
            //数据映射
            map: {
                "uid": "id",
                "name": "text"
            }
        }).render();
        var sumCustomer = 0;
        $.post("/tbCustomer/findSumCustomer.json",function (res) {
            if(res==0){
                var iframeTab = '<iframe id="frameWindow" src="composition.html" border="0" frameborder="0"></iframe>';
                $("#frameTab").append(iframeTab);
                sumCustomer = res;
            }else {
                var iframeTab = '<iframe id="frameWindow" src="myAssert.html" border="0" frameborder="0"></iframe>';
                $("#frameTab").append(iframeTab);
                sumCustomer = res;
            }
        })
        // var iframeTab = '<iframe id="frameWindow" src="composition.html" border="0" frameborder="0"></iframe>';
        


        navMenu.on("itemclick", function (ev) {
            var pagePath = ev.item['url'];
            if (pagePath != "") {
                navMenu.set("isAbsolute", false);
                $("#frameWindow").attr("src", pagePath + "?_" + Math.random());
                setFlow(ev.item);
                $("#frameTab").css("margin-left", '0');
            }
        });

        //帮助中心
        var dialog = new Overlay.Dialog({
            elCls: 'custom-help-dialog',
            headerContent: '<div class="header"><span>帮助中心</span></div>',
            title: '帮助中心',
            width: 500,
            // 配置DOM容器的编号
            contentId: 'helpDialog',
            buttons: []
        });
        $("#help").click(function () {
            dialog.show();
        });


        //工作台返回
        $("#workType").click(function () {
            if(sumCustomer==0){
                $("#frameWindow").attr("src", "composition.html");
            }else {
                $("#frameWindow").attr("src", "myAssert.html");
            }

            $("#frameTab").css("margin-left", '180px');
            $("#flow").html("工作台首页");
            navMenu.set("isAbsolute", true);
            $("#navlist>.dropdown:first").show();
        });


        //导航标题
        function setFlow(node) {
            var lists = navMenu.getParentItems(node);
            var flow = "当前位置:";
            for (var i = lists.length - 1; i >= 0; i--) {
                if (i == 0)
                    flow += lists[i]['text'];
                else
                    flow += lists[i]['text'] + ">";
            }

            // if(flow=="当前位置:经营机构管理"){
            //     $.get("/staff/findByLoginName.json",function (res) {
            //         $("#flow").html("当前位置："+res.orgName);
            //     })
            // }else {
                $("#flow").html(flow);
            // }

        }


        var tab = new Tab.TabPanel({
            srcNode: '#tab',
            elCls: 'nav-tabs',
            itemStatusCls: {
                'selected': 'active'
            },
            panelContainer: '#panel'//如果不指定容器的父元素，会自动生成
        });

        tab.render();

        $.ajax({
            url: "/tradeTdaysInfo/findNowRedeemProduct.json",
            type: "post",
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    BUI.Message.Confirm("有产品在赎回期,要去查看吗?", function () {
                        navMenu.set("isAbsolute", false);
                        $("#frameWindow").attr("src", "/product/redeemPeriodsForDays.html?_" + Math.random());
                        $("#flow").html("当前位置:产品信息>按天赎回周期");
                        $("#frameTab").css("margin-left", '0');
                        $("#navlist>.dropdown:first").hide();
                    }, "info");
                }
            },
            error: function () {

            }
        });
    });

function logout() {
    $.ajax({
        type: "POST",
        url: "/login/logout.json",
        success: function () {
            window.location.href = "login.html";
        }
    });
}

function downloadDoc(file) {
    var url = "../doc/" + file;
    window.location.href = url;
}
function heartBeating() {
    $.ajax({
        type: "POST",
        url: "/login/heartBeating.json"
    });
}
$(document).ready(function () {
    setInterval(heartBeating, 60000);
})