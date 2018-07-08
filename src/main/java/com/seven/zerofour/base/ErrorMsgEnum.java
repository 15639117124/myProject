package com.seven.zerofour.base;




public enum ErrorMsgEnum {

    CUST_NAME_HAS_REG("CUST_0001","该账户已经注册，请直接登陆"),
    CUST_EMAIL_HAS_REG("CUST_0002","该邮箱已经注册,请使用邮箱直接登陆"),
    CUST_NULL("CUST_0003","账户不存在，请先注册"),
    CUST_PASSWORD_ERROR("CUST_0004","密码错误"),
    CUST_LOGIN_SUCC("CUST_0005","登陆成功");


    private String code;
    private String msg;

    ErrorMsgEnum(String code,String msg){
        this.code = code;
        this.msg = msg;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
