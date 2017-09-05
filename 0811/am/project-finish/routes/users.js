

var express = require('express');
var router = express.Router();


//引入mongodb模块
const mongodb = require('mongodb')
//连接mongo数据库的配置信息
const MongoClient = mongodb.MongoClient

const mongourl = 'mongodb://127.0.0.1:27017/project'

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登陆
router.post('/login', function(req, res, next) {
  let user = {
    username:req.body.username,
    password:req.body.password
  }

  MongoClient.connect(mongourl,(err,db)=>{
    if(err) throw err;
    //获取到用户的集合
    let coll = db.collection('user')
    coll.find({username:user.username}).toArray((err,results)=>{
      if(err) throw err;
      if(!results.length){
        res.redirect('/login')
      }else{
        if(results[0].password!=user.password){
           res.redirect('/login')
        }else{
          req.session.username = user.username
          res.redirect('/')
        }
      }
      db.close()
    })
  })


});

//注册
router.post('/register', function(req, res, next) {
  //body-parser 会将前端发送过来的数据放在req的身上   post：req.body
  let user = {
    username:req.body.username,
    password:req.body.password
  }
  //与数据库建立连接，得到库对象
  MongoClient.connect(mongourl,(err,db)=>{
    if(err) throw err;
    //获取到用户的集合
    let coll = db.collection('user')
    coll.find({username:user.username}).toArray((err,results)=>{
      if(err) throw err;
      if(results.length){
        res.redirect('/register')
        db.close()
      }else{
        coll.insert(user,(err,results)=>{
          if(err) throw err;
          console.log(results)
          res.redirect('/login')
          db.close()
        })
      }
    })
  })

});

module.exports = router;
