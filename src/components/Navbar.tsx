"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetUserInfoQuery } from "@/app/redux/api/baseApi";
import Cookies from "js-cookie"; // Import js-cookie for handling cookies

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const { data: authorData } = useGetUserInfoQuery({}); // Fetch user info

    const handleLogout = () => {
        Cookies.remove("token");
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                {/* Left side - Logo */}
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-xl font-bold hover:text-gray-200">
                        Per-Cares
                    </Link>
                </div>

                {/* Hamburger Icon for mobile */}
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                        className="focus:outline-none text-white"
                    >
                        {/* Toggle between Hamburger and Close icon */}
                        {isMobileMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Centered Menu Links for desktop */}
                <div className="hidden lg:flex items-center justify-center space-x-6 flex-1">
                    <Link href="/" className="hover:text-gray-200">
                        Home
                    </Link>
                    <Link href="/about" className="hover:text-gray-200">
                        About Us
                    </Link>
                    <Link href="/contact" className="hover:text-gray-200">
                        Contact Us
                    </Link>
                </div>

                {/* Right side - Profile or Login */}
                <div className="relative hidden lg:block">
                    {authorData ? ( // Check if authorData is available
                        <>
                            <div
                                className="flex items-center cursor-pointer space-x-2"
                                onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                            >
                                <Image
                                    src={authorData?.data?.image}
                                    alt="User Profile"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                                <span>Profile</span>
                            </div>

                            {/* Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg"
                                    onMouseEnter={() => setProfileDropdownOpen(true)}
                                    onMouseLeave={() => setProfileDropdownOpen(false)}
                                >
                                    <Link
                                        href="/userProfile/profile"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        User Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link href="/login" className="hover:text-gray-200">
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden flex flex-col items-center bg-blue-700 py-4 space-y-4">
                    <Link href="/" className="text-white hover:text-gray-200">
                        Home
                    </Link>
                    <Link href="/about" className="text-white hover:text-gray-200">
                        About Us
                    </Link>
                    <Link href="/contact" className="text-white hover:text-gray-200">
                        Contact Us
                    </Link>

                    {/* Mobile Profile or Login */}
                    <div className="relative">
                        {authorData ? ( // Check if authorData is available
                            <>
                                <button
                                    className="text-white"
                                    onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                                >
                                    Profile
                                </button>

                                {isProfileDropdownOpen && (
                                    <div className="mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            User Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link href="/login" className="text-white hover:text-gray-200">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
