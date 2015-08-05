package com.hisense.himap.analyser.logic.impl;

import com.hisense.himap.analyser.astar.AStar;
import com.hisense.himap.analyser.astar.ISearchNode;
import com.hisense.himap.analyser.dao.RouteAnalyserDAO;
import com.hisense.himap.analyser.logic.IRouteAnalyser;
import com.hisense.himap.analyser.logic.MemRouteData;
import com.hisense.himap.analyser.logic.RouteGoalNode;
import com.hisense.himap.analyser.logic.RouteSearchNode;
import com.hisense.himap.analyser.vo.*;
import com.hisense.himap.utils.BeanUtils;
import com.hisense.himap.utils.GISUtils;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by lxb on 2015-6-8.
 */

@Service("RouteAnalyser")
public class RouteAnalyserImpl implements IRouteAnalyser {

    private RouteAnalyserDAO routeAnalyserDAO;

    @Inject
    @Named("RouteAnalyserDAO")
    public RouteAnalyserImpl(RouteAnalyserDAO routeAnalyserDAO) {
        if (null != routeAnalyserDAO) {
            this.routeAnalyserDAO = routeAnalyserDAO;
            try {
                System.out.println("init route_road ");
                List<RtRoad> list = this.routeAnalyserDAO.initRtRoad();
                MemRouteData.roadList = list;
                MemRouteData.roadMap = new HashMap<String, RtRoad>();
                for(RtRoad road:list){
                    MemRouteData.roadMap.put(road.getRoadid(),road);
                }

                System.out.println("init route_node");
                List<RtNodeVO> nodeList = this.routeAnalyserDAO.initRtNode();
                MemRouteData.nodeList = nodeList;
                MemRouteData.nodeMap = new HashMap<String, RtNodeVO>();
                for (RtNodeVO node : nodeList) {
                    if (null == node.getPointids() || node.getPointids().equalsIgnoreCase("")) {
                        continue;
                    }
                    String[] pointids = node.getPointids().split(",");
                    for (String pointid : pointids) {
                        if (MemRouteData.nodeMap.get(pointid) == null) {
                            MemRouteData.nodeMap.put(pointid, node);
                        }
                    }

                }

                System.out.println("init dnode");
                List<RtNodeVO> dnodeList = this.routeAnalyserDAO.initRtDNode();
                MemRouteData.dnodeList = dnodeList;
                MemRouteData.dnodemap = new HashMap<String, RtNodeVO>();
                for (RtNodeVO node : dnodeList) {
                    if (null == node.getPointid() || node.getPointid().equalsIgnoreCase("")) {
                        continue;
                    }
                    if (MemRouteData.dnodemap.get(node.getPointid()) == null) {
                        MemRouteData.dnodemap.put(node.getPointid(), node);
                    }
                }


                //@TODO 根据动态节点更新拓扑结构
                System.out.println("init route_arc");
                List<RtArcVO> arcList = this.routeAnalyserDAO.initRtArc();
                MemRouteData.arcMap = new HashMap<String, RtArcVO>();
                MemRouteData.arcStartNodeMap = new HashMap<String, List<RtArcVO>>();
                MemRouteData.arcList = new ArrayList<RtArcVO>();
                for (RtArcVO arc : arcList) {
                    MemRouteData.arcList.add(arc);
                    MemRouteData.arcMap.put(arc.getArcid(), arc);

                    List templist = MemRouteData.arcStartNodeMap.get(arc.getStartnode());
                    if(templist == null){
                        templist = new ArrayList<RtArcVO>();
                    }
                    templist.add(arc);
                    MemRouteData.arcStartNodeMap.put(arc.getStartnode(),templist);

                    //如果是次要道路，且宽度<=4，将道路的弧段设为双向
                    RtRoad arcroad = MemRouteData.roadMap.get(arc.getRoadid());
                    if(arcroad!=null && arcroad.getRoadwidth()<=4 && arcroad.getRoadtype().equalsIgnoreCase("次要道路（城市次干道）")){
                        templist = MemRouteData.arcStartNodeMap.get(arc.getEndnode());
                        if(templist == null){
                            templist = new ArrayList<RtArcVO>();
                        }
                        RtArcVO revertarc = new RtArcVO();
                        BeanUtils.copyPropertiesInclude(arc, revertarc, new String[]{"arcid", "arcname", "arclength", "roadid","roadname","linkid"});
                        revertarc.setStartnode(arc.getEndnode());
                        revertarc.setEndnode(arc.getStartnode());
                        revertarc.setStrcoords(GISUtils.resetDirection(arc.getStrcoords()));
                        revertarc.setDirection(GISUtils.getDirection(revertarc.getStrcoords()));
                        templist.add(revertarc);
                        MemRouteData.arcStartNodeMap.put(revertarc.getStartnode(),templist);
                        MemRouteData.arcList.add(revertarc);
                    }


                }

                System.out.println("init route_intersection");
                MemRouteData.intsList = this.routeAnalyserDAO.initRtInts();
                MemRouteData.intsMap = new HashMap<String, RtIntsVO>();
                for (RtIntsVO ints : MemRouteData.intsList) {
                    if (null == ints.getPointids() || ints.getPointids().equalsIgnoreCase("")) {
                        continue;
                    }
                    String[] pointids = ints.getPointids().split(",");
                    for (String pointid : pointids) {
                        if (MemRouteData.intsMap.get(pointid) == null) {
                            MemRouteData.intsMap.put(pointid, ints);
                        }
                    }
                }

                System.out.println("init route_lane");
                MemRouteData.laneList = this.routeAnalyserDAO.initRtLane();


                //初始化方向信息
                MemRouteData.directions[1] = new String[]{"1,5,7", "4", "3", "2,6,8"};
                MemRouteData.directions[2] = new String[]{"2,6,8", "3", "4", "1,5,7"};
                MemRouteData.directions[3] = new String[]{"3,7,6", "1", "2", "4,5,8"};
                MemRouteData.directions[4] = new String[]{"4,8,5", "2", "1", "3,6,7"};
                MemRouteData.directions[5] = new String[]{"5,4,1", "8", "7", "2,6,3"};
                MemRouteData.directions[6] = new String[]{"6,3,2", "7", "8", "5,4,1"};
                MemRouteData.directions[7] = new String[]{"7,3,1", "5", "6", "2,4,8"};
                MemRouteData.directions[8] = new String[]{"8,4,2", "6", "5", "7,1,3"};
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


    /**
     * 根据节点查找路口
     *
     * @param nodeid 节点编号
     * @return 路口信息
     */
    public RtIntsVO getRtIntsByNodeid(String nodeid) {
        for (RtIntsVO ints : MemRouteData.intsList) {
            if (null!=ints.getNodeid() && ints.getNodeid().equalsIgnoreCase(nodeid)) {
                return ints;
            }
        }
        return null;
    }


    /**
     * 获得下一路口列表
     *
     * @param query 查询条件
     * @return 下一路口列表
     */
    public List<QueryNextIntsResultVO> getNextInts(QueryNextIntsVO query) {
        RtNodeVO nodeVO = null;
        if (null == query.getPointid() || query.getPointid().equalsIgnoreCase("")) {
            return null;
        }else if(query.getPointid().split(",").length==2){
            nodeVO = this.getNodeByPos(query.getPointid());
        }
        List<QueryNextIntsResultVO> nextInts = new ArrayList<QueryNextIntsResultVO>();

        //查询当前所在的路口
        if(null == nodeVO){
            nodeVO = MemRouteData.nodeMap.get(query.getPointid());
        }
        if (null == nodeVO || nodeVO.getDnodeid()!=null) { //如果当前在路段上，根据动态节点表进行定位
            if(null == nodeVO){
                nodeVO = MemRouteData.dnodemap.get(query.getPointid());//安装点所在的动态节点
            }
            if(nodeVO == null ||nodeVO.getArcids() == null){
                return null;
            }
            String[] arcids = nodeVO.getArcids().split(",");//从动态节点出发的弧段
            String[] edistances = nodeVO.getEdistances().split(",");//从动态节点出发到达下一结点的距离
            String[] pos = nodeVO.getPos().split(",");//动态节点在弧段中的位置

            if (arcids.length == edistances.length && arcids.length == pos.length) {
                for (int i = 0; i < arcids.length; i++) {
                    String arcid = arcids[i];
                    try {
                        int spos = Integer.parseInt(pos[i]);
                        Double elength = Double.parseDouble(edistances[i]);

                        RtArcVO arcVO = MemRouteData.arcMap.get(arcid); //路线VO


                        String[] strcoords = arcVO.getStrcoords().split(",");
                        if (strcoords.length / 2 < spos) {
                            continue;
                        }
                        String strfromNodeToInts = nodeVO.getX() + "," + nodeVO.getY() + ",";
                        for (int m = spos; m < strcoords.length / 2; m++) {
                            strfromNodeToInts += strcoords[m * 2] + "," + strcoords[m * 2 + 1];
                        }
                        RtIntsVO intsVO = this.getRtIntsByNodeid(arcVO.getEndnode()); //路口VO
                        QueryNextIntsResultVO resultVO = new QueryNextIntsResultVO();

                        try {
                            //BeanUtils.copyPropertiesInclude(query, resultVO, new String[]{"pointid", "direction", "laneno", "speed"});
                            BeanUtils.copyPropertiesInclude(intsVO, resultVO, new String[]{"intsid", "intsname", "latitude", "longitude"});
                            BeanUtils.copyPropertiesInclude(arcVO, resultVO, new String[]{"arcid", "roadid"});
                        } catch (Exception e) {
                            e.printStackTrace();
                            continue;
                        }
                        resultVO.setArclength(Double.toString(elength));
                        resultVO.setStrcoords(strfromNodeToInts);
                        resultVO.setNdirection(arcVO.getDirection());
                        int arcdirection = arcVO.getDirection();
                        if(null == query.getDirection() || query.getDirection().equalsIgnoreCase("")){
                            resultVO.setOrder(0);
                        }else if(query.getDirection().equalsIgnoreCase(Integer.toString(arcdirection))){
                            resultVO.setOrder(1);
                        }else{
                            resultVO.setOrder(-1);
                        }

                        nextInts.add(resultVO);
                    } catch (NumberFormatException ignored) {

                    }

                }
            }


        } else { //如果安装点在路口，根据路口所属节点计算下一路口列表
            nextInts = climbToInts(nodeVO);
        }
        return this.filterNextInts(query, nextInts);
    }

    public List<QueryNextIntsResultVO> climbToInts(RtNodeVO nodeVO){
        List<QueryNextIntsResultVO> nextInts = new ArrayList<QueryNextIntsResultVO>();
        List<RtArcVO> arclist = MemRouteData.getRtArcByStartNode(nodeVO);
        for (RtArcVO arcVO : arclist) {
            if(arcVO.getStartnode().equalsIgnoreCase(arcVO.getEndnode())){
                continue;
            }
            QueryNextIntsResultVO resultVO = new QueryNextIntsResultVO();
            RtIntsVO intsVO = this.getRtIntsByNodeid(arcVO.getEndnode());
            if(intsVO == null){
                RtNodeVO endnode = new RtNodeVO();
                endnode.setNodeid(arcVO.getEndnode());
                nextInts.addAll(climbToInts(endnode));
            }else{
                try {
                    //BeanUtils.copyPropertiesIncludecopyPropertiesInclude(query, resultVO, new String[]{"pointid", "direction", "laneno", "speed"});
                    BeanUtils.copyPropertiesInclude(intsVO, resultVO, new String[]{"intsid", "intsname", "latitude", "longitude"});
                    BeanUtils.copyPropertiesInclude(arcVO, resultVO, new String[]{"arcid", "arclength", "strcoords", "roadid"});
                } catch (Exception e) {
                    e.printStackTrace();
                }
                resultVO.setNdirection(arcVO.getDirection());
                resultVO.setOrder(0);
                nextInts.add(resultVO);
            }
        }
        return nextInts;
    }


    /**
     * 根据查询条件筛选查询出的路口信息
     *
     * @param query        查询条件
     * @param nextIntsList 待筛选列表
     * @return 符合筛选条件的路口
     */
    public List<QueryNextIntsResultVO> filterNextInts(QueryNextIntsVO query, List<QueryNextIntsResultVO> nextIntsList) {
        List<QueryNextIntsResultVO> result = new ArrayList<QueryNextIntsResultVO>();
        String laneno = query.getLaneno();
        String direction = query.getDirection();
        if (null == query.getLaneno() || query.getLaneno().equalsIgnoreCase("")) {
            result = nextIntsList;
        } else {
            if (direction.equalsIgnoreCase("0") || direction.equalsIgnoreCase("10") || direction.equalsIgnoreCase("12")) {
                result = nextIntsList;
            } else {
                for (QueryNextIntsResultVO nextIntsResultVO : nextIntsList) {
                    String intsid = nextIntsResultVO.getIntsid();
                    String ndirection = Integer.toString(nextIntsResultVO.getNdirection());
                    //拼接查询对象，查询路口的车道信息
                    RtLaneVO querylaneVO = new RtLaneVO();
                    querylaneVO.setDirection(direction);
                    querylaneVO.setIntsid(intsid);
                    querylaneVO.setLaneno(laneno);
                    //车道信息
                    List<RtLaneVO> lanelist = this.getLaneList(querylaneVO);
                    if (null == lanelist || lanelist.size() <= 0) {
                        nextIntsResultVO.setOrder(0);
                        result.add(nextIntsResultVO);
                        continue;
                    }
                    RtLaneVO laneVO = lanelist.get(0);
                    String nextdirection = null;
                    if (laneVO.getNthrough() == 1) {
                        nextdirection = MemRouteData.directions[Integer.parseInt(direction)][0];
                        if (nextdirection.indexOf(ndirection) >= 0) {
                            nextIntsResultVO.setOrder(1);
                            result.add(nextIntsResultVO);
                            continue;
                        }

                    }
                    if (laneVO.getNturnleft() == 1) {
                        nextdirection = MemRouteData.directions[Integer.parseInt(direction)][1];
                        if (nextdirection.indexOf(ndirection) >= 0) {
                            nextIntsResultVO.setOrder(1);
                            result.add(nextIntsResultVO);
                            continue;
                        }

                    }
                    if (laneVO.getNturnright() == 1) {
                        nextdirection = MemRouteData.directions[Integer.parseInt(direction)][2];
                        if (nextdirection.indexOf(ndirection) >= 0) {
                            nextIntsResultVO.setOrder(1);
                            result.add(nextIntsResultVO);
                            continue;
                        }

                    }
                    if (laneVO.getNturnround() == 1) {
                        nextdirection = MemRouteData.directions[Integer.parseInt(direction)][3];
                        if (nextdirection.indexOf(ndirection) >= 0) {
                            nextIntsResultVO.setOrder(1);
                            result.add(nextIntsResultVO);
                            continue;
                        }

                    }

                    nextIntsResultVO.setOrder(-1);
                    result.add(nextIntsResultVO);
                }

            }
        }
        return result;
    }

    /**
     * 查询符合条件的车道记录
     *
     * @param querylaneVO 查询条件
     * @return 符合筛选条件的车道列表
     */
    private List<RtLaneVO> getLaneList(RtLaneVO querylaneVO) {
        List<RtLaneVO> list = new ArrayList<RtLaneVO>();
        for (RtLaneVO lane : MemRouteData.laneList) {
            if (null != querylaneVO.getLaneno() && querylaneVO.getLaneno().length() > 0) {
                if (!lane.getLaneno().equalsIgnoreCase(querylaneVO.getLaneno())) {
                    continue;
                }
            }
            if (null != querylaneVO.getIntsid() && querylaneVO.getIntsid().length() > 0) {
                if (!lane.getIntsid().equalsIgnoreCase(querylaneVO.getIntsid())) {
                    continue;
                }
            }
            if (null != querylaneVO.getDirection() && querylaneVO.getDirection().length() > 0) {
                if (!lane.getDirection().equalsIgnoreCase(querylaneVO.getDirection())) {
                    continue;
                }
            }
            list.add(lane);

        }
        return list;
    }


    /**
     * 最短路径查询
     *
     * @param points 途经点，可以为安装点编号或者具体的坐标，例如：
     *               {"010000213097","020000213069","010000213136"} or
     *               {"120.41428,36.15462","120.39398,36.20586","120.41133,36.15778"} or
     *               {"010000213097","120.41428,36.15462","010000213136"}
     * @return 经过的路径列表
     */
    public List<QueryPathResultVO> getShortestPath(List<String> points) {

        List<QueryPathResultVO> result = new ArrayList<QueryPathResultVO>();
        if (points.size() <= 1) {//小于一个点时，返回空路径
            return null;
        }
        //将途经点转换为路网中的节点
        List<RtNodeVO> nodelist = new ArrayList<RtNodeVO>();
        for (String point : points) {
            RtNodeVO node = null;
            if (point.indexOf(",") > 0) {//如果是具体的坐标，查询坐标点所在的节点
                node = this.getNodeByPos(point);
                if(null == node){
                    node = new RtNodeVO();
                    node.setX(point.split(",")[0]);
                    node.setY(point.split(",")[1]);
                }
            } else { //如果是安装点，查询安装点所在的节点
                node = this.getNodeByPointid(point);
                if(null == node){
                    node = this.routeAnalyserDAO.getMonitor(point);
                }
            }
            nodelist.add(node);

        }

        if (nodelist.size() <= 0) {
            return null;
        }

        //
        RtNodeVO from = nodelist.get(0);
        for (int i = 1; i < nodelist.size(); i++) {
            RtNodeVO to = nodelist.get(i);
            if(to.getNodeid() == null||to.getNodeid().equalsIgnoreCase("")){
                QueryPathResultVO vo = new QueryPathResultVO();
                vo.setStrcoords(from.getX()+","+from.getY()+","+to.getX()+","+to.getY());
                result.add(vo);
            }else{
                List<QueryPathResultVO> list = this.getShortestPath(from, to);
                result.addAll(list);
            }
            from = to;
        }
        return result;
    }

    /**
     * 向路网中添加动态节点
     * @param dnode
     */
    private void addDNodeToRoute(RtNodeVO dnode){
        if(null == dnode.getArcids() || dnode.getArcids().equalsIgnoreCase("")){
            return;
        }
        dnode.setNodeid(dnode.getDnodeid());
        String[] arcids = dnode.getArcids().split(",");
        String[] edistances = dnode.getEdistances().split(",");
        String[] poss = dnode.getPos().split(",");
        for(int i=0;i<arcids.length;i++){
            String arcid = arcids[i];
            String edistance = edistances[i];
            int pos = Integer.parseInt(poss[i]);
            RtArcVO arc = MemRouteData.arcMap.get(arcid);
            if(null==arc){
                continue;
            }
            //添加节点
            MemRouteData.nodeList.add(dnode);
            MemRouteData.nodeMap.put(dnode.getPointcode(),dnode);
            //添加arc
            RtArcVO startarc = new RtArcVO();
            RtArcVO endarc = new RtArcVO();
            try {
                BeanUtils.copyPropertiesInclude(arc, startarc, new String[]{"arcid", "arcname", "direction", "roadid","roadname","linkid","delflag","startnode"});
                BeanUtils.copyPropertiesInclude(arc, endarc, new String[]{"arcid", "arcname", "direction", "roadid", "roadname", "linkid", "delflag","endnode"});
                Double arclength = Double.parseDouble(arc.getArclength());
                startarc.setArclength(Double.toString(arclength-Double.parseDouble(edistance)));
                endarc.setArclength(edistance);
                String[] strcoords = arc.getStrcoords().split(",");
                List<RtArcVO> arclist = new ArrayList<RtArcVO>();
                if(pos==0){
                    startarc.setStrcoords(arc.getStrcoords());
                    startarc.setEndnode(dnode.getDnodeid());
                    MemRouteData.arcList.add(startarc);
                    arclist = MemRouteData.arcStartNodeMap.get(startarc.getStartnode());
                    if(arclist!=null){
                        arclist.add(startarc);
                    }else{
                        arclist = new ArrayList<RtArcVO>();
                        arclist.add(startarc);
                    }
                    MemRouteData.arcStartNodeMap.put(startarc.getStartnode(),arclist);
                }else if(pos >=strcoords.length/2){
                    endarc.setStrcoords(arc.getStrcoords());
                    endarc.setStartnode(dnode.getDnodeid());
                    MemRouteData.arcList.add(endarc);
                    arclist.add(endarc);
                    MemRouteData.arcStartNodeMap.put(dnode.getDnodeid(),arclist);
                }else{
                    String earcstr = "";
                    for(int m=pos;m<strcoords.length/2;m++){
                        earcstr+=strcoords[m*2]+","+strcoords[m*2+1]+",";
                    }
                    earcstr = earcstr.substring(0, earcstr.length() - 1);
                    endarc.setStrcoords(earcstr);
                    endarc.setStartnode(dnode.getDnodeid());
                    MemRouteData.arcList.add(endarc);
                    arclist.add(endarc);
                    MemRouteData.arcStartNodeMap.put(dnode.getDnodeid(),arclist);

                    earcstr = "";
                    for(int m=0;m<pos;m++){
                        earcstr+=strcoords[m*2]+","+strcoords[m*2+1]+",";
                    }
                    earcstr = earcstr.substring(0, earcstr.length() - 1);
                    startarc.setStrcoords(earcstr);
                    startarc.setEndnode(dnode.getDnodeid());
                    MemRouteData.arcList.add(startarc);

                    arclist = MemRouteData.arcStartNodeMap.get(startarc.getStartnode());
                    if(arclist!=null){
                        arclist.add(startarc);
                    }else{
                        arclist = new ArrayList<RtArcVO>();
                        arclist.add(startarc);
                    }
                    MemRouteData.arcStartNodeMap.put(startarc.getStartnode(),arclist);


                }
            } catch (Exception e) {
                e.printStackTrace();
                continue;
            }
        }
    }

    private void removeDNodeFromRoute(RtNodeVO dnode){

    }

    /**
     * 根据坐标获得节点
     * 如果现在的节点中有坐标点，则返回该节点，否则将坐标添加到动态节点表中，同时调整路网拓扑结构,返回动态添加的节点
     * @param pos 坐标点的经纬度
     * @return 节点对象
     */
    public RtNodeVO getNodeByPos(String pos) {
        Double longitude = Double.parseDouble(pos.split(",")[0]);
        Double latitude = Double.parseDouble(pos.split(",")[1]);
        //step1 查询节点表
        for (RtNodeVO node : MemRouteData.nodeList) {
            if(Double.parseDouble(node.getX()) == longitude && Double.parseDouble(node.getY()) == latitude){
                return node;
            }
        }
        //step2 查询动态节点表
        for (RtNodeVO node : MemRouteData.dnodeList) {
            if(Double.parseDouble(node.getX()) == longitude && Double.parseDouble(node.getY()) == latitude){
                return node;
            }
        }
        //step3
        List<RtNodeVO> nodelist = this.routeAnalyserDAO.getNearNode(pos,"50");
        if(nodelist!=null && nodelist.size()>0){
            return nodelist.get(0);
        }
        return null;
    }
    /**
     * 根据安装点编号获得节点
     * @param pointid 安装点编号
     * @return 节点对象
     */
    public RtNodeVO getNodeByPointid(String pointid) {
        RtNodeVO node = null;
        if(MemRouteData.nodeMap.get(pointid)!=null){
            node = MemRouteData.nodeMap.get(pointid);
        }else if(MemRouteData.dnodemap.get(pointid)!=null){
            node = MemRouteData.dnodemap.get(pointid);
            addDNodeToRoute(node);
        }else{
            RtNodeVO monitor = this.routeAnalyserDAO.getMonitor(pointid);
            String pos = monitor.getX()+","+monitor.getY();
            List<RtNodeVO> nodelist = this.routeAnalyserDAO.getNearNode(pos,"50");
            if(nodelist!=null && nodelist.size()>0){
                node =  nodelist.get(0);
            }
        }
        return node;
    }

    /**
     * 最短路径查询
     *
     * @param from 起始节点
     * @param to   结束节点
     * @return 经过的路径列表
     */
        public List<QueryPathResultVO> getShortestPath(RtNodeVO from, RtNodeVO to) {
        List<QueryPathResultVO> result = new ArrayList<QueryPathResultVO>();
        //System.out.println("距离"+GISUtils.getRoadLength(from.getNodeid()+","+to.getNodeid()));
        RouteGoalNode goalNode = new RouteGoalNode(Double.parseDouble(to.getX()), Double.parseDouble(to.getY()));
        RouteSearchNode initialNode = new RouteSearchNode(Double.parseDouble(from.getX()), Double.parseDouble(from.getY()), null, 0d, null, goalNode);

        //@TODO 路径只返回了坐标,需要添加其他信息
        ArrayList<ISearchNode> path = new AStar().shortestPath(initialNode, goalNode);
        if(null == path || path.size()<=0){
        }else{
            path.remove(0);
            for (ISearchNode iSearchNode : path) {
                RouteSearchNode searchNode = (RouteSearchNode) iSearchNode;
                QueryPathResultVO pathvo = new QueryPathResultVO();
                pathvo.setStrcoords(searchNode.getStrcoords());
                result.add(pathvo);
            }
        }


        //如果从路网中没有算出结果，返回两点之间的直线
        if(result.size()<=0){
            QueryPathResultVO pathvo = new QueryPathResultVO();
            pathvo.setStrcoords(from.getX()+","+from.getY()+","+to.getX()+","+to.getY());
            result.add(pathvo);
        }
        return result;
    }


    public int add(int a, int b) {
        return a + b;
    }

}
