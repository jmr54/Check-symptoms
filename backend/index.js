const express = require('express')
require('dotenv').config();
const hmacMD5 = require('crypto-js/hmac-md5');
const Base64 = require('crypto-js/enc-base64');
const fetch = require("node-fetch");
const app = express()
const port = 3000

app.get('/analysis', async (req, res) => {
    const uri = process.env.SANDBOX_LOGIN 
    const hashedCredentials = hmacMD5(uri,process.env.SANDBOX_SECRET_KEY).toString(Base64)

    const response = await fetch(uri, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Authorization' : 'Bearer ' + process.env.SANDBOX_API_KEY + ':' + hashedCredentials,
            'Content-Type': 'application/json'
        },
    }); 
    const responseJSON = await response.json();
    res.json(responseJSON)
})

app.get('/login', (req,res) =>{
    res.send('alive')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
