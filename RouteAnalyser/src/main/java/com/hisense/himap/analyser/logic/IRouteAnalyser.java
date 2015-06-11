package com.hisense.himap.analyser.logic;

import com.hisense.himap.analyser.vo.QueryNextIntsResultVO;
import com.hisense.himap.analyser.vo.QueryNextIntsVO;
import com.hisense.himap.analyser.vo.QueryPathResultVO;

import java.util.List;

/**
 * Created by lxb on 2015/6/3
 */
public interface IRouteAnalyser {

    /**
     * 获得下一路口列表
     * @param query
     * @return
     */
    public List<QueryNextIntsResultVO> getNextInts(QueryNextIntsVO query);

    /**
     * 最短路径查询
     * @param points 途经点，可以为安装点编号或者具体的坐标，例如：
     * {"010000213097","020000213069","010000213136"} or
     * {"120.41428,36.15462","120.39398,36.20586","120.41133,36.15778"} or
     * {"010000213097","120.41428,36.15462","010000213136"}
     * @return 经过的路径列表
     */
    public List<QueryPathResultVO> getShortestPath(List<String> points);



}
