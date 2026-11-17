# Entre nós — uma candidatura para Carol

Uma resposta a um story em forma de site: carta editorial em vinho, creme e rosa, ficha de candidatura, redação original de 500 palavras e avaliação interativa.

## Executar localmente

Use Node.js 22.13 ou superior e npm.

```bash
npm ci
npm run dev
```

Abra http://127.0.0.1:3000. No PowerShell, se a política local bloquear `npm.ps1`, utilize `npm.cmd` no lugar de `npm`.

## Verificar e gerar a versão final

```bash
npm test
npm run typecheck
npm run build
```

O build exporta o site estático para `out/`. Não há banco de dados, login, API, variáveis de ambiente ou backend. As fontes são baixadas durante o build pelo `next/font` e servidas pelo próprio site em produção.

Para conferir o resultado estático:

```bash
node scripts/serve-static.mjs
```

Abra http://127.0.0.1:4173. Encerre o servidor com Ctrl+C.

## Testes de navegação

Depois de gerar o build:

```bash
npx playwright install chromium webkit
npm run test:e2e
```

Os testes usam o resultado real em `out/`, com Chromium no desktop (1440 px), celular estreito (320 px) e iPhone 13 (390 px), além de WebKit em iPhone 13. Verificam conteúdo, navegação, largura, modais, foco, Escape, cópia real no Chromium, alternativa de cópia manual e preferência por movimento reduzido. O Playwright inicia e encerra o servidor estático automaticamente. O relatório fica em `playwright-report/`.

Se você já tem Chrome instalado e prefere não baixar navegadores, execute no PowerShell:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'chrome'
npm.cmd run test:e2e -- --project=desktop-chromium --project=iphone-chromium --project=mobile-320
```

Esse modo verifica os três tamanhos com Chrome; a verificação específica de Safari exige o WebKit.

## Publicar na Vercel

1. Envie este repositório para sua conta no GitHub, GitLab ou Bitbucket.
2. Na Vercel, escolha **Add New → Project** e importe o repositório.
3. Mantenha **Framework Preset: Next.js**, diretório raiz `./` e comando de build `npm run build`.
4. Não configure variáveis de ambiente. Clique em **Deploy**.
5. Depois da publicação, teste o botão **Copiar minha decisão** pelo endereço HTTPS recebido.

Na Vercel, a imagem de compartilhamento usa automaticamente o domínio fornecido pela plataforma. Se você adicionar um domínio próprio ou usar outra hospedagem, defina a variável opcional `NEXT_PUBLIC_SITE_URL` com a URL completa (por exemplo, `https://seu-dominio.com`) e gere um novo build.

Também é possível publicar pelo terminal com `npx vercel` e seguir a autenticação da sua conta. O arquivo `next.config.ts` já configura a exportação estática; não é necessário um servidor Node.js em produção.

## Organização e personalização

- `src/app/`: página, estilos, fontes, metadados e imagem de compartilhamento gerada no build.
- `src/components/`: abertura, envelope em CSS, ficha, carta, avaliação, navegação e encerramento.
- `src/content/letter.json`: os nove parágrafos originais, preservados integralmente.
- `src/lib/letter.ts`: contador da redação e mensagem copiada.
- `tests/`: testes de integridade do texto e testes no navegador.

A contagem considera exclusivamente as palavras da redação. Um teste de SHA-256 garante que palavras, pontuação e separações entre os parágrafos continuem idênticas ao texto fornecido. Alterar a redação intencionalmente requer atualizar essa referência.

O botão de aprovação abre um modal e permite copiar a decisão. Ele não envia mensagens, não abre conversas e não registra avaliações. Quando a área de transferência é bloqueada, o modal oferece a mensagem para cópia manual. Os modais usam o elemento nativo `dialog` para manter o foco e permitir fechamento com Escape. A preferência de movimento reduzido desativa confetes e rolagem animada.

Por ser uma carta pessoal, o site usa `noindex, nofollow` para solicitar que buscadores não o indexem. Isso não equivale a controle de acesso: qualquer pessoa com o endereço de uma publicação pública poderá abrir a página.
