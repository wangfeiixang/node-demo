const fs = require('fs-extra')
const path = require('path')
const mime = require('mime')
let router = {
    
    handle(pathname,res){
        //如果请求的是首页的话
         let that = this
        if(pathname=='/index.html'||pathname=='/'){
            fs.readFile('./front-end/html/index.html',(err,data)=>{
                if(err) throw err;
                that.response(res,data,200,'text/html')
            })
            return ;
        }
        
        //判断，如果资源请求 3 css js image
        let req_type=pathname.split('/')[1]
        if(req_type=='static'){
            this.source(pathname,res)
        }
        //如果是数据请求
        if(req_type=='api'){
            this.data(pathname,res)
        }
    },
    source(pathname,res){
        let that = this
        //获取到请求的路径并去掉static
        let _path = pathname.replace('/static','')
        //判断要请求的文件是否存在
        fs.stat('./front-end/'+_path,(err,stats)=>{
            if(err){
                // 如果不存在此资源返回404  
                that.response(res,fs.readFileSync('./front-end/html/404.html'),404,'text/html')
            }else{
                // 如果存在做出响应
                fs.readFile('./front-end/'+_path,(err,data)=>{
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
        let that = this
        fs.stat('./data/'+api_name+'.json',(err,stats)=>{
            if(err){
                that.response(res,'',404)
            }else{
                fs.readFile('./data/'+api_name+'.json',(err,data)=>{
                    if(err) throw err;
                    that.response(res,data,200,'application/json')
                })
            }
        })
        
    },
    response(res,data,code,type){//做出响应
        res.writeHead(code,{'Content-Type':type})
        res.end(data)
    },
    turnType(pathname){//根据请求的资源path返回一个Content-Type
        let ext = path.parse(pathname).ext.substr(1)
        let type=''
        switch(ext){
            case 'html': type='text/html';break;
            case 'css': type='text/css';break;
            case 'js': type='application/javascript';break;
            case 'gif': type='image/gif';break;
            case 'png': type='image/png';break;
            case 'jpg': type='image/jpeg';break;
            case 'jpeg': type='image/jpeg';break;
            default : type="text/plain";break;
        }
        return type
    }
}

module.exports =  router


//手机端网站和PC端网站有什么区别

//1.布局   手机端 自适应布局   pc 固定布局     单位....            响应式 
//2.viewport  
//注意的地方：retina dpr 图片2倍   1px边框 

//3.交互   事件  点透  300ms-tap  

//4.资源  jq-》zepto  bootstrap sui mui framework7...

//5.优化：   移动端吃性能 css3动画   

//6.兼容性   webkit



