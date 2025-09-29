import React from 'react';


function PortfolioItem({ title, imgUrl, stack, link }) {
    return (
        <a
            href={link}
            className="block border-2 border-stone-900 dark:border-stone-100 rounded-md my-5 overflow-hidden  
            transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img 
                src={imgUrl} 
                alt='Portfolio' 
                className="w-300 h-70 md:100 p-5 object-cover cursor-pointer" 
            />

            <div className="w-full p-4">
                <h3 className="text-lg md:text-xl mb-2 md:mb-3 font-semibold">{title}</h3>
                <p className="flex flex-wrap gap-2 flex-row items-center justify-start text-xs md:text-sm text-sm text-gray-600">
                    {stack.map(item => (
                        <span key={item} className="inline-block px-2 py-1 font-semibold border-2 border-stone-300 dark:text-stone-300 rounded-md">
                            {item}
                        </span>
                    ))}
                </p>
            </div>
        </a>
    )
}


export default PortfolioItem;