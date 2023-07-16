import joi from "joi"
import { MongoClient, ObjectId } from 'mongodb'
import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
var db;
mongoClient.connect().then(db = mongoClient.db());

export function getCarrinho(req, res){
    const auth = req.headers.authorization;
    db.collection("Usuários").findOne({ _id: new ObjectId(auth)})
        .then(user =>res.send(user.cart).status(200).end())
        .catch(err => console.log(err.message));
}