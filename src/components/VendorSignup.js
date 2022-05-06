import React, {useState} from 'react'
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {create_vendoruser} from "../actions/auth"
import {Redirect} from "react-router-dom"

const VendorSignup = ({create_vendoruser, isAuthenticated, isClient}) => {
    const [vend, setVen]=useState({
        username:'',
        email:'',
        password:'',
        password2:''
    })

    const handleChange=(e)=>setVen({
        ...vend,
        [e.target.name]:e.target.value })
        
    const {username, email, password, password2}=vend
    const handleSubmit=(e)=>{
        e.preventDefault();
        //implement the register logic
        const newUser={
           username,
           email,
           password,
           password2
       }
       create_vendoruser(newUser)
    }
    if(isAuthenticated  && !isClient){
        return <Redirect to="/vendor/dashboard" />
    } 
    return (
        <div className='container'>
            <h2>signup and start Vendor</h2>
            <div className='row'>
                <div className='col-md-8 mx-auto'>
                    <form onSubmit={e => handleSubmit(e)}>
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
VendorSignup.propTypes={
    create_vendoruser:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
    isClient:PropTypes.bool
}

const mapStateToProps =state =>({
    isAuthenticated:state.auth.isAuthenticated,
    isClient:state.auth.isClient
})

export default connect(mapStateToProps, {create_vendoruser})( VendorSignup)
