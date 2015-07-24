package com.hisense.himap.dataHandler.dao;

import com.hisense.himap.analyser.vo.*;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedCaseInsensitiveMap;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2015-6-15.
 */
@Repository("routeDataHandlerDAO")
public class RouteDataHandlerDAO {

    private static final String SQL_UPDATE_ROADSTATUS="update route_road r set r.editstatus=? where r.roadid=?";
    private static final String SQL_QUERY_ALLROAD = "select * from route_road r ";
    private static final String SQL_QUERY_ROADBYPARAM = "select * from route_road";

    private static final String SQL_INSERT_LINK = "insert into route_roadlink(roadid,linkid,isformatted,strcoords,linkname) values(?,?,?,?,?)";
    private static final String SQL_UPDATE_LINKCROSSPOINT = "update route_roadlink r set r.crosspoints = ? where r.linkid = ?";
    private static final String SQL_UPDATE_LINKSTRCOORDS= "update route_roadlink r set r.strcoords= ? where r.linkid = ?";
    private static final String SQL_QUERY_JOINLINK = "SELECT r.roadid,r.linkid,r.strcoords from route_roadlink r WHERE  r.isformatted='1' and r.linkid!=? AND sdo_relate(r.geometry,(select p.geometry from route_roadlink p where p.linkid=?),'mask=ANYINTERACT')='TRUE'";
    private static final String SQL_QUERY_LINK_BYID = "SELECT r.roadid,r.linkid,r.strcoords from route_roadlink r WHERE  r.isformatted='1' and r.linkid=? ";
    private static final String SQL_QUERY_PRELINK_BYROADID = "SELECT r.roadid,r.linkid,r.strcoords,r.isformatted from route_roadlink r where (r.isformatted is null or r.isformatted = '0') and r.roadid = ?";
    private static final String SQL_QUERY_FORMATLINK_BYROADID = "SELECT r.roadid,r.linkid,r.strcoords,r.isformatted from route_roadlink r where r.isformatted='1' and r.roadid = ?";
    private static final String SQL_QUERY_MANUALLINK_BYROADID = "SELECT m.sectionid AS linkid,m.remark AS strcoords,'0' AS isformatted,m.sectionname as linkname from monitor_section m WHERE m.sectionname LIKE ?";
    private static final String SQL_QUERY_LINK_BYROADID = "SELECT r.roadid,r.linkid,r.strcoords,r.isformatted from route_roadlink r where r.isformatted = '1' and r.roadid = ?";

    private static final String SQL_INSERT_INTS = "insert into route_intersection(intsid,intsname,longitude,latitude,xzqh,CROSSPOINTS,pointids,roadid1,roadid2,utcintsid,viointsid,editstatus) values(?,?,?,?,?,?,?,?,?,?,?,'0')";
    private static final String SQL_DELETE_INTS = "delete from route_intersection r where r.intsid=?";
    private static final String SQL_QUERY_INTS = "select * from route_intersection";
    private static final String SQL_UPDATE_INTSSTATUS = "update route_intersection r set r.editstatus=? where r.intsid=?";
    private static final String SQL_UPDATE_INTSPOINTS = "update route_intersection r set r.pointids=? where r.intsid=?";
    private static final String SQL_QUERY_UTCINTS = "select cintsid as intsid,cintsname as intsname from intersection";
    private static final String SQL_QUERY_VIOINTS = "select nid as intsid,lkmc as intsname from vio_roadcross";

    private static final String SQL_INSERT_NODE = "insert into route_node(nodeid,x,y,intsid) values(?,?,?,?)";
    private static final String SQL_DELETE_NODE = "delete from route_node r where r.nodeid=?";
    private static final String SQL_UPDATE_NODEINTS = "update route_node r set r.intsid = ? where r.intsid=?";
    private static final String SQL_UPDATE_ARCSTARTNODE = "UPDATE route_arc r SET r.startnode=? WHERE r.startnode=? ";
    private static final String SQL_UPDATE_ARCENDNODE = "UPDATE route_arc r SET r.endnode=? WHERE r.endnode=? ";
    private static final String SQL_QUERY_NEARNODE_WITHNULLINTS = "SELECT * from route_node r WHERE r.intsid IS NULL AND SDO_WITHIN_DISTANCE(r.geometry, mdsys.sdo_geometry(2001,8307,MDSYS.SDO_POINT_TYPE(?,0),null,null),'distance=20 querytype=WINDOW') = 'TRUE'";
    private static final String SQL_QUERY_NEARNODE = "SELECT * from route_node r WHERE  SDO_WITHIN_DISTANCE(r.geometry, mdsys.sdo_geometry(2001,8307,MDSYS.SDO_POINT_TYPE(#,0),null,null),'distance=# querytype=WINDOW') = 'TRUE'";
    private static final String SQL_INSERT_DNODE = "insert into route_dnode(dnodeid,dnodename,pointid,x,y,arcids,edistances,pos) values(?,?,?,?,?,?,?,?)";

