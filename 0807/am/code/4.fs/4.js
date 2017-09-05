
const fs = require('fs')

//读取文件内容，但是建议在读取之前应该先判断文件是否存在stat

fs.stat('./source/text.txt',(err)=>{
    if(err){
        console.log('没有该文件')
    }else{

        fs.readFile('./source/text.txt',(err,data)=>{
            if(err) throw err;
            console.log(data+'')
        })

    }
})




// let result = fs.readFileSync('./source/text.txt')

// console.log(result+'')