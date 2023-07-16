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

export function postCarrinho(req, res){
    const auth = req.headers.authorization;
    db.collection("Usuários").findOne({ _id: new ObjectId(auth)})
        .then(user =>{
            let newObj = [];
            for (let a = 0; a < user.cart.length; a++){
                newObj.push({productId: user.cart[a]._id, quantity: user.cart[a].quantity, totalPrice: user.cart[a].totalPrice})
            }
            const userObj = {_id: user._id, id: user.id, cart: [], buys: newObj};
            db.collection("Usuários").findOneAndReplace({ _id: new ObjectId(auth)}, userObj)
                .then(resposta => {
                    db.collection("Vendas").insertOne({userId: user._id, products: newObj})
                        .then(resposta => res.status(200).end())
                        .catch(err => err.message);
                })
                .catch(err => err.message);
        })
        .catch(err => console.log(err.message));
}