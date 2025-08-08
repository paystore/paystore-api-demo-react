package com.phoebus.appdemo.service.payments;

import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.phoebus.appdemo.utils.Constants;

import br.com.phoebus.android.payments.api.ErrorData;
import br.com.phoebus.android.payments.api.InitializationRequest;
import br.com.phoebus.android.payments.api.PaymentClient;

public class DoStartInitialization implements OnBindConnectedPaymentService{

    private final PaymentClient mPaymentClient;
    private final Promise promise;
    private final Context mContext;

    public DoStartInitialization(Context context, PaymentClient paymentClient, Promise promise){
        this.promise = promise;
        this.mPaymentClient = paymentClient;
        this.mContext = context;
    }

    @Override
    public void execute() {
        try {
            InitializationRequest initializationRequest = new InitializationRequest();
            mPaymentClient.startInitialization(initializationRequest, new PaymentClient.PaymentCallback() {
                @Override
                public void onSuccess(Object o) {
                    promise.resolve(true);
                }

                @Override
                public void onError(ErrorData errorData) {
                    Log.e("Error", errorData != null ? errorData.getPaymentsResponseCode() + " - " + errorData.getResponseMessage() : "-");
                    promise.reject(Constants.ERROR, errorData != null ? errorData.getPaymentsResponseCode() + " - " + errorData.getResponseMessage() : "");
                }
            });


        }catch (Exception e){
            promise.reject("ERROR", e.getMessage());
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
