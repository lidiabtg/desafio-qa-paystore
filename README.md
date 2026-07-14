# Desafio Técnico QA — PayStore

Projeto de qualidade de software com testes automatizados de **API** e **frontend**, desenvolvido para o desafio técnico de QA da Phoebus/PayStore.

## Entregas

- Plano de testes em [`docs/PLANO-DE-TESTES.md`](docs/PLANO-DE-TESTES.md).
- Collection e environment do Postman.
- Testes automatizados de API executáveis pelo Newman.
- Teste frontend com Playwright e TypeScript.
- Screenshots automáticos para três anos da linha do tempo.
- Relatórios HTML de API e frontend.
- Pipeline com GitHub Actions.

## Tecnologias escolhidas

**Postman + Newman:** facilitam a demonstração visual das requisições, a execução no terminal e a geração de relatório HTML.

**Playwright + TypeScript:** oferece esperas automáticas, boas mensagens de erro, screenshots, traces, vídeos em falhas e relatório HTML nativo. Os seletores usam conteúdo visível, evitando dependência de classes CSS geradas.

## Estrutura

```text
qa-paystore/
├── .github/workflows/qa.yml
├── docs/PLANO-DE-TESTES.md
├── evidencias/README.md
├── postman/
│   ├── Swagger-Petstore-QA.postman_collection.json
│   └── Swagger-Petstore-QA.postman_environment.json
├── tests/historia.spec.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Pré-requisitos

- Node.js 20 ou superior.
- npm.
- Acesso à internet.

## Instalação

```bash
npm install
npx playwright install chromium
```

O `npm install` também gera o `package-lock.json`, que deve ser incluído antes de usar o workflow do GitHub Actions.

## Testes de API

```bash
npm run test:api
```

Fluxo executado:

1. Cadastro de um pet com ID dinâmico.
2. Consulta e comparação dos dados.
3. Consulta de ID inexistente e validação da mensagem de erro.
4. Exclusão do pet criado.
5. Consulta adicional para confirmar a exclusão.

Relatório: `relatorios/newman-report.html`.

### Execução pelo Postman

1. Importe os dois JSONs da pasta `postman/`.
2. Selecione o environment **Swagger Petstore - QA**.
3. Abra a collection e clique em **Run collection**.
4. Mantenha a ordem original das requisições.

## Teste frontend

Execução padrão:

```bash
npm run test:web
```

Execução com navegador visível para apresentação:

```bash
npm run test:web:headed
```

Abrir relatório:

```bash
npm run report:web
```

O teste abre o site, acessa **História**, seleciona 1997, 2010 e 2022, compara cada seleção com a descrição exibida e anexa uma captura da página ao relatório.

## Estratégia para identificar o ano correto

Para cada ano, a automação:

1. Procura elementos cujo texto seja exatamente o ano.
2. Escolhe o primeiro elemento visível.
3. Clica nele.
4. Aguarda uma descrição visível iniciada pelo padrão `AAAA -`.
5. Compara o início do texto com o ano selecionado.

Isso reduz falsos resultados causados por conteúdo duplicado ou oculto no DOM.

## Executar tudo

```bash
npm run test:all
```

## Evidências

- API: `relatorios/newman-report.html`.
- Frontend: `relatorios/playwright-report/index.html`.
- Falhas frontend: trace, screenshot e vídeo em `relatorios/test-results/`.
- Screenshots dos três anos: anexados ao relatório Playwright.

As evidências reais são geradas durante a execução, garantindo que correspondam ao resultado efetivamente obtido.

## Demonstração sugerida

1. Mostrar o plano e explicar os riscos priorizados.
2. Rodar a collection no Postman ou pelo Newman.
3. Abrir o relatório da API.
4. Executar `npm run test:web:headed`.
5. Abrir o relatório Playwright e mostrar os screenshots.
6. Explicar a seleção do elemento visível e a validação com `AAAA -`.

## Observação sobre a API pública

A Swagger Petstore é compartilhada. O projeto gera um ID baseado em timestamp e sufixo aleatório para reduzir colisões. Indisponibilidade externa ou interferência de outra execução deve ser diferenciada de falha do teste.
