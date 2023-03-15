"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// script to start NodeJS server and return JSOn response
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 3301;
app.get('/', (req, res) => {
    //  const pool = openDb();
    //  pool.query('select * from task', (error,result)=> {
    //     if (error) {
    //         res.status(500).json({error: error.message})
    //     }
    res.status(200).json({ result: "success" });
});
app.listen(port);
// const openDb = (): Pool => {
//     const pool: Pool = new Pool ({
//         user: 'postgres',
//         host: 'localhost',
//         database: 'todo',
//         password: 'root',
//         port: 5342
//     });
//     return pool;
// }
