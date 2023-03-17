
import { Task } from "./Task.js"

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
                    this.#readJson(response)
                    resolve(this.tasks)
                }, (error) => {
                    reject(error)
                })
        })
    }

    // private method for reading JSON into array of tasks
    #readJson(taskAsJson: any): void {
        taskAsJson.forEach((node: any)  => {
            const task = new Task(node.id, node.description)
            this.tasks.push(task)
        })
    }
}
export { Todos } 