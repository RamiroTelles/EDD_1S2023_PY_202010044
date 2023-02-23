package main

import (
	"Proyecto1/EDD_Proyecto1_Fase1/tda"

	"fmt"
)

//import ("fmt"
//		"./tda")

//import ("fmt")

func main() {
	l1 := tda.ListaDoble{Cabeza: nil, Vacio: true}

	p1 := tda.Pila{Tope: nil, Vacio: true}

	q1 := tda.Queue{Cabeza: nil, Vacio: true}

	l1.InsertarO("Ramiro", "Agustín", 5, "contrasena")
	l1.InsertarO("Orinar", "comodin", 4, "algodificildeadivinar")
	l1.InsertarO("juan", "guarnizo", 2, "qwety1234")
	l1.InsertarO("benito", "camelo", 3, "aquenotelasabesweyjsjsjsjsjs")
	l1.InsertarO("sova", "gina", 1, "adivinaesta")

	l1.Imprimir()

	fmt.Println("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*Pila-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*")
	p1.Push("se ingresó", "12")
	p1.Push("se abonó", "13")
	p1.Push("se difamó", "14")
	p1.Push("se denigró", "15")
	p1.Push("se ingresó", "16")

	p1.Imprimir()

	fmt.Println("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*Cola-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*")
	q1.Encolar("Ramiro", "Agustín", 5, "contrasena")
	q1.Encolar("Orinar", "comodin", 4, "algodificildeadivinar")
	q1.Encolar("juan", "guarnizo", 2, "qwety1234")
	q1.Encolar("benito", "camelo", 3, "aquenotelasabesweyjsjsjsjsjs")
	q1.Encolar("sova", "gina", 1, "adivinaesta")

	q1.Imprimir()
	fmt.Println("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*Cola-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*")
	fmt.Println("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*Cola-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*")
	y := q1.Desencolar()

	fmt.Printf("Se desenculó al pisado : %s %s, con carnet: %d ,  y contra: %s", y.GetNombre(), y.GetApellido(), y.GetCarnet(), y.GetContra())
	fmt.Println("")
	fmt.Println("-----------------------------------------------------------------------------------------------------------------------------")

	y = q1.Desencolar()

	fmt.Printf("Se desenculó al pisado : %s %s, con carnet: %d ,  y contra: %s", y.GetNombre(), y.GetApellido(), y.GetCarnet(), y.GetContra())
	fmt.Println("")
	fmt.Println("-----------------------------------------------------------------------------------------------------------------------------")

	y = q1.Desencolar()

	fmt.Printf("Se desenculó al pisado : %s %s, con carnet: %d ,  y contra: %s", y.GetNombre(), y.GetApellido(), y.GetCarnet(), y.GetContra())
	fmt.Println("")
	fmt.Println("-----------------------------------------------------------------------------------------------------------------------------")

	y = q1.Desencolar()
	fmt.Printf("Se desenculó al pisado : %s %s, con carnet: %d ,  y contra: %s", y.GetNombre(), y.GetApellido(), y.GetCarnet(), y.GetContra())
	fmt.Println("")
	fmt.Println("-----------------------------------------------------------------------------------------------------------------------------")

	y = q1.Desencolar()
	fmt.Printf("Se desenculó al pisado : %s %s, con carnet: %d ,  y contra: %s", y.GetNombre(), y.GetApellido(), y.GetCarnet(), y.GetContra())
	fmt.Println("")
	fmt.Println("-----------------------------------------------------------------------------------------------------------------------------")

	y = q1.Desencolar()
	//fmt.Printf("Se desenculó al pisado : %s %s, con carnet: %d ,  y contra: %s", y.GetNombre(), y.GetApellido(), y.GetCarnet(), y.GetContra())
	fmt.Println("-----------------------------------------------------------------------------------------------------------------------------")
	fmt.Println("")
	q1.Encolar("Ramiro", "Agustín", 5, "contrasena")
	fmt.Println("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*Cola-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*")
	q1.Imprimir()

}
