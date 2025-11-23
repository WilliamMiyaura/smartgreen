import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import respostaTemperatura from "./respostaTemperatura.js";

dotenv.config();


const app = express();
const PORT = 3000;
//const objResponse = {name: 'Smartgreen', company: 'SmartVSB'}

//app.get('/', (req, res) => {res.json(objResponse)})

app.use(express.json());

const connectDB = async () => {
    try {await mongoose.connect(process.env.MONGO_URI)
    console.log("Conectado ao MongoDB")
;
}catch (error) { console.log("Erro ao conectar ao banco de dados", error);}}
    
connectDB();


//CREATE
app.post("/resposta", async (req, res) => {
    try{    const novaRespostaTemperatura = await respostaTemperatura.create(req.body);
    res.json(novaRespostaTemperatura);}catch(error){
        res.json({error : error})
    }

})

//READ
app.get("/resposta", async (req, res) => {
    try{    
        const respostasTemperatura = await respostaTemperatura.find();
        res.json(respostasTemperatura)
    }catch(error){
        res.json({error : error})
    }

})

//UPDATE
app.put("/resposta/:id", async (req, res) => {
    try{    
        const editRespostaTemperatura = await respostaTemperatura.findByIdAndUpdate(req.params.id, req.body, {new: true});
    }catch(error){
        res.json({error : error})
    }

})

//DELETE
app.delete("/resposta/:id", async (req, res) => {
    try{    
        const respostaTemperaturaExcluida = await respostaTemperatura.findByIdAndDelete(req.params.id);
        res.json(respostaTemperaturaExcluida);
    }catch(error){
        res.json({error : error})
    }

})

//app.get("/", (req, res) => {})

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));