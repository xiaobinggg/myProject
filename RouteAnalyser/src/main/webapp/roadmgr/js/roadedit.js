/**
 * Created by lxb on 2015-6-29.
 */
var rooturl = document.URL.split( "/" )[0]+"/"+ document.URL.split( "/" )[1]
    +"/"+ document.URL.split( "/" )[2]+"/"+ document.URL.split( "/" )[3];

var shownLineArr;
var arcArr;
var roadArr;
var intsArr;
var currroadid;
var currintsid;
var totalcount = 0;
var totalintscount = 0;

$(document).ready(function () {
    var url = rooturl+"/edit/getXZQH.do";
    $.ajax({
        url:url,
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function (data) {
            if(data.length<=0){

            }else{
                $("#xzqh").append("<option value='-1'>全部</option>");
                for(var i=0;i<data.length;i++){
                    var newrow = "<option value='"+data[i].ENUMVALUE+"'>"+data[i].ENUMNAME+"</option>";
                    $("#xzqh").append(newrow);
                }

                $("#intsxzqh").append("<option value='-1'>全部</option>");
                for(var i=0;i<data.length;i++){
                    var newrow = "<option value='"+data[i].ENUMVALUE+"'>"+data[i].ENUMNAME+"</option>";
                    $("#intsxzqh").append(newrow);
                }
                getRoadList(null,null);

            }
        }
    });
    $("#xzqh").change(function(){
        getRoadList($("#xzqh").val());
    });
    $("#intsxzqh").change(function(){
        getIntsList($("#intsxzqh").val());
    });

    $("#rightpanel").height($(document).height()-50);

    $("#gpstab").click(function(){
        getIntsList(null,null);
    });

});



function getRoadList(xzqh,roadname){
    if(null == xzqh){
        xzqh = $("#xzqh").val();
    }
    if(null == roadname){
        roadname = encodeURI(encodeURI($("#roadname").val()));
    }
    var param ="1=1";
    if(null!=xzqh){
        param+="&xzqh="+xzqh;
    }
    if(null!=roadname){
        param+="&roadname="+roadname;
    }
    var url = rooturl+"/edit/getRoad.do";
    $.ajax({
        url:url,
        type: 'get',
        dataType: 'json',
        data:param,
        cache: false,
        success: function (data) {
            $("#roadlist").html("");
            if(data.length<=0){
                $("#roadlist").html("没有数据");
            }else{

                if( typeof(arrPocessTimeout)!='undefined' && null!=arrPocessTimeout){
                    clearTimeout(arrPocessTimeout);
                }
                roadArr = data.concat();
                totalcount = 0;
                largeArrayProcess(data,addRoadRow,30);
            }
        }
    });

}



function addRoadRow(data){
    for(var i=0;i<data.length;i++){
        var editstatus = "";
        if(data[i].editstatus == "0"){
            editstatus = "未调整";
        }else{
            editstatus = "<font color='gray'>已调整</font>";
        }
        var newrow;
        if(i%2 == 0){
            newrow = "<tr style='background: #ffffff;'><td nowrap>"+data[i].roadname+"</td>" +
            "<td nowrap align='center'>"+editstatus+"</td>" +
            "<td nowrap align='center'><img src='img/edit.png'  style='width: 18px;height: 18px' onclick='editroad("+totalcount+",\""+data[i].roadid+"\",\""+data[i].roadcenter+"\")' title='调整' style='margin:3px 0 0 0;'/>&nbsp;" +
            //"<img src='img/edit.png'  style='width: 18px;height: 18px' onclick='editroad(this,\""+data[i].roadid+"\",\""+data[i].roadcenter+"\")' title='路口调整' style='margin:3px 0 0 0;'/>" +
            "</td></tr>";
        }else{
            newrow = "<tr style='background:#E3EaF4'><td nowrap>"+data[i].roadname+"</td>" +
            "<td nowrap align='center'>"+editstatus+"</td>" +
            "<td nowrap align='center'><img src='img/edit.png'  style='width: 18px;height: 18px' onclick='editroad("+totalcount+",\""+data[i].roadid+"\",\""+data[i].roadcenter+"\")' title='调整' style='margin:3px 0 0 0;'/>&nbsp;" +
            //"<img src='img/edit.png'  style='width: 18px;height: 18px' onclick='editroad(this,\""+data[i].roadid+"\",\""+data[i].roadcenter+"\")' title='路口调整' style='margin:3px 0 0 0;'/>" +
            "</td></tr>";

        }
        totalcount++;
        $("#roadlist").append(newrow);
    }
}

