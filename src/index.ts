/* eslint-disable no-console */
import { promedioEdadAlumnosAsyncAwait, promedioEdadAlumnosPromise, promedioEdadAlumnosSync } from './functions'

// 1. Llamada sincrónica
const promedio = promedioEdadAlumnosSync()
console.log('- Promedio de edades sincrónicas es: ', promedio)

// 2. Llamada con promises, requiere que le pasemos una función
function funcionQueHaremosCuandoTermineTodo(promedioPromise: number) {
  console.log('- Promedio de edades asincrónicas con promises es: ', promedioPromise)
}

promedioEdadAlumnosPromise(funcionQueHaremosCuandoTermineTodo)

// 3. Llamada con async / await
promedioEdadAlumnosAsyncAwait()
  .then((promedioAA) => console.log('- Promedio de edades con async/await es: ', promedioAA))
  .catch(() => console.log('Error en el async / await GENERAL!'))