package main

import (
	"Proyecto1/EDD_Proyecto1_Fase1/tda"
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"time"
)

//import ("fmt"
//		"./tda")

// import ("fmt")
var l1 tda.ListaDoble = tda.ListaDoble{Cabeza: nil, Cant: 0, Vacio: true}

var cola tda.Queue = tda.Queue{Cabeza: nil, Vacio: true}

var pilaAdmin tda.Pila = tda.Pila{Tope: nil, Vacio: true}

func main() {
	//l1 := tda.ListaDoble{Cabeza: nil, Vacio: true, Cant: 0}
	//l1.Vacio = false
	/* var pila1 tda.Pila = tda.Pila{Vacio: true, Tope: nil}
	l1.InsertarO("Ramiro", "Agustín", 5, "5", pila1)
	l1.InsertarO("Orinar", "comodin", 4, "4", pila1)
	l1.InsertarO("juan", "guarnizo", 2, "2", pila1)
	l1.InsertarO("benito", "camelo", 3, "3", pila1)
	l1.InsertarO("sova", "gina", 1, "1", pila1) */
	//y := l1.BusquedaBinaria(5)

	//fmt.Printf("%d", y)
	//l1.Imprimir()

	/* 	fmt.Println("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_")
	   	y := l1.Obtener(0)
	   	fmt.Printf("Nombre: %s %s, carnet: %d, Contra: %s", y.GetNombre(), y.GetApellido(), y.GetCarnet(), y.GetContra())
	   	fmt.Println("")
	   	fmt.Println("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_")
	   	y = l1.Obtener(1)
	   	fmt.Printf("Nombre: %s %s, carnet: %d, Contra: %s", y.GetNombre(), y.GetApellido(), y.GetCarnet(), y.GetContra())
	   	fmt.Println("")
	   	fmt.Println("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_")
	   	y = l1.Obtener(2)
	   	fmt.Printf("Nombre: %s %s, carnet: %d, Contra: %s", y.GetNombre(), y.GetApellido(), y.GetCarnet(), y.GetContra())
	   	fmt.Println("")
	   	fmt.Println("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_")
	   	y = l1.Obtener(3)
	   	fmt.Printf("Nombre: %s %s, carnet: %d, Contra: %s", y.GetNombre(), y.GetApellido(), y.GetCarnet(), y.GetContra())
	   	fmt.Println("")
	   	fmt.Println("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_")
	   	y = l1.Obtener(4)
	   	fmt.Printf("Nombre: %s %s, carnet: %d, Contra: %s", y.GetNombre(), y.GetApellido(), y.GetCarnet(), y.GetContra())
	   	fmt.Println("")
	   	fmt.Println("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_")
	   	y = l1.Obtener(-1)

	   	if y == nil {
	   		fmt.Println("No se encontro")
	   	}

	   	y = l1.Obtener(9)

	   	if y == nil {
	   		fmt.Println("No se encontro")
	   	}
	*/

	//FUNCION MENÚ
	for {
		fmt.Println("---------Bienvenido a EDD GO Drive---------")
		fmt.Println("ELige una opción:")
		fmt.Println("1.Iniciar sesión")
		fmt.Println("2.Salir")
		fmt.Println("-------------------------------------------")
		reader := bufio.NewReader(os.Stdin)
		entrada, _ := reader.ReadString('\n')
		opcion := strings.TrimRight(entrada, "\r\n")

		if opcion == "1" {
			fmt.Print("Ingrese su Carnet:")
			entrada, _ = reader.ReadString('\n')
			usuario := strings.TrimRight(entrada, "\r\n")

			fmt.Print("Ingrese su Contraseña:")
			entrada, _ = reader.ReadString('\n')
			contra := strings.TrimRight(entrada, "\r\n")

			if usuario != "admin" && contra != "admin" {
				carnet, err := strconv.Atoi(usuario)

				if err != nil {
					fmt.Println("Carnet no válido")
					panic(err)
				}
				//obtengo la posición del nodo que busco
				posNodo := l1.BusquedaBinaria(carnet)
				//obtengo el nodo
				nodoUsuario := l1.Obtener(posNodo)
				if nodoUsuario == nil {
					fmt.Println("Usuario o contraseña incorrecta")
					continue
				}
				if contra == nodoUsuario.GetContra() {
					fmt.Println("Se ha iniciado sesión")
					tiempo := time.Now()
					fecha := fmt.Sprintf("%02d/%02d/%d - %02d:%02d:%02d", tiempo.Day(), tiempo.Month(), tiempo.Year(), tiempo.Hour(), tiempo.Minute(), tiempo.Second())
					nodoUsuario.PushPila("Se ha iniciado Sesión", fecha)
					//fmt.Println(nodoUsuario.GetDatosPila())
					continue
					//guardar a la pila esta actividad
				}
				fmt.Println("Usuario o contraseña incorrecta")
				continue

			}
			tiempo := time.Now()
			fecha := fmt.Sprintf("%02d/%02d/%d - %02d:%02d:%02d", tiempo.Day(), tiempo.Month(), tiempo.Year(), tiempo.Hour(), tiempo.Minute(), tiempo.Second())
			pilaAdmin.Push("Iniciar Sesión", fecha)
			//fmt.Println(pilaAdmin.ObtenerDatos())
			menuAdmin()
			continue

		} else if opcion == "2" {
			break
		} else {
			fmt.Println("Opción no válida")
		}
		recover()
	}

}

