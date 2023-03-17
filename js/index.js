import { Todos } from './Todos.js';
const BACKEND_ROOT_URL = 'http://localhost:3001';
const list = document.querySelector('#todolist');
const input = document.querySelector('#newtodo'); // ?
const todos = new Todos(BACKEND_ROOT_URL);
input.disabled = true;
// fetch data from backend my making an HTTP call
fetch(BACKEND_ROOT_URL)
    .then(response => response.json())
    .then((response) => {
    response.forEach((node) => {
        renderTask(node.description);
    });
    input.disabled = false;
}, (error) => {
    alert(error);
});
todos.getTasks().then((tasks) => {
    tasks.forEach(task => {
        renderTask(task);
    });
    input.disabled = false;
}).catch((error) => {
    alert(error);
});
input.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const text = input.value.trim();
        if (text !== '') {
            const json = JSON.stringify({ description: text });
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
                renderTask(text);
                input.value = '';
            }, (error) => {
                alert(error);
            });
        }
    }
});
const renderTask = (task) => {
    const list_item = document.createElement('li');
    list_item.setAttribute('class', 'list-group-item');
    list_item.innerHTML = task.text;
    list.append(list_item);
};
