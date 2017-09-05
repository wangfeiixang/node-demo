

//一个事件类，其他的类去继承这个类   就可以拥有on方法emit方法
const EventEmitter = require('events')

class Person extends EventEmitter {}

const allen = new Person()

allen.on("laugh",(name)=>{
    console.log(`${name},hahahah`)
})


setTimeout(()=>{
    allen.emit('laugh','Tom')
},2000)




//可以使用events模块暴露的类来使其他的类进行继承，子类的实例就会拥有on、emit方法，可以给自己绑定事件，并且可以在某一个时刻触发