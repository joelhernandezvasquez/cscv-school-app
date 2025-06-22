

export interface User{
    email:string,
    password:string
}

export interface UserSession{
    user: {
    user: {
      id: number,
      name: string,
      email:string,
      role: string,
      created_at: Date
    },
    token: string,
    id: string
  },
  expires: Date
}