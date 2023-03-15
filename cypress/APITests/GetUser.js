/// <reference types="Cypress" />
const dataJson = require('../../fixtures/example')
describe('api test cases',() => {
    let accesstoken= ''
    it('get user', () => {        
        cy.request({
            method : 'GET',
            url : '',
            headers: {
                'Authorization': 'Bearer '+accesstoken,
              }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body).has.to.deep.equal({
                "code": 200,
                "meta": {
                },
                "data": []
                })
        })
    })

    it('get user by id', () => {
        cy.request({
            method : 'GET',
            url : '',
            headers: {
                'authorization': 'Bearer '+accesstoken,
              }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.data.name).to.eq('')
        })    
    })  
})