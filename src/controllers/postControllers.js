import {getPosts, criarPost, updatePost} from "../models/postModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPosts( req, res ){
    const posts = await getPosts();

    res.status(200).json(posts);
}


export async function uploadPost(req, res) {
    const novoPost = req.body;

    try {
	const postCriado = await criarPost(novoPost);
	
	res.status(200).json(postCriado);
    }

    catch(erro) {
	console.error(erro.message);
	res.status(500).json({"Erro": "Misc"})
    }
    
}

export async function uploadImagem(req, res){
     //mantendo uma estrutura pronta ao invés de confiar em um body inferido a partir da requisição do usuário
    const novoPost = {
	descricao: "",
	imgUrl: req.file.originalname,
	alt: ""
    };

    try {
	const postCriado = await criarPost(novoPost);

	// jpg ao invés, por ser mais comum no placecats (no repositório original, manteve-se como png)
	const fileImagem = `static/${postCriado.insertedId}.jpg`;
	
	fs.renameSync(req.file.path, fileImagem);
	
	res.status(200).json(postCriado);
	
    }
    catch(erro) {
	console.error(erro.message);
	res.status(500).json({"Erro": "Misc"})
    }
}


export async function updatePostController(req, res) {
    const postID = req.params.id;
    //lembrete do comentário anterior: estamos usando jpgs....
    const urlImagem = `http://localhost:3000/${postID}.jpg`;

    // buffer do prompt do Gemini a partir do arquivo no fs
    const imgBuffer = fs.readFileSync(`static/${postID}.jpg`); 
    const descricao = await gerarDescricaoComGemini(imgBuffer); 
    
    const post = {
	imgUrl: urlImagem,
	descricao: descricao,
	alt: req.body.alt
    }

    try {
	
	const postCriado = await updatePost(postID, post);
	
	res.status(200).json(postCriado);
    }

    catch(erro) {
	console.error(erro.message);
	res.status(500).json({"Erro": "Misc"})
    }
    
}
