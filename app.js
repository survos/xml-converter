const { decodeParams, decodeExposureParams, encodeExposureParams } = require('@wmakeev/darkroom-xmp-tools')

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World! <a href="/convert/exposure/?p=0000000040a0093bd8ce374000004842000080c0">Test</a>')
})

app.get('/convert/:type/', function(req, res, next) {
    // res.send(req.query.p);
    let paramsObj = decodeParams(req.params.type, req.query.p);
    res.send(paramsObj);
    // res.send('user ' + req.user.name);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


var http = require('http');
const url = require('url');
const assert = require('assert')

//create a server object:
if (0)
http.createServer(function (req, res) {
    const queryObject = url.parse(req.url,true).query;

    let paramStr = queryObject.params;
    console.log(paramStr, queryObject());

    const EXPOSURE_PARAMS_BIN_STR = '0000000040a0093bd8ce374000004842000080c0';


    let paramsObj = decodeExposureParams(EXPOSURE_PARAMS_BIN_STR)

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(paramsObj))
    // res.end('Feel free to add query parameters to the end of the url');
    // res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

function convert()
{

// from XMP darktable:params
// "exposureParams": {
//   "mode": "EXPOSURE_MODE_MANUAL",
//   "black": 0.0021000057458877563,
//   "exposure": 2.871999740600586,
//   "deflickerPercentile": 50,
//   "deflickerTargetLevel": -4
// }

// before encode you can modify paramsObj ...

    let encodedParamsStr = encodeExposureParams(paramsObj)


// ... and update exposure darktable:params in XMP file with new value

    assert.strictEqual(encodedParamsStr, EXPOSURE_PARAMS_BIN_STR)


}
