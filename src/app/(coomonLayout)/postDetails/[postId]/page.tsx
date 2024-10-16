"use client";
import { useGetPostQuery } from '@/app/redux/api/baseApi';
import Image from 'next/image';
import { Post } from '../../page';

const SinglePostPage = ({ params }: { params: { postId: string } }) => {
    const { data: post } = useGetPostQuery({});

    // Find the specific post based on postId from params
    const getSinglePost = post?.data?.find((p: Post) => p._id === params?.postId);

    if (!getSinglePost) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 space-y-8">
                {/* Post Title */}
                <h1 className="text-4xl font-bold mb-6 text-gray-900 leading-tight text-center">
                    {getSinglePost.title}
                </h1>

                {/* Author Section */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                    <Image
                        src={getSinglePost.auhtorImage}
                        alt={getSinglePost.authorName}
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="text-lg font-medium text-gray-600">{getSinglePost.authorName}</span>
                </div>

                {/* Post Image */}
                <div className="overflow-hidden rounded-lg">
                    <Image
                        src={getSinglePost.image || '/default-image.png'}
                        alt={getSinglePost.title}
                        width={800}
                        height={450}
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Post Content */}
                <div className="text-lg text-gray-700 leading-relaxed tracking-wide">
                    <p>{getSinglePost.content}</p>
                </div>

                {/* Post Details: Upvotes, Downvotes, Category */}
                <div className="flex justify-between items-center border-t pt-6">
                    <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                            <strong>Category:</strong> {getSinglePost.category}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Premium:</strong> {getSinglePost.isPremium ? "Yes" : "No"}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Published:</strong> {getSinglePost.published ? "Yes" : "No"}
                        </p>
                    </div>
                    <div className="flex space-x-6 text-sm text-gray-600">
                        <p className="text-green-600">
                            <strong>Upvotes:</strong> {getSinglePost.upvotes}
                        </p>
                        <p className="text-red-600">
                            <strong>Downvotes:</strong> {getSinglePost.downvotes}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePostPage;
