package com.phoebus.appdemo.service;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.phoebus.appdemo.controller.eventEmitter.SendEventPayment;

import com.phoebus.appdemo.utils.Constants;

import br.com.phoebus.android.payments.api.ErrorData;
import br.com.phoebus.android.payments.api.PaymentClient;

public class DoConfirmPaymentService implements OnBindConnectedPaymentService {

  String paymentId;

  private PaymentClient mPaymentClient;
  private ReactContext mContext;
  private Promise promise;

  public DoConfirmPaymentService(ReactContext context, PaymentClient paymentClient, String paymentId, Promise promise) {
    this.mContext = context;
    this.mPaymentClient = paymentClient;
    this.paymentId = paymentId;
    this.promise = promise;
  }

  @Override
  public void execute(){

    try {
      mPaymentClient.confirmPayment(paymentId, new PaymentClient.PaymentCallback() {
        @Override
        public void onSuccess(Object o) {
          Log.e("sendEvent", "ConfirmPayment");
          Intent newIntent = new Intent(mContext, SendEventPayment.class);
          newIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
          mContext.startActivity(newIntent);
          unBind();
        }

        @Override
        public void onError(ErrorData errorData) {
          promise.reject(Constants.ERROR, errorData.getResponseMessage());
          unBind();
        }
      });
    }catch(Exception e){
      Log.e("Payment fail", e.getMessage());
      unBind();
    }
  }

  private void unBind() {
    if (mPaymentClient.isBound())
    {
      mPaymentClient.unbind(mContext);
    }
  }
}
