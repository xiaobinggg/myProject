if (typeof bLoadEzMapParameter == "undefined" || !bLoadEzMapParameter) {
    alert("EzMapParameter.js不存在或没有被引入，系统使用默认参数!");
}
if (typeof _MapUnitPixels == "undefined") _MapUnitPixels = 128;
if (typeof _bIsOverlay == "undefined") _bIsOverlay = true;
if (typeof _bMapProx == "undefined") _bMapProx = false;
var m_mapService = m_mapService_servlet + "?xml=";
var bIsUsingDiv = true;
var iMaxLevel = 18;
var iSliderH = 216;
if (!_VectorMapService instanceof Array) {
    _VectorMapService = [_VectorMapService];
}
if (!_SatelliteMapService instanceof Array) {
    _SatelliteMapService = [_SatelliteMapService];
}
if (!_VectorSateMapService instanceof Array) {
    _VectorSateMapService = [_VectorSateMapService];
}
var _MapService = m_EzServer;
var _MapServiceArr = _VectorMapService;
var _overLayIndex = 100;
var _ImageBaseUrl = _MapService + "/images/";
var _MapServlet = "/EzMap?Service=getImage&Type=RGB&";
_m_scale_meter = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000];
var iSpan = 1;
var _m_MapSpan = new Array();
var _m_dMapSpanScale = _MapUnitPixels / 128;
if (typeof _MapSpanScale == "undefined") {
    _MapSpanScale = 1;
}
for (var i = 17; i >= 0; i--) {
    _m_MapSpan[i] = iSpan;
    iSpan = iSpan * 2;
}
var _m_MapBottomSpan = _m_dMapSpanScale * 3.515625;
var _m_MapBottomScale = 3000;
var _m_MapApp = null;
var _m_result = null;
if (_ZoomOffset != 0 || _MapSpanScale != 1) {
    var dScale = Math.pow(2, _ZoomOffset) * _MapSpanScale;
    _m_MapBottomScale = _m_MapBottomScale * dScale;
    _m_MapBottomSpan = _m_MapBottomSpan * dScale;
    var ZoomLen = _m_MapSpan.length;
    for (var iIndex = 0; iIndex < ZoomLen; iIndex++) {
        _m_MapSpan[iIndex] = _m_MapSpan[iIndex] / dScale;
    }
}
var _RefreshSpeed = 13000;
var _TrackSpeed = 1000;
var _Debug = false;
var _Embed = true;
var _VMLInMap = false;
var _bIsGPSMonitor = false;
var _bIsVideoMonitor = false;
var _bIsResultTable = false;
var _bIsShowMapControl = false;
var _FlashTimeValve = 600;
var _mapName = "地图";
var _u = navigator.userAgent.toLowerCase();
_mSiteName = 'EasyMap';
_mEmailSubject = 'EzService';
_mSearching = '查找...';
_mZoomIn = '放大';
_mZoomOut = '缩小';
_mZoomSet = '点击设置显示级别';
_mZoomDrag = '拖动缩放';
_mPanWest = '左移';
_mPanEast = '右移';
_mPanNorth = '上移';
_mPanSouth = '下移';
_mLastResult = '对中';
_mDataCopy = '地图数据 &copy;2005 山海经纬';
_mNormalMap = 'Map';
_mNew = 'New!';
_NoImage = new Image();
_NoImage.src = _ImageBaseUrl + "NoImage.png";
_TackImgURL = _ImageBaseUrl + "tack.gif";
_MapCenterPoint = new Point(_MapCenter[0], _MapCenter[1]);
var _TransparentImageUrl = _ImageBaseUrl + "transparent.png";
var _WaterImageUrl = _ImageBaseUrl + "water.gif";
var _MapCenterUrl = _ImageBaseUrl + "Mapcenter.gif";
var _MapDebugCenterUrl = _ImageBaseUrl + "Mapcenter_debug.gif";
var _MapBeingCenterUrl = _ImageBaseUrl + "car_flash1.gif";
var s = _ImageBaseUrl + "mobile.gif";
var _MobileFlashImgURL = _ImageBaseUrl + "mobile_flash.gif";
var _CloseImg = _ImageBaseUrl + "close.gif";
var Vi = _ImageBaseUrl + "markerTransparent.png";
var Ph = _ImageBaseUrl + "dd-start.png";
var lh = _ImageBaseUrl + "dd-end.png";
var hi = _ImageBaseUrl + "zoom-plus.gif";
var Zh = _ImageBaseUrl + "zoom-minus.gif";
var ei = _ImageBaseUrl + "sliderbar.gif";
var Gh = _ImageBaseUrl + "slider.gif";
var kh = _ImageBaseUrl + "center.png";
var pi = _ImageBaseUrl + "east.png";
var Yh = _ImageBaseUrl + "west.png";
var jg = _ImageBaseUrl + "north.png";
var ni = _ImageBaseUrl + "south.png";
var Gi = _ImageBaseUrl + "panshadow.png";
var ch = _ImageBaseUrl + "slidershadow.png";
var fh = _ImageBaseUrl + "east-mini.png";
var Jh = _ImageBaseUrl + "west-mini.png";
var mh = _ImageBaseUrl + "north-mini.png";
var Oh = _ImageBaseUrl + "south-mini.png";
var Ch = _ImageBaseUrl + "zoom-plus-mini.png";
var sg = _ImageBaseUrl + "zoom-minus-mini.png";
var Fg = _ImageBaseUrl + "iws_nw.png";
var Oi = _ImageBaseUrl + "iws_n.png";
var ii = _ImageBaseUrl + "iws_ne.png";
var Og = _ImageBaseUrl + "iws_e.png";
var Gg = _ImageBaseUrl + "iws_c.png";
var Th = _ImageBaseUrl + "iws_w.png";
var Qg = _ImageBaseUrl + "iws_sw.png";
var qf = _ImageBaseUrl + "iws_s.png";
var Lg = _ImageBaseUrl + "iws_se.png";
var Eg = _ImageBaseUrl + "iws_tap.png";
var ti = _ImageBaseUrl + "iw_nw.png";
var Wh = _ImageBaseUrl + "iw_n.png";
var ji = _ImageBaseUrl + "iw_ne.png";
var Rg = _ImageBaseUrl + "iw_e.png";
var Wg = _ImageBaseUrl + "iw_c.png";
var bi = _ImageBaseUrl + "iw_w.png";
var vi = _ImageBaseUrl + "iw_sw.png";
var nf = _ImageBaseUrl + "iw_s.png";
var ng = _ImageBaseUrl + "iw_se.png";
var Hh = _ImageBaseUrl + "iw_tap.png";
var Di = _ImageBaseUrl + "close.gif";
var Gc = _ImageBaseUrl + "iw_tabstub.png";
var Fc = _ImageBaseUrl + "iw_tab.png";
var Ec = _ImageBaseUrl + "iw_tabback.png";
var _MonitorSelectID = "MonitorInfoPanel";
var _OverViewImg = "OverViewImg";
var _StartImgID = "RouteStart";
var _EndImgID = "RouteEnd";
var _pointImgURL = _MapDebugCenterUrl;
var _ZoomInURL = _ImageBaseUrl + "/zoomin.cur";
var _ZoomOutURL = _ImageBaseUrl + "/zoomout.cur";
var _printMapURL = _MapService + "/printMap.htm";
function _UserAgent(t) {
    return _u.indexOf(t) != -1;
};
function _uan(t) {
    if (!window.RegExp) {
        return 0;
    }
    var r = new RegExp(t + "([0-9]*)");
    var s = r.exec(_u);
    var ret = 0;
    if (s.length >= 2) {
        ret = s[1];
    }
    return ret;
};
function _compatIE() {
    return ((_UserAgent('opera') && (_UserAgent('opera 7.5') || _UserAgent('opera/7.5') || _UserAgent('opera/8'))) || (_UserAgent('safari') && _uan('safari/') >= 125) || (_UserAgent('msie') && !_UserAgent('msie 4') && !_UserAgent('msie 5.0') && !_UserAgent('msie 5.1') && !_UserAgent('msie 3') && !_UserAgent('powerpc')) || (document.getElementById && window.XSLTProcessor && window.XMLHttpRequest && !_UserAgent('netscape6') && !_UserAgent('netscape/7.0')));
};
function _noActiveX() {
    if (!_UserAgent('msie') || !document.all || _UserAgent('opera')) {
        return false;
    }
    var s = false;
    eval('try { new ActiveXObject("Microsoft.XMLDOM"); }' + 'catch (e) { s = true; }');
    return s;
};
function getEleByID(i) {
    return document.getElementById(i);
};
var _nxsl = !_UserAgent('safari');
function _loadnxsl() {
    _nxsl = true;
    _checkLoad();
};
function _load(xml, doc) {
    if (!_c) return;
    if (!getMapApp() || !_nxsl) {
        window._pending = xml;
    } else {
        getMapApp().loadXML(xml, doc);
    }
};
var _wStr = 'the map area below';
function _print() {
    if (!_c || !getMapApp()) return;
    getMapApp().print();
};
function _checkLoad() {
    if (window._pending) {
        var xml = window._pending;
        window._pending = null;
        _load(xml);
    }
};
_MapApp = null;
_sf = 'hl=en';
_tv = '.3';
_fc = false;
_c = _fc || _compatIE();
function _script(src) {
    var ret = '<' + 'script src="' + src + '"' + ' type="text/javascript"><' + '/script>';
    document.write(ret);
};
function _havexslt() {
    if (typeof GetObject != 'undefined' || (typeof XMLHttpRequest != 'undefined' && typeof DOMParser != 'undefined' && typeof XSLTProcessor != 'undefined')) {
        return true;
    } else {
        return false;
    }
};
if (_c) {
    if (_havexslt()) {
    } else if (_UserAgent('safari')) {
        _script("mapfiles/maps.6.safari.js");
    } else {
        _script("mapfiles/maps.6.xslt.js");
    }
}
function IEBrowser(Zg, og, oi) {
    this.type = Zg;
    this.version = og;
    this.os = oi;
};
var _IEBrowser = new IEBrowser(0, 0, null);
var Gb = navigator.userAgent.toLowerCase();
if (Gb.indexOf("opera") != -1) {
    _IEBrowser.type = 4
} else if (Gb.indexOf("msie") != -1 && document.all) {
    _IEBrowser.type = 1;
    if (Gb.indexOf("msie 5")) {
        _IEBrowser.version = 5
    }
} else if (Gb.indexOf("safari") != -1) {
    _IEBrowser.type = 3;
    if (Gb.indexOf("safari/125") != -1) {
        _IEBrowser.version = 1
    }
} else if (Gb.indexOf("mozilla") != -1) {
    _IEBrowser.type = 2
}
if (Gb.indexOf("x11;") != -1) {
    _IEBrowser.os = 1
}
;
var _MaxNumber = Number.MAX_VALUE;
var _m_iSeq = 0;
function StrLength(str) {
    var j = 0;
    if (str == "") return 0;
    for (var i = 0; i < str.length; i++) {
        if (str.substr(i, 1).charCodeAt(0) > 255) j = j + 2;
        else j++
    }
    return j;
};
function toStringSize(intTmp, size) {
    var str = intTmp + "";
    while (str.length < size) {
        str = "0" + str;
    }
    return str;
};
Object.prototype.setTimeout = function (ie, Bi) {
    var ke = "tempVar" + _m_iSeq;
    _m_iSeq++;
    if (_m_iSeq == Number.MAX_VALUE - 1) {
        _m_iSeq = 0;
    }
    eval(ke + " = this;");
    var Rh = ie.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
    return window.setTimeout(ke + '._setTimeoutDispatcher("' + Rh + '");', Bi)
};
Object.prototype.toStringSize = toStringSize;
Object.prototype._setTimeoutDispatcher = function (ie) {
    eval(ie)
};
Object.prototype.eventHandler = function (tg) {
    var g = this;
    return function (b) {
        if (!b) {
            b = window.event
        }
        if (b && !b.target) {
            b.target = b.srcElement
        }
        g[tg](b)
    }
};
Object.prototype.Clone = function () {
    try {
        var objClone = new this.constructor();
        for (var key in this) {
            if (objClone[key] != this[key]) {
                if (typeof(this[key]) == 'object') {
                    objClone[key] = this[key].Clone();
                } else {
                    objClone[key] = this[key];
                }
            }
        }
        if (!objClone || ('' + objClone) == '') {
            return (new String(this) + objClone) ? this : objClone;
        } else {
            objClone.toString = this.toString;
            return objClone;
        }
    } catch (e) {
        alert("Clone出现错误:" + e.message);
    }
};
function Fb(xe) {
    return xe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
};
function Ec(xe) {
    return Fb(xe).replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
};
Array.prototype.clear = function () {
    while (this.length > 0) this.pop();
};
Array.prototype.insert = function (index, value) {
    if (!(index >= 0)) return;
    var original = this.slice();
    var iSize = this.length - index;
    var temp = original.splice(index, iSize);
    original[original.length] = value;
    original = original.concat(temp);
    return original;
};
Array.prototype.indexOf = function (object) {
    for (var i = 0,
             length = this.length; i < length; i++) if (this[i] == object) {
        return i;
    }
    ;
    return -1;
};
document.getElementsByClassName = function (J) {
    var vc = document.all;
    if (!vc) vc = document.getElementsByTagName("*");
    var pe = new Array();
    for (var a = 0; a < vc.length; a++) {
        if (vc[a].className == J) {
            pe[pe.length] = vc[a];
        }
    }
    return pe
};
function setCursor(d, We) {
    try {
        d.style.cursor = We;
    } catch (b) {
        if (We == "pointer") {
            setCursor(d, "hand");
        }
    }
};
function divCreator() {
};
divCreator.count = 0;
divCreator.createElement = function (strURL, bIsCrop, pDoc) {
    if (typeof arguments.callee.hasFilters == "undefined") {
        var Vh = document.createElement("DIV");
        arguments.callee.hasFilters = typeof Vh.style.filter != "undefined"
    }
    var f;
    if (arguments.callee.hasFilters) {
        if (!pDoc) pDoc = document;
        var pCache = pDoc.PNG_cache;
        if (pCache && pCache.childNodes.length > 0) {
            f = pCache.removeChild(pCache.lastChild)
        } else {
            f = pDoc.createElement("DIV");
            divCreator.destroyBeforeUnload(f);
        }
        if (!f.loader) {
            f.loader = pDoc.createElement("img");
            f.loader.style.visibility = "hidden";
            f.loader.onload = function () {
                if (!f.cleared) {
                    f.style.filter = divCreator.alphaImageLoader(this.src, true);
                }
            }
        }
    } else {
        f = document.createElement("img");
    }
    divCreator.setImage(f, strURL, bIsCrop);
    return f
};
divCreator.create = function (strURL, iWidth, iHeight, left, top, iIndex, pDoc, Fa) {
    return Shaderer.create(strURL, iWidth, iHeight, left, top, iIndex, pDoc, Fa, divCreator.createElement)
};
divCreator.alphaImageLoader = function (a, b) {
    var c = "DXImageTransform.Microsoft.AlphaImageLoader";
    var d = ",sizingMethod=" + (b ? "crop" : "scale");
    return "progid:" + c + '(src="' + a + '"' + d + ")"
};
divCreator.remove = function (a, b) {
    if (a.nodeName == "DIV") {
        if (!b.PNG_cache) {
            b.PNG_cache = b.createElement("div");
            b.PNG_cache.style.display = "none";
            b.body.appendChild(b.PNG_cache)
        }
        b.PNG_cache.appendChild(a);
        divCreator.clearImage(a);
    } else {
        RemoveImg(a);
    }
};
function RemoveImg(pImg) {
    if (pImg && pImg.parentNode) {
        pImg.parentNode.removeChild(pImg);
    }
    ;
};
divCreator.setImage = function (a, b, c) {
    if (a.tagName == "DIV") {
        a.cleared = false;
        a.loader.ieCrop = c || false;
        a.loader.src = b
    } else {
        a.src = b
    }
};
divCreator.clearImage = function (a, b) {
    if (a.tagName == "DIV") {
        a.cleared = true;
        a.style.filter = ""
    } else {
        a.src = b
    }
};
divCreator.destroyBeforeUnload = function (a) {
    if (!divCreator.cleanupQueue) {
        divCreator.cleanupQueue = [];
        EventManager.addUnloadFunc(divCreator.onUnload);
    }
    divCreator.cleanupQueue.push(a);
};
divCreator.onUnload = function () {
    window.status = "清除对DOM的引用..";
    window.defaultStatus = "";
    for (var a = 0; a < divCreator.cleanupQueue.length; ++a) {
        window.status = "清除对DOM的引用.." + a;
        divCreator.destroyImage(divCreator.cleanupQueue[a])
    }
    ;
};
divCreator.destroyImage = function (a) {
    if (a.loader) {
        a.loader.onload = null;
        a.loader = null;
    }
};
function Shaderer() {
};
Shaderer.create = function (strURL, iWidth, iHeight, left, top, iIndex, bIsCrop, pDoc, func) {
    var f;
    if (!func) {
        f = document.createElement("IMG");
        if (strURL) f.src = strURL
    } else {
        f = func(strURL, bIsCrop, pDoc);
    }
    if (iWidth && iHeight) {
        f.style.width = convert2Px(iWidth);
        f.style.height = convert2Px(iHeight);
        f.width = iWidth;
        f.height = iHeight;
    }
    if (top || (left || (top == 0 || left == 0))) {
        f.style.position = "absolute";
        f.style.left = convert2Px(left);
        f.style.top = convert2Px(top)
    }
    if (iIndex || iIndex == 0) {
        f.style.zIndex = iIndex
    }
    if (_IEBrowser.type == 1) {
        f.unselectable = "on";
        f.onselectstart = _NoAction
    } else {
        f.style.MozUserSelect = "none"
    }
    f.style.border = "0";
    f.oncontextmenu = _NoAction;
    if (pDoc) {
        setClass(f, pDoc)
    }
    return f
};
function getTargetElement(evt) {
    var elem;
    if (evt.target) {
        elem = (evt.target.nodeType == 3) ? evt.target.parentNode : evt.target
    } else {
        elem = evt.srcElement
    }
    return elem
};
function S(b) {
    if (_IEBrowser.type == 1) {
        window.event.cancelBubble = true
    } else {
        b.cancelBubble = true;
        b.preventDefault();
        b.stopPropagation()
    }
};
function Bh(yd, Qi) {
    var Oa = window.document.createElement("a");
    Oa.href = "PolylineDrawer";
    Oa.onclick = Qi;
    Oa.appendChild(window.document.createTextNode(yd));
    return Oa
};
if (!Array.prototype.push) {
    Array.prototype.push = function (ff) {
        this[this.length] = ff
    }
}
function convert2Px(x) {
    return x + "px"
};
function setClass(d, Fa) {
    if (d.className) {
        d.className += " " + Fa
    } else {
        d.className = Fa
    }
};
function ObjectOffset(s) {
    var A = {
        "x": 0,
        "y": 0
    };
    while (s) {
        A.x += s.offsetLeft;
        A.y += s.offsetTop;
        s = s.offsetParent;
    }
    return A
};
function Tg(s, Cg) {
    var A = {
        "x": 0,
        "y": 0
    };
    while (s && s != Cg) {
        A.x += s.offsetLeft;
        A.y += s.offsetTop;
        s = s.offsetParent
    }
    return A
};
function Ic(ma) {
    this.size = 0;
    if (ma) {
        for (var a = ma.length - 1; a >= 0; a--) this.add(ma[a])
    }
};
Ic.prototype.add = function (zb) {
    if (!this.contains(zb)) {
        this[":" + zb] = 1;
        this.size++
    }
};
Ic.prototype.remove = function (zb) {
    if (this.contains(zb)) {
        delete this[":" + zb];
        this.size--
    }
};
Ic.prototype.contains = function (zb) {
    return this[":" + zb] == 1
};
function _NoAction() {
    return false
};
var md = new Array("q", "ll", "spn", "z", "t", "sll", "sspn", "vp", "f", "output", "file", "deb");
function ud(C) {
    if (C.toFixed) {
        return C.toFixed(6).toString()
    } else {
        return C.toString()
    }
};
var sb = new Object();
function xa(U, Ja) {
    this.id = U;
    this.ticketClass = Ja
};
xa.create = function (Ja) {
    if (!Ja) Ja = "_dtc";
    if (!sb[Ja]) sb[Ja] = 1;
    else sb[Ja]++;
    return new xa(sb[Ja], Ja)
};
xa.invalidateAll = function () {
    for (var a in sb) {
        try {
            sb[a]++
        } catch (b) {
        }
    }
};
xa.invalidate = function (Fa) {
    sb[Fa]++
};
xa.prototype.isValid = function () {
    return sb[this.ticketClass] == this.id
};
function XMLHttp() {
};
XMLHttp.create = function () {
    if (typeof ActiveXObject != "undefined") {
        return new ActiveXObject("Microsoft.XMLHTTP")
    } else if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest()
    } else {
        return null
    }
};
function V(ee) {
    this.stylesheet = ee
};
V.cache_ = new Object();
V.create = function (ee) {
    return new V(ee)
};
V.getCached = function (Ab) {
    return V.cache_[Ab]
};
V.cache = function (Ab, lg) {
    V.cache_[Ab] = lg
};
V.prototype.transformToHTML = function (pMon, Va) {
    var strInfo = "";
    Va.className = "InfoClass";
    if (typeof Monitor != "undefined" && pMon instanceof Monitor) {
        strInfo = pMon.toHTML();
        Va.innerHTML = strInfo;
    } else if (typeof pMon == "string") {
        strInfo = pMon;
        Va.innerHTML = strInfo;
    } else if (typeof pMon == "object") {
        RemoveChildren(Va);
        Va.appendChild(pMon);
    } else {
        alert("不知类型");
    }
};
var ae = "mapsxmlhttpiframe";
V.asynchronousTransform = function (ub, Va, ob, kb, Ja) {
    var nb = V.getCached(ob);
    var R = bindingDoc("");
    var nb = V.create(R);
    nb.transformToHTML(ub, Va);
    V.cache(ob, nb);
    if (kb) {
        kb();
    } else {
        alert("no function");
    }
    return;
};
function RemoveChildren(d) {
    if (typeof d == "undefined" || d == null) return;
    while (d.hasChildNodes()) {
        d.removeChild(d.lastChild);
    }
};
function bindingDoc(str) {
    try {
        if (typeof ActiveXObject != "undefined" && typeof GetObject != "undefined") {
            var Af = new ActiveXObject("Microsoft.XMLDOM");
            Af.loadXML(str);
            return Af
        } else if (typeof DOMParser != "undefined") {
            return (new DOMParser()).parseFromString(str, "text/xml")
        } else {
            return voidFunc(str)
        }
    } catch (b) {
        EzLog.incompatible("xmlparse")
    }
    try {
        return voidFunc(str)
    } catch (b) {
        EzLog.incompatible("xmlparse");
        return document.createElement("div")
    }
};
function uf(s) {
    var A = "";
    if (s.nodeName == "#text") {
        A += Fb(s.nodeValue)
    } else {
        A += "<" + s.nodeName;
        if (s.hasAttributes()) {
            for (var a = 0; a < s.attributes.length; ++a) {
                A += " " + s.attributes[a].nodeName + '="' + Ec(s.attributes[a].nodeValue) + '"'
            }
        }
        if (s.childNodes.length == 0) {
            A += "/>"
        } else {
            A += ">";
            for (var a = 0; a < s.childNodes.length; ++a) {
                A += uf(s.childNodes[a])
            }
            A += "</" + s.nodeName + ">"
        }
    }
    return A
};
function ug(s) {
    var A = "";
    if (s.nodeName == "#text") {
        A += Fb(s.nodeValue)
    } else {
        for (var a = 0; a < s.childNodes.length; ++a) {
            A += uf(s.childNodes[a])
        }
    }
    return A
};
function gg(J) {
    var C = window.document.createElement("iframe");
    C.style.width = convert2Px(100);
    C.style.height = convert2Px(50);
    C.style.position = "absolute";
    C.style.top = convert2Px(-110);
    C.style.left = convert2Px(-110);
    C.id = J;
    C.name = J;
    window.document.body.appendChild(C);
    return C
};
function local2LonLat(pPoint) {
    if (!(pPoint instanceof Point)) {
        throw new Error(100, "参数类型应为:Point");
    }
    var lat = (pPoint.y - _convert_ofsy) / _convert_scale;
    var lon = (pPoint.x - _convert_ofsx) / _convert_scale;
    return new Point(lon, lat);
};
function LonLat2Local(pPoint) {
    if (!(pPoint instanceof Point)) {
        throw new Error(100, "参数类型应为:Point");
    }
    var x = pPoint.x * _convert_scale + _convert_ofsx;
    var y = pPoint.y * _convert_scale + _convert_ofsy;
    return new Point(x, y);
};
function CalculateArea(pInPoints) {
    var pPoints = pInPoints.Clone();
    var pts = pPoints.length;
    var area = 0;
    var pt0 = pPoints[0];
    pt0 = CalculateCoordinate(pt0);
    for (var i = 1; i < pts; i++) {
        pt1 = pPoints[i];
        pt1 = CalculateCoordinate(pt1);
        area += (pt1.x - pt0.x) * (pt1.y + pt0.y) / 2;
        pt0 = pt1;
    }
    return Math.abs(area);
};
function CalculateLength(pInPoints) {
    var pPoints = pInPoints.Clone();
    var pts = pPoints.length;
    var dLen = new Number(0);
    var pt0 = pPoints[0];
    for (var i = 1; i < pts; i++) {
        pt1 = pPoints[i];
        dLen += GetDistanceInLL(pt0, pt1);
        pt0 = pt1;
    }
    return Math.abs(Math.ceil(dLen));
};
_C_P = 0.0174532925199432957692222222222;
function CalculateCoordinate(pt) {
    if (_MapSpanScale != 1) return pt;
    var qq;
    var Latitude = pt.y * _C_P;
    var sin_lat = Math.sin(Latitude);
    var dlam = pt.x * _C_P;
    var x = 0.081819190842622 * sin_lat;
    var qq = (1.0 - 0.0066943799901413800) * (sin_lat / (1.0 - x * x) - (1.0 / (2.0 * 0.081819190842622)) * Math.log((1.0 - x) / (1.0 + x)));
    pt.x = 6378137 * qq / 2.0;
    pt.y = 6378137.0 * dlam;
    return pt;
};
function GetDistanceInLL(p1, p2) {
    var d = new Number(0);
    if (_MapSpanScale == 1) {
        var dlon = (p2.x - p1.x) * _C_P;
        var dlat = (p2.y - p1.y) * _C_P;
        var a = Math.sin(0.5 * dlat) * Math.sin(0.5 * dlat) + Math.cos(p1.y * _C_P) * Math.cos(p2.y * _C_P) * (Math.sin(0.5 * dlon) * Math.sin(0.5 * dlon));
        a = Math.abs(a);
        if (a > 1) {
            alert("不合法数据:" + "a:" + a + ",P1:" + p1.toString() + ",P2:" + p2.toString());
        }
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        d = c * 6371008.77141506;
    } else {
        var p2Len = (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);
        d = Math.sqrt(p2Len);
    }
    d = Math.ceil(d);
    return d;
};
function Point(x, y) {
    if (arguments.length == 1 && typeof arguments[0] == "string") {
        var strPoint = arguments[0];
        var pPoint = strPoint.split(",");
        this.x = parseFloat(pPoint[0]);
        this.y = parseFloat(pPoint[1]);
    } else {
        if (typeof x == "string") {
            this.x = parseFloat(x);
        } else {
            this.x = x;
        }
        if (typeof y == "string") {
            this.y = parseFloat(y);
        } else {
            this.y = y;
        }
    }
    this.screenX;
    this.screenY;
    this.mileage = -1;
};
Point.getDistPoint = function (pSPoint, pEPoint, dDist) {
    var pPoint = new Point();
    var dLen = pSPoint.distanceFrom(pEPoint);
    if (dDist > dLen || dLen == 0) {
        return pEPoint;
    }
    var dx = pSPoint.x + dDist * (pEPoint.x - pSPoint.x) / dLen;
    var dy = pSPoint.y + dDist * (pEPoint.y - pSPoint.y) / dLen;
    if (isNaN(dx) || isNaN(dy)) {
        alert("坐标计算有问题,x:" + dx + ",:" + dy);
        throw new Error(101, "startPoint:" + pSPoint.toString() + ",endPoint:" + pEPoint.toString() + ",len:" + dLen);
    }
    pPoint.x = dx;
    pPoint.y = dy;
    return pPoint;
};
Point.prototype.countMileage = function (pPoint) {
    var dMileage = this.distanceFrom(pPoint) + pPoint.mileage;
    this.mileage = dMileage;
};
Point.prototype.toString = function () {
    return this.x + "," + this.y;
};
Point.prototype.equals = function (aa) {
    if (!aa) return false;
    return this.x == aa.x && this.y == aa.y
};
Point.prototype.distanceFrom = function (aa) {
    var Da = this.x - aa.x;
    var Ha = this.y - aa.y;
    return Math.sqrt(Da * Da + Ha * Ha)
};
Point.prototype.approxEquals = function (aa) {
    if (!aa) return false;
    return bRetComp(this.x, aa.x) && bRetComp(this.y, aa.y)
};
Point.prototype.getCenter = function (aa) {
    if (!aa) return this;
    return new Point((this.x + aa.x) / 2, (this.y + aa.y) / 2);
};
function Rect(k, m) {
    this.width = k;
    this.height = m;
};
Rect.prototype.toString = function () {
    return "(" + this.width + ", " + this.height + ")"
};
Rect.prototype.equals = function (aa) {
    if (!aa) return false;
    return this.width == aa.width && this.height == aa.height
};
Rect.prototype.approxEquals = function (aa) {
    if (!aa) return false;
    return bRetComp(this.width, aa.width) && bRetComp(this.height, aa.height)
};
function bRetComp(Pg, fi) {
    return Math.round(Pg * 1000000) == Math.round(fi * 1000000)
};
function MBR(Ei, rh, xd, ed) {
    if (typeof Ei == "string") {
        Ei = parseFloat(Ei);
    }
    if (typeof rh == "string") {
        rh = parseFloat(rh);
    }
    if (typeof xd == "string") {
        xd = parseFloat(xd);
    }
    if (typeof ed == "string") {
        ed = parseFloat(ed);
    }
    this.minX = Ei;
    this.minY = rh;
    this.maxX = xd;
    this.maxY = ed
};
MBR.prototype.toString = function () {
    return this.minX + "," + this.minY + "," + this.maxX + "," + this.maxY;
};
MBR.prototype.containsSegment = function (Ed, kd) {
    if (this.minX > Ed.x && this.minX > kd.x) return false;
    if (this.maxX < Ed.x && this.maxX < kd.x) return false;
    if (this.minY > Ed.y && this.minY > kd.y) return false;
    if (this.maxY < Ed.y && this.maxY < kd.y) return false;
    return true
};
MBR.prototype.containsBounds = function (Gd) {
    var bIs = this.minX <= Gd.minX && (this.maxX >= Gd.maxX && (this.minY <= Gd.minY && this.maxY >= Gd.maxY));
    return bIs;
};
MBR.prototype.containsPoint = function (pPoint) {
    var bIs = this.containsSegment(pPoint, pPoint);
    return bIs;
};
MBR.prototype.extend = function (j) {
    if (j instanceof Point) {
        this.minX = Math.min(this.minX, j.x);
        this.maxX = Math.max(this.maxX, j.x);
        this.minY = Math.min(this.minY, j.y);
        this.maxY = Math.max(this.maxY, j.y)
    } else if (j instanceof MBR) {
        this.minX = Math.min(this.minX, j.minX);
        this.maxX = Math.max(this.maxX, j.maxX);
        this.minY = Math.min(this.minY, j.minY);
        this.maxY = Math.max(this.maxY, j.maxY)
    }
};
MBR.intersection = function (Qc, td) {
    return new MBR(Math.max(Qc.minX, td.minX), Math.max(Qc.minY, td.minY), Math.min(Qc.maxX, td.maxX), Math.min(Qc.maxY, td.maxY))
};
MBR.union = function (Qc, td) {
    return new MBR(Math.min(Qc.minX, td.minX), Math.min(Qc.minY, td.minY), Math.max(Qc.maxX, td.maxX), Math.max(Qc.maxY, td.maxY))
};
MBR.prototype.scale = function (e) {
    var pScale = e - 1;
    var spanX = this.getSpanX() / 2;
    var spanY = this.getSpanY() / 2;
    this.minX = this.minX - pScale * spanX;
    this.maxX = this.maxX + pScale * spanX;
    this.minY = this.minY - pScale * spanY;
    this.maxY = this.maxY + pScale * spanY;
};
MBR.prototype.centerPoint = function () {
    var dCenterLon = (parseFloat(this.minX) + parseFloat(this.maxX)) / 2;
    var dCenterLat = (parseFloat(this.minY) + parseFloat(this.maxY)) / 2;
    var pPoint = new Point(dCenterLon, dCenterLat);
    return pPoint;
};
MBR.prototype.getCenterPoint = function () {
    return this.centerPoint();
};
MBR.prototype.getSpanX = function () {
    return this.maxX - this.minX;
};
MBR.prototype.getSpanY = function () {
    return this.maxY - this.minY;
};
MBR.prototype.approxEquals = function (pMBR) {
    if (!pMBR) return false;
    return bRetComp(this.minX, pMBR.minX) && bRetComp(this.minY, pMBR.minY) && bRetComp(this.maxX, pMBR.maxX) && bRetComp(this.maxY, pMBR.maxY);
};
MBR.prototype.equals = function (pMBR) {
    if (!pMBR) return false;
    return (this.minX == pMBR.minX) && (this.minY == pMBR.minY) && (this.maxX == pMBR.maxX) && (this.maxY == pMBR.maxY);
};
function OverView(strURL, dMinx, dMiny, dMaxx, dMaxY) {
    this.url = strURL;
    this.MBR = new MBR(dMinx, dMiny, dMaxx, dMaxY);
    this.imgWidth = 200;
    this.imgHeight = 240;
    this.width = 200;
    this.height = 150;
    this.closeImgURL = _CloseImg;
    this.minLevel = 8;
    this.maxLevel = 10;
};
function nc(vg) {
    this.ticks = vg;
    this.tick = 0
};
nc.prototype.reset = function () {
    this.tick = 0
};
nc.prototype.next = function () {
    this.tick++;
    var lb = Math.PI * (this.tick / this.ticks - 0.5);
    return (Math.sin(lb) + 1) / 2
};
nc.prototype.more = function () {
    return this.tick < this.ticks
};
function TrackMonitor(pArray) {
    this.routeArray = pArray;
    this.length = pArray.length;
    this.index = 0;
    this.interval = 1;
};
TrackMonitor.prototype.reset = function () {
    this.index = 0
};
TrackMonitor.prototype.next = function () {
    if (this.interval != 1) {
        if ((this.index + this.interval) < this.length) {
            this.index += this.interval;
        } else {
            this.index = this.length;
        }
    } else {
        this.index++;
    }
    return this.routeArray[this.index - 1];
};
TrackMonitor.prototype.prev = function () {
    this.index--;
    return this.routeArray[this.index - 1];
};
function vh(ja, ma) {
    if (!ma) ma = new Array();
    while (ja >= 32) {
        ma.push(String.fromCharCode((32 | ja & 31) + 63));
        ja >>= 5
    }
    ma.push(String.fromCharCode(ja + 63));
    return ma
};
function bc(ja, ma) {
    return vh(ja < 0 ? ~(ja << 1) : ja << 1, ma)
};
function MainFrame(La, ea, k, m, Dg, He, gh, Xi) {
    if (!La) return;
    this.ownerDocument = La.ownerDocument || document;
    this.bIsPaning = false;
    this.bIsMoving = false;
    this.bIsZooming = false;
    this.bIsDraging = false;
    this.bIsPlayRoute = false;
    this.bIsLog = false;
    this.container = La;
    this.disablePopups = Dg;
    this.disableDragging = He;
    ea = new MapUnit();
    this.mapTypes = gh;
    this.mouseLng = 0;
    this.mouseLat = 0;
    this.iBorderWidth = 0;
    this.iBorderHeight = 0;
    this.vectorMapService = _VectorMapService;
    this.satelliteMapService = _SatelliteMapService;
    this.vectorSateMapService = _VectorSateMapService;
    if (!this.mapTypes) {
        this.mapTypes = [ea]
    }
    if (this.container != null) {
        this.container.style.backgroundColor = "white";
        this.container.unselectable = "on";
    }
    this.zoomLevel = _InitLevel;
    this.mouseZoomLevel = this.zoomLevel;
    this.currentPanOffset = new Rect(0, 0);
    this.tilePaddingOffset = new Rect(0, 0);
    this.tableSize = new Rect(0, 0);
    this.overlays = new Array();
    this.locations = new Array();
    this.curOverlay = null;
    this.monitorArray = new Array();
    this.mainMonitor = null;
    this.panDistance = new Rect(0, 0);
    this.panKeys = new Ic();
    this.stateMonitor = null;
    this.setSpecification(ea);
    this.container.style.overflow = "hidden";
    if (this.container.style.position != "absolute") this.container.style.position = "relative";
    if (!k || !m) {
        k = this.container.offsetWidth;
        m = this.container.offsetHeight;
    }
    this.viewSize = new Rect(k, m);
    BindingEvent(window, "blur", this.eventHandler("onWindowBlur"));
    BindingEvent(this.container, "contextmenu", _NoAction);
    BindingEvent(document.body, "select", _NoAction);
    this.div = this.createMapDiv();
    this.container.appendChild(this.div);
    if (!this.disablePopups) {
        this.infoWindow = new InfoWind(this.eventHandler("onInfoCloseClick"), this.div, 5000, 2000);
    }
    this.directionsDiv = document.createElement("div");
    this.directionsDiv.directionsBounds = new MBR(-_MaxNumber, -_MaxNumber, _MaxNumber, _MaxNumber);
    this.div.appendChild(this.directionsDiv);
    this.dragObject = new DragEvent(this.div, 0, 0);
    this.dragObject.ondrag = this.eventHandler("onDrag");
    this.dragObject.ondragstart = this.eventHandler("onDragStart");
    this.dragObject.ondragend = this.eventHandler("onDragEnd");
    this.dragObject.onclick = this.eventHandler("onClick");
    if (He) {
        this.dragObject.disable()
    }
    this.init(_MapCenterPoint.y, _MapCenterPoint.x, _InitLevel);
    this.initializeMap();
    this.onzoom = null;
    this.onpan = null;
    this.onmousedown = null;
    this.onspecificationchange = null;
    this.oninfowindowclose = null;
    this.onresize = null;
    this.stateListeners = null;
    this.useRawVml = false;
    this.buttonTip = null;
    this.createMapCenter(this.container);
    this.createDrawPoint(this.container);
    this.curMapServerHander = this.eventHandler("setVectorMap");
    this.gotoCenter();
};
MainFrame.prototype.enableDblClick = function () {
    BindingEvent(this.div, "dblclick", this.eventHandler("onDoubleClick"));
};
MainFrame.prototype.enableMouseScroll = function () {
    BindingEvent(this.div, "mousewheel", this.eventHandler("onMouseScroll"));
    BindingEvent(this.div, "DOMMouseScroll", this.eventHandler("onMouseScroll"))
};
MainFrame.prototype.gotoCenter = function () {
    var pPoint = _MapCenterPoint;
    this.centerAndZoom(pPoint, this.zoomLevel);
};
MainFrame.prototype.fullExtent = function () {
    this.centerAtMBR(_FullExtentMBR[0], _FullExtentMBR[1], _FullExtentMBR[2], _FullExtentMBR[3]);
};
MainFrame.prototype.init = function (lat, lon, iLevel) {
    var j = new Point(0, 0);
    var x = lon - AnchorPoint.x;
    var y = lat - AnchorPoint.y;
    j.x = Math.floor(x * _PixelsPerDegree[iLevel].x);
    j.y = Math.floor(y * _PixelsPerDegree[iLevel].y);
    this.centerBitmap = new Point(j.x, j.y);
    this.centerBitmap.x = j.x;
    this.centerBitmap.y = j.y;
    var e = new Point(0, 0);
    var x = lon - AnchorPoint.x;
    var y = lat - AnchorPoint.y;
    e.x = Math.floor(x * _PixelsPerDegree[iLevel].x);
    e.y = Math.floor(y * _PixelsPerDegree[iLevel].y);
    var left = e.x - Math.floor(this.container.offsetWidth / 2);
    var top = e.y + Math.floor(this.container.offsetHeight / 2);
    var hc = Math.ceil(left / _MapUnitPixels);
    var yc = Math.ceil(top / _MapUnitPixels);
    var iOffsetx = hc * _MapUnitPixels - left;
    var iOffsety = yc * _MapUnitPixels - top;
    this.topLeftTile = new Point(hc, yc);
};
MainFrame.prototype.createMapCenter = function (pParent) {
    if (typeof _bIsMapCenter == "undefined" || _bIsMapCenter == false) return;
    this.mapCenter = document.createElement("img");
    pParent.appendChild(this.mapCenter);
    this.mapCenter.style.position = "absolute";
    this.mapCenter.src = _MapCenterUrl;
    this.mapCenter.style.left = convert2Px(this.viewSize.width / 2 - 8);
    this.mapCenter.style.top = convert2Px(this.viewSize.height / 2 - 8);
    this.mapCenter.style.zIndex = 850;
};
MainFrame.prototype.displayCoord = function (e) {
    try {
        if (document.layers) {
            xCoord = e.x;
            yCoord = e.y;
        } else if (document.all) {
            xCoord = event.clientX;
            yCoord = event.clientY;
        } else if (document.getElementById) {
            xCoord = e.clientX;
            yCoord = e.clientY;
        }
        if (this.containOffset) {
            xCoord = xCoord - this.containOffset.x;
            yCoord = yCoord - this.containOffset.y;
        }
        xCoord = xCoord + window.document.body.scrollLeft;
        yCoord = yCoord + window.document.body.scrollTop;
        xCoord -= this.iBorderWidth;
        yCoord -= this.iBorderHeight;
        if (this.buttonTip != null) {
            this.buttonTip.style.top = yCoord + 10 + "px";
            this.buttonTip.style.left = xCoord + 10 + "px";
        }
        var pCenterLatLng = this.getCenterLatLng();
        if (isNaN(this.zoomLevel)) {
            return;
        }
            this.mouseLng = pCenterLatLng.x + (xCoord - this.viewSize.width / 2) / _PixelsPerDegree[this.zoomLevel].x;
        this.mouseLat = pCenterLatLng.y - (yCoord - this.viewSize.height / 2) / _PixelsPerDegree[this.zoomLevel].y;
        this.mouseLng = Math.floor(this.mouseLng * 100000) / 100000;
        this.mouseLat = Math.floor(this.mouseLat * 100000) / 100000;
        if (_VMLInMap) {
            this.mouseX = Math.floor(this.mouseLng * 100000);
            this.mouseY = Math.floor(this.mouseLat * 100000);
        } else {
            this.mouseX = xCoord;
            this.mouseY = yCoord;
        }
        window.status = "坐标:" + this.mouseLng + "," + this.mouseLat;
    } catch (e) {
        alert("错误信息:" + e.message);
    }
};
MainFrame.prototype.centerAtMouse = function () {
    this.centerAtLatLng(new Point(this.mouseLng, this.mouseLat));
};
MainFrame.prototype.initDebug = function () {
    if (!_Debug) return;
    this.centerNaiv = document.createElement("img");
    this.container.appendChild(this.centerNaiv);
    this.centerNaiv.style.position = "absolute";
    this.centerNaiv.src = _MapDebugCenterUrl;
    this.centerNaiv.alt = "Center";
    this.mapBejingCenter = document.createElement("img");
    this.container.appendChild(this.mapBejingCenter);
    this.mapBejingCenter.style.position = "absolute";
    this.mapBejingCenter.src = _MapBeingCenterUrl;
    this.mapBejingCenter.style.width = 16;
    this.mapBejingCenter.style.height = 16;
};
MainFrame.prototype.createMapDiv = function () {
    var h = document.createElement("div");
    h.style.position = "absolute";
    h.style.top = convert2Px(0);
    h.style.left = convert2Px(0);
    h.style.zIndex = 0;
    h.style.backgroundColor = this.spec.backgroundColor;
    h.style.zoom = 1;
    return h;
};
MainFrame.prototype.loadTileImages = function () {
    if (bIsUsingDiv && this.spec.hasOverlay()) {
        this.loadTileImagesLayer(this.overlayImages, true);
    }
    this.loadTileImagesLayer(this.tileImages, false);
};
MainFrame.prototype.loadTileImagesLayer = function (pLayer, bOverLay) {
    while (pLayer.length > this.tableSize.width) {
        var hf = pLayer.pop();
        for (var a = 0; a < hf.length; a++) {
            this.removeTileImage(hf[a]);
        }
    }
    for (var a = pLayer.length; a < this.tableSize.width; a++) {
        pLayer.push(new Array());
    }
    for (var a = 0; a < pLayer.length; a++) {
        while (pLayer[a].length > this.tableSize.height) {
            var f = pLayer[a].pop();
            this.removeTileImage(f);
        }
        for (var P = pLayer[a].length; P < this.tableSize.height; P++) {
            var f = null;
            if (bIsUsingDiv && bOverLay) {
                f = divCreator.create(null, this.spec.tileSize, this.spec.tileSize, null, null, 1, null, this.ownerDocument);
            } else {
                f = Shaderer.create(null, this.spec.tileSize, this.spec.tileSize, null, null, 0, null, this.ownerDocument);
            }
            f.style.position = "absolute";
            if (!bOverLay && this.spec.hasOverlay() && bIsUsingDiv) {
                f.overlayImage = this.overlayImages[a][P];
            }
            if (bOverLay) {
                f.onerror = function () {
                    this.style.display = "none"
                }
            } else {
                f.onerror = function () {
                    this.style.display = "none";
                    if (this.overlayImage) {
                        this.overlayImage.style.display = "none"
                    }
                }
            }
            pLayer[a].push(f);
            this.div.appendChild(f);
            this.configureImage(f, a, P, bOverLay);
        }
    }
};
MainFrame.prototype.deleteTiles = function () {
    this.removeTilesFromDiv(this.tileImages);
    this.tileImages = null;
    if (this.overlayImages) {
        this.removeTilesFromDiv(this.overlayImages);
        this.overlayImages = null
    }
};
MainFrame.prototype.removeTilesFromDiv = function (a) {
    if (a) {
        for (var b = 0; b < a.length; b++) {
            if (a[b]) {
                for (var c = 0; c < a[b].length; c++) {
                    this.removeTileImage(a[b][c])
                }
            }
        }
    }
};
MainFrame.prototype.removeTileImage = function (a) {
    divCreator.remove(a, this.ownerDocument);
    if (a.errorTile) {
        p.remove(a.errorTile, this.ownerDocument);
        a.errorTile = null
    }
    a.onerror = null
};
MainFrame.prototype.initializeMap = function () {
    this.deleteTiles();
    this.tileImages = new Array();
    this.overlayImages = new Array();
    this.calculateTileMeasurements();
    this.loadTileImages();
};
MainFrame.prototype.getSpanLatLng = function (e) {
    if (!e) e = new Rect(0, 0);
    var Ea = this.spec.getLatLng(this.centerBitmap.x - this.viewSize.width / 2, this.centerBitmap.y - this.viewSize.height / 2, this.zoomLevel);
    var Aa = this.spec.getLatLng(this.centerBitmap.x + this.viewSize.width / 2, this.centerBitmap.y + this.viewSize.height / 2, this.zoomLevel);
    e.width = Math.abs(Aa.x - Ea.x);
    e.height = Math.abs(Aa.y - Ea.y);
    return e
};
MainFrame.prototype.getBoundsBitmap = function (e) {
    if (!e) e = new MBR(0, 0, 0, 0);
    e.minX = this.centerBitmap.x - this.viewSize.width / 2;
    e.minY = this.centerBitmap.y - this.viewSize.height / 2;
    e.maxX = this.centerBitmap.x + this.viewSize.width / 2;
    e.maxY = this.centerBitmap.y + this.viewSize.height / 2;
    return e
};
MainFrame.prototype.getBoundsLatLng = function (e) {
    e = this.getBoundsBitmap(e);
    var Ea = this.spec.getLatLng(e.minX, e.minY, this.zoomLevel);
    var Aa = this.spec.getLatLng(e.maxX, e.maxY, this.zoomLevel);
    e.minX = Ea.x;
    e.maxX = Aa.x;
    e.minY = Math.min(Aa.y, Ea.y);
    e.maxY = Math.max(Aa.y, Ea.y);
    return e;
};
MainFrame.prototype.getPixelSpan = function () {
    var pMBR = this.getBoundsLatLng();
    var dSpan = pMBR.getSpanX() / this.viewSize.width;
    return dSpan;
};
MainFrame.prototype.calculateTileMeasurements = function () {
    var iTableWidth = Math.ceil(this.viewSize.width / this.spec.tileSize) + 2;
    var iTableHeight = Math.ceil(this.viewSize.height / this.spec.tileSize) + 2;
    this.tableSize.width = iTableWidth;
    this.tableSize.height = iTableHeight;
    var iPaddingOffsetWidth = Math.floor((this.tableSize.width * this.spec.tileSize - this.viewSize.width) / 2);
    var iPaddingOffsetHeight = Math.floor((this.tableSize.height * this.spec.tileSize - this.viewSize.height) / 2);
    this.tilePaddingOffset.width = iPaddingOffsetWidth;
    this.tilePaddingOffset.height = iPaddingOffsetHeight;
};
function loadImgNoImage(pSrc) {
    pSrc.src = "images/NoImage.png";
};
MainFrame.prototype.isLoaded = function () {
    return this.topLeftTile != null
};
MainFrame.prototype.configureImage = function (f, x, y, bOverylay) {
    if (typeof y == "undefined" || y == null) {
        return;
    }
    var Yg = (this.currentPanOffset.width + x) * this.spec.tileSize;
    var Li = (this.currentPanOffset.height + y) * this.spec.tileSize;
    var left = -this.tilePaddingOffset.width + Yg;
    var top = -this.tilePaddingOffset.height + Li;
    if (f.tileLeft != left || f.tileTop != top) {
        f.style.left = convert2Px(left);
        f.style.top = convert2Px(top);
        f.tileLeft = left;
        f.tileTop = top
    }
    if (!this.isLoaded()) {
        if (!bOverylay) {
            f.src = this.spec.emptyTileURL;
        }
    } else {
        var strURL = "";
        if (bOverylay) {
            strURL = this.spec.getOverlayURL(this.topLeftTile.x + x, this.topLeftTile.y - y, this.zoomLevel);
        } else {
            strURL = this.spec.getTileURL(this.topLeftTile.x + x, this.topLeftTile.y - y, this.zoomLevel);
        }
        if (f.src != strURL) {
            if (bOverylay) {
                divCreator.clearImage(f, this.spec.emptyTileURL);
                divCreator.setImage(f, strURL);
            } else {
                f.src = this.spec.emptyTileURL;
                f.src = strURL;
                f.style.display = "";
                if (f.overlayImage) {
                    f.overlayImage.style.display = ""
                }
            }
        }
    }
    if (typeof(f.galleryimg) == "undefined" || f.galleryimg != "no") {
        f.galleryimg = "no";
    }
};
MainFrame.prototype.onDrag = function () {
    this.bIsDraging = true;
    if (!this.topLeftTile) return;
    this.onMove();
    this.rotateTiles();
    this.bIsDraging = false;
};
MainFrame.prototype.bIsMapMoving = function () {
    return this.bIsPaning || this.bIsMoving || this.bIsDraging || this.dragObject.bIsMouseDown;
};
var qg = new Rect(0, 0);
var Ri = new Rect(0, 0);
MainFrame.prototype.rotateTiles = function () {
    var a = this.getCurrentOffset(Ri);
    if (Math.abs(this.dragObject.left) > 10000000 || Math.abs(this.dragObject.top) > 10000000) {
        this.cancelPan();
        this.centerAtBitmap(this.centerBitmap);
        return
    }
    while (a.width < -this.tilePaddingOffset.width / 2) {
        this.rotateRight(this.tileImages, false);
        if (this.spec.hasOverlay() && this.name == _mapName) {
            this.rotateRight(this.overlayImages, true, "overlay")
        }
        this.getCurrentOffset(a)
    }
    while (a.width > this.tilePaddingOffset.width / 2) {
        this.rotateLeft(this.tileImages, false);
        if (this.spec.hasOverlay() && this.name == _mapName) {
            this.rotateLeft(this.overlayImages, true, "overlay")
        }
        this.getCurrentOffset(a)
    }
    while (a.height < -this.tilePaddingOffset.height / 2) {
        this.rotateDown(this.tileImages, false);
        if (this.spec.hasOverlay() && this.name == _mapName) {
            this.rotateDown(this.overlayImages, true, "overlay")
        }
        this.getCurrentOffset(a)
    }
    while (a.height > this.tilePaddingOffset.height / 2) {
        this.rotateUp(this.tileImages, false);
        if (this.spec.hasOverlay() && this.name == _mapName) {
            this.rotateUp(this.overlayImages, true, "overlay")
        }
        this.getCurrentOffset(a)
    }
};
MainFrame.prototype.rotateLeft = function (a, b, tag) {
    try {
        if (!b) {
            this.currentPanOffset.width--;
            this.topLeftTile.x--
        }
        var c = a.pop();
        if (c) {
            a.unshift(c);
            for (var d = 0; d < c.length; d++) {
                this.configureImage(c[d], 0, d, b)
            }
        }
    } catch (e) {
        window.status = this.name + ":" + tag + ":" + e.message;
    }
};
MainFrame.prototype.rotateRight = function (a, b, tag) {
    try {
        if (!b) {
            this.currentPanOffset.width++;
            this.topLeftTile.x++
        }
        var c = a.shift();
        a.push(c);
        var d = a.length - 1;
        for (var e = 0; e < c.length; e++) {
            this.configureImage(c[e], d, e, b)
        }
    } catch (e) {
        window.status = this.name + ":" + tag + ":" + e.message;
    }
};
MainFrame.prototype.rotateUp = function (a, b, tag) {
    try {
        if (!b) {
            this.currentPanOffset.height--;
            this.topLeftTile.y++;
        }
        for (var c = 0; c < a.length; c++) {
            var d = a[c].pop();
            a[c].unshift(d);
            this.configureImage(d, c, 0, b)
        }
    } catch (e) {
        window.status = this.name + ":" + tag + ":" + e.message;
    }
};
MainFrame.prototype.rotateDown = function (a, b, tag) {
    try {
        if (!b) {
            this.currentPanOffset.height++;
            this.topLeftTile.y--;
        }
        var c = a[0].length - 1;
        for (var d = 0; d < a.length; d++) {
            var e = a[d].shift();
            a[d].push(e);
            this.configureImage(e, d, c, b)
        }
    } catch (e) {
        window.status = this.name + ":" + tag + ":" + e.message;
    }
};
MainFrame.prototype.onDragStart = function (b) {
    this.saveStartPoint = this.getCenterLatLng();
    if (this.onmousedown) this.onmousedown(b)
};
MainFrame.prototype.draw = function (b) {
    alert("start..");
};
MainFrame.prototype.drawMouseDown = function (b) {
    var pMosusePoint = new Point(this.mouseLng, this.mouseLat);
    if (event.button == 1) {
        if (this.drawMode == "drawPoint") {
            if (this.outputPanel2) {
                if (this.outputPanel && typeof this.outputPanel.value != "undefined") {
                    this.outputPanel.value = this.mouseLng;
                }
                if (typeof this.outputPanel2.value != "undefined") {
                    this.outputPanel2.value = this.mouseLat;
                }
            } else {
                if (this.outputPanel && typeof this.outputPanel.value != "undefined") {
                    this.outputPanel.value = this.mouseLng + "," + this.mouseLat;
                }
            }
            var pPoint = this.getDivCoord(this.mouseLng, this.mouseLat);
            this.pointImg.lon = this.mouseLng;
            this.pointImg.lat = this.mouseLat;
            this.pointImg.style.left = convert2Px(pPoint.x - 8);
            this.pointImg.style.top = convert2Px(pPoint.y - 8);
            this.changeDragMode("pan");
            if (_callback != null) _callback(this.mouseLng + "," + this.mouseLat);
            return;
        }
        if (this.vmlDraw == null) {
            this.pathPoint = new Array();
            this.drawStart();
            this.bEndDraw = false;
        }
        if (this.vmlDraw && (this.drawMode == "measure" || this.drawMode == "drawPolyline")) {
            this.pathPoint.push(pMosusePoint);
            this.vmlDraw.points.push(pMosusePoint);
            this.vmlDraw.redraw();
            if (this.outputPanel && typeof this.outputPanel.value != "undefined") {
                if (this.pathPoint.length < 2) {
                    this.outputPanel.value = this.pathPoint.toString() + "," + this.pathPoint.toString();
                } else {
                    this.outputPanel.value = this.pathPoint.toString();
                }
            }
        } else if (this.vmlDraw && this.drawMode == "drawPolygon") {
            var pPoint = this.vmlDraw.points.pop();
            this.vmlDraw.points.push(pMosusePoint);
            this.pathPoint.push(pMosusePoint);
            this.vmlDraw.points.push(pPoint);
            this.vmlDraw.redraw();
            if (this.outputPanel && typeof this.outputPanel.value != "undefined") {
                if (this.pathPoint.length == 1) {
                    this.outputPanel.value = this.pathPoint.toString() + "," + this.pathPoint.toString() + "," + this.pathPoint.toString();
                } else {
                    this.outputPanel.value = this.pathPoint.toString() + "," + this.pathPoint[0].toString();
                    ;
                }
            }
        }
    } else if (event.button == 2) {
        this.bEndDraw = true;
        if (this.drawMode == "drawPolyline" || this.drawMode == "drawPolygon") {
            var strPath = "";
            if (this.outputPanel && typeof this.outputPanel.value != "undefined") {
                strPath = this.outputPanel.value;
            }
            this.changeDragMode("pan");
            if (_callback != null) _callback(strPath);
            if (this.vmlDashline != null) {
                this.removeOverlay(this.vmlDashline);
                this.vmlDashline = null;
            }
        }
    }
    ;
};
MainFrame.prototype.drawMouseUp = function (b) {
    alert("up");
};
g_LineColor = "#157CC4";
g_FillColor = "#94DBFF";
MainFrame.prototype.drawStart = function (b) {
    this.startPointLng = this.mouseLng;
    this.startPointLat = this.mouseLat;
    this.bDrawEnd = false;
    this.startPointX = this.mouseX;
    this.startPointY = this.mouseY;
    var iLineWidth = 1;
    var dOpacity = 0.5;
    if (this.vmlDraw && this.vmlDraw != null) {
        this.removeOverlay(this.vmlDraw);
        this.vmlDraw = null;
    }
    var pObject = null;
    var strPoint = "";
    strPoint = this.startPointLng + "," + this.startPointLat;
    if (this.drawMode == "drawRect") {
        pObject = Rectangle;
        strPoint += "," + strPoint;
    } else if (this.drawMode == "drawCircle") {
        pObject = Circle;
        strPoint = strPoint + ",0";
    } else if (this.drawMode == "drawPolyline" || this.drawMode == "measure") {
        iLineWidth = 4;
        if (this.buttonTip != null && this.buttonTip.style.display != "") this.buttonTip.style.display = "";
        pObject = Polyline;
        strPoint += "," + strPoint;
    } else if (this.drawMode == "drawPolygon") {
        iLineWidth = 4;
        if (this.buttonTip != null && this.buttonTip.style.display != "") this.buttonTip.style.display = "";
        pObject = Polygon;
        strPoint += "," + strPoint + "," + strPoint;
    } else if (this.drawMode == "drawPoint") {
    }
    this.vmlDraw = new pObject(strPoint, g_LineColor, iLineWidth, dOpacity, g_FillColor);
    this.addOverlay(this.vmlDraw);
};
MainFrame.prototype.drawMove = function (b) {
    if (this.bDrawEnd) return;
    if (!this.vmlDraw) return;
    if (this.drawMode == "drawRect") {
        this.vmlDraw.points[1].x = this.mouseLng;
        this.vmlDraw.points[1].y = this.mouseLat;
    } else if (this.drawMode == "drawCircle") {
        this.mouseLng + "," + this.mouseLat;
        var dLen = (this.mouseLng - this.startPointLng) * (this.mouseLng - this.startPointLng) + (this.mouseLat - this.startPointLat) * (this.mouseLat - this.startPointLat);
        this.vmlDraw.radius = Math.sqrt(dLen);
    } else if (this.drawMode == "drawPolyline") {
        var strPoint = this.vmlDraw.points[this.vmlDraw.points.length - 1].toString() + "," + this.mouseLng + "," + this.mouseLat;
        if (typeof this.vmlDashline == "undefined" || this.vmlDashline == null) {
            var pLine = new Polyline(strPoint, "#ff0000", 5, 0.7, 0);
            pLine.setColor(g_LineColor);
            pLine.setDashStyle("shortdot");
            this.addOverlay(pLine);
            this.vmlDashline = pLine;
        } else {
            this.vmlDashline.points.clear();
            this.vmlDashline.points.push(this.vmlDraw.points[this.vmlDraw.points.length - 1]);
            this.vmlDashline.points.push(new Point(this.mouseLng, this.mouseLat));
            this.vmlDashline.redraw();
        }
    } else if (this.drawMode == "drawPolygon") {
        var strPoint = this.vmlDraw.points[0].toString() + "," + this.mouseLng + "," + this.mouseLat + "," + this.vmlDraw.points[this.vmlDraw.points.length - 2].toString() + "," + this.vmlDraw.points[0].toString();
        if (typeof this.vmlDashline == "undefined" || this.vmlDashline == null) {
            var pLine = new Polygon(strPoint, "#ff0000", 5, 0.7, 0);
            pLine.setOpacity(0.2);
            pLine.setColor(g_LineColor);
            pLine.setFillColor(g_FillColor);
            pLine.setDashStyle("shortdot");
            this.addOverlay(pLine);
            this.vmlDashline = pLine;
        } else {
            this.vmlDashline.points.clear();
            this.vmlDashline.points.push(this.vmlDraw.points[0]);
            this.vmlDashline.points.push(new Point(this.mouseLng, this.mouseLat));
            this.vmlDashline.points.push(this.vmlDraw.points[this.vmlDraw.points.length - 2]);
            this.vmlDashline.points.push(this.vmlDraw.points[0]);
            this.vmlDashline.redraw();
        }
    }
    this.vmlDraw.redraw();
};
MainFrame.prototype.drawEnd = function (b) {
    if (this.outputPanel) {
        if (this.drawMode == "drawRect") {
            var dMinX = Math.min(this.startPointLng, this.mouseLng);
            var dMaxX = Math.max(this.startPointLng, this.mouseLng);
            var dMinY = Math.min(this.startPointLat, this.mouseLat);
            var dMaxY = Math.max(this.startPointLat, this.mouseLat);
            var strPoints = dMinX + "," + dMinY + "," + dMaxX + "," + dMaxY;
            if (typeof this.outputPanel.value != "undefined") {
                this.outputPanel.value = strPoints;
            }
        } else if (this.drawMode == "drawCircle") {
            var dRadius = Math.sqrt((this.startPointLng - this.mouseLng) * (this.startPointLng - this.mouseLng) + (this.startPointLat - this.mouseLat) * (this.startPointLat - this.mouseLat));
            var strPoints = this.startPointLng + "," + this.startPointLat + "," + dRadius;
            if (typeof this.outputPanel.value != "undefined") {
                this.outputPanel.value = strPoints;
            }
        }
    }
    this.bDrawEnd = true;
    if ((this.drawMode == "drawRect" || this.drawMode == "drawCircle")) {
        if (_callback) _callback(this.outputPanel.value);
        if (this.bIsPan) this.changeDragMode("pan");
    }
};
MainFrame.prototype.onDragEnd = function (b) {
    if (this.bIsOutOfBorder() == true) {
        this.centerAtLatLng(this.saveStartPoint);
    }
    this.onStateChanged("onDragEnd");
};
MainFrame.prototype.onDoubleClick = function (b) {
    if (this.disableDragging) {
        return
    }
    var j = this.getRelativeClickPoint(b, this.container);
    var Oc = Math.floor(this.viewSize.width / 2) - j.x;
    var sc = -(Math.floor(this.viewSize.height / 2) - j.y);
    this.pan(Oc, sc);
};
MainFrame.prototype.onClick = function (b) {
    this.closeInfoWindow();
    document.focus();
};
MainFrame.prototype.getRelativeClickPoint = function (b, Se, e) {
    if (!e) {
        e = new Point()
    }
    if (typeof b.offsetX != "undefined") {
        var ra = b.target || b.srcElement;
        var Sf = Tg(ra, Se);
        e.x = b.offsetX + Sf.x;
        e.y = b.offsetY + Sf.y
    } else if (typeof b.pageX != "undefined") {
        var Ad = ObjectOffset(Se);
        e.x = b.pageX - Ad.x;
        e.y = b.pageY - Ad.y
    } else {
        EzLog.incompatible("dblclick")
    }
    return e
};
MainFrame.sortByPriority = function (a, b) {
    var c = b.priority - a.priority;
    return c
};
MainFrame.prototype.sortImagesFromCenter = function (a) {
    var b = [];
    for (var c = 0; c < a.length; c++) {
        for (var d = 0; d < a[c].length; d++) {
            var e = a[c][d];
            e.coordX = c;
            e.coordY = d;
            var f = Math.min(c, a.length - c - 1);
            var g = Math.min(d, a[c].length - d - 1);
            if (f == 0 || g == 0) {
                e.priority = 0
            } else {
                e.priority = f + g
            }
            b.push(e)
        }
    }
    b.sort(MainFrame.sortByPriority);
    return b
};
MainFrame.prototype.reconfigureImage = function (a, b) {
    if (_IEBrowser.type == 1) {
        this.div.removeChild(a);
        this.configureImage(a, a.coordX, a.coordY, b);
        this.div.appendChild(a)
    } else {
        this.configureImage(a, a.coordX, a.coordY, b)
    }
};
MainFrame.prototype.reconfigureAllImages = function () {
    if (this.tileImages.length == 0) {
        return
    }
    var a = this.sortImagesFromCenter(this.tileImages);
    if (bIsUsingDiv && this.spec.hasOverlay()) {
        var b = this.sortImagesFromCenter(this.overlayImages)
    } else {
        var b = []
    }
    var c = Math.max(a.length, b.length);
    for (var d = 0; d < c; d++) {
        if (d < a.length) {
            this.reconfigureImage(a[d], false)
        }
        if (d < b.length) {
            this.reconfigureImage(b[d], true)
        }
    }
};
MainFrame.prototype.pan = function (Da, Ha) {
    this.bIsPaning = true;
    if (!this.topLeftTile) {
        return
    }
    var ci = Math.sqrt(Da * Da + Ha * Ha);
    var di = Math.max(10, Math.floor(ci / 20));
    this.panSiner = new nc(di);
    this.panSiner.reset();
    this.panDistance.width = Da;
    this.panDistance.height = Ha;
    this.panStart = new Point(this.dragObject.left, this.dragObject.top);
    this.doPan();
    this.bIsPaning = false;
};
MainFrame.prototype.doPan = function () {
    var lb = this.panSiner.next();
    if (this.bIsOutOfBorder()) {
        this.centerAtLatLng(this.saveStartPoint);
        return;
    }
    this.dragObject.moveTo(this.panStart.x + this.panDistance.width * lb, this.panStart.y - this.panDistance.height * lb);
    this.onMove();
    if (this.panSiner.more()) {
        this.panTimeout = this.setTimeout("this.doPan()", 10);
        this.rotateTiles()
    } else {
        this.panTimeout = null;
        this.onStateChanged("doPan");
    }
};
MainFrame.prototype.bIsOutOfBorder = function (inewLevel) {
    var bIsOut = false;
    if (typeof _BorderArray == "undefined" || typeof MapBorder == "undefined") return bIsOut;
    if (typeof this.centerLatLng == "undefined" || this.centerLatLng == null) return bIsOut;
    var x = this.centerLatLng.x;
    var y = this.centerLatLng.y;
    var iLevel = null;
    if (typeof inewLevel != "undefined") {
        iLevel = inewLevel;
    } else {
        iLevel = this.zoomLevel;
    }
    var pBorder = _BorderArray[iLevel];
    if (!pBorder) {
        return bIsOut;
    }
    if (x < pBorder.minx || x > pBorder.maxx || y < pBorder.miny || y > pBorder.maxy) {
        alert("对不起,超出视野范围!");
        bIsOut = true;
    } else {
        this.saveStartPoint = this.getCenterLatLng();
    }
    return bIsOut;
};
MainFrame.prototype.getMinLevelBorder = function (pPoint) {
    return this.zoomLevel;
};
MainFrame.prototype.cancelPan = function () {
    if (this.panTimeout) {
        clearTimeout(this.panTimeout)
    }
};
MainFrame.prototype.recenterOrPanToLatLng = function (j) {
    if (!this.topLeftTile) {
        return;
    }
    this.centerLatLng = new Point(j.x, j.y);
    this.lastLatLng = this.centerLatLng;
    var iNewLevel = this.getMinLevelBorder();
    if (iNewLevel != this.zoomLevel) {
        this.zoomTo(iNewLevel);
    }
    var j = this.spec.getBitmapCoordinate(this.centerLatLng.y, this.centerLatLng.x, this.zoomLevel);
    this.recenterOrPanToBitmap(j);
};
MainFrame.prototype.recenterOrPanToBitmap = function (j) {
    if (!this.topLeftTile) return;
    var Oc = this.centerBitmap.x - j.x;
    var sc = this.centerBitmap.y - j.y;
    if (Oc == 0 && sc == 0) return;
    if (Math.abs(Oc) < this.viewSize.width && Math.abs(sc) < this.viewSize.height) {
        this.pan(Oc, sc);
        return
    }
    this.centerAtBitmap(j);
};
MainFrame.prototype.addStateListener = function (Fh) {
    if (!this.stateListeners) this.stateListeners = new Array();
    this.stateListeners.push(Fh)
};
MainFrame.prototype.centerAndZoom = function (pPoint, iLevel) {
    var Qe = false;
    if (iLevel != this.zoomLevel) {
        var ge = this.zoomLevel;
        this.zoomLevel = iLevel;
        this.mouseZoomLevel = this.zoomLevel;
        Qe = true;
    }
    this.centerAtLatLng(pPoint);
    if (Qe && this.onzoom) {
        this.onzoom(ge, this.zoomLevel);
    }
};
MainFrame.prototype.centerAtMBR = function (dInMinX, dInMinY, dInMaxX, dInMaxY) {
    for (var iIndex = 0; iIndex < arguments.length; iIndex++) {
        if (typeof arguments[iIndex] == "string") arguments[iIndex] = parseFloat(arguments[iIndex]);
    }
    if (!dInMinX || !dInMaxX || !dInMinY || !dInMaxY) return;
    var dMinX = Math.min(dInMinX, dInMaxX);
    var dMaxX = Math.max(dInMinX, dInMaxX);
    var dMinY = Math.min(dInMinY, dInMaxY);
    var dMaxY = Math.max(dInMinY, dInMaxY);
    var iNewZoomLevel;
    var pPoint = new Point();
    if (dMinX == dMaxX && dMinY == dMaxY) {
        pPoint.x = dMaxX;
        pPoint.y = dMaxY;
        this.recenterOrPanToLatLng(pPoint);
        return;
    }
    pPoint.x = (dMaxX + dMinX) / 2;
    pPoint.y = (dMaxY + dMinY) / 2;
    iNewZoomLevel = this.getLevelOfMBR(dInMinX, dInMinY, dInMaxX, dInMaxY);
    if (iNewZoomLevel != this.zoomLevel) {
        this.centerAndZoom(pPoint, iNewZoomLevel);
    } else {
        this.recenterOrPanToLatLng(pPoint);
    }
    delete pPoint;
};
MainFrame.prototype.getLevelOfMBR = function (dInMinX, dInMinY, dInMaxX, dInMaxY) {
    for (var iIndex = 0; iIndex < arguments.length; iIndex++) {
        if (typeof arguments[iIndex] == "string") arguments[iIndex] = parseFloat(arguments[iIndex]);
    }
    if (!dInMinX || !dInMaxX || !dInMinY || !dInMaxY) return;
    var dMinX = Math.min(dInMinX, dInMaxX);
    var dMaxX = Math.max(dInMinX, dInMaxX);
    var dMinY = Math.min(dInMinY, dInMaxY);
    var dMaxY = Math.max(dInMinY, dInMaxY);
    var pPoint = new Point();
    pPoint.x = (dMaxX + dMinX) / 2;
    pPoint.y = (dMaxY + dMinY) / 2;
    var xSpan = (dMaxX - dMinX) / ((_m_MapBottomSpan / 3600.0) * (this.tableSize.width - 2));
    var ySpan = (dMaxY - dMinY) / ((_m_MapBottomSpan / 3600.0) * (this.tableSize.height - 2));
    var pSpan = Math.max(xSpan, ySpan);
    var iNewZoomLevel = Math.ceil(Math.log(pSpan) / Math.log(2));
    if (dMinX == dMaxX || dMaxX == dMaxY) {
        iNewZoomLevel = this.zoomLevel;
    } else if (iNewZoomLevel < 0) {
        iNewZoomLevel = 0;
    }
    if (iNewZoomLevel > this.spec.numZoomLevels - 1) {
        iNewZoomLevel = this.spec.numZoomLevels - 1;
    }
    delete pPoint;
    return iNewZoomLevel;
};
MainFrame.prototype.centerAtLatLng = function (j) {
    this.centerLatLng = new Point(j.x, j.y);
    this.lastLatLng = this.centerLatLng;
    var j = this.spec.getBitmapCoordinate(this.centerLatLng.y, this.centerLatLng.x, this.zoomLevel);
    if (this.midPointDiv) {
        RemoveChildren(this.midPointDiv);
        this.midPointDiv = null;
    }
    this.centerAtBitmap(j);
};
MainFrame.prototype.centerAtBitmap = function (j) {
    this.centerBitmap.x = j.x;
    this.centerBitmap.y = j.y;
    var left = j.x - Math.floor(this.viewSize.width / 2) - this.tilePaddingOffset.width;
    var top = j.y + Math.floor(this.viewSize.height / 2) + this.tilePaddingOffset.height;
    var hc = Math.floor(left / this.spec.tileSize);
    var yc = Math.floor(top / this.spec.tileSize);
    var iOffsetx = hc * this.spec.tileSize - left;
    var iOffsety = yc * this.spec.tileSize - top;
    if (iOffsetx < -this.tilePaddingOffset.width / 2) {
        hc++;
        iOffsetx += this.spec.tileSize
    } else if (iOffsetx > this.tilePaddingOffset.width / 2) {
        hc--;
        iOffsetx -= this.spec.tileSize
    }
    if (iOffsety < -this.tilePaddingOffset.height / 2) {
        yc++;
        iOffsety += this.spec.tileSize
    } else if (iOffsety > this.tilePaddingOffset.height / 2) {
        yc--;
        iOffsety -= this.spec.tileSize
    }
    iOffsety = -iOffsety;
    if (!this.topLeftTile) {
        this.topLeftTile = new Point(hc, yc);
        if (!this.stateMonitor) {
            this.stateMonitor = new MapStatusControl(this)
        }
    } else {
        this.topLeftTile.x = hc;
        this.topLeftTile.y = yc
    }
    if (!this.stateMonitor) {
        this.stateMonitor = new MapStatusControl(this);
    }
    this.currentPanOffset.width = 0;
    this.currentPanOffset.height = 0;
    this.reconfigureAllImages();
    this.repositionOverlays();
    this.dragObject.moveTo(iOffsetx, iOffsety);
    this.onStateChanged("centerAtBitmap");
    this.onLevelChanged();
};
MainFrame.prototype.setCenter = function (pLonLat) {
    if (!pLonLat) {
        pLonLat = this.getCenterLatLng();
    }
    var pMBR = this.getBoundsLatLng();
    var iLeft = (pLonLat.x - pMBR.minX) / pMBR.getSpanX() * this.viewSize.width;
    var iTop = (pLonLat.y - pMBR.minY) / pMBR.getSpanY() * this.viewSize.height;
    this.dragObject.moveTo(iLeft, iTop);
    this.rotateTiles();
};
MainFrame.prototype.getDivCoord = function (x, y) {
    var pMe = this;
    var pBitMap = this.spec.getBitmapCoordinate(y, x, this.zoomLevel);
    var pDivPoint = this.getDivCoordinate(pBitMap.x, pBitMap.y);
    delete pBitMap;
    return pDivPoint;
};
MainFrame.prototype.getDivCoordinate = function (x, y, e) {
    if (!e) e = new Point(0, 0);
    var pDivOffset = this.getCurrentOffset(qg);
    var iLeftDivBit = this.topLeftTile.x * this.spec.tileSize + this.tilePaddingOffset.width - pDivOffset.width;
    var iX = x - iLeftDivBit;
    var iTopDivBit = this.topLeftTile.y * this.spec.tileSize - this.tilePaddingOffset.height + pDivOffset.height;
    var iY = iTopDivBit - y;
    e.x = iX;
    e.y = iY;
    delete pDivOffset;
    return e
};
MainFrame.prototype.getCenterLatLng = function (e) {
    if (!e) e = new Point(0, 0);
    if (this.centerLatLng) {
        e.x = this.centerLatLng.x;
        e.y = this.centerLatLng.y;
        return e
    }
    if (this.lastLatLng) {
        var ga = this.spec.getBitmapCoordinate(this.lastLatLng.y, this.lastLatLng.x, this.zoomLevel);
        if (ga.equals(this.centerBitmap)) {
            e.x = this.lastLatLng.x;
            e.y = this.lastLatLng.y;
            return e
        }
    }
    var j = this.spec.getLatLng(this.centerBitmap.x, this.centerBitmap.y, this.zoomLevel);
    e.x = j.x;
    e.y = j.y;
    return e
};
MainFrame.prototype.onMove = function () {
    this.bIsMoving = true;
    this.centerLatLng = null;
    var pDivOffset = this.getCurrentOffset(qg);
    var x = this.topLeftTile.x * this.spec.tileSize + Math.floor(this.viewSize.width / 2) + this.tilePaddingOffset.width - pDivOffset.width;
    var y = (this.topLeftTile.y) * this.spec.tileSize - Math.floor(this.viewSize.height / 2) - this.tilePaddingOffset.height + pDivOffset.height;
    this.centerBitmap.x = x;
    this.centerBitmap.y = y;
    this.centerLatLng = this.spec.getLatLng(this.centerBitmap.x, this.centerBitmap.y, this.zoomLevel);
    if (this.onpan) {
        this.onpan(x, y);
    }
    this.bIsMoving = false;
};
MainFrame.prototype.debug = function (e) {
    if (true || !_Debug) return;
    getEleByID("LonLatSpan").value = "LonLatSpan:" + this.span;
    getEleByID("AnchorPoint").value = "AnchorPoint:" + AnchorPoint.x + "," + AnchorPoint.y;
    getEleByID("TileLonLat").value = "topLeftTile(x,y):" + this.topLeftTile.x + "," + this.topLeftTile.y;
    getEleByID("tilePaddingOffset").value = "tilePaddingOffset(width,height):" + this.tilePaddingOffset.width + "," + this.tilePaddingOffset.height;
    getEleByID("CurPanOffset").value = "currentPanOffset(width,height):" + this.currentPanOffset.width + "," + this.currentPanOffset.height;
    var pDivOffset = this.getCurrentOffset(qg);
    getEleByID("divOffset").value = "divOffset(width,height):" + pDivOffset.width + "," + pDivOffset.height;
    var pSpan = this.getSpanLatLng();
    getEleByID("LonLatSpan").value = "LonLatSpan(width,height):" + pSpan.width + "," + pSpan.height;
    var pUnitSpan = _PixelsPerDegree[this.zoomLevel];
    getEleByID("UnitSpan").value = "UnitSpan(width,height):" + pUnitSpan.x + "," + pUnitSpan.y;
    var pBitPoint = this.centerBitmap;
    if (pBitPoint) getEleByID("centerBitmap").value = "centerBitmap:(" + pBitPoint.x + "," + pBitPoint.y + ")";
    var j = this.centerLatLng;
    if (j) {
        getEleByID("LonLatCenter").value = "Center at(Lon,Lat):" + j.x + "," + j.y;
        var fileName = "Col:" + Math.ceil(j.x / (3.515625 / 3600 * Math.pow(2, this.zoomLevel))) + ",Row:" + Math.ceil(j.y / (3.515625 / 3600 * Math.pow(2, this.zoomLevel)));
        getEleByID("centerUnit").value = "centerUnit:" + fileName;
        var pBitMap = this.centerBitmap;
        var pDivPoint = this.getDivCoordinate(pBitMap.x, pBitMap.y);
        window.status = pDivPoint.x + "," + pDivPoint.y + ":" + this.div.style.left + "," + this.div.style.top;
        this.centerNaiv.style.left = convert2Px(pDivPoint.x - 8);
        this.centerNaiv.style.top = convert2Px(pDivPoint.y - 8);
        this.centerNaiv.title = "left,top:" + pDivPoint.x + "," + pDivPoint.y + "(" + (pDivPoint.y - this.viewSize.height / 2) + "),Bit:" + pBitMap.x + "," + pBitMap.y;
        pBitMap = this.spec.getBitmapCoordinate(40.249454099999994, 116.4612375, this.zoomLevel);
        pDivPoint = this.getDivCoordinate(pBitMap.x, pBitMap.y);
        this.mapBejingCenter.style.left = convert2Px(pDivPoint.x - 8);
        this.mapBejingCenter.style.top = convert2Px(pDivPoint.y - 8);
    }
};
_curentPoint = null;
_curentLevel = null;
_bIsLocked = false;
MainFrame.prototype.clearStateChanged = function (caller) {
    this.stateListeners.clear();
};
MainFrame.prototype.onStateChanged = function (caller) {
    if (!this.topLeftTile) {
        return
    }
    if (!_bIsLocked) {
        _curentPoint = this.getCenterLatLng();
        _curentLevel = this.zoomLevel;
    }
    if (this.stateListeners) {
        for (var a = 0; a < this.stateListeners.length; a++) {
            try {
                this.stateListeners[a](this)
            } catch (b) {
            }
        }
    }
    this.debug("onStateChanged");
    var pBorder = this.getBoundsLatLng();
    var strBorder = "BOX:[" + pBorder.toString() + "]";
    if (typeof g_user == "undefined") g_user = "unkown user";
    if (typeof g_IP == "undefined") g_IP = document.location.hostname;
    if (this.bIsLog) EzLog.write(strBorder, g_user, g_IP);
};
MainFrame.prototype.refreshInfoWindow = function () {
    if (this.infoWindow.isVisible()) {
        this.bIsInScreen = false;
        this.showInfoWindow(this.pWinInfo);
    }
};
MainFrame.prototype.hideInfoWind = function () {
    if (this.infoWindow.isVisible()) {
        this.infoWindow.hide();
    }
};
MainFrame.prototype.showInfoWind = function () {
    if (!this.infoWindow.isVisible()) {
        this.infoWindow.show();
    }
};
MainFrame.prototype.resizePointImg = function () {
    if (typeof this.pointImg == "undefined" || this.pointImg == null || true) return;
    var pPoint = this.getDivCoord(this.pointImg.lon, this.pointImg.lat);
    this.pointImg.style.left = convert2Px(pPoint.x - 8);
    this.pointImg.style.top = convert2Px(pPoint.y - 8);
};
MainFrame.prototype.createDrawPoint = function (pParent) {
    if (!pParent) return;
    this.pointImg = document.createElement("img");
    this.pointImg.src = _pointImgURL;
    this.pointImg.style.height = convert2Px(16);
    this.pointImg.style.width = convert2Px(16);
    ;
    this.pointImg.style.display = "none";
    this.pointImg.style.position = "absolute";
    this.pointImg.style.zIndex = 1001;
    pParent.appendChild(this.pointImg);
};
MainFrame.prototype.showPointImg = function (bIsShow) {
    if (typeof bIsShow == "undefined" || bIsShow == true) {
        this.pointImg.style.display = "";
    } else {
        this.pointImg.style.display = "none";
    }
};
MainFrame.prototype.getPxOfDist = function (len) {
    var pBorder = this.getBoundsLatLng();
    var pPoint1 = new Point(pBorder.minX, pBorder.minY);
    var pPoint2 = new Point(pBorder.maxX, pBorder.minY);
    var dHLen = GetDistanceInLL(pPoint1, pPoint2);
    var iPx = len / dHLen * this.viewSize.width;
    return iPx;
};
MainFrame.prototype.refreshMapScale = function () {
    if (!this.scaleTxt) return;
    var pBorder = this.getBoundsLatLng();
    var pPoint1 = new Point(pBorder.minX, pBorder.minY);
    var pPoint2 = new Point(pBorder.maxX, pBorder.minY);
    var dHLen = GetDistanceInLL(pPoint1, pPoint2);
    var iLevel = this.zoomLevel;
    var iWidth = Math.ceil((this.viewSize.width * _m_scale_meter[iLevel]) / dHLen);
    var iTime = 0;
    while (iWidth < 40 || iWidth > 100) {
        if (iWidth < 40) {
            iLevel++;
        } else {
            iLevel--;
        }
        iWidth = Math.ceil((this.viewSize.width * _m_scale_meter[iLevel]) / dHLen);
        if (iTime > 3) break;
        iTime++;
    }
    var strUnit = _m_scale_meter[iLevel];
    var dScale = strUnit * 100;
    this.scaleTxt.style.width = iWidth + "px";
    if (strUnit >= 1000) {
        strUnit = Math.floor(strUnit / 100);
        strUnit = strUnit / 10;
        strUnit = strUnit + "公里";
    } else {
        strUnit = strUnit + "米";
    }
    this.scaleRightTxt.innerHTML = strUnit;
};
MainFrame.prototype.onLevelChanged = function () {
    this.refreshMapScale();
    this.resizePointImg();
    this.refreshInfoWindow();
};
MainFrame.prototype.onLevelChanged_old = function () {
    this.clearVMLContainer();
    var dScale = _m_MapBottomScale * Math.pow(2, this.zoomLevel);
    this.scaleTxt.innerHTML = "1:" + dScale;
    var strUnit = 2 * dScale / 100;
    if (strUnit > 10000) {
        strUnit = Math.floor(strUnit / 100);
        strUnit = strUnit / 10;
        strUnit = strUnit + "km";
    } else {
        strUnit = strUnit + "m";
    }
    this.scaleRightTxt.innerHTML = strUnit;
    this.resizePointImg();
    this.refreshInfoWindow();
};
MainFrame.prototype.onResize = function (b) {
    if (this.viewSize.width != this.container.offsetWidth || this.viewSize.height != this.container.offsetHeight) {
        this.viewSize.width = this.container.offsetWidth;
        this.viewSize.height = this.container.offsetHeight;
        this.calculateTileMeasurements();
        this.loadTileImages();
        this.centerAtBitmap(this.centerBitmap);
        if (this.onresize) {
            this.onresize()
        }
        if (this.mapCenter) {
            this.mapCenter.style.left = convert2Px(this.viewSize.width / 2 - 8);
            this.mapCenter.style.top = convert2Px(this.viewSize.height / 2 - 8);
        }
        var iLeft = this.viewSize.width - 23;
        var iHeight = this.viewSize.height;
        var iTmpBorder1 = parseInt(this.container.style.borderLeftWidth);
        var iTmpBorder2 = parseInt(this.container.style.borderTopWidth);
        if (!isNaN(iTmpBorder1)) {
            this.iBorderWidth = iTmpBorder1;
        }
        if (!isNaN(iTmpBorder2)) {
            this.iBorderHeight = iTmpBorder2;
        }
    }
    this.debug("onResize");
};
MainFrame.prototype.getCurrentOffset = function (e) {
    if (!e) e = new Rect(0, 0);
    e.width = this.dragObject.left + this.currentPanOffset.width * this.spec.tileSize;
    e.height = this.dragObject.top + this.currentPanOffset.height * this.spec.tileSize;
    return e
};
MainFrame.prototype.switchSpecification = function (Na) {
    if (this.spec == Na) return;
    var Nd = this.spec;
    var G = this.getCenterLatLng();
    this.setSpecification(Na);
    this.div.style.backgroundColor = this.spec.backgroundColor;
    if (Nd.tileSize != Na.tileSize) {
        this.topLeftTile = null;
        this.initializeMap()
    }
    this.centerAtLatLng(G);
    if (this.onspecificationchange) this.onspecificationchange(Nd, Na)
};
MainFrame.prototype.setSpecification = function (Na) {
    this.spec = Na;
    if (!Na.emptyTilePreload) {
        var Rb = document.createElement("IMG");
        Rb.style.position = "absolute";
        Rb.style.visibility = "hidden";
        Rb.style.top = convert2Px(-200);
        Rb.style.left = convert2Px(-200);
        document.body.appendChild(Rb);
        Na.emptyTilePreload = Rb
    }
    this.spec.emptyTilePreload.src = this.spec.emptyTileURL
};
MainFrame.prototype.zoomTo = function (iLevel) {
    this.div.style.zoom = 1;
    if (typeof iLevel == "string") iLevel = parseInt(iLevel);
    if (this.zoomLevel == iLevel) return;
    if (this.bIsOutOfBorder(iLevel)) {
        this.onzoom();
        return;
    }
    if (!this.topLeftTile) {
        return;
    }
    if (iLevel >= this.spec.numZoomLevels) {
        iLevel = this.spec.numZoomLevels - 1;
    } else if (iLevel < 0) {
        iLevel = 0;
    }
    var ge = this.zoomLevel;
    if (iLevel != ge) {
        var pPoint = this.getCenterLatLng();
        this.bIsZooming = true;
        this.centerAndZoom(pPoint, iLevel);
        this.bIsZooming = false;
    }
    this.debug("zoomTo");
    this.refreshVMLGraphics();
};
MainFrame.prototype.toggleTileBorders = function () {
    if (this.tileImages) {
        for (var a = 0; a < this.tileImages.length; a++) {
            if (this.tileImages[a]) {
                for (var P = 0; P < this.tileImages[a].length; P++) {
                    var f = this.tileImages[a][P];
                    if (f.hasBorder) {
                        f.style.border = "0";
                        f.hasBorder = false
                    } else {
                        f.style.border = "1px solid black";
                        f.hasBorder = true
                    }
                }
            }
        }
    }
};
function OverlayStatus(iStartSeq, iEndSeq, iStatus) {
    this.startSeq = iStartSeq;
    this.endSeq = iEndSeq;
    this.iStatus = iStatus;
};
OverlayStatus.prototype.toString = function () {
    return "开始周期" + this.startSeq + ",结束周期:" + this.endSeq + "显示状态:" + this.iStatus;
};
OverlayStatus.prototype.bIsConflict = function (pStatus) {
    var bIs = false;
    bIs = (this.startSeq >= pStatus.startSeq && this.endSeq <= pStatus.endSeq) || (this.endSeq >= pStatus.startSeq && this.endSeq <= pStatus.endSeq);
    if (bIs) {
        alert("设置时间有冲突，已经存在该范围的时间设置:(" + this.startSeq + "," + this.endSeq + ")");
    }
    return bIs;
};
MainFrame.prototype.createLocalMarker = function (v) {
    var ia = this.createLocationMarker(v.icon.image, v.icon.iconClass);
    var g = this;
    var pc = v;
    ia.mouseTarget.onmousedown = function (b) {
        return g.onIconMouseDown(pc, b);
    };
    return ia;
};
var Pe = 0;
MainFrame.prototype.createLocationMarker = function (gf, r) {
    var ha = divCreator.create(gf, r.width, r.height, 0, 0, 10, false, "noprint");
    var Xb = divCreator.create(Vi, r.width, r.height, 0, 0, 3000, false, "noprint");
    var mb = divCreator.create(r.shadowURL, r.shadowWidth, r.height, 0, 0, 3, false, "noprint");
    var xg = _IEBrowser.type == 2 ? "ff" : "ie";
    var ig = Shaderer.create(gf.replace(/\.png$/, xg + ".gif"), r.width, r.height, 0, 0, 10, false, "noscreen");
    var Kg = r.shadowURL.replace(/[^\/]*$/, "dithshadow.gif");
    var jh = Shaderer.create(Kg, r.shadowWidth, r.height, 0, 0, 3, false, "noscreen");
    var u = null;
    var kc = Xb;
    if (_IEBrowser.type == 2) {
        var xf = "map" + Pe;
        Pe++;
        u = document.createElement("map");
        u.setAttribute("name", xf);
        var E = document.createElement("area");
        E.setAttribute("shape", "poly");
        E.setAttribute("alt", "");
        E.setAttribute("coords", r.imageMapArray.join(","));
        E.setAttribute("href", "PolylineDrawer");
        kc = E;
        u.appendChild(E);
        Xb.setAttribute("usemap", "#" + xf)
    } else {
        setCursor(kc, "pointer")
    }
    var Wc = new Marker(ha, Xb, mb, u, kc);
    Wc.addLayer(ig);
    if (_IEBrowser.type != 2) {
        Wc.addLayer(jh)
    }
    Wc.appendTo(this.div);
    return Wc
};
MainFrame.prototype.clearOverlays = function (bForcedRemove) {
    if (typeof bForcedRemove == "undefined") bForcedRemove = false;
    var pOverlays = new Array();
    this.lastPageCenter = this.getCenterLatLng();
    this.lastPageZoom = this.zoomLevel;
    for (var a = 0; a < this.overlays.length; a++) {
        var pOver = this.overlays[a];
        if (!bForcedRemove && pOver.bDisRemovable) {
            pOverlays.push(pOver);
        } else {
            pOver.removeFromDiv();
            delete pOver;
        }
    }
    this.closeInfoWindow();
    this.overlays.clear();
    this.overlays = pOverlays;
};
MainFrame.prototype.removeOverlaysOutOfMBR = function (pMBR) {
    var b = [];
    for (var c = 0; c < this.overlays.length; c++) {
        if (!pMBR.containsPoint(this.overlays.point)) {
            a.removeFromDiv();
        } else {
            b.push(this.overlays[c])
        }
    }
    if (this.overlays.length != b.length) {
        this.overlays = b
    }
    if (this.infoWindow.isVisible()) this.closeInfoWindow();
};
MainFrame.prototype.removeOverlaysOfMBR = function (pMBR) {
    var b = [];
    for (var c = 0; c < this.overlays.length; c++) {
        if (pMBR.containsPoint(this.overlays.point)) {
            a.removeFromDiv();
        } else {
            b.push(this.overlays[c])
        }
    }
    if (this.overlays.length != b.length) {
        this.overlays = b
    }
    if (this.infoWindow.isVisible()) this.closeInfoWindow();
};
MainFrame.prototype.removeOverlay = function (a, bForcedRemove) {
    if (!a) return;
    if (typeof bForcedRemove == "undefined") bForcedRemove = false;
    if (!bForcedRemove && a.bDisRemovable) return;
    var b = [];
    for (var c = 0; c < this.overlays.length; c++) {
        if (this.overlays[c] == a) {
            a.removeFromDiv();
        } else {
            b.push(this.overlays[c])
        }
    }
    if (this.overlays.length != b.length) {
        this.overlays = b
    }
};
MainFrame.prototype.addOverlay = function (ta, bDisRemovable) {
    if (!ta) return;
    if (bDisRemovable) {
        ta.bDisRemovable = bDisRemovable;
    } else {
        ta.bDisRemovable = false;
    }
    this.overlays.push(ta);
    if (ta instanceof iOverLay) {
        ta.createDiv(this);
    } else if (typeof Monitor != "undefined" && ta instanceof Monitor) {
        ta.createDiv(this);
    }
};
MainFrame.prototype.addOverlayOutOfMBR = function (pOverLay, pMBR) {
    if (!pMBR.containsPoint(pOverLay.point)) this.addOverlay(pOverLay);
};
MainFrame.orderLocations = function (mf, Ke) {
    if (mf.point.y > Ke.point.y) return -1;
    if (mf.point.y < Ke.point.y) return 1;
    return 0
};
MainFrame.prototype.repositionOverlays = function () {
    for (var a = 0; a < this.overlays.length; a++) {
        var pc = this.overlays[a];
        if (pc instanceof iOverLay) {
            pc.redraw();
        } else if (typeof Monitor != "undefined" && pc instanceof Monitor) {
            pc.redraw();
        }
    }
};
MainFrame.prototype.blowupOverlay = function (pOveryLay) {
    for (var a = 0; a < this.overlays.length; a++) {
        var pc = this.overlays[a];
        if (pc instanceof Title || pc instanceof Marker || pc instanceof Polyline || pc instanceof Polygon || (typeof Monitor != "undefined" && pc instanceof Monitor)) {
            pc.setZIndex(pc.iZIndex);
        }
    }
    pOveryLay.setZIndex(pOveryLay.iZIndex + 1);
};
MainFrame.prototype.setMarkerPosition = function (ia, r, Zf) {
    alert("setMarkerPosition");
    var gc = this.spec.getBitmapCoordinate(Zf.y, Zf.x, this.zoomLevel);
    var Nc = this.getDivCoordinate(gc.x, gc.y);
    var x = Nc.x - r.pointCoord.x;
    var o = Nc.y - r.pointCoord.y;
    ia.redraw(x, o)
};
MainFrame.prototype.asyncLoadVPageFromURL = function (ca, Cd) {
    var dc = xa.create("vpage");
    try {
        var ya = XMLHttp.create();
        ya.open("GET", ca, true);
        var g = this;
        ya.onreadystatechange = function () {
            if (ya.readyState == 4) {
                if (dc.isValid()) {
                    try {
                        alert("XML1:" + ya.responseText);
                        g.loadVPageStr(ya.responseText)
                    } catch (b) {
                        if (Cd) {
                            Cd(b)
                        }
                    }
                }
            }
        };
        ya.send(null)
    } catch (b) {
        if (Cd) {
            Cd(b)
        }
    }
};
MainFrame.prototype.loadVPage = function (L, Of, ph) {
    alert("loadVPage:" + L);
    this.clearOverlays();
    var G = Of ? Of : L.center;
    var Z = ph;
    if (Z == null && L.viewSpan) {
        Z = this.spec.getLowestZoomLevel(L.viewSpan, this.viewSize.width, this.viewSize.height)
    }
    this.lastPageZoom = Z;
    this.lastPageCenter = G;
    if (G) {
        if (!this.topLeftTile || Z != null && Z != this.zoomLevel) {
            if (Z == null) Z = 4;
            this.centerAndZoom(G, Z)
        } else {
            this.recenterOrPanToLatLng(G)
        }
    }
    for (var a = 0; a < L.overlays.length; a++) {
        this.addOverlay(L.overlays[a])
    }
    this.directions = L.directions;
    this.drawDirections(this.directions, this.directionsDiv);
    this.onStateChanged("loadVPage")
};
MainFrame.prototype.registerKeyHandlers = function (H) {
    BindingEvent(H, "keydown", this.eventHandler("onKeyPress"));
    BindingEvent(H, "keyup", this.eventHandler("onKeyUp"))
};
MainFrame.prototype.unregisterKeyHandlers = function (H) {
    unbindingEvent(this.container, "keydown", this.eventHandler("onKeyPress"));
    unbindingEvent(this.container, "keyup", this.eventHandler("onKeyUp"))
};
function getInfo(div) {
    return div.style.left + ":" + div.style.top + ";" + div.offsetLeft + ":" + div.offsetTop + ";" + div.offsetWidth + ":" + div.offsetHeight;
};
MainFrame.prototype.onMouseScroll = function (e) {
    if (!e) {
        e = window.event;
    }
    if (!this.bIsZooming) {
        var z = this.zoomLevel;
        if (e.wheelDelta > 0 || e.detail < 0) {
            z--;
        } else {
            z++;
        }
        if (z <= _MaxLevel && z >= 0) {
            if (this.sliderToLevel) this.sliderToLevel(z);
            this.flatZoom(z);
        }
    }
};
MainFrame.prototype.styleZoom = function (z, flg) {
    var i;
    if (flg) {
        this.div.style.zoom = 1;
        this.div.style.left = convert2Px(this.iOldLeft);
        this.div.style.top = convert2Px(this.iOldTop);
    } else {
        this.div.style.zoom = z;
        var iLeft = this.iOldLeft + (this.iOldLeft - this.viewSize.width / 2) * (z - 1);
        iLeft = Math.ceil(iLeft);
        var iTop = this.iOldTop + (this.iOldTop - this.viewSize.height / 2) * (z - 1);
        iTop = Math.ceil(iTop);
        this.div.style.left = convert2Px(iLeft);
        this.div.style.top = convert2Px(iTop);
    }
};
MainFrame.prototype.flatZoom = function (z) {
    if (z < 0 || z > _MaxLevel) return false;
    if (this.bIsZooming) return false;
    this.bIsZooming = true;
    var step = 5;
    var stepnum = 0;
    var per = _m_MapSpan[z] / _m_MapSpan[this.zoomLevel];
    var perd = (per - 1) / step;
    this.iOldLeft = parseInt(this.div.style.left);
    this.iOldTop = parseInt(this.div.style.top);
    var pMe = this;
    _TmrModeFlatZoom = setInterval(function () {
            stepnum++;
            if (stepnum < (step + 1)) {
                pMe.styleZoom(1 + perd * stepnum);
            } else {
                window.clearInterval(_TmrModeFlatZoom);
                _TmrModeFlatZoom = null;
                pMe.styleZoom(z, true);
                pMe.zoomTo(z);
            }
        },
        10);
    return true;
};
MainFrame.prototype.onKeyPress = function (b) {
    if (this.ignoreKeyEvent(b)) {
        return true
    }
    switch (b.keyCode) {
        case 38:
        case 40:
        case 37:
        case 39:
            this.panKeys.add(b.keyCode);
            this.startContinuousPan();
            return false;
        case 34:
            this.pan(0, -Math.floor(this.viewSize.height * 0.75));
            return false;
        case 33:
            this.pan(0, Math.floor(this.viewSize.height * 0.75));
            return false;
        case 36:
            this.pan(Math.floor(this.viewSize.width * 0.75), 0);
            return false;
        case 35:
            this.pan(-Math.floor(this.viewSize.width * 0.75), 0);
            return false;
        case 187:
        case 107:
            this.zoomTo(this.zoomLevel - 1);
            return false;
        case 189:
        case 109:
            this.zoomTo(this.zoomLevel + 1);
            return false
    }
    switch (b.which) {
        case 61:
        case 43:
            this.zoomTo(this.zoomLevel - 1);
            return false;
        case 45:
        case 95:
            this.zoomTo(this.zoomLevel + 1);
            return false
    }
    return true
};
MainFrame.prototype.onKeyUp = function (b) {
    switch (b.keyCode) {
        case 38:
        case 40:
        case 37:
        case 39:
            this.panKeys.remove(b.keyCode);
            return false
    }
};
MainFrame.prototype.ignoreKeyEvent = function (b) {
    if (b.ctrlKey || (b.altKey || b.metaKey)) {
        return true
    }
    if (b.target && (b.target.nodeName == "INPUT" && b.target.getAttribute("type").toLowerCase() == "text" || b.target.nodeName == "TEXTAREA")) {
        return true
    }
    return false
};
MainFrame.prototype.startContinuousPan = function () {
    if (!this.topLeftTile) {
        return
    }
    this.cancelPan();
    if (!this.continuousPanTimeout) {
        this.panSiner = new nc(100);
        this.continuousPanTimeout = this.setTimeout("this.doContinuousPan()", 5)
    }
};
MainFrame.prototype.doContinuousPan = function () {
    if (this.panKeys.size > 0) {
        var ce = (this.panKeys.contains(37) ? 1 : 0) + (this.panKeys.contains(39) ? -1 : 0);
        var Be = (this.panKeys.contains(38) ? 1 : 0) + (this.panKeys.contains(40) ? -1 : 0);
        var lb = 1;
        if (this.panSiner.more()) {
            lb = this.panSiner.next()
        }
        var C = ce > 0 ? Math.floor : Math.ceil;
        var Da = C(7 * lb * ce + 5 * ce);
        C = Be > 0 ? Math.floor : Math.ceil;
        var Ha = C(7 * lb * Be + 5 * Be);
        this.dragObject.moveTo(this.dragObject.left + Da, this.dragObject.top + Ha);
        this.onMove();
        this.rotateTiles();
        this.continuousPanTimeout = this.setTimeout("this.doContinuousPan()", 10)
    } else {
        this.continuousPanTimeout = null;
        this.onStateChanged("doContinuousPan");
    }
};
MainFrame.prototype.onWindowBlur = function (b) {
    if (this.panKeys.size > 0) {
        this.panKeys = new Ic()
    }
};
MainFrame.prototype.onIconMouseDown = function (v, b) {
    S(b);
    if (this.onmousedown) {
        this.onmousedown()
    }
    this.clearInfoWindowArgs(v.xml);
    this.showInfoWindow(v)
};
MainFrame.prototype.clearInfoWindowArgs = function (R) {
    R.setAttribute("arg0", "");
    R.setAttribute("arg1", "");
    R.setAttribute("arg2", "")
};
MainFrame.prototype.infoWindowNavigate = function (oh, af, ag, jf) {
    if (!this.openLocation || this.disablePopups) return;
    if (af) this.openLocation.xml.setAttribute("arg0", af);
    if (ag) this.openLocation.xml.setAttribute("arg1", ag);
    if (jf) this.openLocation.xml.setAttribute("arg2", jf);
    this.onInfoWindowLoad = oh;
    this.showInfoWindow(this.openLocation)
};
MainFrame.prototype.showInfoWindow = function (v) {
    if (this.disablePopups || v == null) return;
    if (!v.infoStyle) return;
    this.openLocation = v;
    var Ga = this.convert2WPoint(v.point.x, v.point.y);
    this.infoWindow.point = v.point;
    this.infoWindow.iconClass = v.icon.iconClass;
    var g = this;
    var zg = function () {
        g.showSizedInfoWindow(Ga.x, Ga.y, v.icon.iconClass)
    };
    V.asynchronousTransform(v.xml, this.infoWindow.offscreenArea, v.infoStyle, zg, null)
};
MainFrame.prototype.addMarkersToInfoWindowMask = function () {
    if (this.disablePopups || (!this.infoWindow.isVisible() || !this.infoWindow.point)) {
        return
    }
    this.infoWindow.clearMaskMap();
    var Pa = new Point(this.infoWindow.getOffsetLeft(), this.infoWindow.getOffsetTop());
    var wb = new Point(Pa.x + this.infoWindow.getTotalWidth(), Pa.y + this.infoWindow.getTotalHeight());
    for (var a = 0; a < this.locations.length; a++) {
        var ia = this.locations[a].marker;
        if (ia.icon.offsetTop > wb.y) {
            break
        }
        this.addMarkerToInfoWindowMask(Pa, wb, ia)
    }
    if (this.directionsMarkersAreVisible()) {
        this.addMarkerToInfoWindowMask(Pa, wb, this.directionsStart);
        this.addMarkerToInfoWindowMask(Pa, wb, this.directionsEnd)
    }
};
MainFrame.prototype.addMarkerToInfoWindowMask = function (Pa, wb, ia) {
    var ha = ia.icon;
    if (ha.offsetLeft + ha.width >= Pa.x && (ha.offsetLeft <= wb.x && (ha.offsetTop + ha.height >= Pa.y && ha.offsetTop <= wb.y))) {
        var ue = M.get("local").translateImageMapArray(ha.offsetLeft - Pa.x, ha.offsetTop - Pa.y);
        this.infoWindow.addAreaToMaskMap(ue, ia.mouseTarget.onmousedown)
    }
};
MainFrame.prototype.showSizedInfoWindow = function (left, top, pIcon) {
    xa.invalidate("infoWindowOffscreen");
    var dc = xa.create("infoWindowOffscreen");
    this.infoWindow.prepareOffscreen();
    var pMe = this;
    var li = function () {
        if (dc.isValid()) {
            pMe.infoWindow.flipOffscreenAndSize();
            pMe.infoWindow.positionAt(left, top, pIcon);
            if (_IEBrowser.type != 1 && pMe.infoWindow.hasMask()) {
                pMe.addMarkersToInfoWindowMask()
            }
            pMe.infoWindow.show();
            if (typeof pMe.bIsInScreen == "undefined" || pMe.bIsInScreen) {
                pMe.panToInfoWindow();
            }
            if (pMe.onInfoWindowLoad) {
                pMe.onInfoWindowLoad();
                pMe.onInfoWindowLoad = null;
            }
        }
    };
    window.setTimeout(li, 0)
};
MainFrame.prototype.showMapBlowup = function (j, r) {
    if (this.disablePopups) return;
    var ga = this.spec.getBitmapCoordinate(j.y, j.x, this.zoomLevel);
    var Ga = this.getDivCoordinate(ga.x, ga.y);
    this.infoWindow.point = j;
    this.infoWindow.iconClass = r ? r : M.get("noicon");
    var La = document.createElement("div");
    La.style.border = "1px solid #979797";
    La.style.width = convert2Px(200);
    La.style.height = convert2Px(200);
    var Ib = new MainFrame(La, this.spec, 200, 200, true, true, this.mapTypes, true);
    Ib.directions = this.directions;
    Ib.centerAndZoom(j, 1);
    this.infoWindow.clearOffscreenArea();
    this.infoWindow.offscreenArea.appendChild(La);
    var Uf = this.onInfoWindowLoad;
    this.onInfoWindowLoad = function () {
        try {
            Ib.drawDirections(Ib.directions, Ib.directionsDiv, true)
        } catch (b) {
            if (Jg) {
                EzLog.dump(b)
            }
        }
        if (Uf) Uf()
    };
    if (this.mapTypes.length > 1) {
        var ib = document.createElement("div");
        ib.style.marginTop = convert2Px(5);
        ib.style.fontSize = "small";
        Ib.createSpecToggleLinks(ib);
        this.infoWindow.offscreenArea.appendChild(ib)
    }
    this.showSizedInfoWindow(Ga.x, Ga.y, this.infoWindow.iconClass);
    return Ib
};
MainFrame.prototype.createSpecToggleLinks = function (ib) {
    var Fe = new Array();
    for (var a = 0; a < this.mapTypes.length; a++) {
        var ea = this.mapTypes[a];
        var Oa = this.createSpecChangeLink(ea);
        Fe.push(Oa);
        ib.appendChild(Oa);
        if (ea.isNew) {
            var rc = document.createElement("span");
            rc.style.verticalAlign = "super";
            rc.style.color = "red";
            rc.style.fontSize = "x-small";
            rc.appendChild(document.createTextNode(_mNew));
            ib.appendChild(rc)
        }
        if (a < this.mapTypes.length - 1) {
            ib.appendChild(document.createTextNode(" - "))
        }
    }
    var g = this;
    this.onspecificationchange = function (Nd, Na) {
        for (var a = 0; a < g.mapTypes.length; a++) {
            var ea = g.mapTypes[a];
            var Oa = Fe[a];
            if (Na == ea) {
                Oa.className = "selected"
            } else {
                Oa.className = null
            }
        }
        if (_IEBrowser.type == 1) {
            g.setTimeout("this.reconfigureAllImages()", 0)
        }
    };
    this.onspecificationchange(null, this.spec)
};
MainFrame.prototype.createSpecChangeLink = function (ea) {
    var g = this;
    var sh = function () {
        g.switchSpecification(ea)
    };
    return Bh(ea.getLinkText(), sh)
};
MainFrame.prototype.onInfoCloseClick = function (b) {
    this.closeInfoWindow();
};
MainFrame.prototype.closeInfoWindow = function () {
    if (!this.disablePopups) {
        this.infoWindow.hide();
        if (this.oninfowindowclose) {
            this.oninfowindowclose()
        }
    }
    if (typeof clearImgTimeout != "undefined" && clearImgTimeout != null) clearImgTimeout();
    if (EzColorPicker.close) {
        EzColorPicker.close();
    }
};
MainFrame.prototype.panToInfoWindow = function () {
    if (this.pWinInfo.bIsVisable == false) return;
    if (this.disablePopups) {
        return
    }
    var iNewLevel = this.getMinLevelBorder(this.infoWindow.point);
    if (iNewLevel != this.zoomLevel) {
        this.zoomTo(iNewLevel);
    }
    var ga = this.spec.getBitmapCoordinate(this.infoWindow.point.y, this.infoWindow.point.x, this.zoomLevel);
    var Ga = this.getDivCoordinate(ga.x, ga.y);
    var va = new Point(this.centerBitmap.x, this.centerBitmap.y);
    var dMinX = ga.x - (this.viewSize.width / 2 - this.infoWindow.getTotalWidth());
    var dMaxX = ga.x + (this.viewSize.width / 2 - this.infoWindow.getTotalWidth());
    var dMinY = ga.y - (this.viewSize.height / 2 - this.infoWindow.getTotalHeight()) + 10;
    var dMaxY = ga.y + this.viewSize.height / 2 - 50;
    if (va.x > dMaxX || va.x < dMinX) {
        va.x = Math.min(va.x, dMaxX);
        va.x = Math.max(va.x, dMinX);
    }
    if (va.y > dMaxY || va.y < dMinY) {
        va.y = Math.min(va.y, dMaxY);
        va.y = Math.max(va.y, dMinY);
    }
    this.centerLatLng = null;
    var pCenterBitmap = this.centerBitmap;
    if (pCenterBitmap.x != va.x || pCenterBitmap.y != va.y) {
        this.recenterOrPanToBitmap(va);
    }
    this.bIsInScreen = false;
};
MainFrame.prototype.repositionInfoWindow = function () {
    if (this.disablePopups || (!this.infoWindow.isVisible() || !this.infoWindow.point)) return;
    var j = this.infoWindow.point;
    var ga = this.spec.getBitmapCoordinate(j.y, j.x, this.zoomLevel);
    var Ga = this.getDivCoordinate(ga.x, ga.y);
    this.infoWindow.positionAt(Ga.x, Ga.y, this.infoWindow.iconClass)
};
var gi = new Point(0, 0);
var we = new Point(0, 0);
MainFrame.prototype.getVMLPathString = function (D) {
    Timer.start("Map", "getVMLPathString");
    var w = new Array();
    w.push("m");
    w.push(D.polyline.points[0]);
    w.push(D.polyline.points[1]);
    w.push("l");
    w = w.concat(D.polyline.points);
    for (var a = 0; a < D.segments.length; a++) {
        var fa = D.segments[a].pointIndex << 1;
        var Bd = fa + 4;
        var Ye = w[Bd];
        var Wf = w[Bd + 1];
        w[Bd] = Ye + " " + Wf + " e m";
        w[Bd + 1] = Ye + " " + Wf + " l"
    }
    w.push("e");
    var str = w.join(" ");
    Timer.end("Map", "getVMLPathString");
    return str
};
MainFrame.prototype.createTrackVML = function (strPath, pParent, pShape) {
    Timer.start("Map", "createTrackVML");
    var polyVML = "polylineVML";
    var pPolylineEle = getEleByID(polyVML);
    if (!pPolylineEle) {
        pPolylineEle = document.createElement("v:polyline");
        pPolylineEle.id = "polylineVML";
        pPolylineEle.points = strPath;
        pPolylineEle.style.position = "absolute";
        pPolylineEle.style.zIndex = 1088;
        pPolylineEle.filled = false;
        pPolylineEle.strokeColor = _LineColor;
        pPolylineEle.strokeWeight = _LineWidth + "pt";
        var pPolylineStroke = document.createElement("v:stroke");
        pPolylineStroke.opacity = 1;
        pPolylineStroke.startarrowwidth = "wide";
        pPolylineStroke.endarrowwidth = "wide";
        pPolylineStroke.startarrowlength = "long";
        pPolylineStroke.endarrowlength = "long";
        pPolylineStroke.startarrow = "oval";
        pPolylineStroke.endarrow = "classic";
        pPolylineEle.appendChild(pPolylineStroke);
    } else {
        var pTmpEle = pPolylineEle;
        pParent.removeChild(pTmpEle);
        pPolylineEle = pTmpEle;
        pPolylineEle.strokeColor = _LineColor;
        pPolylineEle.strokeWeight = _LineWidth + "pt";
    }
    pPolylineEle.points = strPath;
    pParent.appendChild(pPolylineEle);
    Timer.end("Map", "createTrackVML");
    return pShape;
};
MainFrame.prototype.getPathCenter = function (strPath) {
    var pMBR = this.getPathMBR(strPath);
    return pMBR.centerPoint();
};
function getPathMBR(strPath) {
    strLonLatPath = strPath.split(",");
    var dMinX, dMinY, dMaxX, dMaxY;
    if (strLonLatPath.length == 3) {
        var dRadius = parseFloat(strLonLatPath[2]);
        dMinX = parseFloat(strLonLatPath[0]) - dRadius;
        dMaxX = parseFloat(strLonLatPath[0]) + dRadius;
        dMinY = parseFloat(strLonLatPath[1]) - dRadius;
        dMaxY = parseFloat(strLonLatPath[1]) + dRadius;
    } else if (strLonLatPath.length == 4) {
        dMinX = strLonLatPath[0];
        dMaxX = strLonLatPath[2];
        dMinY = strLonLatPath[1];
        dMaxY = strLonLatPath[3];
    } else if (strLonLatPath.length >= 6) {
        dMaxX = dMinX = strLonLatPath[0];
        dMaxY = dMinY = strLonLatPath[1];
        for (var iIndex = 0; iIndex < strLonLatPath.length / 2; iIndex++) {
            if (strLonLatPath[2 * iIndex] > dMaxX) dMaxX = strLonLatPath[2 * iIndex];
            if (strLonLatPath[2 * iIndex] < dMinX) dMinX = strLonLatPath[2 * iIndex];
            if (strLonLatPath[2 * iIndex + 1] > dMaxY) dMaxY = strLonLatPath[2 * iIndex + 1];
            if (strLonLatPath[2 * iIndex + 1] < dMinY) dMinY = strLonLatPath[2 * iIndex + 1];
        }
    }
    var pMBR = new MBR(dMinX, dMinY, dMaxX, dMaxY);
    return pMBR;
};
MainFrame.prototype.getPathMBR = getPathMBR;
MainFrame.prototype.centerAndZoomToBorder = function (strPaths) {
    if (typeof strPaths == "undefined" || strPaths == null || strPaths == "") return;
    strPaths = Trim(strPaths);
    var pBorderArray = strPaths.split(";");
    var pMBR = null;
    if (this.borderVML && this.borderVML != null) {
        for (var i = 0; i < this.borderVML.length; i++) {
            var pVML = this.borderVML[i];
            this.removeOverlay(pVML);
        }
        this.borderVML.clear();
    } else {
        this.borderVML = new Array();
    }
    for (var iIndex = 0; iIndex < pBorderArray.length; iIndex++) {
        var strPath = pBorderArray[iIndex];
        if (strPath == "") continue;
        if (iIndex == 0) {
            pMBR = this.getPathMBR(strPath);
        } else {
            var pTmpMBR = this.getPathMBR(strPath);
            pMBR.extend(pTmpMBR);
        }
        var pVML = this.createBorder(strPath, false);
        if (pVML != null) this.borderVML.push(pVML);
    }
    this.centerAtMBR(pMBR.minX, pMBR.minY, pMBR.maxX, pMBR.maxY);
    for (var i = 0; i < this.borderVML.length; i++) {
        var pVML = this.borderVML[i];
        pVML.flash(false);
    }
};
MainFrame.prototype.createBorder = function (strPath, bIsFlash) {
    var pVMLObj;
    var pObject = null;
    if (strLonLatPath.length == 3) {
        pObject = Circle;
    } else if (strLonLatPath.length == 4) {
        pObject = Rectangle;
    } else if (strLonLatPath.length >= 6) {
        pObject = Polygon;
    }
    pVMLObj = new pObject(strPath, "red", 4, 0.5, "blue");
    this.addOverlay(pVMLObj);
    if (bIsFlash) {
        pVMLObj.flash(false);
    }
    return pVMLObj;
};
MainFrame.prototype.convert2Div = function (strPath) {
    var pMapContainer = this;
    var iLen = strPath.length;
    var pPath = new Array();
    for (var iIndex = 0; iIndex < iLen / 2; iIndex++) {
        var pPoint = pMapContainer.getDivCoord(strPath[2 * iIndex], strPath[2 * iIndex + 1]);
        pPath.push(pPoint.x);
        pPath.push(pPoint.y);
        delete pPoint;
    }
    return pPath;
};
MainFrame.prototype.drawOval = function (strLonLatPath) {
    var pMapContainer = this;
    var pVMLContainer = pMapContainer.getVMLContainer();
    var pPoint = pMapContainer.getDivCoord(strLonLatPath[0], strLonLatPath[1]);
    var dLon = parseFloat(strLonLatPath[0]) + parseFloat(strLonLatPath[2]);
    var pTemp = pMapContainer.getDivCoord(dLon, strLonLatPath[1]);
    var iRadius = Math.abs(pTemp.x - pPoint.x);
    var iLeft = pPoint.x - iRadius;
    var iTop = pPoint.y - iRadius;
    var iWidth = 2 * iRadius;
    var iHeight = 2 * iRadius;
    var pOval = pVMLContainer.drawOval(iLeft, iTop, iWidth, iHeight);
    return pOval;
};
MainFrame.prototype.drawPolygon = function (strLonLatPath) {
    var pMapContainer = this;
    var pVMLContainer = pMapContainer.getVMLContainer();
    var pPolygon = pVMLContainer.drawPolygon();
    var strPoints = this.convert2Div(strLonLatPath);
    pPolygon.points.value = strPoints;
    delete strPoints;
    return pPolygon;
};
MainFrame.prototype.drawPolyline = function (strLonLatPath) {
    var pMapContainer = this;
    var pVMLContainer = pMapContainer.getVMLContainer();
    var pPolyline = pVMLContainer.drawPolyline();
    pPolyline.points.value = this.convert2Div(strLonLatPath);
    return pPolyline;
};
MainFrame.prototype.drawRect = function (strLonLatPath) {
    var pMapContainer = this;
    var pVMLContainer = pMapContainer.getVMLContainer();
    var pPoint1 = pMapContainer.getDivCoord(strLonLatPath[0], strLonLatPath[1]);
    var pPoint2 = pMapContainer.getDivCoord(strLonLatPath[2], strLonLatPath[3]);
    var iLeft = Math.min(pPoint1.x, pPoint2.x);
    var iTop = Math.min(pPoint1.y, pPoint2.y);
    var iWidth = Math.abs(pPoint1.x - pPoint2.x);
    var iHeight = Math.abs(pPoint1.y - pPoint2.y);
    var pRect = pVMLContainer.drawRect(iLeft, iTop, iWidth, iHeight);
    return pRect;
};
MainFrame.prototype.getVMLContainer = function () {
    if (!this.vmlContainer) {
        this.vmlContainer = this.createVMLContainer(this.div);
    }
    this.refreshVMLGraphics();
    return this.vmlContainer;
};
MainFrame.prototype.getTrackVMLContainer = function () {
    if (!this.trackVmlContainer) {
        this.trackVmlContainer = this.createVMLContainer(this.div);
    }
    this.trackVmlContainer.groupObj.style.filter = "";
    return this.trackVmlContainer;
};
MainFrame.prototype.createVMLContainer = function (pParent) {
    var iWidth = this.viewSize.width;
    var iHeight = this.viewSize.height;
    var pVMLContainer;
    try {
        if (_VMLInMap) {
            pVMLContainer = new vmlGraphics(0, 0, iWidth, iHeight, pParent);
            pVMLContainer.setScale(1);
            pVMLContainer.groupObj.style.filter = "alpha(opacity=50,style=0)";
        } else {
            pVMLContainer = new vmlGraphics(0, 0, iWidth, iHeight, pParent);
            pVMLContainer.groupObj.style.filter = "alpha(opacity=50,style=0)";
        }
    } catch (e) {
        alert("创建VML出现错误!");
    } finally {
        pVMLContainer.groupObj.style.zIndex = _overLayIndex - 10;
        pVMLContainer.groupObj.unselectable = "on";
        pVMLContainer.setFillColor("blue");
        pVMLContainer.setStroke("red", 2);
    }
    return pVMLContainer;
};
MainFrame.prototype.clearVMLContainer = function () {
    if (this.vmlContainer && this.vmlContainer.groupObj) RemoveChildren(this.vmlContainer.groupObj);
};
MainFrame.prototype.refreshVMLGraphics = function () {
    Timer.start("Map", "refreshVMLGraphics");
    var Kb = this.centerBitmap;
    var Kc = this.getDivCoordinate(Kb.x, Kb.y, we);
    var k = 100;
    var m = 100;
    var pPoint = this.getCenterLatLng();
    var Ze = this.spec.getPixelsPerDegree(this.zoomLevel);
    var pVMLContainer = this.vmlContainer;
    if (!pVMLContainer) return;
    if (_VMLInMap) {
        var iLeft = parseInt(this.div.style.left);
        var iTop = parseInt(this.div.style.top);
        var iWidth = this.viewSize.width;
        var iHeight = this.viewSize.height;
        pVMLContainer.groupObj.style.left = convert2Px(-iLeft + iWidth / 2);
        pVMLContainer.groupObj.style.top = convert2Px(iTop + iHeight / 2);
        pVMLContainer.groupObj.style.width = convert2Px(iWidth);
        pVMLContainer.groupObj.style.height = convert2Px(iHeight);
        pVMLContainer.setOrigin(pPoint.x * 100000, pPoint.y * 100000);
        pVMLContainer.setOriginSize(100000 * iWidth / Ze.x, 100000 * iHeight / Ze.y);
    } else {
        var iLeft = parseInt(this.div.style.left);
        var iTop = parseInt(this.div.style.top);
        pVMLContainer.groupObj.style.left = convert2Px(-iLeft);
        pVMLContainer.groupObj.style.top = convert2Px(-iTop);
        var iWidth = this.viewSize.width;
        var iHeight = this.viewSize.height;
        pVMLContainer.groupObj.style.width = convert2Px(iWidth);
        pVMLContainer.groupObj.style.height = convert2Px(iHeight);
        pVMLContainer.setOrigin(0, 0);
        pVMLContainer.setOriginSize(iWidth, iHeight);
    }
    Timer.end("Map", "refreshVMLGraphics");
};
MainFrame.prototype.showMapControl = function (strPos) {
    if (!this.mapControl) {
        var p = this.createMapControl();
        p.style.position = "absolute";
        setClass(p, "noprint");
        this.container.appendChild(p);
        this.mapControl = p;
    } else {
        this.mapControl.style.display = "";
    }
    if (strPos == "right") {
        this.mapControl.style.right = convert2Px(58);
        this.mapControl.style.top = convert2Px(8);
    } else {
        this.mapControl.style.left = convert2Px(8);
        this.mapControl.style.top = convert2Px(8);
    }
};
MainFrame.prototype.hideMapControl = function () {
    if (this.mapControl) {
        this.mapControl.style.display = "none";
    }
};
MainFrame.prototype.hideMapScale = function () {
    var pMapScale = this.mapScale;
    if (pMapScale) {
        for (var iIndex = 0; iIndex < pMapScale.length; iIndex++) {
            pMapScale[iIndex].style.display = "none";
        }
    }
};
MainFrame.prototype.showMapScale = function () {
    var pMapScale = this.mapScale;
    if (pMapScale) {
        for (var iIndex = 0; iIndex < pMapScale.length; iIndex++) {
            pMapScale[iIndex].style.display = "";
        }
    } else {
        this.createMapScale();
    }
};
MainFrame.prototype.createMapControl = function () {
    var p = document.createElement("div");
    if (typeof _bIsShowMapControl != "undefined" && _bIsShowMapControl == true) {
        this.createPanningControls(p);
    }
    this.createZoomControls(p);
    this.createZoomSlider(p);
    return p;
};
MainFrame.prototype.showSmallMapControl = function (strPos) {
    if (!this.mapControl) {
        var p = this.createSmallMapControl();
        p.style.position = "absolute";
        setClass(p, "noprint");
        this.container.appendChild(p);
        this.mapControl = p;
    } else {
        this.mapControl.style.display = "";
    }
    if (strPos == "right") {
        this.mapControl.style.right = convert2Px(58);
        this.mapControl.style.top = convert2Px(8);
    } else {
        this.mapControl.style.left = convert2Px(8);
        this.mapControl.style.top = convert2Px(8);
    }
};
MainFrame.prototype.showStandMapControl = function (strPos) {
    if (!this.mapControl) {
        var p = this.createStandMapControl();
        p.style.position = "absolute";
        setClass(p, "noprint");
        this.container.appendChild(p);
        this.mapControl = p;
    } else {
        this.mapControl.style.display = "";
    }
    if (strPos == "right") {
        this.mapControl.style.right = convert2Px(58);
        this.mapControl.style.top = convert2Px(8);
    } else {
        this.mapControl.style.left = convert2Px(8);
        this.mapControl.style.top = convert2Px(8);
    }
};
MainFrame.prototype.createSmallMapControl = function () {
    var p = document.createElement("div");
    this.createSmallPanningControls(p);
    this.createSmallZoomControls(p);
    return p;
};
MainFrame.prototype.createStandMapControl = function () {
    var p = document.createElement("div");
    this.createPanningControls(p);
    this.createZoomControls(p);
    this.createZoomSlider(p);
    return p;
};
MainFrame.prototype.createZoomControls = function (p) {
    var g = this;
    var ab = divCreator.create(hi, 17, 17, 20, 70, 1, false);
    setCursor(ab, "pointer");
    BindingEvent(ab, "click",
        function (b) {
            g.zoomTo(g.zoomLevel - 1);
            S(b)
        });
    ab.title = _mZoomIn;
    p.appendChild(ab);
    var iTop = 100 + (iSliderH) * ((_MaxLevel + 1) / iMaxLevel);
    var bb = divCreator.create(Zh, 17, 17, 20, iTop, 1, false);
    setCursor(bb, "pointer");
    BindingEvent(bb, "click",
        function (b) {
            g.zoomTo(g.zoomLevel + 1);
            S(b)
        });
    bb.title = _mZoomOut;
    p.appendChild(bb)
};
MainFrame.prototype.createPanningControls = function (p) {
    var g = this;
    var mb = divCreator.create(Gi, 59, 64, 0, 0, 0, false);
    var Ta = divCreator.create(jg, 17, 17, 20, 0, 1, false);
    setCursor(Ta, "pointer");
    BindingEvent(Ta, "click",
        function (b) {
            g.pan(0, -Math.floor(g.viewSize.height * 0.5));
            S(b)
        });
    Ta.title = _mPanNorth;
    p.appendChild(Ta);
    var Ua = divCreator.create(pi, 17, 17, 40, 20, 1, false);
    setCursor(Ua, "pointer");
    BindingEvent(Ua, "click",
        function (b) {
            g.pan(-Math.floor(g.viewSize.width * 0.5), 0);
            S(b)
        });
    Ua.title = _mPanEast;
    p.appendChild(Ua);
    var gb = divCreator.create(ni, 17, 17, 20, 40, 1, false);
    setCursor(gb, "pointer");
    BindingEvent(gb, "click",
        function (b) {
            g.pan(0, Math.floor(g.viewSize.height * 0.5));
            S(b)
        });
    gb.title = _mPanSouth;
    p.appendChild(gb);
    var Za = divCreator.create(Yh, 17, 17, 0, 20, 1, false);
    setCursor(Za, "pointer");
    BindingEvent(Za, "click",
        function (b) {
            g.pan(Math.floor(g.viewSize.width * 0.5), 0);
            S(b)
        });
    Za.title = _mPanWest;
    p.appendChild(Za);
    var G = divCreator.create(kh, 17, 17, 20, 20, 1, false);
    setCursor(G, "pointer");
    BindingEvent(G, "click",
        function (b) {
            var pPoint = _MapCenterPoint;
            g.centerAndZoom(pPoint, g.zoomLevel);
            S(b)
        });
    G.title = _mLastResult;
    p.appendChild(G)
};
MainFrame.prototype.createZoomSlider = function (p) {
    var Wa = document.createElement("div");
    Wa.style.position = "absolute";
    Wa.style.flowposition = "absolute";
    Wa.style.left = convert2Px(9);
    Wa.style.top = convert2Px(90);
    Wa.style.width = convert2Px(37);
    iHeight = iSliderH * ((_MaxLevel + 1) / iMaxLevel) + 1;
    Wa.style.height = convert2Px(iHeight);
    Wa.style.overflow = "hidden";
    var Hd = divCreator.create(ei, 37, iSliderH, 11, 0, 1, false);
    Wa.appendChild(Hd);
    var Hc = -1 * Math.floor(3.5) + 1 + 10;
    Hc = 0;
    var oe = divCreator.create(Gh, 37, 14, Hc, this.getRelativeZoomSliderPos(), 2, false);
    oe.title = _mZoomDrag;
    Wa.appendChild(oe);
    p.appendChild(Wa);
    var F = new MBR(Hc, 1, Hc + 37, iSliderH * ((_MaxLevel + 1) / iMaxLevel));
    var Ud = new DragEvent(oe, Hc, this.getRelativeZoomSliderPos(), F);
    var g = this;
    this.onzoom = function () {
        Ud.moveTo(Hc, g.getRelativeZoomSliderPos())
    };
    this.sliderToLevel = function (a) {
        Ud.moveTo(Hc, g.getRelativeZoomSliderPos(a))
    };
    Ud.ondragstart = function () {
        g.saveLevel = g.zoomLevel;
    };
    Ud.ondragend = function () {
        var Ai = Ud.top + Math.floor(5.5);
        var iLevel = g.getZoomFromRelativeCoord(Ai);
        g.zoomTo(iLevel);
    };
    setCursor(Hd, "pointer");
    Hd.title = _mZoomSet;
    BindingEvent(Hd, "click",
        function (b) {
            var o;
            if (window.event) {
                o = window.event.offsetY
            } else {
                var Ad = ObjectOffset(Wa);
                o = b.pageY - Ad.y - 2
            }
            S(b);
            g.zoomTo(g.getZoomFromRelativeCoord(o))
        })
};
MainFrame.prototype.getRelativeZoomSliderPos = function (a) {
    var iPos;
    if (a) {
        iPos = 1 + a * 12;
    } else {
        iPos = 1 + this.zoomLevel * 12;
    }
    return iPos;
};
MainFrame.prototype.getZoomFromRelativeCoord = function (o) {
    var Z = Math.floor((o - 1) / 12);
    return Math.max(0, Math.min(this.spec.numZoomLevels - 1, Z))
};
MainFrame.prototype.getRoutePath = function () {
    if (!this.routeArray) return null;
    var iLength = this.routeArray.length;
    var strPath, x, y;
    var iLeft = this.div.style.left;
    var iTop = this.div.style.top;
    var pStartTime = new Date();
    for (var iIndex = 0; iIndex < iLength; iIndex++) {
        pMonitorInfo = this.routeArray[iIndex];
        pPoint = this.getDivCoord(pMonitorInfo.lon, pMonitorInfo.lat);
        x = pPoint.x - parseInt(iLeft);
        y = pPoint.y - parseInt(iTop);
        if (!strPath) {
            strPath = x + "," + y;
        } else {
            strPath = strPath + "," + x + "," + y;
        }
    }
    var pEndTime = new Date();
    return strPath;
};
function createRadio(name, id, nodeName, parent) {
    var pRadio = document.createElement("<input>");
    pRadio.id = id;
    pRadio.name = name;
    pRadio.type = "radio";
    return pRadio;
};
MainFrame.prototype.showMapServerControl = function () {
    var mapServer = new Array();
    var pMe = this;
    var iRight = 10;
    var iWidth = 70;
    var iSpan = 10;
    if (typeof _VectorSateMapService != "undefined" && _VectorSateMapService != null && _VectorSateMapService != "") {
        var ne = new MapServerControl('矢量影像');
        ne.style.top = convert2Px(3);
        ne.style.right = convert2Px(iRight);
        setClass(ne, "noprint");
        BindingEvent(ne, "click",
            function (b) {
                pMe.setVectorSateMap();
            });
        mapServer.push(ne);
        this.container.appendChild(ne);
        iWidth = ne.offsetWidth;
        iRight = iRight + iWidth + iSpan;
    }
    if (typeof _SatelliteMapService != "undefined" && _SatelliteMapService != null && _SatelliteMapService != "") {
        var ne = new MapServerControl('影像地图');
        setClass(ne, "noprint");
        BindingEvent(ne, "click",
            function (b) {
                pMe.setSatelliteMap();
            });
        mapServer.push(ne);
        this.container.appendChild(ne);
        ne.style.top = convert2Px(3);
        ne.style.right = convert2Px(iRight);
        iWidth = ne.offsetWidth;
        iRight = iRight + iWidth + iSpan;
    }
    if (iRight != 10) {
        var ne = new MapServerControl('矢量地图');
        ne.style.top = convert2Px(3);
        ne.style.right = convert2Px(iRight);
        setClass(ne, "noprint");
        mapServer.push(ne);
        BindingEvent(ne, "click",
            function (b) {
                pMe.setVectorMap();
            });
        this.container.appendChild(ne);
    }
    this.mapServer = mapServer;
};
MainFrame.prototype.setVectorMap = function () {
    this.mapServiceArr = this.vectorMapService;
    this.spec.bIsOverlay = false;
    this.spec.setMapURL(this.mapServiceArr);
    this.initializeMap();
    this.curMapServerHander = this.eventHandler("setVectorMap");
};
MainFrame.prototype.setSatelliteMap = function () {
    this.mapServiceArr = this.satelliteMapService;
    this.spec.bIsOverlay = false;
    this.spec.setMapURL(this.mapServiceArr);
    this.initializeMap();
    this.curMapServerHander = this.eventHandler("setSatelliteMap");
};
MainFrame.prototype.setVectorSateMap = function () {
    if (_bIsOverlay) {
        this.mapServiceArr = this.satelliteMapService;
        this.spec.bIsOverlay = true;
        this.spec.setOverlayURL(this.vectorSateMapService);
    } else {
        this.mapServiceArr = this.vectorSateMapService;
        this.spec.bIsOverlay = false;
    }
    this.spec.setMapURL(this.mapServiceArr);
    this.initializeMap();
    this.curMapServerHander = this.eventHandler("setVectorSateMap");
};
function MapServerControl(Id) {
    var h = document.createElement("div");
    h.onselectstart = _NoAction;
    h.style.cssText = "BORDER-RIGHT: #015190 1px solid;	BORDER-TOP: #015190 1px solid;	BORDER-LEFT: #015190 1px solid;	BORDER-BOTTOM: #015190 1px solid;	RIGHT: 12em;	WIDTH: 65px;	HEIGHT: 12px;	CURSOR: pointer;	POSITION: absolute;	BACKGROUND-COLOR: #F4C767;";
    var pTextDiv = document.createElement("div");
    pTextDiv.style.cssText = "TEXT-ALIGN: center;	VERTICAL-ALIGN:middle;	BORDER-RIGHT: #015190 0px solid;	BORDER-TOP: #F4C767 2px solid;	FONT-WEIGHT: bold;	FONT-SIZE: 12px;	FONT-FAMILY:宋体;	BORDER-LEFT: #b0b0b0 1px solid;	BORDER-BOTTOM:#015190 0px solid;	color:#015190";
    pTextDiv.innerHTML = Id;
    pTextDiv.noWrap = true;
    h.appendChild(pTextDiv);
    return h
};
MainFrame.prototype.createServerControl = function (Id) {
    var h = document.createElement("div");
    h.onselectstart = _NoAction;
    h.className = "mapServerControl";
    var pTextDiv = document.createElement("div");
    pTextDiv.className = "mapServerControlShadow";
    pTextDiv.innerHTML = Id;
    pTextDiv.noWrap = true;
    h.appendChild(pTextDiv);
    return h
};
MainFrame.prototype.showButtonTip = function () {
    var tip = this.createDiv("点击右键结束");
    tip.style.backgroundColor = "#004C78";
    tip.style.border = "1px solid red";
    tip.noWrap = true;
    tip.style.zIndex = 10000;
    tip.style.display = "none";
    this.container.appendChild(tip);
    this.buttonTip = tip;
};
MainFrame.prototype.showCopyright = function () {
    if (!this.copyRightLabel) {
        var ne = this.createDiv(_mCopyright);
        ne.style.left = convert2Px(3);
        ne.style.bottom = convert2Px(3);
        this.container.appendChild(ne);
        this.copyRightLabel = ne;
        setClass(this.copyRightLabel, "noprint");
    }
    this.copyRightLabel.style.display = "";
};
MainFrame.prototype.createMapScale = function () {
    if (this.mapScale != null) return;
    var mapScale = new Array();
    var strScale = "1:" + _m_MapBottomScale * Math.pow(2, this.zoomLevel);
    this.scaleTxt = document.createElement("div");
    this.scaleTxt.style.border = "1px solid #000";
    this.scaleTxt.style.fontSize = "2px";
    this.scaleTxt.style.position = "absolute";
    this.scaleTxt.style.backgroundColor = "black";
    this.scaleTxt.style.right = convert2Px(50);
    this.scaleTxt.style.bottom = convert2Px(13);
    this.scaleTxt.style.width = "100px";
    this.scaleTxt.style.height = "2px";
    setClass(this.scaleTxt, "noprint");
    this.container.appendChild(this.scaleTxt);
    mapScale.push(this.scaleTxt);
    this.scaleRightTxt = createTxt("");
    this.scaleRightTxt.style.right = convert2Px(50);
    this.scaleRightTxt.style.bottom = convert2Px(23);
    this.container.appendChild(this.scaleRightTxt);
    setClass(this.scaleRightTxt, "noprint");
    mapScale.push(this.scaleRightTxt);
    this.mapScale = mapScale;
    this.refreshMapScale();
    if (typeof bIsFloatFuncLoaded != 'undefined' && bIsFloatFuncLoaded && typeof _bIsResultTable != 'undefined' && _bIsResultTable) {
        this.floatResultDiv = initFloatDiv(240, 300, document.body);
    }
};
MainFrame.prototype.showInfoFrame = function (pEle, bIsInScreen) {
    var pMon = pEle.monitor;
    if (this.pWinInfo) {
        delete this.pWinInfo;
        this.pWinInfo = null;
    }
    this.openInfoWindow(pMon.lon, pMon.lat, pMon, bIsInScreen);
};
MainFrame.prototype.openInfoWindow = function (lon, lat, html, bIsInScreen) {
    var pIcon = new Icon("eleInfo", 150, 150, new Point(10, 10), new Point(10, 10), new Point(10, 10), "ffff", 30, null);
    var pIconInfo = new IconInfo("", pIcon);
    var strHTML = "";
    this.pWinInfo = new InfoObj('wujie', new Point(lon, lat), pIconInfo, 'size=44', html);
    this.pWinInfo.bIsVisable = true;
    if (typeof bIsInScreen == "object") {
        this.curOverlay = bIsInScreen;
    } else if (typeof bIsInScreen == "undefined" || bIsInScreen) {
        this.bIsInScreen = true;
    }
    this.showInfoWindow(this.pWinInfo);
};
MainFrame.prototype.hideInfoFrame = function () {
    this.infoResultDiv.style.display = "none";
};
MainFrame.prototype.createDiv = function (Id) {
    var h = document.createElement("div");
    h.style.position = "absolute";
    setCursor(h, "default");
    h.unselectable = "on";
    h.onselectstart = _NoAction;
    h.innerHTML = Id;
    h.style.fontSize = convert2Px(11);
    h.style.fontFamily = "Arial, sans serif";
    h.style.MozUserSelect = "none";
    h.style.color = "black";
    return h
};
MainFrame.prototype.hideCopyright = function () {
    if (this.copyRightLabel) this.copyRightLabel.style.display = "none";
};
MainFrame.prototype.hideMapServer = function () {
    var pMapServer = this.mapServer;
    if (pMapServer) {
        for (var iIndex = 0; iIndex < pMapServer.length; iIndex++) {
            pMapServer[iIndex].style.display = "none";
        }
    }
};
MainFrame.prototype.showMapServer = function () {
    var pMapServer = this.mapServer;
    if (pMapServer) {
        for (var iIndex = 0; iIndex < pMapServer.length; iIndex++) {
            pMapServer[iIndex].style.display = "";
        }
    }
};
function createTxt(strScale, bIsTransparent) {
    var h = null;
    if (bIsTransparent) {
        h = document.createElement("span");
    } else {
        h = document.createElement("div")
    }
    h.style.position = "absolute";
    setCursor(h, "default");
    h.unselectable = "on";
    h.onselectstart = _NoAction;
    if (strScale) {
        h.innerHTML = strScale;
    }
    h.style.fontSize = convert2Px(10);
    h.style.color = "red";
    h.style.fontFamily = "Arial, sans serif";
    h.style.MozUserSelect = "none";
    return h
};
MainFrame.prototype.createScaleImg = function (strImgURL) {
    var h = document.createElement("div");
    h.style.position = "absolute";
    setCursor(h, "default");
    h.unselectable = "on";
    h.onselectstart = _NoAction;
    var pScaleImg = document.createElement("img");
    pScaleImg.src = strImgURL;
    h.appendChild(pScaleImg);
    return h
};
MainFrame.prototype.createSmallPanningControls = function (p) {
    return this.createPanningControls(p);
};
MainFrame.prototype.createSmallZoomControls = function (p) {
    var g = this;
    var ab = divCreator.create(hi, 17, 17, 20, 70, 1, false);
    setCursor(ab, "pointer");
    BindingEvent(ab, "click",
        function (b) {
            g.zoomTo(g.zoomLevel - 1);
            S(b)
        });
    ab.title = _mZoomIn;
    p.appendChild(ab);
    var iTop = 100;
    var bb = divCreator.create(Zh, 17, 17, 20, iTop, 1, false);
    setCursor(bb, "pointer");
    BindingEvent(bb, "click",
        function (b) {
            g.zoomTo(g.zoomLevel + 1);
            S(b)
        });
    bb.title = _mZoomOut;
    p.appendChild(bb)
};
function MapStatusControl(u) {
    this.anchorLevel = null;
    this.anchor = new Point(0, 0);
    this.spec = null;
    this.span = new Rect(_MaxNumber, _MaxNumber);
    this.points = null;
    this.map = u;
    this.map.addStateListener(this.eventHandler("onMapStateChanged"));
    this.map.onresize = this.eventHandler("onMapResize");
};
MapStatusControl.prototype.onMapStateChanged = function () {
    if (this.anchorLevel != this.map.zoomLevel || this.spec != this.map.spec) {
        this.reset();
        this.addPoint(0, 0, true);
        return;
    }
    var G = this.map.getCenterLatLng();
    var pd = Math.round((G.x - this.anchor.x) / this.span.width);
    var Fd = Math.round((G.y - this.anchor.y) / this.span.height);
    this.addPoint(pd, Fd, true);
};
MapStatusControl.prototype.onMapResize = function () {
    this.reset();
    this.addPoint(0, 0, false)
};
MapStatusControl.prototype.reset = function () {
    this.map.getCenterLatLng(this.anchor);
    this.map.getSpanLatLng(this.span);
    this.spec = this.map.spec;
    this.anchorLevel = this.map.zoomLevel;
    this.points = new Object()
};
MapStatusControl.prototype.addPoint = function (pd, Fd, bIsOK) {
    var str = pd + "," + Fd;
    if (this.points[str]) return;
    this.points[str] = 1;
    if (bIsOK) {
    }
};
function DragEvent(H, left, top, La) {
    this.bIsMouseDown = false;
    this.src = H;
    this.container = La;
    this.ondragstart = null;
    this.ondrag = null;
    this.ondragend = null;
    this.onmove = null;
    this.onclick = null;
    this.disabled = false;
    this.dragPoint = new Point(0, 0);
    this.clickStartPos = new Point(0, 0);
    this.src.style.position = "absolute";
    this.bIsPan = true;
    this.moveTo(left != null ? left : H.offsetLeft, top != null ? top : H.offsetTop);
    this.mouseDownHandler = this.eventHandler("onMouseDown");
    this.mouseMoveHandler = this.eventHandler("onMouseMove");
    this.mouseUpHandler = this.eventHandler("onMouseUp");
    if (_IEBrowser.type == 2) {
        BindingEvent(window, "mouseout", this.eventHandler("onWindowMouseOut"))
    }
    this.eventSrc = this.src.setCapture ? this.src : window;
    BindingEvent(this.src, "mousedown", this.mouseDownHandler)
};
DragEvent.prototype.moveTo = function (left, top) {
    try {
        if (this.left != left || this.top != top) {
            this.left = left;
            this.top = top;
            this.src.style.left = this.left + "px";
            this.src.style.top = this.top + "px";
            if (this.onmove) {
                this.onmove()
            }
        }
    } catch (e) {
        alert("moveTo:" + e.message);
    }
};
DragEvent.prototype.onMouseDown = function (b) {
    this.bIsMouseDown = true;
    if (b.cancelDrag) {
        return
    }
    var zi = b.button == 0 || b.button == 1;
    if (this.disabled || !zi) {
        S(b);
        return false
    }
    this.dragPoint.x = b.clientX;
    this.dragPoint.y = b.clientY;
    BindingEvent(this.eventSrc, "mousemove", this.mouseMoveHandler);
    BindingEvent(this.eventSrc, "mouseup", this.mouseUpHandler);
    if (this.src.setCapture) {
        this.src.setCapture()
    }
    this.clickStartTime = (new Date()).getTime();
    this.clickStartPos.x = b.clientX;
    this.clickStartPos.y = b.clientY;
    if (this.ondragstart) {
        this.ondragstart(b)
    }
    this.originalCursor = this.src.style.cursor;
    if (this.bIsPan) setCursor(this.src, "move");
    S(b);
};
DragEvent.prototype.onMouseMove = function (b) {
    if (_IEBrowser.os == 1) {
        if (b == null) {
            return
        }
        if (this.dragDisabled) {
            this.savedMove = new Object();
            this.savedMove.clientX = b.clientX;
            this.savedMove.clientY = b.clientY;
            return
        }
        this.setTimeout("this.dragDisabled = false; this.onMouseMove(this.savedMove)", 30);
        this.dragDisabled = true;
        this.savedMove = null
    }
    var x = this.left + (b.clientX - this.dragPoint.x);
    var o = this.top + (b.clientY - this.dragPoint.y);
    var Da = 0;
    var Ha = 0;
    if (this.container) {
        var Yc = x;
        if (x < this.container.minX) {
            Yc = this.container.minX
        } else {
            var xd = this.container.maxX - this.src.offsetWidth;
            if (x > xd) {
                Yc = xd
            }
        }
        Da = Yc - x;
        x = Yc;
        var ld = o;
        if (o < this.container.minY) {
            ld = this.container.minY
        } else {
            var ed = this.container.maxY - this.src.offsetHeight;
            if (o > ed) ld = ed
        }
        Ha = ld - o;
        o = ld
    }
    this.moveTo(x, o);
    this.dragPoint.x = b.clientX + Da;
    this.dragPoint.y = b.clientY + Ha;
    if (this.ondrag) {
        this.ondrag(b)
    }
};
DragEvent.prototype.onMouseUp = function (b) {
    this.bIsMouseDown = false;
    unbindingEvent(this.eventSrc, "mousemove", this.mouseMoveHandler);
    unbindingEvent(this.eventSrc, "mouseup", this.mouseUpHandler);
    setCursor(this.src, this.originalCursor);
    if (document.releaseCapture) {
        document.releaseCapture()
    }
    if (this.ondragend) {
        this.ondragend(b);
    }
    if (this.onclick) {
        var Ih = (new Date()).getTime();
        if (Ih - this.clickStartTime <= 500 && (Math.abs(this.clickStartPos.x - b.clientX) <= 2 && Math.abs(this.clickStartPos.y - b.clientY) <= 2)) {
            this.onclick(b)
        }
    }
};
DragEvent.prototype.onWindowMouseOut = function (b) {
    if (!b.relatedTarget) {
        this.onMouseUp(b)
    }
};
DragEvent.prototype.disable = function () {
    this.disabled = true
};
DragEvent.prototype.enable = function () {
    this.disabled = false
};
var se = "centerlat";
var te = "centerlng";
function InfoObj(id, pPoint, pIcon, pInfoStyle, pXML) {
    this.id = id;
    this.point = pPoint;
    this.icon = pIcon;
    this.infoStyle = pInfoStyle;
    this.xml = pXML;
};
function IconInfo(f, r) {
    this.image = f;
    this.iconClass = r
};
function Xd(U, Ce, fa) {
    this.id = U;
    this.description = Ce;
    this.pointIndex = fa
};
function Icon(name, width, height, pointCoord, infoTipCoord, shadowTipCoord, shadowURL, shadowWidth, imageMapArray) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.topOffset = 0;
    this.leftOffset = 0;
    this.image = null;
    this.pointCoord = pointCoord;
    this.infoTipCoord = infoTipCoord;
    this.shadowTipCoord = shadowTipCoord;
    this.shadowURL = shadowURL;
    this.shadowWidth = shadowWidth;
    this.imageMapArray = imageMapArray || [];
};
Icon.prototype.translateImageMapArray = function (x, o) {
    var A = [];
    var je = this.imageMapArray;
    for (var a = 0; a < je.length; a += 2) {
        A.push(je[a] + x);
        A.push(je[a + 1] + o)
    }
    return A
};
Icon.classes = {};
Icon.classNames = [];
Icon.getPadding = function () {
    var A = {
        "top": 0,
        "left": 0,
        "bottom": 0,
        "right": 0
    };
    for (var a = 0; a < this.classNames.length; ++a) {
        var ka = this.classes[this.classNames[a]];
        A.top = Math.max(A.top, ka.pointCoord.y);
        A.bottom = Math.max(A.bottom, ka.height - ka.pointCoord.y);
        A.left = Math.max(A.left, ka.pointCoord.x);
        A.right = Math.max(A.right, ka.width - ka.pointCoord.x)
    }
    return A
};
Icon.load = function (r) {
    Icon.classes[r.name] = r;
    Icon.classNames.push(r.name)
};
Icon.get = function (J) {
    return Icon.classes[J]
};
var xh = [9, 0, 6, 1, 4, 2, 2, 4, 0, 8, 0, 12, 1, 14, 2, 16, 5, 19, 7, 23, 8, 26, 9, 30, 9, 34, 11, 34, 11, 30, 12, 26, 13, 24, 14, 21, 16, 18, 18, 16, 20, 12, 20, 8, 18, 4, 16, 2, 15, 1, 13, 0];
Icon.load(new Icon("local", 20, 34, new Point(9, 34), new Point(9, 2), new Point(17, 23), _ImageBaseUrl + "shadow50.png", 37, xh));
Icon.load(new Icon("noicon", 0, 0, new Point(0, 0), new Point(0, 0), new Point(0, 0), null, 0, null));
function getDocNodeValue(s) {
    if (!s) {
        return ""
    }
    if (typeof s.text != "undefined") {
        return s.text
    }
    if (s.nodeType == 3 || s.nodeType == 4) {
        return s.nodeValue
    }
    var ja = "";
    if (s.nodeType == 1) {
        for (var Vc = s.firstChild; Vc != null; Vc = Vc.nextSibling) {
            ja += getDocNodeValue(Vc)
        }
    }
    return ja
};
function InfoWind(ui, Pf, yg, pg) {
    this.oncloseclick = ui;
    this.createWindow(yg);
    this.createShadow(pg);
    if (_IEBrowser.type != 1) {
        this.createMask();
    } else {
        this.maskPng = null
    }
    this.createContentArea();
    this.createCloseButton();
    Pf.appendChild(this.windowDiv);
    Pf.appendChild(this.shadowDiv);
    this.setSize(208, 69);
    this.hide();
};
InfoWind.prototype.setContentSize = function (k, m) {
    this.setSize(k - (this.window.w.width - 15) * 2, m - (this.window.n.height - 15) * 2)
};
InfoWind.prototype.setSize = function (k, m) {
    if (k < 0) k = 0;
    if (m < 0) m = 0;
    this.width = k;
    this.height = m;
    this.setWindowSize(k, m);
    this.setShadowSize(k, m);
    if (this.hasMask()) {
        this.setMaskSize()
    }
    this.closeButton.style.left = this.getTotalWidth() - this.closeButton.width - 10 - 1 + "px";
    this.closeButton.style.top = "10px"
};
InfoWind.prototype.getWindowHeight = function () {
    return this.window.c.height + 2 * this.window.n.height
};
InfoWind.prototype.getTotalHeight = function () {
    return this.height + this.window.pointer.height + this.window.n.height
};
InfoWind.prototype.getTotalHeightAboveGround = function () {
    return this.getTotalHeight() + (this.iconClass.pointCoord.y - this.iconClass.infoTipCoord.y)
};
InfoWind.prototype.getTotalShadowHeight = function () {
    return Math.floor(this.height / 4) + this.shadow.pointer.height + this.shadow.nw.height
};
InfoWind.prototype.getTotalWidth = function () {
    return this.width + this.window.w.width + this.window.e.width
};
InfoWind.prototype.getOffsetLeft = function () {
    return this.windowDiv.offsetLeft
};
InfoWind.prototype.getOffsetTop = function () {
    return this.windowDiv.offsetTop
};
InfoWind.prototype.setWindowSize = function (k, m) {
    this.window.n.style.width = k + "px";
    this.window.e.style.height = m + "px";
    this.window.c.style.width = k + "px";
    this.window.c.style.height = m + "px";
    this.window.w.style.height = m + "px";
    var Sa = this.calculatePointerOffset(k);
    this.window.s1.style.width = Sa + "px";
    this.window.pointer.style.left = Sa + this.window.sw.width + "px";
    this.window.s2.style.left = Sa + this.window.pointer.width + this.window.sw.width + "px";
    this.window.s2.style.width = k - Sa - this.window.pointer.width + "px";
    var Vb = k + this.window.w.width + "px";
    this.window.ne.style.left = Vb;
    this.window.e.style.left = Vb;
    this.window.se.style.left = Vb;
    var Ba = m + this.window.n.height + "px";
    this.window.sw.style.top = Ba;
    this.window.s1.style.top = Ba;
    this.window.pointer.style.top = Ba;
    this.window.s2.style.top = Ba;
    this.window.se.style.top = Ba
};
InfoWind.prototype.setShadowSize = function (k, m) {
    k -= 15;
    var Eb = Math.floor(m / 4);
    var Vb = k + this.shadow.nw.width;
    var Sa = this.calculatePointerOffset(k) - 41;
    var Ba = Eb + this.shadow.n.height + "px";
    var Jd = Eb + this.shadow.nw.height;
    this.shadow.s1Div.style.width = Math.max(Sa, 0) + "px";
    this.shadow.pointer.style.left = Sa + this.shadow.sw.width + "px";
    this.shadow.s2Div.style.left = Sa + this.shadow.pointer.width + this.shadow.sw.width + "px";
    this.shadow.s2Div.style.width = k - Sa - this.shadow.pointer.width + "px";
    this.shadow.sw.style.top = Ba;
    this.shadow.s1Div.style.top = Ba;
    this.shadow.pointer.style.top = Ba;
    this.shadow.s2Div.style.top = Ba;
    this.shadow.se.style.top = Ba;
    this.shadow.se.style.left = Vb + "px";
    var lf = this.shadow.nw.height;
    var zf = Math.floor(m / 2);
    this.shadow.wDiv.style.height = Eb + "px";
    this.shadow.wDiv.style.left = lf + "px";
    this.shadow.wDiv.style.width = zf + "px";
    this.shadow.w.style.left = Eb - this.shadow.w.width + 80 + "px";
    var yf = this.shadow.nw.height + k + 70;
    this.shadow.eDiv.style.height = Eb + "px";
    this.shadow.eDiv.style.left = yf + "px";
    this.shadow.eDiv.style.width = m + "px";
    this.shadow.e.style.left = Eb - this.shadow.w.width + 80 + "px";
    var Ne = lf + zf;
    this.shadow.cDiv.style.width = yf - Ne + "px";
    this.shadow.cDiv.style.height = Eb + "px";
    this.shadow.cDiv.style.left = Ne + "px";
    this.shadow.nw.style.left = Jd + "px";
    this.shadow.nDiv.style.width = k - 30 + "px";
    this.shadow.nDiv.style.left = Jd + this.shadow.nw.width + "px";
    this.shadow.ne.style.left = Vb + Jd - 30 + "px"
};
InfoWind.prototype.setMaskSize = function () {
    this.maskPng.style.width = this.getTotalWidth() + "px";
    this.maskPng.style.height = this.getTotalHeight() + "px";
    var Nf = this.getTotalWidth();
    var fd = this.getWindowHeight();
    var yh = this.getTotalHeight();
    var ve = this.window.pointer.offsetLeft;
    var Hg = ve + this.window.pointer.width;
    var kg = ve + 53;
    var Vg = ve + 4;
    var ka = ",";
    var u = this.getMaskMap();
    var E = u.firstChild;
    E.setAttribute("coords", "0,0,0," + fd + ka + kg + ka + fd + ka + Vg + ka + yh + ka + Hg + ka + fd + ka + Nf + ka + fd + ka + Nf + ",0")
};
InfoWind.prototype.hide = function () {
    if (this.windowDiv) this.windowDiv.style.display = "none";
    this.shadowDiv.style.display = "none"
};
InfoWind.prototype.show = function () {
    this.windowDiv.style.display = "";
    this.shadowDiv.style.display = "";
    this.windowDiv.style.visibility = "visible";
    this.shadowDiv.style.visibility = "visible";
    this.contentArea.style.visibility = "visible"
};
InfoWind.prototype.isVisible = function () {
    return this.windowDiv.style.display != "none"
};
InfoWind.prototype.positionAt = function (left, top, pIcon) {
    var ic = this.calculatePointerOffset(this.width) + this.window.w.width + 5;
    var Bc = this.height + this.window.n.height + this.window.s1.height;
    this.left = left - ic;
    this.top = top - Bc;
    this.left += pIcon.infoTipCoord.x - pIcon.pointCoord.x;
    this.top += pIcon.infoTipCoord.y - pIcon.pointCoord.y;
    this.windowDiv.style.left = this.left + "px";
    this.windowDiv.style.top = this.top + "px";
    var Df = 0;
    var Jf = this.getTotalHeight() - this.getTotalShadowHeight();
    Df += pIcon.shadowTipCoord.x - pIcon.infoTipCoord.x;
    Jf += pIcon.shadowTipCoord.y - pIcon.infoTipCoord.y;
    this.shadowDiv.style.left = this.left + Df + "px";
    this.shadowDiv.style.top = this.top + Jf + "px";
};
InfoWind.prototype.calculatePointerOffset = function (k) {
    return Math.floor(k / 4)
};
InfoWind.prototype.createCroppingDiv = function (f) {
    var h = window.document.createElement("div");
    h.style.overflow = "hidden";
    h.style.position = "absolute";
    h.style.width = f.width + "px";
    h.style.height = f.height + "px";
    h.style.left = f.style.left;
    h.style.top = f.style.top;
    h.style.zIndex = f.style.zIndex;
    f.style.left = "0px";
    f.style.top = "0px";
    h.appendChild(f);
    return h
};
InfoWind.prototype.createWindow = function (Ra) {
    this.window = new Object();
    this.window.nw = divCreator.create(ti, 25, 25, 0, 0, 0, false);
    this.window.n = divCreator.create(Wh, 640, 25, this.window.nw.width, 0, 0, true);
    this.window.ne = divCreator.create(ji, 25, 25, 0, 0, 0, false);
    this.window.w = divCreator.create(bi, 25, 640, 0, this.window.nw.height, 0, true);
    this.window.c = divCreator.create(Wg, 640, 640, this.window.w.width, this.window.n.height, 0, true);
    this.window.e = divCreator.create(Rg, 25, 640, 0, this.window.ne.height, 0, true);
    this.window.sw = divCreator.create(vi, 25, 96, 0, 0, 0, false);
    this.window.s1 = divCreator.create(nf, 640, 96, this.window.sw.width, 0, 0, true);
    this.window.pointer = divCreator.create(Hh, 98, 96, 0, 0, 0, false);
    this.window.s2 = divCreator.create(nf, 640, 96, 0, 0, 0, true);
    this.window.se = divCreator.create(ng, 25, 96, 0, 0, 0, false);
    this.window.nw.onmousedown = this.onMouseDown;
    this.window.n.onmousedown = this.onMouseDown;
    this.window.ne.onmousedown = this.onMouseDown;
    this.window.w.onmousedown = this.onMouseDown;
    this.window.c.onmousedown = this.onMouseDown;
    this.window.e.onmousedown = this.onMouseDown;
    this.window.sw.onmousedown = this.onMouseDown;
    this.window.s1.onmousedown = this.onMouseDown;
    this.window.pointer.onmousedown = this.onMouseDown;
    this.window.s2.onmousedown = this.onMouseDown;
    this.window.se.onmousedown = this.onMouseDown;
    this.windowDiv = window.document.createElement("div");
    this.windowDiv.style.position = "absolute";
    this.windowDiv.style.left = "0px";
    this.windowDiv.style.top = "0px";
    this.windowDiv.style.zIndex = Ra;
    setClass(this.windowDiv, "noprint");
    this.windowDiv.appendChild(this.window.nw);
    this.windowDiv.appendChild(this.window.n);
    this.windowDiv.appendChild(this.window.ne);
    this.windowDiv.appendChild(this.window.w);
    this.windowDiv.appendChild(this.window.c);
    this.windowDiv.appendChild(this.window.e);
    this.windowDiv.appendChild(this.window.sw);
    this.windowDiv.appendChild(this.window.s1);
    this.windowDiv.appendChild(this.window.pointer);
    this.windowDiv.appendChild(this.window.s2);
    this.windowDiv.appendChild(this.window.se);
};
InfoWind.prototype.createShadow = function (Ra) {
    this.shadow = new Object();
    this.shadow.nw = divCreator.create(Fg, 70, 30, 0, 0, 0, false);
    this.shadow.n = divCreator.create(Oi, 640, 30, this.shadow.nw.width, 0, 0, false);
    this.shadow.ne = divCreator.create(ii, 70, 30, 0, 0, 0, false);
    this.shadow.w = divCreator.create(Th, 360, 280, 0, this.shadow.nw.height, 0, false);
    this.shadow.c = divCreator.create(Gg, 640, 640, this.shadow.w.width, this.shadow.n.height, 0, false);
    this.shadow.e = divCreator.create(Og, 360, 280, 0, this.shadow.ne.height, 0, false);
    this.shadow.sw = divCreator.create(Qg, 70, 60, 0, 0, 0, false);
    this.shadow.s1 = divCreator.create(qf, 320, 60, this.shadow.sw.width, 0, 0, false);
    this.shadow.pointer = divCreator.create(Eg, 140, 60, 0, 0, 0, false);
    this.shadow.s2 = divCreator.create(qf, 320, 60, 0, 0, 0, false);
    this.shadow.se = divCreator.create(Lg, 70, 60, 0, 0, 0, false);
    this.shadow.nDiv = this.createCroppingDiv(this.shadow.n);
    this.shadow.wDiv = this.createCroppingDiv(this.shadow.w);
    this.shadow.eDiv = this.createCroppingDiv(this.shadow.e);
    this.shadow.s1Div = this.createCroppingDiv(this.shadow.s1);
    this.shadow.s2Div = this.createCroppingDiv(this.shadow.s2);
    this.shadow.cDiv = this.createCroppingDiv(this.shadow.c);
    this.shadowDiv = window.document.createElement("div");
    this.shadowDiv.style.position = "absolute";
    this.shadowDiv.style.left = "0px";
    this.shadowDiv.style.top = "0px";
    this.shadowDiv.style.zIndex = 0;
    this.shadowDiv.style.zIndex = Ra;
    setClass(this.shadowDiv, "noprint");
    this.shadowDiv.appendChild(this.shadow.nw);
    this.shadowDiv.appendChild(this.shadow.nDiv);
    this.shadowDiv.appendChild(this.shadow.ne);
    this.shadowDiv.appendChild(this.shadow.wDiv);
    this.shadowDiv.appendChild(this.shadow.cDiv);
    this.shadowDiv.appendChild(this.shadow.eDiv);
    this.shadowDiv.appendChild(this.shadow.sw);
    this.shadowDiv.appendChild(this.shadow.s1Div);
    this.shadowDiv.appendChild(this.shadow.pointer);
    this.shadowDiv.appendChild(this.shadow.s2Div);
    this.shadowDiv.appendChild(this.shadow.se)
};
InfoWind.prototype.hasMask = function () {
    return this.maskPng != null
};
InfoWind.prototype.getMaskMap = function () {
    return document.getElementById(this.maskMapId)
};
var cf = 0;
InfoWind.prototype.createMask = function () {
    var u = document.createElement("map");
    this.maskMapId = "iwMap" + cf;
    u.setAttribute("id", this.maskMapId);
    u.setAttribute("name", this.maskMapId);
    cf++;
    this.windowDiv.appendChild(u);
    var E = document.createElement("area");
    E.setAttribute("shape", "poly");
    E.setAttribute("coords", "");
    E.setAttribute("href", "");
    E.onclick = _NoAction;
    E.onmousedown = this.onmousedown;
    u.appendChild(E);
    for (var a = 0; a < 10; a++) {
        var E = document.createElement("area");
        E.setAttribute("shape", "poly");
        E.setAttribute("coords", "");
        E.setAttribute("href", "PolylineDrawer");
        E.onclick = _NoAction;
        u.appendChild(E)
    }
    this.maskPng = divCreator.create(_TransparentImageUrl, 0, 0, 0, 0, 0, false);
    this.windowDiv.appendChild(this.maskPng);
    this.maskPng.setAttribute("usemap", "#" + this.maskMapId);
    this.nextMaskArea = 1
};
InfoWind.prototype.addAreaToMaskMap = function (ue, Ag) {
    if (this.hasMask()) {
        var u = this.getMaskMap();
        if (this.nextMaskArea < u.childNodes.length) {
            var E = u.childNodes[this.nextMaskArea];
            E.setAttribute("coords", ue.join(","));
            E.onmousedown = Ag;
            this.nextMaskArea++
        }
    }
};
InfoWind.prototype.clearMaskMap = function () {
    if (this.hasMask()) {
        var u = this.getMaskMap();
        for (var a = 1; a < u.childNodes.length; a++) {
            var E = u.childNodes[a];
            E.setAttribute("coords", "");
            E.onmousedown = null
        }
        this.nextMaskArea = 1
    }
};
InfoWind.prototype.getMaskLeft = function () {
    return this.windowDiv.offsetLeft
};
InfoWind.prototype.getMaskTop = function () {
    return this.windowDiv.offsetTop
};
InfoWind.prototype.createContentArea = function () {
    var h = null;
    var iOffset = 15;
    h = window.document.createElement("DIV");
    h.style.position = "absolute";
    h.style.left = convert2Px(iOffset);
    h.style.top = convert2Px(iOffset);
    h.style.zIndex = 0;
    h.id = "contentArea";
    setCursor(h, "auto");
    h.onmousedown = this.onMouseDown;
    this.windowDiv.appendChild(h);
    this.contentArea = h;
    this.contentArea.onmousedown = this.onMouseDown;
    h = window.document.createElement("DIV");
    h.style.position = "absolute";
    h.style.left = convert2Px(-screen.width);
    h.style.top = convert2Px(-screen.height);
    h.style.width = convert2Px(screen.width);
    h.style.height = convert2Px(screen.height);
    h.style.visibility = "hidden";
    this.offscreenContainer = h;
    window.document.body.appendChild(h);
    h.id = "offscreenContainer";
    h = window.document.createElement("DIV");
    h.style.position = "absolute";
    h.style.left = convert2Px(iOffset);
    h.style.top = convert2Px(iOffset);
    h.style.zIndex = 0;
    setCursor(h, "auto");
    this.offscreenArea = h;
    h.id = "offscreenArea";
    this.offscreenArea.onmousedown = this.onMouseDown;
    this.offscreenContainer.appendChild(this.offscreenArea)
};
InfoWind.prototype.prepareOffscreen = function (voidFunc) {
    if (this.windowDiv.style.display == "none") {
        this.windowDiv.style.display = "";
        this.shadowDiv.style.display = "";
        this.windowDiv.style.visibility = "hidden";
        this.shadowDiv.style.visibility = "hidden";
        this.contentArea.style.visibility = "hidden";
        this.offscreenArea.style.visibility = "hidden"
    }
    if (voidFunc) {
        this.offscreenContainer.style.width = convert2Px(voidFunc)
    }
};
InfoWind.prototype.clearOffscreenArea = function () {
    RemoveChildren(this.offscreenArea)
};
InfoWind.prototype.flipOffscreenAndSize = function () {
    var k = Math.max(this.offscreenArea.offsetWidth, 200);
    var m = Math.max(this.offscreenArea.offsetHeight, 85);
    this.flipOffscreenArea(k, m);
    this.setContentSize(k + 15, m)
};
InfoWind.prototype.sizeToContent = function () {
    EzLog.write("Offset width: " + this.contentArea.offsetWidth);
    EzLog.write("Offset height: " + this.contentArea.offsetHeight);
    this.setContentSize(Math.max(this.contentArea.offsetWidth, 183), this.contentArea.offsetHeight)
};
InfoWind.prototype.flipOffscreenArea = function (width, height) {
    this.offscreenContainer.removeChild(this.offscreenArea);
    this.windowDiv.removeChild(this.contentArea);
    var he = this.offscreenArea;
    this.offscreenArea = this.contentArea;
    this.contentArea = he;
    this.offscreenContainer.appendChild(this.offscreenArea);
    this.windowDiv.appendChild(this.contentArea);
    if (width && height) {
        this.contentArea.style.width = convert2Px(width);
        this.contentArea.style.height = convert2Px(height)
    }
    this.offscreenArea.style.width = "auto";
    this.offscreenArea.style.height = "auto";
    this.offscreenArea.style.visibility = "visible";
    this.clearOffscreenArea();
};
InfoWind.prototype.onMouseDown = function (b) {
    if (_IEBrowser.type == 1) {
        window.event.cancelBubble = true
    } else {
        b.cancelDrag = true
    }
};
InfoWind.prototype.createCloseButton = function () {
    this.closeButton = Shaderer.create(Di, 14, 13, null, null, 4, null, null);
    this.closeButton.style.position = "absolute";
    setCursor(this.closeButton, "pointer");
    this.closeButton.onmousedown = this.eventHandler("onCloseMouseDown");
    this.windowDiv.appendChild(this.closeButton)
};
InfoWind.prototype.onCloseMouseDown = function (b) {
    S(b);
    if (this.oncloseclick) {
        this.oncloseclick(b)
    }
};
var AnchorPoint = new Point(0, 0);
var _PixelsPerDegree = new Array();
var sa;
for (sa = 0; sa < _m_MapSpan.length; sa++) {
    _PixelsPerDegree.push(new Point(_m_MapSpan[sa], _m_MapSpan[sa]))
}
var m_MapMBRs = new Array();
for (sa = 0; sa <= 16; sa++) {
    m_MapMBRs.push(new MBR(-_MaxNumber, -_MaxNumber, _MaxNumber, _MaxNumber))
}
function MapUnit(Me) {
    this.tileSize = _MapUnitPixels;
    this.backgroundColor = "#f2efe9";
    this.bIsOverlay = false;
    this.emptyTileURL = _TransparentImageUrl;
    this.baseURLArr = _MapServiceArr;
    this.basePara = "Service=getImage&Type=RGB";
    if (_ZoomOffset) {
        this.basePara += "&ZoomOffset=" + _ZoomOffset;
    }
    if (_MaxLevel) {
        this.numZoomLevels = _MaxLevel + 1;
    } else {
        this.numZoomLevels = _PixelsPerDegree.length;
    }
    if (Me) {
        this.baseURL = Me;
    } else {
        this.setMapURL(_VectorMapService);
    }
};
MapUnit.prototype.setMapURL = function (pMapServlet) {
    this.mapServiceArr = pMapServlet;
    if (window._tv && window._tv.length > 0) {
    }
};
MapUnit.prototype.setOverlayURL = function (pMapServlet) {
    this.overlayServiceArr = pMapServlet;
};
MapUnit.prototype.hasOverlay = function () {
    return this.bIsOverlay;
};
var _MapUnit = new MapUnit();
MapUnit.prototype.getBitmapCoordinate = function (lat, lon, iLevel, e) {
    if (!e) e = new Point(0, 0);
    var x = lon - AnchorPoint.x;
    var y = lat - AnchorPoint.y;
    e.x = Math.floor(x * _PixelsPerDegree[iLevel].x);
    e.y = Math.floor(y * _PixelsPerDegree[iLevel].y);
    return e
};
MapUnit.prototype.getLatLng = function (x, y, iLevel, e) {
    if (!e) e = new Point(0, 0);
    x /= _PixelsPerDegree[iLevel].x;
    y /= _PixelsPerDegree[iLevel].y;
    e.x = x + AnchorPoint.x;
    e.y = y + AnchorPoint.y;
    return e
};
MapUnit.prototype.getTileCoordinate = function (lat, lon, iLevel, e) {
    var Jc = this.getBitmapCoordinate(lat, lon, iLevel, e);
    Jc.x = Math.floor(Jc.x / this.tileSize);
    Jc.y = Math.floor(Jc.y / this.tileSize);
    return Jc
};
g_index = 0;
MapUnit.prototype.getTileURL = function (x, y, iLevel) {
    y = y - 1;
    if (x < m_MapMBRs[iLevel].minX || (x > m_MapMBRs[iLevel].maxX || (y < m_MapMBRs[iLevel].minY || y > m_MapMBRs[iLevel].maxY))) {
        return _TransparentImageUrl;
    }
    var iIndex = (x + y) % this.mapServiceArr.length;
    var strServer = this.mapServiceArr[iIndex];
    var strPara = this.basePara + "&Col=" + x + "&Row=" + y + "&Zoom=" + iLevel + "&V=" + _Ver;
    var srcURL = strServer + "/EzMap?";
    srcURL += strPara;
    if (_bMapProx && g_prox_calss != null) {
        srcURL = g_prox_calss + "?request=gotourl&url=" + encodeURIComponent(srcURL);
    }
    return srcURL;
};
MapUnit.prototype.getOverlayURL = function (x, y, iLevel) {
    y = y - 1;
    if (x < m_MapMBRs[iLevel].minX || (x > m_MapMBRs[iLevel].maxX || (y < m_MapMBRs[iLevel].minY || y > m_MapMBRs[iLevel].maxY))) {
        return _TransparentImageUrl;
    }
    var iIndex = (x + y) % this.overlayServiceArr.length;
    var strServer = this.overlayServiceArr[iIndex];
    var strPara = this.basePara + "&Col=" + x + "&Row=" + y + "&Zoom=" + iLevel + "&V=" + _Ver;
    var srcURL = strServer + "/EzMap?";
    srcURL += strPara;
    if (_bMapProx && g_prox_calss != null) {
        srcURL = g_prox_calss + "?request=gotourl&url=" + encodeURIComponent(srcURL);
    }
    return srcURL;
};
MapUnit.prototype.getLowestZoomLevel = function (If, Le, Te) {
    Le += 4;
    Te += 4;
    for (var a = 0; a < _PixelsPerDegree.length; a++) {
        if (_PixelsPerDegree[a].x * If.width <= Le && _PixelsPerDegree[a].y * If.height <= Te) {
            return a
        }
    }
    return _PixelsPerDegree.length - 1
};
MapUnit.prototype.getPixelsPerDegree = function (iLevel) {
    return _PixelsPerDegree[iLevel]
};
MapUnit.prototype.getLinkText = function () {
    return _mNormalMap
};
MapUnit.prototype.getURLArg = function () {
    return null;
};
var _Point = Point;
var _Map = MainFrame;
var _IconClass = Icon;
var _XMLHttp = XMLHttp;
var _MapsApplication = MapsApp;
var EzMap = MapsApp;
var _Timer = Timer;
var _Log = EzLog;
function WriteMsg(strMsg) {
    if (typeof _bIsWriteFile == "undefined" || !_bIsWriteFile) return;
    var fso, f, r;
    var ForWriting = 2,
        ForAppending = 8;
    try {
        fso = new ActiveXObject("Scripting.FileSystemObject");
        f = fso.OpenTextFile("c:\\scriptlog.txt", ForAppending, true);
        f.WriteLine(strMsg);
        f.Close();
        if (fso != null) delete fso;
    } catch (e) {
    }
};
function EzLog() {
};
EzLog.bLog = true;
EzLog.write = function (msg, user, ip) {
    if (EzLog.bLog == false || g_prox_calss == null) return;
    window.status = "记录日记....";
    var pDate = new Date();
    var strurl = g_prox_calss + "?request=writemsg&msg=" + msg + "&time=" + pDate.getTime();
    getDataFromServer("log", strurl,
        function () {
            window.status = "记录日记....成功"
        });
};
EzLog.writeRaw = function (Id) {
};
EzLog.writeXML = function (Id) {
};
EzLog.dump = function (bj) {
};
EzLog.incompatible = function () {
};
EzLog.clear = function () {
};
_debugWin = null;
EzLog.print = function (strInfo) {
    if (_debugWin == null) {
        var strPro = "width=200,height=400";
        strPro = strPro + ",menubar=yes,scrollbars=yes,resizable=no,location=no, status=no";
        _debugWin = window.open("", 'default', strPro);
        _debugWin.document.writeln("<html><head><title>地图打印</title><script>function unload(){opener._debugWin=null;}</script></head><body onbeforeunload='unload()'></body></html>");
    }
    _debugWin.document.body.innerHTML += "<br>" + strInfo;
};
function Timer() {
};
Timer.start = function () {
};
Timer.end = function () {
};
Timer.addTime = function (Yi) {
};
var Jg = false;
var pMapUnits = new Array(_MapUnit);
for (var iIndex = 0; iIndex < pMapUnits.length; iIndex++) {
    var pMapUnitArg = pMapUnits[iIndex].getURLArg();
    if (pMapUnitArg) pMapUnits[pMapUnitArg] = pMapUnits[iIndex]
}
var g_next_id = 0;
function MapsApp(Nh, wh, mg, dh, rg) {
    this.map = null;
    this.mapContainer = Nh;
    this.panel = wh;
    this.metaPanel = mg;
    this.permalink = dh;
    this.specToggleArea = rg;
    this.overViewID = "OverViewMap" + g_next_id;
    g_next_id++;
    this.overViewPanelID = "OverViewMapPanel";
    BindingEvent(this.mapContainer, "resize", this.eventHandler("resizeMapView"));
    BindingEvent(window, "resize", this.eventHandler("resizeMapView"));
    BindingEvent(window, "beforeprint", this.eventHandler("beforePrint"));
    BindingEvent(window, "afterprint", this.eventHandler("afterPrint"));
    if (_IEBrowser.type == 4) {
        document.body.style.overflow = "hidden";
        this.panel.style.overflow = "auto"
    }
    this.loadMap(null);
    this.resizeMapView();
    this.queryNum = 0;
    this.mapContainer.style.overflow = "hidden";
    var pMe = this;
    window.hideOverView = function () {
        pMe.hideOverView();
    };
    window.onscroll = function () {
    };
    _m_MapApp = this;
    var pMe = this;
    window.getMap = function () {
        return pMe.map;
    };
    window.getMapApp = function () {
        return pMe;
    }
};
MapsApp.prototype.beforePrint = function () {
    var fg = this.mapContainer.offsetWidth / window.screen.logicalXDPI;
    var Yd = 7;
    var Hf = this.mapContainer.offsetHeight / window.screen.logicalYDPI;
    var Lc = 8;
    if (this.vpage) {
        Lc = 7;
        if (this.vpage.directions) {
            Lc = 3.5
        } else if (this.vpage.overlays.length > 0 && this.vpage.overlays[0].locations.length > 1) {
            Lc = 4.5
        }
    }
    var Z = Yd / fg;
    if (Hf * Z > Lc) {
        Z = Lc / Hf
    }
    var pf = fg * Z;
    if (pf < Yd) {
        var wi = Math.floor(pf / Yd * 100);
        this.mapContainer.style.width = wi + "%"
    } else {
        this.mapContainer.style.width = "100%"
    }
    this.mapContainer.style.zoom = Z;
    if (document.body.style.overflow == "hidden") {
    }
};
MapsApp.prototype.afterPrint = function () {
    this.mapContainer.style.zoom = 1;
    this.mapContainer.style.width = "auto";
    this.resizeMapView()
};
MapsApp.prototype.centerAndZoom = function (pPoint, iZoom) {
    this.map.centerAndZoom(pPoint, iZoom);
};
MapsApp.prototype.isLoaded = function () {
    return this.map.isLoaded();
};
MapsApp.prototype.zoomTo = function (iLevel) {
    this.map.zoomTo(iLevel);
};
MapsApp.prototype.loadMap = function (De) {
    var ea = null;
    if (De) {
        ea = pMapUnits[De]
    }
    if (!ea) {
        ea = pMapUnits[0]
    }
    this.map = new MainFrame(this.mapContainer, ea, null, null, false, false, pMapUnits);
    this.map.showCopyright();
    this.map.showMapScale();
    this.map.showMapServerControl();
    this.map.enableDblClick();
    this.map.enableMouseScroll();
    this.map.bIsLog = true;
    this.map.container.focus();
    var pMe = this;
    BindingEvent(this.map.container, "mousemove", this.map.eventHandler("displayCoord"));
    this.map.registerKeyHandlers(this.map.container);
    if (pMapUnits.length > 1) {
        this.map.createSpecToggleLinks(this.specToggleArea)
    }
};
MapsApp.prototype.onMapStateChanged = function () {
    try {
        if (this.vpageDoc) {
            var G = this.map.getCenterLatLng();
            this.vpageDoc.getElementById(se).value = G.y;
            this.vpageDoc.getElementById(te).value = G.x;
            this.vpageDoc.getElementById("zoom").value = this.map.zoomLevel
        }
        var ca = this.getPageURL();
        this.permalink.href = ca
    } catch (b) {
        EzLog.dump(b)
    }
};
MapsApp.prototype.resizeMapView = function () {
    var ki = this.getWindowSize();
    var wf = ObjectOffset(this.mapContainer);
    var Gf = ki.height - wf.y - 10;
    var mi = ObjectOffset(this.panel);
    var Kh = Gf - (mi.y - wf.y);
    if (typeof _ResizeMap != "undefined" && _ResizeMap == true) {
        this.mapContainer.style.height = convert2Px(Gf);
        alert("height...");
    }
    if (document.body.style.overflow == "hidden") {
    }
    if (this.map) {
        this.map.onResize();
        this.map.containOffset = wf;
    }
};
MapsApp.prototype.fullExtent = function () {
    this.map.fullExtent();
};
MapsApp.prototype.centerAtMBR = function (dInMinX, dInMinY, dInMaxX, dInMaxY) {
    if (arguments.length == 1 && dInMinX instanceof MBR) {
        var pMBR = dInMinX;
        this.map.centerAtMBR(pMBR.minX, pMBR.minY, pMBR.maxX, pMBR.maxY);
    } else if (arguments.length == 4) {
        this.map.centerAtMBR(dInMinX, dInMinY, dInMaxX, dInMaxY);
    } else {
        alert("参数无效");
    }
};
MapsApp.prototype.getDragMode = function () {
    if (typeof this.map.drawMode == "undefined" || this.map.drawMode == null) this.map.drawMode = "pan";
    return this.map.drawMode;
};
MapsApp.prototype.changeDragMode = function (mode, inputPanel, inputPanel2, callback) {
    this.map.changeDragMode(mode, inputPanel, inputPanel2, callback);
};
MainFrame.prototype.changeDragMode = function (mode, inputPanel, inputPanel2, callback) {
    var pMap = this;
    pMap.bIsPan = true;
    if (inputPanel) {
        pMap.outputPanel = inputPanel;
    } else {
        pMap.outputPanel = new EzPointStr();
    }
    if (pMap.buttonTip != null) pMap.buttonTip.style.display = "none";
    var pMouseDownhander = null;
    if (inputPanel2) {
        pMap.outputPanel2 = inputPanel2;
    } else {
        pMap.outputPanel2 = null;
    }
    if (pMap.vmlDraw != null && mode != "pan") {
        this.removeOverlay(pMap.vmlDraw);
        pMap.vmlDraw = null;
    }
    if (mode == "measure") {
        this.measureLength();
        return;
    } else if (mode == "pan") {
        pMap.container.style.cursor = "move";
        pMap.dragObject.ondrag = pMap.eventHandler("onDrag");
        pMap.dragObject.ondragstart = pMap.eventHandler("onDragStart");
        pMap.dragObject.ondragend = pMap.eventHandler("onDragEnd");
        pMouseDownhander = pMap.dragObject.eventHandler("onMouseDown");
        if (pMap.dragObject.mouseMoveHandler) {
            unbindingEvent(pMap.dragObject.src, "mousemove", pMap.dragObject.mouseMoveHandler);
        }
        pMap.dragObject.mouseMoveHandler = pMap.dragObject.eventHandler("onMouseMove");
    } else if (mode == "drawRect" || mode == "drawCircle" || mode == "zoomInExt" || mode == "zoomOutExt") {
        if (mode == "drawRect" || mode == "drawCircle") {
            pMap.container.style.cursor = "default";
        } else {
            mode = "drawRect";
            pMap.bIsPan = false;
        }
        pMap.dragObject.ondragstart = pMap.eventHandler("drawStart");
        pMap.dragObject.ondragend = pMap.eventHandler("drawEnd");
        if (pMap.dragObject.mouseMoveHandler) unbindingEvent(pMap.dragObject.src, "mousemove", pMap.dragObject.mouseMoveHandler);
        pMap.dragObject.mouseMoveHandler = pMap.eventHandler("drawMove");
        BindingEvent(pMap.dragObject.src, "mousemove", pMap.dragObject.mouseMoveHandler);
        pMouseDownhander = pMap.dragObject.eventHandler("onMouseDown");
    } else if (mode == "drawPolyline" || mode == "drawPolygon") {
        pMap.container.style.cursor = "crosshair";
        pMap.dragObject.ondragstart = null;
        pMap.dragObject.ondragend = null;
        pMap.dragObject.mouseMoveHandler = null;
        pMouseDownhander = pMap.eventHandler("drawMouseDown");
        if (pMap.dragObject.mouseMoveHandler) unbindingEvent(pMap.dragObject.src, "mousemove", pMap.dragObject.mouseMoveHandler);
        pMap.dragObject.mouseMoveHandler = pMap.eventHandler("drawMove");
        BindingEvent(pMap.dragObject.src, "mousemove", pMap.dragObject.mouseMoveHandler);
    } else if (mode == "drawPoint") {
        pMap.container.style.cursor = "crosshair";
        pMap.dragObject.ondragstart = null;
        pMap.dragObject.ondragend = null;
        pMap.dragObject.mouseMoveHandler = null;
        pMouseDownhander = pMap.eventHandler("drawMouseDown");
    }
    if (pMap.dragObject.mouseDownHandler) unbindingEvent(pMap.dragObject.src, "mousedown", pMap.dragObject.mouseDownHandler);
    pMap.dragObject.mouseDownHandler = pMouseDownhander;
    BindingEvent(pMap.dragObject.src, "mousedown", pMap.dragObject.mouseDownHandler);
    pMap.drawMode = mode;
    if (mode != "pan") {
        _callback = callback;
        pMap.dragObject.bIsPan = false;
    } else {
        pMap.dragObject.bIsPan = true;
    }
    this.setTimeout("this.container.focus()", 100);
};
MapsApp.prototype.zoomIn = function () {
    this.map.zoomTo(this.map.zoomLevel - 1);
};
function EzPointStr() {
    this.value = "";
};
EzPointStr.prototype.toString = function () {
    return this.value;
};
MapsApp.prototype.zoomInExt = function () {
    this.map.container.style.cursor = _ZoomInURL;
    this.changeDragMode('zoomInExt', null, null, this.eventHandler("zoomInMBR"));
};
MapsApp.prototype.zoomOut = function () {
    this.map.zoomTo(this.map.zoomLevel + 1);
};
MapsApp.prototype.zoomOutExt = function () {
    this.map.container.style.cursor = _ZoomOutURL;
    this.changeDragMode('zoomOutExt', null, null, this.eventHandler("zoomOutMBR"));
};
MapsApp.prototype.zoomInMBR = function () {
    if (!this.map.vmlDraw) return;
    var pMBR = this.map.vmlDraw.getMBR();
    pMBR = MBR.intersection(pMBR, this.getBoundsLatLng());
    var dSpan = this.map.getPixelSpan();
    if (pMBR.getSpanX() < 2 * dSpan || pMBR.getSpanY() < 2 * dSpan) {
        var pPoint = pMBR.getCenterPoint();
        var iZoom = Math.max(0, this.map.zoomLevel - 1);
        this.centerAndZoom(pPoint, iZoom);
        return;
    }
    this.centerAtMBR(pMBR);
    this.removeOverlay(this.map.vmlDraw);
    this.map.vmlDraw = null;
};
MapsApp.prototype.zoomOutMBR = function () {
    if (!this.map.vmlDraw) return;
    var pMBR = this.map.vmlDraw.getMBR();
    var pMapMBR = this.getBoundsLatLng();
    var dSpan = this.map.getPixelSpan();
    if (pMBR.getSpanX() < 2 * dSpan || pMBR.getSpanY() < 2 * dSpan) {
        var pPoint = pMBR.getCenterPoint();
        var iZoom = Math.min(_MaxLevel, this.map.zoomLevel + 1);
        this.centerAndZoom(pPoint, iZoom);
        return;
    }
    pMBR = MBR.intersection(pMBR, pMapMBR);
    var dXScale = pMapMBR.getSpanX() / pMBR.getSpanX();
    var dYScale = pMapMBR.getSpanY() / pMBR.getSpanY();
    var dScale = Math.max(dYScale, dXScale);
    pMBR.scale(dScale * dScale);
    this.centerAtMBR(pMBR);
    this.removeOverlay(this.map.vmlDraw);
    this.map.vmlDraw = null;
};
MapsApp.prototype.pan = function (x, y) {
    if (arguments.length < 2) {
        this.changeDragMode("pan");
    } else {
        this.map.pan(x, y);
    }
};
MapsApp.prototype.getSpanLatLng = function () {
    return this.map.getSpanLatLng();
};
MapsApp.prototype.showMapControl = function (strPos) {
    this.map.showMapControl(strPos);
};
MapsApp.prototype.hideMapControl = function () {
    this.map.hideMapControl();
};
MainFrame.prototype.measureLength = function () {
    this.container.style.cursor = "crosshair";
    var pMe = this;

    function measureLength_getLength() {
        if (!pMe.vmlDraw) return;
        iLength = pMe.vmlDraw.getLength();
        iLength = Math.ceil(iLength);
        var strLength = "";
        if (iLength > 1000) {
            iLength = iLength / 1000;
            strLength = iLength + "公里";
        } else {
            strLength = iLength + "米";
        }
        alert("距离总长:" + strLength);
    };
    this.changeDragMode('drawPolyline', null, null, measureLength_getLength);
};
MapsApp.prototype.measureLength = function () {
    this.map.measureLength();
};
MainFrame.prototype.measureArea = function () {
    this.container.style.cursor = "crosshair";
    var pMe = this;

    function measureArea_getArea() {
        if (!pMe.vmlDraw) return;
        var dArea = pMe.vmlDraw.getArea();
        dArea = Math.ceil(dArea);
        var strArea = "";
        if (dArea > 1000000) {
            dArea = dArea / 1000000;
            strArea = dArea + "平方公里";
        } else {
            strArea = dArea + "平方米";
        }
        alert("总面积为:" + strArea);
    };
    this.changeDragMode('drawPolygon', null, null, measureArea_getArea);
};
MapsApp.prototype.measureArea = function () {
    this.map.measureArea();
};
MapsApp.prototype.centerAtPoint = function (pPoint) {
    this.map.centerAtLatLng(pPoint);
};
MapsApp.prototype.centerAtLatLng = function (x, y) {
    var pPoint = null;
    if (x instanceof Point) {
        pPoint = x;
    } else {
        pPoint = new Point(x, y);
    }
    this.map.centerAtLatLng(pPoint);
    pPoint = null;
};
MapsApp.prototype.getLevelOfMBR = function (dInMinX, dInMinY, dInMaxX, dInMaxY) {
    return this.map.getLevelOfMBR(dInMinX, dInMinY, dInMaxX, dInMaxY);
};
MapsApp.prototype.clearVMLContainer = function () {
    var pMapContainer = this.map;
    pMapContainer.clearVMLContainer();
};
MapsApp.prototype.debug = function () {
    var pContainer = this.map.vmlContainer;
    var pDebugContainer = getEleByID("resultDiv");
    if (pContainer && pDebugContainer) {
        pDebugContainer.innerText = this.map.vmlContainer.groupObj.outerHTML;
    }
};
MapsApp.prototype.getWindowSize = function (e) {
    if (!e) e = new Rect(0, 0);
    if (window.self && self.innerWidth) {
        e.width = self.innerWidth;
        e.height = self.innerHeight;
        return e
    }
    if (document.documentElement && document.documentElement.clientHeight) {
        e.width = document.documentElement.clientWidth;
        e.height = document.documentElement.clientHeight;
        return e
    }
    e.width = document.body.clientWidth;
    e.height = document.body.clientHeight;
    return e
};
MapsApp.prototype.addOverlay = function (ta, bDisRemove) {
    this.map.addOverlay(ta, bDisRemove);
};
MapsApp.prototype.removeOverlay = function (ta, bEnableRemove) {
    this.map.removeOverlay(ta, bEnableRemove);
};
MapsApp.prototype.clearOverlays = function (bForcedRemove) {
    this.map.clearOverlays(bForcedRemove);
};
MapsApp.prototype.clear = function (bForcedRemove) {
    this.clearOverlays(bForcedRemove);
    this.clearVMLContainer();
};
MapsApp.prototype.getOverlays = function () {
    return this.map.overlays;
};
MapsApp.prototype.openInfoWindow = function (pPoint, html) {
    this.map.openInfoWindow(pPoint.x, pPoint.y, html);
};
MapsApp.prototype.getCenterLatLng = function () {
    var pPoint = this.map.getCenterLatLng();
    return pPoint;
};
MapsApp.prototype.getZoomLevel = function () {
    return this.map.zoomLevel;
};
MapsApp.prototype.getMaxLevel = function () {
    return _MaxLevel;
};
MapsApp.prototype.centerAndZoomToBorder = function (strPath) {
    this.map.centerAndZoomToBorder(strPath);
};
_printWin = null;
_curMap = null;
MapsApp.prototype.printMap = function (urlCSS, strTitle, strBottom) {
    if (_printWin != null) {
        try {
            _printWin.close();
        } catch (e) {
        }
    }
    _curMap = this;
    var iHeight = this.map.viewSize.height;
    var iWidth = this.map.viewSize.width;
    var strPro = "width=" + iWidth + "px,height=" + (iHeight - 18) + "px";
    strPro = strPro + ",menubar=yes,scrollbars=yes,resizable=no,location=no, status=no";
    _printWin = window.open("", 'default', strPro);
    if (!strTitle) strTitle = "地图页眉";
    if (!strBottom) strBottom = "地图页脚";
    var strScript = m_EzServer + "/css/print.js";
    if (_printWin != null) {
        _printWin.document.writeln("<html xmlns:v = 'urn:schemeas-microsoft-com:vml'><head>");
        _printWin.document.writeln('<meta http-equiv="content-type" content="text/html; charset=GBK"/>');
        _printWin.document.writeln("<title>地图打印</title>");
        _printWin.document.writeln('<script>window.onbeforeunload=function(){opener._printWin=null;	}</script>');
        _printWin.document.writeln('<style type="text/css">');
        _printWin.document.writeln('body {margin: 0px}.noprint{	display:none;}v\\:* {BEHAVIOR: url(#default#VML)}');
        _printWin.document.writeln('</style>');
        _printWin.document.writeln('</head>');
        _printWin.document.writeln('<body style="width:' + iWidth + 'px;height:' + iHeight + 'px">');
        if (urlCSS) _printWin.document.writeln('<input class=printtitle name="printtitle" id="printtitle" type="text" value="' + strTitle + '">');
        _printWin.document.writeln('<div id="EzMaps_Container" style="overflow:hidden;width:' + iWidth + 'px;height:' + iHeight + 'px;">');
        _printWin.document.writeln(this.map.container.innerHTML);
        _printWin.document.writeln('</div>');
        if (urlCSS) _printWin.document.writeln('<input class=printbottom name="printbottom" id="printbottom" type="text" value="' + strBottom + '">');
        _printWin.document.writeln('</body>');
        _printWin.document.writeln('</html>');
        if (urlCSS) {
            _printWin.document.charset = "GB2312";
            _printWin.document.createStyleSheet(urlCSS);
            _printWin.document.writeln('<script src="' + strScript + '" charset="GBK" ></script>');
        }
        _printWin.focus();
    }
};
MapsApp.prototype.print = MapsApp.prototype.printMap;
MapsApp.prototype.printMapExt = function () {
    if (_printWin != null) {
        try {
            _printWin.close();
        } catch (e) {
        }
    }
    var strPro = "width=" + this.map.viewSize.width + ",height=" + this.map.viewSize.height;
    strPro = strPro + ",menubar=yes,scrollbars=no,resizable=no,location=no, status=no";
    _printWin = window.open("printMap.htm", 'placeholder', strPro);
    _printWin.focus();
};
MapsApp.prototype.saveMap = function () {
    if (_printWin != null) {
        try {
            _printWin.close();
        } catch (e) {
        }
    }
    var strPro = "width=" + this.map.viewSize.width + ",height=" + this.map.viewSize.height;
    strPro = strPro + ",menubar=yes,scrollbars=no,resizable=no,location=no, status=no";
    _printWin = window.open('', 'placeholder', strPro);
    var pMBR = this.getBoundsLatLng();
    var iLevel = this.getZoomLevel() + _ZoomOffset;
    var imgSrc = _MapServiceArr[0] + "/EzMap?Service=getRectImg&minx=" + pMBR.minX + "&miny=" + pMBR.minY + "&maxx=" + pMBR.maxX + "&maxy=" + pMBR.maxY + "&zoom=" + iLevel;
    var strHTML = "<html><head><title>保存地图</title></head><body><img src='" + imgSrc + "' style='width:100%;height:100%'></body></html>";
    _printWin.document.write(strHTML);
    _printWin.focus();
};
MapsApp.prototype.downloadMap = function (minx, miny, maxx, maxy, iLevel, format) {
    if (_printWin != null) {
        _printWin.close();
    }
    var pMBR = this.getBoundsLatLng();
    if (!minx) minx = pMBR.minX;
    if (!miny) miny = pMBR.minY;
    if (!maxx) maxx = pMBR.maxX;
    if (!maxy) maxy = pMBR.maxY;
    if (!format) {
        format = "stream";
    }
    if (typeof iLevel == "undefined") iLevel = this.getZoomLevel() + _ZoomOffset;
    var strPro = "width=" + this.map.viewSize.width + ",height=" + this.map.viewSize.height;
    strPro = strPro + ",menubar=yes,scrollbars=no,resizable=no,location=no, status=no";
    var imgSrc = _MapServiceArr[0] + "/EzMap?Service=getRectImg&result=" + format + "&minx=" + minx + "&miny=" + miny + "&maxx=" + maxx + "&maxy=" + maxy + "&zoom=" + iLevel;
    _printWin = window.open(imgSrc, 'placeholder', strPro);
    _printWin.focus();
};
MapsApp.prototype.getMap = function (minx, miny, maxx, maxy, iWidth, iHeight) {
    if (_printWin != null) {
        _printWin.close();
    }
    if (!iWidth) iWidth = this.map.viewSize.width;
    if (!iHeight) iHeight = this.map.viewSize.height;
    iWidth = Math.ceil(iWidth);
    iHeight = Math.ceil(iHeight);
    var pMBR = this.getBoundsLatLng();
    if (!minx) minx = pMBR.minX;
    if (!miny) miny = pMBR.minY;
    if (!maxx) maxx = pMBR.maxX;
    if (!maxy) maxy = pMBR.maxY;
    var strPro = "width=" + iWidth + ",height=" + iHeight;
    strPro = strPro + ",menubar=yes,scrollbars=no,resizable=no,location=no, status=no";
    var imgSrc = _MapServiceArr[0] + "/EzMap?Service=getRectImg&minx=" + minx + "&miny=" + miny + "&maxx=" + maxx + "&maxy=" + maxy + "&width=" + iWidth + "&height=" + iHeight;
    alert(imgSrc);
    _printWin = window.open(imgSrc, 'placeholder', strPro);
    _printWin.focus();
};
MapsApp.prototype.gotoCenter = function () {
    this.map.gotoCenter();
};
MapsApp.prototype.recenterOrPanToLatLng = function (j) {
    this.map.recenterOrPanToLatLng(j);
};
MapsApp.prototype.getBoundsLatLng = function (e) {
    return this.map.getBoundsLatLng();
};
MapsApp.prototype.addMapChangeListener = function (func) {
    this.map.addStateListener(func);
};
MapsApp.prototype.removeMapChangeListener = function (func) {
    var pListeners = this.map.stateListeners;
    if (pListeners) {
        var b = [];
        for (var c = 0; c < pListeners.length; c++) {
            if (pListeners[c] != func) {
                b.push(pListeners[c]);
            }
        }
        if (pListeners.length != b.length) {
            this.map.stateListeners = b;
        }
    }
};
MapsApp.prototype.addOverViewPanel = function (pOverview) {
    var pOverviewPanel = document.createElement("div");
    pOverviewPanel.id = this.overViewPanelID;
    pOverviewPanel.style.backgroundColor = "white";
    pOverviewPanel.style.borderTop = "  #979797 1px solid";
    pOverviewPanel.style.borderLeft = "  #979797 1px solid";
    pOverviewPanel.style.right = convert2Px(0);
    pOverviewPanel.style.bottom = convert2Px(-1);
    var iWidth = 250;
    var iHeight = 200;
    if (pOverview) {
        iWidth = pOverview.width;
        iHeight = pOverview.height;
    }
    pOverviewPanel.style.height = convert2Px(iHeight);
    pOverviewPanel.style.width = convert2Px(iWidth);
    pOverviewPanel.style.zIndex = 10000;
    pOverviewPanel.style.position = "absolute";
    pOverviewPanel.style.visibility = "hidden";
    this.overviewPanel = pOverviewPanel;
    var pOverView = document.createElement("div");
    pOverView.id = this.overViewID;
    pOverView.style.display = "";
    pOverView.style.borderTop = "  #979797 1px solid";
    pOverView.style.borderLeft = "  #979797 1px solid";
    pOverView.style.position = "absolute";
    pOverView.style.right = convert2Px(-1);
    pOverView.style.bottom = convert2Px(-1);
    pOverView.style.height = convert2Px(iHeight - 5);
    pOverView.style.width = convert2Px(iWidth - 5);
    pOverView.style.cursor = "default";
    pOverviewPanel.appendChild(pOverView);
    this.mapContainer.appendChild(pOverviewPanel);
    return pOverView;
};
MapsApp.prototype.addOverView = function (pOverViewObj) {
    this.overViewConf = pOverViewObj;
    var pOverView = document.getElementById(this.overViewID);
    if (pOverView) {
        return;
    } else {
        pOverView = this.addOverViewPanel(this.overViewConf);
    }
    this.overViewMap = new MainFrame(pOverView);
    this.map.name = _mapName;
    this.overViewMap.name = "鹰眼";
    var iZoom = Math.min(this.map.zoomLevel + 6, _MaxLevel);
    this.overViewMap.zoomTo(iZoom);
    var pMe = this;
    window.AsynUpdateOverview = function () {
        this.setTimeout("updateOverview()", 10);
    };
    window.updateOverview = function () {
        var pPoint = pMe.map.getCenterLatLng();
        pMe.overViewMap.recenterOrPanToLatLng(pPoint);
        var iZoom = Math.min(pMe.map.zoomLevel + 4, _MaxLevel);
        if (pMe.overViewConf != null) {
            iZoom = Math.min(pMe.overViewConf.maxLevel, pMe.map.zoomLevel + 4);
            iZoom = Math.max(pMe.overViewConf.minLevel, iZoom);
        }
        iZoom = Math.min(iZoom, _MaxLevel);
        pMe.overViewMap.zoomTo(iZoom);
        pMe.overViewMap.clearOverlays();
        var pMBR = pMe.map.getBoundsLatLng();
        var pOverViewMBR = pMe.overViewMap.getBoundsLatLng();
        if (!pMBR.containsBounds(pOverViewMBR)) {
            var pPoints = pMBR.toString();
            if (pMe.overViewMap.pRectangle) {
                delete pMe.overViewMap.pRectangle;
                delete pMe.OverviewDragObject;
            }
            var pRectangle = new Rectangle(pPoints, "#6666cc", 1, 0.5, "blue");
            pMe.overViewMap.addOverlay(pRectangle);
            var iLeft = parseInt(pRectangle.div.style.left);
            var iTop = parseInt(pRectangle.div.style.top);
            pMe.OverviewRect = pRectangle;
            pMe.OverviewDragObject = new DragEvent(pRectangle.div, iLeft, iTop, pMe.overViewMap.container);
            pMe.OverviewDragObject.ondragend = function () {
                var iLeft = parseInt(pMe.OverviewRect.div.style.left);
                var iTop = parseInt(pMe.OverviewRect.div.style.top);
                var iWidth = parseInt(pMe.OverviewRect.div.style.width);
                var iHeight = parseInt(pMe.OverviewRect.div.style.height);
                var iX = iLeft + iWidth / 2;
                var iY = iTop + iHeight / 2;
                var pCenterPoint = pMe.overViewMap.convert2LonLat(iX, iY);
                pMe.map.recenterOrPanToLatLng(pCenterPoint);
            };
            pMe.overViewMap.pRectangle = pRectangle;
        }
    };
    this.overViewMap.onDragEnd = function () {
        var pPoint = pMe.overViewMap.getCenterLatLng();
        pMe.map.recenterOrPanToLatLng(pPoint);
    };
    this.map.addStateListener(updateOverview);
    updateOverview();
    this.hideOverView();
};
MapsApp.prototype.hideOverView = function () {
    var pOverView = this.overviewPanel;
    if (typeof pOverView != "undefined" && pOverView != null) pOverView.style.visibility = "hidden";
};
MapsApp.prototype.hideCopyright = function () {
    this.map.hideCopyright();
};
MapsApp.prototype.showCopyright = function () {
    this.map.showCopyright()
};
MapsApp.prototype.hideMapServer = function () {
    this.map.hideMapServer();
};
MapsApp.prototype.showMapServer = function () {
    this.map.showMapServer();
};
MapsApp.prototype.hideMapScale = function () {
    this.map.hideMapScale();
};
MapsApp.prototype.showMapScale = function () {
    this.map.showMapScale();
};
MapsApp.prototype.showOverView = function () {
    var pOverView = this.overviewPanel;
    if (typeof pOverView != "undefined" && pOverView != null) {
        pOverView.style.visibility = "visible";
        updateOverview();
    }
};
MapsApp.prototype.reverseOverView = function () {
    var pOverView = this.overviewPanel;
    if (typeof pOverView == "undefined" || pOverView == null) return;
    if (pOverView.style.visibility == "visible") {
        pOverView.style.visibility = "hidden";
    } else {
        pOverView.style.visibility = "visible";
        updateOverview();
    }
};
function voidFunc(aj) {
    return null
};
function createDivText(divID, text) {
    var pDiv = document.createElement("div");
    if (divID) pDiv.id = divID;
    pDiv.style.fontSize = "smaller";
    pDiv.appendChild(document.createTextNode(text));
    return pDiv;
};
function createDivImg(divID, strSrc, width, height) {
    var pDiv = document.createElement("div");
    if (divID) pDiv.id = divID;
    var pImg = createImg(strSrc, "图像");
    if (width) pImg.style.width = width + "px";
    if (height) pImg.style.height = height + "px";
    pDiv.appendChild(pImg);
    return pDiv;
};
function createDiv(divID) {
    var pDiv = document.createElement("div");
    pDiv.style.position = "absolute";
    if (divID) pDiv.id = divID;
    return pDiv;
};
function createImg(strImg, strAlt, iLeft, iTop, strTitle, iSize) {
    var pImg = document.createElement("Img");
    pImg.galleryimg = "no";
    pImg.src = strImg;
    if (!iSize) iSize = 16;
    pImg.style.height = convert2Px(iSize);
    pImg.style.width = convert2Px(iSize);
    pImg.alt = strAlt;
    pImg.style.position = "absolute";
    if (iLeft) pImg.style.left = convert2Px(iLeft);
    if (iTop) pImg.style.top = convert2Px(iTop);
    if (strTitle) pImg.title = strTitle;
    BindingEvent(pImg, "mouseover",
        function (e) {
            setCursor(pImg, "hand");
        });
    return pImg;
};
function createAlignImg(strAlign, strID, strImg) {
    var pP = document.createElement("P");
    pP.align = strAlign;
    var pImg = document.createElement("Img");
    pImg.id = strID;
    pImg.src = strImg;
    pImg.style.height = "";
    pImg.style.width = "";
    pP.appendChild(pImg);
    return pP;
};
MainFrame.prototype.cancelTrackMonitorStepByStep = function () {
    if (this.trackTimeOut) {
        clearTimeout(this.trackTimeOut);
    }
};
MainFrame.prototype.convert2WPoint = function (x, y) {
    var pDivCoord = this.getDivCoord(x, y);
    var x = pDivCoord.x - parseInt(this.div.style.left);
    var y = pDivCoord.y - parseInt(this.div.style.top);
    x = Math.round(x);
    y = Math.round(y);
    delete pDivCoord;
    return new Point(x, y);
};
MainFrame.prototype.convert2LonLat = function (left, top) {
    var iLeft = parseInt(this.div.style.left);
    var iTop = parseInt(this.div.style.top);
    var pMBR = this.getBoundsLatLng();
    var dx = pMBR.minX + (left + iLeft) / this.viewSize.width * pMBR.getSpanX();
    var dy = pMBR.maxY - (top + iTop) / this.viewSize.height * pMBR.getSpanY();
    return new Point(dx, dy);
};
window.showInfoFrame = function (evt) {
    var pMe = getMap();
    evt = (evt) ? evt : ((window.event) ? window.event : "");
    if (evt) {
        var elem = getTargetElement(evt);
        if (elem) {
            pMe.showInfoFrame(elem);
        }
    }
};
window.hideInfoFrame = function () {
    getMap().hideInfoFrame();
};
Function.prototype.method = function (name, func, bStatic) {
    if (typeof bStatic == "undefined" || bStatic == true) {
        this.prototype[name] = func;
    } else {
        this[name] = func;
    }
    return this;
};
Function.method('inherits',
    function (parent) {
        var d = 0,
            p = (this.prototype = new parent());
        this.method('uber',
            function uber(name) {
                var f, r, t = d,
                    v = parent.prototype;
                if (t) {
                    while (t) {
                        v = v.constructor.prototype;
                        t -= 1;
                    }
                    f = v[name];
                } else {
                    f = p[name];
                    if (f == this[name]) {
                        f = v[name];
                    }
                }
                d += 1;
                r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
                d -= 1;
                return r;
            });
        return this;
    });
