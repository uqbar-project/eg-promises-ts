import { a_edad, a_suma, a_longitud, suma, a_getAlumnos, longitud, edad, getAlumnos, promedioEdadAlumnos, Alumno } from './functions'

// Funciones sincrónicas
const edades = getAlumnos()
    .map((alumno: Alumno) => edad(alumno))

const sumaEdades = suma(edades)
const totalEdades = longitud(edades as unknown as object[])
console.log('- Promedio de edades sincrónicas es: ', sumaEdades / totalEdades)


// Funciones asincrónicas
a_getAlumnos().then(
    (alumnos: Alumno[]) => {
        const promisesAlumnos = alumnos.map(alumno => a_edad(alumno))
        Promise
            .all(promisesAlumnos)
            .then((edades) => {
                return Promise.all([
                    a_suma(edades),
                    a_longitud(edades as unknown as object[])
                ])
            })
            .then(([suma, cantidad]) => {
                const promedio = suma / cantidad
                console.log("- Promedio de edades asincrónicas es: ", promedio)
            })
            .catch((e) => console.log("error", e))
    })

promedioEdadAlumnos().then(
    (promedio: number) => console.log("- Promedio de edades con async/await es: " + promedio)
)
