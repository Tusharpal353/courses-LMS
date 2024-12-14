"use client";

import { Clock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

// Define the types for the props
interface CardProps {
  title: string;
  description: string;
  duration: number;
  instructor: string;
  id: string;
}

const Card = ({ title, description, duration, instructor, id }: CardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/courses/${id}`);
  };

  return (
    <div className="border-2 m-10 rounded-xl shadow-md cursor-pointer" onClick={handleClick}>
      <div className="p-6">
        <h2 className="font-bold text-2xl">{title}</h2>
        <h1 className="flex-wrap text-md text-gray-600">{description}</h1>
        <h1 className="flex">
          <Clock className="px-1" /> {duration} hours
        </h1>
        <h1 className="text-gray-600 flex">
          <User className="px-1" /> {instructor}
        </h1>
      </div>
    </div>
  );
};

export default Card;
