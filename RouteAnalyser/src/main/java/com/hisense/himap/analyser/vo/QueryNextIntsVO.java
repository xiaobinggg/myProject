package com.hisense.himap.analyser.vo;

/**
 * Created by lxb on 2015/6/3.
 * 下一路口查询功能用到的参数VO
 */
public class QueryNextIntsVO {

    private String pointid;
    private String direction;
    private String laneno;
    private double speed;

    public String getPointid() {
        return pointid;
    }

    public void setPointid(String pointid) {
        this.pointid = pointid;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public String getLaneno() {
        return laneno;
    }

    public void setLaneno(String laneno) {
        this.laneno = laneno;
    }

    public double getSpeed() {
        return speed;
    }

    public void setSpeed(double speed) {
        this.speed = speed;
    }
}
