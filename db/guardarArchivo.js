const fs = require('fs');

//Guardamos en un .json el mensaje recibo(data)
const archivo = './db/data.json';
const guardarDB=(data) =>{
    fs.writeFileSync(archivo,JSON.stringify(data));
}

//Retorno arreglo del txt
const leerDB = () => {
    //Revisar si existe el archivo
    if(!fs.existsSync(archivo)){
        return null;
    }
    //Si existe leo el archio entonces

    // Leo info el cual es un string
    const info=fs.readFileSync(archivo,{encoding: 'utf-8'})
    
    //data ya lo conviente en el arreglo
    const data=JSON.parse(info)
   
    //Retorno el arreglo
    return data;
}


module.exports={
    guardarDB, leerDB
}