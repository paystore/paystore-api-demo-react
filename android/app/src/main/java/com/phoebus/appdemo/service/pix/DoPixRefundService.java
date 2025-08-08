package com.phoebus.appdemo.service.pix;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.google.gson.Gson;
import com.phoebus.appdemo.controller.eventEmitter.pix.SendEventPixRefund;
import com.phoebus.appdemo.model.pix.PixCobResponse;
import com.phoebus.appdemo.model.pix.PixErrorResponse;
import com.phoebus.appdemo.model.pix.RefundCobRequest;
import com.phoebus.appdemo.utils.Constants;
import com.phoebus.phastpay.sdk.client.PixClient;

public class DoPixRefundService implements OnBindConnectedPixServices {

    private final Promise promise;
    private final PixClient mPixClient;
    private final ReactContext mContext;
    private final Boolean printMerchantReceipt;
    private final Boolean printCustomerReceipt;
    private final Boolean previewMerchantReceipt;
    private final Boolean previewCustomerReceipt;

    public DoPixRefundService(ReactContext context, PixClient pixClient, @Nullable Boolean printMerchantReceipt, @Nullable Boolean printCustomerReceipt, @Nullable Boolean previewMerchantReceipt, @Nullable Boolean previewCustomerReceipt, Promise promise) {
        this.mPixClient = pixClient;
        this.promise = promise;
        this.printCustomerReceipt = printCustomerReceipt;
        this.printMerchantReceipt = printMerchantReceipt;
        this.previewMerchantReceipt = previewMerchantReceipt;
        this.previewCustomerReceipt = previewCustomerReceipt;
        this.mContext = context;
    }


    @Override
    public void execute() {
        Gson gson = new Gson();
        if (mPixClient.isBound()) {
            try {
                RefundCobRequest refundCobRequest = new RefundCobRequest();
                refundCobRequest.printCustomerReceipt = printCustomerReceipt;
                refundCobRequest.printMerchantReceipt = printMerchantReceipt;
                refundCobRequest.previewCustomerReceipt = previewCustomerReceipt;
                refundCobRequest.previewMerchantReceipt = previewMerchantReceipt;
                mPixClient.refund(gson.toJson(refundCobRequest, RefundCobRequest.class), new PixClient.RefundCallback() {
                    @Override
                    public void onSuccess(@Nullable String pixDataResponse) {
                        if (pixDataResponse != null) {
                            PixCobResponse pixCobResponse = gson.fromJson(pixDataResponse, PixCobResponse.class);
                            Bundle bundle = toBundle(pixCobResponse);
                            Intent newIntent = new Intent(mContext, SendEventPixRefund.class);
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

    private Bundle toBundle(PixCobResponse pixCobResponse) {
        Gson gson = new Gson();
        Bundle bundle = new Bundle();
        String pixPayment = gson.toJson(pixCobResponse);
        bundle.putString("pixRefund", pixPayment);
        return bundle;
    }

}
