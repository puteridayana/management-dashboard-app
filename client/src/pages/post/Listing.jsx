import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { FaHome } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import "../../styles/PageStyles.css";

const PostListingPage = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const postsPerPage = 5;
  const offset = currentPage * postsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_CALLBACK_URL}/posts`),
          fetch(`${process.env.REACT_APP_CALLBACK_URL}/users`)
        ]);

        if (!postsResponse.ok || !usersResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const postsData = await postsResponse.json();
        const usersData = await usersResponse.json();

        setPosts(postsData);
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    setCurrentPage(0); // Reset to first page on filter change
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const filteredPosts = selectedUser
    ? posts.filter(post => post.userId === parseInt(selectedUser))
    : posts;

  const currentPosts = filteredPosts.slice(offset, offset + postsPerPage);

  if (loading) {
    return <div>{Loading && <Loading />}</div>;
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
        <a href="/post/listing" className="directory-link">
          Posts
        </a>
      </div>
      <div className="title">Posts</div>
      <div className="filter-container">
        <label htmlFor="userFilter">Filter by: </label>
        <select id="userFilter" value={selectedUser} onChange={handleUserChange}>
          <option value="">All Users</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post.id}>
                <td>
                  <Link to={`/posts/${post.id}`}>
                    {post.id}
                  </Link>
                </td>
                <td>
                  <Link to={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </td>
                <td>{post.body}</td>
                <td>{users.find(user => user.id === post.userId)?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(filteredPosts.length / postsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default PostListingPage;
