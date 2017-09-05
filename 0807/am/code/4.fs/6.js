//重命名 不仅能重命名，还能移动文件

const fs = require('fs')

fs.rename('./source/a/d.txt','./source/text.txt',(err)=>{
    if(err) throw err;
    console.log(err)
})


// fs.renameSync