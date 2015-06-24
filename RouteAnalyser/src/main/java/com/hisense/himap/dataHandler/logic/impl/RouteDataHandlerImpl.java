package com.hisense.himap.dataHandler.logic.impl;

import com.hisense.himap.analyser.vo.*;
import com.hisense.himap.dataHandler.logic.IRouteDataHandler;
import com.hisense.himap.dataHandler.dao.RouteDataHandlerDAO;
import com.hisense.himap.utils.GISUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.*;

/**
 * Created by lxb on 2015-6-9.
 */

@Service("RouteDataHandler")
public class RouteDataHandlerImpl implements IRouteDataHandler {

    @Inject
    private RouteDataHandlerDAO routeDataHandlerDAO;

    private List<RtRoad> roadList;
    private Map<String, RtRoad> roadMap;
    private List<RtIntsVO> allIntsList;

    //预处理路网数据
    public void preOperRoad() {
        roadMap = new HashMap<String, RtRoad>();
        roadList = routeDataHandlerDAO.getRtRoad();
        Map<String, RtRoad> handledRoad = new HashMap<String, RtRoad>();
        for (RtRoad road : roadList) {
            roadMap.put(road.getRoadid(), road);
        }
        allIntsList = new ArrayList<RtIntsVO>();
        int i = 0;
        for (RtRoad road : roadList) {
            handledRoad.put(road.getRoadid(), road);
            //1.将邻接的路段边合并
            i++;
            List<RtRoadLinkVO> linkList = routeDataHandlerDAO.getLinkByRoadID(road.getRoadid());//原始link
            List<RtRoadLinkVO> newLinkList = new ArrayList<RtRoadLinkVO>();//合并后的link
            for (RtRoadLinkVO link : linkList) {
                //如果已经合并
                if (link.getIsformatted().equalsIgnoreCase("1")) {
                    continue;
                }
                String strcoords = this.joinLink(link, linkList, 0);
                link.setStrcoords(strcoords);
                link.setLinkid("F" + link.getLinkid());
                newLinkList.add(link);
            }
            System.out.println(i + ":" + road.getRoadname() + "---" + newLinkList.size());
            //routeDataHandlerDAO.insertFormattedLink(newLinkList);


            //2.路口处理
            Map<String, String> crossMap = new HashMap<String, String>();
            //2.1 弧段数据处理,计算路段与其他路段的交叉点
            for (RtRoadLinkVO link : newLinkList) {
                //System.out.println(link.getLinkid());
                List<RtRoadLinkVO> list = routeDataHandlerDAO.getCrossLinkById(link.getLinkid());
                for (RtRoadLinkVO crosslink : list) {
                    try {
                        String crosspoint = GISUtils.getIntersection(link.getStrcoords(), crosslink.getStrcoords());
                        if (crosspoint == null || crosspoint.split(",").length != 2) {
                            continue;
                        }
                        int pos = this.getNodePosInLink(crosspoint, link);
                        if (link.getCrosspoints() == null) {
                            link.setCrosspoints(crosspoint + "," + pos);
                        } else {
                            link.setCrosspoints(link.getCrosspoints() + "," + crosspoint + "," + pos);
                        }

                        String roadid = crosslink.getRoadid();
                        if (handledRoad.get(roadid) != null) {//如果该路段已经进行过交叉点计算，不进行重复计算
                            continue;
                        }
                        if (crossMap.get(roadid) == null) {
                            crossMap.put(roadid, crosspoint.split(",")[0] + "," + crosspoint.split(",")[1]);
                        } else {
                            crossMap.put(roadid, crossMap.get(roadid) + "," + crosspoint.split(",")[0] + "," + crosspoint.split(",")[1]);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
            //this.routeDataHandlerDAO.updateCrossPoint(newLinkList);

            //2.2 路口数据处理，根据交叉点生成路口数据和节点数据
            List<RtIntsVO> intslist = new ArrayList<RtIntsVO>();
            Iterator iter = crossMap.keySet().iterator();
            List<RtNodeVO> nodelist = new ArrayList<RtNodeVO>();
            while (iter.hasNext()) {
                String crossroadid = iter.next().toString();
                RtIntsVO intsVO = new RtIntsVO();
                String centroid = this.getCentroid(crossMap.get(crossroadid));
                //System.out.println(centroid);
                if (null == centroid || centroid.split(",").length != 2) {
                    continue;
                }
                intsVO.setIntsid(UUID.randomUUID().toString().replaceAll("-", ""));
                intsVO.setLongitude(GISUtils.formatPos(centroid.split(",")[0]));
                intsVO.setLatitude(GISUtils.formatPos(centroid.split(",")[1]));
                intsVO.setXzqh(road.getXzqh());
                intsVO.setIntsname(road.getRoadname() + roadMap.get(crossroadid).getRoadname());
                intsVO.setCrosspoints(crossMap.get(crossroadid));
                intslist.add(intsVO);
                allIntsList.add(intsVO);

                RtNodeVO nodeVO = new RtNodeVO();
                nodeVO.setNodeid(centroid);
                nodeVO.setX(intsVO.getLongitude());
                nodeVO.setY(intsVO.getLatitude());
                nodeVO.setInstid(intsVO.getIntsid());
                nodelist.add(nodeVO);
            }
            this.routeDataHandlerDAO.insertIntsAndNode(intslist, nodelist);


            //3 弧段数据处理
            List<RtArcVO> arcList = new ArrayList<RtArcVO>();
            for (RtRoadLinkVO link : newLinkList) {
                //3.1 根据交叉点将roadlink断链
                String[] temparr = link.getStrcoords().split(",");
                int pointnum = temparr.length / 2;
                List<String> prePointList = new ArrayList<String>();
                String newstrcoords = "";
                if(link.getCrosspoints() == null || link.getCrosspoints().equalsIgnoreCase("")){
                    continue;
                }
                String[] cpstr = link.getCrosspoints().split(",");

                Map<Integer, String> crosspints = new HashMap<Integer, String>();
                if (cpstr.length < 3) {
                    continue;
                }
                for (int cpcount = 0; cpcount < cpstr.length / 3; cpcount++) {
                    int pos = Integer.parseInt(cpstr[cpcount * 3 + 2]);
                    String strcoord = cpstr[cpcount * 3] + "," + cpstr[cpcount * 3 + 1];
                    crosspints.put(pos, strcoord);
                }
                int m;
                for (m = 0; m < pointnum; m++) {
                    prePointList.add(temparr[m * 2] + "," + temparr[m * 2 + 1]);
                }
                for (m = 0; m < pointnum; m++) {
                    if(crosspints.get(m-1)==null){
                        newstrcoords+=prePointList.get(m)+",";
                    }else{
                        if(prePointList.get(m).equalsIgnoreCase(crosspints.get(m-1))){
                            newstrcoords+=prePointList.get(m)+"&"+prePointList.get(m)+",";
                        }else{
                            newstrcoords+=prePointList.get(m)+","+crosspints.get(m-1)+"&"+crosspints.get(m-1)+",";
                        }
                    }
                }

                newstrcoords = newstrcoords.substring(0,newstrcoords.length()-1);
                String[] arcs = newstrcoords.split("&");
                //3.2 判断新生成的arc的开始、结束节点
                for(String arcstr:arcs){
                    if(arcstr.split(",").length<4){
                        continue;
                    }
                    RtArcVO arc = new RtArcVO();
                    arc.setArcid(UUID.randomUUID().toString().replaceAll("-", ""));
                    arc.setArclength(Double.toString(GISUtils.getRoadLength(arcstr)));
                    arc.setStrcoords(arcstr);
                    arc.setRoadid(road.getRoadid());
                    arc.setDirection(GISUtils.getDirection(arcstr));


                    String[] tempstr = arcstr.split(",");
                    String startpoint = GISUtils.formatPos(tempstr[0])+","+GISUtils.formatPos(tempstr[1]);
                    String endpoint = GISUtils.formatPos(tempstr[tempstr.length-2])+","+GISUtils.formatPos(tempstr[tempstr.length-1]);
                    for(RtIntsVO ints:allIntsList){
                        if(arc.getStartnode()!=null && arc.getEndnode()!=null){
                            break;
                        }
                        if(ints.getCrosspoints().indexOf(endpoint)>=0){
                            arc.setEndnode(ints.getLongitude()+","+ints.getLatitude());
                        }
                        if(ints.getCrosspoints().indexOf(startpoint)>=0){
                            arc.setStartnode(ints.getLongitude()+","+ints.getLatitude());
                        }
                    }
                    if(arc.getStartnode() == null){
                        arc.setStartnode(startpoint);
                    }
                    if(arc.getEndnode() == null){
                        arc.setEndnode(endpoint);
                    }
                    arcList.add(arc);

                }

            }
            this.routeDataHandlerDAO.insertRouteArc(arcList);
            //4 计算安装点与路口的关系

        }


    }

    /**
     * 查询节点在边中的位置次序
     *
     * @param nodeCoord
     * @param roadLink
     * @return
     */
    public int getNodePosInLink(String nodeCoord, RtRoadLinkVO roadLink) {
        String[] linkNodes = roadLink.getStrcoords().split(",");

        String startNode = linkNodes[0] + "," + linkNodes[1]; //边的起始节点
        int linknodecount = linkNodes.length / 2; //边的顶点数
        String currLink = startNode;
        int i = 1;
        for (i = 1; i < linknodecount; i++) {
            Double qdis = GISUtils.getRoadLength(currLink + "," + nodeCoord);
            currLink = currLink + "," + linkNodes[i * 2] + "," + linkNodes[i * 2 + 1];
            Double dis = GISUtils.getRoadLength(currLink);
            if (dis >= qdis) {
                break;
            }
        }
        return i;
    }



    /**
     * 计算多边形质心
     *
     * @param pointstr
     * @return
     */
    public String getCentroid(String pointstr) {
        //System.out.println("------"+pointstr);
        String result = "";

        String[] pointStrArr = pointstr.split(",");

        Double x = 0d;
        Double y = 0d;
        String[] points = new String[pointStrArr.length / 2];
        for (int m = 0; m < pointStrArr.length / 2; m++) {
            x += Double.parseDouble(pointStrArr[m * 2]);
            y += Double.parseDouble(pointStrArr[m * 2 + 1]);
        }
        x = x / points.length;
        y = y / points.length;
        result = GISUtils.formatPos(Double.toString(x)) + "," + GISUtils.formatPos(Double.toString(y));

        return result;
    }


    private String joinLink(RtRoadLinkVO link, List<RtRoadLinkVO> linkList, int direction) {
        if (link.getIsformatted().equalsIgnoreCase("1")) {
            return "";
        }
        link.setIsformatted("1");

        String strcoords = link.getStrcoords();
        //System.out.println("joinlink :"+strcoords);
        //计算link的起点和终点
        if (null == strcoords || strcoords.length() <= 0) {
            return "";
        }
        String[] strcrdArr = strcoords.split(",");
        int arrlength = strcrdArr.length;
        if (arrlength < 4) {
            return "";
        }
        String startpoint = strcrdArr[0] + "," + strcrdArr[1];
        String endpoint = strcrdArr[arrlength - 2] + "," + strcrdArr[arrlength - 1];
        boolean hasjoinedstart = false;
        boolean hasjoinedend = false;
        for (RtRoadLinkVO cmplink : linkList) {
            if (cmplink.getIsformatted().equalsIgnoreCase("1") || cmplink.getLinkid().equalsIgnoreCase(link.getLinkid())
                    || cmplink.getStrcoords().equalsIgnoreCase(link.getStrcoords())) {
                continue;
            }

            if (cmplink.getStrcoords().startsWith(startpoint) && !hasjoinedstart && (direction == 1 || direction == 0)) {//起点相同
                cmplink.setStrcoords(this.resetDirection(cmplink.getStrcoords()));
                strcoords = this.joinLink(cmplink, linkList, 1) + strcoords.substring(startpoint.length());
                hasjoinedstart = true;
            } else if (cmplink.getStrcoords().endsWith(startpoint) && !hasjoinedstart && (direction == 1 || direction == 0)) {//终点与起点相同
                //System.out.println("joining ews---"+cmplink.getStrcoords());
                strcoords = this.joinLink(cmplink, linkList, 1) + strcoords.substring(startpoint.length());
                hasjoinedstart = true;
                //System.out.println("after joining---"+strcoords);
            } else if (cmplink.getStrcoords().startsWith(endpoint) && !hasjoinedend && (direction == 2 || direction == 0)) {//起点与终点相同
                //System.out.println("joining swe---"+cmplink.getStrcoords());
                strcoords = strcoords.substring(0, strcoords.length() - endpoint.length()) + this.joinLink(cmplink, linkList, 2);
                hasjoinedend = true;
                //System.out.println("after joining---"+strcoords);
            } else if (cmplink.getStrcoords().endsWith(endpoint) && !hasjoinedend && (direction == 2 || direction == 0)) {//终点与终点相同
                cmplink.setStrcoords(this.resetDirection(cmplink.getStrcoords()));
                //System.out.println("joining ewe---"+cmplink.getStrcoords());
                strcoords = strcoords.substring(0, strcoords.length() - endpoint.length()) + this.joinLink(cmplink, linkList, 2);
                hasjoinedend = true;
                //System.out.println("after joining---"+strcoords);
            }

            strcrdArr = strcoords.split(",");
            startpoint = strcrdArr[0] + "," + strcrdArr[1];
            endpoint = strcrdArr[arrlength - 2] + "," + strcrdArr[arrlength - 1];
        }
        //System.out.println("joinlink end :"+strcoords);
        return strcoords;
    }


    public String resetDirection(String strcoords) {
        String[] strArr = strcoords.split(",");
        int pointnum = strArr.length / 2;
        String newstrcrd = "";
        for (int i = pointnum - 1; i >= 0; i--) {
            newstrcrd += strArr[i * 2] + "," + strArr[i * 2 + 1] + ",";
        }
        newstrcrd = newstrcrd.substring(0, newstrcrd.length() - 1);
        return newstrcrd;
    }

}
