# smartgreen
Projeto 🈷️

## Configuração de e-mail (Mailtrap)

1. Copie `.env.example` para `.env` na raiz do projeto:

```powershell
cp .env.example .env
``` 

2. Ou cole diretamente as variáveis de ambiente no PowerShell (apenas para sessão atual):

```powershell
$env:SMTP_HOST = "bulk.smtp.mailtrap.io"
$env:SMTP_PORT = "587"
$env:SMTP_USER = "api, smtp@mailtrap.io"
$env:SMTP_PASS = "e41d35641143607ccac85e3a285830d2"
$env:SMTP_SECURE = "true"
$env:EMAIL_FROM = "alertas@smartgreen.local"
```

3. Instale dependências e rode o servidor:

```powershell
npm install
npm run dev
```

4. Teste enviando uma leitura que gere alerta (ex.: temperatura > 30):

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/resposta -ContentType 'application/json' -Body (@{
	valorTemperatura = 35
	valorHumidade = 55
	luminosidade = 100
} | ConvertTo-Json)
```

Verifique a inbox do Mailtrap para ver o e-mail de alerta.

> Segurança: não comite o arquivo `.env` com credenciais reais. Use `.env.example` como referência.
