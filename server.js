import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import respostaUsuario from "./respostaUsuario.js";

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
    try{    const novaRespostaUsuario = await respostaUsuario.create(req.body);
    res.json(novaRespostaUsuario);}catch(error){
        res.json({error : error})
    }

})

//READ
app.get("/resposta", async (req, res) => {
    try{    
        const respostasUsuario = await respostaUsuario.find();
        res.json(respostasUsuario)
    }catch(error){
        res.json({error : error})
    }

})

//UPDATE
app.put("/resposta/:id", async (req, res) => {
    try{    
        const editRespostaUsuario = await respostaUsuario.findByIdAndUpdate(req.params.id, req.body, {new: true});
    }catch(error){
        res.json({error : error})
    }

})

//DELETE
app.put("/resposta/:id", async (req, res) => {
    try{    
        const respostaUsuarioExcluida = await respostaUsuario.findByIdAndDelete(req.params.id);
        res.json(respostaUsuarioExcluida);
    }catch(error){
        res.json({error : error})
    }

})

app.get("/", (req, res) => {})

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));