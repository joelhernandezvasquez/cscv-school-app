import { LoginError } from "@/types";


export const checkLoginFormErrors = (email:string,password:string):LoginError =>{
    if(email.length === 0){
        return {
            isError:true,
            message:'Email cannot be empty'
        }
    }

     if(password.length === 0){
        return {
            isError:true,
            message:'Password cannot be empty'
        }
    }
    return {
        isError:false
    }
}