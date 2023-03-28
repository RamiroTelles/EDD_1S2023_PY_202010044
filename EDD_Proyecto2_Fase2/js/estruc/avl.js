class nodoAVL{
    constructor(dato){
        this.dato = dato;
        this.altura =0;
        this.izq = null;
        this.der= null;
    }
}

class arbolAVL{
    constructor(){
        this.raiz=null;
    }

    insertar(dato){
        const nuevo = new nodoAVL(dato)

        if (this.raiz === null){
            this.raiz = nuevo
            return
        }
       
        let temp = this.raiz;
        while(true){
            if(temp===null){
                temp = nuevo;
                console.log(temp)
                break;
            }else if (nuevo.dato === temp.dato){
                console.log("Dato Ya ingresado");
                break;

            }else if(nuevo.dato > temp.dato){
                temp = temp.der;
                continue;
            }else if(nuevo.dato < temp.dato){
                temp = temp.izq;
                continue;
            }
        }
    }
}

