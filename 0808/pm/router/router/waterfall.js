

const fs = require('fs')
const mysql = require('mysql')

fs.readdir('../static/goodsImg',(err,files)=>{
    let goods = []
    files.forEach((file,index)=>{
        goods.push({
            imgurl:'/static/goodsImg/'+file
        })
    })
    goods[0].title="女款毛衣";goods[0].price=150;
    goods[1].title="女款毛衣2";goods[1].price=139;
    goods[2].title="女款露脐衬衫";goods[2].price=90;
    goods[3].title="女款卫衣";goods[3].price=180;
    goods[4].title="男款运动T恤";goods[4].price=50;
    
    let connection = mysql.createConnection({
        host     : 'localhost',//连接的数据库的域名 
        user     : 'root',
        password : '',
        database : 'node_mysql'
    })    
        connection.connect();   
    goods.forEach((good,i)=>{
        let sql = "INSERT INTO `node_mysql`.`goods` (`id`, `title`, `price`,`imgurl`) VALUES (NULL, '"+good.title+"', '"+good.price+"', '"+good.imgurl+"');"
        connection.query(sql,(error, results)=>{
            if (error) throw error;
            console.log('ok')
        });
    })  
})