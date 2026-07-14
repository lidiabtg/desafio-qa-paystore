# Plano de Testes — Desafio Técnico QA PayStore

## 1. Objetivo

Validar as operações essenciais de cadastro, consulta, tratamento de erro e exclusão de pets na Swagger Petstore, além de verificar a consistência entre o ano selecionado e o ano apresentado na descrição da linha do tempo do site da Phoebus.

## 2. Escopo

### Backend
- `POST /pet`: cadastrar um pet.
- `GET /pet/{petId}`: consultar o pet cadastrado.
- `GET /pet/{petId}` com ID inexistente: validar o tratamento de erro.
- `DELETE /pet/{petId}`: excluir o pet.
- Confirmação adicional: consultar o pet após a exclusão e esperar `404`.

### Frontend
- Acessar o site da Phoebus.
- Navegar até a seção **História**.
- Selecionar três anos: 1997, 2010 e 2022.
- Confirmar que a descrição visível começa com o mesmo ano selecionado.
- Capturar uma imagem de evidência para cada ano.

## 3. Fora do escopo

- Testes de carga, estresse, segurança e acessibilidade aprofundada.
- Validação de todos os endpoints da Petstore.
- Validação editorial completa do conteúdo histórico.
- Compatibilidade com todos os navegadores e dispositivos.

## 4. Estratégia

Os cenários priorizam o fluxo CRUD solicitado e os principais riscos:

1. **Integridade dos dados:** o recurso consultado deve preservar ID, nome e status enviados no cadastro.
2. **Contrato HTTP:** cada operação deve retornar um código coerente com seu resultado.
3. **Tratamento de erro:** recursos inexistentes não podem ser apresentados como válidos.
4. **Persistência da exclusão:** após deletar, o recurso não deve mais ser encontrado.
5. **Consistência de interface:** a seleção do usuário deve atualizar a descrição para o ano correto.

A API utiliza um ID dinâmico para reduzir colisões com execuções de outros usuários do ambiente público.

## 5. Ambiente e ferramentas

| Camada | Ferramenta | Finalidade |
|---|---|---|
| API | Postman | Construção e documentação das requisições |
| API | Newman | Execução em linha de comando e relatório HTML |
| Web | Playwright + TypeScript | Automação do navegador, asserções e evidências |
| CI | GitHub Actions | Execução automatizada a cada alteração |

## 6. Critérios de entrada

- Acesso à internet.
- Node.js 20 ou superior.
- Dependências instaladas com `npm install`.
- Chromium instalado com `npx playwright install chromium`.
- Swagger Petstore e site da Phoebus disponíveis.

## 7. Critérios de saída

- Todos os cenários obrigatórios executados.
- Nenhuma falha crítica aberta.
- Relatórios gerados para API e frontend.
- Três screenshots anexados ao relatório do Playwright.

## 8. Casos de teste — API

| ID | Requisito | Cenário | Pré-condição | Passos | Resultado esperado | Prioridade |
|---|---|---|---|---|---|---|
| API-001 | REQ-01 | Cadastrar pet com dados válidos | API disponível | Enviar `POST /pet` com ID, nome, `photoUrls` e status | HTTP 200; JSON contém ID, nome e status enviados | Alta |
| API-002 | REQ-02 | Consultar pet cadastrado | API-001 aprovado | Enviar `GET /pet/{petId}` | HTTP 200; ID, nome e status iguais aos cadastrados | Alta |
| API-003 | REQ-03 | Consultar ID inexistente | ID sabidamente inexistente | Enviar `GET /pet/{inexistentPetId}` | HTTP 404; resposta informa que o pet não foi encontrado | Alta |
| API-004 | REQ-04 | Excluir pet cadastrado | API-001 aprovado | Enviar `DELETE /pet/{petId}` | HTTP 200; resposta referencia o ID excluído | Alta |
| API-005 | Complementar | Confirmar exclusão | API-004 aprovado | Enviar novo `GET /pet/{petId}` | HTTP 404; pet não encontrado | Alta |
| API-006 | Negativo | Cadastrar sem `name` | API disponível | Enviar payload sem o campo obrigatório | A API deveria rejeitar com 4xx; eventual aceitação deve ser registrada como defeito de contrato | Média |
| API-007 | Negativo | Consultar ID em formato inválido | API disponível | Enviar texto no parâmetro `petId` | HTTP 400 ou resposta de erro coerente | Média |
| API-008 | Negativo | Excluir ID inexistente | ID sabidamente inexistente | Enviar `DELETE` | HTTP 404 ou resposta de erro documentada | Média |

> Os casos API-006 a API-008 foram mapeados para análise exploratória, mas não fazem parte da execução obrigatória automatizada para evitar tornar o pipeline instável diante das inconsistências conhecidas da API pública de demonstração.

## 9. Casos de teste — Frontend

| ID | Cenário | Passos | Resultado esperado | Evidência | Prioridade |
|---|---|---|---|---|---|
| WEB-001 | Abrir seção História | Abrir página e clicar em HISTÓRIA | Título “Nossa História” visível | Relatório | Alta |
| WEB-002 | Validar 1997 | Clicar em 1997 | Descrição visível começa com `1997 -` | Screenshot | Alta |
| WEB-003 | Validar 2010 | Clicar em 2010 | Descrição visível começa com `2010 -` | Screenshot | Alta |
| WEB-004 | Validar 2022 | Clicar em 2022 | Descrição visível começa com `2022 -` | Screenshot | Alta |
| WEB-005 | Responsividade básica | Executar em viewport móvel | Linha do tempo continua navegável | Screenshot/relatório | Baixa |
| WEB-006 | Ano sem conteúdo | Selecionar cada item disponível | Nenhuma seleção deixa descrição vazia ou inconsistente | Relatório | Média |

## 10. Riscos e mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| API pública compartilhada sobrescrever IDs | Resultado intermitente | ID gerado com timestamp e sufixo aleatório |
| Instabilidade externa | Falhas sem relação com o código | Retry apenas no CI e registro de trace/vídeo em falhas web |
| Alteração de classes CSS do site | Quebra de seletores | Seleção por texto e sem dependência de classes geradas |
| Conteúdo duplicado/oculto no DOM | Clique no elemento errado | Função que escolhe apenas o primeiro elemento visível |
| Banner ou carregamento tardio | Timeout | Esperas por estado visível e limites explícitos |

## 11. Registro de defeitos

Cada defeito deve conter: título, ambiente, pré-condições, passos, resultado atual, resultado esperado, severidade, prioridade e evidências.
