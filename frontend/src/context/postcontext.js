import React, { useEffect, useState, useContext } from "react";
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
      // dispatch({ type: SET_POST, payload: response.data });
      return response.data;
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
      return response.data.post;
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
  const editComment = async ({ postId, commentId, text }) => {
    console.log("Edit Comment", postId, commentId, text);
    try {
      const url =
        process.env.NEXT_PUBLIC_BACKEND_URL +
        `/api/v1/comment/update/${commentId}`;
      const resp = await axios.put(
        url,
        { content: text },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Comment from editComment", resp.data);
      //search for the post
      const post = state.posts.find((post) => post._id === postId);
      const comment = post.comments.find((com) => com._id === commentId);
      comment.text = resp.data.comment.text;
      // make changes to the post
      post.comments = post.comments.map((com) =>
        com._id === commentId ? comment : com
      );
      dispatch({ type: UPDATE_POST, payload: post });
    } catch (err) {
      console.log(err);
      throw new Error(err.response.data.message);
    }
  };
  const deleteComment = async ({ postId, commentId }) => {
    console.log("Delete Comment", postId, commentId);
    try {
      const url =
        process.env.NEXT_PUBLIC_BACKEND_URL +
        `/api/v1/comment/delete/${commentId}`;
      const resp = await axios.delete(url, {
        data: { postId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Comment from deleteComment", resp.data);
      //search for the post
      const post = state.posts.find((post) => post._id === postId);
      post.comments = post.comments.filter((com) => com._id !== commentId);
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
  const editReply = async ({ postId, commentId, replyId, content }) => {
    console.log("Edit Reply", postId, commentId, replyId, content);
    try {
      const url =
        process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/reply/update/${replyId}`;
      const resp = await axios.put(
        url,
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Reply from editReply", resp.data);
      //search for the post
      const post = state.posts.find((post) => post._id === postId);
      const comment = post.comments.find((com) => com._id === commentId);
      const reply = comment.replies.find((rep) => rep._id === replyId);
      reply.text = resp.data.reply.text;
      // make changes to the post
      comment.replies = comment.replies.map((rep) =>
        rep._id === replyId ? reply : rep
      );
      post.comments = post.comments.map((com) =>
        com._id === commentId ? comment : com
      );
      dispatch({ type: UPDATE_POST, payload: post });
    } catch (err) {
      console.log(err);
    }
  };
  const deleteReply = async ({ postId, commentId, replyId }) => {
    console.log("Delete Reply", postId, commentId, replyId);
    try {
      const resp = await axios.delete(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/reply/delete/${replyId}`,

        {
          data: { commentId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Reply from deleteReply", resp.data);
      //search for the post
      const post = state.posts.find((post) => post._id === postId);
      const comment = post.comments.find((com) => com._id === commentId);
      comment.replies = comment.replies.filter((rep) => rep._id !== replyId);
      // make changes to the post
      post.comments = post.comments.map((com) =>
        com._id === commentId ? comment : com
      );
      dispatch({ type: UPDATE_POST, payload: post });
    } catch (err) {
      console.log(err);
    }
  };
  const toggleLike = async ({ id, type, postId, commentId }) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/like/toggle`;
      console.log("URL from toggleLike", url);
      const response = await axios.patch(
        url,
        {
          id: id,
          type: type,
          postId: postId,
          commentId: commentId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Like from toggleLike", response.data);
    } catch (err) {
      console.log(err);
      throw new Error(err.response.data.message);
    }
  };
  const addCommentClient = async (comment) => {
    if (user._id === comment.user._id) return;
    const post = state.posts.find((post) => post._id === comment.post);
    //check if post is not found
    if (!post) return;
    //check if comment already exists
    if (post.comments.find((com) => com._id === comment._id)) return;
    else post.comments.push(comment);
    dispatch({ type: UPDATE_POST, payload: post });
  };
  const editCommentClient = async (comment) => {
    const post = state.posts.find((post) => post._id === comment.post);
    if (!post) return; //if post is not found
    let editedComment = post.comments.find((com) => com._id === comment._id);
    if (!editedComment) return; //if comment is not found
    post.comments = post.comments.map((com) =>
      com._id === comment._id ? comment : com
    );
    dispatch({ type: UPDATE_POST, payload: post });
  };
  const deleteCommentClient = async (comment) => {
    const post = state.posts.find((post) => post._id === comment.post);
    //check if post is not found
    if (!post) return;
    post.comments = post.comments.filter((com) => com._id !== comment._id);
    dispatch({ type: UPDATE_POST, payload: post });
  };
  const addReplyClient = async (reply) => {
    if (user._id === reply.user._id) return;
    const post = state.posts.find((post) => post._id === reply.post);
    if (!post) return; //if post is not found
    const comment = post.comments.find((com) => com._id === reply.comment);
    if (!comment) return; //if comment is not found
    //check if reply already exists
    if (comment.replies.find((rep) => rep._id === reply._id)) return;
    comment.replies.push(reply);
    post.comments = post.comments.map((com) =>
      com._id === reply.comment ? comment : com
    );
    dispatch({ type: UPDATE_POST, payload: post });
  };
  const editReplyClient = async (reply) => {
    const post = state.posts.find((post) => post._id === reply.post);
    if (!post) return; //if post is not found
    const comment = post.comments.find((com) => com._id === reply.comment);
    if (!comment) return; //if comment is not found
    let editedReply = comment.replies.find((rep) => rep._id === reply._id);
    if (!editedReply) return; //if reply is not found
    editedReply = reply;
    comment.replies = comment.replies.map((rep) =>
      rep._id === reply._id ? editedReply : rep
    );
    post.comments = post.comments.map((com) =>
      com._id === reply.comment ? comment : com
    );
    dispatch({ type: UPDATE_POST, payload: post });
  };
  const deleteReplyClient = async (reply) => {
    const post = state.posts.find((post) => post._id === reply.post);
    if (!post) return; //if post is not found
    const comment = post.comments.find((com) => com._id === reply.comment);
    if (!comment) return; //if comment is not found
    comment.replies = comment.replies.filter((rep) => rep._id !== reply._id);
    post.comments = post.comments.map((com) =>
      com._id === reply.comment ? comment : com
    );
    dispatch({ type: UPDATE_POST, payload: post });
  };
  const toggleLikeClient = async (data) => {
    //if posts are not loaded
    if (state.posts.length === 0) {
      return;
    }
    const { liked, postId, commentId, deleted } = data;
    console.log("Toggle Like Client", data, state.posts);
    if (liked.onModel == "post") {
      const post = state.posts.find((post) => post._id === liked.likeable);
      if (!post) return; //if post is not found
      if (!post.likes.find((like) => like.user._id === liked.user._id)) {
        post.likes.push(liked);
      } else {
        post.likes = post.likes.filter(
          (like) => like.user._id !== liked.user._id
        );
      }
      dispatch({ type: UPDATE_POST, payload: post });
    } else if (liked.onModel == "comment") {
      const post = state.posts.find((post) => post._id === postId);
      //if post is not found
      if (!post) return;
      const comment = post.comments.find((com) => com._id === liked.likeable);
      //if comment is not found
      if (!comment) return;
      if (comment.likes.find((like) => like.user === liked.user)) {
        comment.likes = comment.likes.filter(
          (like) => like.user !== liked.user
        );
      } else {
        comment.likes.push(liked);
      }
      post.comments = post.comments.map((com) =>
        com._id === liked.likeable ? comment : com
      );
      dispatch({ type: UPDATE_POST, payload: post });
    } else if (liked.onModel == "reply") {
      const post = state.posts.find((post) => post._id === postId);
      //if post is not found
      if (!post) return;
      const comment = post.comments.find((com) => com._id === commentId);
      //if comment is not found
      if (!comment) return;
      const reply = comment.replies.find((rep) => rep._id === liked.likeable);
      //if reply is not found
      if (!reply) return;
      if (reply.likes.find((like) => like.user === liked.user)) {
        reply.likes = reply.likes.filter((like) => like.user !== liked.user);
      } else {
        reply.likes.push(liked);
      }
      comment.replies = comment.replies.map((rep) =>
        rep._id === liked.likeable ? reply : rep
      );
      post.comments = post.comments.map((com) =>
        com._id === commentId ? comment : com
      );
      dispatch({ type: UPDATE_POST, payload: post });
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
        deletePost,
        uploadToCloud,
        votePoll,
        updatePollPost,
        unvotePoll,
        getTotalPosts,
        addComment,
        editComment,
        deleteComment,
        addReply,
        editReply,
        deleteReply,
        toggleLike,
        addCommentClient,
        editCommentClient,
        deleteCommentClient,
        addReplyClient,
        editReplyClient,
        deleteReplyClient,
        toggleLikeClient,
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
