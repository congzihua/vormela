//form序列化为json
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


if(parent.layer){
  window.layer = parent.layer;
}



//获取url后的参数值
function getUrlParam(key) {
	var href = window.location.href;
	var url = href.split("?");
	if(url.length <= 1){
		return "";
	}
	var params = url[1].split("&");
	
	for(var i=0; i<params.length; i++){
		var param = params[i].split("=");
		if(key == param[0]){
			return param[1];
		}
	}
    return "";
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if ( r != null ){
       return decodeURI(r[2]);
    }else{
       return null;
    } 
 }
 function isNull(data){ 
return (data == "" || data == undefined || data == null) ? "暂无" : data; 
}
$.formatDate = function(value, formatter, notFixZero) {
  if(!formatter){
    formatter = 'yyyy-MM-dd HH:mm:ss';
  }
  if(!value) return '';
  var date = new Date(value);
  var result = formatter
    .replace('yyyy', date.getFullYear())
    .replace('MM', date.getMonth() + 1)
    .replace('dd', date.getDate())
    .replace('HH', date.getHours())
    .replace('mm', date.getMinutes())
    .replace('ss', date.getSeconds());
  if(!notFixZero){
    return result.replace(/\d+/g, function(d){
      if(d.length === 1){
        return '0' + d;
      }
      return d;
    })
  }
  return result;
}