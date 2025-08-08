package com.phoebus.appdemo.model.pix;

import com.google.gson.annotations.SerializedName;

public class GetReportsRequest {
    @SerializedName("start_date")
    public String startDate;

    @SerializedName("end_date")
    public String endDate;

    @SerializedName("report_type")
    public String reportType;
}