func menuAdmin() {
	for {
		fmt.Println("---------Menú admin EDD GO Drive---------")
		fmt.Println("ELige una opción:")
		fmt.Println("1.Ver estudiantes Pendientes")
		fmt.Println("2.Ver estudiantes del sistema")
		fmt.Println("3.Registrar nuevo estudiante")
		fmt.Println("4.Carga Masiva de estudiantes")
		fmt.Println("5.Area de Reportes")
		fmt.Println("6.Salir")
		fmt.Println("-------------------------------------------")
		reader := bufio.NewReader(os.Stdin)
		entrada, _ := reader.ReadString('\n')
		opcion := strings.TrimRight(entrada, "\r\n")

		if opcion == "1" {

			menuCola()

			//Cola de pendientes
		} else if opcion == "2" {
			fmt.Println("-------------------------------------------")
			l1.Imprimir()
			fmt.Println("-------------------------------------------")
			fmt.Scanf("\n")
			tiempo := time.Now()
			fecha := fmt.Sprintf("%02d/%02d/%d - %02d:%02d:%02d", tiempo.Day(), tiempo.Month(), tiempo.Year(), tiempo.Hour(), tiempo.Minute(), tiempo.Second())
			pilaAdmin.Push("Mostrar Estudiantes en el sistema", fecha)
		} else if opcion == "3" {
			fmt.Println("Registrar nuevo estudiante")
			//pedir datos y meter a cola
			fmt.Print("Ingrese el Nombre:")
			entrada, _ = reader.ReadString('\n')
			nombre := strings.TrimRight(entrada, "\r\n")

			fmt.Print("Ingrese el Apellido:")
			entrada, _ = reader.ReadString('\n')
			apellido := strings.TrimRight(entrada, "\r\n")

			fmt.Print("Ingrese el Carnet:")
			entrada, _ = reader.ReadString('\n')
			carnetString := strings.TrimRight(entrada, "\r\n")

			fmt.Print("Ingrese la Contraseña:")
			entrada, _ = reader.ReadString('\n')
			contra := strings.TrimRight(entrada, "\r\n")

			carnetInt, err := strconv.Atoi(carnetString)

			if err != nil {
				fmt.Println("Carnet no válido")
				panic(err)
			}

			cola.Encolar(nombre, apellido, carnetInt, contra)
			tiempo := time.Now()
			fecha := fmt.Sprintf("%02d/%02d/%d - %02d:%02d:%02d", tiempo.Day(), tiempo.Month(), tiempo.Year(), tiempo.Hour(), tiempo.Minute(), tiempo.Second())
			pilaAdmin.Push("Meter Estudiante a Cola de aceptacion", fecha)
			fmt.Println("Ingresado con Éxito")

		} else if opcion == "4" {
			fmt.Println("******************************")
			fmt.Println("Ingrese la ruta absoluta del archivo:")
			entrada, _ = reader.ReadString('\n')
			ruta := strings.TrimRight(entrada, "\r\n")
			leerCSV(ruta)
			tiempo := time.Now()
			fecha := fmt.Sprintf("%02d/%02d/%d - %02d:%02d:%02d", tiempo.Day(), tiempo.Month(), tiempo.Year(), tiempo.Hour(), tiempo.Minute(), tiempo.Second())
			pilaAdmin.Push("Carga Masiva de Estudiantes", fecha)

		} else if opcion == "5" {
			menuReportes()
		} else if opcion == "6" {
			break
		} else {
			fmt.Println("Opción inválida")
		}
		recover()
	}
}

