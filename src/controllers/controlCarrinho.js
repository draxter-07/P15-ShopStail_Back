import joi from "joi"
import { MongoClient } from 'mongodb'
import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
var db;
mongoClient.connect().then(db = mongoClient.db());

export function getCarrinho(){
    // Verifica credenciais
    // Envia uma array com os objetos do carrinho
}