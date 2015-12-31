/**
 * 在地图上打开自定义InfoWindow窗口，前两个参数是必须的，后三个参数可以没有，如果有则必须按顺序给出
 * @param point 
 * 			窗口位置参考点，通常是被点击的Marker,Circle等元素中心点
 * @param html 
 * 			窗口内显示内容 html格式
 * @param windowType 窗口类型，
 * 			NORMAL: 	  窗口在point点正上方显示
 * 			TOP_RIGHT:    窗口在point点右上角显示
 * 			BOTTOM_RIGHT: 窗口在point点右下角显示
 * @param title 
 * 		windowType为NORMAL是可以提供title，title会显示在左上角作为窗口标题。
 * @param showCloseButton
 * 		是否显示关闭按钮，默认显示
 */
EzMap.prototype.openInfoWindowCustomized = function(point, html,windowType,title,showCloseButton){
	this.map.infoWindow.setWindowType(windowType);
	this.map.infoWindow.setTitle(title);
	this.map.infoWindow.setShowCloseButton(showCloseButton);
	this.map.openInfoWindowCustomized(point.x,point.y,html);
};

MainFrame.prototype.openInfoWindowCustomized = function(lon, lat, html, bIsInScreen) {
	var pIcon = new Icon("eleInfo", 150, 150, new Point(10, 10), new Point(10,
			10), new Point(10, 10), "ffff", 30, null);
	var pIconInfo = new IconInfo("", pIcon);
	this.pWinInfo = new InfoObj('wujie', new Point(lon, lat), pIconInfo,
			'size=10', html);
	this.pWinInfo.bIsVisable = true;
	if (typeof bIsInScreen == "object") {
		this.curOverlay = bIsInScreen;
	} else if (typeof bIsInScreen == "undefined" || bIsInScreen) {
		this.bIsInScreen = true;
	}
	this.showInfoWindow(this.pWinInfo);
};

function InfoWind(closeListener, parentFrame, windowZIndex, shadowZIndex) {
	this.oncloseclick = closeListener;
	this.createWindow(windowZIndex);
	this.createShadow(shadowZIndex);
	if (_IEBrowser.type != 1) {
		this.createMask();
	} else {
		this.maskPng = null;
	}
	this.createContentArea();
	this.createCloseButton();
	parentFrame.appendChild(this.windowDiv);
	//parentFrame.appendChild(this.shadowDiv);
	this.hide();
};

InfoWind.prototype.setContentSize = function(widht, height) {
	this.setSize(widht, height);
};

