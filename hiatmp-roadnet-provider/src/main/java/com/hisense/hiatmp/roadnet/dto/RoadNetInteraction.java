package com.hisense.hiatmp.roadnet.dto;

import java.util.Date;

/**
 * Created by liuxiaobing on 2016-2-4.
 * 路口传输模型类
 */
public class RoadNetInteraction {
	private String intscode;
	private String roadcode;
	private String intsname;
	private String deptid;
	private int intstype;
	private String longitude;
	private String latitude;
	private int topolevel;
	private String creater;
	private Date createtime;
	private String updater;
	private Date updatetime;
	private String version;

    public String getIntscode() {
        return intscode;
    }

    public void setIntscode(String intscode) {
        this.intscode = intscode;
    }

    public String getRoadcode() {
        return roadcode;
    }

    public void setRoadcode(String roadcode) {
        this.roadcode = roadcode;
    }

    public String getIntsname() {
        return intsname;
    }

    public void setIntsname(String intsname) {
        this.intsname = intsname;
    }

    public String getDeptid() {
        return deptid;
    }

    public void setDeptid(String deptid) {
        this.deptid = deptid;
    }

    public int getIntstype() {
        return intstype;
    }

    public void setIntstype(int intstype) {
        this.intstype = intstype;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public int getTopolevel() {
        return topolevel;
    }

    public void setTopolevel(int topolevel) {
        this.topolevel = topolevel;
    }

    public String getCreater() {
        return creater;
    }

    public void setCreater(String creater) {
        this.creater = creater;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public String getUpdater() {
        return updater;
    }

    public void setUpdater(String updater) {
        this.updater = updater;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
