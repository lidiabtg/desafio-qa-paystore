import { expect, Locator, Page, test } from '@playwright/test';

const ANOS_TESTADOS = ['1997', '2010', '2022'];

/** Retorna o primeiro elemento visível cujo texto corresponda exatamente ao ano. */
async function primeiroTextoVisivel(page: Page, texto: string): Promise<Locator> {
  const candidatos = page.getByText(texto, { exact: true });
  const total = await candidatos.count();

  for (let indice = 0; indice < total; indice += 1) {
    const candidato = candidatos.nth(indice);
    if (await candidato.isVisible()) return candidato;
  }

  throw new Error(`Nenhum elemento visível foi encontrado para o texto exato: ${texto}`);
}

/** Localiza o título/descrição visível que começa com “AAAA -”. */
async function descricaoVisivelDoAno(page: Page, ano: string): Promise<Locator> {
  const candidatos = page.getByText(new RegExp(`^${ano}\\s*-`, 'i'));
  await expect.poll(async () => {
    const total = await candidatos.count();
    for (let indice = 0; indice < total; indice += 1) {
      if (await candidatos.nth(indice).isVisible()) return true;
    }
    return false;
  }, { message: `A descrição do ano ${ano} não ficou visível.` }).toBe(true);

  const total = await candidatos.count();
  for (let indice = 0; indice < total; indice += 1) {
    const candidato = candidatos.nth(indice);
    if (await candidato.isVisible()) return candidato;
  }

  throw new Error(`Descrição visível não encontrada para o ano ${ano}.`);
}

test.describe('Linha do tempo — História da Phoebus', () => {
  test('o ano exibido na descrição deve corresponder ao ano selecionado', async ({ page }, testInfo) => {
    await test.step('Acessar o site e navegar até História', async () => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveTitle(/Phoebus/i);

      const menuHistoria = page.getByText('HISTÓRIA', { exact: true }).first();
      await menuHistoria.click();

      await expect(page.getByRole('heading', { name: /Nossa História/i })).toBeVisible();
    });

    for (const ano of ANOS_TESTADOS) {
      await test.step(`Selecionar e validar o ano ${ano}`, async () => {
        const itemAno = await primeiroTextoVisivel(page, ano);
        await itemAno.scrollIntoViewIfNeeded();
        await itemAno.click();

        const descricao = await descricaoVisivelDoAno(page, ano);
        const textoExibido = (await descricao.innerText()).trim();

        expect(
          textoExibido,
          `A descrição deveria iniciar com o ano selecionado (${ano}).`
        ).toMatch(new RegExp(`^${ano}\\s*-`));

        const caminho = testInfo.outputPath(`evidencia-historia-${ano}.png`);
        await page.screenshot({ path: caminho, fullPage: true });
        await testInfo.attach(`Evidência — ${ano}`, {
          path: caminho,
          contentType: 'image/png'
        });
      });
    }
  });
});
