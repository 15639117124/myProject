package com.seven.zerofour.dao;

import com.seven.zerofour.model.TbUser;

public interface TbUserDao {
    int deleteByPrimaryKey(Integer id);

    int insert(TbUser record);

    int insertSelective(TbUser record);

    TbUser selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TbUser record);

    int updateByPrimaryKey(TbUser record);

    TbUser findByUserName(TbUser user);
}