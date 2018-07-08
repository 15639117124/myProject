# 示例
# 查看列：desc 表名;
# 修改表名：alter table t_book rename to bbb;
# 添加列：alter table 表名 add column 列名 varchar(30);
# 删除列：alter table 表名 drop column 列名;
# 修改列名MySQL： alter table bbb change nnnnn hh int;
# 修改列名SQLServer：exec sp_rename't_student.name','nn','column';
# 修改列名Oracle：alter table bbb rename column nnnnn to hh int;
# 修改列属性：alter table t_book modify name varchar(22);


############2016-10-17###########
ALTER TABLE product_info
  ADD COLUMN Deposits_Flag VARCHAR(2) COMMENT '是否计算活期利率'
  AFTER Jx_Type;

ALTER TABLE trade_detail_info
  ADD COLUMN excel_Id VARCHAR(50) COMMENT 'excel文件批次'
  AFTER Opr_Redeem_Remark;
ALTER TABLE trade_detail_info
  ADD COLUMN image_Id VARCHAR(50) COMMENT '客户信息镜像文件'
  AFTER Opr_Redeem_Remark;
ALTER TABLE trade_detail_info
  ADD COLUMN import_Id VARCHAR(30) COMMENT '批量文件导入人id区分单条手工录入无该信息'
  AFTER Opr_Redeem_Remark;
ALTER TABLE trade_detail_info
  ADD COLUMN import_Date VARCHAR(20) COMMENT '导入人导入excel数据日期'
  AFTER Opr_Redeem_Remark;

############2016-10-24###########
ALTER TABLE `study`.`sys_resource`
  CHANGE COLUMN `resource_value` `resource_value` VARCHAR(200) NULL DEFAULT NULL;

############2016-10-29###########
ALTER TABLE `baton`.`comm_data_privilege`
  CHANGE COLUMN `User_Id` `Staff_Id` VARCHAR(30) NULL DEFAULT NULL
COMMENT '用户Id';
ALTER TABLE `baton`.`comm_data_privilege`
  CHANGE COLUMN `Atrribute_Id` `Attribute_Id` VARCHAR(30) NULL DEFAULT NULL
COMMENT '数据权限属性ID',
  CHANGE COLUMN `Atrribute_Remark` `Attribute_Remark` VARCHAR(100) NULL DEFAULT NULL
COMMENT '属性备注';

###################2016-10-29 ty#########################
ALTER TABLE trade_detail_info
  ADD COLUMN Product_Name VARCHAR(200) COMMENT '产品名称'
  AFTER Product_Id;


ALTER TABLE comm_data_privilege
  ADD COLUMN Org_Name VARCHAR(200) COMMENT '机构名称'
  AFTER Org_No;

##################2016-10-31#############################
ALTER TABLE `baton`.`product_info`
  CHANGE COLUMN `Product_Id` `Product_Id` VARCHAR(50) NULL DEFAULT NULL
COMMENT '产品Id';

####################2016-11-05###################################
ALTER TABLE `baton`.`opt_log_info`
  ADD COLUMN `Opr_Sql_Type` VARCHAR(50) NULL DEFAULT NULL
COMMENT 'SELECT_UPDATE_INSERT_DELETE'
  AFTER Opr_Sql;

ALTER TABLE `baton`.`opt_log_info`
  CHANGE COLUMN `Opr_Sql` `Opr_Sql` VARCHAR(1000) COMMENT '操作执行sql';

####################2016-11-18###################################
ALTER TABLE `baton`.`product_info`
  ADD COLUMN `Buy_Open_Type` VARCHAR(50) NULL DEFAULT NULL
COMMENT '申购开放类型'
  AFTER Redeem_Type;

ALTER TABLE `baton`.`product_info`
  ADD COLUMN `Redeem_Open_Type` VARCHAR(50) NULL DEFAULT NULL
COMMENT '赎回开放类型'
  AFTER Buy_Open_Type;

ALTER TABLE `baton`.`product_info`
  ADD COLUMN `Buy_Open_Period` VARCHAR(50) NULL DEFAULT NULL
