/**
 * @jest-environment node
 */
const historyRouter = require('@/server/router/history')
const request = require('supertest');

const express = require('express');
const app = express();
app.use(historyRouter);

describe('historyRouter', () => {
  test('should return corrent key/val', async () => {
    const res = {
      json: function(){
        console.log(' -=-=json')
      }
    }

    const response = await request(app).get('/')

    expect(Object.keys(response.body[0]).sort()).toEqual([
      'id', 'type', 'count', 'updatedAt', 'createdAt'
    ].sort())
  })
})
