"use client";
import { useUpdateuserMutation } from "@/app/redux/api/baseApi";
import { useState } from "react";
// import { useRouter } from "next/router";

const EditProfile: React.FC = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [updateuser] = useUpdateuserMutation();

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = { name, image };
        const result = await updateuser(userData);
        console.log(result);
    };

    return (
        <div className="edit-profile-section max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-wide">Edit Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="form-group">
                    <label htmlFor="name" className="block text-[16] font-semibold text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>



                {/* Phone Input */}
                <div className="form-group">
                    <label htmlFor="image" className="block text-[16] font-semibold text-gray-700">Image</label>
                    <input
                        type="text"
                        id="image"
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>



                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
