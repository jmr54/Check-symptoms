const express = require('express')
require('dotenv').config();
const crypto = require('crypto-js');
const fetch = require("node-fetch");
const app = express()
const port = 3000

app.get('/analysis', async (req, res) => {
    const apiKey = 'johnro56789@gmail.com'
    const uri = "https://sandbox-authservice.priaid.ch/login"
    const hashedCredentials = crypto.HmacMD5(uri,process.env.SECRET_KEY).toString(crypto.enc.Base64)
    
    const response = await fetch(uri, {
        
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
        'Authorization' : 'Bearer ' + apiKey + ':' + hashedCredentials,
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      }); 
      console.log(process.env.SECRET_KEY);
  res.send(response)
})

app.get('/login', (req,res) =>{
    res.send('alive')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})