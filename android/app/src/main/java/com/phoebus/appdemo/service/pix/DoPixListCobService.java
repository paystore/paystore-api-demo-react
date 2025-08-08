package com.phoebus.appdemo.service.pix;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.google.gson.Gson;
import com.phoebus.appdemo.controller.eventEmitter.pix.SendEventPixList;
import com.phoebus.appdemo.model.pix.ListCobRequest;
import com.phoebus.appdemo.model.pix.Pix;
import com.phoebus.appdemo.model.pix.PixErrorResponse;
import com.phoebus.appdemo.model.pix.PixStatus;
import com.phoebus.appdemo.utils.Constants;
import com.phoebus.phastpay.sdk.client.PixClient;

import java.util.Date;
import java.util.List;

public class DoPixListCobService implements OnBindConnectedPixServices {
    private final PixClient mPixClient;
    private final Promise promise;
    private final ReactContext mContext;

    private final String value;
    private final Date startDate;
    private final Date finishDate;
    private final List<PixStatus> statusPixList;

    public DoPixListCobService(ReactContext context, PixClient pixClient, Date startDate, Date finishDate, List<PixStatus> statusPixList, @Nullable String value, Promise promise) {
        this.mContext = context;
        this.mPixClient = pixClient;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.statusPixList = statusPixList;
        this.value = value;
        this.promise = promise;
    }


    public void execute() {
        if (mPixClient.isBound()) {
            Gson gson = new Gson();
            ListCobRequest listCobRequest = new ListCobRequest();
            listCobRequest.startDate = startDate;
            listCobRequest.endDate = finishDate;
            if (value != null && !value.isEmpty()) {
                listCobRequest.value = value;
            }
            if (!statusPixList.isEmpty()) {
                listCobRequest.status = statusPixList;
            }

            try {
                mPixClient.listPixPayment(gson.toJson(listCobRequest), new PixClient.ListPixPaymentCallback() {
                    @Override
                    public void onSuccess(@Nullable String pixDataResponse) {
                        if (pixDataResponse != null) {
                            Pix pix = gson.fromJson(pixDataResponse, Pix.class);
                            Bundle bundle = toBundle(pix);
                            Intent newIntent = new Intent(mContext, SendEventPixList.class);
                            newIntent.putExtras(bundle);
                            newIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            mContext.startActivity(newIntent);
                            unBind();
                        }
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

    private Bundle toBundle(Pix pix) {
        Gson gson = new Gson();
        Bundle bundle = new Bundle();
        String pixPayment = gson.toJson(pix.pix);
        bundle.putString("pixList", pixPayment);
        return bundle;
    }
}
