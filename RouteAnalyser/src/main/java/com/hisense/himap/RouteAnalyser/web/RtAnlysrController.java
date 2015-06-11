package com.hisense.himap.routeAnalyser.web;

import com.hisense.himap.routeAnalyser.logic.IRouteAnalyser;
import com.hisense.himap.routeAnalyser.vo.QueryNextIntsResultVO;
import com.hisense.himap.routeAnalyser.vo.QueryNextIntsVO;
import com.hisense.himap.routeAnalyser.vo.QueryPathResultVO;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

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
        //System.out.println(request.getParameter("pointid"));
        QueryNextIntsVO query = new QueryNextIntsVO();
        query.setPointid(request.getParameter("pointid"));
        query.setDirection(request.getParameter("direction"));
        query.setLaneno(request.getParameter("laneno"));
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
        return routeAnalyser.getShortestPath(Arrays.asList(points));
    }
}
