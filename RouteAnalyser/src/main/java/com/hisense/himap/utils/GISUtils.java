package com.hisense.himap.utils;

/**
 * Created by Administrator on 2015-6-19.
 */
public class GISUtils {
    private static double _C_P =0.0174532925199432957692222222222;

    /**
     * 计算两个坐标点之间的距离
     * @param fromx
     * @param fromy
     * @param otherX
     * @param otherY
     * @return
     */
    public static double dist(double fromx,double fromy,double otherX, double otherY) {

        double dlon = (otherX - fromx) * _C_P;
        double dlat = (otherY - fromy) * _C_P;
        double a = Math.sin(0.5 * dlat) * Math.sin(0.5 * dlat) + Math.cos(fromy * _C_P) * Math.cos(otherY * _C_P) * (Math.sin(0.5 * dlon) * Math.sin(0.5 * dlon));
        a = Math.abs(a);
        if (a > 1) {
            //alert("不合法数据:" + "a:" + a + ",P1:" + p1.toString() + ",P2:" + p2.toString());
        }
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double d = c * 6371008.77141506;
        //System.out.println("distance:"+this.getDistance()+"---"+d);
        return d;
//        return 0;
        //return Math.sqrt(Math.pow(this.x - otherX, 2) + Math.pow(this.y - otherY, 2));
    }
}
