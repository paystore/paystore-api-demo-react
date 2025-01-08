package com.phoebus.appdemo.model.pix;

import com.google.gson.annotations.SerializedName;

public class PixCobResponse {
    @SerializedName("cob_value")
    public String cobValue;
    @SerializedName("status")
    public String status;
    @SerializedName("tx_id")
    public String txID;
}
