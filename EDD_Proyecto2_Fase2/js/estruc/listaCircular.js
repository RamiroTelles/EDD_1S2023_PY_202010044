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
}
