package com.tahone.baton.service;

import com.fasterxml.jackson.databind.deser.Deserializers;
import com.tahone.baton.base.BaseConst;
import com.tahone.baton.cond.ProductPreProfitCond;
import com.tahone.baton.cond.TradeDetailInfoCond;
import com.tahone.baton.dto.CustomerFeeDTO;
import com.tahone.baton.dto.ProductDTO;
import com.tahone.baton.model.*;
import com.tahone.baton.utils.BeanUtil;
import com.tahone.baton.utils.DateUtil;
import com.tahone.baton.utils.ValidateUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * Created by yteng on 2017/1/9.
 */
@Service
@Slf4j
public class CustomerFeeServiceImpl implements CustomerFeeService {
    @Resource
    private TradeDetailService tradeDetailService;
    @Resource
    private ProductInfoService productService;
    @Resource
    private ProductPreProfitService productPreProfitService;
    @Resource
    private RateInfoService rateInfoService;

    @Override
    public List<CustomerFeeDTO> calCustomerFee(TradeDetailInfoCond tradeDetailInfoCond) {
        //活期利息
        Double currentFee = 0.0;
        //利息
        Double interestFee = 0.0;
        //本息和
        Double capitalFee = 0.0;
        //活期利息天数
        int currentFeeDays = 0;
        //利息天数
        int interestFeeDays = 0;
        //活期利率
        double depositsRate = 0.0;
        //产品认购收益率
        double productPreProfitRate = 0.0;

        ProductDTO productDTO = null;
        String startDate = null;
        String endDate = null;
        //String qxDateTemp = null;
        //String dqDateTemp = null;
        List<TradeDetailInfo> tradeDetailInfoList = null;

        ProductPreProfitCond productPreProfitCond = new ProductPreProfitCond(tradeDetailInfoCond.getProductId(), tradeDetailInfoCond.getProductName());

        CustomerFeeDTO customerFeeDTO = null;
        List<CustomerFeeDTO> customerFeeDTOList = new ArrayList<CustomerFeeDTO>();

        //用于计算费用计算到哪个时间点截止
        String dateNow = DateUtil.toString(new Date(), DateUtil.yyyy_MM_dd);
        //查询费用计算阶段
        List<ProductDTO> productDtoList = productService.queryProductDivideDateInfo(tradeDetailInfoCond.getProductId());
        //查询产品费率维护配置
        ProductInfo productInfo = productService.queryProductInfoByPId(tradeDetailInfoCond.getProductId());
        //查询活期利率信息
        RateInfo rateInfo = rateInfoService.queryRateInfoByDate(tradeDetailInfoCond.getTransDate());

        TradeDetailInfo tradeDetailInfo = tradeDetailService.findById(tradeDetailInfoCond.getId());

        //用于存放每一个阶段共性的客户基础信息，后计算的对象共性直接从该对象复制即可
        CustomerFeeDTO customerFeeDTOTemp = new CustomerFeeDTO(tradeDetailInfo.getAccountName(), tradeDetailInfo.getCardNo(),
                tradeDetailInfo.getIdCardType(), tradeDetailInfo.getIdCardNo(), productInfo.getProductId(), productInfo.getProductName());

        if (productInfo.getDepositsFlag().equals(BaseConst.DEPOSITS_FLAG_YES)) {
            //计算活期
            currentFeeDays = DateUtil.daysBetweenTwoDatesStr(tradeDetailInfo.getTransDate(), productInfo.getQxDate());
            depositsRate = rateInfo.getRate();
            currentFee = currentFeeDays * depositsRate * tradeDetailInfo.getBuyMoney() * BaseConst.PERCENT_RATIO;
        }

        if (productInfo.getRedeemOpenType().equals(BaseConst.REDEEM_OPEN_TYPE_NO)) {
            //不开放类型类型客户收益计算规则,再进行结息类型一次性还本付息 还是按季度进行3/21 6/21 9/21 12/21
            //不开放类型产品中不会出现分阶段的产品
            if (productInfo.getJxType().equals(BaseConst.JXTYPE_ONE_TIME)) {
                //一次性还本付息
                interestFeeDays = DateUtil.daysBetweenTwoDatesStr(productInfo.getDqDate(), productInfo.getQxDate());
                interestFee = tradeDetailInfo.getBuyMoney() * tradeDetailInfo.getRate() * interestFeeDays * BaseConst.PERCENT_RATIO / BaseConst.YEAR_DAYS;
                capitalFee = interestFee + tradeDetailInfo.getBuyMoney();
                customerFeeDTO = new CustomerFeeDTO();
                BeanUtil.copyProperties(customerFeeDTOTemp, customerFeeDTO);
                customerFeeDTO.setStartDate(productInfo.getQxDate());
                customerFeeDTO.setEndDate(productInfo.getDqDate());
                customerFeeDTO.setCurrentFee(currentFee);
                customerFeeDTO.setInterestFee(interestFee);
                customerFeeDTO.setCapitalFee(capitalFee);
                customerFeeDTOList.add(customerFeeDTO);
            } else if (productInfo.getJxType().equals(BaseConst.JXTYPE_SEASON)) {
                //按季度3/21 6/21 9/21 12/21，此时该产品不可能为分阶段的产品
                String qxDate = productInfo.getQxDate();
                String dqDate = productInfo.getDqDate();
                startDate = qxDate;
                if (BaseConst.JXTIME_MARCH.compareTo(qxDate.substring(5, 10)) >= 0) {
                    endDate = qxDate.substring(0, 5) + BaseConst.JXTIME_MARCH;
                } else if (BaseConst.JXTIME_JUNE.compareTo(qxDate.substring(5, 10)) >= 0) {
                    endDate = qxDate.substring(0, 5) + BaseConst.JXTIME_JUNE;
                } else if (BaseConst.JXTIME_SEP.compareTo(qxDate.substring(5, 10)) >= 0) {
                    endDate = qxDate.substring(0, 5) + BaseConst.JXTIME_SEP;
                } else if (BaseConst.JXTIME_DEC.compareTo(qxDate.substring(5, 10)) >= 0) {
                    endDate = qxDate.substring(0, 5) + BaseConst.JXTIME_DEC;
                }

                while (endDate.compareTo(dqDate) <= 0) {
                    interestFeeDays = DateUtil.daysBetweenTwoDatesStr(startDate, endDate);

                    interestFee = tradeDetailInfo.getBuyMoney() * tradeDetailInfo.getRate() * interestFeeDays * BaseConst.PERCENT_RATIO / BaseConst.YEAR_DAYS;
                    //进行费用计算
                    customerFeeDTO = new CustomerFeeDTO();
                    BeanUtil.copyProperties(customerFeeDTOTemp, customerFeeDTO);
                    customerFeeDTO.setStartDate(startDate);
                    customerFeeDTO.setEndDate(endDate);
                    //第一期
                    if (startDate.equals(productInfo.getQxDate())) {
                        customerFeeDTO.setCurrentFee(currentFee);
                    } else {
                        customerFeeDTO.setCurrentFee(0.0);
                    }
                    //最后一期
                    if (endDate.equals(productInfo.getDqDate())) {
                        customerFeeDTO.setCapitalFee(tradeDetailInfo.getBuyMoney() + interestFee);
                    } else {
                        customerFeeDTO.setCapitalFee(interestFee);
                    }
                    customerFeeDTO.setInterestFee(interestFee);
                    customerFeeDTOList.add(customerFeeDTO);

                    startDate = endDate;
                    endDate = DateUtil.toString(DateUtil.getIntervalDate(DateUtil.toDate(startDate, DateUtil.yyyy_MM_dd),
                            DateUtil.AFTER, BaseConst.SEASON_INTERVAL_MONTH), DateUtil.yyyy_MM_dd);
                }
                if (endDate.compareTo(dqDate) > 0) {
                    endDate = dqDate;
                    //计算最后一个周期的收益
                    interestFeeDays = DateUtil.daysBetweenTwoDatesStr(startDate, endDate);
                    interestFee = tradeDetailInfo.getBuyMoney() * tradeDetailInfo.getRate() * interestFeeDays * BaseConst.PERCENT_RATIO / BaseConst.YEAR_DAYS;
                    //进行费用计算
                    customerFeeDTO = new CustomerFeeDTO();
                    BeanUtil.copyProperties(customerFeeDTOTemp, customerFeeDTO);
                    customerFeeDTO.setStartDate(startDate);
                    customerFeeDTO.setEndDate(endDate);
                    //第一期
                    if (startDate.equals(productInfo.getQxDate())) {
                        customerFeeDTO.setCurrentFee(currentFee);
                    } else {
                        customerFeeDTO.setCurrentFee(0.0);
                    }
                    //最后一期
                    if (endDate.equals(productInfo.getDqDate())) {
                        customerFeeDTO.setCapitalFee(tradeDetailInfo.getBuyMoney() + interestFee);
                    } else {
                        customerFeeDTO.setCapitalFee(interestFee);
                    }
                    customerFeeDTO.setInterestFee(interestFee);
                    customerFeeDTOList.add(customerFeeDTO);
                }
            }
        } else if (productInfo.getRedeemOpenType().equals(BaseConst.REDEEM_OPEN_TYPE_YES)) {
            //赎回开放类型，则计算是注意是否分阶段和不分阶段的预期收益率，
            // 预期收益率从台账信息中取，如果台账信息中没有配置，则进行自动预期收益率中获取
            //每一个T阶段的计息天数获取
            if (productInfo.getOpenRedeemPeriod().equals(BaseConst.OPEN_REDEEM_PERIOD_DAY)) {
                interestFeeDays = productInfo.getTDays().intValue();
            } else if (productInfo.getOpenRedeemPeriod().equals(BaseConst.OPEN_REDEEM_PERIOD_MONTH)) {
                interestFeeDays = BaseConst.OPEN_REDEEM_PERIOD_MONTH_DAYS;
            } else if (productInfo.getOpenRedeemPeriod().equals(BaseConst.OPEN_REDEEM_PERIOD_SEASON)) {
                interestFeeDays = BaseConst.OPEN_REDEEM_PERIOD_SEASON_DAYS;
            } else if (productInfo.getOpenRedeemPeriod().equals(BaseConst.OPEN_REDEEM_PERIOD_HALF_YEAR)) {
                interestFeeDays = BaseConst.OPEN_REDEEM_PERIOD_HALF_YEAR_DAYS;
            } else if (productInfo.getOpenRedeemPeriod().equals(BaseConst.OPEN_REDEEM_PERIOD_YEAR)) {
                interestFeeDays = BaseConst.OPEN_REDEEM_PERIOD_YEAR_DAYS;
            }

            Iterator iter = productDtoList.iterator();
            while (iter.hasNext()) {
                customerFeeDTO = new CustomerFeeDTO();
                BeanUtil.copyProperties(customerFeeDTOTemp, customerFeeDTO);

                productDTO = (ProductDTO) iter.next();
                startDate = productDTO.gettBeginDate();
                endDate = productDTO.gettEndDate();
                if (productInfo.getDividePhaseFlag().equals(BaseConst.PRODUCT_DIVIDE_PHASE_YES)) {
                    productPreProfitCond.setPreprofitDate(startDate);
                    productPreProfitCond.setPreprofitMoney(tradeDetailInfo.getBuyMoney());
                    ProductPreProfit productPreProfit = productPreProfitService.queryProductPreProfitByBetweenDates(productPreProfitCond);
                    productPreProfitRate = productPreProfit.getRate();
                } else if (productInfo.getDividePhaseFlag().equals(BaseConst.PRODUCT_DIVIDE_PHASE_NO)) {
                    productPreProfitRate = tradeDetailInfo.getRate();
                }
                //该记录目前赎回状态为未赎回,则推断所有时间的利息，每一T阶段的利息计算
                interestFee = tradeDetailInfo.getBuyMoney() * productPreProfitRate * interestFeeDays * BaseConst.PERCENT_RATIO / BaseConst.YEAR_DAYS;

                customerFeeDTO.setStartDate(startDate);
                customerFeeDTO.setEndDate(endDate);

                if (tradeDetailInfo.getRedeemFlag().equals(BaseConst.TRADE_REDEEM_FLAG_NO)) {
                    //第一期
                    if (startDate.equals(productInfo.getQxDate())) {
                        customerFeeDTO.setCurrentFee(currentFee);
                    } else {
                        customerFeeDTO.setCurrentFee(0.0);
                    }
                    //最后一期
                    if (endDate.equals(productInfo.getDqDate())) {
                        customerFeeDTO.setCapitalFee(tradeDetailInfo.getBuyMoney() + interestFee);
                    } else {
                        customerFeeDTO.setCapitalFee(interestFee);
                    }
                    //每一阶段均需要计算利息
                    customerFeeDTO.setInterestFee(interestFee);

                } else if (tradeDetailInfo.getRedeemFlag().equals(BaseConst.TRADE_REDEEM_FLAG_YES)) {
                    //该记录目前赎回状态为已赎回,则分赎回前阶段和赎回后阶段
                    if (tradeDetailInfo.getOprRedeemDate().compareTo(startDate) >= 0 && tradeDetailInfo.getOprRedeemDate().compareTo(endDate) < 0) {
                        //本期为赎回阶段
                        //第一期
                        if (startDate.equals(productInfo.getQxDate())) {
                            customerFeeDTO.setCurrentFee(currentFee);
                        } else {
                            customerFeeDTO.setCurrentFee(0.0);
                        }
                        customerFeeDTO.setInterestFee(interestFee);
                        customerFeeDTO.setCapitalFee(tradeDetailInfo.getBuyMoney() + interestFee);
                    } else if (tradeDetailInfo.getOprRedeemDate().compareTo(endDate) >= 0) {
                        //赎回前阶段
                        if (startDate.equals(productInfo.getQxDate())) {
                            customerFeeDTO.setCurrentFee(currentFee);
                        } else {
                            customerFeeDTO.setCurrentFee(0.0);
                        }
                        customerFeeDTO.setInterestFee(interestFee);
                        customerFeeDTO.setCapitalFee(interestFee);
                    } else if (tradeDetailInfo.getOprRedeemDate().compareTo(startDate) < 0) {
                        //赎回后的阶段
                        customerFeeDTO.setCurrentFee(0.0);
                        customerFeeDTO.setInterestFee(0.0);
                        customerFeeDTO.setCapitalFee(0.0);
                    }
                }
                customerFeeDTOList.add(customerFeeDTO);
            }
        }
        return customerFeeDTOList;
    }
}
