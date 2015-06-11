package com.hisense.himap.routeAnalyser.logic;

import com.hisense.himap.routeAnalyser.logic.impl.RouteAnalyserImpl;
import org.junit.Before;
import org.junit.Test;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import javax.inject.Inject;
import javax.inject.Named;

import static junit.framework.TestCase.assertEquals;


/**
 * Created by lxb on 2015-6-11.
 */
public class TestRouteAnalyser {

    @Inject
    @Named("RouteAnalyser")
    protected RouteAnalyserImpl routeAnalyser;


    @Before
    // 在所有方法执行之前执行
    public void globalInit() {
       System.out.println("init all method...\r\n");
       WebApplicationContext wac = ContextLoader.getCurrentWebApplicationContext();
       //routeAnalyser = new RouteAnalyserImpl(null);
    }

    @Test
    public void testAdd(){
//        int result = routeAnalyser.add(2,3);
//        assertEquals(5,result);
    }
}
