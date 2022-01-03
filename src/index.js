
import './css/styles.css'
    
import { Todo, TodoList } from './classes'; 
import { crearTodoHtml } from './js/componentes';


//Instaciamos la tarea y la lista
export const todoList = new TodoList();


//todoList.todos.forEach( todo => crearTodoHtml( todo ));
todoList.todos.forEach( crearTodoHtml );


