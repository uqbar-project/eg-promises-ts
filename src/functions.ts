// función original que devuelve alumnos
export function getAlumnos() : any {
    return [
        { nombre: "Juan Pablo", edad: 22 },
        { nombre: "Jorge Luis", edad: 26 },
        { nombre: "Gertrudis", edad: 19 },
        { nombre: "Malena", edad: 21 }
    ]
}

// recibe un alumno y devuelve la edad
export function edad(alumno: any) : number {
    return alumno.edad
}

// suma una lista de números
export function suma(lista: any[]) : number {
    return lista.reduce((acum, each) => { return acum + each }, 0)
}

// longitud de una lista de números
export function longitud(lista: any[]) : number {
    return lista.length
}

export function a_getAlumnos() : Promise<any> {
    return new Promise( (resolve) => resolve(getAlumnos()))
    /*return new Promise( (resolve) => {
        resolve([
            { nombre: "Juan Pablo", edad: 22 },
            { nombre: "Jorge Luis", edad: 26 },
            { nombre: "Gertrudis", edad: 19 },
            { nombre: "Malena", edad: 21 }
        ])
    })*/
}

export function a_edad(alumno: any) : Promise<number> {
    return new Promise( (resolve) => resolve(alumno.edad) )
}

export function a_suma(lista: any[]) : Promise<number> {
    return new Promise( (resolve) => resolve(suma(lista)) )
}

export function a_longitud(lista: any[]) : Promise<number> {
    return new Promise( (resolve) => resolve(longitud(lista)) )
}


// Funciones asincrónicas con async/await
export async function promedioEdadAlumnos() {
    const alumnos : any[] = await a_getAlumnos()
    const edades = await Promise.all(alumnos.map( alumno => a_edad(alumno) ))
    const suma = await a_suma(edades)
    const cantidad = await a_longitud(edades)
    const promedio = suma / cantidad
    console.log("-Promedio de edades con async/await es: " + promedio)
}
