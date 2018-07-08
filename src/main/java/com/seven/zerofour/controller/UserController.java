package com.seven.zerofour.controller;


import com.seven.zerofour.base.ErrorMsgEnum;
import com.seven.zerofour.dto.BaseResult;
import com.seven.zerofour.model.TbUser;
import com.seven.zerofour.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@Slf4j
@RestController
@RequestMapping("/user")

public class UserController extends BaseController{

        @Resource
        private UserService userService;



        @RequestMapping("createUser.json")
        public BaseResult<String> createUser(String userName, String passWord, String email){

            TbUser user = new TbUser();
            user.setUserName(userName);
            user.setPassWord(passWord);
            user.setEmail(email);
            TbUser tbUser = userService.findByUserName(user);
            if(null!=tbUser){
                if(tbUser.getUserName().equals(userName)){
                    ErrorMsgEnum errorMsgEnum = ErrorMsgEnum.CUST_NAME_HAS_REG;
                    return new BaseResult<String>(errorMsgEnum.getMsg());
                }else if(tbUser.getEmail().equals(email)){
                    return buildErrResult(ErrorMsgEnum.CUST_EMAIL_HAS_REG);
                }

            }

           Integer result =  userService.createUser(user);
            return new BaseResult(true,"注册成功");

        }

        @RequestMapping("login.json")
        public BaseResult<String> login(String userName,String passWord){
            TbUser user = new TbUser();
            user.setUserName(userName);
            user.setPassWord(passWord);
            TbUser tbUser = userService.findByUserName(user);
            if(null==tbUser){
                return buildErrResult(ErrorMsgEnum.CUST_NULL);
            }else if(null!=tbUser){
                if(!tbUser.getPassWord().equals(passWord)){
                    return buildErrResult(ErrorMsgEnum.CUST_PASSWORD_ERROR);
                }
            }
            return new BaseResult<String>(true,"登陆成功");

        }
}
