package com.phoebus.appdemo.model.pix;

import com.google.gson.annotations.SerializedName;

public class CreateCobRequest {
    @SerializedName("cob_value")
    public String cobValue;
    @SerializedName("pix_client_id")
    public String pixClientId;
    @SerializedName("print_customer_receipt")
    public Boolean printCustomerReceipt;
    @SerializedName("print_merchant_receipt")
    public Boolean printMerchantReceipt;
}
