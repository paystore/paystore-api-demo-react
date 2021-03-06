package com.phoebus.appdemo.service;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;

import java.util.List;

import br.com.phoebus.android.payments.api.PaymentClient;
import br.com.phoebus.android.payments.api.PaymentType;

public class PaymentService {

    private PaymentClient paymentClient = new PaymentClient();
    private ReactContext context;
    private Promise promise;
    private OnBindConnectedPaymentService onBindConnectedPaymentService;

    public PaymentService(ReactContext context, Promise promise){
        this.context = context;
        this.promise = promise;
    }

    private void doBind(){
        Promise promise = this.promise;

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

    public void doPayment(String value, String transactionId, boolean showReceiptView, List<PaymentType> paymentType, Integer installments){
        OnBindConnectedPaymentService doPayment = new DoPaymentService(context, paymentClient, value, transactionId, showReceiptView, paymentType, installments, promise);
        setOnBindConnectedPaymentService(doPayment);
        doBind();
    }

    public void confirmPayment(String paymentId){
        OnBindConnectedPaymentService doConfirmPaymentService = new DoConfirmPaymentService(context, paymentClient, paymentId, promise);
        setOnBindConnectedPaymentService(doConfirmPaymentService);
        doBind();
    }

    public void setOnBindConnectedPaymentService(OnBindConnectedPaymentService onBindConnectedPaymentService) {
        this.onBindConnectedPaymentService = onBindConnectedPaymentService;
    }
}
