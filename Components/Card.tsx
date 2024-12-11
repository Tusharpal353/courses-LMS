import { Clock, User } from 'lucide-react'
import React from 'react'

const Card = ({title,description,duration,instructor}) => {
  return (
    <div className='border-2 m-10  rounded-xl shadow-md cursor-pointer'>
        <div className='p-6'>
            <h2 className='font-bold text-2xl'>{title}</h2>
            <h1 className='flex-wrap text-md text-gray-600'>{description}</h1>
            <h1 className='flex '> <Clock className='px-1'/> {duration} hours</h1>
            <h1 className='text-gray-600 flex'><User className='px-1'/> {instructor}</h1>
        </div>
    </div>
  )
}

export default Card