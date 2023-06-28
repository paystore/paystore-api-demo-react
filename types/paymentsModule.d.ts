import 'react-native';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

export type PaymentTypes =
  | 'CREDIT'
  | 'DEBIT'
  | 'CREDIT_STORE'
  | 'ADMIN'
  | 'CREDIT_ADMIN'
  | 'VOUCHER'
  | 'DEBIT'
  | 'PRE_AUTHORIZATION'
  | 'PRE_AUTHORIZATION_CONFIRMATION';

export interface PaymentsInterface {
  startPayment: (
    //Valor do pagamento em float "0,00"
    value: String,
    //Identificador do pagamento
    transactionId: String,
    //flag indicando se deve ser impresso o comprovante
    showReceipt: Boolean,
    //Tipo do pagamento
    paymentType: PaymentTypes[],
    //quantidade de parcelas
    installments: Int32
  ) => Promise<void>;
}

declare module 'react-native' {
  interface NativeModulesStatic {
    Payment: PaymentsInterface;
  }
}
