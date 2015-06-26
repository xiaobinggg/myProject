package com.hisense.himap.analyser.vo;

/**
 * Created by lxb on 2015-4-20.
 */
public class RtArcVO {
    private String arcid;
    private String arcname;
    private String arclength;
    private String startnode;
    private String endnode;
    private String strcoords;
    private int direction;
    private String roadid;
    private String linkid;


    public String getLinkid() {
        return linkid;
    }

    public void setLinkid(String linkid) {
        this.linkid = linkid;
    }

    public String getRoadid() {
        return roadid;
    }

    public void setRoadid(String roadid) {
        this.roadid = roadid;
    }

    public String getArcid() {
        return arcid;
    }

    public void setArcid(String arcid) {
        this.arcid = arcid;
    }

    public String getArcname() {
        return arcname;
    }

    public void setArcname(String arcname) {
        this.arcname = arcname;
    }

    public String getArclength() {
        return arclength;
    }

    public void setArclength(String arclength) {
        this.arclength = arclength;
    }

    public String getStartnode() {
        return startnode;
    }

    public void setStartnode(String startnode) {
        this.startnode = startnode;
    }

    public String getEndnode() {
        return endnode;
    }

    public void setEndnode(String endnode) {
        this.endnode = endnode;
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


}
