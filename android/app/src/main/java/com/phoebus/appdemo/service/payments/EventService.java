package com.phoebus.appdemo.service.payments;

import android.app.Notification;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.phoebus.appdemo.R;
import androidx.core.app.NotificationCompat;

import com.phoebus.appdemo.utils.Constants;

import javax.annotation.Nullable;

public class EventService extends Service {

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        Log.d(Constants.TAG, "[IN] Event Service");
        showNotification();

        Bundle bundle = intent != null ? intent.getExtras() : null;
        String payment = bundle != null ? bundle.getString("payment") : null;

        if (payment == null) {
            Log.e(Constants.TAG, "Payment data is null.");
            stopSelf();
            return START_NOT_STICKY;
        }

        ReactApplication application = (ReactApplication) getApplication();
        ReactInstanceManager reactInstanceManager = application.getReactNativeHost().getReactInstanceManager();
        ReactContext reactContext = reactInstanceManager.getCurrentReactContext();

        if (reactContext != null) {
            Log.d(Constants.TAG, "Contexto Válido");
            sendEvent(reactContext, "onPayment", payment);
            stopSelf();
        } else {
            Log.d(Constants.TAG, "Contexto Inválido");
            reactInstanceManager.addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
                @Override
                public void onReactContextInitialized(ReactContext context) {
                    sendEvent(context, "onPayment", payment);
                    stopSelf();
                    reactInstanceManager.removeReactInstanceEventListener(this);
                }
            });

            if (!reactInstanceManager.hasStartedCreatingInitialContext()) {
                try {
                    reactInstanceManager.createReactContextInBackground();
                } catch (Exception e) {
                    Log.e(Constants.TAG, "Error creating ReactContext", e);
                    stopSelf();
                }
            }
        }
        stopSelf();
        return START_STICKY;
    }

    private void showNotification(){
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
            Notification notification = new NotificationCompat.Builder(this, Constants.NOTIFICATION_CHANNEL_ID)
                    .setContentTitle(getApplicationContext().getString(R.string.notify_broadcast_service_processing_payment))
                    .setSmallIcon(R.mipmap.ic_launcher_round)
                    .build();
            startForeground(1, notification);
        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable String params) {
        Log.d(Constants.TAG, "Chamando evento " + eventName);
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
