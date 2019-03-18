var earthRadiusMeters = 6371000.0;
var metersPerDegree = 2.0 * Math.PI * earthRadiusMeters / 360.0;
var radiansPerDegree = Math.PI / 180.0;
var degreesPerRadian = 180.0 / Math.PI;


function calculateArea(points) {
	if (points.length > 2) {
		var areaMeters = PlanarPolygonAreaMeters2(points);
		var area = areaMeters.areaMeters;
		if (area > 1000000.0) {
			//area = SphericalPolygonAreaMeters2(points);
		}
		//console.log(areaMeters);
		return area;
	}
}

/*球面多边形面积计算*/
function SphericalPolygonAreaMeters2(points) {
	var totalAngle = 0;
	for (var i = 0; i < points.length; i++) {
		var j = (i + 1) % points.length;
		var k = (i + 2) % points.length;
		totalAngle += Angle(points[i], points[j], points[k]);
	}
	var planarTotalAngle = (points.length - 2) * 180.0;
	var sphericalExcess = totalAngle - planarTotalAngle;
	if (sphericalExcess > 420.0) {
		totalAngle = points.length * 360.0 - totalAngle;
		sphericalExcess = totalAngle - planarTotalAngle;
	} else if (sphericalExcess > 300.0 && sphericalExcess < 420.0) {
		sphericalExcess = Math.abs(360.0 - sphericalExcess);
	}
	return sphericalExcess * radiansPerDegree * earthRadiusMeters * earthRadiusMeters;
}

/*角度*/
function Angle(p1, p2, p3) {
	var bearing21 = Bearing(p2, p1);
	var bearing23 = Bearing(p2, p3);
	var angle = bearing21 - bearing23;
	if (angle < 0) {
		angle += 360;
	}
	return angle;
}


/*方向*/
function Bearing(from, to) {
	var lat1 = from[1] * radiansPerDegree;
	var lon1 = from[0] * radiansPerDegree;
	var lat2 = to[1] * radiansPerDegree;
	var lon2 = to[0] * radiansPerDegree;
	var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
	if (angle < 0) {
		angle += Math.PI * 2.0;
	}
	angle = angle * degreesPerRadian;
	return angle;
}

/*平面多边形面积*/
function PlanarPolygonAreaMeters2(points) {
	var length = 0
	var lengths = [];
	var areaMeters = 0;
	var a = 0;
	var l = 0;//length
	for (var i = 0; i < points.length; ++i) {
		var j = (i + 1) % points.length;
		var xi = points[i][0] * metersPerDegree * Math.cos(points[i][1] * radiansPerDegree);
		var yi = points[i][1] * metersPerDegree;
		var xj = points[j][0] * metersPerDegree * Math.cos(points[j][1] * radiansPerDegree);
		var yj = points[j][1] * metersPerDegree;
		a += xi * yj - xj * yi;
		
		l = Math.sqrt((xi-xj)*(xi-xj)+(yi-yj)*(yi-yj))
		lengths.push(l);
		length += l;
	}
	areaMeters = Math.abs(a / 2);
	return {length:length,areaMeters:areaMeters,lengths:lengths};
}

function b() {
	var pointArr = [];
	var s = "100.28773680040977,39.8076179274337;110.23142591084562,40.6615943396868;109.60994534144338,35.0734651577755;100.28773680040977,34.3069659147639";
	var s1 = new Array()
	s1 = s.split(";");
	for (var i = 0; i < s1.length; i++) {
		var ss = s1[i];
		var temp = ss.split(",");
		var point = new Array();
		point.push(Number(temp[0]), Number(temp[1]));
		pointArr.push(point);
	}
	calculateArea(pointArr);
	var sss =calculateArea(pointArr);
	console.log(sss)
}