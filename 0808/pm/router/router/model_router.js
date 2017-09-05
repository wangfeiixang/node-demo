
const mysql = require('mysql')
const async = require('async')
const model_router = {    
    connectionInfo:{
        host     : 'localhost',//连接的数据库的域名 
        user     : 'root',
        password : '',
        database : 'node_mysql'
    },
    table:{//数据路由表，根据请求的结构不一样，走不同的处理程序
        'login':function(urlobj,res){
            this.login(urlobj,res)
        },
        'register':function(urlobj,res){
            this.register(urlobj,res)
        },
        'goods':function(urlobj,res){
            this.goods(urlobj,res)
        },
        'addgood':function(urlobj,res){
            this.addgood(urlobj,res)
        }
    },
    classify(urlobj,res){
      
        let type = urlobj.pathname.split('/')[2]   
        if(this.table[type]){
            this.table[type].call(this,urlobj,res)
        }else{
            res.writeHead(404)
            res.end('请求的资源不存在..')
        }
        
    },
    login(urlobj,res){
        let username = urlobj.query.username
        let password = urlobj.query.password 
        let connection = mysql.createConnection(this.connectionInfo)    
        connection.connect();  
        let echo = 0     
        connection.query('select * from user',(error, results)=>{
            if (error) throw error;
            for(let i =0;i<results.length;i++){
                if(results[i].username==username){
                    echo = 1
                    if(results[i].password==password){
                        echo = 2
                    }
                    break;
                }
            }
            res.writeHead(200,{'Content-Type':'application/json'})
            res.end(echo+'')
        });       
        connection.end();        
    },
    register(urlobj,res){
        let username = urlobj.query.username
        let password = urlobj.query.password
        let connection = mysql.createConnection(this.connectionInfo)    
        connection.connect();  
        
        async.waterfall([
            function(cb){
                connection.query('select * from user',(error, results)=>{
                    if (error) throw error;
                    let canregister = true
                    for(let i =0;i<results.length;i++){
                        if(results[i].username==username){
                           canregister = false
                           break;
                        }
                    }
                    
                    cb(null,canregister)
                });
            },
            function(canregister){
                if(!canregister){//用户名已存在
                    res.writeHead(200,{'Content-Type':'application/json'})
                    res.end(0+'')
                    connection.end()
                    return false;
                }
                let sql = "INSERT INTO `node_mysql`.`user` (`id`, `username`, `password`) VALUES (NULL, '"+username+"', '"+password+"');"
                connection.query(sql,(error, results)=>{
                    if(error) throw error;
                    let echo  = 1
                    if(results.affectedRows==1){
                        echo = 2
                    }
                    res.writeHead(200,{'Content-Type':'application/json'})
                    res.end(echo+'')
                });
            }
        ])

        //两次异步请求，第一次异步结束之后才能进行第二次异步请求

        //ajax->  classid    ajax->goods   
        
    },
    goods(urlobj,res){
        let connection = mysql.createConnection(this.connectionInfo)    
        connection.connect();      
        connection.query('select * from goods',(error, results)=>{
            if (error) throw error;            
            res.writeHead(200,{'Content-Type':'application/json'})
            res.end(JSON.stringify(results))
        });       
        connection.end();
    },
    addgood(urlobj,res){//加入购物车的方法
        // 有一个表  user_car 专门来存放每一个用户的购物信息  任务就是操作这个表 （更新，插入）
        //前端传递过来用户名和商品id
        let username = urlobj.query.username
        let goodid = urlobj.query.goodid

        //给user_car表里的某一条里更改数据（插入goods）

        //创建好数据库的连接
        let connection = mysql.createConnection(this.connectionInfo)
        connection.connect();

        //异步流程控制
        async.waterfall([
            function(cb){   
                //查询user_car表里有没有这个用户的购物信息
                let goods = []                
                connection.query("SELECT * FROM `user_car` WHERE `username` = '"+username+"'",(error, results)=>{
                    if (error) throw error;  
                    if(results.length){
                        //如果有这个用户的购物信息的话
                        //取出他 的购物信息
                        goods=JSON.parse(results[0].goods)||[]

                        //数据的更改
                        let has=false
                        //如果购物信息里有这个商品，商品++

                        goods.forEach((good,i)=>{
                            if(good.goodid==goodid){
                                good.num++
                                has = true
                            }
                        })
                        //如果没有这个商品，就追加一条商品
                        if(!has){
                            goods.push({goodid:goodid,num:1})
                        }

                        cb(null,true,goods)                     
                    }else{
                       //如果没有这个用户的购物信息的话，相当于他没有购物，直接来一个新的goods
                        goods=[{goodid:goodid,num:1}]
                        cb(null,false,goods)
                    }
                });                     
            },
            function(flag,goods){//根据有没有这个用户的购物信息，来进行不同的操作
                if(flag){
                    //如果有这个用户丶购物信息的话，进行更新   update
                    let sql = "UPDATE `node_mysql`.`user_car` SET `goods` = '"+JSON.stringify(goods)+"' WHERE `user_car`.`username` = '"+username+"';"
                    connection.query(sql,(error, results)=>{
                        if(error) throw error;
                        console.log('ok1')
                        res.writeHead(200,{'Content-Type':'application/json'})
                        res.end('1')
                    });
                }else{
                    //如果没有这个用户丶购物信息的话，将这个用户的购物信息插入user_car里面去
                    let sql = "INSERT INTO `node_mysql`.`user_car` (`id`, `username`, `goods`) VALUES (NULL, '"+username+"', '"+JSON.stringify(goods)+"');"
                    connection.query(sql,(error, results)=>{
                        if(error) throw error;
                        console.log('ok2')
                        res.writeHead(200,{'Content-Type':'application/json'})
                        res.end('2')
                    });
                }
                
                connection.end()
            }
        ])
    }
   
}

module.exports = model_router