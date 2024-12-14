import React from 'react';
import { Book, User, MessageSquare, Check } from 'lucide-react';

interface CourseDetailsPageProps {
  params: {
    courseId: string;
  };
}

const CourseDetailsPage = async ({ params}:CourseDetailsPageProps ) => {

  const res = await fetch(`http://localhost:3000/api/courses/${params.courseId}`);
  
  if (!res.ok) {
    return <div>Failed to load course data</div>;
  }
  
  const data = await res.json();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-8 m-4">
        {/* Course Title with Book Icon */}
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2">
          <Book size={28} className="text-blue-500" />
          {data.course.title}
        </h1>

        {/* Course Description */}
        <div className="mb-6">
          <p className="text-xl mb-2 text-gray-600"><strong>Description:</strong> {data.course.description}</p>
          <p className="text-lg text-gray-600 flex items-center gap-2">
            <User size={20} className="text-gray-600" />
            <strong>Instructor:</strong> {data.course.instructor}
          </p>
        </div>

        {/* Duration Section with Icon */}
        <div className="message mt-8 flex items-center gap-2">
          <MessageSquare size={24} className="text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-800">Duration:</h2>
          <p className="text-lg text-gray-600 ml-2">{data.course.duration} hours</p>
        </div>

        {/* Enroll Button with Check Icon */}
        <div className="actions mt-6 flex justify-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
            <Check size={20} className="text-white" />
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
