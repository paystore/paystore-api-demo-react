package com.phoebus.appdemo.service.pix;

import android.os.Bundle;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.google.gson.Gson;
import com.phoebus.appdemo.model.pix.GetReportsRequest;
import com.phoebus.appdemo.model.pix.PixCobResponse;
import com.phoebus.appdemo.model.pix.PixErrorResponse;
import com.phoebus.appdemo.utils.Constants;
import com.phoebus.phastpay.sdk.client.PixClient;

public class DoPixGetReportService implements OnBindConnectedPixServices {

    private final Promise promise;
    private final PixClient mPixClient;
    private final String startDate;
    private final String endDate;
    private final String reportType;

    public DoPixGetReportService(PixClient pixClient, String startDate, String endDate, @Nullable String reportType, Promise promise) {
        this.mPixClient = pixClient;
        this.promise = promise;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reportType = reportType;
    }


    @Override
    public void execute() {
        Gson gson = new Gson();
        if (mPixClient.isBound()) {
            try {
                GetReportsRequest getReportsRequest = new GetReportsRequest();
                getReportsRequest.startDate = this.startDate;
                getReportsRequest.endDate = this.endDate;
                getReportsRequest.reportType = this.reportType;
                String request = gson.toJson(getReportsRequest, GetReportsRequest.class);
                Log.d("APP DEMO", "Request: " + request);
                mPixClient.getReports(request, new PixClient.GetReportsCallback() {
                    @Override
                    public void onSuccess(@Nullable String pixDataResponse) {
                        promise.resolve(pixDataResponse);
                    }

                    @Override
                    public void onError(@Nullable String errorData) {
                        if (errorData != null) {
                            PixErrorResponse pixErrorResponse = gson.fromJson(errorData, PixErrorResponse.class);
                            Log.e("Error", pixErrorResponse.errorMessage);
                            promise.reject(Constants.ERROR, pixErrorResponse.errorMessage);
                        } else {
                            Log.e("Error", "");
                            promise.reject(Constants.ERROR, "");
                        }
                        unBind();
                    }
                });

            } catch (Exception e) {
                promise.reject("ERROR", e.getMessage());
                unBind();
            }
        }

    }

    private void unBind() {
        if (mPixClient.isBound()) {
            mPixClient.unbind();
        }
    }

    private Bundle toBundle(PixCobResponse pixCobResponse) {
        Gson gson = new Gson();
        Bundle bundle = new Bundle();
        String pixPayment = gson.toJson(pixCobResponse);
        bundle.putString("pixCob", pixPayment);
        return bundle;
    }

}