InfoWind.prototype.setSize = function(contentWidth, contentHeight) {
	if (contentWidth < 0){
		contentWidth = 0;
	}
	if (contentHeight < 0){
		contentHeight = 0;
	}
	this.contentWidth = contentWidth;
	this.contentHeight = contentHeight;
	this.setWindowSize(contentWidth, contentHeight);
};
InfoWind.prototype.getWindowHeight = function() {
	return this.contentHeight + this.padding + this.titleHeight;
};
InfoWind.prototype.getTotalHeight = function() {
	var totalHeight = this.contentHeight + this.padding + this.titleHeight;
	if("BOTTOM_RIGHT" != this.windowType ){
		totalHeight += this.window.pointer.height;
	}
	return totalHeight;
};
InfoWind.prototype.getTotalHeightAboveGround = function() {
	return this.getTotalHeight()
			+ (this.iconClass.pointCoord.y - this.iconClass.infoTipCoord.y);
};
InfoWind.prototype.getTotalShadowHeight = function() {
	return Math.floor(this.contentHeight / 4) + this.shadow.pointer.height
			+ this.shadow.nw.height;
};
InfoWind.prototype.getTotalWidth = function() {
	var totalWidth = this.contentWidth + this.padding*2;
	if("BOTTOM_RIGHT" == this.windowType){
		totalWidth += this.window.pointer.width;
	}
	return totalWidth;
};
InfoWind.prototype.getOffsetLeft = function() {
	return this.windowDiv.offsetLeft;
};
InfoWind.prototype.getOffsetTop = function() {
	return this.windowDiv.offsetTop;
};
InfoWind.prototype.setWindowSize = function() {
	this.titleHeight = 18;
	this.padding = 18;
	if(this.getShowCloseButton()){
		this.titleHeight=20;
		this.showButton();
	} else {
		this.hideButton();
	}
	if(this.title){
		this.titleHeight =30;
		this.showTitle();
	} else {
		this.hideTitle();
	}
	this.resizeElement(this.window.nw, this.padding, this.titleHeight);
	this.resizeElement(this.window.n, this.contentWidth, this.titleHeight);
	this.resizeElement(this.window.ne, this.padding, this.titleHeight);
	this.resizeElement(this.window.w, this.padding, this.contentHeight);
	this.resizeElement(this.window.c, this.contentWidth, this.contentHeight);
	this.resizeElement(this.window.e, this.padding, this.contentHeight);
	this.resizeElement(this.window.sw, this.padding, this.padding);
	this.resizeElement(this.window.s, this.contentWidth, this.padding);
	this.resizeElement(this.window.se, this.padding, this.padding);
	this.resizeElement(this.contentArea, this.contentWidth, this.contentHeight);
	this.reposition();
};

InfoWind.prototype.reposition = function(){
	this.positionElement(this.window.nw, 0, 0);
	this.positionElement(this.window.n, this.padding, 0);
	this.positionElement(this.window.ne, this.contentWidth + this.padding, 0);
	this.positionElement(this.window.w, 0, this.titleHeight);
	this.positionElement(this.window.c, this.padding, this.titleHeight);
	this.positionElement(this.window.e, this.padding + this.contentWidth, this.titleHeight);
	this.positionElement(this.window.sw, 0, this.titleHeight + this.contentHeight);
	this.positionElement(this.window.s, this.padding, this.titleHeight + this.contentHeight);
	this.positionElement(this.window.se, this.padding + this.contentWidth, this.titleHeight + this.contentHeight);
	this.positionElement(this.contentArea, this.padding, this.titleHeight);
	var buttonLeft = this.getTotalWidth() - this.closeButton.width -5;
	this.positionElement(this.closeButton,buttonLeft , 5);
	this.positionElement(this.window.title, this.padding, 0);
	this.contentArea.style.marginLeft = -1.5;
	if("BOTTOM_RIGHT" == this.windowType){
		this.positionElement(this.window.pointer, 0, 0);
		this.window.pointer.style.left =( parseInt(this.window.pointer.style.left)+1) +"px";
		this.window.pointer.style.filter = divCreator.alphaImageLoader(this.pointerForBottomRight, true);
	} else if("TOP_RIGHT" == this.windowType){
		this.positionElement(this.window.pointer, 0, (this.getWindowHeight() - 1));
		this.window.pointer.style.filter = divCreator.alphaImageLoader(this.pointerForTopRight, true);
	} else {
		this.positionElement(this.window.pointer, 
				(this.getTotalWidth()-this.window.pointer.width)/2,(this.getWindowHeight() - 1));
		this.window.pointer.style.filter = divCreator.alphaImageLoader(this.pointerForTopCenter, true);
	}
	if("BOTTOM_RIGHT" == this.windowType){
		this.offsetAll();
	}
};
InfoWind.prototype.showButton = function(){
	this.closeButton.style.visibility = "visible";
};
InfoWind.prototype.hideButton = function(){
	this.closeButton.style.visibility = "hidden";
};
InfoWind.prototype.showTitle = function(){
	this.resizeElement(this.window.title, this.contentWidth, this.titleHeight);
	this.window.nw.style.borderBottom = "1px solid gray";
	this.window.n.style.borderBottom = "1px solid gray";
	this.window.ne.style.borderBottom = "1px solid gray";
	this.window.title.innerHTML = this.title;
	this.window.title.style.marginTop = 8;
	this.window.title.style.fontWeight = "bold";
};
InfoWind.prototype.hideTitle = function(){
	this.resizeElement(this.window.title, this.contentWidth, this.titleHeight);
	this.window.nw.style.borderBottom = "";
	this.window.n.style.borderBottom = "";
	this.window.ne.style.borderBottom = "";
	this.window.title.innerHTML = "";
};

