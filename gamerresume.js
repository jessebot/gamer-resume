// Hacked together poorly by DomoJesse aka Jessebot
var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

// steam lolz
var Steam = require('steam-webapi');
var vanToId = "";

function getSteamId(api_key, vanity_id) {
  // Retrieve the steam ID from a steam username/communityID
  custom_vanity = vanity_id;
  // Set global Steam API Key
  Steam.key = api_key;
  // grab custom steam data
  Steam.ready(function(err) {
    if (err) return console.log(err);
    var steam = new Steam();
    steam.resolveVanityURL({vanityurl:custom_vanity}, function(err, data) {
      // data -> { steamid: '76561197968620915', success: 1 }
      vanToId = data.steamid
    });
  });
};


router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  var ejs = require('ejs');
  const yaml = require('js-yaml');
  const fs = require('fs');

  // load in all the user defined variables in config.yml
  try {
      const config = yaml.safeLoad(fs.readFileSync('config/config.yml', 'utf8'));
      const global_vars = config.globals;
  } catch (e) {
      console.log(e);
  }

  // Steam test~!
  vanity_id = global_vars.steam_vanity_ID;
  steam_api_key = global_vars.steam_api_key;
  getSteamId(steam_api_key, vanity_id);
  console.log(vanToId);
  console.log("this is after the new functions")
  // stupid name?
  // var display_name = steam.getPlayerSummaries({key:global_vars.steam_api_key}, steam_id);
  // console.log(display_name);

  // set templating engine
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('views','./views');

  // display index.html
  res.render('index', { global_vars: global_vars});
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

