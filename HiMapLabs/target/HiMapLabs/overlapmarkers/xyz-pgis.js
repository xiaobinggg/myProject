var attribution = new ol.Attribution({
  html: 'Copyright:&copy; 2013 ESRI, i-cubed, GeoEye'
});

var projection = ol.proj.get('EPSG:4326');
var projectionExtent = [119.399,35.585,121.780,37.022];

// The tile size supported by the ArcGIS tile service.
var tileSize = 256;

// Calculate the resolutions supported by the ArcGIS tile service.
// There are 16 resolutions, with a factor of 2 between successive
// resolutions. The max resolution is such that the world (360°)
// fits into two (512x512 px) tiles.
var maxResolution = 0.000976566472126202;
var resolutions = new Array(10);
var z;
for (z = 9; z >=0; --z) {
  resolutions[z] = maxResolution / Math.pow(2, z);
}

/*var urlTemplate = 'http://services.arcgisonline.com/arcgis/rest/services/' +
    'ESRI_Imagery_World_2D/MapServer/tile/{z}/{y}/{x}';*/
var urlTemplate = 'http://10.16.1.109:9080/EzServer/EzMap?Service=getImage&Type=RGB&ZoomOffset=-1&Col={x}&Row={y}&Zoom={z}&V=0.3';

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      /* ol.source.XYZ and ol.tilegrid.XYZ have no resolutions config */
      source: new ol.source.TileImage({
        attributions: [attribution],
        tileUrlFunction: function(tileCoord, pixelRatio, projection) {
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = tileCoord[2];
		  z = 8-z;
          return urlTemplate.replace('{z}', z.toString())
              .replace('{y}', y.toString())
              .replace('{x}', x.toString());
        },
        projection: projection,
        tileGrid: new ol.tilegrid.TileGrid({
          //origin: ol.extent.getTopLeft(projectionExtent),
		  origin: [0,0],
		  //minZoom: 4,
          resolutions: resolutions,
          tileSize: 256
        })
      })
    })
  ],
  view: new ol.View({
    center: [120.35595,36.07525],
	resolutions:resolutions,
    projection: projection,
    zoom: 4
  })
});
