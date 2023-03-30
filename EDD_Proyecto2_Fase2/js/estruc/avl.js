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

   /*  insertar(dato){
        const nuevo = new nodoAVL(dato)

        if (this.raiz === null){
            this.raiz = nuevo
            return
        }
       
        let temp = this.raiz;
        let contador =0;
        while(true){
            contador++;
            if (nuevo.dato.carnet === temp.dato.carnet){
                console.log("Dato Ya ingresado");
                break;

            }else if(nuevo.dato.carnet > temp.dato.carnet){
                if (temp.der===null){
                    nuevo.altura = contador
                    temp.der = nuevo
                    break;
                }
                temp = temp.der
                continue;
            }else if(nuevo.dato.carnet < temp.dato.carnet){
                if (temp.izq===null){
                    nuevo.altura = contador
                    temp.izq = nuevo
                    break;
                }
                temp = temp.izq
                continue;
            }
        }
    } */


    getAltura(nodo){
        if (nodo ===null){
            return -1;
        }else{
            return nodo.altura;
        }
    }


    insertarR(dato,nodo){
        debugger;
        if (nodo===null){
            return new nodoAVL(dato);

        }else if(nodo.dato.carnet === dato.carnet){
            console.log("Dato ya ingresado");

        }else if(nodo.dato.carnet < dato.carnet){
            nodo.der = this.insertarR(dato,nodo.der);
            
        }else{
            nodo.izq = this.insertarR(dato,nodo.izq);
            
        }
        
        if (this.getAltura(nodo.izq)>this.getAltura(nodo.der)){
            nodo.altura= this.getAltura(nodo.izq)+1;
        }else{
            nodo.altura= this.getAltura(nodo.der)+1;
        }


        //Rotaciones para balance

        if ((this.getAltura(nodo.izq)-this.getAltura(nodo.der))>1){
            if(dato.carnet< nodo.izq.dato.carnet){
                //rotacion izquierda
            }else{
                //doble izquierda
            }
        }

        if((this.getAltura(nodo.izq)-this.getAltura(nodo.der))<-1){
            if(dato.carnet<nodo.der.dato.carnet){
                //rotacion derecha
            }else{
                //doble derecha
            }
        }


        return nodo
    }
}

