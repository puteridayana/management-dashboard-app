import React, { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import Loading from '../components/Loading';
import "../styles/PageStyles.css";

const UserListingPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_CALLBACK_URL}/users`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="page-directory">
        <span className="home-icon">
          <FaHome />
        </span>
        <span className="slash">/</span>
        <a href="/users" className="directory-link">
          Users
        </a>
      </div>
      <div className="title">Users</div>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td><a href={`/user/${user.id}`}>{user.id}</a></td>
                <td><a href={`/user/${user.id}`}>{user.name}</a></td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListingPage;
