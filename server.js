import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import respostaSensores from "./respostaSensores.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite requisições de outros domínios
app.use(express.json());
app.use(express.static("public"));

// Conectar ao MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(1);
    }
};

connectDB();

// Middleware de validação
const validarDadosSensor = (req, res, next) => {
    const { valorTemperatura, valorHumidade, luminosidade } = req.body;
    
    if (valorTemperatura === undefined || valorHumidade === undefined || luminosidade === undefined) {
        return res.status(400).json({ 
            error: "Dados incompletos. Necessário: valorTemperatura, valorHumidade, luminosidade" 
        });
    }
    
    next();
};

// CREATE - Criar nova leitura
app.post("/resposta", validarDadosSensor, async (req, res) => {
    try {
        const dadosComData = {
            ...req.body,
            data: req.body.data || new Date().toLocaleString('pt-BR')
        };
        
        const novaRespostaSensores = await respostaSensores.create(dadosComData);
        res.status(201).json(novaRespostaSensores);
    } catch (error) {
        console.error("Erro ao criar leitura:", error);
        res.status(500).json({ error: "Erro ao salvar dados dos sensores" });
    }
});

// READ - Listar todas as leituras (com limite opcional)
app.get("/resposta", async (req, res) => {
    try {
        const limite = req.query.limite ? parseInt(req.query.limite) : 50;
        const respostasSensores = await respostaSensores
            .find()
            .sort({ _id: -1 }) // Mais recentes primeiro
            .limit(limite);
        
        res.json(respostasSensores);
    } catch (error) {
        console.error("Erro ao buscar leituras:", error);
        res.status(500).json({ error: "Erro ao buscar dados dos sensores" });
    }
});

// READ - Buscar leitura específica
app.get("/resposta/:id", async (req, res) => {
    try {
        const leitura = await respostaSensores.findById(req.params.id);
        
        if (!leitura) {
            return res.status(404).json({ error: "Leitura não encontrada" });
        }
        
        res.json(leitura);
    } catch (error) {
        console.error("Erro ao buscar leitura:", error);
        res.status(500).json({ error: "Erro ao buscar leitura" });
    }
});

// UPDATE - Atualizar leitura
app.put("/resposta/:id", async (req, res) => {
    try {
        const editRespostaSensores = await respostaSensores.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!editRespostaSensores) {
            return res.status(404).json({ error: "Leitura não encontrada" });
        }
        
        res.json(editRespostaSensores);
    } catch (error) {
        console.error("Erro ao atualizar leitura:", error);
        res.status(500).json({ error: "Erro ao atualizar dados" });
    }
});

// DELETE - Deletar leitura
app.delete("/resposta/:id", async (req, res) => {
    try {
        const respostaSensoresExcluida = await respostaSensores.findByIdAndDelete(req.params.id);
        
        if (!respostaSensoresExcluida) {
            return res.status(404).json({ error: "Leitura não encontrada" });
        }
        
        res.json({ 
            message: "Leitura excluída com sucesso", 
            data: respostaSensoresExcluida 
        });
    } catch (error) {
        console.error("Erro ao excluir leitura:", error);
        res.status(500).json({ error: "Erro ao excluir dados" });
    }
});

// DELETE ALL - Limpar todas as leituras (útil para testes)
app.delete("/resposta", async (req, res) => {
    try {
        const resultado = await respostaSensores.deleteMany({});
        res.json({ 
            message: "Todas as leituras foram excluídas", 
            count: resultado.deletedCount 
        });
    } catch (error) {
        console.error("Erro ao limpar leituras:", error);
        res.status(500).json({ error: "Erro ao limpar dados" });
    }
});

// Rota de health check
app.get("/health", (req, res) => {
    res.json({ 
        status: "ok", 
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? "conectado" : "desconectado"
    });
});

// Tratamento de rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ error: "Rota não encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);

});