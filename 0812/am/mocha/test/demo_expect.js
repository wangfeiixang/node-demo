
// const chai = require('chai')
// const expect = chai.expect


// describe("测试A",()=>{
//     it("A",()=>{

//         var value = 'hello'

//         var num = 3

//         expect(value).to.be.a('string')
//         // expect(value).to.be.a('number')
//         expect(value).to.equal('hello')

//         expect(value).to.have.length(5)

//         expect(num).to.be.at.most(5)
//         expect(num).to.be.at.least(2)

//         expect(num).to.be.within(1,4)

//     })
// })


const chai = require('chai')

const expect = chai.expect

describe('测试',()=>{

    it('A-A',()=>{
        var value = 'hello'

        expect(value).to.be.a('string')
    })
    
})