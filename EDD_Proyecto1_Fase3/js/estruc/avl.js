class nodoAVL{
    constructor(dato){
        this.dato = dato;
        this.altura =0;
        this.izq = null;
        this.der= null;
    }
}

let enlaces="";
let nodos="";

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

    buscar(carnet){
        let temp = this.raiz;
        if(typeof carnet === 'number'){
            while(true){
                if(temp===null){
                    return null;
                }
                if (carnet===temp.dato.carnet){
                    return temp.dato;
                }else if(carnet>temp.dato.carnet){
                    temp = temp.der;
                }else if(carnet<temp.dato.carnet){
                    temp=temp.izq;
                }
            }
        }else{
            return null;
        }
       
    }


    getAltura(nodo){
        if (nodo ===null){
            return -1;
        }else{
            return nodo.altura;
        }
    }

    maxi(izq,der){
        return this.getAltura(izq) > this.getAltura(der) ? this.getAltura(izq) : this.getAltura(der); 
    }

    insertarR(dato,nodo){
        
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
                //rotacion derecha
                nodo = this.rotacionDer(nodo);
            }else{
                //doble derecha
                nodo.izq = this.rotacionIzq(nodo.izq);
                nodo = this.rotacionDer(nodo);
            }
        }

        if((this.getAltura(nodo.izq)-this.getAltura(nodo.der))<-1){
            if(dato.carnet>nodo.der.dato.carnet){
                //rotacion izquierda
                nodo = this.rotacionIzq(nodo);
            }else{
                //doble izquierda
                nodo.der = this.rotacionDer(nodo.der);
                nodo = this.rotacionIzq(nodo);
            }
        }


        return nodo;
    }


    rotacionDer(n1){
        
        let n2= n1.izq;
        n1.izq = n2.der;
        n2.der = n1;

        n1.altura = this.maxi(n1.izq,n1.der)+1;
        n2.altura = this.maxi(n2.izq,n2.der)+1;
        return n2;
    }

    rotacionIzq(n1){
        let n2 = n1.der;
        n1.der = n2.izq;
        n2.izq = n1;
        
        n1.altura = this.maxi(n1.izq,n1.der)+1;
        n2.altura = this.maxi(n2.izq,n2.der)+1;


        return n2;
    }

    preOrden(nodo){
        let dato ="";
        dato +=`
                <tr>
                    <td> ${nodo.dato.carnet} </td>
                    <td> ${nodo.dato.nombre} </td>
                    <td> ${nodo.dato.password} </td>
                </tr>
                `;
        if (nodo.izq!== null){
            dato+= this.preOrden(nodo.izq);
        }
        if(nodo.der!== null){
            dato+= this.preOrden(nodo.der);
        }
        return dato;
    }

     async inOrden(nodo){
        let dato ="";
        if (nodo.izq!== null){
            dato+= await this.inOrden(nodo.izq);
        }
        dato +=`
                <tr>
                    <td> ${nodo.dato.carnet} </td>
                    <td> ${nodo.dato.nombre} </td>
                    <td> ${ await this.encriptarSHA256(nodo.dato.password)} </td>
                </tr>
                `;
        
        if(nodo.der!== null){
            dato+= await this.inOrden(nodo.der);
        }
        return dato;
    }

    inOrdenTablaHash(nodo,tabla){
        //debugger;
       
        if (nodo.izq!== null){
            this.inOrdenTablaHash(nodo.izq,tabla);
        }
       
        tabla.insertar(nodo.dato);
        if(nodo.der!== null){
            this.inOrdenTablaHash(nodo.der,tabla);
        }
        
    }

    async encriptarSHA256(block){
    
        // OBTENER LOS BYTES DEL STRING 
        let bytes = new TextEncoder().encode(block);
        // OBTENER BYTES DEL HASH
        let hashBytes = await window.crypto.subtle.digest("SHA-256", bytes);
        // PASAR EL HASH A STRING 
        let hash = Array.prototype.map.call(new Uint8Array(hashBytes), x => ('00' + x.toString(16)).slice(-2)).join('');
        // RETORNAR EL HASH
        return hash;
    }

    postOrden(nodo){
        let dato ="";
        if (nodo.izq!== null){
            dato+= this.postOrden(nodo.izq);
        }
        if(nodo.der!== null){
            dato+= this.postOrden(nodo.der);
        }
        dato +=`
                <tr>
                    <td> ${nodo.dato.carnet} </td>
                    <td> ${nodo.dato.nombre} </td>
                    <td> ${nodo.dato.password} </td>
                </tr>
                `;
        
        
        return dato;
    }
    
     generarGrafEnl(nodo){
        let enl ="";
        
        if (nodo.izq!==null){
           enl+= this.generarGrafEnl(nodo.izq);
            enl+= `n${nodo.dato.carnet} -> n${nodo.izq.dato.carnet};\n`;
        }

        if(nodo.der!== null){
            enl+= this.generarGrafEnl(nodo.der);
            enl+=`n${nodo.dato.carnet} -> n${nodo.der.dato.carnet};\n`;
        }
        return enl;
    }

    generarGrafNodos(nodo){
        let nod="";

        if(nodo.izq!==null){
            nod+=this.generarGrafNodos(nodo.izq);
        }
        nod+=`n${nodo.dato.carnet}[label=\"${nodo.dato.carnet}\\n${nodo.dato.nombre}\\nAltura=${nodo.altura}\"];\n`;
        if(nodo.der!==null){
            nod+=this.generarGrafNodos(nodo.der);
        }
        return nod;
    }

    reporteGraf(){
        let dot=`digraph L{
node[shape=box]
            
label= "Arbol AVL"
        `;
        let nodos = this.generarGrafNodos(this.raiz);
        let enlaces = this.generarGrafEnl(this.raiz);
        dot+= nodos;
        dot+= enlaces;
        dot+=" }";
        return dot;
    }
 


}

 