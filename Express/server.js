const express = require('express');
const app = express();

const users = [];

// 미들웨어 추가를 해야 req.body 객체를 parser해서 사용할 수 있다.
app.use(express.json());

app.get('/user', function(req, res){
    res.send({users:users});
})

app.post('/user', function(req, res){
    users.push({name : req.body.name, age : req.body.age});
    return res.send({success : true});
})

app.listen(3000, function(){
    console.log('listening port 3000!')
})