import React, { useEffect, useState } from 'react'
import supabase from '../supabase'
const LoginComponent = () => {
    const [users , setusers] = useState([]); 
    useEffect(()=>{
        const fetchusers =  async  ()=> {
            const { data , error } = await supabase.from('users').select('*')
               console.log(data)
        } 
        fetchusers()
    },[]) 
  return (
    <div>LoginComponent</div>
  )
}

export default LoginComponent