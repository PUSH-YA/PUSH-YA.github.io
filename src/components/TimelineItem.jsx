import React from 'react';

function TimelineItem({year, title, duration, details}) {
    return (
        <ol className="flex flex-col md:flex-row relative border-l border-stone-500 dark:border-stone-300">
            <li className='mb-10 ml-4 group'>
                {/* the div is the circle */}
                <div className="absolute w-3 h-3 bg-stone-500 dark:bg-stone-300 rounded-full mt-1.5 -left-1.5 border border-stone-500 
                    transition-colors duration-200 group-hover:bg-violet-400 dark:group-hover:bg-blue-400"></div>
                
                <div className="flex flex-wrap gap-4 flex-row items-center justify-start text-xs md:text-sm">
                    {/* this is for the year tags */}
                    <span className='inline-block px-2 py-1 font-semibold text-stone-100 bg-stone-900 dark:bg-stone-100 
                                        dark:text-stone-900 rounded-md transition-colors duration-200  group-hover:bg-violet-400 dark:group-hover:bg-blue-400'>
                        {year}
                    </span>
                    <h3 className='text-lg font-semibold text-stone-900 dark:text-stone-100 transition-colors duration-200 group-hover:text-violet-400 dark:group-hover:text-blue-400'>
                        {title}
                    </h3>
                    <div className='my-1 text-sm font-normal leading-none text-stone-900 dark:text-stone-100 transition-colors duration-200 group-hover:text-violet-400 dark:group-hover:text-blue-400'>
                        {duration}
                    </div>
                </div>
                <p className='my-2 text-base font-normal text-stone-900 dark:text-stone-100 transition-colors duration-200 group-hover:text-violet-400 dark:group-hover:text-blue-400'>
                    {details}
                </p>
            </li>
        </ol>
    )
}

export default TimelineItem;