"use client";
import { useCreatePostMutation } from "@/app/redux/api/baseApi";
import dynamic from "next/dynamic";
import { useState } from "react";
import 'react-quill/dist/quill.snow.css'; // Import react-quill styles

// Dynamic import of react-quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreatePost = () => {
    const [postContent, setPostContent] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('Tip');
    const [isPremium, setIsPremium] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

    const [createPost] = useCreatePostMutation();
    // const { data: authorData } = useGetUserInfoQuery({});
    // const authorId = authorData?.data?._id;
    // console.log(authorId)
    // Handle post submission

    const stripHtml = (html: string) => {
        // Remove <p> tags and replace &nbsp;
        const cleanText = html.replace(/<\/?p>/g, '').replace(/&nbsp;/g, ' ');
        return cleanText.trim(); // Remove extra spaces
    };


    const handleSubmitPost = async () => {
        if (!title || !postContent) {
            console.log('Please enter title and content');
            return;
        }
        // if (!authorId) {
        //     alert('Please login to create a post');
        //     return;
        // }
        try {
            const cleanedContent = stripHtml(postContent);
            const data = { title, image, content: cleanedContent, category, isPremium }
            const result = await createPost(data);
            console.log(result)

            // Clear form
            setTitle('');
            setImage('');
            setPostContent('');
            setCategory('Tip');
            setIsPremium(false);
            setModalOpen(false); // Close modal after submission
        } catch (error) {
            console.error('Failed to create post:', error);
            alert('Error creating post');
        }
    };

    // Modal Close Handler
    const closeModal = () => setModalOpen(false);
    return (
        <div>
            {/* What's on your mind? (Trigger for modal) */}
            <div
                onClick={() => setModalOpen(true)} // Open modal on click
                className="mt-8 border p-4 rounded text-gray-500 cursor-pointer hover:bg-gray-50"
            >
                Whats on your mind?
            </div>

            {/* Create Post Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">Create Post</h3>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                                ✖
                            </button>
                        </div>

                        {/* Post Title Input */}
                        <input
                            type="text"
                            placeholder="Post Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded mb-4 mt-4"
                        />


                        {/* Post Title Input */}
                        <input
                            type="text"
                            placeholder="image link here"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full p-2 border rounded mb-4 mt-4"
                        />

                        {/* Category Selection */}
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        >
                            <option value="Tip">Tip</option>
                            <option value="Story">Story</option>
                        </select>

                        {/* Premium Post Toggle */}
                        <label className="flex items-center space-x-2 mb-4">
                            <input
                                type="checkbox"
                                checked={isPremium}
                                onChange={() => setIsPremium(!isPremium)}
                            />
                            <span>Premium Post</span>
                        </label>

                        {/* Rich Text Editor for Post Content */}
                        <ReactQuill
                            value={postContent}
                            onChange={setPostContent}
                            placeholder="Write your post content here..."
                            className="mb-4"
                        />

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmitPost}
                            className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                        >
                            Submit Post
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default CreatePost
