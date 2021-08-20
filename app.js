let addTodo = () => {
    let todo = document.getElementById("todo");
    firebase.database().ref('todos').push({ todo: todo.value })
    todo.value = ""
}

firebase.database().ref('todos').on('child_added', (data) => {
    let list = document.getElementById('list')
    list.innerHTML += `
        <li>
        <div class="list-card" >
    <div> 
        <input id="${data.key}" type="text" value="${data.val().todo}" disabled />
    </div> 
    <div>
    <button type="button"  id="${data.key}edit" onclick="editInput('${data.key}')" class="btn btn-success">Edit</button>
    <button type="button" onclick="delTodoList('${data.key}')" class="btn btn-danger">Delete</button>
    </div>   
    </div >  
    </li >
    `
})

let delAllItems = () => {
    firebase.database().ref('todos').remove();
    let list = document.getElementById('list')
    list.innerHTML = ""
}

let delTodoList = (key) => {
    firebase.database().ref(`todos/${key}`).remove();
    event.target.parentNode.parentNode.parentNode.remove();

}

let editInput = (id) => {
    let input = document.getElementById(id)
    let editbtn = document.getElementById(id + 'edit');
    // editbtn.innerHTML = "Update";
    // editbtn.setAttribute ('onclick' , `update(${id})`)
    // input.disabled = false
    // editbtn.innerHTML = "Edit"

}