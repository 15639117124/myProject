/*
Navicat MySQL Data Transfer

Source Server         : thh1
Source Server Version : 50624
Source Host           : 127.0.0.1:3306
Source Database       : thh_db

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-10-29 13:29:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comm_data_privilege
-- ----------------------------
DROP TABLE IF EXISTS `comm_data_privilege`;
CREATE TABLE `comm_data_privilege` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `User_Id` varchar(30) DEFAULT NULL COMMENT '用户Id',
  `Org_Id` varchar(30) DEFAULT NULL COMMENT '机构Id',
  `Atrribute_Id` varchar(30) DEFAULT NULL COMMENT '数据权限属性ID',
  `Atrribute_Remark` varchar(100) DEFAULT NULL COMMENT '属性备注',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` varchar(2) DEFAULT NULL COMMENT '有效标注 1有效 0无效',
  `Remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `idIndex` (`User_Id`,`Org_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='系统登录表';

-- ----------------------------
-- Records of comm_data_privilege
-- ----------------------------
INSERT INTO `comm_data_privilege` VALUES ('1', '1', 'bizige', '4QrcOUm6Wau+VuBX8g+IPg==', '1', '1', '1', '2016-10-11 20:27:01', '1', '1', '1');
INSERT INTO `comm_data_privilege` VALUES ('3', 'tengyue', 'tengyue5i5j', '4QrcOUm6Wau+VuBX8g+IPg==', null, '2016-10-06 15:21:35', 'tengyue', '2016-10-06 15:21:35', 'tengyue', '1', '123');
INSERT INTO `comm_data_privilege` VALUES ('4', null, 'biz2i11221', null, null, '2016-10-06 20:28:26', 'sys', '2016-10-06 20:28:26', 'sys', '1', null);
INSERT INTO `comm_data_privilege` VALUES ('5', '12', '122', '4QrcOUm6Wau+VuBX8g+IPg==', null, '2016-10-07 10:13:28', 'tengyue', '2016-10-07 10:13:28', 'tengyue', '1', '123');
INSERT INTO `comm_data_privilege` VALUES ('7', '1', '1222', '4QrcOUm6Wau+VuBX8g+IPg==', null, '2016-10-07 15:01:44', 'tengyue', '2016-10-07 15:01:44', 'tengyue', '1', '1');
INSERT INTO `comm_data_privilege` VALUES ('8', null, 'biz2i11221', null, null, '2016-10-11 16:24:05', 'sys', '2016-10-11 16:24:05', 'sys', '1', null);
INSERT INTO `comm_data_privilege` VALUES ('9', null, 'biz2i11221', null, null, '2016-10-11 16:34:12', 'sys', '2016-10-11 16:34:12', 'sys', '1', null);
INSERT INTO `comm_data_privilege` VALUES ('10', '11', 'tengyue', '4QrcOUm6Wau+VuBX8g+IPg==', '1', null, null, null, null, '1', null);
INSERT INTO `comm_data_privilege` VALUES ('11', null, 'test', null, null, '2016-10-11 17:01:37', 'sys', '2016-10-11 17:01:37', 'sys', '1', null);
INSERT INTO `comm_data_privilege` VALUES ('12', 'tengyue1', null, '4QrcOUm6Wau+VuBX8g+IPg==', null, null, null, null, null, null, null);
INSERT INTO `comm_data_privilege` VALUES ('13', null, 'test', null, null, '2016-10-11 20:27:01', 'sys', '2016-10-11 20:27:01', 'sys', '1', null);

-- ----------------------------
-- Table structure for opt_log_info
-- ----------------------------
DROP TABLE IF EXISTS `opt_log_info`;
CREATE TABLE `opt_log_info` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Log_Action_Name` varchar(50) DEFAULT NULL COMMENT '日志记录类',
  `Log_Time` varchar(20) DEFAULT NULL COMMENT '日志时间',
  `Log_Content` varchar(200) DEFAULT NULL COMMENT '日志内容',
  `Opr_Id` varchar(50) DEFAULT NULL COMMENT '操作人UserId',
  `Opr_Name` varchar(100) DEFAULT NULL COMMENT '操作人UserName',
  `Client_Ip` varchar(50) DEFAULT NULL COMMENT '操作机器Ip',
  `Opr_Sql` varchar(500) DEFAULT NULL COMMENT '操作执行sql',
  `Opr_Date` varchar(20) DEFAULT NULL COMMENT '操作日期',
  `Version` int(11) DEFAULT NULL COMMENT '版本号',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` varchar(2) DEFAULT NULL COMMENT '有效标注1有效 0无效',
  `Remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `oprid_index` (`Opr_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='操作日志表';

-- ----------------------------
-- Records of opt_log_info
-- ----------------------------
INSERT INTO `opt_log_info` VALUES ('1', '11', '22', '33', '44', '55', '66', '77', '88', '99', '00', '1', '23', '3', '4', '5');

-- ----------------------------
-- Table structure for org_info
-- ----------------------------
DROP TABLE IF EXISTS `org_info`;
CREATE TABLE `org_info` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Org_Id` varchar(50) DEFAULT NULL COMMENT '机构Id',
  `Org_Name` varchar(200) DEFAULT NULL COMMENT '机构名称',
  `Begin_Date` varchar(20) DEFAULT NULL COMMENT '开始时间',
  `End_Date` varchar(20) DEFAULT NULL COMMENT '截止时间',
  `parent_Id` varchar(50) DEFAULT NULL COMMENT '操作人Id',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` varchar(2) DEFAULT NULL COMMENT '有效标注1有效 0无效',
  `Remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `OrgIdIndex` (`Org_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='机构信息表';

-- ----------------------------
-- Records of org_info
-- ----------------------------
INSERT INTO `org_info` VALUES ('1', '02', '上海总部', '2016-10-11', '3000-12-31', '0', '9', '10', '11', '12', '13', '14');
INSERT INTO `org_info` VALUES ('2', '020101', '上海总部陆家嘴分部', '2016-11-11', '3000-12-31', '4', '9', '10', '11', '12', '13', '14');
INSERT INTO `org_info` VALUES ('3', '020102', '其他分支部', '2016-12-10', '3000-12-31', '4', '9', '10', '11', '12', '13', '14');
INSERT INTO `org_info` VALUES ('4', '0201', '华东区', '2016-11-11', '3000-12-31', '1', null, null, null, null, null, null);

-- ----------------------------
-- Table structure for page_elements
-- ----------------------------
DROP TABLE IF EXISTS `page_elements`;
CREATE TABLE `page_elements` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `Element_Id` varchar(50) DEFAULT NULL COMMENT '元素ID',
  `Page_Id` int(11) DEFAULT NULL COMMENT '所属页面ID',
  `Element_Desc` varchar(100) DEFAULT NULL COMMENT '资源描述',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` char(1) DEFAULT NULL COMMENT '有效标注 1有效 0无效',
  `Remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `ElementId` (`Element_Id`,`Page_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='页面元素表';

-- ----------------------------
-- Records of page_elements
-- ----------------------------

-- ----------------------------
-- Table structure for product_info
-- ----------------------------
DROP TABLE IF EXISTS `product_info`;
CREATE TABLE `product_info` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Product_Id` int(50) DEFAULT NULL COMMENT '产品Id',
  `Product_Name` varchar(200) DEFAULT NULL COMMENT '产品名称',
  `Qx_Date` varchar(20) DEFAULT NULL COMMENT '起息日期',
  `Dq_Date` varchar(20) DEFAULT NULL COMMENT '到期日期',
  `Periods` varchar(200) DEFAULT NULL COMMENT '期数',
  `Open_Type` varchar(10) DEFAULT NULL COMMENT '开放类型',
  `Redeem_Type` varchar(10) DEFAULT NULL COMMENT '赎回类型',
  `Open_Redeem_Period` varchar(10) DEFAULT NULL COMMENT '开放赎回周期',
  `Jx_Type` varchar(10) DEFAULT NULL COMMENT '结息类型',
  `Deposits_Flag` varchar(2) DEFAULT NULL COMMENT '是否计算活期利率',
  `Qx_Days` double DEFAULT NULL COMMENT '期限天数',
  `Redeem_Begin` int(11) DEFAULT NULL COMMENT '可赎回起始天',
  `Redeem_End` int(11) DEFAULT NULL COMMENT '可赎回截止天',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` varchar(2) DEFAULT NULL COMMENT '有效标注1有效 0无效',
  `Remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `ProductInfo` (`Product_Id`,`Product_Name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='产品信息表';

-- ----------------------------
-- Records of product_info
-- ----------------------------
INSERT INTO `product_info` VALUES ('1', '1', '华盈财富通', '2016-11-17', '2018-11-18', '5', '1', '1', '2', '1', null, '11', '12', '13', '2017-11-12', ' 小郭', '2016-11-12', '测试', '1', '测试');
INSERT INTO `product_info` VALUES ('2', '2', '嘉应1号财富', '2016-10-13', '2018-10-12', '3', '1', '2', '0', '2', null, '15', '14', '12', '2017-11-12', ' 小郭', '2016-11-12', '测试', '1', '测试');
INSERT INTO `product_info` VALUES ('3', '3', '珍藏1号', '2016-01-01', '2018-07-01', '1', '1', '1', '2', '1', null, '17', '11', '12', '2017-11-12', ' 小郭', '2016-11-12', '测试', '1', '测试');

-- ----------------------------
-- Table structure for product_pre_profit
-- ----------------------------
DROP TABLE IF EXISTS `product_pre_profit`;
CREATE TABLE `product_pre_profit` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Product_Id` varchar(50) DEFAULT NULL COMMENT '产品Id',
  `Product_Name` varchar(200) DEFAULT NULL COMMENT '产品名称',
  `Buy_Money_Begin` double DEFAULT NULL COMMENT '认购金额起始点',
  `Buy_Money_End` double DEFAULT NULL COMMENT '认购金额截止点',
  `Rate` double DEFAULT NULL COMMENT '预期收益率',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` varchar(2) DEFAULT NULL COMMENT '有效标注1有效 0无效',
  `Remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `ProductId` (`Product_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='产品预期收益表';

-- ----------------------------
-- Records of product_pre_profit
-- ----------------------------
INSERT INTO `product_pre_profit` VALUES ('1', '1', '华盈财富通', '10000', '50000', '6', '2016-11-12', '小郭', '2016-11-13', 'yteng', '1', '测试');
INSERT INTO `product_pre_profit` VALUES ('2', '1', '华盈财富通', '50000', '60000', '7', '2016-11-12', '小郭', '2016-11-13', 'yteng', '1', '测试');
INSERT INTO `product_pre_profit` VALUES ('3', '1', '华盈财富通', '60000', '70000', '7.1', '2016-11-12', '小郭', '2016-11-13', 'yteng', '1', '测试');
INSERT INTO `product_pre_profit` VALUES ('4', '2', '嘉应1号财富', '10000', '70000', '5', '2016-11-12', '小郭', '2016-11-13', 'yteng', '1', '测试');
INSERT INTO `product_pre_profit` VALUES ('5', '2', '嘉应1号财富', '70000', '80000', '5.2', '2016-11-12', '小郭', '2016-11-13', 'yteng', '1', '测试');
INSERT INTO `product_pre_profit` VALUES ('6', '2', '嘉应1号财富', '80000', '1000000', '7.9', '2016-11-12', '小郭', '2016-11-13', 'yteng', '1', '测试');

-- ----------------------------
-- Table structure for rate_info
-- ----------------------------
DROP TABLE IF EXISTS `rate_info`;
CREATE TABLE `rate_info` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Begin_Date` varchar(20) DEFAULT NULL COMMENT '开始日期',
  `End_Date` varchar(20) DEFAULT NULL COMMENT '截止日期',
  `Rate` double(30,0) DEFAULT NULL COMMENT '活期利息非百分号表示示例0.28%填入0.28',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` varchar(2) DEFAULT NULL COMMENT '有效标注 1有效 0无效',
  `Remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `idIndex` (`Begin_Date`,`End_Date`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='系统登录表';

-- ----------------------------
-- Records of rate_info
-- ----------------------------
INSERT INTO `rate_info` VALUES ('1', '1', 'bizige', '4', '1', '1', '2016-10-11 20:27:01', '1', '1', '1');
INSERT INTO `rate_info` VALUES ('3', 'tengyue', 'tengyue5i5j', '4', '2016-10-06 15:21:35', 'tengyue', '2016-10-06 15:21:35', 'tengyue', '1', '123');
INSERT INTO `rate_info` VALUES ('4', null, 'biz2i11221', null, '2016-10-06 20:28:26', 'sys', '2016-10-06 20:28:26', 'sys', '1', null);
INSERT INTO `rate_info` VALUES ('5', '12', '122', '4', '2016-10-07 10:13:28', 'tengyue', '2016-10-07 10:13:28', 'tengyue', '1', '123');
INSERT INTO `rate_info` VALUES ('7', '1', '1222', '4', '2016-10-07 15:01:44', 'tengyue', '2016-10-07 15:01:44', 'tengyue', '1', '1');
INSERT INTO `rate_info` VALUES ('8', null, 'biz2i11221', null, '2016-10-11 16:24:05', 'sys', '2016-10-11 16:24:05', 'sys', '1', null);
INSERT INTO `rate_info` VALUES ('9', null, 'biz2i11221', null, '2016-10-11 16:34:12', 'sys', '2016-10-11 16:34:12', 'sys', '1', null);
INSERT INTO `rate_info` VALUES ('10', '11', 'tengyue', '4', null, null, null, null, '1', null);
INSERT INTO `rate_info` VALUES ('11', null, 'test', null, '2016-10-11 17:01:37', 'sys', '2016-10-11 17:01:37', 'sys', '1', null);
INSERT INTO `rate_info` VALUES ('12', 'tengyue1', null, '4', null, null, null, null, null, null);
INSERT INTO `rate_info` VALUES ('13', null, 'test', null, '2016-10-11 20:27:01', 'sys', '2016-10-11 20:27:01', 'sys', '1', null);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `Id` int(20) NOT NULL,
  `parent_id` varchar(20) DEFAULT NULL,
  `Role_Name` varchar(50) DEFAULT NULL COMMENT '角色名称',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` char(1) DEFAULT NULL COMMENT '有效标注1有效 0无效',
  `remark` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `roleName` (`Role_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', null, ' 管理员', null, null, null, null, null, null);
INSERT INTO `role` VALUES ('2', null, '团队长', null, null, null, null, null, null);
INSERT INTO `role` VALUES ('3', null, '区域经理', null, null, null, null, null, null);
INSERT INTO `role` VALUES ('4', null, '电话营销人员', null, null, null, null, null, null);
INSERT INTO `role` VALUES ('5', null, '名单管理员', null, null, null, null, null, null);
INSERT INTO `role` VALUES ('1111', '0', '管理员', '2016-10-07 01:09:07', 'creator', '2016-10-07 01:09:07', 'modifier', '1', null);

-- ----------------------------
-- Table structure for role_element
-- ----------------------------
DROP TABLE IF EXISTS `role_element`;
CREATE TABLE `role_element` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `Element_Id` int(11) DEFAULT NULL COMMENT '元素ID',
  `Role_Id` int(11) DEFAULT NULL COMMENT '角色ID',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` char(1) DEFAULT NULL COMMENT '有效标注 1有效 0无效',
  `Remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `idIndex` (`Element_Id`,`Role_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色元素表';

-- ----------------------------
-- Records of role_element
-- ----------------------------

-- ----------------------------
-- Table structure for role_resource
-- ----------------------------
DROP TABLE IF EXISTS `role_resource`;
CREATE TABLE `role_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `Resource_Id` int(11) NOT NULL COMMENT '资源ID',
  `Role_Id` int(11) NOT NULL COMMENT '角色ID',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` char(1) DEFAULT NULL COMMENT '有效标注 1有效 0无效',
  `Remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `idIndex` (`Resource_Id`,`Role_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COMMENT='角色资源表';

-- ----------------------------
-- Records of role_resource
-- ----------------------------
INSERT INTO `role_resource` VALUES ('30', '1', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', null);
INSERT INTO `role_resource` VALUES ('31', '6', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', null);
INSERT INTO `role_resource` VALUES ('32', '10', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', null);
INSERT INTO `role_resource` VALUES ('33', '11', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', null);
INSERT INTO `role_resource` VALUES ('34', '12', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', null);
INSERT INTO `role_resource` VALUES ('35', '13', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', null);
INSERT INTO `role_resource` VALUES ('36', '14', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', null);
INSERT INTO `role_resource` VALUES ('37', '15', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', null);
INSERT INTO `role_resource` VALUES ('38', '16', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', null);
INSERT INTO `role_resource` VALUES ('39', '17', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', null);
INSERT INTO `role_resource` VALUES ('40', '18', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', null);
INSERT INTO `role_resource` VALUES ('41', '19', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', null);
INSERT INTO `role_resource` VALUES ('42', '20', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', null);

-- ----------------------------
-- Table structure for staff_info
-- ----------------------------
DROP TABLE IF EXISTS `staff_info`;
CREATE TABLE `staff_info` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Staff_Id` varchar(30) DEFAULT NULL COMMENT '员工工号',
  `Staff_Name` varchar(50) DEFAULT NULL COMMENT '员工姓名',
  `Age` int(11) DEFAULT NULL COMMENT '年龄',
  `Email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `Mobile` varchar(50) DEFAULT NULL COMMENT '手机号码',
  `Id_Card_Type` varchar(2) DEFAULT NULL COMMENT '证件类型0身份证1护照2其他',
  `Id_Card_No` varchar(100) DEFAULT NULL COMMENT '证件号码',
  `Address` varchar(150) DEFAULT NULL COMMENT '地址',
  `Org_Id` varchar(10) DEFAULT NULL COMMENT '机构代码',
  `Org_Name` varchar(150) DEFAULT NULL COMMENT '机构名称',
  `Begin_Date` varchar(20) DEFAULT NULL COMMENT '开始时间',
  `End_Date` varchar(20) DEFAULT NULL COMMENT '截至时间',
  `Status` varchar(2) DEFAULT NULL COMMENT '在职状态0离职 1在职',
  `Post_Name` varchar(100) DEFAULT NULL COMMENT '岗位名称',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` varchar(2) DEFAULT NULL COMMENT '有效标注1有效 0无效',
  `Remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `idIndex` (`Staff_Id`,`Org_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='员工信息表';

-- ----------------------------
-- Records of staff_info
-- ----------------------------
INSERT INTO `staff_info` VALUES ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '3000-12-31', '14', '15', '16', '17', '18', '19', '20', '21');
INSERT INTO `staff_info` VALUES ('2', '0000083155', '张三', '11', '1@163.com', '18918787655', '1', '310921198211138921', '浦东新区浦东南路', '0201', '上海总部', '2016-10-12', '3000-12-31', '1', 'hello', '2016-11-12', '小郭', '2016-11-10', 'yteng', '1', '测试');
INSERT INTO `staff_info` VALUES ('3', '0000083177', '李四', '22', 'lisi@126.com', '13918787655', '1', '310921198211138921', '静安区南京西路100号', '020101', '上海总部陆家嘴支部', '2016-10-12', '3000-12-31', '1', 'hello', '2016-11-12', '小郭2', '2016-11-10', 'yteng', '1', '测试1');
INSERT INTO `staff_info` VALUES ('4', '0000083177', '张武', '25', 'zhangwu@sina.com。cn', '15913437655', '2', 'HT898213', '松江区泗泾镇', '0201', '上海总部', '2016-10-12', '3000-12-31', '1', 'hello', '2016-11-12', '小郭2', '2016-11-10', 'yteng', '1', '测试1');
INSERT INTO `staff_info` VALUES ('5', '0000083121', '荀子', '27', 'xunzi@sina.com。cn', '17913437655', '2', 'HT898213', '松江区', '0201', '上海总部', '2016-10-12', '3000-12-31', '1', 'hello', '2016-11-12', '小郭2', '2016-11-10', 'yteng', '1', '测试1');

-- ----------------------------
-- Table structure for sys_resource
-- ----------------------------
DROP TABLE IF EXISTS `sys_resource`;
CREATE TABLE `sys_resource` (
  `Id` int(20) NOT NULL AUTO_INCREMENT,
  `Resource_Name` varchar(50) DEFAULT NULL COMMENT '资源名称',
  `Resource_Type` char(1) DEFAULT NULL COMMENT '1.菜单，2.子页面，3.Action',
  `Parent_Id` int(20) DEFAULT NULL COMMENT '父ID',
  `Priority` int(11) DEFAULT NULL COMMENT '优先级',
  `Resource_parent_id` int(11) DEFAULT NULL,
  `resource_value` varchar(200) DEFAULT NULL,
  `Is_Leaf` char(1) DEFAULT NULL COMMENT '是否叶子节点',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` char(1) DEFAULT NULL COMMENT '有效标注 1有效 0无效',
  `Remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `Id` (`Id`,`Parent_Id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='资源表';

-- ----------------------------
-- Records of sys_resource
-- ----------------------------
INSERT INTO `sys_resource` VALUES ('1', '台账数据处理', '1', '0', '1', null, 'trade/tradeImport.html', 'Y', '2016-10-06 11:33:30', 'bizi', '2016-10-24 21:59:21', 'modify', '1', '台账数据处理');
INSERT INTO `sys_resource` VALUES ('6', '产品信息维护', '1', '0', '1', null, '', 'N', '2016-10-17 22:39:40', 'guofangbi', '2016-10-24 21:48:59', 'guofangbi', '1', '产品信息维护');
INSERT INTO `sys_resource` VALUES ('10', '产品基础信息配置', '1', '6', '1', null, 'product/udJrzcAllo.html', 'Y', '2016-10-24 21:49:47', 'guofangbi', '2016-10-24 21:49:47', 'guofangbi', '1', '产品基础信息配置');
INSERT INTO `sys_resource` VALUES ('11', '产品预期收益率配置', '1', '6', '1', null, 'product/productPreProfit.html', 'Y', '2016-10-24 21:50:23', 'guofangbi', '2016-10-24 21:50:23', 'guofangbi', '1', '产品预期收益率配置');
INSERT INTO `sys_resource` VALUES ('12', '组织架构维护', '1', '0', '1', null, '', 'N', '2016-10-24 21:50:59', 'guofangbi', '2016-10-24 21:50:59', 'guofangbi', '1', '组织架构维护');
INSERT INTO `sys_resource` VALUES ('13', '基础人员信息维护', '1', '12', '1', null, 'org/staffInfo.html', 'Y', '2016-10-24 21:51:35', 'guofangbi', '2016-10-24 21:59:54', 'guofangbi', '1', '基础人员信息维护');
INSERT INTO `sys_resource` VALUES ('14', '基础机构信息维护', '1', '12', '1', null, 'org/organization.html', 'Y', '2016-10-24 21:52:17', 'guofangbi', '2016-10-24 21:52:17', 'guofangbi', '1', '基础机构信息维护');
INSERT INTO `sys_resource` VALUES ('15', '权限管理维护', '1', '0', '1', null, '', 'N', '2016-10-24 21:52:58', 'guofangbi', '2016-10-24 21:52:58', 'guofangbi', '1', '权限管理维护');
INSERT INTO `sys_resource` VALUES ('16', '用户角色管理', '1', '15', '1', null, 'permit/userRole.html', 'Y', '2016-10-24 21:54:00', 'guofangbi', '2016-10-24 21:54:00', 'guofangbi', '1', '用户角色管理');
INSERT INTO `sys_resource` VALUES ('17', '角色菜单管理', '1', '15', '1', null, 'permit/roleResource.html', 'Y', '2016-10-24 21:54:55', 'guofangbi', '2016-10-24 21:58:52', 'guofangbi', '1', '角色菜单管理');
INSERT INTO `sys_resource` VALUES ('18', '菜单管理', '1', '15', '1', null, 'permit/resource.html', 'Y', '2016-10-24 21:55:54', 'guofangbi', '2016-10-24 21:58:30', 'guofangbi', '1', '菜单管理');
INSERT INTO `sys_resource` VALUES ('19', '角色管理', '1', '15', '1', null, 'permit/role.html', 'Y', '2016-10-24 21:56:44', 'guofangbi', '2016-10-24 21:58:22', 'guofangbi', '1', '角色管理');
INSERT INTO `sys_resource` VALUES ('20', '用户管理', '1', '15', '1', null, 'permit/sysUser.html', 'Y', '2016-10-24 21:58:15', 'guofangbi', '2016-10-24 21:58:15', 'guofangbi', '1', '用户管理');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Login_Name` varchar(30) DEFAULT NULL COMMENT '用户Id',
  `User_Name` varchar(100) DEFAULT NULL COMMENT '登录用户名称',
  `Password` varchar(30) DEFAULT NULL COMMENT '登录密码',
  `Last_Login_Time` varchar(20) DEFAULT NULL COMMENT '上次登录时间',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` varchar(2) DEFAULT NULL COMMENT '有效标注 1有效 0无效',
  `Remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `idIndex` (`Login_Name`,`User_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='系统登录表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', '1', 'bizige', '4QrcOUm6Wau+VuBX8g+IPg==', '1', '1', '1', '2016-10-11 20:27:01', '1', '1', '1');
INSERT INTO `sys_user` VALUES ('3', 'tengyue', 'tengyue5i5j', '4QrcOUm6Wau+VuBX8g+IPg==', null, '2016-10-06 15:21:35', 'tengyue', '2016-10-06 15:21:35', 'tengyue', '1', '123');
INSERT INTO `sys_user` VALUES ('4', null, 'biz2i11221', null, null, '2016-10-06 20:28:26', 'sys', '2016-10-06 20:28:26', 'sys', '1', null);
INSERT INTO `sys_user` VALUES ('5', '12', '122', '4QrcOUm6Wau+VuBX8g+IPg==', null, '2016-10-07 10:13:28', 'tengyue', '2016-10-07 10:13:28', 'tengyue', '1', '123');
INSERT INTO `sys_user` VALUES ('8', null, 'biz2i11221', null, null, '2016-10-11 16:24:05', 'sys', '2016-10-11 16:24:05', 'sys', '1', null);
INSERT INTO `sys_user` VALUES ('9', null, 'biz2i11221', null, null, '2016-10-11 16:34:12', 'sys', '2016-10-11 16:34:12', 'sys', '1', null);
INSERT INTO `sys_user` VALUES ('10', '11', 'tengyue', '4QrcOUm6Wau+VuBX8g+IPg==', '1', null, null, null, null, '1', null);
INSERT INTO `sys_user` VALUES ('11', null, 'test', null, null, '2016-10-11 17:01:37', 'sys', '2016-10-11 17:01:37', 'sys', '1', null);
INSERT INTO `sys_user` VALUES ('12', 'tengyue1', null, '4QrcOUm6Wau+VuBX8g+IPg==', null, null, null, null, null, null, null);
INSERT INTO `sys_user` VALUES ('13', null, 'test', null, null, '2016-10-11 20:27:01', 'sys', '2016-10-11 20:27:01', 'sys', '1', null);

-- ----------------------------
-- Table structure for trade_detail_info
-- ----------------------------
DROP TABLE IF EXISTS `trade_detail_info`;
CREATE TABLE `trade_detail_info` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Product_Id` varchar(50) DEFAULT NULL COMMENT '产品Id',
  `Trans_Date` varchar(20) DEFAULT NULL COMMENT '交易日期',
  `Trans_Id` varchar(50) DEFAULT NULL COMMENT '交易流水号',
  `Debit_Money` double DEFAULT NULL COMMENT '借方发生额',
  `Credit_Money` double DEFAULT NULL COMMENT '贷方发生额',
  `Account_Money` double DEFAULT NULL COMMENT '账户余额',
  `Serial_Id` varchar(50) DEFAULT NULL COMMENT '凭证Id',
  `Summary` varchar(200) DEFAULT NULL COMMENT '摘要',
  `Card_No` varchar(50) DEFAULT NULL COMMENT '卡号(对方账号)',
  `Account_Name` varchar(200) DEFAULT NULL COMMENT '对方账号名称',
  `Bank_Name` varchar(200) DEFAULT NULL COMMENT '对方开户行',
  `Trans_Time` varchar(20) DEFAULT NULL COMMENT '对方开户行号',
  `Bank_No` varchar(50) DEFAULT NULL COMMENT '交易时间',
  `Contract_Id` varchar(100) DEFAULT NULL COMMENT '合同编号',
  `Id_Card_Type` varchar(10) DEFAULT NULL COMMENT '证件类型0身份证1护照2其他',
  `Id_Card_No` varchar(50) DEFAULT NULL COMMENT '证件号码',
  `Telephone` varchar(50) DEFAULT NULL COMMENT '客户联系方式',
  `Org_Id` varchar(20) DEFAULT NULL COMMENT '销售机构代码',
  `Org_Name` varchar(200) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '销售机构名称',
  `User_Id` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '归属人工号',
  `User_Name` varchar(100) DEFAULT NULL COMMENT '归属人名称',
  `Risk_Grade` varchar(50) DEFAULT NULL COMMENT '风险等级',
  `Risk_Time` varchar(20) DEFAULT NULL COMMENT '风险等级评估时间',
  `Channel` varchar(200) DEFAULT NULL COMMENT '归属渠道',
  `Redeem_Flag` varchar(10) DEFAULT NULL COMMENT '赎回标志0未赎回1已赎回初始状态为0',
  `Exam_Flag` varchar(10) DEFAULT NULL COMMENT '复核标志0待修改1待审核2审核拒绝3审核通过初始状态为0',
  `Opr_Redeem_Id` varchar(50) DEFAULT NULL COMMENT '赎回操作人Id',
  `Opr_Redeem_Date` varchar(20) DEFAULT NULL COMMENT '赎回操作时间',
  `Opr_Exam_Id` varchar(50) DEFAULT NULL COMMENT '审核操作人Id',
  `Opr_Exam_Date` varchar(20) DEFAULT NULL COMMENT '审核操作时间',
  `Opr_Exam_Remark` varchar(200) DEFAULT NULL COMMENT '审核备注',
  `Opr_Redeem_Remark` varchar(200) DEFAULT NULL COMMENT '赎回经办修改备注',
  `import_Date` varchar(20) DEFAULT NULL COMMENT '导入人导入excel数据日期',
  `import_Id` varchar(30) DEFAULT NULL COMMENT '批量文件导入人id区分单条手工录入无该信息',
  `image_Id` varchar(50) DEFAULT NULL COMMENT '客户信息镜像文件',
  `excel_Id` varchar(50) DEFAULT NULL COMMENT 'excel文件批次',
  `Version` int(11) DEFAULT NULL COMMENT '版本号',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` varchar(2) DEFAULT NULL COMMENT '有效标注1有效 0无效',
  `Remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `IdIndex` (`Product_Id`,`Trans_Date`,`Org_Id`,`User_Id`),
  KEY `NoIndex` (`Id_Card_Type`,`Contract_Id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2014 DEFAULT CHARSET=utf8 COMMENT='客户购买产品交易信息台账表';

-- ----------------------------
-- Records of trade_detail_info
-- ----------------------------
INSERT INTO `trade_detail_info` VALUES ('1', '1', '2016-06-11', 'T001T0701201603110007434409511172', '11', '12', '13', '1', '海航海运专项私募债', '4682030210556***', '宗浩1*', '招商银行股份有限公司上海分行', '11233', '4682030210556***', '0122341', '1', '310913198112132819', '13214321123', '0201', '上海总部', '0000083155', '张三', '1', '2016-11-12', '网上银行', '0', '1', '0000083122', '2016-11-13', '0000073123', '2016-12-11', '测试', '测试', '2016-10-10', 'tengyue1', null, '1', null, '2016-10-06 20:47:51', 'sys', '2016-10-06 20:47:51', 'sys12', '1', null);
INSERT INTO `trade_detail_info` VALUES ('2', '2', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-10', 'tengyue1', null, '1', null, '2016-10-07 13:02:48', 'sys', '2016-10-07 13:02:48', 'sys12', '1', null);
INSERT INTO `trade_detail_info` VALUES ('3', '3', '2016-03-11', 'T0701201603110007434409544390772', '0', '350000', '47970001', '', '?????????', '4682030210556***', '??*', '??????????????', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-10', 'tengyue1', null, '1', null, '2016-10-07 14:24:57', null, '2016-10-07 14:24:57', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('4', '4', '2016-04-11', 'T0701201603110007434409511172', '10', '450000', '22270001', '', '??????11???', '46820302105eee56***', '??*', '?????????2222', '222237', '46820302222*', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue1', null, '1111', null, '2016-10-07 14:24:57', null, '2016-10-07 14:24:57', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('5', '5', '2016-03-11', 'T0701201603110007434409544390772', '0', '350000', '47970001', '', '海航海运专项私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-12', 'tengyue1', null, '2', null, '2016-10-07 14:26:59', null, '2016-10-07 14:26:59', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('6', '6', '2016-04-11', 'T0701201603110007434409511172', '10', '450000', '22270001', '', '海航海运专项11私募债', '46820302105eee56***', '宗浩*', '招商银行股份有限公2222', '222237', '46820302222*', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-12', 'tengyue2', null, '2', null, '2016-10-07 14:26:59', null, '2016-10-07 14:26:59', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('7', '7', '2016-03-11', 'T0701201603110007434409544390772', '0', '350000', '47970001', '', '海航海运专项私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-12', 'tengyue2', null, '2', null, '2016-10-07 14:29:34', null, '2016-10-07 14:29:34', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('8', '8', '2016-04-11', 'T0701201603110007434409511172', '10', '450000', '22270001', '', '海航海运专项11私募债', '46820302105eee56***', '宗浩*', '招商银行股份有限公2222', '222237', '46820302222*', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-12', 'tengyue2', null, '2', null, '2016-10-07 14:29:34', null, '2016-10-07 14:29:34', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('9', '9', '2016-03-11', 'T0701201603110007434409544390772', '0', '350000', '47970001', '', '海航海运专项私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-12', 'tengyue2', null, '2', null, '2016-10-07 14:30:58', null, '2016-10-07 14:30:58', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('10', '10', '2016-04-11', 'T0701201603110007434409511172', '10', '450000', '22270001', '', '海航海运专项11私募债', '46820302105eee56***', '宗浩*', '招商银行股份有限公2222', '222237', '46820302222*', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-12', 'tengyue2', null, '2', null, '2016-10-07 14:30:58', null, '2016-10-07 14:30:58', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('11', '11', '2016-03-11', 'T0701201603110007434409544390772', '0', '350000', '47970001', '', '海航海运专项私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-13', 'tengyue3', null, '3', null, '2016-10-07 14:32:05', null, '2016-10-07 14:32:05', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('12', '12', '2016-04-11', 'T0701201603110007434409511172', '10', '450000', '22270001', '', '海航海运专项11私募债', '46820302105eee56***', '宗浩*', '招商银行股份有限公2222', '222237', '46820302222*', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue4', null, '4', null, '2016-10-07 14:32:05', null, '2016-10-07 14:32:05', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('13', null, '2016-03-11', 'T0701201603110007434409544390772', '0', '350000', '47970001', '', '海航海运专项私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1', null, '2016-10-08 20:38:58', null, '2016-10-08 20:38:58', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('14', null, '2016-06-11', 'T0701201603110007434409544390772', '0', '350000', '47970001', '', '海航海运专项私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1', null, '2016-10-08 20:57:20', null, '2016-10-08 20:57:20', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('15', null, '2016-06-12', 'T0701201603110007434409544390773', '0', '350000', '47970001', '', '海航海运专项3私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1', null, '2016-10-08 20:57:20', null, '2016-10-08 20:57:20', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('16', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1111', null, '2016-10-11 16:24:06', 'sys111', '2016-10-11 16:24:06', 'sys12', '1', null);
INSERT INTO `trade_detail_info` VALUES ('17', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1111', null, '2016-10-11 16:34:13', 'sys111', '2016-10-11 16:34:13', 'sys12', '1', null);
INSERT INTO `trade_detail_info` VALUES ('18', null, '2016-06-11', 'T0701201603110007434409544390772', '0', '350000', '47970001', '', '海航海运专项私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-12', 'tengyue', null, '1', null, '2016-10-11 20:17:00', null, '2016-10-11 20:17:00', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('19', null, '2016-06-12', 'T0701201603110007434409544390773', '0', '350000', '47970001', '', '海航海运专项3私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-13', 'tengyue', null, '1', null, '2016-10-11 20:17:00', null, '2016-10-11 20:17:00', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('20', null, '2016-06-11', 'T0701201603110007434409544390772', '0', '350000', '47970001', '', '海航海运专项私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1111', null, '2016-10-11 20:21:47', null, '2016-10-11 20:21:47', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('21', null, '2016-06-12', 'T0701201603110007434409544390773', '0', '350000', '47970001', '', '海航海运专项3私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1111', null, '2016-10-11 20:21:47', null, '2016-10-11 20:21:47', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('22', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1111', null, '2016-10-11 20:27:02', 'sys111', '2016-10-11 20:27:02', 'sys12', '1', null);
INSERT INTO `trade_detail_info` VALUES ('23', null, '2016-06-11', 'T0701201603110007434409544390772', '0', '350000', '47970001', '', '海航海运专项私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1111', null, '2016-10-11 20:35:43', null, '2016-10-11 20:35:43', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('24', null, '2016-06-12', 'T0701201603110007434409544390773', '0', '350000', '47970001', '', '海航海运专项3私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1111', null, '2016-10-11 20:35:43', null, '2016-10-11 20:35:43', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('25', null, '2016-06-11', 'T0701201603110007434409544390772', '0', '350000', '47970001', '', '海航海运专项私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1111', null, '2016-10-13 22:01:15', null, '2016-10-13 22:01:15', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('26', null, '2016-06-12', 'T0701201603110007434409544390773', '0', '350000', '47970001', '', '海航海运专项3私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1111', null, '2016-10-13 22:01:15', null, '2016-10-13 22:01:15', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('27', null, '2016-03-11', 'T0701201603110007434409544390772', '0', '350000', '47970001', '', '海航海运专项私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1111', null, '2016-10-14 20:28:54', null, '2016-10-14 20:28:54', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('28', null, '2016-06-11', 'T0701201603110007434409544390772', '0', '350000', '47970001', '', '海航海运专项私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1111', null, '2016-10-14 22:20:02', null, '2016-10-14 22:20:02', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('29', null, '2016-06-12', 'T0701201603110007434409544390773', '0', '350000', '47970001', '', '海航海运专项3私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1111', null, '2016-10-14 22:20:02', null, '2016-10-14 22:20:02', null, '1', null);
INSERT INTO `trade_detail_info` VALUES ('201', '1', '2016-06-11', 'T001T07012016038884409511172', '181', '127', '138', '1', '海航海运专项私募债123', '45643222', '宗浩1*', '招商银行股份有限公司上海分行', '11233', '468203333', '0122341', '1', '310913434512132819', '13614321123', '020122', '上海总部陆家嘴支部', '0000083156', '李四', '1', '2016-11-14', '手机银行', '1', '1', '0000083155', '2016-11-14', '0000073125', '2016-11-14', '测试2', '测试2', '2016-10-11', 'tengyue', null, '1111', null, '2016-10-06 20:47:51', 'sys', '2016-10-06 20:47:51', 'sys12', '1', null);
INSERT INTO `trade_detail_info` VALUES ('203', '1', '2016-06-11', 'T001T33331172', '1281', '1227', '1328', '1', '海云财富11', '45643222', '先成1', '中信银行股份有限公司上海分行', '11233', '468203333', '0122341', '1', '310913434512132819', '13614321123', '020122', '上海总部陆家嘴支部', '0000083156', '李四', '1', '2016-11-14', '手机银行', '1', '1', '0000083155', '2016-11-14', '0000073125', '2016-11-14', '测试2', '测试2', '2016-10-11', 'tengyue', null, '1111', null, '2016-10-06 20:47:51', 'sys', '2016-10-06 20:47:51', 'sys12', '1', null);
INSERT INTO `trade_detail_info` VALUES ('2012', '1', '2016-06-11', 'T001T33331172', '1281', '1227', '1328', '1', '海云财富', '45643222', '先成', '中信银行股份有限公司上海分行', '11233', '468203333', '0122341', '1', '310913434512132819', '13614321123', '020122', '上海总部陆家嘴支部', '0000083156', '李四', '1', '2016-11-14', '手机银行', '1', '1', '0000083155', '2016-11-14', '0000073125', '2016-11-14', '测试2', '测试2', '2016-10-11', 'tengyue', null, '1111', null, '2016-10-06 20:47:51', 'sys', '2016-10-06 20:47:51', 'sys12', '1', null);
INSERT INTO `trade_detail_info` VALUES ('2013', null, '2016-03-11', 'T0701201603110007434409544390772', '0', '350000', '47970001', '', '海航海运专项私募债', '4682030210556***', '宗浩*', '招商银行股份有限公司上海分行', '103537', '4682030210556***', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2016-10-11', 'tengyue', null, '1111', null, '2016-10-16 21:47:02', null, '2016-10-16 21:47:02', null, '1', null);

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Role_Id` int(11) DEFAULT NULL COMMENT '角色Id',
  `User_Id` int(11) DEFAULT NULL COMMENT '用户Id',
  `Create_Time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `Creator` varchar(30) DEFAULT NULL COMMENT '创建人',
  `Modify_Time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `Modifier` varchar(30) DEFAULT NULL COMMENT '修改人',
  `Valid_Flag` varchar(2) DEFAULT NULL COMMENT '有效标注1有效 0无效',
  `Remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `IdIndex` (`Role_Id`,`User_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='用户角色表';

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('2', '1', '1', '2016-10-07 12:41:46', null, '2016-10-07 12:41:46', null, '1', null);
INSERT INTO `user_role` VALUES ('3', '2', '3', '2016-10-11 16:24:07', null, '2016-10-11 16:24:07', null, '1', null);
INSERT INTO `user_role` VALUES ('4', '1', '4', '2016-10-11 16:24:07', null, '2016-10-11 16:24:07', null, '1', null);
INSERT INTO `user_role` VALUES ('5', '2', '5', '2016-10-11 16:34:13', null, '2016-10-11 16:34:13', null, '1', null);
INSERT INTO `user_role` VALUES ('6', '1', '6', '2016-10-11 16:34:13', null, '2016-10-11 16:34:13', null, '1', null);
INSERT INTO `user_role` VALUES ('7', '2', '7', '2016-10-11 20:27:02', null, '2016-10-11 20:27:02', null, '1', null);
INSERT INTO `user_role` VALUES ('8', '1', '8', '2016-10-11 20:27:02', null, '2016-10-11 20:27:02', null, '1', null);
INSERT INTO `user_role` VALUES ('10', '4', '1', '2016-10-23 19:41:19', 'tengyue', '2016-10-23 19:41:19', 'tengyue', '1', null);
INSERT INTO `user_role` VALUES ('11', '1', '1', '2016-10-23 19:41:30', 'tengyue', '2016-10-23 19:41:30', 'tengyue', '1', null);
INSERT INTO `user_role` VALUES ('12', '2', '1', '2016-10-23 19:41:30', 'tengyue', '2016-10-23 19:41:30', 'tengyue', '1', null);
INSERT INTO `user_role` VALUES ('13', '3', '1', '2016-10-23 19:41:30', 'tengyue', '2016-10-23 19:41:30', 'tengyue', '1', null);
INSERT INTO `user_role` VALUES ('14', '5', '1', '2016-10-23 19:41:30', 'tengyue', '2016-10-23 19:41:30', 'tengyue', '1', null);
INSERT INTO `user_role` VALUES ('15', '3', '3', '2016-10-25 21:24:31', 'tengyue', '2016-10-25 21:24:31', 'tengyue', '1', null);
INSERT INTO `user_role` VALUES ('16', '1', '10', '2016-10-25 21:24:55', 'tengyue', '2016-10-25 21:24:55', 'tengyue', '1', null);
INSERT INTO `user_role` VALUES ('17', '2', '10', '2016-10-25 21:24:55', 'tengyue', '2016-10-25 21:24:55', 'tengyue', '1', null);