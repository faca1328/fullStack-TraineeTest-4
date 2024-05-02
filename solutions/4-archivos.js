import { describe, it } from 'node:test'
import { equal } from 'node:assert/strict'


import fs from 'node:fs/promises';

export async function leerArchivos() {
  // Con esto leemos todos los archivos al mismo tiempo y si hay algun error en alguna promesa el resto se ejecutaria igual.
  const [archivo1, archivo2, archivo3] = await Promise.allSettled([
    fs.readFile('archivo1.txt', 'utf8'),
    fs.readFile('archivo2.txt', 'utf8'),
    fs.readFile('archivo3.txt', 'utf8')
  ]);

  return `${archivo1.value} ${archivo2.value} ${archivo3.value}`
}

leerArchivos();



// test

describe('4. leerArchivos', () => {
  // it('4.1. leerArchivos', () => {
  //   const mensaje = leerArchivos()
  //   equal(mensaje, 'hola qué tal')
  // })

  it('4.1. leerArchivos', async () => {
    const mensaje = await leerArchivos()
    equal(mensaje, 'hola qué tal')
  })
})