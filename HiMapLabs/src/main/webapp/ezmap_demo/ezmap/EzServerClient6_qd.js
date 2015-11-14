EzServerClient.GlobeFunction = {};
if (typeof(EzServerClient.GlobeParams.MapSrcURL[0][1]) != "undefined") {
    if (EzServerClient.GlobeParams.MapSrcURL.length < 1) {
        throw new Error("EzServerClient.GlobeParams.MapSrcURL������Ҫ��һ��ͼƬ����ĵ�ַ")
    }
    _VectorMapService = EzServerClient.GlobeParams.MapSrcURL[0]
} else {
    _VectorMapService = [""]
}
if (typeof(EzServerClient.GlobeParams.SatelliteMapSrcURL) != "undefined") {
    _SatelliteMapService = EzServerClient.GlobeParams.SatelliteMapSrcURL
} else {
    _SatelliteMapService = [""]
}
if (typeof(EzServerClient.GlobeParams.VectorSateMapSrcURL) != "undefined") {
    _VectorSateMapService = EzServerClient.GlobeParams.VectorSateMapSrcURL
} else {
    _VectorSateMapService = [""]
}
if (typeof(EzServerClient.GlobeParams.Copyright) != "undefined") {
    _mCopyright = EzServerClient.GlobeParams.Copyright
} else {
    _mCopyright = [""]
}
if (typeof(EzServerClient.GlobeParams.Version) != "undefined") {
    _Ver = EzServerClient.GlobeParams.Version
}
_LineWidth = 1;
_LineColor = "Yellow";
if (typeof(EzServerClient.GlobeParams.MapFullExtent) != "undefined") {
    _FullExtentMBR = EzServerClient.GlobeParams.MapFullExtent
}
if (typeof(_FullExtentMBR) != "undefined" && _FullExtentMBR.length == 4) {
    _MapCenter = [(_FullExtentMBR[2] + _FullExtentMBR[0]) / 2, (_FullExtentMBR[3] + _FullExtentMBR[1]) / 2]
}
if (typeof(EzServerClient.GlobeParams.MapInitLevel) != "undefined") {
    _InitLevel = EzServerClient.GlobeParams.MapInitLevel
}
if (typeof(EzServerClient.GlobeParams.MapMaxLevel) != "undefined") {
    _MaxLevel = EzServerClient.GlobeParams.MapMaxLevel
}
if (typeof(EzServerClient.GlobeParams.ZoomOffset) != "undefined") {
    _ZoomOffset = EzServerClient.GlobeParams.ZoomOffset
} else {
    _ZoomOffset = 0
}
if (typeof(EzServerClient.GlobeParams.MapConvertScale) != "undefined") {
    _convert_scale = EzServerClient.GlobeParams.MapConvertScale
} else {
    _convert_scale = 114699
}
if (typeof(EzServerClient.GlobeParams.MapConvertOffsetX) != "undefined") {
    _convert_ofsx = EzServerClient.GlobeParams.MapConvertOffsetX
} else {
    _convert_ofsx = 0
}
if (typeof(EzServerClient.GlobeParams.MapConvertOffsetY) != "undefined") {
    _convert_ofsy = EzServerClient.GlobeParams.MapConvertOffsetY
} else {
    _convert_ofsy = 0
}
bLoadEzMapParameter = true;
_bIsWriteFile = true;
if (typeof(EzServerClient.GlobeParams.MapUnitPixels) != "undefined") {
    _MapUnitPixels = EzServerClient.GlobeParams.MapUnitPixels
}
if (typeof(EzServerClient.GlobeParams.MapCoordinateType) != "undefined") {
    _MapSpanScale = EzServerClient.GlobeParams.MapCoordinateType
}
if (typeof(EzServerClient.GlobeParams.IsOverlay) != "undefined") {
    _bIsOverlay = EzServerClient.GlobeParams.IsOverlay
}
if (typeof(EzServerClient.GlobeParams.MapProx) != "undefined") {
    _bMapProx = EzServerClient.GlobeParams.MapProx
}
if (typeof(EzServerClient.GlobeParams.EzServerClientURL) != "undefined") {
    m_EzServer = EzServerClient.GlobeParams.EzServerClientURL
} else {
    m_EzServer = "/EzServerClient"
}
if (typeof(EzServerClient.GlobeParams.EzMapServiceURL) != "undefined") {
    m_MapServer = EzServerClient.GlobeParams.EzMapServiceURL
} else {
    m_MapServer = "/EzMapService"
}
var m_logService = "";
var m_EzMapService = "";
var m_mapService_servlet = "";
if (typeof m_EzServer != "undefined") {
    m_logService = m_EzServer + "/ezmanager"
}
if (typeof m_MapServer != "undefined") {
    m_EzMapService = m_MapServer + "/MapService_v6"
}
if (typeof m_MapServer != "undefined") {
    var m_mapService_servlet = m_EzMapService + "/mapserviceServlet"
}
EzErrorFactory = {
    createError: function(b, c) {
        if (c) {
            return new Error(b + "\r\n����:" + c.message)
        } else {
            return new Error(b)
        }
    }
};
EzServerClient.GlobeFunction.isTypeRight = function(param1, type) {
    switch (type) {
    case "string":
        if (typeof param1 == "string") {
            return true
        } else {
            return false
        }
    case "int":
        if (typeof param1 == "number") {
            if (param1.toString().indexOf(".") == -1) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    case "float":
        if (typeof param1 == "number") {
            return true
        } else {
            return false
        }
    case "number":
        if (typeof param1 == "number") {
            return true
        } else {
            return false
        }
    case "boolean":
        if (typeof param1 == "boolean") {
            return true
        } else {
            return false
        }
    case "function":
        if (typeof param1 == "function") {
            return true
        } else {
            return false
        }
    case "object":
        if (typeof param1 == "object") {
            return true
        } else {
            return false
        }
    case "undefined":
        if (typeof param1 == "undefined") {
            return true
        } else {
            return false
        }
    default:
        if (param1 instanceof eval(type)) {
            return true
        } else {
            return false
        }
    }
};
EzServerClient.GlobeFunction.getContextPath = function() {
    var b = document.location.toString();
    var d = "";
    if (b.indexOf("://") != -1) {
        d += b.substring(0, b.indexOf("//") + 2);
        b = b.substring(b.indexOf("//") + 2, b.length)
    }
    var c = b.indexOf("/");
    d += b.substring(0, c + 1);
    b = b.substring(c + 1);
    c = b.indexOf("/");
    d += b.substring(0, c + 1);
    return d
};
EzServerClient.GlobeFunction.EzEncoding = function(d) {
    var g = new String();
    for (var b = 0; b < d.length; b++) {
        var f = d.charAt(b);
        g += EzServerClient.GlobeFunction.EzEncodingChar(f)
    }
    return g
};
EzServerClient.GlobeFunction.EzEncodingChar = function(b) {
    switch (b.charCodeAt(0)) {
    case 60:
        return "&lt;";
    case 38:
        return "&amp;";
    case 62:
        return "&gt;";
    case 34:
        return "&quot;";
    default:
        return "" + b
    }
};
if (typeof EzEventListener == "undefined" || !EzEventListener) {
    var EzEventListener = function(d, b, c) {
        this.source = d;
        this.eventType = b;
        this.handler = c
    };
    EzEventListener.prototype = {
        getTarget: function() {
            return this.source
        },
        getHandler: function() {
            return this.handler
        },
        getEventType: function() {
            return this.eventType
        }
    }
}
if (typeof EzEvent == "undefined" || !EzEvent) {
    var EzEvent = {
        MAP_LOAD: "mapload",
        MAP_UNLOAD: "mapunload",
        MAP_ADDOVERLAY: "mapaddoverlay",
        MAP_REMOVEOVERLAY: "mapremoveoverlay",
        MAP_CLEAROVERLAYS: "mapclearoverlays",
        MAP_CLICK: "mapclick",
        MAP_DBCLICK: "mapdbclick",
        MAP_ZOOMCHANGE: "mapzoomchange",
        MAP_ZOOMSTART: "mapzoomstart",
        MAP_ZOOMEND: "mapzoomend",
        MAP_PAN: "mappan",
        MAP_PANSTART: "mappanstart",
        MAP_PANEND: "mappanend",
        MAP_MOUSEDOWN: "mapmousedown",
        MAP_MOUSEMOVE: "mapmousemove",
        MAP_MOUSEOUT: "mapmouseout",
        MAP_MOUSEOVER: "mapmouseover",
        MAP_MOUSEUP: "mapmouseup",
        MAP_MOUSEWHEEL: "mapmousewheel",
        MAP_EXTENTCHANGE: "mapextentchange"
    }
}
EzEvent.addEventListener = function(f, c, d) {
    f.addEventListener(c, d);
    var b = new EzEventListener(f, c, d);
    return b
};
EzEvent.removeEventListener = function(b) {
    var f = b.getTarget();
    var d = b.getHandler();
    var c = b.getEventType();
    f.removeEventListener(c, d)
};
EzEvent.trigger = function(b, c) {
    var f = b.getTarget();
    var d = b.getEventType();
    f.fireEvent(d, c)
};
EzEvent.clearInstanceEventListeners = function(c, b) {
    delete c["on" + b]
};
EzEvent.clearEventListeners = function(b) {
    delete b["on" + this.MAP_ZOOMSTART];
    delete b["on" + this.MAP_ZOOMEND];
    delete b["on" + this.MAP_ZOOMCHANGE];
    delete b["on" + this.MAP_PANSTART];
    delete b["on" + this.MAP_PANEND];
    delete b["on" + this.MAP_PAN]
};
function vmlGraphics(g, f, d, b, c) {
    this.Container = c;
    this.origin = "0,0";
    this.originWidth = d;
    this.originHeight = b;
    this.originSize = this.originWidth + "," + this.originHeight;
    this.scale = 1;
    this.originY = 0;
    this.backgroundColor = "white";
    this.Shadow = false;
    this.BorderWidth = 0;
    this.stroke = null;
    this.strokeColor = "red";
    this.strokeWidth = 0;
    this.fill = null;
    this.fillColor = "blue";
    this.opacity = 0.9;
    this.left = g + "px";
    this.top = f + "px";
    this.width = d + "px";
    this.height = b + "px";
    this.BorderColor = "red";
    this.groupObj = null;
    this.init();
    this.RandColor = function() {
        return "rgb(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + ")"
    }
}
vmlGraphics.prototype.setScale = function(b) {
    this.scale = b
};
vmlGraphics.prototype.setOrigin = function(c, b) {
    this.origin = c * this.scale + "," + b * this.scale;
    this.groupObj.coordorigin = this.origin
};
vmlGraphics.prototype.setOriginSize = function(b, c) {
    this.originHeight = c * this.scale;
    this.originWidth = b * this.scale;
    this.originSize = this.originWidth + "," + this.originHeight;
    this.groupObj.coordsize = this.originSize
};
vmlGraphics.prototype.setLeftTop = function(b, c) {
    this.left = b * this.scale + "px";
    this.top = c * this.scale + "px";
    this.groupObj.style.left = this.left;
    this.groupObj.style.top = this.top
};
vmlGraphics.prototype.setStroke = function(c, d) {
    var b = document.createElement("v:stroke");
    b.color = c;
    b.weight = d;
    this.stroke = b;
    this.strokeColor = c;
    this.strokeWidth = d
};
vmlGraphics.prototype.setFillColor = function(b) {
    if (b == "") {
        this.fill = null;
        this.fillColor = null
    } else {
        var c = document.createElement("v:fill");
        c.color = b;
        this.fill = c;
        this.fillColor = b
    }
};
vmlGraphics.prototype.getFillStyle = function() {
    var b = document.createElement("v:fill");
    b.color = this.fillColor;
    b.opacity = this.opacity;
    b.type = "frame";
    return b
};
vmlGraphics.prototype.getStroke = function() {
    var b = document.createElement("v:stroke");
    b.color = this.strokeColor;
    b.weight = this.strokeWidth;
    return b
};
vmlGraphics.prototype.init = function() {
    var b = document.createElement("v:group");
    b.style.position = "absolute";
    b.style.left = this.left;
    b.style.top = this.top;
    b.id = "vml";
    b.style.width = this.width;
    b.style.height = this.height;
    b.unselectable = "on";
    b.coordsize = this.originSize;
    this.setStroke("blue", 2);
    this.groupObj = b;
    this.Container.appendChild(b)
};
vmlGraphics.prototype.Zoom = function(b) {
    this.groupObj.coordsize = parseInt(this.originWidth / b) + "," + parseInt(this.originHeight / b)
};
vmlGraphics.prototype.drawPoint = function(d, c, f) {
    var b = document.createElement("v:oval");
    b.style.position = "absolute";
    b.style.left = d * this.scale - f / 2;
    b.style.top = c * this.scale - f / 2;
    b.style.width = f * this.scale;
    b.style.height = f * this.scale;
    this.groupObj.appendChild(b);
    b.appendChild(this.getStroke());
    b.appendChild(this.getFillStyle());
    return b
};
vmlGraphics.prototype.drawLine = function(c, b, g, f) {
    var d = document.createElement("v:line");
    d.style.position = "absolute";
    d.style.top = 0;
    d.style.left = 0;
    d.from = c * this.scale + "," + b * this.scale;
    d.to = g * this.scale + "," + f * this.scale;
    this.groupObj.appendChild(d);
    d.appendChild(this.getStroke());
    return d
};
vmlGraphics.prototype.drawRect = function(c, b, f, g) {
    var d = document.createElement("v:rect");
    d.style.position = "absolute";
    d.style.left = c * this.scale;
    d.style.top = b * this.scale;
    d.style.width = f * this.scale;
    d.style.height = g * this.scale;
    this.groupObj.appendChild(d);
    d.appendChild(this.getStroke());
    d.appendChild(this.getFillStyle());
    return d
};
vmlGraphics.prototype.drawRoundrect = function(c, h, b, g, d) {
    var f = document.createElement("v:roundrect");
    f.style.position = "absolute";
    f.style.left = c * this.scale;
    f.style.top = h * this.scale;
    f.style.arcsize = d;
    f.style.width = b * this.scale;
    f.style.height = g * this.scale;
    this.groupObj.appendChild(f);
    f.appendChild(this.getStroke());
    f.appendChild(this.getFillStyle());
    return f
};
vmlGraphics.prototype.drawOval = function(b, g, d, f) {
    var c = document.createElement("v:oval");
    c.style.position = "absolute";
    c.style.left = b * this.scale;
    c.style.top = g * this.scale;
    c.style.width = d * this.scale;
    c.style.height = f * this.scale;
    this.groupObj.appendChild(c);
    c.appendChild(this.getStroke());
    c.appendChild(this.getFillStyle());
    return c
};
vmlGraphics.prototype.drawPolyline = function(h, c, d) {
    var g = document.createElement("v:polyline");
    g.style.position = "absolute";
    g.style.left = 0;
    g.style.top = 0;
    var b = "100,100,100,100";
    g.points = b;
    this.groupObj.appendChild(g);
    g.appendChild(this.getStroke());
    if (!h || !c || !d) {
        return g
    }
    b = "";
    for (var f = 0; f < d - 1; f++) {
        b = b + h[f] * this.scale + "," + c[f] * this.scale + ","
    }
    b = b + h[d - 1] * this.scale + "," + c[d - 1] * this.scale;
    g.points.value = b;
    g.filled = "false";
    return g
};
vmlGraphics.prototype.drawPolygon = function(h, g, d) {
    var c = document.createElement("v:polyline");
    c.style.position = "absolute";
    c.style.left = 0;
    c.style.top = 0;
    var b = "0,0,0,0,0,0";
    c.points = b;
    this.groupObj.appendChild(c);
    c.appendChild(this.getStroke());
    c.appendChild(this.getFillStyle());
    if (!h) {
        return c
    }
    b = "";
    for (var f = 0; f < d; f++) {
        b = b + h[f] * this.scale + "," + g[f] * this.scale + ","
    }
    b += h[0] * this.scale + "," + g[0] * this.scale;
    c.points.value = b;
    return c
};
vmlGraphics.prototype.drawImage = function(b, j, d, g, h) {
    var f = document.createElement("v:image");
    f.style.position = "absolute";
    f.src = h;
    f.style.left = b * this.scale;
    f.style.top = j * this.scale;
    f.style.width = d * this.scale;
    f.style.height = g * this.scale;
    var c = document.getElementById("vml");
    c.appendChild(f);
    f.appendChild(this.getStroke());
    return f
};
vmlGraphics.prototype.drawPie = function(t, x, u, k, m) {
    var j = document.createElement("v:oval");
    x = x * this.scale;
    t = t * this.scale;
    j.style.width = u;
    j.style.height = k;
    j.style.top = x - k / 2;
    j.style.left = t - u / 2;
    j.fillcolor = "#d5dbfb";
    var n = ' <v:fill  rotate="t" angle="-135" focus="100%" type="gradient"/>';
    n += '<o:extrusion v:ext="view" backdepth="1in" on="t" viewpoint="0,34.72222mm"   viewpointorigin="0,.5" skewangle="90" lightposition="-50000"   lightposition2="50000" type="perspective"/>';
    j.innerHTML = n;
    var c = document.getElementById("vml");
    c.appendChild(j);
    var B = m.split("$");
    var z = B.length;
    var h = Math.pow(2, 16) * 360;
    var y = 0;
    var w = 0;
    var v = 0;
    var r = 0;
    var l = 0;
    for (i = 0; i < z; i++) {
        var d = B[i].split("#");
        y += Number(d[1])
    }
    var b = "";
    for (i = 0; i < z; i++) {
        var A = B[i].split("#");
        var q = document.createElement("v:shape");
        var f = document.uniqueID;
        q.style.width = u;
        q.style.height = k;
        q.style.top = x - k / 2;
        q.style.left = t - u / 2;
        q.coordsize = "1500,1400";
        q.strokecolor = "white";
        q.id = f;
        r = Number(A[1]) / y;
        w += l;
        l = r;
        v = r;
        q.path = "M 750 700 AE 750 700 750 700 " + parseInt(h * w) + " " + parseInt(h * v) + " xe";
        q.title = A[0] + "\n��ռ����:" + v * 100 + "%\n��ϸ����:" + A[2];
        var g = document.createElement("v:fill");
        g.rotate = "t";
        g.focus = "100%";
        g.type = "gradient";
        g.angle = parseInt(360 * (w + v / 2));
        q.appendChild(g);
        var o = this.RandColor();
        q.fillcolor = o;
        c.appendChild(q)
    }
};
function VMLPie(d, c, f, b) {
    this.Container = d;
    this.Width = c || "400px";
    this.Height = f || "250px";
    this.Caption = b || "VML Chart";
    this.backgroundColor = "";
    this.Shadow = false;
    this.BorderWidth = 0;
    this.BorderColor = null;
    this.all = new Array();
    this.RandColor = function() {
        return "rgb(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + ")"
    };
    this.VMLObject = null
}
VMLPie.prototype.Draw = function() {
    var h = document.createElement("v:group");
    h.style.width = this.Width;
    h.style.height = this.Height;
    h.coordsize = "21600,21600";
    var c = document.createElement("v:rect");
    c.style.width = "21600px";
    c.style.height = "21600px";
    h.appendChild(c);
    var g = document.createElement("v:textbox");
    g.style.fontSize = "24px";
    g.style.height = "24px";
    g.style.fontWeight = "bold";
    g.innerHTML = this.Caption;
    g.style.textAlign = "center";
    c.appendChild(g);
    if (this.BorderWidth) {
        c.strokeweight = this.BorderWidth
    }
    if (this.BorderColor) {
        c.strokecolor = this.BorderColor
    }
    if (this.backgroundColor) {
        c.fillcolor = this.backgroundColor
    }
    if (this.Shadow) {
        var b = document.createElement("v:shadow");
        b.on = "t";
        b.type = "single";
        b.color = "graytext";
        b.offset = "4px,4px";
        c.appendChild(b)
    }
    this.VMLObject = h;
    this.Container.appendChild(h);
    var f = document.createElement("v:oval");
    f.style.width = "15000px";
    f.style.height = "14000px";
    f.style.top = "4000px";
    f.style.left = "1000px";
    f.fillcolor = "#d5dbfb";
    var d = ' <v:fill  rotate="t" angle="-135" focus="100%" type="gradient"/>';
    d += '<o:extrusion v:ext="view" backdepth="1in" on="t" viewpoint="0,34.72222mm"   viewpointorigin="0,.5" skewangle="90" lightposition="-50000"   lightposition2="50000" type="perspective"/>';
    f.innerHTML = d;
    h.appendChild(f);
    this.CreatePie(h)
};
VMLPie.prototype.CreatePie = function(vGroup) {
    var mX = Math.pow(2, 16) * 360;
    var vTotal = 0;
    var startAngle = 0;
    var endAngle = 0;
    var pieAngle = 0;
    var prePieAngle = 0;
    var objRow = null;
    var objCell = null;
    for (i = 0; i < this.all.length; i++) {
        vTotal += this.all[i].Value
    }
    var objLegendRect = document.createElement("v:rect");
    var objLegendTable = document.createElement("table");
    objLegendTable.cellPadding = 0;
    objLegendTable.cellSpacing = 3;
    objLegendTable.width = "100%";
    with(objLegendRect) {
        style.left = "17000px";
        style.top = "4000px";
        style.width = "4000px";
        style.height = "12000px";
        fillcolor = "#e6e6e6";
        strokeweight = "1px"
    }
    objRow = objLegendTable.insertRow();
    objCell = objRow.insertCell();
    objCell.colSpan = "2";
    objCell.style.backgroundColor = "black";
    objCell.style.padding = "5px";
    objCell.style.color = "window";
    objCell.style.font = "caption";
    objCell.innerText = "����:" + vTotal;
    var vTextbox = document.createElement("v:textbox");
    vTextbox.appendChild(objLegendTable);
    objLegendRect.appendChild(vTextbox);
    var vShadow = document.createElement("v:shadow");
    vShadow.on = "t";
    vShadow.type = "single";
    vShadow.color = "graytext";
    vShadow.offset = "2px,2px";
    objLegendRect.appendChild(vShadow);
    vGroup.appendChild(objLegendRect);
    var strAngle = "";
    for (i = 0; i < this.all.length; i++) {
        var vPieEl = document.createElement("v:shape");
        var vPieId = document.uniqueID;
        vPieEl.style.width = "15000px";
        vPieEl.style.height = "14000px";
        vPieEl.style.top = "4000px";
        vPieEl.style.left = "1000px";
        vPieEl.coordsize = "1500,1400";
        vPieEl.strokecolor = "white";
        vPieEl.id = vPieId;
        pieAngle = this.all[i].Value / vTotal;
        startAngle += prePieAngle;
        prePieAngle = pieAngle;
        endAngle = pieAngle;
        vPieEl.path = "M 750 700 AE 750 700 750 700 " + parseInt(mX * startAngle) + " " + parseInt(mX * endAngle) + " xe";
        vPieEl.title = this.all[i].Name + "\n��ռ����:" + endAngle * 100 + "%\n��ϸ����:" + this.all[i].TooltipText;
        var objFill = document.createElement("v:fill");
        objFill.rotate = "t";
        objFill.focus = "100%";
        objFill.type = "gradient";
        objFill.angle = parseInt(360 * (startAngle + endAngle / 2));
        vPieEl.appendChild(objFill);
        var objTextbox = document.createElement("v:textbox");
        objTextbox.border = "1px solid black";
        objTextbox.innerHTML = this.all[i].Name + ":" + this.all[i].Value;
        var vColor = this.RandColor();
        vPieEl.fillcolor = vColor;
        objRow = objLegendTable.insertRow();
        objRow.style.height = "16px";
        var objColor = objRow.insertCell();
        objColor.style.backgroundColor = vColor;
        objColor.style.width = "16px";
        objColor.PieElement = vPieId;
        objColor.attachEvent("onmouseover", LegendMouseOverEvent);
        objColor.attachEvent("onmouseout", LegendMouseOutEvent);
        objCell = objRow.insertCell();
        objCell.style.font = "icon";
        objCell.style.padding = "3px";
        objCell.innerText = this.all[i].Name + ":" + this.all[i].Value;
        vGroup.appendChild(vPieEl)
    }
};
VMLPie.prototype.Refresh = function() {};
VMLPie.prototype.Zoom = function(d) {
    var c = 21600;
    var b = 21600;
    this.VMLObject.coordsize = parseInt(c / d) + "," + parseInt(b / d)
};
VMLPie.prototype.AddData = function(d, g, b) {
    var f = new Object();
    f.Name = d;
    f.Value = g;
    f.TooltipText = b;
    var c = this.all.length;
    this.all[c] = f
};
VMLPie.prototype.Clear = function() {
    this.all.length = 0
};
function LegendMouseOverEvent() {
    var b = window.event.srcElement;
    b.border = "1px solid black"
}
function LegendMouseOutEvent() {
    var b = window.event.srcElement;
    b.border = ""
}
function getOffsetLeft(b) {
    return b == document.body ? 0 : b.offsetLeft + getOffsetLeft(b.offsetParent)
}
function getOffsetTop(b) {
    return b == document.body ? 0 : b.offsetTop + getOffsetTop(b.offsetParent)
}
var colours = new Array("#FFFFFF", "#FFCCCC", "#FFCC99", "#FFFF99", "#FFFFCC", "#99FF99", "#99FFFF", "#CCFFFF", "#CCCCFF", "#FFCCFF", "#CCCCCC", "#FF6666", "#FF9966", "#FFFF66", "#FFFF33", "#66FF99", "#33FFFF", "#66FFFF", "#9999FF", "#FF99FF", "#C0C0C0", "#FF0000", "#FF9900", "#FFCC66", "#FFFF00", "#33FF33", "#66CCCC", "#33CCFF", "#6666CC", "#CC66CC", "#999999", "#CC0000", "#FF6600", "#FFCC33", "#FFCC00", "#33CC00", "#00CCCC", "#3366FF", "#6633FF", "#CC33CC", "#666666", "#990000", "#CC6600", "#CC9933", "#999900", "#009900", "#339999", "#3333FF", "#6600CC", "#993399", "#333333", "#660000", "#993300", "#996633", "#666600", "#006600", "#336666", "#000099", "#333399", "#663366", "#000000", "#330000", "#663300", "#663333", "#333300", "#003300", "#003333", "#000066", "#330099", "#330033");
var g_divPreview;
var g_ColorHex;
var g_color_palette = null;
function mouseOver(c, b) {
    if (g_divPreview) {
        g_divPreview.style.background = b
    }
    if (g_ColorHex) {
        g_ColorHex.value = b
    }
    c.style.borderColor = "#FFFFFF"
}
function mouseOut(b) {
    b.style.borderColor = "#666666"
}
function mouseDown(b) {
    if (g_ColorHex) {
        g_ColorHex.value = b
    }
    if (g_color_palette) {
        g_color_palette.style.display = "none"
    }
}
function EzColorPicker(c, b) {
    if (typeof c == "string") {
        g_divPreview = Obj(c)
    } else {
        g_divPreview = c
    }
    if (typeof b == "string") {
        g_ColorHex = Obj(b)
    } else {
        g_ColorHex = b
    }
    if (!g_color_palette) {
        g_color_palette = document.createElement("div");
        g_color_palette.style.width = "200px";
        g_color_palette.style.height = "150px";
        g_color_palette.style.position = "absolute";
        document.body.appendChild(g_color_palette);
        code = "<table class='tblPalette' cellpadding='0' cellspacing='1' border='2'>";
        for (i = 0; i < 70; i++) {
            if ((i) % 10 == 0) {
                code += "<tr>"
            }
            code += "<td id='el_" + i + "' bgcolor=" + colours[i] + " onMouseOver=\"mouseOver(this, '" + colours[i] + "');\" onMouseOut='mouseOut(this)' onclick=\"mouseDown('" + colours[i] + "');return false;\">&nbsp;</td>\n";
            if ((i + 1) % 10 == 0) {
                code += "</tr>\n"
            }
        }
        g_color_palette.innerHTML = code + "</table>"
    }
    g_color_palette.style.top = getOffsetTop(g_divPreview);
    g_color_palette.style.left = getOffsetLeft(g_divPreview) + 40;
    g_color_palette.style.display = ""
}
function Obj(b) {
    return document[b] || (document.all && document.all[b]) || (document.getElementById && document.getElementById(b))
}
EzColorPicker.close = function() {
    if (g_color_palette) {
        g_color_palette.style.display = "none"
    }
};
function IEBrowser(d, c, b) {
    this.type = d;
    this.version = c;
    this.os = b
}
Object.prototype.setTimeout = function(ie, Bi) {
    var ke = "tempVar" + _m_iSeq;
    _m_iSeq++;
    if (_m_iSeq == Number.MAX_VALUE - 1) {
        _m_iSeq = 0
    }
    eval(ke + " = this;");
    var Rh = ie.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
    return window.setTimeout(ke + '._setTimeoutDispatcher("' + Rh + '");', Bi)
};
Object.prototype.toStringSize = toStringSize;
Object.prototype._setTimeoutDispatcher = function(ie) {
    eval(ie)
};
Object.prototype.eventHandler = function(c) {
    var b = this;
    return function(d) {
        if (!d) {
            d = window.event
        }
        if (d && !d.target) {
            d.target = d.srcElement
        }
        b[c](d)
    }
};
Object.prototype.Clone = function() {
    try {
        var c = new this.constructor();
        for (var b in this) {
            if (c[b] != this[b]) {
                if (typeof(this[b]) == "object") {
                    c[b] = this[b].Clone()
                } else {
                    c[b] = this[b]
                }
            }
        }
        if (!c || ("" + c) == "") {
            return (new String(this) + c) ? this: c
        } else {
            c.toString = this.toString;
            return c
        }
    } catch(d) {
        alert("Clone���ִ���:" + d.message)
    }
};
Function.prototype.method = function(b, d, c) {
    if (typeof c == "undefined" || c == true) {
        this.prototype[b] = d
    } else {
        this[b] = d
    }
    return this
};
Array.prototype.clear = function() {
    while (this.length > 0) {
        this.pop()
    }
};
Array.prototype.insert = function(c, g) {
    if (! (c >= 0)) {
        return
    }
    var f = this.slice();
    var d = this.length - c;
    var b = f.splice(c, d);
    f[f.length] = g;
    f = f.concat(b);
    return f
};
Array.prototype.indexOf = function(b) {
    for (var c = 0,
    d = this.length; c < d; c++) {
        if (this[c] == b) {
            return c
        }
    }
    return - 1
};
EzServerClient.GlobeParams.InnerMaxZoomLevel = 22;
EzServerClient.GlobeParams.PerZoomLevelPixel = 12;
if (typeof bLoadEzMapParameter == "undefined" || !bLoadEzMapParameter) {
    alert("EzMapParameter.js�����ڻ�û�б����룬ϵͳʹ��Ĭ�ϲ���!")
}
if (typeof _MapUnitPixels == "undefined") {
    _MapUnitPixels = 128
}
if (typeof _bIsOverlay == "undefined") {
    _bIsOverlay = true
}
if (typeof _bMapProx == "undefined") {
    _bMapProx = false
}
var m_mapService = m_mapService_servlet + "?xml=";
var bIsUsingDiv = true;
var iMaxLevel = EzServerClient.GlobeParams.InnerMaxZoomLevel + 1;
var iSliderH = 277;
if (!_VectorMapService instanceof Array) {
    _VectorMapService = [_VectorMapService]
}
if (!_SatelliteMapService instanceof Array) {
    _SatelliteMapService = [_SatelliteMapService]
}
if (!_VectorSateMapService instanceof Array) {
    _VectorSateMapService = [_VectorSateMapService]
}
var _MapService = m_EzServer;
var _MapServiceArr = _VectorMapService[1];
var _overLayIndex = 100;
var _ImageBaseUrl = _MapService + "/images/";
var _MapServlet = "/EzMap?Service=getImage&Type=RGB&";
var iSpan = 0.03125;
_m_scale_meter = [2.5, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000, 20000000, 50000000, 100000000, 200000000];
var _m_MapSpan = new Array();
var _m_dMapSpanScale = _MapUnitPixels / 128;
if (typeof _MapSpanScale == "undefined") {
    _MapSpanScale = 1
}
for (var i = EzServerClient.GlobeParams.InnerMaxZoomLevel; i >= 0; i--) {
    _m_MapSpan[i] = iSpan;
    iSpan = iSpan * 2
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
        _m_MapSpan[iIndex] = _m_MapSpan[iIndex] / dScale
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
var _mapName = "��ͼ";
var _u = navigator.userAgent.toLowerCase();
_mSiteName = "EasyMap";
_mEmailSubject = "EzService";
_mSearching = "����...";
_mZoomIn = "�Ŵ�";
_mZoomOut = "��С";
_mZoomSet = "���������ʾ����";
_mZoomDrag = "�϶�����";
_mPanWest = "����";
_mPanEast = "����";
_mPanNorth = "����";
_mPanSouth = "����";
_mLastResult = "����";
_mDataCopy = "��ͼ���� &copy;2005 ɽ����γ";
_mNormalMap = "Map";
_mNew = "New!";
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
EzServerClient.GlobeParams.ei_ascend = _ImageBaseUrl + "sliderbar_ascend.gif";
EzServerClient.GlobeParams.ei_descend22 = _ImageBaseUrl + "sliderbar_descend22.gif";
EzServerClient.GlobeParams.ei_ascend22 = _ImageBaseUrl + "sliderbar_ascend22.gif";
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
function _UserAgent(b) {
    return _u.indexOf(b) != -1
}
function _uan(c) {
    if (!window.RegExp) {
        return 0
    }
    var f = new RegExp(c + "([0-9]*)");
    var d = f.exec(_u);
    var b = 0;
    if (d.length >= 2) {
        b = d[1]
    }
    return b
}
function _compatIE() {
    return ((_UserAgent("opera") && (_UserAgent("opera 7.5") || _UserAgent("opera/7.5") || _UserAgent("opera/8"))) || (_UserAgent("safari") && _uan("safari/") >= 125) || (_UserAgent("msie") && !_UserAgent("msie 4") && !_UserAgent("msie 5.0") && !_UserAgent("msie 5.1") && !_UserAgent("msie 3") && !_UserAgent("powerpc")) || (document.getElementById && window.XSLTProcessor && window.XMLHttpRequest && !_UserAgent("netscape6") && !_UserAgent("netscape/7.0")))
}
function _noActiveX() {
    if (!_UserAgent("msie") || !document.all || _UserAgent("opera")) {
        return false
    }
    var s = false;
    eval('try { new ActiveXObject("Microsoft.XMLDOM"); }catch (e) { s = true; }');
    return s
}
function getEleByID(b) {
    return document.getElementById(b)
}
var _nxsl = !_UserAgent("safari");
function _loadnxsl() {
    _nxsl = true;
    _checkLoad()
}
function _load(b, c) {
    if (!_c) {
        return
    }
    if (!getMapApp() || !_nxsl) {
        window._pending = b
    } else {
        getMapApp().loadXML(b, c)
    }
}
var _wStr = "the map area below";
function _print() {
    if (!_c || !getMapApp()) {
        return
    }
    getMapApp().print()
}
function _checkLoad() {
    if (window._pending) {
        var b = window._pending;
        window._pending = null;
        _load(b)
    }
}
_MapApp = null;
_sf = "hl=en";
_tv = ".3";
_fc = false;
_c = _fc || _compatIE();
function _script(c) {
    var b = '<script src="' + c + '" type="text/javascript"><\/script>';
    document.write(b)
}
function _havexslt() {
    if (typeof GetObject != "undefined" || (typeof XMLHttpRequest != "undefined" && typeof DOMParser != "undefined" && typeof XSLTProcessor != "undefined")) {
        return true
    } else {
        return false
    }
}
if (_c) {
    if (_havexslt()) {} else {
        if (_UserAgent("safari")) {
            _script("mapfiles/maps.6.safari.js")
        } else {
            _script("mapfiles/maps.6.xslt.js")
        }
    }
}
var _IEBrowser = new IEBrowser(0, 0, null);
var Gb = navigator.userAgent.toLowerCase();
if (Gb.indexOf("opera") != -1) {
    _IEBrowser.type = 4
} else {
    if (Gb.indexOf("msie") != -1 && document.all) {
        _IEBrowser.type = 1;
        if (Gb.indexOf("msie 5")) {
            _IEBrowser.version = 5
        }
    } else {
        if (Gb.indexOf("safari") != -1) {
            _IEBrowser.type = 3;
            if (Gb.indexOf("safari/125") != -1) {
                _IEBrowser.version = 1
            }
        } else {
            if (Gb.indexOf("mozilla") != -1) {
                _IEBrowser.type = 2
            }
        }
    }
}
if (Gb.indexOf("x11;") != -1) {
    _IEBrowser.os = 1
}
var _MaxNumber = Number.MAX_VALUE;
var _m_iSeq = 0;
function StrLength(d) {
    var b = 0;
    if (d == "") {
        return 0
    }
    for (var c = 0; c < d.length; c++) {
        if (d.substr(c, 1).charCodeAt(0) > 255) {
            b = b + 2
        } else {
            b++
        }
    }
    return b
}
function toStringSize(b, c) {
    var d = b + "";
    while (d.length < c) {
        d = "0" + d
    }
    return d
}
function Fb(b) {
    return b.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
function Ec(b) {
    return Fb(b).replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
}
document.getElementsByClassName = function(d) {
    var f = document.all;
    if (!f) {
        f = document.getElementsByTagName("*")
    }
    var c = new Array();
    for (var b = 0; b < f.length; b++) {
        if (f[b].className == d) {
            c[c.length] = f[b]
        }
    }
    return c
};
function setCursor(g, f) {
    try {
        g.style.cursor = f
    } catch(c) {
        if (f == "pointer") {
            setCursor(g, "hand")
        }
    }
}
function RemoveImg(b) {
    if (b && b.parentNode) {
        b.parentNode.removeChild(b)
    }
}
function getTargetElement(b) {
    var c;
    if (b.target) {
        c = (b.target.nodeType == 3) ? b.target.parentNode: b.target
    } else {
        c = b.srcElement
    }
    return c
}
function S(c) {
    if (_IEBrowser.type == 1) {
        window.event.cancelBubble = true
    } else {
        c.cancelBubble = true;
        c.preventDefault();
        c.stopPropagation()
    }
}
function Bh(d, b) {
    var c = window.document.createElement("a");
    c.href = "PolylineDrawer";
    c.onclick = b;
    c.appendChild(window.document.createTextNode(d));
    return c
}
if (!Array.prototype.push) {
    Array.prototype.push = function(b) {
        this[this.length] = b
    }
}
function convert2Px(b) {
    return b + "px"
}
function setClass(c, b) {
    if (c.className) {
        c.className += " " + b
    } else {
        c.className = b
    }
}
function ObjectOffset(c) {
    var b = {
        x: 0,
        y: 0
    };
    while (c) {
        b.x += c.offsetLeft;
        b.y += c.offsetTop;
        c = c.offsetParent
    }
    return b
}
function Tg(c, d) {
    var b = {
        x: 0,
        y: 0
    };
    while (c && c != d) {
        b.x += c.offsetLeft;
        b.y += c.offsetTop;
        c = c.offsetParent
    }
    return b
}
function _NoAction() {
    return false
}
var md = new Array("q", "ll", "spn", "z", "t", "sll", "sspn", "vp", "f", "output", "file", "deb");
function ud(b) {
    if (b.toFixed) {
        return b.toFixed(6).toString()
    } else {
        return b.toString()
    }
}
var sb = new Object();
var ae = "mapsxmlhttpiframe";
function RemoveChildren(b) {
    if (typeof b == "undefined" || b == null) {
        return
    }
    while (b.hasChildNodes()) {
        b.removeChild(b.lastChild)
    }
}
function bindingDoc(f) {
    try {
        if (typeof ActiveXObject != "undefined" && typeof GetObject != "undefined") {
            var d = new ActiveXObject("Microsoft.XMLDOM");
            d.loadXML(f);
            return d
        } else {
            if (typeof DOMParser != "undefined") {
                return (new DOMParser()).parseFromString(f, "text/xml")
            } else {
                return voidFunc(f)
            }
        }
    } catch(c) {
        EzLog.incompatible("xmlparse")
    }
    try {
        return voidFunc(f)
    } catch(c) {
        EzLog.incompatible("xmlparse");
        return document.createElement("div")
    }
}
function uf(d) {
    var b = "";
    if (d.nodeName == "#text") {
        b += Fb(d.nodeValue)
    } else {
        b += "<" + d.nodeName;
        if (d.hasAttributes()) {
            for (var c = 0; c < d.attributes.length; ++c) {
                b += " " + d.attributes[c].nodeName + '="' + Ec(d.attributes[c].nodeValue) + '"'
            }
        }
        if (d.childNodes.length == 0) {
            b += "/>"
        } else {
            b += ">";
            for (var c = 0; c < d.childNodes.length; ++c) {
                b += uf(d.childNodes[c])
            }
            b += "</" + d.nodeName + ">"
        }
    }
    return b
}
function ug(d) {
    var b = "";
    if (d.nodeName == "#text") {
        b += Fb(d.nodeValue)
    } else {
        for (var c = 0; c < d.childNodes.length; ++c) {
            b += uf(d.childNodes[c])
        }
    }
    return b
}
function gg(b) {
    var c = window.document.createElement("iframe");
    c.style.width = convert2Px(100);
    c.style.height = convert2Px(50);
    c.style.position = "absolute";
    c.style.top = convert2Px( - 110);
    c.style.left = convert2Px( - 110);
    c.id = b;
    c.name = b;
    window.document.body.appendChild(c);
    return c
}
function local2LonLat(b) {
    if (! (b instanceof Point)) {
        throw new Error(100, "��������ӦΪ:Point")
    }
    var c = (b.y - _convert_ofsy) / _convert_scale;
    var d = (b.x - _convert_ofsx) / _convert_scale;
    return new Point(d, c)
}
function LonLat2Local(c) {
    if (! (c instanceof Point)) {
        throw new Error(100, "��������ӦΪ:Point")
    }
    var b = c.x * _convert_scale + _convert_ofsx;
    var d = c.y * _convert_scale + _convert_ofsy;
    return new Point(b, d)
}
function CalculateArea(c) {
    var b = c.Clone();
    var g = b.length;
    var f = 0;
    var h = b[0];
    h = CalculateCoordinate(h);
    for (var d = 1; d < g; d++) {
        pt1 = b[d];
        pt1 = CalculateCoordinate(pt1);
        f += (pt1.x - h.x) * (pt1.y + h.y) / 2;
        h = pt1
    }
    return Math.abs(f)
}
function CalculateLength(c) {
    var b = c.Clone();
    var g = b.length;
    var f = new Number(0);
    var h = b[0];
    for (var d = 1; d < g; d++) {
        pt1 = b[d];
        f += GetDistanceInLL(h, pt1);
        h = pt1
    }
    return Math.abs(Math.ceil(f))
}
_C_P = 0.017453292519943295;
function CalculateCoordinate(g) {
    if (_MapSpanScale != 1) {
        return g
    }
    var f;
    var c = g.y * _C_P;
    var h = Math.sin(c);
    var d = g.x * _C_P;
    var b = 0.081819190842622 * h;
    var f = (1 - 0.00669437999014138) * (h / (1 - b * b) - (1 / (2 * 0.081819190842622)) * Math.log((1 - b) / (1 + b)));
    g.x = 6378137 * f / 2;
    g.y = 6378137 * d;
    return g
}
function GetDistanceInLL(l, j) {
    var k = new Number(0);
    if (_MapSpanScale == 1) {
        var h = (j.x - l.x) * _C_P;
        var g = (j.y - l.y) * _C_P;
        var f = Math.sin(0.5 * g) * Math.sin(0.5 * g) + Math.cos(l.y * _C_P) * Math.cos(j.y * _C_P) * (Math.sin(0.5 * h) * Math.sin(0.5 * h));
        f = Math.abs(f);
        if (f > 1) {
            alert("���Ϸ�����:a:" + f + ",P1:" + l.toString() + ",P2:" + j.toString())
        }
        var m = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f));
        k = m * 6371008.77141506;
        if (Math.abs(j.x - l.x) > 180 || Math.abs(j.y - l.y) > 180) {
            k = 2 * Math.PI * 6371008.77141506 - k
        }
    } else {
        var b = (j.x - l.x) * (j.x - l.x) + (j.y - l.y) * (j.y - l.y);
        k = Math.sqrt(b)
    }
    k = Math.ceil(k);
    return k
}
function bRetComp(b, c) {
    return Math.round(b * 1000000) == Math.round(c * 1000000)
}
function vh(b, c) {
    if (!c) {
        c = new Array()
    }
    while (b >= 32) {
        c.push(String.fromCharCode((32 | b & 31) + 63));
        b >>= 5
    }
    c.push(String.fromCharCode(b + 63));
    return c
}
function bc(b, c) {
    return vh(b < 0 ? ~ (b << 1) : b << 1, c)
}
function loadImgNoImage(b) {
    b.src = "images/NoImage.png"
}
function getInfo(b) {
    return b.style.left + ":" + b.style.top + ";" + b.offsetLeft + ":" + b.offsetTop + ";" + b.offsetWidth + ":" + b.offsetHeight
}
function getPathMBR(k) {
    strLonLatPath = k.split(",");
    var d, c, b, j;
    if (strLonLatPath.length == 3) {
        var g = parseFloat(strLonLatPath[2]);
        d = parseFloat(strLonLatPath[0]) - g;
        b = parseFloat(strLonLatPath[0]) + g;
        c = parseFloat(strLonLatPath[1]) - g;
        j = parseFloat(strLonLatPath[1]) + g
    } else {
        if (strLonLatPath.length == 4) {
            d = strLonLatPath[0];
            b = strLonLatPath[2];
            c = strLonLatPath[1];
            j = strLonLatPath[3]
        } else {
            if (strLonLatPath.length >= 6) {
                b = d = strLonLatPath[0];
                j = c = strLonLatPath[1];
                for (var f = 0; f < strLonLatPath.length / 2; f++) {
                    if (strLonLatPath[2 * f] > b) {
                        b = strLonLatPath[2 * f]
                    }
                    if (strLonLatPath[2 * f] < d) {
                        d = strLonLatPath[2 * f]
                    }
                    if (strLonLatPath[2 * f + 1] > j) {
                        j = strLonLatPath[2 * f + 1]
                    }
                    if (strLonLatPath[2 * f + 1] < c) {
                        c = strLonLatPath[2 * f + 1]
                    }
                }
            }
        }
    }
    var h = new MBR(d, c, b, j);
    return h
}
function createRadio(b, g, f, c) {
    var d = document.createElement("<input>");
    d.id = g;
    d.name = b;
    d.type = "radio";
    return d
}
function MapServerControl(b) {
    var d = document.createElement("div");
    d.onselectstart = _NoAction;
    d.style.cssText = "BORDER-RIGHT: #015190 1px solid;	BORDER-TOP: #015190 1px solid;	BORDER-LEFT: #015190 1px solid;	BORDER-BOTTOM: #015190 1px solid;	RIGHT: 12em;	WIDTH: 65px;	HEIGHT: 12px;	CURSOR: pointer;	POSITION: absolute;	BACKGROUND-COLOR: #F4C767;";
    var c = document.createElement("div");
    c.style.cssText = "TEXT-ALIGN: center;	VERTICAL-ALIGN:middle;	BORDER-RIGHT: #015190 0px solid;	BORDER-TOP: #F4C767 2px solid;	FONT-SIZE: 12px;	FONT-FAMILY:����;	BORDER-LEFT: #b0b0b0 1px solid;	BORDER-BOTTOM:#015190 0px solid;	color:#015190";
    c.innerHTML = b;
    c.noWrap = true;
    d.appendChild(c);
    return d
}
function createTxt(b, d) {
    var c = null;
    c = document.createElement("div");
    c.style.position = "absolute";
    setCursor(c, "default");
    c.unselectable = "on";
    c.onselectstart = _NoAction;
    if (b) {
        c.innerHTML = b
    }
    c.style.fontSize = convert2Px(10);
    c.style.color = "red";
    c.style.fontFamily = "Arial, sans serif";
    c.style.MozUserSelect = "none";
    return c
}
var se = "centerlat";
var te = "centerlng";
function Xd(b, d, c) {
    this.id = b;
    this.description = d;
    this.pointIndex = c
}
function getDocNodeValue(c) {
    if (!c) {
        return ""
    }
    if (typeof c.text != "undefined") {
        return c.text
    }
    if (c.nodeType == 3 || c.nodeType == 4) {
        return c.nodeValue
    }
    var b = "";
    if (c.nodeType == 1) {
        for (var d = c.firstChild; d != null; d = d.nextSibling) {
            b += getDocNodeValue(d)
        }
    }
    return b
}
var _Point = Point;
var _Map = MainFrame;
var _IconClass = Icon;
var _XMLHttp = XMLHttp;
var _MapsApplication = MapsApp;
var EzMap = MapsApp;
var _Timer = Timer;
var _Log = EzLog;
function WriteMsg(c) {
    if (typeof _bIsWriteFile == "undefined" || !_bIsWriteFile) {
        return
    }
    var j, h, d;
    var g = 2,
    b = 8;
    try {
        j = new ActiveXObject("Scripting.FileSystemObject");
        h = j.OpenTextFile("c:\\scriptlog.txt", b, true);
        h.WriteLine(c);
        h.Close();
        if (j != null) {
            delete j
        }
    } catch(k) {}
}
function createDivText(c, d) {
    var b = document.createElement("div");
    if (c) {
        b.id = c
    }
    b.style.fontSize = "smaller";
    b.appendChild(document.createTextNode(d));
    return b
}
function createDivImg(d, g, h, c) {
    var b = document.createElement("div");
    if (d) {
        b.id = d
    }
    var f = createImg(g, "ͼ��");
    if (h) {
        f.style.width = h + "px"
    }
    if (c) {
        f.style.height = c + "px"
    }
    b.appendChild(f);
    return b
}
function createDiv(c) {
    var b = document.createElement("div");
    b.style.position = "absolute";
    if (c) {
        b.id = c
    }
    return b
}
function createImg(j, d, h, g, b, f) {
    var c = document.createElement("Img");
    c.galleryimg = "no";
    c.src = j;
    if (!f) {
        f = 16
    }
    c.style.height = convert2Px(f);
    c.style.width = convert2Px(f);
    c.alt = d;
    c.style.position = "absolute";
    if (h) {
        c.style.left = convert2Px(h)
    }
    if (g) {
        c.style.top = convert2Px(g)
    }
    if (b) {
        c.title = b
    }
    BindingEvent(c, "mouseover",
    function(k) {
        setCursor(c, "hand")
    });
    return c
}
function createAlignImg(c, f, g) {
    var b = document.createElement("P");
    b.align = c;
    var d = document.createElement("Img");
    d.id = f;
    d.src = g;
    d.style.height = "";
    d.style.width = "";
    b.appendChild(d);
    return b
}
window.showInfoFrame = function(c) {
    var b = getMap();
    c = (c) ? c: ((window.event) ? window.event: "");
    if (c) {
        var d = getTargetElement(c);
        if (d) {
            b.showInfoFrame(d)
        }
    }
};
window.hideInfoFrame = function() {
    getMap().hideInfoFrame()
};
function LTrim(b) {
    if (b == null) {
        return ""
    }
    return b.replace(/^[ \t\n\r]+/g, "")
}
function RTrim(b) {
    if (b == null) {
        return ""
    }
    return b.replace(/[ \t\n\r]+$/g, "")
}
function Trim(b) {
    if (b == null) {
        return ""
    }
    return RTrim(LTrim(b))
}
function BindingEvent(d, c, b) {
    EventManager.add(d, c, b)
}
function unbindingEvent(d, c, b) {
    EventManager.remove(d, c, b)
}
function cloneFunc(d, c) {
    window[d] = c;
    return window[d]
}
function cloneMethod(f, d, g) {
    f.prototype[d] = g
}
function EzSMethod(f, d, g) {
    f[d] = g
}
function EzNameSpace() {
    var b = cloneFunc("Map", testEzMap);
    b.method("showMap1", testEzMap.prototype.showMap);
    b.method("showName1", testEzMap.showName, true)
}
function testEzMap() {
    this.name = new Array("hello")
}
function testEzMap_showMap() {
    alert(this.name[0])
}
testEzMap.prototype.showMap = testEzMap_showMap;
function testEzMap_showName() {
    alert("showName")
}
testEzMap.prototype.showName = testEzMap_showName;
EzNameSpace();
g_current_editor = null;
function degToRad(b) {
    return (b / (360 / (2 * Math.PI)))
}
function radToDeg(b) {
    return (b * (360 / (2 * Math.PI)))
}
function trans2Points(c) {
    var h = c.split(",");
    var b = h.length / 2;
    var f = new Array();
    for (var d = 0; d < b; d++) {
        var g = new Point(h[2 * d], h[2 * d + 1]);
        f.push(g)
    }
    return f
}
g_update_point = null;
g_snap_hovering = false;
g_snap_index = 0;
function GetQuadtreeAddress(b, f, j) {
    var l = 3.1415926535897;
    var c = 18;
    var h = (180 + parseFloat(b)) / 360;
    var g = -parseFloat(f) * l / 180;
    g = 0.5 * Math.log((1 + Math.sin(g)) / (1 - Math.sin(g)));
    g *= 1 / (2 * l);
    g += 0.5;
    var k = "t";
    var d = "qrts";
    alert(h + ":" + g);
    while (c-->j) {
        h -= Math.floor(h);
        g -= Math.floor(g);
        k = k + d.substr((h >= 0.5 ? 1 : 0) + (g >= 0.5 ? 2 : 0), 1);
        h *= 2;
        g *= 2
    }
    return k
}
function check_ip(f, d) {
    var k = true;
    var l = f.split(".");
    var b = d.split(".");
    for (var j = 0; j < 4; j++) {
        var d = b[j];
        if (l[j] == d) {
            continue
        } else {
            if (d.indexOf("*") != -1) {
                continue
            } else {
                var c = d.split("/");
                if (c.length > 1) {
                    var h = parseInt(c[0]);
                    var g = parseInt(c[1]);
                    var m = parseInt(l[j]);
                    if (m > Math.max(h, g) || m < Math.min(h, g)) {
                        k = false;
                        break
                    }
                } else {
                    k = false;
                    break
                }
            }
        }
    }
    return k
}
function Qh(b) {
    if (!b) {
        return
    }
    if (window.clipboardData) {
        b.onpaste = Ki;
        b.ondrop = ah
    }
    return true
}
function Ki(c) {
    var d = document.selection;
    if (d) {
        var f = d.createRange();
        if (f) {
            var g = window.clipboardData.getData("Text");
            if (g) {
                f.text = Ve(g, null);
                return false
            }
        }
    }
    return true
}
var Sc = null;
function ah(c) {
    if (!c) {
        c = window.event
    }
    if (c.dataTransfer) {
        Sc = Ve(c.dataTransfer.getData("Text"), null);
        setTimeout("_finishDrop()", 1)
    }
    return true
}
function _finishDrop() {
    if (!Sc) {
        return
    }
    var b = document.selection;
    if (b) {
        var c = b.createRange();
        if (c) {
            c.text = Sc;
            c.select()
        }
    }
    Sc = null
}
var _makePasteBox = Qh;
function Ve(d, b) {
    if (!b) {
        b = ", "
    }
    var c = d.replace(/^[ \r\n\t\v]+/g, "");
    c = c.replace(/[ \r\n\t\v]+$/g, "");
    c = c.replace(/[ \t\v]*\r?\n[\r\n]*[ \t\v]*/g, b);
    return c
}
MutiMaps = MultiMaps;
function getOffsetLeft(b) {
    return b == document.body ? 0 : b.offsetLeft + getOffsetLeft(b.offsetParent)
}
function getOffsetTop(b) {
    return b == document.body ? 0 : b.offsetTop + getOffsetTop(b.offsetParent)
}
var colours = new Array("#FFFFFF", "#FFCCCC", "#FFCC99", "#FFFF99", "#FFFFCC", "#99FF99", "#99FFFF", "#CCFFFF", "#CCCCFF", "#FFCCFF", "#CCCCCC", "#FF6666", "#FF9966", "#FFFF66", "#FFFF33", "#66FF99", "#33FFFF", "#66FFFF", "#9999FF", "#FF99FF", "#C0C0C0", "#FF0000", "#FF9900", "#FFCC66", "#FFFF00", "#33FF33", "#66CCCC", "#33CCFF", "#6666CC", "#CC66CC", "#999999", "#CC0000", "#FF6600", "#FFCC33", "#FFCC00", "#33CC00", "#00CCCC", "#3366FF", "#6633FF", "#CC33CC", "#666666", "#990000", "#CC6600", "#CC9933", "#999900", "#009900", "#339999", "#3333FF", "#6600CC", "#993399", "#333333", "#660000", "#993300", "#996633", "#666600", "#006600", "#336666", "#000099", "#333399", "#663366", "#000000", "#330000", "#663300", "#663333", "#333300", "#003300", "#003333", "#000066", "#330099", "#330033");
var g_divPreview;
var g_ColorHex;
var g_color_palette = null;
function mouseOver(c, b) {
    if (g_divPreview) {
        g_divPreview.style.background = b
    }
    if (g_ColorHex) {
        g_ColorHex.value = b
    }
    c.style.borderColor = "#FFFFFF"
}
function mouseOut(b) {
    b.style.borderColor = "#666666"
}
function mouseDown(b) {
    if (g_ColorHex) {
        g_ColorHex.value = b
    }
    if (g_color_palette) {
        g_color_palette.style.display = "none"
    }
}
function EzColorPicker(c, b) {
    if (typeof c == "string") {
        g_divPreview = Obj(c)
    } else {
        g_divPreview = c
    }
    if (typeof b == "string") {
        g_ColorHex = Obj(b)
    } else {
        g_ColorHex = b
    }
    if (!g_color_palette) {
        g_color_palette = document.createElement("div");
        g_color_palette.style.width = "200px";
        g_color_palette.style.height = "150px";
        g_color_palette.style.position = "absolute";
        document.body.appendChild(g_color_palette);
        code = "<table class='tblPalette' cellpadding='0' cellspacing='1' border='2'>";
        for (i = 0; i < 70; i++) {
            if ((i) % 10 == 0) {
                code += "<tr>"
            }
            code += "<td id='el_" + i + "' bgcolor=" + colours[i] + " onMouseOver=\"mouseOver(this, '" + colours[i] + "');\" onMouseOut='mouseOut(this)' onclick=\"mouseDown('" + colours[i] + "');return false;\">&nbsp;</td>\n";
            if ((i + 1) % 10 == 0) {
                code += "</tr>\n"
            }
        }
        g_color_palette.innerHTML = code + "</table>"
    }
    g_color_palette.style.top = getOffsetTop(g_divPreview);
    g_color_palette.style.left = getOffsetLeft(g_divPreview) + 40;
    g_color_palette.style.display = ""
}
function Obj(b) {
    return document[b] || (document.all && document.all[b]) || (document.getElementById && document.getElementById(b))
}
_CurentOverLay = null;
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
    this.bIsCenter = false
}
iOverLay.prototype.showPropertyEdit = function() {
    g_current_editor = this;
    if (this.editable == false) {
        return
    }
    getMapApp().showMenu();
    return false
};
iOverLay.prototype.getZIndex = function() {
    return this.div.style.zIndex
};
iOverLay.prototype.setZIndex = function(b) {
    if (this.div != null) {
        this.div.style.zIndex = b
    }
};
iOverLay.prototype.synCreateDiv = function(b) {
    this.map = b;
    if (this.bIsSyRedraw == true) {
        this.setTimeout("this.createDiv()", 10)
    } else {
        this.createDiv()
    }
};
iOverLay.prototype.createDiv = function() {};
iOverLay.prototype.synRedraw = function() {
    if (this.bIsSyRedraw == true) {
        this.setTimeout("this.synRedraw()", 10)
    } else {
        this.redraw()
    }
};
iOverLay.prototype.redraw = function() {};
iOverLay.prototype.removeFromDiv = function() {
    if (this.pause) {
        this.pause()
    }
    if (this.map) {
        this.map.div.removeChild(this.div);
        EventManager.removeNode(this.div);
        if (this.titleDiv != null) {
            this.map.div.removeChild(this.titleDiv);
            EventManager.removeNode(this.titleDiv)
        }
    }
};
iOverLay.prototype.hide = function() {
    if (this.div != null) {
        this.div.style.display = "none"
    }
    if (this.titleDiv != null) {
        this.titleDiv.style.display = "none"
    }
};
iOverLay.prototype.show = function() {
    if (this.div != null) {
        this.div.style.display = ""
    }
    if (this.titleDiv != null) {
        this.titleDiv.style.display = ""
    }
};
iOverLay.prototype.isVisible = function() {
    return this.div.style.display != "none"
};
iOverLay.prototype.onclick = function() {
    this.div.fireEvent("onclick")
};
iOverLay.prototype.addListener = function(c, b) {
    if (this.div != null) {
        BindingEvent(this.div, c, b);
        this.div.style.cursor = "hand"
    }
    if (this.titleDiv) {
        BindingEvent(this.titleDiv, c, b);
        this.titleDiv.style.cursor = "hand"
    }
};
iOverLay.prototype.removeListener = function(c, b) {
    unbindingEvent(this.div, c, b);
    if (this.titleDiv) {
        unbindingEvent(this.titleDiv, c, b);
        this.titleDiv.style.cursor = ""
    }
};
iOverLay.prototype.removeAllListener = function() {
    EventManager.removeNode(this.div);
    if (this.titleDiv) {
        EventManager.removeNode(this.titleDiv);
        this.titleDiv.style.cursor = ""
    }
};
iOverLay.prototype.openInfoWindowHtml = function(b) {
    this.map.blowupOverlay(this);
    var c = new Point(getMap().mouseLng, getMap().mouseLat);
    this.map.openInfoWindow(c.x, c.y, b, true)
};
iOverLay.prototype.initPath = function(f) {
    if (typeof f != "undefined" && f != null) {
        this.points = trans2Points(f)
    }
    var b = this.points;
    for (var c = 0; c < b.length; c++) {
        var d = b[c];
        if (c == 0) {
            d.mileage = 0
        } else {
            d.countMileage(b[c - 1])
        }
    }
};
iOverLay.prototype.play = function(b) {
    if (b) {
        this.bIsCenter = b
    }
    this.drawInterval()
};
iOverLay.prototype.replay = function() {
    this.iPause = 0;
    this.drawInterval()
};
iOverLay.prototype.stop = function() {
    this.pause();
    this.dScale = 1;
    this.iPause = 0;
    this.redraw()
};
iOverLay.prototype.pause = function() {
    if (this.timeOut) {
        clearTimeout(this.timeOut);
        this.timeOut = null
    }
};
iOverLay.prototype.setInterval = function(b) {
    this.timeInterval = b
};
iOverLay.prototype.setRepeat = function(b) {
    this.bIsRepeat = b
};
iOverLay.prototype.drawInterval = function() {
    this.bIsPlay = true;
    if (this.iPause < this.endSeq) {
        this.iPause++
    } else {
        this.iPause = this.startSeq;
        if (!this.bIsRepeat) {
            return
        }
    }
    this.showStatus(this.iPause);
    if (typeof this.bIsCenter != "undefined" && this.bIsCenter) {
        if (this instanceof Marker || this instanceof Title) {
            this.map.recenterOrPanToLatLng(this.point)
        }
    }
    this.timeOut = this.setTimeout("this.drawInterval()", this.timeInterval)
};
iOverLay.prototype.getSPoints = function(l) {
    var k = this.points;
    var b = new Array();
    var c = k.length;
    var d = k[c - 1].mileage;
    var f = (l - this.startPath) / (this.endPath - this.startPath) * d;
    for (var j = 0; j < c - 1; j++) {
        if (k[j].mileage <= f) {
            b.push(k[j])
        }
        if (k[j + 1].mileage >= f) {
            var g = f - k[j].mileage;
            var h = Point.getDistPoint(k[j], k[j + 1], g);
            b.push(h);
            break
        }
    }
    return b
};
iOverLay.prototype.flash = function(b) {
    this.flashTimes = 0;
    this.bIsFilled = b;
    this.flashInterval(b)
};
iOverLay.prototype.flash2 = function(d, b) {
    try {
        this.flashTimes = 0;
        if (EzServerClient.GlobeFunction.isTypeRight(d, "int")) {
            this.flashEndtimes = d;
            this.flashInterval2(b)
        } else {
            if (EzServerClient.GlobeFunction.isTypeRight(d, "undefined")) {
                this.flashEndtimes = 3;
                this.flashInterval2(b)
            } else {
                throw EzErrorFactory.createError("iOverLay::flash������arguments[0]���Ͳ���ȷ")
            }
        }
    } catch(c) {
        throw EzErrorFactory.createError("iOverLay::flash�����в���ȷ", c)
    }
};
iOverLay.prototype.flashInterval2 = function(c) {
    var b = this.div;
    if (b == null) {
        return
    }
    if (this.flashTimes < this.flashEndtimes * 2) {
        this.flashTimes++;
        if (this.div.style.display == "") {
            this.div.style.display = "none"
        } else {
            this.div.style.display = ""
        }
    } else {
        this.div.style.display = "";
        if (typeof(c) != "undefined") {
            this.div.filled = c
        }
        return
    }
    this.setTimeout("this.flashInterval2(" + c + ")", 400)
};
iOverLay.prototype.refreshStatus = function() {
    if (this.dispStatus == 1) {
        if (this.div != null) {
            this.div.style.display = ""
        }
        if (this.titleDiv != null) {
            this.titleDiv.style.display = ""
        }
    } else {
        if (this.dispStatus == 2) {
            if (this.div != null) {
                this.div.style.display = "none"
            }
            if (this.titleDiv != null) {
                this.titleDiv.style.display = "none"
            }
        } else {
            if (this.dispStatus == 3) {
                this.flash()
            }
        }
    }
};
iOverLay.prototype.flashInterval = function(c) {
    var b = this.div;
    if (b == null) {
        return
    }
    if (this.flashTimes < 6) {
        this.flashTimes++;
        if (this.div.style.display == "") {
            this.div.style.display = "none"
        } else {
            this.div.style.display = ""
        }
    } else {
        this.div.style.display = "";
        if (typeof(this.bIsFilled) != "undefined") {
            this.div.filled = this.bIsFilled
        }
        return
    }
    this.flashTimeOut = this.setTimeout("this.flashInterval()", 400)
};
iOverLay.prototype.scale = function(b) {
    if (typeof b == "string") {
        b = parseFloat(b)
    }
    this.dScale = b;
    this.redraw()
};
iOverLay.prototype.rotate = function rotate(d, c) {
    var b = degToRad(d);
    costheta = Math.cos(b);
    sintheta = Math.sin(b);
    if (!c) {
        c = this.div
    }
    if (c) {
        c.style.filter = "progid:DXImageTransform.Microsoft.Matrix()";
        c.filters.item("DXImageTransform.Microsoft.Matrix").SizingMethod = "auto expand";
        c.filters.item("DXImageTransform.Microsoft.Matrix").FilterType = "bilinear";
        c.filters.item("DXImageTransform.Microsoft.Matrix").M11 = costheta;
        c.filters.item("DXImageTransform.Microsoft.Matrix").M12 = -sintheta;
        c.filters.item("DXImageTransform.Microsoft.Matrix").M21 = sintheta;
        c.filters.item("DXImageTransform.Microsoft.Matrix").M22 = costheta
    }
};
iOverLay.prototype.doRotate = function() {
    if (this.angle > 360) {
        this.angle -= 360
    }
    this.angle += 15;
    this.rotate(this.angle);
    this.setTimeout("this.doRotate()", 200)
};
iOverLay.prototype.showStatus = function(c) {
    if (isNaN(c)) {
        alert("����Ĳ������󣬲�����ֵ");
        return
    }
    if (typeof c == "string") {
        c = parseInt(c)
    }
    if (c < this.startSeq) {
        c = this.startSeq
    }
    if (c > this.endSeq) {
        c = this.endSeq
    }
    if (this.startScale && (this instanceof Marker || this instanceof Circle || this instanceof Rectangle || this instanceof Polyline)) {
        if (c <= this.startScaleSeq) {
            this.dScale = this.startScale
        } else {
            if (c >= this.endScaleSeq) {
                this.dScale = this.endScale
            } else {
                this.dScale = this.startScale + (c - this.startScaleSeq) / (this.endScaleSeq - this.startScaleSeq) * (this.endScale - this.startScale)
            }
        }
    }
    if (this instanceof Marker || this instanceof Polyline || this instanceof Title) {
        if (this.points.length > 0) {
            var b = c;
            if (b < this.startPath) {
                b = this.startPath
            }
            if (b > this.endPath) {
                b = this.endPath
            }
            this.pPoints = this.getSPoints(b);
            if (this.pPoints.length > 0) {
                this.point = this.pPoints[this.pPoints.length - 1]
            } else {}
            if (this.point == null) {
                throw Error(103, "��Ϊ��:" + this.pPoints.toString() + ":" + this.pPoints.length)
            }
        }
    }
    this.dispStatus = 1;
    for (var d = 0; d < this.statusSet.length; d++) {
        var f = this.statusSet[d];
        if (c >= f.startSeq && c <= f.endSeq) {
            this.dispStatus = f.iStatus;
            break
        }
    }
    this.redraw();
    this.refreshStatus()
};
iOverLay.prototype.addDispStatus = function(d, b, j) {
    for (var c = 0; c < arguments.length; c++) {
        if (isNaN(arguments[c])) {
            alert("����Ĳ������󣬲�����ֵ");
            return
        }
        if (typeof arguments[c] == "string") {
            arguments[c] = parseInt(arguments[c])
        }
    }
    if (j < 1 || j > 3) {
        alert("״̬���ô���ӦΪ(1:��ʾ;2:����;3:��˸)");
        return
    }
    var f = new OverlayStatus(d, b, j);
    for (var c = 0; c < this.statusSet.length; c++) {
        var h = this.statusSet[c];
        var g = h.bIsConflict(f);
        if (g) {
            f = null;
            return
        }
    }
    this.startSeq = Math.min(this.startSeq, d);
    this.endSeq = Math.max(this.endSeq, b);
    this.statusSet.push(f)
};
iOverLay.prototype.setExtendStatus = function(d, b, f, g) {
    for (var c = 0; c < arguments.length; c++) {
        if (isNaN(arguments[c])) {
            alert("����Ĳ������󣬲�����ֵ");
            return
        }
    }
    if (typeof d == "string") {
        d = parseInt(d)
    }
    if (typeof b == "string") {
        b = parseInt(b)
    }
    if (typeof f == "string") {
        f = parseFloat(f)
    }
    if (typeof g == "string") {
        g = parseFloat(g)
    }
    this.startSeq = Math.min(this.startSeq, d);
    this.endSeq = Math.max(this.endSeq, b);
    this.startScale = f;
    this.endScale = g;
    this.startScaleSeq = d;
    this.endScaleSeq = b
};
iOverLay.prototype.setPath = function(d, b, f) {
    for (var c = 0; c < 2; c++) {
        if (isNaN(arguments[c])) {
            alert("����Ĳ������󣬲�����ֵ");
            return
        }
    }
    if (typeof d == "string") {
        d = parseInt(d)
    }
    if (typeof b == "string") {
        b = parseInt(b)
    }
    this.startSeq = Math.min(this.startSeq, d);
    this.endSeq = Math.max(this.endSeq, b);
    this.startPath = d;
    this.endPath = b;
    this.initPath(f)
};
iOverLay.prototype.toString = function() {
    var b = "";
    if (this instanceof Circle) {
        b = this.point.toString() + "," + this.radius
    } else {
        if (this instanceof Rectangle || this instanceof Polygon || this instanceof Polyline) {
            b = this.points.join(",")
        } else {
            if (this instanceof Title || this instanceof Marker) {
                b = this.point.toString()
            }
        }
    }
    return b
};
iOverLay.prototype.setNode = function(b) {
    if (b) {
        this.bIsNode = b;
        if (this.div.style.border != "") {
            this.div.style.border = "1px solid #000000";
            this.div.style.backgroundColor = "#b3b3b3";
            this.div.style.filter = "alpha(opacity=70)"
        }
    } else {
        this.bIsNode = b;
        if (this.div.style.border != "") {
            this.div.style.border = "1px solid #000000";
            this.div.style.backgroundColor = "#b3b3b3";
            this.div.style.filter = "alpha(opacity=50)"
        }
    }
};
iOverLay.prototype.getLocalUnit = function() {
    var b = "degree";
    if (_MapSpanScale != 1) {
        b = "meter"
    }
    return b
};
iOverLay.prototype.toLocalUnit = function(c) {
    var b = c;
    if (typeof c == "string") {
        if (_MapSpanScale == 1 && (c.indexOf("meter") != -1)) {
            b = parseFloat(c) * (0.03 / 3600)
        }
    }
    return b
};
iOverLay.prototype.updatePoint = function() {
    this.point = new Point(this.map.mouseLng, this.map.mouseLat);
    if (this._point) {
        var b = this.point.x - this._point.x;
        var c = this.point.y - this._point.y;
        if (this instanceof Circle) {
            this.points[0] = this.points[0];
            this.points[1] = this.points[1]
        }
        if (this.center != null) {
            this.center.x = this.point.x;
            this.center.y = this.point.y
        }
        this._point = this.point
    }
    this.setNode(true);
    this.redraw();
    _CurentOverLay = this
};
iOverLay.prototype.ondragstart = function() {
    this._point = this.point
};
iOverLay.prototype.enableContextMenu = function() {
    BindingEvent(this.div, "contextmenu", this.eventHandler("showPropertyEdit"));
    if (this.titleDiv) {
        BindingEvent(this.titleDiv, "contextmenu", this.eventHandler("showPropertyEdit"))
    }
};
iOverLay.prototype.disableContextMenu = function() {
    unbindingEvent(this.div, "contextmenu", this.eventHandler("showPropertyEdit"));
    if (this.titleDiv) {
        unbindingEvent(this.titleDiv, "contextmenu", this.eventHandler("showPropertyEdit"))
    }
};
iOverLay.prototype.startMove = function(b) {
    var d = parseInt(this.div.style.left);
    var c = parseInt(this.div.style.top);
    this.bIsSyRedraw = false;
    if (!this.dragObject) {
        this.dragObject = new DragEvent(this.div, d, c, this.map.container)
    } else {
        this.dragObject.enable()
    }
    this._point = this.point;
    this.dragObject.ondrag = this.eventHandler("updatePoint");
    this.dragObject.onmove = b
};
iOverLay.prototype.stopMove = function(b) {
    this.dragObject.disable();
    this.dragObject.ondragend = null
};
iOverLay.prototype.showInfo = function(m, j, h, k) {
    if (!k) {
        k = ""
    }
    var d = document.getElementById("InfoDiv");
    if (d == null) {
        d = document.createElement("div");
        d.id = "InfoDiv";
        d.style.zIndex = "12000";
        d.style.position = "absolute";
        this.map.div.appendChild(d);
        BindingEvent(d, "mouseover",
        function() {
            iOverLay.bOutOfInfo = false
        });
        BindingEvent(d, "mouseout",
        function() {
            iOverLay.bOutOfInfo = true;
            iOverLay.closeInfo()
        })
    }
    var f = "";
    f = '<TABLE id="InfoTable_2"  >';
    f = f + "<TBODY>";
    f = f + "<TR>";
    f = f + '<TD class="InfoTitle">';
    f = f + '<TABLE class="InfoWord" cellSpacing=0 cellPadding=0 width="100%" align=center border=0>';
    f = f + "<TBODY>";
    f = f + "<TR>";
    f = f + '<TD id=head_txt><IMG src="/EzServer/css/infolittle.gif"><span id="info_title">' + k + "</span></TD>";
    f = f + "<TD width=30>��</TD>";
    f = f + '<TD vAlign=center align=middle width=20><A class="InfoClose"  onclick="iOverLay.closeInfoWait(true);" href="javascript:void(0)">��</A>';
    f = f + "</TD>";
    f = f + "</TR>";
    f = f + "</TBODY>";
    f = f + "</TABLE>";
    f = f + "</TD>";
    f = f + "</TR>";
    f = f + "<TR>";
    f = f + '<TD vAlign=top bgColor=#ffffff id="info_desc">';
    f = f + h;
    f = f + "</TD>";
    f = f + "</TR>";
    f = f + "</TBODY>";
    f = f + "</TABLE>";
    d.innerHTML = f;
    var q = document.createElement("div");
    q.innerHTML = f;
    this.map.div.appendChild(q);
    var n = q.offsetWidth;
    var l = q.offsetHeight;
    this.map.div.removeChild(q);
    var c = document.getElementById("InfoTable_2");
    var g = parseInt(this.div.offsetWidth);
    var b = parseInt(this.div.offsetHeight);
    var o = this.map.convert2WPoint(m, j);
    var r = this.map.getCenterLatLng();
    if (this.point.x > r.x) {
        d.style.left = convert2Px(o.x - n + g)
    } else {
        d.style.left = convert2Px(o.x)
    }
    if (this.point.y > r.y) {
        d.style.top = convert2Px(o.y + b - 1)
    } else {
        d.style.top = convert2Px(o.y - l)
    }
    d.style.display = ""
};
iOverLay.prototype.setPoint = function(b) {
    this.point = b;
    if (this.div != null && this.map != null) {
        this.redraw()
    }
};
iOverLay.prototype.getPoint = function() {
    if (this.point) {
        return this.point
    } else {
        return null
    }
};
iOverLay.prototype.toHTML = function() {
    var b = document.createElement("table");
    b.border = 0;
    b.id = "InfoTable";
    b.align = "center";
    b.cellspacing = 0;
    b.cellpadding = 0;
    b.onclick = "";
    var c = 0;
    if (g_current_editor.getLineStyle) {
        var g = b.insertRow(c);
        g.height = 10;
        var f = g.insertCell(0);
        f.innerHTML = "�ߵ���ʽ";
        f.className = "leftBorder";
        var d = g.insertCell(1);
        d.className = "rightBorder";
        d.appendChild(this.createSelect(g_current_editor.getLineStyle()));
        c++
    }
    if (g_current_editor.getColor) {
        var g = b.insertRow(c);
        g.height = 10;
        var f = g.insertCell(0);
        f.innerHTML = this.colorName;
        f.className = "leftBorder";
        var d = g.insertCell(1);
        d.className = "rightBorder";
        d.innerHTML = "<input size=10  style='BACKGROUND:" + g_current_editor.getColor() + "' value='" + g_current_editor.getColor() + "' onpropertychange='g_current_editor.setColor(this.value)' onclick='EzColorPicker(this,this);' ></input>";
        c++
    }
    if (g_current_editor.getWidth) {
        var g = b.insertRow(c);
        g.height = 10;
        var f = g.insertCell(0);
        f.innerHTML = "�ߵĿ��";
        f.className = "leftBorder";
        var d = g.insertCell(1);
        d.className = "rightBorder";
        d.innerHTML = "<input size=10 value='" + g_current_editor.getWidth() + "' onpropertychange='g_current_editor.setWidth(this.value)' ></input>";
        c++
    }
    if (g_current_editor.getOpacity) {
        var g = b.insertRow(c);
        g.height = 10;
        var f = g.insertCell(0);
        f.innerHTML = this.opacityName;
        f.className = "leftBorder";
        var d = g.insertCell(1);
        d.className = "rightBorder";
        d.innerHTML = "<input size=10 value='" + g_current_editor.getOpacity() + "' onpropertychange='g_current_editor.setOpacity(this.value)' ></input><font color=red>0~1</font>";
        c++
    }
    if (g_current_editor.getFillColor) {
        var g = b.insertRow(c);
        g.height = 10;
        var f = g.insertCell(0);
        f.innerHTML = "�����ɫ";
        f.className = "leftBorder";
        var d = g.insertCell(1);
        d.className = "rightBorder";
        d.innerHTML = "<input size=10 style='BACKGROUND:" + g_current_editor.getFillColor() + "' value='" + g_current_editor.getFillColor() + "' onpropertychange='g_current_editor.setFillColor(this.value)' onclick='EzColorPicker(this,this);'  ></input>";
        c++
    }
    if (g_current_editor.getFillOpacity) {
        var g = b.insertRow(c);
        g.height = 10;
        var f = g.insertCell(0);
        f.innerHTML = "���͸����";
        f.className = "leftBorder";
        var d = g.insertCell(1);
        d.className = "rightBorder";
        d.innerHTML = "<input size=10 value='" + g_current_editor.getFillOpacity() + "'  onpropertychange='g_current_editor.setFillOpacity(this.value)'></input><font color=red>0~1</font>"
    }
    return b.outerHTML
};
iOverLay.prototype.createSelect = function(f) {
    var b = document.createElement("select");
    b.onchange = "g_current_editor.setLineStyle(this.options[this.selectedIndex].value)";
    for (var d = 0; d < this.lineStyles.length; d++) {
        var c = document.createElement("option");
        c.innerHTML = this.lineStyleNames[d];
        c.value = this.lineStyles[d];
        if (f == this.lineStyles[d]) {
            c.selected = true
        }
        b.appendChild(c)
    }
    return b
};
iOverLay.prototype.showEdit = function() {
    this.openInfoWindowHtml(this.toHTML())
};
iOverLay.prototype.getOpacity = function() {
    return this.opacity
};
iOverLay.prototype.enableEdit = function(b) {
    this.editable = true;
    this.startMove(this.eventHandler("redraw"));
    this.addListener("contextmenu", this.eventHandler("showPropertyEdit"));
    this.edit_callback = b
};
iOverLay.prototype.disableEdit = function(b) {
    this.editable = false;
    this.stopMove();
    this.removeListener("contextmenu", this.eventHandler("showPropertyEdit"));
    if (b) {
        b()
    }
};
function MBR(f, c, d, b) {
    if (typeof f == "string") {
        f = parseFloat(f)
    }
    if (typeof c == "string") {
        c = parseFloat(c)
    }
    if (typeof d == "string") {
        d = parseFloat(d)
    }
    if (typeof b == "string") {
        b = parseFloat(b)
    }
    this.minX = f;
    this.minY = c;
    this.maxX = d;
    this.maxY = b
}
MBR.prototype.toString = function() {
    return this.minX + "," + this.minY + "," + this.maxX + "," + this.maxY
};
MBR.prototype.containsSegment = function(c, b) {
    if (this.minX > c.x && this.minX > b.x) {
        return false
    }
    if (this.maxX < c.x && this.maxX < b.x) {
        return false
    }
    if (this.minY > c.y && this.minY > b.y) {
        return false
    }
    if (this.maxY < c.y && this.maxY < b.y) {
        return false
    }
    return true
};
MBR.prototype.containsBounds = function(d) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(d, "MBR")) {
            throw EzErrorFactory.createError("MBR::containsBounds������arguments[0]�������Ͳ���ȷ")
        }
        var b = this.minX <= d.minX && (this.maxX >= d.maxX && (this.minY <= d.minY && this.maxY >= d.maxY));
        return b
    } catch(c) {
        throw EzErrorFactory.createError("MBR::containsBounds����ִ�в���ȷ", c)
    }
};
MBR.prototype.containsPoint = function(c) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "Point")) {
            throw EzErrorFactory.createError("MBR::containsPoint������arguments[0]�������Ͳ���ȷ")
        }
        var b = this.containsSegment(c, c);
        return b
    } catch(d) {
        throw EzErrorFactory.createError("MBR::containsPoint����ִ�в���ȷ", d)
    }
};
MBR.prototype.extend = function(b) {
    try {
        if (b instanceof Point) {
            this.minX = Math.min(this.minX, b.x);
            this.maxX = Math.max(this.maxX, b.x);
            this.minY = Math.min(this.minY, b.y);
            this.maxY = Math.max(this.maxY, b.y)
        } else {
            if (b instanceof MBR) {
                this.minX = Math.min(this.minX, b.minX);
                this.maxX = Math.max(this.maxX, b.maxX);
                this.minY = Math.min(this.minY, b.minY);
                this.maxY = Math.max(this.maxY, b.maxY)
            }
        }
    } catch(c) {
        throw EzErrorFactory.createError("MBR::extend����ִ�в���ȷ", c)
    }
};
MBR.prototype.scale = function(d) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(d, "float")) {
            throw EzErrorFactory.createError("MBR::scale������arguments[0]�������Ͳ���ȷ")
        }
        var b = d - 1;
        var f = this.getSpanX() / 2;
        var c = this.getSpanY() / 2;
        this.minX = this.minX - b * f;
        this.maxX = this.maxX + b * f;
        this.minY = this.minY - b * c;
        this.maxY = this.maxY + b * c
    } catch(d) {
        throw EzErrorFactory.createError("MBR::scale����ִ�в���ȷ", d)
    }
};
MBR.prototype.centerPoint = function() {
    var c = (parseFloat(this.minX) + parseFloat(this.maxX)) / 2;
    var b = (parseFloat(this.minY) + parseFloat(this.maxY)) / 2;
    var d = new Point(c, b);
    return d
};
MBR.prototype.getCenterPoint = function() {
    return this.centerPoint()
};
MBR.prototype.getSpanX = function() {
    return this.maxX - this.minX
};
MBR.prototype.getSpanY = function() {
    return this.maxY - this.minY
};
MBR.prototype.approxEquals = function(b) {
    if (!b) {
        return false
    }
    return bRetComp(this.minX, b.minX) && bRetComp(this.minY, b.minY) && bRetComp(this.maxX, b.maxX) && bRetComp(this.maxY, b.maxY)
};
MBR.prototype.equals = function(b) {
    if (!b) {
        return false
    }
    return (this.minX == b.minX) && (this.minY == b.minY) && (this.maxX == b.maxX) && (this.maxY == b.maxY)
};
function Rect(c, b) {
    this.width = c;
    this.height = b
}
Rect.prototype.toString = function() {
    return "(" + this.width + ", " + this.height + ")"
};
Rect.prototype.equals = function(c) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "Rect")) {
            throw EzErrorFactory.createError("Rect::equals������arguments[0]�������Ͳ���ȷ")
        }
        if (!c) {
            return false
        }
        return this.width == c.width && this.height == c.height
    } catch(b) {
        throw EzErrorFactory.createError("Rect::equals����ִ�в���ȷ", b)
    }
};
Rect.prototype.approxEquals = function(c) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "Rect")) {
            throw EzErrorFactory.createError("Rect::approxEquals������arguments[0]�������Ͳ���ȷ")
        }
        if (!c) {
            return false
        }
        return bRetComp(this.width, c.width) && bRetComp(this.height, c.height)
    } catch(b) {
        throw EzErrorFactory.createError("Rect::approxEquals����ִ�в���ȷ", b)
    }
};
function Point(b, f) {
    if (arguments.length == 1 && typeof arguments[0] == "string") {
        var c = arguments[0];
        var d = c.split(",");
        this.x = parseFloat(d[0]);
        this.y = parseFloat(d[1])
    } else {
        if (typeof b == "string") {
            this.x = parseFloat(b)
        } else {
            this.x = b
        }
        if (typeof f == "string") {
            this.y = parseFloat(f)
        } else {
            this.y = f
        }
    }
    this.screenX;
    this.screenY;
    this.mileage = -1;
    this.coordSequence = this.x + "," + this.y
}
Point.prototype.countMileage = function(c) {
    var b = this.distanceFrom(c) + c.mileage;
    this.mileage = b
};
Point.prototype.toString = function() {
    return this.x + "," + this.y
};
Point.prototype.equals = function(c) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(c, "Point"))) {
            throw EzErrorFactory.createError("Point::equals������arguments[0]���Ͳ���ȷ")
        }
        if (!c) {
            return false
        }
        return this.x == c.x && this.y == c.y
    } catch(b) {
        throw EzErrorFactory.createError("Point::equals�����в���ȷ", b)
    }
};
Point.prototype.distanceFrom = function(d) {
    var c = this.x - d.x;
    var b = this.y - d.y;
    return Math.sqrt(c * c + b * b)
};
Point.prototype.approxEquals = function(c) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(c, "Point"))) {
            throw EzErrorFactory.createError("Point::approxEquals������arguments[0]���Ͳ���ȷ")
        }
        if (!c) {
            return false
        }
        return bRetComp(this.x, c.x) && bRetComp(this.y, c.y)
    } catch(b) {
        throw EzErrorFactory.createError("Point::approxEquals�����в���ȷ", b)
    }
};
Point.prototype.getCenter = function(b) {
    if (!b) {
        return this
    }
    return new Point((this.x + b.x) / 2, (this.y + b.y) / 2)
};
Point.prototype.getCoordSequence = function() {
    return this.coordSequence
};
Point.prototype.getGeometryType = function() {
    return "point"
};
function Polyline(f, b, h, c, g, d) {
    try {
        this.base = iOverLay;
        this.base();
        this.unit = "px";
        if (typeof b == "undefined") {
            this.color = "#0000ff"
        } else {
            this.color = b
        }
        this.tag = "v:shape";
        if (typeof d == "undefined") {
            this.fillColor = "red"
        } else {
            this.fillColor = d
        }
        if (typeof h == "undefined") {
            this.weight = "5"
        } else {
            this.weight = h
        }
        if (typeof c == "undefined") {
            this.opacity = 0.45
        } else {
            this.opacity = c
        }
        this.div = null;
        this.filled = false;
        if (typeof g == "undefined") {
            this.arrow = 0
        } else {
            this.arrow = g
        }
        this.center = null;
        this.points = f;
        this.name = "";
        this.opacityName = "�ߵ�͸��ɫ";
        this.colorName = "�ߵ���ɫ";
        this.lineStyles = ["none", "dash", "dashdot", "dot", "longdash", "longdashdot", "shortdash", "shortdashdot", "shortdashdotdot", "longdashdotdot", "shortdot"];
        this.lineStyleNames = ["________", "- - - --", "-.-.-.-.", "........", " ___  ___", "___.___", "- - - -", "__ . __", "__ . . ", "____ . .", "........"];
        this.lineStyle = "none";
        this.getFillStyle = function() {
            var k = document.createElement("v:fill");
            k.color = this.fillColor;
            k.opacity = this.opacity;
            k.type = "frame";
            return k
        };
        this.setZIndex = function(k) {
            try {
                if (! (EzServerClient.GlobeFunction.isTypeRight(k, "int"))) {
                    throw EzErrorFactory.createError("Polyline::setZIndex������arguments[0]���Ͳ���ȷ")
                }
                if (this.div != null) {
                    this.div.style.zIndex = k
                }
            } catch(l) {
                throw EzErrorFactory.createError("Polyline::setZIndex�����в���ȷ", l)
            }
        };
        this.getZIndex = function() {
            return this.div.style.zIndex
        };
        this.init()
    } catch(j) {
        throw EzErrorFactory.createError("Polyline���췽��ִ�в���ȷ", j)
    }
}
Polyline.prototype = new iOverLay;
Polyline.prototype.onclick = function() {
    this.div.fireEvent("onclick");
    this.flash()
};
Polyline.prototype.trans2Points = function(f) {
    var k = f.split(";");
    var h = [];
    var b = [];
    var c = null;
    for (var g = 0; g < k.length; g++) {
        b = k[g].split(",");
        for (var d = 0; d < b.length; d = d + 2) {
            c = new Point(b[d], b[d + 1]);
            if (d == 0) {
                c.partStartFlag = g
            }
            h.push(c)
        }
    }
    b = null;
    c = null;
    k = null;
    return h
};
Polyline.prototype.init = function() {
    this.iZIndex = this.iZIndex - 10;
    if (this instanceof Circle) {
        this.tag = "v:oval";
        this.filled = true;
        if (_MapSpanScale == 1) {
            this.radiusUnit = "degree"
        } else {
            this.radiusUnit = "meter"
        }
    } else {
        if (this instanceof Rectangle) {
            this.tag = "v:rect";
            this.filled = true
        } else {
            if (this instanceof Polygon) {
                this.tag = "v:shape";
                this.filled = true
            } else {
                if (this instanceof Polyline) {
                    this.tag = "v:shape"
                }
            }
        }
    }
    this.coordSequence = "";
    if (this.points instanceof Array) {
        for (var b = 0; b < this.points.length; b++) {
            if (b == this.points.length - 1) {
                this.coordSequence += this.points[b].x + "," + this.points[b].y
            } else {
                this.coordSequence += this.points[b].x + "," + this.points[b].y + ","
            }
        }
    } else {
        if (typeof this.points == "string") {
            this.coordSequence = this.points;
            this.points = this.trans2Points(this.points)
        }
    }
    var d = document.createElement(this.tag);
    d.style.position = "absolute";
    d.style.zIndex = this.iZIndex;
    this.div = d;
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
        stroke.endarrow = "oval"
    } else {
        if (this.arrow == 1) {
            stroke.startarrow = "oval";
            stroke.endarrow = "classic"
        }
    }
    this.stroke = stroke;
    try {
        this.div.appendChild(this.stroke);
        this.fillStroke = this.getFillStyle();
        this.div.appendChild(this.fillStroke);
        this.div.filled = this.filled
    } catch(c) {
        var f = document.location
    }
};
Polyline.prototype.setPoints = function(b) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(b, "string")) && !(EzServerClient.GlobeFunction.isTypeRight(b, "Array"))) {
            throw EzErrorFactory.createError("Polyline::setPoints������arguments[0]���Ͳ���ȷ")
        }
        if (typeof b == "string") {
            this.points = this.trans2Points(b)
        } else {
            if (b instanceof Array) {
                this.points = b
            } else {
                alert("�����������,�����ǵ���ߴ���Point����������");
                return
            }
        }
        this.redraw()
    } catch(c) {
        throw EzErrorFactory.createError("Polyline::setPoints��������ȷ", c)
    }
};
Polyline.prototype.createDiv = function(b) {
    if (typeof this.div == "undefined" || this.div == null) {
        this.init()
    }
    if (typeof b != "undefined" && b != null) {
        this.map = b
    }
    this.map.div.appendChild(this.div);
    this.redraw();
    var d = parseInt(this.div.style.left);
    var c = parseInt(this.div.style.top);
    this.point = this.map.convert2LonLat(d, c)
};
Polyline.prototype.addListener = function(c, b) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(c, "string"))) {
            throw EzErrorFactory.createError("Polyline::addListener������arguments[0]���Ͳ���ȷ")
        }
        if (! (EzServerClient.GlobeFunction.isTypeRight(b, "function"))) {
            throw EzErrorFactory.createError("Polyline::addListener������arguments[1]���Ͳ���ȷ")
        }
        if (this.div == null) {
            alert("���ȼ����¼���(addOverlay)���ٴ������¼�!\n���¼��Ĵ����¼�û�гɹ�����");
            return
        }
        this.div.style.cursor = "hand";
        BindingEvent(this.div, c, b)
    } catch(d) {
        throw EzErrorFactory.createError("Polyline::addListener�����в���ȷ", d)
    }
};
Polyline.prototype.openInfoWindowHtml = function(b) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(b, "string"))) {
            throw EzErrorFactory.createError("Polyline::openInfoWindowHtml������arguments[0]���Ͳ���ȷ")
        }
        this.map.blowupOverlay(this);
        if (this.center == null) {
            var c = Math.floor(this.points.length / 2);
            this.map.openInfoWindow(this.points[c].x, this.points[c].y, b, true)
        } else {
            this.map.openInfoWindow(this.center.x, this.center.y, b, true)
        }
    } catch(d) {
        throw EzErrorFactory.createError("Polyline::openInfoWindowHtml�����в���ȷ", d)
    }
};
Polyline.prototype.closeInfoWindowHtml = function() {
    this.map.closeInfoWindow()
};
Polyline.prototype.display = function(b) {
    if (b) {
        this.drawElement.style.display = ""
    } else {
        this.drawElement.style.display = "none"
    }
};
Polyline.prototype.removeFromDiv = function() {
    this.pause();
    this.map.div.removeChild(this.div);
    EventManager.removeNode(this.div);
    this.deleteSnap()
};
Polyline.prototype.redraw = function() {
    if (this.div == null) {
        return
    }
    var c = this.map.viewSize.width;
    var f = this.map.viewSize.height;
    this.div.coordsize = c + "," + f;
    this.div.style.left = convert2Px(0);
    this.div.style.top = convert2Px(0);
    this.div.style.width = convert2Px(c);
    this.div.style.height = convert2Px(f);
    var b = this.points;
    if (this instanceof Polygon) {
        if (this.dScale && this.dScale != 1) {
            b = this.getScalePath(this.points, this.dScale)
        }
    }
    var d = this.getPx(this.weight);
    this.stroke.weight = convert2Px(d * this.dScale);
    var g = this.getVectorPath(b);
    this.div.path = g;
    this.redrawSnap()
};
Polyline.prototype.getPx = function(b) {
    var c = b;
    if ((_MapSpanScale == 1 && this.unit == "degree") || (_MapSpanScale == 1 && this.unit == "meter") || (_MapSpanScale != 1 && this.unit == "meter")) {
        var d = c;
        if (_MapSpanScale == 1 && this.unit == "degree") {
            d = d * 3600 / 0.03
        }
        c = this.map.getPxOfDist(d)
    }
    return c
};
Polyline.prototype.getScalePath = function(b, j) {
    var l = new Array();
    var m = this.getMBR();
    var c = m.centerPoint();
    for (var h = 0; h < b.length; h++) {
        var g = b[h];
        var f = c.x + (g.x - c.x) * j;
        var d = c.y + (g.y - c.y) * j;
        var k = new Point(f, d);
        l.push(k)
    }
    return l
};
Polyline.prototype.getVectorPath = function(f) {
    var c = new Array();
    if (typeof f == "undefined") {
        f = this.points
    }
    for (var h = 0; h < f.length; h++) {
        var g = f[h];
        var d = this.map.convert2WPoint(g.x, g.y);
        if (typeof g.partStartFlag != "undefined" && h != f.length - 1 || h == 0) {
            c.push("x");
            c.push("m");
            c.push(d.x);
            c.push(d.y);
            c.push("l")
        }
        c.push(d.x);
        c.push(d.y)
    }
    c.push("e");
    var j = c.join(" ");
    return j
};
Polyline.prototype.getPoints = function() {
    return this.points
};
Polyline.prototype.getLength = function() {
    var b = CalculateLength(this.getPoints());
    b = Math.floor(b);
    return b
};
Polyline.prototype.getArea = function() {
    var b = CalculateArea(this.getPoints());
    b = Math.floor(b);
    return b
};
Polyline.prototype.getMBR = function() {
    var c = this.points[0];
    var f = new MBR(c.x, c.y, c.x, c.y);
    for (var b = 0; b < this.points.length; b++) {
        var d = this.points[b];
        f.extend(d)
    }
    return f
};
Polyline.prototype.setColor = function(b) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(b, "string"))) {
            throw EzErrorFactory.createError("Polyline::setColor������arguments[0]���Ͳ���ȷ")
        }
        this.color = b + "";
        this.stroke.color = b
    } catch(c) {
        throw EzErrorFactory.createError("Polyline::setPoints�����в���ȷ", c)
    }
};
Polyline.prototype.getColor = function() {
    return this.color
};
Polyline.prototype.setWidth = function(b) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(b, "int"))) {
            throw EzErrorFactory.createError("Polyline::setWidth������arguments[0]���Ͳ���ȷ")
        }
        if (typeof b == "string") {
            this.weight = parseFloat(b);
            if (b.indexOf("degree") != -1) {
                this.unit = "degree"
            } else {
                if (b.indexOf("meter") != -1) {
                    this.unit = "meter"
                } else {
                    this.unit = "px"
                }
            }
            this.redraw()
        } else {
            this.weight = b;
            this.stroke.weight = this.weight + "px"
        }
    } catch(c) {
        throw EzErrorFactory.createError("Polyline::setWidth�����в���ȷ", c)
    }
};
Polyline.prototype.getWidth = function() {
    return this.weight
};
Polyline.prototype.setOpacity = function(b) {
    try {
        this.opacity = b + "";
        this.stroke.opacity = b
    } catch(c) {}
};
Polyline.prototype.getOpacity = function() {
    return this.opacity
};
Polyline.prototype.setLineStyle = function(b) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(b, "string"))) {
            throw EzErrorFactory.createError("Polyline::setLineStyle������arguments[0]���Ͳ���ȷ")
        }
        this.setDashStyle(b)
    } catch(c) {
        throw EzErrorFactory.createError("Polyline::setLineStyle�����в���ȷ", c)
    }
};
Polyline.prototype.getLineStyle = function() {
    return this.lineStyle
};
Polyline.prototype.setDashStyle = function(b) {
    var c = this.lineStyles.join(",");
    if (c.indexOf(b) != -1) {
        this.stroke.dashstyle = b
    } else {
        alert("����������:[" + c + "]�е�ֵ��")
    }
    this.lineStyle = b
};
Polyline.prototype.refreshNodeSnap = function() {
    g_current_editor = this;
    var h = this.markers.indexOf(_CurentOverLay);
    var f = h % 2;
    if (f == 0) {
        if (h > 0) {
            var g = this.markers[h - 1];
            var d = this.markers[h - 2].point.getCenter(this.markers[h].point);
            g.setPoint(d)
        }
        if (h < this.markers.length - 2) {
            var g = this.markers[h + 1];
            var d = this.markers[h + 2].point.getCenter(this.markers[h].point);
            g.setPoint(d)
        }
    } else {
        for (i = h; i < this.markers.length; i++) {
            var g = this.markers[i];
            var f = i % 2;
            if (f == 1 && (g.bIsNode == true)) {
                var c = this.markers[i - 1];
                var d = new Point((g.point.x + c.point.x) / 2, (g.point.y + c.point.y) / 2);
                var b = this.createSnap(d, false);
                b.show();
                this.markers = this.markers.insert(i, b)
            }
        }
    }
};
Polyline.prototype.createNodeSnap = function() {
    for (i = 0; i < this.points.length; i++) {
        this.markers.push(this.createSnap(this.points[i], true));
        if (i < this.points.length - 1) {
            var b = new Point((this.points[i].x + this.points[i + 1].x) / 2, (this.points[i].y + this.points[i + 1].y) / 2);
            var c = this.createSnap(b, false);
            this.markers.push(c)
        }
    }
};
Polyline.prototype.enableEdit = function(b) {
    if (this.editable) {
        return
    }
    this.editable = true;
    this.markers = new Array();
    this.createNodeSnap();
    this.showSnapTimeout = null;
    this.snap_hovering = false;
    this.addListener("mouseover", this.eventHandler("showSnap"));
    this.addListener("mouseout", this.eventHandler("hideSnap"));
    this.addListener("contextmenu", this.eventHandler("showPropertyEdit"));
    this.edit_callback = b
};
Polyline.prototype.disableEdit = function(b) {
    if (!this.editable) {
        return
    }
    this.editable = false;
    this.deleteSnap();
    this.removeListener("mouseover", this.eventHandler("showSnap"));
    this.removeListener("mouseout", this.eventHandler("hideSnap"));
    this.removeListener("contextmenu", this.eventHandler("showPropertyEdit"));
    this.edit_callback = null;
    if (b) {
        b()
    }
};
g_Node_iIndex = 0;
Polyline.prototype.createSnap = function(d, f) {
    var c = new Icon();
    if (f) {
        c.image = null
    } else {
        c.image = null
    }
    c.height = 12;
    c.width = 12;
    c.topOffset = 0;
    c.leftOffset = 0;
    var b = new Marker(d, c);
    b.nodeIndex = g_Node_iIndex++;
    b.createDiv(this.map);
    b.hide();
    b.setNode(f);
    b.startMove(this.eventHandler("updateSnap"));
    b.addListener("mouseover", this.eventHandler("snap_hovering_true"));
    b.addListener("mouseout", this.eventHandler("snap_hovering_false"));
    return b
};
Polyline.prototype.snap_hovering_true = function() {
    this.snap_hovering = true
};
Polyline.prototype.snap_hovering_false = function() {
    this.snap_hovering = false
};
Polyline.prototype.updateSnap = function() {
    this.points.clear();
    for (i = 0; i < this.markers.length; i++) {
        if (this.markers[i].div != null && this.markers[i].bIsNode) {
            this.points.push(this.markers[i].point)
        }
    }
    this.redraw();
    this.setTimeout("this.refreshNodeSnap()", 10)
};
g_snap_show = false;
Polyline.prototype.delayShowSnap = function() {
    if (g_snap_show) {
        return
    }
    for (i = 0; i < this.markers.length; i++) {
        this.markers[i].show()
    }
    g_snap_show = true
};
Polyline.prototype.delayHideSnap = function() {
    if (this.snap_hovering || !g_snap_show) {
        return
    }
    for (i = 0; i < this.markers.length; i++) {
        this.markers[i].hide()
    }
    g_snap_show = false
};
Polyline.prototype.showSnap = function() {
    if (this.showSnapTimeout != null) {
        window.clearTimeout(this.showSnapTimeout);
        this.showSnapTimeout = null
    }
    this.showSnapTimeout = this.setTimeout("this.delayShowSnap()", 300)
};
Polyline.prototype.hideSnap = function() {
    if (this.showSnapTimeout != null) {
        window.clearTimeout(this.showSnapTimeout);
        this.showSnapTimeout = null
    }
    this.panTimeout = this.setTimeout("this.delayHideSnap()", 300)
};
Polyline.prototype.deleteSnap = function() {
    if (!this.markers) {
        return
    }
    for (i = 0; i < this.markers.length; i++) {
        var b = this.markers[i];
        b.removeFromDiv()
    }
    this.markers.clear()
};
Polyline.prototype.redrawSnap = function() {
    if (!this.markers) {
        return
    }
    for (i = 0; i < this.markers.length; i++) {
        var b = this.markers[i];
        b.redraw()
    }
};
Polyline.prototype.getCoordSequence = function() {
    return this.coordSequence
};
Polyline.prototype.getGeometryType = function() {
    return "polyline"
};
function Polygon(d, b, f, g, c) {
    this.base = Polyline;
    this.base(d, b, f, g, null, c);
    this.fillOpacity = g || "1"
}
Polygon.prototype = new Polyline;
Polygon.prototype.setFillOpacity = function(b) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(b, "float"))) {
            throw EzErrorFactory.createError("Polygon::setFillOpacity������arguments[0]���Ͳ���ȷ")
        }
        try {
            this.fillOpacity = b + "";
            this.fillStroke.opacity = b
        } catch(c) {}
    } catch(c) {
        throw EzErrorFactory.createError("Polygon::setFillOpacity�����в���ȷ", c)
    }
};
Polygon.prototype.getFillOpacity = function() {
    return this.fillOpacity
};
Polygon.prototype.setFillColor = function(b) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(b, "string"))) {
            throw EzErrorFactory.createError("Polygon::setFillColor������arguments[0]���Ͳ���ȷ")
        }
        this.fillColor = b + "";
        this.fillStroke.color = b
    } catch(c) {
        throw EzErrorFactory.createError("Polygon::setFillColor�����в���ȷ", c)
    }
};
Polygon.prototype.getFillColor = function() {
    return this.fillColor
};
Polygon.prototype.updateSnap = function() {
    this.points.clear();
    for (i = 0; i < this.markers.length; i++) {
        if (this.markers[i].div != null && this.markers[i].bIsNode) {
            this.points.push(this.markers[i].point)
        }
    }
    this.points.push(this.markers[0].point);
    this.redraw();
    this.setTimeout("this.refreshNodeSnap()", 10)
};
Polygon.prototype.getGeometryType = function() {
    return "polygon"
};
Polygon.prototype.closeInfoWindowHtml = function() {
    this.map.closeInfoWindow()
};
function Circle(d, b, f, g, c) {
    this.base = Polygon;
    this.base(d, b, f, g, c);
    this.radiusUnit = ""
}
Circle.prototype = new Polygon;
Circle.prototype.trans2Points = function(b) {
    var d = b.split(",");
    for (var c = 0; c < d.length; c++) {
        d[c] = parseFloat(d[c])
    }
    this.center = new Point(d[0], d[1]);
    this.radius = d[2];
    return d
};
Circle.prototype.setRadius = function(c) {
    var b = this.toLocalUnit(c);
    this.radius = parseFloat(b);
    this.redraw();
    if (this.markers != null && this.markers.length > 0) {
        var f = this.markers[1];
        var d = new Point(this.center.x, this.center.y + this.radius);
        f.setPoint(d)
    }
};
Circle.prototype.getMeter = function(d) {
    var b = d;
    var c = this.getLocalUnit();
    if (c.indexOf("degree") != -1) {
        b = parseFloat(d) * 3600 / 0.03
    }
    return b
};
Circle.prototype.getRadiusPx = function(c) {
    var d = c;
    if (this.radiusUnit != "px") {
        if (_MapSpanScale == 1 || this.editable == true) {
            dUnit = this.toLocalUnit(c);
            var b = this.map.convert2WPoint(this.center.x, this.center.y);
            var f = this.map.convert2WPoint(this.center.x + dUnit, this.center.y);
            d = (f.x - b.x)
        } else {
            d = this.getMeter(c);
            d = this.map.getPxOfDist(d)
        }
    }
    return d
};
Circle.prototype.redraw = function() {
    var c = this.radius * this.dScale;
    var b = this.map.convert2WPoint(this.center.x, this.center.y);
    c = this.getRadiusPx(c);
    var d = 2 * c;
    this.div.style.left = convert2Px(b.x - c);
    this.div.style.top = convert2Px(b.y - c);
    this.div.style.width = convert2Px(d);
    this.div.style.height = convert2Px(d);
    var f = this.getPx(this.weight);
    this.stroke.weight = convert2Px(f);
    this.redrawSnap()
};
Circle.prototype.toString = function() {
    var b = this.center.toString() + "," + this.radius;
    return b
};
Circle.prototype.getCenter = function() {
    return this.center
};
Circle.prototype.getRadius = function() {
    return this.radius
};
Circle.prototype.getPoints = function() {
    var b = new Array();
    for (var d = 0; d <= 36; d++) {
        var g = _C_P * 10 * d;
        var c = this.radius * Math.cos(g);
        var h = this.radius * Math.sin(g);
        var f = new Point(this.center.x + c, this.center.y + h);
        b.push(f)
    }
    return b
};
Circle.prototype.getRadiusLength = function() {
    var b = this.radius;
    var d = new Point(this.center.x + b, this.center.y);
    var c = GetDistanceInLL(this.center, d);
    c = Math.floor(c);
    return c
};
Circle.prototype.refreshNodeSnap = function() {
    this.center.x = this.markers[0].point.x;
    this.center.y = this.markers[0].point.y;
    var b = (this.markers[0].point.x - this.markers[1].point.x);
    var c = (this.markers[0].point.y - this.markers[1].point.y);
    this.radius = Math.sqrt(b * b + c * c);
    this.radiusUnit = this.getLocalUnit();
    this.redraw()
};
Circle.prototype.updateSnap = function() {
    this.refreshNodeSnap()
};
Circle.prototype.createNodeSnap = function() {
    this.markers.push(this.createSnap(this.center, true));
    var b = new Point(this.center.x + this.radius, this.center.y);
    this.markers.push(this.createSnap(b, true));
    this.redraw()
};
Circle.prototype.getGeometryType = function() {
    return "circle"
};
Circle.prototype.getMBR = function() {
    try {
        return new MBR(this.center.x - this.radius, this.center.y - this.radius, this.center.x + this.radius, this.center.y + this.radius)
    } catch(b) {
        throw EzErrorFactory.createError("Circle::getMBR�����в���ȷ", b)
    }
};
function Marker(d, b, c) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(d, "Point")) {
            throw EzErrorFactory.createError("Marker���췽����arguments[0]�������Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "Icon")) {
            throw EzErrorFactory.createError("Marker���췽����arguments[1]�������Ͳ���ȷ")
        }
        this.base = iOverLay;
        this.base();
        this.point = d;
        this.icon = b;
        this.div = null;
        this.title = c;
        this.init();
        this.name = "";
        this.opacityName = "ͼ��͸��ɫ"
    } catch(f) {
        throw EzErrorFactory.createError("Marker���췽��ִ�в���ȷ", f)
    }
}
Marker.prototype = new iOverLay;
Marker.prototype.init = function() {
    if (this.icon.image != null) {
        this.div = document.createElement("img");
        this.div.galleryimg = "no";
        this.div.src = this.icon.image
    } else {
        this.div = document.createElement("div");
        this.div.style.border = "2px solid red";
        this.div.style.fontSize = "1px"
    }
    this.div.style.position = "absolute";
    this.div.style.zIndex = this.iZIndex;
    this.div.style.display = "";
    if (!isNaN(this.icon.height) && !isNaN(this.icon.width)) {
        this.div.style.height = convert2Px(this.icon.height);
        this.div.style.width = convert2Px(this.icon.width)
    }
    this.titleDiv = this.createTitleDiv()
};
Marker.prototype.createTitleDiv = function() {
    if (typeof this.title == "undefined" || this.title == null) {
        return null
    }
    var b = this.title.createTitleDiv();
    return b
};
Marker.prototype.setZIndex = function(b) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(b, "int"))) {
            throw EzErrorFactory.createError("Marker::setZIndex������arguments[0]���Ͳ���ȷ")
        }
        if (this.div != null) {
            this.div.style.zIndex = b
        }
        if (this.titleDiv != null) {
            this.titleDiv.style.zIndex = b
        }
    } catch(c) {
        throw EzErrorFactory.createError("Polyline::setZIndex�����в���ȷ", c)
    }
};
Marker.prototype.showTitle = function() {
    if (this.titleDiv && this.div.style.display == "") {
        this.titleDiv.style.display = ""
    }
};
Marker.prototype.hideTitle = function() {
    if (this.titleDiv) {
        this.titleDiv.style.display = "none"
    }
};
Marker.prototype.createDiv = function(b) {
    if (typeof b != "undefined" && b != null) {
        this.map = b
    }
    b.div.appendChild(this.div);
    if (this.titleDiv != null) {
        b.div.appendChild(this.titleDiv)
    }
    this.redraw()
};
Marker.prototype.redraw = function(d) {
    var k = this.map.convert2WPoint(this.point.x, this.point.y);
    var h = 0;
    var l = 0;
    var c = 0;
    try {
        c = this.dScale * this.icon.width;
        var b = this.dScale * this.icon.height;
        h = this.dScale * this.icon.leftOffset;
        l = this.dScale * this.icon.topOffset;
        this.div.style.left = convert2Px(k.x + h - c / 2);
        this.div.style.top = convert2Px(k.y + l - b / 2);
        this.div.style.width = convert2Px(c);
        this.div.style.height = convert2Px(b)
    } catch(j) {
        alert("redraw:" + j.message);
        alert("������Ϣ��:" + this.point.toString() + ":" + k.toString())
    }
    if (this.titleDiv != null) {
        var g;
        var f;
        var c = this.title.fontSize * StrLength(this.title.name) / 2;
        c = c * this.dScale;
        var m = this.title.fontSize * this.dScale;
        this.titleDiv.style.fontSize = convert2Px(m);
        if (this.title.pos == 0) {
            g = k.x;
            f = k.y - m - parseInt(this.div.style.height) / 2 + 4
        } else {
            if (this.title.pos == 1) {
                g = k.x + parseInt(this.div.style.width) / 2;
                f = k.y - m - parseInt(this.div.style.height) / 2
            } else {
                if (this.title.pos == 2) {
                    g = k.x + parseInt(this.div.style.width) / 2;
                    f = k.y - m / 2
                } else {
                    if (this.title.pos == 3) {
                        g = k.x + parseInt(this.div.style.width) / 2;
                        f = k.y + 4 + parseInt(this.div.style.height) / 2
                    } else {
                        if (this.title.pos == 4) {
                            g = k.x;
                            f = k.y + 4 + parseInt(this.div.style.height) / 2
                        } else {
                            if (this.title.pos == 5) {
                                g = k.x - c / 2;
                                f = k.y + 4 + parseInt(this.div.style.height) / 2
                            } else {
                                if (this.title.pos == 6) {
                                    g = k.x - c;
                                    f = k.y - m / 2
                                } else {
                                    g = k.x - c / 2;
                                    f = k.y - 4 - m - parseInt(this.div.style.height) / 2
                                }
                            }
                        }
                    }
                }
            }
        }
        g = g + h;
        f = f + l;
        this.titleDiv.style.top = convert2Px(f);
        this.titleDiv.style.left = convert2Px(g);
        if (this.bIsTransparent) {
            this.titleDiv.style.width = convert2Px(c + this.title.fontSize)
        }
    }
};
Marker.prototype.removeFromDiv = function() {
    if (!this.div) {
        return
    }
    this.pause();
    if (this.map) {
        this.map.div.removeChild(this.div);
        EventManager.removeNode(this.div);
        if (this.titleDiv != null) {
            this.map.div.removeChild(this.titleDiv);
            EventManager.removeNode(this.titleDiv)
        }
    }
};
Marker.prototype.openInfoWindowHtml = function(b) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(b, "string"))) {
            throw EzErrorFactory.createError("Marker::openInfoWindowHtml������arguments[0]���Ͳ���ȷ")
        }
        this.map.blowupOverlay(this);
        this.map.openInfoWindow(this.point.x, this.point.y, b, true)
    } catch(c) {
        throw EzErrorFactory.createError("Marker::openInfoWindowHtml�����в���ȷ", c)
    }
};
Marker.prototype.closeInfoWindowHtml = function() {
    this.map.closeInfoWindow()
};
Marker.prototype.setOpacity = function(b) {
    this.opacity = b;
    if (this.div) {
        this.div.style.filter = "ALPHA(opacity=" + this.opacity * 100 + ")"
    }
    if (this.titleDiv) {
        this.titleDiv.style.filter = "ALPHA(opacity=" + this.opacity * 100 + ")"
    }
};
HTMLElementOverLay = function(d, c, b) {
    iOverLay.call(this);
    this.point = c;
    this.html = b;
    this.id = d;
    this.div = window.document.createElement("div");
    this.div.id = this.id;
    this.div.style.zIndex = 10001
};
HTMLElementOverLay.prototype = new iOverLay;
HTMLElementOverLay.prototype.setZIndex = function(b) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(b, "int"))) {
            throw EzErrorFactory.createError("HTMLElementOverLay::setZIndex������arguments[0]���Ͳ���ȷ")
        }
        this.div.style.zIndex = b
    } catch(c) {
        throw EzErrorFactory.createError("HTMLElementOverLay::setZIndex�����в���ȷ", c)
    }
};
HTMLElementOverLay.prototype.getZIndex = function() {
    return this.div.style.zIndex
};
HTMLElementOverLay.prototype.createDiv = function(b) {
    if (typeof b != "undefined" && b != null) {
        this.map = b
    }
    b.div.appendChild(this.div);
    this.redraw()
};
HTMLElementOverLay.prototype.redraw = function() {
    var b = this.map.convert2WPoint(this.point.x, this.point.y);
    this.div.style.position = "absolute";
    this.div.style.left = b.x + "px";
    this.div.style.top = b.y + "px";
    this.div.innerHTML = this.html
};
HTMLElementOverLay.prototype.removeFromDiv = function() {
    if (!this.div) {
        return
    }
    this.pause();
    if (this.map) {
        this.map.div.removeChild(this.div);
        EventManager.removeNode(this.div)
    }
};
function MultiFeat(g, b, f, c, d) {
    this.base = iOverLay;
    this.base();
    this.filled = true;
    this.fillColor = d || "blue";
    this.lineColor = b || "red";
    this.lineWidth = f || 2;
    this.opacity = c || 1;
    this.feats = new Array();
    this.paths = Trim(g)
}
MultiFeat.prototype = new iOverLay;
MultiFeat.prototype.createDiv = function(d) {
    if (typeof d != "undefined" && d != null) {
        this.map = d
    }
    var g = this.paths.split(";");
    for (var c = 0; c < g.length; c++) {
        var f = g[c];
        var h = null;
        if (this.filled) {
            if (f.length == 3) {
                h = Circle
            } else {
                if (f.length == 4) {
                    h = Rectangle
                } else {
                    if (f.length >= 6) {
                        h = Polygon
                    }
                }
            }
        } else {
            h = Polyline
        }
        var b = new h(f, this.lineColor, this.lineWidth, this.opcacity, this.fillColor);
        b.createDiv(this.map);
        this.feats.push(b)
    }
    this.redraw()
};
MultiFeat.prototype.getMBR = function() {
    var d = null;
    for (var c = 0; c < this.feats.length; c++) {
        var b = this.feats[c];
        if (d == null) {
            d = b.getMBR()
        } else {
            d = MBR.union(d, b.getMBR())
        }
    }
    return d
};
MultiFeat.prototype.redraw = function() {
    for (var c = 0; c < this.feats.length; c++) {
        var b = this.feats[c];
        b.redraw()
    }
};
MultiFeat.prototype.removeFromDiv = function() {
    for (var c = 0; c < this.feats.length; c++) {
        var b = this.feats[c];
        b.removeFromDiv()
    }
};
MultiFeat.prototype.addListener = function(g, c) {
    var b = this;
    for (var f = 0; f < this.feats.length; f++) {
        var d = this.feats[f];
        d.addListener(g, c)
    }
};
MultiFeat.prototype.removeListener = function(f, b) {
    for (var d = 0; d < this.feats.length; d++) {
        var c = this.feats[d];
        c.removeListener(f, b)
    }
};
MultiFeat.prototype.enableEdit = function() {
    for (var c = 0; c < this.feats.length; c++) {
        var b = this.feats[c];
        b.enableEdit()
    }
};
MultiFeat.prototype.disableEdit = function() {
    for (var c = 0; c < this.feats.length; c++) {
        var b = this.feats[c];
        b.disableEdit()
    }
};
function Rectangle(f, c, g, j, d) {
    this.base = Polygon;
    var b = f.split(",");
    var h;
    if (b[0] > b[2]) {
        h = b[0];
        b[0] = b[2];
        b[2] = h
    }
    if (b[1] > b[3]) {
        h = b[1];
        b[1] = b[3];
        b[3] = h
    }
    f = b.join(",");
    h = null;
    b = null;
    this.base(f, c, g, j, d)
}
Rectangle.prototype = new Polygon;
Rectangle.prototype.redraw = function() {
    var k = this.getMBR();
    if (this.dScale && this.dScale != 1) {
        k.scale(this.dScale)
    }
    var b = this.map.convert2WPoint(k.minX, k.minY);
    var j = this.map.convert2WPoint(k.maxX, k.maxY);
    var g = Math.min(b.x, j.x);
    var f = Math.min(b.y, j.y);
    var c = Math.abs(b.x - j.x);
    var h = Math.abs(b.y - j.y);
    this.div.style.left = convert2Px(g);
    this.div.style.top = convert2Px(f);
    this.div.style.width = convert2Px(c);
    this.div.style.height = convert2Px(h);
    var d = this.getPx(this.weight);
    this.stroke.weight = convert2Px(d * this.dScale);
    this.redrawSnap()
};
Rectangle.prototype.getMBR = function() {
    var d = Math.min(this.points[0].x, this.points[1].x);
    var b = Math.max(this.points[0].x, this.points[1].x);
    var c = Math.min(this.points[0].y, this.points[1].y);
    var f = Math.max(this.points[0].y, this.points[1].y);
    if (typeof this.MBR == "undefined" || this.MBR == null) {
        this.MBR = new MBR()
    }
    this.MBR.minX = d;
    this.MBR.minY = c;
    this.MBR.maxX = b;
    this.MBR.maxY = f;
    return this.MBR
};
Rectangle.prototype.getPoints = function() {
    var c = new Array();
    var f = Math.min(this.points[0].x, this.points[1].x);
    var b = Math.max(this.points[0].x, this.points[1].x);
    var d = Math.min(this.points[0].y, this.points[1].y);
    var g = Math.max(this.points[0].y, this.points[1].y);
    c.push(new Point(f, d));
    c.push(new Point(f, g));
    c.push(new Point(b, g));
    c.push(new Point(b, d));
    c.push(new Point(f, d));
    return c
};
Rectangle.prototype.refreshNodeSnap = function() {};
Rectangle.prototype.createNodeSnap = function() {
    for (i = 0; i < this.points.length; i++) {
        this.markers.push(this.createSnap(this.points[i], true))
    }
};
Rectangle.prototype.getGeometryType = function() {
    return "rectangle"
};
function Title(g, j, k, d, c, h, b, f) {
    this.base = iOverLay;
    this.base();
    this.name = g;
    this.title = this.name.replace(/\n/g, "<br>");
    this.fontSize = 12;
    this.pos = 7;
    this.color = "WHITE";
    this.font = "����";
    this.bgColor = "#015190";
    this.borderColor = "red";
    this.borderWidth = "1";
    this.div = null;
    this.bIsTransparent = false;
    this.iShowLen = -1;
    this.opacityName = "ͼ��͸��ɫ";
    if (typeof j != "undefined" && j != null) {
        this.fontSize = j
    }
    if (typeof k != "undefined" && k != null) {
        this.pos = k
    }
    if (typeof d != "undefined" && d != null) {
        this.font = d
    }
    if (typeof c != "undefined" && c != null) {
        this.color = c
    }
    if (typeof h != "undefined" && h != null) {
        this.bgColor = h
    }
    if (typeof b != "undefined" && b != null) {
        this.borderColor = b
    }
    if (typeof f != "undefined" && f != null) {
        this.borderWidth = f
    }
    this.div = this.createTitleDiv()
}
Title.prototype = new iOverLay;
Title.prototype.createTitleDiv = function() {
    var b = createTxt(this.title, this.bIsTransparent);
    b.style.zIndex = this.iZIndex;
    b.style.fontSize = convert2Px(this.fontSize);
    b.style.fontFamily = this.font;
    b.style.color = this.color;
    b.noWrap = true;
    b.style.border = this.borderWidth + "px solid " + this.borderColor;
    if (!this.bIsTransparent) {
        b.style.backgroundColor = this.bgColor;
        b.style.width = "auto";
        b.style.height = "auto"
    }
    b.title = this.name;
    return b
};
Title.prototype.setName = function(c, b) {
    this.name = c;
    this.title = this.name.replace(/\n/g, "<br>");
    if (this.iShowLen != -1) {
        this.title = this.name.substr(0, this.iShowLen) + "..."
    }
    if (this.div != null) {
        this.redraw()
    }
};
Title.prototype.setShowMaxLen = function(b) {
    this.iShowLen = b
};
Title.prototype.createDiv = function(b) {
    if (typeof b != "undefined" && b != null) {
        this.map = b
    }
    b.div.appendChild(this.div);
    this.redraw()
};
g_title_index = 0;
Title.prototype.redraw = function() {
    window.status = "==>" + g_title_index++;
    var d = this.map.convert2WPoint(this.point.x, this.point.y);
    if (this.div != null) {
        var g = d.x;
        var f = d.y;
        var c = this.fontSize * StrLength(this.name) / 2;
        var b = this.fontSize;
        if (this.pos == 0) {
            g = d.x;
            f = d.y - b / 2
        } else {
            if (this.pos == 1) {
                g = d.x + c / 2;
                f = d.y - b / 2
            } else {
                if (this.pos == 2) {
                    g = d.x + c / 2;
                    f = d.y
                } else {
                    if (this.pos == 3) {
                        g = d.x + c / 2;
                        f = d.y + b / 2
                    } else {
                        if (this.pos == 4) {
                            g = d.x;
                            f = d.y + b / 2
                        } else {
                            if (this.pos == 5) {
                                g = d.x - c / 2;
                                f = d.y + b / 2
                            } else {
                                if (this.pos == 6) {
                                    g = d.x - c / 2;
                                    f = d.y - b / 2
                                } else {
                                    g = d.x - c / 2;
                                    f = d.y - b / 2
                                }
                            }
                        }
                    }
                }
            }
        }
        this.div.style.top = convert2Px(f);
        this.div.style.left = convert2Px(g);
        if (this.bIsTransparent) {
            this.div.style.width = convert2Px(c + this.fontSize)
        }
        if (this.div.innerHTML != this.title) {
            this.div.title = this.name;
            this.div.innerHTML = this.title
        }
        if (this.dragObject) {}
    }
};
Title.prototype.removeFromDiv = function() {
    if (!this.div) {
        return
    }
    this.pause();
    if (this.map) {
        this.map.div.removeChild(this.div);
        EventManager.removeNode(this.div)
    }
};
Title.prototype.setOpacity = function(b) {
    this.opacity = b + "";
    var c = this.div;
    if (c) {
        c.style.filter = "ALPHA(opacity=" + this.opacity * 100 + ")"
    }
};
function MultiPoint(b) {
    if (typeof b == "string") {
        this.coordSequence = b || "";
        var d = this.coordSequence.split(",");
        this.points = [];
        for (var c = 0; c < d.length; c = c + 2) {
            this.points.push(new Point(parseFloat(d[c]), parseFloat(d[c + 1])))
        }
        d = null
    } else {
        if (b instanceof Array) {
            if (b.length > 0) {
                this.points = b;
                this.coordSequence = "";
                for (var c = 0; c < this.points.length; c++) {
                    if (c != this.points.length - 1) {
                        this.coordSequence += this.points[c].x + "," + this.points[c].y + ","
                    } else {
                        this.coordSequence += this.points[c].x + "," + this.points[c].y
                    }
                }
            } else {
                throw new Error("MultiPoint �����������")
            }
        } else {
            throw new Error("MultiPoint �����������")
        }
    }
    this.getCenter = function() {
        var f = this.getMBR();
        return new Point((f.minX + f.maxX) / 2, (f.minY + f.maxY) / 2)
    };
    this.getMBR = function() {
        return getPathMBR(this.coordSequence)
    };
    this.getSegmentCount = function() {
        return this.points.length
    };
    this.getSegment = function(f) {
        try {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "int"))) {
                throw EzErrorFactory.createError("MultiPoint::getSegment������arguments[0]���Ͳ���ȷ")
            }
            return this.points[f]
        } catch(g) {
            throw EzErrorFactory.createError("MultiPoint::getSegment�����в���ȷ", g)
        }
    };
    this.getCoordSequence = function() {
        return this.coordSequence
    };
    this.getSegments = function() {
        return this.points
    };
    this.setCoordSequence = function(f) {
        try {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "string")) && !(EzServerClient.GlobeFunction.isTypeRight(f, "Array"))) {
                throw EzErrorFactory.createError("MultiPoint::setCoordSequence������arguments[0]���Ͳ���ȷ")
            }
            if (typeof f == "string") {
                this.coordSequence = f || "";
                var h = this.coordSequence.split(",");
                this.points = [];
                for (var g = 0; g < h.length; g = g + 2) {
                    this.points.push(new Point(parseFloat(h[g]), parseFloat(h[g + 1])))
                }
                h = null
            } else {
                if (f instanceof Array) {
                    if (f.length > 0) {
                        this.points = f;
                        this.coordSequence = "";
                        for (var g = 0; g < this.points.length; g++) {
                            if (g != this.points.length - 1) {
                                this.coordSequence += this.points[g].x + "," + this.points[g].y + ","
                            } else {
                                this.coordSequence += this.points[g].x + "," + this.points[g].y
                            }
                        }
                    } else {
                        throw new Error("MultiPoint::setCoordSequence��������Ĳ�����Ч")
                    }
                } else {
                    throw new Error("MultiPoint::setCoordSequence��������Ĳ�����Ч")
                }
            }
        } catch(j) {
            throw EzErrorFactory.createError("MultiPoint::setCoordSequence�����в���ȷ", j)
        }
    };
    this.addSegment = function(f) {
        try {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "string")) && !(EzServerClient.GlobeFunction.isTypeRight(f, "Array"))) {
                throw EzErrorFactory.createError("MultiPoint::addSegment������arguments[0]���Ͳ���ȷ")
            }
            if (typeof f == "string") {
                this.coordSequence += "," + f;
                var g = f.split(",");
                this.points.push(new Point(g[0], g[1]));
                g = null
            } else {
                if (f instanceof Point) {
                    this.points.push(f);
                    this.coordSequence += "," + f.x + "," + f.y
                } else {
                    throw new Error("MultiPoint::addSegment�����������ȷ")
                }
            }
        } catch(h) {
            throw EzErrorFactory.createError("MultiPoint::addSegment�����в���ȷ", h)
        }
    };
    this.addSegments = function(f) {
        try {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "string")) && !(EzServerClient.GlobeFunction.isTypeRight(f, "Array"))) {
                throw EzErrorFactory.createError("MultiPoint::addSegments������arguments[0]���Ͳ���ȷ")
            }
            if (typeof f == "string") {
                this.coordSequence += "," + f;
                var h = f.split(",");
                for (var g = 0; g < h.length; g = g + 2) {
                    this.points.push(new Point(h[g], h[g + 1]))
                }
                h = null
            } else {
                if (f instanceof Array) {
                    this.points = this.points.concat(f);
                    for (var g = 0; g < f.length; g++) {
                        this.coordSequence += "," + f[g].x + "," + f[g].y
                    }
                } else {
                    throw new Error("MultiPoint::addSegments�����������ȷ")
                }
            }
        } catch(j) {
            throw EzErrorFactory.createError("MultiPoint::addSegments�����в���ȷ", j)
        }
    };
    this.getGeometryType = function() {
        return "multipoint"
    }
}
function MultiPolyline(d, b, j, c, h) {
    this.color = b;
    this.weight = j;
    this.opacity = c;
    this.arrow = h;
    if (typeof d == "string") {
        this.coordSequence = d || "";
        this.polylines = [];
        var g = this.coordSequence.split(";");
        for (var f = 0; f < g.length; f++) {
            this.polylines.push(new Polyline(g[f], this.color, this.weight, this.opacity, this.arrow))
        }
        g = null
    } else {
        throw new Error("MultiPolyline �����������")
    }
    this.getCenter = function() {
        var l = this.getMBR();
        var k = new Point((l.minX + l.maxX) / 2, (l.minY + l.maxY) / 2);
        l = null;
        return k
    };
    this.getMBR = function() {
        var r, m, o, l;
        var q = this.getSegment(0).getMBR();
        r = q.minX;
        m = q.maxX;
        o = q.minY;
        l = q.maxY;
        var k = null;
        for (var n = 1; n < this.getSegmentCount(); n++) {
            k = this.getSegment(n).getMBR();
            if (r > k.minX) {
                r = k.minX
            }
            if (m < k.maxX) {
                m = k.maxX
            }
            if (o > k.minY) {
                o = k.minY
            }
            if (l < k.maxY) {
                l = k.maxY
            }
        }
        k = null;
        return new MBR(r, o, m, l)
    };
    this.getSegmentCount = function() {
        return this.polylines.length
    };
    this.getSegment = function(k) {
        try {
            if (! (EzServerClient.GlobeFunction.isTypeRight(k, "int"))) {
                throw EzErrorFactory.createError("MultiPolyline::getSegment������arguments[0]���Ͳ���ȷ")
            }
            return this.polylines[k]
        } catch(l) {
            throw EzErrorFactory.createError("MultiPolyline::getSegment�����в���ȷ", l)
        }
    };
    this.getCoordSequence = function() {
        return this.coordSequence
    };
    this.getSegments = function() {
        return this.polylines
    };
    this.setCoordSequence = function(k) {
        try {
            if (! (EzServerClient.GlobeFunction.isTypeRight(k, "string"))) {
                throw EzErrorFactory.createError("MultiPolyline::setCoordSequence������arguments[0]���Ͳ���ȷ")
            }
            if (typeof k == "string") {
                this.coordSequence = k || "";
                this.polylines = [];
                var m = this.coordSequence.split(";");
                for (var l = 0; l < m.length; l++) {
                    this.polylines.push(new Polyline(m[l], this.color, this.weight, this.opacity, this.arrow))
                }
                m = null
            } else {
                throw new Error("MultiPolyline::setCoordSequence �������������Ч")
            }
        } catch(n) {
            throw EzErrorFactory.createError("MultiPolyline::setCoordSequence�����в���ȷ", n)
        }
    };
    this.addSegment = function(k) {
        try {
            if (! (EzServerClient.GlobeFunction.isTypeRight(k, "string"))) {
                throw EzErrorFactory.createError("MultiPolyline::addSegment������arguments[0]���Ͳ���ȷ")
            }
            if (typeof k == "string") {
                this.coordSequence += ";" + k;
                this.polylines.push(new Polyline(k, this.color, this.weight, this.opacity, this.arrow))
            } else {
                throw new Error("MultiPolyline::addSegment �������������Ч")
            }
        } catch(l) {
            throw EzErrorFactory.createError("MultiPolyline::addSegment �����в���ȷ", l)
        }
    };
    this.addSegments = function(k) {
        try {
            if (! (EzServerClient.GlobeFunction.isTypeRight(k, "string"))) {
                throw EzErrorFactory.createError("MultiPolyline::addSegment������arguments[0]���Ͳ���ȷ")
            }
            if (typeof k == "string") {
                this.coordSequence += ";" + k;
                var m = k.split(";");
                for (var l = 0; l < m.length; l++) {
                    this.polylines.push(new Polyline(m[l], this.color, this.weight, this.opacity, this.arrow))
                }
                m = null
            } else {
                throw new Error("MultiPolyline::addSegments �������������Ч")
            }
        } catch(n) {
            throw EzErrorFactory.createError("MultiPolyline::addSegment�����в���ȷ", n)
        }
    };
    this.getGeometryType = function() {
        return "multipolyline"
    }
}
function MultiPolygon(d, b, j, c, h) {
    this.color = b;
    this.weight = j;
    this.opacity = c;
    this.fillcolor = h;
    if (typeof d == "string") {
        this.coordSequence = d || "";
        this.polygons = [];
        var g = this.coordSequence.split("|");
        for (var f = 0; f < g.length; f++) {
            this.polygons.push(new Polygon(g[f], this.color, this.weight, this.opacity, this.fillcolor))
        }
        g = null
    } else {
        throw new Error("MultiPolygon �����������")
    }
    this.getCenter = function() {
        var l = this.getMBR();
        var k = new Point((l.minX + l.maxX) / 2, (l.minY + l.maxY) / 2);
        l = null;
        return k
    };
    this.getMBR = function() {
        var r, m, o, l;
        var q = this.getSegment(0).getMBR();
        r = q.minX;
        m = q.maxX;
        o = q.minY;
        l = q.maxY;
        var k = null;
        for (var n = 1; n < this.getSegmentCount(); n++) {
            k = this.getSegment(n).getMBR();
            if (r > k.minX) {
                r = k.minX
            }
            if (m < k.maxX) {
                m = k.maxX
            }
            if (o > k.minY) {
                o = k.minY
            }
            if (l < k.maxY) {
                l = k.maxY
            }
        }
        k = null;
        return new MBR(r, o, m, l)
    };
    this.getSegmentCount = function() {
        return this.polygons.length
    };
    this.getSegment = function(k) {
        try {
            if (! (EzServerClient.GlobeFunction.isTypeRight(k, "int"))) {
                throw EzErrorFactory.createError("MultiPolygon::getSegment������arguments[0]���Ͳ���ȷ")
            }
            return this.polygons[k]
        } catch(l) {
            throw EzErrorFactory.createError("MultiPolygon::getSegment�����в���ȷ", l)
        }
    };
    this.getCoordSequence = function() {
        return this.coordSequence
    };
    this.getSegments = function() {
        return this.polygons
    };
    this.setCoordSequence = function(k) {
        try {
            if (! (EzServerClient.GlobeFunction.isTypeRight(k, "string"))) {
                throw EzErrorFactory.createError("MultiPolygon::setCoordSequence������arguments[0]���Ͳ���ȷ")
            }
            if (typeof k == "string") {
                this.coordSequence = k || "";
                this.polygons = [];
                var m = this.coordSequence.split("|");
                for (var l = 0; l < m.length; l++) {
                    this.polygons.push(new Polygon(m[l], this.color, this.weight, this.opacity, this.fillcolor))
                }
                m = null
            } else {
                throw new Error("MultiPolygon::setCoordSequence �������������Ч")
            }
        } catch(n) {
            throw EzErrorFactory.createError("MultiPolygon::setCoordSequence�����в���ȷ", n)
        }
    };
    this.addSegment = function(k) {
        try {
            if (! (EzServerClient.GlobeFunction.isTypeRight(k, "string"))) {
                throw EzErrorFactory.createError("MultiPolygon::addSegment������arguments[0]���Ͳ���ȷ")
            }
            if (typeof k == "string") {
                this.coordSequence += "|" + k;
                this.polygons.push(new Polygon(k, this.color, this.weight, this.opacity, this.fillcolor))
            } else {
                throw new Error("MultiPolygon::addSegment�������������Ч")
            }
        } catch(l) {
            throw EzErrorFactory.createError("MultiPolygon::addSegment�����в���ȷ", l)
        }
    };
    this.addSegments = function(k) {
        try {
            if (! (EzServerClient.GlobeFunction.isTypeRight(k, "string"))) {
                throw EzErrorFactory.createError("MultiPolygon::addSegments������arguments[0]���Ͳ���ȷ")
            }
            if (typeof k == "string") {
                this.coordSequence += "|" + k;
                var m = k.split("|");
                for (var l = 0; l < m.length; l++) {
                    this.polygons.push(new Polygon(m[l], this.color, this.weight, this.opacity, this.fillcolor))
                }
                m = null
            } else {
                throw new Error("MultiPolygon::addSegments �������������Ч")
            }
        } catch(n) {
            throw EzErrorFactory.createError("MultiPolygon::addSegments�����в���ȷ", n)
        }
    };
    this.getGeometryType = function() {
        return "multipolygon"
    }
}
function EzShape(b, c) {
    this.geometryType = b;
    this.coordinateSequence = c;
    this.getGeometryType = function() {
        return this.geometryType
    };
    this.getCoordinateSequence = function() {
        return this.coordinateSequence
    };
    this.setGeometryType = function(d) {
        try {
            if (! (EzServerClient.GlobeFunction.isTypeRight(d, "string"))) {
                throw EzErrorFactory.createError("EzShape::setGeometryType������arguments[0]���Ͳ���ȷ")
            } else {
                this.geometryType = d
            }
        } catch(f) {
            throw EzErrorFactory.createError("EzShape::setGeometryType�����в���ȷ", f)
        }
    };
    this.setCoordinateSequence = function(f) {
        try {
            if (! (EzServerClient.GlobeFunction.isTypeRight(b, "string"))) {
                throw EzErrorFactory.createError("EzShape::setCoordinateSequence������arguments[0]���Ͳ���ȷ")
            } else {
                this.coordinateSequence = f
            }
        } catch(d) {
            throw EzErrorFactory.createError("EzShape::setCoordinateSequence�����в���ȷ", d)
        }
    }
}
if (typeof EzGeoPSTool == "undefined" || !EzGeoPS) {
    var EzGeoPSTool = {}
}
EzGeoPSTool.equals = function(f, c) {
    try {
        if (typeof ezgeops == "undefined") {
            throw EzErrorFactory.createError("EzGeographicProcessingService�����������������쳣")
        } else {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(c, "object"))) {
                throw EzErrorFactory.createError("EzGeoPSTool.equals��������ʱ����Ĳ������Ͳ���ȷ")
            } else {
                var d = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(f);
                var b = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(c);
                return d.equals(b)
            }
        }
    } catch(g) {
        throw EzErrorFactory.createError("EzGeoPSTool.equals����ִ�в���ȷ", g)
    }
};
EzGeoPSTool.disjoint = function(f, c) {
    try {
        if (typeof ezgeops == "undefined") {
            throw EzErrorFactory.createError("EzGeographicProcessingService�����������������쳣")
        } else {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(c, "object"))) {
                throw EzErrorFactory.createError("EzGeoPSTool.disjoint��������ʱ����Ĳ������Ͳ���ȷ")
            } else {
                var d = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(f);
                var b = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(c);
                return d.disjoint(b)
            }
        }
    } catch(g) {
        throw EzErrorFactory.createError("EzGeoPSTool.disjoint����ִ�в���ȷ", g)
    }
};
EzGeoPSTool.intersects = function(f, c) {
    try {
        if (typeof ezgeops == "undefined") {
            throw EzErrorFactory.createError("EzGeographicProcessingService�����������������쳣")
        } else {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(c, "object"))) {
                throw EzErrorFactory.createError("EzGeoPSTool.intersects��������ʱ����Ĳ������Ͳ���ȷ")
            } else {
                var d = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(f);
                var b = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(c);
                return d.intersects(b)
            }
        }
    } catch(g) {
        throw EzErrorFactory.createError("EzGeoPSTool.intersects����ִ�в���ȷ", g)
    }
};
EzGeoPSTool.touches = function(f, c) {
    try {
        if (typeof ezgeops == "undefined") {
            throw EzErrorFactory.createError("EzGeographicProcessingService�����������������쳣")
        } else {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(c, "object"))) {
                throw EzErrorFactory.createError("EzGeoPSTool.touches��������ʱ����Ĳ������Ͳ���ȷ")
            } else {
                var d = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(f);
                var b = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(c);
                return d.touches(b)
            }
        }
    } catch(g) {
        throw EzErrorFactory.createError("EzGeoPSTool.touches����ִ�в���ȷ", g)
    }
};
EzGeoPSTool.crosses = function(f, c) {
    try {
        if (typeof ezgeops == "undefined") {
            throw EzErrorFactory.createError("EzGeographicProcessingService�����������������쳣")
        } else {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(c, "object"))) {
                throw EzErrorFactory.createError("EzGeoPSTool.crosses��������ʱ����Ĳ������Ͳ���ȷ")
            } else {
                var d = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(f);
                var b = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(c);
                return d.crosses(b)
            }
        }
    } catch(g) {
        throw EzErrorFactory.createError("EzGeoPSTool.crosses����ִ�в���ȷ", g)
    }
};
EzGeoPSTool.within = function(f, c) {
    try {
        if (typeof ezgeops == "undefined") {
            throw EzErrorFactory.createError("EzGeographicProcessingService�����������������쳣")
        } else {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(c, "object"))) {
                throw EzErrorFactory.createError("EzGeoPSTool.within��������ʱ����Ĳ������Ͳ���ȷ")
            } else {
                var d = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(f);
                var b = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(c);
                return d.within(b)
            }
        }
    } catch(g) {
        throw EzErrorFactory.createError("EzGeoPSTool.within����ִ�в���ȷ", g)
    }
};
EzGeoPSTool.contains = function(f, c) {
    try {
        if (typeof ezgeops == "undefined") {
            throw EzErrorFactory.createError("EzGeographicProcessingService�����������������쳣")
        } else {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(c, "object"))) {
                throw EzErrorFactory.createError("EzGeoPSTool.contains��������ʱ����Ĳ������Ͳ���ȷ")
            } else {
                var d = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(f);
                var b = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(c);
                return d.contains(b)
            }
        }
    } catch(g) {
        throw EzErrorFactory.createError("EzGeoPSTool.contains����ִ�в���ȷ", g)
    }
};
EzGeoPSTool.overlaps = function(f, c) {
    try {
        if (typeof ezgeops == "undefined") {
            throw EzErrorFactory.createError("EzGeographicProcessingService�����������������쳣")
        } else {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(c, "object"))) {
                throw EzErrorFactory.createError("EzGeoPSTool.overlaps��������ʱ����Ĳ������Ͳ���ȷ")
            } else {
                var d = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(f);
                var b = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(c);
                return d.overlaps(b)
            }
        }
    } catch(g) {
        throw EzErrorFactory.createError("EzGeoPSTool.overlaps����ִ�в���ȷ", g)
    }
};
EzGeoPSTool.intersection = function(f, c) {
    try {
        if (typeof ezgeops == "undefined") {
            throw EzErrorFactory.createError("EzGeographicProcessingService�����������������쳣")
        } else {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(c, "object"))) {
                throw EzErrorFactory.createError("EzGeoPSTool.intersection��������ʱ����Ĳ������Ͳ���ȷ")
            } else {
                var d = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(f);
                var b = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(c);
                var g = d.intersection(b);
                return EzGeoPSTool.convertGeometry_EzGeoPS2EzSC(g)
            }
        }
    } catch(h) {
        throw EzErrorFactory.createError("EzGeoPSTool.intersection����ִ�в���ȷ", h)
    }
};
EzGeoPSTool.union = function(f, c) {
    try {
        if (typeof ezgeops == "undefined") {
            throw EzErrorFactory.createError("EzGeographicProcessingService�����������������쳣")
        } else {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(c, "object"))) {
                throw EzErrorFactory.createError("EzGeoPSTool.union��������ʱ����Ĳ������Ͳ���ȷ")
            } else {
                var d = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(f);
                var b = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(c);
                var g = d.union(b);
                return EzGeoPSTool.convertGeometry_EzGeoPS2EzSC(g)
            }
        }
    } catch(h) {
        throw EzErrorFactory.createError("EzGeoPSTool.union����ִ�в���ȷ", h)
    }
};
EzGeoPSTool.difference = function(f, c) {
    try {
        if (typeof ezgeops == "undefined") {
            throw EzErrorFactory.createError("EzGeographicProcessingService�����������������쳣")
        } else {
            if (! (EzServerClient.GlobeFunction.isTypeRight(f, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(c, "object"))) {
                throw EzErrorFactory.createError("EzGeoPSTool.difference��������ʱ����Ĳ������Ͳ���ȷ")
            } else {
                var d = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(f);
                var b = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(c);
                var g = d.difference(b);
                return EzGeoPSTool.convertGeometry_EzGeoPS2EzSC(g)
            }
        }
    } catch(h) {
        throw EzErrorFactory.createError("EzGeoPSTool.difference����ִ�в���ȷ", h)
    }
};
EzGeoPSTool.buffer = function(d, k) {
    try {
        if (typeof ezgeops == "undefined") {
            throw EzErrorFactory.createError("EzGeographicProcessingService�����������������쳣")
        } else {
            if (! (EzServerClient.GlobeFunction.isTypeRight(d, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(k, "float"))) {
                throw EzErrorFactory.createError("EzGeoPSTool.buffer��������ʱ����Ĳ������Ͳ���ȷ")
            } else {
                if (d.getGeometryType() == "circle") {
                    var c = d.getCenter();
                    var j = d.getRadius() + k;
                    var h = c.x + "," + c.y + "," + j;
                    return new Circle(h, d.getColor(), d.getWidth(), d.getFillOpacity(), d.getFillColor())
                } else {
                    if (d.getGeometryType() == "point") {
                        return new Circle(d.x + "," + d.y + "," + k)
                    } else {
                        var b = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(d);
                        var f = b.buffer(k);
                        return EzGeoPSTool.convertGeometry_EzGeoPS2EzSC(f)
                    }
                }
            }
        }
    } catch(g) {
        throw EzErrorFactory.createError("EzGeoPSTool.buffer����ִ�в���ȷ", g)
    }
};
EzGeoPSTool.getCirclePoints = function(k, j, b, g, f) {
    k = parseFloat(k);
    j = parseFloat(j);
    b = parseFloat(b);
    g = parseInt(g);
    f = parseInt(f);
    var d = new Array();
    for (var c = g; c < f; c += 4) {
        var h = 2 * Math.PI * c / 360;
        var m = Math.ceil((k + b * Math.cos(h)) * 1000000) / 1000000;
        var l = Math.ceil((j + b * Math.sin(h)) * 1000000) / 1000000;
        d.push(m + "," + l)
    }
    d.push(d[0]);
    return d.join(",")
};
EzGeoPSTool.convertGeometry_EzSC2EzGeoPS = function(j) {
    var g, l;
    var f = new ezgeops.plus.EXTReader();
    var h = j.getGeometryType();
    switch (h) {
    case "point":
        g = new ezgeops.plus.EXTGeometry("Point", j.getCoordSequence());
        l = f.read(g);
        break;
    case "multipoint":
        g = new ezgeops.plus.EXTGeometry("MultiPoint", j.getCoordSequence());
        l = f.read(g);
        break;
    case "polyline":
        g = new ezgeops.plus.EXTGeometry("Polyline", j.getCoordSequence());
        l = f.read(g);
        break;
    case "multipolyline":
        g = new ezgeops.plus.EXTGeometry("MultiPolyline", j.getCoordSequence());
        l = f.read(g);
        break;
    case "polygon":
        g = new ezgeops.plus.EXTGeometry("Polygon", j.getCoordSequence());
        l = f.read(g);
        break;
    case "multipolygon":
        g = new ezgeops.plus.EXTGeometry("MultiPolygon", j.getCoordSequence());
        l = f.read(g);
        break;
    case "rectangle":
        var c = j.getCoordSequence();
        var k = c.split(",");
        var b = k[0] + "," + k[1] + "," + k[2] + "," + k[1] + "," + k[2] + "," + k[3] + "," + k[0] + "," + k[3] + "," + k[0] + "," + k[1];
        g = new ezgeops.plus.EXTGeometry("Polygon", b);
        l = f.read(g);
        break;
    case "circle":
        var d = j.getCenter();
        var b = EzGeoPSTool.getCirclePoints(d.x, d.y, j.getRadius(), 0, 360);
        g = new ezgeops.plus.EXTGeometry("Polygon", b);
        l = f.read(g);
        break
    }
    return l
};
EzGeoPSTool.convertGeometry_EzGeoPS2EzSC = function(h) {
    var g = new plus.EXTWriter();
    var f = g.write(h.asText());
    var c = f.getType();
    var b = f.getContentText();
    var d;
    switch (c) {
    case "point":
        d = new Point(b);
        break;
    case "multipoint":
        d = new MultiPoint(b);
        break;
    case "polyline":
        d = new Polyline(b);
        break;
    case "multipolyline":
        d = new MultiPolyline(b);
        break;
    case "polygon":
        d = new Polygon(b);
        break;
    case "multipolygon":
        d = new MultiPolygon(b);
        break;
    default:
        throw "����Ĳ���һ���Ϸ��Ķ�������ͣ�"
    }
    return d
};
function divCreator() {}
function DragEvent(b, d, c, f) {
    this.bIsMouseDown = false;
    this.src = b;
    this.container = f;
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
    this.moveTo(d != null ? d: b.offsetLeft, c != null ? c: b.offsetTop);
    this.mouseDownHandler = this.eventHandler("onMouseDown");
    this.mouseMoveHandler = this.eventHandler("onMouseMove");
    this.mouseUpHandler = this.eventHandler("onMouseUp");
    if (_IEBrowser.type == 2) {
        BindingEvent(window, "mouseout", this.eventHandler("onWindowMouseOut"))
    }
    this.eventSrc = this.src.setCapture ? this.src: window;
    BindingEvent(this.src, "mousedown", this.mouseDownHandler)
}
DragEvent.prototype.moveTo = function(d, c) {
    try {
        if (this.left != d || this.top != c) {
            this.left = d;
            this.top = c;
            this.src.style.left = this.left + "px";
            this.src.style.top = this.top + "px";
            if (this.onmove) {
                this.onmove()
            }
        }
    } catch(b) {
        alert("moveTo:" + b.message)
    }
};
DragEvent.prototype.onMouseDown = function(c) {
    this.bIsMouseDown = true;
    if (c.cancelDrag) {
        return
    }
    var d = c.button == 0 || c.button == 1;
    if (this.disabled || !d) {
        return false
    }
    this.dragPoint.x = c.clientX;
    this.dragPoint.y = c.clientY;
    BindingEvent(this.eventSrc, "mousemove", this.mouseMoveHandler);
    BindingEvent(this.eventSrc, "mouseup", this.mouseUpHandler);
    if (this.src.setCapture) {
        this.src.setCapture()
    }
    this.clickStartTime = (new Date()).getTime();
    this.clickStartPos.x = c.clientX;
    this.clickStartPos.y = c.clientY;
    if (this.ondragstart) {
        this.ondragstart(c)
    }
    this.originalCursor = this.src.style.cursor;
    if (this.bIsPan) {
        setCursor(this.src, "move")
    }
    S(c)
};
DragEvent.prototype.onMouseMove = function(k) {
    if (_IEBrowser.os == 1) {
        if (k == null) {
            return
        }
        if (this.dragDisabled) {
            this.savedMove = new Object();
            this.savedMove.clientX = k.clientX;
            this.savedMove.clientY = k.clientY;
            return
        }
        this.setTimeout("this.dragDisabled = false; this.onMouseMove(this.savedMove)", 30);
        this.dragDisabled = true;
        this.savedMove = null
    }
    var l = this.left + (k.clientX - this.dragPoint.x);
    var f = this.top + (k.clientY - this.dragPoint.y);
    var d = 0;
    var h = 0;
    if (this.container) {
        var j = l;
        if (l < this.container.minX) {
            j = this.container.minX
        } else {
            var m = this.container.maxX - this.src.offsetWidth;
            if (l > m) {
                j = m
            }
        }
        d = j - l;
        l = j;
        var c = f;
        if (f < this.container.minY) {
            c = this.container.minY
        } else {
            var g = this.container.maxY - this.src.offsetHeight;
            if (f > g) {
                c = g
            }
        }
        h = c - f;
        f = c
    }
    this.moveTo(l, f);
    this.dragPoint.x = k.clientX + d;
    this.dragPoint.y = k.clientY + h;
    if (this.ondrag) {
        this.ondrag(k)
    }
};
DragEvent.prototype.onMouseUp = function(c) {
    this.bIsMouseDown = false;
    unbindingEvent(this.eventSrc, "mousemove", this.mouseMoveHandler);
    unbindingEvent(this.eventSrc, "mouseup", this.mouseUpHandler);
    setCursor(this.src, this.originalCursor);
    if (document.releaseCapture) {
        document.releaseCapture()
    }
    if (this.ondragend) {
        this.ondragend(c)
    }
    if (this.onclick) {
        var d = (new Date()).getTime();
        if (d - this.clickStartTime <= 500 && (Math.abs(this.clickStartPos.x - c.clientX) <= 2 && Math.abs(this.clickStartPos.y - c.clientY) <= 2)) {
            this.onclick(c)
        }
    }
};
DragEvent.prototype.onWindowMouseOut = function(c) {
    if (!c.relatedTarget) {
        this.onMouseUp(c)
    }
};
DragEvent.prototype.disable = function() {
    this.disabled = true
};
DragEvent.prototype.enable = function() {
    this.disabled = false
};
var EventManager = {
    _registry: null,
    _unload: [],
    Initialise: function() {
        if (this._registry == null) {
            this._registry = [];
            this.addUnloadFunc(this.cleanUp);
            EventManager.add(window, "unload", this.unload)
        }
    },
    add: function(f, d, c, b) {
        this.Initialise();
        if (typeof f == "string") {
            f = document.getElementById(f)
        }
        if (f == null || c == null) {
            return false
        }
        if (f.addEventListener) {
            f.addEventListener(d, c, b);
            this._registry.push({
                obj: f,
                type: d,
                fn: c,
                useCapture: b
            });
            return true
        }
        if (f.attachEvent && f.attachEvent("on" + d, c)) {
            this._registry.push({
                obj: f,
                type: d,
                fn: c,
                useCapture: false
            });
            return true
        }
        return false
    },
    remove: function(g, f, d) {
        for (var c = this._registry.length - 1; c > -1; c--) {
            var b = this._registry[c];
            if (g == b.obj && f == b.type && d == b.fn) {
                this._registry.splice(c, 1);
                if (g.removeEventListener) {
                    g.removeEventListener(b.type, b.fn, b.useCapture)
                } else {
                    if (g.detachEvent) {
                        g.detachEvent("on" + b.type, b.fn)
                    } else {
                        g["on" + b.type] = null
                    }
                }
                break
            }
        }
    },
    removeNode: function(d) {
        for (var c = this._registry.length - 1; c > -1; c--) {
            var b = this._registry[c];
            if (d == b.obj) {
                this._registry.splice(c, 1);
                if (b.obj.removeEventListener) {
                    b.obj.removeEventListener(b.type, b.fn, b.useCapture)
                } else {
                    if (b.obj.detachEvent) {
                        b.obj.detachEvent("on" + b.type, b.fn)
                    } else {
                        b.obj["on" + b.type] = null
                    }
                }
            }
        }
    },
    cleanUp: function() {
        window.status = "����¼�����....";
        for (var i = 0; i < EventManager._registry.length; i++) {
            window.status = "����¼�����...." + i;
            with(EventManager._registry[i]) {
                if (obj.removeEventListener) {
                    obj.removeEventListener(type, fn, useCapture)
                } else {
                    if (obj.detachEvent) {
                        obj.detachEvent("on" + type, fn)
                    } else {
                        obj["on" + type] = null
                    }
                }
            }
        }
        EventManager._registry = null
    },
    unload: function() {
        var b = EventManager._unload.length;
        for (var c = 0; c < b; c++) {
            EventManager._unload[c]()
        }
    },
    addUnloadFunc: function(b) {
        this._unload.push(b)
    },
    showEvent: function() {
        for (var c = this._registry.length - 1; c > -1; c--) {
            var b = this._registry[c];
            alert(b.type + ":" + b.fn + ":" + b.useCapture)
        }
    }
};
function EzLog() {}
function EzManager() {}
function EzPointStr() {
    this.value = ""
}
EzPointStr.prototype.toString = function() {
    return this.value
};
function Ic(c) {
    this.size = 0;
    if (c) {
        for (var b = c.length - 1; b >= 0; b--) {
            this.add(c[b])
        }
    }
}
Ic.prototype.add = function(b) {
    if (!this.contains(b)) {
        this[":" + b] = 1;
        this.size++
    }
};
Ic.prototype.remove = function(b) {
    if (this.contains(b)) {
        delete this[":" + b];
        this.size--
    }
};
Ic.prototype.contains = function(b) {
    return this[":" + b] == 1
};
function Icon(c, d, l, k, j, f, h, g, b) {
    this.name = c;
    this.width = d || 30;
    this.height = l || 30;
    this.topOffset = 0;
    this.leftOffset = 0;
    this.image = null;
    this.pointCoord = k;
    this.infoTipCoord = j;
    this.shadowTipCoord = f;
    this.shadowURL = h;
    this.shadowWidth = g;
    this.imageMapArray = b || []
}
Icon.prototype.translateImageMapArray = function(d, g) {
    var c = [];
    var b = this.imageMapArray;
    for (var f = 0; f < b.length; f += 2) {
        c.push(b[f] + d);
        c.push(b[f + 1] + g)
    }
    return c
};
function IconInfo(c, b) {
    this.image = c;
    this.iconClass = b
}
function InfoObj(g, f, b, c, d) {
    this.id = g;
    this.point = f;
    this.icon = b;
    this.infoStyle = c;
    this.xml = d
}
function InfoWind(d, b, c, f) {
    this.oncloseclick = d;
    this.createWindow(c);
    this.createShadow(f);
    if (_IEBrowser.type != 1) {
        this.createMask()
    } else {
        this.maskPng = null
    }
    this.createContentArea();
    this.createCloseButton();
    b.appendChild(this.windowDiv);
    b.appendChild(this.shadowDiv);
    this.setSize(208, 69);
    this.hide()
}
InfoWind.prototype.setContentSize = function(c, b) {
    this.setSize(c - (this.window.w.width - 15) * 2, b - (this.window.n.height - 15) * 2)
};
InfoWind.prototype.setSize = function(c, b) {
    if (c < 0) {
        c = 0
    }
    if (b < 0) {
        b = 0
    }
    this.width = c;
    this.height = b;
    this.setWindowSize(c, b);
    this.setShadowSize(c, b);
    if (this.hasMask()) {
        this.setMaskSize()
    }
    this.closeButton.style.left = this.getTotalWidth() - this.closeButton.width - 10 - 1 + "px";
    this.closeButton.style.top = "10px"
};
InfoWind.prototype.getWindowHeight = function() {
    return this.window.c.height + 2 * this.window.n.height
};
InfoWind.prototype.getTotalHeight = function() {
    return this.height + this.window.pointer.height + this.window.n.height
};
InfoWind.prototype.getTotalHeightAboveGround = function() {
    return this.getTotalHeight() + (this.iconClass.pointCoord.y - this.iconClass.infoTipCoord.y)
};
InfoWind.prototype.getTotalShadowHeight = function() {
    return Math.floor(this.height / 4) + this.shadow.pointer.height + this.shadow.nw.height
};
InfoWind.prototype.getTotalWidth = function() {
    return this.width + this.window.w.width + this.window.e.width
};
InfoWind.prototype.getOffsetLeft = function() {
    return this.windowDiv.offsetLeft
};
InfoWind.prototype.getOffsetTop = function() {
    return this.windowDiv.offsetTop
};
InfoWind.prototype.setWindowSize = function(f, b) {
    this.window.n.style.width = f + "px";
    this.window.e.style.height = b + "px";
    this.window.c.style.width = f + "px";
    this.window.c.style.height = b + "px";
    this.window.w.style.height = b + "px";
    var d = this.calculatePointerOffset(f);
    this.window.s1.style.width = d + "px";
    this.window.pointer.style.left = d + this.window.sw.width + "px";
    this.window.s2.style.left = d + this.window.pointer.width + this.window.sw.width + "px";
    this.window.s2.style.width = f - d - this.window.pointer.width + "px";
    var g = f + this.window.w.width + "px";
    this.window.ne.style.left = g;
    this.window.e.style.left = g;
    this.window.se.style.left = g;
    var c = b + this.window.n.height + "px";
    this.window.sw.style.top = c;
    this.window.s1.style.top = c;
    this.window.pointer.style.top = c;
    this.window.s2.style.top = c;
    this.window.se.style.top = c
};
InfoWind.prototype.setShadowSize = function(d, c) {
    d -= 15;
    var h = Math.floor(c / 4);
    var j = d + this.shadow.nw.width;
    var o = this.calculatePointerOffset(d) - 41;
    var l = h + this.shadow.n.height + "px";
    var n = h + this.shadow.nw.height;
    this.shadow.s1Div.style.width = Math.max(o, 0) + "px";
    this.shadow.pointer.style.left = o + this.shadow.sw.width + "px";
    this.shadow.s2Div.style.left = o + this.shadow.pointer.width + this.shadow.sw.width + "px";
    this.shadow.s2Div.style.width = d - o - this.shadow.pointer.width + "px";
    this.shadow.sw.style.top = l;
    this.shadow.s1Div.style.top = l;
    this.shadow.pointer.style.top = l;
    this.shadow.s2Div.style.top = l;
    this.shadow.se.style.top = l;
    this.shadow.se.style.left = j + "px";
    var q = this.shadow.nw.height;
    var b = Math.floor(c / 2);
    this.shadow.wDiv.style.height = h + "px";
    this.shadow.wDiv.style.left = q + "px";
    this.shadow.wDiv.style.width = b + "px";
    this.shadow.w.style.left = h - this.shadow.w.width + 80 + "px";
    var g = this.shadow.nw.height + d + 70;
    this.shadow.eDiv.style.height = h + "px";
    this.shadow.eDiv.style.left = g + "px";
    this.shadow.eDiv.style.width = c + "px";
    this.shadow.e.style.left = h - this.shadow.w.width + 80 + "px";
    var f = q + b;
    this.shadow.cDiv.style.width = g - f + "px";
    this.shadow.cDiv.style.height = h + "px";
    this.shadow.cDiv.style.left = f + "px";
    this.shadow.nw.style.left = n + "px";
    this.shadow.nDiv.style.width = d - 30 + "px";
    this.shadow.nDiv.style.left = n + this.shadow.nw.width + "px";
    this.shadow.ne.style.left = j + n - 30 + "px"
};
InfoWind.prototype.setMaskSize = function() {
    this.maskPng.style.width = this.getTotalWidth() + "px";
    this.maskPng.style.height = this.getTotalHeight() + "px";
    var f = this.getTotalWidth();
    var b = this.getWindowHeight();
    var d = this.getTotalHeight();
    var j = this.window.pointer.offsetLeft;
    var g = j + this.window.pointer.width;
    var c = j + 53;
    var k = j + 4;
    var h = ",";
    var l = this.getMaskMap();
    var m = l.firstChild;
    m.setAttribute("coords", "0,0,0," + b + h + c + h + b + h + k + h + d + h + g + h + b + h + f + h + b + h + f + ",0")
};
InfoWind.prototype.hide = function() {
    if (this.windowDiv) {
        this.windowDiv.style.display = "none"
    }
    this.shadowDiv.style.display = "none"
};
InfoWind.prototype.show = function() {
    this.windowDiv.style.display = "";
    this.shadowDiv.style.display = "";
    this.windowDiv.style.visibility = "visible";
    this.shadowDiv.style.visibility = "visible";
    this.contentArea.style.visibility = "visible"
};
InfoWind.prototype.isVisible = function() {
    return this.windowDiv.style.display != "none"
};
InfoWind.prototype.positionAt = function(h, g, f) {
    var c = this.calculatePointerOffset(this.width) + this.window.w.width + 5;
    var j = this.height + this.window.n.height + this.window.s1.height;
    this.left = h - c;
    this.top = g - j;
    this.left += f.infoTipCoord.x - f.pointCoord.x;
    this.top += f.infoTipCoord.y - f.pointCoord.y;
    this.windowDiv.style.left = this.left + "px";
    this.windowDiv.style.top = this.top + "px";
    var b = 0;
    var d = this.getTotalHeight() - this.getTotalShadowHeight();
    b += f.shadowTipCoord.x - f.infoTipCoord.x;
    d += f.shadowTipCoord.y - f.infoTipCoord.y;
    this.shadowDiv.style.left = this.left + b + "px";
    this.shadowDiv.style.top = this.top + d + "px"
};
InfoWind.prototype.calculatePointerOffset = function(b) {
    return Math.floor(b / 4)
};
InfoWind.prototype.createCroppingDiv = function(c) {
    var b = window.document.createElement("div");
    b.style.overflow = "hidden";
    b.style.position = "absolute";
    b.style.width = c.width + "px";
    b.style.height = c.height + "px";
    b.style.left = c.style.left;
    b.style.top = c.style.top;
    b.style.zIndex = c.style.zIndex;
    c.style.left = "0px";
    c.style.top = "0px";
    b.appendChild(c);
    return b
};
InfoWind.prototype.createWindow = function(b) {
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
    this.windowDiv.style.zIndex = b;
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
    this.windowDiv.appendChild(this.window.se)
};
InfoWind.prototype.createShadow = function(b) {
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
    this.shadowDiv.style.zIndex = b;
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
InfoWind.prototype.hasMask = function() {
    return this.maskPng != null
};
InfoWind.prototype.getMaskMap = function() {
    return document.getElementById(this.maskMapId)
};
var cf = 0;
InfoWind.prototype.createMask = function() {
    var c = document.createElement("map");
    this.maskMapId = "iwMap" + cf;
    c.setAttribute("id", this.maskMapId);
    c.setAttribute("name", this.maskMapId);
    cf++;
    this.windowDiv.appendChild(c);
    var d = document.createElement("area");
    d.setAttribute("shape", "poly");
    d.setAttribute("coords", "");
    d.setAttribute("href", "");
    d.onclick = _NoAction;
    d.onmousedown = this.onmousedown;
    c.appendChild(d);
    for (var b = 0; b < 10; b++) {
        var d = document.createElement("area");
        d.setAttribute("shape", "poly");
        d.setAttribute("coords", "");
        d.setAttribute("href", "PolylineDrawer");
        d.onclick = _NoAction;
        c.appendChild(d)
    }
    this.maskPng = divCreator.create(_TransparentImageUrl, 0, 0, 0, 0, 0, false);
    this.windowDiv.appendChild(this.maskPng);
    this.maskPng.setAttribute("usemap", "#" + this.maskMapId);
    this.nextMaskArea = 1
};
InfoWind.prototype.addAreaToMaskMap = function(b, d) {
    if (this.hasMask()) {
        var c = this.getMaskMap();
        if (this.nextMaskArea < c.childNodes.length) {
            var f = c.childNodes[this.nextMaskArea];
            f.setAttribute("coords", b.join(","));
            f.onmousedown = d;
            this.nextMaskArea++
        }
    }
};
InfoWind.prototype.clearMaskMap = function() {
    if (this.hasMask()) {
        var c = this.getMaskMap();
        for (var b = 1; b < c.childNodes.length; b++) {
            var d = c.childNodes[b];
            d.setAttribute("coords", "");
            d.onmousedown = null
        }
        this.nextMaskArea = 1
    }
};
InfoWind.prototype.getMaskLeft = function() {
    return this.windowDiv.offsetLeft
};
InfoWind.prototype.getMaskTop = function() {
    return this.windowDiv.offsetTop
};
InfoWind.prototype.createContentArea = function() {
    var b = null;
    var c = 15;
    b = window.document.createElement("DIV");
    b.style.position = "absolute";
    b.style.left = convert2Px(c);
    b.style.top = convert2Px(c);
    b.style.zIndex = 0;
    b.id = "contentArea";
    setCursor(b, "auto");
    b.onmousedown = this.onMouseDown;
    this.windowDiv.appendChild(b);
    this.contentArea = b;
    this.contentArea.onmousedown = this.onMouseDown;
    b = window.document.createElement("DIV");
    b.style.position = "absolute";
    b.style.left = convert2Px( - screen.width);
    b.style.top = convert2Px( - screen.height);
    b.style.width = convert2Px(screen.width);
    b.style.height = convert2Px(screen.height);
    b.style.visibility = "hidden";
    this.offscreenContainer = b;
    window.document.body.appendChild(b);
    b.id = "offscreenContainer";
    b = window.document.createElement("DIV");
    b.style.position = "absolute";
    b.style.left = convert2Px(c);
    b.style.top = convert2Px(c);
    b.style.zIndex = 0;
    setCursor(b, "auto");
    this.offscreenArea = b;
    b.id = "offscreenArea";
    this.offscreenArea.onmousedown = this.onMouseDown;
    this.offscreenContainer.appendChild(this.offscreenArea)
};
InfoWind.prototype.prepareOffscreen = function(b) {
    if (this.windowDiv.style.display == "none") {
        this.windowDiv.style.display = "";
        this.shadowDiv.style.display = "";
        this.windowDiv.style.visibility = "hidden";
        this.shadowDiv.style.visibility = "hidden";
        this.contentArea.style.visibility = "hidden";
        this.offscreenArea.style.visibility = "hidden"
    }
    if (b) {
        this.offscreenContainer.style.width = convert2Px(b)
    }
};
InfoWind.prototype.clearOffscreenArea = function() {
    RemoveChildren(this.offscreenArea)
};
InfoWind.prototype.flipOffscreenAndSize = function() {
    var c = Math.max(this.offscreenArea.offsetWidth, 200);
    var b = Math.max(this.offscreenArea.offsetHeight, 85);
    this.flipOffscreenArea(c, b);
    this.setContentSize(c + 15, b)
};
InfoWind.prototype.sizeToContent = function() {
    EzLog.write("Offset width: " + this.contentArea.offsetWidth);
    EzLog.write("Offset height: " + this.contentArea.offsetHeight);
    this.setContentSize(Math.max(this.contentArea.offsetWidth, 183), this.contentArea.offsetHeight)
};
InfoWind.prototype.flipOffscreenArea = function(c, b) {
    this.offscreenContainer.removeChild(this.offscreenArea);
    this.windowDiv.removeChild(this.contentArea);
    var d = this.offscreenArea;
    this.offscreenArea = this.contentArea;
    this.contentArea = d;
    this.offscreenContainer.appendChild(this.offscreenArea);
    this.windowDiv.appendChild(this.contentArea);
    if (c && b) {
        this.contentArea.style.width = convert2Px(c);
        this.contentArea.style.height = convert2Px(b)
    }
    this.offscreenArea.style.width = "auto";
    this.offscreenArea.style.height = "auto";
    this.offscreenArea.style.visibility = "visible";
    this.clearOffscreenArea()
};
InfoWind.prototype.onMouseDown = function(c) {
    if (_IEBrowser.type == 1) {
        window.event.cancelBubble = true
    } else {
        c.cancelDrag = true
    }
};
InfoWind.prototype.createCloseButton = function() {
    this.closeButton = Shaderer.create(Di, 14, 13, null, null, 4, null, null);
    this.closeButton.style.position = "absolute";
    setCursor(this.closeButton, "pointer");
    this.closeButton.onmousedown = this.eventHandler("onCloseMouseDown");
    this.windowDiv.appendChild(this.closeButton)
};
InfoWind.prototype.onCloseMouseDown = function(c) {
    S(c);
    if (this.oncloseclick) {
        this.oncloseclick(c)
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
    this.refreshTimeout = null
}
LegendFunc.prototype.getContainer = function() {
    return this.div
};
LegendFunc.prototype.setLoadingFunc = function(c) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "function")) {
            throw EzErrorFactory.createError("LegendFunc::setLoadingFunc������arguments[0]���Ͳ���ȷ")
        }
        this.loadingCallback = c
    } catch(b) {
        throw EzErrorFactory.createError("LegendFunc::setLoadingFunc����ִ�в���ȷ", b)
    }
};
LegendFunc.prototype.setCompleteFunc = function(c) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "function")) {
            throw EzErrorFactory.createError("LegendFunc::setCompleteFunc������arguments[0]���Ͳ���ȷ")
        }
        this.completeCallback = c
    } catch(b) {
        throw EzErrorFactory.createError("LegendFunc::setCompleteFunc����ִ�в���ȷ", b)
    }
};
LegendFunc.prototype.setRefreshTime = function(b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "int")) {
            throw EzErrorFactory.createError("LegendFunc::setRefreshTime������arguments[0]���Ͳ���ȷ")
        }
        this.refreshTime = b;
        if (this.refreshTimeout) {
            window.clearTimeout(this.refreshTimeout);
            this.refreshTimeout = null
        }
        if (this.refreshTime > 0) {
            this.refreshTimeout = this.setTimeout("this.refreshURL()", this.refreshTime)
        }
    } catch(c) {
        throw EzErrorFactory.createError("LegendFunc::setRefreshTime����ִ�в���ȷ", c)
    }
};
LegendFunc.prototype.open = function(f) {
    try {
        if (f) {
            this.mapApp = f
        } else {
            this.mapApp = getMapApp()
        }
        var b = this;
        var d = this.format.toLowerCase();
        if (d.indexOf("gif") != -1 || this.opacity < 100) {
            this.bIsPNG = false
        }
        if (this.bIsPNG) {
            this.div = document.createElement("div")
        } else {
            this.div = document.createElement("img")
        }
        this.div.style.position = "absolute";
        this.div.style.left = "100px";
        this.div.style.top = "100px";
        this.div.style.zIndex = 10;
        this.src = this.getURL();
        this.redraw();
        this.div.oncontextmenu = function() {
            return false
        };
        this.div.onerror = function() {
            this.style.display = "none"
        };
        this.div.onload = function() {
            if (this.saveLeft) {
                this.style.left = this.saveLeft;
                this.style.top = this.saveTop
            }
            this.style.display = ""
        };
        var b = this;
        this.div.onreadystatechange = function(g) {
            if (this.readyState == "loading") {
                if (b.loadingCallback) {
                    b.loadingCallback()
                }
            } else {
                if (this.readyState == "complete") {
                    if (b.completeCallback) {
                        b.completeCallback()
                    }
                } else {
                    if (this.readyState == "uninitialized") {}
                }
            }
        };
        this.mapApp.map.div.appendChild(this.div);
        this.mapApp.addMapChangeListener(this.eventHandler("redraw"))
    } catch(c) {
        throw EzErrorFactory.createError("LegendFunc::open����ִ�в���ȷ", c)
    }
};
LegendFunc.prototype.redraw = function() {
    try {
        this.src = this.getURL();
        var f = this.mapApp.map.viewSize.width;
        var g = this.mapApp.map.viewSize.height;
        this.div.style.width = f + "px";
        this.div.style.height = g + "px";
        var c = this.mapApp.map.getCenterLatLng();
        var d = this.mapApp.map.convert2WPoint(c.x, c.y);
        this.div.saveLeft = (d.x - f / 2) + "px";
        this.div.saveTop = (d.y - g / 2) + "px";
        if (this.bIsPNG) {
            this.div.style.left = this.div.saveLeft;
            this.div.style.top = this.div.saveTop
        }
        if (this.bIsPNG) {
            this.correctPNG()
        } else {
            this.div.src = this.src;
            if (this.opacity < 100) {
                this.div.style.filter = "ALPHA(opacity=" + this.opacity + ")"
            }
        }
    } catch(b) {
        alert(b.message)
    }
};
LegendFunc.prototype.refreshURL = function() {
    this.src = this.getURL();
    if (this.bIsPNG) {
        this.correctPNG()
    } else {
        this.div.src = this.src
    }
    if (this.refreshTime > 0) {
        if (this.refreshTimeout) {
            window.clearTimeout(this.refreshTimeout);
            this.refreshTimeout = null
        }
        this.refreshTimeout = this.setTimeout("this.refreshURL()", this.refreshTime)
    }
};
LegendFunc.prototype.getURL = function() {
    var f = this.format;
    var d = this.mapApp.map.getBoundsLatLng();
    var c = this.mapApp.map.viewSize;
    re = /EZBOX/g;
    f = f.replace(re, d.toString());
    re = /EZWIDTH/g;
    f = f.replace(re, c.width);
    re = /EZHEIGHT/g;
    f = f.replace(re, c.height);
    var b = new Date();
    f += "&time=" + b.getTime();
    return f
};
LegendFunc.prototype.close = function() {
    this.mapApp.map.div.removeChild(this.div);
    var b = this;
    this.mapApp.removeMapChangeListener(this.eventHandler("redraw"))
};
LegendFunc.prototype.correctPNG = function() {
    var b = this.div;
    var c = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.src + "', sizingmethod=scale);WIDTH:" + b.width + "px; HEIGHT: " + b.height + "px";
    b.style.filter = c
};
EzServerClient.GlobeParams.Resolution = [2, 1, 0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625, 0.0078125, 0.00390625, 0.001953125, 0.0009765625, 0.00048828125, 0.000244140625, 0.0001220703125, 0.00006103515625, 0.000030517578125, 0.0000152587890625, 0.00000762939453125, 0.000003814697265625, 0.0000019073486328125, 9.5367431640625e-7, 4.76837158203125e-7];
EzServerClient.GlobeParams.DisplayScale_dpi96 = [786432000, 393216000, 196608000, 98304000, 49152000, 24576000, 12288000, 6144000, 3072000, 1536000, 768000, 384000, 192000, 96000, 48000, 24000, 12000, 6000, 3000, 1500, 750, 375, 187];
EzServerClient.GlobeParams.DisplayScale = [["4000����", "83px"], ["4000����", "53px"], ["2000����", "53px"], ["1000����", "46px"], ["1000����", "78px"], ["500����", "74px"], ["200����", "64px"], ["100����", "69px"], ["50����", "72px"], ["20����", "59px"], ["10����", "60px"], ["5����", "60px"], ["2����", "49px"], ["1����", "49px"], ["500��", "49px"], ["500��", "97px"], ["200��", "78px"], ["100��", "78px"], ["50��", "78px"], ["20��", "63px"], ["10��", "63px"], ["5��", "63px"], ["2��", "50px"]];
var AnchorPoint = new Point(0, 0);
var _PixelsPerDegree = new Array();
if (EzServerClient.GlobeParams.ZoomLevelSequence == 2 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
    for (var sa = 0; sa < EzServerClient.GlobeParams.Resolution.length; sa++) {
        var temp = 1 / EzServerClient.GlobeParams.Resolution[sa] * Math.pow(2, EzServerClient.GlobeParams.ZoomOffset);
        _PixelsPerDegree.push(new Point(temp, temp))
    }
} else {
    for (var sa = 0; sa < _m_MapSpan.length; sa++) {
        _PixelsPerDegree.push(new Point(_m_MapSpan[sa], _m_MapSpan[sa]))
    }
}
function MapUnit(b) {
    this.tileSize = _MapUnitPixels;
    this.backgroundColor = "#f2efe9";
    this.bIsOverlay = false;
    this.emptyTileURL = _TransparentImageUrl;
    this.baseURLArr = _MapServiceArr;
    this.basePara = "Service=getImage&Type=RGB";
    if (_ZoomOffset) {
        this.basePara += "&ZoomOffset=" + _ZoomOffset
    }
    if (_MaxLevel) {
        this.numZoomLevels = _MaxLevel + 1
    } else {
        this.numZoomLevels = EzServerClient.GlobeParams._MaxZoomLevel
    }
    if (b) {
        this.baseURL = b
    } else {
        this.setMapURL(_VectorMapService[1]);
        if (_VectorMapService[2]) {
            this.setOverlayURL(_VectorMapService[2])
        }
    }
}
MapUnit.prototype.setMapURL = function(b) {
    this.mapServiceArr = b
};
MapUnit.prototype.setOverlayURL = function(b) {
    this.overlayServiceArr = b
};
MapUnit.prototype.hasOverlay = function() {
    return this.bIsOverlay
};
var _MapUnit = new MapUnit();
MapUnit.prototype.getBitmapCoordinate = function(f, g, c, d) {
    if (!d) {
        d = new Point(0, 0)
    }
    var b = g - AnchorPoint.x;
    var h = f - AnchorPoint.y;
    d.x = Math.floor(b * _PixelsPerDegree[c].x);
    d.y = Math.floor(h * _PixelsPerDegree[c].y);
    return d
};
MapUnit.prototype.getLatLng = function(b, f, c, d) {
    if (!d) {
        d = new Point(0, 0)
    }
    b /= _PixelsPerDegree[c].x;
    f /= _PixelsPerDegree[c].y;
    d.x = b + AnchorPoint.x;
    d.y = f + AnchorPoint.y;
    return d
};
MapUnit.prototype.getTileCoordinate = function(f, g, b, d) {
    var c = this.getBitmapCoordinate(f, g, b, d);
    c.x = Math.floor(c.x / this.tileSize);
    c.y = Math.floor(c.y / this.tileSize);
    return c
};
MapUnit.prototype.getTileURL = function(b, j, c) {
    j = j - 1;
    if (b < -_MaxNumber || (b > _MaxNumber || (j < -_MaxNumber || j > _MaxNumber))) {
        return _TransparentImageUrl
    }
    var f = (b + j) % this.mapServiceArr.length;
    var g = this.mapServiceArr[f];
    var d = this.basePara + "&Col=" + b + "&Row=" + j + "&Zoom=" + c + "&V=" + _Ver;
    var h = g + "/EzMap?";
    h += d;
    if (_bMapProx && g_prox_calss != null) {
        h = g_prox_calss + "?request=gotourl&url=" + encodeURIComponent(h)
    }
    return h
};
MapUnit.prototype.getOverlayURL = function(b, j, c) {
    j = j - 1;
    if (b < -_MaxNumber || (b > _MaxNumber || (j < -_MaxNumber || j > _MaxNumber))) {
        return _TransparentImageUrl
    }
    var f = (b + j) % this.overlayServiceArr.length;
    var g = this.overlayServiceArr[f];
    var d = this.basePara + "&Col=" + b + "&Row=" + j + "&Zoom=" + c + "&V=" + _Ver;
    var h = g + "/EzMap?";
    h += d;
    if (_bMapProx && g_prox_calss != null) {
        h = g_prox_calss + "?request=gotourl&url=" + encodeURIComponent(h)
    }
    return h
};
MapUnit.prototype.setThematicTileURL = function(g, n, m, c, b, h, f) {
    m = m - 1;
    if (n < -_MaxNumber || (n > _MaxNumber || (m < -_MaxNumber || m > _MaxNumber))) {
        return _TransparentImageUrl
    }
    var j = this.getLatLng(n * _MapUnitPixels, m * _MapUnitPixels, c);
    var l = this.getLatLng((n + 1) * _MapUnitPixels, (m + 1) * _MapUnitPixels, c);
    b = b.replace(/EZBOX/g, j.x + "," + j.y + "," + l.x + "," + l.y);
    b = b.replace(/EZWIDTH/g, _MapUnitPixels);
    b = b.replace(/EZHEIGHT/g, _MapUnitPixels);
    if (h) {
        divCreator.setImage(g, b)
    } else {
        var d = XMLHttp.create();
        if (f) {
            b = f + "?request=gotourl&url=" + encodeURIComponent(b)
        }
        d.open("get", b, true);
        var k = this;
        d.onreadystatechange = function() {
            if (d.readyState == 4) {
                try {
                    var o = d.responseText;
                    if (o) {
                        divCreator.setImage(g, o)
                    }
                } catch(q) {}
            }
        };
        d.send()
    }
};
MapUnit.prototype.setThematicTileURLCP03 = function(h, q, o, b, n, f, k, g) {
    o = o - 1;
    if (q < -_MaxNumber || (q > _MaxNumber || (o < -_MaxNumber || o > _MaxNumber))) {
        return _TransparentImageUrl
    }
    var r = _MapUnitPixels;
    var j = this.getLatLng(q * r, o * r, b);
    var m = this.getLatLng((q + 1) * r, (o + 1) * r, b);
    f = f.replace(/<MapExtext>[^~]*<\/MapExtext>/g, "<MapExtext><MapXmin>" + j.x + "</MapXmin><MapYmin>" + j.y + "</MapYmin><MapXmax>" + m.x + "</MapXmax><MapYmax>" + m.y + "</MapYmax></MapExtext>");
    f = f.replace(/<MapHeight>\d*<\/MapHeight><MapWidth>\d*<\/MapWidth>/g, "<MapHeight>" + r + "</MapHeight><MapWidth>" + r + "</MapWidth>");
    var c = n + "?clientXMLStr=" + encodeURIComponent(f);
    if (k) {
        divCreator.setImage(h, c)
    } else {
        if (g) {
            c = g + "?request=gotourl&url=" + encodeURIComponent(n + "?clientXMLStr=" + encodeURIComponent(encodeURIComponent(f)))
        }
        var d = XMLHttp.create();
        d.open("get", c, true);
        var l = this;
        d.onreadystatechange = function() {
            if (d.readyState == 4) {
                try {
                    var v = new DocParser(d.responseText);
                    var t = v.getNodes("MapUrl");
                    if (t.length > 0) {
                        divCreator.setImage(h, getDocNodeValue(t[0]))
                    }
                } catch(u) {}
            }
        };
        d.send()
    }
};
MapUnit.prototype.getLowestZoomLevel = function(f, d, b) {
    d += 4;
    b += 4;
    for (var c = 0; c < _PixelsPerDegree.length; c++) {
        if (_PixelsPerDegree[c].x * f.width <= d && _PixelsPerDegree[c].y * f.height <= b) {
            return c
        }
    }
    return _PixelsPerDegree.length - 1
};
MapUnit.prototype.getPixelsPerDegree = function(b) {
    return _PixelsPerDegree[b]
};
function MapControl() {
    this.div = document.createElement("div");
    this.div.style.left = convert2Px(8);
    this.div.style.top = convert2Px(8);
    this.div.style.position = "absolute"
}
MapControl.prototype.init = function(b) {
    if (b instanceof MainFrame) {
        b.createZoomControls(this.div);
        b.createZoomSlider(this.div)
    }
};
MapControl.prototype.getContainer = function() {
    return this.div
};
var pMapUnits = new Array(_MapUnit);
var g_next_id = 0;
function MapsApp(h, c, f, g, d) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(h, "object")) {
            throw EzErrorFactory.createError("EzMap���췽����arguments[0]���Ͳ���ȷ")
        }
        this.queryResults2 = [];
        this.ezMapServiceTryTimes = 1;
        this.map = null;
        this.mapContainer = h;
        this.panel = c;
        this.metaPanel = f;
        this.permalink = g;
        this.specToggleArea = d;
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
        var b = this;
        window.hideOverView = function() {
            b.hideOverView()
        };
        window.onscroll = function() {};
        _m_MapApp = this;
        var b = this;
        window.getMap = function() {
            return b.map
        };
        window.getMapApp = function() {
            return b
        }
    } catch(j) {
        throw EzErrorFactory.createError("EzMap���췽��ִ�в���ȷ", j)
    }
}
MapsApp.prototype.beforePrint = function() {
    var f = this.mapContainer.offsetWidth / window.screen.logicalXDPI;
    var d = 7;
    var j = this.mapContainer.offsetHeight / window.screen.logicalYDPI;
    var h = 8;
    if (this.vpage) {
        h = 7;
        if (this.vpage.directions) {
            h = 3.5
        } else {
            if (this.vpage.overlays.length > 0 && this.vpage.overlays[0].locations.length > 1) {
                h = 4.5
            }
        }
    }
    var g = d / f;
    if (j * g > h) {
        g = h / j
    }
    var c = f * g;
    if (c < d) {
        var b = Math.floor(c / d * 100);
        this.mapContainer.style.width = b + "%"
    } else {
        this.mapContainer.style.width = "100%"
    }
    this.mapContainer.style.zoom = g;
    if (document.body.style.overflow == "hidden") {}
};
MapsApp.prototype.afterPrint = function() {
    this.mapContainer.style.zoom = 1;
    this.mapContainer.style.width = "auto";
    this.resizeMapView()
};
MapsApp.prototype.centerAndZoom = function(c, b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "Point")) {
            throw EzErrorFactory.createError("EzMap::centerAndZoom������arguments[0]���Ͳ���ȷ")
        }
        b = parseInt(b);
        this.map.centerAndZoom(c, b)
    } catch(d) {
        throw EzErrorFactory.createError("EzMap::centerAndZoom����ִ�в���ȷ", d)
    }
};
MapsApp.prototype.isLoaded = function() {
    return this.map.isLoaded()
};
MapsApp.prototype.zoomTo = function(b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "int")) {
            throw EzErrorFactory.createError("EzMap::zoomTo������arguments[0]�������Ͳ���ȷ")
        }
        this.map.zoomTo(b)
    } catch(c) {
        throw EzErrorFactory.createError("EzMap::zoomTo����ִ�в���ȷ", c)
    }
};
MapsApp.prototype.loadMap = function(c) {
    var d = null;
    if (c) {
        d = pMapUnits[c]
    }
    if (!d) {
        d = pMapUnits[0]
    }
    this.map = new MainFrame(this.mapContainer, d, null, null, false, false, pMapUnits);
    this.map.showCopyright();
    this.map.showMapScale();
    this.map.showMapServerControl();
    this.map.enableDblClick();
    this.map.enableMouseScroll();
    this.map.bIsLog = true;
    this.map.container.focus();
    var b = this;
    BindingEvent(this.map.container, "mousemove", this.map.eventHandler("displayCoord"));
    this.map.registerKeyHandlers(this.map.container);
    if (pMapUnits.length > 1) {
        this.map.createSpecToggleLinks(this.specToggleArea)
    }
};
MapsApp.prototype.onMapStateChanged = function() {
    try {
        if (this.vpageDoc) {
            var f = this.map.getCenterLatLng();
            this.vpageDoc.getElementById(se).value = f.y;
            this.vpageDoc.getElementById(te).value = f.x;
            this.vpageDoc.getElementById("zoom").value = this.map.realZoomLevel
        }
        var d = this.getPageURL();
        this.permalink.href = d
    } catch(c) {
        EzLog.dump(c)
    }
};
MapsApp.prototype.resizeMapView = function() {
    var g = this.getWindowSize();
    var d = ObjectOffset(this.mapContainer);
    var f = g.height - d.y - 10;
    var c = ObjectOffset(this.panel);
    var b = f - (c.y - d.y);
    if (typeof _ResizeMap != "undefined" && _ResizeMap == true) {
        this.mapContainer.style.height = convert2Px(f);
        alert("height...")
    }
    if (document.body.style.overflow == "hidden") {}
    if (this.map) {
        this.map.onResize();
        this.map.containOffset = d
    }
};
MapsApp.prototype.fullExtent = function() {
    this.map.fullExtent()
};
MapsApp.prototype.centerAtMBR = function(h, f, c, b) {
    try {
        if (arguments.length == 1) {
            if (!EzServerClient.GlobeFunction.isTypeRight(h, "MBR")) {
                throw EzErrorFactory.createError("EzMap::centerAtMBR������arguments[0]���Ͳ���ȷ")
            }
        } else {
            if (!EzServerClient.GlobeFunction.isTypeRight(h, "float")) {
                throw EzErrorFactory.createError("EzMap::centerAtMBR������arguments[0]���Ͳ���ȷ")
            }
            if (!EzServerClient.GlobeFunction.isTypeRight(f, "float")) {
                throw EzErrorFactory.createError("EzMap::centerAtMBR������arguments[1]���Ͳ���ȷ")
            }
            if (!EzServerClient.GlobeFunction.isTypeRight(c, "float")) {
                throw EzErrorFactory.createError("EzMap::centerAtMBR������arguments[2]���Ͳ���ȷ")
            }
            if (!EzServerClient.GlobeFunction.isTypeRight(b, "float")) {
                throw EzErrorFactory.createError("EzMap::centerAtMBR������arguments[3]���Ͳ���ȷ")
            }
        }
        if (arguments.length == 1 && h instanceof MBR) {
            var g = h;
            this.map.centerAtMBR(g.minX, g.minY, g.maxX, g.maxY)
        } else {
            if (arguments.length == 4) {
                this.map.centerAtMBR(h, f, c, b)
            } else {
                alert("������Ч")
            }
        }
    } catch(d) {
        throw EzErrorFactory.createError("EzMap::centerAtMBR����ִ�в���ȷ", d)
    }
};
MapsApp.prototype.getDragMode = function() {
    if (typeof this.map.drawMode == "undefined" || this.map.drawMode == null) {
        this.map.drawMode = "pan"
    }
    return this.map.drawMode
};
MapsApp.prototype.changeDragMode = function(f, b, d, g) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(f, "string")) {
            throw EzErrorFactory.createError("EzMap::changeDragMode������arguments[0]���Ͳ���ȷ")
        }
        if (b && !EzServerClient.GlobeFunction.isTypeRight(b, "object")) {
            throw EzErrorFactory.createError("EzMap::changeDragMode������arguments[1]���Ͳ���ȷ")
        }
        if (d && !EzServerClient.GlobeFunction.isTypeRight(d, "object")) {
            throw EzErrorFactory.createError("EzMap::changeDragMode������arguments[2]���Ͳ���ȷ")
        }
        if (g && !EzServerClient.GlobeFunction.isTypeRight(g, "function")) {
            throw EzErrorFactory.createError("EzMap::changeDragMode������arguments[3]���Ͳ���ȷ")
        }
        this.map.changeDragMode(f, b, d, g)
    } catch(c) {
        throw EzErrorFactory.createError("EzMap::changeDragMode����ִ�в���ȷ", c)
    }
};
MapsApp.prototype.zoomIn = function() {
    switch (EzServerClient.GlobeParams.ZoomLevelSequence) {
    case 0:
    case 3:
        this.zoomTo(this.getZoomLevel() - 1);
        break;
    case 1:
    case 2:
        this.zoomTo(this.getZoomLevel() + 1);
        break
    }
};
MapsApp.prototype.zoomOut = function() {
    switch (EzServerClient.GlobeParams.ZoomLevelSequence) {
    case 0:
    case 3:
        this.zoomTo(this.getZoomLevel() + 1);
        break;
    case 1:
    case 2:
        this.zoomTo(this.getZoomLevel() - 1);
        break
    }
};
MapsApp.prototype.zoomInExt = function() {
    this.map.container.style.cursor = _ZoomInURL;
    this.changeDragMode("zoomInExt", null, null, this.eventHandler("zoomInMBR"))
};
MapsApp.prototype.zoomOutExt = function() {
    this.map.container.style.cursor = _ZoomOutURL;
    this.changeDragMode("zoomOutExt", null, null, this.eventHandler("zoomOutMBR"))
};
MapsApp.prototype.zoomInMBR = function() {
    if (!this.map.vmlDraw) {
        return
    }
    var f = this.map.vmlDraw.getMBR();
    f = MBR.intersection(f, this.getBoundsLatLng());
    var d = this.map.getPixelSpan();
    if (f.getSpanX() < 2 * d || f.getSpanY() < 2 * d) {
        var c = f.getCenterPoint();
        switch (EzServerClient.GlobeParams.ZoomLevelSequence) {
        case 1:
        case 2:
            var b = Math.max(0, this.getZoomLevel() + 1);
            break;
        case 0:
        case 3:
            var b = Math.max(0, this.getZoomLevel() - 1);
            break
        }
        this.centerAndZoom(c, b);
        this.removeOverlay(this.map.vmlDraw);
        this.map.vmlDraw = null;
        return
    }
    this.centerAtMBR(f);
    this.removeOverlay(this.map.vmlDraw);
    this.map.vmlDraw = null
};
MapsApp.prototype.zoomOutMBR = function() {
    if (!this.map.vmlDraw) {
        return
    }
    var k = this.map.vmlDraw.getMBR();
    var j = this.getBoundsLatLng();
    var h = this.map.getPixelSpan();
    if (k.getSpanX() < 2 * h || k.getSpanY() < 2 * h) {
        var g = k.getCenterPoint();
        switch (EzServerClient.GlobeParams.ZoomLevelSequence) {
        case 1:
        case 2:
            var f = Math.max(0, this.getZoomLevel() - 1);
            break;
        case 0:
        case 3:
            var f = Math.max(0, this.getZoomLevel() + 1);
            break
        }
        this.centerAndZoom(g, f);
        this.removeOverlay(this.map.vmlDraw);
        this.map.vmlDraw = null;
        return
    }
    k = MBR.intersection(k, j);
    var c = j.getSpanX() / k.getSpanX();
    var b = j.getSpanY() / k.getSpanY();
    var d = Math.max(b, c);
    k.scale(d * d);
    this.centerAtMBR(k);
    this.removeOverlay(this.map.vmlDraw);
    this.map.vmlDraw = null
};
MapsApp.prototype.pan = function(b, d) {
    try {
        if (b && !EzServerClient.GlobeFunction.isTypeRight(b, "float")) {
            throw EzErrorFactory.createError("EzMap::pan������arguments[0]���Ͳ���ȷ")
        }
        if (d && !EzServerClient.GlobeFunction.isTypeRight(d, "float")) {
            throw EzErrorFactory.createError("EzMap::pan������arguments[1]���Ͳ���ȷ")
        }
        if (arguments.length == 0) {
            this.changeDragMode("pan")
        } else {
            if (arguments.length == 2) {
                this.map.pan(b, d)
            }
        }
    } catch(c) {
        throw EzErrorFactory.createError("EzMap::pan����ִ�в���ȷ", c)
    }
};
MapsApp.prototype.getSpanLatLng = function() {
    return this.map.getSpanLatLng()
};
MapsApp.prototype.showMapControl = function(b) {
    this.map.showMapControl(b)
};
MapsApp.prototype.hideMapControl = function() {
    this.map.hideMapControl()
};
MapsApp.prototype.measureLength = function(c) {
    try {
        if (c && !EzServerClient.GlobeFunction.isTypeRight(c, "function")) {
            throw EzErrorFactory.createError("EzMap::measureLength������arguments[0]���Ͳ���Function����")
        }
        this.map.measureLength(c)
    } catch(b) {
        throw EzErrorFactory.createError("EzMap::measureLength����ִ�в���ȷ", b)
    }
};
MapsApp.prototype.measureArea = function(c) {
    try {
        if (c && !EzServerClient.GlobeFunction.isTypeRight(c, "function")) {
            throw EzErrorFactory.createError("EzMap::measureArea������arguments[0]���Ͳ���Function����")
        }
        this.map.measureArea(c)
    } catch(b) {
        throw EzErrorFactory.createError("EzMap::measureArea����ִ�в���ȷ", b)
    }
};
MapsApp.prototype.centerAtPoint = function(b) {
    this.map.centerAtLatLng(b)
};
MapsApp.prototype.centerAtLatLng = function(b, f) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "float") && !EzServerClient.GlobeFunction.isTypeRight(b, "Point")) {
            throw EzErrorFactory.createError("EzMap::centerAtLatLng������arguments[0]���Ͳ���ȷ")
        }
        if (f && !EzServerClient.GlobeFunction.isTypeRight(f, "float")) {
            throw EzErrorFactory.createError("EzMap::centerAtLatLng������arguments[1]���Ͳ���ȷ")
        }
        var c = null;
        if (b instanceof Point) {
            c = b
        } else {
            c = new Point(b, f)
        }
        this.map.centerAtLatLng(c);
        c = null
    } catch(d) {
        throw EzErrorFactory.createError("EzMap::centerAtLatLng����ִ�в���ȷ", d)
    }
};
MapsApp.prototype.getLevelOfMBR = function(g, f, c, b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(g, "float")) {
            throw EzErrorFactory.createError("EzMap::getLevelOfMBR������arguments[0]���Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(f, "float")) {
            throw EzErrorFactory.createError("EzMap::getLevelOfMBR������arguments[1]���Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "float")) {
            throw EzErrorFactory.createError("EzMap::getLevelOfMBR������arguments[2]���Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "float")) {
            throw EzErrorFactory.createError("EzMap::getLevelOfMBR������arguments[3]���Ͳ���ȷ")
        }
        return this.map.getLevelOfMBR(g, f, c, b)
    } catch(d) {
        throw EzErrorFactory.createError("EzMap::getLevelOfMBR����ִ�в���ȷ", d)
    }
};
MapsApp.prototype.clearVMLContainer = function() {
    var b = this.map;
    b.clearVMLContainer()
};
MapsApp.prototype.debug = function() {
    var c = this.map.vmlContainer;
    var b = getEleByID("resultDiv");
    if (c && b) {
        b.innerText = this.map.vmlContainer.groupObj.outerHTML
    }
};
MapsApp.prototype.getWindowSize = function(b) {
    if (!b) {
        b = new Rect(0, 0)
    }
    if (window.self && self.innerWidth) {
        b.width = self.innerWidth;
        b.height = self.innerHeight;
        return b
    }
    if (document.documentElement && document.documentElement.clientHeight) {
        b.width = document.documentElement.clientWidth;
        b.height = document.documentElement.clientHeight;
        return b
    }
    b.width = document.body.clientWidth;
    b.height = document.body.clientHeight;
    return b
};
MapsApp.prototype.addOverlay = function(b, d) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "iOverLay")) {
            throw EzErrorFactory.createError("EzMap::addOverlay������arguments[0]���Ͳ���ȷ")
        }
        if (d && !EzServerClient.GlobeFunction.isTypeRight(d, "boolean")) {
            throw EzErrorFactory.createError("EzMap::addOverlay������arguments[1]���Ͳ���ȷ")
        }
        this.map.addOverlay(b, d)
    } catch(c) {
        throw EzErrorFactory.createError("EzMap::addOverlay����ִ�в���ȷ", c)
    }
};
MapsApp.prototype.removeOverlay = function(c, b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "iOverLay")) {
            throw EzErrorFactory.createError("EzMap::removeOverlay������arguments[0]���Ͳ���ȷ")
        }
        this.map.removeOverlay(c, b)
    } catch(d) {
        throw EzErrorFactory.createError("EzMap::removeOverlay����ִ�в���ȷ", d)
    }
};
MapsApp.prototype.clearOverlays = function(b) {
    this.map.clearOverlays(b)
};
MapsApp.prototype.clear = function(b) {
    this.clearOverlays(b);
    this.clearVMLContainer()
};
MapsApp.prototype.getOverlays = function() {
    return this.map.overlays
};
MapsApp.prototype.openInfoWindow = function(c, b, f) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "Point")) {
            throw EzErrorFactory.createError("EzMap::openInfoWindow������arguments[0]���Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "string")) {
            throw EzErrorFactory.createError("EzMap::openInfoWindow������arguments[1]���Ͳ���ȷ")
        }
        if (f && !EzServerClient.GlobeFunction.isTypeRight(f, "boolean")) {
            throw EzErrorFactory.createError("EzMap::openInfoWindow������arguments[2]���Ͳ���ȷ")
        }
        this.map.openInfoWindow(c.x, c.y, b, f)
    } catch(d) {
        throw EzErrorFactory.createError("EzMap::openInfoWindow����ִ�в���ȷ", d)
    }
};
MapsApp.prototype.getCenterLatLng = function() {
    var b = this.map.getCenterLatLng();
    return b
};
MapsApp.prototype.getZoomLevel = function() {
    return this.map.getZoomLevel()
};
MapsApp.prototype.getMaxLevel = function() {
    return _MaxLevel
};
MapsApp.prototype.centerAndZoomToBorder = function(b) {
    this.map.centerAndZoomToBorder(b)
};
_printWin = null;
_curMap = null;
MapsApp.prototype.printMap = function(n, k, o) {
    if (_printWin != null) {
        try {
            _printWin.close()
        } catch(j) {
            throw j.message
        }
    }
    var b = this.map.viewSize.height;
    var c = this.map.viewSize.width;
    var d = "width=" + c + "px,height=" + (b - 18) + "px";
    d = d + ",menubar=yes,scrollbars=yes,resizable=no,location=no, status=no";
    _printWin = window.open("", "default", d);
    if (!k) {
        k = "��ͼҳü"
    }
    if (!o) {
        o = "��ͼҳ��"
    }
    if (_printWin != null) {
        _printWin.document.writeln("<html xmlns:v = 'urn:schemeas-microsoft-com:vml'><head>");
        _printWin.document.writeln('<meta http-equiv="content-type" content="text/html; charset=GBK"/>');
        _printWin.document.writeln("<title>��ͼ��ӡ</title>");
        _printWin.document.writeln("<script>window.onbeforeunload=function(){opener._printWin=null;	}<\/script>");
        _printWin.document.writeln('<style type="text/css">');
        _printWin.document.writeln("body {margin: 0px}.noprint{	display:none;}v\\:* {BEHAVIOR: url(#default#VML)}");
        _printWin.document.writeln("</style>");
        _printWin.document.writeln("</head>");
        _printWin.document.writeln('<body style="width:' + c + "px;height:" + b + 'px">');
        if (n) {
            _printWin.document.writeln('<input class=printtitle name="printtitle" id="printtitle" type="text" value="' + k + '">')
        }
        _printWin.document.writeln('<div id="EzMaps_Container" style="overflow:hidden;width:' + c + "px;height:" + b + 'px;">');
        _printWin.document.writeln(this.map.container.innerHTML);
        if (arguments[3]) {
            _printWin.document.writeln(arguments[3])
        }
        _printWin.document.writeln("</div>");
        if (n) {
            _printWin.document.writeln('<input class=printbottom name="printbottom" id="printbottom" type="text" value="' + o + '">')
        }
        _printWin.document.writeln("</body>");
        _printWin.document.writeln("</html>");
        if (n) {
            _printWin.document.charset = "GB2312";
            _printWin.document.createStyleSheet(n)
        }
        for (var h = 0; h < _printWin.document.images.length; h++) {
            var g = _printWin.document.images[h];
            var m = g.width;
            var f = g.height;
            var l = g.src.toUpperCase();
            if (l.substring(l.length - 3, l.length) == "PNG") {
                g.style.filter += "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + g.src + ", sizingmethod=scale);";
                g.src = "images/transparent.gif";
                g.width = m;
                g.height = f
            }
        }
        _printWin.document.execCommand("Refresh");
        _printWin.focus()
    }
};
MapsApp.prototype.print = MapsApp.prototype.printMap;
MapsApp.prototype.printMapExt = function() {
    if (_printWin != null) {
        try {
            _printWin.close()
        } catch(c) {}
    }
    var b = "width=" + this.map.viewSize.width + ",height=" + this.map.viewSize.height;
    b = b + ",menubar=yes,scrollbars=no,resizable=no,location=no, status=no";
    _printWin = window.open("printMap.htm", "placeholder", b);
    _printWin.focus()
};
MapsApp.prototype.saveMap = function() {
    if (_printWin != null) {
        try {
            _printWin.close()
        } catch(g) {}
    }
    var d = "width=" + this.map.viewSize.width + ",height=" + this.map.viewSize.height;
    d = d + ",menubar=yes,scrollbars=no,resizable=no,location=no, status=no";
    _printWin = window.open("", "placeholder", d);
    var h = this.getBoundsLatLng();
    var b = this.getZoomLevel() + _ZoomOffset;
    var f = _MapServiceArr[0] + "/EzMap?Service=getRectImg&minx=" + h.minX + "&miny=" + h.minY + "&maxx=" + h.maxX + "&maxy=" + h.maxY + "&zoom=" + b;
    var c = "<html><head><title>�����ͼ</title></head><body><img src='" + f + "' style='width:100%;height:100%'></body></html>";
    _printWin.document.write(c);
    _printWin.focus()
};
MapsApp.prototype.downloadMap = function(m, l, j, h, c) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(m, "float")) {
            throw EzErrorFactory.createError("EzMap::downloadMap������arguments[0]���Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(l, "float")) {
            throw EzErrorFactory.createError("EzMap::downloadMap������arguments[1]���Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(j, "float")) {
            throw EzErrorFactory.createError("EzMap::downloadMap������arguments[2]���Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(h, "float")) {
            throw EzErrorFactory.createError("EzMap::downloadMap������arguments[3]���Ͳ���ȷ")
        }
        if (_printWin != null) {
            _printWin.close()
        }
        var o = this.getBoundsLatLng();
        if (!m) {
            m = o.minX
        }
        if (!l) {
            l = o.minY
        }
        if (!j) {
            j = o.maxX
        }
        if (!h) {
            h = o.maxY
        }
        format = "html";
        var k = "";
        if (this.map.spec.bIsOverlay) {
            k = this.map.spec.overlayServiceArr[0]
        } else {
            k = this.map.spec.mapServiceArr[0]
        }
        if (typeof c == "undefined") {
            var c = this.getZoomLevel()
        }
        switch (EzServerClient.GlobeParams.ZoomLevelSequence) {
        case 0:
        case 2:
            c = c + _ZoomOffset;
            break;
        case 1:
        case 3:
            c = EzServerClient.GlobeParams.MapMaxLevel - c + _ZoomOffset;
            break
        }
        var f = "width=" + this.map.viewSize.width + ",height=" + this.map.viewSize.height;
        f = f + ",menubar=yes,scrollbars=no,resizable=no,location=no, status=no";
        var n = k + "/EzMap?Service=getRectImg&result=" + format + "&minx=" + m + "&miny=" + l + "&maxx=" + j + "&maxy=" + h + "&zoom=" + c;
        var b = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
        b.open("get", n, true);
        b.onreadystatechange = function() {
            if (b.readyState == 4) {
                try {
                    window.open(d(b.responseText, k))
                } catch(q) {
                    throw q
                }
            }
        };
        b.send();
        function d(w, t) {
            var r = null;
            try {
                if (typeof ActiveXObject != "undefined") {
                    var r = new ActiveXObject("Microsoft.XMLDOM");
                    r.async = false;
                    r.loadXML(w)
                } else {
                    if (typeof DOMParser != "undefined") {
                        r = (new DOMParser()).parseFromString(w, "text/xml")
                    } else {
                        return null
                    }
                }
            } catch(q) {
                return null
            }
            var v = r.getElementsByTagName("a");
            if (v.length == 1) {
                var u = t.substring(0, t.lastIndexOf("/"));
                return u + v[0].getAttribute("href")
            } else {
                return n
            }
        }
    } catch(g) {
        throw EzErrorFactory.createError("EzMap::downloadMap����ִ�в���ȷ", g)
    }
};
MapsApp.prototype.gotoCenter = function() {
    this.map.gotoCenter()
};
MapsApp.prototype.recenterOrPanToLatLng = function(b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "Point")) {
            throw EzErrorFactory.createError("EzMap::recenterOrPanToLatLng������argumnets[0]�������Ͳ���Point")
        }
        this.map.recenterOrPanToLatLng(b)
    } catch(c) {
        throw EzErrorFactory.createError("EzMap::recenterOrPanToLatLng����ִ�в���ȷ", c)
    }
};
MapsApp.prototype.getBoundsLatLng = function(b) {
    return this.map.getBoundsLatLng()
};
MapsApp.prototype.addMapChangeListener = function(b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "function")) {
            throw EzErrorFactory.createError("EzMap::addMapChangeListener������arguments[0]���Ͳ���ȷ")
        }
        this.map.addStateListener(b)
    } catch(c) {
        throw EzErrorFactory.createError("EzMap::addMapChangeListener����ִ�в���ȷ", c)
    }
};
MapsApp.prototype.removeMapChangeListener = function(f) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(f, "function")) {
            throw EzErrorFactory.createError("EzMap::removeMapChangeListener������arguments[0]���Ͳ���ȷ")
        }
        var h = this.map.stateListeners;
        if (h) {
            var d = [];
            for (var j = 0; j < h.length; j++) {
                if (h[j] != f) {
                    d.push(h[j])
                }
            }
            if (h.length != d.length) {
                this.map.stateListeners = d
            }
        }
    } catch(g) {
        throw EzErrorFactory.createError("EzMap::removeMapChangeListener����ִ�в���ȷ", g)
    }
};
MapsApp.prototype.addOverViewPanel = function(b) {
    var j = document.createElement("div");
    j.id = this.overViewPanelID;
    j.style.backgroundColor = "white";
    j.style.borderTop = "  #979797 1px solid";
    j.style.borderLeft = "  #979797 1px solid";
    var d = 250;
    var h = 200;
    if (b) {
        d = b.width;
        h = b.height
    }
    j.style.height = convert2Px(h);
    j.style.width = convert2Px(d);
    j.style.right = convert2Px(16 - d);
    j.style.bottom = convert2Px(16 - h);
    j.style.zIndex = 10000;
    j.style.position = "absolute";
    this.overviewPanel = j;
    var f = document.createElement("div");
    f.id = this.overViewID;
    f.style.display = "";
    f.style.borderTop = "  #979797 1px solid";
    f.style.borderLeft = "  #979797 1px solid";
    f.style.position = "absolute";
    f.style.right = convert2Px( - 1);
    f.style.bottom = convert2Px( - 1);
    f.style.height = convert2Px(h - 5);
    f.style.width = convert2Px(d - 5);
    f.style.cursor = "default";
    j.appendChild(f);
    var c = document.createElement("img");
    c.src = EzServerClient.GlobeParams.SlipInImg;
    c.style.position = "absolute";
    var g = this;
    c.onclick = function() {
        if (c.src == EzServerClient.GlobeParams.SlipInImg) {
            c.src = EzServerClient.GlobeParams.SlipOutImg;
            EzServerClient.GlobeParams.OverViewFlag = 0;
            EzServerClient.GlobeFunction.SlipOut(j, 15);
            j.overViewIsOpen = true;
            g.map.mapScale[0].style.right = 50 + j.offsetWidth + "px";
            g.map.mapScale[1].style.right = 50 + j.offsetWidth + "px"
        } else {
            c.src = EzServerClient.GlobeParams.SlipInImg;
            EzServerClient.GlobeParams.OverViewFlag = 1;
            EzServerClient.GlobeFunction.SlipIn(j, 15, 16 - d, 16 - h);
            j.overViewIsOpen = false;
            g.map.mapScale[0].style.right = "50px";
            g.map.mapScale[1].style.right = "50px"
        }
    };
    j.appendChild(c);
    this.overviewPanel.slipImg = c;
    this.mapContainer.appendChild(j);
    return f
};
MapsApp.prototype.addOverView = function(c) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "OverView")) {
            throw EzErrorFactory.createError("EzMap::addOverView�����в���arguments[0]�����Ͳ���OverView��")
        }
        this.overViewConf = c;
        var f = document.getElementById(this.overViewID);
        if (f) {
            return
        } else {
            f = this.addOverViewPanel(this.overViewConf)
        }
        this.overViewMap = new MainFrame(f);
        this.map.name = _mapName;
        this.overViewMap.name = "ӥ��";
        var b = this;
        window.updateOverview = function() {
            var k = b.getZoomLevel();
            switch (EzServerClient.GlobeParams.ZoomLevelSequence) {
            case 0:
            case 3:
                k = Math.min(k + 4, _MaxLevel, b.overViewConf.maxLevel);
                k = Math.max(b.overViewConf.minLevel, k);
                break;
            case 1:
            case 2:
                k = Math.max(k - 4, b.overViewConf.minLevel);
                k = Math.min(b.overViewConf.maxLevel, k);
                break
            }
            b.overViewMap.zoomTo(k);
            var j = b.map.getCenterLatLng();
            b.overViewMap.recenterOrPanToLatLng(j);
            b.overViewMap.clearOverlays();
            var o = b.map.getBoundsLatLng();
            var h = b.overViewMap.getBoundsLatLng();
            if (!o.containsBounds(h)) {
                var g = o.toString();
                if (b.overViewMap.pRectangle) {
                    delete b.overViewMap.pRectangle;
                    delete b.OverviewDragObject
                }
                var n = new Rectangle(g, "#ff0000", 2, 0.3, "#0000ff");
                b.overViewMap.addOverlay(n);
                var m = parseInt(n.div.style.left);
                var l = parseInt(n.div.style.top);
                b.OverviewRect = n;
                b.OverviewDragObject = new DragEvent(n.div, m, l, b.overViewMap.container);
                b.OverviewDragObject.ondragend = function() {
                    var v = parseInt(b.OverviewRect.div.style.left);
                    var u = parseInt(b.OverviewRect.div.style.top);
                    var t = parseInt(b.OverviewRect.div.style.width);
                    var w = parseInt(b.OverviewRect.div.style.height);
                    var q = v + t / 2;
                    var x = u + w / 2;
                    var r = b.overViewMap.convert2LonLat(q, x);
                    b.map.recenterOrPanToLatLng(r)
                };
                b.overViewMap.pRectangle = n
            }
        };
        this.overViewMap.onDragEnd = function() {
            var g = b.overViewMap.getCenterLatLng();
            b.map.recenterOrPanToLatLng(g)
        };
        this.map.addStateListener(updateOverview);
        updateOverview()
    } catch(d) {
        throw EzErrorFactory.createError("EzMap::addOverView����ִ�в���ȷ", d)
    }
};
MapsApp.prototype.hideCopyright = function() {
    this.map.hideCopyright()
};
MapsApp.prototype.showCopyright = function() {
    this.map.showCopyright()
};
MapsApp.prototype.hideMapServer = function() {
    this.map.hideMapServer()
};
MapsApp.prototype.showMapServer = function() {
    this.map.showMapServer()
};
MapsApp.prototype.hideMapScale = function() {
    this.map.hideMapScale()
};
MapsApp.prototype.showMapScale = function() {
    this.map.showMapScale()
};
MapsApp.prototype.showOverView = function() {
    if (!this.overviewPanel.overViewIsOpen) {
        this.overviewPanel.slipImg.click()
    }
};
MapsApp.prototype.hideOverView = function() {
    if (this.overviewPanel.overViewIsOpen) {
        this.overviewPanel.slipImg.click()
    }
};
MapsApp.prototype.reverseOverView = function() {
    this.overviewPanel.slipImg.click()
};
MapsApp.prototype.about = function() {
    this.map.about()
};
MapsApp.prototype.getMeter = function(b, d) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "Point")) {
            throw EzErrorFactory.createError("EzMap::getMeter������arguments[0]���Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(d, "float")) {
            throw EzErrorFactory.createError("EzMap::getMeter������arguments[1]���Ͳ���ȷ")
        }
        return MapsApp.getMeter(b, d)
    } catch(c) {
        throw EzErrorFactory.createError("EzMap::getMeter����ִ�в���ȷ", c)
    }
};
MapsApp.prototype.getDegree = function(b, c) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "Point")) {
            throw EzErrorFactory.createError("EzMap::getDegree������arguments[0]���Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "float") && !EzServerClient.GlobeFunction.isTypeRight(c, "string")) {
            throw EzErrorFactory.createError("EzMap::getDegree������arguments[1]���Ͳ���ȷ")
        }
        return MapsApp.getDegree(b, c)
    } catch(d) {
        throw EzErrorFactory.createError("EzMap::getDegree����ִ�в���ȷ", d)
    }
};
MapsApp.prototype.switchMapServer = function(b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "int")) {
            throw EzErrorFactory.createError("EzMap::switchMapServer������arguments[0]���Ͳ���ȷ")
        }
        if (b < this.map.mapSrcURL.length) {
            this.map.mapServer[this.map.mapServer.length - b - 1].click()
        }
    } catch(c) {
        throw EzErrorFactory.createError("EzMap::switchMapServer����ִ�в���ȷ", c)
    }
};
MapsApp.prototype.showStandMapControl = function() {
    this.map.showStandMapControl()
};
MapsApp.prototype.showSmallMapControl = function() {
    this.map.showSmallMapControl()
};
MapsApp.prototype.addControl = function(b) {
    this.map.addControl(b)
};
MapsApp.prototype.getVersionInfo = function() {
    return EzServerClient.GlobeParams.VersionInfo.join(",")
};
MapsApp.prototype.showVersion = function(b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "string")) {
            throw EzErrorFactory.createError("EzMap::showVersion������arguments[0]���Ͳ���ȷ")
        }
        this.map.showVersion(b)
    } catch(c) {
        throw EzErrorFactory.createError("EzMap::showVersion����ִ�в���ȷ", c)
    }
};
MapsApp.prototype.editOverlay = function() {
    this.initMenu()
};
MapsApp.prototype.initMenu = function() {
    if (!this.menuContainer) {
        this.menuContainer = createDiv("");
        this.menuContainer.className = "contextmenu";
        this.map.container.appendChild(this.menuContainer);
        BindingEvent(this.map.container, "click", this.eventHandler("hideMenu"))
    }
};
MapsApp.prototype.centerAtMouse = function() {
    if (typeof this.mousePoint != "undefined") {
        this.map.centerAtLatLng(this.mousePoint)
    }
};
g_menu = new Array();
g_menu.push(new MenuObject("����", "g_current_editor.showEdit()"));
g_menu.push(new MenuObject("ɾ��", "getMapApp().removeOverlay(g_current_editor)"));
g_menu.push(null);
g_menu.push(new MenuObject("�Ŵ�", "getMapApp().zoomIn()"));
g_menu.push(new MenuObject("��С", "getMapApp().zoomOut()"));
g_menu.push(new MenuObject("�ڴ˾��е�ͼ", "getMapApp().centerAtMouse()"));
MapsApp.prototype.showMenu = function() {
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
            continue
        }
        pDiv.style.width = mWidth + "px";
        pDiv.innerHTML = pObj.name;
        pDiv.className = "menuitem";
        pDiv.func = pObj.func;
        pDiv.onmouseover = function() {
            this.className = "menuitem selectedmenuitem"
        };
        pDiv.onmouseout = function() {
            this.className = "menuitem"
        };
        pDiv.onclick = function() {
            eval(this.func)
        }
    }
    this.menuContainer.style.display = "";
    var uPoint = this.mapCoord2container(new Point(this.getMouseMapX(), this.getMouseMapY()));
    this.menuContainer.style.pixelTop = uPoint.y;
    this.menuContainer.style.pixelLeft = uPoint.x;
    return false
};
MapsApp.prototype.getCurrentEditor = function() {
    return g_current_editor
};
MapsApp.prototype.hideMenu = function() {
    this.menuContainer.style.display = "none";
    var b = ObjectOffset(this.map.container);
    this.menuContainer.style.pixelTop = event.clientY - b.y;
    this.menuContainer.style.pixelLeft = event.clientX - b.x;
    return false
};
MapsApp.prototype.getMouseMapX = function() {
    return this.map.getMouseMapX()
};
MapsApp.prototype.getMouseMapY = function() {
    return this.map.getMouseMapY()
};
MapsApp.prototype.containerCoord2Map = function(b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "Point")) {
            throw EzErrorFactory.createError("EzMap::containerCoord2Map������arguments[0]���Ͳ���ȷ")
        }
        return this.map.containerCoord2Map(b)
    } catch(c) {
        throw EzErrorFactory.createError("EzMap::containerCoord2Map����ִ�в���ȷ", c)
    }
};
MapsApp.prototype.mapCoord2Container = function(b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "Point")) {
            throw EzErrorFactory.createError("EzMap::mapCoord2container������arguments[0]���Ͳ���ȷ")
        }
        return this.map.mapCoord2container(b)
    } catch(c) {
        throw EzErrorFactory.createError("EzMap::mapCoord2container����ִ�в���ȷ", c)
    }
};
MapsApp.prototype.mapCoord2container = MapsApp.prototype.mapCoord2Container;
MapsApp.prototype.getMapContainer = function() {
    return this.mapContainer
};
MapsApp.prototype.getCurrentMapScale = function() {
    return this.map.currentMapScale
};
MapsApp.prototype.closeInfoWindow = function() {
    this.map.closeInfoWindow()
};
MapsApp.prototype.clearMapChangeListener = function() {
    this.map.clearStateChanged()
};
MapsApp.prototype.printGPS = function(b) {
    this.beforePrintMap(b)
};
MapsApp.prototype.addMapEventListener = function(b, c) {
    return EzEvent.addEventListener(this.map, b, c)
};
MapsApp.prototype.removeMapEventListener = function(b) {
    EzEvent.removeEventListener(b)
};
MapsApp.prototype.clearMapInstanceEventListeners = function(b) {
    EzEvent.clearInstanceEventListeners(this.map, b)
};
MapsApp.prototype.clearMapEventListeners = function() {
    EzEvent.clearEventListeners(this.map)
};
MapsApp.prototype.getQueryResults2 = function() {
    return this.queryResults2
};
EzServerClient.GlobeParams.OverViewFlag = 0;
EzServerClient.GlobeParams.SlipOutImg = _ImageBaseUrl + "overview/OverViewSlipOut.png";
EzServerClient.GlobeParams.SlipInImg = _ImageBaseUrl + "overview/OverViewSlipIn.png";
EzServerClient.GlobeFunction.SlipOut = function(b, c) {
    b.style.right = (EzServerClient.GlobeParams.OverViewFlag - c) * (b.offsetWidth - 16) / c;
    b.style.bottom = (EzServerClient.GlobeParams.OverViewFlag - c) * (b.offsetHeight - 16) / c;
    if (++EzServerClient.GlobeParams.OverViewFlag > c) {
        return
    }
    setTimeout(function() {
        EzServerClient.GlobeFunction.SlipOut(b, c)
    },
    c)
};
EzServerClient.GlobeFunction.SlipIn = function(d, f, c, b) {
    d.style.right = parseInt(d.style.right) - (d.offsetWidth - 16) / f;
    d.style.bottom = parseInt(d.style.bottom) - (d.offsetHeight - 16) / f;
    if (++EzServerClient.GlobeParams.OverViewFlag > f) {
        d.style.right = c;
        d.style.bottom = b;
        return
    }
    setTimeout(function() {
        EzServerClient.GlobeFunction.SlipIn(d, f, c, b)
    },
    f)
};
function MapServer(f, d, c) {
    this.setMapDispName = function(h, g) {
        try {
            if (!EzServerClient.GlobeFunction.isTypeRight(h, "int")) {
                throw EzErrorFactory.createError("MapServer::setMapDispName������arguments[0]���Ͳ���ȷ")
            }
            if (!EzServerClient.GlobeFunction.isTypeRight(g, "string")) {
                throw EzErrorFactory.createError("MapServer::setMapDispName������arguments[1]���Ͳ���ȷ")
            }
            this.mMapServerURLArr[h].mapServerName = g
        } catch(j) {
            throw EzErrorFactory.createError("MapServer::setMapDispName����ִ�в���ȷ", j)
        }
    };
    this.getMapDispName = function(g) {
        try {
            if (!EzServerClient.GlobeFunction.isTypeRight(g, "int")) {
                throw EzErrorFactory.createError("MapServer::getMapDispName������arguments[0]���Ͳ���ȷ")
            }
            return this.mMapServerURLArr[g].mapServerName
        } catch(h) {
            throw EzErrorFactory.createError("MapServer::getMapDispName����ִ�в���ȷ", h)
        }
    };
    this.getDefaultMapDispName = function(g) {
        try {
            if (!EzServerClient.GlobeFunction.isTypeRight(g, "int")) {
                throw EzErrorFactory.createError("MapServer::getDefaultMapDispName������arguments[0]���Ͳ���ȷ")
            }
            var j = EzServerClient.GlobeParams.MapSrcURL.length;
            if (g >= j) {
                return "��ͼ" + (g - j)
            } else {
                return EzServerClient.GlobeParams.MapSrcURL[g][0]
            }
        } catch(h) {
            throw EzErrorFactory.createError("MapServer::getDefaultMapDispName����ִ�в���ȷ", h)
        }
    };
    this.getMapServerURL = function(g) {
        try {
            if (!EzServerClient.GlobeFunction.isTypeRight(g, "int")) {
                throw EzErrorFactory.createError("MapServer::getMapServerURL������arguments[0]���Ͳ���ȷ")
            }
            return this.mMapServerURLArr[g]
        } catch(h) {
            throw EzErrorFactory.createError("MapServer::getMapServerURL����ִ�в���ȷ", h)
        }
    };
    this.setMapServerURL = function(h, g) {
        try {
            if (!EzServerClient.GlobeFunction.isTypeRight(h, "int")) {
                throw EzErrorFactory.createError("MapServer::setMapServerURL������arguments[0]���Ͳ���ȷ")
            }
            if (!EzServerClient.GlobeFunction.isTypeRight(g, "string") && !EzServerClient.GlobeFunction.isTypeRight(g, "Array")) {
                throw EzErrorFactory.createError("MapServer::setMapServerURL������arguments[1]���Ͳ���ȷ")
            }
            this.mMapServerURLArr[h] = g
        } catch(j) {
            throw EzErrorFactory.createError("MapServer::setMapServerURL����ִ�в���ȷ", j)
        }
    };
    this.getMapServerURLCount = function() {
        try {
            return this.mMapServerURLArr.length
        } catch(g) {
            throw EzErrorFactory.createError("MapServer::getMapServerURLCount����ִ�в���ȷ", g)
        }
    };
    this.mMapServerURLArr = [];
    for (var b = 0; b < arguments.length; b++) {
        if (typeof arguments[b] == "string") {
            this.mMapServerURLArr.push([arguments[b]])
        } else {
            if (arguments[b] instanceof Array) {
                this.mMapServerURLArr.push(arguments[b])
            } else {
                throw new Error("MapServer�����췽����������")
            }
        }
        this.mMapServerURLArr[b].mapServerName = this.getDefaultMapDispName(b)
    }
}
MapServerControl.prototype = new MapControl();
MapServerControl.prototype.init = function(b) {
    if (b instanceof MainFrame) {
        b.createSmallPanningControls(this.div);
        b.createSmallZoomControls(this.div)
    }
};
function MapSmallControl() {
    this.base = MapControl;
    this.base()
}
MapSmallControl.prototype = new MapControl();
MapSmallControl.prototype.init = function(b) {
    if (b instanceof MainFrame) {
        b.createSmallPanningControls(this.div);
        b.createSmallZoomControls(this.div)
    }
};
function MapStandControl() {
    this.base = MapControl;
    this.base()
}
MapStandControl.prototype = new MapControl();
MapStandControl.prototype.init = function(b) {
    if (b instanceof MainFrame) {
        b.createPanningControls(this.div);
        b.createZoomControls(this.div);
        b.createZoomSlider(this.div)
    }
};
function MapStatusControl(b) {
    this.anchorLevel = null;
    this.anchor = new Point(0, 0);
    this.spec = null;
    this.span = new Rect(_MaxNumber, _MaxNumber);
    this.points = null;
    this.map = b;
    this.map.addStateListener(this.eventHandler("onMapStateChanged"));
    this.map.onresize = this.eventHandler("onMapResize")
}
MapStatusControl.prototype.onMapStateChanged = function() {
    if (this.anchorLevel != this.map.realZoomLevel || this.spec != this.map.spec) {
        this.reset();
        this.addPoint(0, 0, true);
        return
    }
    var c = this.map.getCenterLatLng();
    var b = Math.round((c.x - this.anchor.x) / this.span.width);
    var d = Math.round((c.y - this.anchor.y) / this.span.height);
    this.addPoint(b, d, true)
};
MapStatusControl.prototype.onMapResize = function() {
    this.reset();
    this.addPoint(0, 0, false)
};
MapStatusControl.prototype.reset = function() {
    this.map.getCenterLatLng(this.anchor);
    this.map.getSpanLatLng(this.span);
    this.spec = this.map.spec;
    this.anchorLevel = this.map.realZoomLevel;
    this.points = new Object()
};
MapStatusControl.prototype.addPoint = function(c, d, b) {
    var f = c + "," + d;
    if (this.points[f]) {
        return
    }
    this.points[f] = 1;
    if (b) {}
};
function MenuObject(b, c) {
    this.name = b;
    this.func = c
}
function MultiMaps() {
    this.maps = new Array()
}
MultiMaps.prototype.openMap = function(f, b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(f, "string") && !EzServerClient.GlobeFunction.isTypeRight(f, "object")) {
            throw EzErrorFactory.createError("MultiMaps::openMap������arguments[0]�������Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "string")) {
            throw EzErrorFactory.createError("MultiMaps::openMap������arguments[1]�������Ͳ���ȷ")
        }
        var c = null;
        if (typeof f == "string") {
            c = new EzMap(document.getElementById(f))
        } else {
            c = new EzMap(f)
        }
        c.showMapServer();
        c.showSmallMapControl();
        if (b) {
            c.showVersion(b)
        }
        c.addMapChangeListener(this.eventHandler("refreshAllMap"));
        this.maps.push(c);
        return c
    } catch(d) {
        throw EzErrorFactory.createError("MultiMaps::openMap����ִ�в���ȷ", d)
    }
};
MultiMaps.prototype.refreshAllMap = function() {
    if (_bIsLocked) {
        return
    }
    _bIsLocked = true;
    for (var b = 0; b < this.maps.length; b++) {
        var c = this.maps[b];
        if (c.getZoomLevel() != _curentLevel) {
            c.centerAndZoom(_curentPoint, _curentLevel)
        } else {
            if (!c.getCenterLatLng().approxEquals(_curentPoint)) {
                c.recenterOrPanToLatLng(_curentPoint)
            }
        }
    }
    window.setTimeout("_bIsLocked=false;", 300)
};
MultiMaps.prototype.refreshAllMap_ = function() {
    _bIsLocked = true;
    for (var b = 0; b < this.maps.length; b++) {
        var c = this.maps[b];
        c.map.clearStateChanged()
    }
    for (var b = 0; b < this.maps.length; b++) {
        var c = this.maps[b];
        if (c.getZoomLevel() != _curentLevel) {
            c.centerAndZoom(_curentPoint, _curentLevel)
        } else {
            c.recenterOrPanToLatLng(_curentPoint)
        }
    }
    this.setTimeout("this.addMapList()", 200)
};
MultiMaps.prototype.addMapList = function() {
    for (var b = 0; b < this.maps.length; b++) {
        var c = this.maps[b];
        c.addMapChangeListener(this.eventHandler("refreshAllMap"))
    }
    _bIsLocked = false
};
MultiMaps.prototype.zoomInExt = function() {
    for (var b = 0; b < this.maps.length; b++) {
        var c = this.maps[b];
        c.zoomInExt()
    }
};
MultiMaps.prototype.zoomOutExt = function() {
    for (var b = 0; b < this.maps.length; b++) {
        var c = this.maps[b];
        c.zoomOutExt()
    }
};
MultiMaps.prototype.pan = function() {
    for (var b = 0; b < this.maps.length; b++) {
        var c = this.maps[b];
        c.pan()
    }
};
function nc(b) {
    this.ticks = b;
    this.tick = 0
}
nc.prototype.reset = function() {
    this.tick = 0
};
nc.prototype.next = function() {
    this.tick++;
    var b = Math.PI * (this.tick / this.ticks - 0.5);
    return (Math.sin(b) + 1) / 2
};
nc.prototype.more = function() {
    return this.tick < this.ticks
};
function OverlayStatus(b, c, d) {
    this.startSeq = b;
    this.endSeq = c;
    this.iStatus = d
}
OverlayStatus.prototype.toString = function() {
    return "��ʼ����" + this.startSeq + ",��������:" + this.endSeq + "��ʾ״̬:" + this.iStatus
};
OverlayStatus.prototype.bIsConflict = function(c) {
    var b = false;
    b = (this.startSeq >= c.startSeq && this.endSeq <= c.endSeq) || (this.endSeq >= c.startSeq && this.endSeq <= c.endSeq);
    if (b) {
        alert("����ʱ���г�ͻ���Ѿ����ڸ÷�Χ��ʱ������:(" + this.startSeq + "," + this.endSeq + ")")
    }
    return b
};
function OverView(g, d, c, b, f) {
    this.url = g;
    this.MBR = new MBR(d, c, b, f);
    this.imgWidth = 200;
    this.imgHeight = 240;
    this.width = 200;
    this.height = 150;
    this.closeImgURL = _CloseImg;
    this.minLevel = 0;
    this.maxLevel = _MaxLevel
}
function Shaderer() {}
function Timer() {}
function TMLegend() {
    this.base = LegendFunc;
    this.base();
    this.themeColors = new Array();
    this.points = new Array();
    this.options = {
        affectRadius: 100,
        outerNum: 16
    };
    this.baseURL = "http://127.0.0.1:1001/legendSrv?"
}
TMLegend.prototype = new LegendFunc;
TMLegend.prototype.setBaseURL = function(b) {
    this.baseURL = b
};
TMLegend.prototype.addThemeColor = function(d, b, c) {
    this.themeColors.push({
        fromValue: d,
        toValue: b,
        color: c
    })
};
TMLegend.prototype.addPoint = function(b, d, c) {
    this.points.push({
        x: b,
        y: d,
        value: c
    })
};
TMLegend.prototype.setOption = function(b, c) {
    this.options.affectRadius = b;
    this.options.outerNum = c
};
TMLegend.prototype.getURL = function() {
    var h = getMapApp().getBoundsLatLng();
    var d = getMapApp().map.viewSize;
    var g = '<?xml version="1.0" encoding="gbk" ?><ThemeReq>';
    g = g + "<Theme-Colors>";
    for (var b = 0; b < this.themeColors.length; b++) {
        var f = this.themeColors[b];
        if (f.fromValue == null || f.fromValue == "") {
            g = g + '<Theme-Color toValue="' + f.toValue + '" color="' + f.color + '"/>'
        } else {
            if (f.toValue == null || f.toValue == "") {
                g = g + '<Theme-Color fromValue="' + f.fromValue + '" color="' + f.color + '"/>'
            } else {
                g = g + '<Theme-Color fromValue="' + f.fromValue + '" toValue="' + f.toValue + '" color="' + f.color + '"/>'
            }
        }
    }
    g = g + "</Theme-Colors>";
    g = g + "<Points>";
    for (var b = 0; b < this.points.length; b++) {
        var c = this.points[b];
        g = g + '<Point x="' + c.x + '" y="' + c.y + '" value="' + c.value + '"/>'
    }
    g = g + "</Points>";
    g = g + '<Option affectRadius="' + this.options.affectRadius + '" outerNum="' + this.options.outerNum + '"></Option>';
    g = g + '<imgRes minx="' + h.minX + '" miny="' + h.minY + '" maxx="' + h.maxX + '" maxy="' + h.maxY + '" width="' + d.width + '" height="' + d.height + '" /></ThemeReq>';
    var g = this.baseURL + "xml=" + g;
    return g
};
function TrackMonitor(b) {
    this.routeArray = b;
    this.length = b.length;
    this.index = 0;
    this.interval = 1
}
TrackMonitor.prototype.reset = function() {
    this.index = 0
};
TrackMonitor.prototype.next = function() {
    if (this.interval != 1) {
        if ((this.index + this.interval) < this.length) {
            this.index += this.interval
        } else {
            this.index = this.length
        }
    } else {
        this.index++
    }
    return this.routeArray[this.index - 1]
};
TrackMonitor.prototype.prev = function() {
    this.index--;
    return this.routeArray[this.index - 1]
};
function V(b) {
    this.stylesheet = b
}
V.prototype.transformToHTML = function(b, c) {
    var d = "";
    c.className = "InfoClass";
    if (typeof Monitor != "undefined" && b instanceof Monitor) {
        d = b.toHTML();
        c.innerHTML = d
    } else {
        if (typeof b == "string") {
            d = b;
            c.innerHTML = d
        } else {
            if (typeof b == "object") {
                RemoveChildren(c);
                c.appendChild(b)
            } else {
                alert("��֪����")
            }
        }
    }
};
function voidFunc(b) {
    return null
}
function xa(b, c) {
    this.id = b;
    this.ticketClass = c
}
xa.prototype.isValid = function() {
    return sb[this.ticketClass] == this.id
};
function XMLHttp() {}
var qg = new Rect(0, 0);
var Ri = new Rect(0, 0);
function MainFrame(l, g, d, b, j, h, c, f) {
    this.mapSrcURL = EzServerClient.GlobeParams.MapSrcURL.Clone();
    this.bInfoHasOpen = false;
    this.bInfoHasCloseClick = false;
    this.currentMapScale = "";
    this.bThematicOverlay = false;
    this.bThematicOverlayCP03 = false;
    this.curThematicURL = "";
    this.curThematicURLCP03 = "";
    this.strThematicXML = "";
    this.strThematicProxyURL = "";
    this.bIsStreamOrText = false;
    if (!l) {
        return
    }
    this.ownerDocument = l.ownerDocument || document;
    this.bIsPaning = false;
    this.bIsMoving = false;
    this.bIsZooming = false;
    this.bIsDraging = false;
    this.bIsPlayRoute = false;
    this.bIsLog = false;
    this.container = l;
    this.disablePopups = j;
    this.disableDragging = h;
    g = new MapUnit();
    this.mapTypes = c;
    this.mouseLng = 0;
    this.mouseLat = 0;
    this.iBorderWidth = 0;
    this.iBorderHeight = 0;
    this.vectorMapService = _VectorMapService;
    this.satelliteMapService = _SatelliteMapService;
    this.vectorSateMapService = _VectorSateMapService;
    if (!this.mapTypes) {
        this.mapTypes = [g]
    }
    if (this.container != null) {
        this.container.style.backgroundColor = "white";
        this.container.unselectable = "on"
    }
    this.realZoomLevel = _InitLevel;
    this.zoomLevel = _InitLevel;
    this.mouseZoomLevel = this.realZoomLevel;
    this.ascendZoomLevel = EzServerClient.GlobeParams.MapMaxLevel - this.realZoomLevel;
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
    this.setSpecification(g);
    this.container.style.overflow = "hidden";
    if (this.container.style.position != "absolute") {
        this.container.style.position = "relative"
    }
    if (!d || !b) {
        d = this.container.offsetWidth;
        b = this.container.offsetHeight
    }
    this.viewSize = new Rect(d, b);
    BindingEvent(window, "blur", this.eventHandler("onWindowBlur"));
    BindingEvent(this.container, "contextmenu", _NoAction);
    BindingEvent(document.body, "select", _NoAction);
    this.div = this.createMapDiv();
    this.container.appendChild(this.div);
    if (!this.disablePopups) {
        this.infoWindow = new InfoWind(this.eventHandler("onInfoCloseClick"), this.div, 5000, 2000)
    }
    this.directionsDiv = document.createElement("div");
    this.directionsDiv.directionsBounds = new MBR( - _MaxNumber, -_MaxNumber, _MaxNumber, _MaxNumber);
    this.div.appendChild(this.directionsDiv);
    this.dragObject = new DragEvent(this.div, 0, 0);
    this.dragObject.ondrag = this.eventHandler("onDrag");
    this.dragObject.ondragstart = this.eventHandler("onDragStart");
    this.dragObject.ondragend = this.eventHandler("onDragEnd");
    this.dragObject.onclick = this.eventHandler("onClick");
    if (h) {
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
    if (EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
        this.zoomTo(this.realZoomLevel)
    }
}
MainFrame.prototype.enableDblClick = function() {
    BindingEvent(this.div, "dblclick", this.eventHandler("onDoubleClick"))
};
MainFrame.prototype.enableMouseScroll = function() {
    var b = this;
    BindingEvent(this.div, "mousewheel",
    function(c) {
        b.onMouseScroll(c);
        return false
    });
    BindingEvent(this.div, "DOMMouseScroll",
    function(c) {
        b.onMouseScroll(c);
        return false
    })
};
MainFrame.prototype.gotoCenter = function() {
    var b = _MapCenterPoint;
    this.centerAtLatLng(b)
};
MainFrame.prototype.fullExtent = function() {
    this.centerAtMBR(_FullExtentMBR[0], _FullExtentMBR[1], _FullExtentMBR[2], _FullExtentMBR[3])
};
MainFrame.prototype.init = function(j, b, c) {
    this.calculateTileMeasurements();
    var h = new Point(0, 0);
    var m = b - AnchorPoint.x;
    var k = j - AnchorPoint.y;
    h.x = Math.floor(m * _PixelsPerDegree[c].x);
    h.y = Math.floor(k * _PixelsPerDegree[c].y);
    this.centerBitmap = new Point(h.x, h.y);
    var d = h.x - Math.floor(this.container.offsetWidth / 2) - this.tilePaddingOffset.width;
    var l = h.y + Math.floor(this.container.offsetHeight / 2) + this.tilePaddingOffset.height;
    var f = Math.floor(d / _MapUnitPixels);
    var g = Math.floor(l / _MapUnitPixels);
    var o = f * this.spec.tileSize - d;
    var n = g * this.spec.tileSize - l;
    if (o < -this.tilePaddingOffset.width / 2) {
        f++;
        o += this.spec.tileSize
    } else {
        if (o > this.tilePaddingOffset.width / 2) {
            f--;
            o -= this.spec.tileSize
        }
    }
    if (n < -this.tilePaddingOffset.height / 2) {
        g++;
        n += this.spec.tileSize
    } else {
        if (n > this.tilePaddingOffset.height / 2) {
            g--;
            n -= this.spec.tileSize
        }
    }
    n = -n;
    this.topLeftTile = new Point(f, g);
    this.dragObject.moveTo(o, n)
};
MainFrame.prototype.createMapCenter = function(b) {
    if (typeof _bIsMapCenter == "undefined" || _bIsMapCenter == false) {
        return
    }
    this.mapCenter = document.createElement("img");
    b.appendChild(this.mapCenter);
    this.mapCenter.style.position = "absolute";
    this.mapCenter.src = _MapCenterUrl;
    this.mapCenter.style.left = convert2Px(this.viewSize.width / 2 - 8);
    this.mapCenter.style.top = convert2Px(this.viewSize.height / 2 - 8);
    this.mapCenter.style.zIndex = 850
};
MainFrame.prototype.displayCoord = function(c) {
    try {
        if (document.layers) {
            xCoord = c.x;
            yCoord = c.y
        } else {
            if (document.all) {
                xCoord = event.clientX;
                yCoord = event.clientY
            } else {
                if (document.getElementById) {
                    xCoord = c.clientX;
                    yCoord = c.clientY
                }
            }
        }
        if (this.containOffset) {
            xCoord = xCoord - this.containOffset.x;
            yCoord = yCoord - this.containOffset.y
        }
        xCoord = xCoord + window.document.body.scrollLeft;
        yCoord = yCoord + window.document.body.scrollTop;
        xCoord -= this.iBorderWidth;
        yCoord -= this.iBorderHeight;
        if (this.buttonTip != null) {
            this.buttonTip.style.top = yCoord + 10 + "px";
            this.buttonTip.style.left = xCoord + 10 + "px"
        }
        var b = this.getCenterLatLng();
        if (isNaN(this.realZoomLevel)) {
            return
        }
        this.mouseLng = b.x + (xCoord - this.viewSize.width / 2) / _PixelsPerDegree[this.realZoomLevel].x;
        this.mouseLat = b.y - (yCoord - this.viewSize.height / 2) / _PixelsPerDegree[this.realZoomLevel].y;
        this.mouseLng = Math.floor(this.mouseLng * 100000) / 100000;
        this.mouseLat = Math.floor(this.mouseLat * 100000) / 100000;
        if (_VMLInMap) {
            this.mouseX = Math.floor(this.mouseLng * 100000);
            this.mouseY = Math.floor(this.mouseLat * 100000)
        } else {
            this.mouseX = xCoord;
            this.mouseY = yCoord
        }
        window.status = "����:" + this.mouseLng + "," + this.mouseLat
    } catch(c) {
        alert("������Ϣ:" + c.message)
    }
};
MainFrame.prototype.centerAtMouse = function() {
    this.centerAtLatLng(new Point(this.mouseLng, this.mouseLat))
};
MainFrame.prototype.initDebug = function() {
    if (!_Debug) {
        return
    }
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
    this.mapBejingCenter.style.height = 16
};
MainFrame.prototype.createMapDiv = function() {
    var b = document.createElement("div");
    b.style.position = "absolute";
    b.style.top = convert2Px(0);
    b.style.left = convert2Px(0);
    b.style.zIndex = 0;
    b.style.backgroundColor = this.spec.backgroundColor;
    b.style.zoom = 1;
    return b
};
MainFrame.prototype.loadTileImages = function() {
    if ((bIsUsingDiv && this.spec.hasOverlay()) || this.bThematicOverlay) {
        this.loadTileImagesLayer(this.overlayImages, true)
    }
    this.loadTileImagesLayer(this.tileImages, false)
};
MainFrame.prototype.loadTileImagesLayer = function(j, c) {
    while (j.length > this.tableSize.width) {
        var d = j.pop();
        for (var b = 0; b < d.length; b++) {
            this.removeTileImage(d[b])
        }
    }
    for (var b = j.length; b < this.tableSize.width; b++) {
        j.push(new Array())
    }
    for (var b = 0; b < j.length; b++) {
        while (j[b].length > this.tableSize.height) {
            var h = j[b].pop();
            this.removeTileImage(h)
        }
        for (var g = j[b].length; g < this.tableSize.height; g++) {
            var h = null;
            if (bIsUsingDiv && c) {
                if (EzServerClient.GlobeParams.IEVersion == "IE6" || EzServerClient.GlobeParams.IEVersion == "IE5") {
                    h = divCreator.create(null, this.spec.tileSize, this.spec.tileSize, null, null, 1, null, this.ownerDocument);
                    h.id = "ezmap_overlay_div"
                } else {
                    h = Shaderer.create(null, this.spec.tileSize, this.spec.tileSize, null, null, 1, null, this.ownerDocument)
                }
            } else {
                h = Shaderer.create(null, this.spec.tileSize, this.spec.tileSize, null, null, 0, null, this.ownerDocument)
            }
            h.style.position = "absolute";
            if (!c && this.spec.hasOverlay() && bIsUsingDiv) {
                h.overlayImage = this.overlayImages[b][g]
            }
            if (c) {
                h.onerror = function() {
                    this.style.display = "none"
                }
            } else {
                h.onerror = function() {
                    this.style.display = "none";
                    if (this.overlayImage) {
                        this.overlayImage.style.display = "none"
                    }
                }
            }
            j[b].push(h);
            this.div.appendChild(h);
            this.configureImage(h, b, g, c)
        }
    }
};
MainFrame.prototype.deleteTiles = function() {
    this.removeTilesFromDiv(this.tileImages);
    this.tileImages = null;
    if (this.overlayImages) {
        this.removeTilesFromDiv(this.overlayImages);
        this.overlayImages = null
    }
};
MainFrame.prototype.removeTilesFromDiv = function(f) {
    if (f) {
        for (var d = 0; d < f.length; d++) {
            if (f[d]) {
                for (var g = 0; g < f[d].length; g++) {
                    this.removeTileImage(f[d][g])
                }
            }
        }
    }
};
MainFrame.prototype.removeTileImage = function(b) {
    divCreator.remove(b, this.ownerDocument);
    if (b.errorTile) {
        p.remove(b.errorTile, this.ownerDocument);
        b.errorTile = null
    }
    b.onerror = null
};
MainFrame.prototype.initializeMap = function() {
    this.deleteTiles();
    this.tileImages = new Array();
    this.overlayImages = new Array();
    this.calculateTileMeasurements();
    this.loadTileImages()
};
MainFrame.prototype.getSpanLatLng = function(c) {
    if (!c) {
        c = new Rect(0, 0)
    }
    var b = this.spec.getLatLng(this.centerBitmap.x - this.viewSize.width / 2, this.centerBitmap.y - this.viewSize.height / 2, this.realZoomLevel);
    var d = this.spec.getLatLng(this.centerBitmap.x + this.viewSize.width / 2, this.centerBitmap.y + this.viewSize.height / 2, this.realZoomLevel);
    c.width = Math.abs(d.x - b.x);
    c.height = Math.abs(d.y - b.y);
    return c
};
MainFrame.prototype.getBoundsBitmap = function(b) {
    if (!b) {
        b = new MBR(0, 0, 0, 0)
    }
    b.minX = this.centerBitmap.x - this.viewSize.width / 2;
    b.minY = this.centerBitmap.y - this.viewSize.height / 2;
    b.maxX = this.centerBitmap.x + this.viewSize.width / 2;
    b.maxY = this.centerBitmap.y + this.viewSize.height / 2;
    return b
};
MainFrame.prototype.getBoundsLatLng = function(c) {
    c = this.getBoundsBitmap(c);
    var b = this.spec.getLatLng(c.minX, c.minY, this.realZoomLevel);
    var d = this.spec.getLatLng(c.maxX, c.maxY, this.realZoomLevel);
    c.minX = b.x;
    c.maxX = d.x;
    c.minY = Math.min(d.y, b.y);
    c.maxY = Math.max(d.y, b.y);
    return c
};
MainFrame.prototype.getPixelSpan = function() {
    var c = this.getBoundsLatLng();
    var b = c.getSpanX() / this.viewSize.width;
    return b
};
MainFrame.prototype.calculateTileMeasurements = function() {
    var c = Math.ceil(this.viewSize.width / this.spec.tileSize) + 2;
    var b = Math.ceil(this.viewSize.height / this.spec.tileSize) + 2;
    this.tableSize.width = c;
    this.tableSize.height = b;
    var d = Math.floor((this.tableSize.width * this.spec.tileSize - this.viewSize.width) / 2);
    var f = Math.floor((this.tableSize.height * this.spec.tileSize - this.viewSize.height) / 2);
    this.tilePaddingOffset.width = d;
    this.tilePaddingOffset.height = f
};
MainFrame.prototype.isLoaded = function() {
    return this.topLeftTile != null
};
MainFrame.prototype.configureImage = function(h, l, j, c) {
    if (typeof j == "undefined" || j == null) {
        return
    }
    var g = (this.currentPanOffset.width + l) * this.spec.tileSize;
    var m = (this.currentPanOffset.height + j) * this.spec.tileSize;
    var d = -this.tilePaddingOffset.width + g;
    var k = -this.tilePaddingOffset.height + m;
    if (h.tileLeft != d || h.tileTop != k) {
        h.style.left = convert2Px(d);
        h.style.top = convert2Px(k);
        h.tileLeft = d;
        h.tileTop = k
    }
    if (!this.isLoaded()) {
        if (!c) {
            h.src = this.spec.emptyTileURL
        }
    } else {
        var b = "";
        if (c) {
            divCreator.clearImage(h, this.spec.emptyTileURL);
            if (this.bThematicOverlay) {
                if (this.bThematicOverlayCP03) {
                    this.spec.setThematicTileURLCP03(h, this.topLeftTile.x + l, this.topLeftTile.y - j, this.realZoomLevel, this.curThematicURLCP03, this.strThematicXML, false, this.strThematicProxyURL)
                } else {
                    this.spec.setThematicTileURL(h, this.topLeftTile.x + l, this.topLeftTile.y - j, this.realZoomLevel, this.curThematicURL, this.bIsStreamOrText, this.strThematicProxyURL)
                }
            } else {
                b = this.spec.getOverlayURL(this.topLeftTile.x + l, this.topLeftTile.y - j, this.realZoomLevel);
                if (h.src != b) {
                    divCreator.setImage(h, b)
                }
            }
        } else {
            b = this.spec.getTileURL(this.topLeftTile.x + l, this.topLeftTile.y - j, this.realZoomLevel);
            if (h.src != b) {
                h.src = b;
                h.style.display = "";
                if (h.overlayImage) {
                    h.overlayImage.style.display = ""
                }
            }
        }
    }
    if (typeof(h.galleryimg) == "undefined" || h.galleryimg != "no") {
        h.galleryimg = "no"
    }
};
MainFrame.prototype.onDrag = function() {
    this.bIsDraging = true;
    if (!this.topLeftTile) {
        return
    }
    this.onMove();
    this.rotateTiles();
    this.bIsDraging = false;
    var d = new Point(this.getMouseMapX(), this.getMouseMapY());
    var b = new EzEventListener(this, EzEvent.MAP_PAN);
    var c = {
        mapPoint: d,
        screenPoint: this.mapCoord2container(d),
        eventType: "mappan"
    };
    EzEvent.trigger(b, c)
};
MainFrame.prototype.bIsMapMoving = function() {
    return this.bIsPaning || this.bIsMoving || this.bIsDraging || this.dragObject.bIsMouseDown
};
MainFrame.prototype.rotateTiles = function() {
    var b = this.getCurrentOffset(Ri);
    if (Math.abs(this.dragObject.left) > 10000000 || Math.abs(this.dragObject.top) > 10000000) {
        this.cancelPan();
        this.centerAtBitmap(this.centerBitmap);
        return
    }
    while (b.width < -this.tilePaddingOffset.width / 2) {
        this.rotateRight(this.tileImages, false);
        if ((this.spec.hasOverlay() && this.name == _mapName) || this.bThematicOverlay) {
            this.rotateRight(this.overlayImages, true, "overlay")
        }
        this.getCurrentOffset(b)
    }
    while (b.width > this.tilePaddingOffset.width / 2) {
        this.rotateLeft(this.tileImages, false);
        if ((this.spec.hasOverlay() && this.name == _mapName) || this.bThematicOverlay) {
            this.rotateLeft(this.overlayImages, true, "overlay")
        }
        this.getCurrentOffset(b)
    }
    while (b.height < -this.tilePaddingOffset.height / 2) {
        this.rotateDown(this.tileImages, false);
        if ((this.spec.hasOverlay() && this.name == _mapName) || this.bThematicOverlay) {
            this.rotateDown(this.overlayImages, true, "overlay")
        }
        this.getCurrentOffset(b)
    }
    while (b.height > this.tilePaddingOffset.height / 2) {
        this.rotateUp(this.tileImages, false);
        if ((this.spec.hasOverlay() && this.name == _mapName) || this.bThematicOverlay) {
            this.rotateUp(this.overlayImages, true, "overlay")
        }
        this.getCurrentOffset(b)
    }
};
MainFrame.prototype.rotateLeft = function(h, g, f) {
    try {
        if (!g) {
            this.currentPanOffset.width--;
            this.topLeftTile.x--
        }
        var l = h.pop();
        if (l) {
            h.unshift(l);
            for (var k = 0; k < l.length; k++) {
                this.configureImage(l[k], 0, k, g)
            }
        }
    } catch(j) {
        window.status = this.name + ":" + f + ":" + j.message
    }
};
MainFrame.prototype.rotateRight = function(h, g, f) {
    try {
        if (!g) {
            this.currentPanOffset.width++;
            this.topLeftTile.x++
        }
        var l = h.shift();
        h.push(l);
        var k = h.length - 1;
        for (var j = 0; j < l.length; j++) {
            this.configureImage(l[j], k, j, g)
        }
    } catch(j) {
        window.status = this.name + ":" + f + ":" + j.message
    }
};
MainFrame.prototype.rotateUp = function(h, g, f) {
    try {
        if (!g) {
            this.currentPanOffset.height--;
            this.topLeftTile.y++
        }
        for (var l = 0; l < h.length; l++) {
            var k = h[l].pop();
            h[l].unshift(k);
            this.configureImage(k, l, 0, g)
        }
    } catch(j) {
        window.status = this.name + ":" + f + ":" + j.message
    }
};
MainFrame.prototype.rotateDown = function(h, g, f) {
    try {
        if (!g) {
            this.currentPanOffset.height++;
            this.topLeftTile.y--
        }
        var l = h[0].length - 1;
        for (var k = 0; k < h.length; k++) {
            var j = h[k].shift();
            h[k].push(j);
            this.configureImage(j, k, l, g)
        }
    } catch(j) {
        window.status = this.name + ":" + f + ":" + j.message
    }
};
MainFrame.prototype.onDragStart = function(c) {
    this.saveStartPoint = this.getCenterLatLng();
    if (this.onmousedown) {
        this.onmousedown(c)
    }
    var g = new Point(this.getMouseMapX(), this.getMouseMapY());
    var d = new EzEventListener(this, EzEvent.MAP_PANSTART);
    var f = {
        mapPoint: g,
        screenPoint: this.mapCoord2container(g),
        eventType: "mappanstart"
    };
    EzEvent.trigger(d, f)
};
MainFrame.prototype.draw = function(c) {
    alert("start..")
};
MainFrame.prototype.drawMouseDown = function(c) {
    var d = new Point(this.mouseLng, this.mouseLat);
    if (event.button == 1) {
        if (this.drawMode == "drawPoint") {
            if (this.outputPanel2) {
                if (this.outputPanel && typeof this.outputPanel.value != "undefined") {
                    this.outputPanel.value = this.mouseLng
                }
                if (typeof this.outputPanel2.value != "undefined") {
                    this.outputPanel2.value = this.mouseLat
                }
            } else {
                if (this.outputPanel && typeof this.outputPanel.value != "undefined") {
                    this.outputPanel.value = this.mouseLng + "," + this.mouseLat
                }
            }
            var f = this.getDivCoord(this.mouseLng, this.mouseLat);
            this.pointImg.lon = this.mouseLng;
            this.pointImg.lat = this.mouseLat;
            this.pointImg.style.left = convert2Px(f.x - 8);
            this.pointImg.style.top = convert2Px(f.y - 8);
            this.changeDragMode("pan");
            if (_callback != null) {
                _callback(this.mouseLng + "," + this.mouseLat)
            }
            return
        }
        if (this.vmlDraw == null) {
            this.pathPoint = new Array();
            this.drawStart();
            this.bEndDraw = false
        }
        if (this.vmlDraw && (this.drawMode == "measure" || this.drawMode == "drawPolyline")) {
            this.pathPoint.push(d);
            this.vmlDraw.points.push(d);
            this.vmlDraw.redraw();
            if (this.outputPanel && typeof this.outputPanel.value != "undefined") {
                if (this.pathPoint.length < 2) {
                    this.outputPanel.value = this.pathPoint.toString() + "," + this.pathPoint.toString()
                } else {
                    this.outputPanel.value = this.pathPoint.toString()
                }
            }
        } else {
            if (this.vmlDraw && this.drawMode == "drawPolygon") {
                var f = this.vmlDraw.points.pop();
                this.vmlDraw.points.push(d);
                this.pathPoint.push(d);
                this.vmlDraw.points.push(f);
                this.vmlDraw.redraw();
                if (this.outputPanel && typeof this.outputPanel.value != "undefined") {
                    if (this.pathPoint.length == 1) {
                        this.outputPanel.value = this.pathPoint.toString() + "," + this.pathPoint.toString() + "," + this.pathPoint.toString()
                    } else {
                        this.outputPanel.value = this.pathPoint.toString() + "," + this.pathPoint[0].toString()
                    }
                }
            }
        }
    } else {
        if (event.button == 2) {
            this.bEndDraw = true;
            if (this.drawMode == "drawPolyline" || this.drawMode == "drawPolygon") {
                var g = "";
                if (this.outputPanel && typeof this.outputPanel.value != "undefined") {
                    g = this.outputPanel.value
                }
                this.changeDragMode("pan");
                if (_callback != null) {
                    _callback(g)
                }
                if (this.vmlDashline != null) {
                    this.removeOverlay(this.vmlDashline);
                    this.vmlDashline = null
                }
            }
        }
    }
};
MainFrame.prototype.drawMouseUp = function(c) {
    alert("up")
};
g_LineColor = "#157CC4";
g_FillColor = "#94DBFF";
MainFrame.prototype.drawStart = function(c) {
    this.startPointLng = this.mouseLng;
    this.startPointLat = this.mouseLat;
    this.bDrawEnd = false;
    this.startPointX = this.mouseX;
    this.startPointY = this.mouseY;
    var g = 1;
    var f = 0.5;
    if (this.vmlDraw && this.vmlDraw != null) {
        this.removeOverlay(this.vmlDraw);
        this.vmlDraw = null
    }
    var h = null;
    var d = "";
    d = this.startPointLng + "," + this.startPointLat;
    if (this.drawMode == "drawRect") {
        h = Rectangle;
        d += "," + d
    } else {
        if (this.drawMode == "drawCircle") {
            h = Circle;
            d = d + ",0"
        } else {
            if (this.drawMode == "drawPolyline" || this.drawMode == "measure") {
                g = 4;
                if (this.buttonTip != null && this.buttonTip.style.display != "") {
                    this.buttonTip.style.display = ""
                }
                h = Polyline;
                d += "," + d
            } else {
                if (this.drawMode == "drawPolygon") {
                    g = 4;
                    if (this.buttonTip != null && this.buttonTip.style.display != "") {
                        this.buttonTip.style.display = ""
                    }
                    h = Polygon;
                    d += "," + d + "," + d
                } else {
                    if (this.drawMode == "drawPoint") {}
                }
            }
        }
    }
    this.vmlDraw = new h(d, g_LineColor, g, f, g_FillColor);
    this.addOverlay(this.vmlDraw)
};
MainFrame.prototype.drawMove = function(c) {
    if (this.bDrawEnd) {
        return
    }
    if (!this.vmlDraw) {
        return
    }
    if (this.drawMode == "drawRect") {
        this.vmlDraw.points[1].x = this.mouseLng;
        this.vmlDraw.points[1].y = this.mouseLat
    } else {
        if (this.drawMode == "drawCircle") {
            this.mouseLng + "," + this.mouseLat;
            var f = (this.mouseLng - this.startPointLng) * (this.mouseLng - this.startPointLng) + (this.mouseLat - this.startPointLat) * (this.mouseLat - this.startPointLat);
            this.vmlDraw.radius = Math.sqrt(f)
        } else {
            if (this.drawMode == "drawPolyline") {
                var d = this.vmlDraw.points[this.vmlDraw.points.length - 1].toString() + "," + this.mouseLng + "," + this.mouseLat;
                if (typeof this.vmlDashline == "undefined" || this.vmlDashline == null) {
                    var g = new Polyline(d, "#ff0000", 5, 0.7, 0);
                    g.setColor(g_LineColor);
                    g.setDashStyle("shortdot");
                    this.addOverlay(g);
                    this.vmlDashline = g
                } else {
                    this.vmlDashline.points.clear();
                    this.vmlDashline.points.push(this.vmlDraw.points[this.vmlDraw.points.length - 1]);
                    this.vmlDashline.points.push(new Point(this.mouseLng, this.mouseLat));
                    this.vmlDashline.redraw()
                }
            } else {
                if (this.drawMode == "drawPolygon") {
                    var d = this.vmlDraw.points[0].toString() + "," + this.mouseLng + "," + this.mouseLat + "," + this.vmlDraw.points[this.vmlDraw.points.length - 2].toString() + "," + this.vmlDraw.points[0].toString();
                    if (typeof this.vmlDashline == "undefined" || this.vmlDashline == null) {
                        var g = new Polygon(d, "#ff0000", 5, 0.7, 0);
                        g.setOpacity(0.2);
                        g.setColor(g_LineColor);
                        g.setFillColor(g_FillColor);
                        g.setDashStyle("shortdot");
                        this.addOverlay(g);
                        this.vmlDashline = g
                    } else {
                        this.vmlDashline.points.clear();
                        this.vmlDashline.points.push(this.vmlDraw.points[0]);
                        this.vmlDashline.points.push(new Point(this.mouseLng, this.mouseLat));
                        this.vmlDashline.points.push(this.vmlDraw.points[this.vmlDraw.points.length - 2]);
                        this.vmlDashline.points.push(this.vmlDraw.points[0]);
                        this.vmlDashline.redraw()
                    }
                }
            }
        }
    }
    this.vmlDraw.redraw()
};
MainFrame.prototype.drawEnd = function(d) {
    if (this.outputPanel) {
        if (this.drawMode == "drawRect") {
            var g = Math.min(this.startPointLng, this.mouseLng);
            var c = Math.max(this.startPointLng, this.mouseLng);
            var f = Math.min(this.startPointLat, this.mouseLat);
            var k = Math.max(this.startPointLat, this.mouseLat);
            var h = g + "," + f + "," + c + "," + k;
            if (typeof this.outputPanel.value != "undefined") {
                this.outputPanel.value = h
            }
        } else {
            if (this.drawMode == "drawCircle") {
                var j = Math.sqrt((this.startPointLng - this.mouseLng) * (this.startPointLng - this.mouseLng) + (this.startPointLat - this.mouseLat) * (this.startPointLat - this.mouseLat));
                var h = this.startPointLng + "," + this.startPointLat + "," + j;
                if (typeof this.outputPanel.value != "undefined") {
                    this.outputPanel.value = h
                }
            }
        }
    }
    this.bDrawEnd = true;
    if ((this.drawMode == "drawRect" || this.drawMode == "drawCircle")) {
        if (_callback) {
            _callback(this.outputPanel.value)
        }
        if (this.bIsPan) {
            this.changeDragMode("pan")
        }
    }
};
MainFrame.prototype.onDragEnd = function(c) {
    if (this.bIsOutOfBorder() == true) {
        this.centerAtLatLng(this.saveStartPoint)
    }
    this.onStateChanged("onDragEnd");
    var g = new Point(this.getMouseMapX(), this.getMouseMapY());
    var d = new EzEventListener(this, EzEvent.MAP_PANEND);
    var f = {
        mapPoint: g,
        screenPoint: this.mapCoord2container(g),
        eventType: "mappanend"
    };
    EzEvent.trigger(d, f)
};
MainFrame.prototype.onDoubleClick = function(c) {
    if (this.disableDragging) {
        return
    }
    var f = this.getRelativeClickPoint(c, this.container);
    var d = Math.floor(this.viewSize.width / 2) - f.x;
    var g = -(Math.floor(this.viewSize.height / 2) - f.y);
    this.pan(d, g)
};
MainFrame.prototype.onClick = function(c) {
    document.focus()
};
MainFrame.prototype.getRelativeClickPoint = function(c, j, g) {
    if (!g) {
        g = new Point()
    }
    if (typeof c.offsetX != "undefined") {
        var h = c.target || c.srcElement;
        var f = Tg(h, j);
        g.x = c.offsetX + f.x;
        g.y = c.offsetY + f.y
    } else {
        if (typeof c.pageX != "undefined") {
            var d = ObjectOffset(j);
            g.x = c.pageX - d.x;
            g.y = c.pageY - d.y
        } else {
            EzLog.incompatible("dblclick")
        }
    }
    return g
};
MainFrame.prototype.sortImagesFromCenter = function(j) {
    var h = [];
    for (var o = 0; o < j.length; o++) {
        for (var n = 0; n < j[o].length; n++) {
            var m = j[o][n];
            m.coordX = o;
            m.coordY = n;
            var l = Math.min(o, j.length - o - 1);
            var k = Math.min(n, j[o].length - n - 1);
            if (l == 0 || k == 0) {
                m.priority = 0
            } else {
                m.priority = l + k
            }
            h.push(m)
        }
    }
    h.sort(MainFrame.sortByPriority);
    return h
};
MainFrame.prototype.reconfigureImage = function(d, c) {
    if (_IEBrowser.type == 1) {
        this.div.removeChild(d);
        this.configureImage(d, d.coordX, d.coordY, c);
        this.div.appendChild(d)
    } else {
        this.configureImage(d, d.coordX, d.coordY, c)
    }
};
MainFrame.prototype.reconfigureAllImages = function() {
    if (this.tileImages.length == 0) {
        return
    }
    var g = this.sortImagesFromCenter(this.tileImages);
    if ((bIsUsingDiv && this.spec.hasOverlay()) || this.bThematicOverlay) {
        var f = this.sortImagesFromCenter(this.overlayImages)
    } else {
        var f = []
    }
    var j = Math.max(g.length, f.length);
    for (var h = 0; h < j; h++) {
        if (h < g.length) {
            this.reconfigureImage(g[h], false)
        }
        if (h < f.length) {
            this.reconfigureImage(f[h], true)
        }
    }
};
MainFrame.prototype.pan = function(d, b) {
    this.bIsPaning = true;
    if (!this.topLeftTile) {
        return
    }
    var c = Math.sqrt(d * d + b * b);
    var f = Math.max(10, Math.floor(c / 20));
    this.panSiner = new nc(f);
    this.panSiner.reset();
    this.panDistance.width = d;
    this.panDistance.height = b;
    this.panStart = new Point(this.dragObject.left, this.dragObject.top);
    this.doPan();
    this.bIsPaning = false
};
MainFrame.prototype.doPan = function() {
    var b = this.panSiner.next();
    if (this.bIsOutOfBorder()) {
        this.centerAtLatLng(this.saveStartPoint);
        return
    }
    this.dragObject.moveTo(this.panStart.x + this.panDistance.width * b, this.panStart.y - this.panDistance.height * b);
    this.onMove();
    if (this.panSiner.more()) {
        this.panTimeout = this.setTimeout("this.doPan()", 10);
        this.rotateTiles()
    } else {
        this.panTimeout = null;
        this.onStateChanged("doPan")
    }
};
MainFrame.prototype.bIsOutOfBorder = function(d) {
    var f = false;
    if (typeof _BorderArray == "undefined" || typeof MapBorder == "undefined") {
        return f
    }
    if (typeof this.centerLatLng == "undefined" || this.centerLatLng == null) {
        return f
    }
    var b = this.centerLatLng.x;
    var h = this.centerLatLng.y;
    var c = null;
    if (typeof d != "undefined") {
        c = d
    } else {
        c = this.realZoomLevel
    }
    var g = _BorderArray[c];
    if (!g) {
        return f
    }
    if (b < g.minx || b > g.maxx || h < g.miny || h > g.maxy) {
        alert("�Բ���,������Ұ��Χ!");
        f = true
    } else {
        this.saveStartPoint = this.getCenterLatLng()
    }
    return f
};
MainFrame.prototype.getMinLevelBorder = function(b) {
    return this.realZoomLevel
};
MainFrame.prototype.cancelPan = function() {
    if (this.panTimeout) {
        clearTimeout(this.panTimeout)
    }
};
MainFrame.prototype.recenterOrPanToLatLng = function(b) {
    if (!this.topLeftTile) {
        return
    }
    this.centerLatLng = new Point(b.x, b.y);
    this.lastLatLng = this.centerLatLng;
    var b = this.spec.getBitmapCoordinate(this.centerLatLng.y, this.centerLatLng.x, this.realZoomLevel);
    this.recenterOrPanToBitmap(b)
};
MainFrame.prototype.recenterOrPanToBitmap = function(c) {
    if (!this.topLeftTile) {
        return
    }
    var b = this.centerBitmap.x - c.x;
    var d = this.centerBitmap.y - c.y;
    if (b == 0 && d == 0) {
        return
    }
    if (Math.abs(b) < this.viewSize.width && Math.abs(d) < this.viewSize.height) {
        this.pan(b, d);
        return
    }
    this.centerAtBitmap(c)
};
MainFrame.prototype.addStateListener = function(b) {
    if (!this.stateListeners) {
        this.stateListeners = new Array()
    }
    this.stateListeners.push(b)
};
MainFrame.prototype.getZoomLevel = function() {
    if (EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
        return this.ascendZoomLevel
    } else {
        return this.realZoomLevel
    }
};
MainFrame.prototype.centerAndZoom = function(n, f) {
    if (f > EzServerClient.GlobeParams.MapMaxLevel) {
        return
    }
    var h = f;
    if (EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
        f = EzServerClient.GlobeParams.MapMaxLevel - h
    }
    var c = this.getZoomLevel();
    var m = new EzEventListener(this, EzEvent.MAP_ZOOMSTART);
    var d = {
        zoom: c,
        extent: this.getBoundsLatLng(),
        eventType: "mapzoomstart"
    };
    EzEvent.trigger(m, d);
    var g = false;
    if (f != this.realZoomLevel) {
        var j = this.realZoomLevel;
        this.realZoomLevel = f;
        this.mouseZoomLevel = this.realZoomLevel;
        this.ascendZoomLevel = h;
        this.zoomLevel = h;
        g = true
    }
    this.centerAtLatLng(n);
    if (g && this.onzoom) {
        this.onzoom(j, this.realZoomLevel);
        var l = new EzEventListener(this, EzEvent.MAP_ZOOMCHANGE);
        var b = {
            zoomPrevious: c,
            zoom: this.getZoomLevel(),
            extent: this.getBoundsLatLng(),
            eventType: "mapzoomchange"
        };
        EzEvent.trigger(l, b)
    }
    var k = new EzEventListener(this, EzEvent.MAP_ZOOMEND);
    var o = {
        zoom: this.realZoomLevel,
        extent: this.getBoundsLatLng(),
        eventType: "mapzoomend"
    };
    EzEvent.trigger(k, o)
};
MainFrame.prototype.centerAtMBR = function(l, k, g, f) {
    for (var h = 0; h < arguments.length; h++) {
        if (typeof arguments[h] == "string") {
            arguments[h] = parseFloat(arguments[h])
        }
    }
    if (!l || !g || !k || !f) {
        return
    }
    var t = Math.min(l, g);
    var m = Math.max(l, g);
    var o = Math.min(k, f);
    var j = Math.max(k, f);
    var d;
    var r = new Point();
    if (t == m && o == j) {
        r.x = m;
        r.y = j;
        this.recenterOrPanToLatLng(r);
        return
    }
    r.x = (m + t) / 2;
    r.y = (j + o) / 2;
    d = this.getLevelOfMBR(l, k, g, f);
    if (d != this.getZoomLevel()) {
        this.centerAndZoom(r, d)
    } else {
        var q = new EzEventListener(this, EzEvent.MAP_ZOOMSTART);
        var c = {
            zoom: this.realZoomLevel,
            extent: this.getBoundsLatLng(),
            eventType: "mapzoomstart"
        };
        EzEvent.trigger(q, c);
        this.recenterOrPanToLatLng(r);
        var n = new EzEventListener(this, EzEvent.MAP_ZOOMEND);
        var b = {
            zoom: this.realZoomLevel,
            extent: this.getBoundsLatLng(),
            eventType: "mapzoomend"
        };
        EzEvent.trigger(n, b)
    }
    delete r
};
MainFrame.prototype.getLevelOfMBR = function(m, k, f, d) {
    for (var g = 0; g < arguments.length; g++) {
        if (typeof arguments[g] == "string") {
            arguments[g] = parseFloat(arguments[g])
        }
    }
    if (!m || !f || !k || !d) {
        return
    }
    var q = Math.min(m, f);
    var n = Math.max(m, f);
    var o = Math.min(k, d);
    var j = Math.max(k, d);
    var l = (n - q) / ((_m_MapBottomSpan / 3600) * (this.tableSize.width - 2));
    var h = (j - o) / ((_m_MapBottomSpan / 3600) * (this.tableSize.height - 2));
    var b = Math.max(l, h);
    var c = Math.round(Math.log(b) / Math.log(2));
    switch (EzServerClient.GlobeParams.ZoomLevelSequence) {
    case 0:
        break;
    case 1:
        c = 16 - c;
        break;
    case 2:
        c = 18 - c - 2 * EzServerClient.GlobeParams.ZoomOffset;
        break;
    case 3:
        c = EzServerClient.GlobeParams.MapMaxLevel - 18 + c + 2 * EzServerClient.GlobeParams.ZoomOffset;
        break
    }
    if (q == n || n == j) {
        c = this.realZoomLevel
    } else {
        if (c < 0) {
            c = 0
        }
    }
    if (c > this.spec.numZoomLevels - 1) {
        c = this.spec.numZoomLevels - 1
    }
    return c
};
MainFrame.prototype.centerAtLatLng = function(b) {
    this.centerLatLng = new Point(b.x, b.y);
    this.lastLatLng = this.centerLatLng;
    var b = this.spec.getBitmapCoordinate(this.centerLatLng.y, this.centerLatLng.x, this.realZoomLevel);
    if (this.midPointDiv) {
        RemoveChildren(this.midPointDiv);
        this.midPointDiv = null
    }
    this.centerAtBitmap(b)
};
MainFrame.prototype.centerAtBitmap = function(d) {
    this.centerBitmap.x = d.x;
    this.centerBitmap.y = d.y;
    var g = d.x - Math.floor(this.viewSize.width / 2) - this.tilePaddingOffset.width;
    var f = d.y + Math.floor(this.viewSize.height / 2) + this.tilePaddingOffset.height;
    var h = Math.floor(g / this.spec.tileSize);
    var k = Math.floor(f / this.spec.tileSize);
    var c = h * this.spec.tileSize - g;
    var b = k * this.spec.tileSize - f;
    if (c < -this.tilePaddingOffset.width / 2) {
        h++;
        c += this.spec.tileSize
    } else {
        if (c > this.tilePaddingOffset.width / 2) {
            h--;
            c -= this.spec.tileSize
        }
    }
    if (b < -this.tilePaddingOffset.height / 2) {
        k++;
        b += this.spec.tileSize
    } else {
        if (b > this.tilePaddingOffset.height / 2) {
            k--;
            b -= this.spec.tileSize
        }
    }
    b = -b;
    if (!this.topLeftTile) {
        this.topLeftTile = new Point(h, k);
        if (!this.stateMonitor) {
            this.stateMonitor = new MapStatusControl(this)
        }
    } else {
        this.topLeftTile.x = h;
        this.topLeftTile.y = k
    }
    if (!this.stateMonitor) {
        this.stateMonitor = new MapStatusControl(this)
    }
    this.currentPanOffset.width = 0;
    this.currentPanOffset.height = 0;
    this.reconfigureAllImages();
    this.repositionOverlays();
    this.dragObject.moveTo(c, b);
    this.onStateChanged("centerAtBitmap");
    this.onLevelChanged()
};
MainFrame.prototype.setCenter = function(f) {
    if (!f) {
        f = this.getCenterLatLng()
    }
    var d = this.getBoundsLatLng();
    var c = (f.x - d.minX) / d.getSpanX() * this.viewSize.width;
    var b = (f.y - d.minY) / d.getSpanY() * this.viewSize.height;
    this.dragObject.moveTo(c, b);
    this.rotateTiles()
};
MainFrame.prototype.getDivCoord = function(c, g) {
    var b = this;
    var f = this.spec.getBitmapCoordinate(g, c, this.realZoomLevel);
    var d = this.getDivCoordinate(f.x, f.y);
    delete f;
    return d
};
MainFrame.prototype.getDivCoordinate = function(c, k, g) {
    if (!g) {
        g = new Point(0, 0)
    }
    var f = this.getCurrentOffset(qg);
    var h = this.topLeftTile.x * this.spec.tileSize + this.tilePaddingOffset.width - f.width;
    var b = c - h;
    var d = this.topLeftTile.y * this.spec.tileSize - this.tilePaddingOffset.height + f.height;
    var j = d - k;
    g.x = b;
    g.y = j;
    delete f;
    return g
};
MainFrame.prototype.getCenterLatLng = function(c) {
    if (!c) {
        c = new Point(0, 0)
    }
    if (this.centerLatLng) {
        c.x = this.centerLatLng.x;
        c.y = this.centerLatLng.y;
        return c
    }
    if (this.lastLatLng) {
        var d = this.spec.getBitmapCoordinate(this.lastLatLng.y, this.lastLatLng.x, this.realZoomLevel);
        if (d.equals(this.centerBitmap)) {
            c.x = this.lastLatLng.x;
            c.y = this.lastLatLng.y;
            return c
        }
    }
    var b = this.spec.getLatLng(this.centerBitmap.x, this.centerBitmap.y, this.realZoomLevel);
    c.x = b.x;
    c.y = b.y;
    return c
};
MainFrame.prototype.onMove = function() {
    this.bIsMoving = true;
    this.centerLatLng = null;
    var c = this.getCurrentOffset(qg);
    var b = this.topLeftTile.x * this.spec.tileSize + Math.floor(this.viewSize.width / 2) + this.tilePaddingOffset.width - c.width;
    var d = (this.topLeftTile.y) * this.spec.tileSize - Math.floor(this.viewSize.height / 2) - this.tilePaddingOffset.height + c.height;
    this.centerBitmap.x = b;
    this.centerBitmap.y = d;
    this.centerLatLng = this.spec.getLatLng(this.centerBitmap.x, this.centerBitmap.y, this.realZoomLevel);
    if (this.onpan) {
        this.onpan(b, d)
    }
    this.bIsMoving = false
};
MainFrame.prototype.debug = function(h) {
    if (true || !_Debug) {
        return
    }
    getEleByID("LonLatSpan").value = "LonLatSpan:" + this.span;
    getEleByID("AnchorPoint").value = "AnchorPoint:" + AnchorPoint.x + "," + AnchorPoint.y;
    getEleByID("TileLonLat").value = "topLeftTile(x,y):" + this.topLeftTile.x + "," + this.topLeftTile.y;
    getEleByID("tilePaddingOffset").value = "tilePaddingOffset(width,height):" + this.tilePaddingOffset.width + "," + this.tilePaddingOffset.height;
    getEleByID("CurPanOffset").value = "currentPanOffset(width,height):" + this.currentPanOffset.width + "," + this.currentPanOffset.height;
    var b = this.getCurrentOffset(qg);
    getEleByID("divOffset").value = "divOffset(width,height):" + b.width + "," + b.height;
    var g = this.getSpanLatLng();
    getEleByID("LonLatSpan").value = "LonLatSpan(width,height):" + g.width + "," + g.height;
    var c = _PixelsPerDegree[this.realZoomLevel];
    getEleByID("UnitSpan").value = "UnitSpan(width,height):" + c.x + "," + c.y;
    var l = this.centerBitmap;
    if (l) {
        getEleByID("centerBitmap").value = "centerBitmap:(" + l.x + "," + l.y + ")"
    }
    var f = this.centerLatLng;
    if (f) {
        getEleByID("LonLatCenter").value = "Center at(Lon,Lat):" + f.x + "," + f.y;
        var d = "Col:" + Math.ceil(f.x / (3.515625 / 3600 * Math.pow(2, this.realZoomLevel))) + ",Row:" + Math.ceil(f.y / (3.515625 / 3600 * Math.pow(2, this.realZoomLevel)));
        getEleByID("centerUnit").value = "centerUnit:" + d;
        var k = this.centerBitmap;
        var m = this.getDivCoordinate(k.x, k.y);
        window.status = m.x + "," + m.y + ":" + this.div.style.left + "," + this.div.style.top;
        this.centerNaiv.style.left = convert2Px(m.x - 8);
        this.centerNaiv.style.top = convert2Px(m.y - 8);
        this.centerNaiv.title = "left,top:" + m.x + "," + m.y + "(" + (m.y - this.viewSize.height / 2) + "),Bit:" + k.x + "," + k.y;
        k = this.spec.getBitmapCoordinate(40.249454099999994, 116.4612375, this.realZoomLevel);
        m = this.getDivCoordinate(k.x, k.y);
        this.mapBejingCenter.style.left = convert2Px(m.x - 8);
        this.mapBejingCenter.style.top = convert2Px(m.y - 8)
    }
};
MainFrame.prototype.clearStateChanged = function(b) {
    this.stateListeners.clear()
};
_curentPoint = null;
_curentLevel = null;
_bIsLocked = false;
MainFrame.prototype.onStateChanged = function(g) {
    if (!this.topLeftTile) {
        return
    }
    if (!_bIsLocked) {
        _curentPoint = this.getCenterLatLng();
        _curentLevel = this.realZoomLevel
    }
    if (this.stateListeners) {
        for (var d = 0; d < this.stateListeners.length; d++) {
            try {
                this.stateListeners[d](this)
            } catch(c) {}
        }
    }
    this.debug("onStateChanged");
    var h = this.getBoundsLatLng();
    var f = "BOX:[" + h.toString() + "]";
    if (typeof g_user == "undefined") {
        g_user = "unkown user"
    }
    if (typeof g_IP == "undefined") {
        g_IP = document.location.hostname
    }
    if (this.bIsLog) {
        EzLog.write(f, g_user, g_IP)
    }
};
MainFrame.prototype.refreshInfoWindow = function() {
    if (this.infoWindow.isVisible()) {
        this.bIsInScreen = false;
        this.showInfoWindow(this.pWinInfo)
    }
};
MainFrame.prototype.hideInfoWind = function() {
    if (this.infoWindow.isVisible()) {
        this.infoWindow.hide()
    }
};
MainFrame.prototype.showInfoWind = function() {
    if (!this.infoWindow.isVisible()) {
        this.infoWindow.show()
    }
};
MainFrame.prototype.resizePointImg = function() {
    if (typeof this.pointImg == "undefined" || this.pointImg == null || true) {
        return
    }
    var b = this.getDivCoord(this.pointImg.lon, this.pointImg.lat);
    this.pointImg.style.left = convert2Px(b.x - 8);
    this.pointImg.style.top = convert2Px(b.y - 8)
};
MainFrame.prototype.createDrawPoint = function(b) {
    if (!b) {
        return
    }
    this.pointImg = document.createElement("img");
    this.pointImg.src = _pointImgURL;
    this.pointImg.style.height = convert2Px(16);
    this.pointImg.style.width = convert2Px(16);
    this.pointImg.style.display = "none";
    this.pointImg.style.position = "absolute";
    this.pointImg.style.zIndex = 1001;
    b.appendChild(this.pointImg)
};
MainFrame.prototype.showPointImg = function(b) {
    if (typeof b == "undefined" || b == true) {
        this.pointImg.style.display = ""
    } else {
        this.pointImg.style.display = "none"
    }
};
MainFrame.prototype.getPxOfDist = function(c) {
    var h = this.getBoundsLatLng();
    var d = new Point(h.minX, h.minY);
    var b = new Point(h.maxX, h.minY);
    var g = GetDistanceInLL(d, b);
    var f = c / g * this.viewSize.width;
    return f
};
MainFrame.prototype.refreshMapScale = function() {
    if (!this.scaleTxt) {
        return
    }
    var f = this.getBoundsLatLng();
    var l = new Point(f.minX, f.minY);
    var k = new Point(f.maxX, f.minY);
    var d = GetDistanceInLL(l, k);
    var b = this.realZoomLevel;
    var c = Math.ceil((this.viewSize.width * _m_scale_meter[b]) / d);
    var h = 0;
    if (EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 1) {
        while (c < 40 || c > 100) {
            if (c < 40) {
                b++
            } else {
                b--
            }
            c = Math.ceil((this.viewSize.width * _m_scale_meter[b]) / d);
            if (h > 3) {
                break
            }
            h++
        }
        var g = _m_scale_meter[b];
        this.scaleTxt.style.width = c + "px";
        this.currentMapScale = "1:" + 96 / EzServerClient.GlobeFunction.getBrowserDPI().x * EzServerClient.GlobeParams.DisplayScale_dpi96[18 - this.realZoomLevel - EzServerClient.GlobeParams.ZoomOffset];
        if (g >= 1000) {
            g = Math.floor(g / 100);
            g = g / 10;
            g = g + "����"
        } else {
            g = g + "��"
        }
        this.scaleRightTxt.innerHTML = g
    } else {
        var j = this.realZoomLevel + EzServerClient.GlobeParams.ZoomOffset;
        if (j >= EzServerClient.GlobeParams.DisplayScale_dpi96.length) {
            var m = j - EzServerClient.GlobeParams.DisplayScale_dpi96.length;
            this.currentMapScale = "1:" + 96 / EzServerClient.GlobeFunction.getBrowserDPI().x * (EzServerClient.GlobeParams.DisplayScale_dpi96[EzServerClient.GlobeParams.DisplayScale_dpi96.length - 1] / Math.pow(2, m + 1));
            this.scaleTxt.style.width = EzServerClient.GlobeParams.DisplayScale[EzServerClient.GlobeParams.DisplayScale.length - 1][1];
            this.scaleRightTxt.innerHTML = parseFloat(EzServerClient.GlobeParams.DisplayScale[EzServerClient.GlobeParams.DisplayScale.length - 1][0]) / Math.pow(2, m + 1) + "��"
        } else {
            if (j < 0) {
                var m = -j;
                this.currentMapScale = "1:" + 96 / EzServerClient.GlobeFunction.getBrowserDPI().x * (EzServerClient.GlobeParams.DisplayScale_dpi96[0] * Math.pow(2, m));
                this.scaleTxt.style.width = EzServerClient.GlobeParams.DisplayScale[0][1];
                this.scaleRightTxt.innerHTML = parseFloat(EzServerClient.GlobeParams.DisplayScale[0][0]) * Math.pow(2, m) + "����"
            } else {
                this.currentMapScale = "1:" + 96 / EzServerClient.GlobeFunction.getBrowserDPI().x * (EzServerClient.GlobeParams.DisplayScale_dpi96[j]);
                this.scaleTxt.style.width = EzServerClient.GlobeParams.DisplayScale[this.realZoomLevel + EzServerClient.GlobeParams.ZoomOffset][1];
                this.scaleRightTxt.innerHTML = EzServerClient.GlobeParams.DisplayScale[this.realZoomLevel + EzServerClient.GlobeParams.ZoomOffset][0]
            }
        }
    }
};
MainFrame.prototype.onLevelChanged = function() {
    this.refreshMapScale();
    this.resizePointImg();
    this.refreshInfoWindow()
};
MainFrame.prototype.onLevelChanged_old = function() {
    this.clearVMLContainer();
    var b = _m_MapBottomScale * Math.pow(2, this.realZoomLevel);
    this.scaleTxt.innerHTML = "1:" + b;
    var c = 2 * b / 100;
    if (c > 10000) {
        c = Math.floor(c / 100);
        c = c / 10;
        c = c + "km"
    } else {
        c = c + "m"
    }
    this.scaleRightTxt.innerHTML = c;
    this.resizePointImg();
    this.refreshInfoWindow()
};
MainFrame.prototype.onResize = function(c) {
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
            this.mapCenter.style.top = convert2Px(this.viewSize.height / 2 - 8)
        }
        var f = this.viewSize.width - 23;
        var h = this.viewSize.height;
        var g = parseInt(this.container.style.borderLeftWidth);
        var d = parseInt(this.container.style.borderTopWidth);
        if (!isNaN(g)) {
            this.iBorderWidth = g
        }
        if (!isNaN(d)) {
            this.iBorderHeight = d
        }
    }
    this.debug("onResize")
};
MainFrame.prototype.getCurrentOffset = function(b) {
    if (!b) {
        b = new Rect(0, 0)
    }
    b.width = this.dragObject.left + this.currentPanOffset.width * this.spec.tileSize;
    b.height = this.dragObject.top + this.currentPanOffset.height * this.spec.tileSize;
    return b
};
MainFrame.prototype.switchSpecification = function(c) {
    if (this.spec == c) {
        return
    }
    var b = this.spec;
    var d = this.getCenterLatLng();
    this.setSpecification(c);
    this.div.style.backgroundColor = this.spec.backgroundColor;
    if (b.tileSize != c.tileSize) {
        this.topLeftTile = null;
        this.initializeMap()
    }
    this.centerAtLatLng(d);
    if (this.onspecificationchange) {
        this.onspecificationchange(b, c)
    }
};
MainFrame.prototype.setSpecification = function(b) {
    this.spec = b;
    if (!b.emptyTilePreload) {
        var c = document.createElement("IMG");
        c.style.position = "absolute";
        c.style.visibility = "hidden";
        c.style.top = convert2Px( - 200);
        c.style.left = convert2Px( - 200);
        document.body.appendChild(c);
        b.emptyTilePreload = c
    }
    this.spec.emptyTilePreload.src = this.spec.emptyTileURL;
    if (_VectorMapService.length > 2) {
        this.spec.bIsOverlay = true
    }
};
MainFrame.prototype.zoomTo = function(b) {
    this.div.style.zoom = 1;
    if (typeof b == "string") {
        b = parseInt(b)
    }
    if (EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
        var c = this.ascendZoomLevel
    } else {
        if (EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
            var c = this.realZoomLevel
        }
    }
    if (c == b) {
        return
    }
    if (this.bIsOutOfBorder(b)) {
        this.onzoom();
        return
    }
    if (!this.topLeftTile) {
        return
    }
    if (b >= this.spec.numZoomLevels) {
        b = this.spec.numZoomLevels - 1
    } else {
        if (b < 0) {
            b = 0
        }
    }
    var d = this.getCenterLatLng();
    this.bIsZooming = true;
    this.centerAndZoom(d, b);
    this.bIsZooming = false;
    this.debug("zoomTo");
    this.refreshVMLGraphics()
};
MainFrame.prototype.toggleTileBorders = function() {
    if (this.tileImages) {
        for (var b = 0; b < this.tileImages.length; b++) {
            if (this.tileImages[b]) {
                for (var d = 0; d < this.tileImages[b].length; d++) {
                    var c = this.tileImages[b][d];
                    if (c.hasBorder) {
                        c.style.border = "0";
                        c.hasBorder = false
                    } else {
                        c.style.border = "1px solid black";
                        c.hasBorder = true
                    }
                }
            }
        }
    }
};
MainFrame.prototype.createLocalMarker = function(c) {
    var b = this.createLocationMarker(c.icon.image, c.icon.iconClass);
    var f = this;
    var d = c;
    b.mouseTarget.onmousedown = function(g) {
        return f.onIconMouseDown(d, g)
    };
    return b
};
var Pe = 0;
MainFrame.prototype.createLocationMarker = function(k, b) {
    var j = divCreator.create(k, b.width, b.height, 0, 0, 10, false, "noprint");
    var c = divCreator.create(Vi, b.width, b.height, 0, 0, 3000, false, "noprint");
    var n = divCreator.create(b.shadowURL, b.shadowWidth, b.height, 0, 0, 3, false, "noprint");
    var l = _IEBrowser.type == 2 ? "ff": "ie";
    var t = Shaderer.create(k.replace(/\.png$/, l + ".gif"), b.width, b.height, 0, 0, 10, false, "noscreen");
    var f = b.shadowURL.replace(/[^\/]*$/, "dithshadow.gif");
    var h = Shaderer.create(f, b.shadowWidth, b.height, 0, 0, 3, false, "noscreen");
    var o = null;
    var g = c;
    if (_IEBrowser.type == 2) {
        var m = "map" + Pe;
        Pe++;
        o = document.createElement("map");
        o.setAttribute("name", m);
        var q = document.createElement("area");
        q.setAttribute("shape", "poly");
        q.setAttribute("alt", "");
        q.setAttribute("coords", b.imageMapArray.join(","));
        q.setAttribute("href", "PolylineDrawer");
        g = q;
        o.appendChild(q);
        c.setAttribute("usemap", "#" + m)
    } else {
        setCursor(g, "pointer")
    }
    var d = new Marker(j, c, n, o, g);
    d.addLayer(t);
    if (_IEBrowser.type != 2) {
        d.addLayer(h)
    }
    d.appendTo(this.div);
    return d
};
MainFrame.prototype.clearOverlays = function(c) {
    if (typeof c == "undefined") {
        c = false
    }
    var f = new Array();
    this.lastPageCenter = this.getCenterLatLng();
    this.lastPageZoom = this.realZoomLevel;
    for (var b = 0; b < this.overlays.length; b++) {
        var d = this.overlays[b];
        if (!c && d.bDisRemovable) {
            f.push(d)
        } else {
            d.removeFromDiv();
            delete d
        }
    }
    this.closeInfoWindow();
    this.overlays.clear();
    this.overlays = f
};
MainFrame.prototype.removeOverlaysOutOfMBR = function(g) {
    var d = [];
    for (var f = 0; f < this.overlays.length; f++) {
        if (!g.containsPoint(this.overlays.point)) {
            a.removeFromDiv()
        } else {
            d.push(this.overlays[f])
        }
    }
    if (this.overlays.length != d.length) {
        this.overlays = d
    }
    if (this.infoWindow.isVisible()) {
        this.closeInfoWindow()
    }
};
MainFrame.prototype.removeOverlaysOfMBR = function(g) {
    var d = [];
    for (var f = 0; f < this.overlays.length; f++) {
        if (g.containsPoint(this.overlays.point)) {
            a.removeFromDiv()
        } else {
            d.push(this.overlays[f])
        }
    }
    if (this.overlays.length != d.length) {
        this.overlays = d
    }
    if (this.infoWindow.isVisible()) {
        this.closeInfoWindow()
    }
};
MainFrame.prototype.removeOverlay = function(g, f) {
    if (!g) {
        return
    }
    if (typeof f == "undefined") {
        f = false
    }
    if (!f && g.bDisRemovable) {
        return
    }
    var d = [];
    for (var h = 0; h < this.overlays.length; h++) {
        if (this.overlays[h] == g) {
            g.removeFromDiv()
        } else {
            d.push(this.overlays[h])
        }
    }
    if (this.overlays.length != d.length) {
        this.overlays = d
    }
};
MainFrame.prototype.addOverlay = function(b, c) {
    if (!b) {
        return
    }
    if (c) {
        b.bDisRemovable = c
    } else {
        b.bDisRemovable = false
    }
    this.overlays.push(b);
    if (b instanceof iOverLay) {
        b.createDiv(this)
    } else {
        if (typeof Monitor != "undefined" && b instanceof Monitor) {
            b.createDiv(this)
        }
    }
};
MainFrame.prototype.addOverlayOutOfMBR = function(c, b) {
    if (!b.containsPoint(c.point)) {
        this.addOverlay(c)
    }
};
MainFrame.prototype.repositionOverlays = function() {
    for (var b = 0; b < this.overlays.length; b++) {
        var c = this.overlays[b];
        if (c instanceof iOverLay) {
            c.redraw()
        } else {
            if (typeof Monitor != "undefined" && c instanceof Monitor) {
                c.redraw()
            }
        }
    }
};
MainFrame.prototype.blowupOverlay = function(d) {
    for (var b = 0; b < this.overlays.length; b++) {
        var c = this.overlays[b];
        if (c instanceof Title || c instanceof Marker || c instanceof Polyline || c instanceof Polygon || (typeof Monitor != "undefined" && c instanceof Monitor)) {
            c.setZIndex(c.iZIndex)
        }
    }
    d.setZIndex(d.iZIndex + 1)
};
MainFrame.prototype.setMarkerPosition = function(f, g, c) {
    alert("setMarkerPosition");
    var h = this.spec.getBitmapCoordinate(c.y, c.x, this.realZoomLevel);
    var d = this.getDivCoordinate(h.x, h.y);
    var b = d.x - g.pointCoord.x;
    var j = d.y - g.pointCoord.y;
    f.redraw(b, j)
};
MainFrame.prototype.asyncLoadVPageFromURL = function(j, d) {
    var h = xa.create("vpage");
    try {
        var f = XMLHttp.create();
        f.open("GET", j, true);
        var k = this;
        f.onreadystatechange = function() {
            if (f.readyState == 4) {
                if (h.isValid()) {
                    try {
                        alert("XML1:" + f.responseText);
                        k.loadVPageStr(f.responseText)
                    } catch(g) {
                        if (d) {
                            d(g)
                        }
                    }
                }
            }
        };
        f.send(null)
    } catch(c) {
        if (d) {
            d(c)
        }
    }
};
MainFrame.prototype.loadVPage = function(c, b, h) {
    alert("loadVPage:" + c);
    this.clearOverlays();
    var f = b ? b: c.center;
    var g = h;
    if (g == null && c.viewSpan) {
        g = this.spec.getLowestZoomLevel(c.viewSpan, this.viewSize.width, this.viewSize.height)
    }
    this.lastPageZoom = g;
    this.lastPageCenter = f;
    if (f) {
        if (!this.topLeftTile || g != null && g != this.realZoomLevel) {
            if (g == null) {
                g = 4
            }
            this.centerAndZoom(f, g)
        } else {
            this.recenterOrPanToLatLng(f)
        }
    }
    for (var d = 0; d < c.overlays.length; d++) {
        this.addOverlay(c.overlays[d])
    }
    this.directions = c.directions;
    this.drawDirections(this.directions, this.directionsDiv);
    this.onStateChanged("loadVPage")
};
MainFrame.prototype.registerKeyHandlers = function(b) {
    BindingEvent(b, "keydown", this.eventHandler("onKeyPress"));
    BindingEvent(b, "keyup", this.eventHandler("onKeyUp"))
};
MainFrame.prototype.unregisterKeyHandlers = function(b) {
    unbindingEvent(this.container, "keydown", this.eventHandler("onKeyPress"));
    unbindingEvent(this.container, "keyup", this.eventHandler("onKeyUp"))
};
MainFrame.prototype.onMouseScroll = function(b) {
    if (!b) {
        b = window.event
    }
    if (!this.bIsZooming) {
        var c = this.getZoomLevel();
        if (b.wheelDelta > 0 || b.detail < 0) {
            if (EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
                c++
            } else {
                if (EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
                    c--
                }
            }
        } else {
            if (EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
                c--
            } else {
                if (EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
                    c++
                }
            }
        }
        this.flatZoom(c)
    }
};
MainFrame.prototype.styleZoom = function(f, b) {
    if (b) {
        this.div.style.zoom = 1;
        this.div.style.left = convert2Px(this.iOldLeft);
        this.div.style.top = convert2Px(this.iOldTop)
    } else {
        this.div.style.zoom = f;
        var d = this.iOldLeft + (this.iOldLeft - this.viewSize.width / 2) * (f - 1);
        d = Math.ceil(d);
        var c = this.iOldTop + (this.iOldTop - this.viewSize.height / 2) * (f - 1);
        c = Math.ceil(c);
        this.div.style.left = convert2Px(d);
        this.div.style.top = convert2Px(c)
    }
};
var _TmrModeFlatZoom = null;
MainFrame.prototype.flatZoom = function(j) {
    if (j < 0 || j > _MaxLevel) {
        return false
    }
    if (this.bIsZooming) {
        return false
    }
    this.bIsZooming = true;
    var h = 5;
    var c = 0;
    if (EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
        var d = _m_MapSpan[j] / _m_MapSpan[this.getZoomLevel()];
        var f = (d - 1) / h
    } else {
        var d = _m_MapSpan[j] / _m_MapSpan[this.getZoomLevel()];
        if (d > 1) {
            var f = (1 - d) / h / 2
        } else {
            var f = (1 - d) / h * 2
        }
    }
    this.iOldLeft = parseInt(this.div.style.left);
    this.iOldTop = parseInt(this.div.style.top);
    if (typeof ezmap_overlay_div != "undefined") {
        for (var g = 0; g < ezmap_overlay_div.length; g++) {
            ezmap_overlay_div[g].style.filter = ""
        }
    }
    if (this.infoWindow.isVisible()) {
        this.hideInfoWind();
        this.bInfoHasOpen = true
    } else {
        this.bInfoHasOpen = false
    }
    var b = this;
    _TmrModeFlatZoom = setInterval(function() {
        c++;
        if (c < (h + 1)) {
            b.styleZoom(1 + f * c)
        } else {
            window.clearInterval(_TmrModeFlatZoom);
            _TmrModeFlatZoom = null;
            b.styleZoom(j, true);
            b.zoomTo(j);
            if (b.bInfoHasOpen && !b.bInfoHasCloseClick) {
                b.openInfoWindow(b.pWinInfo.point.x, b.pWinInfo.point.y, b.pWinInfo.xml, false)
            }
        }
    },
    10);
    return true
};
MainFrame.prototype.onKeyPress = function(c) {
    if (this.ignoreKeyEvent(c)) {
        return true
    }
    switch (c.keyCode) {
    case 38:
    case 40:
    case 37:
    case 39:
        this.panKeys.add(c.keyCode);
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
        this.pan( - Math.floor(this.viewSize.width * 0.75), 0);
        return false;
    case 187:
    case 107:
        this.zoomTo(this.realZoomLevel - 1);
        return false;
    case 189:
    case 109:
        this.zoomTo(this.realZoomLevel + 1);
        return false
    }
    switch (c.which) {
    case 61:
    case 43:
        this.zoomTo(this.realZoomLevel - 1);
        return false;
    case 45:
    case 95:
        this.zoomTo(this.realZoomLevel + 1);
        return false
    }
    return true
};
MainFrame.prototype.onKeyUp = function(c) {
    switch (c.keyCode) {
    case 38:
    case 40:
    case 37:
    case 39:
        this.panKeys.remove(c.keyCode);
        return false
    }
};
MainFrame.prototype.ignoreKeyEvent = function(c) {
    if (c.ctrlKey || (c.altKey || c.metaKey)) {
        return true
    }
    if (c.target && (c.target.nodeName == "INPUT" && c.target.getAttribute("type").toLowerCase() == "text" || c.target.nodeName == "TEXTAREA")) {
        return true
    }
    return false
};
MainFrame.prototype.startContinuousPan = function() {
    if (!this.topLeftTile) {
        return
    }
    this.cancelPan();
    if (!this.continuousPanTimeout) {
        this.panSiner = new nc(100);
        this.continuousPanTimeout = this.setTimeout("this.doContinuousPan()", 5)
    }
};
MainFrame.prototype.doContinuousPan = function() {
    if (this.panKeys.size > 0) {
        var g = (this.panKeys.contains(37) ? 1 : 0) + (this.panKeys.contains(39) ? -1 : 0);
        var f = (this.panKeys.contains(38) ? 1 : 0) + (this.panKeys.contains(40) ? -1 : 0);
        var d = 1;
        if (this.panSiner.more()) {
            d = this.panSiner.next()
        }
        var h = g > 0 ? Math.floor: Math.ceil;
        var c = h(7 * d * g + 5 * g);
        h = f > 0 ? Math.floor: Math.ceil;
        var b = h(7 * d * f + 5 * f);
        this.dragObject.moveTo(this.dragObject.left + c, this.dragObject.top + b);
        this.onMove();
        this.rotateTiles();
        this.continuousPanTimeout = this.setTimeout("this.doContinuousPan()", 10)
    } else {
        this.continuousPanTimeout = null;
        this.onStateChanged("doContinuousPan")
    }
};
MainFrame.prototype.onWindowBlur = function(c) {
    if (this.panKeys.size > 0) {
        this.panKeys = new Ic()
    }
};
MainFrame.prototype.onIconMouseDown = function(d, c) {
    S(c);
    if (this.onmousedown) {
        this.onmousedown()
    }
    this.clearInfoWindowArgs(d.xml);
    this.showInfoWindow(d)
};
MainFrame.prototype.clearInfoWindowArgs = function(b) {
    b.setAttribute("arg0", "");
    b.setAttribute("arg1", "");
    b.setAttribute("arg2", "")
};
MainFrame.prototype.infoWindowNavigate = function(d, c, b, f) {
    if (!this.openLocation || this.disablePopups) {
        return
    }
    if (c) {
        this.openLocation.xml.setAttribute("arg0", c)
    }
    if (b) {
        this.openLocation.xml.setAttribute("arg1", b)
    }
    if (f) {
        this.openLocation.xml.setAttribute("arg2", f)
    }
    this.onInfoWindowLoad = d;
    this.showInfoWindow(this.openLocation)
};
MainFrame.prototype.showInfoWindow = function(c) {
    if (this.disablePopups || c == null) {
        return
    }
    if (!c.infoStyle) {
        return
    }
    this.openLocation = c;
    var b = this.convert2WPoint(c.point.x, c.point.y);
    this.infoWindow.point = c.point;
    this.infoWindow.iconClass = c.icon.iconClass;
    var d = this;
    var f = function() {
        d.showSizedInfoWindow(b.x, b.y, c.icon.iconClass)
    };
    V.asynchronousTransform(c.xml, this.infoWindow.offscreenArea, c.infoStyle, f, null)
};
MainFrame.prototype.addMarkersToInfoWindowMask = function() {
    if (this.disablePopups || (!this.infoWindow.isVisible() || !this.infoWindow.point)) {
        return
    }
    this.infoWindow.clearMaskMap();
    var f = new Point(this.infoWindow.getOffsetLeft(), this.infoWindow.getOffsetTop());
    var d = new Point(f.x + this.infoWindow.getTotalWidth(), f.y + this.infoWindow.getTotalHeight());
    for (var b = 0; b < this.locations.length; b++) {
        var c = this.locations[b].marker;
        if (c.icon.offsetTop > d.y) {
            break
        }
        this.addMarkerToInfoWindowMask(f, d, c)
    }
    if (this.directionsMarkersAreVisible()) {
        this.addMarkerToInfoWindowMask(f, d, this.directionsStart);
        this.addMarkerToInfoWindowMask(f, d, this.directionsEnd)
    }
};
MainFrame.prototype.addMarkerToInfoWindowMask = function(g, f, d) {
    var c = d.icon;
    if (c.offsetLeft + c.width >= g.x && (c.offsetLeft <= f.x && (c.offsetTop + c.height >= g.y && c.offsetTop <= f.y))) {
        var b = M.get("local").translateImageMapArray(c.offsetLeft - g.x, c.offsetTop - g.y);
        this.infoWindow.addAreaToMaskMap(b, d.mouseTarget.onmousedown)
    }
};
MainFrame.prototype.showSizedInfoWindow = function(h, g, f) {
    xa.invalidate("infoWindowOffscreen");
    var d = xa.create("infoWindowOffscreen");
    this.infoWindow.prepareOffscreen();
    var c = this;
    var b = function() {
        if (d.isValid()) {
            c.infoWindow.flipOffscreenAndSize();
            c.infoWindow.positionAt(h, g, f);
            if (_IEBrowser.type != 1 && c.infoWindow.hasMask()) {
                c.addMarkersToInfoWindowMask()
            }
            c.infoWindow.show();
            if (typeof c.bIsInScreen == "undefined" || c.bIsInScreen) {
                c.panToInfoWindow()
            }
            if (c.onInfoWindowLoad) {
                c.onInfoWindowLoad();
                c.onInfoWindowLoad = null
            }
        }
    };
    window.setTimeout(b, 0)
};
var Jg = false;
MainFrame.prototype.showMapBlowup = function(g, h) {
    if (this.disablePopups) {
        return
    }
    var k = this.spec.getBitmapCoordinate(g.y, g.x, this.realZoomLevel);
    var b = this.getDivCoordinate(k.x, k.y);
    this.infoWindow.point = g;
    this.infoWindow.iconClass = h ? h: M.get("noicon");
    var l = document.createElement("div");
    l.style.border = "1px solid #979797";
    l.style.width = convert2Px(200);
    l.style.height = convert2Px(200);
    var f = new MainFrame(l, this.spec, 200, 200, true, true, this.mapTypes, true);
    f.directions = this.directions;
    f.centerAndZoom(g, 1);
    this.infoWindow.clearOffscreenArea();
    this.infoWindow.offscreenArea.appendChild(l);
    var d = this.onInfoWindowLoad;
    this.onInfoWindowLoad = function() {
        try {
            f.drawDirections(f.directions, f.directionsDiv, true)
        } catch(j) {
            if (Jg) {
                EzLog.dump(j)
            }
        }
        if (d) {
            d()
        }
    };
    if (this.mapTypes.length > 1) {
        var c = document.createElement("div");
        c.style.marginTop = convert2Px(5);
        c.style.fontSize = "small";
        f.createSpecToggleLinks(c);
        this.infoWindow.offscreenArea.appendChild(c)
    }
    this.showSizedInfoWindow(b.x, b.y, this.infoWindow.iconClass);
    return f
};
MainFrame.prototype.createSpecToggleLinks = function(c) {
    var h = new Array();
    for (var b = 0; b < this.mapTypes.length; b++) {
        var f = this.mapTypes[b];
        var d = this.createSpecChangeLink(f);
        h.push(d);
        c.appendChild(d);
        if (f.isNew) {
            var k = document.createElement("span");
            k.style.verticalAlign = "super";
            k.style.color = "red";
            k.style.fontSize = "x-small";
            k.appendChild(document.createTextNode(_mNew));
            c.appendChild(k)
        }
        if (b < this.mapTypes.length - 1) {
            c.appendChild(document.createTextNode(" - "))
        }
    }
    var j = this;
    this.onspecificationchange = function(g, m) {
        for (var l = 0; l < j.mapTypes.length; l++) {
            var o = j.mapTypes[l];
            var n = h[l];
            if (m == o) {
                n.className = "selected"
            } else {
                n.className = null
            }
        }
        if (_IEBrowser.type == 1) {
            j.setTimeout("this.reconfigureAllImages()", 0)
        }
    };
    this.onspecificationchange(null, this.spec)
};
MainFrame.prototype.createSpecChangeLink = function(c) {
    var d = this;
    var b = function() {
        d.switchSpecification(c)
    };
    return Bh(c.getLinkText(), b)
};
MainFrame.prototype.onInfoCloseClick = function(c) {
    this.closeInfoWindow();
    this.bInfoHasCloseClick = true
};
MainFrame.prototype.closeInfoWindow = function() {
    if (!this.disablePopups) {
        this.infoWindow.hide();
        if (this.oninfowindowclose) {
            this.oninfowindowclose()
        }
    }
    if (typeof clearImgTimeout != "undefined" && clearImgTimeout != null) {
        clearImgTimeout()
    }
    if (EzColorPicker.close) {
        EzColorPicker.close()
    }
};
MainFrame.prototype.panToInfoWindow = function() {
    if (this.pWinInfo.bIsVisable == false) {
        return
    }
    if (this.disablePopups) {
        return
    }
    var d = this.getMinLevelBorder(this.infoWindow.point);
    if (d != this.realZoomLevel) {
        this.zoomTo(d)
    }
    var k = this.spec.getBitmapCoordinate(this.infoWindow.point.y, this.infoWindow.point.x, this.realZoomLevel);
    var b = this.getDivCoordinate(k.x, k.y);
    var g = new Point(this.centerBitmap.x, this.centerBitmap.y);
    var l = k.x - (this.viewSize.width / 2 - this.infoWindow.getTotalWidth());
    var h = k.x + (this.viewSize.width / 2 - this.infoWindow.getTotalWidth());
    var j = k.y - (this.viewSize.height / 2 - this.infoWindow.getTotalHeight()) + 10;
    var f = k.y + this.viewSize.height / 2 - 50;
    if (g.x > h || g.x < l) {
        g.x = Math.min(g.x, h);
        g.x = Math.max(g.x, l)
    }
    if (g.y > f || g.y < j) {
        g.y = Math.min(g.y, f);
        g.y = Math.max(g.y, j)
    }
    this.centerLatLng = null;
    var c = this.centerBitmap;
    if (c.x != g.x || c.y != g.y) {
        this.recenterOrPanToBitmap(g)
    }
    this.bIsInScreen = false
};
MainFrame.prototype.repositionInfoWindow = function() {
    if (this.disablePopups || (!this.infoWindow.isVisible() || !this.infoWindow.point)) {
        return
    }
    var c = this.infoWindow.point;
    var d = this.spec.getBitmapCoordinate(c.y, c.x, this.realZoomLevel);
    var b = this.getDivCoordinate(d.x, d.y);
    this.infoWindow.positionAt(b.x, b.y, this.infoWindow.iconClass)
};
var gi = new Point(0, 0);
var we = new Point(0, 0);
MainFrame.prototype.getVMLPathString = function(g) {
    Timer.start("Map", "getVMLPathString");
    var c = new Array();
    c.push("m");
    c.push(g.polyline.points[0]);
    c.push(g.polyline.points[1]);
    c.push("l");
    c = c.concat(g.polyline.points);
    for (var b = 0; b < g.segments.length; b++) {
        var f = g.segments[b].pointIndex << 1;
        var j = f + 4;
        var k = c[j];
        var d = c[j + 1];
        c[j] = k + " " + d + " e m";
        c[j + 1] = k + " " + d + " l"
    }
    c.push("e");
    var h = c.join(" ");
    Timer.end("Map", "getVMLPathString");
    return h
};
MainFrame.prototype.createTrackVML = function(j, c, h) {
    Timer.start("Map", "createTrackVML");
    var f = "polylineVML";
    var g = getEleByID(f);
    if (!g) {
        g = document.createElement("v:polyline");
        g.id = "polylineVML";
        g.points = j;
        g.style.position = "absolute";
        g.style.zIndex = 1088;
        g.filled = false;
        g.strokeColor = _LineColor;
        g.strokeWeight = _LineWidth + "pt";
        var b = document.createElement("v:stroke");
        b.opacity = 1;
        b.startarrowwidth = "wide";
        b.endarrowwidth = "wide";
        b.startarrowlength = "long";
        b.endarrowlength = "long";
        b.startarrow = "oval";
        b.endarrow = "classic";
        g.appendChild(b)
    } else {
        var d = g;
        c.removeChild(d);
        g = d;
        g.strokeColor = _LineColor;
        g.strokeWeight = _LineWidth + "pt"
    }
    g.points = j;
    c.appendChild(g);
    Timer.end("Map", "createTrackVML");
    return h
};
MainFrame.prototype.getPathCenter = function(c) {
    var b = this.getPathMBR(c);
    return b.centerPoint()
};
MainFrame.prototype.getPathMBR = getPathMBR;
MainFrame.prototype.centerAndZoomToBorder = function(b) {
    if (typeof b == "undefined" || b == null || b == "") {
        return
    }
    b = Trim(b);
    var h = b.split(";");
    var k = null;
    if (this.borderVML && this.borderVML != null) {
        for (var d = 0; d < this.borderVML.length; d++) {
            var c = this.borderVML[d];
            this.removeOverlay(c)
        }
        this.borderVML.clear()
    } else {
        this.borderVML = new Array()
    }
    for (var f = 0; f < h.length; f++) {
        var j = h[f];
        if (j == "") {
            continue
        }
        if (f == 0) {
            k = this.getPathMBR(j)
        } else {
            var g = this.getPathMBR(j);
            k.extend(g)
        }
        var c = this.createBorder(j, false);
        if (c != null) {
            this.borderVML.push(c)
        }
    }
    this.centerAtMBR(k.minX, k.minY, k.maxX, k.maxY);
    for (var d = 0; d < this.borderVML.length; d++) {
        var c = this.borderVML[d];
        c.flash(false)
    }
};
MainFrame.prototype.createBorder = function(f, b) {
    var c;
    var d = null;
    if (strLonLatPath.length == 3) {
        d = Circle
    } else {
        if (strLonLatPath.length == 4) {
            d = Rectangle
        } else {
            if (strLonLatPath.length >= 6) {
                d = Polygon
            }
        }
    }
    c = new d(f, "red", 4, 0.5, "blue");
    this.addOverlay(c);
    if (b) {
        c.flash(false)
    }
    return c
};
MainFrame.prototype.convert2Div = function(h) {
    var c = this;
    var b = h.length;
    var g = new Array();
    for (var d = 0; d < b / 2; d++) {
        var f = c.getDivCoord(h[2 * d], h[2 * d + 1]);
        g.push(f.x);
        g.push(f.y);
        delete f
    }
    return g
};
MainFrame.prototype.drawOval = function(h) {
    var l = this;
    var f = l.getVMLContainer();
    var o = l.getDivCoord(h[0], h[1]);
    var c = parseFloat(h[0]) + parseFloat(h[2]);
    var k = l.getDivCoord(c, h[1]);
    var m = Math.abs(k.x - o.x);
    var j = o.x - m;
    var g = o.y - m;
    var d = 2 * m;
    var b = 2 * m;
    var n = f.drawOval(j, g, d, b);
    return n
};
MainFrame.prototype.drawPolygon = function(g) {
    var b = this;
    var f = b.getVMLContainer();
    var c = f.drawPolygon();
    var d = this.convert2Div(g);
    c.points.value = d;
    delete d;
    return c
};
MainFrame.prototype.drawPolyline = function(f) {
    var b = this;
    var d = b.getVMLContainer();
    var c = d.drawPolyline();
    c.points.value = this.convert2Div(f);
    return c
};
MainFrame.prototype.drawRect = function(h) {
    var k = this;
    var d = k.getVMLContainer();
    var m = k.getDivCoord(h[0], h[1]);
    var l = k.getDivCoord(h[2], h[3]);
    var j = Math.min(m.x, l.x);
    var g = Math.min(m.y, l.y);
    var c = Math.abs(m.x - l.x);
    var b = Math.abs(m.y - l.y);
    var f = d.drawRect(j, g, c, b);
    return f
};
MainFrame.prototype.getVMLContainer = function() {
    if (!this.vmlContainer) {
        this.vmlContainer = this.createVMLContainer(this.div)
    }
    this.refreshVMLGraphics();
    return this.vmlContainer
};
MainFrame.prototype.getTrackVMLContainer = function() {
    if (!this.trackVmlContainer) {
        this.trackVmlContainer = this.createVMLContainer(this.div)
    }
    this.trackVmlContainer.groupObj.style.filter = "";
    return this.trackVmlContainer
};
MainFrame.prototype.createVMLContainer = function(b) {
    var c = this.viewSize.width;
    var g = this.viewSize.height;
    var f;
    try {
        if (_VMLInMap) {
            f = new vmlGraphics(0, 0, c, g, b);
            f.setScale(1);
            f.groupObj.style.filter = "alpha(opacity=50,style=0)"
        } else {
            f = new vmlGraphics(0, 0, c, g, b);
            f.groupObj.style.filter = "alpha(opacity=50,style=0)"
        }
    } catch(d) {
        alert("����VML���ִ���!")
    } finally {
        f.groupObj.style.zIndex = _overLayIndex - 10;
        f.groupObj.unselectable = "on";
        f.setFillColor("blue");
        f.setStroke("red", 2)
    }
    return f
};
MainFrame.prototype.clearVMLContainer = function() {
    if (this.vmlContainer && this.vmlContainer.groupObj) {
        RemoveChildren(this.vmlContainer.groupObj)
    }
};
MainFrame.prototype.refreshVMLGraphics = function() {
    Timer.start("Map", "refreshVMLGraphics");
    var o = this.centerBitmap;
    var n = this.getDivCoordinate(o.x, o.y, we);
    var h = 100;
    var f = 100;
    var q = this.getCenterLatLng();
    var g = this.spec.getPixelsPerDegree(this.realZoomLevel);
    var d = this.vmlContainer;
    if (!d) {
        return
    }
    if (_VMLInMap) {
        var l = parseInt(this.div.style.left);
        var j = parseInt(this.div.style.top);
        var c = this.viewSize.width;
        var b = this.viewSize.height;
        d.groupObj.style.left = convert2Px( - l + c / 2);
        d.groupObj.style.top = convert2Px(j + b / 2);
        d.groupObj.style.width = convert2Px(c);
        d.groupObj.style.height = convert2Px(b);
        d.setOrigin(q.x * 100000, q.y * 100000);
        d.setOriginSize(100000 * c / g.x, 100000 * b / g.y)
    } else {
        var l = parseInt(this.div.style.left);
        var j = parseInt(this.div.style.top);
        d.groupObj.style.left = convert2Px( - l);
        d.groupObj.style.top = convert2Px( - j);
        var c = this.viewSize.width;
        var b = this.viewSize.height;
        d.groupObj.style.width = convert2Px(c);
        d.groupObj.style.height = convert2Px(b);
        d.setOrigin(0, 0);
        d.setOriginSize(c, b)
    }
    Timer.end("Map", "refreshVMLGraphics")
};
MainFrame.prototype.showMapControl = function(b) {
    if (!this.mapControl) {
        var c = this.createMapControl();
        c.style.position = "absolute";
        setClass(c, "noprint");
        this.container.appendChild(c);
        this.mapControl = c
    } else {
        this.container.removeChild(this.mapControl);
        var c = this.createMapControl();
        c.style.position = "absolute";
        setClass(c, "noprint");
        this.container.appendChild(c);
        this.mapControl = c
    }
    if (b == "right") {
        this.mapControl.style.right = convert2Px(58);
        this.mapControl.style.top = convert2Px(8)
    } else {
        this.mapControl.style.left = convert2Px(8);
        this.mapControl.style.top = convert2Px(8)
    }
};
MainFrame.prototype.hideMapControl = function() {
    if (this.mapControl) {
        this.mapControl.style.display = "none"
    }
};
MainFrame.prototype.hideMapScale = function() {
    var c = this.mapScale;
    if (c) {
        for (var b = 0; b < c.length; b++) {
            c[b].style.display = "none"
        }
    }
};
MainFrame.prototype.showMapScale = function() {
    var c = this.mapScale;
    if (c) {
        for (var b = 0; b < c.length; b++) {
            c[b].style.display = ""
        }
    } else {
        this.createMapScale()
    }
};
MainFrame.prototype.createMapControl = function() {
    var b = document.createElement("div");
    if (typeof _bIsShowMapControl != "undefined" && _bIsShowMapControl == true) {
        this.createPanningControls(b)
    }
    this.createZoomControls(b);
    this.createZoomSlider(b);
    return b
};
MainFrame.prototype.showSmallMapControl = function(b) {
    if (!this.mapControl) {
        var c = this.createSmallMapControl();
        c.style.position = "absolute";
        setClass(c, "noprint");
        this.container.appendChild(c);
        this.mapControl = c
    } else {
        this.mapControl.style.display = ""
    }
    if (b == "right") {
        this.mapControl.style.right = convert2Px(58);
        this.mapControl.style.top = convert2Px(8)
    } else {
        this.mapControl.style.left = convert2Px(8);
        this.mapControl.style.top = convert2Px(8)
    }
};
MainFrame.prototype.showSmallMapControl = function(b) {
    if (!this.mapControl) {
        var c = this.createSmallMapControl();
        c.style.position = "absolute";
        setClass(c, "noprint");
        this.container.appendChild(c);
        this.mapControl = c
    } else {
        this.container.removeChild(this.mapControl);
        var c = this.createSmallMapControl();
        c.style.position = "absolute";
        setClass(c, "noprint");
        this.container.appendChild(c);
        this.mapControl = c
    }
    if (b == "right") {
        this.mapControl.style.right = convert2Px(58);
        this.mapControl.style.top = convert2Px(8)
    } else {
        this.mapControl.style.left = convert2Px(8);
        this.mapControl.style.top = convert2Px(8)
    }
};
MainFrame.prototype.showStandMapControl = function(b) {
    if (!this.mapControl) {
        var c = this.createStandMapControl();
        c.style.position = "absolute";
        setClass(c, "noprint");
        this.container.appendChild(c);
        this.mapControl = c
    } else {
        this.mapControl.style.display = ""
    }
    if (b == "right") {
        this.mapControl.style.right = convert2Px(58);
        this.mapControl.style.top = convert2Px(8)
    } else {
        this.mapControl.style.left = convert2Px(8);
        this.mapControl.style.top = convert2Px(8)
    }
};
MainFrame.prototype.showStandMapControl = function(b) {
    if (!this.mapControl) {
        var c = this.createStandMapControl();
        c.style.position = "absolute";
        setClass(c, "noprint");
        this.container.appendChild(c);
        this.mapControl = c
    } else {
        this.container.removeChild(this.mapControl);
        var c = this.createStandMapControl();
        c.style.position = "absolute";
        setClass(c, "noprint");
        this.container.appendChild(c);
        this.mapControl = c
    }
    if (b == "right") {
        this.mapControl.style.right = convert2Px(58);
        this.mapControl.style.top = convert2Px(8)
    } else {
        this.mapControl.style.left = convert2Px(8);
        this.mapControl.style.top = convert2Px(8)
    }
};
MainFrame.prototype.createSmallMapControl = function() {
    var b = document.createElement("div");
    this.createSmallPanningControls(b);
    this.createSmallZoomControls(b);
    return b
};
MainFrame.prototype.createStandMapControl = function() {
    var b = document.createElement("div");
    this.createPanningControls(b);
    this.createZoomControls(b);
    this.createZoomSlider(b);
    return b
};
MainFrame.prototype.createZoomControls = function(f) {
    var b = this;
    var c = divCreator.create(hi, 17, 17, 20, 70, 1, false);
    setCursor(c, "pointer");
    BindingEvent(c, "click",
    function(g) {
        if (EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
            b.zoomTo(b.getZoomLevel() - 1)
        } else {
            if (EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
                b.zoomTo(b.getZoomLevel() + 1)
            }
        }
        S(g)
    });
    c.title = _mZoomIn;
    f.appendChild(c);
    var d = 100 + (iSliderH) * ((_MaxLevel + 1) / iMaxLevel);
    var h = divCreator.create(Zh, 17, 17, 20, d, 1, false);
    setCursor(h, "pointer");
    BindingEvent(h, "click",
    function(g) {
        if (EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
            b.zoomTo(b.getZoomLevel() + 1)
        } else {
            if (EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
                b.zoomTo(b.getZoomLevel() - 1)
            }
        }
        S(g)
    });
    h.title = _mZoomOut;
    f.appendChild(h)
};
MainFrame.prototype.createPanningControls = function(k) {
    var h = this;
    var l = divCreator.create(Gi, 59, 64, 0, 0, 0, false);
    var b = divCreator.create(jg, 17, 17, 20, 0, 1, false);
    setCursor(b, "pointer");
    BindingEvent(b, "click",
    function(g) {
        h.pan(0, -Math.floor(h.viewSize.height * 0.5));
        S(g)
    });
    b.title = _mPanNorth;
    k.appendChild(b);
    var f = divCreator.create(pi, 17, 17, 40, 20, 1, false);
    setCursor(f, "pointer");
    BindingEvent(f, "click",
    function(g) {
        h.pan( - Math.floor(h.viewSize.width * 0.5), 0);
        S(g)
    });
    f.title = _mPanEast;
    k.appendChild(f);
    var j = divCreator.create(ni, 17, 17, 20, 40, 1, false);
    setCursor(j, "pointer");
    BindingEvent(j, "click",
    function(g) {
        h.pan(0, Math.floor(h.viewSize.height * 0.5));
        S(g)
    });
    j.title = _mPanSouth;
    k.appendChild(j);
    var d = divCreator.create(Yh, 17, 17, 0, 20, 1, false);
    setCursor(d, "pointer");
    BindingEvent(d, "click",
    function(g) {
        h.pan(Math.floor(h.viewSize.width * 0.5), 0);
        S(g)
    });
    d.title = _mPanWest;
    k.appendChild(d);
    var c = divCreator.create(kh, 17, 17, 20, 20, 1, false);
    setCursor(c, "pointer");
    BindingEvent(c, "click",
    function(g) {
        var m = _MapCenterPoint;
        h.centerAndZoom(m, h.getZoomLevel());
        S(g)
    });
    c.title = _mLastResult;
    k.appendChild(c)
};
MainFrame.prototype.createZoomSlider = function(c) {
    var f = EzServerClient.GlobeParams.MapMaxLevel - EzServerClient.GlobeParams.MapInitLevel;
    var d = EzServerClient.GlobeParams.InnerMaxZoomLevel - EzServerClient.GlobeParams.MapMaxLevel;
    var h = document.createElement("div");
    h.style.position = "absolute";
    h.style.flowposition = "absolute";
    h.style.left = convert2Px(9);
    h.style.top = convert2Px(90);
    h.style.width = convert2Px(37);
    iHeight = iSliderH * ((_MaxLevel + 1) / iMaxLevel) + 1;
    h.style.height = convert2Px(iHeight);
    h.style.overflow = "hidden";
    var l = 0;
    var j = this;
    var m = new MBR(l, 0, l + 37, iSliderH * ((_MaxLevel + 1) / iMaxLevel) + 3);
    var n = divCreator.create(Gh, 37, 14, l, 10, 2, false);
    n.title = _mZoomDrag;
    switch (EzServerClient.GlobeParams.ZoomLevelSequence) {
    case 0:
    case 3:
        var k = divCreator.create(EzServerClient.GlobeParams.ei_descend22, 37, iSliderH, 11, 1, 1, false);
        break;
    case 1:
    case 2:
        var k = divCreator.create(EzServerClient.GlobeParams.ei_ascend22, 37, iSliderH, 11, 0, 1, false);
        k.style.top = parseInt(k.style.top) - d * 12;
        k.style.clip = "rect(" + (12 * d) + " 50 277 0)";
        break
    }
    setCursor(k, "pointer");
    k.title = _mZoomSet;
    h.appendChild(k);
    h.appendChild(n);
    c.appendChild(h);
    var b = new DragEvent(n, l, EzServerClient.GlobeFunction.zoomLevel2sliderPixelPosition(this.getZoomLevel(), EzServerClient.GlobeParams.PerZoomLevelPixel, EzServerClient.GlobeParams.MapMaxLevel, EzServerClient.GlobeParams.ZoomLevelSequence), m);
    this.onzoom = function() {
        b.moveTo(l, EzServerClient.GlobeFunction.zoomLevel2sliderPixelPosition(this.getZoomLevel(), EzServerClient.GlobeParams.PerZoomLevelPixel, EzServerClient.GlobeParams.MapMaxLevel, EzServerClient.GlobeParams.ZoomLevelSequence))
    };
    b.ondragend = function() {
        var o = b.top + 5;
        var g = EzServerClient.GlobeFunction.sliderPixelPosition2ZoomLevel(o, EzServerClient.GlobeParams.PerZoomLevelPixel, EzServerClient.GlobeParams.MapMaxLevel, EzServerClient.GlobeParams.ZoomLevelSequence);
        j.zoomTo(g)
    };
    BindingEvent(k, "click",
    function(g) {
        var r;
        if (window.event) {
            r = window.event.offsetY
        } else {
            var q = ObjectOffset(h);
            r = g.pageY - q.y - 2
        }
        S(g);
        var t = EzServerClient.GlobeFunction.sliderPixelPosition2ZoomLevel(r, EzServerClient.GlobeParams.PerZoomLevelPixel, EzServerClient.GlobeParams.InnerMaxZoomLevel, EzServerClient.GlobeParams.ZoomLevelSequence);
        j.zoomTo(t)
    })
};
MainFrame.prototype.getRelativeZoomSliderPos = function(b) {
    var c;
    if (typeof b != "undefined") {
        c = b * 12
    } else {
        c = this.realZoomLevel * 12
    }
    return c
};
MainFrame.prototype.getZoomFromRelativeCoord = function(c) {
    var b = Math.floor((c - 1) / 12);
    return Math.max(0, Math.min(this.spec.numZoomLevels, b))
};
MainFrame.prototype.getRoutePath = function() {
    if (!this.routeArray) {
        return null
    }
    var c = this.routeArray.length;
    var g, k, j;
    var f = this.div.style.left;
    var d = this.div.style.top;
    var b = new Date();
    for (var h = 0; h < c; h++) {
        pMonitorInfo = this.routeArray[h];
        pPoint = this.getDivCoord(pMonitorInfo.lon, pMonitorInfo.lat);
        k = pPoint.x - parseInt(f);
        j = pPoint.y - parseInt(d);
        if (!g) {
            g = k + "," + j
        } else {
            g = g + "," + k + "," + j
        }
    }
    var l = new Date();
    return g
};
MainFrame.prototype.showMapServerControl = function() {
    var k = new Array();
    var d = this;
    var g = 10;
    var h = 70;
    var c = 10;
    var b = null;
    var j = [];
    for (var f = this.mapSrcURL.length - 1; f >= 0; f--) {
        b = new MapServerControl(this.mapSrcURL[f][0]);
        b.style.top = convert2Px(3);
        b.style.right = convert2Px(g);
        setClass(b, "noprint");
        j = this.mapSrcURL[f];
        EzServerClient.GlobeFunction.addMapServer(d, b, j);
        k.push(b);
        this.container.appendChild(b);
        h = b.offsetWidth;
        g = g + h + c
    }
    b.children[0].style.fontWeight = "bolder";
    this.mapServer = k;
    b = null;
    j = null
};
MainFrame.prototype.setMapSource = function(b) {
    if (_bIsOverlay && b.length > 2) {
        this.mapServiceArr = b[2];
        this.spec.bIsOverlay = true;
        this.spec.setOverlayURL(b[1])
    } else {
        this.mapServiceArr = b[1];
        this.spec.bIsOverlay = false
    }
    this.spec.setMapURL(this.mapServiceArr);
    this.initializeMap();
    this.curMapServerHander = this.eventHandler("setMapSource")
};
MainFrame.prototype.setVectorMap = function() {
    this.mapServiceArr = this.vectorMapService;
    this.spec.bIsOverlay = false;
    this.spec.setMapURL(this.mapServiceArr);
    this.initializeMap();
    this.curMapServerHander = this.eventHandler("setVectorMap")
};
MainFrame.prototype.setSatelliteMap = function() {
    this.mapServiceArr = this.satelliteMapService;
    this.spec.bIsOverlay = false;
    this.spec.setMapURL(this.mapServiceArr);
    this.initializeMap();
    this.curMapServerHander = this.eventHandler("setSatelliteMap")
};
MainFrame.prototype.setVectorSateMap = function() {
    if (_bIsOverlay) {
        this.mapServiceArr = this.satelliteMapService;
        this.spec.bIsOverlay = true;
        this.spec.setOverlayURL(this.vectorSateMapService)
    } else {
        this.mapServiceArr = this.vectorSateMapService;
        this.spec.bIsOverlay = false
    }
    this.spec.setMapURL(this.mapServiceArr);
    this.initializeMap();
    this.curMapServerHander = this.eventHandler("setVectorSateMap")
};
MainFrame.prototype.createServerControl = function(b) {
    var d = document.createElement("div");
    d.onselectstart = _NoAction;
    d.className = "mapServerControl";
    var c = document.createElement("div");
    c.className = "mapServerControlShadow";
    c.innerHTML = b;
    c.noWrap = true;
    d.appendChild(c);
    return d
};
MainFrame.prototype.showButtonTip = function() {
    var b = this.createDiv("����Ҽ�����");
    b.style.backgroundColor = "#004C78";
    b.style.border = "1px solid red";
    b.noWrap = true;
    b.style.zIndex = 10000;
    b.style.display = "none";
    this.container.appendChild(b);
    this.buttonTip = b
};
MainFrame.prototype.showCopyright = function() {
    if (!this.copyRightLabel) {
        var b = this.createDiv(_mCopyright);
        b.style.left = convert2Px(3);
        b.style.bottom = convert2Px(3);
        this.container.appendChild(b);
        this.copyRightLabel = b;
        setClass(this.copyRightLabel, "noprint")
    }
    this.copyRightLabel.style.display = ""
};
MainFrame.prototype.createMapScale = function() {
    if (this.mapScale != null) {
        return
    }
    var c = new Array();
    var b = "1:" + _m_MapBottomScale * Math.pow(2, this.realZoomLevel);
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
    c.push(this.scaleTxt);
    this.scaleRightTxt = createTxt("");
    this.scaleRightTxt.style.right = convert2Px(50);
    this.scaleRightTxt.style.bottom = convert2Px(23);
    this.container.appendChild(this.scaleRightTxt);
    setClass(this.scaleRightTxt, "noprint");
    c.push(this.scaleRightTxt);
    this.mapScale = c;
    this.refreshMapScale();
    if (typeof bIsFloatFuncLoaded != "undefined" && bIsFloatFuncLoaded && typeof _bIsResultTable != "undefined" && _bIsResultTable) {
        this.floatResultDiv = initFloatDiv(240, 300, document.body)
    }
};
MainFrame.prototype.showInfoFrame = function(d, c) {
    var b = d.monitor;
    if (this.pWinInfo) {
        delete this.pWinInfo;
        this.pWinInfo = null
    }
    this.openInfoWindow(b.lon, b.lat, b, c)
};
MainFrame.prototype.openInfoWindow = function(j, h, d, g) {
    var c = new Icon("eleInfo", 150, 150, new Point(10, 10), new Point(10, 10), new Point(10, 10), "ffff", 30, null);
    var f = new IconInfo("", c);
    var b = "";
    this.pWinInfo = new InfoObj("wujie", new Point(j, h), f, "size=44", d);
    this.pWinInfo.bIsVisable = true;
    if (typeof g == "object") {
        this.curOverlay = g
    } else {
        if (typeof g == "undefined" || g) {
            this.bIsInScreen = true
        }
    }
    this.showInfoWindow(this.pWinInfo);
    this.bInfoHasCloseClick = false
};
MainFrame.prototype.hideInfoFrame = function() {
    this.infoResultDiv.style.display = "none"
};
MainFrame.prototype.createDiv = function(b) {
    var c = document.createElement("div");
    c.style.position = "absolute";
    setCursor(c, "default");
    c.unselectable = "on";
    c.onselectstart = _NoAction;
    c.innerHTML = b;
    c.style.fontSize = convert2Px(11);
    c.style.fontFamily = "Arial, sans serif";
    c.style.MozUserSelect = "none";
    c.style.color = "black";
    return c
};
MainFrame.prototype.hideCopyright = function() {
    if (this.copyRightLabel) {
        this.copyRightLabel.style.display = "none"
    }
};
MainFrame.prototype.hideMapServer = function() {
    var c = this.mapServer;
    if (c) {
        for (var b = 0; b < c.length; b++) {
            c[b].style.display = "none"
        }
    }
};
MainFrame.prototype.showMapServer = function() {
    var c = this.mapServer;
    if (c) {
        for (var b = 0; b < c.length; b++) {
            c[b].style.display = ""
        }
    }
};
MainFrame.prototype.createScaleImg = function(b) {
    var d = document.createElement("div");
    d.style.position = "absolute";
    setCursor(d, "default");
    d.unselectable = "on";
    d.onselectstart = _NoAction;
    var c = document.createElement("img");
    c.src = b;
    d.appendChild(c);
    return d
};
MainFrame.prototype.createSmallPanningControls = function(b) {
    return this.createPanningControls(b)
};
MainFrame.prototype.createSmallZoomControls = function(f) {
    var b = this;
    var c = divCreator.create(hi, 17, 17, 20, 70, 1, false);
    setCursor(c, "pointer");
    BindingEvent(c, "click",
    function(g) {
        if (EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
            b.zoomTo(b.getZoomLevel() - 1)
        } else {
            if (EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
                b.zoomTo(b.getZoomLevel() + 1)
            }
        }
        S(g)
    });
    c.title = _mZoomIn;
    f.appendChild(c);
    var d = 100;
    var h = divCreator.create(Zh, 17, 17, 20, d, 1, false);
    setCursor(h, "pointer");
    BindingEvent(h, "click",
    function(g) {
        if (EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
            b.zoomTo(b.getZoomLevel() + 1)
        } else {
            if (EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
                b.zoomTo(b.getZoomLevel() - 1)
            }
        }
        S(g)
    });
    h.title = _mZoomOut;
    f.appendChild(h)
};
MainFrame.prototype.changeDragMode = function(g, b, d, h) {
    var f = this;
    f.bIsPan = true;
    if (b) {
        f.outputPanel = b
    } else {
        f.outputPanel = new EzPointStr()
    }
    if (f.buttonTip != null) {
        f.buttonTip.style.display = "none"
    }
    var c = null;
    if (d) {
        f.outputPanel2 = d
    } else {
        f.outputPanel2 = null
    }
    if (f.vmlDraw != null && g != "pan") {
        this.removeOverlay(f.vmlDraw);
        f.vmlDraw = null
    }
    if (g == "measure") {
        this.measureLength(h);
        return
    } else {
        if (g == "pan") {
            f.container.style.cursor = "move";
            f.dragObject.ondrag = f.eventHandler("onDrag");
            f.dragObject.ondragstart = f.eventHandler("onDragStart");
            f.dragObject.ondragend = f.eventHandler("onDragEnd");
            c = f.dragObject.eventHandler("onMouseDown");
            if (f.dragObject.mouseMoveHandler) {
                unbindingEvent(f.dragObject.src, "mousemove", f.dragObject.mouseMoveHandler)
            }
            f.dragObject.mouseMoveHandler = f.dragObject.eventHandler("onMouseMove")
        } else {
            if (g == "drawRect" || g == "drawCircle" || g == "zoomInExt" || g == "zoomOutExt") {
                if (g == "drawRect" || g == "drawCircle") {
                    f.container.style.cursor = "default"
                } else {
                    g = "drawRect";
                    f.bIsPan = false
                }
                f.dragObject.ondragstart = f.eventHandler("drawStart");
                f.dragObject.ondragend = f.eventHandler("drawEnd");
                if (f.dragObject.mouseMoveHandler) {
                    unbindingEvent(f.dragObject.src, "mousemove", f.dragObject.mouseMoveHandler)
                }
                f.dragObject.mouseMoveHandler = f.eventHandler("drawMove");
                BindingEvent(f.dragObject.src, "mousemove", f.dragObject.mouseMoveHandler);
                c = f.dragObject.eventHandler("onMouseDown")
            } else {
                if (g == "drawPolyline" || g == "drawPolygon") {
                    f.container.style.cursor = "crosshair";
                    f.dragObject.ondragstart = null;
                    f.dragObject.ondragend = null;
                    f.dragObject.mouseMoveHandler = null;
                    c = f.eventHandler("drawMouseDown");
                    if (f.dragObject.mouseMoveHandler) {
                        unbindingEvent(f.dragObject.src, "mousemove", f.dragObject.mouseMoveHandler)
                    }
                    f.dragObject.mouseMoveHandler = f.eventHandler("drawMove");
                    BindingEvent(f.dragObject.src, "mousemove", f.dragObject.mouseMoveHandler)
                } else {
                    if (g == "drawPoint") {
                        f.container.style.cursor = "crosshair";
                        f.dragObject.ondragstart = null;
                        f.dragObject.ondragend = null;
                        f.dragObject.mouseMoveHandler = null;
                        c = f.eventHandler("drawMouseDown")
                    }
                }
            }
        }
    }
    if (f.dragObject.mouseDownHandler) {
        unbindingEvent(f.dragObject.src, "mousedown", f.dragObject.mouseDownHandler)
    }
    f.dragObject.mouseDownHandler = c;
    BindingEvent(f.dragObject.src, "mousedown", f.dragObject.mouseDownHandler);
    f.drawMode = g;
    if (g != "pan") {
        _callback = h;
        f.dragObject.bIsPan = false
    } else {
        f.dragObject.bIsPan = true
    }
    this.setTimeout("this.container.focus()", 100)
};
MainFrame.prototype.measureLength = function(d) {
    this.container.style.cursor = "crosshair";
    var b = this;
    function c() {
        if (!b.vmlDraw) {
            return
        }
        iLength = b.vmlDraw.getLength();
        iLength = Math.ceil(iLength);
        var f = "";
        if (iLength > 1000) {
            iLength = iLength / 1000;
            f = iLength + "����"
        } else {
            f = iLength + "��"
        }
        if (typeof d == "function") {
            d(f)
        } else {
            alert("�����ܳ�:" + f)
        }
    }
    this.changeDragMode("drawPolyline", null, null, c)
};
MainFrame.prototype.measureArea = function(d) {
    this.container.style.cursor = "crosshair";
    var b = this;
    function c() {
        if (!b.vmlDraw) {
            return
        }
        var g = b.vmlDraw.getArea();
        g = Math.ceil(g);
        var f = "";
        if (g > 1000000) {
            g = g / 1000000;
            f = g + "ƽ������"
        } else {
            f = g + "ƽ����"
        }
        if (typeof d == "function") {
            d(f)
        } else {
            alert("�����Ϊ:" + f)
        }
    }
    this.changeDragMode("drawPolygon", null, null, c)
};
MainFrame.prototype.cancelTrackMonitorStepByStep = function() {
    if (this.trackTimeOut) {
        clearTimeout(this.trackTimeOut)
    }
};
MainFrame.prototype.convert2WPoint = function(b, d) {
    var c = this.getDivCoord(b, d);
    var b = c.x - parseInt(this.div.style.left);
    var d = c.y - parseInt(this.div.style.top);
    b = Math.round(b);
    d = Math.round(d);
    delete c;
    return new Point(b, d)
};
MainFrame.prototype.convert2LonLat = function(h, g) {
    var f = parseInt(this.div.style.left);
    var d = parseInt(this.div.style.top);
    var j = this.getBoundsLatLng();
    var c = j.minX + (h + f) / this.viewSize.width * j.getSpanX();
    var b = j.maxY - (g + d) / this.viewSize.height * j.getSpanY();
    return new Point(c, b)
};
MainFrame.prototype.about = function() {
    var b = "��Ȩ����(2002-2009) ����ɽ����γ��Ϣ�������޹�˾ www.easymap.com.cn.";
    alert(b)
};
MainFrame.prototype.addControl = function(b) {
    this.container.appendChild(b.div);
    if (b.init) {
        b.init(this)
    } else {
        b.init(this)
    }
};
MainFrame.prototype.showVersion = function(c) {
    if (EzServerClient.GlobeParams.VersionArr) {
        var g = EzServerClient.GlobeParams.VersionArr[c];
        if (g != null) {
            var f = this.mapSrcURL.length;
            var b = g.getMapServerURLCount();
            if (f > b) {
                this.mapSrcURL.splice(b, f - b)
            } else {
                if (f < b) {
                    for (var d = 0; d < b - f; d++) {
                        this.mapSrcURL.push([])
                    }
                }
            }
            for (var d = 0; d < b; d++) {
                this.mapSrcURL[d][0] = g.getMapDispName(d);
                this.mapSrcURL[d][1] = g.getMapServerURL(d)
            }
            _VectorMapService = this.mapSrcURL[0];
            this.hideMapServer();
            this.showMapServerControl();
            this.setMapSource(this.mapSrcURL[0])
        } else {
            alert("û��[" + c + "]�汾�����ݣ�")
        }
    } else {
        alert("û�а汾���ݣ�")
    }
};
MainFrame.prototype.containerCoord2Map = function(h) {
    try {
        var g = h.x;
        var d = h.y;
        if (this.containOffset) {
            g = g - this.containOffset.x;
            d = d - this.containOffset.y
        }
        g -= this.iBorderWidth;
        d -= this.iBorderHeight;
        var c = this.getCenterLatLng();
        if (isNaN(this.realZoomLevel)) {
            return
        }
        var b = new Point(0, 0);
        b.x = c.x + (g - this.viewSize.width / 2) / _PixelsPerDegree[this.realZoomLevel].x;
        b.y = c.y - (d - this.viewSize.height / 2) / _PixelsPerDegree[this.realZoomLevel].y;
        b.x = Math.floor(b.x * 100000) / 100000;
        b.y = Math.floor(b.y * 100000) / 100000;
        return b
    } catch(f) {
        throw f
    }
};
MainFrame.prototype.mapCoord2container = function(g) {
    var c = this.spec.getBitmapCoordinate(g.y, g.x, this.realZoomLevel);
    var f = this.getBoundsBitmap();
    var d = c.x - f.minX;
    var b = f.maxY - c.y;
    return new Point(d / (f.maxX - f.minX) * this.viewSize.width, b / (f.maxY - f.minY) * this.viewSize.height)
};
MainFrame.prototype.getMouseMapX = function() {
    return this.mouseLng
};
MainFrame.prototype.getMouseMapY = function() {
    return this.mouseLat
};
EzServerClient.GlobeFunction.addMapServer = function(d, c, b) {
    BindingEvent(c, "click",
    function(f) {
        d.setMapSource(b);
        var h = null;
        for (var g = 0; g < d.mapServer.length; g++) {
            h = d.mapServer[g];
            if (h == c) {
                h.children[0].style.fontWeight = "bolder"
            } else {
                h.children[0].style.fontWeight = ""
            }
        }
    })
};
EzServerClient.GlobeFunction.sliderPixelPosition2ZoomLevel = function(c, b, d, f) {
    switch (f) {
    case 0:
    case 3:
        return Math.floor(c / b);
    case 1:
    case 2:
        return d - Math.floor(c / b)
    }
};
EzServerClient.GlobeFunction.zoomLevel2sliderPixelPosition = function(d, b, c, f) {
    switch (f) {
    case 0:
    case 3:
        return b * d;
    case 1:
    case 2:
        return (c - d) * b
    }
};
EzServerClient.GlobeFunction.getBrowserDPI = function() {
    if (window.screen.deviceXDPI != undefined) {
        return {
            x: window.screen.deviceXDPI,
            y: window.screen.deviceYDPI
        }
    } else {
        var c = document.createElement("DIV");
        c.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
        document.body.appendChild(c);
        var b = {
            x: parseInt(c.offsetWidth),
            y: parseInt(c.offsetHeight)
        };
        c.parentNode.removeChild(c);
        return b
    }
};
EzServerClient.GlobeFunction.getIEVersion = function() {
    var b = window.navigator.userAgent.toLowerCase();
    if (b.indexOf("msie 6.0") != -1) {
        return "IE6"
    }
    if (b.indexOf("msie 7.0") != -1) {
        return "IE7"
    }
    if (b.indexOf("msie 8.0") != -1) {
        return "IE8"
    }
    if (b.indexOf("msie 9.0") != -1) {
        return "IE9"
    }
    if (b.indexOf("msie 5") != -1) {
        return "IE5"
    }
    return "NOIE"
};
EzServerClient.GlobeParams.IEVersion = EzServerClient.GlobeFunction.getIEVersion();
Point.getDistPoint = function(j, f, c) {
    var h = new Point();
    var g = j.distanceFrom(f);
    if (c > g || g == 0) {
        return f
    }
    var d = j.x + c * (f.x - j.x) / g;
    var b = j.y + c * (f.y - j.y) / g;
    if (isNaN(d) || isNaN(b)) {
        alert("�������������,x:" + d + ",:" + b);
        throw new Error(101, "startPoint:" + j.toString() + ",endPoint:" + f.toString() + ",len:" + g)
    }
    h.x = d;
    h.y = b;
    return h
};
MBR.intersection = function(b, d) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "MBR")) {
            throw EzErrorFactory.createError("MBR.intersection������arguments[0]�������Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(d, "MBR")) {
            throw EzErrorFactory.createError("MBR.intersection������arguments[1]�������Ͳ���ȷ")
        }
        if (b.maxX < d.minX || b.maxY < d.minY || d.maxX < b.minX || d.maxY < b.minY) {
            throw EzErrorFactory.createError("arguments[0]��arguments[1]����MBR֮��û�н���")
        } else {
            return new MBR(Math.max(b.minX, d.minX), Math.max(b.minY, d.minY), Math.min(b.maxX, d.maxX), Math.min(b.maxY, d.maxY))
        }
    } catch(c) {
        throw EzErrorFactory.createError("MBR.intersection����ִ�в���ȷ", c)
    }
};
MBR.union = function(b, d) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "MBR")) {
            throw EzErrorFactory.createError("MBR.union������arguments[0]�������Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(d, "MBR")) {
            throw EzErrorFactory.createError("MBR.union������arguments[1]�������Ͳ���ȷ")
        }
        return new MBR(Math.min(b.minX, d.minX), Math.min(b.minY, d.minY), Math.max(b.maxX, d.maxX), Math.max(b.maxY, d.maxY))
    } catch(c) {
        throw EzErrorFactory.createError("MBR.union����ִ�в���ȷ", c)
    }
};
MainFrame.sortByPriority = function(f, d) {
    var g = d.priority - f.priority;
    return g
};
MainFrame.orderLocations = function(c, b) {
    if (c.point.y > b.point.y) {
        return - 1
    }
    if (c.point.y < b.point.y) {
        return 1
    }
    return 0
};
Icon.classes = {};
Icon.classNames = [];
Icon.getPadding = function() {
    var b = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    };
    for (var c = 0; c < this.classNames.length; ++c) {
        var d = this.classes[this.classNames[c]];
        b.top = Math.max(b.top, d.pointCoord.y);
        b.bottom = Math.max(b.bottom, d.height - d.pointCoord.y);
        b.left = Math.max(b.left, d.pointCoord.x);
        b.right = Math.max(b.right, d.width - d.pointCoord.x)
    }
    return b
};
Icon.load = function(b) {
    Icon.classes[b.name] = b;
    Icon.classNames.push(b.name)
};
Icon.get = function(b) {
    return Icon.classes[b]
};
var xh = [9, 0, 6, 1, 4, 2, 2, 4, 0, 8, 0, 12, 1, 14, 2, 16, 5, 19, 7, 23, 8, 26, 9, 30, 9, 34, 11, 34, 11, 30, 12, 26, 13, 24, 14, 21, 16, 18, 18, 16, 20, 12, 20, 8, 18, 4, 16, 2, 15, 1, 13, 0];
Icon.load(new Icon("local", 20, 34, new Point(9, 34), new Point(9, 2), new Point(17, 23), _ImageBaseUrl + "shadow50.png", 37, xh));
Icon.load(new Icon("noicon", 0, 0, new Point(0, 0), new Point(0, 0), new Point(0, 0), null, 0, null));
EzLog.bLog = true;
EzLog.write = function() {};
EzLog.writeRaw = function(b) {};
EzLog.writeXML = function(b) {};
EzLog.dump = function(b) {};
EzLog.incompatible = function() {};
EzLog.clear = function() {};
_debugWin = null;
EzLog.print = function(c) {
    if (_debugWin == null) {
        var b = "width=200,height=400";
        b = b + ",menubar=yes,scrollbars=yes,resizable=no,location=no, status=no";
        _debugWin = window.open("", "default", b);
        _debugWin.document.writeln("<html><head><title>��ͼ��ӡ</title><script>function unload(){opener._debugWin=null;}<\/script></head><body onbeforeunload='unload()'></body></html>")
    }
    _debugWin.document.body.innerHTML += "<br>" + c
};
Timer.start = function() {};
Timer.end = function() {};
Timer.addTime = function(b) {};
Function.method("inherits",
function(c) {
    var g = 0,
    f = (this.prototype = new c());
    this.method("uber",
    function b(h) {
        var l, k, j = g,
        d = c.prototype;
        if (j) {
            while (j) {
                d = d.constructor.prototype;
                j -= 1
            }
            l = d[h]
        } else {
            l = f[h];
            if (l == this[h]) {
                l = d[h]
            }
        }
        g += 1;
        k = l.apply(this, Array.prototype.slice.apply(arguments, [1]));
        g -= 1;
        return k
    });
    return this
});
Function.method("swiss",
function(d) {
    for (var c = 1; c < arguments.length; c += 1) {
        var b = arguments[c];
        this.prototype[b] = d.prototype[b]
    }
    return this
});
EzManager.valid = function(d, f, g) {
    window.status = "������֤....";
    var b = new Date();
    var c = m_strBasePath + "/js/EzMap_allow.jsp?UserName=" + d + "&Password=" + f + "&IP=" + g + "&time=" + b.getTime();
    getDataFromServer("log", c,
    function() {
        window.status = "��֤....���"
    })
};
iOverLay.closeInfo = function() {
    if (this.timeout) {
        clearTimeout(this.timeout)
    }
    this.timeout = this.setTimeout("this.closeInfoWait(false)", 0)
};
iOverLay.closeInfoWait = function(c) {
    if (!c && this.bOutOfInfo == false) {
        return
    }
    var b = document.getElementById("InfoDiv");
    if (b) {
        b.style.display = "none"
    }
};
MapsApp.getMeter = function(f, d) {
    var b = new Point(f.x + d, f.y);
    var c = GetDistanceInLL(f, b);
    return c
};
MapsApp.getDegree = function(g, d) {
    var c = 1;
    var b = new Point(g.x + c, g.y);
    var h = GetDistanceInLL(g, b);
    var f = c * d / h;
    return f
};
MultiMaps.curMap = null;
EzServerClient.GlobeParams.VersionArr = [];
EzServerClient.GlobeParams.VersionInfo = [];
EzServerClient.GlobeParams.VersionInfo.push("defaultMapVersion");
EzServerClient.GlobeParams.TempStrParam = "";
for (var i = 0; i < EzServerClient.GlobeParams.MapSrcURL.length; i++) {
    if (i == EzServerClient.GlobeParams.MapSrcURL.length - 1) {
        EzServerClient.GlobeParams.TempStrParam += "EzServerClient.GlobeParams.MapSrcURL[" + i + "][1]"
    } else {
        EzServerClient.GlobeParams.TempStrParam += "EzServerClient.GlobeParams.MapSrcURL[" + i + "][1], "
    }
}
EzServerClient.GlobeParams.VersionArr.defaultMapVersion = eval("new MapServer(" + EzServerClient.GlobeParams.TempStrParam + ")");
MainFrame.addVersion = function(b, c) {
    if (c && c instanceof MapServer) {
        EzServerClient.GlobeParams.VersionArr[b] = c;
        EzServerClient.GlobeParams.VersionInfo.push(b)
    } else {
        alert("pMapServerΪ�ջ���MapServer���ͣ�")
    }
};
MainFrame.getVersionInfo = function() {
    return EzServerClient.GlobeParams.VersionInfo.join(",")
};
MapsApp.getVersionInfo = function() {
    return EzServerClient.GlobeParams.VersionInfo.join(",")
};
MapsApp.addVersion = function(b, c) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "string")) {
            throw EzErrorFactory.createError("EzMap.addVersion������arguments[0]���Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "MapServer")) {
            throw EzErrorFactory.createError("EzMap.addVersion������arguments[1]���Ͳ���ȷ")
        }
        MainFrame.addVersion(b, c)
    } catch(d) {
        throw EzErrorFactory.createError("EzMap.addVersion����ִ�в���ȷ", d)
    }
};
EzColorPicker.close = function() {
    if (g_color_palette) {
        g_color_palette.style.display = "none"
    }
};
divCreator.count = 0;
divCreator.createElement = function(j, c, h) {
    if (typeof arguments.callee.hasFilters == "undefined") {
        var b = document.createElement("DIV");
        arguments.callee.hasFilters = typeof b.style.filter != "undefined"
    }
    var d;
    if (arguments.callee.hasFilters) {
        if (!h) {
            h = document
        }
        var g = h.PNG_cache;
        if (g && g.childNodes.length > 0) {
            d = g.removeChild(g.lastChild)
        } else {
            d = h.createElement("DIV");
            divCreator.destroyBeforeUnload(d)
        }
        if (!d.loader) {
            d.loader = h.createElement("img");
            d.loader.style.visibility = "hidden";
            d.loader.onload = function() {
                if (!d.cleared) {
                    d.style.filter = divCreator.alphaImageLoader(this.src, true)
                }
            }
        }
    } else {
        d = document.createElement("img")
    }
    divCreator.setImage(d, j, c);
    return d
};
divCreator.create = function(k, c, j, f, d, b, h, g) {
    return Shaderer.create(k, c, j, f, d, b, h, g, divCreator.createElement)
};
divCreator.alphaImageLoader = function(g, f) {
    var j = "DXImageTransform.Microsoft.AlphaImageLoader";
    var h = ",sizingMethod=" + (f ? "crop": "scale");
    return "progid:" + j + '(src="' + g + '"' + h + ")"
};
divCreator.remove = function(d, c) {
    if (d.nodeName == "DIV") {
        if (!c.PNG_cache) {
            c.PNG_cache = c.createElement("div");
            c.PNG_cache.style.display = "none";
            c.body.appendChild(c.PNG_cache)
        }
        c.PNG_cache.appendChild(d);
        divCreator.clearImage(d)
    } else {
        RemoveImg(d)
    }
};
divCreator.setImage = function(f, d, g) {
    if (f.tagName == "DIV") {
        f.cleared = false;
        f.loader.ieCrop = g || false;
        f.loader.src = d
    } else {
        f.src = d
    }
};
divCreator.clearImage = function(d, c) {
    if (d.tagName == "DIV") {
        d.cleared = true;
        d.style.filter = ""
    } else {
        d.src = c
    }
};
divCreator.destroyBeforeUnload = function(b) {
    if (!divCreator.cleanupQueue) {
        divCreator.cleanupQueue = [];
        EventManager.addUnloadFunc(divCreator.onUnload)
    }
    divCreator.cleanupQueue.push(b)
};
divCreator.onUnload = function() {
    window.status = "�����DOM������..";
    window.defaultStatus = "";
    for (var b = 0; b < divCreator.cleanupQueue.length; ++b) {
        window.status = "�����DOM������.." + b;
        divCreator.destroyImage(divCreator.cleanupQueue[b])
    }
};
divCreator.destroyImage = function(b) {
    if (b.loader) {
        b.loader.onload = null;
        b.loader = null
    }
};
Shaderer.create = function(c, d, b, h, n, l, j, m, g) {
    var k;
    if (!g) {
        k = document.createElement("IMG");
        if (c) {
            k.src = c
        }
    } else {
        k = g(c, j, m)
    }
    if (d && b) {
        k.style.width = convert2Px(d);
        k.style.height = convert2Px(b);
        k.width = d;
        k.height = b
    }
    if (n || (h || (n == 0 || h == 0))) {
        k.style.position = "absolute";
        k.style.left = convert2Px(h);
        k.style.top = convert2Px(n)
    }
    if (l || l == 0) {
        k.style.zIndex = l
    }
    if (_IEBrowser.type == 1) {
        k.unselectable = "on";
        k.onselectstart = _NoAction
    } else {
        k.style.MozUserSelect = "none"
    }
    k.style.border = "0";
    k.oncontextmenu = _NoAction;
    return k
};
xa.create = function(b) {
    if (!b) {
        b = "_dtc"
    }
    if (!sb[b]) {
        sb[b] = 1
    } else {
        sb[b]++
    }
    return new xa(sb[b], b)
};
xa.invalidateAll = function() {
    for (var d in sb) {
        try {
            sb[d]++
        } catch(c) {}
    }
};
xa.invalidate = function(b) {
    sb[b]++
};
XMLHttp.create = function() {
    if (typeof ActiveXObject != "undefined") {
        return new ActiveXObject("Microsoft.XMLHTTP")
    } else {
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest()
        } else {
            return null
        }
    }
};
V.cache_ = new Object();
V.create = function(b) {
    return new V(b)
};
V.getCached = function(b) {
    return V.cache_[b]
};
V.cache = function(c, b) {
    V.cache_[c] = b
};
V.asynchronousTransform = function(d, j, c, g, h) {
    var b = V.getCached(c);
    var f = bindingDoc("");
    var b = V.create(f);
    b.transformToHTML(d, j);
    V.cache(c, b);
    if (g) {
        g()
    } else {
        alert("no function")
    }
    return
};
_showFloatResult = true;
function DocParser(b) {
    this.strXML = b;
    this.Doc = this.getDoc(b)
}
DocParser.prototype.getDoc = function(f) {
    try {
        if (typeof ActiveXObject != "undefined") {
            var d = new ActiveXObject("Microsoft.XMLDOM");
            d.loadXML(f);
            return d
        } else {
            if (typeof DOMParser != "undefined") {
                return (new DOMParser()).parseFromString(f, "text/xml")
            } else {
                alert("�޷�����XML����....");
                return null
            }
        }
    } catch(c) {
        alert("��ʼ��XML����������!")
    }
};
DocParser.prototype.getFirstNodeValue = function(c) {
    var f = this.Doc;
    var b = f.getElementsByTagName(c);
    var d = null;
    if (b.length > 0) {
        d = getDocNodeValue(b[0])
    }
    return d
};
DocParser.prototype.getLastNodeValue = function(c) {
    var b = this.Doc.getElementsByTagName(c);
    var d = null;
    if (b.length > 0) {
        d = getDocNodeValue(b[b.length - 1])
    }
    return d
};
DocParser.prototype.getFirstNode = function(c) {
    var b = this.Doc.getElementsByTagName(c);
    var d = null;
    if (b.length > 0) {
        d = b[0]
    }
    return d
};
DocParser.prototype.getLastNode = function(c) {
    var b = this.Doc.getElementsByTagName(c);
    var d = null;
    if (b.length > 0) {
        d = b[b.length - 1]
    }
    return d
};
DocParser.prototype.getNodes = function(c) {
    var b = this.Doc.getElementsByTagName(c);
    return b
};
function EzLayer(b) {
    this.tableName = "";
    this.layerName = "";
    this.MBR = null;
    this.queryObj = null;
    this.editObj = null;
    this.features = new Array();
    this.imgURL = null;
    this.imgHeight = 32;
    this.imgWidth = 32;
    this.leftOffset = 0;
    this.topOffset = 0;
    this.isVisable = true;
    this.minLevel = 3;
    this.maxLevel = 15;
    this.fields = null;
    this.fieldsDisp = null;
    this.beginrecord = -1;
    this.maxRecord = -1;
    this.bIsLabel = true;
    this.tableInfo = null;
    this.bShow = true;
    this.setLayerInfo(b);
    this.geometryType = ""
}
EzLayer.sortByName = function(d, c) {
    d = d.dispname;
    c = c.dispname;
    var g = parseFloat(d);
    var f = parseFloat(c);
    var h = 1;
    if (isNaN(g) || isNaN(f)) {
        h = d.localeCompare(c)
    } else {
        h = g - f
    }
    return h
};
EzLayer.sortByNumber = function(f, d) {
    var g = d.dispname - f.dispname;
    return g
};
EzLayer.prototype.sort = function() {
    this.features.sort(EzLayer.sortByName)
};
EzLayer.prototype.toTable = function(d) {
    var b = document.createElement("table");
    b.border = 0;
    b.id = "EzLayerTable";
    b.align = "center";
    b.cellspacing = 0;
    b.cellpadding = 0;
    var m = 0;
    var g = this.features;
    var f = b.insertRow(m);
    var r = this.fieldsDisp;
    for (var o = 0; o < r.length; o++) {
        var k = r[o];
        var j = f.appendChild(document.createElement("th"));
        j.innerHTML = k
    }
    m = 1;
    for (var l = 0; l < g.length; l++) {
        var h = g[l];
        var f = b.insertRow(m);
        for (var q = 0; q < h.fieldValues.length; q++) {
            var n = h.fieldValues[q];
            var c = f.insertCell(q);
            if (n == null || n == "") {
                n = "&nbsp;"
            }
            c.innerHTML = n
        }
        m++
    }
    return b
};
EzLayer.prototype.setLayerInfo = function(b) {
    if (b instanceof QueryObject) {
        this.queryObj = b;
        this.tableName = b.tableName.toUpperCase();
        this.layerName = b.layerName;
        this.layerId = b.layerId + "";
        this.fields = b.fields;
        this.fieldsDisp = b.fieldsDisp;
        this.imgURL = b.imgURL;
        this.bIsLabel = b.bIsLabel;
        this.imgHeight = b.imgHeight;
        this.imgWidth = b.imgWidth;
        this.leftOffset = b.leftOffset;
        this.topOffset = b.topOffset;
        this.tableInfo = b.tableInfo;
        this.beginrecord = b.beginrecord
    } else {
        if (b instanceof EditObject) {
            this.editObj = b;
            this.tableName = b.tableName.toUpperCase()
        }
    }
};
EzLayer.prototype.getFieldInd = function(d) {
    var c = -1;
    for (var b = 0; b < this.fields.length; b++) {
        if (this.fields[b].toUpperCase() == d.toUpperCase()) {
            c = b;
            break
        }
    }
    return c
};
EzLayer.prototype.getFieldsSize = function() {
    if (this.fields == null) {
        return 0
    } else {
        return this.fields.length
    }
};
EzLayer.prototype.getFieldsCount = function() {
    if (this.fields == null) {
        return 0
    } else {
        return this.fields.length
    }
};
function QueryObject() {
    this.queryType = 6;
    this.tableName;
    this.layerName = "";
    this.layerId = "";
    this.subFields = "#ALL#";
    this.dispField;
    this.coordsType = "multipoint";
    this.coords = "";
    this.radius = 0.01;
    this.unit = "degree";
    this.where = "";
    this.html = "";
    this.featurelimit = 10;
    this.beginrecord = 1;
    this.imgURL = "image/tack.gif";
    this.imgWidth = 39;
    this.imgHeight = 38;
    this.leftOffset = 19;
    this.topOffset = -19;
    this.fields = new Array();
    this.fieldsDisp = new Array();
    this.bIsLabel = true;
    this.filtertblName = "";
    this.filterShape = "";
    this.filterWhere = "";
    this.srcUnit = "meter";
    if (typeof _MapSpanScale == "undefined" || _MapSpanScale == 1) {
        this.srcUnit = "degree"
    }
    this.serviceSource = null;
    this.precision = 6;
    this.baseDistanceTolerance = 0.0001;
    this.orderByClause = ""
}
QueryObject.prototype.next = function() {
    this.beginrecord = this.beginrecord + this.featurelimit
};
QueryObject.prototype.prev = function() {
    this.beginrecord = this.beginrecord - this.featurelimit
};
QueryObject.prototype.addField = function(b, c) {
    this.fields.push(b);
    this.fieldsDisp.push(c)
};
QueryObject.prototype.addSubFields = function(c) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(c, "string"))) {
            throw EzErrorFactory.createError("QueryObject::addSubFields������arguments[0]���Ͳ���ȷ")
        }
        this.subFields = c;
        var d = c.split(";");
        for (var g = 0; g < d.length; g++) {
            var b = d[g].split(":");
            if (b.length > 1) {
                this.fields.push(b[0]);
                this.fieldsDisp.push(b[1])
            }
        }
    } catch(f) {
        throw EzErrorFactory.createError("QueryObject::addSubFields�����в���ȷ", f)
    }
};
QueryObject.prototype.toxml = function() {
    var b = "";
    if (typeof this.layerId == "number") {
        this.layerId = this.layerId + ""
    }
    if (this.layerId == "") {
        if (this.layerName != "") {
            this.layerId = this.layerName
        } else {
            this.layerId = this.tableName
        }
    } else {}
    if (this.queryType == 1) {
        b = this.getIdentifyReq()
    } else {
        if (this.queryType == 2) {
            b = this.getRectReq()
        } else {
            if (this.queryType == 3) {
                b = this.getCircleReq()
            } else {
                if (this.queryType == 4) {
                    b = this.getMultiPolygonReq()
                } else {
                    if (this.queryType == 5) {
                        b = this.getAroundReq()
                    } else {
                        if (this.queryType == 6) {
                            b = this.getFuzyReq()
                        } else {
                            if (this.queryType == 7) {
                                b = this.getBelongAreaReq()
                            } else {}
                        }
                    }
                }
            }
        }
    }
    return b
};
QueryObject.prototype.getIdentifyReq = function() {
    var c = this.coords.split(",");
    var f = "";
    for (var d = 0; d < c.length; d = d + 2) {
        f += '<POINT x="' + c[d] + '" y="' + c[d + 1] + '" />'
    }
    var b = "";
    b = b + '<?xml version="1.0" encoding="GBK"?>';
    b = b + '<EASYXML version="1.0">';
    b = b + "<REQUEST>";
    b = b + '<GET_FEATURES featurelimit="' + this.featurelimit + '" beginrecord="' + this.beginrecord + '" >';
    b = b + '<LAYER name="' + this.tableName + '" id="' + this.layerId + '" >';
    b = b + '<SPATIALQUERY subfields="' + EzServerClient.GlobeFunction.EzEncoding(this.subFields) + '" dispfield ="' + this.dispField + '" where="' + EzServerClient.GlobeFunction.EzEncoding(this.where) + '" orderby="' + this.orderByClause + '">';
    b = b + '<SPATIALFILTER relation="pnt_intersection" distance="' + this.radius + '" unit="' + this.unit + '">';
    b = b + "<MULTIPOINT>";
    b = b + f;
    b = b + "</MULTIPOINT>";
    b = b + "</SPATIALFILTER>";
    b = b + "</SPATIALQUERY>";
    b = b + "</LAYER>";
    b = b + "</GET_FEATURES>";
    b = b + "</REQUEST>";
    b = b + "</EASYXML>";
    return b
};
QueryObject.prototype.getRectReq = function() {
    var h = "";
    var d = this.coords.split(",");
    var c = d[0];
    var b = d[1];
    var g = d[2];
    var f = d[3];
    h = h + '<?xml version="1.0" encoding="GBK"?>';
    h = h + '<EASYXML version="1.0">';
    h = h + "<REQUEST>";
    h = h + '<GET_FEATURES featurelimit="' + this.featurelimit + '" beginrecord="' + this.beginrecord + '" >';
    h = h + '<LAYER name="' + this.tableName + '" id="' + this.layerId + '" >';
    h = h + '<SPATIALQUERY subfields="' + EzServerClient.GlobeFunction.EzEncoding(this.subFields) + '" dispfield ="' + this.dispField + '" where="' + EzServerClient.GlobeFunction.EzEncoding(this.where) + '" orderby="' + this.orderByClause + '">';
    h = h + '<SPATIALFILTER relation="envelope_intersection">';
    h = h + '<ENVELOPE  minx="' + c + '" miny="' + b + '" maxx="' + g + '" maxy="' + f + '" />';
    h = h + "</SPATIALFILTER>";
    h = h + "</SPATIALQUERY>";
    h = h + "</LAYER>";
    h = h + "</GET_FEATURES>";
    h = h + "</REQUEST>";
    h = h + "</EASYXML>";
    return h
};
QueryObject.prototype.getCircleReq = function() {
    var d = "";
    var b = this.coords.split(",");
    var c = b[0];
    var f = b[1];
    this.radius = b[2];
    d = d + '<?xml version="1.0" encoding="GBK"?>';
    d = d + '<EASYXML version="1.0">';
    d = d + "<REQUEST>";
    d = d + '<GET_FEATURES featurelimit="' + this.featurelimit + '" beginrecord="' + this.beginrecord + '" >';
    d = d + '<LAYER name="' + this.tableName + '" id="' + this.layerId + '" >';
    d = d + '<SPATIALQUERY subfields="' + EzServerClient.GlobeFunction.EzEncoding(this.subFields) + '" dispfield ="' + this.dispField + '" where="' + EzServerClient.GlobeFunction.EzEncoding(this.where) + '" orderby="' + this.orderByClause + '">';
    d = d + '<SPATIALFILTER relation="envelope_intersection">';
    d = d + '<CIRCLE   xx="' + c + '" yy="' + f + '" radius="' + this.radius + '" unit="' + this.unit + '" />';
    d = d + "</SPATIALFILTER>";
    d = d + "</SPATIALQUERY>";
    d = d + "</LAYER>";
    d = d + "</GET_FEATURES>";
    d = d + "</REQUEST>";
    d = d + "</EASYXML>";
    return d
};
QueryObject.prototype.getMultiPolygonReq = function() {
    var h = "";
    var b = this.coords.split(";");
    var l = "";
    for (var g = 0; g < b.length; g++) {
        var d = b[g];
        var m = d.split(",");
        var c = m.length / 2;
        l += "<RING>";
        for (var f = 0; f < c; f++) {
            var k = m[2 * f];
            var j = m[2 * f + 1];
            l = l + '<Point x="' + k + '" y="' + j + '"/>'
        }
        l += "</RING>"
    }
    h = h + '<?xml version="1.0" encoding="GBK"?>';
    h = h + '<EASYXML version="1.0">';
    h = h + "<REQUEST>";
    h = h + '<GET_FEATURES featurelimit="' + this.featurelimit + '" beginrecord="' + this.beginrecord + '" >';
    h = h + '<LAYER name="' + this.tableName + '" id="' + this.layerId + '" >';
    h = h + '<SPATIALQUERY subfields="' + EzServerClient.GlobeFunction.EzEncoding(this.subFields) + '" dispfield ="' + this.dispField + '" where="' + EzServerClient.GlobeFunction.EzEncoding(this.where) + '" orderby="' + this.orderByClause + '">';
    h = h + '<SPATIALFILTER relation="area_intersection">';
    h = h + "<POLYGON>";
    h = h + l;
    h = h + "</POLYGON>";
    h = h + "</SPATIALFILTER>";
    h = h + "</SPATIALQUERY>";
    h = h + "</LAYER>";
    h = h + "</GET_FEATURES>";
    h = h + "</REQUEST>";
    h = h + "</EASYXML>";
    return h
};
QueryObject.prototype.getAroundReq = function() {
    var h = "";
    var d = this.coords.split(",");
    var g = "";
    var c = d.length / 2;
    for (var f = 0; f < c; f++) {
        var b = d[2 * f];
        var j = d[2 * f + 1];
        g = g + '<POINT x="' + b + '" y="' + j + '"/>'
    }
    h = h + '<?xml version="1.0" encoding="GBK"?>';
    h = h + '<EASYXML version="1.0">';
    h = h + "<REQUEST>";
    h = h + '<GET_FEATURES featurelimit="' + this.featurelimit + '" beginrecord="' + this.beginrecord + '" >';
    h = h + '<BUFFERQUERY  ftype="' + this.coordsType + '" coords ="' + this.coords + '">';
    h = h + '<BUFFER distance="' + this.radius + '" bufferunits="' + this.unit + '" srcunit="' + this.srcUnit + '" >';
    h = h + '<TARGETLAYER name="' + this.tableName + '" id="' + this.layerId + '" >';
    h = h + '<SPATIALQUERY subfields="' + EzServerClient.GlobeFunction.EzEncoding(this.subFields) + '" dispfield ="' + this.dispField + '" jointables="" joinexpression="" where="' + EzServerClient.GlobeFunction.EzEncoding(this.where) + '" orderby="' + this.orderByClause + '">';
    h = h + "</SPATIALQUERY>";
    h = h + "</TARGETLAYER>";
    h = h + "</BUFFER>";
    h = h + "</BUFFERQUERY >";
    h = h + "</GET_FEATURES>";
    h = h + "</REQUEST>";
    h = h + "</EASYXML>";
    return h
};
QueryObject.prototype.getFuzyReq = function() {
    var b = "";
    b = b + '<?xml version="1.0" encoding="GBK"?>';
    b = b + '<EASYXML version="1.0">';
    b = b + "<REQUEST>";
    b = b + '<GET_FEATURES featurelimit="' + this.featurelimit + '" beginrecord="' + this.beginrecord + '" >';
    b = b + '<LAYER name="' + this.tableName + '" id="' + this.layerId + '" >';
    b = b + '<SPATIALQUERY subfields="' + EzServerClient.GlobeFunction.EzEncoding(this.subFields) + '" dispfield ="' + this.dispField + '" where="' + EzServerClient.GlobeFunction.EzEncoding(this.where) + '" orderby="' + this.orderByClause + '">';
    b = b + "</SPATIALQUERY>";
    b = b + "</LAYER>";
    b = b + "</GET_FEATURES>";
    b = b + "</REQUEST>";
    b = b + "</EASYXML>";
    return b
};
QueryObject.prototype.getBelongAreaReq = function() {
    var b = "";
    b = b + '<?xml version="1.0" encoding="GBK"?>';
    b = b + '<EASYXML version="1.0">';
    b = b + "<REQUEST>";
    b = b + '<GET_FEATURES featurelimit="' + this.featurelimit + '" beginrecord="' + this.beginrecord + '" >';
    b = b + '<LAYER name="' + this.tableName + '" id="' + this.layerId + '" >';
    b = b + '<SPATIALQUERY subfields="' + EzServerClient.GlobeFunction.EzEncoding(this.subFields) + '" dispfield ="' + this.dispField + '" jointables="" joinexpression="" where="' + this.where + '" orderby="' + this.orderByClause + '">';
    b = b + '<SPATIALFILTER relation="area_intersection">';
    b = b + '<FILTERLAYER layername="' + this.filtertblName + '" shpfield="' + this.filterShape + '" where="' + EzServerClient.GlobeFunction.EzEncoding(this.filterWhere) + '" />';
    b = b + "</SPATIALFILTER>";
    b = b + "</SPATIALQUERY>";
    b = b + "</LAYER>";
    b = b + "</GET_FEATURES>";
    b = b + "</REQUEST>";
    b = b + "</EASYXML>";
    return b
};
function FeatureObject(b) {
    this.dispname = "";
    this.dispFieldValue = "";
    this.type;
    this.point;
    this.linestr;
    this.html;
    this.fieldValues = new Array();
    if (b == null) {
        throw new Error("���ڹ��캯���д���ͼ�����!")
    }
    this.layInfo = b
}
FeatureObject.prototype.addFieldValue = function(c, b) {
    this.fieldValues.push(b)
};
_VideoName = null;
function playVideo() {
    window.open("media.htm", "��Ƶ����", "height=300, width=460, top=0, left=0, toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no")
}
FeatureObject.prototype.getMBR = function() {
    var b = getPathMBR(this.linestr);
    return b
};
function getCenterOfPaths(d) {
    var c = trans2Points(d);
    var b = Math.floor(c.length / 2);
    return c[b]
}
FeatureObject.prototype.getCenterPoint = function() {
    if (this.linestr) {
        return getCenterOfPaths(this.linestr)
    } else {
        return this.point
    }
};
FeatureObject.prototype.getLength = function() {
    var c = 0;
    try {
        var b = trans2Points(this.linestr);
        c = CalculateLength(b);
        c = Math.floor(c)
    } catch(d) {}
    return c
};
FeatureObject.prototype.toHTML = function(h) {
    var d = document.createElement("table");
    d.border = 0;
    d.id = "InfoTable";
    d.align = "center";
    d.cellspacing = 0;
    d.cellpadding = 0;
    var o = this.fieldValues.length;
    var l = 0;
    for (var k = 0; k < o; k++) {
        var j = "";
        var m = "";
        m = this.fieldValues[k];
        j = this.layInfo.fieldsDisp[k];
        if (m == null || m == "" || m == "undefined" || j == "no") {
            continue
        }
        var g = d.insertRow(l);
        g.height = 10;
        var f = g.insertCell(0);
        if (m.toLowerCase().indexOf("http") != -1) {
            f.colspan = 2;
            var n = document.createElement("a");
            var c = m;
            if (m.toLowerCase().indexOf(".avi") != -1 || m.toLowerCase().indexOf(".mpg") != -1) {
                c = "javascript:void(0);";
                n.onclick = "_VideoName='" + m + "';playVideo();"
            } else {
                n.target = "_blank"
            }
            n.href = c;
            n.innerHTML = j;
            f.innerHTML = n.outerHTML;
            f.align = "center"
        } else {
            f.innerHTML = j;
            f.className = "leftBorder";
            var b = g.insertCell(1);
            b.className = "rightBorder";
            if (m != null) {
                m = m.replace(/ /g, "");
                if (m == "") {
                    m = "&nbsp;"
                }
            } else {
                m = "&nbsp;"
            }
            b.innerHTML = m
        }
        l++
    }
    if (h) {
        var g = d.insertRow(l);
        var f = g.insertCell(0);
        f.colspan = 2;
        f.align = "center";
        if (typeof h == "string") {
            f.innerHTML = h
        } else {
            f.appendChild(h)
        }
    }
    return d.outerHTML
};
FeatureObject.prototype.getField = function(b) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(b, "int"))) {
            throw EzErrorFactory.createError("FeatureObject::getField������arguments[0]���Ͳ���ȷ")
        }
        return this.layInfo.fields[b]
    } catch(c) {
        throw EzErrorFactory.createError("FeatureObject::getField�����в���ȷ", c)
    }
};
FeatureObject.prototype.getFieldValue = function(b) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(b, "string")) && !(EzServerClient.GlobeFunction.isTypeRight(b, "int"))) {
            throw EzErrorFactory.createError("FeatureObject::getFieldValue������arguments[0]���Ͳ���ȷ")
        }
        var f = null;
        var c = null;
        if (typeof b == "string") {
            c = this.layInfo.getFieldInd(b)
        } else {
            if (typeof b == "number") {
                c = b
            }
        }
        f = this.fieldValues[c];
        return f
    } catch(d) {
        throw EzErrorFactory.createError("FeatureObject::getFieldValue�����в���ȷ", d)
    }
};
FeatureObject.prototype.getDispField = function(b) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(b, "int"))) {
            throw EzErrorFactory.createError("FeatureObject::getDispField������arguments[0]���Ͳ���ȷ")
        }
        return this.layInfo.fieldsDisp[b]
    } catch(c) {
        throw EzErrorFactory.createError("FeatureObject::getDispField�����в���ȷ", c)
    }
};
function EditObject(f, c, b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(f, "string")) {
            throw EzErrorFactory.createError("EditObject���췽����arguments[0]�������Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "string")) {
            throw EzErrorFactory.createError("EditObject���췽����arguments[1]�������Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "string")) {
            throw EzErrorFactory.createError("EditObject���췽����arguments[2]�������Ͳ���ȷ")
        }
        this.otype = f;
        this.gtype = c;
        this.where;
        this.tableName = b;
        this.fields = new Array();
        this.fieldsValue = new Array();
        this.serviceSource = null
    } catch(d) {
        throw EzErrorFactory.createError("EditObject���췽��ִ�в���ȷ", d)
    }
}
EditObject.prototype.addField = function(d, c) {
    try {
        if (! (EzServerClient.GlobeFunction.isTypeRight(d, "string"))) {
            throw EzErrorFactory.createError("EditObject::addField������arguments[0]���Ͳ���ȷ")
        }
        if (! (EzServerClient.GlobeFunction.isTypeRight(c, "string"))) {
            throw EzErrorFactory.createError("EditObject::addField������arguments[1]���Ͳ���ȷ")
        }
        this.fields.push(d.toUpperCase());
        this.fieldsValue.push(c)
    } catch(b) {
        throw EzErrorFactory.createError("EditObject::addField�����в���ȷ", b)
    }
};
EditObject.prototype.toAddXML = function() {
    var c = "";
    c = c + '<?xml version="1.0" encoding="GBK"?>';
    c = c + '<EASYXML version="1.0">';
    c = c + "<REQUEST>";
    c = c + "<EDIT_ATTRS >";
    c = c + '<TABLE name="' + this.tableName + '" gtype="' + this.gtype + '"> ';
    c = c + "<INSERT>";
    c = c + "<FIELDS>";
    for (var b = 0; b < this.fields.length; b++) {
        c = c + '<FIELD name="' + this.fields[b] + '" value="' + EzServerClient.GlobeFunction.EzEncoding(this.fieldsValue[b]) + '" />'
    }
    c = c + "</FIELDS>";
    c = c + "</INSERT>";
    c = c + "</TABLE>";
    c = c + "</EDIT_ATTRS>";
    c = c + "</REQUEST>";
    c = c + "</EASYXML>";
    return c
};
EditObject.prototype.toDelXML = function() {
    if (this.where == null || this.where == "") {
        throw new Error("where����Ϊ�գ������ã�")
    }
    var c = "";
    var b = "";
    c = c + '<?xml version="1.0" encoding="GBK"?>';
    c = c + '<EASYXML version="1.0">';
    c = c + "<REQUEST>";
    c = c + "<EDIT_ATTRS >";
    c = c + '<TABLE name="' + this.tableName + '" gtype="' + this.gtype + '"> ';
    c = c + ' <DELETE where="' + EzServerClient.GlobeFunction.EzEncoding(this.where) + '">';
    c = c + "	</DELETE>";
    c = c + "</TABLE>";
    c = c + "</EDIT_ATTRS>";
    c = c + "</REQUEST>";
    c = c + "</EASYXML>";
    return c
};
EditObject.prototype.toUpdateXML = function() {
    if (this.where == null || this.where == "") {
        throw new Error("where����Ϊ�գ������ã�")
    }
    var c = "";
    c = c + '<?xml version="1.0" encoding="GBK"?>';
    c = c + '<EASYXML version="1.0">';
    c = c + "<REQUEST>";
    c = c + "<EDIT_ATTRS >";
    c = c + '<TABLE name="' + this.tableName + '" gtype="' + this.gtype + '"> ';
    c = c + '<UPDATE where="' + EzServerClient.GlobeFunction.EzEncoding(this.where) + '">';
    c = c + "<FIELDS>";
    for (var b = 0; b < this.fields.length; b++) {
        c = c + '<FIELD name="' + this.fields[b] + '" value="' + EzServerClient.GlobeFunction.EzEncoding(this.fieldsValue[b]) + '" />'
    }
    c = c + "</FIELDS>";
    c = c + "</UPDATE >";
    c = c + "</TABLE>";
    c = c + "</EDIT_ATTRS>";
    c = c + "</REQUEST>";
    c = c + "</EASYXML>";
    return c
};
EditObject.prototype.toxml = function() {
    if (this.otype == "") {
        throw new Error("�����ò�������,����otype:add|del|update")
    }
    if (this.tableName == "") {
        throw new Error("�����ñ���,����tableName")
    }
    if (this.gtype == "") {
        throw new Error("�����ü�������,����gtype:Point|MultiPoint|Polyline|MultiPolyline|Polygon|MultiPolygon")
    }
    var b = "";
    var c = this.otype;
    if (c == "add") {
        b = this.toAddXML()
    } else {
        if (c == "del") {
            b = this.toDelXML()
        } else {
            if (c == "update") {
                b = this.toUpdateXML()
            } else {
                throw new Error("û��˵�����������ͣ�")
            }
        }
    }
    return b
};
var _LayerArr = null;
var bIsWriteFile = true;
var _EzServerClientQueryIsOK = false;
MapsApp.prototype.processEditXML = function(g, d) {
    var h = new DocParser(g);
    var f = h.getFirstNode("RESPONSE");
    var b = true;
    var c = "processEditXML";
    if (f == null) {
        b = false;
        c = "���������Ƿ�����!"
    } else {
        c = f.getAttribute("result");
        if (c != "OK") {
            c = f.getAttribute("msg");
            b = false
        }
    }
    if (b == false) {
        window.status = "������Ϣ(processEditXML):" + c
    }
    _EzServerClientQueryNum = _EzServerClientQueryNum - 1;
    _EzServerClientQueryIsOK = b
};
MapsApp.prototype.processQueryXML = function(H, d) {
    var G = new DocParser(H);
    var F = G.getFirstNode("RESPONSE");
    var m = true;
    var l = "processQueryXML";
    if (F == null) {
        m = false;
        l = "���������Ƿ�����!"
    } else {
        l = F.getAttribute("result");
        if (l != "OK") {
            l = F.getAttribute("msg");
            m = false
        }
    }
    if (m == false) {
        window.status = "������Ϣ(processQueryXML):" + l;
        return new EzLayer(d)
    }
    var w = null;
    var z = null;
    if (F != null) {
        var h = F.getAttribute("layer");
        var o = F.getAttribute("maxrecord");
        var g = F.getAttribute("id");
        w = getLayerByName(h, g);
        if (w != null) {
            w.maxRecord = parseInt(o);
            z = w.features;
            z.clear()
        } else {
            var k = "�Ҳ�����Ӧ��ͼ��:" + H;
            window.status = k
        }
    } else {
        alert("û����Ӧ��ͼ��");
        return
    }
    var q = G.getNodes("FEATURE");
    if (q.length > 0) {
        switch (q[0].getAttribute("type")) {
        case "point":
            w.geometryType = "point";
            break;
        case "multipoint":
            w.geometryType = "multipoint";
            break;
        case "polyline":
        case "multipolyline":
            w.geometryType = "polyline";
            break;
        case "polygon":
        case "multiPolygon":
            w.geometryType = "polygon";
            break;
        default:
            break
        }
    }
    var A = null;
    for (var u = 0; u < q.length; u++) {
        A = q[u];
        var B = A.getAttribute("type");
        var v = A.getAttribute("centerx");
        var t = A.getAttribute("centery");
        var j = A.getAttribute("dispname");
        j = Trim(j);
        var C = "";
        C = A.getAttribute("linestr");
        var f = new FeatureObject(w);
        f.point = new Point(v, t);
        f.dispname = j;
        switch (q[0].getAttribute("type")) {
        case "point":
        case "multipoint":
            f.type = B;
            break;
        case "polyline":
            if (C.indexOf(";") == -1) {
                f.type = "polyline"
            } else {
                f.type = "multipolyline"
            }
            break;
        case "polygon":
        case "multipolygon":
            if (C.indexOf("|") == -1) {
                f.type = "polygon"
            } else {
                f.type = "multipolygon"
            }
            break;
        default:
            break
        }
        f.linestr = C;
        if (typeof g_xq != "undefined" && g_xq[j] != null) {
            f.type = "point";
            var b = g_xq[j].split(",");
            f.point.x = parseFloat(b[0]);
            f.point.y = parseFloat(b[1]);
            f.linestr = ""
        }
        var E = A.childNodes;
        for (var c = 0; c < E.length; c++) {
            var n = E.item(c);
            var r = n.getAttribute("name");
            r = Trim(r);
            var D = n.getAttribute("value");
            D = Trim(D);
            f.addFieldValue(r, D)
        }
        if (z != null) {
            z.push(f)
        }
    }
    if (G != null) {
        delete G
    }
    w.sort();
    return w
};
_bIsQuerying = false;
_bIsLoading = false;
MapsApp.prototype.bIsQuery = function() {
    return _bIsQuerying
};
function loading() {
    var b = document.getElementById("process");
    if (b != null) {
        b.style.display = ""
    }
    _bIsQuerying = true;
    _bIsLoading = true
}
function loaded() {
    var b = document.getElementById("process");
    if (b != null) {
        b.style.display = "none"
    }
    _bIsQuerying = false;
    _bIsLoading = false
}
MapsApp.prototype.clearLayers = function() {
    if (typeof _LayerArr != "undefined" && _LayerArr != null) {
        _LayerArr.clear()
    }
};
MapsApp.prototype.dealWithRequest = function(c, f) {
    pMe = this;
    if (typeof mapservice == "undefined") {
        alert("mapservice����û�ҵ�����ȷ�Ϸ�����...");
        return
    }
    if (typeof _LayerArr == "undefined" || _LayerArr == null) {
        _LayerArr = new Array()
    }
    var j;
    try {
        var h = null;
        if (c instanceof QueryObject || c instanceof EditObject) {
            _EzServerClientQueryNum = 1;
            if (c instanceof QueryObject) {
                h = pMe.processQueryXML
            } else {
                h = pMe.processEditXML
            }
            var b = getLayerByName(c.tableName, c.layerId);
            j = c.toxml();
            if (typeof b != "undefined" && b != null) {
                b.setLayerInfo(c);
                b.bShow = true;
                b.beginrecord = c.beginrecord
            } else {
                _LayerArr.push(new EzLayer(c))
            }
            mapservice.processXML(j, h, c, f, pMe)
        } else {
            if (c instanceof Array) {
                _EzServerClientQueryNum = c.length;
                for (var d = 0; d < c.length; d++) {
                    var k = c[d];
                    if (k instanceof QueryObject) {
                        h = pMe.processQueryXML
                    } else {
                        h = pMe.processEditXML
                    }
                    j = k.toxml();
                    var b = getLayerByName(k.tableName, k.layerId);
                    if (typeof b != "undefined" && b != null) {
                        b.setLayerInfo(k);
                        b.bShow = true;
                        b.beginrecord = k.beginrecord
                    } else {
                        _LayerArr.push(new EzLayer(k))
                    }
                    mapservice.processXML(j, h, k)
                }
                this._queryCallback = f;
                window.queryCallback = function() {
                    if (c instanceof Array) {
                        if (_EzServerClientQueryNum > 0) {
                            setTimeout("queryCallback()", 10)
                        } else {
                            if (pMe._queryCallback) {
                                pMe._queryCallback(_EzServerClientQueryIsOK, c, pMe)
                            }
                        }
                    }
                };
                if (this._queryCallback && c instanceof Array) {
                    try {
                        queryCallback()
                    } catch(g) {
                        alert("callback:" + g.message)
                    }
                }
            }
        }
    } catch(g) {
        alert("������Ϣ(dealWithRequest):" + g.message)
    }
};
MapsApp.prototype.edit = function(b, c) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "EditObject") && !EzServerClient.GlobeFunction.isTypeRight(b, "Array")) {
            throw EzErrorFactory.createError("EzMap::pEdit������arguments[0]�������Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "function")) {
            throw EzErrorFactory.createError("EzMap::pEdit������arguments[1]�������Ͳ���ȷ")
        }
        if (g_engine == null) {
            g_engine = DWREngine.Clone()
        }
        try {
            this.dealWithRequest(b, c)
        } catch(d) {
            alert("�༭ģ��:" + d)
        }
    } catch(d) {
        throw EzErrorFactory.createError("EzMap::edit����ִ�в���ȷ", d)
    }
};
function CloneResult(c) {
    var f = new Array();
    if (c instanceof QueryObject) {
        f.push(c.queryResult)
    } else {
        if (c instanceof Array || typeof c == "undefined") {
            for (var d = 0; d < _LayerArr.length; d++) {
                var b = _LayerArr[d];
                f.push(b)
            }
        }
    }
    return f
}
function clearResult() {
    _LayerArr = new Array()
}
MapsApp.prototype.getQueryResult = function(b) {
    return CloneResult(b)
};
MapsApp.prototype.getResultTable_ = function(k) {
    var b = document.createElement("table");
    b.border = 0;
    b.id = "EzLayerTable";
    b.align = "center";
    b.cellspacing = 0;
    b.cellpadding = 0;
    if (typeof k == "undefined" || k == null) {
        k = _LayerArr
    }
    var l = k.length;
    var j = 0;
    var f = b.insertRow(j);
    var g = f.appendChild(document.createElement("th"));
    g.innerHTML = "ͼ����";
    var g = f.appendChild(document.createElement("th"));
    g.innerHTML = "����";
    j = 1;
    for (var h = 0; h < k.length; h++) {
        var d = k[h];
        var f = b.insertRow(j);
        var c = f.insertCell(0);
        c.innerHTML = d.layerName;
        c = f.insertCell(1);
        c.innerHTML = d.maxRecord;
        j++
    }
    return b
};
MapsApp.prototype.getResultTable = function(l) {
    var b = document.createElement("table");
    b.border = 0;
    b.id = "EzLayerTable";
    b.align = "center";
    b.cellspacing = 0;
    b.cellpadding = 0;
    if (typeof l == "undefined" || l == null) {
        l = _LayerArr
    }
    var m = l.length;
    var j = 0;
    var f = b.insertRow(j);
    var g = f.appendChild(document.createElement("th"));
    g.innerHTML = "ͼ��";
    for (var h = 0; h < l.length; h++) {
        var d = l[h];
        var g = f.appendChild(document.createElement("th"));
        g.innerHTML = d.layerName
    }
    j = 1;
    var f = b.insertRow(j);
    var c = f.appendChild(document.createElement("td"));
    c.innerHTML = "����";
    for (var k = 0; k < l.length; k++) {
        var d = l[k];
        pTd1 = f.appendChild(document.createElement("td"));
        pTd1.innerHTML = d.maxRecord
    }
    return b
};
MapsApp.prototype.setEzLayer = function(b) {
    _LayerArr = b
};
function addOverLay(c, b) {
    getMapApp().addOverlay(c);
    c.addListener("click",
    function() {
        c.openInfoWindowHtml(b)
    })
}
function mapSpatial() {}
_test = null;
function bIsContain(g, c) {
    var b = false;
    for (var d = 0; d < g.length; d++) {
        var f = g[d];
        if (f.queryType == c.queryType && f.coords == c.coords && f.radius == c.radius) {
            b = true;
            break
        }
    }
    return b
}
function drawLayers(t, n) {
    var u = [];
    for (var h = 0; h < t.length; h++) {
        var q = t[h];
        if (!q.bShow) {
            continue
        }
        if (q.queryObj.queryType <= 5 && !bIsContain(u, q.queryObj)) {
            drawQueryArea(q.queryObj, n);
            u.push(q.queryObj)
        }
        var k = q.features;
        for (var m = 0; m < k.length; m++) {
            var c = k[m];
            var o = c.type;
            var g = c.dispname;
            var x = c.linestr;
            var f = null;
            var d = x;
            switch (o) {
            case "nil":
                break;
            case "point":
                var j = new Icon();
                j.image = q.imgURL;
                j.height = q.imgHeight;
                j.width = q.imgWidth;
                j.leftOffset = q.leftOffset;
                j.topOffset = q.topOffset;
                var r = null;
                r = new Title(g, 12, 7);
                var l = new Point(x);
                f = new Marker(l, j, r);
                addFeatInfo(f, c.toHTML());
                break;
            case "multipoint":
                var j = new Icon();
                j.image = q.imgURL;
                j.height = q.imgHeight;
                j.width = q.imgWidth;
                j.leftOffset = q.leftOffset;
                j.topOffset = q.topOffset;
                var r = null;
                r = new Title(g, 12, 7);
                var b = new MultiPoint(c.linestr);
                for (var w = 0; w < b.getSegmentCount(); w++) {
                    f = new Marker(b.getSegment(w), j, r);
                    addFeatInfo(f, c.toHTML())
                }
                break;
            case "polyline":
                f = new Polyline(x, "#ff0000", 3);
                addFeatInfo(f, c.toHTML());
                break;
            case "multipolyline":
                var v = new MultiPolyline(x, "#ff0000", 3, 0.5, 0);
                for (var w = 0; w < v.getSegmentCount(); w++) {
                    f = v.getSegment(w);
                    addFeatInfo(f, c.toHTML())
                }
                break;
            case "polygon":
                f = new Polygon(x, "#ff00FF", 3, 0.5, "blue");
                addFeatInfo(f, c.toHTML());
                break;
            case "multipolygon":
                var y = new MultiPolygon(x, "#ff00FF", 3, 0.5, "blue");
                for (var w = 0; w < y.getSegmentCount(); w++) {
                    f = y.getSegment(w);
                    addFeatInfo(f, c.toHTML())
                }
                break;
            default:
                break
            }
        }
    }
}
function drawFeatureObject(d, c, b) {
    try {
        var g = getMapApp().getQueryResult(c);
        drawLayers(g)
    } catch(f) {
        alert("drawFeatureObject:" + f.message)
    }
}
function getAddedInfo(b, c) {
    var f = 'shoeAround("' + b + '","' + c + '")';
    var d = '<br><input type="button" onclick=' + f + ' value="�ܱ߲�ѯ" />';
    return d
}
_FeatureInfoAdded = null;
function getLayerByName(f, d) {
    var c = null;
    if (_LayerArr == null) {
        _LayerArr = new Array();
        return null
    } else {
        for (var b = 0; b < _LayerArr.length; b++) {
            if (_LayerArr[b].tableName.toUpperCase() == f.toUpperCase()) {
                if (typeof d == "undefined" || d == "" || _LayerArr[b].layerId == d) {
                    c = _LayerArr[b];
                    break
                }
            }
        }
    }
    return c
}
function setEzLayStatus(b) {
    var d = null;
    if (_LayerArr == null) {
        _LayerArr = new Array()
    }
    for (var c = 0; c < _LayerArr.length; c++) {
        d = _LayerArr[c];
        d.bShow = b
    }
}
function drawQueryArea(h, d) {
    if (h.queryType == 1 || h.queryType == 6) {
        return
    }
    var c = 0.3;
    var l = null;
    var m = null;
    if (typeof _QueryFilledColor == "undefined") {
        _QueryFilledColor = "green"
    }
    if (typeof _QueryBorderColor == "undefined") {
        _QueryBorderColor = "#ff00FF"
    }
    if (h.coords) {
        var g = h.coords;
        var f = g.split(",");
        var b = f.length;
        if (h.queryType == 3) {
            m = new Circle(g, _QueryBorderColor, 2, c, _QueryFilledColor)
        } else {
            if (h.queryType == 2) {
                m = new Rectangle(g, _QueryBorderColor, 2, c, _QueryFilledColor);
                var l = m.getMBR()
            } else {
                if (h.queryType == 4) {
                    m = new Polygon(g, _QueryBorderColor, 3, c, _QueryFilledColor)
                } else {
                    if (h.queryType == 5 || h.queryType == 1) {
                        var k = h.radius;
                        if (b == 2) {
                            var j = g.split(",");
                            if (_MapSpanScale == 1 && h.unit == "meter") {
                                k = EzMap.getDegree(new Point(j[0], j[1]), k)
                            } else {
                                if (_MapSpanScale != 1 && h.unit == "degree") {
                                    k = EzMap.getMeter(new Point(j[0], j[1]), k)
                                }
                            }
                            g = g + "," + k;
                            m = new Circle(g, _QueryBorderColor, 2, c, _QueryFilledColor)
                        } else {
                            if (b >= 4) {
                                m = new Polyline(g, _QueryFilledColor, k * 2, c, 0);
                                m.unit = h.unit
                            }
                        }
                    }
                }
            }
        }
        if (m != null) {
            getMapApp().addOverlay(m)
        }
    }
    l = m.getMBR();
    if (l != null) {
        l.scale(1.1);
        getMapApp().centerAtMBR(l)
    }
}
g_prox_calss = null;
MapsApp.prototype.registerProx = function(b) {
    MapsApp.registerProx(b)
};
g_engine = null;
MapsApp.registerProx = function(b) {
    if (g_engine == null) {
        g_engine = DWREngine.Clone()
    }
    g_prox_calss = b;
    mapservice.processXML = function(c, l, k, m, h) {
        try {
            var g = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            var f = new Date();
            var d = "url=" + encodeURIComponent(k.getProxyPostURL()) + "&xml=" + encodeURIComponent(c) + "&time=" + f.getTime();
            g.open("POST", g_prox_calss, true);
            g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            g.onreadystatechange = function() {
                if (g.readyState == 4) {
                    if (g.status == 200) {
                        _EzServerClientQueryIsOK = true
                    }
                    k.queryResult = l(g.responseText, k);
                    if (m) {
                        m(_EzServerClientQueryIsOK, k, h)
                    } else {
                        _EzServerClientQueryNum = _EzServerClientQueryNum - 1
                    }
                }
            };
            g.send(d)
        } catch(j) {
            k.queryResult = new EzLayer(k);
            if (m) {
                m(_EzServerClientQueryIsOK, k, h)
            } else {
                _EzServerClientQueryNum = _EzServerClientQueryNum - 1
            }
        }
    }
};
var m_XMLArray = new Array();
var m_CallBackArray = new Array();
var m_URLArray = new Array();
var m_index = 0;
function getDataFromProxServer(k, j, h, f) {
    var b = XMLHttp.create();
    var l = g_prox_calss;
    b.open("POST", l, true);
    b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var d = this;
    var c;
    b.onreadystatechange = function() {
        if (b.readyState == 4 && b.status == 200) {
            try {
                j(b.responseText);
                h.queryResult = j(b.responseText);
                if (f) {
                    f(c, h, vEzMap)
                }
                window.setTimeout("mapservice.processNext()", 10)
            } catch(g) {
                alert(g.message)
            }
        }
    };
    b.send(k)
}
function getDataFromServer(f, b, d) {
    oScript = document.getElementById(f);
    var c = document.getElementsByTagName("head").item(0);
    if (oScript) {
        c.removeChild(oScript)
    }
    oScript = document.createElement("script");
    oScript.setAttribute("src", b);
    oScript.setAttribute("id", f);
    c.appendChild(oScript);
    oScript.onreadystatechange = function() {
        if (this.readyState == "loaded") {
            this.onreadystatechange = null
        }
    }
}
EzServerClient.GlobeFunction.formatStrURL = function(b) {
    b = b.replace(/(^\s*)|(\s*$)/g, "");
    if (b.lastIndexOf("/") == b.length - 1) {
        return b.substring(0, b.length - 1)
    } else {
        return b
    }
};
QueryObject.prototype.getPostURL = function() {
    if (this.serviceSource == null || this.serviceSource == "") {
        return m_EzMapService + "/mapservice"
    } else {
        return EzServerClient.GlobeFunction.formatStrURL(this.serviceSource) + "/MapService_v6/mapservice"
    }
};
QueryObject.prototype.getProxyPostURL = function() {
    if (this.serviceSource == null || this.serviceSource == "") {
        return m_mapService_servlet
    } else {
        return EzServerClient.GlobeFunction.formatStrURL(this.serviceSource) + "/MapService_v6/mapserviceServlet"
    }
};
EditObject.prototype.getPostURL = function() {
    if (this.serviceSource == null || this.serviceSource == "") {
        return m_EzMapService + "/mapservice"
    } else {
        return EzServerClient.GlobeFunction.formatStrURL(this.serviceSource) + "/MapService_v6/mapservice"
    }
};
EditObject.prototype.getProxyPostURL = function() {
    if (this.serviceSource == null || this.serviceSource == "") {
        return m_mapService_servlet
    } else {
        return EzServerClient.GlobeFunction.formatStrURL(this.serviceSource) + "/MapService_v6/mapserviceServlet"
    }
};
mapservice = {};
mapservice.processXML = function(k, c, h, g, b) {
    try {
        var f = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
        var d = "xml=" + encodeURIComponent(k);
        f.open("POST", h.getPostURL(), true);
        f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        f.onreadystatechange = function() {
            if (f.readyState == 4) {
                if (f.status == 200) {
                    _EzServerClientQueryIsOK = true
                }
                h.queryResult = c(f.responseText, h);
                if (g) {
                    g(_EzServerClientQueryIsOK, h, b)
                } else {
                    _EzServerClientQueryNum = _EzServerClientQueryNum - 1
                }
            }
        };
        f.send(d)
    } catch(j) {
        _EzServerClientQueryIsOK = false;
        h.queryResult = new EzLayer(h);
        if (g) {
            g(_EzServerClientQueryIsOK, h, b)
        } else {
            _EzServerClientQueryNum = _EzServerClientQueryNum - 1
        }
    }
};
DWREngine = new Object();
DWREngine.Clone = function() {
    return new MapService_v6_Stub_DWREngine()
};
function MapService_v6_Stub_DWREngine() {
    this.beginBatch = function() {};
    this.endBatch = function() {}
}
function addFeatInfo(c, b) {
    getMapApp().addOverlay(c);
    c.addListener("click",
    function() {
        c.openInfoWindowHtml(b)
    })
}
function ImageObj() {
    this.URL;
    this.width;
    this.alt
}
function MonitorTitleInfo() {
    this.title = "������Ϣ";
    this.name = "��������";
    this.callNo = "��    ��";
    this.uim = "UIM ����";
    this.time = "ʱ    ��";
    this.speed = "��   ��";
    this.carNo = "�� �� ��";
    this.carType = "��    ��";
    this.addr = "��   ַ";
    this.belongorg = "������λ";
    this.patrolArea = "Ѳ������";
    this.patrolType = "Ѳ������";
    this.policeName = "��Ա����";
    this.policeID = "��Ա���";
    this.ruleComm = "Ͻ������";
    this.pdaNo = "PDA ����";
    this.memo = "��    ע"
}
function MonitorFindInfo() {
    this.title = "������Ϣ";
    this.name = "��������";
    this.callNo = "��    ��";
    this.uim = "UIM ����";
    this.status = "״    ̬";
    this.carNo = "�� �� ��";
    this.carType = "��    ��";
    this.addr = "��   ַ";
    this.belongorg = "������λ";
    this.patrolArea = "Ѳ������";
    this.patrolType = "Ѳ������";
    this.policeName = "��Ա����";
    this.policeID = "��Ա���";
    this.ruleComm = "Ͻ������";
    this.pdaNo = "PDA ����";
    this.memo = "��    ע"
}
function VideoTableInfo() {
    this.title = "����ͷ��Ϣ";
    this.id = "��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��:";
    this.name = "��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��:";
    this.status = "״&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;̬:";
    this.lon = "��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��:";
    this.lat = "γ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��:";
    this.addr = "λ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��:";
    this.belongorg = "������λ:";
    this.coveredAvenue = "��ط�Χ:";
    this.url = "��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��:";
    this.memo = "��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ע:"
}
function VideoTitleInfo() {
    this.title = "����ͷ��Ϣ";
    this.id = "��    ��";
    this.name = "��    ��";
    this.status = "״    ̬";
    this.addr = "λ    ��";
    this.belongorg = "������λ";
    this.coveredAvenue = "��ط�Χ";
    this.memo = "��    ע"
}
function Monitor(g, b, f, d, c) {
    this.base = iOverLay;
    this.base();
    this.id = g;
    this.name = b;
    this.lon = f;
    this.lat = d;
    this.time = c;
    this.addr;
    this.belongorg;
    this.callNo;
    this.memo;
    this.carNo;
    this.carType;
    this.url;
    this.speed;
    this.dir;
    this.polType;
    this.powerType;
    this.picType;
    this.patrolArea;
    this.policeName;
    this.policeID;
    this.pdaNo;
    this.ruleComm;
    this.patrolType;
    this.uim;
    this.coveredAvenue;
    this.fromtime;
    this.totime;
    this.status;
    this.videoStatus;
    this.userID;
    this.border;
    this.strPath;
    this.bIsShowBorder = false;
    this.bIsAlarm = false;
    this.bIsMonitor = false;
    this.bIsMainMonitor = false;
    this.bIsVideo = true;
    this.bIsDisplay = false;
    this.div = null;
    this.titleDiv;
    this.titleText;
    this.imgContainer;
    this.trackPointArray;
    this.trackimgArray;
    this.trackVMLArray;
    this.imgSize;
    this.topOffset = 0;
    this.container;
    this.map;
    this.imgScale = 1;
    this.imgSrc = null
}
Monitor.prototype = new iOverLay();
Monitor.prototype.toDate = function() {
    var c = this.time;
    var d = null;
    if (c) {
        d = new Date();
        var k = parseInt(c.substring(0, 4), 10);
        d.setYear(k);
        var j = parseInt(c.substring(5, 7), 10) - 1;
        d.setMonth(j);
        var g = parseInt(c.substring(8, 10), 10);
        d.setDate(g);
        var f = parseInt(c.substring(11, 13), 10);
        d.setHours(f);
        var h = parseInt(c.substring(14, 16), 10);
        d.setMinutes(h);
        var b = parseInt(c.substring(17, 19), 10);
        d.setSeconds(b);
        delete d
    }
    return d
};
Monitor.prototype.toLocalTime = function() {
    var b = null;
    var c = this.time;
    if (c) {
        b = this.time
    }
    return b
};
Monitor.prototype.getNodeInfo = function() {
    var b = "";
    b = "����:" + this.lon;
    b = b + "<br>γ��:" + this.lat;
    b = b + "<br>ʱ��:" + this.time;
    return b
};
Monitor.prototype.getEclipseTime = function(b) {
    var c = this.toDate();
    var d = 9999999;
    if (!c) {
        return d
    }
    if (!b) {
        b = new Date()
    }
    d = (b.getTime() - c.getTime()) / 1000;
    delete b;
    return d
};
Monitor.prototype.convertBorder2Path = function(c) {
    if (!c) {
        c = this.border
    }
    var b = c.split(",");
    this.strPath = b;
    return b
};
Monitor.prototype.bIsOutOfBorder = function() {
    var d = new TopoCheck();
    var b = new Point(this.lon, this.lat);
    var c = d.bIsInBorder(b, this.border);
    c = !c;
    delete b;
    delete d;
    return c
};
Monitor.prototype.getStatus = function() {
    var c = this.getEclipseTime();
    var b = "";
    if (c > 86400) {
        b = "3";
        this.status = "����"
    } else {
        if (c < this.statusValve) {
            b = "1";
            this.status = "����״̬"
        } else {
            b = "2";
            this.status = "�豸δ��"
        }
    }
    return b
};
Monitor.prototype.showTitle = function() {
    if (this.titleDiv && this.div.style.display == "") {
        this.titleDiv.style.display = ""
    }
};
Monitor.prototype.hideTitle = function() {
    if (this.titleDiv) {
        this.titleDiv.style.display = "none"
    }
};
Monitor.prototype.hide = function() {
    this.div.style.display = "none";
    this.clearTrack();
    this.titleDiv.style.display = "none"
};
Monitor.prototype.toString = function() {
    var d = "";
    for (var b in this) {
        if (this[b] != null && this[b] != "" && this[b] != "null") {
            var c = this[b];
            if (typeof c != "function") {
                d = d + this[b] + "\n"
            }
        }
    }
    return d
};
Monitor.prototype.toHTML = function() {
    var c = this.getTitle().replace(/\n/g, "<br>");
    var b = /\s/g;
    c = c.replace(b, "&nbsp;");
    return c
};
Monitor.prototype.getTextOfDir = function() {
    var b;
    if (this.dir > 22.5 && this.dir <= 67.5) {
        b = "�J"
    } else {
        if (this.dir > 67.5 && this.dir <= 112.5) {
            b = "��"
        } else {
            if (this.dir > 112.5 && this.dir <= 157.5) {
                b = "�K"
            } else {
                if (this.dir > 157.5 && this.dir <= 202.5) {
                    b = "��"
                } else {
                    if (this.dir > 202.5 && this.dir <= 247.5) {
                        b = "�L"
                    } else {
                        if (this.dir > 247.5 && this.dir <= 292.5) {
                            b = "��"
                        } else {
                            if (this.dir > 292.5 && this.dir < 337.5) {
                                b = "�I"
                            } else {
                                b = "��"
                            }
                        }
                    }
                }
            }
        }
    }
    return b
};
Monitor.prototype.getTitle = function() {
    var g = "";
    var d;
    if (this instanceof Video) {
        d = new VideoTitleInfo()
    } else {
        d = new MonitorTitleInfo()
    }
    for (var b in d) {
        if (this[b] != null && this[b] != "" && this[b] != "null") {
            var c = d[b];
            var f;
            if (b == "dir") {
                if (this.polType == 1 || this.polType == 2) {
                    f = this.getTextOfDir() + "(" + this[b] + "��)"
                }
            } else {
                if (b == "speed") {
                    if (this.polType == 1 || this.polType == 2) {
                        f = this[b] + "����/Сʱ"
                    }
                } else {
                    f = this[b]
                }
            }
            if (typeof c != "function") {
                if (g == "") {
                    g = d[b] + ":" + f
                } else {
                    g = g + "\n" + d[b] + ":" + f
                }
            }
        }
    }
    delete d;
    return g
};
Monitor.prototype.toTable = function() {
    var f = "";
    var d;
    alert("dddd");
    if (this instanceof Video) {
        d = new VideoTitleInfo()
    } else {
        d = new MonitorTitleInfo()
    }
    for (var b in d) {
        if (this[b] != null && this[b] != "" && this[b] != "null") {
            var c = d[b];
            if (typeof c != "function") {
                f = f + d[b] + this[b] + "\n"
            }
        }
    }
    delete d;
    return f
};
Monitor.prototype.createMonitorTitleDiv = function() {
    var b;
    if (typeof this.callNo != "undefined" && this.callNo != null) {
        b = this.callNo
    } else {
        b = this.name
    }
    this.titleText = b;
    if (typeof this.titleText != "string") {
        this.titleText = this.titleText + ""
    }
    var c = createTxt(b);
    this.titleDiv = c;
    c.style.zIndex = 1200;
    c.style.fontSize = convert2Px(12);
    c.style.fontFamily = "����";
    c.style.color = "WHITE";
    c.style.backgroundColor = "#004C78";
    c.style.width = "auto";
    c.style.height = "auto";
    c.noWrap = true;
    return this.titleDiv
};
Monitor.prototype.setZIndex = function(b) {
    if (this.div != null) {
        this.div.style.zIndex = b
    }
    if (this.titleDiv != null) {
        this.titleDiv.style.zIndex = b
    }
};
Monitor.prototype.createDiv = function(c) {
    this.map = c;
    this.container = c.div;
    this.initMonitorImage();
    var b = document.createElement("img");
    this.div = b;
    b.id = this.id;
    b.style.position = "absolute";
    b.style.zIndex = 800;
    b.unselectable = "on";
    b.lon = this.lon;
    b.lat = this.lat;
    b.src = this.getMonitorImage();
    this.container.appendChild(b);
    var d = this.createMonitorTitleDiv();
    this.container.appendChild(d);
    b.title = this.getTitle();
    setCursor(b, "hand");
    b.monitor = this;
    this.redraw();
    return b
};
Monitor.prototype.createMonitorTrackImg = function() {
    var b = document.createElement("img");
    b.style.position = "absolute";
    b.style.zIndex = 600;
    b.unselectable = "on";
    this.imgContainer.appendChild(b);
    return b
};
Monitor.prototype.clearTrack = function() {
    this.clearPointArray();
    this.clearTrackImg();
    this.clearTrackVML()
};
Monitor.prototype.removeFromDiv = function() {
    this.container.removeChild(this.div);
    this.container.removeChild(this.titleDiv);
    this.clearTrack()
};
Monitor.prototype.clearPointArray = function() {
    if (this.trackPointArray == null) {
        return
    }
    while (this.trackPointArray.length > 0) {
        var b = this.trackPointArray.pop();
        delete b
    }
};
Monitor.prototype.clearTrackImg = function() {
    if (this.trackimgArray == null) {
        return
    }
    while (this.trackimgArray.length > 0) {
        var b = this.trackimgArray.pop();
        this.imgContainer.removeChild(b)
    }
};
Monitor.prototype.clearTrackVML = function() {
    if (this.trackVMLArray == null) {
        return
    }
    var c = getTrackVMLContainer();
    while (this.trackVMLArray.length > 0) {
        var b = this.trackVMLArray.pop();
        c.groupObj.removeChild(b)
    }
};
Monitor.prototype.setImgPos = function(g, f, c, b) {
    var d = this.div;
    if (d != null) {
        d.style.top = convert2Px(f);
        d.style.left = convert2Px(g);
        d.style.width = convert2Px(c);
        d.style.height = convert2Px(b)
    }
    return d
};
Monitor.prototype.refreshGPSTracks = function() {
    if (this.trackPointArray == null || this.trackPointArray.length == 0) {
        return
    }
    var c = thid.imgScale;
    var h = getZoomLevel();
    var b = this.trackPointArray.length;
    for (var d = 0; d < b; d++) {
        var g = this.trackPointArray[d];
        var f = this.map.convert2WPoint(g.x, g.y);
        this.trackPointArray[d].screenX = f.x;
        this.trackPointArray[d].screenY = f.y;
        delete f
    }
    this.refreshTrackPoints();
    this.refreshTrackLines()
};
Monitor.prototype.refreshTrackLines = function() {
    var c = getSetupInfo().bIsShowGPSLine;
    if (!c) {
        return
    }
    if (this.trackVMLArray == null) {
        this.trackVMLArray = new Array()
    }
    var k = getTrackVMLContainer();
    k.groupObj.style.left = 0;
    k.groupObj.style.top = 0;
    while (this.trackVMLArray.length < this.trackPointArray.length - 1) {
        var g = k.drawLine(0, 0, 0, 0);
        g.firstChild.endArrow = "classic";
        g.firstChild.endArrowWidth = "medium";
        g.firstChild.color = "red";
        g.firstChild.startArrow = "oval";
        g.firstChild.startArrowWidth = "medium";
        this.trackVMLArray.push(g)
    }
    var f = 0;
    var b = this.trackVMLArray.length;
    var h = new Point();
    for (f = 0; f < b; f++) {
        var g = this.trackVMLArray[f];
        var d = "" + this.trackPointArray[f].screenX + "," + this.trackPointArray[f].screenY + "";
        var j = "" + this.trackPointArray[f + 1].screenX + "," + this.trackPointArray[f + 1].screenY + "";
        g.from.value = d;
        g.to.value = j
    }
    delete h
};
Monitor.prototype.refreshTrackPoints = function() {
    var c = getSetupInfo().bIsShowGPSPoint;
    if (!c) {
        return
    }
    if (this.trackPointArray == null) {
        this.trackPointArray = new Array()
    }
    while (this.trackimgArray.length < this.trackPointArray.length) {
        var g = this.createMonitorTrackImg();
        this.trackimgArray.push(g)
    }
    var d = 0;
    var b = this.trackimgArray.length;
    var f = new Point();
    for (d = 0; d < b; d++) {
        f.x = this.trackPointArray[d].screenX;
        f.y = this.trackPointArray[d].screenY;
        var h = this.setTrackPoint(this.trackimgArray[d], f);
        h.src = "images/point_" + (b - d) + ".gif"
    }
    delete f
};
Monitor.prototype.setTrackPoint = function(f, d) {
    if (f == null) {
        return
    }
    var b = this.imgScale;
    var c = this.div.size / 4;
    var g = c * b;
    if (g <= 2) {
        g = 2
    }
    f.style.left = convert2Px(d.x - g / 2);
    f.style.top = convert2Px(d.y - g / 2);
    f.style.width = convert2Px(g);
    f.style.height = convert2Px(g);
    return f
};
Monitor.prototype.onChange = function() {
    if (this.titleDiv != null) {
        var b = 12;
        var c = 0;
        b = b * this.imgScale;
        if (b != 0) {
            c = b * StrLength(this.titleText) / 2
        }
        this.titleDiv.style.left = convert2Px(this.div.x - c / 2);
        var d = parseInt(this.div.style.top) - b;
        this.titleDiv.style.top = convert2Px(d);
        this.titleDiv.style.fontSize = convert2Px(b)
    }
    this.refreshGPSTracks()
};
function Monitors(c, d) {
    this.container = c;
    this.xml = null;
    this.monitorArray = null;
    this.monitorDiv = null;
    this.bMonitor = true;
    this.speed = _RefreshSpeed;
    this.infoDiv = d;
    this.bIsLoaded = false;
    if (this.container) {
        this.monitorDiv = document.createElement("div");
        this.monitorDiv.style.position = "absolute";
        this.monitorDiv.style.zIndex = 1000;
        this.monitorDiv.unselectable = "on";
        this.monitorDiv.onselectstart = _NoAction;
        this.container.appendChild(this.monitorDiv)
    }
    var b = this;
    window.getMonContainer = function() {
        return b.monitorDiv
    };
    window.hideMonitorByID = function(f) {
        pMon = b.getMonObjectByID(f);
        pMon.hide();
        refreshStatusTimeout()
    };
    window.refreshStatusTimeout = function() {
        if (typeof b.statusTimeout != "undefined" && b.statusTimeout != null) {
            clearTimeout(b.statusTimeout)
        }
        b.statusTimeout = b.setTimeout("refreshStatus()", 4000)
    };
    window.refreshStatus = function() {
        if (parent.LocFrame.CheckResult) {
            parent.LocFrame.CheckResult()
        }
    }
}
Monitors.prototype.getMonObjectByID = function(d) {
    var c = null;
    for (var b = 0; b < this.monitorArray.length; b++) {
        var c = this.monitorArray[b];
        if (c.id == d) {
            return c
        }
    }
    return null
};
Monitors.prototype.clearMonitorStatus = function() {
    var c = null;
    for (var b = 0; b < this.monitorArray.length; b++) {
        var c = this.monitorArray[b];
        c.bIsMonitor = false;
        c.bIsMainMonitor = false
    }
};
Monitors.prototype.clearMonitorTimeout = function() {
    var c = null;
    for (var b = 0; b < this.monitorArray.length; b++) {
        var c = this.monitorArray[b];
        if (typeof this.refreshTimeout != "undefined" && this.refreshTimeout != null) {
            clearTimeout(this.refreshTimeout);
            this.refreshTimeout = null
        }
    }
};
Monitors.prototype.sortById = function() {
    if (this.monitorArray != null) {
        this.monitorArray = this.monitorArray.sort(function(d, c) {
            if (d.id < c.id) {
                return - 1
            }
            if (d.id > c.id) {
                return 1
            }
            return 0
        })
    }
};
Monitors.prototype.sortByTag = function(b) {
    var c = null;
    if (this.monitorArray != null) {
        c = this.monitorArray.sort(function(f, d) {
            if (f[b] < d[b]) {
                return - 1
            }
            if (f[b] > d[b]) {
                return 1
            }
            return 0
        })
    }
    return c
};
Monitors.prototype.show = function(b) {
    this.bMonitor = true;
    this.monitorDiv.style.display = ""
};
Monitors.prototype.hide = function() {
    this.bMonitor = false;
    this.monitorDiv.style.display = "none"
};
Monitors.prototype.clearDiv = function() {
    if (!this.monitorDiv) {
        return
    }
    var b = this.monitorDiv;
    while (b.hasChildNodes()) {
        b.removeChild(b.lastChild)
    }
};
Monitor.prototype.getImageObj = function(d) {
    var c = new ImageObj();
    var b = this.getStatus();
    c.URL = this.getMonitorImage(d);
    c.alt = this.status;
    c.width = this.imgSize;
    return c
};
Monitor.prototype.refreshMonImg = function(b) {
    if (typeof b == "undefined") {
        b = false
    }
    var c = this.getMonitorImage(b);
    if (this.div.src != c) {
        this.div.src = c
    }
};
Monitor.prototype.scaleImg = function(d) {
    this.imgScale = d;
    var c = this.div;
    try {
        var f = this.imgSize * d;
        if (f <= 0) {
            f = 2
        }
        var b = c.x;
        var h = c.y;
        this.setImgPos(b - f / 2, h - f / 2, f, f);
        this.onChange()
    } catch(g) {
        alert(g.message)
    }
    return c
};
Monitor.prototype.getMonitorImage = function(d) {
    var c = this.getStatus();
    var b = "";
    if (c == "1") {
        b = this.imgSrc.replace(".gif", "_on.gif")
    } else {
        b = this.imgSrc.replace(".gif", "_off.gif")
    }
    if (d) {
        b = this.imgSrc.replace(".gif", "_active.gif")
    }
    return b
};
Monitor.prototype.initMonitorImage = function() {
    var b = "";
    var c = "images/gpsstatus/";
    if (this.picType != null && this.picType.indexOf("��ά��") != -1) {
        b = "vehicle_ywk.gif";
        this.imgSize = 42;
        this.polType = 1;
        this.topOffset = -2
    } else {
        if (this.picType != null && this.picType.indexOf("��ŵ��") != -1) {
            b = "vehicle_qnj.gif";
            this.imgSize = 48;
            this.polType = 1;
            this.topOffset = 5
        } else {
            if (this.picType != null && (this.picType.indexOf("������") != -1 || this.picType.indexOf("ɣ����") != -1)) {
                b = "vehicle_snt.gif";
                this.imgSize = 48;
                this.polType = 1;
                this.topOffset = 10
            } else {
                if (this.picType != null && this.picType.indexOf("Ħ�г�") != -1) {
                    b = "vehicle_motor.gif";
                    this.imgSize = 40;
                    this.polType = 2;
                    this.topOffset = 10
                } else {
                    if (this.picType != null && this.picType.indexOf("���г�") != -1) {
                        b = "bike.gif";
                        this.imgSize = 32;
                        this.polType = 3;
                        this.topOffset = 0
                    } else {
                        if (this.picType != null && this.picType.indexOf("��Ѳ") != -1) {
                            b = "pol.gif";
                            this.imgSize = 28;
                            this.polType = 3;
                            this.topOffset = 0
                        } else {
                            if (this.picType != null && this.picType.indexOf("������") != -1) {
                                b = "com_pol.gif";
                                this.imgSize = 24;
                                this.polType = 4;
                                this.topOffset = 0
                            } else {
                                b = "vehicle_ywk.gif";
                                this.imgSize = 42;
                                this.polType = 1;
                                this.topOffset = 0
                            }
                        }
                    }
                }
            }
        }
    }
    if (this.polType == 1 || this.polType == 2) {
        this.statusValve = 180
    } else {
        if (this.polType == 3) {
            this.statusValve = 600
        } else {
            if (this.polType == 4) {
                this.statusValve = 300
            }
        }
    }
    this.imgSrc = c + b
};
Monitor.prototype.getPolType = function(b) {
    return this.polType
};
Monitor.prototype.redraw = function(f) {
    var h = null;
    var g = this.map.convert2WPoint(this.lon, this.lat);
    var d = g.x;
    var k = g.y;
    var c = "";
    var b = null;
    if (this.div) {
        h = this.div
    } else {
        h = getEleByID(this.id)
    }
    if (h) {
        h.x = d;
        h.y = k;
        h.lon = this.lon;
        h.lat = this.lat;
        var j = this.imgSize * this.imgScale;
        this.setImgPos(d - j / 2, k - j / 2, j, j);
        if (! (this instanceof Video)) {
            b = this.getImageObj();
            c = b.URL;
            strAlt = b.alt;
            if (h.src != c) {
                h.src = c
            }
            if (h.alt != strAlt) {
                h.alt = strAlt
            }
        }
    }
    this.onChange();
    delete g;
    delete b;
    return h
};
Monitor.prototype.bIsVisable = function() {
    var b = true;
    return b;
    if (this.div == null) {
        this.createDiv()
    }
    var c = this.getStatus();
    if (c == "1") {
        if (this.div.style.display == "none") {
            this.div.style.display = "";
            refreshStatusTimeout()
        }
        if (this.titleDiv) {
            this.titleDiv.style.display = ""
        }
    } else {
        if (this.div.style.display == "") {
            this.div.style.display = "none";
            refreshStatusTimeout()
        }
        this.clearTrack();
        if (this.titleDiv) {
            this.titleDiv.style.display = "none"
        }
        b = false
    }
    if (typeof this.refreshTimeout != "undefined" && this.refreshTimeout != null) {
        clearTimeout(this.refreshTimeout);
        this.refreshTimeout = null
    }
    var d = "hideMonitorByID('" + this.id + "')";
    this.refreshTimeout = this.setTimeout(d, this.statusValve * 1000);
    return b
};
Monitor.prototype.addListener = function(c, b) {
    BindingEvent(this.div, c, b)
};
Monitor.prototype.openInfoWindowHtml = function(b) {
    this.map.blowupOverlay(this);
    if (typeof b == "undefined" || b == null) {
        this.map.openInfoWindow(this.lon, this.lat, this)
    } else {
        this.map.openInfoWindow(this.lon, this.lat, b)
    }
};
function Video(g, b, f, d, c) {
    this.base = Monitor;
    this.base(g, b, f, d, c);
    this.imgSrc = "video1.gif"
}
Video.prototype = new Monitor;
Video.prototype.getMonitorImage = function(d) {
    var b = "";
    var c = "images/videostatus/";
    var f = "";
    if (this.videoStatus == 1) {
        f = "_1.gif"
    } else {
        if (this.videoStatus == 2) {
            f = "_2.gif"
        } else {
            if (this.videoStatus == 3) {
                f = "_3.gif"
            } else {
                f = "_4.gif"
            }
        }
    }
    b = this.imgSrc.replace(".gif", f);
    b = c + b;
    return b
};
Video.prototype.initMonitorImage = function() {
    this.imgSize = 24;
    this.topOffset = 0
};
Video.prototype.getImageObj = function(c) {
    var b = new ImageObj();
    b.URL = this.getMonitorImage();
    b.width = 16;
    b.alt = "";
    return b
};
MainFrame.prototype.flashMonitorByID = function(j, d) {
    var c, f, b;
    var g = null;
    c = this.video;
    if (!c) {
        return g
    }
    var h = c.getMonObjectByID(j);
    if (!h) {
        return g
    }
    var g = new Point(h.lon, h.lat);
    if (h.div) {
        h.div.src = h.getMonitorImage(true)
    }
    return g
};
Video.prototype.bIsVisable = function() {
    var b = false;
    if (this.div == null) {
        this.createDiv()
    }
    if (this.bIsDisplay) {
        if (this.div.style.display == "none") {
            this.div.style.display = ""
        }
        b = false
    } else {
        if (this.div.style.display == "") {
            this.div.style.display = "none"
        }
    }
    return b
};
Video.prototype.setImg = function(b) {
    this.imgSrc = b;
    this.refreshMonImg()
};
_routePath = null;
function route(g, j, h, f, d, c, b) {
    this.servName = g;
    this.startType = j;
    this.startX = h;
    this.startY = f;
    this.endType = d;
    this.endX = c;
    this.endY = b
}
route.prototype.toxml = function() {
    var b = "";
    b = b + '<?xml version="1.0" encoding="GBK"?>\r\n';
    b = b + "<RequestXML>\r\n";
    b = b + "   <ServiceName>" + this.servName + "</ServiceName>\r\n";
    b = b + "   <StartPoint>\r\n";
    b = b + "      <QueryType>" + this.startType + "</QueryType>\r\n";
    b = b + "      <StartX>" + this.startX + "</StartX>\r\n";
    b = b + "      <StartY>" + this.startY + "</StartY>\r\n";
    b = b + "   </StartPoint>\r\n";
    b = b + "   <EndPoint>\r\n";
    b = b + "      <QueryType>" + this.endType + "</QueryType>\r\n";
    b = b + "      <EndX>" + this.endX + "</EndX>\r\n";
    b = b + "      <EndY>" + this.endY + "</EndY>\r\n";
    b = b + "   </EndPoint>\r\n";
    b = b + "</RequestXML>\r\n";
    return b
};
_RouteCallBack = null;
_GeoCodeCallBack = null;
MapsApp.prototype.query = function(b, c) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "QueryObject") && !EzServerClient.GlobeFunction.isTypeRight(b, "Array")) {
            throw EzErrorFactory.createError("EzMap::query������arguments[0]���Ͳ���ȷ")
        }
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "function")) {
            throw EzErrorFactory.createError("EzMap::query������arguments[1]���Ͳ���ȷ")
        }
        try {
            this.dealWithRequest(b, c)
        } catch(d) {
            window.status = "������Ϣ:" + d.message()
        }
    } catch(d) {
        throw EzErrorFactory.createError("EzMap::query����ִ�в���ȷ", d)
    }
};
function PathObj() {
    this.name;
    this.MBR;
    this.points
}
PathObj.prototype.union = function(j) {
    this.MBR = MBR.union(this.MBR, j.MBR);
    var h = this.points.split(",");
    var g = h.length / 2;
    var f = j.points.split(",");
    var d = f.length / 2;
    var c = "";
    var b = "";
    if (f[0] === h[2 * (g - 1)] && f[1] === h[2 * g - 1]) {
        c = this.points + "," + j.points
    } else {
        if (f[0] === h[0] && f[1] === h[1]) {
            c = j.getReversePoints() + "," + this.points
        } else {
            if (f[2 * (d - 1)] === h[0] && f[2 * d - 1] === h[1]) {
                c = j.points + "," + this.points
            } else {
                if (f[2 * (d - 1)] === h[2 * (g - 1)] && f[2 * d - 1] === h[2 * g - 1]) {
                    c = j.points + "," + this.getReversePoints()
                } else {
                    window.status = "5:1:" + this.points + ":" + j.points
                }
            }
        }
    }
    this.points = c
};
PathObj.prototype.getReversePoints = function() {
    var c = this.points.split(",");
    var b = c.length / 2;
    var f = "";
    for (var d = b - 1; d > -1; d--) {
        if (d == b - 1) {
            f = c[2 * d] + "," + c[2 * d + 1]
        } else {
            f = f + "," + c[2 * d] + "," + c[2 * d + 1]
        }
    }
    return f
};
function routePath() {
    this.startName;
    this.endName;
    this.fromPoint;
    this.toPoint;
    this.MBR;
    this.childPath = new Array()
}
function preccessRouteXML(y) {
    try {
        window.status = "·��ת����...";
        var v = new DocParser(y);
        var x = v.Doc;
        var r = null;
        _routePath = new routePath();
        r = x.getElementsByTagName("StartName");
        _routePath.startName = getDocNodeValue(r.item(0));
        r = x.getElementsByTagName("EndName");
        _routePath.endName = getDocNodeValue(r.item(0));
        r = x.getElementsByTagName("FromPoint");
        var n = r.item(0).getElementsByTagName("PointX").item(0);
        var q = getDocNodeValue(n);
        var n = r.item(0).getElementsByTagName("PointY").item(0);
        var m = getDocNodeValue(n);
        _routePath.fromPoint = new Point(q, m);
        r = x.getElementsByTagName("ToPoint");
        var n = r.item(0).getElementsByTagName("PointX").item(0);
        var q = getDocNodeValue(n);
        var n = r.item(0).getElementsByTagName("PointY").item(0);
        var m = getDocNodeValue(n);
        _routePath.toPoint = new Point(q, m);
        r = x.getElementsByTagName("LowerLeftPoint");
        var n = r.item(0).getElementsByTagName("PointX").item(0);
        var g = getDocNodeValue(n);
        var n = r.item(0).getElementsByTagName("PointY").item(0);
        var d = getDocNodeValue(n);
        r = x.getElementsByTagName("UpperRightPoint");
        var n = r.item(0).getElementsByTagName("PointX").item(0);
        var f = getDocNodeValue(n);
        var n = r.item(0).getElementsByTagName("PointY").item(0);
        var c = getDocNodeValue(n);
        _routePath.MBR = new MBR(g, d, f, c);
        r = x.getElementsByTagName("ChildPath");
        var w = null;
        for (var k = r.length - 1; k > -1; k--) {
            var o = new PathObj();
            var h = r.item(k);
            o.name = h.getAttribute("Name");
            var l = h.getElementsByTagName("LowerLeftPoint");
            var n = l.item(0).getElementsByTagName("PointX").item(0);
            var g = getDocNodeValue(n);
            var n = l.item(0).getElementsByTagName("PointY").item(0);
            var d = getDocNodeValue(n);
            var l = h.getElementsByTagName("UpperRightPoint");
            var n = l.item(0).getElementsByTagName("PointX").item(0);
            var f = getDocNodeValue(n);
            var n = l.item(0).getElementsByTagName("PointY").item(0);
            var c = getDocNodeValue(n);
            o.MBR = new MBR(g, d, f, c);
            var l = h.getElementsByTagName("Point");
            var b = "";
            for (var j = 0; j < l.length; j++) {
                var t = l.item(j);
                var q = t.getAttribute("X");
                q = q.substr(0, 10);
                var m = t.getAttribute("Y");
                m = m.substr(0, 10);
                if (b == "") {
                    b = q + "," + m
                } else {
                    b = b + "," + q + "," + m
                }
            }
            o.points = b;
            if (o.name == null || o.name == "") {
                o.name = "δ֪����·"
            }
            if (w == null || w.name != o.name) {
                _routePath.childPath.push(o);
                w = o
            } else {
                w.union(o)
            }
        }
        window.status = "·��ת�����...";
        drawRoutePath();
        if (_RouteCallBack) {
            _RouteCallBack()
        }
    } catch(u) {
        window.status = "·����ѯ����:" + u.message()
    }
    loaded()
}
function drawRoutePath() {
    _MapApp.centerAtMBR(_routePath.MBR);
    var f = _routePath.childPath;
    for (var b = 0; b < f.length; b++) {
        var c = f[b];
        var d = new Polyline(c.points, "#ff0000", 7);
        _MapApp.addOverlay(d)
    }
}
window.RouteObject = route;
MapsApp.prototype.getRoute = function() {
    return _routePath
};
_geoCodes = new geoCodes();
function geoCodes() {
    this.MBR;
    this.geoCodeObjs = new Array()
}
geoCodes.prototype.getMBR = function() {
    var j = null;
    var d = 0,
    c = 0,
    b = 0,
    h = 0;
    for (var f = 0; f < this.geoCodeObjs.length; f++) {
        var g = this.geoCodeObjs[f];
        if (f == 0) {
            d = g.point.x;
            c = g.point.y;
            b = g.point.x;
            h = g.point.y
        } else {
            if (g.point.x < d) {
                d = g.point.x
            }
            if (g.point.y < c) {
                c = g.point.y
            }
            if (g.point.x > b) {
                b = g.point.x
            }
            if (g.point.y > h) {
                h = g.point.y
            }
        }
    }
    return new MBR(d, c, b, h)
};
function geoCodeObj() {
    this.point;
    this.desc
}
function geoCode(b, c) {
    this.fuzzymode = "0" || b;
    this.q = "" || c
}
function preccessGeoCodeXML(h) {
    window.status = "������ַ����....";
    _geoCodes.geoCodeObjs.clear();
    var m = new DocParser(h);
    var n = h.indexOf("<Position>");
    while (n != -1) {
        var k = h.indexOf("<X>", n);
        var c = h.indexOf("</X>", n);
        var g = h.substring(k + 3, c);
        var q = h.indexOf("<Y>", n);
        var o = h.indexOf("</Y>", n);
        var f = h.substring(q + 3, o);
        var l = h.indexOf("<Description>", n);
        var j = h.indexOf("</Description>", n);
        var b = h.substring(l + 13, j);
        var d = new geoCodeObj();
        d.point = new Point(g, f);
        d.desc = b;
        _geoCodes.geoCodeObjs.push(d);
        n = h.indexOf("<Position>", n + 1)
    }
    if (_GeoCodeCallBack) {
        _GeoCodeCallBack()
    }
}
function drawGeoCode() {
    window.status = "���Ƶ�ַ����....";
    getMap().centerAtMBR(_geoCodes.getMBR());
    var d = _geoCodes.geoCodeObjs;
    for (var f = 0; f < d.length; f++) {
        var g = d[f];
        var c = new Icon();
        c.image = "images/iconA.png";
        c.height = 38;
        c.width = 24;
        var b = new Marker(g.point, c);
        b.addListener("click",
        function() {
            b.openInfoWindowHtml(g.desc)
        });
        getMap().addOverlay(b)
    }
}
window.GeoCodeObject = geoCode;
delete Object.prototype.setTimeout;
delete Object.prototype.toStringSize;
delete Object.prototype._setTimeoutDispatcher;
delete Object.prototype.eventHandler;
delete Object.prototype.Clone;
if (typeof EzObject == "undefined" || !EzObject) {
    var EzObject = function() {
        this.setTimeout = function(ie, Bi) {
            var ke = "tempVar" + _m_iSeq;
            _m_iSeq++;
            if (_m_iSeq == Number.MAX_VALUE - 1) {
                _m_iSeq = 0
            }
            eval(ke + " = this;");
            if (typeof(ie.replace) != "function") {
                return window.setTimeout(";", Bi)
            } else {
                var Rh = ie.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
                return window.setTimeout(ke + '._setTimeoutDispatcher("' + Rh + '");', Bi)
            }
        };
        this.toStringSize = function(intTmp, size) {
            var str = intTmp + "";
            while (str.length < size) {
                str = "0" + str
            }
            return str
        };
        this._setTimeoutDispatcher = function(ie) {
            eval(ie)
        };
        this.eventHandler = function(tg) {
            var g = this;
            return function(b) {
                if (!b) {
                    b = window.event
                }
                if (b && !b.target) {
                    b.target = b.srcElement
                }
                g[tg](b)
            }
        };
        this.Clone = function() {
            if (!this.constructor) {
                return this
            }
            var objClone = new this.constructor();
            for (var key in this) {
                if (typeof(this[key]) == "object") {
                    if (this[key] != null && typeof(this[key]["Clone"]) == "function") {
                        objClone[key] = this[key].Clone()
                    } else {
                        objClone[key] = this[key]
                    }
                } else {
                    objClone[key] = this[key]
                }
            }
            if (!objClone || ("" + objClone) == "") {
                return (new String(this) + objClone) ? this: objClone
            } else {
                objClone.toString = this.toString;
                return objClone
            }
        };
        this.dispatchEvent = function(eventType, eventArgs) {
            eventArgs = eventArgs || {};
            var events = this["on" + eventType];
            var called = 0;
            if (events && typeof(events) == "function") {
                events = [events]
            }
            if (!eventArgs.type) {
                eventArgs.type = eventType
            }
            eventArgs.preventDefault = function() {
                eventArgs.defaultOp = null
            };
            eventArgs.stopPropagation = function() {
                eventArgs.cancelBubble = true
            };
            var $pointer = this;
            if (events) {
                for (var i = 0; i < events.length; i++) { (function(i) {
                        var evt = events[i];
                        var len = events.length;
                        var capturer = events.capturer;
                        var capturerName = events.capturerName;
                        return function() {
                            called++;
                            var ret = evt.call($pointer, eventArgs);
                            if (!eventArgs.cancelBubble && called == len && capturer && capturerName && capturer[capturerName]) {
                                capturer[capturerName](eventArgs)
                            }
                            if (called == len && eventArgs.defaultOp) {
                                eventArgs.defaultOp.call($pointer, eventArgs)
                            }
                            return ret
                        }
                    })(i)()
                }
            } else {
                if (eventArgs.defaultOp) {
                    eventArgs.defaultOp.call($pointer, eventArgs)
                }
            }
        };
        this.fireEvent = this.dispatchEvent;
        this.captureEvents = function(target, eventType, capturerName, closure) {
            if (capturerName instanceof Function) {
                closure = capturerName;
                capturerName = null
            }
            capturerName = capturerName || "on" + eventType;
            target["on" + eventType] = target["on" + eventType] || [function() {}];
            var events = target["on" + eventType];
            if (typeof(events) == "function") {
                target["on" + eventType] = [events]
            }
            target["on" + eventType].capturer = this;
            target["on" + eventType].capturerName = capturerName;
            if (closure) {
                this[capturerName] = closure
            }
        };
        this.addEventListener = function(eventType, closure) {
            if (this["on" + eventType] == null) {
                this["on" + eventType] = []
            }
            var events = this["on" + eventType];
            if (events && typeof(events) == "function") {
                this["on" + eventType] = [events];
                events = this["on" + eventType]
            }
            events.push(closure);
            return closure
        };
        this.removeEventListener = function(eventType, closure) {
            var events = this["on" + eventType];
            if (events && typeof(events) == "function") {
                events = [events]
            }
            for (var i = 0; i < events.length; i++) {
                if (events[i] == closure) {
                    events.splice(i, 1)
                }
            }
            return closure
        }
    }
}
EzServerClient.GlobeParams.RootObj = new EzObject();
EzServerClient.GlobeFunction.copyProtoFunction = function(b, c) {
    for (pFunc in c) {
        b.prototype[pFunc] = c[pFunc]
    }
};
try {
    EzServerClient.GlobeFunction.copyProtoFunction(IEBrowser, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(divCreator, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(Shaderer, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(Ic, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(xa, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(XMLHttp, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(Point, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(Rect, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(MBR, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(OverView, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(nc, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(TrackMonitor, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(MainFrame, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(OverlayStatus, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(MapServerControl, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(MapStatusControl, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(DragEvent, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(InfoObj, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(IconInfo, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(Xd, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(Icon, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(InfoWind, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(MapUnit, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(EzLog, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(MapsApp, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(EzPointStr, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(EzManager, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(iOverLay, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(Polyline, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(Polygon, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(Rectangle, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(Circle, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(Marker, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(Title, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(LegendFunc, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(TMLegend, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(MultiFeat, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(MapControl, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(MapStandControl, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(MapSmallControl, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(MultiMaps, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(MapServer, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(MenuObject, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(EzColorPicker, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(DocParser, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(EzLayer, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(QueryObject, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(EditObject, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(FeatureObject, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(DWREngine, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
    EzServerClient.GlobeFunction.copyProtoFunction(Array, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
function EzTileThematic(b, c, d) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "string")) {
            throw EzErrorFactory.createError("EzTileThematic���췽����arguments[0]���Ͳ���ȷ")
        } else {
            this.format = b;
            this.bIsStreamOrText = c;
            this.thematicProxyURL = d
        }
    } catch(f) {
        throw EzErrorFactory.createError("EzTileThematic���췽��ִ�в���ȷ", f)
    }
}
EzTileThematic.prototype.getFormat = function() {
    return this.format
};
EzTileThematic.prototype.setFormat = function(b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "string")) {
            throw EzErrorFactory.createError("EzTileThematic::setFormat������arguments[0]���Ͳ���ȷ")
        } else {
            this.format = b
        }
    } catch(c) {
        throw EzErrorFactory.createError("EzTileThematic::setFormat����ִ�в���ȷ", c)
    }
};
EzTileThematic.prototype.open = function(b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "EzMap")) {
            throw EzErrorFactory.createError("EzTileThematic::open������arguments[0]���Ͳ���ȷ")
        } else {
            b.map.bThematicOverlay = true;
            b.map.curThematicURL = this.format;
            if (this.bIsStreamOrText) {
                b.map.bIsStreamOrText = true
            } else {
                if (this.thematicProxyURL) {
                    b.map.strThematicProxyURL = this.thematicProxyURL
                }
            }
            b.map.loadTileImages()
        }
    } catch(c) {
        throw EzErrorFactory.createError("EzTileThematic::open����ִ�в���ȷ", c)
    }
};
EzTileThematic.prototype.close = function(b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "EzMap")) {
            throw EzErrorFactory.createError("EzTileThematic::close������arguments[0]���Ͳ���ȷ")
        } else {
            b.map.bThematicOverlay = false;
            b.map.removeTilesFromDiv(b.map.overlayImages);
            b.map.overlayImages = []
        }
    } catch(c) {
        throw EzErrorFactory.createError("EzTileThematic::close����ִ�в���ȷ", c)
    }
};
function EzTileThematicCP03(c, b, d, f) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(c, "string")) {
            throw EzErrorFactory.createError("EzTileThematicCP03���췽����arguments[0]���Ͳ���ȷ")
        } else {
            if (!EzServerClient.GlobeFunction.isTypeRight(b, "string")) {
                throw EzErrorFactory.createError("EzTileThematicCP03���췽����arguments[1]���Ͳ���ȷ")
            } else {
                this.thematicBaseURL = c;
                this.thematicXML = b;
                this.thematicProxyURL = f;
                this.bIsStreamOrText = d
            }
        }
    } catch(g) {
        throw EzErrorFactory.createError("EzTileThematicCP03���췽��ִ�в���ȷ", g)
    }
}
EzTileThematicCP03.prototype.getThematicBaseURL = function() {
    return this.thematicBaseURL
};
EzTileThematicCP03.prototype.getThematicXML = function() {
    return this.thematicXML
};
EzTileThematicCP03.prototype.setThematicBaseURL = function(b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "string")) {
            throw EzErrorFactory.createError("EzTileThematicCP03::setThematicBaseURL������arguments[0]���Ͳ���ȷ")
        } else {
            this.thematicBaseURL = b
        }
    } catch(c) {
        throw EzErrorFactory.createError("EzTileThematicCP03::setThematicBaseURL����ִ�в���ȷ", c)
    }
};
EzTileThematicCP03.prototype.open = function(b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "EzMap")) {
            throw EzErrorFactory.createError("EzTileThematicCP03::open������arguments[0]���Ͳ���ȷ")
        } else {
            b.map.bThematicOverlay = true;
            b.map.bThematicOverlayCP03 = true;
            b.map.curThematicURLCP03 = this.thematicBaseURL;
            b.map.strThematicXML = this.thematicXML;
            if (this.bIsStreamOrText) {
                b.map.bIsStreamOrText = true
            } else {
                if (this.thematicProxyURL) {
                    b.map.strThematicProxyURL = this.thematicProxyURL
                }
            }
            b.map.loadTileImages()
        }
    } catch(c) {
        throw EzErrorFactory.createError("EzTileThematicCP03::open����ִ�в���ȷ", c)
    }
};
EzTileThematicCP03.prototype.close = function(b) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(b, "EzMap")) {
            throw EzErrorFactory.createError("EzTileThematicCP03::close������arguments[0]���Ͳ���ȷ")
        } else {
            b.map.bThematicOverlay = false;
            b.map.bThematicOverlayCP03 = false;
            b.map.removeTilesFromDiv(b.map.overlayImages);
            b.map.overlayImages = []
        }
    } catch(c) {
        throw EzErrorFactory.createError("EzTileThematicCP03::close����ִ�в���ȷ", c)
    }
};