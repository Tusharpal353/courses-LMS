"use client";
import axios from "axios";
import Card from "./Card";
import Banner from "./Banner";
import SearchBar from "@/Components/SearchBar";
import { useEffect, useState } from "react";
import AppBar from "@/Components/AppBar";

// Fetching course data
async function fetchData(): Promise<{ courses: Course[] }> {
  const response = await axios.get("http://localhost:3000/api/courses");
  return response.data;
}

// Define the Course type
interface Course {
  _id: string;
  title: string;
  description: string;
  duration: number;
  instructor: string;
}

const LandingPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Initialize as empty string
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  // Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      const data = await fetchData();
      setCourses(data.courses || []);
    };
    fetchCourses();
  }, []);

  // Update filtered courses based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredCourses(courses); // Show all courses if search is empty
    } else {
      const filtered = courses.filter((course) => {
        return (
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  return (
    <div>
      <AppBar />
      <Banner />
      <SearchBar setSearchQuery={setSearchQuery} />
      <h1 className="font-bold text-3xl text-center py-8">All Courses</h1>
      <div className="grid grid-cols-2 mx-20">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((data) => (
            <Card
              key={data._id}
              title={data.title}
              description={data.description}
              duration={data.duration}
              instructor={data.instructor}
              id={data._id}
            />
          ))
        ) : (
          <p className="text-center text-xl">No courses found</p> // Handle no results
        )}
      </div>
    </div>
  );
};

export default LandingPage;
