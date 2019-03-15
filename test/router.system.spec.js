/**
 * @jest-environment node
 */
const systemRouter = require('@/server/router/system')
const request = require('supertest');

const express = require('express');
const app = express();
app.use(systemRouter);


describe('systemRouter', () => {
  test('should return corrent key/val', async () => {
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

describe('systemRouter /calconfig', () => {
  test('should return corrent key/val', async () => {
    const res = {
      json: function(){
        console.log(' -=-=json')
      }
    }

    const response = await request(app).get('/calconfig')

    expect(Object.keys(response.body)).toEqual([
      "type", "landBuildMax", "landBuildVal", "countChild", "countSubChild", "child"
    ])
  })
})
