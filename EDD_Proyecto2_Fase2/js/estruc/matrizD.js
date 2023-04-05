class nodoM{
    constructor(x,y,dato){
        this.x = x;
        this.y =y;
        this.dato = dato;
        this.left =null;
        this.right =null;
        this.up =null;
        this.down =null;
    }
}


class matrisDispersa{
    constructor(propietario){
        this.raiz = new nodoM(-1,-1,"Inicio");
        this.raiz.right = new nodoM(0,-1,propietario);
        this.raiz.right.left = this.raiz; 
        //this.propietario = this.raiz.right;
    }

    obtenerDato(nodo){
        
        return nodo===null? null:nodo.dato;
    }

    insertarArchivo(dato){
        
        let temp = this.raiz;
        let cont=0;

        while(temp.down!==null){
            temp = temp.down;
            cont++;
        }

        temp.down = new nodoM(-1,cont,dato);

        temp.down.up = temp;

        const nuevo = new nodoM(0,cont,"r,w");
         
        temp.right.down = nuevo;
        nuevo.up = temp.right;
        nuevo.left = temp.down;
        temp.down.right = nuevo;
    }


    insertarPermisos(carnet,archivo,permisos){
        //debugger;
        //Encontrar carnet en la cabecera
        let temp = this.raiz;
        let x;
        let y;

        //Encuentra la fila a insertar
        while(temp.down!==null && temp.down.dato!==archivo){
            temp = temp.down;
        }

        if(temp.down===null){
            console.log("Archivo no encontrado");
            return
        }else{
            y = temp.down;
        }
       
        temp = this.raiz;
        //Busca la cabecera x correspondiente
        while(temp.right!==null && temp.right.dato!==carnet){
            //let vagina = this.obtenerDato(temp.right);
            temp = temp.right;
        }

        
        if (temp.right === null){
            //Crea Cabezera si no existe
            const nuevaCabezera = new nodoM(temp.x+1,-1,carnet);
            temp.right = nuevaCabezera;
            nuevaCabezera.left = temp
            x = nuevaCabezera;
            
        }else{
            
            x= temp.right;
            
        }

        
        
        const nuevo = new nodoM(x.x,y.y,permisos);

        this.insertarNodoConxy(x,y,nuevo);


    }

    insertarNodoConxy(x,y,nodo){
        //debugger;
        let temp = x;
        let duplicadoY = false;
        let duplicadoX = false;
        //Busca el espacio en el que insertar el y
        while(temp.down!==null && temp.down.y<y.y){
            temp = temp.down;
        }

        
        

        if(temp.down===null){
            //insertar al final
            temp.down = nodo;
            nodo.up = temp;
        }else{
            //Si el nodo existe, actualizo el dato
            if(temp.down.y===y.y){
                temp.down.dato = nodo.dato;
                return;
            }
            //insertar entre nodos
            temp.down.up = nodo;
            nodo.down = temp.down;
            nodo.up = temp;
            temp.down = nodo;
        }

        temp = y;

        //Busca el espacio en el que insertar el x
        while(temp.right!==null && temp.right.x<x.x){
            temp = temp.right;
        }


        if(temp.right===null){
            //insertar al final
            temp.right = nodo;
            nodo.left = temp;
        }else{
            //insertar entre nodos
            temp.right.left = nodo;
            nodo.right = temp.right;
            nodo.left = temp;
            temp.right = nodo;
        }


    }

    async graficarMatriz(){
        let enlaces = await this.recorrerNodos();
        let nodos= await this.recorrerEnlaces();
        let ranks = await this.recorrerRanks();
        let dot =`digraph cuadro{
            node[shape=box style=filled];
            subgraph matriz{
                edge[dir=both];\n`;
        dot+=nodos;
        dot+="\n";
        dot+=enlaces;
        dot+="\n";
        dot+=ranks;
        dot+="\n";
        dot+="}\n}";
        return dot;
    }

    recorrerRanks(){
        //debugger;
        let ranks = "";
        let filas = this.raiz;
        let columnas = this.raiz;
        //nodos+=`n${columnas.x+1}${columnas.y+1}[label="${columnas.dato}"];\n`;


        //let contador =0;
         while(filas!==null){
            ranks +=`{rank=same; `;
            while(columnas!==null){
                
                ranks+=`n${columnas.x+1}${columnas.y+1},`;
                columnas = columnas.right;
            }
            //nodos+=`n${columnas.x+1}${columnas.y+1}[label="${columnas.dato}"];\n`;
            ranks= ranks.substring(0,ranks.length-1);
            ranks+="};\n"
            filas = filas.down;
            columnas = filas;
        }
        
        return ranks;
    }


    recorrerNodos(){
        let nodos = "";
        let filas = this.raiz;
        let columnas = this.raiz;
        //nodos+=`n${columnas.x+1}${columnas.y+1}[label="${columnas.dato}"];\n`;



         while(filas!==null){
            while(columnas!==null){
                nodos+=`n${columnas.x+1}${columnas.y+1}[label=\"${columnas.dato}\",group=${columnas.x+1}];\n`;
                columnas = columnas.right;
            }
            //nodos+=`n${columnas.x+1}${columnas.y+1}[label="${columnas.dato}"];\n`;
            filas = filas.down;
            columnas = filas;
        }
        
        return nodos;
    } 

    recorrerEnlaces(){
        //debugger;
        let enlaces = "";
        let filas = this.raiz;
        let columnas = this.raiz;
        



         while(filas!==null){
            while(columnas.right!==null){
                enlaces+=`n${columnas.x+1}${columnas.y+1} -> n${columnas.right.x+1}${columnas.right.y+1};\n`;
                columnas = columnas.right;
            }
           
            //enl+=`n${filas.x+1}${filas.y+1} -> n${columnas.right.x+1}${columnas.right.y+1};\n`;
            filas = filas.down;
            columnas = filas;
        }

        filas = this.raiz;
        columnas = this.raiz;

        while(columnas!==null){
            while(filas.down!==null){
                enlaces+=`n${filas.x+1}${filas.y+1} -> n${filas.down.x+1}${filas.down.y+1};\n`;
                filas = filas.down;

            }
            columnas = columnas.right;
            filas = columnas;
        }
        return enlaces;

    }
}