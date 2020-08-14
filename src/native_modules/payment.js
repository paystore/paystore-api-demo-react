import { NativeModules } from "react-native";

/**
 * @description Realiza um pagamento com a integração do app phoebus payments
 * @param {float}   value - Valor do Pagamento
 * @param {integer} transactionId - Identificador do pagamento
 * @param {boolean} showReceipt - flag indicando se deve ser impresso o comprovante
 * @param {integer} installments - quantidade de parcelas
 * @param {String}  email - email do cliente para a geraçâo do token
 * @param {String}  nationalDocument - cpf do cliente
 * @param {Payment.CREDIT, Payment.DEBIT, Payment.CREDIT_STORE, Payment.ADMIN} paymentType - tipo do pagamento
 */
module.exports = NativeModules.Payment;

