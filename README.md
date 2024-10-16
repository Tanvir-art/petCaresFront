# PetCare Frontend - React & TypeScript

Welcome to the **PetCare** frontend application, built with **React** and **TypeScript**. This project is the client-side implementation of the PetCare platform, allowing users to search posts, upvote/downvote posts, leave comments, and interact with the admin dashboard. The app also includes user authentication and admin-level controls.

## Features

### User Features
- **Debounced Search**: Users can search for posts with a debounced input, reducing the number of API requests for better performance.
- **Upvote & Downvote System**: Users can upvote or downvote posts based on their preferences.
- **Comment System**: Users can comment on posts and engage in discussions.
- **Authentication Middleware**: Secure routes are protected with authentication, ensuring that only logged-in users can access certain functionalities.

### Admin Features
- **Admin Dashboard**: Admin users have access to a dashboard to manage posts, comments, and users. Admin privileges include editing and deleting posts and comments.

## Technologies Used

- **React**: A powerful frontend library for building user interfaces.
- **TypeScript**: For adding static types to JavaScript, improving the development experience and reducing runtime errors.
- **Redux**: For managing the global state across the application.
- **React Router**: For handling page navigation.
- **Axios**: For making HTTP requests to the backend API.
- **Tailwind CSS**: A utility-first CSS framework for building responsive and modern UIs.

## Key Libraries & Concepts

- **Debounce**: Debouncing has been implemented in the search bar to delay API calls until the user has stopped typing, optimizing performance.
- **Upvote & Downvote System**: Users can upvote or downvote posts, with visual feedback reflecting the post’s current score.
- **Comment System**: Users can add comments to posts, fostering community interaction.
- **Authentication Middleware**: Routes and components are protected using an authentication middleware to ensure only authorized users can perform certain actions.
- **Admin Dashboard**: Admins can manage platform content through an intuitive dashboard.

## Project Structure

This project follows a **component-based architecture**, with reusable components to keep the codebase clean and organized. It uses **Redux** for state management, ensuring that the application scales effectively as it grows.

- **Components**: Reusable UI components, such as PostList, CommentBox, and AdminDashboard.
- **Pages**: Different views such as Home, PostDetail, Login, and AdminDashboard.
- **Services**: API service files for handling HTTP requests (using Axios).
- **Redux Store**: Contains all the global state management logic for authentication, posts, comments, and admin actions.

 

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- A running backend API (refer to the [PetCare Backend Repository](https://github.com/Tanvir-art/petCaresBack.git))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tanvir-art/petCaresFront.git
   cd petCaresFront
