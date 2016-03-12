package com.hisense.hiatmp.roadnet.dto;

import java.util.Date;

/**
 * Created by Administrator on 2016-2-16.
 */
public class RoadNetLane {

    private String laneno;
    private String direction;
    private String lanetype;
    private String sectionid;
    private String utcsectionid;
    private String intsid;
    private int startmile;
    private int endmile;
    private String nextsection;
    private int relation;
    private String creater;
    private Date createtime;
    private String updater;
    private Date updatetime;
    private String version;

    public String getLaneno() {
        return laneno;
    }

    public void setLaneno(String laneno) {
        this.laneno = laneno;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public String getLanetype() {
        return lanetype;
    }

    public void setLanetype(String lanetype) {
        this.lanetype = lanetype;
    }

    public String getSectionid() {
        return sectionid;
    }

    public void setSectionid(String sectionid) {
        this.sectionid = sectionid;
    }

    public String getUtcsectionid() {
        return utcsectionid;
    }

    public void setUtcsectionid(String utcsectionid) {
        this.utcsectionid = utcsectionid;
    }

    public String getIntsid() {
        return intsid;
    }

    public void setIntsid(String intsid) {
        this.intsid = intsid;
    }

    public int getStartmile() {
        return startmile;
    }

    public void setStartmile(int startmile) {
        this.startmile = startmile;
    }

    public int getEndmile() {
        return endmile;
    }

    public void setEndmile(int endmile) {
        this.endmile = endmile;
    }

    public String getNextsection() {
        return nextsection;
    }

    public void setNextsection(String nextsection) {
        this.nextsection = nextsection;
    }

    public int getRelation() {
        return relation;
    }

    public void setRelation(int relation) {
        this.relation = relation;
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
