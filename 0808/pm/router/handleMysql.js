
const mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',//连接的数据库的域名 
  user     : 'root',
  password : '',
  database : 'node_mysql'
});
 
connection.connect();
 
connection.query('select * from user',(error, results)=>{
  if (error) throw error;
  console.log(fields)
});
 
connection.end();