import mongoose from "mongoose";

const RespostaSchema = new mongoose.Schema({
    data: String,
    valorTemperatura: Number,
    valorHumidade: Number,
    luminosidade: Number
})

export default mongoose.model("respostaSensores", RespostaSchema);