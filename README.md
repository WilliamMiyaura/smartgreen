# 🌱 smartgreen  
**Sistema de Monitoramento Ambiental — MVP**

## 📌 Visão Geral

O **smartgreen** é uma solução de monitoramento para microambientes (como estufas, canteiros e pequenos cultivos).  
Ele coleta dados ambientais — **temperatura**, **umidade** e **luminosidade** — a partir de sensores conectados a um microcontrolador (ex.: ESP32) e disponibiliza essas informações em um **dashboard na nuvem**, acessível via navegador.

O objetivo do MVP é fornecer **visibilidade contínua** das condições do ambiente, facilitando decisões rápidas e informadas.

---

## ✅ Funcionalidades Entregues (MVP)

### 📡 Coleta de dados de sensores  
O ESP32 (ou dispositivo equivalente) envia periodicamente leituras ambientais para o backend via **requisição HTTP**.  
A rota responsável por receber esses dados está em: `respostaSensores.js`.

### 💾 Armazenamento e processamento básico  
O backend (Node.js) recebe, valida e armazena temporariamente as medições.  
Pode incluir lógicas simples como cálculo de médias, limites e preparação de alertas.

### 📊 Dashboard na nuvem  
A pasta **`public/`** contém uma interface web simples que permite visualizar:

- Leituras atuais  
- Histórico básico  
- Evolução das condições do microambiente  

Ideal para acesso remoto via navegador.

---

## 🎯 Problema que o smartgreen Resolve

Ambientes como microcultivos ou estufas exigem **monitoramento frequente** para evitar perdas, detectar anomalias e agir rapidamente.  
Fazer isso manualmente é improdutivo e sujeito a erros.

Com o smartgreen, o usuário:

- Não precisa estar presencialmente no local.  
- Acompanha tudo online via dashboard.  
- Pode identificar tendências ou comportamentos anormais.  
- Tem mais segurança e controle para decidir sobre irrigação, ventilação e iluminação.

**Em resumo:** o smartgreen agrega valor ao automatizar a coleta e visualização de dados ambientais, acessíveis de qualquer lugar.

---

## 🧱 Arquitetura Técnica

[Sensores (temp/umid/luz)]
│
▼
[ESP32 / Microcontrolador]
│ HTTP/HTTPS
▼
[Backend Node.js (server.js)]
│
▼
[Dashboard Web (public/)]

### 🔌 Fluxo detalhado

1. **Sensor → ESP32**  
   O microcontrolador lê sensores de temperatura, umidade e luminosidade.

2. **ESP32 → Backend**  
   Envia uma requisição **POST** periódica para o backend contendo as medições.

3. **Backend**  
   Recebe os dados, trata, armazena e disponibiliza para consulta.

4. **Dashboard Web**  
   Interface acessível ao usuário para visualizar dados em tempo real ou históricos.

Essa arquitetura segue padrões comuns em soluções **IoT + Cloud**, sendo simples, modular e escalável.

---

## 🌐 Acesso ao Dashboard (Cliente)

Para visualizar os dados monitorados:

1. Abra seu navegador (Chrome, Edge, Firefox, etc.).  
2. Acesse a URL do dashboard fornecida pela equipe do projeto.  
3. Você verá o painel com:
   - Leituras atualizadas  
   - Indicadores ambientais  
   - Gráficos e históricos básicos  

Nenhuma instalação é necessária. Basta acessar a página e acompanhar o ambiente monitorado em tempo real.

---

