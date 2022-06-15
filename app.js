// Select item

const form = document.querySelector('.todo-form');
const alert = document.querySelector('.alert');
const todo = document.querySelector('#todo');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.todo-container');
const list = document.querySelector('.todo-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";

// event listeners

// submit from
form.addEventListener('submit', addItem);
// clear list
//clearBtn.addEventListener('click', clearItems);
// display items onload
window.addEventListener('DOMContentLoaded', setupItems);


// function

// add Item
 function addItem(e){
    e.preventDefault();
    const value = todo.value;
    const id = new Date().getTime().toString();
    if(value!=="" && !editFlag){
        const element = document.createElement('article');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add('todo-item');
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
        // add evenLitsener both button
        const editBtn = element.querySelector('.edit-btn');
        const deleteBtn = element.querySelector('.delete-btn');
        editBtn.addEventListener('click', editItem);
        deleteBtn.addEventListener('click', deleteItem);

        // append child
        list.appendChild(element);
        //display alert
        displayAlert('Todo added to the list', 'success');
        // show container
        container.classList.add('show-container');
        // set local storage
        addToLocalStorage(id,value);
        // set Back to deafult
        setBackToDefault();
    }else if(value!=="" && editFlag){
        editElement.innerHTML=value;
        displayAlert("value changed", "success")
        // edit local storage
        editLocalStorage(editID,value);
        setBackToDefault();
    }else{
        displayAlert("please enter value", "danger");
    }
 }
// display alert function
 function displayAlert(text,action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`)
    // remove alert
    setTimeout(()=>{
        alert.textContent='';
        alert.classList.remove(`alert-${action}`);
    },1000)
 }
//  edit item function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    //set element item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    todo.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent ="update";
}   
//  set Back to default function
function setBackToDefault(){
    todo.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "Submit";
}
// delete Item function
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length===0){
        container.classList.remove(`show-container`);
    }
    displayAlert('item removed','danger');
    setBackToDefault();
    //remove from local storage
    removeFromLocalStorage(id);

}
// local storage function
// set local storage function
function addToLocalStorage (id, value){
    const todo ={id, value}
    let items = getLocalStorage();
    items.push(todo);
    localStorage.setItem("list", JSON.stringify(items));
}
// get local storage function
function getLocalStorage(){
    return localStorage.getItem("list")
    ?JSON.parse(localStorage.getItem("list"))
    :[];
}
// edit local storage function
function editLocalStorage(id, value){
    let items= getLocalStorage();
    items = items.filter(function(item){
        if(item.id===id){
            item.value = value;
        }
        return item;
    })
    localStorage.setItem("list",JSON.stringify(items));
}
// remove item from local storage
function removeFromLocalStorage(){
    let items = getLocalStorage();
    item=items.map(function(item){
        if(item.id!==id){
            return item;
        }
    })
}
// setup item
function setupItems(){
    let items = getLocalStorage();
    if(items.length>0){
        items.forEach(item => {
            createListItem(item.id,item.value);
        });
        container.classList.add("show-container");
    }
}
// create list item function
function createListItem(id,value){
    const element=document.createElement('article');
    const attr=document.createAttribute('data-id');
    attr.value = id;
    console.log(attr)
    element.setAttributeNode(attr);
        element.classList.add('todo-item');
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
    // add evenLitsener both button
        const editBtn = element.querySelector('.edit-btn');
        const deleteBtn = element.querySelector('.delete-btn');
        console.log(editBtn);
        editBtn.addEventListener('click', editItem);
        deleteBtn.addEventListener('click', deleteItem);

    // append child
    list.appendChild(element);
}