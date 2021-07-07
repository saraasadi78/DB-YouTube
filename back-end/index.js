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
      const token = jwt.sign({ username: user.username }, 'myJwtPrivateKey'); // pk shouldn't be stored here
      res.header('Set-Cookie', `token=${token}`).send(`user ${user.username} successfully logged in!`);
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
        const token = jwt.sign({ username: user.username }, 'myJwtPrivateKey'); // pk shouldn't be stored here
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

// select v.video_id, v.name, v.duration, v.description, v.thumbnailimage, count(w.id) from video as v
// inner join watch as w on w.video_id = v.video_id
// group by v.video_id, v.name, v.duration, v.description, v.thumbnailimage
// order by uploaddate desc


app.get('/videos/search/:searchToken', async (req, res) => {
  const searchToken = req.params.searchToken;
  try {
    const response = await pool.query(`select v.video_id, v.name, v.duration, v.description, v.thumbnailimage, v.uploaddate, count(w.id) as views from video as v
      left join watch as w on w.video_id = v.video_id
      where v.name like $1
      group by v.video_id, v.name, v.duration, v.description, v.thumbnailimage, v.uploaddate
      order by uploaddate desc`, [searchToken]);
    console.log(response.rows);
    res.send(response.rows);
  } catch (error) {
    console.log('this', error);
    res.send(error);
  }
});

app.get('/videos', async (req, res) => {
  try {
    const response = await pool.query(`select v.video_id, v.name, v.duration, v.description, v.thumbnailimage, v.uploaddate, count(w.id) as views from video as v
      left join watch as w on w.video_id = v.video_id
      group by v.video_id, v.name, v.duration, v.description, v.thumbnailimage, v.uploaddate
      order by uploaddate desc`);
    console.log(response.rows);
    res.send(response.rows);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get('/video/all', async (req, res) => {

  try {
    const id = req.params.id
    const response = await pool.query(`with comments  as (select c.text , w.video_id , w.liked from comment  as c inner join watch  as  w on c.comment_id = w.comment_id  where  w.video_id = $1)
    select com.text , count(com.liked)  , v.name  , v.uploaddate , v.duration , v.description  ,  v.thumbnailimage from video as v 
    left join comments as com on com.video_id  = v.video_id where v.video_id = $1  group by com.text , v.name  , v.uploaddate , v.duration , v.description  ,  v.thumbnailimage`)
    console.log(response.rows[0]);
    res.send(response.rows[0]);
  } catch (error) {
    console.log(error)
    res.send(error)
  }

})

app.get('/video/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const response =
      await pool.query('select video_id, name, duration, description, thumbnailimage from video where video_id = $1 order by uploaddate desc', [id]);
    console.log(response.rows[0]);
    res.send(response.rows[0]);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get('/video/view:id', async (req, res) => {
  try {
    const id = req.params.id
    const response = await pool.query('SELECT  count(v.video_id) from video as v INNER join watch as w on  w.video_id = v.video_id where v.video_id = $1 group by v.video_id')
    console.log(response.rows[0]);
    res.send(response.rows[0]);
  } catch (error) {
    console.log(error)
    res.send(error)
  }

})

app.get('/playlist/:id', async (req, res) => {
  try {
    const id = req.params.id
    const response = await pool.query('select username  , isPublic  from  playlist where id  = $1  and isPublic  = true ')
    console.log(response.rows[0]);
    res.send(response.rows[0]);
  } catch (error) {
    console.log(error)
    res.send(error)
  }

})

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));