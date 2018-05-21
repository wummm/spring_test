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
//1.title
parent.document.title=document.title
//2.返回按钮
$(document).on("click",".back_btn",function(){		
	window.history.go(-1);
})
//3.下拉框optionsAll
var optionsObj=window.parent.optionsALL
var powerName=window.parent.powerName
var powerAllocationName=window.parent.powerAllocationName

/*$("select").each(function(i,item){	
	var name=$(item).attr("name")	
	var optionsArr=optionsObj[name]
	$(optionsArr).each(function(j,obj){
		var ele="<option value='"+obj.value+"'>"+obj.text+"</option>"
		$(item).append(ele)
	})
})*/
//定义全局过滤器
Vue.filter('toyuan',function(input){
	if(input||input==0){
		var  num=input/1000
		return num.toFixed(2)
	}
	 		
        
});
// *100
Vue.filter('toHundred',function(input){
	if(input){
		input=input*100
	}
	return input.toFixed(2) 
          
});
//求和
Vue.filter('total',function(){
  	var total=0
	$(arguments).each(function(i,t){
		total+=t
	})
	return total
});
//获得逾期天数 getOverDay
Vue.filter('getOverDay',function(val){	
	var day=''
	if(val){
		var oldTime = (new Date(val)).getTime(); 
		var date=new Date()
		var nowTime=date.getTime()	
		day=(nowTime-oldTime)/(1000*60*60*24)
		day=parseInt(day)
	}else{
		day=""
	}	
	return day
});
//定义日期格式截取 保留年月日
Vue.filter('toTrunkDateYMD',function(value){
	 if(!value){
		 return value;
	 }else{
		 return value.split(" ")[0];
	 }
});
//定义日期格式截取 保留年月日 时分秒
Vue.filter('toTrunkDateYMDHMS',function(value){
	 if(!value){
		 return value;
	 }else{
		 return value.split(".")[0];
	 }
});

