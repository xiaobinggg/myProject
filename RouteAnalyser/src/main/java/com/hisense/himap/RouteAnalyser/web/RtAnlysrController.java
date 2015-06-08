package com.hisense.himap.RouteAnalyser.web;

import com.hisense.himap.RouteAnalyser.logic.IRouteAnalyser;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import javax.inject.Named;

/**
 * Created by lxb on 2015-6-6.
 */
@Controller
@Scope("prototype")
public class RtAnlysrController {

    @Inject
    @Named("RouteAnalyser")
    private IRouteAnalyser routeAnalyser;

    @RequestMapping("/sayHello.do")
    @ResponseBody
    public String sayHello(){
        //List list = jdbcTemplate.queryForList("select * from route_road r");
        //System.out.println(list.size());
        routeAnalyser.getNextInts(null);
        return "图层";
    }
}
