package com.hisense.himap.RouteAnalyser.logic.impl;

import com.hisense.himap.RouteAnalyser.logic.IRouteAnalyser;
import com.hisense.himap.RouteAnalyser.utils.BeanUtils;
import com.hisense.himap.RouteAnalyser.vo.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lxb on 2015-6-8.
 */

@Service("RouteAnalyser")
public class RouteAnalyserImpl implements IRouteAnalyser {

    //弧段
    private Map<String, RtArcVO> arcMap;
    private List<RtArcVO> arcList;
    //路口
    private Map<String, RtIntsVO> intsMap;
    private List<RtIntsVO> intsList;
    //节点数据
    private Map<String,RtNodeVO> nodeMap;
    //动态节点数据
    private Map<String,RtNodeVO> dnodemap;

    //路口车道 @TODO 初始化时生成车道数据
    private List<RtLaneVO> laneList;
    private Map<String,RtLaneVO> laneMap;
    //路段基础信息
    private List<RtRoad> roadList;

    /*方向
    * 第一维表示方向
     * 1东向西 2西向东 3南向北 4北向南 5东北-西南 6 西南-东北 7 东南-西北 8 西北-东南
    * 第二维表示下一可能的方向，按顺序分别为直行，左转，右转，掉头*/
    private static final String[][] directions = new String[9][4];


    protected JdbcTemplate jdbcTemplate;


