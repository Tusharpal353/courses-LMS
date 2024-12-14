/* "use client"
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

export default Signup */

"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { User, Mail, Lock } from 'lucide-react'

const Signup = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async () => {
    const response = await axios.post("/api/signup", { username, email, password })
    console.log(response)
    if (response.data.message === "User created") {
      router.push("/signin")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h2>
        <div className="space-y-4">
          {/* Username Input */}
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <User className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full bg-transparent focus:outline-none text-gray-700"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <Mail className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent focus:outline-none text-gray-700"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <Lock className="text-gray-500 mr-3" />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-transparent focus:outline-none text-gray-700"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </div>
        <div className="mt-4 text-center text-gray-500">
          <p>Already have an account? <a href="/signin" className="text-blue-500 hover:text-blue-600">Sign in</a></p>
        </div>
      </div>
    </div>
  )
}

export default Signup
  