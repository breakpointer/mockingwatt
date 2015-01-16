
var assert = require('assert');
var should = require('should');
var supertest = require('supertest');
var app = require('../server.js');
var server = supertest(app);

// Environment specific services and configurations
var appServices = require('../lib/app_services.js');
var envName = 'test';
var services = appServices.get(process.env, envName);

// Some messages to make sure I'm not brain dead
console.log('--------------------------'),
console.log('Make sure redis is running');
console.log('redis-server --port XXXX');
console.log('--------------------------'),

describe('The API', function(){
  
  after(function (){
    services.redis.quit();
  })
  
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
    
    var usage = null;
    
    before(function (done){
      var UsageModel = require('../lib/usage.js');
      var usage = new UsageModel(services.redis);
      // ensuring there is data
      usage.regenerate(function (err, result){
        if (err) return done(err);
        done(); 
      }); 
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
      describe('when action is "reset"', function (){ 
        it('returns okay status, with "reset" message', function (done){
          server
            .post('/usage')
            .send({ action: 'reset' })
            .expect(200)
            .end(function (err, res){ 
              if (err) return done(err);
              var msg = res.body;
              msg.should.have.property('status', 'okay');
              done();
            });
        });
        it('has set the slot bias to zeros', function (done){
          server
            .get('/totals')
            .expect(200)
            .end(function (err, res){
              if (err) return done(err);
              var tots = res.body;
              tots.should.have.property('bias',0);
              done();
            })
        });
      });
      describe('when action is "increase"', function (){ 
        it('returns okay status, with "increased" message', function (done){
          server
            .post('/usage')
            .send({ action: 'increase' })
            .expect(200)
            .end(function (err, res){ 
              if (err) return done(err);
              var msg = res.body;
              msg.should.have.property('status', 'okay');
              done();
            });
         });
      });
      describe('when action is "decrease"', function (){
        it('returns okay status, with "decreased" message', function (done){
          server
            .post('/usage')
            .send({ action: 'decrease' })
            .expect(200)
            .end(function (err, res){ 
              if (err) return done(err);
              var msg = res.body;
              msg.should.have.property('status', 'okay');
              done();
            }); 
        });
      });
      describe('when action is unknown', function (){ 
        it('returns okay status, with "decreased" message', function (done){
          server
            .post('/usage')
            .send({ action: 'foo' })
            .expect(200)
            .end(function (err, res){ 
              if (err) return done(err);
              var msg = res.body;
              msg.should.have.property('status', 'error');
              done();
            }); 
        }); 
      });
    }); //POST
  }); // usage
 
});