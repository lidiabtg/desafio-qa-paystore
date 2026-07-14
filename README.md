# Desafio Técnico QA — PayStore

Projeto desenvolvido para o desafio técnico de QA da PayStore, contemplando planejamento de testes, automação de API, automação web, geração de relatórios e integração contínua.

---

# Objetivo

Validar:

- As operações de cadastro, consulta, tratamento de erro e exclusão de pets na Swagger Petstore.
- A navegação até a seção **História** do site da Phoebus.
- A consistência entre o ano selecionado na linha do tempo e o conteúdo exibido ao usuário.

---

# Tecnologias Utilizadas

- Postman
- Newman
- Playwright
- TypeScript
- GitHub Actions
- Node.js

---

# Estrutura do Projeto

```text
qa-paystore/
├── .github/
│   └── workflows/
│       └── qa.yml
├── docs/
│   └── PLANO-DE-TESTES.md
├── evidencias/
│   └── README.md
├── postman/
│   ├── Swagger-Petstore-QA.postman_collection.json
│   └── Swagger-Petstore-QA.postman_environment.json
├── relatorios/
├── tests/
│   └── historia.spec.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

---

# Pré-requisitos

- Node.js 22 ou superior
- npm
- Google Chrome ou Chromium
- Acesso à internet

---

# Instalação

```bash
npm install
```

Instalar o navegador utilizado pelo Playwright:

```bash
npx playwright install chromium
```

No Windows PowerShell:

```powershell
npm.cmd install
npx.cmd playwright install chromium
```

---

# Execução dos Testes

## API

```bash
npm run test:api
```

Windows:

```powershell
npm.cmd run test:api
```

## Frontend

Modo headless:

```bash
npm run test:web
```

Modo com navegador aberto:

```bash
npm run test:web:headed
```

Windows:

```powershell
npm.cmd run test:web
npm.cmd run test:web:headed
```

## Executar todos os testes

```bash
npm run test:all
```

---

# Fluxo Automatizado da API

O conjunto de testes realiza:

1. Cadastro de um pet.
2. Consulta do pet cadastrado.
3. Validação dos dados retornados.
4. Consulta de um ID inexistente.
5. Exclusão do pet.
6. Confirmação da exclusão.

Para evitar conflitos com outros usuários da API pública, é utilizado um ID dinâmico.

---

# Fluxo Automatizado do Frontend

O teste realiza:

1. Acessar o site da Phoebus.
2. Navegar até a seção **História**.
3. Selecionar os anos **1997**, **2010** e **2022**.
4. Validar que a descrição apresentada inicia com o mesmo ano selecionado.
5. Registrar evidências da execução.

---

# Estratégia da Automação Web

A automação utiliza seletores por acessibilidade (`Role`) e por conteúdo visível, reduzindo a dependência de classes CSS geradas dinamicamente.

Para cada ano selecionado, o teste:

- identifica o botão correspondente;
- realiza a interação;
- aguarda a atualização do conteúdo;
- valida que a descrição inicia com o ano esperado.

---

# Relatórios

## API

Após a execução do Newman é gerado:

```text
relatorios/newman-report.html
```

## Frontend

Após a execução do Playwright são gerados:

```text
relatorios/playwright-report/
```

Quando ocorre falha durante a execução, também podem ser gerados:

- `video.webm`
- `trace.zip`
- `error-context.md`

---

# Integração Contínua

O projeto possui um workflow do GitHub Actions responsável por:

- instalar as dependências;
- instalar o Chromium;
- executar os testes de API;
- executar os testes frontend;
- publicar os relatórios como artefatos.

Arquivo:

```text
.github/workflows/qa.yml
```

---

# Plano de Testes

A documentação completa encontra-se em:

```text
docs/PLANO-DE-TESTES.md
```

O documento contém:

- objetivo;
- escopo;
- estratégia;
- critérios de entrada e saída;
- casos de teste;
- riscos e mitigações;
- registro de defeitos;
- observações da execução.

---

# Limitação Conhecida

Durante a automação da seção **História** do site da Phoebus foi observado comportamento inconsistente na atualização da linha do tempo.

Em algumas execuções automatizadas, após a seleção do ano **2010**, o conteúdo exibido permanece referente ao ano anteriormente selecionado, apesar de o elemento ter sido localizado corretamente pelo Playwright.

Também foram observados, em determinadas execuções, timeouts relacionados à estabilidade de elementos da página.

Para investigar esse comportamento foram avaliadas diferentes abordagens, incluindo:

- seletores por texto;
- seletores por acessibilidade (`getByRole`);
- Playwright Codegen;
- esperas explícitas;
- clique convencional;
- clique forçado;
- navegação por teclado;
- análise utilizando o Trace Viewer.

Mesmo após essas tentativas, o comportamento permaneceu inconsistente durante algumas execuções automatizadas.

Essa limitação foi registrada no Plano de Testes para garantir transparência sobre os resultados obtidos.

---

# Evidências

As evidências geradas durante a execução dos testes ficam disponíveis em:

```text
relatorios/
```

Podem incluir:

- relatório HTML do Newman;
- relatório HTML do Playwright;
- capturas de tela;
- vídeos (`video.webm`);
- arquivos de trace (`trace.zip`);
- `error-context.md`.

---

# Repositório

https://github.com/lidiabtg/desafio-qa-paystore

---

# Licença

Projeto desenvolvido exclusivamente para fins de avaliação técnica.