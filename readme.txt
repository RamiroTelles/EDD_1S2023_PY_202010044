hola, Este es el manual Técnico

Paquete tda


La lista en que se guardan los estudiantes dentro del sistema es una listya doblemente enlazada.
Lista doblemente enlazada:
    atributos:
        Cabeza(puntero a nodoD)
        Cant(int)
        Vacio(bool)

    métodos:

    InsertarO: El método inserta elementos a la lista dependiendo del carnet del estudiante, antes de meterlo verifica 
    en que posición deberá de meterse para que la lista siga ordenada por carnet

    BusquedaBinaria: Método en el que se realiza una busqueda en la lista por medio del carnet

    Obtener: Se retorna el nodoD de la posición deseada

    Imprimir: imprime la Lista en consola

    La lista doblemente enlazada está hecha de nodosD
    
    nodosD:
        Atributos:
            -nombre(string)
            -apellido(string)
            -carnet(int)
            -contraseña(string)
            -log(pila)
            -siguiente(puntero a un nodoD)
            -anterior(puntero a un nodoD)


La cola de estudiantes pendientes se guarda en una lista enlazada simple FiFo

    Atributos:
        Cabeza(puntero a nodoQ)
        Cant (int)
        Vacio (bool)

    métodos:

    Encolar: Enlaza un nodo al final de la Cola

    Desencolar: Desenlaza un nodo al principio de la Cola y lo retorna

    Obtener Datos: Retorna un []string con los datos de la cola

    GetCantidad: Retorna el int Cant 

    GetCabeza: Retorna el nodo al principio de la cola pero no lo descenlaza

    Imprimir: imprime la cola en consola


    La cola está conformada por nodosQ:
    nodosQ:
        atributos:
            -nombre(string)
            -apellido(string)
            -carnet(int)
            -contraseña(string)
            -siguiente(puntero a un nodoD)


La bitácora de los estudiantes y del admin se almacena en una PIla Lifo

    Atributos:
        -Vacio(bool)
        -Tope(Puntero a nodoS)

    Métodos:

    Push: Inserta un nodo a la pila

    ObtenerDatos: Retorna un []string con los datos de la pila

    imprimir: Imprime la pila en consola

    La pila está conformada por nodosS
    nodoS:
        atributos:
        -nombre(string)
            -Actividad(string)
            -Fecha(string)
            -anterior(puntero a un nodosS)

Clase Pincipal

Es donde se tiene el main, también el menú en consola del usuario

Métodos importantes del principal:

leerCSV: Lee un archivo csv para la carga masiva de estudiantes a la cola

CrearArchivo: Crea un archivo, y si ya está creado, lo elimina y lo vuelve a crear

escribirArchivo: abre un archivo y escribe en el

generarPng: ejecuta un comando dot en la consola para generar una imagen png de un archivo.dot

reporteCola: Crea un reporte en un archivo.dot de la cola y genera la imagen png

reportePila: Crea un reporte en un archivo.dot de la Pila del admin y genera la imagen png

reporteListaDoble: Crea un reporte en un archivo.dot de la ListaDoble y genera la imagen png

reporte Json: genera un .json donde se almacenan todos los estudiantes que estan en el sistema


