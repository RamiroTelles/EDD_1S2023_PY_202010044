
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
        let hash = this.getSha256(`${this.cant}${timeStamp}${transmitter}${receiver}${message}`);
        //console.log(JSON.stringify(hash))
        const nuevo = new nodoB(this.cant,timeStamp,transmitter,receiver,message,this.obtenerUltimoHash(),hash);

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
        //console.log(hash);
        return hash;
    }

  
    obtenerChat(transmisor,recibidor){
        let temp = this.raiz;
        let msg = " <ul class=\"list-group\">\n";
        while(temp!==null){
            if(temp.transmitter==transmisor && temp.receiver==recibidor){
                msg+=`<li class="list-group-item">${temp.message}</li>\n`;
            }
            temp = temp.next;
        }
        msg+=" </ul>";
        return msg;
    }

    async graficarBlock(){
        let nodos="";
        let enl ="";

        for(let i=0;i<this.cant;i++){
            let temp = this.obtener(i);
            nodos+=`n${i}[label=\"TimeStamp: ${temp.timeStamp}\n
             emisor: ${temp.transmitter}\n\n 
             receptor: ${temp.receiver}\n\n 
             previousHash: ${await temp.prevHash}\"];\n\n`;
            console.log(temp.prevHash);
        }

        let j=0;
        while(j<this.cant-1){
            enl+=`n${j} -> n${j+1};\n`;
            j++;
        }

        let dot=`digraph cuadro{
            node[shape=box];\n`;

        dot += nodos;
        dot += enl;
       
        dot+="\n}";
        return dot;
    }

    reCalcularHashes(){
        let temp = this.raiz;
        if(temp.next!=null){
            temp.hash = this.getSha256(`${this.cant}${temp.timeStamp}${temp.transmitter}${temp.receiver}${temp.message}`);
            temp = temp.next;
            
            while(temp!=null){
                temp.prevHash= temp.prev.hash;
                temp.hash = this.getSha256(`${this.cant}${temp.timeStamp}${temp.transmitter}${temp.receiver}${temp.message}`);
                temp = temp.next;
            }
        }
    }

    async obtenerTxt(pos){
        let temp = this.obtener(pos);
        let cod=`
        Index=${pos}
        TimeStamp=${temp.timeStamp}
        emisor: ${temp.transmitter}
        receiver: ${temp.receiver}
        Mensaje: ${temp.message}
        PreviusHash: ${await temp.prevHash}
        Hash: ${ await temp.hash}`;

        return cod;

    }
}