package com.phoebus.appdemo.service.pix;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.phoebus.appdemo.model.pix.PixStatus;
import com.phoebus.phastpay.sdk.client.PixClient;

import java.util.Date;
import java.util.List;

import javax.annotation.Nullable;

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

    public boolean isPixInstalled() {
        return pixClient.isAppPixInstalled();
    }

    public void doPixPayment(@Nullable String value, String pixClientId, @Nullable Boolean printMerchantReceipt, @Nullable Boolean printCustomerReceipt, @Nullable Boolean previewMerchantReceipt, @Nullable Boolean previewCustomerReceipt) {
        OnBindConnectedPixServices doPixPayment = new DoPixCreateCobService(context, pixClient, value, pixClientId, printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt, promise);
        setOnBindConnectedPixPaymentService(doPixPayment);
        doBind();
    }

    public void doListPixPayment(Date startDate, Date finishDate, List<PixStatus> statusPixList, @Nullable String value) {
        OnBindConnectedPixServices doListPix = new DoPixListCobService(context, pixClient, startDate, finishDate, statusPixList, value, promise);
        setOnBindConnectedPixPaymentService(doListPix);
        doBind();
    }

    public void doRefundPixPayment(String txId, @Nullable Boolean printMerchantReceipt, @Nullable Boolean printCustomerReceipt, @Nullable Boolean previewMerchantReceipt, @Nullable Boolean previewCustomerReceipt) {
        OnBindConnectedPixServices doRefundPix = new DoPixRefundCobByTxIdService(context, pixClient, txId, printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt, promise);
        setOnBindConnectedPixPaymentService(doRefundPix);
        doBind();
    }

    public void doRefundPix(@Nullable Boolean printMerchantReceipt, @Nullable Boolean printCustomerReceipt, @Nullable Boolean previewMerchantReceipt, @Nullable Boolean previewCustomerReceipt) {
        OnBindConnectedPixServices doRefundPix = new DoPixRefundService(context, pixClient, printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt, promise);
        setOnBindConnectedPixPaymentService(doRefundPix);
        doBind();
    }

    public void doConsultPixByTxId(String txId, @Nullable Boolean printMerchantReceipt, @Nullable Boolean printCustomerReceipt, @Nullable Boolean previewMerchantReceipt, @Nullable Boolean previewCustomerReceipt) {
        OnBindConnectedPixServices doConsultPix = new DoPixConsultByTxIdService(context, pixClient, txId, printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt, promise);
        setOnBindConnectedPixPaymentService(doConsultPix);
        doBind();
    }

    public void doConsultPixByClientId(String clientId) {
        OnBindConnectedPixServices doConsultPix = new DoPixConsultByClientIdService(context, pixClient, clientId, promise);
        setOnBindConnectedPixPaymentService(doConsultPix);
        doBind();
    }

    public void doConsultPix(@Nullable Boolean printMerchantReceipt, @Nullable Boolean printCustomerReceipt, @Nullable Boolean previewMerchantReceipt, @Nullable Boolean previewCustomerReceipt) {
        OnBindConnectedPixServices doConsultPix = new DoPixConsultService(context, pixClient, printMerchantReceipt, printCustomerReceipt, previewMerchantReceipt, previewCustomerReceipt, promise);
        setOnBindConnectedPixPaymentService(doConsultPix);
        doBind();
    }

    public void doGetReport(String startDate, String endDate, @Nullable String reportType) {
        OnBindConnectedPixServices doGetReport = new DoPixGetReportService(pixClient, startDate, endDate, reportType, promise);
        setOnBindConnectedPixPaymentService(doGetReport);
        doBind();
    }

    public void doSincronize() {
        OnBindConnectedPixServices doSync = new DoSyncPixService(pixClient, promise);
        setOnBindConnectedPixPaymentService(doSync);
        doBind();
    }

    public void setOnBindConnectedPixPaymentService(OnBindConnectedPixServices onBindConnectedPixService) {
        this.onBindConnectedPixService = onBindConnectedPixService;
    }
}
