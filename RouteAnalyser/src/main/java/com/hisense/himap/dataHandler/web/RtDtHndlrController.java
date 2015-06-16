package com.hisense.himap.dataHandler.web;

import com.hisense.himap.dataHandler.logic.IRouteDataHandler;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2015-6-15.
 */
@Controller
@Scope("prototype")
public class RtDtHndlrController {

    @Inject
    IRouteDataHandler routeDataHandler;

    @RequestMapping("/preoper.do")
    @ResponseBody
    public String preOperRoad(HttpServletRequest request){
        routeDataHandler.preOperRoad();
        return "success";
    }
}
