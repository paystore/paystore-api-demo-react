package com.phoebus.appdemo.controller.eventEmitter.pix;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class SendEventPixList extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        sendEvent();
    }

    public void sendEvent() {
        Bundle bundle = getIntent().getExtras();
        String payment = bundle.getString("pixList");
        getReactInstanceManager().getCurrentReactContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onPixList", payment);
        finish();
    }
}