    private static final String SQL_INSERT_ARC= "insert into route_arc(arcid,arclength,strcoords,startnode,endnode,direction,roadid,linkid) values(?,?,?,?,?,?,?,?)";
    private static final String SQL_DELETE_ARC="delete from route_arc a where a.arcid=?";
    private static final String SQL_UPDATE_ARC= "update route_arc r set r.strcoords= ?,r.startnode=?,r.endnode=?,r.arclength=?,r.direction=? where r.arcid= ?";
    private static final String SQL_QUERY_ARC_BYLINKID= "SELECT a.arcid,a.arcname,a.arclength,a.startnode,a.endnode,a.direction,a.roadid,a.linkid from route_arc a where a.linkid=?";
    private static final String SQL_QUERY_ARC_BYROADID = "SELECT a.arcid,a.arcname,a.arclength,a.startnode,a.endnode,a.strcoords,a.direction,a.roadid,a.linkid from route_arc a where a.roadid=?";
    private static final String SQL_QUERY_ARC_BYARCID = "SELECT a.arcid,a.arcname,a.arclength,a.startnode,a.endnode,a.strcoords,a.direction,a.roadid,a.linkid from route_arc a where a.arcid=?";
    private static final String SQL_QUERY_ARC_BYNODE = "SELECT a.arcid,a.arcname,a.arclength,a.startnode,a.endnode,a.strcoords,a.direction,a.roadid,a.linkid,r.roadname from route_arc a left join route_road r on a.roadid = r.roadid where a.startnode=? or a.endnode=?";

    private static final String SQL_INSERT_LANE = "insert into route_lane(intsid,laneno,direction,nthrough,nturnleft,nturnright,nturnround) values(?,?,?,?,?,?,?)";
    private static final String SQL_DELETE_LANE = "delete from route_lane l where l.intsid=? and l.laneno=? and l.direction=?";
    private static final String SQL_DELETE_LANE_BYINTSID = "delete from route_lane l where l.intsid=?";
    private static final String SQL_UPDATE_LANE = "update route_lane l set l.nthrough=?,l.nturnleft=?,l.nturnright=?,l.nturnround=? where l.laneno=? and l.intsid=? and l.direction=?";
    private static final String SQL_QUERY_LANE_BYINTSID = "select * from route_lane l where l.intsid=? order by l.direction,l.laneno";
    private static final String SQL_INIT_LANE = "INSERT INTO route_lane(intsid,laneno,direction,nthrough,nturnleft,nturnright,nturnround) SELECT r.intsid,l.nlaneno,l.napproachdirection,l.nthrough,l.nturnleft,l.nturnright,l.nturnaround  from lane l LEFT JOIN route_intersection r ON r.utcintsid= l.cintsid WHERE r.utcintsid IS NOT NULL";

