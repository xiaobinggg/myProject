package com.hisense.himap.analyser.vo;

/**
 * Created by lxb on 2015/6/3.
 * 路口车道VO
 */
public class RtLaneVO {
    private String laneno;
    private String intsid;
    private String direction;
    private int nthrough;
    private int nturnleft;
    private int nturnright;
    private int nturnround;
    private String editflag;//编辑标识 0：添加 1：修改 2：删除

    public int getNturnround() {
        return nturnround;
    }

    public void setNturnround(int nturnround) {
        this.nturnround = nturnround;
    }

    public String getLaneno() {
        return laneno;
    }


    public String getEditflag() {
        return editflag;
    }

    public void setEditflag(String editflag) {
        this.editflag = editflag;
    }

    public void setLaneno(String laneno) {
        this.laneno = laneno;
    }

    public String getIntsid() {
        return intsid;
    }

    public void setIntsid(String intsid) {
        this.intsid = intsid;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public int getNthrough() {
        return nthrough;
    }

    public void setNthrough(int nthrough) {
        this.nthrough = nthrough;
    }

    public int getNturnleft() {
        return nturnleft;
    }

    public void setNturnleft(int nturnleft) {
        this.nturnleft = nturnleft;
    }

    public int getNturnright() {
        return nturnright;
    }

    public void setNturnright(int nturnright) {
        this.nturnright = nturnright;
    }


}
