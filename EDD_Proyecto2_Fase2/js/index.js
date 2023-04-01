//export{arbolAVL} from "./estruc/avl"

function colocarGrafica(){
    let dot = arbolito.reporteGraf();
    let url = 'https://quickchart.io/graphviz?graph=';
    let img = document.getElementById("reporteAVL");
    img.setAttribute("src",url+dot)
    //$("#reporteAVL").attr("src",url + dot);
}

function cargarEstudiantes(e){
    e.preventDefault();
    let indice=document.getElementById("recorrido").selectedIndex;
    
    //console.log(indice);
    if(arbolito.raiz!== null){
        switch(indice){
            case 0:
                mostrarInOrder();
                break;
            case 1:
                mostrarPreOrder();
                break;
            case 2:
                mostrarPostOrder();
                break;
            default:
                document.getElementById("cuerpoTablaEstu").innerHTML = "";
                break;

        }
    }else{
        alert("Arbol vacio")
    }
    
}

function mostrarInOrder(){
    document.getElementById("cuerpoTablaEstu").innerHTML = arbolito.inOrden(arbolito.raiz);
}

function mostrarPreOrder(){
    document.getElementById("cuerpoTablaEstu").innerHTML = arbolito.preOrden(arbolito.raiz);
}

function mostrarPostOrder(){
    document.getElementById("cuerpoTablaEstu").innerHTML = arbolito.postOrden(arbolito.raiz);
}

function login(e){
    e.preventDefault();
    let usuario = document.getElementById("usuario").value;
    let contra = document.getElementById("contra").value;
    //console.log(usuario);
    //console.log(contra);
    if (usuario==="admin" && contra==="admin"){
        //console.log("mandarlo a admin");
        window.location="admin.html";
    }else{
        let alumno = arbolito.buscar(parseInt(usuario));
        console.log(alumno);
        if(alumno===null || alumno.password!==contra){
            alert("Usuario o contrasena invalida");
        }else{
            //console.log(`Bienvenido ${alumno.nombre}, con carnet: ${alumno.carnet}`);
            window.location="usuario.html";
        }
       
    }

}


 const arbolito = new arbolAVL();

arbolito.raiz= arbolito.insertarR(new est("z",15,"123"),arbolito.raiz);
//arbolito.raiz=arbolito.insertarR(new est("t1",10,"123"),arbolito.raiz);
//arbolito.raiz=arbolito.insertarR(new est("y",30,"123"),arbolito.raiz);
//arbolito.raiz=arbolito.insertarR(new est("x",25,"123"),arbolito.raiz);
//arbolito.raiz=arbolito.insertarR(new est("t4",35,"123"),arbolito.raiz);


//arbolito.raiz=arbolito.insertarR(new est("t3",27,"123"),arbolito.raiz);


/* if (arbolito.raiz!==null){
    colocarGrafica(arbolito);
}
  */


/* const list = new listaCicular();



list.insertar(1);


list.insertar(2);
list.insertar(3);
list.insertar(4);
list.insertar(5);

list.remplazar(2,"vagina")

console.log(list) */




