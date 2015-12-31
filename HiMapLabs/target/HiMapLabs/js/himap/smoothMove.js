/**
 * Created by liuxiaobing on 2015-11-3.
 * 平滑移动类
 */

/**
 * 平滑移动类
 * @param timeinterval 移动时间间隔
 * @param stepdistance  步幅
 * @param path  路径
 */
function SmoothMove(timeinterval,stepdistance,path){
    this.TIMEINTERVAL = timeinterval;
    this.STEPDISTANCE = stepdistance;
    this.PATH = path;

    this.points = this.tranStr2Points(this.PATH);
    this.steps = 0;
    this.currstep = 0;
    this.pathlength = 0;
    this.steppoints = null;
    this.initStepPoints();
}

/**
 * 初始化平滑移动的点序列
 */
SmoothMove.prototype.initStepPoints = function(){
    //计算路线总长度
    this.pathlength = 0;
    this.points[0].distance = 0;
    for(var i=1;i<this.points.length;i++){
        this.pathlength+= this.getdistance(this.points[i].x,this.points[i].y,this.points[i-1].x,this.points[i-1].y);
        this.points[i-1].angle = this.getAngle(this.points[i-1].x,this.points[i-1].y,this.points[i].x,this.points[i].y);
        this.points[i].distance = parseFloat(this.pathlength);
    }

    //根据总长度与步幅计算步数
    this.steps = this.pathlength/this.STEPDISTANCE;
    this.steps = Math.ceil(this.steps);//向上取整
    if(this.steps<this.points.length){
        this.steps = this.points.length;
    }

    //计算每一步的坐标节点
    this.steppoints = [];
    this.points[0].isnode = true;
    this.steppoints.push(this.points[0]);
    var currstep = 1;
    for(var j=1;j<this.points.length;j++){
        var nodedistance = this.points[j].distance;
        var prenodedistance = this.points[j-1].distance;
        var stepdistance = currstep/this.steps*this.pathlength;
        while(stepdistance<nodedistance){
            var steppoint = this.getDistPoint(this.points[j-1],this.points[j],stepdistance-prenodedistance);
            steppoint.isnode = false;
            steppoint.angle = this.points[j-1].angle;
            this.steppoints.push(steppoint);
            stepdistance = (++currstep)/this.steps*this.pathlength;
        }
        if (nodedistance == stepdistance) {
            currstep++;
        }
        this.points[j].isnode = true;
        this.steppoints.push(this.points[j]);
    }
};

/**
 * 开始移动
 * @param callback 回调函数，每一步移动都调用一次
 * 在回调函数中返回当前的坐标点对象。分为节点坐标点和非节点坐标点。
 * 节点坐标点{x:float,y:float,isnode:true,angle:float}表示路线上的拐点，在此处理转向
 * 非节点坐标点{x:float,y:float} 表示步进点
 */
SmoothMove.prototype.move = function(callback){
    this.timeinterval = this.setInterval(function(){
        if(this.currstep>=this.steppoints.length){
            window.clearInterval(this.timeinterval);
            return;
        }
        callback.call(this,this.steppoints[this.currstep]);
        this.currstep++;
    },this.TIMEINTERVAL);

};

/**
 * 计算线段上指定距离的点坐标
 * @param pSPoint   开始点
 * @param pEPoint   结束点
 * @param dDist 距离
 * @returns {*} 返回距离开始节点指定距离的点坐标
 */
SmoothMove.prototype.getDistPoint = function (pSPoint, pEPoint, dDist) {
    var dLen = this.getdistance(pSPoint.x,pSPoint.y,pEPoint.x,pEPoint.y);
    if (dDist > dLen || dLen == 0) {
        return pEPoint;
    }
    var dx = pSPoint.x + dDist * (pEPoint.x - pSPoint.x) / dLen;
    var dy = pSPoint.y + dDist * (pEPoint.y - pSPoint.y) / dLen;
    if (isNaN(dx) || isNaN(dy)) {
        alert("坐标计算有问题,x:" + dx + ",:" + dy);
        throw new Error(101, "startPoint:" + pSPoint.toString() + ",endPoint:" + pEPoint.toString() + ",len:" + dLen);
    }
    var pPoint = {};
    pPoint.x = dx;
    pPoint.y = dy;
    return pPoint;
};

/**
 * 计算两点间距离(平面坐标距离)
 * @param startx    开始点x
 * @param starty    开始点y
 * @param endx  结束点x
 * @param endy  结束点y
 * @returns {number} 平面距离
 */
SmoothMove.prototype.getdistance = function (startx,starty,endx,endy) {
    var Da = startx - endx;
    var Ha = starty - endy;
    return Math.sqrt(Da * Da + Ha * Ha);
};

/**
 * 计算线段与x轴夹角
 * @param startx    开始点x
 * @param starty    开始点y
 * @param endx  结束点x
 * @param endy  结束点y
 * @returns {number} 夹角(取值范围:-180~180)
 */
SmoothMove.prototype.getAngle = function (startx,starty,endx,endy) {
    var diff_x = endx - startx,
        diff_y = endy - starty;
    //返回角度,不是弧度
    var angle =  360*Math.atan(diff_y/diff_x)/(2*Math.PI);
    if(diff_x<0){
        return 180+angle;
    }else{
        return angle;
    }
};

/**
 * 转换路径字符串为坐标点数组
 * @param a 路径字符串
 * @returns {Array} 坐标点数组
 */
SmoothMove.prototype.tranStr2Points =function(a) {
    var p = a.split(",");
    var len = p.length / 2;
    var points = [];
    for (var iIndex = 0; iIndex < len; iIndex++) {
        var pPoint = {};
        pPoint.x = parseFloat(p[2 * iIndex]);
        pPoint.y = parseFloat(p[2 * iIndex + 1]);
        points.push(pPoint);
    }
    return points;
};


// Enable the passage of the 'this' object through the JavaScript timers
var __nativeST__ = window.setTimeout, __nativeSI__ = window.setInterval;

/**
 * 扩展setTimeout方法，使支持参数传递、this赋值
 * @param vCallback 执行方法
 * @param nDelay    延迟时间
 * @returns {number}
 */
SmoothMove.prototype.setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
    var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
    return __nativeST__(vCallback instanceof Function ? function () {
        vCallback.apply(oThis, aArgs);
    } : vCallback, nDelay);
};

/**
 * 扩展setInterval方法，使支持参数传递、this赋值
 * @param vCallback 执行方法
 * @param nDelay    延迟时间
 * @returns {number}
 */
SmoothMove.prototype.setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
    var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
    return __nativeSI__(vCallback instanceof Function ? function () {
        vCallback.apply(oThis, aArgs);
    } : vCallback, nDelay);
};


/*调用示例
var test = new SmoothMove(10,0.00001,"120.41187,36.05895,120.41215,36.05886,120.41257,36.05872");
test.move(function(obj){
    console.info(obj.x+","+obj.y+","+obj.isnode);
});
*/