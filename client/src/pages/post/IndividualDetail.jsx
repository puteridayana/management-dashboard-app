import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Loading from '../../components/Loading';
import "../../styles/PageStyles.css";

const IndividualPostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await fetch(`${process.env.REACT_APP_CALLBACK_URL}/posts/${id}`);
        if (!postResponse.ok) {
          throw new Error('Failed to fetch post');
        }
        const postData = await postResponse.json();
        setPost(postData);

        const commentsResponse = await fetch(`${process.env.REACT_APP_CALLBACK_URL}/comments?postId=${id}`);
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

    fetchPostAndComments();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="post-detail-container">
      <div className="page-directory">
        <span className="home-icon">
          <FaHome />
        </span>
        <span className="slash">/</span>
        <Link to="/post/listing" className="directory-link">
          Posts
        </Link>
        <span className="slash">/</span>
        <Link to="/post/detail" className="directory-link">
          Post Details
        </Link>
      </div>
      <div className="title">Post Details</div>
      {post && (
        <div className="post-details">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      )}
      <h4>Comments</h4>
      <table className="comment-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(comment => (
            <tr key={comment.id}>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>{comment.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndividualPostDetail;
