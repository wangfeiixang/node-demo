
var express = require('express')

var router = express.Router()

var moment = require('moment')

var async = require('async')
//引入mongodb模块
const mongodb = require('mongodb')
//连接mongo数据库的配置信息
const MongoClient = mongodb.MongoClient

const mongourl = 'mongodb://127.0.0.1:27017/project'

router.get('/',(req,res)=>{
    res.render('comment',{
         title: 'Express' 
    })
})

//提交评论信息

router.post('/submit',(req,res)=>{
    //判断是否是登陆的，只有在登陆之后才能评论
    if(!req.session.username){
        res.send('<script>alert("登陆信息不存在，请重新登陆");window.location.href="/login"</script>')
        return false;
    }
    //要插入的评论信息
    var info = {
        username:req.session.username,
        title:req.body['title'],
        content:req.body['content'],
        time:moment().format('YYYY-MM-DD HH:mm:ss')
    }

    async.waterfall([

        function(cb){
            //先去将ids集合里关于comment 的一个文档 里的count去自增，准备作为comment集合里新的文档的id
            MongoClient.connect(mongourl,(err,db)=>{
                if(err) throw err;
                //获取到用户的集合
                let coll = db.collection('ids')
                coll.findAndModify(
                    {name:'comment'},
                    [['_id','desc']],
                    {$inc:{count:1}},
                    (err,results)=>{
                        if(err) throw err;
                        info.id = results.value.count+1
                        cb(null,info)
                    }
                )
                
            })
        },
        function(info,cb){
            //得到新的拥有id属性的评论信息后，插入到comment集合里
            MongoClient.connect(mongourl,(err,db)=>{
                if(err) throw err;
                //获取到用户的集合
                let coll = db.collection('comment')
                coll.insert(info,(err,results)=>{
                    if(err) throw err;
                    cb(null,results)
                    db.close()
                })
                
            })
        }
    ],function(err,results){
        //进行判断，做出跳转的动作
        if(results.insertedCount==1){
            res.redirect('/comment/list')
        }else{
            res.redirect('/comment')
        }
    })
})

//评论列表
router.get('/list',(req,res)=>{
    //设置页码信息
    let pageInfo = {
        pageSize:5,//每页显示几条
        pageNum:req.query.pageNum?parseInt(req.query.pageNum):1,//显示第几页
        count:0,//总共有几条,
        totalPage:0//总共有几页
    }


    // 先去获取我们的评论信息，在渲染list模板的时候给带上

    async.waterfall([

        function(cb){
            MongoClient.connect(mongourl,(err,db)=>{
                if(err) throw err;
                //获取到用户的集合
                let coll = db.collection('comment')
                coll.find({}).toArray((err,results)=>{
                    if(err) throw err;
                    pageInfo.count = results.length
                    pageInfo.totalPage = Math.ceil(pageInfo.count/pageInfo.pageSize)

                    cb(null,pageInfo)
                })
                
            })
        },
        function(pageInfo){
            MongoClient.connect(mongourl,(err,db)=>{
                if(err) throw err;
                let coll = db.collection('comment')
                //取到对应页数的评论内容  skip 从第几条开始取  limit 取几条 按照id降序排列
                coll.find({}).sort({id:-1}).skip((pageInfo.pageNum-1)*pageInfo.pageSize).limit(pageInfo.pageSize).toArray((err,results)=>{
                   res.render('list',{
                        title: 'Express',
                        comments:results,
                        username:req.session.username,
                        pageInfo:pageInfo
                    })
                    db.close()
                })
                
            })
        }
    ]) 
})


//删除评论
router.get('/delete',(req,res)=>{
    //这B玩意儿是一个字符串，从前端传递过来的是一个字符串，这是一个坑！！！
    let id = parseInt(req.query.id)
    MongoClient.connect(mongourl,(err,db)=>{
        if(err) throw err;
        let coll = db.collection('comment')
        coll.remove({id:id},{justOne:true},(err,results)=>{
            if(err) throw err;
            res.redirect('/comment/list')
            db.close()
        })
        
        
    })

})


const multiparty = require("multiparty")
const fs = require('fs')

router.post('/uploadImg',(req,res)=>{
    //form上有很多有关上传上来数据的相关信息
   const form = new multiparty.Form()

   //设置字符编码
   form.encoding = 'utf-8'

   //临时存储路径
   form.uploadDir = './uploadTemp'

   //大小限制
   form.maxFileSize = 1024*1024*2

   //开始解析form接受到的数据
   form.parse(req,(err,filed,files)=>{
       //图片想要放入的地方
       let uploadUrl = '/images/upload/'
       //图片文件信息
       let file = files['filedata']

        //图片名字
        let originalFileName = file[0].originalFilename

        //文件现在的位置
        let temppath = file[0].path
        let time = Date.now()+''
        uploadUrl+=time+originalFileName

        //图片要放入的真正的位置
        let newPath = './public'+uploadUrl

        let fileReadStream = fs.createReadStream(temppath)
        let fileWriteStream = fs.createWriteStream(newPath)

        fileReadStream.pipe(fileWriteStream)

        fileReadStream.on('close',()=>{
            fs.unlinkSync(temppath)
            res.send(JSON.stringify({err:'',msg:uploadUrl}))
        })
   })
   
})



router.get('/detail',(req,res)=>{

    let id = parseInt(req.query.id)
    MongoClient.connect(mongourl,(err,db)=>{
        if(err) throw err;
        let coll = db.collection('comment')
        coll.find({id:id}).toArray((err,results)=>{
            if(err) throw err;
            if(results.length){
                res.render('detail',{
                    title: 'Express',
                    flag:true,
                    username:req.session.username,
                    comment:results[0]
                })
            }else{
                res.render('detail',{
                    title: 'Express',
                    flag:false
                })
            }
        })
        
        
    })

    
})

module.exports = router;