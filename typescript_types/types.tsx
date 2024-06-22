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