function editroad(num,roadid,roadcenter){
    currroadid = roadid;
    if(typeof(preobj)!='undefined'){
        $(preobj).css("background",precolor);
    }
    preobj= $("#roadlist").find("tr:eq("+num+")");
    $("#roadtable").scrollTop(preobj.height()*num);
    precolor = preobj.css("background");
    preobj.css("background","#FFD75A");

    //precolor = $(obj).css("background");


    mapframe.centerTo(roadcenter);
    //清空地图上已经画的线
    if(null!=shownLineArr && shownLineArr.length>0){
        for(var i = 0;i<shownLineArr.length;i++){
            mapframe._MapApp.removeOverlay(shownLineArr[i]);
        }
    }
    shownLineArr = new Array();

    revertedLink = "";

    var url = rooturl+"/edit/getArc.do";
    $.ajax({
        url:url,
        type: 'get',
        dataType: 'json',
        data:'roadid='+roadid,
        cache: false,
        success: function (data) {
            if(data.length<=0){
                arcArr = new Array();
                $("#arclist").html("");
            }else{
                var newtable = "";
                $("#arclist").html("");
                arcArr = data;
                for(var i=0;i<data.length;i++){
                    var editstatus = "";

                    var newrow;
                    if(i%2 == 0){
                        newtable += "<tr  style='cursor: hand;background:white'><td >"+i+"</td><td onclick='showLine("+i+",this,true)'>"+data[i].arclength+"</td>" +
                        "<td align='center'><img src='img/revert.png' style='width: 16px;height: 16px'  onclick='revertArc("+i+",\""+data[i].arcid+"\")' title='反转' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "<img src='img/modify.png' style='width: 16px;height: 16px'  onclick='modifyArc("+i+",\""+data[i].arcid+"\")' title='修改' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "<img src='img/redraw.png' style='width: 16px;height: 16px'  onclick='redrawArc("+i+",\""+data[i].arcid+"\")' title='重绘' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "<img src='img/remove.png' style='width: 16px;height: 16px'  onclick='delArc("+i+",\""+data[i].arcid+"\")' title='删除' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "</tr>";
                    }else{
                        newtable += "<tr  style='cursor: hand;background:#E3EaF4'><td >"+i+"</td><td onclick='showLine("+i+",this,true)'>"+data[i].arclength+"</td>" +
                        "<td align='center'><img src='img/revert.png' style='width: 16px;height: 16px' onclick='revertArc("+i+",\""+data[i].arcid+"\")' title='反转' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "<img src='img/modify.png' style='width: 16px;height: 16px'  onclick='modifyArc("+i+",\""+data[i].arcid+"\")' title='修改' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "<img src='img/redraw.png' style='width: 16px;height: 16px'  onclick='redrawArc("+i+",\""+data[i].arcid+"\")' title='重绘' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "<img src='img/remove.png' style='width: 16px;height: 16px'  onclick='delArc("+i+",\""+data[i].arcid+"\")' title='删除' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "</td></tr>";
                    }
                    var polyline = mapframe.showgroad(data[i].strcoords);
                    polyline.arrnum = i;
                    (function(num,pline){
                        pline.addListener("click", function() {
                            if(mapframe._MapApp.getDragMode() == "drawPolyline"){
                                return;
                            }
                            showLine(num);
                        });
                    })(i,polyline);

                    shownLineArr.push(polyline);
                }
                newtable+="</td></tr>";
                $("#arclist").append(newtable);
                showLine(0);
            }
        }
    });
}

