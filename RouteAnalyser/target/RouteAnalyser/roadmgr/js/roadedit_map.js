/**
 * Created by lxb on 2015-6-29.
 */
var rooturl = document.URL.split( "/" )[0]+"/"+ document.URL.split( "/" )[1]
    +"/"+ document.URL.split( "/" )[2]+"/"+ document.URL.split( "/" )[3];


function showWmsRoad(){
    var listlen = _MapApp.map.stateListeners.length;
    legendfunc=new LegendFunc();

    legendfunc.format=geoserverURL+"/sde/wms?REQUEST=GetMap&VERSION=1.1.0&FORMAT=image/png&SERVICE=WMS&BBOX=EZBOX&SRS=EPSG:4326&LAYERS=sde:ROUTE_ARC&WIDTH=EZWIDTH&height=EZHEIGHT&TRANSPARENT=true";
    //legendfunc.format=geoserverURL+"/sde/wms?REQUEST=GetMap&VERSION=1.1.0&FORMAT=image/png&SERVICE=WMS&BBOX=EZBOX&SRS=EPSG:4326&LAYERS=sde:sectionstatus&WIDTH=EZWIDTH&height=EZHEIGHT&TRANSPARENT=true";

    legendfunc.open(_MapApp);
}
function showWmsints(){
    legendfunc=new LegendFunc();

    legendfunc.format=geoserverURL+"/sde/wms?REQUEST=GetMap&VERSION=1.1.0&FORMAT=image/png&SERVICE=WMS&BBOX=EZBOX&SRS=EPSG:4326&LAYERS=sde:route_node&WIDTH=EZWIDTH&height=EZHEIGHT&TRANSPARENT=true";
    legendfunc.open(_MapApp);
}
