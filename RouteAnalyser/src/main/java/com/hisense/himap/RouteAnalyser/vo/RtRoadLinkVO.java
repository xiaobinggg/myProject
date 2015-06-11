package com.hisense.himap.routeAnalyser.vo;

/**
 * Created by hisense on 2015-4-24.
 */
public class RtRoadLinkVO {
    private String roadid;
    private String linkid;
    private String strcoords;
    private String isformatted;


    private String crosspoints;//与其他路段边的交叉点与位置次序，形如 "x,y,pos,x,y,pos"
    private String startPoint; //首节点的位置信息
    private String endPoint;//尾节点的位置信息


    public String getIsformatted() {
        return isformatted;
    }

    public void setIsformatted(String isformatted) {
        this.isformatted = isformatted;
    }

    public String getCrosspoints() {
        return crosspoints;
    }

    public void setCrosspoints(String crosspoints) {
        this.crosspoints = crosspoints;
    }

    public String getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(String startPoint) {
        this.startPoint = startPoint;
    }

    public String getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(String endPoint) {
        this.endPoint = endPoint;
    }

    public String getRoadid() {
        return roadid;
    }

    public void setRoadid(String roadid) {
        this.roadid = roadid;
    }

    public String getLinkid() {
        return linkid;
    }

    public void setLinkid(String linkid) {
        this.linkid = linkid;
    }

    public String getStrcoords() {
        return strcoords;
    }

    public void setStrcoords(String strcoords) {
        this.strcoords = strcoords;
    }

    public void insertCrossPoint(String crossPos){
        if(this.crosspoints.length()<=0){
            this.crosspoints = crossPos;
        }else{
            this.crosspoints +=","+crossPos;
        }
    }
}
