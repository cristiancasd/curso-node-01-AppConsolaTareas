require('colors');

const mostrarMenu= ()=>{
    // NO usamos esta función, usamos el menú de inquirer
    console.clear();

    return new Promise(resolve =>{
        console.log('=================================='.blue);
        console.log('  Seleccione una opción'.blue);
        console.log('=================================='.blue);

        console.log(`${'1. '.green}Crear tarea`);
        console.log(`${'2. '.green}Listar tareas`);
        console.log(`${'3. '.green}Listar tareas completadas`);
        console.log(`${'4. '.green}Listar tareas pendiente`);
        console.log(`${'5. '.green}Completar tarea(s)`);
        console.log(`${'6. '.green}Borrar tarea`);
        console.log(`${'7. '.green}Salir`);
        
        const readline=require('readline').createInterface({
            input:process.stdin,
            output: process.stdout
        });    
        readline.question('Seleccione una opción: ', (opt)=>{
            console.log(opt);
            readline.close();
            resolve(opt);
        });
    });
}

const pausa=()=>{
    //Pausmamos la consola hasta que haya un enter
    return new Promise(resolve =>{
        const readline=require('readline').createInterface({
            input:process.stdin,
            output: process.stdout
        });    
        readline.question(`Presione ${'ENTER'.green} para continuar`, (opt)=>{
            readline.close();
            resolve();
        });
     })   
}

module.exports={mostrarMenu, pausa}