
import express from "express"

const app = express()
const port = 3000

// Primer endpoint

app.get('/', (req, res) => {
  res.send('Hello World! de Raúl')
})


//Inicializar el servidor

app.listen(port, ()=>{
    console.log("Nuestra app está funcionando en el puerto 3000")
})