"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  useGetUserInfoQuery,
  useGetPostQuery,
  usePaymentPostMutation,
  useUpvotePostMutation,
  useDownvotePostMutation,
  useAddCommentMutation,
} from "../redux/api/baseApi";
import CreatePost from "@/components/CreatePost";
import { useRouter } from "next/navigation";

// Debounce function
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export type Post = {
  _id: string;
  title: string;
  content: string;
  image: string;
  authorName: string;
  auhtorImage: string;
  category: string;
  upvotes: number;
  downvotes: number;
  isPremium: boolean;
  published: boolean;
  comments: Comment[];
};

export type Comment = {
  _id: string;
  userId: string;
  content: string;
  authorName: string;
};

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { data: authorData } = useGetUserInfoQuery({});
  const { data: postsData } = useGetPostQuery({}); // Assuming the API supports pagination
  const [paymentPost] = usePaymentPostMutation();
  const [upvotePost] = useUpvotePostMutation();
  const [downvotes] = useDownvotePostMutation();
  const [addComment] = useAddCommentMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms debounce
  const [commentContent, setCommentContent] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [posts, setPosts] = useState<Post[]>([]); // Posts state
  const [hasMore, setHasMore] = useState(true); // Infinite scroll state

  useEffect(() => {
    if (postsData?.data) {
      setPosts(postsData.data.slice(0, 2)); // Initialize with first 10 posts
    }
  }, [postsData]);

  const fetchMorePosts = () => {
    if (postsData?.data) {
      const nextPagePosts = postsData.data.slice(currentPage * 2, (currentPage + 1) * 2);

      if (currentPage >= 2 || nextPagePosts.length === 0) { // Stop after 2 pages
        setHasMore(false); // Stop fetching if no more posts or page limit reached
      } else {
        setPosts((prevPosts) => [...prevPosts, ...nextPagePosts]);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };


  const handleViewDetails = async (post: Post) => {
    const postId = post?._id;
    const isPremium = post?.isPremium;

    if (isPremium) {
      try {
        console.log("isPremium", isPremium);
        const data = await paymentPost({ postId });
        console.log(data?.data?.data);
        if (data?.data?.data?.message === "Already made payment") {
          router.push(`/postDetails/${postId}`);
        } else {
          window.location.href = data?.data?.data?.paymentUrl;
        }
      } catch (error) {
        console.error("Error during payment initiation", error);
      }
    } else {
      router.push(`/postDetails/${postId}`);
    }
  };

  const handleUpVote = async (postId: string) => {
    const result = await upvotePost(postId);
    console.log(result);
  };

  const handleDownvote = async (postId: string) => {
    const result = await downvotes(postId);
    console.log(result);
  };

  const handleAddComment = async (postId: string) => {
    if (commentContent.trim()) {
      try {
        const result = await addComment({ postId, content: commentContent });
        console.log("Comment added:", result);
        setCommentContent(""); // Clear the input after adding the comment
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  // Filter posts based on the search query
  const filteredPosts = posts
    ?.filter(
      (post: Post) =>
        post.published &&
        (post.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
    )
    .sort((a: Post, b: Post) => b.upvotes - a.upvotes);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Search Input */}
      <div className="my-6">
        <input
          type="text"
          placeholder="Search posts title.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-6">
        <Image
          src={authorData?.data?.image}
          alt="Profile Picture"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{authorData?.name}</h2>
          <div className="text-gray-600">
            {authorData?.data?.follower} Followers · {authorData?.data?.following} Following
          </div>
        </div>
        <button
          onClick={() => { }}
          className="ml-auto px-4 py-2 text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-600"
        >
          Follow
        </button>
      </div>

      <CreatePost />

      {/* Post Section with Infinite Scroll */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">All User Posts</h3>

        <InfiniteScroll
          dataLength={filteredPosts.length} // This is the length of the current loaded posts
          next={fetchMorePosts} // Fetch more posts on scroll
          hasMore={hasMore} // Determines whether to continue fetching
          loader={<h4>Loading...</h4>} // Loading state
          endMessage={<p>No more posts to show</p>} // End message when no more posts
        >
          {filteredPosts.map((post: Post) => (
            <div key={post._id} className="relative mb-6 p-4 border rounded-lg shadow-sm">
              {post.isPremium && (
                <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  Premium
                </span>
              )}
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
                  <div className="flex justify-center items-center">
                    <Image
                      src={post?.image}
                      alt="Post Image"
                      width={400}
                      height={200}
                      className="mt-2 w-full h-96 rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4 mt-3">
                <button
                  className="flex items-center space-x-1 text-blue-500 cursor-pointer"
                  onClick={() => handleUpVote(post._id)}
                >
                  <span className="text-2xl">👍</span>
                  <span>{post?.upvotes}</span>
                </button>
                <button
                  className="flex items-center space-x-1 text-red-500 cursor-pointer"
                  onClick={() => handleDownvote(post._id)}
                >
                  <span className="text-2xl">👎</span>
                  <span>{post?.downvotes}</span>
                </button>
                <button
                  onClick={() => handleViewDetails(post)}
                  className="text-blue-500 cursor-pointer"
                >
                  View Details
                </button>
              </div>

              <div className="mt-4">
                <h5 className="font-semibold">Comments</h5>
                <div className="ml-4">
                  {post?.comments.map((comment: Comment) => (
                    <p key={comment._id} className="text-gray-700 mb-1">
                      <span className="font-bold">{comment.authorName}: </span>
                      {comment.content}
                    </p>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={() => handleAddComment(post._id)}
                  className="mt-2 px-4 py-2 text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProfilePage;
