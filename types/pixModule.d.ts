export type PixStatus =
  | 'ACTIVE'
  | 'CONCLUDED'
  | 'REFUNDED'
  | 'REFUND_PROCESSING'
  | 'REFUND_NOT_DONE'
  | 'REMOVED_BY_USER'
  | 'REMOVED_BY_PSP'
  | 'EXPIRED';

export type ReportType = 'SUMMARY' | 'DETAILED';

export type FilterType = 'REPORT' | 'COB';

export interface PixResult {
  cob_value: string;
  status: PixStatus;
  tx_id: string;
  date_time: string;
  pix_client_id: string;
}

export type StartPaymentRequest = {
  //Valor do pagamento em float "0,00"
  value: String;
  //Identificador da aplicação
  pixClientId: String;
  //flag indicando se deve ser impresso o comprovante do Estabelecimento
  printMerchantReceipt?: boolean;
  //flag indicando se deve ser impresso o comprovante do Estabelecimento
  printCustomerReceipt?: boolean;
  //flag indicando se deve ser exibido o comprovante do Estabelecimento
  previewMerchantReceipt?: boolean;
  //flag indicando se deve ser exibido o comprovante do Estabelecimento
  previewCustomerReceipt?: boolean;
};

export type StartRefundRequest = {
  //Identificador da cobrança
  txId: string;
  //flag indicando se deve ser impresso o comprovante do Estabelecimento
  printMerchantReceipt?: boolean;
  //flag indicando se deve ser impresso o comprovante do Estabelecimento
  printCustomerReceipt?: boolean;
  //flag indicando se deve ser exibido o comprovante do Estabelecimento
  previewMerchantReceipt?: boolean;
  //flag indicando se deve ser exibido o comprovante do Estabelecimento
  previewCustomerReceipt?: boolean;
};

export type RefundRequest = {
  //flag indicando se deve ser impresso o comprovante do Estabelecimento
  printMerchantReceipt?: boolean;
  //flag indicando se deve ser impresso o comprovante do Estabelecimento
  printCustomerReceipt?: boolean;
  //flag indicando se deve ser exibido o comprovante do Estabelecimento
  previewMerchantReceipt?: boolean;
  //flag indicando se deve ser exibido o comprovante do Estabelecimento
  previewCustomerReceipt?: boolean;
};

export type ConsultRequest = {
  //flag indicando se deve ser impresso o comprovante do Estabelecimento
  printMerchantReceipt?: boolean;
  //flag indicando se deve ser impresso o comprovante do Estabelecimento
  printCustomerReceipt?: boolean;
  //flag indicando se deve ser exibido o comprovante do Estabelecimento
  previewMerchantReceipt?: boolean;
  //flag indicando se deve ser exibido o comprovante do Estabelecimento
  previewCustomerReceipt?: boolean;
};

export type ConsultByTxIdRequest = {
  //Identificador da cobrança
  txId: String;
  //flag indicando se deve ser impresso o comprovante do Estabelecimento
  printMerchantReceipt?: boolean;
  //flag indicando se deve ser impresso o comprovante do Estabelecimento
  printCustomerReceipt?: boolean;
  //flag indicando se deve ser exibido o comprovante do Estabelecimento
  previewMerchantReceipt?: boolean;
  //flag indicando se deve ser exibido o comprovante do Estabelecimento
  previewCustomerReceipt?: boolean;
};

export type ReportRequest = {
  //Data inicial em UTC para gerar relatório pix
  startDate: string;
  //Data final em UTC para gerar relatório pix
  endDate: string;
  //Tipo de Relatório:
  reportType?: ReportType;
};

export type ListPixPaymentsRequest = {
  startDate: string;
  endDate: string;
  status: PixStatus[];
  value?: string;
};

export interface PixInterface {
  //Realiza o processo de geração de cobrança.
  startPixPayment: (request: StartPaymentRequest) => Promise<void>;
  //Devolve uma cobrança realizada.
  refundPixPayment: (request: StartRefundRequest) => Promise<void>;
  //Lista as cobranças realizadas e ao selecionar uma, o valor associado é devolvido.
  refund: (request: RefundRequest) => Promise<void>;
  //Realiza uma consulta pelo Tx-Id da cobrança.
  consultByTxId: (request: ConsultByTxIdRequest) => Promise<void>;
  //Realiza uma consulta pelo pix_client_id da cobrança.
  consultByPixClientId: (
    //Identificador do cliente pix
    pixClientId: string
  ) => Promise<void>;
  //Realiza a consulta de todos os pix feito pelo pix_client.
  consult: (request: ConsultRequest) => Promise<void>;
  //Realiza a consulta nos relatórios
  getReport: (request: ReportRequest) => Promise<void>;
  //Identifica se o app pix está instalado.
  isPixInstalled: () => Promise<boolean>;
  //Realiza a sincronização dos dados locais com o servidor.
  synchronize: () => Promise<string>;
  //Lista as cobranças Pix
  listPixPayments: (request: ListPixPaymentsRequest) => Promise<void>;
}
