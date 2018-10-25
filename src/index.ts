import { a_edad, a_suma, a_longitud, suma, a_getAlumnos, longitud, edad, getAlumnos, promedioEdadAlumnos } from './functions';

// Funciones sincrónicas
const edades = getAlumnos()
    .map( (alumno: any) => edad(alumno) )

const sumaEdades = suma(edades)
const totalEdades = longitud(edades)
console.log('Promedio de edades es: ', sumaEdades / totalEdades)

// Funciones asincrónicas
a_getAlumnos().then(
    (alumnos: any[]) => {
        const promisesAlumnos = alumnos.map( alumno => a_edad(alumno) )
        Promise
            .all(promisesAlumnos)
            .then( (edades) => {
                return Promise.all([
                    a_suma(edades),
                    a_longitud(edades)
                ])
            })
            .then( ([ suma, cantidad]) => {
                const promedio = suma / cantidad
                console.log("-Promedio de edades asincrónicas es: ", promedio)
            })
            .catch( (e) => console.log("error", e))
    })

promedioEdadAlumnos()