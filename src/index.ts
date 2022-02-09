

const http = require('http');
import * as express from 'express';
const ParseServer = require('parse-server').ParseServer;
require('dotenv').config();
const ParseDashboard = require('parse-dashboard');

//CONECTAR UN AWS S3
// var S3Adapter = require('parse-server').S3Adapter;

//CONECTAR UN REDIS SERVER
// var RedisCacheAdapter = require('parse-server').RedisCacheAdapter;
// var redisOptions = {
//     url: ''
// };
// var redisCache = new RedisCacheAdapter(redisOptions);


const PORT = process.env.PORT;
const serverURL = `http://localhost:${PORT}/api`;
const app_parse = new ParseServer({
    cloud: __dirname + '/cloud/main.js',
    databaseURI: process.env.MONGO_URI,// MONGO URI
    appId: process.env.APP_ID,
    masterKey: process.env.MASTER_KEY, // Manten esto siempre en secreto
    serverURL: serverURL, 
    //cacheAdapter: redisCache,
    cacheMaxSize: 5000,
    cacheTTL: 5000, // (ms)
    objectIdSize: 12, //
    schemaCacheTTL: 10000, //(ms) se recomienda poner un  TTL grande en Producción
    logLevel: 'VERBOSE', //NONE para no generar logs

    //PARAMETROS PARA UN AWS S3 
    // filesAdapter: new S3Adapter(
    //     "ID_KEY_USER",
    //     "SECRET_KEY_USER",
    //     "NAME_BUCKET",
    //     { 
    //         directAccess: true,
    //     }
    // ),
});

const options = { allowInsecureHTTP: false };
const dashboard = new ParseDashboard({
    "apps": [{
        "serverURL": serverURL,
        "appId": process.env.APP_ID,
        "masterKey":  process.env.MASTER_KEY,
        "appName": "My Parse Server App",
    }]
}, options);

var app = express();
// app.use('/', express.static(path.join(__dirname, '/public')));
app.get('/', (_, res) => {
    res.json({
        message: 'API SERVER OK'
    });
});

app.use('/api', app_parse);

// path para el dashboard se recomienda quitar esto antes de pasar a producción
app.use('/dashboard', dashboard);

var httpServer = http.createServer(app).listen(PORT, function () {
    console.log('Escuchando puerto ' + PORT);
});
//console.log('Creando el LiveQueryServer.');
//const parseLiveQueryServer = ParseServer.createLiveQueryServer(httpServer);




