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
                    return true;
                }
                
                nuevoNombre= `Copia${i} ${nombre}`;
                i++;
                //alert("Se detectó una carpeta con el mismo nombre");
            }
            
            
        }else{
            alert("No se pudo agregar la Carpeta");
            return false;
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
       // debugger;
        let enl="";
        
        for(let i =0;i<nodo.hijos.length;i++){
            enl+=this.generarEnlGraf(nodo.hijos[i]);
            enl+=`n${nodo.id} -> n${nodo.hijos[i].id};\n`
        }
        return enl;
    }


    crearHTML(dir,carnet){
        let padre = this.obtenerDirectorio(dir);
        let cod ="";
        if(padre!==null){
            for(let i=0;i<padre.hijos.length;i++){
                cod+=`<div>
                        <img src="./img/carpeta.png" width="40px" height="40px"/>
                        <p class="h6 text-center">${padre.hijos[i].dato}</p>
                    </div>\n`;
            }
            if(padre.matriz==undefined || padre.matriz==null){
                padre.matriz = new matrisDispersa(carnet);
                cod+=padre.matriz.crearHTMLArchivos();
            }else{
                let nuevaMatriz = new matrisDispersa(carnet);
                nuevaMatriz.raiz = padre.matriz.raiz
                cod+=nuevaMatriz.crearHTMLArchivos();
            }
            
              

        }else{
            alert("Carpeta no encontrada");
        }
        return cod;


    }

    obtenerDotMatriz(dir,carnet){
        let padre = this.obtenerDirectorio(dir);
        if(padre!=null){
            if(padre.matriz==undefined || padre.matriz==null){
                padre.matriz = new matrisDispersa(carnet);
                let dot = padre.matriz.graficarMatriz();
                return dot;
            }else{
                let nuevaMatriz = new matrisDispersa(carnet);
                nuevaMatriz.raiz = padre.matriz.raiz
                let dot = nuevaMatriz.graficarMatriz();
                return dot;
            }
        }else{
            alert("No se encontró la carpeta");
            return null;
        }

    }

    eliminarCarpeta(nombre,dir){
        let padre = this.obtenerDirectorio(dir);
        if(padre!==null){
            let pos = padre.hijos.findIndex(elem => elem.dato == nombre);
            console.log(pos);
            if(pos===-1){
                alert("No se encontró la Carpeta");
                return false;
            }else{
                padre.hijos.splice(pos,1);
                console.log(padre.hijos);
                alert("Carpeta Eliminada con exito");
                return true;
            }
        }else{
            alert("No se encontró la Carpeta");
            return false;
        }
        


    }

    agregarArchivo(dir,archivo,carnet){
        let padre = this.obtenerDirectorio(dir);
        if(padre!==null){
            if(padre.matriz==undefined || padre.matriz==null){
                padre.matriz = new matrisDispersa(carnet);
                padre.matriz.insertarArchivo(archivo);
                return true;
            }else{
                let nuevaMatriz = new matrisDispersa(carnet);
                nuevaMatriz.raiz = padre.matriz.raiz
                nuevaMatriz.insertarArchivo(archivo);
                return true;
            }

        }else{
            alert("Directorio erróneo")
            return false;
        }
    }

    eliminarArchivo(dir,archivo,carnet){
        let padre = this.obtenerDirectorio(dir);
        if(padre!==null){
            if(padre.matriz==undefined || padre.matriz==null){
                
                alert("NO se encontró el archivo");
                return false;
            }else{
                let nuevaMatriz = new matrisDispersa(carnet);
                nuevaMatriz.raiz = padre.matriz.raiz
                return nuevaMatriz.eliminarArchivos(archivo);
            }
        }else{
            alert("Directorio erróneo")
            return false;
        }
    }

    insertarPer(dir,carnet,permisos,archivo,carnetUsuario){
        let padre = this.obtenerDirectorio(dir);
        if(padre!==null){
            if(padre.matriz==undefined || padre.matriz==null){
                
                alert("No se encontró el archivo");
                return false;
            }else{
                let nuevaMatriz = new matrisDispersa(carnetUsuario);
                nuevaMatriz.raiz = padre.matriz.raiz
                return nuevaMatriz.insertarPermisos(carnet,archivo,permisos);
            }
        }else{
            alert("Directorio erróneo")
            return false;
        }

    }
}



