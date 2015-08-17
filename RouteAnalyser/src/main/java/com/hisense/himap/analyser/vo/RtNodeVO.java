package com.hisense.himap.analyser.vo;

/**
 * 节点VO
 */
public class RtNodeVO {
    private String nodeid;
    private String x;
    private String y;
    private String instid;//路口编号
    private String distance;
    private String pointids;//安装点编
    private String utcintsids;

    //动态节点专有属性
    private String dnodeid;
    private String dnodename;
    private String pointid;
    private String arcids;//从动态节点出发的弧段
    private String edistances;//从动态节点出发到达下一结点的距离
    private String pos;//动态节点在弧段中的位置
    private String pointcode;
    private String pointname;
    private String dldm;
    private String lkdm;
    private String ddms;

    public String getUtcintsids() {
        return utcintsids;
    }

    public void setUtcintsids(String utcintsids) {
        this.utcintsids = utcintsids;
    }

    public String getDnodeid() {
        return dnodeid;
    }

    public void setDnodeid(String dnodeid) {
        this.dnodeid = dnodeid;
    }

    public String getDnodename() {
        return dnodename;
    }

    public void setDnodename(String dnodename) {
        this.dnodename = dnodename;
    }

    public String getPointid() {
        return pointid;
    }

    public void setPointid(String pointid) {
        this.pointid = pointid;
    }

    public String getPointcode() {
        return pointcode;
    }

    public void setPointcode(String pointcode) {
        this.pointcode = pointcode;
    }

    public String getPointname() {
        return pointname;
    }

    public void setPointname(String pointname) {
        this.pointname = pointname;
    }

    public String getDldm() {
        return dldm;
    }

    public void setDldm(String dldm) {
        this.dldm = dldm;
    }

    public String getLkdm() {
        return lkdm;
    }

    public void setLkdm(String lkdm) {
        this.lkdm = lkdm;
    }

    public String getDdms() {
        return ddms;
    }

    public void setDdms(String ddms) {
        this.ddms = ddms;
    }

    public String getPos() {
        return pos;
    }

    public void setPos(String pos) {
        this.pos = pos;
    }

    public String getEdistances() {
        return edistances;
    }

    public void setEdistances(String edistances) {
        this.edistances = edistances;
    }

    public String getDistance() {
        return distance;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    public String getNodeid() {
        return nodeid;
    }

    public void setNodeid(String nodeid) {
        this.nodeid = nodeid;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getInstid() {
        return instid;
    }

    public void setInstid(String instid) {
        this.instid = instid;
    }

    public String getArcids() {
        return arcids;
    }

    public void setArcids(String arcids) {
        this.arcids = arcids;
    }

    public String getPointids() {
        return pointids;
    }

    public void setPointids(String pointids) {
        this.pointids = pointids;
    }
}
