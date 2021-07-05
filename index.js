const { userSignupQuery } = require('./user');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();
app.use(express.json());

const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'youtube',
  password: 'amin4444',
  port: 5432,
})

// "INSERT INTO users VALUES ($1,$2,md5($3),NOW(),default.png)";

app.post('/signup', async (req, res) => {
  const user = req.body;
  try {
    const response =
      await pool.query(`select username from users where username = $1`, [user.username]);
    console.log('user found ', typeof user.username);
    if (!response.rows[0]) {
      const result = await pool.query("INSERT INTO users (username, email, password, membershipdate) VALUES ($1,$2,md5($3),NOW())", [user.username, user.email, user.password]);
      console.log(result);
      res.send('user successfully registered!');
    } else {
      console.log('user has already been registered');
      res.send('user has already been registered');
    }

  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

app.post('/login', async (req, res) => {
  const user = req.body;
  try {
    const response = await pool.query(`select username, password from users where username = $1`, [user.username]);
    console.log('This is response', response.rows[0]);
    if (!response.rows[0]) {
      console.log("username doesn't exist!");
      res.send("username doesn't exist!");
    }
    else {
      if (md5(user.password) === response.rows[0].password) {
        const token = jwt.sign({ username: user.username }, 'myJwtPrivateKey'); // pk should be stored here
        console.log('user successfully logged in!');
        res.header('Set-Cookie', `token=${token}`).send(`user ${user.username} successfully logged in!`);
      }
    }
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

// SELECT select_list
//     FROM table_expression
//     [ ORDER BY ... ]
//     [ LIMIT { number | ALL } ] [ OFFSET number ]

app.get('/videos', async (req, res) => {
  try {
    const response = await pool.query('select name, duration, description, thumbnailimage from video order by uploaddate desc');
    console.log(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  // const { error } = validateGenre(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});


const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));