"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useGetUserInfoQuery } from "@/app/redux/api/baseApi";
const AdminNavbar = () => {
    const { data: authorData } = useGetUserInfoQuery({})
    const [isSidebarOpen, setSidebarOpen] = useState(false); // Manage sidebar visibility
    const [isDropdownOpen, setDropdownOpen] = useState(false); // Manage dropdown visibility

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        Cookies.remove("token");
        window.location.href = "/login";
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside
                className={`bg-blue-700 text-white w-64 p-4 fixed top-0 left-0 h-full lg:static lg:h-auto lg:flex flex-col justify-center items-center transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 z-40`}
            >
                <nav className="mt-16 lg:mt-0"> {/* Adjust margin to avoid overlapping the navbar */}
                    <ul className="flex flex-col justify-center items-center">
                        <li className="py-2">
                            <Link href="/adminDashboard/user" className="hover:text-gray-300">
                                Users
                            </Link>
                        </li>
                        <li className="py-2">
                            <Link href="/adminDashboard/post" className="hover:text-gray-300">
                                All Posts
                            </Link>
                        </li>
                        <li className="py-2">
                            <Link href="/adminDashboard/payment" className="hover:text-gray-300">
                                Payment History
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="bg-blue-600 text-white p-4 flex justify-between items-center w-full fixed top-0 left-0 z-50">
                    {/* Hamburger Menu Icon (visible on smaller screens) */}
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden text-white focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <div className="text-xl font-semibold">Admin Dashboard</div>

                    {/* Profile Image with Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2 focus:outline-none"
                            onClick={toggleDropdown}
                        >
                            <Image
                                src={authorData?.data?.image}
                                width={32}
                                height={32}
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <span>Admin</span>
                        </button>
                        {/* Dropdown (Logout button) */}
                        {isDropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg z-50">
                                <li>
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </header>
            </div>

            {/* Overlay when sidebar is open on small screens */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default AdminNavbar;
