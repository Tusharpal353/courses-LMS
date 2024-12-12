"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "@/Components/Card";
import Banner from "@/Components/Banner";
import { useRouter } from "next/navigation";

// Fetching course data
async function fetchData() {
    const response = await axios.get("http://localhost:3000/api/courses");
    return response.data;
}

export default function AdminPage() {
    const [courses, setCourses] = useState([]);
    const router = useRouter()
    // Fetch courses when the component mounts
    useEffect(() => {
        const fetchCourses = async () => {
            const data = await fetchData();
            setCourses(data.courses || []);
        };
        fetchCourses();
    }, []);

    // Add Course functionality
    const handleAddCourse = () => {
     router.push('/admin/courses/addcourse')

    };

    // Delete Course functionality
    const handleDeleteCourse = (id) => {

            axios.delete(`http://localhost:3000/api/courses/${id}`).then(() => {
                    // Update state to remove the deleted course
                    setCourses((prevCourses) => prevCourses.filter((course) => course._id !== id));
                    console.log("Course deleted successfully.");
                })
                
    };

    return (
        <div>
            <Banner />
            <h1 className="font-bold text-3xl text-center py-8">Admin Dashboard</h1>

            {/* Admin Action Buttons */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={handleAddCourse}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add Course
                </button>
                {/* Other actions can be added here */}
            </div>

            <div className="grid grid-cols-2 mx-20">
                {courses.length > 0 ? (
                    courses.map((data) => (
                        <div key={data._id} className="relative">
                            <Card
                                title={data.title}
                                description={data.description}
                                duration={data.duration}
                                instructor={data.instructor}
                                id={data._id}
                            />
                            {/* Delete Button */}
                            <button
                                onClick={() => handleDeleteCourse(data._id)}
                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-xl">No courses available</p>
                )}
            </div>
        </div>
    );
}
