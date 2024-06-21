import { createSlice } from '@reduxjs/toolkit'
import { getCurrentUser } from '../../server/appWriteConfig';

const initialState = {
    user: {},
    isLoggedIn:false,
    isLoading:false,
    applications: [],
    faults:[]
};

function getState() {
    let state = initialState;
    getCurrentUser()
      .then((res) => {
        const newState = {  
            user: {},
            isLoggedIn:true,
            isLoading:false
        }
        if(res != null) state = newState;
      })
      .catch((error) => {
        console.log(error);
      })

      return state;
}

export const userSlice = createSlice({
    name: "users",
    initialState: getState(),
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
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
            state.isLoading = true;
            state.isLoggedIn = false;
        }
    }

});

// Action creators are generated for each case reducer function
export const { setUser, setIsLoggedIn, setIsLoading, setStoreApplications, setStoreFaults, logOut } = userSlice.actions
export default userSlice.reducer