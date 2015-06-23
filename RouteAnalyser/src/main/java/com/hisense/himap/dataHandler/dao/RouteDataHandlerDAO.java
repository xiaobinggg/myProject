package com.hisense.himap.dataHandler.dao;

import com.hisense.himap.analyser.vo.RtIntsVO;
import com.hisense.himap.analyser.vo.RtNodeVO;
import com.hisense.himap.analyser.vo.RtRoad;
import com.hisense.himap.analyser.vo.RtRoadLinkVO;
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
    private static final String SQL_INSERT_INTS = "insert into route_intersection(intsid,longitude,latitude,xzqh) values(?,?,?,?)";
    private static final String SQL_INSERT_NODE = "insert into route_node(nodeid,x,y,intsid) values(?,?,?,?)";
    private static final String SQL_QUERY_JOINLINK = "SELECT r.roadid,r.linkid,r.strcoords,sdo_geom.sdo_intersection(r.geometry,(select p.geometry from route_roadlink p where p.linkid=?),0.005).sdo_ordinates AS joinpoint from route_roadlink r WHERE  r.isformatted='1' AND sdo_relate(r.geometry,(select p.geometry from route_roadlink p where p.linkid=?),'mask=ANYINTERACT')='TRUE'";
    private static final String SQL_QUERY_ALLROAD = "select * from route_road r WHERE r.roadname='江西路'";
    private static final String SQL_QUERY_LINK_BYROADID = "SELECT r.roadid,r.linkid,r.strcoords,r.isformatted from route_roadlink r where (r.isformatted is null or r.isformatted = '0') and r.roadid = ?";
    private static final String SQL_QUERY_CENTROID = "SELECT sdo_geom.sdo_centroid(MDSYS.SDO_GEOMETRY(2003,8307,NULL,MDSYS.SDO_ELEM_INFO_ARRAY(1, 1003, 1),MDSYS.SDO_ORDINATE_ARRAY(points)),0.005).sdo_point.x as x,sdo_geom.sdo_centroid(MDSYS.SDO_GEOMETRY(2003,8307,NULL,MDSYS.SDO_ELEM_INFO_ARRAY(1, 1003, 1),MDSYS.SDO_ORDINATE_ARRAY(points)),0.005).sdo_point.y as y from dual";
    private static final String SQL_UPDATE_CROSSPOINT = "update route_roadlink r set r.crosspoints = ? where r.linkid = ?";

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
            this.jdbcTemplate.update(SQL_INSERT_INTS, ints.getIntsid(), ints.getLongitude(), ints.getLatitude(), ints.getXzqh());
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
