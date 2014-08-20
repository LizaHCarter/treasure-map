/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure  = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'treasure-test';

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure object', function(){
      var o = {name: ['rubies'], loc:['Nashville', '32.1', '-9.6'], difficulty: ['2'], order:['1'], hints:['find rubies','celebrate'], tags:['tn, jewels']},
          t = new Treasure(o);
      expect(t).to.be.instanceof(Treasure);
      expect(t.name).to.equal('rubies');
      expect(t.loc).to.be.instanceof(Object);
      expect(t.difficulty).to.equal(2);
      expect(t.order).to.equal(1);
      expect(t.hints).to.have.length(2);
      expect(t.photos).to.have.length(0);
      expect(t.tags).to.have.length(2);
      expect(t.isFound).to.be.false;
    });
  });

  describe('.findById', function(){
    it('should find a treasure by its id', function(done){
      Treasure.findById('000000000000000000000001', function(treasure){
        expect(treasure.name).to.equal('diamonds');
        done();
      });
    });
  });

  describe('.found', function(){
    it('should save isFound as true in the database', function(done){
      var id = '000000000000000000000001';
      Treasure.found(id, function(){
        Treasure.findById(id, function(treasure){
          expect(treasure.isFound).to.be.true;
          done();
        });
      });
    });
  });


  describe('.query', function(){
    it('should get all treasures', function(done){
      Treasure.query({},{},function(err, treasure){
        expect(treasure).to.have.length(3);
        done();
      });
    });
  });
});

