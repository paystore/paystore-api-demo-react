## App Demonstração API Pagamento (React) - Applet Phoebus

### Versão: 1.0.3.0

refs #129732
- Adicionado  tratamento de erro caso o errorData retorne vazio. 
refs #129820
- Atualizado PaymentsSDK
refs #129732
- Adicionado tratamento de dados em caso de erro na confirmação de pagamentos.
refs #130063
- Adicionado o subscription remove no caso de erros nos pagamentos, para evitar notificações duplicadas.
refs #130065
- Passando a retornar os objetos de payments e reversal como string ao invés de writable.
refs #130065
- Adicionada tela para visualizar dados de pagamento.
refs #130065
- Adicionada chamada para tela de visualização de dados após pagamento.
- Adicionada chamada para tela de visualização de dados na listagem geral.
refs #129820
- Adicionada lib native-stark


### Versão: 1.0.2.0
- 112963
 - Implementado método de Estorno e Listagem de Pagamentos
 - Implementado telas de Estorno e Listagem
 - Atualizado arquivo de tipos dos módulos.
 - Adicionado opções de impressão de comprovante ao finalizar estorno.
 - Removida função doReverseConfirm.
 - Ajustado tipos typescript
 - Adição dos métodos responsávels por se conectar a payments para executar o desfazimento de pagamento e estorno
 - Criação da página de desfazimento do pagamento
 - Ajuste do loading da pagina de listagem de pagamentos
 - Remoção da estrutura do desfazimento de estorno
 - Adicionado evento de aviso de cancelamento.
 - Ajustado listagem para ser realizada através da rota de listagem de  pagamento.
 - Adicionada opção que permite a confirmação automática ou não dos pagamentos.
 - Adicionada rota de confirmação de pagamento.

### Versão: 1.0.1.0
- 68428
 - ajuste na descrição do menu
 - Ajuste na string do menu.

- 101246
  - Adicionada configuração sonar-properties
  - Adicionada definição para buildar aplicação na versão do react definida no package.json

- 111261
  - Atualizado app demo para versão mais recente do react-native
  - Atualizado react-native router para versão 6
  - Atualizado react-native para versão 71
  - Atualizada outras libs.
  - Atualizada versão da build para 33
  - Ajuste de identação

- 111859
  - Passando a retornar o resultado do pagamento através do EventEmitter

### Versão: 1.0.0.0
- Versão inicial