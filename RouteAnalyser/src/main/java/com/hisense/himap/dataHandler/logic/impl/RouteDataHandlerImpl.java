package com.hisense.himap.dataHandler.logic.impl;

import com.hisense.himap.analyser.vo.*;
import com.hisense.himap.dataHandler.logic.IRouteDataHandler;
import com.hisense.himap.dataHandler.dao.RouteDataHandlerDAO;
import com.hisense.himap.utils.GISUtils;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
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
    private Map<String,String> allIntsMap;
    private List<RtIntsVO> allIntsList;
    private Map<String,RtRoadLinkVO> allLinkMap;

    //预处理路网数据
    public void preOperRoad() {
        roadMap = new HashMap<String, RtRoad>();
        roadList = routeDataHandlerDAO.getRtRoad();
        Map<String, RtRoad> handledRoad = new HashMap<String, RtRoad>();
        for (RtRoad road : roadList) {
            roadMap.put(road.getRoadid(), road);
        }
        allIntsMap = new HashMap<String, String>();
        allLinkMap = new HashMap<String, RtRoadLinkVO>();
        allIntsList = new ArrayList<RtIntsVO>();
        int i = 0;
        /*for (RtRoad road : roadList) {
            i++;
            //1.将邻接的路段边合并
            List<RtRoadLinkVO> newLinkList = new ArrayList<RtRoadLinkVO>();//合并后的link
            List<RtRoadLinkVO> linkList = routeDataHandlerDAO.getPreLinkByRoadID(road.getRoadid());//原始link
            for (RtRoadLinkVO link : linkList) {
                //如果已经合并
                if (link.getIsformatted().equalsIgnoreCase("1") || allLinkMap.get(link.getLinkid()) != null) {
                    continue;
                }
                String strcoords = this.joinLink(link, linkList, 0);
                link.setStrcoords(strcoords);
                link.setLinkid("F" + link.getLinkid());
                allLinkMap.put(link.getLinkid(), link);
                newLinkList.add(link);
            }
            //routeDataHandlerDAO.insertFormattedLink(newLinkList);
            System.out.println(i + ":" + road.getRoadname() + " link---" + newLinkList.size());
        }*/

        i = 0;
        for (RtRoad road : roadList) {
            i++;
            handledRoad.put(road.getRoadid(), road);
            List<RtRoadLinkVO> newLinkList = routeDataHandlerDAO.getFormattedLinkByRoadID(road.getRoadid());//合并后的link
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
                String crosspoints = crossMap.get(crossroadid);
                String centroid = this.getCentroid(crosspoints);
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
                intsVO.setRoadid1(road.getRoadid());
                intsVO.setRoadid2(crossroadid);
                intslist.add(intsVO);
                allIntsList.add(intsVO);

                String[] pointStrArr = crosspoints.split(",");
                for (int m = 0; m < pointStrArr.length / 2; m++) {
                    allIntsMap.put(pointStrArr[m*2]+","+pointStrArr[m*2+1],centroid);
                }

                RtNodeVO nodeVO = new RtNodeVO();
                nodeVO.setNodeid(centroid);
                nodeVO.setX(intsVO.getLongitude());
                nodeVO.setY(intsVO.getLatitude());
                nodeVO.setInstid(intsVO.getIntsid());
                nodelist.add(nodeVO);
            }



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
                if (cpstr.length < 3) {
                    continue;
                }
                Map<Integer, String> crosspints = new HashMap<Integer, String>();

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
                    if(crosspints.get(m)==null || m==0 || m==pointnum-1){
                        newstrcoords+=prePointList.get(m)+",";
                    }else{
                        String pointstr = GISUtils.formatPos(prePointList.get(m).split(",")[0])+","+GISUtils.formatPos(prePointList.get(m).split(",")[1]);
                        if(pointstr.equalsIgnoreCase(crosspints.get(m))){
                            newstrcoords+=prePointList.get(m)+"&"+prePointList.get(m)+",";
                        }else{
                            newstrcoords+=crosspints.get(m)+"&"+crosspints.get(m)+","+prePointList.get(m)+",";

                    } }
                }

                newstrcoords = newstrcoords.substring(0,newstrcoords.length()-1);
                String[] arcs = newstrcoords.split("&");
                //System.out.println(newstrcoords);
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
                    arc.setLinkid(link.getLinkid());


                    String[] tempstr = arcstr.split(",");
                    String startpoint = GISUtils.formatPos(tempstr[0])+","+GISUtils.formatPos(tempstr[1]);
                    String endpoint = GISUtils.formatPos(tempstr[tempstr.length-2])+","+GISUtils.formatPos(tempstr[tempstr.length-1]);
                    if(allIntsMap.get(startpoint)!=null){
                        arc.setStartnode(allIntsMap.get(startpoint));
                    }else{
                        arc.setStartnode(startpoint);
                        RtNodeVO nodeVO = new RtNodeVO();
                        nodeVO.setNodeid(startpoint);
                        nodeVO.setX(startpoint.split(",")[0]);
                        nodeVO.setY(startpoint.split(",")[1]);
                        nodelist.add(nodeVO);

                    }
                    if(allIntsMap.get(endpoint)!=null){
                        arc.setEndnode(allIntsMap.get(endpoint));
                    }else{
                        arc.setEndnode(endpoint);
                        RtNodeVO nodeVO = new RtNodeVO();
                        nodeVO.setNodeid(endpoint);
                        nodeVO.setX(endpoint.split(",")[0]);
                        nodeVO.setY(endpoint.split(",")[1]);
                        nodelist.add(nodeVO);
                    }
                    arcList.add(arc);
                }
            }
            //this.routeDataHandlerDAO.insertRouteArc(arcList);
            //this.routeDataHandlerDAO.insertIntsAndNode(intslist, nodelist);
            System.out.println(i + ":" + road.getRoadname() + " link---" + newLinkList.size()+" ints----"+intslist.size()+" arc----"+arcList.size());

            //break;
        }
        i = 0;
        for(RtIntsVO ints:allIntsList){
            i++;
            String pos = ints.getLongitude()+","+ints.getLatitude();
            List<RtNodeVO> nodeList = this.routeDataHandlerDAO.getNearNodeWithNullInts(pos);
            this.routeDataHandlerDAO.deleteRouteNode(nodeList);
            for(RtNodeVO node:nodeList){
                this.routeDataHandlerDAO.updateArcNode(node.getNodeid(),pos);
            }
            System.out.println(i + ":" +allIntsList.size());
        }



    }

    /**
     * 反转roadlink
     *
     * @param linkid link编号
     */
    public void revertRoadLink(String linkid) {
        RtRoadLinkVO link = this.routeDataHandlerDAO.getLinkByID(linkid);
        link.setStrcoords(this.resetDirection(link.getStrcoords()));
        this.routeDataHandlerDAO.updateLinkStrcoords(linkid,link.getStrcoords());
        List<RtArcVO> arcList = this.routeDataHandlerDAO.getArcByLinkId(linkid);
        List<RtArcVO> revertedArcList = new ArrayList<RtArcVO>();
        for(RtArcVO arc:arcList){
            arc.setStrcoords(this.resetDirection(arc.getStrcoords()));
            String startnode = arc.getStartnode();
            arc.setStartnode(arc.getEndnode());
            arc.setEndnode(startnode);
            revertedArcList.add(arc);
        }
        this.routeDataHandlerDAO.updateRouteArc(revertedArcList);
    }

    /**
     * 更新link信息
     * @param link link对象
     */
    public void updateRoadLink(RtRoadLinkVO link) {
        //更新link的坐标
        this.routeDataHandlerDAO.updateLinkStrcoords(link.getLinkid(),link.getStrcoords());
        //
    }

    /**
     * 更新arc信息
     *
     * @param arc arc对象
     */
    @Override
    public void updateArc(RtArcVO arc) {
        //处理开始节点和结束节点
        String startnode = this.getVetrix(arc.getStrcoords(),0);
        String endnode = this.getVetrix(arc.getStrcoords(),1);
        List<RtNodeVO> tempNodeList = new ArrayList<RtNodeVO>();
        RtNodeVO tempstartnode = null;
        RtNodeVO tempendnode = null;
        List<RtNodeVO> newNodeList = new ArrayList<RtNodeVO>();
        List<RtIntsVO> newIntsList = new ArrayList<RtIntsVO>();
        //原始的arc数据
        RtArcVO prearc = this.routeDataHandlerDAO.getArcById(arc.getArcid());
        if(prearc.getStrcoords().equalsIgnoreCase(arc.getStrcoords())){
            return;
        }

        tempNodeList = this.routeDataHandlerDAO.getNearNode(startnode,"30");
        if(tempNodeList.size()>0){ //如果周边存在节点
            tempstartnode = tempNodeList.get(0);
            startnode = tempstartnode.getNodeid();
        }else{
            RtNodeVO node = new RtNodeVO();
            node.setNodeid(startnode);
            node.setX(startnode.split(",")[0]);
            node.setY(startnode.split(",")[1]);
            newNodeList.add(node);
        }
        tempNodeList = this.routeDataHandlerDAO.getNearNode(endnode,"30");
        if(tempNodeList.size()>0){
            tempendnode = tempNodeList.get(0);
            endnode = tempendnode.getNodeid();
        }else{
            RtNodeVO node = new RtNodeVO();
            node.setNodeid(endnode);
            node.setX(endnode.split(",")[0]);
            node.setY(endnode.split(",")[1]);
            newNodeList.add(node);
        }

        //插入新增的节点
        if(newNodeList.size()>0){
            this.routeDataHandlerDAO.insertNode(newNodeList);
        }

        //更新arc
        //arc.setArcid(UUID.randomUUID().toString().replaceAll("-", ""));
        arc.setStartnode(startnode);
        arc.setEndnode(endnode);
        arc.setArclength(Double.toString(GISUtils.getRoadLength(arc.getStrcoords())));
        arc.setDirection(GISUtils.getDirection(arc.getStrcoords()));
        List<RtArcVO> arclist = new ArrayList<RtArcVO>();
        arclist.add(arc);
        this.routeDataHandlerDAO.updateRouteArc(arclist);

        //插入新增的路口
        if(tempstartnode!=null && !tempstartnode.getNodeid().equalsIgnoreCase(prearc.getStartnode())&& (tempstartnode.getInstid()==null || tempstartnode.getInstid().equalsIgnoreCase(""))){
            RtIntsVO ints = this.getNodeInts(tempstartnode);
            if(ints!=null){
                newIntsList.add(ints);
            }
        }
        if(tempendnode!=null && !tempendnode.getNodeid().equalsIgnoreCase(prearc.getEndnode()) && (tempendnode.getInstid()==null || tempendnode.getInstid().equalsIgnoreCase(""))){
            RtIntsVO ints = this.getNodeInts(tempendnode);
            if(ints!=null){
                newIntsList.add(ints);
            }
        }
        if(newIntsList.size()>0){
            this.routeDataHandlerDAO.insertInts(newIntsList);
        }

    }


    /**
     * 新增arc
     *
     * @param arc arc对象
     */
    @Override
    public void insertArc(RtArcVO arc) {
        //处理开始节点和结束节点
        String startnode = this.getVetrix(arc.getStrcoords(),0);
        String endnode = this.getVetrix(arc.getStrcoords(),1);
        List<RtNodeVO> tempNodeList = new ArrayList<RtNodeVO>();
        RtNodeVO tempstartnode = null;
        RtNodeVO tempendnode = null;
        List<RtNodeVO> newNodeList = new ArrayList<RtNodeVO>();
        List<RtIntsVO> newIntsList = new ArrayList<RtIntsVO>();

        tempNodeList = this.routeDataHandlerDAO.getNearNode(startnode,"30");
        if(tempNodeList.size()>0){ //如果周边存在节点
            tempstartnode = tempNodeList.get(0);
            startnode = tempstartnode.getNodeid();
        }else{
            RtNodeVO node = new RtNodeVO();
            node.setNodeid(startnode);
            node.setX(startnode.split(",")[0]);
            node.setY(startnode.split(",")[1]);
            newNodeList.add(node);
        }
        tempNodeList = this.routeDataHandlerDAO.getNearNode(endnode,"30");
        if(tempNodeList.size()>0){
            tempendnode = tempNodeList.get(0);
            endnode = tempendnode.getNodeid();
        }else{
            RtNodeVO node = new RtNodeVO();
            node.setNodeid(endnode);
            node.setX(endnode.split(",")[0]);
            node.setY(endnode.split(",")[1]);
            newNodeList.add(node);
        }

        //插入新增的节点
        if(newNodeList.size()>0){
            this.routeDataHandlerDAO.insertNode(newNodeList);
        }

        //插入arc
        arc.setArcid(UUID.randomUUID().toString().replaceAll("-", ""));
        arc.setStartnode(startnode);
        arc.setEndnode(endnode);
        arc.setArclength(Double.toString(GISUtils.getRoadLength(arc.getStrcoords())));
        arc.setDirection(GISUtils.getDirection(arc.getStrcoords()));
        List<RtArcVO> arclist = new ArrayList<RtArcVO>();
        arclist.add(arc);
        this.routeDataHandlerDAO.insertRouteArc(arclist);

        //插入新增的路口
        if(tempstartnode!=null && (tempstartnode.getInstid()==null || tempstartnode.getInstid().equalsIgnoreCase(""))){
            RtIntsVO ints = this.getNodeInts(tempstartnode);
            if(ints!=null){
                newIntsList.add(ints);
            }
        }
        if(tempendnode!=null && (tempendnode.getInstid()==null || tempendnode.getInstid().equalsIgnoreCase(""))){
            RtIntsVO ints = this.getNodeInts(tempendnode);
            if(ints!=null){
                newIntsList.add(ints);
            }
        }
        if(newIntsList.size()>0){
            this.routeDataHandlerDAO.insertInts(newIntsList);
        }

    }

    /**
     * 计算节点所在的路口
     * @param node
     * @return
     */
    public RtIntsVO getNodeInts(RtNodeVO node){
        List<RtArcVO> temparclist = this.routeDataHandlerDAO.getArcByNode(node.getNodeid());
        Map<String,String> roadmap = new HashMap<String, String>();
        for(RtArcVO temparc:temparclist){
            roadmap.put(temparc.getRoadid(),temparc.getRoadname());
        }
        if(roadmap.size()>1){
            Iterator iter = roadmap.keySet().iterator();
            String intsname = "";
            String roadids = "";
            while(iter.hasNext()){
                String roadid = iter.next().toString();
                intsname +=roadmap.get(roadid);
                roadids+=roadid+",";
            }
            RtIntsVO intsVO = new RtIntsVO();
            intsVO.setIntsid(UUID.randomUUID().toString().replaceAll("-", ""));
            intsVO.setLongitude(node.getNodeid().split(",")[0]);
            intsVO.setLatitude(node.getNodeid().split(",")[1]);
            intsVO.setIntsname(intsname);
            intsVO.setRoadid1(roadids.split(",")[0]);
            intsVO.setRoadid2(roadids.split(",")[1]);
            return intsVO;
        }else{
            return  null;
        }

    }

    /**
     * 计算路线的顶点
     * @param strcoords 路线坐标
     * @param vtype 顶点类型，0:起点，1：终点
     * @return
     */
    public String getVetrix(String strcoords,int vtype){
        String[] strArr =strcoords.split(",");
        if(strArr.length<=2){
            return strcoords;
        }
        String startnode = strArr[0]+","+strArr[1];
        String endnode = strArr[strArr.length-2]+","+strArr[strArr.length-1];
        return (vtype == 0?startnode:endnode);
    }

    /**
     * 删除arc
     *
     * @param arc arc对象
     */
    @Override
    public void deleteArc(RtArcVO arc) {
        this.routeDataHandlerDAO.deleteArcById(arc.getArcid());
    }

    @Override
    public void updateRoadStatus(String roadid, String status) {
        this.routeDataHandlerDAO.updateRoadStatus(roadid,status);
    }

    /**
     * 更新路口信息
     *
     * @param ints 路口对象
     */
    public void updateIntersection(RtIntsVO ints) {

    }

    /**
     * 删除路口信息
     *
     * @param intsid 路口编号
     */
    public void deleteIntersection(String intsid) {

    }

    /**
     * 查询符合条件的道路列表
     *
     * @param roadname
     * @param xzqh
     * @return
     */
    @Override
    public List getRoadList(String roadname, String xzqh) {
        return this.routeDataHandlerDAO.getRtRoadByParam(roadname,xzqh);
    }

    /**
     * 查询符合条件的路口列表
     *
     * @param intsname 路口名称
     * @param xzqh     行政区划
     * @return
     */
    @Override
    public List getIntsList(String intsname, String xzqh) {
        return this.routeDataHandlerDAO.getRtIntsByParam(intsname, xzqh);
    }

    @Override
    public List getLaneList(String intsid) {
        return this.routeDataHandlerDAO.getLaneByIntsid(intsid);
    }

    public void updateLane(String intsid,List<RtLaneVO> lanelist) {
        this.routeDataHandlerDAO.deleteLaneByIntsid(intsid);
        for(RtLaneVO lane:lanelist){
            this.routeDataHandlerDAO.insertLane(lane);
        }
    }

    /**
     * 根据道路编号查询link列表
     *
     * @param roadid
     * @return
     */
    @Override
    public List getLinkList(String roadid) {
        return this.routeDataHandlerDAO.getLinkByRoadID(roadid);
    }

    /**
     * 根据道路编号查询arc列表
     *
     * @param roadid 道路编号
     * @return arc列表
     */
    @Override
    public List getArcList(String roadid) {
        return this.routeDataHandlerDAO.getArcByRoadId(roadid);
    }

    @Override
    public List getXZQH() {
        return  this.routeDataHandlerDAO.getXZQH();
    }

    /**
     * 查询节点在边中的位置次序
     *
     * @param nodeCoord 节点坐标
     * @param roadLink  link对象
     * @return 位置
     */
    public int getNodePosInLink(String nodeCoord, RtRoadLinkVO roadLink) {
        String[] linkNodes = roadLink.getStrcoords().split(",");

        String startNode = linkNodes[0] + "," + linkNodes[1]; //边的起始节点
        int linknodecount = linkNodes.length / 2; //边的顶点数
        String currLink = startNode;
        int i = 0;
        if(nodeCoord.equalsIgnoreCase(GISUtils.formatPos(linkNodes[0])+","+GISUtils.formatPos(linkNodes[1]))){
            return i;
        }
        for (i = 1; i < linknodecount; i++) {
            if(nodeCoord.equalsIgnoreCase(GISUtils.formatPos(linkNodes[i * 2])+","+GISUtils.formatPos(linkNodes[i * 2+1]))){
                break;
            }else{
                Double qdis = GISUtils.getRoadLength(currLink + "," + nodeCoord);
                currLink = currLink + "," + linkNodes[i * 2] + "," + linkNodes[i * 2 + 1];
                Double dis = GISUtils.getRoadLength(currLink);
                if (dis >= qdis) {
                    break;
                }
            }
        }
        return i;
    }



    /**
     * 计算多边形质心
     *
     * @param pointstr 多边形坐标字符串
     * @return 质心坐标字符串
     */
    public String getCentroid(String pointstr) {
        //System.out.println("------"+pointstr);
        String result = "";

        String[] pointStrArr = pointstr.split(",");

        Double x = 0d;
        Double y = 0d;
        for (int m = 0; m < pointStrArr.length / 2; m++) {
            x += Double.parseDouble(pointStrArr[m * 2]);
            y += Double.parseDouble(pointStrArr[m * 2 + 1]);
        }
        x = x / (pointStrArr.length / 2);
        y = y / (pointStrArr.length / 2);
        result = GISUtils.formatPos(Double.toString(x)) + "," + GISUtils.formatPos(Double.toString(y));

        return result;
    }

    private String joinManualLink(RtRoadLinkVO link, List<RtRoadLinkVO> linkList, int direction) {
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
        int indirection = GISUtils.getDirection(strcoords);
        for (RtRoadLinkVO cmplink : linkList) {
            if (cmplink.getIsformatted().equalsIgnoreCase("1") || cmplink.getLinkid().equalsIgnoreCase(link.getLinkid())
                    || cmplink.getStrcoords().equalsIgnoreCase(link.getStrcoords())) {
                continue;
            }
            String[] cmpstrcrdArr = cmplink.getStrcoords().split(",");
            int cmparrlength = cmpstrcrdArr.length;
            String cmpstartpoint = cmpstrcrdArr[0] + "," + cmpstrcrdArr[1];
            String cmpendpoint = cmpstrcrdArr[cmparrlength - 2] + "," + cmpstrcrdArr[cmparrlength - 1];
            int cmpindirection = GISUtils.getDirection(cmplink.getStrcoords());

             if (GISUtils.dist(cmpendpoint,startpoint)<=20 && Math.abs(cmpindirection-indirection)!=1 && (direction == 1 || direction == 0)) {//终点与起点相同
                strcoords = this.joinLink(cmplink, linkList, 1) + ","+strcoords;
                //hasjoinedstart = true;
            } else if (GISUtils.dist(cmpstartpoint,endpoint)<=20 && Math.abs(cmpindirection-indirection)!=1 && (direction == 2 || direction == 0)) {//起点与终点相同
                strcoords = strcoords + ","+ this.joinLink(cmplink, linkList, 2);
                //hasjoinedend = true;
            }

            strcrdArr = strcoords.split(",");
            arrlength = strcrdArr.length;
            startpoint = strcrdArr[0] + "," + strcrdArr[1];
            endpoint = strcrdArr[arrlength - 2] + "," + strcrdArr[arrlength - 1];
        }
        //System.out.println("joinlink end :"+strcoords);
        return strcoords;
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
                //hasjoinedstart = true;
            } else if (cmplink.getStrcoords().endsWith(startpoint) && !hasjoinedstart && (direction == 1 || direction == 0)) {//终点与起点相同
                //System.out.println("joining ews---"+cmplink.getStrcoords());
                strcoords = this.joinLink(cmplink, linkList, 1) + strcoords.substring(startpoint.length());
                //hasjoinedstart = true;
                //System.out.println("after joining---"+strcoords);
            } else if (cmplink.getStrcoords().startsWith(endpoint) && !hasjoinedend && (direction == 2 || direction == 0)) {//起点与终点相同
                //System.out.println("joining swe---"+cmplink.getStrcoords());
                strcoords = strcoords.substring(0, strcoords.length() - endpoint.length()) + this.joinLink(cmplink, linkList, 2);
                //hasjoinedend = true;
                //System.out.println("after joining---"+strcoords);
            } else if (cmplink.getStrcoords().endsWith(endpoint) && !hasjoinedend && (direction == 2 || direction == 0)) {//终点与终点相同
                cmplink.setStrcoords(this.resetDirection(cmplink.getStrcoords()));
                //System.out.println("joining ewe---"+cmplink.getStrcoords());
                strcoords = strcoords.substring(0, strcoords.length() - endpoint.length()) + this.joinLink(cmplink, linkList, 2);
                //hasjoinedend = true;
                //System.out.println("after joining---"+strcoords);
            }

            strcrdArr = strcoords.split(",");
            arrlength = strcrdArr.length;
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
