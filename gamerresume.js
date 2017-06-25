// Hacked together poorly by DomoJesse aka Jessebot
var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var fs = require('fs');
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
            console.log(json.steam.steam_id);
            var converted_json = JSON.stringify(json, null, 2); // spacing level = 2?
            fs.writeFile('./config/config.json', converted_json, 'utf8'); // write it back
        });
      });
    });
  // stupid name?
  // var display_name = steam.getPlayerSummaries({key:json.steam_api_key, steam_id});
  // console.log(display_name);

  // set templating engine
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('views','./views');

  json = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

  console.log("this is after the new functions");
  console.log(json.steam.steam_id);
  // display index.html
  res.render('index', { json: json});
});

app.use("/",router);
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/icons', express.static(__dirname + '/icons')); // redirect images

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(8081,function(){
  console.log("Live at Port 8081");
});

