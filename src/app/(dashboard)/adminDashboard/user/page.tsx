"use client";
import Image from "next/image";
import { useDeleteuserMutation, useGetallUserQuery } from "@/app/redux/api/baseApi";

type user = {
    _id: string;
    image: string;
    name: string;
    email: string;
    role: string;
};



const User = () => {
    const { data: users } = useGetallUserQuery({});
    const [deleteuser] = useDeleteuserMutation();

    const handleDelete = (id: string) => {
        console.log(`Delete user with id: ${id}`);
        const result = deleteuser(id);
        console.log(result);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl text-gray-600 mb-4">User List</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">Image</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Role</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.data?.map((user: user) => (
                        <tr key={user._id} className="text-center">
                            <td className="py-2 px-4 border">
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                            </td>
                            <td className="py-2 px-4 border">{user.name}</td>
                            <td className="py-2 px-4 border">{user.email}</td>
                            <td className="py-2 px-4 border">{user.role}</td>
                            <td className="py-2 px-4 border">
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;
