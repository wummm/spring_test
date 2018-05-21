var prefix = "/backend/common/log"
$(function() {
	load();

});
$('#exampleTable').on('load-success.bs.table', function (e, data) {
		    if (data.total && !data.rows.length) {
		    	$('#exampleTable').bootstrapTable('selectPage').bootstrapTable('refresh');
		    }
		});

function load() {
    laydate.render({
        elem: '#startTime', //指定元素
        type:'datetime'
    });
    laydate.render({
        elem: '#endTime', //指定元素
		type:'datetime'
    });
	$('#exampleTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url :"/backend/common/message/query", // 服务器数据的加载地址
						// showRefresh : true,
						// showToggle : true,
						// showColumns : true,
						iconSize : 'outline',
						toolbar : '#exampleToolbar',
						striped : true, // 设置为true会有隔行变色效果
						dataType : "json", // 服务器返回的数据类型
						pagination : true, // 设置为true会在底部显示分页条
						// queryParamsType : "limit",
						// //设置为limit则会发送符合RESTFull格式的参数
						singleSelect : false, // 设置为true将禁止多选
						// contentType : "application/x-www-form-urlencoded",
						// //发送到服务器的数据编码类型
						pageSize : 10, // 如果设置了分页，每页数据条数
						pageNumber : 1, // 如果设置了分布，首页页码
						// search : true, // 是否显示搜索框
						// showColumns : true, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者
						// "server"
						queryParams : function(params) {
							return {
                                //limit : params.limit,//当前条数
                                //offset : params.offset,//起始条数
                                page:(params.offset/params.limit)+1,
                                pageSize:params.limit,
								name : $('#searchName').val(),
								sort : 'gmt_create',
								order : 'desc',
								start_time : $("#startTime").val(),
                                end_time : $("#endTime").val()
							};
						},
						// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
						// queryParamsType = 'limit' ,返回参数必须包含
						// limit, offset, search, sort, order 否则, 需要包含:
						// pageSize, pageNumber, searchText, sortName,
						// sortOrder.
						// 返回false将会终止请求
						columns : [
								{
									field : 'uid', // 列字段名
									title : '编号' // 列标题
								},
								{
									field : 'mobile',
									title : '手机号'
								},
								{
									field : 'realname',
									title : '姓名'
								},
								{
									field : 'gender',
									title : '性别'
								},
								{
									field : 'idCard',
									title : '身份证号'
								},
								{
									field : 'birthday',
									title : '出生年月'
								},
								{
									field : 'profession',
									title : '职业'
								},
								{
									field : 'province',
									title : '所属省'
								},
								{
									field : 'city',
									title : '所属市'
								},
								{
									field : 'area',
									title : '所属区'
								},
								{
									field : 'haveCreditCard',
									title : '是否有信用卡'
								},
								{
									field : 'promotionChannelNbr',
									title : '推广渠道编号'
								},
								{
									field : 'status',
									title : '状态'
								},
								{
									field : 'note',
									title : '备注'
								},
								{
									field : 'password',
									title : '用户密码'
								},
								{
									field : 'createTime',
									title : '创建时间'
								},
								{
									field : 'updateTime',
									title : '创建时间'
								}]
					});
}
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}
