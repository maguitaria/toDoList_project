import { resolve } from "path"
import { Task } from "./Task.js"
import { rejects } from "assert"

const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema({
    todo: {
       type: String,
       required:true,
    },
}  
)
module.exports = new mongoose.model('Todo', TodoSchema)
class Todos {
    task: Array<Task> = []
    #backend_url = ''
    constructor(url: URL | any) {
        this.#backend_url = url
    }


    // async function to store items in an array
    getTasks = async () => {
        return new Promise((resolve, reject) => {
            fetch(this.#backend_url)
                .then(response => response.json())
                .then((response) => {
                    resolve(this.tasks)
                }, (error) => {
                    reject(error)
                })
        })
    }

    // private method for reading JSON into array of tasks
    #readJson(taskAsJson: any): void {
        taskAsJson.forEach(node => {
            const task = new Task(node.id, node.description)
            this.tasks.push(task)
        })
    }
}
export { Todos } 