package com.seven.zerofour.service;


import com.seven.zerofour.dao.TbUserDao;
import com.seven.zerofour.model.TbUser;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.constraintvalidators.bv.past.PastValidatorForReadableInstant;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j

public class UserService {

    @Resource
    private TbUserDao userDao;

    public Integer createUser(TbUser user) {

        Integer result = userDao.insertSelective(user);
        return result;


    }

    public TbUser findByUserName(TbUser user) {
        TbUser tbUser = userDao.findByUserName(user);
        return tbUser;
    }
}
