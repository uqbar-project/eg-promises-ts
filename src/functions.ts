export interface Alumno {
    nombre: string,
    edad: number,
}

// función original que devuelve alumnos
export function getAlumnos(): Alumno[] {
    return [
        { nombre: 'Juan Pablo', edad: 22 },
        { nombre: 'Jorge Luis', edad: 26 },
        { nombre: 'Gertrudis', edad: 19 },
        { nombre: 'Malena', edad: 21 },
    ]
}

// recibe un alumno y devuelve la edad
export function edad(alumno: Alumno): number {
    return alumno.edad
}

// suma una lista de números
export function suma(lista: number[]): number {
    return lista.reduce((acum, each) => acum + each, 0)
}

// longitud de una lista de números
export function longitud(lista: object[]): number {
    return lista.length
}

export function a_getAlumnos(): Promise<Alumno[]> {
    return new Promise((resolve) => resolve(getAlumnos()))
}

export function a_edad(alumno: Alumno): Promise<number> {
    return new Promise(
        (resolve) => {
            // TODO: Introducir un error
            // throw new Error('Error al calcular la edad!')
            resolve(alumno.edad)
        },
    )
}

export function a_suma(lista: number[]): Promise<number> {
    return new Promise((resolve) => resolve(suma(lista)))
}

export function a_longitud(lista: object[]): Promise<number> {
    return new Promise((resolve) => resolve(longitud(lista)))
}

/*************************************************************************** */
/*                 FUNCIONES PARA LLAMAR EXTERNAMENTE                        */
/*************************************************************************** */

export function promedioEdadAlumnosSync(): number {
    const edades = getAlumnos().map((alumno: Alumno) => edad(alumno))
    const sumaEdades = suma(edades)
    const totalEdades = longitud(edades as unknown as object[])
    return sumaEdades / totalEdades
}

export function promedioEdadAlumnosPromise(callback: (promedio: number) => void): void {
    a_getAlumnos().then(
        (alumnos: Alumno[]) => {
            const promisesAlumnos = alumnos.map((alumno) => a_edad(alumno))
            Promise
                .all(promisesAlumnos)
                .then((edades) => {
                    return Promise.all([
                        a_suma(edades),
                        a_longitud(edades as unknown as object[]),
                    ])
                })
                .then(([sumaEdades, cantidad]) => {
                    const promedio = sumaEdades / cantidad
                    callback(promedio)
                })
                .catch((e) => console.log('error', e))
        })
}

export async function promedioEdadAlumnosAsyncAwait(): Promise<number> {
    const alumnos: Alumno[] = await a_getAlumnos()
    const edades = await Promise.all(alumnos.map((alumno) => a_edad(alumno)))
    const [sumaEdades, cantidadEdades] = await Promise.all([
        a_suma(edades),
        a_longitud(edades as unknown as object[]),
    ])
    const promedio = sumaEdades / cantidadEdades
    return promedio
}
