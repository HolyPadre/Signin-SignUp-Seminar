
import {
    CUSTOMER_USER_LOADED,
    CUSTOMER_USER_FAILED,  
    VENDOR_USER_LOADED,
    VENDOR_USER_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FAILED, LOGOUT_SUCCESS, REGISTER_CUSER_SUCCESS,
    REGISTER_VUSER_FAILED,
    REGISTER_VUSER_SUCCESS,
    REGISTER_CUSER_FAILED } from "../actions/types"



    const initialState={
        token:localStorage.getItem('token'),
        isAuthenticated:false,
        isCUSTOMER:null,
        isLoading:false,
        user:null
    }

export const authReducer=(state=initialState, action)=>{
    switch(action.type){
        case REGISTER_CUSER_SUCCESS:
        case REGISTER_VUSER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isCUSTOMER:action.payload.user.is_CUSTOMER,
                isLoading:false
            }
        case CUSTOMER_USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                isCUSTOMER:true,
                user:action.payload
            }
            case VENDOR_USER_LOADED:
                return {
                    ...state,
                    isAuthenticated:true,
                    isLoading:false,
                    isCUSTOMER:false,
                    user:action.payload
                }

        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false,
                isCUSTOMER:action.payload.is_CUSTOMER,
                
            }

        case REGISTER_CUSER_FAILED:
        case REGISTER_VUSER_FAILED:
        case LOGIN_FAILED:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                isCUSTOMER:null,
                isAuthenticated:false,
                isLoading:false
            }

            case CUSTOMER_USER_FAILED:
            case VENDOR_USER_FAILED:
            case LOGOUT_SUCCESS:
                localStorage.removeItem('token')
                return {
                    ...state,
                    token:null,
                    isCUSTOMER:null,
                    isAuthenticated:false,
                    isLoading:false,
                }
    }
    return state;
}

