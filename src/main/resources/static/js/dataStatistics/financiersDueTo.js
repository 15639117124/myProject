
//@ sourceURL=customer.js
BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/overlay','bui/extensions/treepicker', 'bui/tree'],
    function (Form, Grid, Data, Overlay,TreePicker, Tree) {
        var contextPath = "../";


        var url_queryOrgInfo = contextPath + 'orgInfo/queryOrgInfoTree.json';

        var url_findDueTo = contextPath+'financiers/findDueTo.json'
        var url_findAll = contextPath+'financiers/findAll.json'

        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();

        var Store = Data.Store, Columns = [

            {title:'融资方名称',dataIndex:'referred',width:200},

            {title:'统计开始时间',dataIndex:'beginDate',width:200},
            {title:'统计结束时间',dataIndex:'endDate',widht:200},
            {title:'线上到期(万)',dataIndex:'onlineamount',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }},
            {title:'线下到期(万)',dataIndex:'offlinemoney',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }},
            {title:'小计(万)',dataIndex:'sumsales',width:200,renderer:function (value) {
                return (value/10000).toFixed(1);
            }}

        ];

        $("#btnSearch").on('click', function () {
            // 序列化成对象
            var obj = form1.serializeToObject();
            obj.start = 0; // 返回第一页
            store.load(obj,function (data) {

            });
            return false;


        });

        var store = new Store(
            {
                url: url_findDueTo,
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


        $("#exportDuoTo").click(function () {

            var obj = form1.serializeToObject();
            var a = $("#beginDate").val();
            if(a==null||a==""){
                BUI.Message.Alert("请选择查询时间！")
            }else {
                var obj = form1.serializeToObject();

                window.open("../financiers/exportDueTo.json?financiersCond=" + JSON.stringify(obj));
            }

        })


        $("#exportDueToDetail").click(function () {

            var obj = form1.serializeToObject();
            var a = $("#beginDate").val();
            if(a==null||a==""){
                BUI.Message.Alert("请选择查询时间！")
            }else {
                var obj = form1.serializeToObject();

                window.open("../financiers/exportDueToDetail.json?financiersCond=" + JSON.stringify(obj));
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















