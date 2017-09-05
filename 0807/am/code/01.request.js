const https = require('https')

let options = {
    hostname:"api.douban.com",
    port:443,
    path:'/v2/movie/in_theaters',
    method:'GET'
}

const req = https.request(options,(res)=>{

    let result = '';
    res.on('data',(chunk)=>{
        result += chunk;
    })

    res.on('end',()=>{
        console.log(result)
    })
    
})

req.on('error',(err)=>{
    console.log(err)
})
req.end();