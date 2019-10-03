export interface Alumno {
    nombre: string,
    edad: number,
}

// función original que devuelve alumnos
export function getAlumnos(): Alumno[] {
    return [
        { nombre: "Juan Pablo", edad: 22 },
        { nombre: "Jorge Luis", edad: 26 },
        { nombre: "Gertrudis", edad: 19 },
        { nombre: "Malena", edad: 21 }
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
        // TODO: Introducir un error
        (resolve) => resolve(alumno.edad)
    )
}

export function a_suma(lista: number[]): Promise<number> {
    return new Promise((resolve) => resolve(suma(lista)))
}

export function a_longitud(lista: object[]): Promise<number> {
    return new Promise((resolve) => resolve(longitud(lista)))
}


// Funciones asincrónicas con async/await
export async function promedioEdadAlumnos(): Promise<number> {
    const alumnos: Alumno[] = await a_getAlumnos()
    const edades = await Promise.all(alumnos.map(alumno => a_edad(alumno)))
    const [suma, cantidad] = await Promise.all([
        a_suma(edades),
        a_longitud(edades as unknown as object[])
    ])
    const promedio = suma / cantidad
    return promedio
}
