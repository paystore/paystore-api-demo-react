package com.phoebus.appdemo.modules;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.ReadableArray;
import com.phoebus.appdemo.service.PaymentService;

import java.util.LinkedList;
import java.util.List;
import br.com.phoebus.android.payments.api.PaymentType;


public class PaymentModule extends ReactContextBaseJavaModule {

    private ReactContext context;


    public PaymentModule(ReactApplicationContext reactContext){
        super(reactContext);

        this.context = reactContext;

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
                             Promise promise){

         List <PaymentType> paymentTypes = new LinkedList<>();
            for (int i = 0; i < paymentTypeArrayString.size(); i++) {
                String paymentTypeString = paymentTypeArrayString.getString(i);
                if (PaymentType.valueOf(paymentTypeString) != null){
                    paymentTypes.add(PaymentType.valueOf(paymentTypeString));
                }
            }

        try{
            PaymentService paymentService = new PaymentService(this.getReactApplicationContext(), promise);
            paymentService.doPayment(value, transactionId, showReceiptView, paymentTypes, installments);
        }catch (Exception e){
            Log.e("errorPayment",e.toString());
            promise.reject("ERROR", e.getMessage());
        }
    }

}
