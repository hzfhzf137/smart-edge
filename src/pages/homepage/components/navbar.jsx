import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaExpand, FaBars } from 'react-icons/fa';
import smartEdgeLogo from '../../../assets/images/smartEdgeLogo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // To track scroll position

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    // Detect scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true); // Scroll down
            } else {
                setIsScrolled(false); // At top
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }

        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [isOpen]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300 ease-in-out ${
                isScrolled ? 'backdrop-blur-sm' : 'bg-blue-600 bg-opacity-50'
            } pr-2 pl-2`}
        >
            <nav className="flex items-center justify-between p-2 sm:p-2 md:p-3">
                <div className="flex items-center">
                    <Link to="/" onClick={closeMenu}>
                        <img
                            src={smartEdgeLogo}
                            alt="company logo"
                            className="w-36 h-14 object-contain" // Reduced logo size
                        />
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={scrollToTop}
                        className={`text-md sm:text-lg md:text-xl pr-2 transition duration-300 ${isScrolled ? 'text-blue-600' : 'text-white'}`} // Reduced icon size
                    >
                        <FaArrowUp />
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className={`hidden sm:block text-md sm:text-lg md:text-xl pr-2 transition duration-300 ${isScrolled ? 'text-blue-600' : 'text-white'}`} // Reduced icon size
                    >
                        <FaExpand />
                    </button>
                    <button
                        onClick={toggleMenu}
                        className={`text-xl sm:text-2xl md:text-2xl transition duration-300 ${isScrolled ? 'text-blue-600' : 'text-white'}`} // Reduced icon size
                    >
                        <FaBars />
                    </button>
                </div>
            </nav>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40 transition duration-300 ease-in-out"
                        onClick={closeMenu}
                    ></div>
                    <div
                        className={`fixed top-0 right-0 w-64 md:w-80 h-full bg-gray-800 text-white p-5 z-50 transition-transform transform ${
                            isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <button
                            onClick={toggleMenu}
                            className="absolute top-5 right-5 text-2xl sm:text-3xl md:text-4xl text-white hover:text-gray-400 transition duration-300"
                        >
                            &times;
                        </button>
                        <div className="flex flex-col h-full justify-between">
                            <ul className="mt-10 space-y-4 text-sm sm:text-base md:text-lg">
                                <li>
                                    <Link
                                        to="/"
                                        className="hover:text-gray-300 hover:border-b-2 hover:border-blue-600 transition duration-300"
                                        onClick={closeMenu}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/airpods"
                                        className="hover:text-gray-300 hover:border-b-2 hover:border-blue-600 transition duration-300"
                                        onClick={closeMenu}
                                    >
                                        Airpods
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/chargers"
                                        className="hover:text-gray-300 hover:border-b-2 hover:border-blue-600 transition duration-300"
                                        onClick={closeMenu}
                                    >
                                        Chargers
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact-us"
                                        className="hover:text-gray-300 hover:border-b-2 hover:border-blue-600 transition duration-300"
                                        onClick={closeMenu}
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                            <div className="text-xs sm:text-sm text-gray-500 border-t border-gray-700 pt-4">
                                <p>Designed by Huzaifa Mahmood</p>
                                <p>Email: <a href="mailto:hzfhzf137@gmail.com" className="hover:text-gray-400 transition duration-300">hzfhzf137@gmail.com</a></p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
};

export default Navbar;
