export interface State{
    userDetails:{
        user: [{
            username:string,
            avatar:string
        }],
        isLoggedIn : boolean,
        isLoading: boolean
    }
}

export interface globalContextTypes{
    setIsLoading: (val:boolean) => void,
     setUser: (user:any) => void, 
     setIsLoggedIn: (val:boolean) => void, 
     setIsAdmin : (val:boolean) => void,
     isAdmin : boolean,
     isLoggedIn : boolean,
     user:{},
     isLoading:boolean,
}