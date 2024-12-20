import express from "express";
import routes from "./routes/postRoutes.js"
// layout para posts a serem feitos na API

const app = express();
app.use(express.static("static"))
routes(app);

app.listen(3000, () => {
    console.log("Servidor Funcionando");
});
