const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const pool = require('./db')
const path = require('path')
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('Up and runnin\'')
})

app.use(express.static(path.join(__dirname,'client','build')))

//Routes

//Create a Todo
app.post('/todo', async(req,res)=>{
    try {
        const todoTitle = req.body.title
        const todoTask = await pool.query('INSERT INTO TODO (title) VALUES ($1) RETURNING *',[todoTitle])
        res.json(todoTask.rows[0])
        
    } catch (error) {
        console.error(error.message);
        
    }
    
})

//Delete a Todo

app.delete('/todo/:id', async(req,res)=>{
    const {id} = req.params
    try {
        const result = await pool.query('DELETE FROM todo WHERE id = $1',[id])
        if (result.rowCount == 0) return res.status(404).send("Not Found");
        res.sendStatus(204)
    } catch (err) {
        console.error(err.message);
        
    }
})

//Update a Todo
app.put('/todo/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const newTitle = req.body.title
        const result = await pool.query('UPDATE todo SET title = $1 WHERE id=$2 RETURNING id, title',[newTitle,id])
        res.json(result.rows[0])
        
    } catch (error) {
        console.error(error.message);
        
    }
})

//Get a Todo

app.get('/todo/:id',async(req,res)=>{
    const {id} = req.params
    const results = await pool.query('SELECT * FROM todo WHERE id = $1',[id])
    res.send(`Your task is ${results.rows[0].title}`)
})
//Get all Todos
app.get('/todo', async (req,res)=>{
    try {
        const allTodoTasks = await pool.query('SELECT * FROM TODO;')
        res.json(allTodoTasks.rows)
    } catch (error) {
        console.error(error.message);
        
    }
})

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'))
})

app.listen(5000,()=>{
    console.log("listening");
    
})
