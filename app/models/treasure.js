'use strict';

var Mongo = require('mongodb');

function Treasure(o){
  this.name       = o.name;
  this.loc        = o.loc;
  this.difficulty = parseInt(o.difficulty);
  this.order      = parseInt(o.order);
  this.photos     = [];
  this.hints      = makeArray(o.hints);
  this.tags       = o.tags.split(',').map(function(t){return t.trim();});
  this.isFound    = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.query = function(query, sort, cb){
  Treasure.collection.find(query,sort).toArray(cb);
};

Treasure.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:id}, function(err, obj){
    cb(obj);
  });
};

Treasure.prototype.save = function(cb){
  Treasure.collection.save(this, cb);
};

Treasure.found = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.update({_id:_id}, {$set:{isFound:true}}, cb);
};

module.exports = Treasure;

function makeArray(o){
  var keys  = Object.keys(o),
      array = [];
  for(var i = 1; i <= keys.length; i++){
    array.push(o[i]);
  }
  return array;
}
