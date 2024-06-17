package com.phoebus.appdemo.controller.eventEmitter;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class SendEventPayment extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    sendEvent();
  }

  public void sendEvent() {
    Bundle bundle = getIntent().getExtras();
      String payment = bundle.getString("payment");
    getReactInstanceManager().getCurrentReactContext()
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("onPayment", payment);
    finish();
  }


}
