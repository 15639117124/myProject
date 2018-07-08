SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comm_data_privilege
-- ----------------------------
DROP TABLE IF EXISTS `comm_data_privilege`;
CREATE TABLE `comm_data_privilege` (
  `Id`               INT(20) NOT NULL AUTO_INCREMENT,
  `Staff_Id`         VARCHAR(30)      DEFAULT NULL
  COMMENT '用户Id',
  `Org_No`           VARCHAR(50)      DEFAULT NULL
  COMMENT '机构Id',
  `Org_Name`         VARCHAR(200)     DEFAULT NULL
  COMMENT '机构名称',
  `Attribute_Id`     VARCHAR(30)      DEFAULT NULL
  COMMENT '数据权限属性ID',
  `Attribute_Remark` VARCHAR(100)     DEFAULT NULL
  COMMENT '属性备注',
  `Create_Time`      VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `Creator`          VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`      VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`         VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`       VARCHAR(2)       DEFAULT NULL
  COMMENT '有效标注 1有效 0无效',
  `Remark`           VARCHAR(500)     DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `idIndex` (`Staff_Id`, `Org_No`, `Attribute_Id`) USING BTREE
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '系统登录表';

-- ----------------------------
-- Table structure for opt_log_info
-- ----------------------------
DROP TABLE IF EXISTS `opt_log_info`;
CREATE TABLE `opt_log_info` (
  `Id`              INT(20) NOT NULL AUTO_INCREMENT,
  `Log_Action_Name` VARCHAR(200)     DEFAULT NULL
  COMMENT '日志记录类',
  `Log_Time`        VARCHAR(20)      DEFAULT NULL
  COMMENT '日志时间',
  `Log_Content`     VARCHAR(500)     DEFAULT NULL
  COMMENT '日志内容',
  `Opr_Id`          VARCHAR(50)      DEFAULT NULL
  COMMENT '操作人UserId',
  `Opr_Name`        VARCHAR(100)     DEFAULT NULL
  COMMENT '操作人UserName',
  `Client_Ip`       VARCHAR(50)      DEFAULT NULL
  COMMENT '操作机器Ip',
  `Opr_Sql`         VARCHAR(2000)    DEFAULT NULL
  COMMENT '操作执行sql',
  `Opr_Sql_Type`    VARCHAR(50)      DEFAULT NULL
  COMMENT 'SELECT_UPDATE_INSERT_DELETE',
  `Opr_Date`        VARCHAR(20)      DEFAULT NULL
  COMMENT '操作日期',
  `Version`         INT(20)          DEFAULT NULL
  COMMENT '版本号',
  `Create_Time`     VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `Creator`         VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`     VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`        VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`      VARCHAR(2)       DEFAULT NULL
  COMMENT '有效标注1有效 0无效',
  `Remark`          VARCHAR(500)     DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `oprid_index` (`Opr_Id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '操作日志表';

-- ----------------------------
-- Table structure for org_info
-- ----------------------------
DROP TABLE IF EXISTS `org_info`;
CREATE TABLE `org_info` (
  `Id`          INT(20) NOT NULL AUTO_INCREMENT,
  `Org_No`      VARCHAR(50)      DEFAULT NULL
  COMMENT '机构代码',
  `Org_Name`    VARCHAR(200)     DEFAULT NULL
  COMMENT '机构名称',
  `Begin_Date`  VARCHAR(20)      DEFAULT NULL
  COMMENT '开始时间',
  `End_Date`    VARCHAR(20)      DEFAULT NULL
  COMMENT '截止时间',
  `parent_Id`   VARCHAR(50)      DEFAULT NULL
  COMMENT '操作人Id',
  `Create_Time` VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `Creator`     VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time` VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`    VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`  VARCHAR(2)       DEFAULT NULL
  COMMENT '有效标注1有效 0无效',
  `Remark`      VARCHAR(500)     DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `OrgIdIndex` (`Org_No`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '机构信息表';
INSERT INTO `org_info` VALUES
  ('1', '02', '上海总部', '2016-10-11', '3000-12-31', '0', '2016-11-01 22:50:55', '10', '2016-11-01 22:50:55', '12', '13',
   '14');
-- ----------------------------
-- Table structure for permit_page_element
-- ----------------------------
DROP TABLE IF EXISTS `permit_page_element`;
CREATE TABLE `permit_page_element` (
  `id`           INT(20) NOT NULL AUTO_INCREMENT
  COMMENT '主键ID',
  `Element_Id`   VARCHAR(50)      DEFAULT NULL
  COMMENT '元素ID',
  `Page_Id`      INT(20)          DEFAULT NULL
  COMMENT '所属页面ID',
  `Element_Desc` VARCHAR(100)     DEFAULT NULL
  COMMENT '资源描述',
  `Create_Time`  VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `Creator`      VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`  VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`     VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`   CHAR(1)          DEFAULT NULL
  COMMENT '有效标注 1有效 0无效',
  `Remark`       VARCHAR(500)     DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `ElementId` (`Page_Id`) USING BTREE
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '页面元素表';
INSERT INTO `permit_page_element`
VALUES ('1', 'redeem', '21', '赎回', '2016-11-06 10:53:23', NULL, '2016-11-27 01:28:52', NULL, '1', NULL);
INSERT INTO `permit_page_element`
VALUES ('2', 'add', '21', '新增', '2016-11-06 10:53:23', NULL, '2016-11-27 01:28:52', NULL, '1', NULL);
INSERT INTO `permit_page_element`
VALUES ('3', 'edit', '21', '编辑', '2016-11-06 11:38:01', NULL, '2016-11-27 01:28:52', NULL, '1', NULL);
-- ----------------------------
-- Table structure for permit_resource
-- ----------------------------
DROP TABLE IF EXISTS `permit_resource`;
CREATE TABLE `permit_resource` (
  `Id`             INT(20) NOT NULL AUTO_INCREMENT,
  `Resource_Name`  VARCHAR(100)     DEFAULT NULL
  COMMENT '资源名称',
  `resource_value` VARCHAR(200)     DEFAULT NULL,
  `Resource_Type`  CHAR(1)          DEFAULT NULL
  COMMENT '1.菜单，2.子页面，3.Action',
  `Parent_Id`      INT(20)          DEFAULT NULL
  COMMENT '父ID',
  `Priority`       INT(20)          DEFAULT NULL
  COMMENT '优先级',
  `is_leaf`        CHAR(1)          DEFAULT NULL,
  `Create_Time`    VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `Creator`        VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`    VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`       VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`     CHAR(1)          DEFAULT NULL
  COMMENT '有效标注 1有效 0无效',
  `Remark`         VARCHAR(500)     DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `resource_value` (`resource_value`) USING BTREE
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '资源表';
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES ('1', '台账数据维护', '1', '0', '1', '2016-10-06 11:33:30', 'bizi', '2016-10-25 23:13:08', 'modify', '1', '台账数据维护', '',
        'N');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES
  ('6', '产品信息维护', '1', '0', '1', '2016-10-17 22:39:40', 'guofangbi', '2016-10-24 21:48:59', 'guofangbi', '1', '产品信息维护',
   '', 'N');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES ('10', '产品基础信息配置', '1', '6', '1', '2016-10-24 21:49:47', 'guofangbi', '2016-11-27 01:29:27', 'guofangbi', '1',
              '产品基础信息配置', '/product/udJrzcAllo.html', 'Y');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES ('11', '产品预期收益率配置', '1', '6', '1', '2016-10-24 21:50:23', 'guofangbi', '2016-11-27 01:29:34', 'guofangbi', '1',
              '产品预期收益率配置', '/product/productPreProfit.html', 'Y');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES
  ('12', '组织架构维护', '1', '0', '1', '2016-10-24 21:50:59', 'guofangbi', '2016-10-24 21:50:59', 'guofangbi', '1', '组织架构维护',
   '', 'N');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES ('13', '基础人员信息维护', '1', '12', '1', '2016-10-24 21:51:35', 'guofangbi', '2016-11-27 01:29:45', 'guofangbi', '1',
              '基础人员信息维护', '/org/staffInfo.html', 'Y');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES ('14', '基础机构信息维护', '1', '12', '1', '2016-10-24 21:52:17', 'guofangbi', '2016-11-27 01:29:51', 'guofangbi', '1',
              '基础机构信息维护', '/org/orgInfo.html', 'Y');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES
  ('15', '权限管理维护', '1', '0', '1', '2016-10-24 21:52:58', 'guofangbi', '2016-10-24 21:52:58', 'guofangbi', '1', '权限管理维护',
   '', 'N');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES ('16', '用户角色管理', '1', '15', '1', '2016-10-24 21:54:00', 'guofangbi', '2016-11-27 01:30:01', 'guofangbi', '1',
              '用户角色管理', '/permit/userRole.html', 'Y');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES ('17', '角色菜单管理', '1', '15', '1', '2016-10-24 21:54:55', 'guofangbi', '2016-11-27 01:30:06', 'guofangbi', '1',
              '角色菜单管理', '/permit/roleResource.html', 'Y');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES
  ('18', '菜单管理', '1', '15', '1', '2016-10-24 21:55:54', 'guofangbi', '2016-11-27 01:30:18', 'guofangbi', '1', '菜单管理',
   '/permit/resource.html', 'Y');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES
  ('19', '角色管理', '1', '15', '1', '2016-10-24 21:56:44', 'guofangbi', '2016-11-27 01:30:12', 'guofangbi', '1', '角色管理',
   '/permit/role.html', 'Y');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES
  ('20', '用户管理', '1', '15', '1', '2016-10-24 21:58:15', 'guofangbi', '2016-11-27 01:30:22', 'guofangbi', '1', '用户管理',
   '/permit/sysUser.html', 'Y');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES
  ('21', '台账数据处理', '1', '1', '1', '2016-10-25 23:13:51', 'guofangbi', '2016-11-27 01:27:28', 'guofangbi', '1', '台账数据处理',
   '/trade/tradeImport.html', 'Y');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES
  ('22', '台账文件处理', '1', '1', '1', '2016-10-25 23:17:16', 'guofangbi', '2016-11-27 01:29:16', 'guofangbi', '1', '台账文件处理',
   '/trade/tradeFile.html', 'Y');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES
  ('23', '活期利率管理', '1', '6', '1', '2016-10-29 10:54:05', 'guofangbi', '2016-11-27 01:29:40', 'guofangbi', '1', '活期利率管理',
   '/product/rateInfo.html', 'Y');
INSERT INTO `permit_resource` (Id, Resource_Name, Resource_Type, Parent_Id, Priority, Create_Time, Creator, Modify_Time, Modifier, Valid_Flag, Remark, resource_value, is_leaf)
VALUES ('24', '数据权限管理', '1', '12', '1', '2016-10-29 10:55:33', 'guofangbi', '2016-11-27 01:29:56', 'guofangbi', '1',
              '数据权限管理', '/org/dataPrivilege.html', 'Y');
-- ----------------------------
-- Table structure for permit_role
-- ----------------------------
DROP TABLE IF EXISTS `permit_role`;
CREATE TABLE `permit_role` (
  `Id`          INT(20) NOT NULL AUTO_INCREMENT,
  `parent_id`   INT(20)          DEFAULT NULL,
  `Role_Name`   VARCHAR(100)     DEFAULT NULL
  COMMENT '角色名称',
  `Create_Time` VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `Creator`     VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time` VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`    VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`  CHAR(1)          DEFAULT NULL
  COMMENT '有效标注1有效 0无效',
  `remark`      VARCHAR(500)     DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `roleName` (`Role_Name`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '角色表';
INSERT INTO `permit_role`
VALUES ('1', '0', '管理员', '2016-10-07 01:09:07', 'creator', '2016-10-07 01:09:07', 'modifier', '1', NULL);
INSERT INTO `permit_role`
VALUES ('2', '1', '测试角色', '2016-11-07 17:03:01', 'admin', '2016-11-07 17:03:01', 'admin', '1', NULL);
-- ----------------------------
-- Table structure for permit_role_element
-- ----------------------------
DROP TABLE IF EXISTS `permit_role_element`;
CREATE TABLE `permit_role_element` (
  `id`          INT(20) NOT NULL AUTO_INCREMENT
  COMMENT '自增主键',
  `Element_Id`  INT(11)          DEFAULT NULL
  COMMENT '元素ID',
  `Role_Id`     INT(11)          DEFAULT NULL
  COMMENT '角色ID',
  `Create_Time` VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `Creator`     VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time` VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`    VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`  CHAR(1)          DEFAULT NULL
  COMMENT '有效标注 1有效 0无效',
  `Remark`      VARCHAR(500)     DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `idIndex` (`Element_Id`, `Role_Id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '角色元素表';
INSERT INTO `permit_role_element`
VALUES ('1', '1', '2', '2016-11-27 01:25:46', 'admin', '2016-11-27 01:25:46', 'admin', '1', NULL);
INSERT INTO `permit_role_element`
VALUES ('2', '2', '2', '2016-11-27 01:25:46', 'admin', '2016-11-27 01:25:46', 'admin', '1', NULL);
INSERT INTO `permit_role_element`
VALUES ('3', '3', '2', '2016-11-27 01:25:46', 'admin', '2016-11-27 01:25:46', 'admin', '1', NULL);
INSERT INTO `permit_role_element`
VALUES ('4', '1', '1', '2016-11-27 01:26:07', 'admin', '2016-11-27 01:26:07', 'admin', '1', NULL);
INSERT INTO `permit_role_element`
VALUES ('5', '2', '1', '2016-11-27 01:26:07', 'admin', '2016-11-27 01:26:07', 'admin', '1', NULL);
INSERT INTO `permit_role_element`
VALUES ('6', '3', '1', '2016-11-27 01:26:07', 'admin', '2016-11-27 01:26:07', 'admin', '1', NULL);
-- ----------------------------
-- Table structure for permit_role_resource
-- ----------------------------
DROP TABLE IF EXISTS `permit_role_resource`;
CREATE TABLE `permit_role_resource` (
  `id`          INT(20) NOT NULL AUTO_INCREMENT
  COMMENT '主键ID',
  `Resource_Id` INT(20) NOT NULL
  COMMENT '资源ID',
  `Role_Id`     INT(20) NOT NULL
  COMMENT '角色ID',
  `Create_Time` VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `Creator`     VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time` VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`    VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`  CHAR(1)          DEFAULT NULL
  COMMENT '有效标注 1有效 0无效',
  `Remark`      VARCHAR(500)     DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `idIndex` (`Resource_Id`, `Role_Id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '角色资源表';

INSERT INTO `permit_role_resource`
VALUES ('31', '6', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('32', '10', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('33', '11', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('34', '12', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('35', '13', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('36', '14', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('37', '15', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('38', '16', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('39', '17', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('40', '18', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('41', '19', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('42', '20', '1', '2016-10-24 22:05:40', 'guofangbi', '2016-10-24 22:05:40', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('48', '23', '1', '2016-10-29 10:55:50', 'guofangbi', '2016-10-29 10:55:50', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('49', '24', '1', '2016-10-29 10:55:50', 'guofangbi', '2016-10-29 10:55:50', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('58', '1', '1', '2016-11-01 23:27:20', 'guofangbi', '2016-11-01 23:27:20', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('61', '21', '1', '2016-11-01 23:27:20', 'guofangbi', '2016-11-01 23:27:20', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('62', '22', '1', '2016-11-01 23:29:54', 'guofangbi', '2016-11-01 23:29:54', 'guofangbi', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('63', '1', '2', '2016-11-07 17:07:09', 'admin', '2016-11-07 17:07:09', 'admin', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('64', '6', '2', '2016-11-07 17:07:09', 'admin', '2016-11-07 17:07:09', 'admin', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('65', '10', '2', '2016-11-07 17:07:09', 'admin', '2016-11-07 17:07:09', 'admin', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('66', '11', '2', '2016-11-07 17:07:09', 'admin', '2016-11-07 17:07:09', 'admin', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('67', '12', '2', '2016-11-07 17:07:09', 'admin', '2016-11-07 17:07:09', 'admin', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('68', '13', '2', '2016-11-07 17:07:09', 'admin', '2016-11-07 17:07:09', 'admin', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('69', '14', '2', '2016-11-07 17:07:09', 'admin', '2016-11-07 17:07:09', 'admin', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('70', '21', '2', '2016-11-07 17:07:09', 'admin', '2016-11-07 17:07:09', 'admin', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('71', '22', '2', '2016-11-07 17:07:09', 'admin', '2016-11-07 17:07:09', 'admin', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('72', '23', '2', '2016-11-07 17:07:09', 'admin', '2016-11-07 17:07:09', 'admin', '1', NULL);
INSERT INTO `permit_role_resource`
VALUES ('73', '24', '2', '2016-11-07 17:07:09', 'admin', '2016-11-07 17:07:09', 'admin', '1', NULL);
-- ----------------------------
-- Table structure for permit_user
-- ----------------------------
DROP TABLE IF EXISTS `permit_user`;
CREATE TABLE `permit_user` (
  `Id`              INT(20)      NOT NULL AUTO_INCREMENT,
  `Login_Name`      VARCHAR(30)  NOT NULL
  COMMENT '用户Id',
  `User_Name`       VARCHAR(100) NOT NULL
  COMMENT '登录用户名称',
  `Password`        VARCHAR(100) NOT NULL
  COMMENT '登录密码',
  `Last_Login_Time` VARCHAR(20)           DEFAULT NULL
  COMMENT '上次登录时间',
  `Create_Time`     VARCHAR(20)           DEFAULT NULL
  COMMENT '创建时间',
  `Creator`         VARCHAR(30)           DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`     VARCHAR(20)           DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`        VARCHAR(30)           DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`      VARCHAR(2)            DEFAULT NULL
  COMMENT '有效标注 1有效 0无效',
  `Remark`          VARCHAR(500)          DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `loginIndex` (`Login_Name`) USING BTREE
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '系统登录表';

INSERT INTO `permit_user` VALUES
  ('1', 'admin', '系统管理员', '4QrcOUm6Wau+VuBX8g+IPg==', '2016-11-27 01:25:08', '1', '1', '2016-11-27 01:25:08',
        'guofangbi', '1', NULL);
INSERT INTO `permit_user` VALUES
  ('3', 'gonglei', '龚蕾', '4QrcOUm6Wau+VuBX8g+IPg==', '2016-11-07 23:03:12', '2016-11-04 23:03:42', 'admin',
        '2016-11-07 23:03:12', 'admin', '1', NULL);
INSERT INTO `permit_user` VALUES
  ('4', 'fengzhiyi', '冯智裔', '4QrcOUm6Wau+VuBX8g+IPg==', '2016-11-12 00:24:18', '2016-11-05 00:16:26', 'admin',
        '2016-11-12 00:24:18', 'admin', '1', NULL);
INSERT INTO `permit_user` VALUES
  ('5', 'zhuxiaowei', '朱晓薇', '4QrcOUm6Wau+VuBX8g+IPg==', '2016-11-07 17:28:23', '2016-11-07 17:26:34', 'admin',
        '2016-11-07 17:28:23', 'admin', '1', NULL);
INSERT INTO `permit_user` VALUES
  ('6', 'shice', '史册', '4QrcOUm6Wau+VuBX8g+IPg==', '2016-11-09 16:54:03', '2016-11-08 01:08:36', 'admin',
        '2016-11-09 16:54:03', 'admin', '1', NULL);
INSERT INTO `permit_user` VALUES
  ('7', 'zhanglili', '张莉莉', '4QrcOUm6Wau+VuBX8g+IPg==', '2016-11-08 01:12:09', '2016-11-08 01:09:09', 'admin',
        '2016-11-08 01:12:09', 'admin', '1', NULL);
INSERT INTO `permit_user` VALUES
  ('8', 'yuanjiawen', '袁佳雯', '4QrcOUm6Wau+VuBX8g+IPg==', '2016-11-25 22:28:28', '2016-11-08 01:09:43', 'admin',
        '2016-11-25 22:28:28', 'admin', '1', NULL);
-- ----------------------------
-- Table structure for permit_user_role
-- ----------------------------
DROP TABLE IF EXISTS `permit_user_role`;
CREATE TABLE `permit_user_role` (
  `Id`          INT(20) NOT NULL AUTO_INCREMENT,
  `Role_Id`     INT(20)          DEFAULT NULL
  COMMENT '角色Id',
  `User_Id`     INT(20)          DEFAULT NULL
  COMMENT '用户Id',
  `Create_Time` VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `Creator`     VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time` VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`    VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`  VARCHAR(2)       DEFAULT NULL
  COMMENT '有效标注1有效 0无效',
  `Remark`      VARCHAR(500)     DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `IdIndex` (`Role_Id`, `User_Id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '用户角色表';
INSERT INTO `permit_user_role`
VALUES ('2', '1', '1', '2016-10-07 12:41:46', NULL, '2016-10-07 12:41:46', NULL, '1', NULL);
INSERT INTO `permit_user_role`
VALUES ('3', '2', '3', '2016-11-07 17:08:01', 'admin', '2016-11-07 17:08:01', 'admin', '1', NULL);
INSERT INTO `permit_user_role`
VALUES ('4', '2', '4', '2016-11-07 17:08:08', 'admin', '2016-11-07 17:08:08', 'admin', '1', NULL);
INSERT INTO `permit_user_role`
VALUES ('5', '2', '5', '2016-11-07 17:27:53', 'admin', '2016-11-07 17:27:53', 'admin', '1', NULL);
INSERT INTO `permit_user_role`
VALUES ('6', '2', '6', '2016-11-08 01:10:43', 'admin', '2016-11-08 01:10:43', 'admin', '1', NULL);
INSERT INTO `permit_user_role`
VALUES ('7', '2', '7', '2016-11-08 01:10:50', 'admin', '2016-11-08 01:10:50', 'admin', '1', NULL);
INSERT INTO `permit_user_role`
VALUES ('8', '2', '8', '2016-11-08 01:10:57', 'admin', '2016-11-08 01:10:57', 'admin', '1', NULL);
-- ----------------------------
-- Table structure for product_info
-- ----------------------------
DROP TABLE IF EXISTS `product_info`;
CREATE TABLE `product_info` (
  `Id`                 INT(20)       NOT NULL AUTO_INCREMENT,
  `Product_Id`         VARCHAR(50)   NOT NULL
  COMMENT '产品Id',
  `Product_Name`       VARCHAR(200)  NOT NULL
  COMMENT '产品名称',
  `Qx_Date`            VARCHAR(20)   NOT NULL
  COMMENT '起息日期',
  `Dq_Date`            VARCHAR(20)   NOT NULL
  COMMENT '到期日期',
  `Periods`            VARCHAR(200)           DEFAULT NULL
  COMMENT '期数',
  `Open_Type`          VARCHAR(10)            DEFAULT NULL
  COMMENT '开放类型',
  `Redeem_Type`        VARCHAR(10)            DEFAULT NULL
  COMMENT '赎回类型',
  `Buy_Open_Type`      VARCHAR(50)            DEFAULT NULL
  COMMENT '申购开放类型',
  `Redeem_Open_Type`   VARCHAR(50)            DEFAULT NULL
  COMMENT '赎回开放类型',
  `Buy_Open_Period`    VARCHAR(50)            DEFAULT NULL
  COMMENT '申购开放周期',
  `Product_Type`       VARCHAR(200)           DEFAULT NULL
  COMMENT '产品类型',
  `pre_payment_flag`   VARCHAR(10)            DEFAULT NULL
  COMMENT '是否提前还款',
  `divide_phase_flag`  VARCHAR(50)   NOT NULL
  COMMENT '产品收益是否分阶段',
  `terminal_date`      VARCHAR(20)            DEFAULT NULL
  COMMENT '终止日期',
  `Open_Redeem_Period` VARCHAR(50)            DEFAULT NULL
  COMMENT '赎回开放周期_单位月',
  `Jx_Type`            VARCHAR(10)            DEFAULT NULL
  COMMENT '结息类型',
  `Deposits_Flag`      VARCHAR(2)             DEFAULT NULL
  COMMENT '是否计算活期利率',
  `Qx_Days`            DOUBLE(20, 4) NOT NULL
  COMMENT '产品期限',
  `Qx_unit`            VARCHAR(50)   NOT NULL
  COMMENT '期限单位天D月M年Y',
  `Redeem_Begin`       INT(20)       NOT NULL
  COMMENT '可赎回起始天',
  `Redeem_End`         INT(20)       NOT NULL
  COMMENT '可赎回截止天',
  `Create_Time`        VARCHAR(20)            DEFAULT NULL
  COMMENT '创建时间',
  `Creator`            VARCHAR(30)            DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`        VARCHAR(20)            DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`           VARCHAR(30)            DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`         VARCHAR(2)             DEFAULT NULL
  COMMENT '有效标注1有效 0无效',
  `Remark`             VARCHAR(500)           DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `ProductInfo` (`Product_Id`, `Product_Name`) USING BTREE
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '产品信息表';

-- ----------------------------
-- Table structure for product_pre_profit
-- ----------------------------
DROP TABLE IF EXISTS `product_pre_profit`;
CREATE TABLE `product_pre_profit` (
  `Id`                  INT(20)       NOT NULL AUTO_INCREMENT,
  `Product_Id`          VARCHAR(50)   NOT NULL
  COMMENT '产品Id',
  `Product_Name`        VARCHAR(200)  NOT NULL
  COMMENT '产品名称',
  `divide_begin_date`   VARCHAR(20)   NOT NULL
  COMMENT '分阶段起始时间',
  `divide_end_date`     VARCHAR(20)   NOT NULL
  COMMENT '分阶段截止时间',
  `buy_type`            VARCHAR(100)  NOT NULL
  COMMENT '认购者类型',
  `Buy_Money_Begin`     DOUBLE(20, 4) NOT NULL
  COMMENT '认购金额起始点',
  `Buy_Money_End`       DOUBLE(20, 4) NOT NULL
  COMMENT '认购金额截止点',
  `rate`                DOUBLE(20, 4) NOT NULL
  COMMENT '预期收益率不用加百分号2.8%则记为2.8',
  `product_description` VARCHAR(200)           DEFAULT NULL
  COMMENT '产品期限相关描述',
  `Create_Time`         VARCHAR(20)            DEFAULT NULL
  COMMENT '创建时间',
  `Creator`             VARCHAR(30)            DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`         VARCHAR(20)            DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`            VARCHAR(30)            DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`          VARCHAR(2)             DEFAULT NULL
  COMMENT '有效标注1有效 0无效',
  `Remark`              VARCHAR(500)           DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `ProductId` (`Product_Id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '产品预期收益表';

-- ----------------------------
-- Table structure for product_pre_profit_detail
-- ----------------------------
DROP TABLE IF EXISTS `product_pre_profit_detail`;
CREATE TABLE `product_pre_profit_detail` (
  `Id`                INT(20) NOT NULL AUTO_INCREMENT,
  `Parent_Id`         INT(20)          DEFAULT NULL
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
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '产品预期收益表';

-- ----------------------------
-- Table structure for rate_info
-- ----------------------------
DROP TABLE IF EXISTS `rate_info`;
CREATE TABLE `rate_info` (
  `Id`          INT(20)       NOT NULL AUTO_INCREMENT,
  `Begin_Date`  VARCHAR(20)   NOT NULL
  COMMENT '开始日期',
  `End_Date`    VARCHAR(20)   NOT NULL
  COMMENT '截止日期',
  `Rate`        DOUBLE(20, 4) NOT NULL
  COMMENT '活期利息非百分号表示示例0.28%填入0.28',
  `Create_Time` VARCHAR(20)            DEFAULT NULL
  COMMENT '创建时间',
  `Creator`     VARCHAR(30)            DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time` VARCHAR(20)            DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`    VARCHAR(30)            DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`  VARCHAR(2)             DEFAULT NULL
  COMMENT '有效标注 1有效 0无效',
  `Remark`      VARCHAR(500)           DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `idIndex` (`Begin_Date`, `End_Date`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '系统登录表';

-- ----------------------------
-- Table structure for staff_info
-- ----------------------------
DROP TABLE IF EXISTS `staff_info`;
CREATE TABLE `staff_info` (
  `Id`           INT(20)      NOT NULL AUTO_INCREMENT,
  `Staff_Id`     VARCHAR(30)  NOT NULL
  COMMENT '员工工号',
  `Staff_Name`   VARCHAR(50)  NOT NULL
  COMMENT '员工姓名',
  `Age`          INT(20)               DEFAULT NULL
  COMMENT '年龄',
  `Email`        VARCHAR(100)          DEFAULT NULL
  COMMENT '邮箱',
  `Mobile`       VARCHAR(50)           DEFAULT NULL
  COMMENT '手机号码',
  `Id_Card_Type` VARCHAR(2)            DEFAULT NULL
  COMMENT '证件类型0身份证1护照2其他',
  `Id_Card_No`   VARCHAR(100)          DEFAULT NULL
  COMMENT '证件号码',
  `Address`      VARCHAR(150)          DEFAULT NULL
  COMMENT '地址',
  `Org_No`       VARCHAR(10)  NOT NULL
  COMMENT '机构代码',
  `Org_Name`     VARCHAR(150) NOT NULL
  COMMENT '机构名称',
  `Begin_Date`   VARCHAR(20)  NOT NULL
  COMMENT '开始时间',
  `End_Date`     VARCHAR(20)  NOT NULL
  COMMENT '截至时间',
  `Status`       VARCHAR(2)   NOT NULL
  COMMENT '在职状态0离职 1在职',
  `Post_Name`    VARCHAR(100)          DEFAULT NULL
  COMMENT '岗位名称',
  `Create_Time`  VARCHAR(20)           DEFAULT NULL
  COMMENT '创建时间',
  `Creator`      VARCHAR(30)           DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`  VARCHAR(20)           DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`     VARCHAR(30)           DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`   VARCHAR(2)            DEFAULT NULL
  COMMENT '有效标注1有效 0无效',
  `Remark`       VARCHAR(500)          DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `idIndex` (`Staff_Id`, `Org_No`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '员工信息表';
INSERT INTO `staff_info` VALUES
  ('1', '123456', 'test', NULL, NULL, NULL, NULL, NULL, NULL, '02', '上海总部', '2016-11-04', '3000-12-31', '1', NULL,
                                                                            '2016-11-04 17:38:27', 'admin',
                                                                            '2016-11-04 17:38:27', 'admin', '1', NULL);
INSERT INTO `staff_info` VALUES
  ('2', 'gonglei', '龚蕾', NULL, NULL, NULL, NULL, NULL, NULL, '02', '上海总部', '2016-11-04', '3000-12-31', '1', NULL,
                                                                           '2016-11-04 23:03:42', 'abcde',
                                                                           '2016-11-04 23:03:42', 'abcde', '1', NULL);
INSERT INTO `staff_info` VALUES
  ('3', 'fengzhiyi', '冯智裔', NULL, NULL, NULL, NULL, NULL, NULL, '02', '上海总部', '2016-11-05', '3000-12-31', '1', NULL,
                                                                              '2016-11-05 00:16:26', 'admin',
                                                                              '2016-11-05 00:16:26', 'admin', '1',
                                                                              NULL);
INSERT INTO `staff_info` VALUES
  ('4', 'zhuxiaowei', '朱晓薇', NULL, NULL, NULL, NULL, NULL, NULL, '02', '上海总部', '2016-11-07', '3000-12-31', '1', NULL,
                                                                               '2016-11-07 17:26:34', 'admin',
                                                                               '2016-11-07 17:26:34', 'admin', '1',
                                                                               NULL);
INSERT INTO `staff_info` VALUES
  ('5', 'shice', '史册', NULL, NULL, NULL, NULL, NULL, NULL, '02', '上海总部', '2016-11-08', '3000-12-31', '1', NULL,
                                                                         '2016-11-08 01:08:36', 'admin',
                                                                         '2016-11-08 01:08:36', 'admin', '1', NULL);
INSERT INTO `staff_info` VALUES
  ('6', 'zhanglili', '张莉莉', NULL, NULL, NULL, NULL, NULL, NULL, '02', '上海总部', '2016-11-08', '3000-12-31', '1', NULL,
                                                                              '2016-11-08 01:09:09', 'admin',
                                                                              '2016-11-08 01:09:09', 'admin', '1',
                                                                              NULL);
INSERT INTO `staff_info` VALUES
  ('7', 'yuanjiawen', '袁佳雯', NULL, NULL, NULL, NULL, NULL, NULL, '02', '上海总部', '2016-11-08', '3000-12-31', '1', NULL,
                                                                               '2016-11-08 01:09:43', 'admin',
                                                                               '2016-11-08 01:09:43', 'admin', '1',
                                                                               NULL);
-- ----------------------------
-- Table structure for sys_code
-- ----------------------------
DROP TABLE IF EXISTS `sys_code`;
CREATE TABLE `sys_code` (
  `Id`          INT(20)      NOT NULL AUTO_INCREMENT,
  `Code`        VARCHAR(100) NOT NULL
  COMMENT 'code',
  `Value`       VARCHAR(500) NOT NULL
  COMMENT '码值',
  `Type`        VARCHAR(50)  NOT NULL
  COMMENT '字典类型',
  `Description` VARCHAR(500)          DEFAULT NULL
  COMMENT '相关说明',
  `Create_Time` VARCHAR(20)           DEFAULT NULL
  COMMENT '创建时间',
  `Creator`     VARCHAR(30)           DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time` VARCHAR(20)           DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`    VARCHAR(30)           DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`  VARCHAR(2)            DEFAULT NULL
  COMMENT '有效标注 1有效 0无效',
  `Remark`      VARCHAR(500)          DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `index_code` (`Code`, `Type`) USING BTREE
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '系统登录表';

-- ----------------------------
-- Table structure for trade_detail_info
-- ----------------------------
DROP TABLE IF EXISTS `trade_detail_info`;
CREATE TABLE `trade_detail_info` (
  `Id`                INT(20)       NOT NULL AUTO_INCREMENT,
  `Product_Id`        VARCHAR(50)   NOT NULL
  COMMENT '产品Id',
  `Product_Name`      VARCHAR(200)           DEFAULT NULL
  COMMENT '产品名称',
  `Product_Type`      VARCHAR(200)           DEFAULT NULL
  COMMENT '产品类型',
  `Trans_Date`        VARCHAR(20)   NOT NULL
  COMMENT '交易日期',
  `Trans_Id`          VARCHAR(50)            DEFAULT NULL
  COMMENT '交易流水号',
  `Debit_Money`       DOUBLE(20, 0)          DEFAULT NULL
  COMMENT '借方发生额',
  `Credit_Money`      DOUBLE(20, 4)          DEFAULT NULL
  COMMENT '申购金额',
  `buy_Money`         DOUBLE(20, 4) NOT NULL
  COMMENT '认购金额',
  `redeem_Money`      DOUBLE(20, 4)          DEFAULT NULL
  COMMENT '赎回金额',
  `Account_Money`     DOUBLE(20, 4)          DEFAULT NULL
  COMMENT '账户余额',
  `Serial_Id`         VARCHAR(50)            DEFAULT NULL
  COMMENT '凭证Id',
  `Summary`           VARCHAR(200)           DEFAULT NULL
  COMMENT '摘要',
  `Card_No`           VARCHAR(50)   NOT NULL
  COMMENT '卡号(对方账号)',
  `Account_Name`      VARCHAR(200)           DEFAULT NULL
  COMMENT '对方账号名称',
  `Bank_Name`         VARCHAR(200)           DEFAULT NULL
  COMMENT '对方开户行',
  `Trans_Time`        VARCHAR(20)            DEFAULT NULL
  COMMENT '交易时间',
  `Bank_No`           VARCHAR(50)            DEFAULT NULL
  COMMENT '对方开户行号',
  `Contract_Id`       VARCHAR(100)           DEFAULT NULL
  COMMENT '合同编号',
  `Id_Card_Type`      VARCHAR(10)            DEFAULT NULL
  COMMENT '证件类型0身份证1护照2其他',
  `Id_Card_No`        VARCHAR(50)            DEFAULT NULL
  COMMENT '证件号码',
  `Telephone`         VARCHAR(50)            DEFAULT NULL
  COMMENT '客户联系方式',
  `Org_No`            VARCHAR(20)            DEFAULT NULL
  COMMENT '销售机构代码',
  `Org_Name`          VARCHAR(200)
                      CHARACTER SET utf8mb4  DEFAULT NULL
  COMMENT '销售机构名称',
  `User_Id`           VARCHAR(20)
                      CHARACTER SET utf8mb4  DEFAULT NULL
  COMMENT '归属人工号',
  `User_Name`         VARCHAR(100)           DEFAULT NULL
  COMMENT '归属人名称',
  `Risk_Grade`        VARCHAR(50)            DEFAULT NULL
  COMMENT '风险等级',
  `Risk_Time`         VARCHAR(20)            DEFAULT NULL
  COMMENT '风险等级评估时间',
  `Channel`           VARCHAR(200)           DEFAULT NULL
  COMMENT '归属渠道',
  `Qx_Days`           DOUBLE(20, 4) NOT NULL
  COMMENT '期限天月年数',
  `Qx_unit`           VARCHAR(50)   NOT NULL
  COMMENT '期限单位D天M月Y年',
  `rate`              DOUBLE(20, 4)          DEFAULT NULL
  COMMENT '认购收益率',
  `cycle_Flag`        VARCHAR(50)            DEFAULT NULL
  COMMENT '是否循环',
  `Redeem_Flag`       VARCHAR(10)            DEFAULT NULL
  COMMENT '赎回标志0未赎回1已赎回初始状态为0',
  `Exam_Flag`         VARCHAR(10)            DEFAULT NULL
  COMMENT '复核标志0待修改1待审核2审核拒绝3审核通过初始状态为0',
  `Opr_Redeem_Id`     VARCHAR(50)            DEFAULT NULL
  COMMENT '赎回操作人Id',
  `Opr_Redeem_Date`   VARCHAR(20)            DEFAULT NULL
  COMMENT '赎回操作时间',
  `Opr_Exam_Id`       VARCHAR(50)            DEFAULT NULL
  COMMENT '审核操作人Id',
  `Opr_Exam_Date`     VARCHAR(20)            DEFAULT NULL
  COMMENT '审核操作时间',
  `Opr_Exam_Remark`   VARCHAR(200)           DEFAULT NULL
  COMMENT '审核备注',
  `Opr_Redeem_Remark` VARCHAR(200)           DEFAULT NULL
  COMMENT '赎回经办修改备注',
  `import_Date`       VARCHAR(20)            DEFAULT NULL
  COMMENT '导入人导入excel数据日期',
  `import_Id`         VARCHAR(30)            DEFAULT NULL
  COMMENT '批量文件导入人id区分单条手工录入无该信息',
  `image_Id`          VARCHAR(50)            DEFAULT NULL
  COMMENT '客户信息镜像文件',
  `excel_Id`          VARCHAR(50)            DEFAULT NULL
  COMMENT 'excel文件批次',
  `Version`           INT(20)                DEFAULT NULL
  COMMENT '版本号',
  `Create_Time`       VARCHAR(20)            DEFAULT NULL
  COMMENT '创建时间',
  `Creator`           VARCHAR(30)            DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`       VARCHAR(20)            DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`          VARCHAR(30)            DEFAULT NULL
  COMMENT '修改人',
  `Valid_Flag`        VARCHAR(2)             DEFAULT NULL
  COMMENT '有效标注1有效 0无效',
  `Remark`            VARCHAR(500)           DEFAULT NULL
  COMMENT '备注',
  PRIMARY KEY (`Id`),
  KEY `IdIndex` (`Product_Id`, `Trans_Date`, `Org_No`, `User_Id`),
  KEY `NoIndex` (`Id_Card_Type`, `Contract_Id`) USING BTREE
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '客户购买产品交易信息台账表';

########################20170222#################################
CREATE TABLE `pt_jc_rq` (
  `sjrq`     VARCHAR(10) NOT NULL
  COMMENT '数据日期（yyyy-mm-dd）',
  `z_ksrq`   VARCHAR(10)   DEFAULT NULL
  COMMENT '周首日（yyyy-mm-dd）',
  `z_jzrq`   VARCHAR(10)   DEFAULT NULL
  COMMENT '周末日（yyyy-mm-dd）',
  `z_ljts`   DECIMAL(8, 0) DEFAULT NULL
  COMMENT '周累计天数',
  `z_ts`     DECIMAL(8, 0) DEFAULT NULL
  COMMENT '周天数',
  `x_ksrq`   VARCHAR(10)   DEFAULT NULL
  COMMENT '旬首日',
  `x_jzrq`   VARCHAR(10)   DEFAULT NULL
  COMMENT '旬末日',
  `x_ljts`   DECIMAL(8, 0) DEFAULT NULL
  COMMENT '旬累计天数',
  `x_ts`     DECIMAL(8, 0) DEFAULT NULL
  COMMENT '旬天数',
  `y_ksrq`   VARCHAR(10)   DEFAULT NULL
  COMMENT '月首日',
  `y_jzrq`   VARCHAR(10)   DEFAULT NULL
  COMMENT '月末日',
  `y_ljts`   DECIMAL(8, 0) DEFAULT NULL
  COMMENT '月累计天数',
  `y_ts`     DECIMAL(8, 0) DEFAULT NULL
  COMMENT '月天数',
  `j_ksrq`   VARCHAR(10)   DEFAULT NULL
  COMMENT '季首日',
  `j_jzrq`   VARCHAR(10)   DEFAULT NULL
  COMMENT '季末日',
  `j_ljts`   DECIMAL(8, 0) DEFAULT NULL
  COMMENT '季累计天数',
  `j_ts`     DECIMAL(8, 0) DEFAULT NULL
  COMMENT '季天数',
  `b_ksrq`   VARCHAR(10)   DEFAULT NULL
  COMMENT '半年首日',
  `b_jzrq`   VARCHAR(10)   DEFAULT NULL
  COMMENT '半年末日',
  `b_ljts`   DECIMAL(8, 0) DEFAULT NULL
  COMMENT '半年累计天数',
  `b_ts`     DECIMAL(8, 0) DEFAULT NULL
  COMMENT '半年天数',
  `n_ksrq`   VARCHAR(10)   DEFAULT NULL
  COMMENT '年首日',
  `n_jzrq`   VARCHAR(10)   DEFAULT NULL
  COMMENT '年末日',
  `n_ljts`   DECIMAL(8, 0) DEFAULT NULL
  COMMENT '年累计天数',
  `n_ts`     DECIMAL(8, 0) DEFAULT NULL
  COMMENT '年天数',
  `sz_ksrq`  VARCHAR(10)   DEFAULT NULL
  COMMENT '上周首日',
  `sz_jzrq`  VARCHAR(10)   DEFAULT NULL
  COMMENT '上周末日',
  `sz_ts`    DECIMAL(8, 0) DEFAULT NULL
  COMMENT '上周天数',
  `sx_ksrq`  VARCHAR(10)   DEFAULT NULL
  COMMENT '上旬首日',
  `sx_jzrq`  VARCHAR(10)   DEFAULT NULL
  COMMENT '上旬末日',
  `sx_ts`    DECIMAL(8, 0) DEFAULT NULL
  COMMENT '上旬天数',
  `sy_ksrq`  VARCHAR(10)   DEFAULT NULL
  COMMENT '上月首日',
  `sy_jzrq`  VARCHAR(10)   DEFAULT NULL
  COMMENT '上月末日',
  `sy_ts`    DECIMAL(8, 0) DEFAULT NULL
  COMMENT '上月天数',
  `sj_ksrq`  VARCHAR(10)   DEFAULT NULL
  COMMENT '上季首日',
  `sj_jzrq`  VARCHAR(10)   DEFAULT NULL
  COMMENT '上季末日',
  `sj_ts`    DECIMAL(8, 0) DEFAULT NULL
  COMMENT '上季天数',
  `sb_ksrq`  VARCHAR(10)   DEFAULT NULL
  COMMENT '上半年首日',
  `sb_jzrq`  VARCHAR(10)   DEFAULT NULL
  COMMENT '上半年末日',
  `sb_ts`    DECIMAL(8, 0) DEFAULT NULL
  COMMENT '上半年天数',
  `sn_ksrq`  VARCHAR(10)   DEFAULT NULL
  COMMENT '上年首日',
  `sn_jzrq`  VARCHAR(10)   DEFAULT NULL
  COMMENT '上年末日',
  `sn_ts`    DECIMAL(8, 0) DEFAULT NULL
  COMMENT '上年天数',
  `snz_ksrq` VARCHAR(10)   DEFAULT NULL
  COMMENT '上年周首日',
  `snz_jzrq` VARCHAR(10)   DEFAULT NULL
  COMMENT '上年周末日',
  `snz_ts`   DECIMAL(8, 0) DEFAULT NULL
  COMMENT '上年周天数',
  `snx_ksrq` VARCHAR(10)   DEFAULT NULL
  COMMENT '上年旬首日',
  `snx_jzrq` VARCHAR(10)   DEFAULT NULL
  COMMENT '上年旬末日',
  `snx_ts`   DECIMAL(8, 0) DEFAULT NULL
  COMMENT '上年旬天数',
  `sny_ksrq` VARCHAR(10)   DEFAULT NULL
  COMMENT '上年月首日',
  `sny_jzrq` VARCHAR(10)   DEFAULT NULL
  COMMENT '上年月末日',
  `sny_ts`   DECIMAL(8, 0) DEFAULT NULL
  COMMENT '上年月天数',
  `snj_ksrq` VARCHAR(10)   DEFAULT NULL
  COMMENT '上年季首日',
  `snj_jzrq` VARCHAR(10)   DEFAULT NULL
  COMMENT '上年季末日',
  `snj_ts`   DECIMAL(8, 0) DEFAULT NULL
  COMMENT '上年季天数',
  `snb_jzrq` VARCHAR(10)   DEFAULT NULL
  COMMENT '上年半年末日',
  `snb_ksrq` VARCHAR(10)   DEFAULT NULL
  COMMENT '上年半年首日',
  `snb_ts`   DECIMAL(8, 0) DEFAULT NULL
  COMMENT '上年半年天数',
  `sr_sjrq`  VARCHAR(10)   DEFAULT NULL
  COMMENT '上日数据日期',
  `ndjd`     VARCHAR(10)   DEFAULT NULL
  COMMENT '年度季度',
  PRIMARY KEY (`sjrq`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COMMENT = '日均基数日期';

DROP TABLE IF EXISTS `trade_info_online`;
CREATE TABLE `trade_info_online` (
  `id`           VARCHAR(50) NOT NULL
  COMMENT '序号',
  `project_name` VARCHAR(200)  DEFAULT NULL
  COMMENT '项目',
  `account_name` VARCHAR(100)  DEFAULT NULL
  COMMENT '姓名',
  `id_card_type` VARCHAR(50)   DEFAULT NULL
  COMMENT '证件类型',
  `id_card_no`   VARCHAR(50)   DEFAULT NULL
  COMMENT '证件号',
  `product_id`   VARCHAR(100)  DEFAULT NULL
  COMMENT '产品代码',
  `product_name` VARCHAR(200)  DEFAULT NULL
  COMMENT '产品名称',
  `qx_date`      VARCHAR(20)   DEFAULT NULL
  COMMENT '计息日',
  `qx_days`      INT(11)       DEFAULT NULL
  COMMENT '产品期限',
  `qx_unit`      VARCHAR(20)   DEFAULT NULL
  COMMENT '期限类型',
  `dq_date`      VARCHAR(20)   DEFAULT NULL
  COMMENT '到期日期',
  `buy_money`    DOUBLE(20, 4) DEFAULT NULL
  COMMENT '投资金额',
  `rate`         DOUBLE(20, 4) DEFAULT NULL
  COMMENT '年华收益率',
  `status`       VARCHAR(50)   DEFAULT NULL
  COMMENT '状态',
  `referrals_id` VARCHAR(50)   DEFAULT NULL
  COMMENT ' 推荐人ID',
  `referrals`    VARCHAR(100)  DEFAULT NULL
  COMMENT '推荐人',
  `user_name`    VARCHAR(100)  DEFAULT NULL
  COMMENT '归属人',
  `user_id`      VARCHAR(50)   DEFAULT NULL
  COMMENT '归属人ID',
  `file_name`    VARCHAR(100)  DEFAULT NULL
  COMMENT '文件名',
  `create_time`  VARCHAR(20)   DEFAULT NULL,
  `creator`      VARCHAR(20)   DEFAULT NULL,
  `modifier`     VARCHAR(20)   DEFAULT NULL,
  `modify_time`  VARCHAR(20)   DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COMMENT = '线上数据';

CREATE TABLE `customer_attribution` (
  `id`            INT(11) NOT NULL AUTO_INCREMENT
  COMMENT '主键ID',
  `id_card_type`  VARCHAR(10)      DEFAULT NULL
  COMMENT '证件类型',
  `id_card_no`    VARCHAR(20)      DEFAULT NULL
  COMMENT '证件号码',
  `user_id`       VARCHAR(20)      DEFAULT NULL
  COMMENT '归属人ID',
  `user_name`     VARCHAR(20)      DEFAULT NULL
  COMMENT '归属人姓名',
  `org_no`        VARCHAR(20)      DEFAULT NULL
  COMMENT '机构代码',
  `org_name`      VARCHAR(20)      DEFAULT NULL
  COMMENT '机构名称',
  `begin_date`    VARCHAR(20)      DEFAULT NULL
  COMMENT '起始日期',
  `end_date`      VARCHAR(20)      DEFAULT NULL
  COMMENT '终止日期',
  `customer_name` VARCHAR(20)      DEFAULT NULL
  COMMENT '客户姓名',
  `Create_Time`   VARCHAR(20)      DEFAULT NULL
  COMMENT '创建时间',
  `Creator`       VARCHAR(30)      DEFAULT NULL
  COMMENT '创建人',
  `Modify_Time`   VARCHAR(20)      DEFAULT NULL
  COMMENT '修改时间',
  `Modifier`      VARCHAR(30)      DEFAULT NULL
  COMMENT '修改人',
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 7
  DEFAULT CHARSET = utf8
  COMMENT = '客户归属关系表';
