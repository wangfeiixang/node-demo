


const fs = require('fs')

//rmdir删除目录，但是目录必须是空的
//unlink删除文件
// fs.rmdir('./source/a',(err)=>{
//     if(err) throw err;
//     console.log('success')
// })


fs.readdir('./source',(err,files)=>{
    if(err) throw err;
    files.forEach((file,i)=>{
        let stats=fs.statSync('./source/'+file)
        if(stats.isFile()){
            fs.unlink('./source/'+file)
        }else{
           fs.readdir('./source/'+file,(err,_files)=>{
                if(err) throw err;
                _files.forEach((_file,i)=>{
                    let stats=fs.statSync('./source/'+file+'/'+_file)
                    if(stats.isFile()){
                        fs.unlink('./source/'+file+'/'+_file)
                    }else{
                       fs.readdir('./source/'+file+'/'+_file,(err,$files)=>{
                           if($files.length==0){
                               fs.rmdir('./source/'+file+'/'+_file)
                           }
                       })
                    }
                })
                 fs.rmdir('./source/'+file)
            }) 
        }
    })
})