
const http = require('http')

const https = require('https')

const cheerio = require('cheerio')

const fs = require('fs')

const url = 'https://www.lagou.com/'

const getData = (cb)=>{
    let menu_data = null;
    https.get(url,(res)=>{
        let html = '';
        res.on('data',(chunk)=>{
            html += chunk;
        })

        res.on("end",()=>{
            //console.log(html)
            menu_data = filterHtml(html)
            //console.log(menu_data)
            // return  menu_data
            cb( menu_data )
            //fs.writeFileSync('1.html',html)
            //fs.writeFileSync('menu.json',JSON.stringify(menu_data))
        })

        res.on("error",(err)=>{
            console.log(err)
            cb(err)
        })

    })
}


//筛选数据

const filterHtml = (html)=>{
    let $ = cheerio.load(html);
    let menu_list = [];
    $(".job_hopping").each((i,obj)=>{
        let menu = {};
        let nav = [];
        menu.title = $(obj).find("h2").text().trim();
        $(obj).find("a").each((i,val)=>{
            nav.push(  $(val).text().trim() )
        })
        menu.nav = nav;
        menu_list.push(menu)
    })
    //console.log( menu_list )
    return menu_list;
}

  //getData()

const server = http.createServer((req,res)=>{

    getData((data,err)=>{
        res.writeHead('200',{'Content-Type':'application/json;charset=utf-8'})
            if ( data ) {
                res.end(JSON.stringify(data))
            } else {
                res.end(JSON.stringify(err))
            }

    });
    
   
    
})

server.listen(1234,()=>{
    console.log('服务器正在跑')
})