const express = require('express');
const mysqlx = require('@mysql/xdevapi');
const bodyParser = require('body-parser');
const config = {
  password: 'Twportals8',
  user: 'root',
  host: 'localhost',
  port: 33060,
  schema: 'test_schema'
};

// Starting our app.
const app = express();


app.use(bodyParser.json());
// Creating a GET route that returns data from the 'users' table.
app.get('/request/', function(req, res) {
  mysqlx.getSession(config)
    .then(session => {
      const table = session.getSchema('allposts').getTable('posts');
      return table.select().where(`true`).execute();
    })
    .then(result => {
      var data = result.fetchAll();
      console.log(data);
      res.send(data);
    });
});

app.get('/request/:uuid', function(req, res) {
  mysqlx.getSession(config)
    .then(session => {
      const table = session.getSchema('allposts').getTable('posts');
      return table.select().where(`id = "${req.params.uuid}"`).execute();
    })
    .then(result => {
      var data = result.fetchAll();
      console.log(data);
      res.send(data);
    });
});

app.post('/post/', function(req, res) {
  console.log('hi');
  mysqlx.getSession(config)
    .then(session => {
      const table = session.getSchema('allposts').getTable('posts');
      console.log(req.body);
      console.log(typeof req.body[0])
      table.insert('id', 'jdoc').values(req.body[0], JSON.stringify(req.body[1])).execute();
    //  table.insert('id', 'jdoc').values('cd', '{}').execute();
    })

});

// Starting our server.
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/request so you can see the data.');
  mysqlx.getSession(config)
    .then(session => {
      return session.getSchema('allposts').getTable('posts').count();
    })
    .then(count => {
      console.log(count);
    })
    .catch((error) => {
      console.error(error);
    })
});
