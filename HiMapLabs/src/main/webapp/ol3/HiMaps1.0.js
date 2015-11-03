require.config({
    baseUrl: '',
    paths: {
        'jquery': '../js/common/jquery-1.7.2'
    }, shim: {
        'IHiMap': {exports: 'IHiMap'}
    }
});

define(['jquery', 'IHiMap'], function ($, IHiMap) {


//××××××××××××××××××××××××××方法内部定义开始×××××××××××××××××××××××××××

    var HiMap = function (mapobj) {
        var attribution = new ol.Attribution({
            html: 'PGIS'
        });

        var projection = ol.proj.get('EPSG:4326');
        var projectionExtent = [119.399, 35.585, 121.780, 37.022];
        var tileSize = 256;
        var maxResolution = 0.000976566472126202;
        var resolutions = new Array(10);
        var z;
        for (z = 9; z >= 0; --z) {
            resolutions[z] = maxResolution / Math.pow(2, z);
        }
        var urlTemplate = 'http://10.16.1.72:9080/EzServer/EzMap?Service=getImage&Type=RGB&ZoomOffset=-1&Col={x}&Row={y}&Zoom={z}&V=0.3';


        var map = new ol.Map({
            target: mapobj,
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.TileImage({
                        //attributions: [attribution],
                        tileUrlFunction: function (tileCoord, pixelRatio, projection) {
                            var z = tileCoord[0];
                            var x = tileCoord[1];
                            var y = tileCoord[2];
                            z = 8 - z;
                            return urlTemplate.replace('{z}', z.toString())
                                .replace('{y}', y.toString())
                                .replace('{x}', x.toString());
                        },
                        projection: projection,
                        tileGrid: new ol.tilegrid.TileGrid({

                            origin: [0, 0],
                            //minZoom: 4,
                            resolutions: resolutions,
                            tileSize: 256
                        })
                    })
                })
            ],
            view: new ol.View({
                center: [120.35595, 36.07525],
                resolutions: resolutions,
                projection: projection,
                zoom: 4
            })
        });

        var features = new ol.Collection();
        var featureOverlay = new ol.layer.Vector({
            source: new ol.source.Vector({features: features}),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });
        featureOverlay.setMap(map);


        this.map = map;
        this.features = features;
        this.featureOverlay = featureOverlay;
        this.draw = null;
    }

    HiMap.prototype = new IHiMap();

    HiMap.prototype.setCenter = function (strcoords) {
        if (arguments.length == 1) {
            this.map.getView().setCenter(strcoords.split(","));
        } else {
            this.map.getView().setCenter(arguments);
        }
    }

    HiMap.prototype.moveTo = function (strCoords, zoomlevel) {
        this.map.getView().setCenter(strCoords.split(","));
        this.map.getView().setZoom(zoomlevel);
    }

    HiMap.prototype.drawPoint = function (callback) {
        addInteraction.call(this,'Point',callback);
    }
    HiMap.prototype.drawPolyline = function (callback) {
        addInteraction.call(this,'LineString',callback);
    }
    HiMap.prototype.drawPolygon = function (callback) {
        addInteraction.call(this,'Polygon',callback);
    }
    HiMap.prototype.drawCircle = function (callback) {
        addInteraction.call(this,'Circle',callback);
    }
    HiMap.prototype.drawRect = function (callback) {
        addInteraction.call(this,'Rect',callback);
    }

    function addInteraction(geotype,callback){
        var geometryFunction,maxPoints;
        var drawtype = geotype;
        if(geotype == "Rect"){
            drawtype = "LineString";
            maxPoints = 2;
            geometryFunction = function(coordinates,geometry){
                if(!geometry){
                    geometry = new ol.geom.Polygon(null);
                }
                var start = coordinates[0];
                var end = coordinates[1];
                geometry.setCoordinates([
                    [start, [start[0], end[1]], end, [end[0], start[1]], start]
                ]);
                return geometry;
            }
        }
        this.draw = new ol.interaction.Draw({
            features: this.features,
            type: drawtype,
            geometryFunction: geometryFunction,
            maxPoints: maxPoints
        });
        this.draw.on('drawend', function (drawEvent) {
            var feature = drawEvent.feature;
            var coordinates = null;
            if(geotype == "Circle"){
                coordinates = feature.getGeometry().getCenter().join(",")+","+feature.getGeometry().getRadius();
            }else if(geotype == "Rect"){
                var fullcoordinates = feature.getGeometry().getCoordinates()[0];
                coordinates = fullcoordinates[0][0]+","+fullcoordinates[0][1]+","+fullcoordinates[2][0]+","+fullcoordinates[2][1];
            }else{
                coordinates = feature.getGeometry().getCoordinates().join(",");
            }
            this.map.removeInteraction(this.draw);
            callback.call(null, coordinates);
        },this);
        this.map.addInteraction(this.draw);
    }


    this.HiMap = HiMap;

    //××××××××××××××××××××××××××方法内部定义结束×××××××××××××××××××××××××××


    //外部调用接口
    return {}

});
	



