import mongoose from "mongoose";

const RespostaSchema = new mongoose.Schema({
    data: String,
    valorResposta: String,
})

export default mongoose.model("respostaUsuario", RespostaSchema);