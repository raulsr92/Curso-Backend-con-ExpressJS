
import express from "express"
import dotenv from "dotenv"

const app = express()

//Cargar variables de entorno

dotenv.config()


const port = process.env.PORT || 3005;
console.log(port)



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
    console.log(`Servidor: http://localhost:${port}`)
})