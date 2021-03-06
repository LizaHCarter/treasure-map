'use strict';

var _ = require('lodash');

exports.url = function(query, key, value, text){
  var q    = _.cloneDeep(query),
      link = '<a href="/treasures?';

  q[key] = value;

  var properties = Object.keys(q).map(function(prop){
    return prop + '=' + q[prop];
  });

  link += properties.join('&');

  link += '">' + text + '</a>';
  return link;
};

exports.tags = function(query, tags){
  var links = tags.map(function(tag){
    return exports.url({}, 'tag', tag, tag);
  });

  return links.join(',');
};

exports.sort = function(query, name, display){
  var direction = query.direction ? query.direction * -1 : 1,
      tag = query.tag ? '&tag=' + query.tag : '',
      link = '<a href="/treasures?sort=' + name + '&direction=' + direction + tag + '">'+display+'</a>';
  return link;
};

exports.difficulty = function(difficulty){
  switch(difficulty){
    case 1:
      return 'Easy';
    case 2:
      return 'Medium';
    case 3:
      return 'Hard';
  }
};

exports.allowLink = function(t){
  var s = t.name;
  if(t.isLinkable){
    var display = t.isFound ? 'FOUND: '+t.name : t.name;
    s = '<a href="treasures/'+t._id+'">'+display+'</a>';
  }
  return s;
}
