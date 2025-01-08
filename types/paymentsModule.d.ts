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

export type PaymentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'REVERSED'
  | 'PROCESSING'
  | 'DENIED'
  | 'UNREACHABLE'
  | 'WAITING_VALIDATION'
  | 'WAITING_CAPTURE'
  | 'REFUNDED_DEVOLUTION'
  | 'REFUNDED'
  | 'APPROVED';

type CaptureType =
  | 'MANUAL'
  | 'MAGNETIC_STRIP'
  | 'CHIP'
  | 'FALLBACK_MANUAL'
  | 'FALLBACK_MAGNETIC_STRIP'
  | 'CHIP_CONTACTLESS'
  | 'MAGNETIC_STRIP_CONTACTLESS'
  | 'QR_CODE';

type Card = {
  bin: string;
  brand: string;
  panLast4Digits: string;
};

type Receipts = {
  clientVia: string;
  merchantVia: string;
};
export interface PaymentResult {
  acquirer: string;
  acquirerAuthorizationNumber: string;
  acquirerId: string;
  acquirerNsu: string;
  acquirerResponseCode: string;
  acquirerResponseDate: string;
  captureType: CaptureType;
  card: Card;
  installments: number;
  paymentDate: string;
  paymentId: string;
  paymentStatus: PaymentStatus;
  appTransactionId: string;
  paymentType: PaymentTypes;
  receipt: Receipts;
  value: number;
}

export interface TerminalInfoResult {
  terminalId: string;
  merchantId: string;
  merchantName: string;
  merchantCommercialName: string;
  merchantNationalId: string;
  mcPostalCode: string;
  mcStreet: string;
  mcCity: string;
  mcState: string;
  mcStateAbbreviation: string;
  mcNeighbourhood: string;
  mcCountry: string;
  mcComplement: string;
  mcAddressNumber: string;
}

export interface PaymentsInterface {
  startPayment: (
    //Valor do pagamento em float "0,00"
    value: String,
    //Identificador da transação
    transactionId: String,
    //flag indicando se deve ser impresso o comprovante
    showReceipt: Boolean,
    //Tipo do pagamento
    paymentType: PaymentTypes[],
    //quantidade de parcelas
    installments: Int32,
    // Deve confirmar o pagamento automaticamente ou não.
    confirmPayment: Boolean
  ) => Promise<void>;
  listPayments: (status: PaymentStatus[]) => Promise<void>;
  startPaymentReversal: (
    //Valor para devolução
    value: string,
    //Identificador unico da transação
    transactionId: string,
    //Identificador do pagamento
    paymentId: string,
    //flag indicando se deve mostrar o comprovante
    showReceipt: Boolean,
    // Deve mostrar o comprovante do Estabelecimento
    showPrintMerchantReceipt: Boolean,
    // Deve mostrar o comprovante do cliente
    showPrintCustomerReceipt: Boolean
  ) => Promise<void>;
  cancelPayment: (
    //Identificador do pagamento
    paymentId: string
  ) => Promise<void>;
  confirmPayment: (paymentItem: string) => Promise<void>;
  getTerminalInfo: () => Promise<string>;
  getLogo: () => Promise<string>;
  getReceiptLogo: () => Promise<string>;
  setMainApp: (packageName: string) => Promise<void>;
}
