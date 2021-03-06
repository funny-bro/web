const landbuildRouter = require('@/server/router/landbuild')
const request = require('supertest');

const express = require('express');
const app = express();
app.use(landbuildRouter);


describe('Logo', () => {
  test.only('is a Vue instance', async () => {
    try {
      const res = {
        json: function(){
          console.log(' -=-=json')
        }
      }
  
      const response = await request(app).get('/?updatedAtFrom=03-01-2019&updatedAtEnd=05-18-2019&cityCode=F&townCode=F05&sectCode=1787')
      require('fs').writeFileSync('./abc.json', JSON.stringify(response.body, null, 2))
  
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
    }
    catch(err){
      console.log(err)
    }
  }, 10000)

  test('is a Vue instance', async () => {
    const res = {
      json: function(){
        console.log(' -=-=json')
      }
    }

    const response = await request(app).get('/')

    require('fs').writeFileSync('./abc.json', JSON.stringify(response.body))

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
