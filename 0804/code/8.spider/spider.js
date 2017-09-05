
const https = require("https")
const http = require("http")
//能将html字符串转换成虚拟的jqdom对象
const cheerio = require("cheerio")

const fs = require("fs")

const url = 'https://www.lagou.com/'
//获取navs数据，并且交由回调函数来处理
const getNavs = (cb)=>{
        let menu_data=null
        //发送请求
        https.get(url,(res)=>{
        //data事件会在res对象接受到数据的时候触发，可能会触发多次，因为不会一次性的将数据放回，而是分部分返回，返回的是buffer数据
        let html = ''
        res.on('data',(chunk)=>{
            html+=chunk
        })

        res.on("end",()=>{
            menu_data = filterHtml(html)
            //console.log(menu_data)
            cb(menu_data)
            // fs.writeFileSync("./navs.json",JSON.stringify(menu_data))
        })

        res.on("error",(err)=>{
            cb(0,err)
        })

    })

}
//筛选数据
const filterHtml = (html)=>{

    let $ = cheerio.load(html)

    let menu_data=[]

    $(".menu_main").each((i,obj)=>{
        let menu = {}

        menu.title=$(obj).find("h2").text().trim()

        let navs = []

        $(obj).find("a").each((i,a)=>{
            navs.push($(a).text().trim())
        })

        menu.navs=navs
        menu_data.push(menu)
    })
    return  menu_data
}

const server = http.createServer((req,res)=>{
    getNavs((data,err)=>{
        res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'})
        //写入的响应数据只能是字符串
        if(data!=0){
            res.end(JSON.stringify(data))
        }else{
            res.end(JSON.stringify(err))
        }
    })
    
    
})

server.listen(1234,()=>{
    console.log(`server is running`)
})