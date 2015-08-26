package com.hisense.himap.analyser.web;

import com.hisense.himap.analyser.logic.IRouteAnalyser;
import com.hisense.himap.analyser.vo.QueryNextIntsResultVO;
import com.hisense.himap.analyser.vo.QueryNextIntsVO;
import com.hisense.himap.analyser.vo.QueryPathResultVO;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by lxb on 2015-6-6.
 */
@Controller
@Scope("prototype")
public class RtAnlysrController {

    @Inject
    @Named("RouteAnalyser")
    private IRouteAnalyser routeAnalyser;

    @RequestMapping("/getNextInts.do")
    @ResponseBody
    public List<QueryNextIntsResultVO> getNextInts(HttpServletRequest request){
        QueryNextIntsVO query = new QueryNextIntsVO();
        query.setPointid(request.getParameter("pointid"));
        query.setDirection(request.getParameter("direction"));
        query.setLaneno(request.getParameter("laneno"));
        //System.out.println(query.getPointid()+"--"+query.getDirection()+"--"+query.getLaneno());
        //List list = jdbcTemplate.queryForList("select * from route_road r");
        //System.out.println(list.size());
        return routeAnalyser.getNextInts(query);
    }

    @RequestMapping("/getShortestPath.do")
    @ResponseBody
    public List<QueryPathResultVO> getShortestPath(HttpServletRequest request){
        String paths = request.getParameter("points");
        if(null == paths || paths.length()<=0){
            return null;
        }
        String[] points = paths.split(",");
        List<String> pointArr = new ArrayList<String>();
        for(int i=0;i<points.length;i++){
            String point = points[i];
            if(point.indexOf(".")!=-1){
                point = point +","+points[++i];
            }
            pointArr.add(point);
        }
        return routeAnalyser.getShortestPath(pointArr);
    }


    @RequestMapping("/EzServer/EzMap")
    @ResponseBody
    public String  getTileImage(HttpServletRequest request){
        //http://10.16.1.109:9080/EzServer/EzMap?Service=getImage&Type=RGB&ZoomOffset=-1&Col=15407&Row=4616&Zoom=3&V=0.3
        String service = request.getParameter("Service");
        String rtype = request.getParameter("RGB");
        String zoomoffset = request.getParameter("ZoomOffset");
        String col = request.getParameter("Col");
        String row = request.getParameter("Row");
        String zoom = request.getParameter("Zoom");
        String v = request.getParameter("V");
        System.out.println("http://10.16.1.109:9080/EzServer/EzMap?Service="+service+"&Type="+rtype+"&ZoomOffset="+zoomoffset+"&Col="+col+"&Row="+row+"&Zoom="+zoom+"&V="+v);
        return "http://10.16.1.109:9080/EzServer/EzMap?Service="+service+"&Type="+rtype+"&ZoomOffset="+zoomoffset+"&Col="+col+"&Row="+row+"&Zoom="+zoom+"&V="+v;
    }
}
