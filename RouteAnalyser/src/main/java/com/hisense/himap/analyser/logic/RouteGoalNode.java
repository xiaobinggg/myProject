package com.hisense.himap.analyser.logic;


import com.hisense.himap.analyser.astar.IGoalNode;
import com.hisense.himap.analyser.astar.ISearchNode;

/**
 * Created by lxb on 2015-5-6.
 */
public class RouteGoalNode implements IGoalNode {
    private double x;
    private double y;

    public RouteGoalNode(Double x,Double y){
        this.x = x;
        this.y = y;

    }


    public boolean inGoal(ISearchNode other) {
        if(other instanceof RouteSearchNode){
            RouteSearchNode otherNode = (RouteSearchNode) other;
            return (this.x - otherNode.getX() == 0d) && (this.y - otherNode.getY() == 0d);
        }
        return false;
    }


    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

}
