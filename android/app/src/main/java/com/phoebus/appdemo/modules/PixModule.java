package com.phoebus.appdemo.modules;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.phoebus.appdemo.model.pix.PixStatus;
import com.phoebus.appdemo.service.pix.PixServices;
import com.phoebus.appdemo.utils.DataTypeUtils;

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
    public void startPixPayment(ReadableMap request, Promise promise) {
        try {
            String value = DataTypeUtils.getStringSafe(request, "value");
            String pixClientId = DataTypeUtils.getStringSafe(request, "pixClientId");
            Boolean printMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "printMerchantReceipt");
            Boolean printCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "printCustomerReceipt");
            Boolean previewMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "previewMerchantReceipt");
            Boolean previewCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "previewCustomerReceipt");

            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doPixPayment(value, pixClientId, printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt);

        } catch (Exception e) {
            Log.e("errorPixPayment", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void listPixPayments(ReadableMap request, Promise promise) {
        try {

            ReadableArray status = DataTypeUtils.getArraySafe(request, "status");
            String dateStart = DataTypeUtils.getStringSafe(request, "startDate");
            String endDate = DataTypeUtils.getStringSafe(request, "endDate");
            String value = DataTypeUtils.getStringSafe(request, "value");

            // Formato esperado da data
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);

            // Parse a string para um objeto LocalDateTime
            Date startDate = sdf.parse(dateStart);
            Date finishDate = sdf.parse(endDate);
            List<PixStatus> statusPixList = new ArrayList<>();

            if (status != null) {
                for (int i = 0; i < status.size(); i++) {
                    String statusItem = status.getString(i);
                    PixStatus pixStatusItem = PixStatus.valueOf(statusItem);
                    if (pixStatusItem != PixStatus.UNKNOWN) {
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
    public void isPixInstalled(Promise promise) {
        try {
            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            promise.resolve(pixServices.isPixInstalled());

        } catch (Exception e) {
            Log.e("errorPixRefund", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void refundPixPayment(ReadableMap request, Promise promise) {
        try {
            String txId = DataTypeUtils.getStringSafe(request, "txId");
            Boolean printMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "printMerchantReceipt");
            Boolean printCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "printCustomerReceipt");
            Boolean previewMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "previewMerchantReceipt");
            Boolean previewCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "previewCustomerReceipt");

            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doRefundPixPayment(txId, printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt);

        } catch (Exception e) {
            Log.e("errorPixRefund", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void refund(ReadableMap request, Promise promise) {
        try {
            Boolean printMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "printMerchantReceipt");
            Boolean printCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "printCustomerReceipt");
            Boolean previewMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "previewMerchantReceipt");
            Boolean previewCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "previewCustomerReceipt");


            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doRefundPix(printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt);

        } catch (Exception e) {
            Log.e("errorRefund", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void consultByTxId(ReadableMap request, Promise promise) {
        try {
            String txId = DataTypeUtils.getStringSafe(request, "txId");
            Boolean printMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "printMerchantReceipt");
            Boolean printCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "printCustomerReceipt");
            Boolean previewMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "previewMerchantReceipt");
            Boolean previewCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "previewCustomerReceipt");


            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doConsultPixByTxId(txId, printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt);

        } catch (Exception e) {
            Log.e("errorPixConsultByTxId", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void consultByPixClientId(String pixClientId, Promise promise) {
        try {
            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doConsultPixByClientId(pixClientId);

        } catch (Exception e) {
            Log.e("errorConsultPixClientId", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void consult(ReadableMap request, Promise promise) {
        try {
            Boolean printMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "printMerchantReceipt");
            Boolean printCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "printCustomerReceipt");
            Boolean previewMerchantReceipt = DataTypeUtils.getBooleanSafe(request, "previewMerchantReceipt");
            Boolean previewCustomerReceipt = DataTypeUtils.getBooleanSafe(request, "previewCustomerReceipt");

            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doConsultPix(printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt);

        } catch (Exception e) {
            Log.e("errorConsultPix", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void synchronize(Promise promise) {
        try {
            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doSincronize();

        } catch (Exception e) {
            Log.e("errorSync", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }

    @ReactMethod
    public void getReport(ReadableMap request, Promise promise) {
        try {

            String reportType = DataTypeUtils.getStringSafe(request, "reportType");
            String startDate = DataTypeUtils.getStringSafe(request, "startDate");
            String endDate = DataTypeUtils.getStringSafe(request, "endDate");

            PixServices pixServices = new PixServices(this.getReactApplicationContext(), promise);
            pixServices.doGetReport(startDate, endDate, reportType);

        } catch (Exception e) {
            Log.e("getReport", e.toString());
            promise.reject(ErrorLog, e.getMessage());
        }
    }
}