// script to start NodeJS server and return JSOn response
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { Pool, QueryResult } from 'pg';


const app: Express = express();
app.use(cors());
app.use(express.json());
const port = 3001;

// server configuration
app.listen(port, () => {
    console.log('Server is working on port ' + port);
})

// routes






const openDb = (): Pool => {
    const pool: Pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: '1234567890',
        port: 5432,
        max: 20,
    });
    return pool;
}

const pool = openDb();




// Receive value from client and insert input to database
app.post('/new', (req: Request, res: Response) => {
    pool.query('insert into task (description) values ($1) returning *',
        [req.body.description],
        (error: Error, result: QueryResult) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(200).json({ id: result.rows[0].id });
        })
})

app.get('/', (req: Request, res: Response) => {
    pool.query('select * from task', (error, result) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ error: error.message })
        }
        console.log(result);
        return res.status(200).json(result.rows); // gives an error here

    })
})

