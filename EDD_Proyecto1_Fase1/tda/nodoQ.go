package tda

type nodoQ struct {
	nombre     string
	apellido   string
	carnet     int
	contrasena string

	siguiente *nodoQ
}

func (this nodoQ) GetNombre() string {
	return this.nombre
}

func (this nodoQ) GetApellido() string {
	return this.apellido
}

func (this nodoQ) GetCarnet() int {
	return this.carnet
}

func (this nodoQ) GetContra() string {
	return this.contrasena
}

func (this *nodoQ) SetNombre(nombre string) {
	this.nombre = nombre
}

func (this *nodoQ) SetApellido(apellido string) {
	this.apellido = apellido
}

func (this *nodoQ) SetCarnet(carnet int) {
	this.carnet = carnet
}

func (this *nodoQ) SetContrasena(contrasena string) {
	this.contrasena = contrasena
}

func (nodo *nodoQ) getSiguiente() *nodoQ {
	return nodo.siguiente
}

func (nodo *nodoQ) setSiguiente(sig *nodoQ) {
	nodo.siguiente = sig
}