InfoWind.prototype.resizeElement = function(element,width,height){
	element.style.width = width + "px";
	element.style.height = height + "px";
	element.width = width;
	element.height  = height;
};

InfoWind.prototype.positionElement = function(element,left,top){
	element.style.left = left + "px";
	element.style.top = top + "px";
};

InfoWind.prototype.offsetAll = function(){
	this.contentArea.style.left = this.padding +this.window.pointer.width;
	this.window.nw.style.left =this.window.pointer.width;
	this.window.n.style.left = this.padding +this.window.pointer.width;
	this.window.ne.style.left = this.padding + this.contentWidth+this.window.pointer.width;
	this.window.w.style.left = this.window.pointer.width;
	this.window.c.style.left = this.padding +this.window.pointer.width;
	this.window.e.style.left = this.padding + this.contentWidth+this.window.pointer.width;
	this.window.sw.style.left = this.window.pointer.width;
	this.window.s.style.left = this.padding +this.window.pointer.width;
	this.window.se.style.left = this.padding + this.contentWidth+this.window.pointer.width;
	
};
InfoWind.prototype.setShadowSize = function(k, m) {
	k -= 15;
	var Eb = Math.floor(m / 4);
	var Vb = k + this.shadow.nw.width;
	var Sa = this.calculatePointerOffset(k) - 41;
	var Ba = Eb + this.shadow.n.height + "px";
	var Jd = Eb + this.shadow.nw.height;
	this.shadow.s1Div.style.width = Math.max(Sa, 0) + "px";
	this.shadow.pointer.style.left = Sa + this.shadow.sw.width + "px";
	this.shadow.s2Div.style.left = Sa + this.shadow.pointer.width
			+ this.shadow.sw.width + "px";
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
	this.shadow.ne.style.left = Vb + Jd - 30 + "px";
};
InfoWind.prototype.setMaskSize = function() {
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
	E.setAttribute("coords", "0,0,0," + fd + ka + kg + ka + fd + ka + Vg + ka
			+ yh + ka + Hg + ka + fd + ka + Nf + ka + fd + ka + Nf + ",0");
};
InfoWind.prototype.hide = function() {
	if (this.windowDiv)
		this.windowDiv.style.display = "none";
	this.shadowDiv.style.display = "none";
};
InfoWind.prototype.show = function() {
	this.windowDiv.style.display = "";
	this.shadowDiv.style.display = "";
	this.windowDiv.style.visibility = "visible";
	this.shadowDiv.style.visibility = "visible";
	this.contentArea.style.visibility = "visible";
};

InfoWind.prototype.isVisible = function() {
	return this.windowDiv.style.display != "none";
};

InfoWind.prototype.positionAt = function(left, top, pIcon) {
	// 设置弹出窗口相对于point的位置
	this.left = left - this.getTotalWidth() / 2;
	this.top = top - this.getTotalHeight();
	this.left += pIcon.infoTipCoord.x - pIcon.pointCoord.x;
	this.top += pIcon.infoTipCoord.y - pIcon.pointCoord.y;
	if("BOTTOM_RIGHT" == this.windowType){
		this.windowDiv.style.left = left +"px";
		this.windowDiv.style.top =  top + "px";
	} else if("TOP_RIGHT" == this.windowType){
		this.windowDiv.style.left = left + "px";
		this.windowDiv.style.top = this.top + "px";
	} else {
		this.windowDiv.style.left = this.left + "px";
		this.windowDiv.style.top = this.top + "px";
	}
};

