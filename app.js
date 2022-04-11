require('colors');

const { guardarDB, leerDB} = require('./db/guardarArchivo');
const {mostrarListadoCheckList,inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar} = require('./helpers/inquirer');

const Tarea = require("./models/Tarea");
const Tareas = require('./models/tareas');

console.clear();

const main=async() => {

    let opt='';

    //creamos instancia
    const tareas=new Tareas();

    //cargamos el arreglo del txt
    const tareasDB = leerDB();

    //creamos el objeto en arreglo
    if (tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    await pausa();  

    //Ciclo para mantener la aplicación activa
    while(opt!='0'){
        
        //Función que imprime el menú, opt tiene respuesta del selector
        opt = await inquirerMenu();

        //Ejecutamos las acciones dependiendo de lo seleccionado en menú
        switch(opt){
            case '1': //Creamos tarea
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                console.log('La tarea escrita es: '.red, desc);
            break;

            case '2': //Listamos tareas 
                //console.log(tareas._listado);                
                console.log(tareas.listadoCompleto(tareas.listadoArr) );
            break;

            case '3': //Tareas completas                                 
                console.log(tareas.listaTareasCompletas(tareas.listadoArr) );
            break;
            
            case '4':  //Tareas pendientes                                
                console.log(tareas.listaTareasPendientes(tareas.listadoArr) );
            break;

            case '5':  //Modificamos estado de la tarea                           
            const ids= await mostrarListadoCheckList(tareas.listadoArr)
            tareas.toggleCompletadas(ids);
            break;

            case '6': //Borramos tarea                                
                const id= await listadoTareasBorrar(tareas.listadoArr);
                
                if(id!=='0'){ 
                    const ok= await confirmar('¿Estás seguro?');
                    console.log({ok})
                    
                    if(ok){
                        //_listado permite acceder buscando por id
                        //listadoArr no pormite buscar por id                    
                        console.log('Tarea ',`${tareas._listado[id].desc}`.red,' eliminada')
                        tareas.borrarTarea(id);
                    }
                }
                
                console.log({id});
            break;
                
                
            
        }

        //guardamos el arreglo con las tareas en el data.json
        guardarDB(tareas.listadoArr);
        await pausa();        
    }
}
main();




