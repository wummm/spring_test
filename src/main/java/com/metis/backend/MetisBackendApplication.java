package com.metis.backend;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@ServletComponentScan
@MapperScan("com.metis.backend.*.dao")

@SpringBootApplication
public class MetisBackendApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(MetisBackendApplication.class, args);
		System.out.println("begin success!");
	}
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(MetisBackendApplication.class);
	}
}
