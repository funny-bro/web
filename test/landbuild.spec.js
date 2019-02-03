const landbuildRouter = require('@/server/router/landbuild')
const request = require('supertest');

const express = require('express');
const app = express();
app.use(landbuildRouter);


describe('Logo', () => {
  test('is a Vue instance', async () => {
    const res = {
      json: function(){
        console.log(' -=-=json')
      }
    }

    const response = await request(app).get('/')
    expect(response.body.length >1).toBe(true)

    for(let i=0; i< response.body.length; i++){
      expect(Object.keys(response.body[i])).toEqual([ 'id',
      'landBuild',
      'data',
      'preData',
      'status',
      'createdAt',
      'updatedAt',
      'sectionId',
      'html',
      'section'
      ])

      expect(Object.keys(response.body[i].section)).toEqual([
        "id",
       "cityCode",
       "townCode",
       "sectCode",
       "landBuildMax",
       "project",
       "createdAt",
       "updatedAt",
       "executedAt"
      ])
    }
  })
})
