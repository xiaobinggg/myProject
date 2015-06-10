package java;

import com.hisense.himap.RouteAnalyser.logic.impl.RouteAnalyserImpl;
import com.hisense.himap.RouteAnalyser.utils.BeanUtils;
import com.hisense.himap.RouteAnalyser.vo.QueryNextIntsResultVO;
import com.hisense.himap.RouteAnalyser.vo.QueryNextIntsVO;
import com.hisense.himap.RouteAnalyser.vo.RtArcVO;

/**
 * Created by lxb on 2015-6-9.
 */
public class testRA {
    public static void main(String[] args){
        RouteAnalyserImpl ra = new RouteAnalyserImpl(null);
        QueryNextIntsResultVO resultVO = new QueryNextIntsResultVO();
        QueryNextIntsVO query = new QueryNextIntsVO();
        RtArcVO arcVO = new RtArcVO();

        query.setPointid("111");
        try {
            BeanUtils.copyPropertiesInclude(query, resultVO, new String[]{"pointid", "direction", "laneno", "speed"});
            System.out.println(resultVO.getPointid());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
