"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Signup = () => {

const [username,setusername] = useState("")
const [email,setemail]= useState("")
const [password,setpassword]= useState("")
const router= useRouter()
const handleSubmit = ()=>{
  const response =   axios.post("/api/signup",{username,email,password})
  console.log(response)
  
    router.push("/signin")

}

  return (

    

    <div>
        <div className='flex flex-col max-w-xl'>
        
            <span>username</span>
            <input type="text" placeholder='username' className='border-2' onChange={(e)=>setusername(e.target.value)}/>
            <span>email</span>
            <input type="text" placeholder='email' className='border-2' onChange={(e)=>setemail(e.target.value)}/>
            <span>password</span>
            <input type="text" placeholder='password'  className='border-2' onChange={(e)=>setpassword(e.target.value)}/>
            <button className='bg-blue-400' onClick={handleSubmit}>Submit  </button>
        </div>
    </div>
  )
}

export default Signup