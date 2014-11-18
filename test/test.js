
var assert = require('assert');
var should = require('should');
var supertest = require('supertest');
var app = require('../server.js');
var server = supertest(app);

describe('The API', function(){
  
  describe('/', function() {
    it('should return a 200', function (done){
      server.get('/').expect(200, done);
    });
  });
  
  describe('/meters', function() {
    describe('GET', function() {
      it('should return a list', function (done){
        server
          .get('/meters')
          .expect(200)
          .end(function (err, res){
            if (err) return done(err);
            res.body.should.be.an.Array
            done();
          });
      });
      
      it('the list should contain meters', function (done){
        server  
          .get('/meters')
          .expect(200)
          .end(function (err, res){
            if (err) return done(err);
            var meter = res.body[0];
            meter.should.have.property('id');
            meter.should.have.property('name');
            meter.should.have.property('descr');
            meter.should.have.property('type');
            meter.should.have.property('units');
            done();           
          });
        
      });
    }); 
  });
 
});