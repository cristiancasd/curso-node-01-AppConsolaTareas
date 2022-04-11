
const inquirer = require('inquirer');
require('colors');

const preguntas=[
    {
        type: 'list',
        name: 'opcion',
        message:'¿Que desea hacer?',
        //choices: ['opt1','opt2','opt3']
        choices:[
            {value:'1',
            name: '1. Crear tarea'},            
            {value:'2',
            name: '2. Listar tareas'},
            {value:'3',
            name: '3. Listar tareas completadas'},
            {value:'4',
            name: '4. Listar tareas pendientes'},
            {value:'5',
            name: '5. Completar tarea'},
            {value:'6',
            name: '6. Borrar tarea'},
            {value:'0',
            name: '0. Salir'},            
        ]
    }
];





const inquirerMenu = async() =>{

    console.log('=================================='.blue);
    console.log('  Seleccione una opción Inquirer'.blue);
    console.log('=================================='.blue);
  
    const {opcion}=await inquirer.prompt(preguntas);
    
    return opcion;
}

const pausa=async() =>{
    const question =[
        {
            type:'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ];
    await inquirer.prompt(question);
    console.clear();
}


const leerInput=async(message)=>{
    const question=[
        {
            type:'input',
            name: 'desc',
            message,
            validate(value){   //Permite validar que ingrese datos
                if(value.length===0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc}=await inquirer.prompt(question);
    return desc;

}

const listadoTareasBorrar=async(tareas)=>{
    
    const choices = tareas.map((tarea,i)=>{

        const idx=(i+1+'.').green;

        //Retorna un arreglo
        return { 
            value:tarea.id, //Lo que se enviara al seleccionar la opción
            name:`${idx} ${tarea.desc}`  //lo que se ve en el listado
        }
        //return  
    })

    choices.unshift({
        value:'0',
        name: '0.'.green + ' cancelar'
    })

    //Listado del menu a desplegar
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message:'¿Cual desea borrar?',
            choices
        }
    ]
    //Esperar a que se escoja una opción
    //Se retorna el name de la opción escogida, es decir el id
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message)  => {
    const question=[
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    //El type confirm pregunta(y/n) y es boolean
    const {ok}=await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList=async(tareas)=>{
    
    const choices = tareas.map((tarea,i)=>{

        const idx=(i+1+'.').green;

        //Retorna un arreglo
        return { 
            value:tarea.id, //Lo que se enviara al seleccionar la opción
            name:`${idx} ${tarea.desc}`,  //lo que se ve en el listado
            checked:(tarea.completadoEn) ?true :false
                    //usamos ternario como condicional
        }
    })

    //Listado del menu a desplegar
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message:'Seleccione',
            choices
        }
    ]
    //Esperar a que se escoja una opción
    //Se retorna el name de la opción escogida, es decir el id
    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}

module.exports={inquirerMenu, 
    pausa, 
    leerInput,
    listadoTareasBorrar,
    mostrarListadoCheckList,
    confirmar}
