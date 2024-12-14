// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Card from "@/Components/Card";
// import Banner from "@/Components/Banner";
// import { useRouter } from "next/navigation";

// // Fetching course data
// async function fetchData() {
//     const response = await axios.get("http://localhost:3000/api/courses");
//     return response.data;
// }

// export default function AdminPage() {
//     const [courses, setCourses] = useState([]);
//     const router = useRouter()
//     // Fetch courses when the component mounts
//     useEffect(() => {
//         const fetchCourses = async () => {
//             const data = await fetchData();
//             setCourses(data.courses || []);
//         };
//         fetchCourses();
//     }, []);

//     // Add Course functionality
//     const handleAddCourse = () => {
//      router.push('/admin/courses/addcourse')

//     };

//     // Delete Course functionality
//     const handleDeleteCourse = (id) => {

//             axios.delete(`http://localhost:3000/api/courses/${id}`).then(() => {
//                 })
                
//     };

//     return (
//         <div>
//             <Banner />
//             <h1 className="font-bold text-3xl text-center py-8">Admin Dashboard</h1>

//             {/* Admin Action Buttons */}
//             <div className="flex justify-center gap-4 mb-8">
//                 <button
//                     onClick={handleAddCourse}
//                     className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                     Add Course
//                 </button>
//                 {/* Other actions can be added here */}
//             </div>

//             <div className="grid grid-cols-2 mx-20">
//                 {courses.length > 0 ? (
//                     courses.map((data) => (
//                         <div key={data._id} className="relative">
//                             <Card
//                                 title={data.title}
//                                 description={data.description}
//                                 duration={data.duration}
//                                 instructor={data.instructor}
//                                 id={data._id}
//                             />
//                             {/* Delete Button */}
//                             <button
//                                 onClick={() => handleDeleteCourse(data._id)}
//                                 className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-center text-xl">No courses available</p>
//                 )}
//             </div>
//         </div>
//     );
// }
"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Save admin status in session storage or use a global state
      sessionStorage.setItem("isAdmin", "true");
      alert("Login successful!");
      router.push("/admin/dashboard"); // Redirect to admin dashboard
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-md rounded-lg w-1/3"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
