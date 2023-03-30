//export{arbolAVL} from "./estruc/avl"


const arbolito = new arbolAVL();

arbolito.raiz= arbolito.insertarR(new est("Rami",5,"123"),arbolito.raiz);
arbolito.raiz=arbolito.insertarR(new est("Rami",2,"123"),arbolito.raiz);
arbolito.raiz=arbolito.insertarR(new est("Rami",8,"123"),arbolito.raiz);

console.log(arbolito)