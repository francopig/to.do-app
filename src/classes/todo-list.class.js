import  { Todo } from './todo.class';


export class TodoList {

    constructor(){

        this.cargarLocalStorage();
    }

    nuevoTodo( todo ){
        this.todos.push( todo );

        this.guardarLocalStorage();
    }

    eliminarTodo( id ){

        //regresa un nuevo arreglo excluyendo el arreglo Todo que coincida con el id
        //y se almacena en la lista de todos, osea la sobreescribe
        this.todos = this.todos.filter( todo => todo.id != id);

        this.guardarLocalStorage();

    }
    
    marcarCompletado( id ){
        for( const todo of this.todos ){
            if( todo.id == id){ 

                    this.guardarLocalStorage();
                    todo.completado = !todo.completado; 
                    break; //para no seguir buscando
            }
        }
    }

    eliminarCompletados(){

        //Regresa los no completados (Estoy filtrando los que quiero borrar)
        this.todos = this.todos.filter( todo => !todo.completado );

        this.guardarLocalStorage();
        
    }

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){

        //Verificamos si existe
        // if( localStorage.getItem('todo')) {

        //     //Lo pasamos a objeto porque estaba como string
        //     this.todos = JSON.parse(localStorage.getItem('todo'));

        //     console.log('cargarLocal:', this.todos);

        // }else {
        //     this.todos = []; //lo inicializo
        // }
        
        this.todos = (localStorage.getItem('todo')) 
                    ?  this.todos = JSON.parse(localStorage.getItem('todo')) 
                    :  []; ;

        //Una vez cargado tenemos un arreglo vacio o objetos que parecen todo's pero no lo son
        this.todos = this.todos.map( Todo.fromJson );
    }
}