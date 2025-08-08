package com.phoebus.appdemo.service.payments;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;

import java.util.Date;
import java.util.List;

import javax.annotation.Nullable;

import br.com.phoebus.android.payments.api.PaymentClient;
import br.com.phoebus.android.payments.api.PaymentType;
import br.com.phoebus.android.payments.api.PaymentV2;

public class PaymentService {
    private PaymentClient paymentClient = new PaymentClient();
    private ReactContext context;
    private Promise promise;
    private OnBindConnectedPaymentService onBindConnectedPaymentService;

    public PaymentService(ReactContext context, Promise promise) {
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

    public void doPayment(String value, String appTransactionId, @Nullable Boolean printMerchantReceipt, @Nullable Boolean printCustomerReceipt, @Nullable Boolean previewMerchantReceipt, @Nullable Boolean previewCustomerReceipt, List<PaymentType> paymentType, @Nullable Integer installments, @Nullable Boolean confirmPayment) {
        OnBindConnectedPaymentService doPayment = new DoPaymentService(context, paymentClient, value, appTransactionId, printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt, paymentType, installments, confirmPayment, promise);
        setOnBindConnectedPaymentService(doPayment);
        doBind();
    }

    public void confirmPayment(PaymentV2 paymentV2) {
        OnBindConnectedPaymentService doConfirmPaymentService = new DoConfirmPaymentService(context, paymentClient, paymentV2, promise);
        setOnBindConnectedPaymentService(doConfirmPaymentService);
        doBind();
    }

    public void doCancelPayment(String paymentId) {
        OnBindConnectedPaymentService doConfirmPaymentService = new DoCancelPayment(context, paymentClient, paymentId, promise);
        setOnBindConnectedPaymentService(doConfirmPaymentService);
        doBind();
    }

    public void doGetLogo() {
        OnBindConnectedPaymentService doGetLogoService = new DoGetLogoService(context, paymentClient, promise);
        setOnBindConnectedPaymentService(doGetLogoService);
        doBind();
    }

    public void doGetReceiptLogo() {
        OnBindConnectedPaymentService doGetReceiptLogoService = new DoGetReceiptLogoService(context, paymentClient, promise);
        setOnBindConnectedPaymentService(doGetReceiptLogoService);
        doBind();
    }

    public void doSetMainApp(String packageName) {
        OnBindConnectedPaymentService doSetMainApp = new DoSetMainAppService(context, paymentClient, packageName, promise);
        setOnBindConnectedPaymentService(doSetMainApp);
        doBind();
    }

    public void doStartInicialization() {
        OnBindConnectedPaymentService doStartInicialization = new DoStartInitialization(context, paymentClient, promise);
        setOnBindConnectedPaymentService(doStartInicialization);
        doBind();
    }

    public void doReprintReceipt(Boolean printMerchantReceipt, @Nullable Boolean printCustomerReceipt, @Nullable Boolean previewMerchantReceipt, @Nullable Boolean previewCustomerReceipt, @Nullable String paymentId) {
        OnBindConnectedPaymentService doReprintReceipt = new DoReprintReceiptService(context, paymentClient, printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt, paymentId, promise);
        setOnBindConnectedPaymentService(doReprintReceipt);
        doBind();
    }

    public void doGetPayments(ReadableMap request) {
        OnBindConnectedPaymentService doGetPayments = new DoGetPayments(context, request, promise);
        setOnBindConnectedPaymentService(doGetPayments);
        doBind();
    }

    public void setOnBindConnectedPaymentService(OnBindConnectedPaymentService onBindConnectedPaymentService) {
        this.onBindConnectedPaymentService = onBindConnectedPaymentService;
    }

}
