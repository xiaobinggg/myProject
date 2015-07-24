package com.hisense.himap.analyser.vo;

import java.util.List;

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
    private String roadid1;
    private String roadid2;
    private String editstatus;
    private String utcintsid;
    private String viointsid;
    private List<RtLaneVO> laneList;

    public String getEditstatus() {
        return editstatus;
    }

    public void setEditstatus(String editstatus) {
        this.editstatus = editstatus;
    }

    public String getUtcintsid() {
        return utcintsid;
    }

    public void setUtcintsid(String utcintsid) {
        this.utcintsid = utcintsid;
    }

    public String getViointsid() {
        return viointsid;
    }

    public void setViointsid(String viointsid) {
        this.viointsid = viointsid;
    }

    public String getRoadid1() {
        return roadid1;
    }

    public void setRoadid1(String roadid1) {
        this.roadid1 = roadid1;
    }

    public String getRoadid2() {
        return roadid2;
    }

    public void setRoadid2(String roadid2) {
        this.roadid2 = roadid2;
    }

    public List<RtLaneVO> getLaneList() {
        return laneList;
    }

    public void setLaneList(List<RtLaneVO> laneList) {
        this.laneList = laneList;
    }

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
