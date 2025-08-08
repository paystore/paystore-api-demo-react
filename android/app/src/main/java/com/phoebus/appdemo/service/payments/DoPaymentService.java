package com.phoebus.appdemo.service.payments;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.phoebus.appdemo.utils.Constants;
import com.phoebus.appdemo.utils.CredentialsUtils;
import com.phoebus.appdemo.utils.DataTypeUtils;

import java.util.List;

import javax.annotation.Nullable;

import br.com.phoebus.android.payments.api.ErrorData;
import br.com.phoebus.android.payments.api.PaymentClient;
import br.com.phoebus.android.payments.api.PaymentRequestV2;
import br.com.phoebus.android.payments.api.PaymentType;
import br.com.phoebus.android.payments.api.PaymentV2;

public class DoPaymentService implements OnBindConnectedPaymentService {

    private final PaymentClient mPaymentClient;
    private final ReactContext mContext;
    private final Promise promise;
    private final String value;
    private final Boolean confirmPayment;
    private final String transactionId;
    private final Boolean printMerchantReceipt;
    private final Boolean printCustomerReceipt;
    private final Boolean previewMerchantReceipt;
    private final Boolean previewCustomerReceipt;
    private final Integer installments;
    private final List<PaymentType> payments;

    public DoPaymentService(ReactContext context, PaymentClient paymentClient, String value, String transactionId, @Nullable Boolean printMerchantReceipt, @Nullable Boolean printCustomerReceipt, @Nullable Boolean previewMerchantReceipt, @Nullable Boolean previewCustomerReceipt, List<PaymentType> paymentType, @Nullable Integer installments, @Nullable Boolean confirmPayment, Promise promise) {
        this.mPaymentClient = paymentClient;
        this.mContext = context;
        this.promise = promise;
        this.value = value;
        this.transactionId = transactionId;
        this.printMerchantReceipt = printMerchantReceipt;
        this.printCustomerReceipt = printCustomerReceipt;
        this.previewCustomerReceipt = previewCustomerReceipt;
        this.previewMerchantReceipt = previewMerchantReceipt;
        this.payments = paymentType;
        this.installments = installments;
        this.confirmPayment = confirmPayment;
    }

    @Override
    public void execute() {
        Log.d(Constants.TAG, "Valor: " + value);
        Log.d(Constants.TAG, "transactionId: " + transactionId);

        PaymentRequestV2 paymentRequest = new PaymentRequestV2();
        try {
            paymentRequest.withValue(DataTypeUtils.getValueFromString(value))
                    .withAppTransactionId(transactionId)
                    .withApplicationInfo(CredentialsUtils.getMyAppInfo())
                    .withPrintCustomerReceipt(this.printCustomerReceipt)
                    .withPrintMerchantReceipt(this.printMerchantReceipt)
                    .withPaymentTypes(payments);
            paymentRequest.setTokenizeCard(false);
            paymentRequest.setPreviewCustomerReceipt(this.previewCustomerReceipt);
            paymentRequest.setPreviewMerchantReceipt(this.previewMerchantReceipt);
            if (this.installments != null && this.installments != 0) {
                paymentRequest.setInstallments(this.installments);
            }

        } catch (Exception e) {
            Log.e(Constants.TAG, "Erro na requisicao", e);
            promise.reject("ERRORS" + "REQUEST", "ERROR NAME  :" + e.getMessage() + ", ERROR_CODE : " + e.toString());
        }

        try {
            mPaymentClient.startPaymentV2(paymentRequest, new PaymentClient.PaymentCallback<PaymentV2>() {

                @Override
                public void onSuccess(PaymentV2 paymentV2) {
                    if (Boolean.TRUE.equals(confirmPayment)) {
                        PaymentService paymentService = new PaymentService(mContext, promise);
                        paymentService.confirmPayment(paymentV2);
                    } else {
                        Bundle bundle = PaymentV2.toBundle(paymentV2);
                        Log.d(Constants.TAG, "Chamando serviço de notificação");
                        Intent serviceIntent = new Intent(mContext, EventService.class);
                        serviceIntent.putExtras(bundle);
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                            mContext.startForegroundService(serviceIntent);
                        } else {
                            mContext.startService(serviceIntent);
                        }
                    }
                    unBind();
                }

                @Override
                public void onError(ErrorData errorData) {
                    Log.e(Constants.TAG, errorData != null ? errorData.getPaymentsResponseCode() + " - " + errorData.getResponseMessage() : "-");
                    promise.reject(Constants.ERROR, errorData != null ? errorData.getPaymentsResponseCode() + " - " + errorData.getResponseMessage() : "");
                    unBind();
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
