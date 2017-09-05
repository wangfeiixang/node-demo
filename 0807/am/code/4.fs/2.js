
//创建文件夹

//当外面的文件没有的时候，是不能创建里面的文件夹的

const fs = require('fs')


fs.mkdir('./source/a/b',(err)=>{
    if(err) throw err;
    console.log('success')
})


//fs.mkdirSync('./source/a/c')

