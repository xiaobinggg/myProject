package com.hisense.himap.dao;

import com.hisense.himap.analyser.vo.RtNodeVO;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;

/**
 * Created by Administrator on 2015-7-30.
 */
@Repository("baseDAO")
public class BaseDAO {

    private static final String SQL_QUERY_NEARNODE = "SELECT * from route_node r WHERE  SDO_WITHIN_DISTANCE(r.geometry, mdsys.sdo_geometry(2001,8307,MDSYS.SDO_POINT_TYPE(#,0),null,null),'distance=# querytype=WINDOW') = 'TRUE' ORDER BY sdo_geom.sdo_distance(R.GEOMETRY,MDSYS.SDO_GEOMETRY(2001,8307,MDSYS.SDO_POINT_TYPE(#, 0),NULL,NULL),1)";

    @Inject
    @Named("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    /**
     * 查询点周边的节点
     * @param pos 点坐标
     * @param distance 距离
     * @return
     */
    public List<RtNodeVO> getNearNode(String pos,String distance){
        try {
            List<RtNodeVO> list = this.jdbcTemplate.query(SQL_QUERY_NEARNODE.replaceFirst("#", pos).replaceFirst("#",distance).replaceFirst("#",pos), new BeanPropertyRowMapper<RtNodeVO>(RtNodeVO.class));
            return list;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
