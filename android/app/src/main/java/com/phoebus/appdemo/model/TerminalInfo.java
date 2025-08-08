package com.phoebus.appdemo.model;
public class TerminalInfo {
    private String merchantId;
    private String merchantName;
    private String merchantCommercialName;
    private String merchantNationalId;
    private String terminalId;
    private String mcPostalCode;
    private String mcNationalType;
    private String mcCategoryCode;
    private String mcStreet;
    private String mcCity;
    private String mcState;
    private String mcStateAbbreviation;
    private String mcCountry;
    private String mcComplement;
    private String mcNeighbourhood;
    private String mcAddressNumber;
    private String currencyCode;
    private String currencyISOString;
    private String subAcquirerId;
    private String mcPhone;
    private String mcEmail;
    private String mcWebSite;


    public TerminalInfo() {
        // Construtor padrão
    }

    // Getters e Setters
    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName;
    }

    public String getMerchantCommercialName() {
        return merchantCommercialName;
    }

    public void setMerchantCommercialName(String merchantCommercialName) {
        this.merchantCommercialName = merchantCommercialName;
    }

    public String getMerchantNationalId() {
        return merchantNationalId;
    }

    public void setMerchantNationalId(String merchantNationalId) {
        this.merchantNationalId = merchantNationalId;
    }

    public String getTerminalId() {
        return terminalId;
    }

    public void setTerminalId(String terminalId) {
        this.terminalId = terminalId;
    }

    public String getMcPostalCode() {
        return mcPostalCode;
    }

    public void setMcPostalCode(String mcPostalCode) {
        this.mcPostalCode = mcPostalCode;
    }

    public String getMcStreet() {
        return mcStreet;
    }

    public void setMcStreet(String mcStreet) {
        this.mcStreet = mcStreet;
    }

    public String getMcCity() {
        return mcCity;
    }

    public void setMcCity(String mcCity) {
        this.mcCity = mcCity;
    }

    public String getMcState() {
        return mcState;
    }

    public void setMcState(String mcState) {
        this.mcState = mcState;
    }

    public String getMcStateAbbreviation() {
        return mcStateAbbreviation;
    }

    public void setMcStateAbbreviation(String mcStateAbbreviation) {
        this.mcStateAbbreviation = mcStateAbbreviation;
    }

    public String getMcCountry() {
        return mcCountry;
    }

    public void setMcCountry(String mcCountry) {
        this.mcCountry = mcCountry;
    }

    public String getMcComplement() {
        return mcComplement;
    }

    public void setMcComplement(String mcComplement) {
        this.mcComplement = mcComplement;
    }

    public String getMcNeighbourhood() {
        return mcNeighbourhood;
    }

    public void setMcNeighbourhood(String mcNeighbourhood) {
        this.mcNeighbourhood = mcNeighbourhood;
    }

    public String getMcAddressNumber() {
        return mcAddressNumber;
    }

    public void setMcAddressNumber(String mcAddressNumber) {
        this.mcAddressNumber = mcAddressNumber;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public void setCurrencyISOString(String currencyISOString) {
        this.currencyISOString = currencyISOString;
    }

    public void setSubAcquirerId(String subAcquirerId) {
        this.subAcquirerId = subAcquirerId;
    }

    public void setMcCategoryCode(String mcCategoryCode) {
        this.mcCategoryCode = mcCategoryCode;
    }

    public String getSubAcquirerId() {
        return subAcquirerId;
    }

    public String getCurrencyISOString() {
        return currencyISOString;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public String getMcCategoryCode() {
        return mcCategoryCode;
    }

    public String getMcNationalType() {
        return mcNationalType;
    }

    public void setMcNationalType(String mcNationalType) {
        this.mcNationalType = mcNationalType;
    }

    public String getMcPhone() {
        return mcPhone;
    }

    public void setMcPhone(String mcPhone) {
        this.mcPhone = mcPhone;
    }

    public String getMcEmail() {
        return mcEmail;
    }

    public void setMcEmail(String mcEmail) {
        this.mcEmail = mcEmail;
    }

    public String getMcWebSite() {
        return mcWebSite;
    }

    public void setMcWebSite(String mcWebSite) {
        this.mcWebSite = mcWebSite;
    }
}

