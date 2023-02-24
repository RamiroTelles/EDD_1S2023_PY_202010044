package main

import (
	"Proyecto1/EDD_Proyecto1_Fase1/tda"
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

//import ("fmt"
//		"./tda")

// import ("fmt")
var l1 tda.ListaDoble

func main() {
	//l1 := tda.ListaDoble{Cabeza: nil, Vacio: true, Cant: 0}

	l1.InsertarO("Ramiro", "Agustín", 5, "contrasena")
	l1.InsertarO("Orinar", "comodin", 4, "algodificildeadivinar")
	l1.InsertarO("juan", "guarnizo", 2, "qwety1234")
	l1.InsertarO("benito", "camelo", 3, "aquenotelasabesweyjsjsjsjsjs")
	l1.InsertarO("sova", "gina", 1, "adivinaesta")
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
					continue
					//guardar a la pila esta actividad
				}
				fmt.Println("Usuario o contraseña incorrecta")
				continue

			}
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
		fmt.Println("5.Salir")
		fmt.Println("-------------------------------------------")
		reader := bufio.NewReader(os.Stdin)
		entrada, _ := reader.ReadString('\n')
		opcion := strings.TrimRight(entrada, "\r\n")

		switch opcion {

		}
	}
}
