package com.hisense.himap.RouteAnalyser.logic;

import com.hisense.himap.RouteAnalyser.vo.RtArcVO;
import com.hisense.himap.RouteAnalyser.vo.RtNodeVO;
import com.hisense.himap.RouteAnalyser.vo.RtRoad;
import com.hisense.himap.RouteAnalyser.vo.RtRoadLinkVO;


import java.util.List;

/**
 * Created by lxb on 2015-4-24.
 */
public interface IRouteDataHandler {

    /**
     * 获得所有的路段边
     * @return  所有边
     */
    public List<RtRoadLinkVO> getRtRoadLink();

    /**
     * 获得所有的路段
     * @return  所有路段
     */
    public List<RtRoad> getRtRoad();


    /**
     * 生成Node和弧段列表
     * @param RtRoadLinks 路段边列表
     * @param RtRoads 路段列表
     */
    //public void genArcAndNode(List<RtRoadLinkVO> RtRoadLinks, List<RtRoad> RtRoads);

    /**
     * 获得节点列表
     * @return  所有节点列表
     */
    public List<RtNodeVO> getNodeList();

    /**
     * 获得弧段列表
     * @return  弧段列表
     */
    public List<RtArcVO> getArcList();

    /**
     * 获得与指定边相交的所有边
     * @param linkid 边编号
     * @return  与指定边相交的所有边的列表
     */
    //public List<RtRoadLinkVO> getCrossLinkById(String linkid);



    /**
     * 获得两条边的交叉点
     * @param link1
     * @param link2
     * @return
     */
    //public RtNodeVO getCrossNode(RtRoadLinkVO link1, RtRoadLinkVO link2);

    /**
     * 查询节点在边表中的位置次序
     * @param node
     * @param roadLink
     * @return
     */
   // public int getNodePosInLink(RtNodeVO node, RtRoadLinkVO roadLink);

    /**
     * 将交点及交点的位置次序插入到roadlink表中
     * @param link
     * @param crossPos
     */
    //public void insertCrossPoint(RtRoadLinkVO link, String crossPos);

    /**
     * 指定圆心，半径画圆，查询与圆相交的所有路段边
     * @param strCoord 圆心坐标
     * @param distance 半径，单位米
     * @return
     */
    //public List<RtRoadLinkVO> getAdjacencyLink(String strCoord, int distance);

    /**
     * 计算与指定节点邻接的所有边组成的多边形质心
     * @param pos
     * @param roadLinks
     * @return
     */
    //public RtNodeVO getCentroidFromLinks(String pos, List<RtRoadLinkVO> roadLinks, RtRoadLinkVO spatialLink);

    /**
     * 计算特殊边
     * @param pos
     * @param roadLinks
     * @param distance
     * @return
     */
    //public RtRoadLinkVO getSpatialAdjLink(String pos, List<RtRoadLinkVO> roadLinks, int distance);

    /**
     * 计算路段长度
     * @param coordinates 路段的坐标点集合
     * @return
     */
    //public Double getRoadLength(String coordinates);

    /**
     * 计算两条交叉边的交叉类型
     * @param link1
     * @param link2
     * @param crossNode
     * @return 0:端点处相交 1：非端点处相交 2：一条边的端点与另一条边的非端点处相交
     */
    //public String getCrossType(RtRoadLinkVO link1, RtRoadLinkVO link2, RtNodeVO crossNode);

    /**
     * 坐标格式化方法 保留小数点后六位，四舍五入
     * @param pos
     * @param type
     * @return
     */
    //public  String formatPos(String pos, int type);


    /**
     * 根据节点查找弧段
     * @param node  节点
     * @param nodetype  节点类型 "startnode" or "endnode"
     * @return
     */
    //public List<RtArcVO> getArcListByNode(RtNodeVO node, String nodetype);

    /**
     * 获得指定点周边的节点
     * @param pos
     * @param distance
     * @return
     */
    //public List<RtNodeVO> getNearNodeByPos(String pos, Double distance);

    /**
     * 获得指定点周边的link
     * @param pos
     * @param distance
     * @return
     */
    //public List<RtRoadLinkVO> getNearLinkByPos(String pos, Double distance);

    /**
     * 获得指定点周边的Arc
     * @param pos
     * @param distance
     * @return
     */
    //public List<RtArcVO> getNearArcByPos(String pos, Double distance);

    /**
     * 计算link上的所有节点
     * @param linkid
     * @return
     */
    //public List<RtNodeVO> getNodeByLink(String linkid);


    //public List<RtArcVO> getNearestPath(RtNodeVO from, RtNodeVO to);

    /**
     * 获得与该路段边平行的路段边
     * @param roadLink
     * @return
     */
    //public List<RtRoadLinkVO> getParallLink(RtRoadLinkVO roadLink);

    /**
     * 调整路段边及与其相通的所有边的方向
     * @param roadLink 路段边
     * @param startpos 方向，0：latitude递增，1：latitude递减 2：longitude递减 3：longitude递增
     */
    //public void formatDirection(RtRoadLinkVO roadLink, String startpos);

    /**
     * 将经纬度坐标转换为二维数组
     * @param strcoords
     * @return
     */
    //public Double[][] convertPosToDouble(String strcoords);

    //public void updateRtRoad(RtRoad road);

}
