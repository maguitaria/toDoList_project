const list = <any>document.querySelector('#todolist');
const input = <any>document.querySelector('#newtodo'); // ?
input.addEventListener('keypress', (event: { key: string; preventDefault: () => void; }) => {
    if (event.key === "Enter") {
        event.preventDefault()
        const text = input.value.trim()
        if (text !== '') {
            const list_item = document.createElement('li');
            list_item.setAttribute('class', 'list-group-item')
            list_item.innerHTML = text
             input.value = ''
        }
    }
})
