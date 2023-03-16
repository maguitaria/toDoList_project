
import { Task } from './class/Task.js'
import { Todos } from './class/Todos.js'


const BACKEND_ROOT_URL = 'http://localhost:3001';
const todos = new Todos(BACKEND_ROOT_URL);
const list = <any>document.querySelector('#todolist');
const input = <any>document.querySelector('#newtodo'); // ?



input.addEventListener('keypress', (event: { key: string; preventDefault: () => void; }) => {
    if (event.key === "Enter") {
        event.preventDefault()
        const text = input.value.trim()
        if (text !== '') {
            const json = JSON.stringify({ description: text })
            // fetch command to post data from backend
            fetch(BACKEND_ROOT_URL + '/new', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
                .then(response => response.json())
                .then((response) => {
                    renderTask(text)
                    input.value = ''


                }, (error) => {
                    alert(error);
                });
        }
    }
})

const renderTask = (text: string) => {
    const list_item = document.createElement('li');
    list_item.setAttribute('class', 'list-group-item');
    list_item.innerHTML = text;
    list.append(list_item);
}

// fetch data from backend my making an HTTP call
input.disabled = true; // user can`t make an input during rendering
fetch(BACKEND_ROOT_URL)
    .then(response => response.json())
    .then((response) => {
        response.forEach((node: { description: string; }) => {
            renderTask(node.description)
        });
        input.disabled = false
    }, (error) => {
        alert(error);
    });
    // creating a new Task
 
