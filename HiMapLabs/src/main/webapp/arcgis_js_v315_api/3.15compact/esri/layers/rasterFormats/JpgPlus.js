// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.
//>>built
define("esri/layers/rasterFormats/JpgPlus",["dojo/_base/declare","./Zlib","./Jpg"],function(f,l,m){return f(null,{constructor:function(){},decode:function(a){var c=new Uint8Array(a);a=new m;a.parse(c);var f=a.getData(a.width,a.height),g,h=a.width*a.height,k=a.eof,b=0,e=0,d=0;if(k<c.length-1){e=(new l(c.subarray(k))).getBytes();g=new Uint8Array(h);for(b=c=0;b<e.length;b++)for(d=7;0<=d;d--)g[c++]=e[b]>>d&1}c=[];for(b=0;3>b;b++)d=new Uint8Array(h),c.push(d);for(e=d=0;e<h;e++)for(b=0;3>b;b++)c[b][e]=
f[d++];return{width:a.width,height:a.height,pixels:c,mask:g}}})});