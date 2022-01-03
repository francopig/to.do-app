
export class Todo{

    //para resolver el inconveniente del localStorage
    //Con esto recupero los métodos que define en esta clase
    static fromJson({id, tarea, completado, creado }){

        const tempTodo = new Todo( tarea );
        
        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;

        return tempTodo; 
    }
    

    constructor( tarea ){

        this.tarea       = tarea;
        this.id          = new Date().getTime();
        this.completado  = false;
        this.creado      = new Date();
    }

    //Método solo para experimentar con el localStorage
    imprimirClase(){
        console.log(`${ this.tarea } - ${ this.id } `);
    }
}