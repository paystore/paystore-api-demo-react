package com.phoebus.appdemo.service;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.phoebus.appdemo.controller.eventEmitter.SendEventPayment;

import com.phoebus.appdemo.utils.Constants;

import br.com.phoebus.android.payments.api.ErrorData;
import br.com.phoebus.android.payments.api.PaymentClient;
import br.com.phoebus.android.payments.api.PaymentStatus;
import br.com.phoebus.android.payments.api.PaymentV2;

public class DoConfirmPaymentService implements OnBindConnectedPaymentService {

  PaymentV2 paymentV2;

  private PaymentClient mPaymentClient;
  private ReactContext mContext;
  private Promise promise;

  public DoConfirmPaymentService(ReactContext context, PaymentClient paymentClient, PaymentV2 paymentV2, Promise promise) {
    this.mContext = context;
    this.mPaymentClient = paymentClient;
    this.paymentV2 = paymentV2;
    this.promise = promise;
  }

  @Override
  public void execute(){

    try {
      mPaymentClient.confirmPayment(paymentV2.getPaymentId(), new PaymentClient.PaymentCallback() {
        @Override
        public void onSuccess(Object o) {
          Log.e("sendEvent", "ConfirmPayment");
          paymentV2.setPaymentStatus(PaymentStatus.CONFIRMED);
          Bundle bundle = PaymentV2.toBundle(paymentV2);
          Intent newIntent = new Intent(mContext, SendEventPayment.class);
          newIntent.putExtras(bundle);
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
