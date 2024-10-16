"use client";
import { useLoginMutation } from "@/app/redux/api/baseApi";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
    // const router = useRouter();
    const [login] = useLoginMutation();
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        const logindata = { email, password };

        const result = await login(logindata);
        const token = result?.data?.token;
        if (token) {
            Cookies.set("token", token, { expires: 7 });
            // router.push("/");
            if (result?.data?.data?.role === "admin") {
                window.location.href = "/adminDashboard";
            }
            else {

                window.location.href = "/";
            }
        }
    }
    return (

        <div className="flex h-screen">
            {/* Left Side (Login Information) */}
            <div className="bg-[#152733] text-white p-4 flex-[3] flex justify-center items-center">
                <div className="text-center max-w-md">
                    <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
                    <p className="text-sm">
                        Login to access your account and continue exploring amazing pet stories and tips. We missed you!
                    </p>
                </div>
            </div>

            {/* Right Side (Login Form) */}
            <div className="bg-[#ffffff] text-gray-600 p-4 flex-[5] flex justify-center items-center">
                <div className="w-full max-w-2xl">
                    <form onSubmit={handleLogin} className="p-6 bg-white shadow-lg rounded-md">
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-100 transition ease-in-out duration-150"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your Email"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-100 transition ease-in-out duration-150"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition ease-in-out duration-150">
                                Login
                            </button>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="mt-4 text-center">
                            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot your password?</a>
                        </div>

                        {/* Signup Link */}
                        <div className="mt-2 text-center">
                            <span className="text-sm">Don’t have an account? </span>
                            <span className="text-sm text-blue-500 hover:underline"> <Link href="/signup">Sign up here</Link>  </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