Function.method('swiss',
    function (parent) {
        for (var i = 1; i < arguments.length; i += 1) {
            var name = arguments[i];
            this.prototype[name] = parent.prototype[name];
        }
        return this;
    });
function LTrim(str) {
    if (str == null) {
        return "";
    }
    return str.replace(/^[ \t\n\r]+/g, "");
};
function RTrim(str) {
    if (str == null) {
        return "";
    }
    return str.replace(/[ \t\n\r]+$/g, "");
};
function Trim(str) {
    if (str == null) {
        return "";
    }
    return RTrim(LTrim(str));
};
var EventManager = {
    _registry: null,
    _unload: [],
    Initialise: function () {
        if (this._registry == null) {
            this._registry = [];
            this.addUnloadFunc(this.cleanUp);
            EventManager.add(window, "unload", this.unload);
        }
    },
    add: function (obj, type, fn, useCapture) {
        this.Initialise();
        if (typeof obj == "string") {
            obj = document.getElementById(obj);
        }
        if (obj == null || fn == null) {
            return false;
        }
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, useCapture);
            this._registry.push({
                obj: obj,
                type: type,
                fn: fn,
                useCapture: useCapture
            });
            return true;
        }
        if (obj.attachEvent && obj.attachEvent("on" + type, fn)) {
            this._registry.push({
                obj: obj,
                type: type,
                fn: fn,
                useCapture: false
            });
            return true;
        }
        return false;
    },
    remove: function (obj, type, fn) {
        for (var i = this._registry.length - 1; i > -1; i--) {
            var pEvent = this._registry[i];
            if (obj == pEvent.obj && type == pEvent.type && fn == pEvent.fn) {
                this._registry.splice(i, 1);
                if (obj.removeEventListener) {
                    obj.removeEventListener(pEvent.type, pEvent.fn, pEvent.useCapture);
                } else if (obj.detachEvent) {
                    obj.detachEvent("on" + pEvent.type, pEvent.fn);
                } else {
                    obj["on" + pEvent.type] = null;
                }
                break;
            }
        }
    },
    removeNode: function (obj) {
        for (var i = this._registry.length - 1; i > -1; i--) {
            var pEvent = this._registry[i];
            if (obj == pEvent.obj) {
                this._registry.splice(i, 1);
                if (pEvent.obj.removeEventListener) {
                    pEvent.obj.removeEventListener(pEvent.type, pEvent.fn, pEvent.useCapture);
                } else if (pEvent.obj.detachEvent) {
                    pEvent.obj.detachEvent("on" + pEvent.type, pEvent.fn);
                } else {
                    pEvent.obj["on" + pEvent.type] = null;
                }
            }
        }
    },
    cleanUp: function () {
        window.status = "清除事件缓冲....";
        for (var i = 0; i < EventManager._registry.length; i++) {
            window.status = "清除事件缓冲...." + i;
            with (EventManager._registry[i]) {
                if (obj.removeEventListener) {
                    obj.removeEventListener(type, fn, useCapture);
                } else if (obj.detachEvent) {
                    obj.detachEvent("on" + type, fn);
                } else {
                    obj["on" + type] = null;
                }
            }
        }
        EventManager._registry = null;
    },
    unload: function () {
        var iLen = EventManager._unload.length;
        for (var i = 0; i < iLen; i++) {
            EventManager._unload[i]();
        }
    },
    addUnloadFunc: function (Func) {
        this._unload.push(Func);
    },
    showEvent: function () {
        for (var i = this._registry.length - 1; i > -1; i--) {
            var pEvent = this._registry[i];
            alert(pEvent.type + ":" + pEvent.fn + ":" + pEvent.useCapture);
        }
    }
};
function BindingEvent(ra, J, Hb) {
    EventManager.add(ra, J, Hb);
};
function unbindingEvent(ra, J, Hb) {
    EventManager.remove(ra, J, Hb);
};
function cloneFunc(a, b) {
    window[a] = b;
    return window[a];
};
function cloneMethod(a, b, c) {
    a.prototype[b] = c;
};
function EzSMethod(a, b, c) {
    a[b] = c;
};
function EzNameSpace() {
    var pMap = cloneFunc("Map", testEzMap);
    pMap.method("showMap1", testEzMap.prototype.showMap);
    pMap.method("showName1", testEzMap.showName, true);
};
function testEzMap() {
    this.name = new Array("hello");
};
function testEzMap_showMap() {
    alert(this.name[0]);
};
testEzMap.prototype.showMap = testEzMap_showMap;
function testEzMap_showName() {
    alert("showName");
};
testEzMap.prototype.showName = testEzMap_showName;
EzNameSpace();
function EzManager() {
};
EzManager.valid = function (user, password, ip) {
    window.status = "进行验证....";
    var pDate = new Date();
    var strurl = m_strBasePath + "/js/EzMap_allow.jsp?UserName=" + user + "&Password=" + password + "&IP=" + ip + "&time=" + pDate.getTime();
    getDataFromServer("log", strurl,
        function () {
            window.status = "验证....完成"
        });
};
function iOverLay() {
    this.id;
    this.paths = null;
    this.points = new Array();
    this.point = null;
    this.iLen = null;
    this.iPause = null;
    this.timeInterval = 1000;
    this.bIsRepeat = false;
    this.bIsPlay = false;
    this.iZIndex = _overLayIndex;
    this.dispStatus = 1;
    this.startSeq = 0;
    this.endSeq = 0;
    this.dScale = 1;
    this.startScaleSeq = 0;
    this.endScaleSeq = 0;
    this.statusSet = new Array();
    this.dragObject = null;
    this.bIsSyRedraw = true;
    this.map = null;
    this.angle = 0;
    this.color = "red";
    this.opacity = 1;
    this.editable = false;
    this.bIsCenter = false;
};
g_current_editor = null;
iOverLay.prototype.showPropertyEdit = function () {
    g_current_editor = this;
    if (this.editable == false) return;
    getMapApp().showMenu();
    return false;
};
iOverLay.prototype.getZIndex = function () {
    return this.div.style.zIndex;
};
iOverLay.prototype.setZIndex = function (iIndex) {
    if (this.div != null) this.div.style.zIndex = iIndex;
};
iOverLay.prototype.synCreateDiv = function (pContainer) {
    this.map = pContainer;
    if (this.bIsSyRedraw == true) {
        this.setTimeout("this.createDiv()", 10);
    } else {
        this.createDiv();
    }
};
iOverLay.prototype.createDiv = function () {
};
iOverLay.prototype.synRedraw = function () {
    if (this.bIsSyRedraw == true) {
        this.setTimeout("this.synRedraw()", 10);
    } else {
        this.redraw();
    }
};
iOverLay.prototype.redraw = function () {
};
iOverLay.prototype.removeFromDiv = function () {
    if (this.pause) this.pause();
    if (this.map) {
        this.map.div.removeChild(this.div);
        EventManager.removeNode(this.div);
        if (this.titleDiv != null) {
            this.map.div.removeChild(this.titleDiv);
            EventManager.removeNode(this.titleDiv);
        }
    }
};
iOverLay.prototype.hide = function () {
    if (this.div != null) this.div.style.display = "none";
    if (this.titleDiv != null) this.titleDiv.style.display = "none";
};
iOverLay.prototype.show = function () {
    if (this.div != null) this.div.style.display = "";
    if (this.titleDiv != null) this.titleDiv.style.display = "";
};
iOverLay.prototype.isVisible = function () {
    return this.div.style.display != "none"
};
iOverLay.prototype.onclick = function () {
    this.div.fireEvent("onclick");
};
iOverLay.prototype.addListener = function (action, fuct) {
    if (this.div != null) {
        BindingEvent(this.div, action, fuct);
        this.div.style.cursor = "hand";
    }
    if (this.titleDiv) {
        BindingEvent(this.titleDiv, action, fuct);
        this.titleDiv.style.cursor = "hand";
    }
};
iOverLay.prototype.removeListener = function (action, fuct) {
    unbindingEvent(this.div, action, fuct);
    if (this.titleDiv) {
        unbindingEvent(this.titleDiv, action, fuct);
        this.titleDiv.style.cursor = "";
    }
};
iOverLay.prototype.removeAllListener = function () {
    EventManager.removeNode(this.div);
    if (this.titleDiv) {
        EventManager.removeNode(this.titleDiv);
        this.titleDiv.style.cursor = "";
    }
};
iOverLay.prototype.openInfoWindowHtml = function (html) {
    this.map.blowupOverlay(this);
    var pPoint = new Point(getMap().mouseLng, getMap().mouseLat);
    this.map.openInfoWindow(pPoint.x, pPoint.y, html, true);
    this.flash();
};
iOverLay.prototype.initPath = function (strPath) {
    if (typeof strPath != "undefined" && strPath != null) this.points = trans2Points(strPath);
    var pPoints = this.points;
    for (var iIndex = 0; iIndex < pPoints.length; iIndex++) {
        var pPoint = pPoints[iIndex];
        if (iIndex == 0) {
            pPoint.mileage = 0;
        } else {
            pPoint.countMileage(pPoints[iIndex - 1]);
        }
    }
};
iOverLay.prototype.play = function (bIsCenter) {
    if (bIsCenter) this.bIsCenter = bIsCenter;
    this.drawInterval();
};
iOverLay.prototype.replay = function () {
    this.iPause = 0;
    this.drawInterval();
};
iOverLay.prototype.stop = function () {
    this.pause();
    this.dScale = 1;
    this.iPause = 0;
    this.redraw();
};
iOverLay.prototype.pause = function () {
    if (this.timeOut) {
        clearTimeout(this.timeOut);
        this.timeOut = null;
    }
};
iOverLay.prototype.setInterval = function (iTime) {
    this.timeInterval = iTime;
};
iOverLay.prototype.setRepeat = function (bTrue) {
    this.bIsRepeat = bTrue;
};
iOverLay.prototype.drawInterval = function () {
    this.bIsPlay = true;
    if (this.iPause < this.endSeq) {
        this.iPause++;
    } else {
        this.iPause = this.startSeq;
        if (!this.bIsRepeat) return;
    }
    this.showStatus(this.iPause);
    if (typeof this.bIsCenter != "undefined" && this.bIsCenter) {
        if (this instanceof Marker || this instanceof Title) this.map.recenterOrPanToLatLng(this.point);
    }
    this.timeOut = this.setTimeout("this.drawInterval()", this.timeInterval);
};
iOverLay.prototype.getSPoints = function (iS) {
    var pPoints = this.points;
    var pResultPoints = new Array();
    var iLen = pPoints.length;
    var dDist = pPoints[iLen - 1].mileage;
    var dMidDist = (iS - this.startPath) / (this.endPath - this.startPath) * dDist;
    for (var iIndex = 0; iIndex < iLen - 1; iIndex++) {
        if (pPoints[iIndex].mileage <= dMidDist) {
            pResultPoints.push(pPoints[iIndex]);
        }
        if (pPoints[iIndex + 1].mileage >= dMidDist) {
            var dTmpDist = dMidDist - pPoints[iIndex].mileage;
            var pTmpPoint = Point.getDistPoint(pPoints[iIndex], pPoints[iIndex + 1], dTmpDist);
            pResultPoints.push(pTmpPoint);
            break;
        }
    }
    return pResultPoints;
};
iOverLay.prototype.flash = function (bIsFilled) {
    this.flashTimes = 0;
    this.bIsFilled = bIsFilled;
    this.flashInterval(bIsFilled);
};
iOverLay.prototype.refreshStatus = function () {
    if (this.dispStatus == 1) {
        if (this.div != null) {
            this.div.style.display = "";
        }
        if (this.titleDiv != null) this.titleDiv.style.display = "";
    } else if (this.dispStatus == 2) {
        if (this.div != null) {
            this.div.style.display = "none";
        }
        if (this.titleDiv != null) this.titleDiv.style.display = "none";
    } else if (this.dispStatus == 3) {
        this.flash();
    }
};
iOverLay.prototype.flashInterval = function (bIsFilled) {
    var pvml = this.div;
    if (pvml == null) return;
    if (this.flashTimes < 6) {
        this.flashTimes++;
        if (this.div.style.display == "") {
            this.div.style.display = "none";
        } else {
            this.div.style.display = "";
        }
    } else {
        this.div.style.display = "";
        if (typeof(this.bIsFilled) != "undefined") this.div.filled = this.bIsFilled;
        return;
    }
    this.flashTimeOut = this.setTimeout("this.flashInterval()", 400);
};
iOverLay.prototype.scale = function (dScale) {
    if (typeof dScale == "string") dScale = parseFloat(dScale);
    this.dScale = dScale;
    this.redraw();
};
function degToRad(x) {
    return (x / (360 / (2 * Math.PI)));
};
function radToDeg(x) {
    return (x * (360 / (2 * Math.PI)));
};
iOverLay.prototype.rotate = function rotate(angle, el) {
    var rad = degToRad(angle);
    costheta = Math.cos(rad);
    sintheta = Math.sin(rad);
    if (!el) {
        el = this.div;
    }
    if (el) {
        el.style.filter = "progid:DXImageTransform.Microsoft.Matrix()";
        el.filters.item("DXImageTransform.Microsoft.Matrix").SizingMethod = "auto expand";
        el.filters.item("DXImageTransform.Microsoft.Matrix").FilterType = "bilinear";
        el.filters.item("DXImageTransform.Microsoft.Matrix").M11 = costheta;
        el.filters.item("DXImageTransform.Microsoft.Matrix").M12 = -sintheta;
        el.filters.item("DXImageTransform.Microsoft.Matrix").M21 = sintheta;
        el.filters.item("DXImageTransform.Microsoft.Matrix").M22 = costheta;
    }
};
iOverLay.prototype.doRotate = function () {
    if (this.angle > 360) this.angle -= 360;
    this.angle += 15;
    this.rotate(this.angle);
    this.setTimeout("this.doRotate()", 200);
};
iOverLay.prototype.showStatus = function (iSeq) {
    if (isNaN(iSeq)) {
        alert("传入的参数有误，不是数值");
        return;
    }
    if (typeof iSeq == "string") iSeq = parseInt(iSeq);
    if (iSeq < this.startSeq) iSeq = this.startSeq;
    if (iSeq > this.endSeq) iSeq = this.endSeq;
    if (this.startScale && (this instanceof Marker || this instanceof Circle || this instanceof Rectangle || this instanceof Polyline)) {
        if (iSeq <= this.startScaleSeq) {
            this.dScale = this.startScale;
        } else if (iSeq >= this.endScaleSeq) {
            this.dScale = this.endScale;
        } else {
            this.dScale = this.startScale + (iSeq - this.startScaleSeq) / (this.endScaleSeq - this.startScaleSeq) * (this.endScale - this.startScale);
        }
    }
    if (this instanceof Marker || this instanceof Polyline || this instanceof Title) {
        if (this.points.length > 0) {
            var iPathSeq = iSeq;
            if (iPathSeq < this.startPath) iPathSeq = this.startPath;
            if (iPathSeq > this.endPath) iPathSeq = this.endPath;
            this.pPoints = this.getSPoints(iPathSeq);
            if (this.pPoints.length > 0) {
                this.point = this.pPoints[this.pPoints.length - 1];
            } else {
            }
            if (this.point == null) {
                throw Error(103, "点为空:" + this.pPoints.toString() + ":" + this.pPoints.length);
            }
        }
    }
    this.dispStatus = 1;
    for (var iIndex = 0; iIndex < this.statusSet.length; iIndex++) {
        var pStatusSet = this.statusSet[iIndex];
        if (iSeq >= pStatusSet.startSeq && iSeq <= pStatusSet.endSeq) {
            this.dispStatus = pStatusSet.iStatus;
            break;
        }
    }
    this.redraw();
    this.refreshStatus();
};
iOverLay.prototype.addDispStatus = function (iStartS, iEndS, iStatus) {
    for (var i = 0; i < arguments.length; i++) {
        if (isNaN(arguments[i])) {
            alert("传入的参数有误，不是数值");
            return;
        }
        if (typeof arguments[i] == "string") arguments[i] = parseInt(arguments[i]);
    }
    if (iStatus < 1 || iStatus > 3) {
        alert("状态设置错误，应为(1:显示;2:隐藏;3:闪烁)");
        return;
    }
    var pOverlayStatus = new OverlayStatus(iStartS, iEndS, iStatus);
    for (var i = 0; i < this.statusSet.length; i++) {
        var tmpStatus = this.statusSet[i];
        var pOK = tmpStatus.bIsConflict(pOverlayStatus);
        if (pOK) {
            pOverlayStatus = null;
            return;
        }
    }
    this.startSeq = Math.min(this.startSeq, iStartS);
    this.endSeq = Math.max(this.endSeq, iEndS);
    this.statusSet.push(pOverlayStatus);
};
iOverLay.prototype.setExtendStatus = function (iStartS, iEndS, dSScale, dEScale) {
    for (var i = 0; i < arguments.length; i++) {
        if (isNaN(arguments[i])) {
            alert("传入的参数有误，不是数值");
            return;
        }
    }
    if (typeof iStartS == "string") iStartS = parseInt(iStartS);
    if (typeof iEndS == "string") iEndS = parseInt(iEndS);
    if (typeof dSScale == "string") dSScale = parseFloat(dSScale);
    if (typeof dEScale == "string") dEScale = parseFloat(dEScale);
    this.startSeq = Math.min(this.startSeq, iStartS);
    this.endSeq = Math.max(this.endSeq, iEndS);
    this.startScale = dSScale;
    this.endScale = dEScale;
    this.startScaleSeq = iStartS;
    this.endScaleSeq = iEndS;
};
iOverLay.prototype.setPath = function (iStartS, iEndS, strPoints) {
    for (var i = 0; i < 2; i++) {
        if (isNaN(arguments[i])) {
            alert("传入的参数有误，不是数值");
            return;
        }
    }
    if (typeof iStartS == "string") iStartS = parseInt(iStartS);
    if (typeof iEndS == "string") iEndS = parseInt(iEndS);
    this.startSeq = Math.min(this.startSeq, iStartS);
    this.endSeq = Math.max(this.endSeq, iEndS);
    this.startPath = iStartS;
    this.endPath = iEndS;
    this.initPath(strPoints);
};
iOverLay.prototype.toString = function () {
    var strPoints = "";
    if (this instanceof Circle) {
        strPoints = this.point.toString() + "," + this.radius;
    } else if (this instanceof Rectangle || this instanceof Polygon || this instanceof Polyline) {
        strPoints = this.points.join(",");
    } else if (this instanceof Title || this instanceof Marker) {
        strPoints = this.point.toString();
    }
    return strPoints;
};
iOverLay.prototype.setNode = function (bTrue) {
    if (bTrue) {
        this.bIsNode = bTrue;
        if (this.div.style.border != "") {
            this.div.style.border = "1px solid #000000";
            this.div.style.backgroundColor = "#b3b3b3";
            this.div.style.filter = "alpha(opacity=70)";
        }
    } else {
        this.bIsNode = bTrue;
        if (this.div.style.border != "") {
            this.div.style.border = "1px solid #000000";
            this.div.style.backgroundColor = "#b3b3b3";
            this.div.style.filter = "alpha(opacity=50)";
        }
    }
};
iOverLay.prototype.getLocalUnit = function () {
    var strUnit = "degree";
    if (_MapSpanScale != 1) {
        strUnit = "meter";
    }
    return strUnit;
};
iOverLay.prototype.toLocalUnit = function (str) {
    var strSpan = str;
    if (typeof str == "string") {
        if (_MapSpanScale == 1 && (str.indexOf("meter") != -1)) {
            strSpan = parseFloat(str) * (0.030 / 3600);
        }
    }
    return strSpan;
};
iOverLay.prototype.updatePoint = function () {
    this.point = new Point(this.map.mouseLng, this.map.mouseLat);
    if (this._point) {
        var xOffset = this.point.x - this._point.x;
        var yOffset = this.point.y - this._point.y;
        if (this instanceof Circle) {
            this.points[0] = this.points[0];
            this.points[1] = this.points[1];
        }
        if (this.center != null) {
            this.center.x = this.point.x;
            this.center.y = this.point.y;
        }
        this._point = this.point;
    }
    this.setNode(true);
    this.redraw();
    _CurentOverLay = this;
};
iOverLay.prototype.ondragstart = function () {
    this._point = this.point;
};
iOverLay.prototype.enableContextMenu = function () {
    BindingEvent(this.div, "contextmenu", this.eventHandler("showPropertyEdit"));
    if (this.titleDiv) {
        BindingEvent(this.titleDiv, "contextmenu", this.eventHandler("showPropertyEdit"));
    }
};
iOverLay.prototype.disableContextMenu = function () {
    unbindingEvent(this.div, "contextmenu", this.eventHandler("showPropertyEdit"));
    if (this.titleDiv) {
        unbindingEvent(this.titleDiv, "contextmenu", this.eventHandler("showPropertyEdit"));
    }
};
_CurentOverLay = null;
iOverLay.prototype.startMove = function (func) {
    var iLeft = parseInt(this.div.style.left);
    var iTop = parseInt(this.div.style.top);
    this.bIsSyRedraw = false;
    if (!this.dragObject) {
        this.dragObject = new DragEvent(this.div, iLeft, iTop, this.map.container);
    } else {
        this.dragObject.enable();
    }
    this._point = this.point;
    this.dragObject.ondrag = this.eventHandler("updatePoint");
    this.dragObject.onmove = func;
};
iOverLay.prototype.stopMove = function (strPath) {
    this.dragObject.disable();
    this.dragObject.ondragend = null;
};
iOverLay.prototype.showInfo = function (x, y, strMsg, strTitle) {
    if (!strTitle) strTitle = "";
    var pInfoDiv = document.getElementById("InfoDiv");
    if (pInfoDiv == null) {
        pInfoDiv = document.createElement("div");
        pInfoDiv.id = "InfoDiv";
        pInfoDiv.style.zIndex = "12000";
        pInfoDiv.style.position = "absolute";
        this.map.div.appendChild(pInfoDiv);
        BindingEvent(pInfoDiv, "mouseover",
            function () {
                iOverLay.bOutOfInfo = false;
            });
        BindingEvent(pInfoDiv, "mouseout",
            function () {
                iOverLay.bOutOfInfo = true;
                iOverLay.closeInfo();
            });
    }
    var strHTML = "";
    strHTML = '<TABLE id="InfoTable_2"  >';
    strHTML = strHTML + '<TBODY>';
    strHTML = strHTML + '<TR>';
    strHTML = strHTML + '<TD class="InfoTitle">';
    strHTML = strHTML + '<TABLE class="InfoWord" cellSpacing=0 cellPadding=0 width="100%" align=center border=0>';
    strHTML = strHTML + '<TBODY>';
    strHTML = strHTML + '<TR>';
    strHTML = strHTML + '<TD id=head_txt><IMG src="/EzServer/css/infolittle.gif"><span id="info_title">' + strTitle + '</span></TD>';
    strHTML = strHTML + '<TD width=30>　</TD>';
    strHTML = strHTML + '<TD vAlign=center align=middle width=20><A class="InfoClose"  onclick="iOverLay.closeInfoWait(true);" href="javascript:void(0)">×</A>';
    strHTML = strHTML + '</TD>';
    strHTML = strHTML + '</TR>';
    strHTML = strHTML + '</TBODY>';
    strHTML = strHTML + '</TABLE>';
    strHTML = strHTML + '</TD>';
    strHTML = strHTML + '</TR>';
    strHTML = strHTML + '<TR>';
    strHTML = strHTML + '<TD vAlign=top bgColor=#ffffff id="info_desc">';
    strHTML = strHTML + strMsg;
    strHTML = strHTML + '</TD>';
    strHTML = strHTML + '</TR>';
    strHTML = strHTML + '</TBODY>';
    strHTML = strHTML + '</TABLE>';
    pInfoDiv.innerHTML = strHTML;
    var pTmpDiv = document.createElement("div");
    pTmpDiv.innerHTML = strHTML;
    this.map.div.appendChild(pTmpDiv);
    var iTableWidth = pTmpDiv.offsetWidth;
    var iTableHeight = pTmpDiv.offsetHeight;
    this.map.div.removeChild(pTmpDiv);
    var pTableEle = document.getElementById("InfoTable_2");
    var iOffsetLeft = parseInt(this.div.offsetWidth);
    var iOffsetTop = parseInt(this.div.offsetHeight);
    var pPoint = this.map.convert2WPoint(x, y);
    var pCenter = this.map.getCenterLatLng();
    if (this.point.x > pCenter.x) {
        pInfoDiv.style.left = convert2Px(pPoint.x - iTableWidth + iOffsetLeft);
    } else {
        pInfoDiv.style.left = convert2Px(pPoint.x);
    }
    if (this.point.y > pCenter.y) {
        pInfoDiv.style.top = convert2Px(pPoint.y + iOffsetTop - 1);
    } else {
        pInfoDiv.style.top = convert2Px(pPoint.y - iTableHeight);
    }
    pInfoDiv.style.display = "";
};
iOverLay.closeInfo = function () {
    if (this.timeout) {
        clearTimeout(this.timeout);
    }
    this.timeout = this.setTimeout("this.closeInfoWait(false)", 0);
};
iOverLay.closeInfoWait = function (bIsNoWait) {
    if (!bIsNoWait && this.bOutOfInfo == false) return;
    var pInfoDiv = document.getElementById("InfoDiv");
    if (pInfoDiv) {
        pInfoDiv.style.display = "none";
    }
};
iOverLay.prototype.setPoint = function (pPoint) {
    this.point = pPoint;
    if (this.div != null && this.map != null) this.redraw();
};
iOverLay.prototype.getPoint = function () {
    if (this.point) {
        return this.point;
    } else {
        return null;
    }
};
function Polyline(points, color, weight, opacity, arrow, fillcolor) {
    this.base = iOverLay;
    this.base();
    this.unit = "px";
    this.color = color || "#0000ff";
    this.tag = "v:shape";
    this.fillColor = fillcolor || "red";
    this.weight = weight || "5";
    this.opacity = opacity || 0.45;
    this.div = null;
    this.filled = false;
    this.arrow = arrow || 0;
    this.center = null;
    this.points = points;
    this.name = "";
    this.opacityName = "线的透明色";
    this.colorName = "线的颜色";
    this.lineStyles = ["none", "dash", "dashdot", "dot", "longdash", "longdashdot", "shortdash", "shortdashdot", "shortdashdotdot", "longdashdotdot", "shortdot"];
    this.lineStyleNames = ["________", "- - - --", "-.-.-.-.", "........", " ___  ___", "___.___", "- - - -", "__ . __", "__ . . ", "____ . .", "........"];
    this.lineStyle = "none";
    this.getFillStyle = function () {
        var pFill = document.createElement("v:fill");
        pFill.color = this.fillColor;
        pFill.opacity = this.opacity;
        pFill.type = "frame";
        return pFill;
    };
    this.setZIndex = function (iIndex) {
        if (this.div != null) this.div.style.zIndex = iIndex;
    };
    this.getZIndex = function () {
        return this.div.style.zIndex;
    };
    this.init();
};
Polyline.prototype = new iOverLay;
Polyline.prototype.onclick = function () {
    this.div.fireEvent("onclick");
    this.flash();
};
function trans2Points(a) {
    var p = a.split(",");
    var len = p.length / 2;
    var points = new Array();
    for (var iIndex = 0; iIndex < len; iIndex++) {
        var pPoint = new Point(p[2 * iIndex], p[2 * iIndex + 1]);
        points.push(pPoint);
    }
    return points;
};
Polyline.prototype.trans2Points = trans2Points;
Polyline.prototype.init = function () {
    this.iZIndex = this.iZIndex - 10;
    if (this instanceof Circle) {
        this.tag = "v:oval";
        this.filled = true;
        if (_MapSpanScale == 1) {
            this.radiusUnit = "degree";
        } else {
            this.radiusUnit = "meter";
        }
    } else if (this instanceof Rectangle) {
        this.tag = "v:rect";
        this.filled = true;
    } else if (this instanceof Polygon) {
        this.tag = "v:shape";
        this.filled = true;
    } else if (this instanceof Polyline) {
        this.tag = "v:shape";
    }
    if (this.points instanceof Array) {
    } else if (typeof this.points == "string") {
        this.points = this.trans2Points(this.points);
    }
    var pShape = document.createElement(this.tag);
    pShape.style.position = "absolute";
    pShape.style.zIndex = this.iZIndex;
    this.div = pShape;
    stroke = document.createElement("v:stroke");
    stroke.color = this.color;
    stroke.opacity = this.opacity;
    stroke.weight = convert2Px(this.weight);
    stroke.startarrowwidth = "medium";
    stroke.endarrowwidth = "medium";
    stroke.startarrowlength = "medium";
    stroke.endarrowlength = "medium";
    stroke.joinstyle = "round";
    stroke.endcap = "round";
    if (this.arrow == -1) {
        stroke.startarrow = "classic";
        stroke.endarrow = "oval";
    } else if (this.arrow == 1) {
        stroke.startarrow = "oval";
        stroke.endarrow = "classic";
    }
    this.stroke = stroke;
    try {
        this.div.appendChild(this.stroke);
        this.fillStroke = this.getFillStyle();
        this.div.appendChild(this.fillStroke);
        this.div.filled = this.filled;
    } catch (e) {
        var strURL = document.location;
    }
};
Polyline.prototype.setPoints = function (strPoints) {
    if (typeof strPoints == "string") {
        this.points = this.trans2Points(strPoints);
    } else if (strPoints instanceof Array) {
        this.points = strPoints;
    } else {
        alert("传入参数有误,必须是点的线串或Point的数字类型");
        return;
    }
    this.redraw();
};
Polyline.prototype.createDiv = function (pContainer) {
    if (typeof this.div == "undefined" || this.div == null) {
        this.init();
    }
    if (typeof pContainer != "undefined" && pContainer != null) {
        this.map = pContainer;
    }
    this.map.div.appendChild(this.div);
    this.redraw();
    var iLeft = parseInt(this.div.style.left);
    var iTop = parseInt(this.div.style.top);
    this.point = this.map.convert2LonLat(iLeft, iTop);
};
Polyline.prototype.addListener = function (action, fuct) {
    if (this.div == null) {
        alert("请先加入事件后(addOverlay)，再创建该事件!" + "\n该事件的触发事件没有成功建立");
        return;
    }
    ;
    this.div.style.cursor = "hand";
    BindingEvent(this.div, action, fuct);
};
Polyline.prototype.openInfoWindowHtml = function (html) {
    this.map.blowupOverlay(this);
    if (this.center == null) {
        var iIndex = Math.floor(this.points.length / 2);
        this.map.openInfoWindow(this.points[iIndex].x, this.points[iIndex].y, html, true);
    } else {
        this.map.openInfoWindow(this.center.x, this.center.y, html, true);
    }
};
Polyline.prototype.display = function (a) {
    if (a) {
        this.drawElement.style.display = ""
    } else {
        this.drawElement.style.display = "none"
    }
};
Polyline.prototype.removeFromDiv = function () {
    this.pause();
    this.map.div.removeChild(this.div);
    EventManager.removeNode(this.div);
    this.deleteSnap();
};
Polyline.prototype.redraw = function () {
    if (this.div == null) return;
    var iWidth = this.map.viewSize.width;
    var iHeight = this.map.viewSize.height;
    this.div.coordsize = iWidth + "," + iHeight;
    this.div.style.left = convert2Px(0);
    this.div.style.top = convert2Px(0);
    this.div.style.width = convert2Px(iWidth);
    this.div.style.height = convert2Px(iHeight);
    var pPath = this.points;
    if (this.pPoints) {
        pPath = this.pPoints;
    }
    if (this instanceof Polygon) {
        if (this.dScale && this.dScale != 1) pPath = this.getScalePath(this.points, this.dScale);
    }
    var iLineWidth = this.getPx(this.weight);
    this.stroke.weight = convert2Px(iLineWidth * this.dScale);
    var strPath = this.getVectorPath(pPath);
    this.div.path = strPath;
    this.redrawSnap();
};
Polyline.prototype.getPx = function (dSrc) {
    var iLineWidth = dSrc;
    if ((_MapSpanScale == 1 && this.unit == "degree") || (_MapSpanScale == 1 && this.unit == "meter") || (_MapSpanScale != 1 && this.unit == "meter")) {
        var dUnit = iLineWidth;
        if (_MapSpanScale == 1 && this.unit == "degree") {
            dUnit = dUnit * 3600 / 0.030;
        }
        iLineWidth = this.map.getPxOfDist(dUnit);
    }
    return iLineWidth;
};
Polyline.prototype.getScalePath = function (pPaths, dScale) {
    var pResultPaths = new Array();
    var pMBR = this.getMBR();
    var pCenterPoint = pMBR.centerPoint();
    for (var iIndex = 0; iIndex < pPaths.length; iIndex++) {
        var pTmpPoint = pPaths[iIndex];
        var dX = pCenterPoint.x + (pTmpPoint.x - pCenterPoint.x) * dScale;
        var dY = pCenterPoint.y + (pTmpPoint.y - pCenterPoint.y) * dScale;
        var pPoint = new Point(dX, dY);
        pResultPaths.push(pPoint);
    }
    return pResultPaths;
};
Polyline.prototype.getVectorPath = function (pPaths) {
    var b = new Array();
    if (typeof pPaths == "undefined") pPaths = this.points;
    if (this.bIsPlay) {
    }
    for (var e = 0; e < pPaths.length; e++) {
        var pPoint = pPaths[e];
        var pPointDiv = this.map.convert2WPoint(pPoint.x, pPoint.y);
        if (e == 0) {
            b.push("m");
            b.push(pPointDiv.x);
            b.push(pPointDiv.y);
            b.push("l");
        }
        b.push(pPointDiv.x);
        b.push(pPointDiv.y);
    }
    b.push("e");
    var strPath = b.join(" ");
    return strPath;
};
Polyline.prototype.getPoints = function () {
    return this.points;
};
Polyline.prototype.getLength = function () {
    var dLen = CalculateLength(this.getPoints());
    dLen = Math.floor(dLen);
    return dLen;
};
Polyline.prototype.getArea = function () {
    var dArea = CalculateArea(this.getPoints());
    dArea = Math.floor(dArea);
    return dArea;
};
Polyline.prototype.getMBR = function () {
    var pPoint = this.points[0];
    var pMBR = new MBR(pPoint.x, pPoint.y, pPoint.x, pPoint.y);
    for (var iIndex = 0; iIndex < this.points.length; iIndex++) {
        var pTmpPoint = this.points[iIndex];
        pMBR.extend(pTmpPoint);
    }
    return pMBR;
};
Polyline.prototype.setColor = function (arg) {
    this.color = arg + "";
    this.stroke.color = arg;
};
Polyline.prototype.getColor = function () {
    return this.color;
};
Polyline.prototype.setWidth = function (arg) {
    if (typeof arg == "string") {
        this.weight = parseFloat(arg);
        if (arg.indexOf("degree") != -1) {
            this.unit = "degree";
        } else if (arg.indexOf("meter") != -1) {
            this.unit = "meter";
        } else {
            this.unit = "px";
        }
        this.redraw();
    } else {
        this.weight = arg;
        this.stroke.weight = this.weight + "px";
    }
};
Polyline.prototype.getWidth = function () {
    return this.weight;
};
Polyline.prototype.setOpacity = function (arg) {
    try {
        this.opacity = arg + "";
        this.stroke.opacity = arg;
    } catch (e) {
    }
};
Polyline.prototype.getOpacity = function () {
    return this.opacity;
};
Polyline.prototype.setLineStyle = function (arg) {
    this.setDashStyle(arg);
};
Polyline.prototype.getLineStyle = function () {
    return this.lineStyle;
};
Polyline.prototype.setDashStyle = function (arg) {
    var strStyle = this.lineStyles.join(",");
    if (strStyle.indexOf(arg) != -1) {
        this.stroke.dashstyle = arg;
    } else {
        alert("参数必须是:[" + strStyle + "]中的值！");
    }
    this.lineStyle = arg;
};
function Polygon(points, color, weight, opcacity, fillcolor) {
    this.base = Polyline;
    this.base(points, color, weight, opcacity, null, fillcolor);
    this.fillOpacity = opcacity || "1";
};
Polygon.prototype = new Polyline;
Polygon.prototype.setFillOpacity = function (arg) {
    try {
        this.fillOpacity = arg + "";
        this.fillStroke.opacity = arg;
    } catch (e) {
    }
};
Polygon.prototype.getFillOpacity = function () {
    return this.fillOpacity;
};
Polygon.prototype.setFillColor = function (arg) {
    this.fillColor = arg + "";
    this.fillStroke.color = arg;
};
Polygon.prototype.getFillColor = function () {
    return this.fillColor;
};
function Rectangle(points, color, weight, opcacity, fillcolor) {
    this.base = Polygon;
    this.base(points, color, weight, opcacity, fillcolor);
};
Rectangle.prototype = new Polygon;
Rectangle.prototype.redraw = function () {
    var pMBR = this.getMBR();
    if (this.dScale && this.dScale != 1) pMBR.scale(this.dScale);
    var pDiv1Point = this.map.convert2WPoint(pMBR.minX, pMBR.minY);
    var pDiv2Point = this.map.convert2WPoint(pMBR.maxX, pMBR.maxY);
    var iLeft = Math.min(pDiv1Point.x, pDiv2Point.x);
    var iTop = Math.min(pDiv1Point.y, pDiv2Point.y);
    var iWidth = Math.abs(pDiv1Point.x - pDiv2Point.x);
    var iHeight = Math.abs(pDiv1Point.y - pDiv2Point.y);
    this.div.style.left = convert2Px(iLeft);
    this.div.style.top = convert2Px(iTop);
    this.div.style.width = convert2Px(iWidth);
    this.div.style.height = convert2Px(iHeight);
    var iLineWidth = this.getPx(this.weight);
    this.stroke.weight = convert2Px(iLineWidth * this.dScale);
    this.redrawSnap();
};
Rectangle.prototype.getMBR = function () {
    var dMinX = Math.min(this.points[0].x, this.points[1].x);
    var dMaxX = Math.max(this.points[0].x, this.points[1].x);
    var dMinY = Math.min(this.points[0].y, this.points[1].y);
    var dMaxY = Math.max(this.points[0].y, this.points[1].y);
    if (typeof this.MBR == "undefined" || this.MBR == null) {
        this.MBR = new MBR();
    }
    this.MBR.minX = dMinX;
    this.MBR.minY = dMinY;
    this.MBR.maxX = dMaxX;
    this.MBR.maxY = dMaxY;
    return this.MBR;
};
Rectangle.prototype.getPoints = function () {
    var pPoints = new Array();
    var dMinX = Math.min(this.points[0].x, this.points[1].x);
    var dMaxX = Math.max(this.points[0].x, this.points[1].x);
    var dMinY = Math.min(this.points[0].y, this.points[1].y);
    var dMaxY = Math.max(this.points[0].y, this.points[1].y);
    pPoints.push(new Point(dMinX, dMinY));
    pPoints.push(new Point(dMinX, dMaxY));
    pPoints.push(new Point(dMaxX, dMaxY));
    pPoints.push(new Point(dMaxX, dMinY));
    pPoints.push(new Point(dMinX, dMinY));
    return pPoints;
};
function Circle(points, color, weight, opcacity, fillcolor) {
    this.base = Polygon;
    this.base(points, color, weight, opcacity, fillcolor);
    this.radiusUnit = "";
};
Circle.prototype = new Polygon;
Circle.prototype.trans2Points = function (a) {
    var pArray = a.split(",");
    for (var iIndex = 0; iIndex < pArray.length; iIndex++) {
        pArray[iIndex] = parseFloat(pArray[iIndex]);
    }
    this.center = new Point(pArray[0], pArray[1]);
    this.radius = pArray[2];
    return pArray;
};
Circle.prototype.setRadius = function (strInRadius) {
    var strRadius = this.toLocalUnit(strInRadius);
    this.radius = parseFloat(strRadius);
    this.redraw();
    if (this.markers != null && this.markers.length > 0) {
        var pMarker = this.markers[1];
        var pPoint = new Point(this.center.x, this.center.y + this.radius);
        pMarker.setPoint(pPoint);
    }
};
Circle.prototype.getMeter = function (str) {
    var strSpan = str;
    var strUnit = this.getLocalUnit();
    if (strUnit.indexOf("degree") != -1) {
        strSpan = parseFloat(str) * 3600 / 0.030;
    }
    return strSpan;
};
Circle.prototype.getRadiusPx = function (dSrc) {
    var iLineWidth = dSrc;
    if (this.radiusUnit != "px") {
        if (_MapSpanScale == 1 || this.editable == true) {
            dUnit = this.toLocalUnit(dSrc);
            var pDiv1Point = this.map.convert2WPoint(this.center.x, this.center.y);
            var pDiv2Point = this.map.convert2WPoint(this.center.x + dUnit, this.center.y);
            iLineWidth = (pDiv2Point.x - pDiv1Point.x);
        } else {
            iLineWidth = this.getMeter(dSrc);
            iLineWidth = this.map.getPxOfDist(iLineWidth);
        }
    }
    return iLineWidth;
};
Circle.prototype.redraw = function () {
    var dRadius = this.radius * this.dScale;
    var pDivCenterPoint = this.map.convert2WPoint(this.center.x, this.center.y);
    dRadius = this.getRadiusPx(dRadius);
    var iWidth = 2 * dRadius;
    this.div.style.left = convert2Px(pDivCenterPoint.x - dRadius);
    this.div.style.top = convert2Px(pDivCenterPoint.y - dRadius);
    this.div.style.width = convert2Px(iWidth);
    this.div.style.height = convert2Px(iWidth);
    var iLineWidth = this.getPx(this.weight);
    this.stroke.weight = convert2Px(iLineWidth);
    this.redrawSnap();
};
Circle.prototype.toString = function () {
    var strPoint = this.center.toString() + "," + this.radius;
    return strPoint;
};
Circle.prototype.getCenter = function () {
    return this.center;
};
Circle.prototype.getRadius = function () {
    return this.radius;
};
Circle.prototype.getPoints = function () {
    var pPoints = new Array();
    for (var iIndex = 0; iIndex <= 36; iIndex++) {
        var dArc = _C_P * 10 * iIndex;
        var xOffset = this.radius * Math.cos(dArc);
        var yOffset = this.radius * Math.sin(dArc);
        var pPoint = new Point(this.center.x + xOffset, this.center.y + yOffset);
        pPoints.push(pPoint);
    }
    return pPoints;
};
Circle.prototype.getRadiusLength = function () {
    var xOffset = this.radius;
    var pPoint = new Point(this.center.x + xOffset, this.center.y);
    var dRadius = GetDistanceInLL(this.center, pPoint);
    dRadius = Math.floor(dRadius);
    return dRadius;
};
function MultiFeat(strPath, color, weight, opacity, fillcolor) {
    this.base = iOverLay;
    this.base();
    this.filled = true;
    this.fillColor = fillcolor || "blue";
    this.lineColor = color || "red";
    this.lineWidth = weight || 2;
    this.opacity = opacity || 1;
    this.feats = new Array();
    this.paths = Trim(strPath);
};
MultiFeat.prototype = new iOverLay;
MultiFeat.prototype.createDiv = function (pContainer) {
    if (typeof pContainer != "undefined" && pContainer != null) {
        this.map = pContainer;
    }
    var pBorderArray = this.paths.split(";");
    for (var iIndex = 0; iIndex < pBorderArray.length; iIndex++) {
        var strLonLatPath = pBorderArray[iIndex];
        var pObject = null;
        if (this.filled) {
            if (strLonLatPath.length == 3) {
                pObject = Circle;
            } else {
                if (strLonLatPath.length == 4) {
                    pObject = Rectangle;
                } else if (strLonLatPath.length >= 6) {
                    pObject = Polygon;
                }
            }
        } else {
            pObject = Polyline;
        }
        var pFeat = new pObject(strLonLatPath, this.lineColor, this.lineWidth, this.opcacity, this.fillColor);
        pFeat.createDiv(this.map);
        this.feats.push(pFeat);
    }
    this.redraw();
};
MultiFeat.prototype.getMBR = function () {
    var pMBR = null;
    for (var iIndex = 0; iIndex < this.feats.length; iIndex++) {
        var pFeat = this.feats[iIndex];
        if (pMBR == null) {
            pMBR = pFeat.getMBR();
        } else {
            pMBR = MBR.union(pMBR, pFeat.getMBR());
        }
    }
    return pMBR;
};
MultiFeat.prototype.redraw = function () {
    for (var iIndex = 0; iIndex < this.feats.length; iIndex++) {
        var pFeat = this.feats[iIndex];
        pFeat.redraw();
    }
};
MultiFeat.prototype.removeFromDiv = function () {
    for (var iIndex = 0; iIndex < this.feats.length; iIndex++) {
        var pFeat = this.feats[iIndex];
        pFeat.removeFromDiv();
    }
};
MultiFeat.prototype.addListener = function (action, fuct) {
    var pMe = this;
    for (var iIndex = 0; iIndex < this.feats.length; iIndex++) {
        var pFeat = this.feats[iIndex];
        pFeat.addListener(action, fuct);
    }
};
MultiFeat.prototype.removeListener = function (action, fuct) {
    for (var iIndex = 0; iIndex < this.feats.length; iIndex++) {
        var pFeat = this.feats[iIndex];
        pFeat.removeListener(action, fuct);
    }
};
MultiFeat.prototype.enableEdit = function () {
    for (var iIndex = 0; iIndex < this.feats.length; iIndex++) {
        var pFeat = this.feats[iIndex];
        pFeat.enableEdit();
    }
};
MultiFeat.prototype.disableEdit = function () {
    for (var iIndex = 0; iIndex < this.feats.length; iIndex++) {
        var pFeat = this.feats[iIndex];
        pFeat.disableEdit();
    }
};
function Marker(pPoint, pIcon, pTitle) {
    this.base = iOverLay;
    this.base();
    this.point = pPoint;
    this.icon = pIcon;
    this.div = null;
    this.title = pTitle;
    this.init();
    this.name = "";
    this.opacityName = "图标透明色";
};
Marker.prototype = new iOverLay;
Marker.prototype.init = function () {
    if (this.icon.image != null) {
        this.div = document.createElement("img");
        this.div.galleryimg = "no";
        this.div.src = this.icon.image;
    } else {
        this.div = document.createElement("div");
        this.div.style.border = "2px solid red";
        this.div.style.fontSize = "1px";
    }
    this.div.style.position = "absolute";
    this.div.style.zIndex = this.iZIndex;
    this.div.style.display = "";
    if (!isNaN(this.icon.height) && !isNaN(this.icon.width)) {
        this.div.style.height = convert2Px(this.icon.height);
        this.div.style.width = convert2Px(this.icon.width);
    }
    this.titleDiv = this.createTitleDiv();
};
Marker.prototype.createTitleDiv = function () {
    if (typeof this.title == "undefined" || this.title == null) return null;
    var pTitleDiv = this.title.createTitleDiv();
    return pTitleDiv;
};
Marker.prototype.setZIndex = function (iIndex) {
    if (this.div != null) this.div.style.zIndex = iIndex;
    if (this.titleDiv != null) this.titleDiv.style.zIndex = iIndex;
};
Marker.prototype.showTitle = function () {
    if (this.titleDiv && this.div.style.display == "") this.titleDiv.style.display = "";
};
Marker.prototype.hideTitle = function () {
    if (this.titleDiv) this.titleDiv.style.display = "none";
};
Marker.prototype.createDiv = function (pContainer) {
    if (typeof pContainer != "undefined" && pContainer != null) {
        this.map = pContainer;
    }
    pContainer.div.appendChild(this.div);
    if (this.titleDiv != null) pContainer.div.appendChild(this.titleDiv);
    this.redraw();
};
Marker.prototype.redraw = function (bIsTrue) {
    var pDivPoint = this.map.convert2WPoint(this.point.x, this.point.y);
    var iLeftOffset = 0;
    var iTopOffset = 0;
    var iWidth = 0;
    try {
        iWidth = this.dScale * this.icon.width;
        var iHeight = this.dScale * this.icon.height;
        iLeftOffset = this.dScale * this.icon.leftOffset;
        iTopOffset = this.dScale * this.icon.topOffset;
        this.div.style.left = convert2Px(pDivPoint.x + iLeftOffset - iWidth / 2);
        this.div.style.top = convert2Px(pDivPoint.y + iTopOffset - iHeight / 2);
        this.div.style.width = convert2Px(iWidth);
        this.div.style.height = convert2Px(iHeight);
    } catch (e) {
        alert("redraw:" + e.message);
        alert("坐标信息如:" + this.point.toString() + ":" + pDivPoint.toString());
    }
    if (this.titleDiv != null) {
        var iLeft;
        var iTop;
        var iWidth = this.title.fontSize * StrLength(this.title.name) / 2;
        iWidth = iWidth * this.dScale;
        var iFontSize = this.title.fontSize * this.dScale;
        this.titleDiv.style.fontSize = convert2Px(iFontSize);
        if (this.title.pos == 0) {
            iLeft = pDivPoint.x;
            iTop = pDivPoint.y - iFontSize - parseInt(this.div.style.height) / 2 + 4;
        } else if (this.title.pos == 1) {
            iLeft = pDivPoint.x + parseInt(this.div.style.width) / 2;
            iTop = pDivPoint.y - iFontSize - parseInt(this.div.style.height) / 2;
        } else if (this.title.pos == 2) {
            iLeft = pDivPoint.x + parseInt(this.div.style.width) / 2;
            iTop = pDivPoint.y - iFontSize / 2;
        } else if (this.title.pos == 3) {
            iLeft = pDivPoint.x + parseInt(this.div.style.width) / 2;
            iTop = pDivPoint.y + 4 + parseInt(this.div.style.height) / 2;
        } else if (this.title.pos == 4) {
            iLeft = pDivPoint.x;
            iTop = pDivPoint.y + 4 + parseInt(this.div.style.height) / 2;
        } else if (this.title.pos == 5) {
            iLeft = pDivPoint.x - iWidth / 2;
            iTop = pDivPoint.y + 4 + parseInt(this.div.style.height) / 2;
        } else if (this.title.pos == 6) {
            iLeft = pDivPoint.x - iWidth;
            iTop = pDivPoint.y - iFontSize / 2;
        } else {
            iLeft = pDivPoint.x - iWidth / 2;
            iTop = pDivPoint.y - 4 - iFontSize - parseInt(this.div.style.height) / 2;
        }
        iLeft = iLeft + iLeftOffset;
        iTop = iTop + iTopOffset;
        this.titleDiv.style.top = convert2Px(iTop);
        this.titleDiv.style.left = convert2Px(iLeft);
        if (this.bIsTransparent) {
            this.titleDiv.style.width = convert2Px(iWidth + this.title.fontSize);
        }
    }
};
Marker.prototype.removeFromDiv = function () {
    if (!this.div) {
        return;
    }
    this.pause();
    if (this.map) {
        this.map.div.removeChild(this.div);
        EventManager.removeNode(this.div);
        if (this.titleDiv != null) {
            this.map.div.removeChild(this.titleDiv);
            EventManager.removeNode(this.titleDiv);
        }
    }
};
Marker.prototype.openInfoWindowHtml = function (html) {
    this.map.blowupOverlay(this);
    this.map.openInfoWindow(this.point.x, this.point.y, html, true);
};
function Title(name, fontSize, pos, font, color, bgColor, bColor, bWidth) {
    this.base = iOverLay;
    this.base();
    this.name = name;
    this.title = this.name.replace(/\n/g, "<br>");
    this.fontSize = 12;
    this.pos = 7;
    this.color = "WHITE";
    this.font = "宋体";
    this.bgColor = "#015190";
    this.borderColor = "red";
    this.borderWidth = "1";
    this.div = null;
    this.bIsTransparent = false;
    this.iShowLen = -1;
    this.opacityName = "图标透明色";
    if (typeof fontSize != "undefined" && fontSize != null) {
        this.fontSize = fontSize;
    }
    if (typeof pos != "undefined" && pos != null) {
        this.pos = pos;
    }
    if (typeof font != "undefined" && font != null) {
        this.font = font;
    }
    if (typeof color != "undefined" && color != null) {
        this.color = color;
    }
    if (typeof bgColor != "undefined" && bgColor != null) {
        this.bgColor = bgColor;
    }
    if (typeof bColor != "undefined" && bColor != null) {
        this.borderColor = bColor;
    }
    if (typeof bWidth != "undefined" && bWidth != null) {
        this.borderWidth = bWidth;
    }
    this.div = this.createTitleDiv();
};
Title.prototype = new iOverLay;
Title.prototype.createTitleDiv = function () {
    var pTitleDiv = createTxt(this.title, this.bIsTransparent);
    pTitleDiv.style.zIndex = this.iZIndex;
    pTitleDiv.style.fontSize = convert2Px(this.fontSize);
    pTitleDiv.style.fontFamily = this.font;
    pTitleDiv.style.color = this.color;
    pTitleDiv.noWrap = true;
    pTitleDiv.style.border = this.borderWidth + "px solid " + this.borderColor;
    if (!this.bIsTransparent) {
        pTitleDiv.style.backgroundColor = this.bgColor;
        pTitleDiv.style.width = "auto";
        pTitleDiv.style.height = "auto";
    }
    pTitleDiv.title = this.name;
    return pTitleDiv;
};
Title.prototype.setName = function (strName, bIs) {
    this.name = strName;
    this.title = this.name.replace(/\n/g, "<br>");
    if (this.iShowLen != -1) {
        this.title = this.name.substr(0, this.iShowLen) + "...";
    }
    if (this.div != null) this.redraw();
};
Title.prototype.setShowMaxLen = function (iLen) {
    this.iShowLen = iLen;
};
Title.prototype.createDiv = function (pContainer) {
    if (typeof pContainer != "undefined" && pContainer != null) {
        this.map = pContainer;
    }
    pContainer.div.appendChild(this.div);
    this.redraw();
};
g_title_index = 0;
Title.prototype.redraw = function () {
    window.status = "==>" + g_title_index++;
    var pDivPoint = this.map.convert2WPoint(this.point.x, this.point.y);
    if (this.div != null) {
        var iLeft = pDivPoint.x;
        var iTop = pDivPoint.y;
        var iWidth = this.fontSize * StrLength(this.name) / 2;
        var iFontSize = this.fontSize;
        if (this.pos == 0) {
            iLeft = pDivPoint.x;
            iTop = pDivPoint.y - iFontSize / 2;
        } else if (this.pos == 1) {
            iLeft = pDivPoint.x + iWidth / 2;
            iTop = pDivPoint.y - iFontSize / 2;
        } else if (this.pos == 2) {
            iLeft = pDivPoint.x + iWidth / 2;
            iTop = pDivPoint.y;
        } else if (this.pos == 3) {
            iLeft = pDivPoint.x + iWidth / 2;
            iTop = pDivPoint.y + iFontSize / 2;
        } else if (this.pos == 4) {
            iLeft = pDivPoint.x;
            iTop = pDivPoint.y + iFontSize / 2;
        } else if (this.pos == 5) {
            iLeft = pDivPoint.x - iWidth / 2;
            iTop = pDivPoint.y + iFontSize / 2;
        } else if (this.pos == 6) {
            iLeft = pDivPoint.x - iWidth / 2;
            iTop = pDivPoint.y - iFontSize / 2;
        } else {
            iLeft = pDivPoint.x - iWidth / 2;
            iTop = pDivPoint.y - iFontSize / 2;
        }
        this.div.style.top = convert2Px(iTop);
        this.div.style.left = convert2Px(iLeft);
        if (this.bIsTransparent) {
            this.div.style.width = convert2Px(iWidth + this.fontSize);
        }
        if (this.div.innerHTML != this.title) {
            this.div.title = this.name;
            this.div.innerHTML = this.title;
        }
        if (this.dragObject) {
        }
    }
};
Title.prototype.removeFromDiv = function () {
    if (!this.div) {
        return
    }
    this.pause();
    if (this.map) {
        this.map.div.removeChild(this.div);
        EventManager.removeNode(this.div);
    }
};
function LegendFunc() {
    this.baseURL = "http://192.168.201.101:8888/service/GovEMap/wms?BBOX=499363.93485404254,303222.1048456149,501725.0529552169,304805.2040882361&WIDTH=400&HEIGHT=300&SRS=EPSG:NONE&layers=26&version=1.0.0&service=WMS&FORMAT=JPEG&TRANSPARENT=TRUE&request=getmap&ServiceName=wmstest";
    this.format = "http://192.168.201.101:8888/service/GovEMap/wms?BBOX=EZBOX&WIDTH=EZWIDTH&HEIGHT=EZHEIGHT&SRS=EPSG:NONE&layers=26&version=1.0.0&service=WMS&FORMAT=GIF&TRANSPARENT=TRUE&request=getmap&ServiceName=wmstest";
    this.marker = null;
    this.bIsFilter = false;
    this.div = null;
    this.bIsPNG = true;
    this.mapApp = null;
    this.opacity = 100;
    this.loadingCallback = null;
    this.completeCallback = null;
    this.refreshTime = 0;
    this.refreshTimeout = null;
};
LegendFunc.prototype.getContainer = function () {
    return this.div;
};
LegendFunc.prototype.setLoadingFunc = function (callback) {
    this.loadingCallback = callback;
};
LegendFunc.prototype.setCompleteFunc = function (callback) {
    this.completeCallback = callback;
};
LegendFunc.prototype.setRefreshTime = function (ms) {
    this.refreshTime = ms;
    if (this.refreshTimeout) {
        window.clearTimeout(this.refreshTimeout);
        this.refreshTimeout = null;
    }
    if (this.refreshTime > 0) {
        this.refreshTimeout = this.setTimeout("this.refreshURL()", this.refreshTime);
    }
};
LegendFunc.prototype.open = function (pMapApp) {
    if (pMapApp) {
        this.mapApp = pMapApp;
    } else {
        this.mapApp = getMapApp();
    }
    var pMe = this;
    var strFormat = this.format.toLowerCase();
    if (strFormat.indexOf("gif") != -1 || this.opacity < 100) {
        this.bIsPNG = false;
    }
    if (this.bIsPNG) {
        this.div = document.createElement("div");
    } else {
        this.div = document.createElement("img");
    }
    this.div.style.position = "absolute";
    this.div.style.left = "100px";
    this.div.style.top = "100px";
    this.div.style.zIndex = 10;
    this.src = this.getURL();
    this.redraw();
    this.div.oncontextmenu = function () {
        return false;
    };
    this.div.onerror = function () {
        this.style.display = "none";
    };
    this.div.onload = function () {
        if (this.saveLeft) {
            this.style.left = this.saveLeft;
            this.style.top = this.saveTop;
        }
        this.style.display = "";
    };
    var pMe = this;
    this.div.onreadystatechange = function (pele) {
        if (this.readyState == "loading") {
            if (pMe.loadingCallback) pMe.loadingCallback();
        } else if (this.readyState == "complete") {
            if (pMe.completeCallback) pMe.completeCallback();
        } else if (this.readyState == "uninitialized") {
        }
    };
    this.mapApp.map.div.appendChild(this.div);
    this.mapApp.addMapChangeListener(this.eventHandler("redraw"));
};
LegendFunc.prototype.redraw = function () {
    try {
        this.src = this.getURL();
        var iWidth = this.mapApp.map.viewSize.width;
        var iHeight = this.mapApp.map.viewSize.height;
        this.div.style.width = iWidth + "px";
        this.div.style.height = iHeight + "px";
        var pPoint = this.mapApp.map.getCenterLatLng();
        var pDivPoint = this.mapApp.map.convert2WPoint(pPoint.x, pPoint.y);
        this.div.saveLeft = (pDivPoint.x - iWidth / 2) + "px";
        this.div.saveTop = (pDivPoint.y - iHeight / 2) + "px";
        if (this.bIsPNG) {
            this.div.style.left = this.div.saveLeft;
            this.div.style.top = this.div.saveTop;
        }
        if (this.bIsPNG) {
            this.correctPNG();
        } else {
            this.div.src = this.src;
            if (this.opacity < 100) {
                this.div.style.filter = "ALPHA(opacity=" + this.opacity + ")";
            }
        }
    } catch (Err) {
        alert(Err.message);
    }
};
LegendFunc.prototype.refreshURL = function () {
    this.src = this.getURL();
    if (this.bIsPNG) {
        this.correctPNG();
    } else {
        this.div.src = this.src;
    }
    if (this.refreshTime > 0) {
        if (this.refreshTimeout) {
            window.clearTimeout(this.refreshTimeout);
            this.refreshTimeout = null;
        }
        this.refreshTimeout = this.setTimeout("this.refreshURL()", this.refreshTime);
    }
};
LegendFunc.prototype.getURL = function () {
    var strURL = this.format;
    var pMBR = getMap().getBoundsLatLng();
    var pMapSize = getMap().viewSize;
    re = /EZBOX/g;
    strURL = strURL.replace(re, pMBR.toString());
    re = /EZWIDTH/g;
    strURL = strURL.replace(re, pMapSize.width);
    re = /EZHEIGHT/g;
    strURL = strURL.replace(re, pMapSize.height);
    var pEndTime = new Date();
    strURL += "&time=" + pEndTime.getTime();
    return strURL;
};
LegendFunc.prototype.close = function () {
    this.mapApp.map.div.removeChild(this.div);
    var pMe = this;
    this.mapApp.removeMapChangeListener(this.eventHandler("redraw"));
};
LegendFunc.prototype.correctPNG = function () {
    var pDiv = this.div;
    var filters = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.src + "', sizingmethod=scale);WIDTH:" + pDiv.width + "px; HEIGHT: " + pDiv.height + "px";
    pDiv.style.filter = filters;
};
function TMLegend() {
    this.base = LegendFunc;
    this.base();
    this.themeColors = new Array();
    this.points = new Array();
    this.options = {
        "affectRadius": 100,
        "outerNum": 16
    };
    this.baseURL = "http://127.0.0.1:1001/legendSrv?";
};
TMLegend.prototype = new LegendFunc;
TMLegend.prototype.setBaseURL = function (strURL) {
    this.baseURL = strURL;
};
TMLegend.prototype.addThemeColor = function (fromValue, toValue, color) {
    this.themeColors.push({
        "fromValue": fromValue,
        "toValue": toValue,
        "color": color
    });
};
TMLegend.prototype.addPoint = function (x, y, value) {
    this.points.push({
        "x": x,
        "y": y,
        "value": value
    });
};
TMLegend.prototype.setOption = function (affectRadius, outerNum) {
    this.options["affectRadius"] = affectRadius;
    this.options["outerNum"] = outerNum;
};
TMLegend.prototype.getURL = function () {
    var pMBR = getMapApp().getBoundsLatLng();
    var pMapSize = getMapApp().map.viewSize;
    var strURL = '<?xml version="1.0" encoding="gbk" ?><ThemeReq>';
    strURL = strURL + '<Theme-Colors>';
    for (var i = 0; i < this.themeColors.length; i++) {
        var pThemeColor = this.themeColors[i];
        if (pThemeColor["fromValue"] == null || pThemeColor["fromValue"] == "") {
            strURL = strURL + '<Theme-Color toValue="' + pThemeColor["toValue"] + '" color="' + pThemeColor["color"] + '"/>';
        } else if (pThemeColor["toValue"] == null || pThemeColor["toValue"] == "") {
            strURL = strURL + '<Theme-Color fromValue="' + pThemeColor["fromValue"] + '" color="' + pThemeColor["color"] + '"/>';
        } else {
            strURL = strURL + '<Theme-Color fromValue="' + pThemeColor["fromValue"] + '" toValue="' + pThemeColor["toValue"] + '" color="' + pThemeColor["color"] + '"/>';
        }
    }
    strURL = strURL + '</Theme-Colors>';
    strURL = strURL + '<Points>';
    for (var i = 0; i < this.points.length; i++) {
        var pPoint = this.points[i];
        strURL = strURL + '<Point x="' + pPoint["x"] + '" y="' + pPoint["y"] + '" value="' + pPoint["value"] + '"/>';
    }
    strURL = strURL + '</Points>';
    strURL = strURL + '<Option affectRadius="' + this.options["affectRadius"] + '" outerNum="' + this.options["outerNum"] + '"></Option>';
    strURL = strURL + '<imgRes minx="' + pMBR.minX + '" miny="' + pMBR.minY + '" maxx="' + pMBR.maxX + '" maxy="' + pMBR.maxY + '" width="' + pMapSize.width + '" height="' + pMapSize.height + '" /></ThemeReq>';
    var strURL = this.baseURL + "xml=" + strURL;
    return strURL;
};
iOverLay.prototype.toHTML = function () {
    var pTable = document.createElement("table");
    pTable.border = 0;
    pTable.id = "InfoTable";
    pTable.align = "center";
    pTable.cellspacing = 0;
    pTable.cellpadding = 0;
    pTable.onclick = "";
    var iRowIndex = 0;
    if (g_current_editor.getLineStyle) {
        var pTW = pTable.insertRow(iRowIndex);
        pTW.height = 10;
        var pTd1 = pTW.insertCell(0);
        pTd1.innerHTML = "线的样式";
        pTd1.className = "leftBorder";
        var pTd2 = pTW.insertCell(1);
        pTd2.className = "rightBorder";
        pTd2.appendChild(this.createSelect(g_current_editor.getLineStyle()));
        iRowIndex++;
    }
    if (g_current_editor.getColor) {
        var pTW = pTable.insertRow(iRowIndex);
        pTW.height = 10;
        var pTd1 = pTW.insertCell(0);
        pTd1.innerHTML = this.colorName;
        pTd1.className = "leftBorder";
        var pTd2 = pTW.insertCell(1);
        pTd2.className = "rightBorder";
        pTd2.innerHTML = "<input size=10  style='BACKGROUND:" + g_current_editor.getColor() + "' value='" + g_current_editor.getColor() + "' onpropertychange='g_current_editor.setColor(this.value)' onclick='EzColorPicker(this,this);' ></input>";
        iRowIndex++;
    }
    if (g_current_editor.getWidth) {
        var pTW = pTable.insertRow(iRowIndex);
        pTW.height = 10;
        var pTd1 = pTW.insertCell(0);
        pTd1.innerHTML = "线的宽度";
        pTd1.className = "leftBorder";
        var pTd2 = pTW.insertCell(1);
        pTd2.className = "rightBorder";
        pTd2.innerHTML = "<input size=10 value='" + g_current_editor.getWidth() + "' onpropertychange='g_current_editor.setWidth(this.value)' ></input>";
        iRowIndex++;
    }
    if (g_current_editor.getOpacity) {
        var pTW = pTable.insertRow(iRowIndex);
        pTW.height = 10;
        var pTd1 = pTW.insertCell(0);
        pTd1.innerHTML = this.opacityName;
        pTd1.className = "leftBorder";
        var pTd2 = pTW.insertCell(1);
        pTd2.className = "rightBorder";
        pTd2.innerHTML = "<input size=10 value='" + g_current_editor.getOpacity() + "' onpropertychange='g_current_editor.setOpacity(this.value)' ></input><font color=red>0~1</font>";
        iRowIndex++;
    }
    if (g_current_editor.getFillColor) {
        var pTW = pTable.insertRow(iRowIndex);
        pTW.height = 10;
        var pTd1 = pTW.insertCell(0);
        pTd1.innerHTML = "填充颜色";
        pTd1.className = "leftBorder";
        var pTd2 = pTW.insertCell(1);
        pTd2.className = "rightBorder";
        pTd2.innerHTML = "<input size=10 style='BACKGROUND:" + g_current_editor.getFillColor() + "' value='" + g_current_editor.getFillColor() + "' onpropertychange='g_current_editor.setFillColor(this.value)' onclick='EzColorPicker(this,this);'  ></input>";
        iRowIndex++;
    }
    if (g_current_editor.getFillOpacity) {
        var pTW = pTable.insertRow(iRowIndex);
        pTW.height = 10;
        var pTd1 = pTW.insertCell(0);
        pTd1.innerHTML = "填充透明度";
        pTd1.className = "leftBorder";
        var pTd2 = pTW.insertCell(1);
        pTd2.className = "rightBorder";
        pTd2.innerHTML = "<input size=10 value='" + g_current_editor.getFillOpacity() + "'  onpropertychange='g_current_editor.setFillOpacity(this.value)'></input><font color=red>0~1</font>";
    }
    return pTable.outerHTML;
};
iOverLay.prototype.createSelect = function (strStyle) {
    var pSelectEle = document.createElement("select");
    pSelectEle.onchange = "g_current_editor.setLineStyle(this.options[this.selectedIndex].value)";
    for (var i = 0; i < this.lineStyles.length; i++) {
        var pOption = document.createElement("option");
        pOption.innerHTML = this.lineStyleNames[i];
        pOption.value = this.lineStyles[i];
        if (strStyle == this.lineStyles[i]) pOption.selected = true;
        pSelectEle.appendChild(pOption);
    }
    return pSelectEle;
};
iOverLay.prototype.showEdit = function () {
    this.openInfoWindowHtml(this.toHTML());
};
Title.prototype.setOpacity = function (arg) {
    this.opacity = arg + "";
    var el = this.div;
    if (el) {
        el.style.filter = "ALPHA(opacity=" + this.opacity * 100 + ")"
    }
};
iOverLay.prototype.getOpacity = function () {
    return this.opacity;
};
Marker.prototype.setOpacity = function (arg) {
    this.opacity = arg;
    if (this.div) {
        this.div.style.filter = "ALPHA(opacity=" + this.opacity * 100 + ")"
    }
    if (this.titleDiv) {
        this.titleDiv.style.filter = "ALPHA(opacity=" + this.opacity * 100 + ")"
    }
};
Polyline.prototype.refreshNodeSnap = function () {
    g_current_editor = this;
    var iPos = this.markers.indexOf(_CurentOverLay);
    var iMo = iPos % 2;
    if (iMo == 0) {
        if (iPos > 0) {
            var pMarker = this.markers[iPos - 1];
            var pPoint = this.markers[iPos - 2].point.getCenter(this.markers[iPos].point);
            pMarker.setPoint(pPoint);
        }
        if (iPos < this.markers.length - 2) {
            var pMarker = this.markers[iPos + 1];
            var pPoint = this.markers[iPos + 2].point.getCenter(this.markers[iPos].point);
            pMarker.setPoint(pPoint);
        }
    } else {
        for (i = iPos; i < this.markers.length; i++) {
            var pMarker = this.markers[i];
            var iMo = i % 2;
            if (iMo == 1 && (pMarker.bIsNode == true)) {
                var pFirstMarker = this.markers[i - 1];
                var pPoint = new Point((pMarker.point.x + pFirstMarker.point.x) / 2, (pMarker.point.y + pFirstMarker.point.y) / 2);
                var pMidMarker = this.createSnap(pPoint, false);
                pMidMarker.show();
                this.markers = this.markers.insert(i, pMidMarker);
            }
        }
    }
};
g_Node_iIndex = 0;
Polyline.prototype.createNodeSnap = function () {
    for (i = 0; i < this.points.length; i++) {
        this.markers.push(this.createSnap(this.points[i], true));
        if (i < this.points.length - 1) {
            var pMiddlePoint = new Point((this.points[i].x + this.points[i + 1].x) / 2, (this.points[i].y + this.points[i + 1].y) / 2);
            var pMarker = this.createSnap(pMiddlePoint, false);
            this.markers.push(pMarker);
        }
    }
};
Circle.prototype.refreshNodeSnap = function () {
    this.center.x = this.markers[0].point.x;
    this.center.y = this.markers[0].point.y;
    var pX2 = (this.markers[0].point.x - this.markers[1].point.x);
    var pY2 = (this.markers[0].point.y - this.markers[1].point.y);
    this.radius = Math.sqrt(pX2 * pX2 + pY2 * pY2);
    this.radiusUnit = this.getLocalUnit();
    this.redraw();
};
Circle.prototype.updateSnap = function () {
    this.refreshNodeSnap();
};
Circle.prototype.createNodeSnap = function () {
    this.markers.push(this.createSnap(this.center, true));
    var pPoint = new Point(this.center.x + this.radius, this.center.y);
    this.markers.push(this.createSnap(pPoint, true));
    this.redraw();
};
Rectangle.prototype.refreshNodeSnap = function () {
};
Rectangle.prototype.createNodeSnap = function () {
    for (i = 0; i < this.points.length; i++) {
        this.markers.push(this.createSnap(this.points[i], true));
    }
};
iOverLay.prototype.enableEdit = function (callback) {
    this.editable = true;
    this.startMove(this.eventHandler("redraw"));
    this.addListener("contextmenu", this.eventHandler("showPropertyEdit"));
    this.edit_callback = callback;
};
iOverLay.prototype.disableEdit = function (callback) {
    this.editable = false;
    this.stopMove();
    this.removeListener("contextmenu", this.eventHandler("showPropertyEdit"));
    if (callback) callback();
};
Polyline.prototype.enableEdit = function (callback) {
    if (this.editable) return;
    this.editable = true;
    this.markers = new Array();
    this.createNodeSnap();
    this.showSnapTimeout = null;
    this.snap_hovering = false;
    this.addListener("mouseover", this.eventHandler("showSnap"));
    this.addListener("mouseout", this.eventHandler("hideSnap"));
    this.addListener("contextmenu", this.eventHandler("showPropertyEdit"));
    this.edit_callback = callback;
};
Polyline.prototype.disableEdit = function (callback) {
    if (!this.editable) return;
    this.editable = false;
    this.deleteSnap();
    this.removeListener("mouseover", this.eventHandler("showSnap"));
    this.removeListener("mouseout", this.eventHandler("hideSnap"));
    this.removeListener("contextmenu", this.eventHandler("showPropertyEdit"));
    this.edit_callback = null;
    if (callback) callback();
};
g_update_point = null;
g_snap_hovering = false;
g_snap_show = false;
g_snap_index = 0;
Polyline.prototype.createSnap = function (pPoint, bIsNode) {
    var pIcon = new Icon();
    if (bIsNode) {
        pIcon.image = null;
    } else {
        pIcon.image = null;
    }
    pIcon.height = 12;
    pIcon.width = 12;
    pIcon.topOffset = 0;
    pIcon.leftOffset = 0;
    var marker = new Marker(pPoint, pIcon);
    marker.nodeIndex = g_Node_iIndex++;
    marker.createDiv(this.map);
    marker.hide();
    marker.setNode(bIsNode);
    marker.startMove(this.eventHandler("updateSnap"));
    marker.addListener("mouseover", this.eventHandler("snap_hovering_true"));
    marker.addListener("mouseout", this.eventHandler("snap_hovering_false"));
    return marker;
};
Polyline.prototype.snap_hovering_true = function () {
    this.snap_hovering = true;
};
Polyline.prototype.snap_hovering_false = function () {
    this.snap_hovering = false;
};
Polyline.prototype.updateSnap = function () {
    this.points.clear();
    for (i = 0; i < this.markers.length; i++) {
        if (this.markers[i].div != null && this.markers[i].bIsNode) this.points.push(this.markers[i].point);
    }
    this.redraw();
    this.setTimeout("this.refreshNodeSnap()", 10);
};
Polygon.prototype.updateSnap = function () {
    this.points.clear();
    for (i = 0; i < this.markers.length; i++) {
        if (this.markers[i].div != null && this.markers[i].bIsNode) this.points.push(this.markers[i].point);
    }
    this.points.push(this.markers[0].point);
    this.redraw();
    this.setTimeout("this.refreshNodeSnap()", 10);
};
Polyline.prototype.delayShowSnap = function () {
    if (g_snap_show) return;
    for (i = 0; i < this.markers.length; i++) {
        this.markers[i].show();
    }
    g_snap_show = true;
};
Polyline.prototype.delayHideSnap = function () {
    if (this.snap_hovering || !g_snap_show) return;
    for (i = 0; i < this.markers.length; i++) {
        this.markers[i].hide();
    }
    g_snap_show = false;
};
Polyline.prototype.showSnap = function () {
    if (this.showSnapTimeout != null) {
        window.clearTimeout(this.showSnapTimeout);
        this.showSnapTimeout = null;
    }
    this.showSnapTimeout = this.setTimeout("this.delayShowSnap()", 300);
};
Polyline.prototype.hideSnap = function () {
    if (this.showSnapTimeout != null) {
        window.clearTimeout(this.showSnapTimeout);
        this.showSnapTimeout = null;
    }
    this.panTimeout = this.setTimeout("this.delayHideSnap()", 300);
};
Polyline.prototype.deleteSnap = function () {
    if (!this.markers) return;
    for (i = 0; i < this.markers.length; i++) {
        var marker = this.markers[i];
        marker.removeFromDiv();
    }
    this.markers.clear();
};
Polyline.prototype.redrawSnap = function () {
    if (!this.markers) return;
    for (i = 0; i < this.markers.length; i++) {
        var marker = this.markers[i];
        marker.redraw();
    }
};
function GetQuadtreeAddress(lon, lat, izoom) {
    var PI = 3.1415926535897;
    var digits = 18;
    var x = (180.0 + parseFloat(lon)) / 360.0;
    var y = -parseFloat(lat) * PI / 180;
    y = 0.5 * Math.log((1 + Math.sin(y)) / (1 - Math.sin(y)));
    y *= 1.0 / (2 * PI);
    y += 0.5;
    var quad = "t";
    var lookup = "qrts";
    alert(x + ":" + y);
    while (digits-- > izoom) {
        x -= Math.floor(x);
        y -= Math.floor(y);
        quad = quad + lookup.substr((x >= 0.5 ? 1 : 0) + (y >= 0.5 ? 2 : 0), 1);
        x *= 2;
        y *= 2;
    }
    return quad;
};
function check_ip(UserIp, NetIP) {
    var bIsOK = true;
    var pUserIPUnits = UserIp.split(".");
    var pNetIPUnits = NetIP.split(".");
    for (var iIndex = 0; iIndex < 4; iIndex++) {
        var NetIP = pNetIPUnits[iIndex];
        if (pUserIPUnits[iIndex] == NetIP) {
            continue;
        } else if (NetIP.indexOf("*") != -1) {
            continue;
        } else {
            var pIPRang = NetIP.split("/");
            if (pIPRang.length > 1) {
                var iIP1 = parseInt(pIPRang[0]);
                var iIP2 = parseInt(pIPRang[1]);
                var iIP = parseInt(pUserIPUnits[iIndex]);
                if (iIP > Math.max(iIP1, iIP2) || iIP < Math.min(iIP1, iIP2)) {
                    bIsOK = false;
                    break;
                }
            } else {
                bIsOK = false;
                break;
            }
        }
    }
    return bIsOK;
};
MainFrame.prototype.about = function () {
    var m_Version = "版权所有(2002-2007) 北京山海经纬信息技术有限公司 www.easymap.com.cn.";
    m_Version += "\n山海经纬地图引擎服务系统，版本:6.3.1,发布时间2007-07-2日";
    m_Version += "\n技术支持:吴杰,Email:medson@163.com;MSN:wujie714@hotmail.com.cn";
    alert(m_Version);
};
MapsApp.prototype.about = function () {
    this.map.about();
};
MapsApp.getMeter = function (pPoint, dDegree) {
    var pPoint1 = new Point(pPoint.x + dDegree, pPoint.y);
    var dMeter = GetDistanceInLL(pPoint, pPoint1);
    return dMeter;
};
MapsApp.prototype.getMeter = MapsApp.getMeter;
MapsApp.getDegree = function (pPoint, dMeter) {
    var dDegree = 1;
    var pPoint1 = new Point(pPoint.x + dDegree, pPoint.y);
    var dMeter1 = GetDistanceInLL(pPoint, pPoint1);
    var dResult = dDegree * dMeter / dMeter1;
    return dResult;
};
MapsApp.prototype.getDegree = MapsApp.getDegree;
MapsApp.prototype.switchMapServer = function (iIndex) {
    if (typeof iIndex == "undefined") {
        alert("参数不能为空，参数可选:0|1|2");
        return;
    }
    if (iIndex == 0) {
        this.map.setVectorMap();
    } else if (iIndex == 1) {
        this.map.setSatelliteMap();
    } else if (iIndex == 2) {
        this.map.setVectorSateMap();
    } else {
        alert("参数有效值为:0|1|2");
    }
};
function MapControl() {
    this.div = document.createElement("div");
    this.div.style.left = convert2Px(8);
    this.div.style.top = convert2Px(8);
    this.div.style.position = "absolute";
};
MapControl.prototype.init = function (pMe) {
    if (pMe instanceof MainFrame) {
        pMe.createZoomControls(this.div);
        pMe.createZoomSlider(this.div);
    }
};
MapControl.prototype.getContainer = function () {
    return this.div;
};
function MapStandControl() {
    this.base = MapControl;
    this.base();
};
MapStandControl.prototype = new MapControl();
MapStandControl.prototype.init = function (pMe) {
    if (pMe instanceof MainFrame) {
        pMe.createPanningControls(this.div);
        pMe.createZoomControls(this.div);
        pMe.createZoomSlider(this.div);
    }
};
function MapSmallControl() {
    this.base = MapControl;
    this.base();
};
MapSmallControl.prototype = new MapControl();
MapSmallControl.prototype.init = function (pMe) {
    if (pMe instanceof MainFrame) {
        pMe.createSmallPanningControls(this.div);
        pMe.createSmallZoomControls(this.div);
    }
};
MapServerControl.prototype = new MapControl();
MapServerControl.prototype.init = function (pMe) {
    if (pMe instanceof MainFrame) {
        pMe.createSmallPanningControls(this.div);
        pMe.createSmallZoomControls(this.div);
    }
};
MainFrame.prototype.addControl = function (pControl) {
    this.container.appendChild(pControl.div);
    if (pControl.init) {
        pControl.init(this);
    } else {
        pControl.init(this);
    }
};
MapsApp.prototype.showStandMapControl = function () {
    this.map.showStandMapControl();
};
MapsApp.prototype.showSmallMapControl = function () {
    this.map.showSmallMapControl();
};
MapsApp.prototype.addControl = function (pControl) {
    this.map.addControl(pControl);
};
function Qh(Cf) {
    if (!Cf) return;
    if (window.clipboardData) {
        Cf.onpaste = Ki;
        Cf.ondrop = ah
    }
    return true
};
function Ki(b) {
    var Dc = document.selection;
    if (Dc) {
        var Ub = Dc.createRange();
        if (Ub) {
            var yd = window.clipboardData.getData("Text");
            if (yd) {
                Ub.text = Ve(yd, null);
                return false
            }
        }
    }
    return true
};
var Sc = null;
function ah(b) {
    if (!b) b = window.event;
    if (b.dataTransfer) {
        Sc = Ve(b.dataTransfer.getData("Text"), null);
        setTimeout("_finishDrop()", 1)
    }
    return true
};
function _finishDrop() {
    if (!Sc) return;
    var Dc = document.selection;
    if (Dc) {
        var Ub = Dc.createRange();
        if (Ub) {
            Ub.text = Sc;
            Ub.select()
        }
    }
    Sc = null;
};
var _makePasteBox = Qh;
function Ve(str, Td) {
    if (!Td) Td = ", ";
    var jc = str.replace(/^[ \r\n\t\v]+/g, "");
    jc = jc.replace(/[ \r\n\t\v]+$/g, "");
    jc = jc.replace(/[ \t\v]*\r?\n[\r\n]*[ \t\v]*/g, Td);
    return jc
};
function MultiMaps() {
    this.maps = new Array();
};
MultiMaps.curMap = null;
MultiMaps.prototype.openMap = function (id, ver) {
    var m_MapApp = null;
    if (typeof id == "string") {
        m_MapApp = new EzMap(document.getElementById(id));
    } else {
        m_MapApp = new EzMap(id);
    }
    m_MapApp.showMapServer();
    m_MapApp.showSmallMapControl();
    if (ver) {
        m_MapApp.showVersion(ver);
    }
    m_MapApp.addMapChangeListener(this.eventHandler("refreshAllMap"));
    this.maps.push(m_MapApp);
    return m_MapApp;
};
MultiMaps.prototype.refreshAllMap = function () {
    if (_bIsLocked) return;
    _bIsLocked = true;
    for (var i = 0; i < this.maps.length; i++) {
        var pMap = this.maps[i];
        if (pMap.getZoomLevel() != _curentLevel) {
            pMap.centerAndZoom(_curentPoint, _curentLevel);
        } else if (!pMap.getCenterLatLng().approxEquals(_curentPoint)) {
            pMap.recenterOrPanToLatLng(_curentPoint);
        }
    }
    window.setTimeout("_bIsLocked=false;", 300);
};
MultiMaps.prototype.refreshAllMap_ = function () {
    _bIsLocked = true;
    for (var i = 0; i < this.maps.length; i++) {
        var pMap = this.maps[i];
        pMap.map.clearStateChanged();
    }
    for (var i = 0; i < this.maps.length; i++) {
        var pMap = this.maps[i];
        if (pMap.getZoomLevel() != _curentLevel) {
            pMap.centerAndZoom(_curentPoint, _curentLevel);
        } else {
            pMap.recenterOrPanToLatLng(_curentPoint);
        }
    }
    this.setTimeout("this.addMapList()", 200);
};
MultiMaps.prototype.addMapList = function () {
    for (var i = 0; i < this.maps.length; i++) {
        var pMap = this.maps[i];
        pMap.addMapChangeListener(this.eventHandler("refreshAllMap"));
    }
    _bIsLocked = false;
};
MultiMaps.prototype.zoomInExt = function () {
    for (var i = 0; i < this.maps.length; i++) {
        var pMap = this.maps[i];
        pMap.zoomInExt();
    }
};
MultiMaps.prototype.zoomOutExt = function () {
    for (var i = 0; i < this.maps.length; i++) {
        var pMap = this.maps[i];
        pMap.zoomOutExt();
    }
};
MultiMaps.prototype.pan = function () {
    for (var i = 0; i < this.maps.length; i++) {
        var pMap = this.maps[i];
        pMap.pan();
    }
};
MutiMaps = MultiMaps;
function MapServer(pVectMap, pSateMap, pVectSate) {
    var pMapArray = new Array();
    for (var i = 0; i < arguments.length; i++) {
        var pArg = arguments[i];
        if (pArg instanceof Array) {
            pMapArray.push(pArg);
        } else if (typeof pArg == "string") {
            pMapArray.push([pArg]);
        } else {
            alert("无法判断类型");
            return;
        }
    }
    this.vectMap = pMapArray[0];
    this.sateMap = pMapArray[1];
    this.vectSate = pMapArray[2];
};
_VersArray = new Array();
_VersInfo = new Array();
MainFrame.addVersion = function (strVersion, pMapServer) {
    if (pMapServer && pMapServer instanceof MapServer) {
        _VersArray[strVersion] = pMapServer;
        _VersInfo.push(strVersion);
    } else {
        alert("pMapServer为空或不是MapServer类型！");
    }
};
MainFrame.getVersionInfo = function () {
    return _VersInfo.join(',');
};
MapsApp.prototype.getVersionInfo = function () {
    return _VersInfo.join(',');
};
MapsApp.getVersionInfo = function () {
    return _VersInfo.join(',');
};
MainFrame.prototype.showVersion = function (strVersion) {
    if (_VersArray) {
        var pMapServer = _VersArray[strVersion];
        if (pMapServer != null) {
            this.vectorMapService = pMapServer.vectMap;
            this.satelliteMapService = pMapServer.sateMap;
            this.vectorSateMapService = pMapServer.vectSate;
            this.curMapServerHander();
        } else {
            alert("没有[" + strVersion + "]版本的数据！");
        }
    } else {
        alert("没有版本数据！");
    }
};
MapsApp.prototype.showVersion = function (strVersion) {
    this.map.showVersion(strVersion);
};
MapsApp.addVersion = function (strVersion, pMapServer) {
    MainFrame.addVersion(strVersion, pMapServer);
};
g_menu = new Array();
function MenuObject(name, func) {
    this.name = name;
    this.func = func;
};
g_menu.push(new MenuObject("属性", "g_current_editor.showEdit()"));
g_menu.push(new MenuObject("删除", "getMapApp().removeOverlay(g_current_editor)"));
g_menu.push(null);
g_menu.push(new MenuObject("放大", "getMapApp().zoomIn()"));
g_menu.push(new MenuObject("缩小", "getMapApp().zoomOut()"));
g_menu.push(new MenuObject("在此居中地图", "getMapApp().centerAtMouse()"));
MapsApp.prototype.editOverlay = function () {
    this.initMenu();
};
MapsApp.prototype.initMenu = function () {
    if (!this.menuContainer) {
        this.menuContainer = createDiv("");
        this.menuContainer.className = "contextmenu";
        this.map.container.appendChild(this.menuContainer);
        BindingEvent(this.map.container, "click", this.eventHandler("hideMenu"));
    }
};
MapsApp.prototype.centerAtMouse = function () {
    if (typeof this.mousePoint != "undefined") {
        this.map.centerAtLatLng(this.mousePoint);
    }
};
MapsApp.prototype.showMenu = function () {
    this.mousePoint = new Point(this.map.mouseLng, this.map.mouseLat);
    this.initMenu();
    this.menuContainer.innerHTML = "";
    var mHeight = 20,
        mWidth = 100;
    var nlens = 0;
    for (var i = 0; i < g_menu.length; i++) {
        var pDiv = document.createElement("div");
        this.menuContainer.appendChild(pDiv);
        var pObj = g_menu[i];
        if (pObj == null) {
            pDiv.className = "divider";
            continue;
        }
        pDiv.style.width = mWidth + "px";
        pDiv.innerHTML = pObj.name;
        pDiv.className = "menuitem";
        pDiv.func = pObj.func;
        pDiv.onmouseover = function () {
            this.className = "menuitem selectedmenuitem";
        };
        pDiv.onmouseout = function () {
            this.className = "menuitem";
        };
        pDiv.onclick = function () {
            eval(this.func);
        }
    }
    this.menuContainer.style.display = "";
    var pOffset = ObjectOffset(this.map.container);
    this.menuContainer.style.pixelTop = event.clientY - pOffset.y;
    this.menuContainer.style.pixelLeft = event.clientX - pOffset.x;
    return false;
};
MapsApp.prototype.getCurrentEditor = function () {
    return g_current_editor;
};
MapsApp.prototype.hideMenu = function () {
    this.menuContainer.style.display = "none";
    var pOffset = ObjectOffset(this.map.container);
    this.menuContainer.style.pixelTop = event.clientY - pOffset.y;
    this.menuContainer.style.pixelLeft = event.clientX - pOffset.x;
    return false;
};
function getOffsetLeft(a) {
    return a == document.body ? 0 : a.offsetLeft + getOffsetLeft(a.offsetParent)
};
function getOffsetTop(a) {
    return a == document.body ? 0 : a.offsetTop + getOffsetTop(a.offsetParent)
};
var colours = new Array("#FFFFFF", "#FFCCCC", "#FFCC99", "#FFFF99", "#FFFFCC", "#99FF99", "#99FFFF", "#CCFFFF", "#CCCCFF", "#FFCCFF", "#CCCCCC", "#FF6666", "#FF9966", "#FFFF66", "#FFFF33", "#66FF99", "#33FFFF", "#66FFFF", "#9999FF", "#FF99FF", "#C0C0C0", "#FF0000", "#FF9900", "#FFCC66", "#FFFF00", "#33FF33", "#66CCCC", "#33CCFF", "#6666CC", "#CC66CC", "#999999", "#CC0000", "#FF6600", "#FFCC33", "#FFCC00", "#33CC00", "#00CCCC", "#3366FF", "#6633FF", "#CC33CC", "#666666", "#990000", "#CC6600", "#CC9933", "#999900", "#009900", "#339999", "#3333FF", "#6600CC", "#993399", "#333333", "#660000", "#993300", "#996633", "#666600", "#006600", "#336666", "#000099", "#333399", "#663366", "#000000", "#330000", "#663300", "#663333", "#333300", "#003300", "#003333", "#000066", "#330099", "#330033");
var g_divPreview;
var g_ColorHex;
var g_color_palette = null;
function mouseOver(el, Colour) {
    if (g_divPreview) g_divPreview.style.background = Colour;
    if (g_ColorHex) g_ColorHex.value = Colour;
    el.style.borderColor = '#FFFFFF';
};
function mouseOut(el) {
    el.style.borderColor = '#666666';
};
function mouseDown(Colour) {
    if (g_ColorHex) g_ColorHex.value = Colour;
    if (g_color_palette) g_color_palette.style.display = 'none';
};
function EzColorPicker(divPreview, ColorHex) {
    if (typeof divPreview == "string") {
        g_divPreview = Obj(divPreview);
    } else {
        g_divPreview = divPreview;
    }
    if (typeof ColorHex == "string") {
        g_ColorHex = Obj(ColorHex);
    } else {
        g_ColorHex = ColorHex;
    }
    if (!g_color_palette) {
        g_color_palette = document.createElement("div");
        g_color_palette.style.width = "200px";
        g_color_palette.style.height = "150px";
        g_color_palette.style.position = "absolute";
        document.body.appendChild(g_color_palette);
        code = "<table class='tblPalette' cellpadding='0' cellspacing='1' border='2'>";
        for (i = 0; i < 70; i++) {
            if ((i) % 10 == 0) code += "<tr>";
            code += "<td id='el_" + i + "' bgcolor=" + colours[i] + " onMouseOver=\"mouseOver(this, '" + colours[i] + "');\" onMouseOut='mouseOut(this)' onclick=\"mouseDown('" + colours[i] + "');return false;\">&nbsp;</td>\n";
            if ((i + 1) % 10 == 0) code += "</tr>\n";
        }
        g_color_palette.innerHTML = code + "</table>";
    }
    g_color_palette.style.top = getOffsetTop(g_divPreview);
    g_color_palette.style.left = getOffsetLeft(g_divPreview) + 40;
    g_color_palette.style.display = '';
};
function Obj(name) {
    return document[name] || (document.all && document.all[name]) || (document.getElementById && document.getElementById(name));
};
EzColorPicker.close = function () {
    if (g_color_palette) g_color_palette.style.display = 'none';
}