import express, {Request, Response} from 'express';
import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import bodyParser from 'body-parser';

import cors from 'cors';
import {CreateTaskRequest, DeleteTaskResponse, Task, UpdateTaskRequest} from "./interfaces/Task";

const app = express();
app.use(cors());
app.use(bodyParser.json());

let lastId = 1;

function createTask(title: string): Task {
    return {id: lastId++, title: title, finished: false};
}

async function setup() {
    const db = await open({
        filename: './db/mydb.sqlite',
        driver: sqlite3.Database
    });

    await db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT, finished BOOLEAN)');

    app.get('/api/task', async (req: Request, res: Response) => {
        const tasks = await db.all('SELECT * FROM tasks');
        res.send(tasks);
    });

    app.post('/api/task', async (req: Request<{}, {}, CreateTaskRequest>, res: Response) => {
        const newTask = createTask(req.body.title);
        await db.run('INSERT INTO tasks (id, title, finished) VALUES (?, ?, ?)', [newTask.id, newTask.title, newTask.finished]);
        res.send(newTask);
    });

    app.delete('/api/task/:id', async (req: Request<{ id: string }>, res: Response) => {
        const task = await db.get('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
        if (task) {
            await db.run('DELETE FROM tasks WHERE id = ?', [req.params.id]);
            res.send({id: Number(req.params.id)} as DeleteTaskResponse);
        } else {
            res.status(404).send('Задача не найдена');
        }
    });

    app.patch('/api/task/', async (req: Request<{}, {}, UpdateTaskRequest>, res: Response) => {
        const task = await db.get('SELECT * FROM tasks WHERE id = ?', [req.body.id]);
        if (task) {
            await db.run('UPDATE tasks SET title = ?, finished = ? WHERE id = ?', [req.body.title, req.body.finished, req.body.id]);
            res.send(task);
        } else {
            res.status(404).send('Задача не найдена');
        }
    });

    app.listen(3000, () => console.log('Server running on port 3000'));
}

setup().then(() => {});