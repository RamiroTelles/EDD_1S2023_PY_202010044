package tda

import "fmt"

//import("nodoD")
type ListaDoble struct {
	Cabeza *nodoD

	Vacio bool
}

func (lista *ListaDoble) InsertarF(nombre string, apellido string, carnet int, contrasena string) {
	nuevo := nodoD{nombre: nombre, apellido: apellido, carnet: carnet, contrasena: contrasena}

	if lista.Vacio {
		lista.Cabeza = &nuevo
		lista.Vacio = false
	} else {
		temp := lista.Cabeza
		for temp.getSiguiente() != nil {
			temp = temp.getSiguiente()
		}
		temp.setSiguiente(&nuevo)
		nuevo.setAnterior(temp)
	}

}

func (lista *ListaDoble) Imprimir() {

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

func (lista *ListaDoble) InsertarO(nombre string, apellido string, carnet int, contrasena string) {
	nuevo := nodoD{nombre: nombre, apellido: apellido, carnet: carnet, contrasena: contrasena}

	if lista.Vacio {
		lista.Cabeza = &nuevo
		lista.Vacio = false
	} else {

		temp := lista.Cabeza

		if temp.GetCarnet() > nuevo.GetCarnet() {
			nuevo.setSiguiente(temp)
			temp.setAnterior(&nuevo)
			lista.Cabeza = &nuevo
		} else {

			for temp.getSiguiente() != nil && nuevo.GetCarnet() > temp.getSiguiente().GetCarnet() {
				temp = temp.getSiguiente()
			}

			if temp.getSiguiente() != nil {
				temp.getSiguiente().setAnterior(&nuevo)
				nuevo.setSiguiente(temp.getSiguiente())
				nuevo.setAnterior(temp)
				temp.setSiguiente(&nuevo)

			} else {
				temp.setSiguiente(&nuevo)
				nuevo.setAnterior(temp)
			}

		}

	}

}

func Porfabor() string {
	return "importamelo golang porfa"
}
