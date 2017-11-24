//地理定位程序
function getLocation() {				
	//判断浏览器是否支持html5的地理定位
	if (navigator.geolocation) {
		//定位方法（参数1：定位成功回调函数，参数2：定位失败回调函数，参数3：具体定位）
		navigator.geolocation.getCurrentPosition(showMap,errorHandler,{
			enableHighAccuracy:true, // 是否高精度定位
			maximumAge:1000  //每隔多少毫米重新获得一次位置
		});					
	} else {
		alert('当前浏览器不支持html5的地理定位');
	}				
}			

/*定位成功的回调函数，参数是坐标对象*/
function showMap(loc) {
	var long = loc.coords.longitude;//经度
	var lati = loc.coords.latitude;//纬度
	//调用百度地图，显示当前省和市
		var params = {
		location:lati + ',' + long,
		ak:'Q6aiD950lCsEWDWblF8T5BzQjxeUylCj'
	}
	
	//发出jsonp请求
	var url = "http://api.map.baidu.com/geocoder/v2/?output=json&callback=?";
	
	//解析地址
	$.getJSON(url,params,function(data){
		
		console.log(data);
		
		layer.msg('当前位置：' + data.result.addressComponent.province + ',' + data.result.addressComponent.city);
		
	});				
}

/*定位失败的回调函数，参数是错误对象*/
function errorHandler(err) {
	
	if (err.code == 1) {
		layer.msg('位置服务被拒绝，请开启');					
	} else if (err.code == 2) {
		layer.msg('无法获得用户位置');
	} else if (err.code == 3) {
		layer.msg('获得定位信息超时');
	} else if (err.code == 4) {
		layer.msg('未知错误，无法定位');
	}								
}

//调用定位
getLocation();

//loading层
layer.msg('正在定位城市。。。。。。',{
	time:10000
});
