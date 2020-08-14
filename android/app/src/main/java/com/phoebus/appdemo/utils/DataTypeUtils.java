package com.phoebus.appdemo.utils;

import java.math.BigDecimal;

public class DataTypeUtils {
    public static BigDecimal getValueFromString(String s) {
        if (s == null || "".equals(s)) return null;

        try {
            return  new BigDecimal(s);
        } catch (Exception e) {
            return null;
        }
    }

}
