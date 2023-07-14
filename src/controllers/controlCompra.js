import joi from "joi"
import { MongoClient } from 'mongodb'
import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
var db;
mongoClient.connect().then(db = mongoClient.db());

export function postCompra(){
    // Verifica credenciais
    // Verifica os dados de pagamento
    // Envia para a database Venda
    // Retorna 200
}