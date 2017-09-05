
//给文件写入内容，如果文件不存在的话，就会创建这个文件
//
const fs = require('fs')

let str = '心想的事儿都能成！'

//如果内部有内容的话，会覆盖
fs.writeFile('./source/a/d.txt',str,{encoding:'utf-8'},(err)=>{
    if(err) throw err;
    console.log('success')
})
//会在后面去追加内容
fs.appendFile('./source/a/d.txt',str,{encoding:'utf-8'},(err)=>{
    if(err) throw err;
    console.log('success')
})


// writeFileSync/appendFileSync