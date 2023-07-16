import { MongoClient, ObjectId } from 'mongodb'
import dotenv from "dotenv"

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
var db;
mongoClient.connect().then(db = mongoClient.db());

export function getProdutos(req, res){
    const auth = req.headers.authorization;
    db.collection("Produtos").find().toArray()
        .then(products => {
            db.collection("Usuários").findOne({ _id: new ObjectId(auth)})
                .then(user =>{
                    for (let a = 0; a < user.cart.length; a++){
                        for (let b = 0; b < products.length; b++){
                            if (user.cart[a]._id.toString() == products[b]._id.toString()){
                                products[b].onCart = "1";
                            }
                        }
                    }
                    res.send(products).end();
                })
                .catch(err => console.log(err.message));
        })
        .catch(err => console.log(err.message));
}

export function postProdutos(req, res){
    const auth = req.headers.authorization;
    const id = req.body._id;
    const price = req.body.totalPrice;
    const quantity = req.body.quantity;
    const title = req.body.title;
    const image = req.body.image;
    const quantityAvailable = req.body.quantityAvailable
    db.collection("Usuários").findOne({ _id: new ObjectId(auth) })
        .then(user => {
            let newObj = {_id: user._id, id: user.id, cart: [...user.cart, {_id: new ObjectId(id), quantity: quantity, totalPrice: price, title: title, image: image, quantityAvailable: quantityAvailable}]};
            db.collection("Usuários").replaceOne({ _id: new ObjectId(auth)}, newObj)
                .then(resposta => {
                    db.collection("Produtos").find().toArray()
                        .then(products => getProdutos(req, res))
                        .catch(err => err.message);
                })
                .catch(err => err.message);
        })
        .catch(err => err.message);
}