package com.hisense.himap.utils;

import java.text.DecimalFormat;

/**
 * Created by Administrator on 2015-6-19.
 */
public class GISUtils {
    private static double _C_P = 0.0174532925199432957692222222222;

    /**
     * 计算两个坐标点之间的距离
     *
     * @param fromx
     * @param fromy
     * @param otherX
     * @param otherY
     * @return
     */
    public static double dist(double fromx, double fromy, double otherX, double otherY) {

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

    public static double dist(String from,String to) {
        double fromx = Double.parseDouble(from.split(",")[0]);
        double fromy = Double.parseDouble(from.split(",")[1]);

        double otherX = Double.parseDouble(to.split(",")[0]);
        double otherY = Double.parseDouble(to.split(",")[1]);
        return GISUtils.dist(fromx, fromy, otherX, otherY);

    }

    /**
     * 计算两条路段的交叉点
     *
     * @param segm1 路段1坐标
     * @param segm2 路段2坐标
     * @return 交叉点坐标
     */
    public static String getIntersection(String segm1, String segm2) {
        String intersection = "";

        //@TODO 下面是穷举法，效率较低，待改善算法
        String[] segment1 = segm1.split(",");
        String[] segment2 = segm2.split(",");
        if (segment1.length < 4 || segment2.length < 4) {
            return (segment1.length < 4 ? segm1 : segm2);
        }
        Double x1 = Double.parseDouble(segment1[0]);
        Double y1 = Double.parseDouble(segment1[1]);
        if (segm2.indexOf(segment1[0] + "," + segment1[1]) >= 0) {
            return GISUtils.formatPos(segment1[0]) + "," + GISUtils.formatPos(segment1[1]);
        }
        Double a, ma, b, mb;
        for (int i = 1; i < segment1.length / 2; i++) {
            Double x2 = Double.parseDouble(segment1[i * 2]);
            Double y2 = Double.parseDouble(segment1[i * 2 + 1]);
            if (segm2.indexOf(segment1[i * 2] + "," + segment1[i * 2 + 1]) >= 0) {
                return GISUtils.formatPos(segment1[i * 2]) + "," + GISUtils.formatPos(segment1[i * 2 + 1]);
            }

            Double mx1 = Double.parseDouble(segment2[0]);
            Double my1 = Double.parseDouble(segment2[1]);
            for (int j = 1; j < segment2.length / 2; j++) {
                Double mx2 = Double.parseDouble(segment2[j * 2]);
                Double my2 = Double.parseDouble(segment2[j * 2 + 1]);
                Double minx = x1 > x2 ? x2 : x1;
                Double maxx = x1 > x2 ? x1 : x2;
                Double miny = y1 > y2 ? y2 : y1;
                Double maxy = y1 > y2 ? y1 : y2;

                Double minmx = mx1 > mx2 ? mx2 : mx1;
                Double maxmx = mx1 > mx2 ? mx1 : mx2;
                Double minmy = my1 > my2 ? my2 : my1;
                Double maxmy = my1 > my2 ? my1 : my2;

                if (x2 - x1 == 0d) {
                    if (mx1 - mx2 == 0d) {
                        continue;
                    } else {
                        ma = (my1 - my2) / (mx1 - mx2);
                        mb = my1 - ma * mx1;
                        Double x = x1;
                        Double y = ma * x1 + mb;
                        if (x <= maxx && x >= minx && x <= maxmx && x >= minmx && y <= maxy && y >= miny && y <= maxmy && y >= minmy) {
                            intersection = GISUtils.formatPos(Double.toString(x)) + "," + GISUtils.formatPos(Double.toString(y));
                            return intersection;
                        }
                    }
                } else if (mx1 - mx2 == 0d) {
                    if (x1 - x2 == 0d) {
                        continue;
                    } else {
                        a = (y1 - y2) / (x1 - x2);
                        b = y1 - a * x1;
                        Double x = x1;
                        Double y = a * x1 + b;
                        if (x <= maxx && x >= minx && x <= maxmx && x >= minmx && y <= maxy && y >= miny && y <= maxmy && y >= minmy) {
                            intersection = GISUtils.formatPos(Double.toString(x)) + "," + GISUtils.formatPos(Double.toString(y));
                            return intersection;
                        }
                    }
                } else {
                    a = (y1 - y2) / (x1 - x2);
                    b = y1 - a * x1;
                    ma = (my1 - my2) / (mx1 - mx2);
                    mb = my1 - ma * mx1;
                    if (a - ma == 0d) {
                        continue;
                    }
                    Double x = (mb - b) / (a - ma);
                    Double y = a * x + b;
                    if (x <= maxx && x >= minx && x <= maxmx && x >= minmx && y <= maxy && y >= miny && y <= maxmy && y >= minmy) {
                        intersection = GISUtils.formatPos(Double.toString(x)) + "," + GISUtils.formatPos(Double.toString(y));
                        return intersection;
                    }
                }
                mx1 = mx2;
                my1 = my2;
            }
            x1 = x2;
            y1 = y2;
        }


        return intersection;
    }

    /**
     * 坐标格式化方法 保留小数点后五位，四舍五入
     *
     * @param pos
     * @return
     */
    public static String formatPos(String pos) {
        DecimalFormat decimalFormat = new DecimalFormat(".0000");

        return decimalFormat.format(Double.parseDouble(pos));

    }

    /**
     * 计算路段长度
     *
     * @param coordinates 路段的坐标点集合
     * @return
     */
    public static final Double getRoadLength(String coordinates) {
        Double result = 0d;
        String[] points = coordinates.split(",");
        if (points.length < 4) {
            return 0d;
        }
        Double fromx = Double.parseDouble(points[0]);
        Double fromy = Double.parseDouble(points[1]);
        for (int i = 1; i < points.length / 2; i++) {
            Double tox = Double.parseDouble(points[i * 2]);
            Double toy = Double.parseDouble(points[i * 2 + 1]);
            result += GISUtils.dist(fromx, fromy, tox, toy);
            fromx = tox;
            fromy = toy;
        }
        return Double.parseDouble(GISUtils.formatPos(Double.toString(result)));
    }

    /**
     * 计算指定路段的进口道方向
     *
     * @param coordinates
     * @return
     */
    public static final int getDirection(String coordinates) {
        int direction = 0;
        String[] points = coordinates.split(",");
        if (points.length < 4) {
            return direction;
        }
        Double x1 = Double.parseDouble(points[0]);
        Double y1 = Double.parseDouble(points[1]);
        Double x2 = Double.parseDouble(points[2]);
        Double y2 = Double.parseDouble(points[3]);
        if (x1 - x2 == 0d) {
            if (y2 > y1) {
                direction = 3;
            } else {
                direction = 4;
            }
        } else if (y1 - y2 == 0d) {
            if (x2 > x1) {
                direction = 2;
            } else {
                direction = 1;
            }
        } else {
            Double a = (y2 - y1) / (x2 - x1);
            if(a>=-0.577 && a<0.577){
                if(x1<x2){
                    direction = 2;
                }else{
                    direction = 1;
                }
            }else if(a>=0.577 && a<1.732){
                if (x1<x2){
                    direction = 6;
                }else{
                    direction = 5;
                }
            }else if(a>=1.732 || a<-1.732){
                if(y1<y2){
                    direction = 3;
                }else{
                    direction = 4;
                }
            }else if(a>=-1.732 && a<-0.577){
                if(x1<x2){
                    direction = 8;
                }else{
                    direction = 7;
                }
            }
        }
        return direction;
    }

}
