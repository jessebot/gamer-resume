var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  var ejs = require('ejs');
  ejs.open = '{{';
  ejs.close = '}}';
  const yaml = require('js-yaml');
  const fs = require('fs');
  try {
      const config = yaml.safeLoad(fs.readFileSync('config/config.yml', 'utf8'));
      const global_vars = config.globals;
      // console.log(global_vars);
  } catch (e) {
      console.log(e);
  }
  // res.sendFile(path + "index.html");
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('views','./views');
  res.render('index', { global_vars: global_vars });
});

app.use("/",router);
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(8081,function(){
  console.log("Live at Port 8081");
});

