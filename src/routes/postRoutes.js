import express from "express";
import multer from "multer";
import cors from "cors"
import { listarPosts, uploadPost, uploadImagem, updatePostController  } from "../controllers/postControllers.js";


const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}


// EXIGE UM FIX NO CASO DE EXECUÇÃO em ambiente windows
const upload = multer({dest: "./static/" });

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions))

    app.get("/posts", listarPosts);


    app.post("/posts", uploadPost);

    app.post("/upload", upload.single('imagem'), uploadImagem);

    app.put("/upload/:id", updatePostController);

    
};

export default routes;
