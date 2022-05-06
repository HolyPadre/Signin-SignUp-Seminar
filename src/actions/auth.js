import axios from "axios";
import {
    CUSTOMER_USER_LOADED,
    CUSTOMER_USER_FAILED,
    VENDOR_USER_LOADED,
    VENDOR_USER_FAILED,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_CUSER_SUCCESS,
    REGISTER_VUSER_FAILED,
    REGISTER_VUSER_SUCCESS,
    REGISTER_CUSER_FAILED
} from "../actions/types"



export const getCustomerUser=()=>(dispatch, getState)=>{
    const token=getState().auth.token
    const is_CUSTOMER=getState().auth.isCUSTOMER
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }

    if(token && is_CUSTOMER){
        config.headers['Authorization']=`Token ${token}`  
    }
    axios.get('http://127.0.0.1:8000/api/customer/dashboard/', config)
    .then(res =>{
        dispatch({
            type:CUSTOMER_USER_LOADED,
            payload:res.data
        })
    }).catch(err =>{
        dispatch({
            type:CUSTOMER_USER_FAILED
        })
    })
}



      // check token and load VENDOR user
      export const getVensoruser = ()=>(dispatch, getState)=>{
        const token=getState().auth.token;
        const is_CUSTOMER=getState().auth.isCUSTOMER
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        if(token && !is_CUSTOMER){
            config.headers['Authorization']=`Token ${token}`
        }

        axios.get('http://127.0.0.1:8000/api/vendor/dashboard/', config)
          .then(res =>{
              dispatch({
                  type:VENDOR_USER_LOADED,
                  payload:res.data
              })
          }).catch(err => {
              dispatch({
                  type:VENDOR_USER_FAILED
              })
          })
    }
        

export const create_customeruser=({username, email,password, password2})=>(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({username, email, password, password2})

    axios.post('http://127.0.0.1:8000/api/signup/customer/', body, config)
    .then(res =>{
        dispatch({
            type:REGISTER_CUSER_SUCCESS,
            payload:res.data
        })
        console.log(res.data)
    }).catch(err =>{
        dispatch({
            type:REGISTER_CUSER_FAILED
        })
        console.log(err.response.data)
    })

    
}


export const create_vendoruser=({username, email,password, password2})=>(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({username, email, password, password2})

    axios.post('http://127.0.0.1:8000/api/signup/vendor/', body, config)
    .then(res =>{
        dispatch({
            type:REGISTER_VUSER_SUCCESS,
            payload:res.data
        })
        console.log(res.data)
    }).catch(err =>{
        dispatch({
            type:REGISTER_VUSER_FAILED
        })
        console.log(err.response.data)
    })

    
}


export const login=({username, password})=>(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({username, password})

    axios.post('http://127.0.0.1:8000/api/login/', body, config)
    .then(response =>{
        dispatch({
            type:LOGIN_SUCCESS,
            payload:response.data
        })
    }).catch(err =>{
        dispatch({
            type:LOGIN_FAILED
        })
    })

}


export const logout=()=>(dispatch, getState)=>{
    const token=getState().auth.token
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    if(token){
        config.headers['Authorization']= `Token ${token}`
    }
    axios.post('http://127.0.0.1:8000/api/logout/', null, config)
    .then(res =>{
        dispatch({
            type:LOGOUT_SUCCESS
        })
    }).catch(err =>{
        console.log(err.response.data)
    })
}
