"use client";
import { useRouter } from "next/navigation";
import { useGetPostQuery, useGetUserInfoQuery } from "@/app/redux/api/baseApi";
import Image from "next/image";
import { Post } from "../../page";

const ProfileSection: React.FC = () => {
    // Fetch user info and posts
    const { data: userInfo, error: userError, isLoading: userLoading } = useGetUserInfoQuery({});
    const { data: posts, error: postsError, isLoading: postsLoading } = useGetPostQuery({});
    const router = useRouter();
    if (userLoading || postsLoading) return <p className="text-center text-lg">Loading...</p>;
    if (userError || postsError) return <p className="text-center text-red-500">Something went wrong!</p>;

    return (
        <div className="profile-section max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            {/* Profile Information */}
            <div className="user-info mb-8 border-b pb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
                <div className="text-[16px] text-gray-700">
                    <p className="mb-2">Name: {userInfo?.data?.name}</p>
                    <p className="mb-2"><span>Email:</span> {userInfo?.data?.email}</p>
                    <p className="mb-2"><span>Followers:</span> {userInfo?.data?.followers?.length || 0}</p>
                    <p className="mb-2"><span>Following:</span> {userInfo?.data?.following?.length || 0}</p>
                </div>
            </div>

            {/* User Posts */}
            <div className="user-posts">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Posts</h3>
                {posts && posts?.data?.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {posts?.data?.map((post: Post) => (
                            <div key={post._id} className="mb-6 p-4 border rounded-lg shadow-sm">
                                <div className="flex items-center space-x-3">
                                    <Image
                                        src={post?.auhtorImage}
                                        alt="Author Profile"
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span className="font-semibold">{post?.authorName}</span>
                                </div>
                                <div className="mt-2">
                                    <h4 className="text-lg font-bold">{post.title}</h4>
                                    <p className="text-gray-800">{post.content}</p>
                                    {post.image && (
                                        <Image
                                            src={post?.image}
                                            alt="Post Image"
                                            width={500}
                                            height={300}
                                            className="mt-2 w-full rounded-lg object-cover"
                                        />
                                    )}
                                </div>
                                {/* Voting Section */}
                                <div className="flex items-center space-x-4 mt-3">
                                    <button className="flex items-center space-x-1 text-blue-500">
                                        <span>👍</span>
                                        <span>{post?.upvotes}</span>
                                    </button>
                                    <button className="flex items-center space-x-1 text-red-500">
                                        <span>👎</span>
                                        <span>{post?.downvotes}</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No posts available.</p>
                )}
            </div>

            {/* Button to Edit Profile */}
            <div className="mt-8 text-center">
                <button
                    className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => router.push("/userProfile/editProfile")}
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default ProfileSection;
