Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
function dealWithReadonlyFields(formId, addFlag) {
    var fields = $("#" + formId + " .editReadonly");
    if (addFlag) {
        fields.attr("readonly", "readonly");
    } else {
        fields.removeAttr("readonly");
    }
}
function getPermission() {
    // 权限相关div先隐藏
    var permission = $(".permission");
    if (permission.size() == 0) {
        return;
    }
    permission.hide();

    $.ajax({
        url: "../permit/getButton.json",
        type: "post",
        success: function (data) {
            if (data.success) {
                var list = data.value;
                list.forEach(function (e) {
                    $("#" + e).show();
                })
            }
        }
    })
}
getPermission();
$(document).ready(function () {
    $("#userName").focus(function () {
        var userId = $("#userId").val();
        $.ajax({
            url: "../staff/findById.json",
            type: "post",
            data: {staffId: userId},
            success: function (data) {
                if (data.success) {
                    $("#userName").val(data.value);
                }
            }
        })
    });
    $("#bankName").focus(function () {
        var bankNo = $("#bankNo").val();
        if (!bankNo) {
            return;
        }
        $.ajax({
            url: "../sysCode/findFirst.json",
            type: "post",
            data: {code: bankNo, type: '银行'},
            success: function (data) {
                if (data.success) {
                    $("#bankName").val(data.value.value);
                }
            }
        });
    });
    $("#bankNo").focus(function () {
        var bankName = $("#bankName").val();
        if (!bankName) {
            return;
        }
        $.ajax({
            url: "../sysCode/findFirst.json",
            type: "post",
            data: {value: bankName, type: '银行'},
            success: function (data) {
                if (data.success) {
                    $("#bankNo").val(data.value.code);
                }
            }
        });
    });
    $("input").change(function () {
        var value = $(this).val();
        $(this).val($.trim(value));
    });
    $("#productName").focus(function () {
        var productId = $("#productId").val();
        $.ajax({
            url: "../product/findByProductId.json",
            type: "post",
            data: {productId: productId},
            success: function (data) {
                if (data.success) {
                    $("#productName").val(data.value.productName);
                    if (data.value.dividePhaseFlag == '否') {
                        $("#divideBeginDate").val(data.value.qxDate);
                        $("#divideEndDate").val(data.value.dqDate);
                    }
                }
            }
        })
    })

});