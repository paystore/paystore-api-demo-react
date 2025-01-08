package com.phoebus.appdemo.model.pix;

import com.google.gson.annotations.SerializedName;

public class ListPixResponse {
    @SerializedName("cob_value")
    public String cobValue;
    @SerializedName("pix_client_id")
    public String clientId;
    @SerializedName("status")
    public String status;
    @SerializedName("tx_id")
    public String txId;
    @SerializedName("date_time")
    public String pixDateTime;

}
