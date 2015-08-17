package com.hisense.himap.analyser.logic;

import com.hisense.himap.analyser.vo.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lxb on 2015-6-11.
 */
public class MemRouteData {

    //弧段
    public static Map<String, RtArcVO> arcMap;
    public static List<RtArcVO> arcList;
    public static Map<String,List<RtArcVO>> arcStartNodeMap;

    //路口
    public static Map<String, RtIntsVO> intsMap;
    public static List<RtIntsVO> intsList;

    //节点数据
    public static List<RtNodeVO> nodeList;
    public static Map<String,RtNodeVO> nodeMap;

    //动态节点数据
    public static List<RtNodeVO> dnodeList;
    public static Map<String,RtNodeVO> dnodemap;

    //路口车道
    public static List<RtLaneVO> laneList;
    public static Map<String,RtLaneVO> laneMap;

    //路段信息
    public static List<RtRoad> roadList;
    public static Map<String,RtRoad> roadMap;

    //查询缓存数据，缓存最近查询的1000条数据
    public static Map<String,List<QueryPathResultVO>> queryMap = new HashMap<String, List<QueryPathResultVO>>();


    /*方向
     * 第一维表示方向
     * 1东向西 2西向东 3南向北 4北向南 5东北-西南 6 西南-东北 7 东南-西北 8 西北-东南
     * 第二维表示下一可能的方向，按顺序分别为直行，左转，右转，掉头*/
    public static final String[][] directions = new String[9][4];


    /**
     * 根据起始节点查找路线
     * @param routeNodeVO 起始节点信息
     * @return 路线列表
     */
    public static List<RtArcVO> getRtArcByStartNode(RtNodeVO routeNodeVO) {
        List<RtArcVO> arclist = new ArrayList<RtArcVO>();
        if(MemRouteData.arcList == null){
            return null;
        }
        if(arcStartNodeMap.get(routeNodeVO.getNodeid())!=null){
            return arcStartNodeMap.get(routeNodeVO.getNodeid());
        }
        for(RtArcVO arc: MemRouteData.arcList){
            if(arc.getStartnode().equalsIgnoreCase(routeNodeVO.getNodeid())){
                arclist.add(arc);
            }
        }
        return arclist;
    }
}
