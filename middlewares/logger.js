
const LoggerMiddleware = (req, res, next) =>{

    //¿Cuándo se hace la solicitud?

        const timeStamp = new Date().toISOString();

        console.log(`[${timeStamp} ${req.method} ${req.url} - IP: ${req.ip}]`)

    // Registrar tiempo de respuesta
    
        const start = Date.now()
      
        res.on("finish", ()=>{

            const duration = Date.now() - start

            const durationSecs = Math.floor(duration/1000);

            console.log(`[${timeStamp}]  / Response: ${res.statusCode} / Duración: ${durationSecs} seg`)

        })
  
    next()
}

export default LoggerMiddleware