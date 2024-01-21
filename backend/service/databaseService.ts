import sqlite3 from "sqlite3"
import { open, Database } from "sqlite"
import { Task } from "../interfaces/Task"

export class DatabaseService {
  db: Database<sqlite3.Database, sqlite3.Statement>

  private constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
    this.db = db
  }

  static async build() {
    const db = await open({
      filename: "./db/mydb.sqlite",
      driver: sqlite3.Database,
    })
    return new DatabaseService(db)
  }

  async sumTable1() {
    const result = await this.db.get("SELECT SUM(value) as sum FROM table1")
    return result.sum
  }

  async sumTable2() {
    const result = await this.db.get("SELECT SUM(value) as sum FROM table2")
    return result.sum
  }

  async getAllTasks() {
    return await this.db.all("SELECT * FROM tasks")
  }

  async insertTask(newTask: Task) {
    return await this.db.run(
      "INSERT INTO tasks (id, title, finished) VALUES (?, ?, ?)",
      [newTask.id, newTask.title, newTask.finished],
    )
  }

  async deleteTask(taskId: number) {
    return await this.db.run("DELETE FROM tasks WHERE id = ?", [taskId])
  }

  async updateTask(updatedTask: Task) {
    return await this.db.run(
      "UPDATE tasks SET title = ?, finished = ? WHERE id = ?",
      [updatedTask.title, updatedTask.finished, updatedTask.id],
    )
  }
}