COMMENT '申购开放周期'
  AFTER Redeem_Open_Type;

ALTER TABLE product_info
  MODIFY COLUMN Open_Redeem_Period VARCHAR(50) COMMENT '赎回开放周期';

ALTER TABLE `baton`.`product_info`
  ADD COLUMN `Product_Type` VARCHAR(200) NULL DEFAULT NULL
COMMENT '产品类型'
  AFTER Buy_Open_Period;

ALTER TABLE `baton`.`product_info`
  ADD COLUMN `pre_payment_flag` VARCHAR(10) NULL DEFAULT NULL
COMMENT '是否提前还款'
  AFTER Product_Type;

ALTER TABLE `baton`.`product_info`
  ADD COLUMN `terminal_date` VARCHAR(20) NULL DEFAULT NULL
COMMENT '终止日期'
  AFTER pre_payment_flag;

ALTER TABLE `baton`.`product_pre_profit`
  ADD COLUMN `buy_type` VARCHAR(100) NULL DEFAULT NULL
COMMENT '认购者类型'
  AFTER Product_Name;


ALTER TABLE `baton`.`product_pre_profit`
  ADD COLUMN `divide_phase_flag` VARCHAR(10) NULL DEFAULT NULL
COMMENT '是否分阶段'
  AFTER Buy_Money_End;

ALTER TABLE `baton`.`product_pre_profit`
  ADD COLUMN `divide_begin_date` VARCHAR(20) NULL DEFAULT NULL
COMMENT '起始阶段1'
  AFTER divide_phase_flag;

ALTER TABLE `baton`.`product_pre_profit`
  ADD COLUMN `divide_end_date` VARCHAR(20) NULL DEFAULT NULL
COMMENT '起始截止1'
  AFTER divide_begin_date;

ALTER TABLE `baton`.`product_pre_profit`
  ADD COLUMN `product_description` VARCHAR(200) NULL DEFAULT NULL
COMMENT '产品期限相关描述'
  AFTER divide_end_date;

ALTER TABLE `baton`.`trade_detail_info`
  ADD COLUMN `Product_Type` VARCHAR(200) NULL DEFAULT NULL
COMMENT '产品类型'
  AFTER Product_Name;

####################2016-11-26###################################
ALTER TABLE `baton`.`product_info`
  ADD COLUMN `Qx_unit` VARCHAR(50) NULL DEFAULT NULL
COMMENT '期限单位天D月M年Y'
  AFTER Qx_Days;


