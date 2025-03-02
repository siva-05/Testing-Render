const { Client } = require('pg');
const express = require('express');

const app = express();
app.use(express.json());

// Replace these with your Render PostgreSQL connection details
const con = new Client({
  host: 'cv1kn6tds78s73dvpds0-a.singapore-postgres.render.com', // e.g., something.render.com
  user: 'renderpostgres',
  port: 5432, // This might be different; check your Render settings
  password: 'OkhebESMi03I80YLO26Rqej15rOpgCqq',
  database: 'demodb_s0je',
  ssl: { rejectUnauthorized: false }
});

con.connect().then(() => console.log("connected"))
  .catch((err) => console.error('connection error', err));

// INSERT DATA
app.post('/postData', (req, res) => {
  const { name, id } = req.body;

  const insert_query = 'INSERT INTO demotable (name, id) VALUES ($1, $2)';

  con.query(insert_query, [name, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
      res.send("POSTED DATA");
    }
  });
});


// DISPLAY DATA
app.get('/getAllData',(req6,res1)=>{
    // const name=req6.body
    // console.log(name)
    const select_query='SELECT * FROM demotable'
    con.query(select_query, (err2,result1)=>{
        if(err2)
            res1.send(err2)
        else{
            console.log("Data fetched successfully")
            res1.send(result1)
        }
    })
})



app.listen(3000, () => {
  console.log("server is running...");
});
