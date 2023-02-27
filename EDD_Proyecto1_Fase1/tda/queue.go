package tda

import (
	"fmt"
)

// import("nodoD")
type Queue struct {
	Cabeza *nodoQ
	Cant   int
	Vacio  bool
}

func (lista *Queue) GetCantidad() int {
	return lista.Cant
}

func (lista *Queue) Encolar(nombre string, apellido string, carnet int, contrasena string) {
	nuevo := nodoQ{nombre: nombre, apellido: apellido, carnet: carnet, contrasena: contrasena}

	if lista.Vacio {
		lista.Cabeza = &nuevo
		lista.Vacio = false

	} else {
		temp := lista.Cabeza
		for temp.getSiguiente() != nil {
			temp = temp.getSiguiente()
		}
		temp.setSiguiente(&nuevo)

	}
	lista.Cant++
}

func (lista *Queue) Desencolar() *nodoQ {
	if lista.Vacio {
		fmt.Println("Lista Vacia")
		return nil

	} else {
		temp := lista.Cabeza
		lista.Cabeza = lista.Cabeza.getSiguiente()
		if lista.Cabeza == nil {
			lista.Vacio = true
		}
		lista.Cant--
		return temp
	}
}

func (lista *Queue) GetCabeza() *nodoQ {
	return lista.Cabeza
}

func (lista *Queue) Imprimir() {

	if lista.Vacio {
		fmt.Println("Lista Vacia")
	} else {
		temp := lista.Cabeza

		fmt.Printf("Nombre: %s %s , carnet: %d , contraseña: %s", temp.GetNombre(), temp.GetApellido(), temp.GetCarnet(), temp.GetContra())
		fmt.Println("")
		for temp.getSiguiente() != nil {
			temp = temp.getSiguiente()
			fmt.Printf("Nombre: %s %s , carnet: %d , contraseña: %s", temp.GetNombre(), temp.GetApellido(), temp.GetCarnet(), temp.GetContra())
			fmt.Println("")
		}
	}
}
