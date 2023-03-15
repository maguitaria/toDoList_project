"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// script to start NodeJS server and return JSOn response
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 3001;
//middleware
app.use("/static", express_1.default.static("static"));
app.get('/test', (req, res) => {
    res.send('Hello');
});
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
const openDb = () => {
    const pool = new pg_1.Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: 'root',
        port: 5342
    });
    return pool;
};
// Receive value from client and insert input to database
app.post('/new', (req, res) => {
    const pool = openDb();
    pool.query('insert into task (description) values ($1) returning *', [req.body.description], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
    });
});
// set EJS
app.set('view engine', 'ejs');
var todos = ['buy the milk', 'rent a car', 'feed the cat'];
app.get('/list', (request, response) => response.status(200).json(todos));
