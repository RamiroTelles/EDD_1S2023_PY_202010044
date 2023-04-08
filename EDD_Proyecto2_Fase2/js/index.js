//export{arbolAVL} from "./estruc/avl"

function regresar(){
    window.location="index.html"
    
}

async function extraerMatriz(){
    let dir = document.getElementById("directorio").value;
    let carnet = parseInt(JSON.parse(localStorage.getItem("CurrentStudent")));
    let dot = await arbolEne.obtenerDotMatriz(dir,carnet);
    let url = 'https://quickchart.io/graphviz?graph=';
    let img = document.getElementById("reporteMatriz");
    img.setAttribute("src",url+dot);

}

function crearCarpeta(e){
    e.preventDefault();
    let dir = document.getElementById("directorio").value;
    let nombre = document.getElementById("nombreCarpeta").value;
    
    let bool = arbolEne.agregarCarpeta(nombre,dir);
    console.log(arbolEne);
    actualizarArbol(); 
    let hoy = new Date();
    let ahora = hoy.toLocaleString()
    if(bool){
        agregarLog(`Se Creó carpeta ${nombre}`,`\nFecha: ${ahora}`);
    }
    
}

function eliminarCarp(e){
    e.preventDefault();
    let dir = document.getElementById("directorio").value;
    let nombre = document.getElementById("eliminarCarpeta").value;
    
    let bool = arbolEne.eliminarCarpeta(nombre,dir);
    console.log(arbolEne);
    actualizarArbol(); 
    let hoy = new Date();
    let ahora = hoy.toLocaleString()
    if(bool){
        agregarLog(`Se eliminó carpeta ${nombre}`,`\nFecha: ${ahora}`);
    }
}

function agregarLog(accion,hora){
    let dato = `Accion: ${accion}\n ${hora}`;
    list.insertar(dato);
}



function mostrarDir(e){
    e.preventDefault();
    let dir = document.getElementById("directorio").value;

    codigo = arbolEne.crearHTML(dir);
    let contenedor = document.getElementById("MostrarDirectorio");
    contenedor.innerHTML = codigo;
}

async function actualizarArbol(){
    let usuario = parseInt(JSON.parse(localStorage.getItem("CurrentStudent")));
    let alumno = await arbolito.buscar(usuario);
    alumno.arbolEnario.cant = arbolEne.cant;
}



async function colocarGraficaArbolN(){
    console.log(arbolEne);
    dot = await arbolEne.graficar();
    let url = 'https://quickchart.io/graphviz?graph=';
    let img = document.getElementById("reporteArbolN");
    img.setAttribute("src",url+dot);
}

async function colocarGraficaLista(){
    if(list.cant>0){
        dot = await list.graficarLista();
        let url = 'https://quickchart.io/graphviz?graph=';
        let img = document.getElementById("reporteLog");
        img.setAttribute("src",url+dot);
    }else{
        alert("Lista Vacia");
    }

    
}

async function colocarGraficaMatriz(laMatriz){
    dot = await laMatriz.graficarMatriz();
    let url = 'https://quickchart.io/graphviz?graph=';
    let img = document.getElementById("reporteMatriz");
    img.setAttribute("src",url+dot);
    
}

async function cargaMasiva(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    
    try{
        let fileR = new FileReader();
        fileR.readAsText(form.archivo);
        fileR.onload = ()  => {
            
            //console.log(JSON.parse(fileR.result).alumnos);
            JSON.parse(fileR.result).alumnos.forEach(element => {
                //console.log(element)
                debugger;
                arbolito.raiz= arbolito.insertarR(new estudiante(element.nombre,element.carnet,element.password),arbolito.raiz);
    
            });
        };
        alert("Carga Masiva Exitosa")
        /* console.log(arbolito);
        console.log(JSON.stringify(arbolito))
        console.log(JSON.stringify(arbolito.raiz))
        localStorage.setItem("arbolAVL",JSON.stringify(arbolito)); */
        
    }catch(error){
        console.log(error);
        alert("error")

    } 
    
}

function cargarLocalStorage(){
    localStorage.setItem("arbolAVL",JSON.stringify(arbolito));
}

function colocarGrafica(){
    if(arbolito.raiz===null){
        alert("Arbol Vacio")
    }else{
        let dot = arbolito.reporteGraf();
        let url = 'https://quickchart.io/graphviz?graph=';
        let img = document.getElementById("reporteAVL");
        img.setAttribute("src",url+dot)

    }
    
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
            localStorage.setItem("CurrentStudent",JSON.stringify(usuario));
            window.location="usuario.html";
        }
       
    }

}


async function inicioUsuario(){
    
    let usuario = parseInt(JSON.parse(localStorage.getItem("CurrentStudent")));
    let alumno = await arbolito.buscar(usuario);
    
    arbolEne.raiz = alumno.arbolEnario.raiz;
    arbolEne.cant = alumno.arbolEnario.cant;

    list.cabecera = alumno.bitacora.cabecera;
    list.cant = alumno.bitacora.cant;
    //console.log(arbolEne);
    //console.log(list);
} 



const arbolito = new arbolAVL();

let arbolEne = new arbolN();
let list= new listaCicular();
let datos = localStorage.getItem("arbolAVL");
//console.log(JSON.parse(datos));

if(datos!=null){
    arbolito.raiz = JSON.parse(datos).raiz;
   // console.log(arbolito);
}
//let a = new arbolN();
//console.log(a);
/* let usuario = parseInt(JSON.parse(localStorage.getItem("CurrentStudent")));
if(usuario!=null){

}
let eldatopto= arbolito.buscar(usuario);
console.log(eldatopto); */

//console.log(arbolito.raiz.dato.bitacora);

//const matriz = new matrisDispersa(202010044);



/* const arbolEne = new arbolN();

arbolEne.agregarCarpeta("Kanata","/");
arbolEne.agregarCarpeta("Poste","/");
arbolEne.agregarCarpeta("Carretera","/");
arbolEne.agregarCarpeta("Kanata","/");


arbolEne.agregarCarpeta("Amane","/Kanata");
arbolEne.agregarCarpeta("Asfalto","/Carretera");
arbolEne.agregarCarpeta("Pavimento","/Carretera");
arbolEne.agregarCarpeta("Edor","/Carretera");
arbolEne.agregarCarpeta("Meringitis","/Carretera/Edor");
arbolEne.agregarCarpeta("Otro","/Carretera/Edor");

console.log(arbolEne);
 */
//console.log(matriz);
//matriz.insertarArchivo("papas.txt");
//matriz.insertarArchivo("pompas.txt");
//matriz.insertarArchivo("varitas.txt");
//matriz.insertarPermisos(19,"papas.txt","r,w");
//matriz.insertarPermisos(27,"pompas.txt","r,w");
//matriz.insertarPermisos(19,"pompas.txt","r,w");
//matriz.insertarPermisos(27,"papas.txt","r,w");
//matriz.insertarPermisos(27,"papas.txt","r");

//const list = new listaCicular();

//list.insertar(1);


//list.insertar(2);
//list.insertar(3);
//list.insertar(4);
//list.insertar(5);

//arbolito.raiz= arbolito.insertarR(new est("z",15,"123"),arbolito.raiz);
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




