package com.metis.backend.common.domain;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.InputStream;

/**
 * Created by uubee on 2017/12/12.
 */
public class Property {
    private static final Logger log = LoggerFactory.getLogger(Property.class);
    private static final String CONFIG_FILENAME = "/generator.properties";
    private static volatile java.util.Properties properties = null;

    public static void init() {
        if (properties == null) {
            synchronized (Property.class) {
                if (properties == null) {
                    properties = loadProperties();
                }
            }
        }
    }

    public static String getProperty(String key) {
        init();
        return properties.getProperty(key);
    }

    /**
     * 加载配置文件
     */
    private static java.util.Properties loadProperties() {
        try {
            java.util.Properties cfgProp = new java.util.Properties();
            try (InputStream is = Property.class.getResourceAsStream(CONFIG_FILENAME)) {
                cfgProp.load(is);
            }
            log.info("load properties file succeeded");
            return cfgProp;
        } catch (Exception e) {
            log.error("load properties file failed", e);
            throw new RuntimeException(e);
        }
    }

    private Property() {
        // empty
    }
}
