


const chai = require('chai')

const should = chai.should()


describe('测试A',()=>{
    it("A",()=>{
        var value = 'hello'

        value.should.be.a('string')
        value.should.be.a('string')

        value.should.equal('hello')

        value.should.have.length(5)

        value.should.and.equal('hello').and.be.a('string').and.have.length(5)

    })
})