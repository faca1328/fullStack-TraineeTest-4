import { describe, it, afterEach } from 'node:test'
import { equal, ifError } from 'node:assert/strict'
import { unlinkSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import fs from 'node:fs'


//agregamos el callback
export function procesarArchivo(callback) {
    //las funciones de los callbacks se podrian extraer (ej: const handleRead = () => {})
    fs.readFile('input.txt', 'utf8', (error, contenido) => {
        if (error) {
            console.error('Error leyendo archivo:', error.message);
            //return false;    <<< Todos los returns estan mal porque no llegana  salir de la funcion.
            callback(error);
        }
        //no tiene sentido el Timeout
        //setTimeout(() => {
        const textoProcesado = contenido.toUpperCase();

        fs.writeFile('output.txt', textoProcesado, error => {
            if (error) {
                console.error('Error guardando archivo:', error.message);
                //return false;
                callback(error);
            }

            console.log('Archivo procesado y guardado con éxito');
            //return true
            callback(null);
        });

    })
    //});
}

// >>> Hacemos lo mismo peor en vez de con callbacks los pasamos a Promise...

export async function procesarArchivoPromise() {
    let contenido = '';

    try {
        contenido = await fs.promises.readFile('input.txt', 'utf8');
    } catch (e) {
        console.error('Error leyendo archivo:', e.message);
        throw e
    }
    const textoProcesado = contenido.toUpperCase();

    try {
        await fs.promises.writeFile('output.txt', textoProcesado);
        console.log('Archivo procesado y guardado con éxito');

    } catch (e) {
        console.error('Error guardando archivo:', error.message);
        throw e
    }

}



//test

describe('3. procesarArchivoPromise', () => {
    afterEach(() => {
        try {
            unlinkSync('output.txt')
        } catch { }
    })

    it('3.1. procesarArchivo', (t, done) => {
        writeFileSync('input.txt', 'gogogo')
        procesarArchivo((err) => {
            ifError(err)
            readFile('output.txt', 'utf8')
                .then((contenido) => {
                    equal(contenido, 'GOGOGO')
                    done()
                })
        })
    })
})