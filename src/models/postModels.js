import conectarAoBanco from "../config/dbConfig.js"
import { ObjectId } from "mongodb";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getPosts() {
    const db = conexao.db("cats");
    const colecao = db.collection("cats");

    return colecao.find().toArray();
}

export async function criarPost(novoPost){
    const db = conexao.db("cats");
    const colecao = db.collection("cats");

    return colecao.insertOne(novoPost);
}

export async function updatePost(id, post){
    const db = conexao.db("cats");
    const colecao = db.collection("cats");
    // É um identificador único gerado automaticamente para cada documento.
    // Composto por timestamp, valor aleatório e contador, garantindo unicidade e ordem de criação.
    //(comentário gerado via Gemini)
    const objID = ObjectId.createFromHexString(id)

    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:post});
}
