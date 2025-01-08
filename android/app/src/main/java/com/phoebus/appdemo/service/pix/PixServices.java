package com.phoebus.appdemo.service.pix;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.phoebus.appdemo.model.pix.PixStatus;
import com.phoebus.pix.sdk.PixClient;

import java.util.Date;
import java.util.List;

public class PixServices {
    private final PixClient pixClient;
    private OnBindConnectedPixServices onBindConnectedPixService;
    private final ReactContext context;
    private final Promise promise;

    public PixServices(ReactContext context, Promise promise) {
        this.context = context;
        this.promise = promise;
        this.pixClient = new PixClient(context);
    }

    private void doBind() {
        this.pixClient.bind(new PixClient.BindCallback() {
            @Override
            public void onServiceDisconnected() {
                Log.i("onDisconnected", "Desconectado");
            }

            @Override
            public void onServiceConnected() {
                Log.i("OnConnected", "Conectado");
                onBindConnectedPixService.execute();
            }
        });
    }

    public boolean isPixInstalled(){
        return pixClient.isAppPixInstalled();
    }

    public void doPixPayment(String value, String pixClientId, Boolean printMerchantReceipt, Boolean printCustomerReceipt) {
        OnBindConnectedPixServices doPixPayment = new DoPixCreateCobService(context, pixClient, value, pixClientId, printMerchantReceipt, printCustomerReceipt, promise );
        setOnBindConnectedPixPaymentService(doPixPayment);
        doBind();
    }

    public void doListPixPayment(Date startDate, Date finishDate, List<PixStatus> statusPixList, String value){
        OnBindConnectedPixServices doListPix = new DoPixListCobService(context, pixClient, startDate, finishDate, statusPixList, value, promise);
        setOnBindConnectedPixPaymentService(doListPix);
        doBind();
    }

    public void doRefundPixPayment(String txId, Boolean printMerchantReceipt, Boolean printCustomerReceipt){
        OnBindConnectedPixServices doRefundPix = new DoPixRefundCobByTxIdService(context, pixClient, txId, printMerchantReceipt, printCustomerReceipt, promise);
        setOnBindConnectedPixPaymentService(doRefundPix);
        doBind();
    }

    public void doRefundPix(Boolean printMerchantReceipt, Boolean printCustomerReceipt){
        OnBindConnectedPixServices doRefundPix = new DoPixRefundService(context, pixClient, printMerchantReceipt, printCustomerReceipt, promise);
        setOnBindConnectedPixPaymentService(doRefundPix);
        doBind();
    }

    public void doConsultPixByTxId(String txId, Boolean printMerchantReceipt, Boolean printCustomerReceipt){
        OnBindConnectedPixServices doConsultPix = new DoPixConsultByTxIdService(context, pixClient, txId, printMerchantReceipt, printCustomerReceipt, promise);
        setOnBindConnectedPixPaymentService(doConsultPix);
        doBind();
    }

    public void doConsultPixByClientId(String clientId){
        OnBindConnectedPixServices doConsultPix = new DoPixConsultByClientIdService(context, pixClient, clientId, promise);
        setOnBindConnectedPixPaymentService(doConsultPix);
        doBind();
    }

    public void doConsultPix(Boolean printMerchantReceipt, Boolean printCustomerReceipt){
        OnBindConnectedPixServices doConsultPix = new DoPixConsultService(context, pixClient, printMerchantReceipt, printCustomerReceipt, promise);
        setOnBindConnectedPixPaymentService(doConsultPix);
        doBind();
    }

    public void doSincronize(){
        OnBindConnectedPixServices doSync = new DoSyncPixService(pixClient, promise);
        setOnBindConnectedPixPaymentService(doSync);
        doBind();
    }

    public void setOnBindConnectedPixPaymentService(OnBindConnectedPixServices onBindConnectedPixService) {
        this.onBindConnectedPixService = onBindConnectedPixService;
    }
}
