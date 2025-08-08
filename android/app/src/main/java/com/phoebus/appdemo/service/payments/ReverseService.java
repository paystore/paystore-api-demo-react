package com.phoebus.appdemo.service.payments;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;

import javax.annotation.Nullable;

import br.com.phoebus.android.payments.api.PaymentClient;

public class ReverseService {
    private PaymentClient paymentClient = new PaymentClient();
    private ReactContext context;
    private Promise promise;
    private OnBindConnectedPaymentService onBindConnectedPaymentService;

    public ReverseService(ReactContext context, Promise promise) {
        this.context = context;
        this.promise = promise;
    }

    private void doBind() {
        this.paymentClient.bind(this.context.getApplicationContext(), new PaymentClient.OnConnectionCallback() {
            @Override
            public void onConnected() {
                Log.i("OnConnected", "Conectado");
                onBindConnectedPaymentService.execute();
            }

            @Override
            public void onDisconnected(boolean b) {
                Log.i("onDisconnected", "Desconectado");
            }
        });
    }

    public void doReversePayment(@Nullable String value, String transactionId, String paymentId, @Nullable Boolean printMerchantReceipt, @Nullable Boolean printCustomerReceipt, @Nullable Boolean previewMerchantReceipt, @Nullable Boolean previewCustomerReceipt) {
        OnBindConnectedPaymentService doReverse = new DoReverseService(context, paymentClient, value, transactionId, paymentId, printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt, promise);
        setOnBindConnectedPaymentService(doReverse);
        doBind();
    }

    public void setOnBindConnectedPaymentService(OnBindConnectedPaymentService onBindConnectedPaymentService) {
        this.onBindConnectedPaymentService = onBindConnectedPaymentService;
    }

}
