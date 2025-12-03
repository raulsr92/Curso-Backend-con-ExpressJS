
//Val N°01: Validación de Email

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   
    const emailRegex2 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;   


    return emailRegex2.test(email)
}

//Val N°02: Validación de Longitud de nombre

export function isValidName(name) {

    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

    return typeof name === "string" && 
            nameRegex.test(name.trim()) &&
            name.trim().length>=3;  

}

//Val N°03: ID único

export function isUniqueNumericId(id, users, param) {

    console.log(id)

    //Si param es TRUE, significa que estamos actualizando o eliminando

    if(param){
        return typeof id ==="number" && !isNaN(id)
    } else{
        return typeof id ==="number"  && !users.some(user => user.id == id)
    }
      
}

//Val N°04 evitar que se elimine el último usuario si el ID no existe

export function validateUserExists(indexUserToDelete) {

        return indexUserToDelete !== -1
    
}



//Función global de validación

export function validateUser(user, users, param) {
    
    const {name, email, id} = user

    //Si no se pasa la validación 1 sucede esto:
        if(!isValidName(name)){
            return{
                isValid: false,
                nombreIngresado: name,
                error: "El nombre debe tener al menos 3 caracteres"
            }
        }

    //Si no se pasa la validación 2 sucede esto:

        if(!isValidEmail(email)){
            return{
                isValid: false,
                emailIngresado: email,
                error: "El correo electrónico no es válido"
            }
        }

    //Si no se pasa la validación 2 sucede esto:

        if(!isUniqueNumericId(id, users, param)){
            return{
                isValid: false,
                idIngresado: id,
                error: "El ID debe ser numérico y único"
            }
        }   
        
    //Si pasa todas las validaciones

    return {
        isValid: true
    }
}