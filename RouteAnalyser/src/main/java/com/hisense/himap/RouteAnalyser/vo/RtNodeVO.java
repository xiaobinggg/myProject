package com.hisense.himap.RouteAnalyser.vo;

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

    //动态节点专有属性
    private String arcids;//从动态节点出发的弧段
    private String edistances;//从动态节点出发到达下一结点的距离
    private String pos;//动态节点在弧段中的位置

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
