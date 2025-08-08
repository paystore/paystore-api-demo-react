# Release Notes

## v1.0.5.0

#### refs: 152768
- Alterado versão do node para 10. - Ajustado codigo typescript nos menus iniciais . - Arredondado valor para criar pagamento. Evitando problemas com o emulador sem necessidade.
- Adicionada nova tela de busca de pagamentos, utilizando a nova função listPayments. - Adicionado pacote  nanoId para gerar appTransactionId customizado com 6 caracteres
- Adicionado Readablemap para receber os paramentros das funções. - Renomeado os services de startPayment para startPaymentV2, startReverse para reversePaymentV2 e reprintReceipt para reprintV2. - Criada as interfaces das requisições de pagamento, estorno e reimpressao.

#### refs: 152698
- Ajuste na seleção da impressão das vias nos serviços de consulta e devolução.
- Ajuste na seleção da impressão das vias.
- Adicionado printVias e printPreview - Ajustado comunicação para usar readableMap no request das funções.

#### refs: 151495
- Modificado exemplo de listagem de pagamentos.  - Adicionado terminalId, ticketNumber, nsu.  - Adicionado mais opções como  listagem na com base no paymentId, status, startDate, finishDate, lastCardDigits e appTransactionId.
- Adicionado notification channel.
- Ajustado exemplo de notificação do pagamento. Em dispositivos como o P2 e P30. Substituido event pelo service.
- Adicionado exemplo para reimpressão de comprovante.

#### refs: 150836
- Adicionada opções para impressão de comprovante e visualização de comprovante para pagamento e estorno - Ajustado alguns logs para evitar quebras, caso o exception não tenha uma mensagem. - Ajustados alguns pontos apontados pelo sonarlint.
- Adicionado mais opções nas infomações do terminal. - Adicionado proteção para quebra caso as informações do terminal não existam
- Adicionado exemplo para inicialização com a paystore

#### refs: 150743
- Incrementado versão
- Adicionado exemplo do getReports ao Pix - Atualizado Readme.md
- Atualizado AAR do Payments para versão 4.0.2.8 - Substituido AAR do Pix pela nova lib de integração do PhastPay

#### refs: 140944
- preparação para develop

## v1.0.4.0

#### refs: 140944
- incremento de versão
- Adicionado método em payments para definir a aplicação principal.
- Atualizado pix sdk para versão 1.0.2.0 - Adicionado funções de consult e refund - Alterado nome de alguns serviços para deixar dentro do padrão. - Adicionado botão customizado de envio de dados. - Adicionada novo tipo de consulta no menu de consultas. - Adicionada novo tipo de devolução. - Alterada rota de devolução para opções de devolução. - Ajustado tipo de envio de evento quando for devolução.
- Adicionada componentes da tela de filtro.
- Adicionada tela de filtro antes de enviar os dados para o pix.
- Adicionado opções em payments para obter logo do portal e do comprovante.
- Atualizado logomarca.
- Adicionado sdk pix. - Adicionado opções para consulta, listagem, geração de cobrança, devolução, verificação de instalação e sincronização PIX.

#### refs: 140933
- Ajustado diretórios src dos serviços relacionados a payments - Adicionado lib clipbloard para permitir cópia dos dos dados das tabelas - Criado arquivo index concetrando os types relativos ao payments.
- Ajustado diretórios Android dos serviços, modals e eventos relacionados a payments. - Alterado sdk para a versão mais recente.

#### refs: 130752
- Alterações realizadas por mateus.malveira - Adicionado modulo para consulta das informações do terminal; - adicionando exemplo para consulta das informações.

## v1.0.3.0

#### refs: 129820
- atualização do releasenotes
- Adicionada lib native-stark
- Adicionada lib native-stark
- Atualizado Readme.md
- Atualizado Readme.md
- Atualizado PaymentsSDK
- Removidos arquivos não necessários a versão 0.73 - Atualizado arquivos MainApplication e AndroidManifest
- Atualizada dependencias.
- Removido bibliotecas não necessárias ao projeto.

