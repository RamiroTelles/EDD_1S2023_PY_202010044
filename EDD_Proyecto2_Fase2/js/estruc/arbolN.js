class nodoAN{
    constructor(dato,id){
        this.dato = dato;
        this.matriz;
        this.hijos=[];
        this.id=id;
    }
}


class arbolN{
    constructor(){
        this.raiz = new nodoAN("/",0);
        this.cant =1;
    }

    agregarCarpeta(nombre,directorio){
        let padre = this.obtenerDirectorio(directorio);
        if (padre!==null){
            let copia;
            let i=0;
            //debugger;
            let nuevoNombre = nombre;
            while(true){
                //debugger;
                
                copia = padre.hijos.find(elem => elem.dato ===nuevoNombre);
                if(copia=== undefined || copia === null){
                    padre.hijos.push(new nodoAN(nuevoNombre,this.cant));
                    this.cant++;
                    return;
                }
                
                nuevoNombre= `Copia${i} ${nombre}`;
                i++;
                //alert("Se detectó una carpeta con el mismo nombre");
            }
            
            
        }else{
            alert("No se pudo agregar la Carpeta");
        }
    }

    obtenerDirectorio(directorio){
        //debugger;
        if(directorio==="/"){
            return this.raiz;
        }else{
            let temp = this.raiz;
            let carpetas = directorio.split("/");
            carpetas = carpetas.filter( elem => elem !== '');
            while(carpetas.length>0){
                let carpeta = carpetas.shift();
                carpeta = temp.hijos.find(elem => elem.dato == carpeta);
                if(carpeta === undefined || carpeta===null){
                    return null
                }
                temp = carpeta;
            }
            return temp;    
        }
        
    }

    async graficar(){
        console.log("Pos para javascript esto no existe");
        let nodosT = await this.generarNodosGraf(this.raiz);
        let enlT = await this.generarEnlGraf(this.raiz);
        let dot = `digraph L{
            node[shape=box];
                        
            label= "Arbol N-ario";\n`
        dot+= nodosT;
        dot+="\n";
        dot+=enlT;
        dot+="\n";
        dot+="}"
        return dot;
    }

    generarNodosGraf(nodo){
        //debugger;
        let nod="";
        
        for(let i =0;i<nodo.hijos.length;i++){
            nod+=this.generarNodosGraf(nodo.hijos[i]);
        }
        nod+=`n${nodo.id}[label=\"${nodo.dato}\"];\n`

        return nod;
    }

    generarEnlGraf(nodo){
        debugger;
        let enl="";
        
        for(let i =0;i<nodo.hijos.length;i++){
            enl+=this.generarEnlGraf(nodo.hijos[i]);
            enl+=`n${nodo.id} -> n${nodo.hijos[i].id};\n`
        }
        return enl;
    }

}



