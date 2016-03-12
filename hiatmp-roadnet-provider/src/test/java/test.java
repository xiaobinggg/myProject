import com.hisense.hiatmp.roadnet.dto.RoadNetRoad;
import com.hisense.hiatmp.roadnet.service.RoadNetQueryService;
import com.hisense.hiatmp.roadnet.service.impl.RoadNetQueryServiceImpl;

import java.util.Date;

/**
 * Created by Administrator on 2016-2-17.
 */
public class test {

    public static void main(String[] args){
        RoadNetQueryService queryService = new RoadNetQueryServiceImpl();
        RoadNetRoad rnRoad = new RoadNetRoad();
        rnRoad.setRoadcode("100");
        rnRoad.setRoadname("中山路");
        rnRoad.setRoadtype(1);
        rnRoad.setCreatetime(new Date());
        queryService.queryRoadByDTO(rnRoad);
    }
}
