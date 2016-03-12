package com.hisense.hiatmp.roadnet.service;

import com.hisense.hiatmp.roadnet.dto.*;

import java.util.List;

/**
 * Created by liuxiaobing on 2016-2-16.
 */
public interface RoadNetQueryService {


    //**************************基础信息查询接口*********************************/
    /**
     * 查询符合条件的道路列表
     * @param rnRoad 查询实体类 本参数为根据道路模型类创建的对象。根据对象中的非空字段组合查询条件。
     *               对象中的道路名称（roadname）字段为模糊匹配，其他为精确匹配。
     *               如果有多个非空字段，取多个查询条件的交集;
     *               如果对象为空或对象所有字段为空，返回null;
     * @return 符合条件的道路列表，无记录返回空列表，异常返回null
     */
    public List<RoadNetRoad> queryRoadByDTO(RoadNetRoad rnRoad);

    /**
     *查询符合条件的路段列表
     * @param rnSection 本参数为根据路段模型类创建的对象。根据对象中的非空字段组合查询条件。
     *                  对象中的路段名称（sectionname）字段为模糊匹配，其他为精确匹配。
     *                  如果有多个非空字段，取多个查询条件的交集;
     *                  如果对象为空或对象所有字段为空，返回null;

     * @return 符合条件的路段列表，无记录返回空列表，异常返回null
     */
    public List<RoadNetSection> querySectionByDTO(RoadNetSection rnSection);

    /**
     *查询符合条件的信号路段列表
     * @param rnSection 本参数为根据路段模型类创建的对象。根据对象中的非空字段组合查询条件。
     *                  对象中的路段名称（sectionname）字段为模糊匹配，其他为精确匹配。
     *                  如果有多个非空字段，取多个查询条件的交集;
     *                  如果对象为空或对象所有字段为空，返回null;

     * @return 符合条件的信号路段列表，无记录返回空列表，异常返回null
     */
    public List<RoadNetSection> queryUTCSectionByDTO(RoadNetSection rnSection);

    /**
     *查询符合条件的路口列表
     * @param rnInts 本参数为根据路口模型类创建的对象。根据对象中的非空字段组合查询条件。
     *                  对象中的路口名称（intsname）字段为模糊匹配，其他为精确匹配。
     *                  如果有多个非空字段，取多个查询条件的交集;
     *                  如果对象为空或对象所有字段为空，返回null;
     * @return 符合条件的路口列表，无记录返回空列表，异常返回null
     */
    public List<RoadNetInteraction> queryIntsByDTO(RoadNetInteraction rnInts);

    /**
     * 查询符合条件的车道列表
     * @param rnLane 本参数为根据车道模型类创建的对象。
     *               根据对象中的非空字段组合查询条件。对象中的连通路段（nextsection）字段为模糊匹配，其他为精确匹配。
     *              如果有多个非空字段，取多个查询条件的交集;
     *              如果对象为空或对象所有字段为空，返回null;
     * @return 符合条件的车道列表，无记录返回空列表，异常返回null
     */
    public List<RoadNetLane> queryLaneByDTO(RoadNetLane rnLane);

    /**
     * 查询指定类型的所有记录
     * @param dtoType 实体类型
     * 0：道路 1：路段 2：信号路段 3：路口 4：车道
     * @return 指定类型的所有记录，无记录返回空列表，异常返回null
     */
    public List queryAllRecord(int dtoType);

    /**
     * 据自定义sql语句查询指定类型的所有记录.
     * @param dtoType 实体类型 0：道路 1：路段 2：信号路段 3：路口 4：车道
     * @param sqlparam 自定义sql语句。
     *                语句中的关键字统一采用大写格式, 可用的关键字有：AND、OR、LIKE、<、>、<=、>=、=、ORDER BY、GROUP BY;
     *                字符串用单引号表达；
     *                日期统一采用“yyyy-mm-dd hh24:mi:ss”格式；
     *                如：roadname LIKE ‘%松岭%’ AND roadlength<=5000
     * @return 指定类型的所有记录，无记录返回空列表，异常返回null
     */
    public List queryRecordBySQL(int dtoType,String sqlparam);//@TODO sqlparam 控制



    //**************************智能路网分析接口*********************************/

    public List<RoadNetSection> queryNextSection(String sectionid,int sectiontype,int direction,int topolevel);

    public List<RoadNetInteraction> queryNextInts(String intsid,int topolevel);

    public String queryShortestPath(String startpoint,String endpoint,List inpoints,List outpoints,int querytype);

    public RoadNetSection querySectionByPos(String point,Double tolerance);

    public RoadNetInteraction queryIntesByPos(String point,Double tolerance);

    public List<RoadNetMonitor> queryMonitorBySection(String sectionid,Double distance);

    public List<RoadNetMonitor> queryMonitorByInts(String sectionid,Double distance);


}
