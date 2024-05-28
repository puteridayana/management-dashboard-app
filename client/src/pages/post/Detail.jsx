import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import Loading from '../../components/Loading';
import "../../styles/PageStyles.css";
import "bootstrap/dist/css/bootstrap.css";

const PostDetail = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState('');

    const postsPerPage = 5;
    const offset = currentPage * postsPerPage;

    useEffect(() => {
        const fetchPostsAndComments = async () => {
            try {
                const postsResponse = await fetch(`${process.env.REACT_APP_CALLBACK_URL}/posts`);
                if (!postsResponse.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const postsData = await postsResponse.json();
                setPosts(postsData);

                const commentsResponse = await fetch(`${process.env.REACT_APP_CALLBACK_URL}/comments`);
                if (!commentsResponse.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const commentsData = await commentsResponse.json();
                setComments(commentsData);

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPostsAndComments();
    }, []);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const filteredPosts = posts.filter(post => {
        return post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedUser === '' || post.userId === parseInt(selectedUser));
    });

    const currentPosts = filteredPosts.slice(offset, offset + postsPerPage);

    if (loading) {
        return <div>{Loading && <Loading />}</div>;
    }

    if (error) {
        return <p>Error: {error}</p>;
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
            <div className="title">Posts & Comments</div>
            <div className="filter-container">
                <label htmlFor="userFilter">Filter by: </label>
                <input className='form-control'
                    style={{ width: "150px", fontSize: "12px", margin: "5px" }}
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by post title"
                />
                <select value={selectedUser} onChange={handleUserChange}>
                    <option value="">All Users</option>
                    {Array.from(new Set(posts.map(post => post.userId))).map(userId => (
                        <option key={userId} value={userId}>{userId}</option>
                    ))}
                </select>
            </div>
            <table className="post-table">
                <thead>
                    <tr>
                        <th>Post Title</th>
                        <th>Post Body</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map(post => (
                        <tr key={post.id}>
                            <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
                            <td>{post.body}</td>
                            <td>
                                <table className="comment-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comments
                                            .filter(comment => comment.postId === post.id)
                                            .map(comment => (
                                                <tr key={comment.id}>
                                                    <td>{comment.name}</td>
                                                    <td>{comment.email}</td>
                                                    <td>{comment.body}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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

export default PostDetail;
