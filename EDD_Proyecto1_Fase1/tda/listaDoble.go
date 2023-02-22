package tda

//import("nodoD")
type listaDoble struct {
	cabeza *nodoD
	cola   *nodoD
	vacio  bool
}

func (lista listaDoble) insertar(nombre string, apellido string, carnet int, contrasena string) {
	temp := nodoD{nombre: nombre, apellido: apellido, carnet: carnet, contrasena: contrasena}

}

func Porfabor() string {
	return "importamelo golang porfa"
}
