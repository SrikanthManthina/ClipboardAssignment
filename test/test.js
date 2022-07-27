const server = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Salaries Endpoints', () => {

    it('GET /salaries should show all salaries', async () => {
      const res = await requestWithSupertest.get('/salaries');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body.length).toEqual(9);
    });
  
  });

  describe('1. API to add a new record', () => {
    it('POST /salaries should insert a new record', async () => {
      const res = await requestWithSupertest
      .post('/salaries')
      .send({
        "name": "Chandini",
        "salary": "999",
        "currency": "INR",
        "department": "Engineering",
        "sub_department": "Development"
      });
        expect(res.status).toEqual(201);
        expect(res.type).toEqual(expect.stringContaining('json'));
    });
  
  });

  describe('2. API to delete record', () => {
    it('DELETE /salaries:name should remove record', async () => {
      const res = await requestWithSupertest.delete('/salaries/Guljit');
        expect(res.status).toEqual(403);
    });
  
  });

  describe('3. API to fetch SS for entire db', () => {
    it('GET /summary should insert a new record', async () => {
    
      const res = await requestWithSupertest.get('/summary');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body.mean).toEqual(20065608.9);
        expect(res.body.max).toEqual(200000000);
        expect(res.body.min).toEqual(30)
    });
  
  });

  describe('4. API to fetch SS for contract', () => {
    it('GET /contractsSummary should insert a new record', async () => {
    
      const res = await requestWithSupertest.get('/contractsSummary');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body.mean).toEqual(100000);
        expect(res.body.max).toEqual(110000);
        expect(res.body.min).toEqual(90000)
    });
  
  });

  describe('5. API to fetch SS - Department wise', () => {
    it('GET /departmentSummary should insert a new record', async () => {
    
      const res = await requestWithSupertest.get('/departmentSummary');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body.length).toEqual(4);
    });
  
  });

  describe('6. API to fetch SS - Department -> subdepartment wise ', () => {
    it('GET /subdepartmentSummary should insert a new record', async () => {
    
      const res = await requestWithSupertest.get('/subdepartmentSummary');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body.length).toEqual(4);
    });
  
  });