import { combineReducers } from 'redux';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
} from './actions';

// Helper function to handle state updates
const createReducer = (actionTypes) => {
  return (state = { loading: false, data: [], error: null, isFetched: false }, action) => {
    switch (action.type) {
      case actionTypes.REQUEST:
        return { ...state, loading: true };
      case actionTypes.SUCCESS:
        return { ...state, loading: false, data: action.payload, isFetched: true };
      case actionTypes.FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
};

// Reducer for fetching users
const usersReducer = createReducer({
  REQUEST: FETCH_USERS_REQUEST,
  SUCCESS: FETCH_USERS_SUCCESS,
  FAILURE: FETCH_USERS_FAILURE,
});

// Reducer for fetching posts
const postsReducer = createReducer({
  REQUEST: FETCH_POSTS_REQUEST,
  SUCCESS: FETCH_POSTS_SUCCESS,
  FAILURE: FETCH_POSTS_FAILURE,
});

// Reducer for fetching comments
const commentsReducer = createReducer({
  REQUEST: FETCH_COMMENTS_REQUEST,
  SUCCESS: FETCH_COMMENTS_SUCCESS,
  FAILURE: FETCH_COMMENTS_FAILURE,
});

// Reducer for fetching todos
const todosReducer = createReducer({
  REQUEST: FETCH_TODOS_REQUEST,
  SUCCESS: FETCH_TODOS_SUCCESS,
  FAILURE: FETCH_TODOS_FAILURE,
});

// Combine all reducers
const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
  todos: todosReducer,
});

export default rootReducer;
