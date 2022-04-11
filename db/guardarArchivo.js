const fs = require('fs');

const archivo = './db/data.json';

const guardarDB=(data) =>{
    fs.writeFileSync(archivo,JSON.stringify(data));
}


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
   // console.log('info --- ',info);
    //console.log('data ----', data);
    return data;
}



module.exports={
    guardarDB, leerDB
}