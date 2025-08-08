package com.phoebus.appdemo.utils;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.math.BigDecimal;

import javax.annotation.Nullable;

public class DataTypeUtils {

    public static BigDecimal getValueFromString(String s) {
        return new BigDecimal(s);
    }

    @Nullable
    public static ReadableArray getArraySafe(ReadableMap map, String key) {
        return map.hasKey(key) && !map.isNull(key) ? map.getArray(key) : null;
    }

    @Nullable
    public static Integer getIntegerSafe(ReadableMap map, String key) {
        return map.hasKey(key) && !map.isNull(key) ? map.getInt(key) : null;
    }

    @Nullable
    public static Boolean getBooleanSafe(ReadableMap map, String key) {
        return map.hasKey(key) && !map.isNull(key) ? map.getBoolean(key) : null;
    }

    @Nullable
    public static String getStringSafe(ReadableMap map, String key) {
        return map.hasKey(key) && !map.isNull(key) ? map.getString(key) : null;
    }

}
