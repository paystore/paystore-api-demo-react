package com.phoebus.appdemo.model.pix;

import com.google.gson.annotations.SerializedName;

public class ConsultCobByTxIdRequest {
    @SerializedName("tx_id")
    public String txId;
    @SerializedName("print_customer_receipt")
    public Boolean printCustomerReceipt;
    @SerializedName("print_merchant_receipt")
    public Boolean printMerchantReceipt;
    @SerializedName("preview_customer_receipt")
    public Boolean previewCustomerReceipt;
    @SerializedName("preview_merchant_receipt")
    public Boolean previewMerchantReceipt;
}