DROP TABLE IF EXISTS `sys_code`;
CREATE TABLE `sys_code` (
  `Id`          INT(11) NOT NULL AUTO_INCREMENT,
  `Code`        VARCHAR(100)     DEFAULT NULL
  COMMENT 'code',
  `Value`       VARCHAR(500)     DEFAULT NULL
  COMMENT '码值',
  `Description` VARCHAR(500)     DEFAULT NULL
  COMMENT '相关说明',
  `Create_Time` VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `Creator`     VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time` VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`    VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`  VARCHAR(2)       DEFAULT NULL
  COMMENT '有效标注 1有效 0无效',
  `Remark`      VARCHAR(500)     DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `index_code` (`Code`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 15
  DEFAULT CHARSET = utf8
  COMMENT = '系统码表';

ALTER TABLE `baton`.`sys_code`
  ADD COLUMN `Type` VARCHAR(50) NULL DEFAULT NULL
COMMENT '字典类型'
  AFTER Value;


ALTER TABLE `baton`.`product_info`
  DROP COLUMN `divide_phase_flag`;
ALTER TABLE `baton`.`product_pre_profit`
  ADD COLUMN `divide_phase_flag` VARCHAR(50) NULL DEFAULT NULL
COMMENT '产品收益是否分阶段'
  AFTER buy_type;

ALTER TABLE `baton`.`product_pre_profit`
  DROP COLUMN `divide_begin_date`;
ALTER TABLE `baton`.`product_pre_profit`
  DROP COLUMN `divide_end_date`;
ALTER TABLE `baton`.`product_pre_profit`
  DROP COLUMN `Rate`;


DROP TABLE IF EXISTS `product_pre_profit_detail`;
CREATE TABLE `product_pre_profit_detail` (
  `Id`                INT(11) NOT NULL AUTO_INCREMENT,
  `Parent_Id`         INT(11)          DEFAULT NULL
  COMMENT '参照收益表的外键Id',
  `divide_begin_date` VARCHAR(20)      DEFAULT NULL
  COMMENT '分阶段起始时间',
  `divide_end_date`   VARCHAR(20)      DEFAULT NULL
  COMMENT '分阶段截止时间',
  `rate`              DOUBLE(20, 4)    DEFAULT NULL
  COMMENT '预期收益率不用加百分号2.8%则记为2.8',
  `description`       VARCHAR(200)     DEFAULT NULL
  COMMENT '产品期限相关描述',
  `Create_Time`       VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `Creator`           VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`       VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`          VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`        VARCHAR(2)       DEFAULT NULL
  COMMENT '有效标注1有效 0无效',
  `Remark`            VARCHAR(500)     DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `ProductId` (`Parent_Id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 9
  DEFAULT CHARSET = utf8
  COMMENT = '产品预期收益详情表';

####################2016-11-29###################################
ALTER TABLE trade_detail_info
  ADD COLUMN buy_Money DOUBLE COMMENT '申购金额'
  AFTER Credit_Money;

ALTER TABLE trade_detail_info
  ADD COLUMN redeem_Money DOUBLE COMMENT '赎回金额'
  AFTER buy_Money;

ALTER TABLE `baton`.`trade_detail_info`
  ADD COLUMN `cycle_Flag` VARCHAR(50) NULL DEFAULT NULL
COMMENT '是否循环'
  AFTER Channel;

ALTER TABLE `baton`.`trade_detail_info`
  ADD COLUMN `Qx_Days` DOUBLE COMMENT '期限天月年数'
  AFTER Channel;

ALTER TABLE `baton`.`trade_detail_info`
  ADD COLUMN `Qx_unit` VARCHAR(50) COMMENT '期限单位D天M月Y年'
  AFTER Qx_Days;

####################2016-11-30###################################
ALTER TABLE trade_detail_info
  ADD COLUMN rate DOUBLE COMMENT '认购收益率'
  AFTER Qx_unit;

####################2016-12-01###################################
ALTER TABLE `baton`.`product_info`
  ADD COLUMN `divide_phase_flag` VARCHAR(50) NULL DEFAULT NULL
COMMENT '产品收益是否分阶段'
  AFTER pre_payment_flag;

ALTER TABLE `baton`.`product_pre_profit`
  DROP COLUMN `divide_phase_flag`;
####################2016-12-02###################################
ALTER TABLE `baton`.`opt_log_info`
  CHANGE COLUMN `Opr_Sql` `Opr_Sql` VARCHAR(2000) COMMENT '操作执行sql';

####################2016-12-06###################################
ALTER TABLE trade_detail_info
  ADD INDEX excelIndex(`excel_Id`, `import_Date`);

ALTER TABLE `baton`.`staff_info`
  MODIFY COLUMN `Status` VARCHAR(2) NULL DEFAULT NULL
  COMMENT '在职状态0离职 1在职';

####################2016-12-28###################################
DROP TABLE IF EXISTS `product_fee_config_info`;
CREATE TABLE `product_fee_config_info` (
  `Id`                               INT(20)      NOT NULL           AUTO_INCREMENT
  COMMENT '主键id',
  `Product_Id`                       VARCHAR(50)  NOT NULL
  COMMENT '产品id',
  `Product_Name`                     VARCHAR(200) NOT NULL
  COMMENT '产品名称',
  `Management_Fee_Type`              VARCHAR(100) NOT NULL
  COMMENT '一次性 年化 总成本 无',
  `Management_Fee_Rate`              DOUBLE(20, 4)                   DEFAULT NULL
  COMMENT '管理费率',
  `Management_Fee_Other`             DOUBLE(20, 4)                   DEFAULT NULL
  COMMENT '管理费扣除他项 暂留接口字段，默认该字段为0，算出管理费减去此项值',
  `Management_Registration_Fee_Flag` VARCHAR(10)                     DEFAULT NULL
  COMMENT '是 否 默认为否,管理费不扣除备案费',
  `consignment_Fee_type`             VARCHAR(100)                    DEFAULT NULL
  COMMENT '承销费类型',
  `consignment_Fee_Rate`             DOUBLE(20, 4) UNSIGNED ZEROFILL DEFAULT NULL
  COMMENT '承销费率',
  `consignment_Fee_Other`            DOUBLE(20, 4)                   DEFAULT NULL
  COMMENT '管理费是否扣除备案费标志',
  `Registration_Fee_type`            VARCHAR(100)                    DEFAULT NULL
  COMMENT '备案费类型 一次性 年化 无',
  `Registration_Fee_Rate`            DOUBLE(20, 4)                   DEFAULT NULL
  COMMENT '备案费率',
  `Registration_Fee_Other`           DOUBLE(20, 4)                   DEFAULT NULL
  COMMENT '备案费扣除他项 暂留接口字段，默认该字段为0，算出备案费减去此项值',
  `Create_Time`                      VARCHAR(20)                     DEFAULT NULL
  COMMENT '创建时间',
  `Creator`                          VARCHAR(30)                     DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`                      VARCHAR(20)                     DEFAULT NULL
  COMMENT '备案费扣除他项',
  `Modifier`                         VARCHAR(30)                     DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`                       VARCHAR(2)                      DEFAULT NULL
  COMMENT '有效标注 1有效 0无效',
  `Remark`                           VARCHAR(500)                    DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `index_code` (`Product_Id`) USING BTREE
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 131426
  DEFAULT CHARSET = utf8
  COMMENT = '产品费率基础配置表';

####################2017-01-02统一修改用户名###################################
ALTER TABLE `baton`.`permit_user`
  CHANGE COLUMN `Login_Name` `login_name` VARCHAR(100) NOT NULL
COMMENT '用户Id',
  CHANGE COLUMN `User_Name` `user_name` VARCHAR(200) NOT NULL
COMMENT '登录用户名称';


ALTER TABLE `baton`.`staff_info`
  CHANGE COLUMN `Staff_Id` `Staff_Id` VARCHAR(100) NOT NULL
COMMENT '员工工号',
  CHANGE COLUMN `Staff_Name` `Staff_Name` VARCHAR(200) NOT NULL
COMMENT '员工姓名';


SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for product_user_privilege
-- ----------------------------
DROP TABLE IF EXISTS `product_user_privilege`;
CREATE TABLE `product_user_privilege` (
  `id`           INT(20)            NOT NULL AUTO_INCREMENT
  COMMENT '主键Id',
  `login_name`   VARCHAR(100)
                 CHARACTER SET utf8 NOT NULL
  COMMENT '登陆名',
  `user_name`    VARCHAR(200)
                 CHARACTER SET utf8 NOT NULL
  COMMENT '用户名',
  `product_id`   VARCHAR(100)
                 CHARACTER SET utf8 NOT NULL
  COMMENT '产品代码',
  `product_name` VARCHAR(200)
                 CHARACTER SET utf8 NOT NULL
  COMMENT '产品名称',
  `Create_Time`  VARCHAR(20)
                 CHARACTER SET utf8          DEFAULT NULL
  COMMENT '创建时间',
  `Creator`      VARCHAR(30)
                 CHARACTER SET utf8          DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`  VARCHAR(20)
                 CHARACTER SET utf8          DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`     VARCHAR(30)
                 CHARACTER SET utf8          DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`   VARCHAR(2)
                 CHARACTER SET utf8          DEFAULT NULL
  COMMENT '有效标注 1有效 0无效',
  `Remark`       VARCHAR(500)
                 CHARACTER SET utf8          DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '用户产品权限表';

####################2017-01-03管理费总成本###################################
ALTER TABLE `baton`.`product_fee_config_info`
  ADD COLUMN `Management_Fee_Total` DOUBLE(20, 4) NULL DEFAULT NULL
COMMENT '总成本'
  AFTER Management_Fee_Rate;

####################2017-01-08一次性增加循环标志###################################
ALTER TABLE `baton`.`product_fee_config_info`
  ADD COLUMN `Management_Cycle_Flag` VARCHAR(50) NULL DEFAULT NULL
COMMENT '管理费一次性是否循环是否'
  AFTER Management_Fee_Type;

ALTER TABLE `baton`.`product_fee_config_info`
  ADD COLUMN `Consignment_Cycle_Flag` VARCHAR(50) NULL DEFAULT NULL
COMMENT '承销费一次性是否循环是否'
  AFTER consignment_Fee_type;


ALTER TABLE `baton`.`product_fee_config_info`
  ADD COLUMN `Registration_Cycle_Flag` VARCHAR(50) NULL DEFAULT NULL
COMMENT '备案费一次性是否循环是否'
  AFTER Registration_Fee_type;


ALTER TABLE `baton`.`product_info`
  ADD COLUMN `T_Days` DOUBLE(20, 4) NULL DEFAULT NULL
COMMENT 'T日对应的天数'
  AFTER Open_Redeem_Period;

####################2017-01-13修改员工数据权限表###################################
ALTER TABLE `baton`.`comm_data_privilege`
  CHANGE COLUMN `Staff_Id` `Staff_Id` VARCHAR(100) NOT NULL
COMMENT '员工工号';

ALTER TABLE `baton`.`comm_data_privilege`
  ADD COLUMN `Staff_Name` VARCHAR(200) NULL DEFAULT NULL
COMMENT '员工姓名'
  AFTER Staff_Id;

####################2017-02-12新增费用明细表###################################
DROP TABLE IF EXISTS `commission_fee_info`;
CREATE TABLE `commission_fee_info` (
  `Id`               INT(20)      NOT NULL           AUTO_INCREMENT
  COMMENT '主键id',
  `Product_Id`       VARCHAR(50)  NOT NULL
  COMMENT '产品id',
  `Product_Name`     VARCHAR(200) NOT NULL
  COMMENT '产品名称',
  `Start_Date`       VARCHAR(20)  NOT NULL
  COMMENT '开始时间',
  `End_Date`         VARCHAR(20)                     DEFAULT NULL
  COMMENT '截止时间',
  `Product_Type`     VARCHAR(20)                     DEFAULT NULL
  COMMENT '认购类型',
  `Buy_Money`        DOUBLE(20, 4)                   DEFAULT NULL
  COMMENT '认购金额',
  `Trans_Id`         VARCHAR(50)                     DEFAULT NULL
  COMMENT '交易id',
  `Trade_Id`         INT(20)                         DEFAULT NULL
  COMMENT '台账id外键关联',
  `Consignment_Fee`  DOUBLE(20, 4)                   DEFAULT NULL
  COMMENT '承销费',
  `Management_Fee`   DOUBLE(20, 4)                   DEFAULT NULL
  COMMENT '管理费',
  `Registration_Fee` DOUBLE(20, 4) UNSIGNED ZEROFILL DEFAULT NULL
  COMMENT '备案费',
  `Create_Time`      VARCHAR(20)                     DEFAULT NULL
  COMMENT '创建时间',
  `Creator`          VARCHAR(30)                     DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`      VARCHAR(20)                     DEFAULT NULL
  COMMENT '备案费扣除他项',
  `Modifier`         VARCHAR(30)                     DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`       VARCHAR(2)                      DEFAULT NULL
  COMMENT '有效标注 1有效 0无效',
  `Remark`           VARCHAR(500)                    DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `index_code` (`Product_Id`, `Product_Type`) USING BTREE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '费用管理明细表';

####################2017-02-23新增T日信息表###################################
DROP TABLE IF EXISTS `trade_tdays_info`;
CREATE TABLE `trade_tdays_info` (
  `Id`           INT(20) NOT NULL AUTO_INCREMENT,
  `Product_Id`   VARCHAR(50)      DEFAULT NULL
  COMMENT '产品代码',
  `Product_Name` VARCHAR(200)     DEFAULT NULL
  COMMENT '产品名称',
  `T_No`         VARCHAR(20)      DEFAULT NULL
  COMMENT 'Tdays序号',
  `T_Begin_Date` VARCHAR(20)      DEFAULT NULL
  COMMENT 'TDay起始时间',
  `T_End_Date`   VARCHAR(20)      DEFAULT NULL
  COMMENT 'Tday截止时间',
  `Redeem_Flag`  VARCHAR(20)      DEFAULT NULL,
  `Create_Time`  VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `Creator`      VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`  VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`     VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`   VARCHAR(2)       DEFAULT NULL
  COMMENT '有效标注1有效 0无效',
  `Remark`       VARCHAR(500)     DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `OrgIdIndex` (`Product_Id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 51
  DEFAULT CHARSET = utf8
  COMMENT = '台账引入Tdays信息临时表';

####################2017-02-24新增T日信息表###################################
ALTER TABLE `baton`.`trade_tdays_info`
  ADD COLUMN `Redeem_Begin_Date` VARCHAR(20) NULL DEFAULT NULL
COMMENT '赎回开始时间'
  AFTER T_End_Date;

ALTER TABLE `baton`.`trade_tdays_info`
  ADD COLUMN `Redeem_End_Date` VARCHAR(20) NULL DEFAULT NULL
COMMENT '赎回截止时间'
  AFTER Redeem_Begin_Date;

####################2017-03-05更新角色表###################################
ALTER TABLE `baton`.`permit_role`
  ADD COLUMN `Role_Desc` VARCHAR(300) NULL DEFAULT NULL
COMMENT '角色描述'
  AFTER Role_Name;

####################2017-03-05更新角色表###################################
UPDATE product_fee_config_info
SET Management_Cycle_Flag = '否'
WHERE Management_Cycle_Flag IS NULL OR trim(Management_Cycle_Flag) = '';
UPDATE product_fee_config_info
SET Consignment_Cycle_Flag = '否'
WHERE Consignment_Cycle_Flag IS NULL OR trim(Consignment_Cycle_Flag) = '';
UPDATE product_fee_config_info
SET Registration_Cycle_Flag = '否'
WHERE Registration_Cycle_Flag IS NULL OR trim(Registration_Cycle_Flag) = '';

#####################2017-03-21##########################################
UPDATE product_info
SET Redeem_Begin = 20, Redeem_End = 15
WHERE Redeem_Open_Type = '不开放';

####################2017-05-14更新台账表###################################
ALTER TABLE `baton`.`trade_detail_info`
  ADD COLUMN `Opr_Terminate_Id` VARCHAR(50) NULL DEFAULT NULL
COMMENT '终止操作人Id'
  AFTER Opr_Exam_Date;

ALTER TABLE `baton`.`trade_detail_info`
  ADD COLUMN `Opr_Terminate_Date` VARCHAR(20) NULL DEFAULT NULL
COMMENT '终止操作时间'
  AFTER Opr_Terminate_Id;

ALTER TABLE `baton`.`trade_detail_info`
  ADD COLUMN `Opr_Terminate_Remark` VARCHAR(200) NULL DEFAULT NULL
COMMENT '终止操作备注'
  AFTER Opr_Redeem_Remark;

ALTER TABLE `baton`.`trade_detail_info`
  ADD COLUMN `Terminate_Flag` VARCHAR(10) NULL DEFAULT NULL
COMMENT '终止状态:已终止'
  AFTER Exam_Flag;

####################2017-05-20新增线上线下同步表###################################
CREATE TABLE `trade_online_offline` (
  `Id`             INT(20) NOT NULL AUTO_INCREMENT
  COMMENT '自增主键',
  `Account_Name`   VARCHAR(300)     DEFAULT NULL
  COMMENT '账户户名',
  `Telephone`      VARCHAR(20)      DEFAULT NULL
  COMMENT '手机号',
  `Certificate_No` VARCHAR(30)      DEFAULT NULL
  COMMENT '身份证号码',
  `Id_Card_No`     VARCHAR(30)      DEFAULT NULL
  COMMENT '其他证件号码',
  `Product_Id`     VARCHAR(50)      DEFAULT NULL
  COMMENT '产品id',
  `Product_Name`   VARCHAR(200)     DEFAULT NULL
  COMMENT '产品名称',
  `Rate`           DOUBLE(20, 4)    DEFAULT NULL
  COMMENT '年化收益率',
  `Qx_Date`        VARCHAR(20)      DEFAULT NULL
  COMMENT '产品起息日期',
  `Dq_Date`        VARCHAR(20)      DEFAULT NULL
  COMMENT '产品到期日期',
  `T_Begin_Date`   VARCHAR(20)      DEFAULT NULL
  COMMENT 'T阶段起始时间',
  `T_End_Date`     VARCHAR(20)      DEFAULT NULL
  COMMENT 'T阶段截止时间',
  `Buy_Money`      DOUBLE(20, 4)    DEFAULT NULL
  COMMENT '认购金额',
  `preProfit`      DOUBLE(20, 4)    DEFAULT NULL
  COMMENT '预期收益(元)',
  `Status`         VARCHAR(50)      DEFAULT NULL
  COMMENT '计息状态:已兑付_计息中',
  `creator`        VARCHAR(30)      DEFAULT NULL
  COMMENT '登录人Id',
  PRIMARY KEY (`Id`),
  KEY `index_creator` (`creator`) USING HASH,
  KEY `index_cpdm` (`Product_Id`) USING BTREE
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 0
  DEFAULT CHARSET = utf8
  COMMENT = '线上线下数据同步';

DROP TABLE IF EXISTS `temptable`;

####################2017-06-24归属人日均跑批表###################################
DROP TABLE IF EXISTS `ud_jrzc_allo`;
CREATE TABLE `ud_jrzc_allo` (
  `id`          INT(20) NOT NULL   AUTO_INCREMENT,
  `sjrq`        VARCHAR(20)
                CHARACTER SET utf8 DEFAULT NULL
  COMMENT '数据日期',
  `user_Id`     VARCHAR(20)
                CHARACTER SET utf8 DEFAULT NULL
  COMMENT '归属人工号',
  `user_Name`   VARCHAR(100)
                CHARACTER SET utf8 DEFAULT NULL
  COMMENT '归属人姓名',
  `org_no`      VARCHAR(50)
                CHARACTER SET utf8 DEFAULT NULL
  COMMENT '机构号',
  `org_name`    VARCHAR(200)
                CHARACTER SET utf8 DEFAULT ''
  COMMENT '机构名称',
  `jrzc_ye`     DOUBLE(20, 4)      DEFAULT '0.0000'
  COMMENT '金融资产余额',
  `jrzc_yrj`    DOUBLE(20, 4)      DEFAULT '0.0000'
  COMMENT '金融资产月日均',
  `jrzc_jrj`    DOUBLE(20, 4)      DEFAULT '0.0000'
  COMMENT '金融资产季日均',
  `jrzc_nrj`    DOUBLE(20, 4)      DEFAULT '0.0000'
  COMMENT '金融资产年日均',
  `flag`        VARCHAR(50)
                CHARACTER SET utf8 DEFAULT '线上'
  COMMENT '线上线下标志线下_线上',
  `Create_Time` VARCHAR(20)
                CHARACTER SET utf8 DEFAULT NULL
  COMMENT '创建时间',
  `Creator`     VARCHAR(30)
                CHARACTER SET utf8 DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time` VARCHAR(20)
                CHARACTER SET utf8 DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`    VARCHAR(30)
                CHARACTER SET utf8 DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`  VARCHAR(2)
                CHARACTER SET utf8 DEFAULT NULL
  COMMENT '有效标注1有效 0无效',
  `Remark`      VARCHAR(500)
                CHARACTER SET utf8 DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `index_sjrq` (`sjrq`) USING BTREE,
  KEY `index_sjrq_usrId` (`sjrq`, `user_Id`, `org_no`) USING BTREE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;


DROP TABLE IF EXISTS `cu_jrzc_allo`;
CREATE TABLE `cu_jrzc_allo` (
  `id`            INT(20) NOT NULL AUTO_INCREMENT,
  `sjrq`          VARCHAR(20)      DEFAULT NULL
  COMMENT '数据日期',
  `id_card_type`  VARCHAR(20)      DEFAULT NULL
  COMMENT '证件类型',
  `id_card_no`    VARCHAR(50)      DEFAULT NULL
  COMMENT '证件号码',
  `customer_name` VARCHAR(100)     DEFAULT ''
  COMMENT '客户名称',
  `org_no`        VARCHAR(50)      DEFAULT NULL
  COMMENT '机构号',
  `org_name`      VARCHAR(200)     DEFAULT ''
  COMMENT '机构名称',
  `jrzc_ye`       DOUBLE(20, 4)    DEFAULT '0.0000'
  COMMENT '金融资产余额',
  `jrzc_yrj`      DOUBLE(20, 4)    DEFAULT '0.0000'
  COMMENT '金融资产月日均',
  `jrzc_jrj`      DOUBLE(20, 4)    DEFAULT '0.0000'
  COMMENT '金融资产季日均',
  `jrzc_nrj`      DOUBLE(20, 4)    DEFAULT '0.0000'
  COMMENT '金融资产年日均',
  `flag`          VARCHAR(50)      DEFAULT '线上'
  COMMENT '线上线下标志线下_线上',
  `Create_Time`   VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `Creator`       VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`   VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`      VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`    VARCHAR(2)       DEFAULT NULL
  COMMENT '有效标注1有效 0无效',
  `Remark`        VARCHAR(500)     DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `index_sjrq` (`sjrq`) USING BTREE,
  KEY `index_sjrq_usrId` (`sjrq`, `id_card_type`, `id_card_no`, `org_no`) USING BTREE
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 0
  DEFAULT CHARSET = utf8
  COMMENT = '线上线下客户日均信息表';

####################2017-07-01归属人余额历史跑批表###################################
DROP TABLE IF EXISTS `ud_jrzc_yels`;
CREATE TABLE `ud_jrzc_yels` (
  `id`          INT(20) NOT NULL AUTO_INCREMENT,
  `sjrq`        VARCHAR(20)      DEFAULT NULL
  COMMENT '数据日期',
  `user_id`     VARCHAR(20)      DEFAULT NULL
  COMMENT '归属人工号',
  `user_name`   VARCHAR(100)     DEFAULT NULL
  COMMENT '归属人姓名',
  `org_no`      VARCHAR(50)      DEFAULT NULL
  COMMENT '机构号',
  `org_name`    VARCHAR(200)     DEFAULT ''
  COMMENT '机构名称',
  `jrzc_ye`     DOUBLE(20, 4)    DEFAULT '0.0000'
  COMMENT '金融资产余额',
  `jrzc_yrj`    DOUBLE(20, 4)    DEFAULT '0.0000'
  COMMENT '金融资产月日均',
  `jrzc_jrj`    DOUBLE(20, 4)    DEFAULT '0.0000'
  COMMENT '金融资产季日均',
  `jrzc_nrj`    DOUBLE(20, 4)    DEFAULT '0.0000'
  COMMENT '金融资产年日均',
  `flag`        VARCHAR(50)      DEFAULT '线上'
  COMMENT '线上线下标志线下_线上',
  `create_time` VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `creator`     VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `modify_time` VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `modifier`    VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  `valid_flag`  VARCHAR(2)       DEFAULT NULL
  COMMENT '有效标注1有效 0无效',
  `remark`      VARCHAR(500)     DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `index_sjrq` (`sjrq`) USING BTREE,
  KEY `index_sjrq_usrId` (`sjrq`, `user_Id`, `org_no`) USING BTREE
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 0
  DEFAULT CHARSET = utf8
  COMMENT = '线上线下到归属人余额历史表';
