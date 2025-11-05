package com.phoebus.appdemo.modules;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.google.gson.Gson;
import com.phoebus.appdemo.controller.TerminalInfoController;
import com.phoebus.appdemo.model.TerminalInfo;
import com.phoebus.appdemo.service.payments.PaymentService;
import com.phoebus.appdemo.service.payments.ReverseService;
import com.phoebus.appdemo.utils.DataTypeUtils;
import com.phoebus.appdemo.utils.StringUtils;

import java.util.LinkedList;
import java.util.List;

import javax.annotation.Nullable;

import br.com.phoebus.android.payments.api.PaymentType;
import br.com.phoebus.android.payments.api.PaymentV2;
import br.com.phoebus.android.payments.api.provider.PaymentProviderApi;


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
    public void startPaymentV2(ReadableMap request, Promise promise) {
        try {
            String value = DataTypeUtils.getStringSafe(request, "value");
            String appTransactionId = DataTypeUtils.getStringSafe(request, "appTransactionId");
            Boolean printMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "printMerchantReceipt");
            Boolean printCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "printCustomerReceipt");
            Boolean previewMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "previewMerchantReceipt");
            Boolean previewCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "previewCustomerReceipt");
            ReadableArray paymentTypeArrayString = DataTypeUtils.getArraySafe(request, "paymentTypes");
            Integer installments = DataTypeUtils.getIntegerSafe(request, "installments");
            Boolean confirmPayment = DataTypeUtils.getBooleanSafe(request, "confirmPayment");

            List<PaymentType> paymentTypes = new LinkedList<>();
            if (paymentTypeArrayString != null) {
                for (int i = 0; i < paymentTypeArrayString.size(); i++) {
                    String paymentTypeString = paymentTypeArrayString.getString(i);
                    paymentTypes.add(PaymentType.valueOf(paymentTypeString));
                }
            }

            PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
            paymentService.doPayment(value, appTransactionId, printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt, paymentTypes, installments, confirmPayment);

        } catch (Exception e) {
            Log.e("errorPayment", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void listPayments(@Nullable ReadableMap request, Promise promise) {
        try {
            PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
            paymentService.doGetPayments(request);

        } catch (Exception e) {
            Log.e("Error", "O erro foi:", e);
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void reversePaymentV2(ReadableMap request, Promise promise) {
        try {
            String value = DataTypeUtils.getStringSafe(request, "value");
            String appTransactionId = DataTypeUtils.getStringSafe(request, "appTransactionId");
            String paymentId = DataTypeUtils.getStringSafe(request, "paymentId");
            Boolean printMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "printMerchantReceipt");
            Boolean printCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "printCustomerReceipt");
            Boolean previewMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "previewMerchantReceipt");
            Boolean previewCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "previewCustomerReceipt");


            ReverseService reverseService = new ReverseService(this.getReactApplicationContext(), promise);
            reverseService.doReversePayment(value, appTransactionId, paymentId, printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt);
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
    public void getTerminalInfo(Promise promise) {
        try {
            TerminalInfoController terminalInfoController = new TerminalInfoController(getReactApplicationContext());
            TerminalInfo terminalInfo = terminalInfoController.getTerminalInfo();
            Gson gson = new Gson();
            String terminalInfoString = gson.toJson(terminalInfo);
            promise.resolve(terminalInfoString);

        } catch (Exception e) {
            Log.e("errorterminalInfo", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getLogo(Promise promise) {
        try {
            PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
            paymentService.doGetLogo();
        } catch (Exception e) {
            Log.e("errorGetLogo", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getReceiptLogo(Promise promise) {
        try {
            PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
            paymentService.doGetReceiptLogo();
        } catch (Exception e) {
            Log.e("errorGetLogo", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void setMainApp(String packageName, Promise promise) {
        try {
            PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
            paymentService.doSetMainApp(packageName);
        } catch (Exception e) {
            Log.e("errorSetMainApp", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }

    //Reimprime recibo
    @ReactMethod
    public void reprintV2(ReadableMap request, Promise promise) {
        try {

            String paymentId = DataTypeUtils.getStringSafe(request, "paymentId");
            Boolean printMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "printMerchantReceipt");
            Boolean printCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "printCustomerReceipt");
            Boolean previewMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "previewMerchantReceipt");
            Boolean previewCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "previewCustomerReceipt");


            PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
            paymentService.doReprintReceipt(printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt, paymentId);
        } catch (Exception e) {
            Log.e("startInitialization", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }

    //Inicia uma inicialização
    @ReactMethod
    public void startInitialization(Promise promise) {
        try {
            PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
            paymentService.doStartInicialization();
        } catch (Exception e) {
            Log.e("startInitialization", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }

    //Autentica supervisor
    @ReactMethod
    public void supervisorPasswordCheck(String password, Promise promise) {
        try {
            String passwordMD5 = StringUtils.getMd5Hash(password);
            PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
            paymentService.doSupervisorPasswordCheck(passwordMD5);
        } catch (Exception e) {
            Log.e("errorSupervisorPasswordCheck", e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }
}
