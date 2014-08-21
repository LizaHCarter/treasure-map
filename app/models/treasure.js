'use strict';

var Mongo = require('mongodb'),
    fs    = require('fs'),
    path  = require('path');

function Treasure(o){
  this.name       = o.name[0];
  this.loc        = {name: o.loc[0], lat: parseFloat(o.loc[1]), lng: parseFloat(o.loc[2])};
  this.difficulty = parseInt(o.difficulty[0]);
  this.order      = parseInt(o.order[0]);
  this.photos     = [];
  this.hints      = o.hints;
  this.tags       = o.tags[0].split(',').map(function(t){return t.trim();});
  this.isFound    = false;
  this.isLinkable = (o.order[0] === '1') ? true : false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.query = function(query, cb){
  var filter = {},
      options = {};
  if(query.tag){filter = {tags:{$in:[query.tag]}};}
  if(query.sortBy){
    var sort = (query.order) ? query.order * 1 : 1;
    options.sort = [[query.sortBy,sort]];
  }
  Treasure.collection.find(query, options).toArray(cb);
};

Treasure.count = function(cb){
  Treasure.collection.count(cb);
};

Treasure.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:id}, function(err, obj){
    cb(err, obj);
  });
};

Treasure.prototype.addPhotos = function(files, cb){
  var dir   = __dirname + '/../static/img'+ this._id,
      exist = fs.existsSync(dir),
      self  = this;

  if(!exist){fs.mkdirSync(dir);}

  files.photos.forEach(function(photo){
    var ext = path.extname(photo.path),
        rel = '/img/'+self._id + '/' + self.photos.length+ext,
        abs = dir + '/' + self.photos.length + ext;

    fs.renameSync(photo.path, abs);
    self.photos.push(rel);
  });
  Treasure.collection.save(self, cb);
};

Treasure.prototype.save = function(cb){
  Treasure.collection.save(this, cb);
};

Treasure.found = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.update({_id:_id}, {$set:{isFound:true}}, cb);
};

Treasure.create = function(fields, files, cb){
  var t = new Treasure(fields);
  Treasure.collection.save(t, function(){
    t.addPhotos(files, cb);
  });
};

module.exports = Treasure;


