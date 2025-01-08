package com.phoebus.appdemo.service.pix;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.google.gson.Gson;
import com.phoebus.appdemo.controller.eventEmitter.pix.SendEventPixPayment;
import com.phoebus.appdemo.model.pix.CreateCobRequest;
import com.phoebus.appdemo.model.pix.PixCobResponse;
import com.phoebus.appdemo.model.pix.PixErrorResponse;
import com.phoebus.appdemo.utils.Constants;
import com.phoebus.pix.sdk.PixClient;

public class DoPixCreateCobService implements OnBindConnectedPixServices{
    private final PixClient mPixClient;
    private final Promise promise;
    private final ReactContext mContext;

    private final String value;
    private final String pixClientId;
    private final Boolean printMerchantReceipt;
    private final Boolean printCustomerReceipt;

    public DoPixCreateCobService(ReactContext context, PixClient pixClient, String value, String pixClientId, Boolean printMerchantReceipt, Boolean printCustomerReceipt, Promise promise){
        this.mPixClient = pixClient;
        this.value = value;
        this.pixClientId = pixClientId;
        this.printCustomerReceipt = printCustomerReceipt;
        this.printMerchantReceipt = printMerchantReceipt;
        this.promise = promise;
        this.mContext = context;
    }

    @Override
    public void execute() {
        if (mPixClient.isBound()) {
            Gson gson = new Gson();
            CreateCobRequest createCobRequest = new CreateCobRequest();
            //Caso o valor venha vazio, não adicionar na requisição
            if(!value.isEmpty()){
                createCobRequest.cobValue = value;
            }           
            createCobRequest.pixClientId = pixClientId;
            createCobRequest.printMerchantReceipt = printMerchantReceipt;
            createCobRequest.printCustomerReceipt = printCustomerReceipt;

            try{
                mPixClient.startPixPayment( gson.toJson(createCobRequest), new PixClient.StartPixPaymentCallback() {
                    @Override
                    public void onSuccess(@Nullable String pixDataResponse) {
                        if(pixDataResponse != null){
                            PixCobResponse pixCobResponse = gson.fromJson(pixDataResponse, PixCobResponse.class);
                            Bundle bundle = toBundle(pixCobResponse);
                            Intent newIntent = new Intent(mContext, SendEventPixPayment.class);
                            newIntent.putExtras(bundle);
                            newIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            mContext.startActivity(newIntent);
                            unBind();
                        }
                    }

                    @Override
                    public void onError(@Nullable String errorData) {
                        if(errorData != null){
                            PixErrorResponse pixErrorResponse = gson.fromJson(errorData, PixErrorResponse.class);
                            Log.e("Error", pixErrorResponse.errorMessage);
                            promise.reject(Constants.ERROR, pixErrorResponse.errorMessage);
                        }else{
                            Log.e("Error", "");
                            promise.reject(Constants.ERROR, "");
                        }
                        unBind();
                    }
                });
            } catch (Exception e){
                promise.reject("ERROR", e.getMessage());
                unBind();
            }

        }
    }

    private void unBind() {
        if (mPixClient.isBound())
        {
            mPixClient.unbind();
        }
    }

    private Bundle toBundle(PixCobResponse pixCobResponse){
        Gson gson = new Gson();
        Bundle bundle = new Bundle();
        String pixPayment = gson.toJson(pixCobResponse);
        bundle.putString("pixPayment", pixPayment);
        return bundle;
    }
}
