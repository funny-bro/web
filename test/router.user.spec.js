/**
 * @jest-environment node
 */
const userRouter = require('@/server/router/user')
const request = require('supertest');

const express = require('express');
const app = express();
app.use(userRouter);

describe('userRouter', () => {
  test('should return corrent key/val', async () => {
    const response = await request(app).get('/')

    for(const item of response.body.data) {
      expect(Object.keys(item).sort()).toEqual([
        'id', 'username', 'password', 'cookieValue', 'ensid', 'enuid', 'createdAt', 'updatedAt'
      ].sort())
    }
  })
})
