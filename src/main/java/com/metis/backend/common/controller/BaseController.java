package com.metis.backend.common.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;

import com.metis.backend.common.utils.ShiroUtils;
import com.metis.backend.system.domain.UserDO;
import com.uubee.share.pojo.BasePageQueryParam;
import com.uubee.share.util.FuncUtils;
import com.uubee.share.util.UuidUtil;
import com.uubee.share.wrapper.ModelListResult;

@Controller
public class BaseController {
	protected final Logger log = LoggerFactory.getLogger(this.getClass());
	public UserDO getUser() {
		return ShiroUtils.getUser();
	}

	public Long getUserId() {
		return getUser().getUserId();
	}

	public String getUsername() {
		return getUser().getUsername();
	}
	static InheritableThreadLocal<String> correlationID = new InheritableThreadLocal<String>();
	protected String getCorrelationID() {
		return UuidUtil.getUuid();
	}
	/**
	 * 获取分页查询的分页相关信息
	 *
	 * @param modelListResult
	 * @param
	 *
	 * @param
	 *
	 * @return
	 * @author Lipz@uubee.com
	 * @date 2017年6月23日 下午5:11:41
	 */
	protected Map<String, Object> getPageInfo(ModelListResult<?> modelListResult, BasePageQueryParam param) {

		int currentPageSize = param.getPageSize();//每页大小
		int currentPage = param.getStart() / currentPageSize + 1;//当前页码
		int totalPageCount = 0;//总页数
		if (!StringUtils.isEmpty(currentPage)) {
			currentPage = Integer.valueOf(currentPage);
		}
		if (!StringUtils.isEmpty(currentPageSize)) {
			currentPageSize = Integer.valueOf(currentPageSize);
		}
		//查询的总记录数
		int count = modelListResult.getCount();
		//计算总页数
		if (0 != count) {
			if (count % currentPageSize != 0) {
				totalPageCount = count / currentPageSize + 1;
			} else {
				totalPageCount = count / currentPageSize;
			}

		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", modelListResult.getCode());
		map.put("count", modelListResult.getCount());
		map.put("model", modelListResult.getModel());
		map.put("info", modelListResult.getInfos());
		map.put("errorMessage", modelListResult.getErrorMessage());
		map.put("success", modelListResult.isSuccess());
		map.put("page", currentPage);
		map.put("pageSize", currentPageSize);
		map.put("totalPageCount", totalPageCount);
		if (modelListResult.getTotalAmt() != null) {
			map.put("totalAmt", FuncUtils.formatLTYMoneny(modelListResult.getTotalAmt() + ""));
		}
		return map;
	}
}