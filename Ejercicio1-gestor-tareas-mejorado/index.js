/*
### Ejercicio 1: Gestor de Tareas Mejorado

Crea un gestor de tareas que utilice `Map` para almacenar las tareas, donde la clave sea un ID único y el valor sea un
 objeto de tarea. Cada tarea tendrá `id`, `descripcion`, `completada` (booleano) y un `Set` de `etiquetas`.

Implementa las siguientes funciones:
1.  `agregarTarea({ id, descripcion, etiquetas = [] })`:
    *   Debe usar desestructuración para los parámetros.
    *   Si el `id` ya existe, no debe sobrescribir la tarea existente y podría devolver un mensaje de error o `false`.
    *   Las `etiquetas` deben almacenarse en un `Set` dentro del objeto de la tarea.
    *   La tarea se guarda en un `Map` global o encapsulado.
2.  `marcarCompletada(id)`: Cambia el estado `completada` de la tarea a `true`.
3.  `obtenerTareasPorEtiqueta(etiqueta)`: Devuelve un array con las descripciones de las tareas que contengan la `etiqueta` especificada.
4.  `obtenerResumenTareas()`: Devuelve un objeto con `{ total, completadas, pendientes }`.

**Pistas:**
*   Puedes usar un closure para encapsular el `Map` de tareas si lo deseas.
*   Para `obtenerTareasPorEtiqueta`, necesitarás iterar el `Map` y luego verificar el `Set` de etiquetas de cada tarea.
 */


const gestorTareas = (function() {
    const tareas = new Map()

    function agregarTareas({ id, descripcion, etiquetas = [] }) {

        let valorDevuelto = false
        
        if (tareas.has(id)) {
            console.log("No se puede agregar esta tarea, porque el ID: " + id + " ya existe.")
            return valorDevuelto
        }

        tareas.set(id, {
            id,
            descripcion,
            completada: false,
            etiquetas: new Set(etiquetas)
        })

        valorDevuelto = true;
        return valorDevuelto;
    }

    function marcarCompletadas(id) {
        if (tareas.has(id)) {
            tareas.get(id).completada = true
            console.log("Se ha completado la tarea como completada")
        } else {
            console.log("No se pudo marcar como completar la tarea")
        }
    }

    function obtenerTareasPorEtiquetas(etiqueta) {
        const tareasConEtiqueta = []

        for (let tarea of tareas.values()) {
            if (tarea.etiquetas.has(etiqueta)) {
                tareasConEtiqueta.push(tarea.descripcion)
            }
        }

        return tareasConEtiqueta;
    }

    function obtenerResumenTareas() {
    }
    
    return {
        agregarTarea: agregarTareas,
        marcarCompletada: marcarCompletadas,
        obtenerTareasPorEtiqueta: obtenerTareasPorEtiquetas
    }
    
})();


const tareasParaAgregar = [{
    id: 1,
    descripcion: "Tarea 1",
    etiquetas: ["Etiqueta1", "Etiqueta2"]
}, {
    id: 2,
    descripcion: "Tarea 2",
    etiquetas: ["Etiqueta1", "Etiqueta2"]
}]


// Primero agrego una tarea
let agregadaTarea1 =gestorTareas.agregarTarea(tareasParaAgregar[0])

if(agregadaTarea1) {
    console.log("Tarea 1 agregada correctamente.")
}

// Luego agrego otra tarea
let agregadaTarea2 =gestorTareas.agregarTarea(tareasParaAgregar[1])

if(agregadaTarea2) {
    console.log("Tarea 2 agregada correctamente.")
}

// Marco la tarea 1 como completada
gestorTareas.marcarCompletada(1)

// Marco la tarea 2 como completada
gestorTareas.marcarCompletada(2)

// Obtenemos las tareas por etiqueta
let tareasConEtiqueta1 = gestorTareas.obtenerTareasPorEtiqueta("Etiqueta1")
console.log("Tarea por etiquetas 'Etiqueta1'" + tareasConEtiqueta1)


