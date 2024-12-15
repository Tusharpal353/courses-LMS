"use client";
import AppBar from "@/Components/AppBar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

async function fetchData() {
  const response = await axios.get("http://localhost:3000/api/courses");
  return response.data;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
}

const AdminDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [updatedCourse, setUpdatedCourse] = useState<Partial<Course>>({});
  const router = useRouter()
  useEffect(() => {
    const fetchCourses = async () => {
      const data = await fetchData();
      setCourses(data.courses || []);
    };
    fetchCourses();
  }, []);

  const handleDelete = async (courseId: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/admin/courses/${courseId}`);
      console.log("Course deleted:", response.data);
      const data = await fetchData();
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleUpdate = async (courseId: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/courses/${courseId}`,
        updatedCourse
      );
      console.log("Course updated:", response.data);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId ? { ...course, ...updatedCourse } : course
        )
      );
      setEditMode(null);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedCourse((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <AppBar />
      <div className="p-10">
        <h1 className="font-bold text-3xl text-center py-8">Admin Dashboard</h1>
      <button  className="bg-blue-400 text-white px-4 py-2 rounded" onClick={()=>{
        router.push("/admin/courses/addcourse ")

      }}>
        Create course
      </button>
        <div className="grid grid-cols-2 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className="border p-4 rounded-lg shadow-md flex flex-col">
                {editMode === course._id ? (
                  <div>
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      defaultValue={course.title}
                      onChange={handleInputChange}
                      className="w-full p-2 mb-2 border rounded"
                    />
                    <textarea
                      name="description"
                      placeholder="Description"
                      defaultValue={course.description}
                      onChange={handleInputChange}
                      className="w-full p-2 mb-2 border rounded"
                    ></textarea>
                    <input
                      type="text"
                      name="duration"
                      placeholder="Duration"
                      defaultValue={course.duration}
                      onChange={handleInputChange}
                      className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                      type="text"
                      name="instructor"
                      placeholder="Instructor"
                      defaultValue={course.instructor}
                      onChange={handleInputChange}
                      className="w-full p-2 mb-4 border rounded"
                    />
                    <button
                      onClick={() => handleUpdate(course._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2 className="font-bold text-xl mb-2">{course.title}</h2>
                    <p className="text-gray-600 mb-2">{course.description}</p>
                    <p className="text-gray-800 mb-2">Duration: {course.duration}</p>
                    <p className="text-gray-800 mb-4">Instructor: {course.instructor}</p>
                    <button
                      onClick={() => setEditMode(course._id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-xl">No courses found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
