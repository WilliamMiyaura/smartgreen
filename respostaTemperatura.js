import mongoose from "mongoose";

const RespostaSchema = new mongoose.Schema({
    data: String,
    valorTemperatura: Number,
})

export default mongoose.model("respostaTemperatura", RespostaSchema);