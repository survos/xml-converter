// var http = require('http');
const url = require('url');

// const assert = require('assert')
const querystring = require('querystring');
const { decodeParams, decodeExposureParams, encodeExposureParams } = require('@wmakeev/darkroom-xmp-tools')

const express = require('express')
const app = express()
// use the express-static middleware
app.use(express.static("public"))

// const port = 3000
// app.listen(process.env.PORT || 3000)
app.get('/', (req, res) => {
    // const queryObject = url.parse(req.url,true).query;

    let type = req.query.type || 'exposure';
    let limit = req.query.limit;

    // let paramStr = queryObject.params;
    // console.log(paramStr, queryObject());

    const paramString = req.query.str || '0000000040a0093bd8ce374000004842000080c1';
    // let paramsObj = decodeParams<('exposure')>(EXPOSURE_PARAMS_BIN_STR);
    // Call function:
    // let paramsObj = window['decode' + Exposure + 'Paramstype'](paramString);
    // let paramsObj = decodeExposureParams(EXPOSURE_PARAMS_BIN_STR)
    let paramsObj = decodeParams(type, paramString);

    // res.writeHead(200, {'Content-Type': 'application/json'});
    res.send(JSON.stringify(paramsObj))
    // res.end('Feel free to add query parameters to the end of the url');
    // res.send('Hello World! ' + type)
})


// define the first route
app.get("/", function (req, res) {
    res.send("<h1>Hello World!</h1>")
})

// start the server listening for requests
app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));



// app.listen(process.env.PORT || 3000);
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

//create a server object:

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