InfoWind.prototype.calculatePointerOffset = function(k) {
	return Math.floor(k / 4);
};
InfoWind.prototype.createCroppingDiv = function(f) {
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
	return h;
};
InfoWind.prototype.createWindow = function(Ra) {
	this.blankImg = "images/iw_blank.png";
	this.closeImgNormal = "images/iw_close_normal.png";
	this.closeImgHover = "images/iw_close_hovered.png";
	this.pointerForTopCenter = "images/iw_pointer_tc.png";
	this.pointerForBottomRight = "images/iw_pointer_br.png";
	this.pointerForTopRight = "images/iw_pointer_tr.png";
	//
	this.window = new Object();
	this.window.title = divCreator.create(null, 25, 25, 0, 0, 0, false);
	this.window.nw = divCreator.create(this.blankImg, 25, 25, 0, 0, 0, false);
	this.window.n = divCreator.create(this.blankImg, 640, 25, this.window.nw.width,
			0, 0, true);
	this.window.ne = divCreator.create(this.blankImg, 25, 25, 0, 0, 0, false);
	this.window.w = divCreator.create(this.blankImg, 25, 640, 0,
			this.window.nw.height, 0, true);
	this.window.c = divCreator.create(this.blankImg, 640, 640, this.window.w.width,
			this.window.n.height, 0, true);
	this.window.e = divCreator.create(this.blankImg, 25, 640, 0,
			this.window.ne.height, 0, true);
	this.window.sw = divCreator.create(this.blankImg, 25, 25, 0, 0, 0, false);
	this.window.s = divCreator.create(this.blankImg, 640, 25, this.window.sw.width,
			0, 0, true);
	this.window.se = divCreator.create(this.blankImg, 25, 25, 0, 0, 0, false);
	this.window.pointer = divCreator.create(this.pointerForTopCenter, 20, 20, 0, 0, 0, false);
	this.window.title.onmousedown = this.onMouseDown;
	this.window.nw.onmousedown = this.onMouseDown;
	this.window.n.onmousedown = this.onMouseDown;
	this.window.ne.onmousedown = this.onMouseDown;
	this.window.w.onmousedown = this.onMouseDown;
	this.window.c.onmousedown = this.onMouseDown;
	this.window.e.onmousedown = this.onMouseDown;
	this.window.sw.onmousedown = this.onMouseDown;
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
	this.windowDiv.appendChild(this.window.s);
	this.windowDiv.appendChild(this.window.se);
	this.windowDiv.appendChild(this.window.pointer);
	this.windowDiv.appendChild(this.window.title);
	this.setBorder();
};
InfoWind.prototype.setBorder = function(){
	var border = "1px solid #c7c7c7";
	this.window.nw.style.borderTop = border;
	this.window.nw.style.borderLeft = border;
	this.window.n.style.borderTop = border;
	this.window.ne.style.borderTop = border;
	this.window.ne.style.borderRight = border;
	this.window.w.style.borderLeft = border;
	this.window.e.style.borderRight= border;
	this.window.sw.style.borderLeft = border;
	this.window.sw.style.borderBottom = border;
	this.window.s.style.borderBottom= border;
	this.window.se.style.borderBottom= border;
	this.window.se.style.borderRight= border;
};
InfoWind.prototype.createShadow = function(Ra) {
	this.shadow = new Object();
	this.shadow.nw = divCreator.create(Fg, 70, 30, 0, 0, 0, false);
	this.shadow.n = divCreator.create(Oi, 640, 30, this.shadow.nw.width, 0, 0,
			false);
	this.shadow.ne = divCreator.create(ii, 70, 30, 0, 0, 0, false);
	this.shadow.w = divCreator.create(Th, 360, 280, 0, this.shadow.nw.height,
			0, false);
	this.shadow.c = divCreator.create(Gg, 640, 640, this.shadow.w.width,
			this.shadow.n.height, 0, false);
	this.shadow.e = divCreator.create(Og, 360, 280, 0, this.shadow.ne.height,
			0, false);
	this.shadow.sw = divCreator.create(Qg, 70, 60, 0, 0, 0, false);
	this.shadow.s1 = divCreator.create(qf, 320, 60, this.shadow.sw.width, 0, 0,
			false);
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
	// 去掉窗口阴影
};
InfoWind.prototype.hasMask = function() {
	return this.maskPng != null;
};
InfoWind.prototype.getMaskMap = function() {
	return document.getElementById(this.maskMapId);
};
var cf = 0;
InfoWind.prototype.createMask = function() {
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
		u.appendChild(E);
	}
	this.maskPng = divCreator
			.create(_TransparentImageUrl, 0, 0, 0, 0, 0, false);
	this.windowDiv.appendChild(this.maskPng);
	this.maskPng.setAttribute("usemap", "#" + this.maskMapId);
	this.nextMaskArea = 1;
};
InfoWind.prototype.addAreaToMaskMap = function(ue, Ag) {
	if (this.hasMask()) {
		var u = this.getMaskMap();
		if (this.nextMaskArea < u.childNodes.length) {
			var E = u.childNodes[this.nextMaskArea];
			E.setAttribute("coords", ue.join(","));
			E.onmousedown = Ag;
			this.nextMaskArea++;
		}
	}
};
InfoWind.prototype.clearMaskMap = function() {
	if (this.hasMask()) {
		var u = this.getMaskMap();
		for (var a = 1; a < u.childNodes.length; a++) {
			var E = u.childNodes[a];
			E.setAttribute("coords", "");
			E.onmousedown = null;
		}
		this.nextMaskArea = 1;
	}
};
InfoWind.prototype.getMaskLeft = function() {
	return this.windowDiv.offsetLeft;
};
InfoWind.prototype.getMaskTop = function() {
	return this.windowDiv.offsetTop;
};
InfoWind.prototype.createContentArea = function() {
	var contentArea = null;
	var iOffset = 15;
	contentArea = window.document.createElement("DIV");
	contentArea.style.position = "absolute";
	contentArea.style.left = convert2Px(iOffset);
	contentArea.style.top = convert2Px(iOffset);
	contentArea.style.zIndex = 0;
	contentArea.id = "contentArea";
	setCursor(contentArea, "auto");
	contentArea.onmousedown = this.onMouseDown;
	this.windowDiv.appendChild(contentArea);
	this.contentArea = contentArea;
	this.contentArea.onmousedown = this.onMouseDown;
	contentArea = window.document.createElement("DIV");
	contentArea.style.position = "absolute";
	contentArea.style.left = convert2Px(-screen.width);
	contentArea.style.top = convert2Px(-screen.height);
	contentArea.style.width = convert2Px(screen.width);
	contentArea.style.height = convert2Px(screen.height);
	contentArea.style.visibility = "hidden";
	this.offscreenContainer = contentArea;
	window.document.body.appendChild(contentArea);
	contentArea.id = "offscreenContainer";
	contentArea = window.document.createElement("DIV");
	contentArea.style.position = "absolute";
	contentArea.style.left = convert2Px(iOffset);
	contentArea.style.top = convert2Px(iOffset);
	contentArea.style.zIndex = 0;
	setCursor(contentArea, "auto");
	this.offscreenArea = contentArea;
	contentArea.id = "offscreenArea";
	this.offscreenArea.onmousedown = this.onMouseDown;
	this.offscreenContainer.appendChild(this.offscreenArea);
};
InfoWind.prototype.prepareOffscreen = function(voidFunc) {
	if (this.windowDiv.style.display == "none") {
		this.windowDiv.style.display = "";
		this.shadowDiv.style.display = "";
		this.windowDiv.style.visibility = "hidden";
		this.shadowDiv.style.visibility = "hidden";
		this.contentArea.style.visibility = "hidden";
		this.offscreenArea.style.visibility = "hidden";
	}
	if (voidFunc) {
		this.offscreenContainer.style.width = convert2Px(voidFunc);
	}
};
InfoWind.prototype.clearOffscreenArea = function() {
	RemoveChildren(this.offscreenArea);
};
InfoWind.prototype.flipOffscreenAndSize = function() {
	var minWidth = 0;
	var minHeight = 0;
	var contentWidth = Math.max(this.offscreenArea.offsetWidth, minWidth);
	var contentHeight = Math.max(this.offscreenArea.offsetHeight, minHeight);
	this.flipOffscreenArea(contentWidth, contentHeight);
	this.setContentSize(contentWidth, contentHeight);
};
InfoWind.prototype.sizeToContent = function() {
	EzLog.write("Offset width: " + this.contentArea.offsetWidth);
	EzLog.write("Offset height: " + this.contentArea.offsetHeight);
	this.setContentSize(Math.max(this.contentArea.offsetWidth, 183),
			this.contentArea.offsetHeight);
};
InfoWind.prototype.flipOffscreenArea = function(width, height) {
	this.offscreenContainer.removeChild(this.offscreenArea);
	this.windowDiv.removeChild(this.contentArea);
	var he = this.offscreenArea;
	this.offscreenArea = this.contentArea;
	this.contentArea = he;
	this.offscreenContainer.appendChild(this.offscreenArea);
	this.windowDiv.appendChild(this.contentArea);
	if (width && height) {
		this.contentArea.style.width = convert2Px(width);
		this.contentArea.style.height = convert2Px(height);
	}
	this.offscreenArea.style.width = "auto";
	this.offscreenArea.style.height = "auto";
	this.offscreenArea.style.visibility = "visible";
	this.clearOffscreenArea();
};
InfoWind.prototype.onMouseDown = function(b) {
	if (_IEBrowser.type == 1) {
		window.event.cancelBubble = true;
	} else {
		b.cancelDrag = true;
	}
};
InfoWind.prototype.createCloseButton = function() {
	this.closeButton = Shaderer.create(this.closeImgNormal, 20, 20, null, null, 4, null, null);
	this.closeButton.style.position = "absolute";
	setCursor(this.closeButton, "pointer");
	this.closeButton.onmousedown = this.eventHandler("onCloseMouseDown");
	var that = this;
	this.closeButton.onmouseenter = function(){
		that.closeButton.src = that.closeImgHover;
	};
	this.closeButton.onmouseout = function(){
		that.closeButton.src =that.closeImgNormal ;
	};
	this.windowDiv.appendChild(this.closeButton);
};
InfoWind.prototype.onCloseMouseDown = function(b) {
	S(b);
	if (this.oncloseclick && b.button == "1") { //只有左键点击才关闭窗口
		this.oncloseclick(b);
	}
	this.closeButton.src =this.closeImgNormal ;
};
InfoWind.prototype.setTitle = function(title) {
	this.title = title;
};
InfoWind.prototype.setWindowType = function(windowType) {
	if(!windowType){
		windowType = "NORMAL";
	}
	this.windowType = windowType;
};
InfoWind.prototype.getWindowType = function() {
	if(this.windowType!= "TOP_RIGHT" && this.windowType != "BOTTOM_RIGHT"){
		this.windowType = "NORMAL";
	}
	this.windowType = windowType;
};
InfoWind.prototype.setShowCloseButton = function(showCloseButton){
		showCloseButton = true;
	this.showCloseButton = showCloseButton;
};
InfoWind.prototype.getShowCloseButton = function(){
	if(this.showCloseButton != false){
		return true;
	}
	return this.showCloseButton ;
};

