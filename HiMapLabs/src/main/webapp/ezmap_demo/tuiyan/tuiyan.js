/**
 * Created by liuxiaobing on 2015-11-3.
 * 平滑移动
 */


/**
 * 平滑移动类
 * @param timeinterval 移动时间间隔
 * @param distance  步幅
 * @param path  路径
 */
function smoothMove(timeinterval,distance,path){
    this.TIMEINTERVAL = timeinterval;
    this.DISTANCE = distance;
    this.PATH = path;
    this.points = trans2Points(this.PATH);

    this.steppoints = null;
    this.pathlength = 0;
}

/**
 * 初始化平滑移动的点序列
 */
smoothMove.prototype.initStepPoints = function(){
    this.pathlength = 0;
    for(var i=1;i<this.points.length;i++){
        var distance = getdistance(this.points[i].x,this.points[i].y,this.points[i-1].x,this.points[i-1].y);
    }

}

smoothMove.prototype.move = function(){

}


function getDistPoint (pSPoint, pEPoint, dDist) {
    var dLen = getdistance(pSpoint.x,pSpoint.y,pEPoint.x,pEPoint.y);
    if (dDist > dLen || dLen == 0) {
        return pEPoint;
    }
    var dx = pSPoint.x + dDist * (pEPoint.x - pSPoint.x) / dLen;
    var dy = pSPoint.y + dDist * (pEPoint.y - pSPoint.y) / dLen;
    if (isNaN(dx) || isNaN(dy)) {
        alert("坐标计算有问题,x:" + dx + ",:" + dy);
        throw new Error(101, "startPoint:" + pSPoint.toString() + ",endPoint:" + pEPoint.toString() + ",len:" + dLen);
    }
    var pPoint = new Object();
    pPoint.x = dx;
    pPoint.y = dy;
    return pPoint;
}

function getdistance (startx,starty,endx,endy) {
    var Da = startx - endx;
    var Ha = starty - endy;
    return Math.sqrt(Da * Da + Ha * Ha)
}


function trans2Points(a) {
    var p = a.split(",");
    var len = p.length / 2;
    var points = new Array();
    for (var iIndex = 0; iIndex < len; iIndex++) {
        var pPoint = new Object();
        pPoint.x = p[2 * iIndex];
        pPoint.y = p[2 * iIndex + 1];
        points.push(pPoint);
    }
    return points;
}