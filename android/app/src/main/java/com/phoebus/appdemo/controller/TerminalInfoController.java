package com.phoebus.appdemo.controller;


import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.util.Log;

import com.phoebus.appdemo.model.TerminalInfo;
import com.phoebus.appdemo.utils.Constants;

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
            terminalInfo.setMerchantId(safeGetString(query, TerminalInfoContract.column.MERCHANT_ID ));
            terminalInfo.setMerchantName(safeGetString(query, TerminalInfoContract.column.MERCHANT_NAME));
            terminalInfo.setMerchantCommercialName(safeGetString(query, TerminalInfoContract.column.MERCHANT_COMMERCIAL_NAME));
            terminalInfo.setMerchantNationalId(safeGetString(query, TerminalInfoContract.column.NATIONAL_ID));
            terminalInfo.setTerminalId(safeGetString(query, TerminalInfoContract.column.TERMINAL_ID));
            terminalInfo.setMcPostalCode(safeGetString(query, TerminalInfoContract.column.MC_POSTAL_CODE));
            terminalInfo.setMcStreet(safeGetString(query, TerminalInfoContract.column.MC_STREET));
            terminalInfo.setMcCity(safeGetString(query, TerminalInfoContract.column.MC_CITY));
            terminalInfo.setMcState(safeGetString(query, TerminalInfoContract.column.MC_STATE));
            terminalInfo.setMcStateAbbreviation(safeGetString(query, TerminalInfoContract.column.MC_STATE_ABBREVIATION));
            terminalInfo.setMcCountry(safeGetString(query, TerminalInfoContract.column.MC_COUNTRY));
            terminalInfo.setMcComplement(safeGetString(query, TerminalInfoContract.column.MC_COMPLEMENT));
            terminalInfo.setMcNeighbourhood(safeGetString(query, TerminalInfoContract.column.MC_NEIGHBOURHOOD));
            terminalInfo.setMcAddressNumber(safeGetString(query, TerminalInfoContract.column.MC_ADDRESS_NUMBER));
            terminalInfo.setMcNationalType(safeGetString(query, TerminalInfoContract.column.MC_NATIONAL_TYPE ));
            terminalInfo.setCurrencyCode(safeGetString(query, TerminalInfoContract.column.TERMINAL_CURRENCY_CODE ));
            terminalInfo.setCurrencyISOString(safeGetString(query, TerminalInfoContract.column.TERMINAL_CURRENCY_ISO4217 ));
            terminalInfo.setMcCategoryCode(safeGetString(query,TerminalInfoContract.column.MC_CATEGORY_CODE ));
            terminalInfo.setSubAcquirerId(safeGetString(query, TerminalInfoContract.column.SUB_ACQUIRER_ID ));
            terminalInfo.setMcEmail(safeGetString(query, TerminalInfoContract.column.MC_EMAIL ));
            terminalInfo.setMcPhone(safeGetString(query, TerminalInfoContract.column.MC_PHONE ));
            terminalInfo.setMcWebSite(safeGetString(query, TerminalInfoContract.column.MC_WEB_SITE));
            query.close();
        }
        } catch (Exception e) {
            Log.e(TAG, "Falha na consulta dos dados do terminal.", e );
        }
        return terminalInfo;
    }

    //Função para evitar erros caso algum dos dados não existam.
    private String safeGetString(Cursor query, String column){
        try {
            return query.getString(query.getColumnIndexOrThrow(column));
        }catch(Exception e){
            Log.d(TAG,"Erro ao obter o campo: " + column);
            return "";
        }
    }

}
