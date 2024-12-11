"use client"
import axios from 'axios'
import React, { useState } from 'react'

const CreateCourse = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState(0)
  const [instructor, setInstructor] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the form submission logic here
    const response = axios.post("/api/admin/courses",{title,description,duration,instructor})
        console.log(response.data)
    
  }

  return (
    <div className='flex justify-center'>
      <form onSubmit={handleSubmit} className='flex flex-col w-fit'>
        <span>Title</span>
        <input
          type="text"
          placeholder="Title"
          className="border-2"
          onChange={(e) => setTitle(e.target.value)}
        />
        <span>Description</span>
        <input
          type="text"
          placeholder="Description"
          className="border-2"
          onChange={(e) => setDescription(e.target.value)}
        />
        <span>Duration (in hours)</span>
        <input
          type="number"
          placeholder="Duration"
          className="border-2"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <span>Instructor</span>
        <input
          type="text"
          placeholder="Instructor"
          className="border-2"
          onChange={(e) => setInstructor(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateCourse
