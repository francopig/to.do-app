import { Todo } from '../classes';
import { todoList } from '../index';

//Referencias en el HTML 
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltors     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed ' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div'); 
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div;
}

//Eventos
txtInput.addEventListener('keyup', (event) => {
    if( event.keyCode === 13 && txtInput.value.length > 0 ){

        //Obtenemos lo que se escribe
        const nuevoTodo = new Todo( txtInput.value );
        //Agregamos el nuevoTodo al arreglo
        todoList.nuevoTodo( nuevoTodo );
        //Lo agrega en el html
        crearTodoHtml( nuevoTodo);

        //Presionamos enter y se limpia el casillero
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) =>{

    
    const nombreElemento = event.target.localName;//localizamos en que parte se hizo el click(input-label-button)
    const todoElemento = event.target.parentElement.parentElement; //obtenemos la referencia al <li>
    const todoId = todoElemento.getAttribute('data-id');//para extraer el id


    if (nombreElemento.includes('input')){//si hizo click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed'); //Para tachar la tarea
    }else if( nombreElemento.includes('button')){ //hay que borrar el todo
        
        //Llamamos al método para eliminar el todo
        todoList.eliminarTodo( todoId );

        //Removemos del HTML el que coincida 
        divTodoList.removeChild( todoElemento);
    }
} )

//implementamos el listener del boton borrar los compleatados
btnBorrar.addEventListener('click', () => {

    //Los elimino del arreglo
    todoList.eliminarCompletados();

    //Los borro del HTML
    for( let i = divTodoList.children.length-1; i >= 0; i-- ){//borro desde abajo hacia arriba

        //pregunto si el elemento está completado o no
        const elemento = divTodoList.children[i];

        //Si tiene la clase completed lo borro
        if( elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltors.addEventListener('click', (event) => {

    console.log(event.target.text);
    const filtro = event.target.text; //Evita los clicks en espacios blancos
    if(!filtro) return;

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    //propiedad hidden del css
    for( const elemento of divTodoList.children ){
        
        //Si clickea un elemento quitamos la clase hidden
        elemento.classList.remove('hidden');

        //Para saber si el elemento actual esta completado
        const completado = elemento.classList.contains('completed');

        switch( filtro ){

            case 'Pendientes': 
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados': 
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
})