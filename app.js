
import express from "express"

const app = express()
const port = process.env.PORT || 3000;

// Primer endpoint

app.get('/', (req, res) => {
  res.send(
    `
    <h1>Bienvenidos</h1>
    <p>Hola desde HTML</p>
    <p>Sea usted Bienvenido</p>

    <a href="">Ingresar</a>

    
    `
  )
})


//Inicializar el servidor

app.listen(port, ()=>{
    console.log(`Nuestra app está funcionando en el puerto ${port}`)
})