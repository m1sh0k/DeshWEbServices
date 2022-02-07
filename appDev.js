const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const config = require('./config');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const routes = require('./middleware/routes');
const errorHandler = require('./middleware/errorHandler');
//const session = require('express-session');
//const sessionStore = require('./middleware/db/sessionStore');
const ip = require('ip');
const fs = require('fs');

//webPack
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
var configWP = require('./config/webpack.dev.config.js');//Development mod webPack config
//var configWP = require('./config/webpack.prod.config.js');//Production mod webPack config
const webpackHRM = require('webpack-hot-middleware');
const compiler = webpack(configWP);
app.use(devMiddleware(compiler, {
    //noInfo: true,
    publicPath:  configWP.output.publicPath,
}));
app.use((webpackHRM)(compiler));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false, limit: '5mb'}));
//
//Session
// app.use(session({
//     secret: config.get('session:secret'),
//     resave: config.get('session:resave'),
//     saveUninitialized: config.get('session:saveUninitialized'),
//     key: config.get('session:key'),
//     cookie: config.get('session:cookie'),
//     store: sessionStore,
// }));
// app.use(require('./middleware/db/loadUser'));
//Routes middleware
routes(app);
app.use(express.static(path.join(__dirname, './public')));
app.use('/*', function (req, res, next) {
    var filename = path.join(compiler.outputPath,'index.html');
    console.log('index filename path: ', filename);
    compiler.outputFileSystem.readFile(filename, function(err, result){
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        res.send(result);
        res.end();
    });
});
//Error Handler middleware
errorHandler(app);
//Create Server
var server = http.createServer(app);
server.listen(config.get('port'), function(){
    console.log('Express server listening on ip:',ip.address(),',port:',config.get('port'));
});