package tda

import "fmt"

type Pila struct {
	Tope *nodoP

	Vacio bool
}

func (lista *Pila) Push(actividad string, fecha string) {
	nuevo := nodoP{Actividad: actividad, Fecha: fecha}

	if lista.Vacio {
		lista.Tope = &nuevo
		lista.Vacio = false
	} else {

		nuevo.setAnterior(lista.Tope)
		lista.Tope = &nuevo
	}

}

func (lista *Pila) Imprimir() {

	if lista.Vacio {
		fmt.Println("Lista Vacia")
	} else {
		temp := lista.Tope

		fmt.Printf("Actividad: %s , hora: %s", temp.GetActividad(), temp.GetFecha())
		fmt.Println("")
		for temp.getAnterior() != nil {
			temp = temp.getAnterior()
			fmt.Printf("Actividad: %s , hora: %s", temp.GetActividad(), temp.GetFecha())
			fmt.Println("")
		}

	}
}
