define(function (){

	/**
	 * k-d Tree 扩展 bing
	 *
	 */
	//计算2个节点的距离
	function distance(a, b) {
	    /*var lat1 = a.latitude,
	    lon1 = a.longitude,
	    lat2 = b.latitude,
	    lon2 = b.longitude;
	    var rad = Math.PI/180;
	
	    var dLat = (lat2-lat1)*rad;
	    var dLon = (lon2-lon1)*rad;
	    var lat1 = lat1*rad;
	    var lat2 = lat2*rad;
	
	    var x = Math.sin(dLat/2);
	    var y = Math.sin(dLon/2);
	
	    var a = x*x + y*y * Math.cos(lat1) * Math.cos(lat2); 
	    return Math.atan2(Math.sqrt(a), Math.sqrt(1-a));*/
	    
	    
	    _C_P = 0.0174532925199432957692222222222;

		var dlon = (b.longitude - a.longitude) * _C_P;
		var dlat = (b.latitude - a.latitude) * _C_P;
		var a = Math.sin(0.5 * dlat) * Math.sin(0.5 * dlat) + Math.cos(a.latitude  * _C_P) * Math.cos(b.latitude  * _C_P) * (Math.sin(0.5 * dlon) * Math.sin(0.5 * dlon));
		a = Math.abs(a);
		
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		d = c * 6371008.77141506;
	    d = Math.ceil(d);
	    return d;
	}
	
	
	
	
	var dimensions =["latitude", "longitude"];
	
	//生成kdtree每个节点代表的范围
	function genRange(node) {
		if (node.parent == null) {
			node.range = {
				'latitude' : [],
				'longitude' : []
			};
			node.range.latitude = [-180, 180];
			node.range.longitude = [-180, 180];
		}
		if (node.left != null) {
			node.left.range = {};
			if (node.dimension == 0) {
				node.left.range.latitude = [node.range.latitude[0],node.obj.latitude];
				node.left.range.longitude = node.range.longitude;
			} else {
				node.left.range.longitude = [node.range.longitude[0],node.obj.longitude];
				node.left.range.latitude = node.range.latitude;
			}
			genRange(node.left);
		}
		if (node.right != null) {
			node.right.range = {};
			if (node.dimension == 0) {
				node.right.range.latitude = [node.obj.latitude,node.range.latitude[1]];
				node.right.range.longitude = node.range.longitude;
			} else {
				node.right.range.longitude = [node.obj.longitude,node.range.longitude[1]];
				node.right.range.latitude = node.range.latitude;
			}
			genRange(node.right);
		}
	}
	
	
	//查询指定视野范围内的所有节点  
	function searchKdTree(node,rangeMBR){
		var result = new Array();
			if(rangeMBR.containsPoint(new Point(node.obj.longitude + "," + node.obj.latitude))){
				result = result.concat(node);
			}
			if(node.left!=null){
				var leftMBR = new MBR(node.left.range.longitude[0],node.left.range.latitude[0],
									  node.left.range.longitude[1],node.left.range.latitude[1]);
				if(rangeMBR.containsBounds(leftMBR)){
					result = result.concat(reportSubTree(node.left));
				}else{
					if(leftMBR.minX>rangeMBR.maxX || leftMBR.maxX<rangeMBR.minX||leftMBR.minY>rangeMBR.maxY ||
						leftMBR.maxY<rangeMBR.minY){
					}else{
					   result = result.concat(searchKdTree(node.left,rangeMBR));
					}
				}
			}
			if(node.right!=null){
				var rightMBR = new MBR(node.right.range.longitude[0],node.right.range.latitude[0],
									  node.right.range.longitude[1],node.right.range.latitude[1]);
				if(rangeMBR.containsBounds(rightMBR)){
					result = result.concat(reportSubTree(node.right));
				}else{
					if(rightMBR.minX>rangeMBR.maxX || rightMBR.maxX<rangeMBR.minX||rightMBR.minY>rangeMBR.maxY ||
						rightMBR.maxY<rangeMBR.minY){
					}else{
					   result = result.concat(searchKdTree(node.right,rangeMBR));
					}
				}
			}
		return result;
	}
	
	//遍历某节点
	function reportSubTree(node){
		var result = new Array();
		result = result.concat(node);
		if(node.left!=null){
			result = result.concat(reportSubTree(node.left));
		}
		if(node.right!=null){
			result = result.concat(reportSubTree(node.right));
		}
		return result; 
	}
	
	//查询指定视野范围外的所有节点  
	function searchKdTreeOut(node,rangeMBR){
		var result = new Array();
			if(!rangeMBR.containsPoint(new Point(node.obj.longitude + "," + node.obj.latitude))){
				result = result.concat(node);
			}
			if(node.left!=null){
				var leftMBR = new MBR(node.left.range.longitude[0],node.left.range.latitude[0],
									  node.left.range.longitude[1],node.left.range.latitude[1]);
				if(rangeMBR.containsBounds(leftMBR)){
					//result = result.concat(reportSubTree(node.left));
				}else{
					if(leftMBR.minX>rangeMBR.maxX || leftMBR.maxX<rangeMBR.minX||leftMBR.minY>rangeMBR.maxY ||
						leftMBR.maxY<rangeMBR.minY){
						result = result.concat(reportSubTree(node.left));
					}else{
					   result = result.concat(searchKdTreeOut(node.left,rangeMBR));
					}
				}
			}
			if(node.right!=null){
				var rightMBR = new MBR(node.right.range.longitude[0],node.right.range.latitude[0],
									  node.right.range.longitude[1],node.right.range.latitude[1]);
				if(rangeMBR.containsBounds(rightMBR)){
					//result = result.concat(reportSubTree(node.right));
				}else{
					if(rightMBR.minX>rangeMBR.maxX || rightMBR.maxX<rangeMBR.minX||rightMBR.minY>rangeMBR.maxY ||
						rightMBR.maxY<rangeMBR.minY){
						result = result.concat(reportSubTree(node.right));
					}else{
					    result = result.concat(searchKdTreeOut(node.right,rangeMBR));
					}
				}
			}
		return result;
	}
	
	return{
		distance:distance,
		genRange:genRange,
		searchKdTree:searchKdTree,
		searchKdTreeOut:searchKdTreeOut,
		reportSubTree:reportSubTree
	}

});

/*
// Create a new tree from a list of points, a distance function, and a
// list of dimensions.
var tree = new kdTree(points, distance, dimensions);

// Query the nearest *count* neighbours to a point, with an optional
// maximal search distance.
// Result is an array with *count* elements.
// Each element is an array with two components: the searched point and
// the distance to it.
tree.nearest(point, count, [maxDistance]);

// Insert a new point into the tree. Must be consistent with previous
// contents.
tree.insert(point);

// Remove a point from the tree by reference.
tree.remove(point);

// Get an approximation of how unbalanced the tree is.
// The higher this number, the worse query performance will be.
// It indicates how many times worse it is than the optimal tree.
// Minimum is 1. Unreliable for small trees.
tree.balanceFactor();
*/
