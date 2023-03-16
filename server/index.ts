// script to start NodeJS server and return JSOn response
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { Pool, QueryResult } from 'pg';


const app: Express = express();
app.use(cors());
app.use(express.json());
const port = 3001;

const mongoose = require('mongoose');
// server configuration
app.listen(port, () => {
    console.log('Server is working on port ' + port);
})
// connection to mongodb
mongoose.connect("mongodb://localhost/todo_express", {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
// middlewares
app.use(express.urlencoded({ extended : true}))
app.use(express.static("public"));
app.set("view engine", "ejs");

// routes


















// Receive value from client and insert input to database
app.post('/new', (req: Request, res: Response) => {
    const pool = openDb();
    pool.query('insert into task (description) values ($1) returning *',
        [req.body.description],
        (error: Error, result: QueryResult) => {
            if (error) {
                res.status(500).json({ error: error.message });
            }
            res.status(200).json({ id: result.rows[0].id });
        })
})

app.get('/', (req: Request, res: Response) => {
    const pool = openDb()

    pool.query('select * from task', (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: error.message })
        }
        console.log(result);
        res.status(200).json(result.rows); // gives an error here

    })
})

const openDb = (): Pool => {
    const pool: Pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: '1234567890',
        port: 5342
    });
    return pool;
}



// set EJS
// app.set('view engine', 'ejs');

// var todos = ['buy the milk', 'rent a car', 'feed the cat'];

// app.get('/list', (request, response) => response.status(200).json(todos));