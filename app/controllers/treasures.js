'use strict';

var Treasure    = require('../models/treasure'),
    linkBuilder = require('../helpers/link-builder'),
    mp          = require('multiparty');

exports.index = function(req, res){
  Treasure.query(req.query, function(err, treasures){
    res.render('treasures/index', {treasures:treasures, linkBuilder:linkBuilder, query:req.query});
  });
};

exports.new = function(req, res){
  Treasure.count(function(err, order){
    order++;
    res.render('treasures/new', {order:order});
  });
};

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    console.log(fields, files);
    Treasure.create(fields, files, function(){
      res.redirect('/treasures');
    });
  });
};

exports.show = function(req, res){
  Treasure.findById(req.params.id, function(err, treasure){
    console.log(treasure);
    res.render('treasures/show', {treasure:treasure});
  });
};
