;(function($){
		function getnowtime(param) {  
			//console.log("1")
			
            var nowtime = new Date();  
            var year = nowtime.getFullYear();
            var month = 0; 
            if(param == "currMonth" ){
            	month = padleft0(nowtime.getMonth() + 1);
            }else if(param == "nextMonth"){
            	month = padleft0(nowtime.getMonth() + 2);
            }else if(param == "lastMonth"){
            	if(nowtime.getMonth() == 0){
            		year -= 1;
            		month = 12;
            	}else{
            		month = padleft0(nowtime.getMonth());
            	}
            	
            }
            var day = padleft0(nowtime.getDate());  
            //var hour = padleft0(nowtime.getHours());  
            //var minute = padleft0(nowtime.getMinutes());  
            //var second = padleft0(nowtime.getSeconds());  
            //var millisecond = nowtime.getMilliseconds(); millisecond = millisecond.toString().length == 1 ? "00" + millisecond : millisecond.toString().length == 2 ? "0" + millisecond : millisecond;  
            return year + "-" + month + "-" + day; //+ " " + hour + ":" + minute + ":" + second + "." + millisecond;  
        }  
        //补齐两位数  
        function padleft0(obj) {  
            return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);  
        }  
	$.fn.getCurrentDate = function(opt) {
		var option = {
			M:"currMonth"
		}
		var newOpt = $.extend(true, {}, option, opt);
		//console.log(newOpt)
		var t = getnowtime(newOpt.M);
		//console.log(t)
		$(this).val(t);
		return this;
	};
})(jQuery);
//比较前后时间
;(function($) {
	function getnowtime() {
		//console.log("1")
		var nowtime = new Date();
		var year = nowtime.getFullYear();
		var month = padleft0(nowtime.getMonth() + 1);
		var day = padleft0(nowtime.getDate());
		//var hour = padleft0(nowtime.getHours());  
		//var minute = padleft0(nowtime.getMinutes());  
		//var second = padleft0(nowtime.getSeconds());  
		//var millisecond = nowtime.getMilliseconds(); millisecond = millisecond.toString().length == 1 ? "00" + millisecond : millisecond.toString().length == 2 ? "0" + millisecond : millisecond;  
		return year + "-" + month + "-" + day; //+ " " + hour + ":" + minute + ":" + second + "." + millisecond;  
	};
	//补齐两位数  
	function padleft0(obj) {
		return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
	};
	$.fn.timeInterval = function(sId, eId) {
		var sV = sId.val();
		var eV = eId.val();
		if(!sV) return false;
		if(!eV) return false;
		var sS = new Date(sV).getTime();
		var eS = new Date(eV).getTime();
		if(eS - sS < 0){
			alert("起始时间不能大于结束时间");
			//sId.val(getnowtime());
			//eId.val(getnowtime());
			vm.formflag = "false";
		}else if(eS - sS > (31*24*60*60*1000)){
			alert("只能查询一个月之内的数据");
			//sId.val(getnowtime());
			//eId.val(getnowtime());
			vm.formflag = "false";
		}else{
			vm.formflag = "true";
		}
		//console.log(sS);
		//console.log(eS);
		
	};
	
})(jQuery);
;(function($) {
	
	$.fn.getUserNo = function(arr) {
		var selfVal = $(this).val();
		var selfUserNo = "";
		//console.log(selfVal);
		//console.log(arr);
		
		$(arr).each(function(i,o){
			if(selfVal == o.text){
				selfUserNo = o.value;
			}
		});
		if(!selfUserNo){
			console.log("没匹配到");
			selfUserNo = $(this).val();
		}
		console.log(selfUserNo)
		return selfUserNo;
	};
	
})(jQuery);

















function timeAvali(s, e){
	e.timeInterval(s, e);
}

