package com.phoebus.appdemo.service.payments;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.phoebus.appdemo.utils.Constants;

import br.com.phoebus.android.payments.api.ErrorData;
import br.com.phoebus.android.payments.api.PaymentClient;
import br.com.phoebus.android.payments.api.PaymentStatus;
import br.com.phoebus.android.payments.api.PaymentV2;

public class DoConfirmPaymentService implements OnBindConnectedPaymentService {

    private final PaymentV2 paymentV2;
    private final PaymentClient mPaymentClient;
    private final ReactContext mContext;
    private final Promise promise;

    public DoConfirmPaymentService(ReactContext context, PaymentClient paymentClient, PaymentV2 paymentV2, Promise promise) {
        this.mContext = context;
        this.mPaymentClient = paymentClient;
        this.paymentV2 = paymentV2;
        this.promise = promise;
    }

    @Override
    public void execute() {

        try {
            mPaymentClient.confirmPayment(paymentV2.getPaymentId(), new PaymentClient.PaymentCallback() {
                @Override
                public void onSuccess(Object o) {
                    Log.d(Constants.TAG, "sendEvent: ConfirmPayment");
                    paymentV2.setPaymentStatus(PaymentStatus.CONFIRMED);
                    Bundle bundle = PaymentV2.toBundle(paymentV2);
                    Log.d(Constants.TAG, "Chamando serviço de notificação");
                    Intent serviceIntent = new Intent(mContext, EventService.class);
                    serviceIntent.putExtras(bundle);
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        mContext.startForegroundService(serviceIntent);
                    } else {
                        mContext.startService(serviceIntent);
                    }
                    unBind();
                }

                @Override
                public void onError(ErrorData errorData) {
                    promise.reject(Constants.ERROR, errorData != null ? errorData.getResponseMessage() : "-");
                    unBind();
                }
            });
        } catch (Exception e) {
            Log.e(Constants.TAG, "Erro ao confirmar pagamento.", e);
            unBind();
        }
    }

    private void unBind() {
        if (mPaymentClient.isBound()) {
            mPaymentClient.unbind(mContext);
        }
    }


}
