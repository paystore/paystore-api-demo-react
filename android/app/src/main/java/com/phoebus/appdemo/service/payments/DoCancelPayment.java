package com.phoebus.appdemo.service.payments;

import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.phoebus.appdemo.controller.eventEmitter.payments.SendEventCancelPayment;
import com.phoebus.appdemo.utils.Constants;

import br.com.phoebus.android.payments.api.ErrorData;
import br.com.phoebus.android.payments.api.PaymentClient;

public class DoCancelPayment implements OnBindConnectedPaymentService {

    private final ReactContext mContext;
    private final PaymentClient mPaymentClient;
    private final String paymentId;
    private final Promise promise;

    public DoCancelPayment(ReactContext context, PaymentClient paymentClient, String paymentId, Promise promise) {
        this.mContext = context;
        this.mPaymentClient = paymentClient;
        this.paymentId = paymentId;
        this.promise = promise;
    }

    @Override
    public void execute() {

        if ("".equals(paymentId)) {
            Toast.makeText(mContext, "paymentId não informado", Toast.LENGTH_LONG).show();
            promise.reject(Constants.ERROR, "paymentId não informado");
            return;
        }

        try {
            mPaymentClient.cancelPayment(paymentId, new PaymentClient.PaymentCallback() {
                @Override
                public void onSuccess(Object data) {
                    Log.e("sendEvent", "onCancelPayments");
                    Intent newIntent = new Intent(mContext, SendEventCancelPayment.class);
                    newIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    mContext.startActivity(newIntent);
                    unBind();
                }

                @Override
                public void onError(ErrorData errorData) {
                    Log.e("Error", errorData.getPaymentsResponseCode() + " - " + errorData.getResponseMessage());
                    promise.reject(Constants.ERROR, errorData.getPaymentsResponseCode() + " - " + errorData.getResponseMessage());
                    unBind();
                }
            });
        } catch (Exception e) {
            Log.e("Cancel Payment fail", e.getMessage());
            promise.reject("ERROR", e.getMessage());
            unBind();
        }
    }

    private void unBind() {
        if (mPaymentClient.isBound()) {
            mPaymentClient.unbind(mContext);
        }
    }
}
