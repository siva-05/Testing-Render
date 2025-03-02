const {Client}=require('pg')
const express=require('express')

const app=express()
app.use(express.json())

const con=new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root123",
    database: "demopost"
})

con.connect().then(()=> console.log("connected"))



// INSERT DATA
app.post('/postData', (req,res)=>{

    const {name,id} = req.body
    // res.send(name+""+id)
    
    const insert_query='INSERT INTO demotable (name,id) VALUES ($1, $2)'

    con.query(insert_query,[name,id],(err, result)=>{
        if(err)
        {
            res.send(err)
        }
        else{
            console.log(result)
            res.send("POSTED DATA")
        }
    })
})



// DISPLAY DATA
app.get('/getAllData',(req6,res1)=>{
    const name=req6.body
    console.log(name)
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



// UPDATE DATA
app.put('/updateData',(req,res)=>{
    const id = req.body.id
    const newName = req.body.newName
    update_query='UPDATE demotable SET NAME = $1 WHERE ID = $2'
    con.query(update_query,[newName,id],(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log("Data Updated")
            res.send(result)
        }
    })
})


app.delete('/deleteData', (req,res)=>{
    const {id}=req.body
    delete_query='DELETE FROM demotable WHERE id=$1'
    con.query(delete_query, [id], (err,result)=>{
        if(err){
            console.log("error in delete func")
            res.send(err)
        }
        else{
            console.log("data deleted successfully")
            res.send(result)
        }
    })
})



app.get('/getDataById/:id', (req,res)=>{
    const id=req.params.id
    const fetch_query='SELECT * FROM demotable WHERE id=$1'
    con.query(fetch_query, [id], (err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log("data was fetched successfully by an id: "+id)
            res.send(result)
        }
    })
})


const { uniqueNamesGenerator } = require('unique-names-generator');


const dictionaries = [['Mystic', 'Dark', 'Ancient'], ['Nightingale', 'Kraken', 'Phoenix']];

function generateName() {
  try {
    const name = uniqueNamesGenerator({ dictionaries, length: 2, separator: ' ' });
    return `The ${name}`;
  } catch (error) {
    console.error('Error generating name:', error);
    return 'Failed to generate name';
  }
}

app.get('/generateNames', (req, res) => {
  const generatedName = generateName();
  res.send({ generatedName });
  
});





app.listen(3000,()=>{
    console.log("server is running...")
})

