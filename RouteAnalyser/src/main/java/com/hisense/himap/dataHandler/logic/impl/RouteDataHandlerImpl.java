package com.hisense.himap.dataHandler.logic.impl;

import com.hisense.himap.analyser.vo.*;
import com.hisense.himap.dataHandler.logic.IRouteDataHandler;
import com.hisense.himap.dataHandler.dao.RouteDataHandlerDAO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by lxb on 2015-6-9.
 */

@Service("RouteDataHandler")
public class RouteDataHandlerImpl implements IRouteDataHandler {

    @Inject
    private RouteDataHandlerDAO routeDataHandlerDAO;

    private List<RtRoad> roadList;

    //预处理路网数据
    public void preOperRoad() {

        roadList = routeDataHandlerDAO.getRtRoad();
        int i = 0;
        for (RtRoad road : roadList) {
            //1.循环路段列表，将邻接的路段边合并
            i++;
            List<RtRoadLinkVO> linkList = routeDataHandlerDAO.getLinkByRoadID(road.getRoadid());//原始link
            List<RtRoadLinkVO> newLinkList = new ArrayList<RtRoadLinkVO>();//合并后的link
            for (RtRoadLinkVO link : linkList) {
                //如果已经合并
                if (link.getIsformatted().equalsIgnoreCase("1")) {
                    continue;
                }
                String strcoords = this.joinLink(link, linkList,0);
                link.setStrcoords(strcoords);
                link.setLinkid("F" + link.getLinkid());
                newLinkList.add(link);
            }
            System.out.println(i+":"+road.getRoadname()+"---"+newLinkList.size());
            //routeDataHandlerDAO.insertFormattedLink(newLinkList);

            //2.路口处理
            //2.1 查询与该路相交的所有其他路段
            for(RtRoadLinkVO link:newLinkList){
                List<RtRoadLinkVO> list = routeDataHandlerDAO.getCrossLinkById(link.getLinkid());
            }


        }



    }


    private String joinLink(RtRoadLinkVO link, List<RtRoadLinkVO> linkList,int direction) {
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

            if (cmplink.getStrcoords().startsWith(startpoint) && !hasjoinedstart && (direction == 1 || direction==0)) {//起点相同
                cmplink.setStrcoords(this.resetDirection(cmplink.getStrcoords()));
                strcoords = this.joinLink(cmplink, linkList,1) +strcoords.substring(startpoint.length());
                hasjoinedstart = true;
            } else if (cmplink.getStrcoords().endsWith(startpoint) && !hasjoinedstart && (direction == 1 || direction==0)) {//终点与起点相同
                //System.out.println("joining ews---"+cmplink.getStrcoords());
                strcoords = this.joinLink(cmplink, linkList, 1) + strcoords.substring(startpoint.length());
                hasjoinedstart = true;
                //System.out.println("after joining---"+strcoords);
            } else if (cmplink.getStrcoords().startsWith(endpoint)  && !hasjoinedend && (direction == 2 || direction==0)) {//起点与终点相同
                //System.out.println("joining swe---"+cmplink.getStrcoords());
                strcoords = strcoords.substring(0,strcoords.length()-endpoint.length())+this.joinLink(cmplink, linkList,2);
                hasjoinedend = true;
                //System.out.println("after joining---"+strcoords);
            } else if (cmplink.getStrcoords().endsWith(endpoint)  && !hasjoinedend && (direction == 2 || direction==0)) {//终点与终点相同
                cmplink.setStrcoords(this.resetDirection(cmplink.getStrcoords()));
                //System.out.println("joining ewe---"+cmplink.getStrcoords());
                strcoords = strcoords.substring(0,strcoords.length()-endpoint.length())+this.joinLink(cmplink, linkList,2);
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
