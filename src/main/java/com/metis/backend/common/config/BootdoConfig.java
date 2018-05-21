package com.metis.backend.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="bootdo")
public class BootdoConfig {
	//上传路径
	private String uploadPath;

	//获取图片路径
	private String visitPath;

	//是否正式
	private String isPro;

	public String getIsPro() {
		return isPro;
	}

	public void setIsPro(String isPro) {
		this.isPro = isPro;
	}

	public String getVisitPath() {
		return visitPath;
	}

	public void setVisitPath(String visitPath) {
		this.visitPath = visitPath;
	}

	public String getUploadPath() {
		return uploadPath;
	}

	public void setUploadPath(String uploadPath) {
		this.uploadPath = uploadPath;
	}
}
