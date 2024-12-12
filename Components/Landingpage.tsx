"use client";
import axios from "axios";
import Card from "./Card";
import Banner from "./Banner";
import SearchBar from "@/Components/SearchBar";
import { useEffect, useState } from "react";

// Fetching course data
async function fetchData() {
  const response = await axios.get("http://localhost:3000/api/courses");
  return response.data;
}

export default function LandingPage() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");  // Initialize as empty string
  const [filteredCourses, setFilteredCourses] = useState([]);

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
          <p className="text-center text-xl">No courses found</p>  // Handle no results
        )}
      </div>
    </div>
  );
}