/**
 * 反转link
 * @param num
 * @param linkid
 */
function revertArc(num,arcid){
    if(preline.arrnum!=num){
        showLine(num,null,true);
    }
    //showLine(num);
    var revertpoints = "";
    var points = shownLineArr[num].getPoints()+"";
    var pointarr = points.split(",");
    var pointnum = pointarr.length/2;

    for (var i = pointnum - 1; i >= 0; i--) {
        revertpoints += pointarr[i * 2] + "," + pointarr[i * 2 + 1] + ",";
    }
    revertpoints = revertpoints.substring(0, revertpoints.length - 1);

    mapframe._MapApp.removeOverlay(shownLineArr[num]);
    var polyline = mapframe.showgroad(revertpoints);
    polyline.setColor("red");
    polyline.arrnum = num;
    polyline.addListener("click", function() {
        showLine(num);
    });
    shownLineArr[num] = polyline;
    preline = polyline;
    arcArr[num].strcoords = revertpoints;
}

/**
 * 修改link
 * @param num
 * @param arcid
 */
function modifyArc(num,arcid){
    if(typeof(preline)!='undefined'&& preline!=null  && preline.arrnum!=num){
        showLine(num,null,true);
    }
    var polyline = shownLineArr[num];
    polyline.setColor("red");
    polyline.enableEdit();
    polyline.setLineStyle("none");
}

/**
 * 删除arc
 * @param num
 * @param arcid
 */
function delArc(num,arcid){
    if(typeof(preline)!='undefined' && preline!=null && preline.arrnum!=num){
        showLine(num,null,true);
    }
    var polyline = shownLineArr[num];
    polyline.setColor("gray");
    polyline.setLineStyle("dash");
    preline.disableEdit();
    arcArr[num].delflag = "1";
}

/**
 * 重新绘制arc
 * @param num
 * @param arcid
 */
function redrawArc(num,arcid){
    if(typeof(preline)!='undefined' && preline!=null && preline.arrnum!=num){
        showLine(num,null,true);
    }
    var polyline = shownLineArr[num];
    mapframe._MapApp.removeOverlay(polyline);
    mapframe._MapApp.changeDragMode('drawPolyline',null,null,
        function(pos){
            mapframe._MapApp.changeDragMode('');
            mapframe._MapApp.changeDragMode('pan');

            var polyline = mapframe.showgroad(pos);
            polyline.setColor("red");
            polyline.arrnum = num;
            polyline.addListener("click", function() {
                showLine(num);
            });
            shownLineArr[num] = polyline;
            preline = polyline;
            arcArr[num].strcoords = pos;
        });
}

/**
 * 添加arc
 */
