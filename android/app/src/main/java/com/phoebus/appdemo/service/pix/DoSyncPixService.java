package com.phoebus.appdemo.service.pix;

import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.google.gson.Gson;
import com.phoebus.appdemo.model.pix.PixErrorResponse;
import com.phoebus.appdemo.utils.Constants;
import com.phoebus.pix.sdk.PixClient;

public class DoSyncPixService implements OnBindConnectedPixServices {

    private final Promise promise;
    private final PixClient mPixClient;

    public DoSyncPixService(PixClient pixClient, Promise promise){
        this.mPixClient = pixClient;
        this.promise = promise;
    }

    @Override
    public void execute() {
        Gson gson = new Gson();
        if(mPixClient.isBound()){
            try {
                mPixClient.synchronize(new  PixClient.SyncDataCallback (){
                    @Override
                    public void onSuccess(@Nullable String pixDataResponse) {
                        promise.resolve(pixDataResponse);
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


}
