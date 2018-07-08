package com.seven.zerofour.controller;

import com.seven.zerofour.base.ErrorMsgEnum;
import com.seven.zerofour.dto.BaseResult;

public class BaseController {


    protected BaseResult buildErrResult(ErrorMsgEnum errorMsgEnum){
        return new BaseResult(errorMsgEnum);
    }
}
