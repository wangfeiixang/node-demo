
const fs = require('fs')
const mime = require('mime')
const router = {
    classfify(pathname,res){//分流函数
        console.log(0)
        let type = pathname.split('/')[1]

        //判断是否是请求首页
        if(pathname=='/'||pathname=='/index.html'){
            this.indexHandle(res);
            return true;
        }

        //处理资源请求和数据请求的分流
        if(type=='static'){
            this.source(pathname,res)
        }else if(type=='api'){
            this.model(pathname,res)
        }else{
            this.notFound(res)
        }

    },
    source(pathname,res){ //资源请求函数
        let that = this
        fs.stat('.'+pathname,(err,stats)=>{
            if(err){
                that.notFound(res)
            }else{
                this.readAndWrite('.'+pathname,res)
            }
        })
    },
    model(){//数据请求函数

    },
    notFound(res){//处理404
        this.readAndWrite('./static/html/404.html',res)
    },
    ignoreIco(pathname,res){//处理ico
        if(pathname=='/favicon.ico'){
            this.notFound(res)
        }
    },
    indexHandle(res){//处理首页请求
        this.readAndWrite('./static/html/index.html',res)
    },
    readAndWrite(pathname,res){//读取必然存在的文件的内容并做出响应
        fs.readFile(pathname,(err,data)=>{
            res.writeHead(200,{'Content-Type':mime.lookup(pathname)})
            res.end(data)
        })
    }
}

module.exports = router