function addArc(){
    if(typeof(prearc)!='undefined'&& prearc!=null ){
        $(prearc).css("background",prearccolor);
    }
    if(typeof(preline)!='undefined' && preline!=null ){
        preline.setColor("#00FF00");
        preline.disableEdit();
        arcArr[preline.arrnum].strcoords = preline.getPoints()+"";
    }

    var i = arcArr.length;
    var newarc = new Object();
    newarc.arclength = "--";
    newarc.arcid = "--";
    var newtable = "";
    if(i%2 == 0){
        newtable += "<tr  style='cursor: hand;background:white'><td >"+i+"</td><td onclick='showLine("+i+",this,true)'>"+newarc.arclength+"</td>" +
        "<td align='center'><img src='img/revert.png' style='width: 16px;height: 16px'  onclick='revertArc("+i+",\""+newarc.arcid+"\")' title='反转' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
        "<img src='img/modify.png' style='width: 16px;height: 16px'  onclick='modifyArc("+i+",\""+newarc.arcid+"\")' title='修改' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
        "<img src='img/redraw.png' style='width: 16px;height: 16px'  onclick='redrawArc("+i+",\""+newarc.arcid+"\")' title='重绘' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
        "<img src='img/remove.png' style='width: 16px;height: 16px'  onclick='delArc("+i+",\""+newarc.arcid+"\")' title='删除' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
        "</tr>";
    }else{
        newtable += "<tr  style='cursor: hand;background:#E3EaF4'><td >"+i+"</td><td onclick='showLine("+i+",this,true)'>"+newarc.arclength+"</td>" +
        "<td align='center'><img src='img/revert.png' style='width: 16px;height: 16px' onclick='revertArc("+i+",\""+newarc.arcid+"\")' title='反转' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
        "<img src='img/modify.png' style='width: 16px;height: 16px'  onclick='modifyArc("+i+",\""+newarc.arcid+"\")' title='修改' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
        "<img src='img/redraw.png' style='width: 16px;height: 16px'  onclick='redrawArc("+i+",\""+newarc.arcid+"\")' title='重绘' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
        "<img src='img/remove.png' style='width: 16px;height: 16px'  onclick='delArc("+i+",\""+newarc.arcid+"\")' title='删除' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
        "</td></tr>";
    }
    newtable+="</td></tr>";
    $("#arclist").append(newtable);
    mapframe._MapApp.changeDragMode('drawPolyline',null,null,
        function(pos){
            mapframe._MapApp.changeDragMode('');
            mapframe._MapApp.changeDragMode('pan');

            var polyline = mapframe.showgroad(pos);
            polyline.setColor("red");
            polyline.arrnum = i;
            polyline.addListener("click", function() {
                showLine(i);
            });
            shownLineArr.push(polyline);
            preline = polyline;
            newarc.strcoords = pos;
            arcArr.push(newarc);
        });
}



function showLine(num,obj,centable){

    if(typeof(prearc)!='undefined' && prearc!=null){
        $(prearc).css("background",prearccolor);
    }
    prearc= $("#arclist").find("tr:eq("+num+")");
    //alert(prearc.height()*num);
    //prearc.height()*shownLineArr.length/(shownLineArr.length-num);
    $("#arctable").scrollTop(prearc.height()*num);
    prearccolor = prearc.css("background");
    prearc.css("background","#FFD75A");

    if(typeof(preline)!='undefined' && preline!=null && preline.arrnum!=num){
        preline.setColor("#00FF00");
        preline.disableEdit();
        arcArr[preline.arrnum].strcoords = preline.getPoints()+"";
    }
    var polyline = shownLineArr[num];
    polyline.setColor("red");
    preline = polyline;
    if(centable){
        mapframe._MapApp.centerAndZoom(new mapframe.Point((polyline.getPoints()+"").split(",")[0],(polyline.getPoints()+"").split(",")[1]),mapframe._MapApp.getZoomLevel());
    }

}

function submitEdit(nextflag){

    if(typeof(preline)!='undefined' && preline!=null ){
        preline.setColor("#00FF00");
        preline.disableEdit();
        arcArr[preline.arrnum].strcoords = preline.getPoints()+"";
    }
    prearc = null;
    preline = null;

    var param = "";
    for(var i = 0;i<arcArr.length;i++){
        param+=arcArr[i].arcid;
        param+="@"+arcArr[i].strcoords;
        param+="@"+(null==arcArr[i].delflag?'0':arcArr[i].delflag);
        param+="#";
    }
    param = param.substr(0,param.length-1);

    var url = rooturl+"/edit/saveArc.do";;
    $.ajax({
        url:url,
        type: 'POST',
        dataType: 'json',
        data:"roadid="+currroadid+"&arcarr="+param,
        cache: false,
        success: function (data) {

            $("#roadlist tr").each(function(i){
                if($(this).css("background") == "#ffd75a"){
                    var num = i;
                    if(nextflag){ //跳转到下一条
                        num = i+1;
                    }
                    if(num == roadArr.length){
                        return false;
                    }
                    var nextroad = roadArr[num];
                    editroad(num,nextroad.roadid,nextroad.roadcenter);
                    return false;
                }

            });

            $("#warndiv").css("margin-top",$("#submitbtn").offset().top);
            $("#warndiv").css("margin-left",$("#submitbtn").offset().left);
            $("#warndiv").show();
            setTimeout(function(){$("#warndiv").hide();},2000);

        }
    });
}

