import React from 'react';
const secure = require("./secure.js");

async function postImage(base64, url = 'https://api.imgur.com/3/upload'){
  const formData = new FormData();
    formData.append('image', base64);
    formData.append('type','base64');
    const response = await fetch('https://api.imgur.com/3/upload', {
      method: 'POST',
      headers: {"Authorization" : "Client-ID " + secure.imgur.clientid}, // I know I can use template literals here but the difference is insignificant
      body: formData
    });
    const json = await response.json();
    return json;
}

async function postData(uuid, data = {}, url = 'http://10.0.0.10:3000/post/') {
  var proxdata = [uuid, data];
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(proxdata) // body data type must match "Content-Type" header
  });
}

async function requestLogin(username, password, url = 'http://10.0.0.10:3000/login/') {
  var proxdata = [username, password];
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(proxdata) // body data type must match "Content-Type" header
  });
  const json = await response.json();
  return json;
  //console.log(JSON.stringify(json));
}

async function requestSignup(username, password, url = 'http://10.0.0.10:3000/signup/') {
  var proxdata = [username, password];
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(proxdata) // body data type must match "Content-Type" header
  });
  const json = await response.json();
  return json;
//  console.log(JSON.stringify(json));
}

async function getData(uuid, url = 'http://10.0.0.10:3000/request/') {
  const response = await fetch(`${url}${uuid}`);
  const json = await response.json();
  return json;
}

async function getAllData(url = 'http://10.0.0.10:3000/request/') {
  const response = await fetch(`${url}`);
  const json = await response.json();
  return json;
}

export { postData, getAllData, getData, postImage, requestLogin, requestSignup };
