package com.phoebus.appdemo.modules;

import android.content.Intent;
import android.database.Cursor;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.google.gson.Gson;
import com.phoebus.appdemo.controller.TerminalInfoController;
import com.phoebus.appdemo.controller.eventEmitter.payments.EventFindPayments;
import com.phoebus.appdemo.model.payments.PaymentsV2Parcel;
import com.phoebus.appdemo.model.TerminalInfo;
import com.phoebus.appdemo.service.payments.PaymentService;
import com.phoebus.appdemo.service.payments.ReverseService;
import com.phoebus.appdemo.utils.CredentialsUtils;

import org.parceler.Parcels;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import br.com.phoebus.android.payments.api.PaymentStatus;
import br.com.phoebus.android.payments.api.PaymentType;
import br.com.phoebus.android.payments.api.PaymentV2;
import br.com.phoebus.android.payments.api.provider.PaymentContract;
import br.com.phoebus.android.payments.api.provider.PaymentProviderApi;
import br.com.phoebus.android.payments.api.provider.PaymentProviderRequest;


public class PaymentModule extends ReactContextBaseJavaModule {

    private ReactContext context;

    private PaymentProviderApi api;


    public PaymentModule(ReactApplicationContext reactContext) {
        super(reactContext);

        this.context = reactContext;
        this.api = PaymentProviderApi.create(getReactApplicationContext());


    }

    @Override
    public String getName() {
        return "Payment";
    }

    @ReactMethod
    public void startPayment(String value,
                             String transactionId,
                             boolean showReceiptView,
                             ReadableArray paymentTypeArrayString,
                             Integer installments,
                             Boolean confirmPayment,
                             Promise promise) {

        List<PaymentType> paymentTypes = new LinkedList<>();
        for (int i = 0; i < paymentTypeArrayString.size(); i++) {
            String paymentTypeString = paymentTypeArrayString.getString(i);
            if (PaymentType.valueOf(paymentTypeString) != null) {
                paymentTypes.add(PaymentType.valueOf(paymentTypeString));
            }
        }

        try {
            PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
            paymentService.doPayment(value, transactionId, showReceiptView, paymentTypes, installments, confirmPayment);

        } catch (Exception e) {
            Log.e("errorPayment", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void listPayments(ReadableArray status, Promise promise) {
        try {
            PaymentProviderRequest request = new PaymentProviderRequest(CredentialsUtils.getMyAppInfo(), new Date());

            if (status != null) {
                List<PaymentStatus> paymentStatus = new ArrayList<>();
                for (int i = 0; i < status.size(); i++) {
                    String statusItem = status.getString(i);
                    if (statusItem != null) {
                        PaymentStatus paymentStatusItem = PaymentStatus.valueOf(statusItem);
                        paymentStatus.add(paymentStatusItem);
                    }
                }
                request.setStatus(paymentStatus);
            }

            String[] columns = new String[]{
                    PaymentContract.column.ID,
                    PaymentContract.column.VALUE,
                    PaymentContract.column.ACQUIRER_ID,
                    PaymentContract.column.ACQUIRER_NAME,
                    PaymentContract.column.ACQUIRER_AUTHORIZATION_NUMBER,
                    PaymentContract.column.ACQUIRER_RESPONSE_CODE,
                    PaymentContract.column.ACQUIRER_RESPONSE_DATE,
                    PaymentContract.column.CAPTURE_TYPE,
                    PaymentContract.column.PAYMENT_STATUS,
                    PaymentContract.column.PAYMENT_TYPE,
                    PaymentContract.column.PAYMENT_DATE,
                    PaymentContract.column.CARD_BRAND,
                    PaymentContract.column.APP_TRANSACTION_ID,
                    PaymentContract.column.CARD_PAN_LAST_4_DIGITS,
                    PaymentContract.column.INSTALLMENTS,
                    PaymentContract.column.RECEIPT_CLIENT,
                    PaymentContract.column.RECEIPT_MERCHANT,
            };
            request.setColumns(columns);

            Cursor cursor = getReactApplicationContext().getContentResolver().query(request.getUriBuilder().build(), columns, null, null, null);
            List<PaymentV2> payments = PaymentV2.fromCursorV2(cursor);

            PaymentsV2Parcel paymentsV2Parcel = new PaymentsV2Parcel();
            List<PaymentsV2Parcel> listPaymentsV2Parcel = paymentsV2Parcel.getPaymentsV2Parcel(payments);

            Intent newIntent = new Intent(context, EventFindPayments.class);
            newIntent.putExtra("payments", Parcels.wrap(listPaymentsV2Parcel));
            newIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(newIntent);
        } catch (Exception e) {
            Log.e("Error", "O erro foi:", e);
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void startPaymentReversal(String value, String transactionId, String paymentId, Boolean showReceiptView, Boolean setPrintMerchantReceipt, Boolean setPrintCustomerReceipt, Promise promise) {
        try {
            ReverseService reverseService = new ReverseService(this.getReactApplicationContext(), promise);
            reverseService.doReverse(value, transactionId, paymentId, showReceiptView, setPrintMerchantReceipt, setPrintCustomerReceipt);
        } catch (Exception e) {
            Log.e("errorPayment", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void cancelPayment(String paymentId, Promise promise) {
        try {
            PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
            paymentService.doCancelPayment(paymentId);
        } catch (Exception e) {
            Log.e("errorCancelPayment", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void confirmPayment(String paymentItem, Promise promise) {
        try {
            PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
            Gson gson = new Gson();
            PaymentV2 paymentV2 = gson.fromJson(paymentItem, PaymentV2.class);
            paymentService.confirmPayment(paymentV2);
        } catch (Exception e) {
            Log.e("errorConfirmPayment", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }

   @ReactMethod
   public void getTerminalInfo(Promise promise){
        try {
            TerminalInfoController terminalInfoController = new TerminalInfoController(getReactApplicationContext());
            TerminalInfo terminalInfo = terminalInfoController.getTerminalInfo();
            Gson gson = new Gson();
            String terminalInfoString = gson.toJson(terminalInfo);
            promise.resolve(terminalInfoString);

        }catch(Exception e){
            Log.e("errorterminalInfo", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
   }

   @ReactMethod
    public void getLogo(Promise promise){
       try {
           PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
           paymentService.doGetLogo();
       }catch(Exception e){
           Log.e("errorGetLogo", e.toString());
           promise.reject("ERROR", e.getMessage());
       }
   }

    @ReactMethod
    public void getReceiptLogo(Promise promise){
        try {
            PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
            paymentService.doGetReceiptLogo();
        }catch(Exception e){
            Log.e("errorGetLogo", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void setMainApp(String packageName, Promise promise){
        try {
            PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
            paymentService.doSetMainApp(packageName);
        }catch(Exception e){
            Log.e("errorSetMainApp", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }
}
