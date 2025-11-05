package com.phoebus.appdemo.service.payments;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.phoebus.appdemo.utils.Constants;
import com.phoebus.appdemo.utils.CredentialsUtils;

import br.com.phoebus.android.payments.api.ErrorData;
import br.com.phoebus.android.payments.api.PaymentClient;
import br.com.phoebus.android.payments.api.SupervisorPasswordRequest;

public class DoSupervisorPasswordCheck implements OnBindConnectedPaymentService {

    private final PaymentClient mPaymentClient;
    private final ReactContext mContext;
    private final String password;
    private final Promise promise;

    public DoSupervisorPasswordCheck(ReactContext context, PaymentClient paymentClient, String password, Promise promise) {
        this.mPaymentClient = paymentClient;
        this.mContext = context;
        this.password = password;
        this.promise = promise;
    }

    @Override
    public void execute() {
        try {
            SupervisorPasswordRequest supervisorPasswordRequest = new SupervisorPasswordRequest();
            supervisorPasswordRequest.setSupervisorPasswordCheck(password);
            supervisorPasswordRequest.setApplicationInfo(CredentialsUtils.getMyAppInfo());
            mPaymentClient.supervisorPasswordCheck(supervisorPasswordRequest, new PaymentClient.PaymentCallback<Boolean>() {
                @Override
                public void onSuccess(Boolean result) {
                    promise.resolve(result);
                    unBind();
                }

                @Override
                public void onError(ErrorData errorData) {
                    Log.e(Constants.TAG, errorData != null ? errorData.getPaymentsResponseCode() + " - " + errorData.getResponseMessage() : "-");
                    promise.reject(Constants.ERROR, errorData != null ? errorData.getPaymentsResponseCode() + " - " + errorData.getResponseMessage() : "");
                }
            });
        } catch (Exception e) {
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
