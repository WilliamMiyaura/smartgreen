// Script para testar a API e adicionar dados de exemplo
// Execute com: node testar-api.js

const API_URL = "http://3.235.223.29:3000/resposta";

// Função para testar GET
async function testarGet() {
    console.log("🔍 Testando GET /resposta...");
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("✅ Status:", response.status);
        console.log("📊 Dados recebidos:", data.length, "registros");
        console.log("📄 Últimos 3 registros:", data.slice(-3));
        return data;
    } catch (error) {
        console.error("❌ Erro no GET:", error.message);
        return null;
    }
}

// Função para adicionar dados de teste
async function adicionarDadosTeste() {
    console.log("\n➕ Adicionando dados de teste...");
    
    const dadosTeste = {
        data: new Date().toLocaleString('pt-BR'),
        valorTemperatura: Math.random() * 30 + 10, // 10-40°C
        valorHumidade: Math.random() * 40 + 40,    // 40-80%
        luminosidade: Math.floor(Math.random() * 50) + 10  // 10-60
    };
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosTeste)
        });
        
        const data = await response.json();
        console.log("✅ Status:", response.status);
        console.log("📝 Dados inseridos:", data);
        return data;
    } catch (error) {
        console.error("❌ Erro no POST:", error.message);
        return null;
    }
}

// Testar Health Check
async function testarHealth() {
    console.log("\n🏥 Testando Health Check...");
    try {
        const response = await fetch("http://3.235.223.29:3000/health");
        const data = await response.json();
        console.log("✅ Status do servidor:", data);
    } catch (error) {
        console.error("❌ Servidor não está respondendo:", error.message);
    }
}

// Executar testes
async function executarTestes() {
    console.log("🚀 Iniciando testes da API SmartGreen\n");
    console.log("=" .repeat(50));
    
    // 1. Testar health
    await testarHealth();
    
    // 2. Testar GET
    const dados = await testarGet();
    
    // 3. Adicionar dados de teste
    await adicionarDadosTeste();
    
    // 4. Verificar se os dados foram adicionados
    console.log("\n🔄 Verificando novamente...");
    await testarGet();
    
    console.log("\n" + "=".repeat(50));
    console.log("✅ Testes concluídos!");
}

executarTestes();