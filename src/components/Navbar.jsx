import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';

function Navbar() {

    const [theme, setTheme] = useState('light'); // Default to light theme

  // match window theme 
	useEffect(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}, []);

  // theme switcher 
	const handleThemeSwitch = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
	};

  // add appropriate theme
	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else if (theme === 'light') {
			document.documentElement.classList.remove('dark');
		}
	}, [theme]);

    const sun = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#1c1917" // stone-900 hex color
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
        </svg>
    );

	const moon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="white"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
			/>
		</svg>
	);

    return (
        <nav className="fixed top-0 left-10 right-10 z-20 
        flex bg-stone-100 dark:bg-stone-900 items-center justify-between font-semibold px-4 py-2">
            {/* Left side: Home */}
            <div className="mx-5">
                <Link
                    to="/"
                    className="mr-6 text-black dark:text-white transform transition-all
                    duration-200 ease-in-out hover:text-violet-400 dark:hover:text-blue-400 hover:scale-105 hover:drop-shadow-lg inline-block"
                    >
                        <img src="/assets/pfp.png" alt="Profile" className="w-12 h-12 rounded-full hover:scale-110" />
                </Link>
            </div>

            {/* Right side: Resume, Courses, Projects */}
            <div className="flex flex-row space-x-6 mx-5">
                <Link
                    to="/resume"
                    className="text-black dark:text-white transform transition-all
                    duration-200 ease-in-out hover:text-violet-400 dark:hover:text-blue-400 hover:scale-110 hover:drop-shadow-lg inline-block"
                    >
                    Resume
                </Link>
                <Link
                    to="/projects"
                    className="text-black dark:text-white transform transition-all
                    duration-200 ease-in-out hover:text-violet-400 dark:hover:text-blue-400 hover:scale-105 hover:drop-shadow-lg inline-block"
                    >
                    Projects
                </Link>
                {/* DONT WANNA USE GETFORM'S 25 SUBMISSIONS  */}
                {/* <Link
                    to="/contact"
                    className="text-black dark:text-white transform transition-all
                    duration-200 ease-in-out hover:text-violet-400 dark:hover:text-blue-400 hover:scale-105 hover:drop-shadow-lg inline-block"
                    >
                    Contact
                </Link> */}

                {/* dark mode button */}
                <button
                        type="button"
                        onClick={handleThemeSwitch}
                        className="bg-violet-400 dark:bg-blue-400 text-lg p-1 rounded-md hover:scale-110"
                    >
                        {theme === 'dark' ? sun : moon}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;

