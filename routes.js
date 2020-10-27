const secure = require("./src/secure.js");
const express = require('express');
const mysqlx = require('@mysql/xdevapi');
const bodyParser = require('body-parser');
const argon2 = require('argon2');
const crypto = require('crypto');
const ash = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const { argon2i, argon2d, argon2id, defaults, limits } = argon2;
const nodemailer = require('nodemailer');

// Starting our app.
const app = express();
const config = secure.config;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: secure.gmail
});

function sendMail(mailOptions){
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const wrapAsync = (fn) => {
  return (req, res, next) => {
    const fnReturn = fn(req, res, next);

    return Promise.resolve(fnReturn).catch(next);
  }
};

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

app.get('/validate/:uuid', function(req, res) {
  mysqlx.getSession(config)
    .then(session => {
      const table = session.getSchema('allposts').getTable('emailverification');
      table.select().where(`uuid = "${req.params.uuid}"`).execute().then(result => {
        var data = result.fetchAll();
        if(data.length > 0){
          const loginTable = session.getSchema('allposts').getTable('login');
          loginTable.update().where(`username = "${data[0][1]}"`).set('active', 1).execute()
          .then(() => {
            console.log('verified');
            table.delete().where(`uuid = "${req.params.uuid}"`).execute();
            res.send({type: 'success', message: 'successfully verified email'});
          });

        }
        //console.log(data);
      });
    }).catch(() => {res.send({type: 'error', message: 'invalid verification link'})});

});

app.get('/request/:uuid', function(req, res) {
  mysqlx.getSession(config)
    .then(session => {
      const table = session.getSchema('allposts').getTable('posts');
      return table.select().where(`id = "${req.params.uuid}"`).execute();
    })
    .then(result => {
      var data = result.fetchAll();
      //console.log(data);
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

app.post('/login/', function(req, res) {
  // get salt from db
  mysqlx.getSession(config)
    .then(session => {
      const table = session.getSchema('allposts').getTable('login');
      table.select().where(`username = "${req.body[0]}"`).execute()
      .then(result => {
        var data = result.fetchAll();
        console.log(data);
        if(data.length > 0){
          var prox = data[0][2];
          var salt = Buffer.from(prox, 'utf-8');
          var compare = data[0][1];
          //var hash = argon2.hash(req.body[1], { type: argon2id, salt })

              argon2.verify(compare, req.body[1]).then( boorean =>
                {
                  if(boorean){
                    res.send({type: 'success', message: 'successfully logged in'})
                  }else{
                    res.send({type: 'error', message: 'invalid username or password'})
                  }

                }
              )//.catch(res.send({type: 'error', message: 'big sad'}));
        }else{
          res.send({type: 'error', message: 'invalid username or password'})
        }
      });
    });
});

app.post('/signup/',  function(req, res) {
  mysqlx.getSession(config)
    .then(session => {
      const table = session.getSchema('allposts').getTable('login');
      var things = table.select().where(`username = "${req.body[0]}"`).execute()
        .then(result =>
          {
            var data = result.fetchAll();
            console.log(data);
            if(data.length == 0){
              var salt = crypto.randomBytes(16);
              var hash = argon2.hash(req.body[1], { type: argon2id, salt }).then( hash =>
                {
                  table.insert('username', 'hash', 'salt', 'active').values(req.body[0], hash, salt.toString('utf-8'), 0).execute();
                  const verificationTable = session.getSchema('allposts').getTable('emailverification');
                  var proxid = uuidv4();
                  verificationTable.insert('uuid', 'email').values(proxid, req.body[0]).execute().then(() => {
                    sendMail({
                      from: secure.gmail.user,
                      to: req.body[0],
                      subject: 'Verify your Email',
                      html: `<p>Use this link to verify your account: </p><a href="http://10.0.0.10:3000/validate/${proxid}">link</a>`
                    });
                  })
                  res.send({type: 'success', message: 'email registered'});
                }
              )
            }else{
              res.send({type: 'error', message: 'email already registered'})
            }
          });
    })
}
);

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
