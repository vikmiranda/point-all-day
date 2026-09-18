# Boca a Boca — MVP

MVP de catálogo de tabacaria em Flask + HTML/CSS/JS puro.

## Fluxo

Catálogo → Carrinho → Nome → Entrega/Retirada → Endereço (se entrega) → Total → WhatsApp.

## Rodar

```bash
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

pip install -r requirements.txt
python app.py
```

Abra `http://localhost:5000`.

## WhatsApp

Em `static/app.js`, altere:

```js
const whatsappNumber="5582987638446";
```

para o número comercial real, em formato internacional, sem `+`, espaços ou símbolos.

## Produtos

Os mocks ficam no `PRODUCTS` de `app.py`. Depois podem ser migrados para JSON ou banco.

## Observação

O projeto é um protótipo. Antes de usar comercialmente, adapte o catálogo, políticas e fluxo de venda às regras aplicáveis ao local e aos produtos comercializados.
