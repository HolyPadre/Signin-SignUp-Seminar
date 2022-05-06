import React, {useEffect} from 'react'
import {getCustomerUser} from "../actions/auth"
import {useDispatch} from "react-redux"

 function CustomerDashboard() {
     const dispatch=useDispatch()
     useEffect(()=>{
         dispatch(getCustomerUser())
     }, [dispatch])
    return (
        <div className='container mt-5'>
             welcome! we have talented developer ready for hired
        </div>
    )
}

export default CustomerDashboard;
