
//查看文件 查看文件信息 多用于判断这个文件是否存在

const  fs = require('fs')

//特点：操作大部分都分为同步和异步的，异步的一般由回调函数来接收结果，第一个参数一般都是err，后面的才是数据
//同步的会将结果返回出来，如果出错会直接报错，并且会阻塞代码执行

fs.stat('./source/text.txt',(err,data)=>{
    if(err) throw err;
    console.log(data)
})


//let stat = fs.statSync('./source/text.txt')
//console.log(stat)