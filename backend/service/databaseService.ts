import sqlite3 from 'sqlite3';
import {open, Database, Statement} from 'sqlite';
import {Task} from '../interfaces/Task';

class DatabaseService {
    // private _db: Database;
    private _db!: Database;

    get db(): Database {
        return this._db;
    }

    constructor(databasePath: string) {
        this.initializeDatabase(databasePath);
    }

    private async initializeDatabase(databasePath: string): Promise<void> {
        this._db = await setupDatabase(databasePath);
    }

    public async executeQuery(tableName: string): Promise<number> {
        // Use your existing functions here or add new ones as needed
        const tasks = await getAllTasks(this._db);
        const sum = tasks.reduce((acc, task) => acc + task.id, 0);
        return sum;
    }

    public closeConnection(): void {
        this._db.close();
    }
}

// Existing functions from your code
const setupDatabase = (databasePath: string) => {
    const db = open({
        filename: databasePath,
        driver: sqlite3.Database,
    });

    return db;
};

const getAllTasks = async (db: Database): Promise<Task[]> => {
    return await db.all('SELECT * FROM tasks');
};

const getTaskById = async (
    db: Database,
    id: number,
): Promise<Task | undefined> => {
    return await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
};

const insertTask = async (db: Database, newTask: Task): Promise<void> => {
    await db.run(
        'INSERT INTO tasks (id, title, finished) VALUES (?, ?, ?)',
        [newTask.id, newTask.title, newTask.finished]
    );
};

const deleteTask = async (db: Database, taskId: number): Promise<void> => {
    await db.run('DELETE FROM tasks WHERE id = ?', [taskId]);
};

const updateTask = async (db: Database, updatedTask: Task): Promise<void> => {
    await db.run(
        'UPDATE tasks SET title = ?, finished = ? WHERE id = ?',
        [updatedTask.title, updatedTask.finished, updatedTask.id]
    );
};

export {
    setupDatabase,
    getAllTasks,
    getTaskById,
    insertTask,
    deleteTask,
    updateTask,
    DatabaseService,
}