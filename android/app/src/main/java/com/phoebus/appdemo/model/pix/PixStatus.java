package com.phoebus.appdemo.model.pix;

import com.google.gson.annotations.SerializedName;

public enum PixStatus {
    @SerializedName("ATIVA")
    ACTIVE("ATIVA"),
    @SerializedName("CONCLUIDA")
    CONCLUDED("CONCLUIDA"),
    @SerializedName("DEVOLVIDO")
    REFUNDED("DEVOLVIDO"),
    @SerializedName("EM_PROCESSAMENTO")
    REFUND_PROCESSING("EM_PROCESSAMENTO"),
    @SerializedName("NAO_REALIZADO")
    REFUND_NOT_DONE("NAO_REALIZADO"),
    @SerializedName("REMOVIDA_PELO_USUARIO_RECEBEDOR")
    REMOVED_BY_USER("REMOVIDA_PELO_USUARIO_RECEBEDOR"),
    @SerializedName("REMOVIDA_PELO_PSP")
    REMOVED_BY_PSP("REMOVIDA_PELO_PSP"),
    @SerializedName("EXPIRADA")
    EXPIRED("EXPIRADA"),
    UNKNOWN("UNKNOWN");

    private final String status;

    PixStatus(String status){
        this.status = status;
    }

    public String getStatus(){
        return status;
    }
}
