import NextAuth,{type NextAuthConfig} from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserSession } from "./types";

export const authConfig:NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
      },

      callbacks:{
       async jwt({token,user}) {

         if(user){
          token.data = user
         }
        return token;
       },
      async session({ session, token}) {
        session = token.data as never;
        //console.log(session)
        return session;
      },
      },

         providers:[
         CredentialsProvider({
          name: "Credentials",
       
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
         
          const {email,password} = credentials;
        
          const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
          })

          const user:UserSession = await res.json();
      
          if(user){
             return user;
          }
          return null;

        }
      }),
],
secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
session:{
 strategy:"jwt"
}

}

export const { signIn, signOut, auth, handlers } = NextAuth( authConfig );
