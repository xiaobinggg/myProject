package com.hisense.himap.RouteAnalyser.logic.impl;

import com.hisense.himap.RouteAnalyser.logic.IRouteAnalyser;
import com.hisense.himap.RouteAnalyser.vo.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2015-6-8.
 */

@Service("RouteAnalyser")
public class RouteAnalyserImpl implements IRouteAnalyser {

    //弧段 @TODO 初始化时生成弧段数据
    private Map<String,RtArcVO> routeArcMap;
    private List<RtArcVO> rtArcList;
    //路口 @TODO 初始化时生成路口数据
    private Map<String,RtIntsVO> rtIntsMap;
    private List<RtIntsVO> rtIntsList;
    //路口车道 @TODO 初始化时生成车道数据
    private List<RtLaneVO> rtLaneList;
    //路段基础信息
    private List<RtRoad> rtRoadList;

    protected JdbcTemplate jdbcTemplate;

    @Inject
    @Named("jdbcTemplate")
    public  RouteAnalyserImpl(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
        String sql = "select * from route_road";
        try {
            System.out.println("init route_road ");
            List<RtRoad> list = this.jdbcTemplate.queryForList(sql,RtRoad.class);
            this.rtRoadList = list;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * 获得安装点所在的节点
     *
     * @param pointid 安装点编号
     * @return 节点VO
     */
    public RtNodeVO getRtNodeByPointid(String pointid) {
        return null;
    }
    /**
     * 获得安装点所在的动态节点
     *
     * @param pointid 安装点编号
     * @return 动态节点VO
     */
    public RtNodeVO getRtDNodeByPointid(String pointid) {
        return null;
    }

    /**
     * 根据弧段编号获得弧段信息
     *
     * @param arcid 弧段编号
     * @return
     */
    public RtArcVO getRtArcByArcid(String arcid) {
        return routeArcMap.get(arcid);
    }
    /**
     * 根据节点查找路口
     *
     * @param nodeid
     * @return
     */
    public RtIntsVO getRtIntsByNodeid(String nodeid) {
        return null;
    }

    /**
     * 根据节点查找路线
     *
     * @param routeNodeVO
     * @return
     */
    public List<RtArcVO> getRtArcByStartNode(RtNodeVO routeNodeVO) {
        return null;
    }
    /**
     * 获得下一路口列表
     *
     * @param query
     * @return
     */

    public List<QueryNextIntsResultVO> getNextInts(QueryNextIntsVO query) {
        if(null == query.getPointid() || query.getPointid().equalsIgnoreCase("")){
            return null;
        }
        List<QueryNextIntsResultVO> nextInts = new ArrayList<QueryNextIntsResultVO>();

        RtNodeVO nodeVO = this.getRtNodeByPointid(query.getPointid());
        if(null == nodeVO){ //如果安装点在路段上，根据安装点所在的动态节点计算下一路口列表
            nodeVO = this.getRtDNodeByPointid(query.getPointid());//安装点所在的动态节点
            String[] arcids = nodeVO.getArcids().split(",");//从动态节点出发的弧段
            String[] edistances = nodeVO.getEdistances().split(",");//从动态节点出发到达下一结点的距离
            String[] pos = nodeVO.getPos().split(",");//动态节点在弧段中的位置

            if(arcids.length==edistances.length && arcids.length == pos.length ){
                for(int i= 0;i<arcids.length;i++){
                    String arcid = arcids[i];
                    try {
                        int spos = Integer.parseInt(pos[i]);
                        Double elength = Double.parseDouble(edistances[i]);

                        RtArcVO arcVO = this.getRtArcByArcid(arcid); //路线VO

                        String[] strcoords = arcVO.getStrcoords().split(",");
                        if(strcoords.length/2<spos){
                            continue;
                        }
                        String strfromNodeToInts = nodeVO.getX()+","+nodeVO.getY()+",";
                        for(int m=spos; m<strcoords.length/2;m++){
                            strfromNodeToInts+=strcoords[m*2]+","+strcoords[m*2+1];
                        }

                        RtIntsVO intsVO = this.getRtIntsByNodeid(arcVO.getEndnode()); //路口VO
                        QueryNextIntsResultVO resultVO = new QueryNextIntsResultVO();

                        resultVO.setPointid(query.getPointid());
                        resultVO.setDirection(query.getDirection());
                        resultVO.setLaneno(query.getLaneno());
                        resultVO.setSpeed(query.getSpeed());

                        resultVO.setIntsid(intsVO.getIntsid());
                        resultVO.setIntsname(intsVO.getIntsname());
                        resultVO.setLatitude(intsVO.getLatitude());
                        resultVO.setLongitude(intsVO.getLongitude());

                        resultVO.setArcid(arcVO.getArcid());
                        resultVO.setArclength(Double.toString(elength));
                        resultVO.setStrcoords(strfromNodeToInts);
                        resultVO.setRoadid(arcVO.getRoadid());
                        resultVO.setNdirection(Integer.toString(arcVO.getDirection()));
                        nextInts.add(resultVO);
                    }catch(NumberFormatException e){

                    }

                }
            }


        }else{ //如果安装点在路口，根据路口所属节点计算下一路口列表
            List<RtArcVO> arclist = this.getRtArcByStartNode(nodeVO);
            for(RtArcVO arcVO:arclist){
                QueryNextIntsResultVO resultVO = new QueryNextIntsResultVO();

                RtIntsVO intsVO = this.getRtIntsByNodeid(arcVO.getEndnode());
                resultVO.setPointid(query.getPointid());
                resultVO.setDirection(query.getDirection());
                resultVO.setLaneno(query.getLaneno());
                resultVO.setSpeed(query.getSpeed());

                resultVO.setIntsid(intsVO.getIntsid());
                resultVO.setIntsname(intsVO.getIntsname());
                resultVO.setLatitude(intsVO.getLatitude());
                resultVO.setLongitude(intsVO.getLongitude());

                resultVO.setArcid(arcVO.getArcid());
                resultVO.setArclength(arcVO.getArclength());
                resultVO.setStrcoords(arcVO.getStrcoords());
                resultVO.setRoadid(arcVO.getRoadid());
                resultVO.setNdirection(Integer.toString(arcVO.getDirection()));
                nextInts.add(resultVO);

            }
        }
        return nextInts;
    }
}