func menuCola() {
	for {

		fmt.Println("**************Cola de pendientes**************")
		fmt.Printf("-----------------Pendientes:%d----------------", cola.GetCantidad())
		fmt.Println("")
		if cola.GetCantidad() == 0 {
			fmt.Scanf("\n")
			break
		}
		fmt.Println("-----------------Estudiante acutal----------------")
		y := cola.GetCabeza()

		fmt.Printf("Nombre: %s %s \n carnet: %d\n Contra: %s\n", y.GetNombre(), y.GetApellido(), y.GetCarnet(), y.GetContra())
		fmt.Println("--------------------------------------------------")
		fmt.Println("1.Aceptar")
		fmt.Println("2.Rechazar")
		fmt.Println("3.Salir")
		fmt.Println("--------------------------------------------------")
		reader := bufio.NewReader(os.Stdin)
		entrada, _ := reader.ReadString('\n')
		opcion := strings.TrimRight(entrada, "\r\n")

		if opcion == "1" {

			nodo := cola.Desencolar()
			tiempo := time.Now()
			fecha := fmt.Sprintf("%02d/%02d/%d - %02d:%02d:%02d", tiempo.Day(), tiempo.Month(), tiempo.Year(), tiempo.Hour(), tiempo.Minute(), tiempo.Second())
			pilaAdmin.Push("Aceptar un Estudiante", fecha)
			if nodo == nil {
				fmt.Println("No hay alumnos pendientes de aceptar")
				continue
			}
			var p1 tda.Pila = tda.Pila{Vacio: true, Tope: nil}
			l1.InsertarO(nodo.GetNombre(), nodo.GetApellido(), nodo.GetCarnet(), nodo.GetContra(), p1)
			fmt.Println("Usuario Aceptado Correctamente")
			continue
		} else if opcion == "2" {
			cola.Desencolar()
			fmt.Println("Usuario Rechazado")
			tiempo := time.Now()
			fecha := fmt.Sprintf("%02d/%02d/%d - %02d:%02d:%02d", tiempo.Day(), tiempo.Month(), tiempo.Year(), tiempo.Hour(), tiempo.Minute(), tiempo.Second())
			pilaAdmin.Push("Rechazar un Estudiante", fecha)
			continue
		} else if opcion == "3" {
			break
		} else {
			fmt.Println("Opción inválida")
			continue
		}

	}

}

func leerCSV(ruta string) {
	fmt.Println(ruta)
	archivo, err := os.Open(ruta)
	if err != nil {
		panic(err)
	}
	defer archivo.Close()

	//fmt.Println(string(archivo))
	escaner := bufio.NewScanner(archivo)
	i := 0
	for escaner.Scan() {
		if i == 0 {
			i++
			continue
		}
		fila := escaner.Text()
		columnas := strings.Split(fila, ",")

		carnet, err2 := strconv.Atoi(columnas[0])
		nombreCom := strings.Split(columnas[1], " ")
		contra := columnas[2]
		if err2 != nil {
			panic(err2)
		}
		cola.Encolar(nombreCom[0], nombreCom[1], carnet, contra)
	}

}

func menuReportes() {
	for {
		fmt.Println("---------Menú admin Reportes---------")
		fmt.Println("ELige una opción:")
		fmt.Println("1.Reporte Lista Doblemente enlazada")
		fmt.Println("2.Reporte Cola")
		fmt.Println("3.Reporte Pila admin")
		fmt.Println("4.Reporte JSON")
		fmt.Println("5.Salir")
		fmt.Println("-------------------------------------------")
		reader := bufio.NewReader(os.Stdin)
		entrada, _ := reader.ReadString('\n')
		opcion := strings.TrimRight(entrada, "\r\n")

		if opcion == "1" {
			//LIsta doblemente enlazada
			flag := reporteListaDoble()
			if flag {
				fmt.Println("No se logró crear el archivo")
				continue
			}
			fmt.Println("Se ha logrado crear el archivo con éxito")
		} else if opcion == "2" {
			//cola
			flag := reporteCola()
			if flag {
				fmt.Println("No se logró crear el archivo")
				continue
			}
			fmt.Println("Se ha logrado crear el archivo con éxito")
		} else if opcion == "3" {
			//Pila admin
			flag := reportePilaAdmin()
			if flag {
				fmt.Println("No se logró crear el archivo")
				continue
			}
			fmt.Println("Se ha logrado crear el archivo con éxito")
		} else if opcion == "4" {
			//JSON
			flag := reporteJson()
			if flag {
				fmt.Println("No se logró crear el archivo")
				continue
			}
			fmt.Println("Se ha logrado crear el archivo con éxito")

		} else if opcion == "5" {
			break
		} else {
			fmt.Println("Opción Inválida")
		}
	}
}

