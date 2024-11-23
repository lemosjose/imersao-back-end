import conectarAoBanco from "../config/dbConfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export default async function getPosts() {
    const db = conexao.db("cats");
    const colecao = db.collection("cats");

    return colecao.find().toArray();
}

