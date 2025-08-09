
import { User } from "@/types";
import { signIn} from "next-auth/react";

export const authenticateUser = async(email:string,password:string):Promise<User> =>{
//  const TOKEN = getSession();
//   console.log(TOKEN);
  try{
      const loginRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,{
       method:'POST',
        headers:{
        "Content-Type":"application/json",
     
    },
    body:JSON.stringify({
        email,
        password
    })
      })
   

      return await loginRequest.json();
      
    }
  
catch(error){
    if(error instanceof Error){
        console.log(error);
        throw new Error(error.message);
    }  
    return {} as User;
}
 
}

export const signInUser = async (email:string,password:string) =>{
    return await signIn("credentials",{
        email:email,
        password:password,
        callbackUrl:'/dashboard'
      });
}