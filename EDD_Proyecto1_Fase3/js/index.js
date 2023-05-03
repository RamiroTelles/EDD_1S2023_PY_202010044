//export{arbolAVL} from "./estruc/avl"

function regresar(){
    window.location="index.html"
    
}

function darPermisos(e){
    e.preventDefault();
    //console.log("dar Permisos");
    let nombre = document.getElementById("nombreArchivoPer").value;
    let dir = document.getElementById("directorio").value;
    let carnet = document.getElementById("carnet").value;
    let permisos = document.getElementById("Tpermisos").value;
    let carnetUsuario = parseInt(JSON.parse(localStorage.getItem("CurrentStudent")));
    arbolEne.insertarPer(dir,carnet,permisos,nombre,carnetUsuario);
    

}

function eliminarArchivo(e){
    e.preventDefault();
    //console.log("eliminar archivo");
    let nombre = document.getElementById("eliminarArchivos").value;
    let dir = document.getElementById("directorio").value;
    let carnet = parseInt(JSON.parse(localStorage.getItem("CurrentStudent")));
    let bool = arbolEne.eliminarArchivo(dir,nombre,carnet);

    let hoy = new Date();
    let ahora = hoy.toLocaleString()
    
    if(bool){
        agregarLog(`Se eliminó el archivo ${nombre}`,`\nFecha: ${ahora}`);
    }
    this.actualizarDir();
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const subirArchivo =  async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    //console.log(form.file);
    let dir = document.getElementById("directorio").value;
    let carnet = parseInt(JSON.parse(localStorage.getItem("CurrentStudent")));
    
    if(form.file.type === 'text/plain'){
        try{
            let fr = new FileReader();
            fr.readAsText(form.file);
            fr.onload = () => { 
                
                arbolEne.agregarArchivo(dir,{
                    name: form.fileName,
                    content: fr.result,
                    type: form.file.type
                            },carnet);
            
            
            
            };
        }catch(err){
            console.log(err);
            alert("Archivo no subido");
           // return;
        }
        
    }else{
        
        let parseBase64 = await toBase64(form.file);
        arbolEne.agregarArchivo(dir,{
            name: form.fileName,
            content: parseBase64,
            type: form.file.type
                    },carnet);
       
       
    }
    alert('Archivo Subido!')
    this.actualizarDir();
    let hoy = new Date();
    let ahora = hoy.toLocaleString()
    agregarLog(`Se Subió  el archivo ${form.fileName}`,`\nFecha: ${ahora}`);

}

/* const agregarArchivo= async (e)=>{
    e.preventDefault();
    //console.log("agregar Archivo");
    
    const formData =await new FormData(e.target);
    
    const form = await Object.fromEntries(formData);
    console.log(form.archivoEntrada);
    //console.log(form.archivo);
    
     if(form.archivo.type === 'text/plain'){
        let fr = new FileReader();
        fr.readAsText(form.archivo)
    } 
} */

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
    this.actualizarDir();
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
    this.actualizarDir();
}

async function agregarLog(accion,hora){
    let dato = `Accion: ${accion}\n ${hora}`;
    list.insertar(dato);

    let usuario = parseInt(JSON.parse(localStorage.getItem("CurrentStudent")));
    let alumno = await arbolito.buscar(usuario);

    alumno.bitacora.cabecera = list.cabecera;
    alumno.bitacora.cant = list.cant;
}

function actualizarDir(){
    let dir = document.getElementById("directorio").value;
    let carnet = parseInt(JSON.parse(localStorage.getItem("CurrentStudent")));
    codigo = arbolEne.crearHTML(dir,carnet);
    let contenedor = document.getElementById("MostrarDirectorio");
    contenedor.innerHTML = codigo;
}

function mostrarDir(e){
    e.preventDefault();
    let dir = document.getElementById("directorio").value;
    let carnet = parseInt(JSON.parse(localStorage.getItem("CurrentStudent")));
    codigo = arbolEne.crearHTML(dir,carnet);
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
                //debugger;
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
    localStorage.setItem("arbolAVL",JSON.stringify(JSON.decycle(arbolito)));
    //localStorage.setItem("matriz", JSON.stringify(JSON.decycle(matrix)));
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

function cargarTablaH(){
    arbolito.inOrdenTablaHash(arbolito.raiz,tablaHash);
    console.log(tablaHash);
}

function mostrarTablaH(){
    
    document.getElementById("cuerpoTablaHashEstu").innerHTML = tablaHash.obtenerHTML();
}

const arbolito = new arbolAVL();

let arbolEne = new arbolN();
let list= new listaCicular();
let datos = JSON.retrocycle(JSON.parse(localStorage.getItem("arbolAVL")));
//console.log(JSON.parse(datos));

if(datos!=null){
    arbolito.raiz = datos.raiz;
    console.log(arbolito);
}

let tablaHash = new hashT();
console.log(arbolEne);
//tablaHash.insertar(new estudiante("Hugo Rosal",8318054,"12341"));
//tablaHash.insertar(new estudiante("Luis Pirir",9616453,"12342"));
//tablaHash.insertar(new estudiante("Williams Constanza",199919737,"12343"));
//tablaHash.insertar(new estudiante("Jim Melendez",200715321,"12344"));
//tablaHash.insertar(new estudiante("William Ambrocio",201403669,"12345"));
//tablaHash.insertar(new estudiante("Ebany Larios",201403877,"12346"));
//tablaHash.insertar(new estudiante("Helber Urias",201404028,"12347"));
//tablaHash.insertar(new estudiante("Manolo Ramirez",201503933,"12348"));
//tablaHash.insertar(new estudiante("Jose Boguerin",201503933,"12349"));
//tablaHash.insertar(new estudiante("Kevin Secaida",201602404,"123410"));


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
// console.log(matriz);
// matriz.insertarArchivo({
//     name: "papas.txt",
//     content: "nada",
//     type: "text/plain"
// });
// matriz.insertarArchivo({
//     name: "pompas.txt",
//     content: "nada2",
//     type: "text/plain"
// });


 

//matriz.insertarArchivo("varitas.txt");
//matriz.insertarPermisos(19,"papas.txt","r,w");
//matriz.eliminarArchivos("papas.txt");
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




