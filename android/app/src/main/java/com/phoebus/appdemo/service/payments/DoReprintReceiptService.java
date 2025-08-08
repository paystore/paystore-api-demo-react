package com.phoebus.appdemo.service.payments;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.phoebus.appdemo.utils.Constants;
import com.phoebus.appdemo.utils.CredentialsUtils;

import javax.annotation.Nullable;

import br.com.phoebus.android.payments.api.ApplicationInfo;
import br.com.phoebus.android.payments.api.ErrorData;
import br.com.phoebus.android.payments.api.PaymentClient;
import br.com.phoebus.android.payments.api.ReprintReceiptRequestV2;

public class DoReprintReceiptService implements OnBindConnectedPaymentService {
    private final ReactContext context;
    private final Promise promise;
    private final PaymentClient paymentClient;
    private final Boolean printMerchantReceipt;
    private final Boolean printCustomerReceipt;
    private final Boolean previewMerchantReceipt;
    private final Boolean previewCustomerReceipt;
    private final String paymentId;

    public DoReprintReceiptService(ReactContext context, PaymentClient paymentClient, @Nullable Boolean printMerchantReceipt, @Nullable Boolean printCustomerReceipt, @Nullable Boolean previewMerchantReceipt, @Nullable Boolean previewCustomerReceipt, @Nullable String paymentId, Promise promise) {
        this.context = context;
        this.paymentClient = paymentClient;
        this.promise = promise;
        this.printMerchantReceipt = printMerchantReceipt;
        this.printCustomerReceipt = printCustomerReceipt;
        this.previewCustomerReceipt = previewCustomerReceipt;
        this.previewMerchantReceipt = previewMerchantReceipt;
        this.paymentId = paymentId;
    }

    @Override
    public void execute() {

        ReprintReceiptRequestV2 reprintReceiptRequestV2 = new ReprintReceiptRequestV2();
        try {
            ApplicationInfo applicationInfo = CredentialsUtils.getMyAppInfo();
            reprintReceiptRequestV2.setPreviewCustomerReceipt(this.previewCustomerReceipt);
            reprintReceiptRequestV2.setPreviewMerchantReceipt(this.previewMerchantReceipt);
            reprintReceiptRequestV2.setPrintCustomerReceipt(this.printCustomerReceipt);
            reprintReceiptRequestV2.setPrintMerchantReceipt(this.printMerchantReceipt);
            reprintReceiptRequestV2.setApplicationInfo(applicationInfo);
            reprintReceiptRequestV2.setSoftwareVersion(applicationInfo.getSoftwareVersion());
            if (paymentId != null && !paymentId.isBlank()) {
                reprintReceiptRequestV2.setPaymentId(paymentId);
            }

        } catch (Exception e) {
            Log.e(Constants.TAG, "Erro na requisicao", e);
            promise.reject("ERRORS" + "REQUEST", "ERROR NAME  :" + e.getMessage() + ", ERROR_CODE : " + e.toString());
        }

        try {
            paymentClient.reprintV2(reprintReceiptRequestV2, new PaymentClient.PaymentCallback<>() {
                @Override
                public void onSuccess(Void unused) {
                    promise.resolve(true);
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
        if (paymentClient.isBound()) {
            paymentClient.unbind(context);
        }
    }

}
