package com.hisense.himap.dataHandler.web;

import com.fasterxml.jackson.core.JsonFactory;
import com.hisense.himap.analyser.vo.RtArcVO;
import com.hisense.himap.analyser.vo.RtLaneVO;
import com.hisense.himap.dataHandler.logic.IRouteDataHandler;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2015-6-15.
 */
@Controller
@Scope("prototype")
public class RtDtHndlrController {

    @Inject
    IRouteDataHandler routeDataHandler;

    @RequestMapping("/edit/preoper.do")
    @ResponseBody
    public String preOperRoad(HttpServletRequest request){
        //routeDataHandler.preOperRoad();
        routeDataHandler.preDnode();
        return "success";
    }

    @RequestMapping("/edit/getXZQH.do")
    @ResponseBody
    public List getXZQH(HttpServletRequest request){
        return routeDataHandler.getXZQH();
    }

    @RequestMapping("/edit/getRoad.do")
    @ResponseBody
    /**
     * 获得道路列表
     */
    public List getRoadList(HttpServletRequest request){
        String xzqh = request.getParameter("xzqh");
        String roadname = null;
        try {
            roadname = java.net.URLDecoder.decode(request.getParameter("roadname"),"utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        List list = routeDataHandler.getRoadList(roadname,xzqh);
        return list;
    }

    @RequestMapping("/edit/getLink.do")
    @ResponseBody
    /**
     * 获得道路link列表
     */
    public List getLinkList(HttpServletRequest request){
        String roadid = request.getParameter("roadid");
        return this.routeDataHandler.getLinkList(roadid);
    }

    @RequestMapping("/edit/getArc.do")
    @ResponseBody
    /**
     * 获得道路arc列表
     */
    public List getArcList(HttpServletRequest request){
        String roadid = request.getParameter("roadid");
        return this.routeDataHandler.getArcList(roadid);
    }

    @RequestMapping("/edit/saveArc.do")
    @ResponseBody
    /**
     * 保存道路arc列表
     */
    public String saveArc(HttpServletRequest request){
        String roadid = request.getParameter("roadid");
        String arcs = request.getParameter("arcarr");
        String[] arcArr = arcs.split("#");
        for(String arcstr:arcArr){
            if(arcstr.equalsIgnoreCase("")||arcstr.split("@").length<3){
                continue;
            }
            RtArcVO arc = new RtArcVO();
            arc.setArcid(arcstr.split("@")[0]);
            arc.setStrcoords(arcstr.split("@")[1]);
            arc.setRoadid(roadid);
            arc.setDelflag(arcstr.split("@")[2]);

            if(arc.getArcid().equalsIgnoreCase("--")){ //新增arc
                if(arc.getDelflag().equalsIgnoreCase("1")){
                    continue;
                }else{
                    this.routeDataHandler.insertArc(arc);
                }
            }else if(arc.getDelflag().equalsIgnoreCase("0")){ //更新arc
                this.routeDataHandler.updateArc(arc);
            }else{ //删除arc
                this.routeDataHandler.deleteArc(arc);
            }
        }
        this.routeDataHandler.updateRoadStatus(roadid,"1");
        return "success";
    }

    @RequestMapping("/edit/getInts.do")
    @ResponseBody
    /**
     * 获得路口列表
     */
    public List geIntsList(HttpServletRequest request){
        String xzqh = request.getParameter("xzqh");
        String intsname = null;
        try {
            intsname = java.net.URLDecoder.decode(request.getParameter("intsname"),"utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        List list = routeDataHandler.getIntsList(intsname, xzqh);
        return list;
    }
    
    @RequestMapping("/edit/deleteInts.do")
    @ResponseBody
    /**
     * 删除路口
     */
    public String deleteInts(HttpServletRequest request){
    	String intsid = request.getParameter("intsid");
    	try{
    		this.routeDataHandler.deleteInts(intsid);
    	}catch(Exception e){
    		
    	}
    	return "success";
    }

    @RequestMapping("/edit/getLane.do")
    @ResponseBody
    /**
     * 获得车道列表
     */
    public List getLaneList(HttpServletRequest request){
        String intsid = request.getParameter("intsid");
        return this.routeDataHandler.getLaneList(intsid);
    }


    @RequestMapping("/edit/saveLane.do")
    @ResponseBody
    /**
     * 保存道路arc列表
     */
    public String saveLane(HttpServletRequest request){
        String intsid = request.getParameter("intsid");
        String arcs = request.getParameter("lanearr");
        String[] laneArr = arcs.split("#");
        List<RtLaneVO> lanelist = new ArrayList<RtLaneVO>();
        for(String lanestr:laneArr){
            if(lanestr.equalsIgnoreCase("")||lanestr.split("@").length<3){
                continue;
            }
            String [] strarr = lanestr.split("@");
            RtLaneVO lane = new RtLaneVO();
            lane.setIntsid(intsid);
            lane.setDirection(strarr[0]);
            lane.setLaneno(strarr[1]);
            lane.setNthrough(Integer.parseInt(strarr[2]));
            lane.setNturnleft(Integer.parseInt(strarr[3]));
            lane.setNturnright(Integer.parseInt(strarr[4]));
            lane.setNturnround(Integer.parseInt(strarr[5]));
            lanelist.add(lane);
        }
        try {
            this.routeDataHandler.updateLane(intsid, lanelist);
        }catch(Exception e){
            return "false";
        }
        return "success";
    }

}
