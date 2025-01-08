export type PixStatus =
  | 'ACTIVE'
  | 'CONCLUDED'
  | 'REFUNDED'
  | 'REFUND_PROCESSING'
  | 'REFUND_NOT_DONE'
  | 'REMOVED_BY_USER'
  | 'REMOVED_BY_PSP'
  | 'EXPIRED';

export interface PixResult {
  cob_value: string;
  status: PixStatus;
  tx_id: string;
  date_time: string;
  pix_client_id: string;
}
export interface PixInterface {
  //Realiza o processo de geração de cobrança.
  startPixPayment: (
    //Valor do pagamento em float "0,00"
    value: String,
    //Identificador da aplicação
    pixClientId: String,
    //flag indicando se deve ser impresso o comprovante do Estabelecimento
    printMerchantReceipt: Boolean,
    //flag indicando se deve ser impresso o comprovante do Estabelecimento
    printcustomerReceipt: Boolean
  ) => Promise<void>;

  //Devolve uma cobrança realizada.
  refundPixPayment: (
    //Identificador da cobrança
    txId: String,
    //flag indicando se deve ser impresso o comprovante do Estabelecimento
    printMerchantReceipt: Boolean,
    //flag indicando se deve ser impresso o comprovante do Estabelecimento
    printcustomerReceipt: Boolean
  ) => Promise<void>;

  //Lista as cobranças realizadas e ao selecionar uma, o valor associado é devolvido.
  refund: (
    //flag indicando se deve ser impresso o comprovante do Estabelecimento
    printMerchantReceipt: Boolean,
    //flag indicando se deve ser impresso o comprovante do Estabelecimento
    printcustomerReceipt: Boolean
  ) => Promise<void>;

  //Realiza uma consulta pelo Tx-Id da cobrança.
  consultByTxId: (
    //Identificador da cobrança
    txId: String,
    //flag indicando se deve ser impresso o comprovante do Estabelecimento
    printMerchantReceipt: Boolean,
    //flag indicando se deve ser impresso o comprovante do Estabelecimento
    printcustomerReceipt: Boolean
  ) => Promise<void>;

  //Realiza uma consulta pelo pix_client_id da cobrança.
  consultByPixClientId: (
    //Identificador do cliente pix
    pixClientId: String
  ) => Promise<void>;

  //Realiza a consulta de todos os pix feito pelo pix_client.
  consult: (
    //flag indicando se deve ser impresso o comprovante do Estabelecimento
    printMerchantReceipt: Boolean,
    //flag indicando se deve ser impresso o comprovante do Estabelecimento
    printcustomerReceipt: Boolean
  ) => Promise<void>;

  //Identifica se o app pix está instalado.
  isPixInstalled: () => Promise<boolean>;

  //Realiza a sincronização dos dados locais com o servidor.
  synchronize: () => Promise<string>;

  //Lista as cobranças Pix
  listPixPayments: (
    dateStart: string,
    dateFinish: string,
    pixStatus: PixStatus[],
    value?: string
  ) => Promise<void>;
}
