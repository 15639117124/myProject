package com.tahone.baton.service;

import com.tahone.baton.base.BaseConst;
import com.tahone.baton.clear.dto.CommissionFeeDTO;
import com.tahone.baton.cond.TradeDetailInfoCond;
import com.tahone.baton.dto.ProductDTO;
import com.tahone.baton.model.ProductFeeConfigInfo;
import com.tahone.baton.model.ProductInfo;
import com.tahone.baton.model.TradeDetailInfo;
import com.tahone.baton.utils.BeanUtil;
import com.tahone.baton.utils.DateUtil;
import com.tahone.baton.utils.ValidateUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * Created by tengyue5i5j on 2017/1/2.
 */
@Service
@Slf4j
public class ProductFeeServiceImpl implements ProductFeeService {
    @Resource
    private TradeDetailService tradeDetailService;
    @Resource
    private ProductInfoService productService;
    @Resource
    private ProductFeeConfigService productFeeConfigService;

    @Override
    public List<CommissionFeeDTO> calProductFee(ProductInfo productInfo) {
        //用于计算费用计算到哪个时间点截止
        String dateNow = DateUtil.toString(new Date(), DateUtil.yyyy_MM_dd);
        //查询费用计算阶段
        List<ProductDTO> productDtoList = productService.queryProductDivideDateInfo(productInfo.getProductId());
        //查询产品费率维护配置
        ProductFeeConfigInfo productFeeConfigInfo = productFeeConfigService.queryProductFeeConfigInfoByPId(productInfo.getProductId());

        TradeDetailInfoCond tradeDetailInfoCond = new TradeDetailInfoCond();
        BeanUtil.copyProperties(productInfo, tradeDetailInfoCond);

        Iterator iter = productDtoList.iterator();
        ProductDTO productDTO = null;
        String startDate = null;
        String endDate = null;
        List<TradeDetailInfo> tradeDetailInfoList = null;
        TradeDetailInfo tradeDetailInfo = null;
        //承销费
        double consignmentFeeTemp = 0;
        double consignmentFeeSum = 0;
        //管理费
        double managementFeeTemp = 0;
        double managementFeeSum = 0;
        //备案费
        double registrationFeeTemp = 0;
        double registrationFeeSum = 0;

        List<CommissionFeeDTO> commissionFeeDTOList = new ArrayList<CommissionFeeDTO>();
        CommissionFeeDTO commissionFeeDTO = null;
        while (iter.hasNext()) {
            //承销费初始化
            consignmentFeeTemp = 0;
            consignmentFeeSum = 0;
            //管理费初始化
            managementFeeTemp = 0;
            managementFeeSum = 0;
            //备案费初始化
            registrationFeeTemp = 0;
            registrationFeeSum = 0;

            commissionFeeDTO = new CommissionFeeDTO(productInfo.getProductId(), productInfo.getProductName());
            productDTO = (ProductDTO) iter.next();
            startDate = productDTO.gettBeginDate();
            endDate = productDTO.gettEndDate();

            tradeDetailInfoCond.setStartDate(startDate);
            //查询每一个T日下的认购金额(当前日期下未赎回的认购金额+赎回日期晚于查询日期的台账记录)
            tradeDetailInfoList = tradeDetailService.queryProductFeeList(tradeDetailInfoCond);
            if (!ValidateUtil.isNull(tradeDetailInfoList) && dateNow.compareTo(startDate) >= 0) {
                for (int i = 0; i < tradeDetailInfoList.size(); i++) {
                    tradeDetailInfo = tradeDetailInfoList.get(i);
                    //计算承销费
                    if (productFeeConfigInfo.getConsignmentFeeType().equals(BaseConst.PRODUCT_FEE_CONFIG_CONSIGNMENT_ONE)) {
                        //循环承销费或者不循环承销费，但是是第一期计算承销费
                        if (productFeeConfigInfo.getConsignmentCycleFlag().equals(BaseConst.PRODUCT_FEE_CONFIG_ONE_CYCLE_YES)
                                || (productFeeConfigInfo.getConsignmentCycleFlag().equals(BaseConst.PRODUCT_FEE_CONFIG_ONE_CYCLE_NO) && startDate.equals(productInfo.getQxDate()))) {
                            consignmentFeeTemp = tradeDetailInfo.getBuyMoney() * productFeeConfigInfo.getConsignmentFeeRate() / 100.0;
                        } else {
                            consignmentFeeTemp = 0;
                        }
                    } else if (productFeeConfigInfo.getConsignmentFeeType().equals(BaseConst.PRODUCT_FEE_CONFIG_CONSIGNMENT_YEAR)) {
                        consignmentFeeTemp = tradeDetailInfo.getBuyMoney() * productFeeConfigInfo.getConsignmentFeeRate() * productInfo.getQxDays() / 365.0 / 100.0;
                    } else if (productFeeConfigInfo.getConsignmentFeeType().equals(BaseConst.PRODUCT_FEE_CONFIG_CONSIGNMENT_NONE)) {
                        consignmentFeeTemp = 0;
                    }
                    consignmentFeeSum += consignmentFeeTemp;
                    //计算备案费
                    if (productFeeConfigInfo.getRegistrationFeeType().equals(BaseConst.PRODUCT_FEE_CONFIG_REGISTRATION_ONE)) {
                        //循环备案费或者不循环承销费，但是是第一期计算备案费
                        if (productFeeConfigInfo.getRegistrationCycleFlag().equals(BaseConst.PRODUCT_FEE_CONFIG_ONE_CYCLE_YES)
                                || (productFeeConfigInfo.getRegistrationCycleFlag().equals(BaseConst.PRODUCT_FEE_CONFIG_ONE_CYCLE_NO) && startDate.equals(productInfo.getQxDate()))) {
                            registrationFeeTemp = tradeDetailInfo.getBuyMoney() * productFeeConfigInfo.getRegistrationFeeRate() / 100.0;
                        } else {
                            registrationFeeTemp = 0;
                        }
                    } else if (productFeeConfigInfo.getRegistrationFeeType().equals(BaseConst.PRODUCT_FEE_CONFIG_REGISTRATION_YEAR)) {
                        registrationFeeTemp = tradeDetailInfo.getBuyMoney() * productFeeConfigInfo.getRegistrationFeeRate() * productInfo.getQxDays() / 365.0 / 100.0;
                    } else if (productFeeConfigInfo.getRegistrationFeeType().equals(BaseConst.PRODUCT_FEE_CONFIG_REGISTRATION_NONE)) {
                        registrationFeeTemp = 0;
                    }
                    registrationFeeSum += registrationFeeTemp;
                    //计算管理费
                    if (productFeeConfigInfo.getManagementFeeType().equals(BaseConst.PRODUCT_FEE_CONFIG_MANAGEMENT_ONE)) {
                        //循环管理费或者不循环管理费，但是是第一期计算管理费
                        if (productFeeConfigInfo.getManagementCycleFlag().equals(BaseConst.PRODUCT_FEE_CONFIG_ONE_CYCLE_YES)
                                || (productFeeConfigInfo.getManagementCycleFlag().equals(BaseConst.PRODUCT_FEE_CONFIG_ONE_CYCLE_NO) && startDate.equals(productInfo.getQxDate()))) {
                            managementFeeTemp = tradeDetailInfo.getBuyMoney() * productFeeConfigInfo.getManagementFeeRate() / 100.0;
                        } else {
                            managementFeeTemp = 0;
                        }
                    } else if (productFeeConfigInfo.getManagementFeeType().equals(BaseConst.PRODUCT_FEE_CONFIG_MANAGEMENT_YEAR)) {
                        managementFeeTemp = tradeDetailInfo.getBuyMoney() * productFeeConfigInfo.getManagementFeeRate() * productInfo.getQxDays() / 365.0 / 100.0;
                    } else if (productFeeConfigInfo.getManagementFeeType().equals(BaseConst.PRODUCT_FEE_CONFIG_MANAGEMENT_NONE)) {
                        managementFeeTemp = 0;
                    } else if (productFeeConfigInfo.getConsignmentFeeType().equals(BaseConst.PRODUCT_FEE_CONFIG_MANAGEMENT_TOTAL)) {
                        if (productFeeConfigInfo.getManagementRegistrationFeeFlag().equals(BaseConst.PRODUCT_FEE_CONFIG_MANAGEMENT_REGISTRATION_FlAG_YES)) {
                            managementFeeTemp = tradeDetailInfo.getBuyMoney() * (productFeeConfigInfo.getManagementFeeTotal() - tradeDetailInfo.getRate()) * productInfo.getQxDays() / 365.0 / 100.0 - registrationFeeTemp;
                        } else {
                            managementFeeTemp = tradeDetailInfo.getBuyMoney() * (productFeeConfigInfo.getManagementFeeTotal() - tradeDetailInfo.getRate()) * productInfo.getQxDays() / 365.0 / 100.0;
                        }
                    }
                    managementFeeSum += managementFeeTemp;
                }
            }
            commissionFeeDTO.setStartDate(startDate);
            commissionFeeDTO.setEndDate(endDate);

            if (dateNow.compareTo(startDate) >= 0) {
                //各费用扣除他项费用
                if (productFeeConfigInfo.getConsignmentFeeType().equals(BaseConst.PRODUCT_FEE_CONFIG_CONSIGNMENT_ONE)) {
                    if (productFeeConfigInfo.getConsignmentCycleFlag().equals(BaseConst.PRODUCT_FEE_CONFIG_ONE_CYCLE_YES)
                            || (productFeeConfigInfo.getConsignmentCycleFlag().equals(BaseConst.PRODUCT_FEE_CONFIG_ONE_CYCLE_NO) && startDate.equals(productInfo.getQxDate()))) {
                        consignmentFeeSum = consignmentFeeSum - productFeeConfigInfo.getConsignmentFeeOther();
                    } else {
                        consignmentFeeSum = 0;
                    }
                } else {
                    consignmentFeeSum = consignmentFeeSum - productFeeConfigInfo.getConsignmentFeeOther();
                }

                if (productFeeConfigInfo.getManagementFeeType().equals(BaseConst.PRODUCT_FEE_CONFIG_MANAGEMENT_ONE)) {
                    if (productFeeConfigInfo.getManagementCycleFlag().equals(BaseConst.PRODUCT_FEE_CONFIG_ONE_CYCLE_YES)
                            || (productFeeConfigInfo.getManagementCycleFlag().equals(BaseConst.PRODUCT_FEE_CONFIG_ONE_CYCLE_NO) && startDate.equals(productInfo.getQxDate()))) {
                        managementFeeSum = managementFeeSum - productFeeConfigInfo.getManagementFeeOther();
                    } else {
                        managementFeeSum = 0;
                    }
                } else {
                    managementFeeSum = managementFeeSum - productFeeConfigInfo.getManagementFeeOther();
                }

                if (productFeeConfigInfo.getRegistrationFeeType().equals(BaseConst.PRODUCT_FEE_CONFIG_REGISTRATION_ONE)) {
                    if (productFeeConfigInfo.getRegistrationCycleFlag().equals(BaseConst.PRODUCT_FEE_CONFIG_ONE_CYCLE_YES)
                            || (productFeeConfigInfo.getRegistrationCycleFlag().equals(BaseConst.PRODUCT_FEE_CONFIG_ONE_CYCLE_NO) && startDate.equals(productInfo.getQxDate()))) {
                        registrationFeeSum = registrationFeeSum - productFeeConfigInfo.getRegistrationFeeOther();
                    } else {
                        registrationFeeSum = 0;
                    }
                } else {
                    registrationFeeSum = registrationFeeSum - productFeeConfigInfo.getRegistrationFeeOther();
                }
            } else {
                consignmentFeeSum = 0;
                managementFeeSum = 0;
                registrationFeeSum = 0;
            }

            //DTO各费用赋值
            commissionFeeDTO.setConsignmentFee(consignmentFeeSum);
            commissionFeeDTO.setManagementFee(managementFeeSum);
            commissionFeeDTO.setRegistrationFee(registrationFeeSum);

            commissionFeeDTOList.add(commissionFeeDTO);
        }
        return commissionFeeDTOList;
    }
}