function getDateTime(value){
	 if(!value){
		 return value;
	 }else{
		 return value.split(".")[0];
	 }
}
//时间戳转日期
Vue.filter('timetoDate',function(value){
	 if(!value){
		 return value;
	 }else{
		 var date = new Date(value);
		 return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
	 }
});
//手机号脱敏 中间后四位
Vue.filter('toDesensitizerUserLogin',function(value){
	 if(!value){
		 return value;
	 }else{
		 return value.substr(0,3)+"****"+value.substr(7);
	 }
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
Vue.filter('rate_list',function(list,key){  
		//serfee_annual_rate
		//annual_rate
		var val="";		
		if(list){						
			$(list).each(function(i,t){	
				if(t[key]){
					val=val+t[key]+"；"	
				}								
			})					
		}	
		return val
});
Vue.filter('rate_detail',function(input){   
	 	if(input){
	 		var arr=JSON.parse(input)		
	 	}
	 	return  "固定服务费(元):"+arr.amt_fix_serfee+"; 比例服务费(元):"+arr.amt_proport_serfee+"; 服务费(元):"+arr.amt_serfee
});
Vue.filter('idCardCover',function(input){
	var val=""
	if(input){
		val=input.slice(0,-4)+"****"
	}
	return val	
	 		
});
//日历初始化	
$("body").on( "focusin", ".date_input",function(){
	  $(this).datepicker({
		  dateFormat: 'yy-mm-dd',
		  dayNamesMin: ['日','一','二','三','四','五','六'],
		  monthNames: ['一月','二月','三月','四月','五月','六月',
		               '七月','八月','九月','十月','十一月','十二月'],			 
	  })
})
//时间初始化	
	$("body").on( "focusin", ".time_input",function(){
		$(this).datetimepicker({ 
		     showSecond: true, 	
		     dateFormat:"yy-mm-dd",
		     timeFormat: 'hh:mm:ss',
		     dayNamesMin: ['日','一','二','三','四','五','六'],
			 monthNames: ['一月','二月','三月','四月','五月','六月',
			               '七月','八月','九月','十月','十一月','十二月'],	
		}); 
	})	
//最小值为今天的日历
$("body").on( "focusin", ".time_input_minNow",function(){
    $(this).datetimepicker({
        showSecond: true,
        dateFormat:"yy-mm-dd",
        timeFormat: 'hh:mm:ss',
		minDate:0
    });
})
	//时间初始化	
	$("body").on( "focusin", ".time_input_min",function(){
		var curr = getNowFormatDate();
		$(this).datetimepicker({ 
		     showSecond: true, 	
		     dateFormat:"yy-mm-dd",
		     timeFormat: 'hh:mm:ss',
		     minDate:curr,
		     todayBtn:true,
		     dayNamesMin: ['日','一','二','三','四','五','六'],
			 monthNames: ['一月','二月','三月','四月','五月','六月',
			               '七月','八月','九月','十月','十一月','十二月'],	
		}); 
	})	
	//时间初始化	
	$("body").on( "focusin", ".time_input_hours",function(){
		$(this).timepicker({ 	
		     timeFormat: 'hh:mm',
		     dayNamesMin: ['日','一','二','三','四','五','六'],
			 monthNames: ['一月','二月','三月','四月','五月','六月',
			               '七月','八月','九月','十月','十一月','十二月'],	
		}); 
	})	
	
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    return currentdate;
	}
//清空日历
	
$("body").on("click",".clearTime",function(){
	$(this).siblings("input").val("")		
})
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
//加载中 spinner 函数
function spinnerStart(){
	 $(".loading").show()
}
function spinnerEnd(){
	 $(".loading").hide()
}
//页码函数 vm,tableLists，不能改变
function goFirst(){	
	if(!vm.tableLists.currentPage){
		alert("请先点击搜索")
		return false
	}else{
		vm.form.page=1
		vm.searchAjax()
	}
}
function goLast(){
	if(!vm.tableLists.currentPage){
		alert("请先点击搜索")
		return false
	}else{
		vm.form.page=vm.tableLists.totalPage
		vm.searchAjax()
	}
}
function goPrev(){
	if(!vm.tableLists.currentPage){
		alert("请先点击搜索")
		return false
	}else if(vm.tableLists.currentPage<=1){
		alert("已经是第一页了")
	}else{			
		vm.form.page=vm.tableLists.currentPage-1
		vm.searchAjax()
	}		
	
}
function goNext(){
	if(!vm.tableLists.currentPage){
		alert("请先点击搜索")
		return false
	}else if(vm.tableLists.currentPage>=vm.tableLists.totalPage){
		alert("已经是最后一页了")
	}else{
		vm.form.page=vm.tableLists.currentPage+1
		vm.searchAjax()
	}
}
function goPage(){
	if(!vm.tableLists.currentPage){
		alert("请先点击搜索")
		return false
	}else if(vm.form.page<1||vm.form.page>vm.tableLists.totalPage){
		alert("页码超出范围")
	}else{
		vm.searchAjax()
	}
}
function changePageSize(){
	
	if(!vm.tableLists.currentPage){
		alert("请先点击搜索")
		return false
	}else{
		vm.form.page=1
		vm.searchAjax()
	}
}
//跳转获得id
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
//
function getValFormObj(key,obj){
	var result=""
	$(obj).each(function(i,t){
		if(t.value==key){
			result=t.text
			return false
		}
	})
	return result
}
function getKeyFormObj(val,obj){
	var result=""
	$(obj).each(function(i,t){
		if(t.text==val){
			result=t.value
			return false
		}
	})
	return result
}

//当天时间
var nowDate;
if(get_date){
	nowDate=get_date()
}
var d=new Date
var h=d.getHours()
var m=d.getMinutes()
var s=d.getSeconds()
console.log(h+"-"+m+"-"+s)
var nowTime=nowDate+" "+h+":"+m+":"+s
  //必须写在$里面
$(function(){
	
	//console.log("页面完成后加载")
	//$(".date_input_init").val(nowDate)
	//$(".time_input_init").val(nowTime)
	//一/判断加载初始时间或者搜索过的时间
	var flag=sessionStorage.getItem("flag")
	//console.log(flag)
	if(flag=="searched"){
		//console.log("加载之前搜索时间")
		var formStr=sessionStorage.getItem("data")			
		//把表单保存，包括页码				
		var dataForm=JSON.parse(formStr)
		//console.log(dataForm)
		//把时间保存
		$(".time_input").each(function(i,item){
			var key=$(item).attr("name")
			var val=dataForm[key]
			//console.log(val)
			$(item).val(val)
		})
		$(".date_input").each(function(i,item){
			var key=$(item).attr("name")
			var val=dataForm[key]
			//console.log(val)
			$(item).val(val)
		})
	}else{
		//console.log("没有搜索过")
		$(".time_input_init").val(nowTime)
		$(".date_input_init").val(nowDate)
	}
	
})
function go(url){
	window.location.href=url
}
function getChecked(ele){
	var checkedArr=[]
	var checkedEles=$( ele+":checked")
	$(checkedEles).each(function(i,item){
		
		checkedArr.push($(item).val())
	})				
	return checkedArr
}
//设置自动搜索模糊匹配 该段放在js后面
function autoCom(url){
	var sourceArr=[]
	   ajaxFun("get",false,url,"",function(res){
			//console.log(res)
			$(res).each(function(i,obj){
				sourceArr.push(obj.name)
			})
			//console.log(sourceArr)
		})
		
		$( ".autoInput" ).autocomplete({
		    source: sourceArr,
		    minLength:2,
		});	
}
function getStaticTime(val){
	var result=""
	if(val){
		result=val.split(".")[0]
	}
	return result
}
////日历初始化	
//$("body").on( "focusin", ".date_input_year",function(){
//  $(this).datepicker({
//	  dateFormat: 'mm-dd',
//	  dayNamesMin: ['日','一','二','三','四','五','六'],
//	  monthNames: ['一月','二月','三月','四月','五月','六月',
//	               '七月','八月','九月','十月','十一月','十二月'],			 
//  })
//})
