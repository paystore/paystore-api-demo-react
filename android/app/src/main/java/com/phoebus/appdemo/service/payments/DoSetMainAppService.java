package com.phoebus.appdemo.service.payments;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.phoebus.appdemo.utils.Constants;

import br.com.phoebus.android.payments.api.ErrorData;
import br.com.phoebus.android.payments.api.PaymentClient;

public class DoSetMainAppService implements OnBindConnectedPaymentService{

    private final PaymentClient mPaymentClient;
    private final ReactContext mContext;
    private final String packageName;
    private final Promise promise;

    public DoSetMainAppService(ReactContext context, PaymentClient paymentClient, String packageName, Promise promise){
        this.mPaymentClient = paymentClient;
        this.mContext = context;
        this.packageName = packageName;
        this.promise = promise;
    }

    @Override
    public void execute() {
        try {
            mPaymentClient.setMainApp(packageName, new PaymentClient.PaymentCallback<>() {
                @Override
                public void onSuccess(Object o) {
                    promise.resolve(o);
                    unBind();
                }

                @Override
                public void onError(ErrorData errorData) {
                    Log.e("Error", errorData != null ? errorData.getPaymentsResponseCode() + " - " + errorData.getResponseMessage() : "-");
                    promise.reject(Constants.ERROR, errorData != null ? errorData.getPaymentsResponseCode() + " - " + errorData.getResponseMessage() : "");
                }
            });
        }catch(Exception e){
            promise.reject("ERROR", e.getMessage());
            unBind();
        }    }

    private void unBind() {
        if (mPaymentClient.isBound())
        {
            mPaymentClient.unbind(mContext);
        }
    }
}