    @Inject
    @Named("jdbcTemplate")
    public RouteAnalyserImpl(JdbcTemplate jdbcTemplate) {
        if (null != jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
            String sql = "select * from route_road";
            try {
                System.out.println("init route_road ");
                List<RtRoad> list = this.jdbcTemplate.queryForList(sql, RtRoad.class);
                this.roadList = list;

                System.out.println("init route_node");
                sql = "select n.nodeid,n.x,n.y,n.intsid, i.pointids from route_node n left join route_intersection i on i.intsid = n.intsid";
                List<RtNodeVO> nodeList = this.jdbcTemplate.queryForList(sql,RtNodeVO.class);
                nodeMap = new HashMap<String, RtNodeVO>();
                for(RtNodeVO node:nodeList){
                    String[] pointids = node.getPointids().split(",");
                    for(String pointid:pointids){
                        if(nodeMap.get(pointid)==null){
                            nodeMap.put(pointid,node);
                        }
                    }

                }

                System.out.println("init dnode");
                sql = "select * from route_dnode";
                List<RtNodeVO> dnodeList = this.jdbcTemplate.queryForList(sql,RtNodeVO.class);
                dnodemap = new HashMap<String, RtNodeVO>();
                for(RtNodeVO node:dnodeList){
                    if(dnodemap.get(node.getPointids())==null){
                        dnodemap.put(node.getPointids(),node);
                    }
                }

                System.out.println("init route_arc");
                sql = "select * from route_arc";
                arcList = this.jdbcTemplate.queryForList(sql,RtArcVO.class);
                arcMap = new HashMap<String, RtArcVO>();
                for(RtArcVO arc:arcList){
                    if(arcMap.get(arc.getArcid()) == null){
                        arcMap.put(arc.getArcid(),arc);
                    }
                }

                System.out.println("init route_intersection");
                sql ="SELECT r.*,n.nodeid from route_intersection r LEFT JOIN route_node n ON n.intsid = r.intsid";
                intsList = this.jdbcTemplate.queryForList(sql,RtIntsVO.class);
                intsMap = new HashMap<String, RtIntsVO>();
                for(RtIntsVO ints:intsList){
                    String[] pointids = ints.getPointids().split(",");
                    for(String pointid:pointids){
                        if(intsMap.get(pointid) == null){
                            intsMap.put(pointid,ints);
                        }
                    }
                }

                System.out.println("init route_lane");
                sql = "select * from route_lane";
                laneList = this.jdbcTemplate.queryForList(sql,RtLaneVO.class);


                //初始化方向信息
                directions[1] = new String[]{"1,5,7", "4", "3", "2,6,8"};
                directions[2] = new String[]{"2,6,8", "3", "4", "1,5,7"};
                directions[3] = new String[]{"3,7,6", "1", "2", "4,5,8"};
                directions[4] = new String[]{"4,8,5", "2", "1", "3,6,7"};
                directions[5] = new String[]{"5,4,1", "8", "7", "2,6,3"};
                directions[6] = new String[]{"6,3,2", "7", "8", "5,4,1"};
                directions[7] = new String[]{"7,3,1", "5", "6", "2,4,8"};
                directions[8] = new String[]{"8,4,2", "6", "5", "7,1,3"};
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
        for(RtIntsVO ints:intsList){
            if(ints.getNodeid().equalsIgnoreCase(nodeid)){
                return ints;
            }
        }
        return null;
    }

    /**
     * 根据起始节点查找路线
     *
     * @param routeNodeVO 起始节点信息
     * @return 路线列表
     */
    public List<RtArcVO> getRtArcByStartNode(RtNodeVO routeNodeVO) {
        List<RtArcVO> arclist = new ArrayList<RtArcVO>();
        for(RtArcVO arc:arcList){
            if(arc.getStartnode().equalsIgnoreCase(routeNodeVO.getNodeid())){
                arclist.add(arc);
            }
        }
        return arclist;
    }

    /**
     * 获得下一路口列表
     *
     * @param query 查询条件
     * @return 下一路口列表
     */
    public List<QueryNextIntsResultVO> getNextInts(QueryNextIntsVO query) {
        if (null == query.getPointid() || query.getPointid().equalsIgnoreCase("")) {
            return null;
        }
        List<QueryNextIntsResultVO> nextInts = new ArrayList<QueryNextIntsResultVO>();

        //查询当前所在的路口
        RtNodeVO nodeVO = this.nodeMap.get(query.getPointid());
        if (null == nodeVO) { //如果当前在路段上，根据动态节点表进行定位
            nodeVO = this.dnodemap.get(query.getPointid());//安装点所在的动态节点
            String[] arcids = nodeVO.getArcids().split(",");//从动态节点出发的弧段
            String[] edistances = nodeVO.getEdistances().split(",");//从动态节点出发到达下一结点的距离
            String[] pos = nodeVO.getPos().split(",");//动态节点在弧段中的位置

            if (arcids.length == edistances.length && arcids.length == pos.length) {
                for (int i = 0; i < arcids.length; i++) {
                    String arcid = arcids[i];
                    try {
                        int spos = Integer.parseInt(pos[i]);
                        Double elength = Double.parseDouble(edistances[i]);

                        RtArcVO arcVO = this.arcMap.get(arcid); //路线VO

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
                            BeanUtils.copyPropertiesInclude(query, resultVO, new String[]{"pointid", "direction", "laneno", "speed"});
                            BeanUtils.copyPropertiesInclude(intsVO, resultVO, new String[]{"intsid", "intsname", "latitude", "longitude"});
                            BeanUtils.copyPropertiesInclude(arcVO, resultVO, new String[]{"arcid", "roadid"});
                        } catch (Exception e) {
                            e.printStackTrace();
                            continue;
                        }
                        resultVO.setArclength(Double.toString(elength));
                        resultVO.setStrcoords(strfromNodeToInts);
                        resultVO.setNdirection(arcVO.getDirection());

                        nextInts.add(resultVO);
                    } catch (NumberFormatException ignored) {

                    }

                }
            }


        } else { //如果安装点在路口，根据路口所属节点计算下一路口列表
            List<RtArcVO> arclist = this.getRtArcByStartNode(nodeVO);
            for (RtArcVO arcVO : arclist) {
                QueryNextIntsResultVO resultVO = new QueryNextIntsResultVO();

                RtIntsVO intsVO = this.getRtIntsByNodeid(arcVO.getEndnode());
                try {
                    BeanUtils.copyPropertiesInclude(query, resultVO, new String[]{"pointid", "direction", "laneno", "speed"});
                    BeanUtils.copyPropertiesInclude(intsVO, resultVO, new String[]{"intsid", "intsname", "latitude", "longitude"});
                    BeanUtils.copyPropertiesInclude(arcVO, resultVO, new String[]{"arcid", "arclength", "strcoords", "roadid"});
                } catch (Exception e) {
                    e.printStackTrace();
                }
                resultVO.setNdirection(arcVO.getDirection());
                nextInts.add(resultVO);

            }
        }
        return this.filterNextInts(query,nextInts);
    }



    /**
     * 根据查询条件筛选查询出的路口信息
     *
     * @param query
     * @param nextIntsList
     * @return
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
                    RtLaneVO querylaneVO = new RtLaneVO();
                    querylaneVO.setDirection(direction);
                    querylaneVO.setIntsid(intsid);
                    querylaneVO.setLaneno(laneno);
                    List<RtLaneVO> lanelist = this.getLaneList(querylaneVO);
                    if (null == lanelist || lanelist.size() <= 0) {
                        continue;
                    }
                    //路口车道信息
                    RtLaneVO laneVO = lanelist.get(0);
                    String nextdirection;
                    if (laneVO.getNthrough() == 1) {
                        nextdirection = directions[Integer.parseInt(direction)][0];
                        if (nextdirection.indexOf(ndirection) >= 0) {
                            nextIntsResultVO.setOrder(1);
                        }
                        result.add(nextIntsResultVO);
                        continue;
                    }
                    if (laneVO.getNturnleft() == 1) {
                        nextdirection = directions[Integer.parseInt(direction)][1];
                        if (nextdirection.indexOf(ndirection) >= 0) {
                            nextIntsResultVO.setOrder(1);
                        }
                        result.add(nextIntsResultVO);
                        continue;
                    }
                    if (laneVO.getNturnright() == 1) {
                        nextdirection = directions[Integer.parseInt(direction)][2];
                        if (nextdirection.indexOf(ndirection) >= 0) {
                            nextIntsResultVO.setOrder(1);
                        }
                        result.add(nextIntsResultVO);
                        continue;
                    }
                    if (laneVO.getNturnaround() == 1) {
                        nextdirection = directions[Integer.parseInt(direction)][3];
                        if (nextdirection.indexOf(ndirection) >= 0) {
                            nextIntsResultVO.setOrder(1);
                        }
                        result.add(nextIntsResultVO);
                        continue;
                    }

                    nextIntsResultVO.setOrder(-1);
                }

            }
        }
        return result;
    }

    //@TODO
    private List<RtLaneVO> getLaneList(RtLaneVO querylaneVO) {
        return null;
    }
}
