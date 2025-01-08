package com.phoebus.appdemo.model.pix;

import com.google.gson.annotations.SerializedName;

public class ConsultCobRequest {
    @SerializedName("print_customer_receipt")
    public Boolean printCustomerReceipt;
    @SerializedName("print_merchant_receipt")
    public Boolean printMerchantReceipt;
}
