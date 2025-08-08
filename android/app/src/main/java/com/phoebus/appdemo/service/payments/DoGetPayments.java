package com.phoebus.appdemo.service.payments;

import android.content.Intent;
import android.database.Cursor;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.phoebus.appdemo.controller.eventEmitter.payments.EventFindPayments;
import com.phoebus.appdemo.model.payments.PaymentsV2Parcel;
import com.phoebus.appdemo.utils.Constants;
import com.phoebus.appdemo.utils.CredentialsUtils;
import com.phoebus.appdemo.utils.DataTypeUtils;

import org.parceler.Parcels;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

import javax.annotation.Nullable;

import br.com.phoebus.android.payments.api.PaymentStatus;
import br.com.phoebus.android.payments.api.PaymentV2;
import br.com.phoebus.android.payments.api.provider.PaymentContract;
import br.com.phoebus.android.payments.api.provider.PaymentProviderRequest;

public class DoGetPayments implements OnBindConnectedPaymentService {
    private final ReactContext context;
    private final Promise promise;
    private final ReadableMap request;

    public DoGetPayments(ReactContext context, ReadableMap request, Promise promise) {
        this.context = context;
        this.promise = promise;
        this.request = request;
    }


    @Override
    public void execute() {

        PaymentProviderRequest providerRequest = new PaymentProviderRequest(CredentialsUtils.getMyAppInfo(), new Date());
        addRequestToProviderRequest(providerRequest);

        //Campos que serão retornados na requisição:
        String[] columns = new String[]{
                PaymentContract.column.ID,
                PaymentContract.column.VALUE,
                PaymentContract.column.ACQUIRER_ID,
                PaymentContract.column.ACQUIRER_NAME,
                PaymentContract.column.ACQUIRER_AUTHORIZATION_NUMBER,
                PaymentContract.column.ACQUIRER_RESPONSE_CODE,
                PaymentContract.column.ACQUIRER_RESPONSE_DATE,
                PaymentContract.column.CAPTURE_TYPE,
                PaymentContract.column.PAYMENT_STATUS,
                PaymentContract.column.PAYMENT_TYPE,
                PaymentContract.column.PAYMENT_DATE,
                PaymentContract.column.CARD_BRAND,
                PaymentContract.column.APP_TRANSACTION_ID,
                PaymentContract.column.CARD_PAN_LAST_4_DIGITS,
                PaymentContract.column.INSTALLMENTS,
                PaymentContract.column.RECEIPT_CLIENT,
                PaymentContract.column.RECEIPT_MERCHANT,
                PaymentContract.column.TICKET_NUMBER,
                PaymentContract.column.TERMINAL_ID,
                PaymentContract.column.NSU_TERMINAL
        };

        providerRequest.setColumns(columns);

        Cursor cursor = context.getContentResolver().query(providerRequest.getUriBuilder().build(), columns, null, null, null);
        List<PaymentV2> payments = PaymentV2.fromCursorV2(cursor);

        Log.d(Constants.TAG, "Número de Pagamentos encontrados: " + payments.size());

        PaymentsV2Parcel paymentsV2Parcel = new PaymentsV2Parcel();
        List<PaymentsV2Parcel> listPaymentsV2Parcel = paymentsV2Parcel.getPaymentsV2Parcel(payments);

        Intent newIntent = new Intent(context, EventFindPayments.class);
        newIntent.putExtra("payments", Parcels.wrap(listPaymentsV2Parcel));
        newIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(newIntent);

    }

    private void addRequestToProviderRequest(PaymentProviderRequest providerRequest) {
        try {

            //Lista de Status
            ReadableArray status = DataTypeUtils.getArraySafe(request, "status");

            if (status != null) {
                List<PaymentStatus> paymentStatus = new ArrayList<>();
                for (int i = 0; i < status.size(); i++) {
                    String statusItem = status.getString(i);
                    PaymentStatus paymentStatusItem = PaymentStatus.valueOf(statusItem);
                    paymentStatus.add(paymentStatusItem);
                }
                if(!paymentStatus.isEmpty()){
                    providerRequest.setStatus(paymentStatus);
                }
            }

            //PaymentId
            String paymentId = DataTypeUtils.getStringSafe(request, "paymentId");

            if (paymentId != null) {
                providerRequest.setPaymentId(paymentId);
            }

            //Ultimos digitos do cartão
            String last4Digits = DataTypeUtils.getStringSafe(request, "lastDigits");

            if (last4Digits != null) {
                providerRequest.setLastDigits(last4Digits);
            }

            //AppTransactionId
            String appTransactionId = DataTypeUtils.getStringSafe(request, "appTransactionId");

            if (appTransactionId != null) {
                providerRequest.setAppTransactionId(appTransactionId);
            }


            //Data Inicial
            String startDate = DataTypeUtils.getStringSafe(request, "startDate");

            if (startDate != null) {
                Date startDateParsed = parseUtcToDate(startDate);
                if (startDateParsed != null) {
                    providerRequest.setStartDate(startDateParsed);
                }
            }

            //Data Final
            String finishDate = DataTypeUtils.getStringSafe(request, "finishDate");

            if (finishDate != null) {
                Date finishDateParsed = parseUtcToDate(finishDate);
                if (finishDateParsed != null) {
                    providerRequest.setStartDate(finishDateParsed);
                }
            }

        } catch (Exception e) {
            Log.e(Constants.TAG, "Requisição inválida", e);
            promise.reject(Constants.TAG, "Requisição inválida", e);
        }

    }

    private Date parseUtcToDate(String requestDate) {
        try {
            SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS", Locale.getDefault());
            isoFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
            return isoFormat.parse(requestDate);
        } catch (Exception e) {
            Log.e(Constants.TAG, "Data inválida", e);
            return null;
        }
    }

}
