package com.phoebus.appdemo.service.payments;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.phoebus.appdemo.utils.Constants;

import br.com.phoebus.android.payments.api.ErrorData;
import br.com.phoebus.android.payments.api.PaymentClient;

public class DoGetLogoService implements OnBindConnectedPaymentService {
    private final ReactContext context;
    private final Promise promise;
    private final PaymentClient paymentClient;

    public DoGetLogoService(ReactContext context, PaymentClient paymentClient, Promise promise){
        this.context = context;
        this.paymentClient = paymentClient;
        this.promise = promise;
    }
    @Override
    public void execute() {

        try {
           this.paymentClient.getLogo(new PaymentClient.PaymentCallback<Object>() {
               @Override
               public void onSuccess(Object data) {
                   promise.resolve(data);
                   unBind();
               }

               @Override
               public void onError(ErrorData errorData) {
                   Log.e("Error", errorData != null ? errorData.getPaymentsResponseCode() + " - " + errorData.getResponseMessage() : "-");
                   promise.reject(Constants.ERROR, errorData != null ? errorData.getPaymentsResponseCode() + " - " + errorData.getResponseMessage() : "");
                   unBind();
               }
           });

        }catch (Exception  e){
            Log.e("Error", e.getMessage());
            promise.reject("ERRORS" + "REQUEST", "ERROR NAME  :" +  e.getMessage() + ", ERROR_CODE : " + e.toString());
        }

    }

    private void unBind() {
        if (paymentClient.isBound())
        {
            paymentClient.unbind(context);
        }
    }
}
