package com.seven.zerofour.dto;

import com.seven.zerofour.base.ErrorMsgEnum;
import lombok.Data;

@Data
public class BaseResult<T> {

    private boolean success = false;
    private T value;
    private String msg;

    public BaseResult(boolean success,T value){
        this.success = success;
        this.value = value;
    }

    public BaseResult(String msg){
        this.msg = msg;
    }

    public BaseResult(ErrorMsgEnum msgEnum){
        this.msg = msgEnum.getMsg();
    }

}
