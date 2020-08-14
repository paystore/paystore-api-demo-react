package com.phoebus.appdemo.service;

import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.phoebus.appdemo.controller.eventEmitter.SendEventPayment;
import com.phoebus.appdemo.utils.Constants;
import com.phoebus.appdemo.utils.CredentialsUtils;
import com.phoebus.appdemo.utils.DataTypeUtils;

import java.math.BigDecimal;
import java.util.List;

import br.com.phoebus.android.payments.api.ErrorData;
import br.com.phoebus.android.payments.api.PaymentClient;
import br.com.phoebus.android.payments.api.PaymentRequestV2;
import br.com.phoebus.android.payments.api.PaymentType;
import br.com.phoebus.android.payments.api.PaymentV2;

public class DoPaymentService implements OnBindConnectedPaymentService {

  private PaymentClient mPaymentClient;
  private ReactContext mContext;
  private Promise promise;

  private String value;
  private String transactionId;
  private boolean showReceiptView;
  private Integer installments;
  private List <PaymentType> payments;

  public DoPaymentService(ReactContext context, PaymentClient paymentClient, String value, String transactionId, boolean showReceiptView, List <PaymentType> paymentType, Integer installments,  Promise promise)
  {
    this.mPaymentClient = paymentClient;
    this.mContext = context;
    this.promise = promise;
    this.value = value;
    this.transactionId = transactionId;
    this.showReceiptView = showReceiptView;
    this.payments = paymentType;
    this.installments = installments;

  }

  @Override
  public void execute() {
    PaymentRequestV2 paymentRequest = new PaymentRequestV2();

    try {
      paymentRequest.withValue(DataTypeUtils.getValueFromString(value))
        .withAppTransactionId(transactionId)
        .withApplicationInfo(CredentialsUtils.getMyAppInfo())
        .withShowReceiptView(showReceiptView)
        .withPaymentTypes(payments);
      paymentRequest.setTokenizeCard(false);
      paymentRequest.setPrintMerchantReceipt(true);
      paymentRequest.setPrintCustomerReceipt(true);
      if(this.installments != 0){
        paymentRequest.setInstallments(this.installments);
      }

    }catch (Exception  e){
      Log.e("Error", e.getMessage());
      promise.reject("ERRORS" + "REQUEST", "ERROR NAME  :" +  e.getMessage() + ", ERROR_CODE : " + e.toString());
    }

    try{
      mPaymentClient.startPaymentV2(paymentRequest, new PaymentClient.PaymentCallback<PaymentV2>() {

        @Override
        public void onSuccess(PaymentV2 paymentV2) {
          PaymentService paymentService = new PaymentService(mContext, promise);
          paymentService.confirmPayment(paymentV2.getPaymentId());
          unBind();
        }

        @Override
        public void onError(ErrorData errorData) {
          Log.e("Error", errorData.getPaymentsResponseCode()+" - "+errorData.getResponseMessage());
          promise.reject(Constants.ERROR, errorData.getPaymentsResponseCode()+" - "+errorData.getResponseMessage());
          unBind();
        }
      });
    } catch (Exception e){
        promise.reject("ERROR", e.getMessage());
        unBind();
    }
  }

  private void unBind() {
    if (mPaymentClient.isBound())
    {
      mPaymentClient.unbind(mContext);
    }
  }
}
