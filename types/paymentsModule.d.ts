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

export interface ListPaymentsRequest {
  status?: PaymentStatus[];
  paymentId?: string;
  appTransactionId?: string;
  lastDigits?: string;
  startDate?: string;
  finishDate?: string;
}
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
  //Identificador do terminal
  terminalId: string;
  //Identificador do lojista
  merchantId: string;
  //Nome do lojista
  merchantName: string;
  //Razão Social do lojista
  merchantCommercialName: string;
  //Identificador do lojista
  merchantNationalId: string;
  //Código postal do lojista
  mcPostalCode: string;
  //Logradouro do lojista
  mcStreet: string;
  //Cidade do lojista
  mcCity: string;
  //Estado do lojista
  mcState: string;
  //Abreviação do nome do estado do lojista
  mcStateAbbreviation: string;
  //Bairro do lojista
  mcNeighbourhood: string;
  //País do lojista
  mcCountry: string;
  //Complemento de endereço do lojista
  mcComplement: string;
  //Número do endereço do lojista
  mcAddressNumber: string;
  //Número de telefone do lojista
  mcPhone: string;
  //Endereço de e-mail do lojista
  mcEmail: string;
  //Site do lojista
  mcWebSite: string;
  //Código ISO da moeda do lojista
  currencyISOString: string;
  //Codigo da moeda do lojista
  currencyCode: string;
  //Código do Facilitador em que o lojista está cadastrado.
  subAcquirerId: string;
  //Código de categoria do lojista (MCCs)
  mcCategoryCode: string;
  //Tipo de Lojista 1 - Física, 2 - Jurídica
  mcNationalType: string;
}

export type PaymentRequestV2 = {
  //Valor do pagamento em float "0,00"
  value: string;
  //Identificador da transação
  appTransactionId: string;
  //flag indicando se deve ser impresso o comprovante do Estabelecimento
  printMerchantReceipt?: boolean;
  //flag indicando se deve ser impresso o comprovante do Consumidor
  printCustomerReceipt?: boolean;
  //flag indicando se deve ser exibido o preview do comprovante da via do Estabelecimento
  previewMerchantReceipt?: boolean;
  //flag indicando se deve ser exibido o preview do comprovante da via do Cliente.
  previewCustomerReceipt?: boolean;
  //Tipo do pagamento
  paymentTypes: PaymentTypes[];
  //quantidade de parcelas
  installments?: Int32;
  // Deve confirmar o pagamento automaticamente ou não.
  confirmPayment?: boolean;
};

export type ReversePaymentRequestV2 = {
  //Valor do pagamento em float "0,00"
  value?: string;
  //Identificador da transação
  appTransactionId: string;
  //Identificador do pagamento
  paymentId: string;
  //flag indicando se deve ser impresso o comprovante do Estabelecimento
  printMerchantReceipt?: boolean;
  //flag indicando se deve ser impresso o comprovante do Consumidor
  printCustomerReceipt?: boolean;
  //flag indicando se deve ser exibido o preview do comprovante da via do Estabelecimento
  previewMerchantReceipt?: boolean;
  //flag indicando se deve ser exibido o preview do comprovante da via do Cliente.
  previewCustomerReceipt?: boolean;
};

export type ReprintReceiptRequestV2 = {
  //flag indicando se deve ser impresso o comprovante do Estabelecimento
  printMerchantReceipt?: boolean;
  //flag indicando se deve ser impresso o comprovante do Consumidor
  printCustomerReceipt?: boolean;
  //flag indicando se deve ser exibido o preview do comprovante da via do Estabelecimento
  previewMerchantReceipt?: boolean;
  //flag indicando se deve ser exibido o preview do comprovante da via do Cliente.
  previewCustomerReceipt?: boolean;
  //Id do pagamento (paymentId vindo no PaymentResult)
  paymentId?: string;
};

export interface PaymentsInterface {
  startPaymentV2: (request: PaymentRequestV2) => Promise<void>;
  listPayments: (request: ListPaymentsRequest) => Promise<void>;
  reversePaymentV2: (request: ReversePaymentRequestV2) => Promise<void>;
  cancelPayment: (
    //Identificador do pagamento
    paymentId: string
  ) => Promise<void>;
  confirmPayment: (paymentItem: string) => Promise<void>;
  getTerminalInfo: () => Promise<string>;
  getLogo: () => Promise<string>;
  getReceiptLogo: () => Promise<string>;
  setMainApp: (packageName: string) => Promise<void>;
  startInitialization: () => Promise<void>;
  reprintV2: (request: ReprintReceiptRequestV2) => Promise<void>;
}
