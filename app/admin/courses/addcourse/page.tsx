"use client"

import { useState } from 'react'
import axios from 'axios'
import { Book, Clock, User, FileText } from 'lucide-react'

const CreateCourse = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState(0)
  const [instructor, setInstructor] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/admin/courses", { title, description, duration, instructor })
      console.log(response.data)
      // Handle success (e.g., show a success message, reset form, redirect)
    } catch (error) {
      console.error("Error creating course:", error)
      // Handle error (e.g., show an error message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Create New Course</h2>
        <p className="text-gray-600 mb-6">Fill in the details to add a new course</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Book className="w-4 h-4" />
              <span>Title</span>
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter course title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <FileText className="w-4 h-4" />
              <span>Description</span>
            </label>
            <textarea
              id="description"
              placeholder="Enter course description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="duration" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4" />
              <span>Duration (in hours)</span>
            </label>
            <input
              id="duration"
              type="number"
              placeholder="Enter course duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              required
              min="0"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="instructor" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <User className="w-4 h-4" />
              <span>Instructor</span>
            </label>
            <input
              id="instructor"
              type="text"
              placeholder="Enter instructor name"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateCourse

