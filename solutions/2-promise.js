import { describe, it} from 'node:test'
import { equal } from 'node:assert/strict'


/* export async function obtenerDatosPromise() {
    return await setTimeout(() => {
      { data: 'datos importantes' };
    }, 2000);
  } */



//asi devolvemos una Promesa ! >> el *async* solo se usa apra leerla (se usa en el 'describe')
  export function obtenerDatosPromise() {
    return new Promise((resolve, _) => {
    setTimeout(() => {
        resolve({ data: 'datos importantes' });
    }, 2000);
})}


describe('2. obtenerDatosPromise', () => {
    it('2.1. obtenerDatosPromise', async () => {
      const { data } = await obtenerDatosPromise({ time: 1 })
      equal(data, 'datos importantes')
    })
  })