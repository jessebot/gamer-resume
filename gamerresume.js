// Hacked together poorly by DomoJesse aka Jessebot
var express = require("express");
var app = express();
var https = require('https');
var http = require('https');
var fs = require('fs');
var router = express.Router();
var path = __dirname + '/views/';
var ejs = require('ejs');

// steam lolz
var Steam = require('steam-webapi');

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  var json;
  fs.readFile('./config/config.json', 'utf8', function (err, data) {
      if (err) throw err;
        json = JSON.parse(data);
        // Retrieve the steam ID from a steam username/communityID
        custom_vanity = json.social_handles.steam_vanity_URL;
        api_key = json.steam.api_key;
        // Set global Steam API Key
        Steam.key = api_key;
        // grab custom steam data
        Steam.ready(function(err) {
          if (err) return console.log(err);
            var steam = new Steam();
            steam.resolveVanityURL({vanityurl:custom_vanity}, function(err, data) {
              // data -> { steamid: '76561197968620915', success: 1 }
              json.steam.steam_id = data.steamid;
              var converted_json = JSON.stringify(json, null, 2); // spacing level = 2?
              fs.writeFile('./config/config.json', converted_json, 'utf8'); // write it back
            });
          });
        });

  fs.readFile('./config/config.json', 'utf8', function (err, data) {
      if (err) throw err;
        json = JSON.parse(data);
        // Retrieve the steam ID from a steam username/communityID
        api_key = json.steam.api_key;
        // Set global Steam API Key
        Steam.key = api_key;
        // stupid name?
        Steam.ready(function(err) {
          if (err) return console.log(err);
            var steam = new Steam();
            steam.getPlayerSummaries({key:json.steam.api_key, steamids:json.steam.steam_id}, function(err, data) {
              json.steam["display_name"] = data.players[0].personaname;
              json.steam["avatar"] = data.players[0].avatarfull;
              json.steam["clan_id"] = data.players[0].primaryclanid;
              var updated_json = JSON.stringify(json, null, 2); // spacing level = 2?
              fs.writeFile('./config/config.json', updated_json, 'utf8'); // write it back
            });
          });
        });

  // set templating engine
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('views','./views');

  json = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

  // display index.html
  res.render('index', { json: json});
});

app.use("/",router);

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS

app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery

app.use('/js', express.static(__dirname + '/js')); // dfdsafdredirect JS jQuery

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use('/css', express.static(__dirname + '/css')); // redirect CSS dafsfads

app.use('/icons', express.static(__dirname + '/icons')); // redirect images

app.use('/images', express.static(__dirname + '/images')); // redirect images

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

/*
https.createServer(options, app).listen(8081, function () {
  console.log('Secure Gamer Resume Started!');
});

http.createServer(app).listen(8082, function () {
  console.log('Gamer Resume Started!');
});
*/

app.listen(8081, function(){
  console.log("Live at Port 8081");
});
