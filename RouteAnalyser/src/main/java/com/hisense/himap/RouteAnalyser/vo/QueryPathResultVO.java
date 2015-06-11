package com.hisense.himap.routeAnalyser.vo;


/**
 * Created by lxb on 2015/6/3.
 * 路径查询结果VO
 */
public class QueryPathResultVO {


    //经过的路线信息
    private String arcid; //路线编号
    private String arclength; //路线长度
    private String strcoords; //路线坐标
    private String roadid; // 路线所属路段
    private int ndirection; //路线前进方向

    //到达的路口信息
    private String intsid; //路口编号
    private String intsname; //路口名称
    private String longitude; //路口经度
    private String latitude; //路口纬度


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

    public String getArcid() {
        return arcid;
    }

    public void setArcid(String arcid) {
        this.arcid = arcid;
    }

    public String getArclength() {
        return arclength;
    }

    public void setArclength(String arclength) {
        this.arclength = arclength;
    }

    public String getStrcoords() {
        return strcoords;
    }

    public void setStrcoords(String strcoords) {
        this.strcoords = strcoords;
    }

    public String getRoadid() {
        return roadid;
    }

    public void setRoadid(String roadid) {
        this.roadid = roadid;
    }

    public int getNdirection() {
        return ndirection;
    }

    public void setNdirection(int ndirection) {
        this.ndirection = ndirection;
    }

}
