package tda

type nodoP struct {
	Actividad string
	Fecha     string

	anterior *nodoP
}

func (this nodoP) GetActividad() string {
	return this.Actividad
}

func (this nodoP) GetFecha() string {
	return this.Fecha
}

func (this *nodoP) SetActividad(act string) {
	this.Actividad = act
}

func (this *nodoP) SetFecha(fecha string) {
	this.Fecha = fecha
}

func (nodo *nodoP) getAnterior() *nodoP {
	return nodo.anterior
}

func (nodo *nodoP) setAnterior(ant *nodoP) {
	nodo.anterior = ant
}
