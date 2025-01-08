package com.phoebus.appdemo.service.pix;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.google.gson.Gson;
import com.phoebus.appdemo.controller.eventEmitter.pix.SendEventPixConsult;
import com.phoebus.appdemo.model.pix.ConsultCobByTxIdRequest;
import com.phoebus.appdemo.model.pix.PixCobResponse;
import com.phoebus.appdemo.model.pix.PixErrorResponse;
import com.phoebus.appdemo.utils.Constants;
import com.phoebus.pix.sdk.PixClient;

public class DoPixConsultByTxIdService implements OnBindConnectedPixServices {

    private final Promise promise;
    private final PixClient mPixClient;
    private final Context mContext;
    private final Boolean printMerchantReceipt;
    private final Boolean printCustomerReceipt;
    private final String txId;

    public DoPixConsultByTxIdService(ReactContext context, PixClient pixClient, String txId, Boolean printMerchantReceipt, Boolean printCustomerReceipt, Promise promise){
        this.mPixClient = pixClient;
        this.printCustomerReceipt = printCustomerReceipt;
        this.printMerchantReceipt = printMerchantReceipt;
        this.promise = promise;
        this.mContext = context;
        this.txId = txId;
    }

    @Override
    public void execute() {
        Gson gson = new Gson();
        if(mPixClient.isBound() && !txId.isEmpty()){
            ConsultCobByTxIdRequest consultCobByTxIdRequest = new ConsultCobByTxIdRequest();
            consultCobByTxIdRequest.txId = txId;
            consultCobByTxIdRequest.printCustomerReceipt = printCustomerReceipt;
            consultCobByTxIdRequest.printMerchantReceipt = printMerchantReceipt;
                try {
                    mPixClient.consultByTxId(gson.toJson(consultCobByTxIdRequest, ConsultCobByTxIdRequest.class),  new  PixClient.ConsultByTxIdCallback (){
                        @Override
                        public void onSuccess(@Nullable String pixDataResponse) {
                            if(pixDataResponse != null){
                                PixCobResponse pixCobResponse = gson.fromJson(pixDataResponse, PixCobResponse.class);
                                Bundle bundle = toBundle(pixCobResponse);
                                Intent newIntent = new Intent(mContext, SendEventPixConsult.class);
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
        bundle.putString("pixCob", pixPayment);
        return bundle;
    }


}
