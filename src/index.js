import express from "express"
import cors from "cors"
import { getProdutos, postProdutos } from "./controllers/controlProdutos.js"
import { postLogin } from "./controllers/controlLogin.js"
import { getCarrinho, postCarrinho } from "./controllers/controlCarrinho.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/login", postLogin);

app.get("/produtos", getProdutos);

app.post("/produtos", postProdutos);

app.get("/carrinho", getCarrinho);

app.post("/carrinho", postCarrinho);

app.listen(5000, () => console.log("Running on port 5000"));
