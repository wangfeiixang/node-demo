var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',username:req.session.username });
});

router.get('/register',(req,res)=>{
  res.render('register', { title: 'Express' });
})
router.get('/login',(req,res)=>{
  res.render('login', { title: 'Express' });
})

module.exports = router;
