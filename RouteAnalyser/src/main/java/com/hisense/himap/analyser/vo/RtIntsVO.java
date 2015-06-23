package com.hisense.himap.analyser.vo;

/**
 * Created by lxb on 2015/6/3.
 * 路口VO
 */
public class RtIntsVO {

    private String intsid;
    private String intsname;
    private String xzqh;
    private String longitude;
    private String latitude;
    private String pointids;
    private String nodeid;
    private String crosspoints;


    public String getCrosspoints() {
        return crosspoints;
    }

    public void setCrosspoints(String crosspoints) {
        this.crosspoints = crosspoints;
    }

    public String getNodeid() {
        return nodeid;
    }

    public void setNodeid(String nodeid) {
        this.nodeid = nodeid;
    }

    public String getIntsid() {
        return intsid;
    }

    public void setIntsid(String intsid) {
        this.intsid = intsid;
    }

    public String getIntsname() {
        return intsname;
    }

    public void setIntsname(String intsname) {
        this.intsname = intsname;
    }

    public String getXzqh() {
        return xzqh;
    }

    public void setXzqh(String xzqh) {
        this.xzqh = xzqh;
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

    public String getPointids() {
        return pointids;
    }

    public void setPointids(String pointids) {
        this.pointids = pointids;
    }
}
