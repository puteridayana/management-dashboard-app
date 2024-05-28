import React, { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userTodos, setUserTodos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_CALLBACK_URL}/users/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchTodos = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_CALLBACK_URL}/todos?userId=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const todosData = await response.json();
        setUserTodos(todosData);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchUser();
    fetchTodos();
  }, [id]);

  return (
    <div className="UserProfile">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="page-directory">
              <span className="home-icon">
                <FaHome />
              </span>
              <span className="slash">/</span>
              <Link to="/users" className="directory-link">
                Users
              </Link>
            </div>
            <div className="title">User Profile</div>
            {user ? (
              <table className="user-details-table">
                <tbody>
                  <tr>
                    <td>ID:</td>
                    <td>{user.id}</td>
                  </tr>
                  <tr>
                    <td>Name:</td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{user.email}</td>
                  </tr>
                  {/* Render other user details as needed */}
                </tbody>
              </table>
            ) : (
              <p>Please go to the <Link to="/users">User Listing</Link> page first to click on the ID to view the profile.</p>
            )}

            {userTodos.length > 0 && (
              <div className="user-todos">
                <h3>User's To-Do List</h3>
                <table className="todos-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userTodos.map(todo => (
                      <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td>{todo.title}</td>
                        <td>{todo.completed ? 'Yes' : 'No'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
