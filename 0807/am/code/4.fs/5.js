//读取目录

const fs = require('fs')

fs.readdir('./source',(err,files)=>{
    if(err) throw err;
    console.log(files)
})

// let files = fs.readdirSync('./source')
// console.log(files)