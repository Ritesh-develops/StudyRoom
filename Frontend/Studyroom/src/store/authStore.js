import {create} from 'zustand';
import axios from 'axios';


const API_URL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    //initial state
    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: true,

    //functions

    signup: async(username, email, password) => {
        set({isLoading: true, message: null});
        try {
            const response = await axios.post(`${API_URL}/signup`, {username, email, password});

            set({user: response.data.user, isLoading: false});
        } catch (error) {
            set({error: error.response.data.message || "error signing up", isLoading: false});
            throw error;
        }
    },

    login: async(email, password) => {
        set({isLoading: true, message: null, error: null});
        try {
            const response = await axios.post(`${API_URL}/login`, {email, password});
            const {user, message} = response.data;
            set({user, message, isLoading: false});
            return {message, user};
        } catch (error) {
            set({error: error.response.data.message || "error logging in", isLoading: false});
            throw error;
        }
    },

    fetchUser: async()=>{
        set({fetchingUser: true, error: null});
        try {
            const response = await axios.get(`${API_URL}/fetch-user`);
            set({user: response.data.user, fetchingUser: false});
        } catch (error) {
            set({fetchingUser: false, user: null, error: null});
            throw error;
        }
    },
    
    logout: async()=>{
        set({isLoading: true, error: null});
        try {
           const response =  await axios.post(`${API_URL}/logout`);

           const {message} = response.data;
            set({user: null, isLoading: false, message});
            return {message};
        } catch (error) {
            set({error: error.response.data.message || "error logging out", isLoading: false});
            throw error;
    }
}}));