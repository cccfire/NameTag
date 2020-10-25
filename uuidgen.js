const { v4: uuidv4 } = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');




// We're still in routes.js! Right below everything else.

// Starting our app.
const app = express();


app.use(bodyParser.json());

// sets port 8080 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 4000);
// Creating a GET route that returns data from the 'users' table.
app.get('/', function(req, res) {
  var tempid = uuidv4();
  console.log(tempid);
  res.send(tempid)
});

// Starting our server.
app.listen(app.get('port'), () => {
    console.log("Express server listening on port " + app.get('port'));
});
