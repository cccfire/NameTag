import React from 'react';

async function postImage(image, url = 'https://api.imgur.com/3/upload'){
  
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

export { postData, getAllData, getData };
