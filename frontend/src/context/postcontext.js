import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuthContext } from "./authcontext";
const SET_POSTS = "SET_POSTS";
const ADD_POSTS = "ADD_POSTS";
const SET_TOTAL_POSTS = "SET_TOTAL_POSTS";
const SET_HAS_MORE = "SET_HAS_MORE";
const SET_OFFSET = "SET_OFFSET";
const SET_POST = "SET_POST";
const DELETE_POST = "DELETE_POST";
const UPDATE_POST = "UPDATE_POST";
const ADD_POST = "ADD_POST";

export const PostContext = React.createContext();
const initialState = {
  posts: [],
  post: null,
  offset: 3,
  hasMore: true,
  totalPosts: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ADD_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };
    case SET_TOTAL_POSTS:
      return {
        ...state,
        totalPosts: action.payload,
      };
    case SET_HAS_MORE:
      return {
        ...state,
        hasMore: action.payload,
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload,
      };

    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    default:
      return state;
  }
};
export const PostProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { user } = useAuthContext();
  //get posts length
  const getTotalPosts = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/post/length";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Posts from getTotalPosts", response.data.length);
      dispatch({
        type: SET_TOTAL_POSTS,
        payload: response.data.length,
      });
    } catch (err) {
      console.log(err);
    }
  };
  // Get All Posts
  const getPosts = async () => {
    try {
      const url =
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/api/v1/post/?offset=" +
        0 +
        "&limit=3";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Posts from getPosts", response.data.posts);

      dispatch({ type: SET_POSTS, payload: response.data.posts });
    } catch (err) {
      console.log(err);
    }
  };
  //add posts
  const addPosts = async () => {
    try {
      const url =
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/api/v1/post/?offset=" +
        state.offset +
        "&limit=3";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(
        "Offset from addPosts",
        state.offset,
        response.data.posts,
        url
      );
      dispatch({ type: ADD_POSTS, payload: response.data.posts });
      if (response.data.posts.length === 0) {
        dispatch({ type: SET_HAS_MORE, payload: false });
      } else {
        dispatch({ type: SET_HAS_MORE, payload: true });
      }
      dispatch({ type: SET_OFFSET, payload: state.offset + 3 });
    } catch (err) {
      console.log(err);
    }
  };
  // Get Single Post
  const getPost = async (id) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/post/${id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Post from getPost", response.data);
      dispatch({ type: SET_POST, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
  // Create Post
  const createPost = async (form) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/post/create";
      const response = await axios.post(
        url,
        { user: user, ...form },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Post from createPost", state.posts, response.data.newPost);
      //getPosts();
      //set posts

      dispatch({ type: ADD_POST, payload: response.data.newPost });
      return response.data.newPost;
    } catch (err) {
      console.log(err);
      if (err.response.message) {
        throw new Error(err.response.message);
      } else {
        throw new Error("Something went wrong! Please try again.");
      }
    }
  };
  // Update Post
  const updatePost = async (id, form) => {
    try {
      const url =
        process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/post/update/${id}`;
      const response = await axios.put(
        url,
        { ...form },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Post from updatePost", response.data);
      dispatch({ type: UPDATE_POST, payload: response.data.post });
    } catch (err) {
      console.log(err);
    }
  };
  // Delete Post
  const deletePost = async (id) => {
    try {
      const url =
        process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/post/delete/${id}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Post from deletePost", response.data);
      dispatch({ type: DELETE_POST, payload: id });
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong! Please try again.");
    }
  };
  // poll
  const votePoll = async ({ postId, optionId }) => {
    try {
      const url =
        process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/post/vote/${postId}`;
      const response = await axios.put(
        url,
        { optionId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Post from vote", response.data);
    } catch (err) {
      console.log(err);
      if (err.response.message) {
        throw new Error(err.response.message);
      } else throw new Error("Something went wrong! Please try again.");
    }
  };
  //unvote poll
  const unvotePoll = async ({ postId }) => {
    console.log("Unvote Poll", postId);
    try {
      const url =
        process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/post/unvote/${postId}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Response from unvote", response.data);
    } catch (err) {
      console.log(err);
      if (err.response.message) {
        throw new Error(err.response.message);
      } else throw new Error("Something went wrong! Please try again.");
    }
  };
  //update poll post
  const updatePollPost = async (data) => {
    console.log("Update Poll Post", data);
    dispatch({ type: UPDATE_POST, payload: data });
  };
  //Upload to Cloud
  const uploadToCloud = async ({ file, type }) => {
    if (type.general == "video") {
      const data = new FormData();
      data.append("file", file);
      data.append("folder", type.type);
      data.append("upload_preset", "upload");
      const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL + "/video/upload";
      const response = await axios.post(url, data);
      return response.data.secure_url;
    } else if (type.general == "image") {
      const data = new FormData();
      data.append("file", file);
      data.append("folder", type.type);
      data.append("upload_preset", "upload");
      const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL + "/image/upload";
      const response = await axios.post(url, data);
      return response.data.secure_url;
    } else if (type.general == "raw") {
      const data = new FormData();
      data.append("file", file);
      data.append("folder", type.type);
      data.append("upload_preset", "upload");
      const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL + "/raw/upload";
      const response = await axios.post(url, data);
      return response.data.secure_url;
    }
  };
  const addComment = async ({ postId, comment }) => {
    console.log("Add Comment", postId, comment);
    try {
      const url =
        process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/comment/create`;
      const resp = await axios.post(
        url,
        { postId, content: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Comment from addComment", resp.data);
      //search for the post
      const post = state.posts.find((post) => post._id === postId);
      post.comments.push(resp.data.newComment);
      dispatch({ type: UPDATE_POST, payload: post });
    } catch (err) {
      console.log(err);
    }
  };
  const addReply = async ({ postId, commentId, content }) => {
    console.log("Add Reply", postId, commentId, content);
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/reply/create`;
      const resp = await axios.post(
        url,
        { postId, commentId, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Reply from addReply", resp.data);
      //search for the post
      const post = state.posts.find((post) => post._id === postId);
      const comment = post.comments.find((com) => com._id === commentId);
      comment.replies.push(resp.data.reply);
      // make changes to the post
      post.comments = post.comments.map((com) =>
        com._id === commentId ? comment : com
      );
      dispatch({ type: UPDATE_POST, payload: post });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <PostContext.Provider
      value={{
        ...state,
        getPosts,
        addPosts,
        getTotalPosts,
        getPost,
        createPost,
        updatePost,
        addComment,
        deletePost,
        uploadToCloud,
        votePoll,
        updatePollPost,
        unvotePoll,
        getTotalPosts,
        addReply,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = React.useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
