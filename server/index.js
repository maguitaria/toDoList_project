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
// server configuration
app.listen(port, () => {
    console.log('Server is working on port ' + port);
});
// routes
const openDb = () => {
    const pool = new pg_1.Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: '1234567890',
        port: 5432,
        max: 20,
    });
    return pool;
};
const pool = openDb();
// Receive value from client and insert input to database
app.post('/new', (req, res) => {
    pool.query('insert into task (description) values ($1) returning *', [req.body.description], (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ id: result.rows[0].id });
    });
});
app.get('/', (req, res) => {
    pool.query('select * from task', (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
        console.log(result);
        return res.status(200).json(result.rows); // gives an error here
    });
});
