package com.phoebus.appdemo.controller;


import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.util.Log;

import com.phoebus.appdemo.model.TerminalInfo;

import br.com.phoebus.android.payments.api.provider.TerminalInfoContract;

public class TerminalInfoController {
    private Context context;

    static final String TAG = "TerminalInfo";

    public TerminalInfoController(Context context) {
        this.context = context;
    }

    public TerminalInfo getTerminalInfo() {
        TerminalInfo terminalInfo = new TerminalInfo();
        Uri.Builder uriBuilder = TerminalInfoContract.getUriBuilder();
        ContentResolver resolver = context.getContentResolver();
        try  {
        Cursor query = resolver.query(uriBuilder.build(), null, null, null, null);
        if (query != null && query.moveToFirst()) {
            terminalInfo.setMerchantId(query.getString(query.getColumnIndex(TerminalInfoContract.column.MERCHANT_ID)));
            terminalInfo.setMerchantName(query.getString(query.getColumnIndex(TerminalInfoContract.column.MERCHANT_NAME)));
            terminalInfo.setMerchantCommercialName(query.getString(query.getColumnIndex(TerminalInfoContract.column.MERCHANT_COMMERCIAL_NAME)));
            terminalInfo.setMerchantNationalId(query.getString(query.getColumnIndex(TerminalInfoContract.column.NATIONAL_ID)));
            terminalInfo.setTerminalId(query.getString(query.getColumnIndex(TerminalInfoContract.column.TERMINAL_ID)));
            terminalInfo.setMcPostalCode(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC_POSTAL_CODE)));
            terminalInfo.setMcStreet(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC_STREET)));
            terminalInfo.setMcCity(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC_CITY)));
            terminalInfo.setMcState(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC_STATE)));
            terminalInfo.setMcStateAbbreviation(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC_STATE_ABBREVIATION)));
            terminalInfo.setMcCountry(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC_COUNTRY)));
            terminalInfo.setMcComplement(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC_COMPLEMENT)));
            terminalInfo.setMcNeighbourhood(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC_NEIGHBOURHOOD)));
            terminalInfo.setMcAddressNumber(query.getString(query.getColumnIndex(TerminalInfoContract.column.MC_ADDRESS_NUMBER)));
            query.close();
        }
        } catch (Exception e) {
            Log.e(TAG, "Falha na consulta dos dados do terminal.", e );
        }
        return terminalInfo;
    }

}
