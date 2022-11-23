const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const port = 3000;
var path = require('path');
const app = express();

app.use(session({secret:'1234'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("views"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));



let usuarios = [];
let tag = false


app.get('/',(req,res)=>{
    res.render('index.html');
})

app.post('/logar',(req,res)=>{
    tag = false
    for(let i = 0; i < usuarios.length; i++){
        if(usuarios[i].usuario === req.body.login && usuarios[i].senha === req.body.password){
            tag = true
            res.redirect('login.html')
        }
    }
    if(tag == false){
        res.redirect('index.html')
    }
})

app.post('/cadastro',(req,res)=>{
    let usuario = {}
    usuario.nome = req.body.nome
    usuario.email = req.body.email
    usuario.usuario = req.body.usuario
    usuario.senha = req.body.senha
    usuarios.push(usuario)
    res.redirect('index.html')
})


app.listen(port,()=>{
    console.log('ligado')
})
