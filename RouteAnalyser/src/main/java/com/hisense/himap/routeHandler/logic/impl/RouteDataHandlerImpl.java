package com.hisense.himap.routeHandler.logic.impl;

import com.hisense.himap.routeAnalyser.vo.RtArcVO;
import com.hisense.himap.routeAnalyser.vo.RtNodeVO;
import com.hisense.himap.routeAnalyser.vo.RtRoad;
import com.hisense.himap.routeAnalyser.vo.RtRoadLinkVO;
import com.hisense.himap.routeHandler.logic.IRouteDataHandler;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by lxb on 2015-6-9.
 */
public class RouteDataHandlerImpl implements IRouteDataHandler {


    //预处理路网数据
    public void  preOperRoad(){
        List<RtRoad> roadList = this.getRtRoad();
        //循环路段列表，将邻接的路段边合并
        for(RtRoad road:roadList){
            List<RtRoadLinkVO> roadLinkList = this.getRtRoadLink();
            List<RtRoadLinkVO> newroadLinkList = new ArrayList<RtRoadLinkVO>();
            for(RtRoadLinkVO roadLinkVO:roadLinkList){
//                List<RtRoadLinkVO> ajLink =

            }
        }
    }

    public List<RtRoadLinkVO> getAdjectLinks(RtRoadLinkVO roadLinkVO,List<RtRoadLinkVO> roadLinkList){
        List<RtRoadLinkVO> result = new ArrayList<RtRoadLinkVO>();
        return result;
    }

    /**
     * 获得所有的路段
     *
     * @return 所有路段
     */
    @Override
    public List<RtRoad> getRtRoad() {
        return null;
    }



    /**
     * 获得指定路段的的边
     *@param roadid
     * @return 所有边
     */
    public List<RtRoadLinkVO> getRtRoadLink(String roadid) {
        return null;
    }


    /**
     * 获得所有的路段边
     *
     * @return 所有边
     */
    @Override
    public List<RtRoadLinkVO> getRtRoadLink() {
        return null;
    }
    /**
     * 获得节点列表
     *
     * @return 所有节点列表
     */
    @Override
    public List<RtNodeVO> getNodeList() {
        return null;
    }

    /**
     * 获得弧段列表
     *
     * @return 弧段列表
     */
    @Override
    public List<RtArcVO> getArcList() {
        return null;
    }
}
