import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import respostaSensores from "./respostaSensores.js";

dotenv.config();


const app = express();
const PORT = 3000;
//const objResponse = {name: 'Smartgreen', company: 'SmartVSB'}

//app.get('/', (req, res) => {res.json(objResponse)})

app.use(express.json());
app.use(express.static("public"));

const connectDB = async () => {
    try {await mongoose.connect(process.env.MONGO_URI)
    console.log("Conectado ao MongoDB")
;
}catch (error) { console.log("Erro ao conectar ao banco de dados", error);}}
    
connectDB();


//CREATE
app.post("/resposta", async (req, res) => {
    try{    const novaRespostaSensores = await respostaSensores.create(req.body);
    res.json(novaRespostaSensores);}catch(error){
        res.json({error : error})
    }

})

//READ
app.get("/resposta", async (req, res) => {
    try{    
        const respostasSensores = await respostaSensores.find();
        res.json(respostasSensores)
    }catch(error){
        res.json({error : error})
    }

})

//UPDATE
app.put("/resposta/:id", async (req, res) => {
    try{    
        const editRespostaSensores = await respostaSensores.findByIdAndUpdate(req.params.id, req.body, {new: true});
    }catch(error){
        res.json({error : error})
    }

})

//DELETE
app.delete("/resposta/:id", async (req, res) => {
    try{    
        const respostaSensoresExcluida = await respostaSensores.findByIdAndDelete(req.params.id);
        res.json(respostaSensoresExcluida);
    }catch(error){
        res.json({error : error})
    }

})

//app.get("/", (req, res) => {})

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));