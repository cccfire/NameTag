
const fetch = require("node-fetch");
fetch('http://10.0.0.10:4000/')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
console.error(error);
})
