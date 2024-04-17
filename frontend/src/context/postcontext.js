import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuthContext } from "./authcontext";
const SET_POSTS = "SET_POSTS";
const SET_POST = "SET_POST";
const DELETE_POST = "DELETE_POST";
const UPDATE_POST = "UPDATE_POST";
export const PostContext = React.createContext();
const initialState = {
  posts: [],
  post: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
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
    default:
      return state;
  }
};
export const PostProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { user } = useAuthContext();
  // Get All Posts

  const getPosts = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/post";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(" Posts from getPosts", response.data.posts);
      dispatch({ type: SET_POSTS, payload: response.data.posts });
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
      console.log("Form from createPost", form);
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
      console.log("Post from createPost", response.data);
      //getPosts();
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
    }
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
  return (
    <PostContext.Provider
      value={{
        ...state,
        getPosts,
        getPost,
        createPost,
        updatePost,
        deletePost,
        uploadToCloud,
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
