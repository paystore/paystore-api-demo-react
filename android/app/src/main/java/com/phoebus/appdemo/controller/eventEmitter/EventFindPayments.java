package com.phoebus.appdemo.controller.eventEmitter;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;
import org.parceler.Parcels;

import java.util.ArrayList;
import java.util.Iterator;

public class EventFindPayments extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            sendEvent();
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void sendEvent() throws JSONException {
        Log.d("sendEvent", "onFindPayments");

        Intent intent = getIntent();
        ArrayList payments = Parcels.unwrap(intent.getParcelableExtra("payments"));

        Gson gson = new Gson();
        WritableArray paymentsArray = new WritableNativeArray();

        for (Object payment : payments) {
            JSONObject jsonObject = new JSONObject(gson.toJson(payment));
            WritableMap writableMap = convertJsonToMap(jsonObject);
            paymentsArray.pushMap(writableMap);
        }

        getReactInstanceManager().getCurrentReactContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onFindPayments", paymentsArray);

        finish();
    }

    private static WritableMap convertJsonToMap(JSONObject jsonObject) throws JSONException {
        WritableMap map = new WritableNativeMap();

        Iterator<String> iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof JSONObject) {
                map.putMap(key, convertJsonToMap((JSONObject) value));
            } else if (value instanceof Boolean) {
                map.putBoolean(key, (Boolean) value);
            } else if (value instanceof Integer) {
                map.putInt(key, (Integer) value);
            } else if (value instanceof Double) {
                map.putDouble(key, (Double) value);
            } else if (value instanceof String) {
                map.putString(key, (String) value);
            } else {
                map.putString(key, value.toString());
            }
        }
        return map;
    }
}
