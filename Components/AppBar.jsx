import { useRouter } from 'next/navigation'
import React from 'react'

const AppBar = () => {
  const router = useRouter()

  return (
    <div className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-lg font-bold cursor-pointer" onClick={()=>{
            router.push('/')
        }}>Course LMS</div>

        <div className="space-x-4">
          <button
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-300"
            onClick={() => {
              router.push("/admin/signin")
            }}
          >
            Admin
          </button>
          <button
            className="px-6 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg transition duration-300"
            onClick={() => {
              router.push("/signin")
            }}
          >
            User
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppBar
