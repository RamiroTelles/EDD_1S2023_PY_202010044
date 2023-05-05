class nodoLista{
    constructor(dato){
        this.dato = dato;
        this.sig = null;

    }
}

class nodoArchivo{
    constructor(propietario,destino,ruta,nombre,permisos,archivo){
        this.propietario=propietario;
        this.destino = destino;
        this.ruta = ruta;
        this.nombre = nombre;
        this.permisos=permisos;
        this.archivo=archivo;

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

    htmlTodos(){
        let datos="";

        for(let i=0;i<this.cant;i++){
            datos+=`
            <tr>
                <td> ${this.obtener(i).dato.propietario} </td>
                <td> ${this.obtener(i).dato.destino} </td>
                <td> ${this.obtener(i).dato.ruta} </td>
                
            `;

            if(this.obtener(i).dato.archivo.type === 'text/plain'){
                let txt = new Blob([this.obtener(i).dato.archivo.content], {type: this.obtener(i).dato.archivo.type});
                const url = URL.createObjectURL(txt);
                datos += `
                        <td>
                                <a href="${url}" download>
                                    ${this.obtener(i).dato.archivo.name}
                                </a>
                        </td>`;
            }else{
                datos += ` <td>
                                <a href="${this.obtener(i).dato.archivo.content}" download>
                                    ${this.obtener(i).dato.archivo.name}
                                </a>
                        </td>`;
            }
            datos+=`
                <td> ${this.obtener(i).dato.permisos} </td>
            </tr>`;
        }
        return datos;
    }

    htmlUsuario(carnet){
        //debugger;
        let cod="";
        for(let i=0;i<this.cant;i++){
            if(this.obtener(i).dato.destino === carnet){
                if(this.obtener(i).dato.archivo.type==="application/pdf"){
                    cod+=`<p>${this.obtener(i).dato.archivo.name}</p>
                    
                    <iframe src="${this.obtener(i).dato.archivo.content}" width="400" height="300">
                    
                  </iframe>
                  `;
                }else if(this.obtener(i).dato.archivo.type==="text/plain"){
                 cod+=`<p>${this.obtener(i).dato.archivo.name}</p>
                 <textarea class="form-control">${this.obtener(i).dato.archivo.content}</textarea>\n`;
                }else{
                    cod+=`<p>${this.obtener(i).dato.archivo.name}</p>
                    <img src="${this.obtener(i).dato.archivo.content}" class="img-thumbnail">\n`;
                }
            }
        }

        return cod;
    }
}
