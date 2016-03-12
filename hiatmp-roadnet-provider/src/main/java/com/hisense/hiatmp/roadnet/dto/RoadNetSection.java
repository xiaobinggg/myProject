package com.hisense.hiatmp.roadnet.dto;

import java.util.Date;

/**
 * Created by liuxiaobing on 2016-2-4.
 * 路段传输模型类，分为信号路段和路况路段，用sectiontype区分
 */
public class RoadNetSection {

    private String sectionid;
    private String sectionname;
    private String uppints;
    private String downints;
    private String oppsection;
    private String roadtype;
    private Long width;
    private Long length;
    private String strcoords;
    private int direction;
    private Boolean logicdel;
    private int fireespeed;
    private int ryspeed;
    private int ygspeed;
    private String hotpressure;
    private String norpressure;
    private String lowpressure;
    private int sectiontype;
    private String sections;
    private int toplevel;
    private String creater;
    private Date createtime;
    private String updater;
    private Date updatetime;
    private String version;

    public String getSectionid() {
        return sectionid;
    }

    public void setSectionid(String sectionid) {
        this.sectionid = sectionid;
    }

    public String getSectionname() {
        return sectionname;
    }

    public void setSectionname(String sectionname) {
        this.sectionname = sectionname;
    }

    public String getUppints() {
        return uppints;
    }

    public void setUppints(String uppints) {
        this.uppints = uppints;
    }

    public String getDownints() {
        return downints;
    }

    public void setDownints(String downints) {
        this.downints = downints;
    }

    public String getOppsection() {
        return oppsection;
    }

    public void setOppsection(String oppsection) {
        this.oppsection = oppsection;
    }

    public String getRoadtype() {
        return roadtype;
    }

    public void setRoadtype(String roadtype) {
        this.roadtype = roadtype;
    }

    public Long getWidth() {
        return width;
    }

    public void setWidth(Long width) {
        this.width = width;
    }

    public Long getLength() {
        return length;
    }

    public void setLength(Long length) {
        this.length = length;
    }

    public String getStrcoords() {
        return strcoords;
    }

    public void setStrcoords(String strcoords) {
        this.strcoords = strcoords;
    }

    public int getDirection() {
        return direction;
    }

    public void setDirection(int direction) {
        this.direction = direction;
    }

    public Boolean getLogicdel() {
        return logicdel;
    }

    public void setLogicdel(Boolean logicdel) {
        this.logicdel = logicdel;
    }

    public int getFireespeed() {
        return fireespeed;
    }

    public void setFireespeed(int fireespeed) {
        this.fireespeed = fireespeed;
    }

    public int getRyspeed() {
        return ryspeed;
    }

    public void setRyspeed(int ryspeed) {
        this.ryspeed = ryspeed;
    }

    public int getYgspeed() {
        return ygspeed;
    }

    public void setYgspeed(int ygspeed) {
        this.ygspeed = ygspeed;
    }

    public String getHotpressure() {
        return hotpressure;
    }

    public void setHotpressure(String hotpressure) {
        this.hotpressure = hotpressure;
    }

    public String getNorpressure() {
        return norpressure;
    }

    public void setNorpressure(String norpressure) {
        this.norpressure = norpressure;
    }

    public String getLowpressure() {
        return lowpressure;
    }

    public void setLowpressure(String lowpressure) {
        this.lowpressure = lowpressure;
    }

    public int getSectiontype() {
        return sectiontype;
    }

    public void setSectiontype(int sectiontype) {
        this.sectiontype = sectiontype;
    }

    public String getSections() {
        return sections;
    }

    public void setSections(String sections) {
        this.sections = sections;
    }

    public int getToplevel() {
        return toplevel;
    }

    public void setToplevel(int toplevel) {
        this.toplevel = toplevel;
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
