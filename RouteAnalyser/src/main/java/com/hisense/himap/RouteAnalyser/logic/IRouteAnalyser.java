package com.hisense.himap.RouteAnalyser.logic;

import com.hisense.himap.RouteAnalyser.vo.QueryNextIntsResultVO;
import com.hisense.himap.RouteAnalyser.vo.QueryNextIntsVO;

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





}
