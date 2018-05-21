package com.metis.backend.system.shiro;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.joda.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.metis.backend.common.config.ApplicationContextRegister;
import com.metis.backend.common.utils.ShiroUtils;
import com.metis.backend.system.dao.UserDao;
import com.metis.backend.system.domain.UserDO;
import com.metis.backend.system.service.MenuService;
import com.uubee.admin.dubbo.service.IOperInfoService;
import com.uubee.share.domain.OperatorInfo;
import com.uubee.share.util.Globals;

public class UserRealm extends AuthorizingRealm {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
        Long userId = ShiroUtils.getUserId();
        MenuService menuService = ApplicationContextRegister.getBean(MenuService.class);
        Set<String> perms = menuService.listPerms(userId);
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        info.setStringPermissions(perms);
        return info;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        String username = (String) token.getPrincipal();
        Map<String, Object> map = new HashMap<>(16);
        map.put("username", username);
        String password = new String((char[]) token.getCredentials());
        UserDO res = null;//uubeeLoginValid(username, password);
        if (res != null) {
            return new SimpleAuthenticationInfo(res, password, getName());
        }
        UserDao userMapper = ApplicationContextRegister.getBean(UserDao.class);
        // 查询用户信息
        UserDO user = userMapper.list(map).get(0);

        // 账号不存在
        if (user == null) {
            throw new UnknownAccountException("账号或密码不正确");
        }

        // 密码错误
        if (!password.equals(user.getPassword())) {
            throw new IncorrectCredentialsException("账号或密码不正确");
        }

        // 账号锁定
        if (user.getStatus() == 0) {
            throw new LockedAccountException("账号已被锁定,请联系管理员");
        }
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(user, password, getName());
        return info;
    }

    private UserDO uubeeLoginValid(String username, String password) {
        OperatorInfo operatorInfo = new OperatorInfo();
        operatorInfo.setOid_oper(username);
        operatorInfo.setPwd_oper(password);
        operatorInfo.setDate_oplastlogin(LocalDateTime.now().toString("yyyy-MM-dd HH:mm:ss"));
        operatorInfo.setIp_lastLogin("");

        OperatorInfo info;
        try {
            IOperInfoService operInfoService = ApplicationContextRegister.getBean(IOperInfoService.class);
            info = operInfoService.login(operatorInfo);
            if (Globals.TRANS_SUCCESS_RETCODE.equals(info.getRetcode())) {
                return new UserDO(info);
            }
        } catch (Exception e) {
            logger.error("系统异常", e);
        }
        return null;
    }

}
