






//@ sourceURL=customer.js
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";

        var url_findDueTO = contextPath+'tbCustomer/findDueTo.json';
        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';
        var url_findInvestByOnlineId =contextPath+'tbInvest/findInvestAndCustomer.json';
        var url_find = contextPath+'salesTarget/find.json';
        var url_findOrgInfo = contextPath+'/orgInfo/queryOrgInfo.json '


        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var form2 = new Form.HForm({
            srcNode: '#H_Form'
        });
        form2.render();

        var form3 = new Form.HForm({
            srcNode:'#G_Form'
        });
        form3.render();

        var Store = Data.Store, Columns = [

            {title:'经营机构',dataIndex:'orgInfoId',width:200},
            {title:'负责人',dataIndex:'remark',width:100},
            {title:'开始时间',dataIndex:'begindate',width:200},
            {title:'结束时间',dataIndex:'enddate',width:200},
            {title:'周销量目标',dataIndex:'salestarget',width:200}
        ];

        $("#btnSearch").on('click', function () {
            var a = $("#beginDate").val();
            var b = $("#endDate").val();


            if(a==null||a==""||b==null||b==""){
                alert("查询时间为必填项")
            }else {
                // 序列化成对象
                var obj = form1.serializeToObject();
                obj.start = 0; // 返回第一页
                store.load(obj);
                return false;
            }

        });


        var store = new Store(
            {
                url: url_find,
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


        $("#exportExcel").click(function () {
            var obj = form1.serializeToObject();
            window.open("../tbCustomer/export.json?customerCond=" + JSON.stringify(obj));
        })

        $("#num").append("<tr><td></td></td></tr>")




        var dialog = new Overlay.Dialog({
            title:'',
            width:'90%',
            height:'90%',
            //配置DOM容器的编号
            contentId:'content',
            success:function () {
                alert('确认');
                this.close();
            }
        });

        $('#btnShow').on('click',function () {
            dialog.show();
        });

        var mark = "";
        $("#edit").hide();
        $("#save").hide();
        $("#query").click(function () {
            $("#overview").empty();
            var queryDate = $("#date").val();
            if(queryDate==''){
                BUI.Message.Alert("请选择日期")
            }else {
                if(new Date(queryDate).getDay()!=1){
                    BUI.Message.Alert("请选择周一")
                }else {

                    $.ajax({
                        type:'get',
                        url:'/salesTarget/findWeek.json',
                        data:{weekDate:queryDate},
                        dataType:'json',
                        success:function (data) {
                            if(data.success){
                                if(data.value.length == 0){
                                    BUI.Message.Alert("本周没有数据")
                                }else {
                                    $.each(data.value,function(i,item){
                                        addLine(-1);
                                        updateLine(-1,item);
                                        $("#edit").show();
                                        mark="queryed"
                                    })
                                }

                            }else {
                                BUI.Message.Alert(data.msg);
                            }

                        }
                    });
                }
            }
        })

        $("#edit").click(function () {
            if(mark!="queryed"){
                BUI.Message.Alert("请先进行查询操作")
            }else {
                $(".salestarget").removeAttr("disabled");
                var ja = [];

            }
        })



            $("#add").click(function () {

                var queryDate = $("#date").val();

                if(queryDate==''){
                    BUI.Message.Alert("请选择时间")
                }else {
                    if(new Date(queryDate).getDay()!=1){
                        BUI.Message.Alert("请选择周一")
                    }else {
                        $.ajax({
                            url:'/salesTarget/findWeek.json',
                            type:'get',
                            dataType:'json',
                            data:{weekDate:queryDate},
                            success:function (data) {
                                if(data.success){
                                    if((data.value.length)>0){
                                        BUI.Message.Alert("本周已经设定销售目标，您可以对本周执行查询编辑操作");
                                    }else{
                                        $("#overview").empty();
                                        $.ajax({
                                            url:url_findOrgInfo,
                                            type:'get',
                                            dataType:'json',
                                            success:function (data) {
                                                $.each(data.rows,function (i,item) {
                                                    addOrgLine(-1);
                                                    updateOrgLine(-1,item);
                                                    $("#save").show();
                                                })
                                            }
                                        })
                                    }

                                }
                            }
                        })
                    }
                }

            })

        function addOrgLine(id) {

            $("#overview").append(
                "<tr id='"+id+"'><td style='display: none'></td><td></td><td></td><td></td></tr>"
            )
        }

        function updateOrgLine(id,item) {
            $tr = $("#overview tr[id='"+id+"']");
            $tr.attr("id",item.id);
            $td = $tr.find("td:first");
            $td.html(item.orgNo);
            $td = $td.next();
            $td.html(item.orgName);
            $td = $td.next()
            $td.html(item.leader);
            $td = $td.next();
            $td.html('<input type="text" name="salestarget"/>');
            // $td = $td.next();
            // $td.append('<input type="button" onclick="edit('+item.id+')" class="button button-info" value="编辑"/>');

        }
        
        
        $("#save").click(function () {
            $("#save").hide();
            var obj = form2.serializeToObject();
            var ja = [];
            $.each($("#overview tr"),function () {
                var jo = {};
                jo.orgInfoId = $(this).find("td:first").html();
                jo.orgName = $(this).find("td:first").next().html();
                jo.leader = $(this).find("td:first").next().next().html();
                jo.salestarget = $(this).find("td:first").next().next().next().find("input").val();
                jo.begindate = $("#date").val();
                ja.push(jo);
            })
            $.ajax({
                url:'/salesTarget/batchAdd.json',
                data:{salesTargetList:JSON.stringify(ja)},
                type:'post',
                dataType:'json',
                success:function (data) {
                    if(data.success){
                        BUI.Message.Alert("添加成功")
                        $("#overview").empty();
                        $.each(data.value,function (i,item) {
                            addLine(-1);
                            updateLine(-1,item);

                        })

                    }
                }
            })
        })



        // $("#save_one").live("click",function () {
        //
        //     var orgInfoId = $("#orgInfoId").val();
        //     var salestarget = $("#salestarget").val();
        //     var queryDate = $("#date").val();
        //     if(queryDate==''){
        //         alert("请选择时间")
        //     }else {
        //         if(new Date(queryDate).getDay()!=1){
        //             alert("请选择周一")
        //         }else {
        //             $.ajax({
        //                 type:'post',
        //                 url:'/salesTarget/add.json',
        //                 data:{orgInfoId:orgInfoId,salestarget:salestarget,begindate:queryDate},
        //                 dataType:'json',
        //                 success:function (data) {
        //                     alert("添加成功");
        //                     $("#query").trigger("click");
        //                 }
        //             })
        //         }
        //     }
        // })
        



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



function edit(id) {

    $("#overview").find("#"+id).find("td:first").next().next().empty().append("<input type='text'/>");
    $("#overview").find("#"+id).find("td:first").next().next().next().children().val("保存").attr("id","editSave").attr("onclick","");
    $("#editSave").click(function () {
        var salestarget = $("#overview").find("#"+id).find("td:first").next().next().find("input").val();
        if(salestarget==''){
            alert("请输入销量目标")
        }else {
            $.ajax({
                type:'post',
                url:'/salesTarget/editSave.json',
                data:{id:id,salestarget:salestarget},
                dataType:'json',
                success:function (data) {
                    alert("修改成功")
                    $("#query").trigger("click");
                }
            })
        }
    })
}

function addLine(id) {

    $("#overview").append(
        "<tr id='"+id+"'><td></td><td></td><td></td></tr>"
    )
}

function updateLine(id,item) {
    $tr = $("#overview tr[id='"+id+"']");
    $tr.attr("id",item.id);
    $td = $tr.find("td:first");
    $td.html(item.orgInfoId);
    $td = $td.next()
    $td.html(item.remark);
    $td = $td.next();
    //$td.html(item.salestarget).attr("class","dalestarget");
    $td.append("<input class='salestarget' disabled='disabled' value='"+item.salestarget+"'/>")
    // $td = $td.next();
    // $td.append('<input type="button" onclick="edit('+item.id+')" class="button button-info" value="编辑"/>');

}

// function save() {
//
//         alert("ccccc")
//         var queryDate = $("#date").val();
//         if(queryDate==''){
//             BUI.Message.Alert("请选择时间")
//         }else {
//             if(new Date(queryDate).getDay()!=1){
//                 BUI.Message.Alert("请选择周一")
//             }else {
//                 $.ajax({
//                     url:'/salesTarget/findWeek.json',
//                     type:'get',
//                     dataType:'json',
//                     success:function (data) {
//                         if(data.success){
//                             alert(data.value.size())
//                             alert(data.value.length);
//                         }
//                     }
//                 })
//             }
//         }
// }










//
// $("#overview").empty();
// $.ajax({
//     url:'/orgInfo/queryOrgInfo.json',
//     type:'get',
//     dataType:'json',
//     success:function (data) {
//         $.each(data,function (i,item) {
//             addLine(-1);
//             updateLine(-1,item);
//         })
//     }
// })

