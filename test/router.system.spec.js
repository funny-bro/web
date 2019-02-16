const systemRouter = require('@/server/router/system')
const request = require('supertest');

const express = require('express');
const app = express();
app.use(systemRouter);


describe('systemRouter', () => {
  test('is a Vue instance', async () => {
    const res = {
      json: function(){
        console.log(' -=-=json')
      }
    }

    const response = await request(app).get('/')

    expect(Object.keys(response.body)).toEqual([
      'townConfig', 'sectConfig', 'cityConfig'
    ])
  })
})
