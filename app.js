
import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"

const app = express()

//Cargar variables de entorno
dotenv.config()

const port = process.env.PORT || 3005;
console.log(port)

//Middleware para parsear JSON

/*app.use(express.json())*/

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



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

// Segundo Enpoint

app.post('/eventos',(req,res)=>{

  const obj1 = req.body
  res.send(obj1)
  console.log(obj1)

})

//Tercer endpoint

app.get('/users/:id',(req, res)=>{

  const userId = req.params.id

  console.log(userId)

  res.send(`Mostrar información del usuario con ID ${userId}`)

})

//Cuarto endpoint

app.get('/search',(req,res)=>{

  const terms = req.query.termino || "No especificado"

  const category = req.query.categoria || "Todas"

  res.send(
    `
    <h2>Resultados de búsqueda:</h2>
    <p>Término: ${terms}</p>
    <p>Categoría: ${category}</p>

    `
  )
})



//Inicializar el servidor

app.listen(port, ()=>{
    console.log(`Servidor: http://localhost:${port}`)
})