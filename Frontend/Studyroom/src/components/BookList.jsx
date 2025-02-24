import React from 'react'
import { Link } from 'react-router-dom'

const BookList = () => {
    const books = ["", "", "", "", "", ""]
  return (
    <div className='text-[#252422] bg-[#f5f5f5] px-4 md:px-12 pb-20'>
      <h1 className='py-6 text-xl md:text-2xl lg:text-3xl w-full mx-auto max-w-6xl'>Reader's Favourite</h1>
      <div className='flex flex-wrap justify-center gap-5 lg:gap-8 max-w-6xl mx-auto'>
        {books.map((book, index) => (
             <Link key={index} to={'/book/123'} className='block'>
                <div className='cursor-pointer w-36 md:w-40 xl:w-44 shadow-sm hover:shadow-md rounded-b-md'>
                   <div className='h-48 md:h-52 xl:h-60 bg-gray-900'>
                    <img/>
                   </div>
                   <div className='p-2'>
                    <h2 className='mb-2 font-semibold text-base md:text-lg'>The nice book</h2>
                    <p className='text-sm md:text-base'>John doe</p>
                   </div>
                </div>
             </Link>
        ))}
      </div>
    </div>
  )
}

export default BookList
