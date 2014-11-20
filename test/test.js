
var assert = require('assert');
var should = require('should');
var supertest = require('supertest');
var app = require('../server.js');
var server = supertest(app);

describe('The API', function(){
  
  describe('/', function() {
    it('returns a 200', function (done){
      server.get('/').expect(200, done);
    });
  });
  
  describe('/meters', function() {
    describe('GET', function() {
      it('returns a list', function (done){
        server
          .get('/meters')
          .expect(200)
          .end(function (err, res){
            if (err) return done(err);
            res.body.should.be.an.Array
            done();
          });
      });
      
      it('contains meters', function (done){
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
    });  // GET
  }); // meters
  
  describe('/usage', function (){
    
    before(function (done){
      redis = 
    });
    
    describe('GET', function (){
      it('returns a list', function (done){
        server
          .get('/usage')
          .expect(200)
          .end(function (err, res){
            if (err) return done(err);
            res.body.should.be.an.Array
            done();
          });
      });
      it('contains usage data items', function (done) {
        server  
          .get('/usage')
          .expect(200)
          .end(function (err, res){
            if (err) return done(err);
            var meter = res.body[0];
            meter.should.have.property('slot');
            meter.should.have.property('value');
            meter.should.have.property('bias');
            done();           
          });
      });
    }); // GET
    
    describe('POST', function (){
      
    }); //POST
  }); // usage
 
});