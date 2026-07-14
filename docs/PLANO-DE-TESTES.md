# Plano de Testes — Desafio Técnico QA PayStore

## 1. Objetivo

Validar as operações essenciais de cadastro, consulta, tratamento de erro e exclusão de pets na Swagger Petstore, além de verificar se o conteúdo exibido na linha do tempo do site da Phoebus corresponde ao ano selecionado pelo usuário.

---

## 2. Escopo

### Backend

- Cadastrar um pet utilizando o endpoint `POST /pet`.
- Consultar o pet cadastrado utilizando o endpoint `GET /pet/{petId}`.
- Validar o comportamento da API para um ID inexistente.
- Excluir o pet utilizando o endpoint `DELETE /pet/{petId}`.
- Confirmar a exclusão consultando novamente o mesmo ID e esperando uma resposta `404`.

### Frontend

- Acessar o site da Phoebus.
- Navegar até a seção **História**.
- Selecionar os anos **1997**, **2010** e **2022**.
- Validar que o conteúdo exibido corresponde ao ano selecionado.
- Registrar evidências da execução (capturas de tela, vídeos e arquivos de trace, quando aplicável).

---

## 3. Fora do Escopo

- Testes de carga, estresse e desempenho.
- Testes de segurança.
- Testes completos de acessibilidade.
- Validação de todos os endpoints da Swagger Petstore.
- Compatibilidade com todos os navegadores e dispositivos.

---

## 4. Estratégia de Testes

Os testes foram elaborados priorizando os principais fluxos funcionais solicitados no desafio.

### Backend

Os cenários contemplam:

- Cadastro de um pet;
- Consulta do pet cadastrado;
- Consulta de um recurso inexistente;
- Exclusão do pet;
- Confirmação da exclusão.

Foi utilizado um **ID dinâmico**, reduzindo a possibilidade de conflitos com outros usuários da API pública.

### Frontend

Os cenários contemplam:

- Navegação até a página **História**;
- Seleção dos anos da linha do tempo;
- Consistência entre o ano selecionado e o conteúdo apresentado ao usuário.

---

## 5. Ambiente e Ferramentas

| Camada | Ferramenta | Finalidade |
|---------|------------|------------|
| Backend | Postman | Construção e validação das requisições |
| Backend | Newman | Execução automatizada da coleção |
| Frontend | Playwright + TypeScript | Automação dos testes web |
| CI/CD | GitHub Actions | Execução automática dos testes |

---

## 6. Critérios de Entrada

- Acesso à internet.
- Node.js instalado.
- Dependências instaladas com `npm install`.
- Chromium instalado com `npx playwright install chromium`.
- API Swagger Petstore disponível.
- Site da Phoebus disponível.

---

## 7. Critérios de Saída

- Todos os cenários obrigatórios executados.
- Relatórios gerados.
- Evidências registradas.
- Defeitos encontrados documentados.

---

## 8. Casos de Teste — Backend

| ID | Cenário | Resultado Esperado |
|----|----------|-------------------|
| API-001 | Cadastrar pet | HTTP 200 e dados persistidos |
| API-002 | Consultar pet cadastrado | HTTP 200 e dados iguais aos cadastrados |
| API-003 | Consultar ID inexistente | HTTP 404 |
| API-004 | Excluir pet | HTTP 200 |
| API-005 | Confirmar exclusão | HTTP 404 |

### Casos exploratórios

| ID | Cenário | Resultado Esperado |
|----|----------|-------------------|
| API-006 | Cadastro sem nome | Validar o comportamento da API conforme o contrato do endpoint |
| API-007 | Consulta com ID inválido | A API deve retornar erro compatível |
| API-008 | Exclusão de ID inexistente | A API deve retornar erro compatível |

---

## 9. Casos de Teste — Frontend

| ID | Cenário | Resultado Esperado |
|----|----------|-------------------|
| WEB-001 | Abrir História | Exibir o título **Nossa História** |
| WEB-002 | Selecionar 1997 | O conteúdo exibido inicia com **1997 -** |
| WEB-003 | Selecionar 2010 | O conteúdo exibido inicia com **2010 -** |
| WEB-004 | Selecionar 2022 | O conteúdo exibido inicia com **2022 -** |
| WEB-005 | Responsividade básica | A linha do tempo permanece navegável |
| WEB-006 | Validação exploratória | O conteúdo da linha do tempo permanece consistente após a seleção dos anos disponíveis |

---

## 10. Riscos e Mitigações

| Risco | Impacto | Mitigação |
|---------|----------|-----------|
| API pública compartilhada | Resultados inconsistentes | Utilização de IDs dinâmicos |
| Instabilidade da internet | Falhas durante a execução | Reexecutar os testes quando necessário |
| Alteração da estrutura HTML | Quebra dos seletores | Utilizar seletores por Role e por texto |
| Conteúdo duplicado ou oculto no DOM | Seleção incorreta de elementos | Interagir apenas com elementos visíveis |
| Banner de cookies | Timeout durante os testes | Tratar o banner antes da execução |
| Componentes dinâmicos da interface (Wix) | Possível instabilidade na automação da linha do tempo | Registrar vídeos, traces e capturas de tela para apoiar a análise das falhas |

---

## 11. Registro de Defeitos

Cada defeito registrado deve conter:

- Título;
- Ambiente;
- Pré-condições;
- Passos para reprodução;
- Resultado obtido;
- Resultado esperado;
- Severidade;
- Prioridade;
- Evidências (capturas de tela, vídeos ou arquivos de trace).

---

## 12. Observações da Execução dos Testes

### Limitação encontrada na automação do Frontend

Durante a automação da seção **História** do site da Phoebus, foi observado um comportamento inconsistente na atualização da linha do tempo.

### Cenário executado

- Acessar o site da Phoebus.
- Navegar até a página **História**.
- Selecionar os anos **1997**, **2010** e **2022**.
- Validar que o conteúdo exibido corresponde ao ano selecionado.

### Resultado observado

O Playwright localizou corretamente os botões da linha do tempo utilizando seletores por acessibilidade (`getByRole('button', { name: '2010' })`).

Entretanto, em algumas execuções automatizadas, após a interação com o botão referente ao ano **2010**, o conteúdo da linha do tempo não foi atualizado, permanecendo a descrição do ano anteriormente selecionado.

Durante diferentes execuções automatizadas, foi observado comportamento inconsistente na atualização do conteúdo da linha do tempo.

### Evidências coletadas

- Relatório HTML do Playwright.
- Arquivos `trace.zip`.
- Vídeos das execuções (`video.webm`).
- Capturas de tela.

### Análise realizada

Foram avaliadas diferentes abordagens para investigar o comportamento observado, incluindo:

- Seletores por texto.
- Seletores por Role.
- Geração de código com Playwright Codegen.
- Esperas explícitas.
- Scroll até o elemento.
- Clique convencional.
- Clique forçado.
- Navegação por teclado.
- Desativação de animações.

Mesmo após essas tentativas, o comportamento permaneceu inconsistente durante a automação.

### Conclusão

Durante a execução automatizada, foi observado que, em algumas execuções, a atualização da linha do tempo não ocorreu conforme esperado.

As evidências coletadas (relatórios, vídeos, capturas de tela e arquivos de trace) foram preservadas para apoiar a análise dos resultados obtidos durante o desafio técnico.

Essa limitação foi documentada para registrar o comportamento observado durante a automação e preservar a rastreabilidade das evidências coletadas.