package com.hisense.himap.dataHandler.logic;


import com.hisense.himap.analyser.vo.RtArcVO;
import com.hisense.himap.analyser.vo.RtIntsVO;
import com.hisense.himap.analyser.vo.RtLaneVO;
import com.hisense.himap.analyser.vo.RtRoadLinkVO;

import java.util.List;
import java.util.Map;

/**
 * Created by lxb on 2015-4-24.
 */
public interface IRouteDataHandler {

    /**
     * 预处理路网数据
     */
    void preOperRoad();

    /**
     * 反转roadlink
     * @param linkid link编号
     */
    void revertRoadLink(String linkid);


    /**
     * 更新link信息
     * @param link link对象
     */
    void updateRoadLink(RtRoadLinkVO link);

    /**
     * 更新arc信息
     * @param arc arc对象
     */
    void updateArc(RtArcVO arc);

    /**
     * 新增arc
     * @param arc arc对象
     */
    void insertArc(RtArcVO arc);

    /**
     * 删除arc
     * @param arc arc对象
     */
    void deleteArc(RtArcVO arc);

    void updateRoadStatus(String roadid,String status);

    /**
     * 更新路口信息
     * @param ints 路口对象
     */
    void updateIntersection(RtIntsVO ints);

    /**
     * 删除路口信息
     * @param intsid 路口编号
     */
    void deleteIntersection(String intsid);

    /**
     * 查询符合条件的道路列表
     * @param roadname
     * @param xzqh
     * @return
     */
    List getRoadList(String roadname,String xzqh);

    /**
     * 查询符合条件的路口列表
     * @param intsname 路口名称
     * @param xzqh  行政区划
     * @return
     */
    List getIntsList(String intsname,String xzqh);

    /**
     * 查询车道信息
     * @param intsid
     * @return
     */
    List getLaneList(String intsid);


    void updateLane(String intsid,List<RtLaneVO> lanelist);

    /**
     * 根据道路编号查询link列表
     * @param roadid
     * @return
     */
    List getLinkList(String roadid);

    /**
     * 根据道路编号查询arc列表
     * @param roadid 道路编号
     * @return  arc列表
     */
    List getArcList(String roadid);

    /**
     * 获取行政区划列表
     * @return
     */
    List getXZQH();

}
