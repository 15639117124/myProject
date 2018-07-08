var dialog;
var store = null;
var value = null;
var editFlag = true;

BUI.use(['bui/form', 'bui/grid', 'bui/data', 'bui/calendar', 'bui/tab', 'bui/overlay'],
function (Form, Grid, Data, Calendar, Tab, Overlay) {
        var contextPath = "../";
        var url_query = contextPath + "tbCustomer/findOnelevelUnFitCustomer.json";
        var url_twoquery = contextPath + "tbCustomer/findTwolevelUnFitCustomer.json";
        var url_fitOne = contextPath + "tbCustomer/updateRef1Owner.json";
        var url_fitTwo = contextPath + "tbCustomer/updateRef2Owner.json";
        /**********************************************渠道费信息Start**************************************************/
        var form1 = new Form.HForm({
            srcNode: '#J_Form'
        });

        form1.render();


        var Store = Data.Store, dataColumns = [
                    {title: '客户名称', dataIndex: 'customerName', width: 200},
                    {title: '一级推荐人', dataIndex: 'referralUserName1', width: 200},
                    {title: '二级推荐人', dataIndex: 'referralUserName2', width: 200},
                    {title: '总推荐人', dataIndex: 'referralUserName3', width: 200},
                    {title: '归属人ID', dataIndex: 'ownerId', width: 200},
                    {title: '归属人', dataIndex: 'owner', width: 200},
                ];
                store = new Store(
                    {
                        url: url_query,
                        pageSize: 30,
                        params: form1.serializeToObject(),
                        autoLoad: false
                    });
                var grid = new Grid.Grid({
                    render: '#levelOne',
                    columns: dataColumns,
                    width: '100%',
                    loadMask: true,
                    store: store,

                });
                grid.render();
            var Store2 = Data.Store, dataColumns = [
                               {title: '客户名称', dataIndex: 'customerName', width: 200},
                               {title: '一级推荐人', dataIndex: 'referralUserName1', width: 200},
                               {title: '二级推荐人', dataIndex: 'referralUserName2', width: 200},
                               {title: '总推荐人', dataIndex: 'referralUserName3', width: 200},
                               {title: '归属人ID', dataIndex: 'ownerId', width: 200},
                               {title: '归属人', dataIndex: 'owner', width: 200},
                           ];
                  store2 = new Store2(
                                    {
                                        url: url_twoquery,
                                        pageSize: 30,
                                        params: form1.serializeToObject(),
                                        autoLoad: false
                                    });
                    var grid2 = new Grid.Grid({
                        render: '#levelTwo',
                        columns: dataColumns,
                        width: '100%',
                        loadMask: true,
                        store: store2,

                    });
                    grid2.render();

                $("#btnSearch").on('click', function () {
                  //  $("#trueUserId").val($("#userId").val());
                  var val = $("#userId").val();
                  $("#trueUserId").val(val);
                    // 序列化成对象
                    var obj = form1.serializeToObject();
                    obj.start = 0; // 返回第一页
                    store.load(obj);
                    store2.load(obj);
                    return false;
                });

                 $("#putOne").on('click', function () {
                    // 序列化成对象
                    var userId =$("#trueUserId").val();
                   $.ajax({
                              url: url_fitOne,
                              type: 'post',
                              data: {userId:userId},
                              success: function (data) {
                                  if (data.success) {
                                      BUI.Message.Alert('归属完成', 'success');
                                      store.load();
                                  } else {
                                      BUI.Message.Alert(data.msg, 'error');
                                   }
                              }
                          })
                });


                 $("#putTwo").on('click', function () {
                            // 序列化成对象
                        var userId =$("#trueUserId").val();
                       $.ajax({
                                  url: url_fitTwo,
                                  type: 'post',
                                  data: {userId:userId},
                                  success: function (data) {
                                      if (data.success) {
                                          BUI.Message.Alert('归属完成', 'success');
                                          store2.load();
                                      } else {
                                          BUI.Message.Alert(data.msg, 'error');
                                       }
                                  }
                              })
                        });



       } );