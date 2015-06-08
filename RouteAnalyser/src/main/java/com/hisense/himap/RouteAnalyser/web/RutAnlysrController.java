package com.hisense.himap.RouteAnalyser.web;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by lxb on 2015-6-6.
 */
@Controller
@Scope("prototype")
public class RutAnlysrController {

    @RequestMapping("/sayHello.do")
    @ResponseBody
    public String sayHello(){
        return "hello,world";
    }
}
