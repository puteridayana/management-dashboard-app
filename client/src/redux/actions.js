// actions.js

import axios from 'axios';

// Action types for fetching users
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Action types for fetching posts
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

// Action types for fetching comments
export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

// Action types for fetching todos
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

// Helper function to fetch data with caching
const fetchDataWithCache = async (url, cacheKey, dispatch, requestAction, successAction, failureAction) => {
  const cachedData = sessionStorage.getItem(cacheKey);

  if (cachedData) {
    dispatch({ type: successAction, payload: JSON.parse(cachedData) });
  } else {
    dispatch({ type: requestAction });

    try {
      const response = await axios.get(url);
      sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
      dispatch({ type: successAction, payload: response.data });
    } catch (error) {
      dispatch({ type: failureAction, payload: error.message });
    }
  }
};

// Action creators for fetching users
export const fetchUsers = () => {
  return (dispatch) => {
    return fetchDataWithCache(
      '${process.env.REACT_APP_CALLBACK_URL}/users',
      'users',
      dispatch,
      FETCH_USERS_REQUEST,
      FETCH_USERS_SUCCESS,
      FETCH_USERS_FAILURE
    );
  };
};

// Action creators for fetching posts
export const fetchPosts = () => {
  return (dispatch) => {
    return fetchDataWithCache(
      '${process.env.REACT_APP_CALLBACK_URL}/posts',
      'posts',
      dispatch,
      FETCH_POSTS_REQUEST,
      FETCH_POSTS_SUCCESS,
      FETCH_POSTS_FAILURE
    );
  };
};

// Action creators for fetching comments
export const fetchComments = () => {
  return (dispatch) => {
    return fetchDataWithCache(
      '${process.env.REACT_APP_CALLBACK_URL}/comments',
      'comments',
      dispatch,
      FETCH_COMMENTS_REQUEST,
      FETCH_COMMENTS_SUCCESS,
      FETCH_COMMENTS_FAILURE
    );
  };
};

// Action creators for fetching todos
export const fetchTodos = () => {
  return (dispatch) => {
    return fetchDataWithCache(
      '${process.env.REACT_APP_CALLBACK_URL}/todos',
      'todos',
      dispatch,
      FETCH_TODOS_REQUEST,
      FETCH_TODOS_SUCCESS,
      FETCH_TODOS_FAILURE
    );
  };
};
