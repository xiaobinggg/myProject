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
    this.steppoints = null;
    this.steps = 0;
    this.currstep = 0;
    this.pathlength = 0;
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
        this.points[i].distance = this.pathlength+0;
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
            this.steppoints.push(steppoint);
            stepdistance = (++currstep)/this.steps*this.pathlength;
        }
        if(stepdistance==nodedistance){
            currstep++;
        }
        this.points[j].isnode = true;
        this.steppoints.push(this.points[j]);
    }


};

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

SmoothMove.prototype.getdistance = function (startx,starty,endx,endy) {
    var Da = startx - endx;
    var Ha = starty - endy;
    return Math.sqrt(Da * Da + Ha * Ha)
};

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

SmoothMove.prototype.setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
    var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
    return __nativeST__(vCallback instanceof Function ? function () {
        vCallback.apply(oThis, aArgs);
    } : vCallback, nDelay);
};

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