func reportePilaAdmin() bool {
	if pilaAdmin.Vacio {
		fmt.Println("Pila Vacia")
		return true
	} else {
		//hacer reportes
		txt := "digraph l{\n node[shape=box fillcolor=\"#FFFFFF\" style=filled]\n label =\"Pila Admin\" \n bgcolor= \"#398D9C\" \n"

		bitacora := pilaAdmin.ObtenerDatos()

		for i := 0; i < len(bitacora); i++ {
			txt += "B" + strconv.Itoa(i) + "[label=\"" + bitacora[i] + "\", group=1];\n"
		}
		txt += "\n"

		for i := 0; i < len(bitacora)-1; i++ {
			txt += "B" + strconv.Itoa(i) + "-> B" + strconv.Itoa(i+1) + "\n"
		}
		txt += "}"

		flag := crearArchivo("admin.dot")

		if flag {
			fmt.Println("No se pudo Crear el archivo")
			return true
		}

		flag = escribirArchivo("admin.dot", txt)

		if flag {
			fmt.Println("No se pudo Crear el archivo")
			return true
		}

		//_, err := exec.Command("dot -Tpng admin.dot -o admin.png").Output()
		flag = generarPng("admin.dot", "admin")

		/* if err != nil {
			fmt.Println(err)
		} */
		return flag

	}

}

func crearArchivo(ruta string) bool {
	var _, err = os.Stat(ruta)

	if os.IsNotExist(err) {
		var file, err = os.Create(ruta)
		if err != nil {

			return true
		}
		defer file.Close()
	} else {
		err := os.Remove(ruta)
		if err == nil {
			var file, err = os.Create(ruta)
			if err != nil {
				fmt.Println(err.Error())
			}
			defer file.Close()
		}
	}
	return false
}

func escribirArchivo(ruta string, txt string) bool {
	var file, err = os.OpenFile(ruta, os.O_RDWR, 0644)
	if err != nil {
		return true
	}
	defer file.Close()

	_, err = file.WriteString(txt)

	if err != nil {
		return true
	}
	err = file.Sync()

	return err != nil
}

func generarPng(ruta string, nombre string) bool {
	path2, _ := exec.LookPath("dot")
	_, err := exec.Command(path2, "dot", "-Tpng", ruta, "-o", nombre+".png").Output()

	if err != nil {
		fmt.Println("Por alguna razón funciona ._.")
		//fmt.Println(err)
		//return true
	}
	//mode := int(0777)
	//os.WriteFile(strings.Replace(ruta, ".dot", ".png", -1), cmd, os.FileMode(mode))

	return false

}

func reporteCola() bool {
	if cola.Vacio {
		fmt.Println("Cola Vacia")
		return true
	} else {
		//hacer reportes
		txt := "digraph l{\n node[shape=box fillcolor=\"#FFFFFF\" style=filled]\n label =\"Cola\" \n bgcolor= \"#398D9C\" \n"

		bitacora := cola.ObtenerDatos()

		for i := 0; i < len(bitacora); i++ {
			txt += "B" + strconv.Itoa(i) + "[label=\"" + bitacora[i] + "\", group=" + strconv.Itoa(i) + "];\n"
		}
		txt += "\n"

		for i := 0; i < len(bitacora)-1; i++ {
			txt += "B" + strconv.Itoa(i) + "-> B" + strconv.Itoa(i+1) + "\n"
		}

		txt += "\n"
		txt += "{rank=same;"
		for i := 0; i < len(bitacora); i++ {
			txt += "B" + strconv.Itoa(i) + ";"
		}
		txt += "};\n"

		txt += "}"

		flag := crearArchivo("cola.dot")

		if flag {
			fmt.Println("No se pudo Crear el archivo")
			return true
		}

		flag = escribirArchivo("cola.dot", txt)

		if flag {
			fmt.Println("No se pudo Crear el archivo")
			return true
		}

		//_, err := exec.Command("dot -Tpng admin.dot -o admin.png").Output()
		flag = generarPng("cola.dot", "cola")

		/* if err != nil {
			fmt.Println(err)
		} */
		return flag

	}
}

