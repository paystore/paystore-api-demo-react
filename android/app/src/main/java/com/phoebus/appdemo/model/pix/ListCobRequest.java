package com.phoebus.appdemo.model.pix;

import com.google.gson.annotations.SerializedName;

import java.util.Date;
import java.util.List;

public class ListCobRequest {
    @SerializedName("start_date")
    public Date startDate;
    @SerializedName("end_date")
    public Date endDate;
    @SerializedName("status")
    public List<PixStatus> status;
    @SerializedName("value")
    public String value;
}
