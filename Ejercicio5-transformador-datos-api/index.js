/*

### Ejercicio 5: Transformador de Datos de API

Imagina que recibes datos de usuarios de una API en un formato y necesitas transformarlos.
Los datos vienen como un array de objetos:
`[{ id: 1, nombre_completo: "Ana Pérez", email: "ana.perez@example.com", detalles: { edad: 30, pais_residencia: "ES" } }, ...]`

Crea una función `transformarYAgruparUsuarios(usuariosApi, ...propiedadesAdicionales)`:
1.  `usuariosApi`: El array de objetos como el descrito.
2.  `...propiedadesAdicionales`: Un rest parameter que contendrá nombres de propiedades a extraer directamente del objeto `detalles` (ej. "edad", "pais_residencia").
3.  La función debe transformar cada objeto de usuario al siguiente formato:
    `{ userId: id, nombre: (solo el nombre, no el apellido), email, ... (las propiedades adicionales extraídas de 'detalles') }`
4.  Además, la función debe agrupar a los usuarios por `pais_residencia` (si esta propiedad se solicitó y existe). El resultado de la agrupación debe ser un `Map` donde la clave es el código del país y el valor es un `Set` de `userId`s de los usuarios de ese país.
5.  La función debe devolver un objeto con:
    *   `usuariosTransformados`: Array de los objetos de usuario transformados.
    *   `usuariosPorPais`: El `Map` de la agrupación por país (o un `Map` vacío si "pais_residencia" no estaba en `propiedadesAdicionales`).

**Pistas:**
*   Usa desestructuración para acceder a las propiedades anidadas y para renombrar.
*   Usa el operador `spread` para construir los nuevos objetos de usuario de forma dinámica.
*   Itera sobre `propiedadesAdicionales` para construir el objeto transformado.
*   Usa `Map` y `Set` para la agrupación.

 */

function transformarYAgruparUsuarios(usuariosApi, ...propiedadesAdicionales) {

    let usuariosTransformados = [];
    let usuariosPorPais = new Map();

    for (let i = 0; i < usuariosApi.length; i++) {
        let usuarioOriginal = usuariosApi[i];

        let { id, nombre_completo, email, detalles } = usuarioOriginal;

        let partesDelNombre = nombre_completo.split(" ");
        let primerNombre = partesDelNombre[0];

        let nuevoUsuario = {
            userId: id,
            nombre: primerNombre,
            email: email
        };

        for (let j = 0; j < propiedadesAdicionales.length; j++) {
            let prop = propiedadesAdicionales[j];
            
            if (detalles[prop] !== undefined) {
                nuevoUsuario[prop] = detalles[prop];
            }
        }

        usuariosTransformados.push(nuevoUsuario);

        if (propiedadesAdicionales.includes("pais_residencia") && detalles.pais_residencia) {
            let pais = detalles.pais_residencia;

            if (!usuariosPorPais.has(pais)) {
                usuariosPorPais.set(pais, new Set());
            }

            usuariosPorPais.get(pais).add(id);
        }
    }

    return {
        usuariosTransformados,
        usuariosPorPais
    };
}


const datosApi = [
    { 
        id: 1,         
        nombre_completo: "Ana Ibarra", 
        email: "anaibarra@gmail.com", 
        detalles: { edad: 30, pais_residencia: "ES" } 
    },
    { 
        id: 2, 
        nombre_completo: "Juan Ibarra", 
        email: "mariaibarra@gmail.com", 
        detalles: { 
            edad: 25, 
            pais_residencia: "MX" 
        } 
    },
    { 
        id: 3, 
        nombre_completo: "Lore Ibarra", 
        email: "nicolibarra@gmail.com", 
        detalles: { edad: 40, pais_residencia: "AR" } 
    }
];

let resultado = transformarYAgruparUsuarios(datosApi, "edad", "pais_residencia");

console.log("\nUsuarios Transformados:");
console.log(resultado.usuariosTransformados);
console.log("\nUsuarios por País:");
console.log(resultado.usuariosPorPais);
