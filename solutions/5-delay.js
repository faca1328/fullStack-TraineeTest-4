export async function delay (time) {
    
    return new Promise(function (resolve, _) {
        setTimeout(()=>{
            resolve()
        }, time)
    })
    
  }
  
  delay(3000).then(() => console.log('Hola mundo'));
  // o..
  await delay(3000)
  console.log('Hola mundo')