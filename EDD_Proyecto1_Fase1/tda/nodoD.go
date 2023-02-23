package tda

type nodoD struct {
	nombre     string
	apellido   string
	carnet     int
	contrasena string

	siguiente *nodoD
	anterior  *nodoD
}

func (this nodoD) GetNombre() string {
	return this.nombre
}

func (this nodoD) GetApellido() string {
	return this.apellido
}

func (this nodoD) GetCarnet() int {
	return this.carnet
}

func (this nodoD) GetContra() string {
	return this.contrasena
}

func (this *nodoD) SetNombre(nombre string) {
	this.nombre = nombre
}

func (this *nodoD) SetApellido(apellido string) {
	this.apellido = apellido
}

func (this *nodoD) SetCarnet(carnet int) {
	this.carnet = carnet
}

func (this *nodoD) SetContrasena(contrasena string) {
	this.contrasena = contrasena
}

func (nodo *nodoD) getSiguiente() *nodoD {
	return nodo.siguiente
}

func (nodo *nodoD) getAnterior() *nodoD {
	return nodo.anterior
}

func (nodo *nodoD) setSiguiente(sig *nodoD) {
	nodo.siguiente = sig
}

func (nodo *nodoD) setAnterior(ant *nodoD) {
	nodo.anterior = ant
}
