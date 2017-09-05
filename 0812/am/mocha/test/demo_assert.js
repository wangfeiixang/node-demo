
// 断言测试

// const chai = require('chai')
// const assert = chai.assert

// describe("测试A",()=>{
//     it("a1",()=>{

//         var value = 'hello'

//         assert.typeOf(value,'string')
//         // assert.typeOf(value,'number')
//         assert.equal(value,'hello')
//         assert.lengthOf(value,5)


//     })
// })

const chai = require('chai')

const assert = chai.assert

describe('测试',()=>{
    it('A-A',()=>{
        let value = 'string'
        assert.typeOf(value,'string')
        
    })
})