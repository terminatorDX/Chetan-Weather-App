const mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'chetan',
    password:'chetan',
    database:'WeatherNow'
})

function connectDb(){
    connection.connect();
}

function signup(username,fullname,password,email,bday,address,lat,lng,cb){
    connection.query(`INSERT INTO users(username,name,password,email,birthday,place,lat,lng) values (?,?,?,?,?,?,?,?)`,[username,fullname,password,email,bday,address,lat,lng],function(err,results){
        if (err) throw err;
        console.log(results);
        cb(results);
    })
}
function getUser(username,cb){
    connection.query(`SELECT * FROM users where username=?`,username,function(err,results){
        if(err) throw err;
        console.log(results);
        cb(results);
    })
}
function logging(username){
    connection.connect(`INSERT INTO log(username) VALUES (?)`,[username],function(err,results){
        if(err) throw err;
    })
}

module.exports={
    connectDb,
    signup,
    getUser,
    logging
}