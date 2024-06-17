package com.phoebus.appdemo.controller.eventEmitter;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class SendEventReversal extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        sendEvent();
    }

    public void sendEvent() {
        Bundle bundle = getIntent().getExtras();
        String reversal = bundle.getString("reversal");
        getReactInstanceManager().getCurrentReactContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onReversal",reversal);

        finish();
    }
}
