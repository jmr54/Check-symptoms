const express = require('express');
require('dotenv').config();
const hmacMD5 = require('crypto-js/hmac-md5');
const Base64 = require('crypto-js/enc-base64');
const fetch = require('node-fetch');

const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  res.json('Says Hello World');
});

app.get('/analysis', async (req, res) => {
  const uri = process.env.SANDBOX_LOGIN;
  const hashedCredentials = hmacMD5(
    uri,
    process.env.SANDBOX_SECRET_KEY,
  ).toString(Base64);

  const response = await fetch(uri, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${process.env.SANDBOX_API_KEY}:${hashedCredentials}`,
      'Content-Type': 'application/json',
    },
  });
  const responseJSON = await response.json();
  const token = responseJSON.Token;

  /* const symptomUri = 'https://sandbox-healthservice.priaid.ch/symptoms'
    const symptomResponse = await fetch(symptomUri + '?token=' + token + '&language=en-gb')
    const symptomReponseeJson = await symptomResponse.json() */

  const diagUri = 'https://sandbox-healthservice.priaid.ch/diagnosis';
  const { symptoms } = req.query;
  const { gender } = req.query;
  const { yearOfBirth } = req.query;
  const diagResponse = await fetch(
    `${diagUri}?token=${token}&language=en-gb`
      + `&symptoms=${symptoms}&gender=${gender}&year_of_birth=${yearOfBirth}`,
  );
  const diagReponseeJson = await diagResponse.json();

  res.json(diagReponseeJson);
});

app.get('/login', (req, res) => {
  res.json('alive');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
