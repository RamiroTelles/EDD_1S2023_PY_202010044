class nodoLista{
    constructor(dato){
        this.dato = dato;
        this.sig = null;

    }
}

class listaCicular{
    constructor(){
        this.cabecera = null;
        this.cant = 0;
    }

    insertar(dato){
        if (this.cabecera ===null){
            this.cabecera = new nodoLista(dato);
            this.cabecera.sig = this.cabecera;
            this.cant++;
        }else{
            let temp = this.cabecera;

            while(temp.sig!==this.cabecera){
                temp = temp.sig;
            }
            let nuevo = new nodoLista(dato);
            temp.sig = nuevo;
            nuevo.sig = this.cabecera;
            this.cant++;
        }
    }

    obtener(pos){
        if (pos > this.cant || pos <0){
            console.log("Posición inválida");
            return null;
        }else{
            let temp = this.cabecera;
            for(let i=0;i<pos;i++){
                temp = temp.sig;
            }
            return temp;
        }
    }

    remplazar(pos,dato){
        if (pos > this.cant || pos <0){
            console.log("Posición inválida");
            return false;
        }else{
            let temp = this.cabecera;
            for(let i=0;i<pos;i++){
                temp = temp.sig;
            }
            temp.dato = dato
            return true
        }
    }

    graficarLista(){
        let nodos ="";
        let enlaces ="";
        let ranks="";
        if(this.cant===0){
            alert("Lista Circular vacia");
            return null
        }
        for(let i =0;i<this.cant;i++){
            nodos+=`n${i}[label=\"${this.obtener(i).dato}\"];\n`;
        }

        let j=0;
        while(j<this.cant-1){
            enlaces+=`n${j} -> n${j+1};\n`;
            j++;
        }
        enlaces+=`n${j} -> n0;\n`;

        ranks+=`{rank=same;`;
        for(let i =0;i<this.cant;i++){
            ranks+=`n${i},`;
        }
        ranks = ranks.substring(0,ranks.length-1);
        ranks+="};\n"

        let dot=`digraph cuadro{
            node[shape=box style=filled];\n`;

        dot += nodos;
        dot += enlaces;
        dot += ranks;
        dot+="\n}";
        return dot;

    }
}
