'use strict';

var Treasure = require('../models/treasure'),
    mp       = require('multiparty');

exports.index = function(req, res){
  Treasure.query({},{},function(err, treasures){
    res.render('treasures/index', {treasures:treasures});
  });
};

exports.new = function(req, res){
  res.render('treasures/new');
};


