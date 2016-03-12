package com.hisense.hiatmp.roadnet.service.impl;

import com.hisense.hiatmp.roadnet.dto.*;
import com.hisense.hiatmp.roadnet.service.RoadNetQueryService;

import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by liuxiaobing on 2016-2-16.
 */
public class RoadNetQueryServiceImpl implements RoadNetQueryService {

    public static final SimpleDateFormat sdf  =   new  SimpleDateFormat( " yyyy-MM-dd HH:mm:ss " );

    /**
     * 查询符合条件的道路列表
     * @param rnRoad 查询实体类
     * @return 符合条件的道路列表，无记录返回空列表，异常返回null
     */
    @Override
    public List<RoadNetRoad> queryRoadByDTO(RoadNetRoad rnRoad) {
        try {
            //组织查询条件
            StringBuffer condition = new StringBuffer("where 1=1 ");
            Map<String,Object> params = this.getParamsFromDTO(rnRoad);//获取dto中非空参数
            Iterator iter = params.keySet().iterator();
            while (iter.hasNext()){
                String key = iter.next().toString();
                Object kvalue = params.get(key);
                //路段名称采取模糊查询，其他字段采取精确查询
                if(key.equals("roadname")){
                    condition.append(" and ").append(key).append(" like '%").append(kvalue).append("%'");
                }else{
                    if(kvalue instanceof String){
                        condition.append(" and ").append(key).append("='").append(kvalue).append("'");
                    } else if(kvalue instanceof Integer){
                        condition.append(" and ").append(key).append("=").append(kvalue);
                    }else if(kvalue instanceof Date){
                        condition.append(" and ").append(key).append("=to_date('").append(sdf.format(kvalue)).append("','YYYY-MM-DD HH24:mi:ss')");
                    }
                }

            }
            System.out.println(condition.toString());

            //查询数据库 @TODO
            List<RoadNetRoad> result = null;
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 查询符合条件的路段列表
     *
     * @param rnSection 本参数为根据路段模型类创建的对象
     * @return 符合条件的路段列表，无记录返回空列表，异常返回null
     */
    @Override
    public List<RoadNetSection> querySectionByDTO(RoadNetSection rnSection) {
        return null;
    }

    /**
     * 查询符合条件的信号路段列表
     *
     * @param rnSection 本参数为根据路段模型类创建的对象
     * @return 符合条件的信号路段列表，无记录返回空列表，异常返回null
     */
    @Override
    public List<RoadNetSection> queryUTCSectionByDTO(RoadNetSection rnSection) {
        return null;
    }

    /**
     * 查询符合条件的路口列表
     *
     * @param rnInts 本参数为根据路口模型类创建的对象。根据对象中的非空字段组合查询条件。
     *               对象中的路口名称（intsname）字段为模糊匹配，其他为精确匹配。
     *               如果有多个非空字段，取多个查询条件的交集;
     *               如果对象为空或对象所有字段为空，返回null;
     * @return 符合条件的路口列表，无记录返回空列表，异常返回null
     */
    @Override
    public List<RoadNetInteraction> queryIntsByDTO(RoadNetInteraction rnInts) {
        return null;
    }

    /**
     * 查询符合条件的车道列表
     *
     * @param rnLane 本参数为根据车道模型类创建的对象
     * @return 符合条件的车道列表，无记录返回空列表，异常返回null
     */
    @Override
    public List<RoadNetLane> queryLaneByDTO(RoadNetLane rnLane) {
        return null;
    }

    /**
     * 查询指定类型的所有记录
     *
     * @param dtoType 实体类型  0：道路 1：路段 2：信号路段 3：路口 4：车道
     * @return 指定类型的所有记录，无记录返回空列表，异常返回null
     */
    @Override
    public List queryAllRecord(int dtoType) {
        return null;
    }

    /**
     * 据自定义sql语句查询指定类型的所有记录.
     *
     * @param dtoType  实体类型 0：道路 1：路段 2：信号路段 3：路口 4：车道
     * @param sqlparam 自定义sql语句
     * @return 指定类型的所有记录，无记录返回空列表，异常返回null
     */
    @Override
    public List queryRecordBySQL(int dtoType, String sqlparam) {
        return null;
    }

    @Override
    public List<RoadNetSection> queryNextSection(String sectionid, int sectiontype, int direction, int topolevel) {
        return null;
    }

    @Override
    public List<RoadNetInteraction> queryNextInts(String intsid, int topolevel) {
        return null;
    }

    @Override
    public String queryShortestPath(String startpoint, String endpoint, List inpoints, List outpoints, int querytype) {
        return null;
    }

    @Override
    public RoadNetSection querySectionByPos(String point, Double tolerance) {
        return null;
    }

    @Override
    public RoadNetInteraction queryIntesByPos(String point, Double tolerance) {
        return null;
    }

    @Override
    public List<RoadNetMonitor> queryMonitorBySection(String sectionid, Double distance) {
        return null;
    }

    @Override
    public List<RoadNetMonitor> queryMonitorByInts(String sectionid, Double distance) {
        return null;
    }

    /**
     * 从DTO中获取非空参数，用于组织查询语句
     * @param dto 封装查询条件的DTO
     * @return  返回DTO中非空参数与参数值
     * @throws Exception
     */
    public Map getParamsFromDTO(Object dto) throws Exception{
        Map<String,Object> result = new HashMap<String,Object>();
        Class cls = dto.getClass();
        Method[] methods = cls.getMethods();
        for(Method method:methods){
            if(method.getName().startsWith("get")){
                String fieldname = method.getName().substring(3).toLowerCase();
                if(method.invoke(dto)!=null){
                    result.put(fieldname,method.invoke(dto));
                }
            }
        }
        return result;
    }
}