#### refs: 130065
- Adicionado componente Receipt - Realizado ajustes no componente PaymentTable - Adicionado acquirerNSU no modulo dos items recebidos
- Adicionada chamada para tela de visualização de dados após pagamento. - Adicionada chamada para tela de visualização de dados na listagem geral.
- Adicionada tela para visualizar dados de pagamento.
- Passando a retornar os objetos de payments e reversal como string ao invés de writable.

#### refs: 129732
- Adicionado tratamento de dados em caso de erro na confirmação de pagamentos.
- Adicionado  tratamento de erro caso o errorData retorne vazio.

#### refs: 130063
- Adicionado o subscription remove no caso de erros nos pagamentos, para evitar notificações duplicadas.

#### refs: sem_referencia
- Merge branch 'b_estorno' into develop
- Merge branch 'feature/patch_112963_estorno' into develop
- Merge branch 'feature/patch_sprint_02042021' into develop

#### refs: 112963
- preparação para develop

#### refs: 120508
- preparação para develop

#### refs: 111859
- prepração para develop

#### refs: 52729
- Merge branch 'release/rc_features_17042020' into develop See Merge Request !3

#### refs: 52728
- .Preparacao para o envio a develop;

## v1.0.2.0

#### refs: 112963
- Removido debugKey de teste.
- Adicionando classe que realiza o @Parcel do PaymentV2
- Alterado nome da rota de undo para cancel para ficar de acordo com as classes em java. - Ajustado nome do módulo.
- Alterado arr para linha BR - Adicionado arquivos para geração de release
- Ajuste na classe ReactNativeFlipper para permitir gerar a aplicação release. - Ajuste no gradlew para gerar a aplicação apenas para x86
- incremento de versão.  - atualização do release notes.
- Removido codigo comentado.
- Adicionada rota de confirmação de pagamento.
- Adicionada opção que permite a confirmação automática ou não dos pagamentos.
- Adicionado evento de aviso de cancelamento. - Ajustado listagem para ser realizada através da rota de listagem de pagamento.
- Criação da página de desfazimento do pagamento - Ajuste do loading da pagina de listagem de pagamentos - Remoção da estrutura do desfazimento de estorno
- Adição dos métodos responsávels por se conectar a payments para executar o desfazimento de pagamento e estorno
- Adicionado opções de impressão de comprovante ao finalizar estorno. - Removida função doReverseConfirm. - Ajustado tipos typescript
- Implementado telas de Estorno e Listagem - Atualizado arquivo de tipos dos módulos.
- Implementado método de Estorno e Listagem de Pagamentos

#### refs: 112363
- Pequenos ajustes nos menus e nomeclaturas.

#### refs: sem_referencia
- Merge branch 'b_estorno' of ssh://git.phoebus.com.br:2222/paystore-apps/paystore-api-demo-react into b_estorno

## v1.0.1.0

#### refs: 111859
- incremento de versão  - atualização do release notes.
- Passando a retornar o resultado do pagamento através do EventEmitter

#### refs: 111261
- Ajuste de identação
- Ajuste de identação
- Atualizado app demo para versão mais recente do react-native - Atualizado react-native router para versão 6 - Atualizado react-native para versão 71 - Atualizada outras libs. - Atualizada versão da build para 33

#### refs: sem_referencia
- Update .gitlab-ci.yml
- Update .gitlab-ci.yml
- Update .gitlab-ci.yml
- Update .gitlab-ci.yml
- Update .gitlab-ci.yml
- Update .gitlab-ci.yml
- Update .gitlab-ci.yml
- Update .gitlab-ci.yml
- Update .gitlab-ci.yml
- Update .gitlab-ci.yml
- Update .gitlab-ci.yml

#### refs: 101246
- Adicionada configuração sonar-properties - Adicionada definição para buildar aplicação na versão do react definida no package.json

#### refs: 68428
- Ajuste na string do menu.
- ajuste na descrição do menu

