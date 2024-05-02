//1- Fijarse los parametros que pide la funcion (en este caso 'ping') y los que se le pasan
//2- Ejecutar el codigo ('node solutions/1-ip.js')
//3- Ver si los 'return' se van a implementar luego o estan bien usados
import { describe, it } from 'node:test'
import { equal, ifError } from 'node:assert/strict'
import net from 'node:net'; 

//necesitamos recibir el callback que estamos enviando
export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    //return { time: process.hrtime(startTime), ip }  <<< Este Return no se utiliza
    callback(null, { time: process.hrtime(startTime), ip }) // null seria el "err" y pasamos un objeto como "info"
  })
  
  client.on('error', (err) => {
    //throw err    <<< Tampoco funciona
    callback(err);
    client.end();
  })
}

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  //arreglamos una logica mas prolija
  else console.log(info)
})


//testing

describe('1. ping', () => {
  it('1.1. ping midu.dev', (_, done) => {
    ping('midu.dev', (err, info) => {
      ifError(err)
      equal(info.ip, 'midu.dev')
      done()
    })
  })
})