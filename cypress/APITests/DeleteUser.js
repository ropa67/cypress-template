/// <reference types="Cypress" />
const dataJson = require('../../fixtures/createuser')

describe('Delete user request', () => {
let accessToken = ''
    it.only('create user test', () => {
            //1. create user (POST)
            cy.request({
                method: 'POST',
                url: '',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: {
                    "email": "",
                    "status":"active"
                  }
   
            }).then((res)=>{
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(201)
                expect(res.body.data).has.property('email', '')
                expect(res.body.data).has.property('name','')
            }).then((res) =>{
                   const userId = res.body.data.id 
                    cy.log("user id is: " + userId)
                    //2. delete user (DELETE)
                    cy.request({
                        method: 'DELETE',
                        url: ''+userId,
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    }).then((res)=>{
                        expect(res.status).to.eq(204)
                    })
            })
            
        
        
    })
})