package com.phoebus.appdemo.model.pix;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Pix {
    @SerializedName("pix")
    public List<ListPixResponse> pix;
}
