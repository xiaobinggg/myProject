package com.hisense.hiatmp.roadnet.dto;

import java.util.Date;

/**
 * Created by liuxiaobing on 2016-2-2.
 * 道路传输模型类
 */
public class RoadNetRoad {

    private String roadcode;
    private String roadname;
    private int roadtype;
	private String strcoords;
	private Long roadlength;
	private String creater;
	private Date createtime;
	private String updater;
	private Date updatetime;
	private String version;

    public String getRoadcode() {
        return roadcode;
    }

    public void setRoadcode(String roadcode) {
        this.roadcode = roadcode;
    }

    public String getRoadname() {
        return roadname;
    }

    public void setRoadname(String roadname) {
        this.roadname = roadname;
    }

    public int getRoadtype() {
        return roadtype;
    }

    public void setRoadtype(int roadtype) {
        this.roadtype = roadtype;
    }

    public String getStrcoords() {
        return strcoords;
    }

    public void setStrcoords(String strcoords) {
        this.strcoords = strcoords;
    }

    public Long getRoadlength() {
        return roadlength;
    }

    public void setRoadlength(Long roadlength) {
        this.roadlength = roadlength;
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
