import { MongoClient } from 'mongodb'
import dotenv from "dotenv"

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
var db;
mongoClient.connect().then(db = mongoClient.db());

export function postLogin(req, res){
    const auth = req.headers.authorization;
    const email = req.body.email;
    const passw = req.body.password;
    db.collection("Usuários").find().toArray()
        .then(users => {
            for (let a = 0; a < users.length; a++){
                if (users[a].id.email == email){
                    if (users[a].id.password == passw){
                        res.send(users[a]._id).status(200).end();
                        break;
                    }
                    else{
                        res.send("Senha incorreta").status(422).end();
                        break;
                    }
                }
                else if (a == users.length - 1 && users[a].id.email != email){
                    res.send("Usuário não encontrado").status(404).end();
                }
            }
        })
}