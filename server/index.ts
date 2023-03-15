// script to start NodeJS server and return JSOn response
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { Pool, QueryResult } from 'pg';

const app: Express = express();
app.use(cors());
app.use(express.json());
const port = 3001;

//middleware
app.use("/static", express.static("static"))
app.get('/test', (req, res) => {
    res.send('Hello')
})
// // JS response
// app.get('/', (req: Request, res: Response) => {
//     const pool = openDb();
//     pool.query('select * from task', (error, result) => {
//         if (error) {
//             res.status(500).json({ error: error.message })
//         }
//         console.log(result);
//         // res.status(200).json(result.rows); // gives an error here

//     })
// });
app.listen(port, () => {
    console.log('Server running on ' + port);
});
// Pool activation - open database connection
const openDb = (): Pool => {
    const pool: Pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: 'root',
        port: 5342
    });
    return pool;
}

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

// set EJS
app.set('view engine', 'ejs');

var todos = ['buy the milk', 'rent a car', 'feed the cat'];

app.get('/list', (request, response) => response.status(200).json(todos));