    private static final String SQL_QUERY_XZQH = "SELECT e.enumvalue,e.enumname from enum_type e WHERE e.enumtypeid=180 order by e.enumvalue";
    private static final String SQL_QUERY_MONITOR= "SELECT p.pointcode,p.pointname,p.dldm,p.lkdm,p.ddms,p.longitude AS x,p.latitude AS y from monitor_point p where p.longitude>0 and p.latitude>0";
    private static final String SQL_QUERY_MONITORARC = "SELECT a.roadname,a.dldm,r.* from route_arc r  LEFT JOIN route_road a ON a.roadid=r.roadid WHERE SDO_WITHIN_DISTANCE(r.geometry, mdsys.sdo_geometry(2001,8307,MDSYS.SDO_POINT_TYPE(#,0),null,null),'distance=# querytype=WINDOW') = 'TRUE'";
    private static final String SQL_QUERY_MONITORINTS = " SELECT a.* FROM route_intersection a LEFT JOIN  ROUTE_NODE R ON r.intsid=a.intsid WHERE r.intsid IS NOT NULL AND SDO_WITHIN_DISTANCE(r.GEOMETRY,MDSYS.SDO_GEOMETRY(2001, 8307,MDSYS.SDO_POINT_TYPE(#,0), NULL,NULL),'distance=#') = 'TRUE' ORDER BY sdo_geom.sdo_distance(r.GEOMETRY,MDSYS.SDO_GEOMETRY(2001, 8307,MDSYS.SDO_POINT_TYPE(#,0), NULL,NULL),0.001) DESC";

