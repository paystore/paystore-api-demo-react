package com.phoebus.appdemo.modules;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.phoebus.appdemo.model.pix.PixStatus;
import com.phoebus.appdemo.service.pix.PixServices;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class PixModule extends ReactContextBaseJavaModule {
    public PixModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private static final String ErrorLog = "ERROR";

    @NonNull
    @Override
    public String getName() {
        return "Pix";
    }

    @ReactMethod
    public void startPixPayment(String value, String pixClientId, Boolean printMerchantReceipt, Boolean printCustomerReceipt, Promise promise){
        try {
            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doPixPayment(value, pixClientId, printMerchantReceipt, printCustomerReceipt);

        } catch (Exception e) {
            Log.e("errorPixPayment", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void listPixPayments(String dateStart, String dateFinish, ReadableArray status, String value, Promise promise) {
        try {

            // Formato esperado da data
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);

        // Parse a string para um objeto LocalDateTime
        Date startDate = sdf.parse(dateStart);
        Date finishDate = sdf.parse(dateFinish);
        List<PixStatus> statusPixList = new ArrayList<>();

        if(status != null){
            for (int i = 0; i < status.size(); i++) {
                String statusItem = status.getString(i);
                if (statusItem != null) {
                    PixStatus pixStatusItem = PixStatus.valueOf(statusItem);
                    statusPixList.add(pixStatusItem);
                }
            }
        }

            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doListPixPayment(startDate, finishDate, statusPixList, value);

        } catch (Exception e) {
            Log.e("errorPixList", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void isPixInstalled(Promise promise){
        try {
            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            promise.resolve(pixServices.isPixInstalled());

        } catch (Exception e) {
            Log.e("errorPixRefund", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void refundPixPayment(String txId, Boolean printMerchantReceipt, Boolean printCustomerReceipt, Promise promise){
        try {
            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doRefundPixPayment(txId, printMerchantReceipt, printCustomerReceipt);

        } catch (Exception e) {
            Log.e("errorPixRefund", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void refund(Boolean printMerchantReceipt, Boolean printCustomerReceipt, Promise promise){
        try {
            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doRefundPix(printMerchantReceipt, printCustomerReceipt);

        } catch (Exception e) {
            Log.e("errorRefund", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void consultByTxId(String txId, Boolean printMerchantReceipt, Boolean printCustomerReceipt, Promise promise){
        try {
            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doConsultPixByTxId(txId, printMerchantReceipt, printCustomerReceipt);

        } catch (Exception e) {
            Log.e("errorPixConsultByTxId", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void consultByPixClientId(String pixClientId, Promise promise){
        try {
            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doConsultPixByClientId(pixClientId);

        } catch (Exception e) {
            Log.e("errorConsultPixClientId", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void consult( Boolean printMerchantReceipt, Boolean printCustomerReceipt, Promise promise){
        try {
            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doConsultPix(printMerchantReceipt, printCustomerReceipt);

        } catch (Exception e) {
            Log.e("errorConsultPix", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void synchronize(Promise promise){
        try {
            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doSincronize();

        } catch (Exception e) {
            Log.e("errorSync", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }
}