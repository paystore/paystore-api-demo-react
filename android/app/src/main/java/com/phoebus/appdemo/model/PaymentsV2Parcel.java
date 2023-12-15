package com.phoebus.appdemo.model;

import androidx.annotation.NonNull;

import org.parceler.Parcel;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import br.com.phoebus.android.payments.api.CaptureType;
import br.com.phoebus.android.payments.api.Card;
import br.com.phoebus.android.payments.api.PaymentStatus;
import br.com.phoebus.android.payments.api.PaymentType;
import br.com.phoebus.android.payments.api.PaymentV2;
import br.com.phoebus.android.payments.api.Receipt;

@Parcel(Parcel.Serialization.BEAN)
public class PaymentsV2Parcel {

    @NonNull
    private BigDecimal value;
    @NonNull
    private PaymentType paymentType;

    private Integer installments;
    @NonNull
    private String acquirer;
    @NonNull
    private String paymentId;
    @NonNull
    private Card card;
    @NonNull
    private CaptureType captureType;
    @NonNull
    private PaymentStatus paymentStatus;
    @NonNull
    private Date paymentDate;
    @NonNull
    private String acquirerId;
    @NonNull
    private String acquirerResponseCode;
    @NonNull
    private Date acquirerResponseDate;
    @NonNull
    private String acquirerAuthorizationNumber;

    private Receipt receipt;

    private String appTransactionId;

    public List<PaymentsV2Parcel> getPaymentsV2Parcel(List<PaymentV2> listPaymentsV2) {
        List<PaymentsV2Parcel> listPaymentsV2Parcel = new ArrayList<>();

        for(int i = 0; i < listPaymentsV2.size(); i++) {
            PaymentsV2Parcel paymentsV2Parcel = new PaymentsV2Parcel();

            PaymentV2 paymentV2 = listPaymentsV2.get(i);

            paymentsV2Parcel.setPaymentId(paymentV2.getPaymentId());
            paymentsV2Parcel.setCard(paymentV2.getCard());
            paymentsV2Parcel.setCaptureType(paymentV2.getCaptureType());
            paymentsV2Parcel.setPaymentStatus(paymentV2.getPaymentStatus());
            paymentsV2Parcel.setPaymentDate(paymentV2.getPaymentDate());
            paymentsV2Parcel.setAcquirerId(paymentV2.getAcquirerId());
            paymentsV2Parcel.setAcquirerResponseCode(paymentV2.getAcquirerResponseCode());
            paymentsV2Parcel.setAcquirerResponseDate(paymentV2.getAcquirerResponseDate());
            paymentsV2Parcel.setAcquirerAuthorizationNumber(paymentV2.getAcquirerAuthorizationNumber());
            paymentsV2Parcel.setReceipt(paymentV2.getReceipt());
            paymentsV2Parcel.setValue(paymentV2.getValue());
            paymentsV2Parcel.setPaymentType(paymentV2.getPaymentType());
            paymentsV2Parcel.setInstallments(paymentV2.getInstallments());
            paymentsV2Parcel.setAcquirer(paymentV2.getAcquirer());
            paymentsV2Parcel.setAppTransactionId(paymentV2.getAppTransactionId());

            listPaymentsV2Parcel.add(paymentsV2Parcel);
        }

        return listPaymentsV2Parcel;
    }

    @NonNull
    public BigDecimal getValue() {
        return value;
    }

    public void setValue(@NonNull BigDecimal value) {
        this.value = value;
    }

    @NonNull
    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(@NonNull PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public Integer getInstallments() {
        return installments;
    }

    public void setInstallments(Integer installments) {
        this.installments = installments;
    }

    @NonNull
    public String getAcquirer() {
        return acquirer;
    }

    public void setAcquirer(@NonNull String acquirer) {
        this.acquirer = acquirer;
    }

    @NonNull
    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(@NonNull String paymentId) {
        this.paymentId = paymentId;
    }

    @NonNull
    public Card getCard() {
        return card;
    }

    public void setCard(@NonNull Card card) {
        this.card = card;
    }

    @NonNull
    public CaptureType getCaptureType() {
        return captureType;
    }

    public void setCaptureType(@NonNull CaptureType captureType) {
        this.captureType = captureType;
    }

    @NonNull
    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(@NonNull PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    @NonNull
    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(@NonNull Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    @NonNull
    public String getAcquirerId() {
        return acquirerId;
    }

    public void setAcquirerId(@NonNull String acquirerId) {
        this.acquirerId = acquirerId;
    }

    @NonNull
    public String getAcquirerResponseCode() {
        return acquirerResponseCode;
    }

    public void setAcquirerResponseCode(@NonNull String acquirerResponseCode) {
        this.acquirerResponseCode = acquirerResponseCode;
    }

    @NonNull
    public Date getAcquirerResponseDate() {
        return acquirerResponseDate;
    }

    public void setAcquirerResponseDate(@NonNull Date acquirerResponseDate) {
        this.acquirerResponseDate = acquirerResponseDate;
    }

    @NonNull
    public String getAcquirerAuthorizationNumber() {
        return acquirerAuthorizationNumber;
    }

    public void setAcquirerAuthorizationNumber(@NonNull String acquirerAuthorizationNumber) {
        this.acquirerAuthorizationNumber = acquirerAuthorizationNumber;
    }

    public Receipt getReceipt() {
        return receipt;
    }

    public void setReceipt(Receipt receipt) {
        this.receipt = receipt;
    }

    public String getAppTransactionId() {
        return appTransactionId;
    }

    public void setAppTransactionId(String appTransactionId) {
        this.appTransactionId = appTransactionId;
    }

}
