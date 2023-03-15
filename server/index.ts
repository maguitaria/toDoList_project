// script to start NodeJS server and return JSOn response
import express, { Express, Request, Response} from 'express';
import cors from 'cors';
import { Pool  } from 'pg';

const app: Express = express();
app.use(cors());
app.use(express.json());
const port = 3001;

app.get('/', (req: Request, res:Response)=> {
 const pool = openDb();
 pool.query('select * from task', (error,result)=> {
    if (error) {
        res.status(500).json({error: error.message})
    }
    res.status(200).json({result:"success"});

 })
});


const openDb = (): Pool => {
    const pool: Pool = new Pool ({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: 'root',
        port: 5342
    });
    return pool;
}
app.listen(port);
