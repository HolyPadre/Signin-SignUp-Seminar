import React, {useState} from 'react'
import { connect } from 'react-redux'
import  PropTypes from "prop-types"
import { create_customeruser } from '../actions/auth'
import { Redirect } from 'react-router-dom'

const CustomerSignup = ({create_customeruser, isAuthenticated,isCustomer}) => {
    const [customer, setCustomer]=useState({
        username:'',
        email:'',
        password:'',
        password2:''
    })

    const handleChange=(e)=>setCustomer({
        ...customer,
        [e.target.name]:e.target.value })
        
    const {username, email, password, password2}=customer
     
   const handleSubmit=(e)=>{
       e.preventDefault();
       const newCustomer={
           username,
           email,
           password,
           password2
       }
       console.log(newCustomer)
    create_customeruser(newCustomer)
   }
    if(isAuthenticated && isCustomer){
        return <Redirect to="/customer/dashboard"/>
    }
    return (
        <div className='container'>
            <h2>signup as a Customer</h2>
            <div className='row'>
                <div className='col-md-8 mx-auto'>
                    <form onSubmit={ e =>handleSubmit(e)}>
                        <div className='form-group mb-3'>
                            <label>username</label>
                            <input type='text'
                                 className='form-control' 
                                 name='username'
                                 value={username}
                                 onChange={(e)=>handleChange(e)}
                                 />
                        </div>
         
                        <div className='form-group mb-3'>
                            <label>Email</label>
                            <input type='text'
                                 className='form-control' 
                                 name='email'
                                 value={email}
                                 onChange={(e)=>handleChange(e)}
                                 />
                        </div>
                        <div className='form-group mb-3'>
                            <label>password</label>
                            <input type='text'
                                 className='form-control' 
                                 name='password'
                                 value={password}
                                 onChange={(e)=>handleChange(e)}
                                 />
                        </div>
                        <div className='form-group mb-3'>
                            <label>Confirm password</label>
                            <input type='text'
                                 className='form-control' 
                                 name='password2'
                                 value={password2}
                                 onChange={(e)=>handleChange(e)}
                                 />
                        </div>
                        <button type="submit" className="btn btn-primary">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

CustomerSignup.propTypes={
    create_customeruser:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
    isCustomer:PropTypes.bool
}


const mapStateToProps= state =>({
    isAuthenticated:state.auth.isAuthenticated,
    isCustomer:state.auth.isCustomer
})

export default  connect(mapStateToProps, {create_customeruser})(CustomerSignup)
