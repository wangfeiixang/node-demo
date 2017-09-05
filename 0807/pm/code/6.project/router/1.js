 
const fs = require('fs-extra')
const path = require('path')
const mime = require('mime')

let router = {
handle(pathname,res){
        let that = this;
        //如果请求的是首页的话
        if ( pathname == '/index.html' || pathname=='/' ) {
            fs.readFile('./front-end/html/index.html',(err,data)=>{
                if(err) throw err;
                that.response(res,data,200,'text/html')
            })
            return;
        } 
         //判断，如果资源请求 3 css js image
         let req_type = pathname.split('/')[1]
         if( req_type=='static' ){
             this.source(pathname,res)
         }
         //如果是数据请求
        if( req_type=='api' ){
            this.data(pathname,res)
        }
    },
    source(pathname,res){
        let that = this;
        let _path = pathname.replace('/static','')
        //判断要请求的文件是否存在
        fs.stat('./front-end/'+_path,(err,stats)=>{
            if(err){
                // 如果不存在此资源返回404  
                that.response(res,fs.readFileSync('./front-end/html/404.html'),404,'text/html')
            }else{
                //如果存在做出响应
                fs.readFile('./front-end/html'+_path,(err,data)=>{
                    if(err) throw err;
                    that.response(res,data,200,mime.lookup(pathname))
                })
            }
        })        

    },
    data(pathname,res){
        let _path = pathname.replace('/static','')
        let api_name = path.parse(_path).name
        //数据库处理
        let that = this;
        fs.stat('./data/'+api_name+'.json',(err,stats)=>{
            if(err) {
                 that.response(res,'',404)
            }else{
               fs.readFile('./data/'+api_name+'.json',(err,data)=>{
                    if(err) throw err;
                    that.response(res,data,200,'application/json')
                })
            }

        })
        
    },
    response(res,data,code,type){
        res.writeHead(code,{'Content-Type':type});
        res.end(data);
    },




}