
var test = require('ava')
var request = require('supertest')

var app = require('../../server/server.js')

var configureDatabase = require('./helpers/database-config')

configureDatabase(test, app)

// testing categories routes

test.cb('GET /categories', t => {
  request(t.context.app)
    .get('/api/categories')
    .expect(200)
    .end((err,res) => {
      t.deepEqual(res.body.length, 11)
      t.is(res.body[0].category_id, 88005)
      t.end()
    })
})

test.cb('GET /orgs', t => {
  request(t.context.app)
    .get('/api/orgs')
    .expect(200)
    .end((err,res) => {
      t.deepEqual(Object.keys(res.body).category_name)
      t.end()
    })
})

// testing itemClass routes

test.cb('GET /items', t => {
  request(t.context.app)
    .get('/api/items')
    .expect(200)
    .end((err,res) => {
      t.is(res.body.length, 27)
      t.is(res.body[0].itemClass_id, 77016)
      t.end()
    })
})

// testing join table routes

test.cb('GET /joins', t => {
  request(t.context.app)
    .get('/api/joins')
    .expect(200)
    .end((err,res) => {
      t.is(res.body[0].orgRelationships_id, 17)
      t.end()
    })
})
