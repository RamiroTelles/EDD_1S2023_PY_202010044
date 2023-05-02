class hashT{
    constructor(){
        this.table = new Array(7);

        this.capacidad =7;
        this.cantDatos=0;

    }

    insertar(dato){
        let indice = this.calIndice(dato.carnet,0);
        this.table[indice] = dato;
        this.cantDatos++;
        if((this.cantDatos/this.capacidad)>0.75){
            this.aumentarTamano();
        }
    }

    calIndice(carnet,contador){
        //debugger;
        let s_carnet = carnet.toString();
        let sum = 0;
        for (let i=0;i<s_carnet.length;i++){
            sum += s_carnet.charCodeAt(i);
        }

        let indice = sum % this.capacidad;
        indice = indice +(contador*contador);
        
        indice = indice -(this.divisionEntera(indice,this.capacidad)*this.capacidad);

        if(this.table[indice]!=null){
            indice = this.calIndice(carnet,contador+1);
        }

        return indice;
    }

    divisionEntera(num,div){
        let contador =0;

        num = num-div;

        while(num>=0){
            contador++;
            num = num-div;
        }
        
        return contador;
    }

    aumentarTamano(){
        //debugger;
        let nuevaCap = this.capacidad+1;
        while(!this.numeroPrimo(nuevaCap)){
            nuevaCap++;
        }
        this.capacidad = nuevaCap;
        this.cantDatos=0
        const temp = this.table;
        this.table = new Array(nuevaCap);
        temp.forEach(elem =>{
            this.insertar(elem);
        });

    }

    numeroPrimo(num){
        if (num <= 1) {return false}
        if (num === 2) {return true}
        if (num % 2 === 0) {return false}
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
          if (num % i === 0) {return false};
        }
        return true;
    }

    obtenerHTML(){
        let datos="";

        for(let i=0;i< this.table.length;i++){
            if(this.table[i]!= null){
                datos+=`
                        <tr>
                            <td> ${this.table[i].carnet} </td>
                            <td> ${this.table[i].nombre} </td>
                            <td> ${this.table[i].password} </td>
                        </tr>
                        `;
            }
            
        }

        return datos;
    }
}