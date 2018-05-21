
parent.document.title=document.title
//2.返回按钮
$(document).on("click",".back_btn",function(){		
	window.history.go(-1);
})
//3.验证中文
$.extend($.validator.messages, {
    required: "必填",
    remote: "请修正该字段",
    email: "请输入正确格式的电子邮件",
    url: "请输入合法的网址",
    date: "请输入合法的日期",
    dateISO: "请输入合法的日期 (ISO).",
    number: "请输入合法的数字",
    digits: "只能输入整数",
    creditcard: "请输入合法的信用卡号",
    equalTo: "请再次输入相同的值",
    accept: "请输入拥有合法后缀名的字符串",
    maxlength: $.validator.format("长度最多是 {0}"),
    minlength: $.validator.format("长度最少是 {0} "),
    rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
    range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
    max: $.validator.format("请输入一个最大为 {0} 的值"),
    min: $.validator.format("请输入一个最小为 {0} 的值")
});

//9.ajax函数
	function ajaxFun(type,async,url,jData,fun){		
		$.ajax({
			type:type,
			cache:false,
			url:url,
			contentType:"application/json",
			async:async,
			data:jData,
			dataType:'json',
			success:fun,
			
		});		
	}
//详情页获得 id
	function get_id(){
		var url=window.location.search		
		return url.slice(1)
	}
//详情页获得多条id字段
	 //获得id
	function  get_oid_mul(){
		 var url=window.location.search		
			 a= url.slice(1)
		 var b=a.split("&")					
		 var obj={};
		 $(b).each(function(i,t){
		 	var c=t.split("=")				 	
		 	obj[c[0]]=c[1]
		 })
		 return obj
	 }
//定义全局过滤器
	 Vue.filter('filterTel',function(val){ 	
		 var value=""
		 if(val){value=val.slice(0,3)+"****"+val.slice(-4)		 }
		 return  value	
	 });
	 Vue.filter('filterName',function(val){ 
		 var value=""
		 if(val){value="*"+val.slice(1)}
		 return value	
	 });
	 Vue.filter('towanyuan',function(input){   
		 		var  num=input/10000000
	            return num.toFixed(2)
	 });
	 Vue.filter('toyuan',function(input){   
		 var  num=input/1000
		 return num.toFixed(2)
	 });
	 Vue.filter('map',function(value,obj){   
	 	 	$(obj).each(function(i,t){	 	 		
	 			if(value==t.value){
	 				value=t.text	 				
	 				return false					 				 
	 			}			 			
	 		}) 	 
	 		return value
	});
	 Vue.filter('rate_json',function(json,key){  
			//serfee_annual_rate
			//annual_rate
			var val="";		
			if(json){		
				var arr=JSON.parse(json)			
				$(arr).each(function(i,t){			
					val=val+t[key]+"；"				
				})					
			}	
			return val
	});
	Vue.filter('rate_detail',function(input){   
		 	if(input){
		 		var arr=JSON.parse(input)		
		 	}
		 	return  "固定服务费:"+arr.amt_fix_serfee+"; 按比例服务费"+arr.amt_proport_serfee+"; 服务费"+arr.amt_serfee
	});
//加载中 spinner 函数
 function spinnerStart(){
	 $(".loading").show()
 }
 function spinnerEnd(){
	 $(".loading").hide()
 }
//日历
	//基础日历
	$("body").on( "focusin", ".date_input",function(){
		var curr = (new Date().getTime() + (24*60*60*1000));
		  $(this).datepicker({
			  dateFormat: 'yy-mm-dd',			 
			  dayNamesMin: ['日','一','二','三','四','五','六'],
			  monthNames: ['一月','二月','三月','四月','五月','六月',
			               '七月','八月','九月','十月','十一月','十二月'],		
			 
		  })
	});
	//最大值为今天
	$("body").on( "focusin", ".date_input_maxToday",function(){
		var curr = (new Date().getTime() + (24*60*60*1000));
		  $(this).datepicker({
			  dateFormat: 'yy-mm-dd',
			  maxDate: new Date(curr),
			  dayNamesMin: ['日','一','二','三','四','五','六'],
			  monthNames: ['一月','二月','三月','四月','五月','六月',
			               '七月','八月','九月','十月','十一月','十二月'],		
			 
		  })
	});
//三级联动菜单
function changeProFun(e,code){
	var me=this	
	me.cityLists=[]
	me.townLists=[]
	if(!code){					
		var ele=e.currentTarget
		code=$(ele).val()	
	}
	console.log(code)			
	$(me.webProLists).each(function(i,obj){
		if(code==obj.areaId){
			//console.log(obj)
			me.webCityLists=obj.aearList
			//console.log(lists)
			$(me.webCityLists).each(function(j,t){
				var buffer={}								
				buffer.value=t.areaId
				buffer.text=t.areaName
				me.cityLists.push(buffer)
			})
		}
	})
}
function changeCityFun(e,code){						
	var me=this		
	me.townLists=[]
	if(!code){
		var ele=e.currentTarget
		var code=$(ele).val()
	}
	
	console.log(code)
	$(me.webCityLists).each(function(i,obj){
		if(code==obj.areaId){
			//console.log(obj)
			me.webTownLists=obj.aearList
			//console.log(lists)
			$(me.webTownLists).each(function(j,t){
				var buffer={}								
				buffer.value=t.areaId
				buffer.text=t.areaName
				me.townLists.push(buffer)
			})
		}
	})									
	
}
function initProvinceFun(){
	var me=this		
	me.webProLists=areaJson
	$(me.webProLists).each(function(i,obj){					
		var buffer={}
		buffer.value=obj.areaId
		buffer.text=obj.areaName
		me.proLists.push(buffer)
		
	})
	console.log(me.proLists)
}
//设置自动搜索模糊匹配 该段放在js后面
function autoCom(url){
	var sourceArr=[]
	   ajaxFun("get",false,url,"",function(res){
			console.log(res)
			$(res).each(function(i,obj){
				sourceArr.push(obj.name)
			})
			console.log(sourceArr)
		})
		
		$( ".autoInput" ).autocomplete({
		    source: sourceArr,
		    minLength:2,
		});	
}
