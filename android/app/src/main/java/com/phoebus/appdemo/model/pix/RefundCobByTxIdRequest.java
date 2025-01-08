package com.phoebus.appdemo.model.pix;

import com.google.gson.annotations.SerializedName;

public class RefundCobByTxIdRequest {
    @SerializedName("tx_id")
    public String txId;
    @SerializedName("print_customer_receipt")
    public Boolean printCustomerReceipt;
    @SerializedName("print_merchant_receipt")
    public Boolean printMerchantReceipt;
}