    @Inject
    @Named("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    /**
     * 查询安装点列表
     *
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public List<RtNodeVO> getMonitorList(){
        return this.jdbcTemplate.query(SQL_QUERY_MONITOR, new BeanPropertyRowMapper<RtNodeVO>(RtNodeVO.class));

    }

    /**
     * 查询安装点相邻的arc列表
     *
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public List<RtArcVO> getMonitorArcList(String pos,int distance){
        //System.out.println((SQL_QUERY_MONITORARC.replaceFirst("#",pos)).replace("#",Integer.toString(distance)));
        return this.jdbcTemplate.query((SQL_QUERY_MONITORARC.replaceFirst("#",pos)).replace("#", Integer.toString(distance)), new BeanPropertyRowMapper<RtArcVO>(RtArcVO.class));
    }

    /**
     * 查询安装点相邻的ints列表
     *
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public List<RtIntsVO> getMonitorIntsList(String pos,int distance){
        //System.out.println(SQL_QUERY_MONITORINTS.replaceFirst("#",pos).replaceFirst("#", Integer.toString(distance)).replace("#", pos));
        return this.jdbcTemplate.query(SQL_QUERY_MONITORINTS.replaceFirst("#", pos).replaceFirst("#", Integer.toString(distance)).replace("#", pos), new BeanPropertyRowMapper<RtIntsVO>(RtIntsVO.class));
    }

    /**
     * 保存合并后的link
     *
     * @param newLinkList link集合
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void insertFormattedLink(List<RtRoadLinkVO> newLinkList) {

        for (RtRoadLinkVO link : newLinkList) {
            this.jdbcTemplate.update(SQL_INSERT_LINK, link.getRoadid(), link.getLinkid(),link.getIsformatted(),link.getStrcoords(),link.getLinkname());
            StringBuffer updategoem = new StringBuffer("DECLARE geom Sdo_Geometry;")
                    .append(" linkid VARCHAR2(200);")
                    .append(" BEGIN ")
                    .append(" linkid:='").append(link.getLinkid()).append("';")
                    .append(" geom:=MDSYS.SDO_GEOMETRY(2002,8307,NULL,MDSYS.SDO_ELEM_INFO_ARRAY(1, 2, 1),")
                    .append(" MDSYS.SDO_ORDINATE_ARRAY(").append(link.getStrcoords()).append("));")
                    .append(" EXECUTE IMMEDIATE 'UPDATE route_roadlink r SET r.geometry=:geom where r.linkid=:linkid'  USING geom,linkid;")
                    .append(" END;");
            this.jdbcTemplate.execute(updategoem.toString());
        }
    }

    public List<RtIntsVO> getALlInts(){
        try {
            List<RtIntsVO> list = this.jdbcTemplate.query(SQL_QUERY_INTS, new BeanPropertyRowMapper<RtIntsVO>(RtIntsVO.class));
            return list;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 更新路口状态
     * @param intsid
     * @param status
     */
    public void updateIntsStatus(String status,String intsid){
        try {
            this.jdbcTemplate.update(SQL_UPDATE_INTSSTATUS,status,intsid);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    /**
     * 更新路口状态
     * @param intsid
     * @param points
     */
    public void updateIntsPoints(String intsid,String points){
        try {
            this.jdbcTemplate.update(SQL_UPDATE_INTSPOINTS,points,intsid);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<RtIntsVO> getALlUTCInts(){
        try {
            List<RtIntsVO> list = this.jdbcTemplate.query(SQL_QUERY_UTCINTS, new BeanPropertyRowMapper<RtIntsVO>(RtIntsVO.class));
            return list;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<RtIntsVO> getALlVIOInts(){
        try {
            List<RtIntsVO> list = this.jdbcTemplate.query(SQL_QUERY_VIOINTS, new BeanPropertyRowMapper<RtIntsVO>(RtIntsVO.class));
            return list;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 查询点周边的非路口节点
     * @param pos 点坐标
     * @return
     */
    public List<RtNodeVO> getNearNodeWithNullInts(String pos){
        try {
            List<RtNodeVO> list = this.jdbcTemplate.query(SQL_QUERY_NEARNODE_WITHNULLINTS.replace("?",pos), new BeanPropertyRowMapper<RtNodeVO>(RtNodeVO.class));
            return list;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 更新路段状态
     * @param roadid
     * @param status
     */
    public void updateRoadStatus(String roadid,String status){
        try {
            this.jdbcTemplate.update(SQL_UPDATE_ROADSTATUS,status,roadid);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 查询点周边的节点
     * @param pos 点坐标
     * @param distance 距离
     * @return
     */
    public List<RtNodeVO> getNearNode(String pos,String distance){
        try {
            List<RtNodeVO> list = this.jdbcTemplate.query(SQL_QUERY_NEARNODE.replaceFirst("#", pos).replace("#",distance), new BeanPropertyRowMapper<RtNodeVO>(RtNodeVO.class));
            return list;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void delInts(String intsid){
        this.jdbcTemplate.update(SQL_DELETE_INTS,intsid);
        this.jdbcTemplate.update(SQL_DELETE_LANE_BYINTSID,intsid);
        this.jdbcTemplate.update(SQL_UPDATE_NODEINTS,"",intsid);
    }

    public void updateArcNode(String newnode,String prenode){
        this.jdbcTemplate.update(SQL_UPDATE_ARCSTARTNODE, prenode, newnode);
        this.jdbcTemplate.update(SQL_UPDATE_ARCENDNODE, prenode, newnode);
    }

    public void deleteRouteNode(List<RtNodeVO> list){
        for(RtNodeVO node:list){
            this.jdbcTemplate.update(SQL_DELETE_NODE,node.getNodeid());
        }
    }

    /**
     * 保存arc
     *
     * @param arcList arc集合
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void insertRouteArc(List<RtArcVO> arcList) {

        for(RtArcVO arc:arcList){
            this.jdbcTemplate.update(SQL_INSERT_ARC,arc.getArcid(),arc.getArclength(),arc.getStrcoords(),arc.getStartnode(),arc.getEndnode(),arc.getDirection(),arc.getRoadid(),arc.getLinkid());
            StringBuffer updategoem = new StringBuffer("DECLARE geom Sdo_Geometry;")
                    .append(" arcid VARCHAR2(32);")
                    .append(" BEGIN ")
                    .append(" arcid:='").append(arc.getArcid()).append("';")
                    .append(" geom:=MDSYS.SDO_GEOMETRY(2002,8307,NULL,MDSYS.SDO_ELEM_INFO_ARRAY(1, 2, 1),")
                    .append(" MDSYS.SDO_ORDINATE_ARRAY(").append(arc.getStrcoords()).append("));")
                    .append(" EXECUTE IMMEDIATE 'UPDATE route_arc r SET r.geometry=:geom where r.arcid=:arcid'  USING geom,arcid;")
                    .append(" END;");
            this.jdbcTemplate.execute(updategoem.toString());
        }
    }
    /**
     * 更新link的交叉点
     *
     * @param newLinkList link集合
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void updateCrossPoint(List<RtRoadLinkVO> newLinkList) {
        for (RtRoadLinkVO link : newLinkList) {
            this.jdbcTemplate.update(SQL_UPDATE_LINKCROSSPOINT, link.getCrosspoints(), link.getLinkid());
        }
    }

    /**
     * 更新link的坐标点
     * @param linkid
     * @param strcoords
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void updateLinkStrcoords(String linkid,String strcoords) {
        this.jdbcTemplate.update(SQL_UPDATE_LINKSTRCOORDS,linkid,strcoords);
    }

    /**
     * 更新route_arc
     * @param arclist
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void updateRouteArc(List<RtArcVO> arclist) {
        for(RtArcVO arc:arclist){
            this.jdbcTemplate.update(SQL_UPDATE_ARC,arc.getStrcoords(),arc.getStartnode(),arc.getEndnode(),arc.getArclength(),arc.getDirection(),arc.getArcid());
        }

    }
    /**
     * 获得与指定边相交的所有边
     * @param linkid 边编号
     * @return  与指定边相交的所有边的列表
     */
    public List<RtRoadLinkVO> getCrossLinkById(String linkid) {
        try {
            List<RtRoadLinkVO> list = this.jdbcTemplate.query(SQL_QUERY_JOINLINK, new String[]{linkid,linkid}, new BeanPropertyRowMapper<RtRoadLinkVO>(RtRoadLinkVO.class));
            return list;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 获得link关联的arc
     * @param linkid link 编号
     * @return
     */
    public List<RtArcVO> getArcByLinkId(String linkid){
        List<RtArcVO> list = this.jdbcTemplate.query(SQL_QUERY_ARC_BYLINKID,new String[]{linkid}, new BeanPropertyRowMapper<RtArcVO>(RtArcVO.class));
        return list;
    }
    /**
     * 获得link关联的arc
     * @param roadid roadid 编号
     * @return
     */
    public List<RtArcVO> getArcByRoadId(String roadid){
        List<RtArcVO> list = this.jdbcTemplate.query(SQL_QUERY_ARC_BYROADID,new String[]{roadid}, new BeanPropertyRowMapper<RtArcVO>(RtArcVO.class));
        return list;
    }

    public void deleteArcById(String arcid){
        this.jdbcTemplate.update(SQL_DELETE_ARC,arcid);
    }

    public List<RtLaneVO> getLaneByIntsid(String intsid){
        List<RtLaneVO> intslist = this.jdbcTemplate.query(SQL_QUERY_LANE_BYINTSID,new String[]{intsid},new BeanPropertyRowMapper<RtLaneVO>(RtLaneVO.class));
        return intslist;
    }

    public void insertLane(RtLaneVO lane){
        this.jdbcTemplate.update(SQL_INSERT_LANE,lane.getIntsid(),lane.getLaneno(),lane.getDirection(),lane.getNthrough(),lane.getNturnleft(),lane.getNturnright(),lane.getNturnround());
    }
    public void updateLane(RtLaneVO lane){
        this.jdbcTemplate.update(SQL_UPDATE_LANE,lane.getNthrough(),lane.getNturnleft(),lane.getNturnright(),lane.getNturnround(),lane.getIntsid(),lane.getLaneno(),lane.getDirection());
    }
    public void deleteLane(RtLaneVO lane){
        this.jdbcTemplate.update(SQL_DELETE_LANE,lane.getIntsid(),lane.getLaneno(),lane.getDirection());
    }
    public void deleteLaneByIntsid(String intsid){
        this.jdbcTemplate.update(SQL_DELETE_LANE_BYINTSID,intsid);
    }

    public void initLane(){
        this.jdbcTemplate.update(SQL_INIT_LANE);
    }


    /**
     * 根据节点查询arc
     * @param nodeid
     * @return
     */
    public List<RtArcVO> getArcByNode(String nodeid){
        List<RtArcVO> list = this.jdbcTemplate.query(SQL_QUERY_ARC_BYNODE,new String[]{nodeid,nodeid}, new BeanPropertyRowMapper<RtArcVO>(RtArcVO.class));
        return list;
    }

    /**
     * 根据编号查询arc
     * @param arcid
     * @return
     */
    public RtArcVO getArcById(String arcid){
        List<RtArcVO> list = this.jdbcTemplate.query(SQL_QUERY_ARC_BYARCID,new String[]{arcid}, new BeanPropertyRowMapper<RtArcVO>(RtArcVO.class));
        if(list == null || list.size()<=0){
            return null;
        }
        return list.get(0);
    }

    /**
     * 获得所有的路段
     *
     * @return 所有路段
     */
    public List<RtRoad> getRtRoad() {
        List<RtRoad> list = this.jdbcTemplate.query(SQL_QUERY_ALLROAD, new BeanPropertyRowMapper<RtRoad>(RtRoad.class));
        return list;
    }

    public List<RtRoad> getRtRoadByParam(String roadname,String xzqh,String editstatus){
        String param = " where 1=1 ";
        if(null!=roadname && roadname.length()>0){
            param += " and roadname like '%"+roadname+"%'";
        }
        if(null!=xzqh && xzqh.length()>0 && !xzqh.equalsIgnoreCase("-1")){
            param +=" and xzqh like '%"+xzqh+"%'";
        }
        if(null!=editstatus && !editstatus.equalsIgnoreCase("-1")){
            param+= " and editstatus ='"+editstatus+"'";
        }
        param +=" order by roadname";

        List<RtRoad> list = this.jdbcTemplate.query(SQL_QUERY_ROADBYPARAM+param, new BeanPropertyRowMapper<RtRoad>(RtRoad.class));
        return list;
    }

    public List<RtIntsVO> getRtIntsByParam(String intsname,String xzqh,String editstatus){
        String param = " where 1=1 ";
        if(null!=intsname && intsname.length()>0){
            param += " and intsname like '%"+intsname+"%'";
        }
        if(null!=xzqh && xzqh.length()>0 && !xzqh.equalsIgnoreCase("-1")){
            param +=" and xzqh like '%"+xzqh+"%'";
        }
        if(null!=editstatus && !editstatus.equalsIgnoreCase("-1")){
            param+= " and editstatus ='"+editstatus+"'";
        }
        param +=" order by intsname";

        List<RtIntsVO> list = this.jdbcTemplate.query(SQL_QUERY_INTS+param, new BeanPropertyRowMapper<RtIntsVO>(RtIntsVO.class));
        return list;
    }

    /**
     * 获得路段的所有原始link
     *
     * @param roadid 路段编号
     * @return link集合
     */
    public List<RtRoadLinkVO> getPreLinkByRoadID(String roadid) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("roadid", roadid);

        List<RtRoadLinkVO> list = this.jdbcTemplate.query(SQL_QUERY_PRELINK_BYROADID, new String[]{roadid}, new BeanPropertyRowMapper<RtRoadLinkVO>(RtRoadLinkVO.class));
        return list;
    }

    /**
     * 获得路段的link
     *
     * @param roadid 路段编号
     * @return link集合
     */
    public List<RtRoadLinkVO> getFormattedLinkByRoadID(String roadid) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("roadid", roadid);

        List<RtRoadLinkVO> list = this.jdbcTemplate.query(SQL_QUERY_FORMATLINK_BYROADID, new String[]{roadid}, new BeanPropertyRowMapper<RtRoadLinkVO>(RtRoadLinkVO.class));
        return list;
    }
    /**
     * 获得人工绘制的link
     *
     * @param roadname 路段名称
     * @return link集合
     */
    public List<RtRoadLinkVO> getManualLinkByRoadID(String roadname) {

        List<RtRoadLinkVO> list = this.jdbcTemplate.query(SQL_QUERY_MANUALLINK_BYROADID.replace("?","'"+roadname+"%'"), new BeanPropertyRowMapper<RtRoadLinkVO>(RtRoadLinkVO.class));
        return list;
    }


    /**
     * 获得路段的所有link
     *
     * @param roadid 路段编号
     * @return link集合
     */
    public List<RtRoadLinkVO> getLinkByRoadID(String roadid) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("roadid", roadid);

        List<RtRoadLinkVO> list = this.jdbcTemplate.query(SQL_QUERY_LINK_BYROADID, new String[]{roadid}, new BeanPropertyRowMapper<RtRoadLinkVO>(RtRoadLinkVO.class));
        return list;
    }

    /**
     * 获得路段的所有原始link
     *
     * @param linkid link编号
     * @return link对象
     */
    public RtRoadLinkVO getLinkByID(String linkid) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("linkid", linkid);

        List<RtRoadLinkVO> list = this.jdbcTemplate.query(SQL_QUERY_LINK_BYID, new String[]{linkid}, new BeanPropertyRowMapper<RtRoadLinkVO>(RtRoadLinkVO.class));
        if(list!=null && list.size()>0){
            return list.get(0);
        }else{
            return null;
        }
    }
    /**
     * 保存合并后的link
     *
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void insertIntsAndNode(List<RtIntsVO> intslist,List<RtNodeVO> nodelist) {

        for (RtIntsVO ints: intslist) {
            /*String sql = "SELECT g.pointcode as pointids from monitor_point_geometry g WHERE  SDO_WITHIN_DISTANCE(g.GEOMETRY,MDSYS.SDO_GEOMETRY(2001, 8307,MDSYS.SDO_POINT_TYPE("+ints.getLongitude()+","+ints.getLatitude()+",0), NULL,NULL),'distance=50') = 'TRUE'";
            List<RtIntsVO> pointlist = this.jdbcTemplate.query(sql,new BeanPropertyRowMapper<RtIntsVO>(RtIntsVO.class));
            String pointids = "";
            for(RtIntsVO tempints:pointlist){
                pointids+=tempints.getPointids()+",";
            }
            if(pointids.length()>=1){
                pointids = pointids.substring(0,pointids.length()-1);
            }

            ints.setPointids(pointids);*/
            this.jdbcTemplate.update(SQL_INSERT_INTS, ints.getIntsid(),ints.getIntsname(), ints.getLongitude(), ints.getLatitude(), ints.getXzqh(),ints.getCrosspoints(),ints.getPointids(),ints.getRoadid1(),ints.getRoadid2(),ints.getUtcintsid(),ints.getViointsid());
        }
        this.insertNode(nodelist);
    }

    /**
     * 保存合并后的link
     *
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void insertInts(List<RtIntsVO> intslist) {

        for (RtIntsVO ints: intslist) {
            /*String sql = "SELECT g.pointcode as pointids from monitor_point_geometry g WHERE  SDO_WITHIN_DISTANCE(g.GEOMETRY,MDSYS.SDO_GEOMETRY(2001, 8307,MDSYS.SDO_POINT_TYPE("+ints.getLongitude()+","+ints.getLatitude()+",0), NULL,NULL),'distance=50') = 'TRUE'";
            List<RtIntsVO> pointlist = this.jdbcTemplate.query(sql,new BeanPropertyRowMapper<RtIntsVO>(RtIntsVO.class));
            String pointids = "";
            for(RtIntsVO tempints:pointlist){
                pointids+=tempints.getPointids()+",";
            }
            if(pointids.length()>=1){
                pointids = pointids.substring(0,pointids.length()-1);
            }

            ints.setPointids(pointids);*/
            this.jdbcTemplate.update(SQL_INSERT_INTS, ints.getIntsid(),ints.getIntsname(), ints.getLongitude(), ints.getLatitude(), ints.getXzqh(),ints.getCrosspoints(),ints.getPointids(),ints.getRoadid1(),ints.getRoadid2(),ints.getUtcintsid(),ints.getViointsid());
        }
    }

    /**
     * 保存合并后的node
     *
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void insertNode(List<RtNodeVO> nodelist) {
        for (RtNodeVO node: nodelist) {
            this.jdbcTemplate.update(SQL_INSERT_NODE, node.getNodeid(),node.getX(),node.getY(),node.getInstid());
            StringBuffer updategoem = new StringBuffer("DECLARE geom Sdo_Geometry;")
                    .append(" nodeid VARCHAR2(200);")
                    .append(" BEGIN ")
                    .append(" nodeid:='").append(node.getNodeid()).append("';")
                    .append(" geom:=MDSYS.SDO_GEOMETRY(2001,8307,MDSYS.SDO_POINT_TYPE(").append(node.getX()+"," + node.getY()).append(", 0),null, null);")
                    .append(" EXECUTE IMMEDIATE 'UPDATE route_node r SET r.geometry=:geom where r.nodeid=:nodeid'  USING geom,nodeid;")
                    .append(" END;");
            this.jdbcTemplate.execute(updategoem.toString());
        }
    }

    /**
     * 保存合并后的node
     *
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void insertDNode(List<RtNodeVO> nodelist) {
        for (RtNodeVO node: nodelist) {
            this.jdbcTemplate.update(SQL_INSERT_DNODE, node.getDnodeid(),node.getDnodename(),node.getPointid(),node.getX(),node.getY(),node.getArcids(),node.getEdistances(),node.getPos());
        }
    }

    public List getXZQH(){
        return this.jdbcTemplate.queryForList(SQL_QUERY_XZQH);

    }
}
