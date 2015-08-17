package com.hisense.himap.analyser.dao;

import com.hisense.himap.analyser.vo.*;
import com.hisense.himap.dao.BaseDAO;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;

/**
 * Created by Administrator on 2015-6-17.
 */
@Repository("RouteAnalyserDAO")
public class RouteAnalyserDAO extends BaseDAO {

    private static final String SQL_SEL_ROAD = "SELECT r.*,a.dlmc AS vioroadname from route_road r LEFT JOIN vio_coderoad a ON a.dldm=r.dldm ";
    private static final String SQL_SEL_NODE = "select n.nodeid,n.x,n.y,n.intsid, i.pointids from route_node n left join route_intersection i on i.intsid = n.intsid";
    private static final String SQL_SEL_DNODE = "select d.*,d.dnodeid as nodeid from route_dnode d";
    private static final String SQL_SEL_ARC = "SELECT r.arcid,r.arcname,r.arclength,r.startnode,r.endnode,r.strcoords,r.direction,r.roadid from route_arc r";
    private static final String SQL_SEL_INTS = "SELECT r.*,n.nodeid from route_intersection r LEFT JOIN route_node n ON n.intsid = r.intsid";
    private static final String SQL_SEL_LANE = "SELECT l.intsid,l.laneno,l.direction,NVL(l.nthrough,0) as nthrough,NVL(l.nturnleft,0) as nturnleft,NVL(l.nturnright,0) as nturnright,NVL(l.nturnround,0) as nturnround from route_lane l";
    private static final String SQL_SEL_MONITOR = "SELECT p.pointcode,p.pointname,p.longitude AS x,p.latitude AS y from monitor_point  p where p.pointcode = ?";

    @Inject
    @Named("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    public List<RtRoad> initRtRoad() {
        return this.jdbcTemplate.query(SQL_SEL_ROAD, new BeanPropertyRowMapper<RtRoad>(RtRoad.class));
    }

    public List<RtNodeVO> initRtNode() {
        return this.jdbcTemplate.query(SQL_SEL_NODE, new BeanPropertyRowMapper<RtNodeVO>(RtNodeVO.class));
    }

    public List<RtNodeVO> initRtDNode() {
        return this.jdbcTemplate.query(SQL_SEL_DNODE, new BeanPropertyRowMapper<RtNodeVO>(RtNodeVO.class));
    }

    public List<RtArcVO> initRtArc() {
        return this.jdbcTemplate.query(SQL_SEL_ARC, new BeanPropertyRowMapper<RtArcVO>(RtArcVO.class));
    }

    public List<RtIntsVO> initRtInts() {
        return this.jdbcTemplate.query(SQL_SEL_INTS, new BeanPropertyRowMapper<RtIntsVO>(RtIntsVO.class));
    }

    public List<RtLaneVO> initRtLane() {
        return this.jdbcTemplate.query(SQL_SEL_LANE, new BeanPropertyRowMapper<RtLaneVO>(RtLaneVO.class));
    }

    public RtNodeVO getMonitor(String pointcode){
        List<RtNodeVO> list = this.jdbcTemplate.query(SQL_SEL_MONITOR,new String[]{pointcode}, new BeanPropertyRowMapper<RtNodeVO>(RtNodeVO.class));
        if(null!=list && list.size()>0){
            return list.get(0);
        }else{
            return null;
        }
    }


}
