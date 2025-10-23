
import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"

const app = express()

//Cargar variables de entorno
dotenv.config()

const port = process.env.PORT || 3005;
console.log(port)

//Middleware para parsear JSON

//>>> Con body parser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//>>> Con versiones modernas de express

/*app.use(express.json())*/
/*app.use(expressurlencoded({extended:true}))*/


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

//Quinto endpoint - formularios

app.post('/form',(req,res)=>{

  //Accediendo a la propiedad nombre del cuerpo

  const name = req.body.nombre ||'Anónimo'
  const email = req.body.email ||'No proporcionado'

  //Respuesta

  res.json(
    {
      message: 'Datos recibidos',
      data:
        {
          name,
          email
        }
    }
  )
}
)

//Sexto endpoint - objeto JSON

app.post('/api/data', (req, res)=>{

  const data = req.body 

  //Validación de data

  if(!data || Object.keys(data).length ===0 ){
    return res.status(400).json({error: "No se recibieron datos"})
  }

  //Respuesta

  res.status(201).json(
    {
      message: "Datos JSON recibidos",
      data
    }

  )

}

)





//Inicializar el servidor

app.listen(port, ()=>{
    console.log(`Servidor: http://localhost:${port}`)
})