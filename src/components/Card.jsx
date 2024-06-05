import React from 'react'

const Card = ({book , handler}) => {
  return (
    <div className='border flex flex-col items-center gap-5 py-5 px-7 rounded-lg w-[300px] bg-gray-700' key={book.cover_i}>
      <div className='flex flex-col'>
         <div><span className='font-extrabold text-zinc-300'>Book Title</span>:{" "}{book.title} </div>
         <div><span className='font-extrabold text-zinc-300'>Author Name</span> : {book.author_name?.[0]} </div>
         <div><span className='font-extrabold text-zinc-300'>Edition Count</span> : {book.edition_count}</div>
      </div>
      <div>
            <button onClick={()=>handler(book)} className='border py-2 px-5 rounded-lg bg-gray-900 bg-'>Add to BookShelf</button>
         </div>
    </div>
  )
}

export default Card
