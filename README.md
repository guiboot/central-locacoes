# Central Locações

Landing page da **Central Locações** — divisão da Central Construtora especializada em **locação de máquinas de reboco e chapisco** e **prestação de serviço** em obras na região de Maringá – PR.

> Aplicação mecanizada com produtividade de **até 1.000 m² de chapisco por dia**.

## Stack

Site 100% estático, sem build:

- HTML5 + CSS (Custom Properties + Grid/Flex)
- JavaScript vanilla (sem frameworks)
- Fonte: Google Fonts (Montserrat)
- Vídeos `.mp4` (H.264, 1080p, mudos) servidos pela Vercel

## Estrutura

```
Locações/
├── index.html              # página principal
├── styles.css
├── script.js
├── vercel.json             # cache headers + clean URLs
├── robots.txt
├── Logo-central-construtora.png
├── IMG_2058.mp4            # hero / galeria
├── IMG_2059.mp4            # máquina de chapisco
└── IMG_2061.mp4            # máquina de reboco
```

## Rodar localmente

Como é um site estático, basta abrir `index.html` no navegador.
Para servir via HTTP (recomendado por causa do autoplay dos vídeos):

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## Deploy na Vercel

### Opção 1 — Via dashboard (mais simples)

1. Suba o repositório para o GitHub
2. Acesse <https://vercel.com/new>
3. Importe o repositório
4. **Framework Preset:** `Other`
5. **Build Command / Output Directory:** deixe em branco
6. Clique em **Deploy**

### Opção 2 — Via CLI

```bash
npm i -g vercel
vercel              # primeiro deploy (preview)
vercel --prod       # publicar em produção
```

## Edição rápida de contato

- **Telefone / WhatsApp:** procure por `5544988117615` em `index.html` e `script.js`
- **E-mail:** procure por `central.construtora.br@gmail.com` em `index.html`

## Notas

- Os arquivos `.MOV` originais (4K HEVC, ~640 MB no total) **não são versionados**
  no Git — apenas as versões `.mp4` otimizadas (H.264, 1080p, sem áudio).
  Se precisar reconverter, há um script local com `ffmpeg-static` (veja
  `package.json` ignorado).
- O formulário de contato monta a mensagem e abre o WhatsApp do número
  configurado — não há backend.
