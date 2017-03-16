'use strict';

var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req, res){

  res.json({
    ipaddress : (function(ip){
      if(ip.substr(0, 7) === '::ffff:'){
        return ip.substr(7);
      } else {
        return ip
      }
    })(req.ip),

    language : req.acceptsLanguages()[0],

    software : (function(userAg){
      var start = userAg.indexOf('(') + 1;
      var end = userAg.indexOf(')');
      return userAg.substring(start, end);
    })(req.get('user-agent'))

  });

});


app.listen(port);
