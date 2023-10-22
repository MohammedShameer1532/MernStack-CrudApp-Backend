const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const server = express();
const UserModel = require('./model/User');

main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect('mongodb+srv://mshameer260:mshameer260@fullstackapp.og1j1sm.mongodb.net/fullstack',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        );
        console.log("db connected");
    } catch (err) {
        console.error(err);
    }
}
// const corsOptions = {
//     origin: "https://full-stack-crud-app-frontend.vercel.app",
//     optionsSuccessStatus: 200,
//     methods: "POST, GET, PUT, DELETE",
//     credentials: true,
//     allowedHeaders: "Content-Type"
// };

server.use(cors());
server.use(bodyparser.json());
server.use(express.json());

server.get('/read', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

server.get('/update/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
server.post('/create', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
server.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id },
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

server.delete('/deleteUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(users => res.json(res))
    .catch(err => res.json(err))

})
server.listen(1527, () => {
    console.log("server is running");
})
