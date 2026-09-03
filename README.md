<<<<<<< HEAD
# Gerador de Orçamentos Nahuentur

Versão em HTML, CSS e JavaScript pronta para abrir no VS Code e publicar gratuitamente no GitHub Pages.

## Testar no computador

1. Abra esta pasta no VS Code.
2. Abra o arquivo `index.html` no navegador ou use a extensão Live Server.
3. Não é necessário instalar dependências.

## Publicar no GitHub Pages

Crie no GitHub um repositório público chamado `orcamentos-nahuentur`. Depois, abra o terminal nesta pasta e execute:

```bash
git init
git add .
git commit -m "Primeira versão do gerador"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/orcamentos-nahuentur.git
git push -u origin main
```

No GitHub:

1. Abra **Settings**.
2. Entre em **Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch **main** e a pasta **/(root)**.
5. Clique em **Save**.

O endereço ficará no formato:

`https://SEU-USUARIO.github.io/orcamentos-nahuentur/`

## Arquivos

- `index.html`: estrutura do gerador.
- `style.css`: identidade visual e responsividade.
- `script.js`: pré-qualificação, descontos, cálculos, montagem e cópia dos orçamentos.
- `tours.js`: passeios, detalhes e valores comerciais.
- `assets/nahuentur-logo.webp`: logo utilizada no cabeçalho.

## Atualizar passeios e valores

Abra o arquivo `tours.js`. Cada passeio possui um objeto com nome, detalhes, inclusões e preços. Os preços usam estas chaves:

- `"0"`: valor normal;
- `"5"`: condição de 5%;
- `"10"`: condição de 10%;
- `"15"`: condição de 15%;
- `promo`: valor promocional, quando existir.

Se uma condição não existir em determinado passeio, não adicione essa chave. O gerador manterá esse passeio no valor normal e aplicará a condição aos demais.
=======
# Nahuentur
Página de orçamentos
>>>>>>> 4fa282df3cb45d6d35bf81297441b77c657e5601
