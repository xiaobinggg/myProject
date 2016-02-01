
var m_EzServer="http://10.16.1.72:9080/EzServer";
var m_MapServer="http://10.16.1.72:9080/EzMapService/MapService_v6";
var m_logService=m_EzServer+"/ezmanager";
var m_mapService_servlet=m_MapServer+"/mapserviceServlet";
var tempurl = "http://10.16.5.203:8089/HiMap/ezmap_demo/ezmap";

document.writeln("<LINK href='"+m_EzServer+"/css/EzServer.css' type='text/css' rel='stylesheet'>");
if(true){
	document.writeln("<SCRIPT type='text/javascript' src='"+m_EzServer+"/js/EzMapParameter.js'></SCRIPT>");
	document.writeln("<SCRIPT type='text/javascript' src='"+m_EzServer+"/js/VML_Graghics.js'></SCRIPT>");

	document.writeln("<SCRIPT type='text/javascript' src='"+tempurl+"/ezmaps6.3.1.js'></SCRIPT>");

	document.writeln("<SCRIPT type='text/javascript' src='"+m_EzServer+"/js/mapSpatial6.2.61.js'></SCRIPT>");
	
	document.writeln("<SCRIPT type='text/javascript' src='"+m_EzServer+"/js/monitor_api.js'></SCRIPT>");
	document.writeln("<SCRIPT type='text/javascript' src='"+m_EzServer+"/js/video_api.js'></SCRIPT>");
	document.writeln("<SCRIPT type='text/javascript' src='"+m_EzServer+"/js/routeSearch_api.js'></SCRIPT>");
	document.writeln("<SCRIPT type='text/javascript' src='"+m_EzServer+"/js/geocode_api.js'></SCRIPT>");
}
