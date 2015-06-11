package com.hisense.himap.utils;

import org.springframework.web.context.WebApplicationContext;

/**
 * Spring的ApplicationContxt holder
 * 
 * @author zangjinyu
 * @since 1.0.0(2013-12-29)
 * @version 1.0.0
 * 
 */
public final class SpringApplicationContextHolder {
	private static WebApplicationContext context;

	public static WebApplicationContext getContext() {
		return context;
	}

	public static void setContext(WebApplicationContext context) {
		SpringApplicationContextHolder.context = context;
	}
}
