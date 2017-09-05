
const http = require("http")

const qs = require("querystring")

const postData = qs.stringify({
    'question[title]':'讲的真好@',
    'question[content]':"<p>讲的真好@讲的真好@讲的真好@</p>",
    'question[courseId]':'227',
    'question[lessonId]':'1739',
    '_csrf_token':'27173a5188190e9030d768b390e2658702314006'
})


const options = {
    method:'POST',
    hostname:'www.codingke.com',
    port:80,
    path:'/ajax/create/course/question',
    headers:{
        'Accept':'*/*',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Connection':'keep-alive',
        'Content-Length':postData.length,
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie':'PHPSESSID=cb2u4ve3qm10hm38vp6qdak0u1;   UM_distinctid=15dba5c5646296-0ee72760d6b7ef-6d1d107d-15f900-15dba5c5647281; CNZZDATA1256018185=1406142913-1502067353-null%7C1502067353; Hm_lvt_9f92046de4640f3c08cf26535ffdd93c=1502070200; Hm_lpvt_9f92046de4640f3c08cf26535ffdd93c=1502070238; Invite_code=300669',
        'Host':'www.codingke.com',
        'Origin':'http://www.codingke.com',
        'Referer':'http://www.codingke.com/v/395-chapter-227-course',
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) ,Chrome/60.0.3112.78 Safari/537.36',
        'X-CSRF-Token':'27173a5188190e9030d768b390e2658702314006',
        'X-Requested-With':'XMLHttpRequest'
    }
}

const req = http.request(options,(res)=>{
    console.log(`状态码:${res.statusCode}`)
   // res.setEncoding('utf-8');
    let result = '';
    res.on('data',(chunk)=>{
        result+=chunk
    })
    res.on('end',()=>{
        console.log(result)
    })
})

req.on('error',(err)=>{
    console.log('err',err)
})

//post请求的时候写入post数据
req.write(postData)

req.end()