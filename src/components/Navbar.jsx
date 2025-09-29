import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';

function Navbar() {

    const [theme, setTheme] = useState('light'); // Default to light theme
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const hamburgerIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
        </svg>
    );

    const closeIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
        <nav className="fixed top-0 left-2 right-2 sm:left-6 sm:right-6 lg:left-10 lg:right-10 z-20 
        flex bg-stone-100 dark:bg-stone-900 items-center justify-between font-semibold px-3 py-2 sm:px-4 rounded-b-lg shadow-lg">
            {/* Left side: Home */}
            <div className="flex items-center">
                <Link
                    to="/"
                    className="text-black dark:text-white transform transition-all
                    duration-200 ease-in-out hover:text-violet-400 dark:hover:text-blue-400 hover:scale-105 hover:drop-shadow-lg inline-block"
                    onClick={closeMobileMenu}
                >
                    <img src="/assets/pfp.png" alt="Profile" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full hover:scale-110 transition-transform duration-200" />
                </Link>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex flex-row items-center space-x-4 lg:space-x-6">
                <Link
                    to="/resume"
                    className="text-black dark:text-white text-sm lg:text-base transform transition-all
                    duration-200 ease-in-out hover:text-violet-400 dark:hover:text-blue-400 hover:scale-110 hover:drop-shadow-lg inline-block"
                >
                    Resume
                </Link>
                <Link
                    to="/projects"
                    className="text-black dark:text-white text-sm lg:text-base transform transition-all
                    duration-200 ease-in-out hover:text-violet-400 dark:hover:text-blue-400 hover:scale-105 hover:drop-shadow-lg inline-block"
                >
                    Projects
                </Link>
                
                {/* Dark mode button for desktop */}
                <button
                    type="button"
                    onClick={handleThemeSwitch}
                    className="bg-violet-400 dark:bg-blue-400 text-lg p-1.5 lg:p-2 rounded-md hover:scale-110 transition-transform duration-200"
                >
                    {theme === 'dark' ? sun : moon}
                </button>
            </div>

            {/* Mobile Navigation - Right side */}
            <div className="md:hidden flex items-center space-x-3">
                {/* Dark mode button for mobile */}
                <button
                    type="button"
                    onClick={handleThemeSwitch}
                    className="bg-violet-400 dark:bg-blue-400 p-1.5 rounded-md hover:scale-110 transition-transform duration-200"
                >
                    {theme === 'dark' ? sun : moon}
                </button>
                
                {/* Hamburger menu button */}
                <button
                    type="button"
                    onClick={toggleMobileMenu}
                    className="text-black dark:text-white p-1 hover:text-violet-400 dark:hover:text-blue-400 transition-colors duration-200"
                >
                    {isMobileMenuOpen ? closeIcon : hamburgerIcon}
                </button>
            </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
            <div className="fixed inset-0 z-10 md:hidden">
                {/* Backdrop */}
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
                    onClick={closeMobileMenu}
                ></div>
                
                {/* Mobile Menu */}
                <div className="fixed top-16 left-2 right-2 sm:left-6 sm:right-6 bg-stone-100 dark:bg-stone-900 rounded-lg shadow-xl p-4 space-y-4">
                    <Link
                        to="/resume"
                        className="block text-black dark:text-white text-lg py-3 px-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-violet-400 dark:hover:text-blue-400 transition-all duration-200"
                        onClick={closeMobileMenu}
                    >
                        Resume
                    </Link>
                    <Link
                        to="/projects"
                        className="block text-black dark:text-white text-lg py-3 px-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-violet-400 dark:hover:text-blue-400 transition-all duration-200"
                        onClick={closeMobileMenu}
                    >
                        Projects
                    </Link>
                </div>
            </div>
        )}
        </>
    );
}

export default Navbar;

