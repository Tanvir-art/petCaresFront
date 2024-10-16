import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { RootState } from "../store"; // Ensure you have the correct path to your RootState
import Cookies from "js-cookie";
// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: (args, api, extraOptions) => {
    const token = Cookies.get("token");

    return fetchBaseQuery({
      baseUrl: "https://petcaressss.vercel.app/api", // Ensure the protocol is included
      prepareHeaders: (headers) => {
        if (token) {
          headers.set("Authorization", token); // Set the token in the header
        }
        return headers;
      },
    })(args, api, extraOptions);
  },
  tagTypes: ["user", "post", "comment"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/users/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: "/users/user/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getallUser: builder.query({
      query: () => ({
        url: "/users/getAllUser",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    deleteuser: builder.mutation({
      query: (id) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    updateuser: builder.mutation({
      query: (user) => ({
        url: "/users/update",
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
    getPost: builder.query({
      query: () => ({
        url: "/posts/getAllPost", // Fetch posts
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts/create",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["post"],
    }),
    publishPost: builder.mutation({
      query: (id) => ({
        url: `/posts/publish/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["post"],
    }),
    unpublishPost: builder.mutation({
      query: (id) => ({
        url: `/posts/unpublish/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["post"],
    }),
    upvotePost: builder.mutation({
      query: (id) => ({
        url: `/posts/upvote/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["post"],
    }),
    downvotePost: builder.mutation({
      query: (id) => ({
        url: `/posts/downvote/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
    paymentPost: builder.mutation({
      query: (PostId) => ({
        url: `/payment/create`,
        method: "POST",
        body: PostId,
      }),
    }),
    getAllPayment: builder.query({
      query: () => ({
        url: "/payment/getAllBooking",
        method: "GET",
      }),
    }),
    addComment: builder.mutation({
      query: ({ postId, content }) => ({
        url: `/comment/comments`,
        method: "POST",
        body: { postId, content },
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLoginMutation,
  useSignupMutation,
  useGetUserInfoQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdateuserMutation,
  useGetallUserQuery,
  useDeleteuserMutation,
  usePublishPostMutation,
  useUnpublishPostMutation,
  useDeletePostMutation,
  usePaymentPostMutation,
  useGetAllPaymentQuery,
  useUpvotePostMutation,
  useDownvotePostMutation,
  useAddCommentMutation,
} = baseApi;
