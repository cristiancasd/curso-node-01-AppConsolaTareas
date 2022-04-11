const Tarea = require("./Tarea");

class Tareas{

    _listado={};

    get listadoArr(){
        const listado=[];

        //barrer cada una de las llaves del listado
        Object.keys(this._listado).forEach(key=>{
            //console.log('barrer llaves ...',key);
            listado.push(this._listado[key]);
        })
        
        return listado;
    }

    constructor(){  
        this._listado={};
    }

    borrarTarea(id){
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas){   
        tareas.forEach(element => {
            this._listado[element.id]=element;
        });  
    }

    crearTarea(desc){
        const tarea= new Tarea(desc);
        this._listado[tarea.id]=tarea;
    }

    listadoCompleto(){
        /*let i=1;
        let cadena='';
        this.listadoArr.forEach(element => {
           
            cadena+=`${JSON.stringify(i).green} ${element.desc} :: `
            if(element.completadoEn==null){
                cadena+=`${'Completada'.green}\n`
            }else{
                cadena+=`${'Pendiente'.red}\n`            
            }
            i++;
        })
        return cadena;
        */

        //Solución con ternario
        let cadena='';
        this.listadoArr.forEach((tarea,i)=>{
            const idx=`${i+1}`.green;
            const {desc, completadoEn}=tarea;
            const estado=(completadoEn)
                            ?'Completada'.green
                            :'Pendiente'.red;
            cadena+=`${idx} ${desc} :: ${estado}\n`
        });
        return cadena;      


    }

    listaTareasCompletas(){
        let cadena='';
        let i=1;
        this.listadoArr.forEach((tarea)=>{
            const idx=`${i}`.green;
            const {desc, completadoEn}=tarea;
            const estado=(completadoEn)
                            ? cadena+=`${idx} ${desc} :: ${completadoEn.green}\n`
                            : cadena=cadena;   
            if(completadoEn) i++;                                    
        });
        return cadena;   
    }

    listaTareasPendientes(){
        let cadena='';
        let i=1;
        this.listadoArr.forEach((tarea)=>{
            const idx=`${i}`.red;
            const {desc, completadoEn}=tarea;
            const estado=(completadoEn)
                            ? cadena=cadena
                            : cadena+=`${idx} ${desc}\n`;    
            if(!completadoEn) i++;
                                             
        });
        return cadena;   
    }

    completarTarea(){
        let cadena='';
        this.listadoArr.forEach((tarea,i)=>{
            const idx=`${i+1}`.red;
            const {desc, completadoEn}=tarea;
            const estado=(completadoEn)
                            ? cadena+=cadena
                            : cadena+=`${idx} ${desc}\n`;                                    
        });
        return cadena;   
    }

    toggleCompletadas(ids){

        //Tareas completadas
        ids.forEach(id=>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn)
                tarea.completadoEn=new Date().toISOString();
        });

        //Tareas no completadas
        this.listadoArr.forEach(tarea=>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn=null;
            }
        })
    }
}




module.exports=Tareas;