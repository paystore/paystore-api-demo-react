package com.phoebus.appdemo.service.payments;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.phoebus.appdemo.controller.eventEmitter.payments.SendEventReversal;
import com.phoebus.appdemo.utils.Constants;
import com.phoebus.appdemo.utils.CredentialsUtils;
import com.phoebus.appdemo.utils.DataTypeUtils;

import br.com.phoebus.android.payments.api.ErrorData;
import br.com.phoebus.android.payments.api.PaymentClient;
import br.com.phoebus.android.payments.api.ReversePayment;
import br.com.phoebus.android.payments.api.ReversePaymentRequestV2;



public class DoReverseService implements OnBindConnectedPaymentService{

    private PaymentClient mPaymentClient;
    private ReactContext mContext;
    private Promise promise;
    private String value;
    private String transactionId;
    private String paymentId;
    private Boolean showReceiptView ;
    private Boolean setPrintMerchantReceipt ;
    private Boolean setPrintCustomerReceipt ;


    public DoReverseService(ReactContext context,
                           PaymentClient paymentClient,
                           String value,
                           String transactionId,
                           String paymentId,
                            boolean showReceiptView,
                            boolean setPrintMerchantReceipt,
                            boolean setPrintCustomerReceipt,
                           Promise promise)
    {
        this.mPaymentClient = paymentClient;
        this.mContext = context;
        this.promise = promise;
        this.value = value;
        this.transactionId = transactionId;
        this.paymentId = paymentId;
        this.showReceiptView = showReceiptView;
        this.setPrintMerchantReceipt = setPrintMerchantReceipt;
        this.setPrintCustomerReceipt = setPrintCustomerReceipt;
    }

    @Override
    public void execute(){
        Log.e("Valor", value);
        Log.e("paymentId", paymentId);
        Log.e("transactionId", transactionId);
        Log.e("showReceiptView", showReceiptView.toString());

        ReversePaymentRequestV2 reversePaymentRequest = new ReversePaymentRequestV2();
        try {
            reversePaymentRequest
                    .withValue(DataTypeUtils.getValueFromString(value))
                    .withAppTransactionId(transactionId)
                    .withPaymentId(paymentId)
                    .withCredentials(CredentialsUtils.getMyCredentials())
                    .withShowReceiptView(showReceiptView);
            reversePaymentRequest.setPrintCustomerReceipt(setPrintCustomerReceipt);
            reversePaymentRequest.setPrintMerchantReceipt(setPrintMerchantReceipt);

        }catch (Exception  e){
            Log.e("Error", e.getMessage());
            promise.reject("ERRORS" + "REQUEST", "ERROR NAME  :" +  e.getMessage() + ", ERROR_CODE : " + e.toString());
        }

        try {
            mPaymentClient.reversePaymentV2(reversePaymentRequest, new PaymentClient.PaymentCallback<ReversePayment>() {
                @Override
                public void onSuccess(ReversePayment reversePayment) {
                    Log.e("sendEvent", "Reversal");
                    Bundle bundle = DoReverseService.toBundle(reversePayment);
                    Intent newIntent = new Intent(mContext, SendEventReversal.class);
                    newIntent.putExtras(bundle);
                    newIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    mContext.startActivity(newIntent);
                    unBind();
                }

                @Override
                public void onError(ErrorData errorData) {
                    Log.e("Error", errorData != null ? errorData.getPaymentsResponseCode() + " - " + errorData.getResponseMessage() : "-");
                    promise.reject(Constants.ERROR, errorData != null ? errorData.getPaymentsResponseCode() + " - " + errorData.getResponseMessage() : "");
                    unBind(); 
                }
            });
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
            unBind();
        }
    }

    public static Bundle toBundle(ReversePayment reversePayment) {
        Bundle bundle = new Bundle();
        Gson gson = (new GsonBuilder()).setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").create();
        String reversal = gson.toJson(reversePayment);
        bundle.putString("reversal", reversal);
        bundle.putString("bundleType", "json");
        return bundle;
    }

    private void unBind() {
        if (mPaymentClient.isBound())
        {
            mPaymentClient.unbind(mContext);
        }
    }

}
