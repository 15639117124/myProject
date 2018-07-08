BUI.use(['bui/form', 'bui/tooltip'], function (Form, Tooltip) {
    // 表单render
    var form1 = new Form.HForm({
        srcNode: '#J_Form',
        errorTpl: ''
    });

    form1.render();

    $('#loginBtn').on('click', function () {
        $.ajax({
            type: "POST",
            url: "/login/login.json",
            data: $("#J_Form").serialize(),
            success: function (result) {
                // 成功
                if (result.success) {
                    // 如果密码是初始密码，则跳到密码修改页面
                    if ($("#pwd").val() == "123456") {
                        window.location = "/changePWD.html";
                    } else {
                        window.location = "/index.html";
                    }
                } else {
                    BUI.Message.Alert(result.msg, 'error');
                }
            }
        });
    });
});
