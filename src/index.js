import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { getCarrinho} from "./controllers/controlCarrinho.js"
import { postCompra } from "./controllers/controlCheckout.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/carrinho", getCarrinho);

app.post("/checkout", postCheckout);

app.listen(5000, () => console.log("Running on port 5000"));
