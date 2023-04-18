import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../configs/apiConfig';

const local_tokens = {
    access_token: localStorage.getItem('access_token'),
    refresh_token: localStorage.getItem('refresh_token')
}

const initialState = {
    token:local_tokens.access_token?local_tokens:null,
    isAuthenticated: local_tokens.access_token?true:false,
    loading:local_tokens.access_token?true:false
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        authStart:(state)=>{
            state.loading = true
        },
        authSuccess:(state,action)=>{
            state.token = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        authFail: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
        },
        refresh_token:(state,action)=>{
            state.token = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        }
    },
});

export const {authStart,authSuccess,authFail} = authSlice.actions;


export const login = (email,password) => async(dispatch)=>{
    dispatch(authStart());
    try {
        const response = await axios.post(`${BASE_URL}/auth/login/`,{email,password});
        const token = {
            access_token: response.data.access,
            refresh_token: response.data.refresh
        }
        localStorage.setItem('access_token',response.data.access);
        localStorage.setItem('refresh_token',response.data.refresh);
        dispatch(authSuccess(token))
    } catch (error) {
        dispatch(authFail());
        console.log(error); 
        throw error
    }
}

export const refresh_token = (refresh_token)=> async (dispatch)=>{
    dispatch(authStart());
    try {
        console.log("Inside reducer token refresh");
        const response = await axios.post(`${BASE_URL}/auth/token/refresh/`,{refresh:refresh_token})
        const token = {
            access_token: response.data.access,
            refresh_token: refresh_token
        }
        localStorage.setItem('access_token',response.data.access);
        localStorage.setItem('refresh_token',refresh_token);
        dispatch(authSuccess(token))
    } catch (error) {
        dispatch(authFail());
        console.log(error); 
        throw error
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('access_token'); // Remove the token from local storage
    localStorage.removeItem('refresh_token'); 
    dispatch(authFail());
  };

  export default authSlice.reducer;