function getIntsList(xzqh,intsname){
    if(null == xzqh){
        xzqh = $("#intsxzqh").val();
    }
    if(null == intsname){
        intsname = encodeURI(encodeURI($("#intsname").val()));
    }
    var param ="1=1";
    if(null!=xzqh){
        param+="&xzqh="+xzqh;
    }
    if(null!=intsname){
        param+="&intsname="+intsname;
    }
    var url = rooturl+"/edit/getInts.do";
    $.ajax({
        url:url,
        type: 'get',
        dataType: 'json',
        data:param,
        cache: false,
        success: function (data) {
            $("#intslist").html("");
            if(data.length<=0){
                $("#intslist").html("没有数据");
            }else{
                if( typeof(arrPocessTimeout)!='undefined' && null!=arrPocessTimeout){
                    clearTimeout(arrPocessTimeout);
                }
                intsArr = data.concat();
                totalintscount = 0;
                largeArrayProcess(data,addIntsRow,30);
            }
        }
    });

}

function addIntsRow(data){
    for(var i=0;i<data.length;i++){
        var editstatus = "";
        /*if(data[i].editstatus == "0"){
            editstatus = "未调整";
        }else{
            editstatus = "<font color='gray'>已调整</font>";
        }*/
        var newrow;
        if(i%2 == 0){
            newrow = "<tr style='background: #ffffff;'><td nowrap>"+data[i].intsname+"</td>" +
            "<td nowrap align='center'>"+editstatus+"</td>" +
            "<td nowrap align='center'><img src='img/edit.png'  style='width: 18px;height: 18px' onclick='editInts("+totalintscount+",\""+data[i].intsid+"\",\""+data[i].longitude+","+data[i].latitude+"\")' title='调整' style='margin:3px 0 0 0;'/>&nbsp;" +
                //"<img src='img/edit.png'  style='width: 18px;height: 18px' onclick='editroad(this,\""+data[i].roadid+"\",\""+data[i].roadcenter+"\")' title='路口调整' style='margin:3px 0 0 0;'/>" +
            "</td></tr>";
        }else{
            newrow = "<tr style='background:#E3EaF4'><td nowrap>"+data[i].intsname+"</td>" +
            "<td nowrap align='center'>"+editstatus+"</td>" +
            "<td nowrap align='center'><img src='img/edit.png'  style='width: 18px;height: 18px' onclick='editInts("+totalintscount+",\""+data[i].intsid+"\",\""+data[i].longitude+","+data[i].latitude+"\")' title='调整' style='margin:3px 0 0 0;'/>&nbsp;" +
                //"<img src='img/edit.png'  style='width: 18px;height: 18px' onclick='editroad(this,\""+data[i].roadid+"\",\""+data[i].roadcenter+"\")' title='路口调整' style='margin:3px 0 0 0;'/>" +
            "</td></tr>";
        }
        totalintscount++;
        $("#intslist").append(newrow);
    }
}


