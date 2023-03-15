/// <reference types="Cypress" />
const dataJson = require('../../fixtures/createuser')

describe('post user request', () => {
 let accessToken = ''
let testEmail = ""
    it.only('create user test', () => {
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
        randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'

        cy.fixture('createuser').then((payload) =>{
            
            //1. create user (POST)
            cy.request({
                method: 'POST',
                url: '',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: {
                    "name": payload.name,
                    "gender": payload.gender,
                    "email": testEmail,
                    "status":payload.status
                }
   
            }).then((res)=>{
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(201)
                expect(res.body.data).has.property('email', testEmail)
                expect(res.body.data).has.property('name',payload.name)
                expect(res.body.data).has.property('status',payload.status)
                expect(res.body.data).has.property('gender',payload.gender)
            }).then((res) =>{
                   const userId = res.body.data.id 
                    cy.log("user id is: " + userId)
                    //2. get user (GET)
                    cy.request({
                        method: 'GET',
                        url: ''+userId,
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    }).then((res)=>{
                        expect(res.status).to.eq(200)
                        expect(res.body.data).has.property('id', userId)
                        expect(res.body.data).has.property('name',payload.name)
                        expect(res.body.data).has.property('status',payload.status)
                        expect(res.body.data).has.property('email', testEmail)
                    })
            })
            
        
        })
    })
})