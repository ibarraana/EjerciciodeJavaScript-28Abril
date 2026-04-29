/*

### Ejercicio 2: Procesador de Listas de Invitados

Debes crear una función `procesarListas` que acepte un número variable de listas de invitados (arrays de strings con nombres).
La función debe:
1.  Combinar todas las listas en una sola.
2.  Eliminar nombres duplicados (cada invitado debe aparecer solo una vez).
3.  Devolver un objeto con dos propiedades:
    *   `invitadosUnicos`: Un `Set` con los nombres únicos de los invitados.
    *   `conteoTotalInvitados`: El número total de nombres recibidos antes de la deduplicación.
    *   `conteoInvitadosUnicos`: El número de invitados únicos.

**Pistas:**
*   Usa el operador `rest` para aceptar múltiples listas.
*   Usa el operador `spread` para combinar los arrays.
*   Usa `Set` para obtener los nombres únicos.

 */


function procesarListas(...listasRecibidas) {

    const listaCombinada = []
    
    for (let i = 0; i < listasRecibidas.length; i++) {
        const listaActual = listasRecibidas[i]
        
        for (let j = 0; j < listaActual.length; j++) {
            listaCombinada.push(listaActual[j])
        }
    }

    let datosLista = ""

    for (let i = 0; i < listaCombinada.length; i++) {
        datosLista += listaCombinada[i] + ", "
    }   

    let totalElementosLista = listaCombinada.length

    let invitadosUnicos = new Set(listaCombinada)

    let conteoUnicos = invitadosUnicos.size

    return {
        datosLista,
        invitadosUnicos,
        totalElementosLista,
        conteoUnicos
    };
}

let listaInvitados1 = ["Ana", "Gabriela", "Carlos", "Paula"]
let listaInvitados2 = ["Nicole", "Mariana", "Florencia", "Veronica"]

let resultado = procesarListas(listaInvitados1, listaInvitados2)

console.log("Imprimimos los datos obtenidos de la función \n")
console.log("Datos de la lista: " + resultado["datosLista"])
console.log("Invitados únicos: " + Array.from(resultado["invitadosUnicos"]))
console.log("Total de invitados (con duplicados): " + resultado["totalElementosLista"])
console.log("Total de invitados únicos: " + resultado["conteoUnicos"])
