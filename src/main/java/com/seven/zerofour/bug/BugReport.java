package com.seven.zerofour.bug;

import lombok.Data;

/**
 * Created by guo on 17-3-21.
 */
@Data
public class BugReport {
    private Integer id;
    private String type;
    private String menu;
    private String description;
    private String reporter;
    private String status;
    private String createDate;
    private String modifier;
    private String modifiedDate;
    private String remark;
    private String startDate;
    private String endDate;
    private int start;
    private int limit;
}
