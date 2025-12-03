
import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "url"
import { validateUser, isUniqueNumericId, validateUserExists } from "./utils/validation.js"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const usersFilePath = path.join(__dirname,'users.json')

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

//============= Rutas de proyecto booking ===================/

app.get('/users', (req, res)=>{

  fs.readFile(usersFilePath,"utf-8",(err, data)=>{

    //Validación para saber si se esta pudiendo leer el archivo

    if(err){

      return res.status(500).json({error:"Error con la conexión de datos"})
    }

    const users = JSON.parse(data)

    //Enviar la data

    res.json(users)

  })

})


app.post('/users',(req, res)=>{

  //Guardar en una variable el nuevo usuario

  const newUser = req.body

  //Validación 1: nombre mínimo 3 caracteres

  const {name,email} = newUser

  if(!name || name.length<3){
    return res.status(400).json({error: "El nombre debe contener almenos 3 caracteres"})
  }

  //Validación 2: email con formato válido

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!email || !emailRegex.test(email)){
      return res.status(400).json({error: "El correo electrónico no tiene un formato válido"})
  }

  // Verificar si usuario ya existe

  fs.readFile(usersFilePath,"utf-8",(err, data)=>{

    //Validación para saber si se esta pudiendo leer el archivo

    if(err){
      return res.status(500).json({error:"Error con la conexión de datos"})
    }

    //obtener usuarios
    const users = JSON.parse(data)

    users.forEach(user => {
      if(user.name === name || user.email === email){
        return res.json({error:"El usuario o correo ya existe"}) 
      }
    });

    users.push({id:(users.length+1),name,email})

    //Guardar info

    fs.writeFile(usersFilePath,JSON.stringify(users,null,2),(err)=>{

      if(err){
        return res.status(500).json({error:"Error al guardar al usuario"})
      }      

    })

    //Enviar respuesta

    res.status(201).json({
      message: "Usuario agregado exitosamente",
      newUser:newUser
    })

  })  

})

app.put('/users/:id', (req, res)=>{
  const idUser = parseInt(req.params.id, 10)
  console.log(`ID de usuario a modificar: ${idUser}`)

  const infoUsuarioActualizada = req.body
  console.log(infoUsuarioActualizada)

  //Leer archivo JSON
    fs.readFile(usersFilePath,"utf-8",(err, data)=>{

      //Validación para saber si se esta pudiendo leer el archivo

      if(err){
        return res.status(500).json({error:"Error con la conexión de datos"})}

      //obtener usuarios
      let users = JSON.parse(data)
      console.log(users)

      //Uso de VALIDACIÓN DE archivo validation.js

      const validation = validateUser(infoUsuarioActualizada,users, idUser)

      if(!validation.isValid){
        return res.status(400).json({error:validation.error})
      }
      

      // Recorrer array y modificar aquel que tenga el ID dado como parámetro -> idUser

      users = users.map(user => 
        user.id === idUser ? {...user, ...infoUsuarioActualizada} : user)

      console.log(users)

      //Guardar info
        fs.writeFile(usersFilePath,JSON.stringify(users,null,2),(err)=>{

        if(err){
          return res.status(500).json({error:"Error al guardar al usuario"})}      
        })

      //Enviar respuesta

      const usuarioActualizado = users.find(user => user.id === idUser);

        res.status(201).json({
          message: "Usuario modificado exitosamente",
          IdDeUsuarioModificado: idUser,
          newUpdated: usuarioActualizado
        })

    })
  // Fin lectura de JSON
})

app.delete('/users/:id',(req, res)=>{

  //Capturar ID de usuario a eliminar
  const idUser = parseInt(req.params.id, 10)
  console.log(`ID de usuario a eliminar: ${idUser}`)

  console.log(`Tipo de dato de idUser: ${typeof idUser}`)
  console.log(isNaN(idUser))       
  console.log(Number.isNaN(idUser))

  //Leer archivo JSON
    fs.readFile(usersFilePath,"utf-8",(err, data)=>{

      //Validación para saber si se esta pudiendo leer el archivo

      if(err){
        return res.status(500).json({error:"Error con la conexión de datos"})}

      //obtener usuarios
      let users = JSON.parse(data)
      console.log(users)

     //Uso de VALIDACIÓN DE archivo validation.js

        console.log("Validando....")

        const validation = isUniqueNumericId(idUser,users, true)

        console.log(validation)
        if(!validation){
            return res.status(400).json({error:"El ID debe ser numérico"})
        }
       

      // Buscar usuario a eliminar y almacenarlo en una constante - método FIND

      const userToDelete = users.find((user) => user.id === idUser)
      const indexUserToDelete = users.findIndex((user)=>user.id === idUser)

      console.log("Usuario a eliminar: ")
      console.log(userToDelete)      
      console.log("Index de usuario a eliminar: ")
      console.log(indexUserToDelete)   

      //Validas que usuario existe

      console.log("Validando existencia de usuario....")

       const validarUserExist = validateUserExists(indexUserToDelete)

      console.log(validarUserExist)
      
      //si usuario no existe, entra aquí
        if(!validarUserExist){
            return res.status(400).json({error:"El ID proporcionado no pertenece a ningún usuario"})
        }   

      //Eliminar usuario
      const userDeleted = users.splice(indexUserToDelete,1)

      console.log("Usuario eliminado")
      console.log(userDeleted)

      console.log("Usuarios restantes:")
      console.log(users)
      
      //Guardar info
      
        fs.writeFile(usersFilePath,JSON.stringify(users,null,2),(err)=>{

        if(err){
          return res.status(500).json({error:"Error al guardar al usuario"})}      
        })

      //Enviar respuesta

          res.status(201).json({
            message: "Usuario eliminado exitosamente",
            IdDeUsuarioEliminado: indexUserToDelete,
            usuarioEliminado: userDeleted
          })

    })
  // Fin lectura de JSON
})


//Inicializar el servidor

app.listen(port, ()=>{
    console.log(`Servidor: http://localhost:${port}`)
})