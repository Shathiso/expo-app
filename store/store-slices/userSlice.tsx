import { createSlice } from '@reduxjs/toolkit'
import { getCurrentUser } from '../../server/appWriteConfig';

const initialState = {
    user: [],
    isLoggedIn:false,
    isLoading:false,
    applications: [],
    faults:[]
};

const getState = async () => {
    let state = initialState;
    const user = await getCurrentUser();

    if(user){
        let newState = {  
            user: [],
            isLoggedIn:true,
            isLoading:false,
            applications: [],
            faults:[]
        }

        newState.user.push(user);
        state = newState;
    }

    return state;
}

export const userSlice = createSlice({
    name: "users",
    initialState: getState(),
    reducers: {
        setUser: (state, action) => {
            state.user.push(action.payload);
        },

        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },

        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setStoreApplications: (state, action) => {
            state.applications = action.payload;
        },

        setStoreFaults: (state, action) => {
            state.faults = action.payload;
        },

        logOut: (state) => {
            state.user = [];
            state.isLoggedIn = false;
        }
    }

});

// Action creators are generated for each case reducer function
export const { setUser, setIsLoggedIn, setIsLoading, setStoreApplications, setStoreFaults, logOut } = userSlice.actions
export default userSlice.reducer