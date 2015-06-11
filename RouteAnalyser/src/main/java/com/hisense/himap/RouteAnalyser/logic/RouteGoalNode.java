package com.hisense.himap.routeAnalyser.logic;


import com.hisense.himap.routeAnalyser.astar.IGoalNode;
import com.hisense.himap.routeAnalyser.astar.ISearchNode;

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


    @Override
    public boolean inGoal(ISearchNode other) {
        if(other instanceof RouteSearchNode){
            RouteSearchNode otherNode = (RouteSearchNode) other;
            return (this.x == otherNode.getX()) && (this.y == otherNode.getY());
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