func reporteListaDoble() bool {
	if l1.Vacio {
		fmt.Println("Lista Vacia")
		return true
	} else {
		//hacer reportes
		txt := "digraph l{\n node[shape=box fillcolor=\"#FFFFFF\" style=filled]\n label =\"Lista Doble\" \n bgcolor= \"#398D9C\" \n"

		for i := 0; i < l1.Cant; i++ {
			temp := l1.Obtener(i)
			dato := strconv.Itoa(temp.GetCarnet()) + "\n" + temp.GetNombre() + " " + temp.GetApellido()
			txt += "B" + strconv.Itoa(i) + "[label=\"" + dato + "\", group=" + strconv.Itoa(i) + "];\n"

			txt += "\n\n"
			if temp.IsPilaVacia() {
				continue
			}
			bitacora := temp.GetDatosPila()
			for j := 0; j < len(bitacora); j++ {
				txt += "P" + strconv.Itoa(i) + strconv.Itoa(j) + "[label=\"" + bitacora[j] + "\", group=" + strconv.Itoa(i) + "];\n"
			}

		}
		txt += "\n\n"

		for i := 0; i < l1.Cant-1; i++ {
			txt += "B" + strconv.Itoa(i) + "-> B" + strconv.Itoa(i+1) + "\n"
		}

		txt += "\n\n"

		for i := l1.Cant - 1; i > 0; i-- {
			txt += "B" + strconv.Itoa(i) + "-> B" + strconv.Itoa(i-1) + "\n"
		}

		txt += "\n\n"

		for i := 0; i < l1.Cant; i++ {
			temp := l1.Obtener(i)

			if temp.IsPilaVacia() {
				continue
			}
			bitacora := temp.GetDatosPila()
			txt += "B" + strconv.Itoa(i) + "-> P" + strconv.Itoa(i) + "0\n"
			for j := 0; j < len(bitacora)-1; j++ {
				txt += "P" + strconv.Itoa(i) + strconv.Itoa(j) + " -> P" + strconv.Itoa(i) + strconv.Itoa(j+1) + "\n"
			}

		}

		txt += "\n\n"

		txt += "\n"
		txt += "{rank=same;"
		for i := 0; i < l1.Cant; i++ {
			txt += "B" + strconv.Itoa(i) + ";"
		}
		txt += "};\n"

		txt += "}"

		flag := crearArchivo("lista.dot")

		if flag {
			fmt.Println("No se pudo Crear el archivo")
			return true
		}

		flag = escribirArchivo("lista.dot", txt)

		if flag {
			fmt.Println("No se pudo Crear el archivo")
			return true
		}

		//_, err := exec.Command("dot -Tpng admin.dot -o admin.png").Output()
		flag = generarPng("lista.dot", "lista")

		/* if err != nil {
			fmt.Println(err)
		} */
		return flag

	}
}

func reporteJson() bool {
	if l1.Vacio {
		fmt.Println("Lista Vacia")
		return false
	} else {
		txt := "{\n\t \"alumnos\": [\n"
		for i := 0; i < l1.Cant; i++ {

			temp := l1.Obtener(i)
			txt += "\t\t{\n\t\t\t\"nombre\": \"" + temp.GetNombre() + " " + temp.GetApellido() + "\",\n"
			txt += "\t\t\t\"carnet\": " + strconv.Itoa(temp.GetCarnet()) + ",\n"
			txt += "\t\t\t\"password\": \"" + temp.GetContra() + "\",\n"
			txt += "\t\t\t\"Carpeta_Raiz\": \"/\""
			txt += "\n\t\t},\n"

		}
		txtJson := txt[:len(txt)-2]
		txtJson += "\n\t]\n}"

		flag := crearArchivo("reporte.json")

		if flag {
			fmt.Println("No se pudo Crear el archivo")
			return true
		}

		flag = escribirArchivo("reporte.json", txtJson)

		if flag {
			fmt.Println("No se pudo Crear el archivo")
			return true
		}
	}
	return false
}
