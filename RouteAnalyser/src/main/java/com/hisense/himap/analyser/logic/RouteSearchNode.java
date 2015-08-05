package com.hisense.himap.analyser.logic;


import com.hisense.himap.analyser.astar.ASearchNode;
import com.hisense.himap.analyser.astar.ISearchNode;
import com.hisense.himap.analyser.vo.RtArcVO;
import com.hisense.himap.analyser.vo.RtNodeVO;
import com.hisense.himap.utils.GISUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by lxb on 2015-5-6.
 */

public class RouteSearchNode extends ASearchNode {
    private double x;
    private double y;
    private RouteSearchNode parent;
    private RouteGoalNode goal;
    private double distance;
    private String strcoords;
    private static double _C_P = 0.0174532925199432957692222222222;

    public RouteSearchNode(Double x,Double y,RouteSearchNode parent,Double distance,String strcoords,RouteGoalNode goal){
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.goal = goal;
        this.strcoords = strcoords;
        this.distance = distance;

    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public String getStrcoords() {
        return strcoords;
    }

    public void setStrcoords(String strcoords) {
        this.strcoords = strcoords;
    }

    public double h() {
        return this.dist(goal.getX(), goal.getY());
    }

    public double dist(double otherX, double otherY) {

        double dlon = (otherX - this.x) * _C_P;
        double dlat = (otherY - this.y) * _C_P;
        double a = Math.sin(0.5 * dlat) * Math.sin(0.5 * dlat) + Math.cos(this.y * _C_P) * Math.cos(otherY * _C_P) * (Math.sin(0.5 * dlon) * Math.sin(0.5 * dlon));
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

    
    public double c(ISearchNode successor) {
        if(successor instanceof RouteSearchNode){
            RouteSearchNode searchNode = (RouteSearchNode) successor;
            return searchNode.getDistance();
        }
        return 0;
    }

    
    public ArrayList<ISearchNode> getSuccessors() {

        ArrayList<ISearchNode> successors = new ArrayList<ISearchNode>();

        RtNodeVO node = new RtNodeVO();
        node.setNodeid(GISUtils.formatPos(Double.toString(this.getX()),4)+","+GISUtils.formatPos(Double.toString(this.getY()),5));
        List<RtArcVO> arclist = MemRouteData.getRtArcByStartNode(node);
        for(RtArcVO arc:arclist){
            if(arc.getStartnode().equalsIgnoreCase(arc.getEndnode())){
                continue;
            }
            String [] nextnode = arc.getEndnode().split(",");
            Double x = Double.parseDouble(nextnode[0]);
            Double y = Double.parseDouble(nextnode[1]);

            RouteSearchNode searchNode = new RouteSearchNode(x,y,this,Double.parseDouble(arc.getArclength()),arc.getStrcoords(),this.goal);
            successors.add(searchNode);
        }
        return successors;
    }

    
    public ISearchNode getParent() {
        return this.parent;
    }

    
    public void setParent(ISearchNode parent) {
        this.parent = (RouteSearchNode) parent;
    }



    
    public Integer keyCode() {
        return null;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setParent(RouteSearchNode parent) {
        this.parent = parent;
    }

    public RouteGoalNode getGoal() {
        return goal;
    }

    public void setGoal(RouteGoalNode goal) {
        this.goal = goal;
    }

    public double getDistance() {
        return distance;
    }
    public String toString(){
        return this.getX()+","+this.getY();
    }
}
