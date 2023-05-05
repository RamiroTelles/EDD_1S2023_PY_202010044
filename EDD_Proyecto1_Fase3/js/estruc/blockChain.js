
class nodoB{
    constructor(index, timeStamp,transmitter,receiver,message,prevHash,hash){
        this.index = index;
        this.timeStamp = timeStamp;
        this.transmitter = transmitter;
        this.receiver = receiver;
        this.message = message;
        this.prevHash = prevHash;
        this.hash = hash;

        this.prev=null;
        this.next=null;
    }
}

class blockC{

    constructor(){
        this.raiz = null;
        this.cola =null;
        this.cant=0;
    }

    insertar(timeStamp,transmitter,receiver,message){
        const nuevo = new nodoB(this.cant,timeStamp,transmitter,receiver,message,this.obtenerUltimoHash(),this.getSha256(`${this.cant}${timeStamp}${transmitter}${receiver}${message}`));
        if(this.cant==0){
            
            this.raiz = nuevo;
            this.cola = nuevo;
        }else{
            this.cola.next = nuevo;
            nuevo.prev = this.cola;
            this.cola = nuevo;

        }
        this.cant++;
    }

    obtener(pos){
        if(pos<= this.cant && pos >=0){
            let temp = this.raiz;
            for(let i=0;i<pos;i++){
                temp = temp.next;
            }
            return temp;
        }else{
            console.log("Posición inválida");
        }
    }

    obtenerUltimoHash(){
      if(this.cant==0){
        return "0000";
      }else{
        return this.cola.hash;
      }
    }

    async getSha256(block){
    
        // OBTENER LOS BYTES DEL STRING 
        let bytes = new TextEncoder().encode(block);
        // OBTENER BYTES DEL HASH
        let hashBytes = await window.crypto.subtle.digest("SHA-256", bytes);
        // PASAR EL HASH A STRING 
        let hash = Array.prototype.map.call(new Uint8Array(hashBytes), x => ('00' + x.toString(16)).slice(-2)).join('');
        // RETORNAR EL HASH
        return hash;
    }
}