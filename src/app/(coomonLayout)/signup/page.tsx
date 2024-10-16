"use client";
import { useSignupMutation } from "@/app/redux/api/baseApi"; // Adjust the import path according to your project structure
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [signup] = useSignupMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);

    // try {
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const image = formData.get("image")?.toString();


    // Log form data for debugging purposes
    // const imageName = image.name;
    // console.log({ name, email, password, imageName });

    const userData = {
      name,
      email,
      password,
      image: image,

    }

    signup(userData)
    router.push("/login");

  };

  return (
    <div className="flex h-screen">
      {/* Left Side (Signup Information) */}
      <div className="bg-[#152733] text-white p-4 flex-[3] flex justify-center items-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Signup Page</h2>
          <p className="text-sm">
            Join us today and explore the world of possibilities!
          </p>
        </div>
      </div>

      {/* Right Side (Signup Form) */}
      <div className="bg-[#ffffff] text-gray-600 p-4 flex-[5] flex justify-center items-center">
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-md">
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-100 transition ease-in-out duration-150"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-100 transition ease-in-out duration-150"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-100 transition ease-in-out duration-150"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Image */}

            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-100 transition ease-in-out duration-150"
                type="text"
                name="image"
                id="image"
                placeholder="Enter your image link"
                required
              />
            </div>

            {/* Error Message */}
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button

                className={`px-4 py-2 bg-blue-500 text-white rounded-md transition ease-in-out duration-150  `}

              >
                Signup
              </button>
            </div>

            <span className="py-3 block text-center">
              Already have an account?{" "}
              <span className="text-blue-500">
                <Link href="/login">Login</Link>
              </span>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
