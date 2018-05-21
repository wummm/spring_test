/**
 * 
 */
package com.metis.backend.common.service.impl;

import org.apache.commons.lang3.RandomUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BaseService {

    protected Logger log = LoggerFactory.getLogger(BaseService.class);

    /**
     * <p>
     * Function: 获取m位随机数
     * </P>
     * @author zhengcs@uubee.com
     * @date 2017年7月12日 上午10:32:19
     */
    public String randomdigit(int m) {
        String s = RandomUtils.nextLong() + "";
        int n = RandomUtils.nextInt(0, 18 - m);
        String random = s.substring(n, n + m);
        log.info(m + "位随机数：" + random);

        return random;
    }

}
