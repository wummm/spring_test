package com.metis.backend.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;

/**
 * @author weng
 * @ClassName:
 * @Description:
 * @date 2017/12/7
 */
@Configuration
@PropertySource("classpath:dubbo.properties")
@ImportResource({ "classpath:dubbo/*.xml" })
public class DubboConfig {
}
