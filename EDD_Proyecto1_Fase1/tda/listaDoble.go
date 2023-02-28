package tda

import (
	"fmt"
)

// import("nodoD")
type ListaDoble struct {
	Cabeza *nodoD
	Cant   int
	Vacio  bool
}

func (lista *ListaDoble) InsertarF(nombre string, apellido string, carnet int, contrasena string, p1 Pila) {

	nuevo := nodoD{nombre: nombre, apellido: apellido, carnet: carnet, contrasena: contrasena, log: p1}

	if lista.Vacio {
		lista.Cabeza = &nuevo
		lista.Vacio = false
		lista.Cant += 1

	} else {
		temp := lista.Cabeza
		for temp.getSiguiente() != nil {
			temp = temp.getSiguiente()
		}
		temp.setSiguiente(&nuevo)
		nuevo.setAnterior(temp)
		lista.Cant += 1
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

func (lista *ListaDoble) InsertarO(nombre string, apellido string, carnet int, contrasena string, p1 Pila) {
	nuevo := nodoD{nombre: nombre, apellido: apellido, carnet: carnet, contrasena: contrasena, log: p1}

	if lista.Vacio {
		lista.Cabeza = &nuevo
		lista.Vacio = false
		lista.Cant += 1
	} else {

		temp := lista.Cabeza

		if temp.GetCarnet() > nuevo.GetCarnet() {
			nuevo.setSiguiente(temp)
			temp.setAnterior(&nuevo)
			lista.Cabeza = &nuevo
			lista.Cant += 1
		} else {

			for temp.getSiguiente() != nil && nuevo.GetCarnet() > temp.getSiguiente().GetCarnet() {
				temp = temp.getSiguiente()
			}

			if temp.getSiguiente() != nil {
				temp.getSiguiente().setAnterior(&nuevo)
				nuevo.setSiguiente(temp.getSiguiente())
				nuevo.setAnterior(temp)
				temp.setSiguiente(&nuevo)
				lista.Cant += 1

			} else {
				temp.setSiguiente(&nuevo)
				nuevo.setAnterior(temp)
				lista.Cant += 1
			}

		}

	}

}

func (lista *ListaDoble) Obtener(pos int) *nodoD {
	if pos < 0 {
		return nil
	}

	if pos >= lista.Cant {
		return nil
	} else {
		temp := lista.Cabeza
		for i := 0; i != pos; i++ {
			temp = temp.getSiguiente()
		}
		return temp
	}

}

func (lista *ListaDoble) BusquedaBinaria(carnet int) int {
	izq := 0
	der := lista.Cant - 1
	mitad := 0

	for izq <= der {
		mitad = int((izq + der) / 2)
		if lista.Obtener(mitad).GetCarnet() == carnet {
			return mitad
		} else if lista.Obtener(mitad).GetCarnet() > carnet {
			der = mitad - 1
		} else {
			izq = mitad + 1
		}
	}
	return -1

}

/* func (lista *ListaDoble) ObtenerDatos() []string {
	var datosPila []string
	dato := ""
	if lista.Vacio {
		fmt.Println("Lista Vacia")

	} else {
		temp := lista.Cabeza

		dato = strconv.Itoa(temp.GetCarnet()) + "\n" + temp.GetNombre() + " " + temp.GetApellido()
		datosPila = append(datosPila, dato)
		for temp.getSiguiente() != nil {
			temp = temp.getSiguiente()
			dato = strconv.Itoa(temp.GetCarnet()) + "\n" + temp.GetNombre() + " " + temp.GetApellido()
			datosPila = append(datosPila, dato)
		}

	}
	return datosPila
} */

func Porfabor() string {
	return "importamelo golang porfa"
}
