

const fs = require('fs')
const fse = require('fs-extra')

let path = './source/a.txt'
let newpath = './source/a/a-副本.txt'

// fs.readFile(path,(err,data)=>{
//     if(err) throw err;
//     fs.writeFile(newpath,data,(err)=>{
//         if(err) throw err;
//         console.log('success')
//     })
// })

// fse.copy(path,newpath,(err)=>{
//     if(err) throw err;
//     console.log('success')
// })

// let fse1=fse.copySync(path,newpath)
// console.log('成功')

// fse.remove('./source/a',function(err) {
//   if (err) return console.error(err)

//   console.log("success!")
// })


// fse.emptyDir('./source', err => {
//   if (err) return console.error(err)
//     console.log('success!')
// })

// fse.mkdirs('./source/a/b/c',err=>{
//     if(err) throw err;
//     console.log('success')
// })