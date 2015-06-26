package com.hisense.himap.dataHandler.logic;



import com.hisense.himap.analyser.vo.*;

import java.util.List;

/**
 * Created by lxb on 2015-4-24.
 */
public interface IRouteDataHandler {

    /**
     * 预处理路网数据
     */
    public void preOperRoad();

    /**
     * 反转roadlink
     * @param linkid link编号
     */
    public void revertRoadLink(String linkid);

}