function editInts(num,intsid,intscenter){
    currintsid = intsid;
    if(typeof(preintsobj)!='undefined'){
        $(preintsobj).css("background",preintscolor);
    }
    preintsobj= $("#intslist").find("tr:eq("+num+")");
    $("#intstable").scrollTop(preintsobj.height()*num);
    preintscolor = preintsobj.css("background");
    preintsobj.css("background","#FFD75A");

    //precolor = $(obj).css("background");


    mapframe.centerTo(intscenter);
    //清空地图上已经画的线
    /*if(null!=shownLineArr && shownLineArr.length>0){
        for(var i = 0;i<shownLineArr.length;i++){
            mapframe._MapApp.removeOverlay(shownLineArr[i]);
        }
    }
    shownLineArr = new Array();

    revertedLink = "";

    var url = rooturl+"/edit/getArc.do";
    $.ajax({
        url:url,
        type: 'get',
        dataType: 'json',
        data:'roadid='+roadid,
        cache: false,
        success: function (data) {
            if(data.length<=0){
                arcArr = new Array();
                $("#arclist").html("");
            }else{
                var newtable = "";
                $("#arclist").html("");
                arcArr = data;
                for(var i=0;i<data.length;i++){
                    var editstatus = "";

                    var newrow;
                    if(i%2 == 0){
                        newtable += "<tr  style='cursor: hand;background:white'><td >"+i+"</td><td onclick='showLine("+i+",this,true)'>"+data[i].arclength+"</td>" +
                        "<td align='center'><img src='img/revert.png' style='width: 16px;height: 16px'  onclick='revertArc("+i+",\""+data[i].arcid+"\")' title='反转' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "<img src='img/modify.png' style='width: 16px;height: 16px'  onclick='modifyArc("+i+",\""+data[i].arcid+"\")' title='修改' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "<img src='img/redraw.png' style='width: 16px;height: 16px'  onclick='redrawArc("+i+",\""+data[i].arcid+"\")' title='重绘' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "<img src='img/remove.png' style='width: 16px;height: 16px'  onclick='delArc("+i+",\""+data[i].arcid+"\")' title='删除' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "</tr>";
                    }else{
                        newtable += "<tr  style='cursor: hand;background:#E3EaF4'><td >"+i+"</td><td onclick='showLine("+i+",this,true)'>"+data[i].arclength+"</td>" +
                        "<td align='center'><img src='img/revert.png' style='width: 16px;height: 16px' onclick='revertArc("+i+",\""+data[i].arcid+"\")' title='反转' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "<img src='img/modify.png' style='width: 16px;height: 16px'  onclick='modifyArc("+i+",\""+data[i].arcid+"\")' title='修改' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "<img src='img/redraw.png' style='width: 16px;height: 16px'  onclick='redrawArc("+i+",\""+data[i].arcid+"\")' title='重绘' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "<img src='img/remove.png' style='width: 16px;height: 16px'  onclick='delArc("+i+",\""+data[i].arcid+"\")' title='删除' style='margin:3px 0 0 0;'/>&nbsp;&nbsp;" +
                        "</td></tr>";
                    }
                    var polyline = mapframe.showgroad(data[i].strcoords);
                    polyline.arrnum = i;
                    (function(num,pline){
                        pline.addListener("click", function() {
                            if(mapframe._MapApp.getDragMode() == "drawPolyline"){
                                return;
                            }
                            showLine(num);
                        });
                    })(i,polyline);

                    shownLineArr.push(polyline);
                }
                newtable+="</td></tr>";
                $("#arclist").append(newtable);
                showLine(0);
            }
        }
    });*/
}

//大数据量循环的优化方法
function largeArrayProcess(array,process,onceNum,context){
    arrPocessTimeout = setTimeout(function(){
        if(array == null || array.length<=0){
            return;
        }
        var count=0;
        var showarray = new Array();
        while(count<onceNum){
            if(array.length==0){
                break;
            }
            var item = array.shift();
            showarray.push(item);
            count++;
        }
        process.call(context,showarray);
        if (array.length > 0){
            arrPocessTimeout = setTimeout(arguments.callee, 0);
        }else{
            arrPocessTimeout = null;
            //addLayerListener(devicetype);
        }
    }, 0);
}