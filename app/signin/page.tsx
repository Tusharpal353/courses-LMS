"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Signin = () => {

const [email,setemail]= useState("")
const [password,setpassword]= useState("")
const router= useRouter()
const handleSubmit = async()=>{
  const response =  await  axios.post("/api/signin",{email,password})
  console.log(response)
  if(response.data.message == "Login successful"){

      router.push("/")
  }

}

  return (

    

    <div>
        <div className='flex flex-col max-w-xl'>
        
            <span>email</span>
            <input type="text" placeholder='email' className='border-2' onChange={(e)=>setemail(e.target.value)}/>
            <span>password</span>
            <input type="text" placeholder='password'  className='border-2' onChange={(e)=>setpassword(e.target.value)}/>
            <button className='bg-blue-400' onClick={handleSubmit}>Submit  </button>
        </div>
    </div>
  )
}

export default Signin