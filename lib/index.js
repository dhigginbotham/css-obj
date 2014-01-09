var objected = require('objected');
var fs = require('fs');
var path = require('path');

var parse = {};
var internals = {};

internals.file = function (path, fn) {

  fs.readFile(path, function (err, data) {
    if (err) return fn(err, null);
    return fn(null, data); 
  });

};

internals.defaultCallback = function (args, fn) {

  return (typeof args != 'undefined' //args is not undefined
    ? (typeof fn != 'undefined' // callback is not undefined
      ? fn(args) // return callback w/ args
      : args) // return args
    : false); // args and callback are undefined, return false

};

internals.each = function (arr, fn) {

  var arr = arr || [];
  var ln = arr.length;
  var i;

  if (ln) {
    for (i=0;i<ln;++i) {
      fn(arr[i], i)
    }
  }

};


internals.reKeyName = /^([A-z0-9_\-#.]+)\s?([a-zA-Z0-9_\-,#.]+)/gi; // gets css class or id name
internals.reStyles = /([A-z0-9\-#][^:;{]+)/gi; // gets css class or id name

var css = function (path, fn) {

  var path = path || null;

  internals.file(path, function (err, data) {
    if (err) return fn(err, null);

    parse.que(data, function (err, object) {
      if (err) return fn(err, null);
      return fn(null, object);
    });

  });

};

parse.que = function (str, fn) {

  var self = this;
  var str = (str || null);
  var callback = (typeof fn == 'function') ? fn : internals.defaultCallback;

  var output = {};

  if (str) {

    var arr = str
      .toString()
      .split('\r\n');

    var sel;

    internals.each(arr, function (buff, i) {

      var selector = buff.match(internals.reKeyName);
      var values = buff.match(internals.reStyles);

      if (selector) {
        
        if (selector.length == 1) {
        
          sel = selector[0];
          output[sel] = {};

          switch (sel[0]) {
            case '.':
              output[sel].type = 'class';
            break;
            case '#':
              output[sel].type = 'id';
            break;
            case /[A-z\-]/:
            default:
              output[sel].type = 'element';
            break;
          }
        
        };

      };

      if (values) {

        if (values.length == 2 && sel) {
        
          var key = values[0];
          var val = values[1];

          output[sel][key] = val;

        };

      };

    });

    return fn(null, output);

  };

};

module.exports = css;