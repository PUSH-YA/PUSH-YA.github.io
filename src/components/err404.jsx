import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-900">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-stone-900 dark:text-stone-100 mb-4">404 :(</h1>
                <h2 className="text-4xl font-semibold text-stone-500 mb-8">Page Not Found</h2>
                <p className="text-xl text-stone-500 mb-8">
                    The page you're looking for doesn't exist.
                    <br/>
                    Enjoy the following visualisation though:
                </p>
                    
                {/* add a small game to play here */}

                <Link 
                    to="/" 
                    className="bg-violet-400 dark:bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default Error404;