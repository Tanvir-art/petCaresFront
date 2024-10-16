"use client";
import Image from 'next/image';
import { useDeletePostMutation, useGetPostQuery, usePublishPostMutation, useUnpublishPostMutation } from '@/app/redux/api/baseApi';
type Post = {
  _id: string;
  title: string;
  content: string;
  image: string;
  published: boolean;
};

const Post = () => {
  const { data: posts, isLoading, error } = useGetPostQuery({}); // Fetch posts using Redux API
  const [deletePost] = useDeletePostMutation(); // Hook for deleting a post
  const [publishPost] = usePublishPostMutation();
  const [unpublishPost] = useUnpublishPostMutation();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  const handleDelete = async (id: string) => {
    // console.log(`Delete post with id: ${id}`);
    const result = await deletePost(id);
    console.log(result)

  };

  const handlePublish = async (id: string) => {
    const result = await publishPost(id);
    console.log(result)
  }

  const handleUnpublish = async (id: string) => {

    const result = await unpublishPost(id);
    console.log(result)
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl text-gray-600 mb-4">Post List</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Publish</th>
            <th className="py-2 px-4 border">Unpublish</th>
            <th className="py-2 px-4 border">Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts?.data.map((post: Post) => (
            <tr key={post._id} className="text-center">
              <td className="py-2 px-4 border">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </td>
              <td className="py-2 px-4 border">{post.title}</td>
              <td className="py-2 px-4 border">
                <button onClick={() => handlePublish(post._id)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Publish

                </button>
              </td>
              <td className="py-2 px-4 border">
                <button onClick={() => handleUnpublish(post._id)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Unpublish
                </button>
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleDelete(post._id)}
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

export default Post;
