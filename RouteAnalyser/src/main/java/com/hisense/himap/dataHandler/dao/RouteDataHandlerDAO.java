package com.hisense.himap.dataHandler.dao;

import com.hisense.himap.analyser.vo.*;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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

    private static final String SQL_INSERT_LINK = "insert into route_roadlink(roadid,linkid,isformatted,strcoords) values(?,?,?,?)";
    private static final String SQL_INSERT_INTS = "insert into route_intersection(intsid,intsname,longitude,latitude,xzqh,CROSSPOINTS,pointids) values(?,?,?,?,?,?,?)";
    private static final String SQL_INSERT_NODE = "insert into route_node(nodeid,x,y,intsid) values(?,?,?,?)";
    private static final String SQL_QUERY_JOINLINK = "SELECT r.roadid,r.linkid,r.strcoords from route_roadlink r WHERE  r.isformatted='1' and r.linkid!=? AND sdo_relate(r.geometry,(select p.geometry from route_roadlink p where p.linkid=?),'mask=ANYINTERACT')='TRUE'";
    private static final String SQL_QUERY_ALLROAD = "select * from route_road r ";
    private static final String SQL_QUERY_LINK_BYROADID = "SELECT r.roadid,r.linkid,r.strcoords,r.isformatted from route_roadlink r where (r.isformatted is null or r.isformatted = '0') and r.roadid = ?";
    private static final String SQL_UPDATE_CROSSPOINT = "update route_roadlink r set r.crosspoints = ? where r.linkid = ?";
    private static final String SQL_INSERT_ARC= "insert into route_arc(arcid,arclength,strcoords,startnode,endnode,direction,roadid) values(?,?,?,?,?,?,?)";

    @Inject
    @Named("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    /**
     * 保存合并后的link
     *
     * @param newLinkList link集合
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void insertFormattedLink(List<RtRoadLinkVO> newLinkList) {

        for (RtRoadLinkVO link : newLinkList) {
            this.jdbcTemplate.update(SQL_INSERT_LINK, link.getRoadid(), link.getLinkid(),link.getIsformatted(),link.getStrcoords());
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

    /**
     * 保存arc
     *
     * @param arcList arc集合
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void insertRouteArc(List<RtArcVO> arcList) {

        for(RtArcVO arc:arcList){
            this.jdbcTemplate.update(SQL_INSERT_ARC,arc.getArcid(),arc.getArclength(),arc.getStrcoords(),arc.getStartnode(),arc.getEndnode(),arc.getDirection(),arc.getRoadid());
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
            this.jdbcTemplate.update(SQL_UPDATE_CROSSPOINT, link.getCrosspoints(), link.getLinkid());
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
     * 获得所有的路段
     *
     * @return 所有路段
     */
    public List<RtRoad> getRtRoad() {
        List<RtRoad> list = this.jdbcTemplate.query(SQL_QUERY_ALLROAD, new BeanPropertyRowMapper<RtRoad>(RtRoad.class));
        return list;
    }

    /**
     * 获得路段的所有原始link
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
     * 保存合并后的link
     *
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void insertIntsAndNode(List<RtIntsVO> intslist,List<RtNodeVO> nodelist) {

        for (RtIntsVO ints: intslist) {
            String sql = "SELECT g.pointcode as pointids from monitor_point_geometry g WHERE  SDO_WITHIN_DISTANCE(g.GEOMETRY,MDSYS.SDO_GEOMETRY(2001, 8307,MDSYS.SDO_POINT_TYPE("+ints.getLongitude()+","+ints.getLatitude()+",0), NULL,NULL),'distance=20') = 'TRUE'";
            List<RtIntsVO> pointlist = this.jdbcTemplate.query(sql,new BeanPropertyRowMapper<RtIntsVO>(RtIntsVO.class));
            String pointids = "";
            for(RtIntsVO tempints:pointlist){
                pointids+=tempints.getPointids()+",";
            }
            if(pointids.length()>=1){
                pointids = pointids.substring(0,pointids.length()-1);
            }

            ints.setPointids(pointids);
            this.jdbcTemplate.update(SQL_INSERT_INTS, ints.getIntsid(),ints.getIntsname(), ints.getLongitude(), ints.getLatitude(), ints.getXzqh(),ints.getCrosspoints(),ints.getPointids());
        }
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
}
