# Ejemplo básico de promises

En este ejemplo queremos resolver el promedio de edad de alumnos de un curso. Esto implica

- obtener la lista de alumnos
- transformarlo en una lista de edades (números)
- luego sumar y saber la cantidad de elementos
- y finalmente obtener el promedio


## Solución sincrónica

En la solución sincrónica, todo funciona medianamente simple

```ts
const edades = getAlumnos()
    .map( (alumno: any) => edad(alumno) )

const sumaEdades = suma(edades)
const totalEdades = longitud(edades)
console.log('Promedio de edades es: ', sumaEdades / totalEdades)
```

## Solución asincrónica con promises

Las promises permiten encolar procesos asincrónicos, y su constructor espera una función con dos parámetros

- un callback por el caso feliz
- un callback por el caso con error

En el caso de los alumnos, recibimos el callback por el caso feliz y lo invocamos (mediante los paréntesis) pasándole como argumentos una lista de JSON que son los alumnos:

```ts
export function a_getAlumnos() : Promise<any[]> {
    return new Promise( (resolve) => {
        resolve([
            { nombre: "Juan Pablo", edad: 22 },
            { nombre: "Jorge Luis", edad: 26 },
            { nombre: "Gertrudis", edad: 19 },
            { nombre: "Malena", edad: 21 }
        ])
    })
}
```

Recordemos que una función se invoca mediante parámetros:

```ts
> const masUno = (valor) => valor + 1
undefined
> masUno
(valor) => valor + 1
> masUno(3)
4
```

Como resultado, es bastante más tedioso resolver el mismo requerimiento:

- ya no podemos ejecutar directamente el código que sigue, sino que debemos envolverlo dentro de una cadena de `then` que define una _promise_ nueva 
- cualquier error se atrapa con una nueva promise que se genera mediante la función `catch` al final de la cadena de llamadas asincrónicas
- y para poder paralelizar varias tareas asincrónicas, `Promise.all` permite disparar asincrónicamente varias tareas, y agrupa los resultados en una lista de resultados en el siguiente callback que se le pase a `then`

```ts
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
```

El lector podrá pensar que es complejo, y ciertamente lo es. Pero anteriormente era obligatorio anidar los `then` uno dentro de otro, lo que producía código mucho más intrincado que el encadenamiento de `then`s hermanos.

## Async / await to the rescue

Lo que perdimos con el asincronismo son dos instrucciones no menores:

- el **return**
- y el **throw**

gracias al mecanismo `async / await` tenemos la posibilidad de generar una función asincrónica que trabaje en forma muy similar a la versión sincrónica. Para esto

- es necesario avisar que la función es asincrónica
- y cada llamada asincrónica se envuelve con una instrucción `await` que permite asignarlo a una variable o continuar normalmente con nuestra definición de método o función

```ts
export async function promedioEdadAlumnos() {
    const alumnos : any[] = await a_getAlumnos()
    const edades = await Promise.all(alumnos.map( alumno => a_edad(alumno) ))
    const suma = await a_suma(edades)
    const cantidad = await a_longitud(edades)
    const promedio = suma / cantidad
    console.log("-Promedio de edades con async/await es: " + promedio)
}
```

La llamada desde el index.ts es muy simple:

```ts
promedioEdadAlumnos()
```


## Cómo testear el ejemplo

```bash
$ npm install
$ npm start
```

## Resumen para el manejo de asincronismo en la VM de Javascript
Les dejamos esta tabla que muestra un breve resumen de los diferentes métodos que vimos para manejar el asincronismo dentro de la máquina virtual de Javascript, particularmente dentro de Typescript. 

![async-cheatsheet](images/async-cheatsheet.png)

Fuente: [Frontend Armory](https://github.com/frontarm/async-javascript-cheatsheet)
