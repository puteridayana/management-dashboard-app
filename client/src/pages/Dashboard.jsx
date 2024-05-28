import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FaHome } from 'react-icons/fa';
import AddInventoryItem from '../components/AddInventory';
import InventoryList from '../components/InventoryList';
import TotalInventory from '../components/TotalInventory';
import PendingOrders from '../components/PendingOrders';
import RecentTransactions from '../components/RecentTransactions';
import SalesAnalyticsChart from '../components/SalesAnalytics';
import "../styles/PageStyles.css";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageCommentsPerPost, setAverageCommentsPerPost] = useState(0);
  const [averageCommentsPerUser, setAverageCommentsPerUser] = useState(0);

  // State for inventory items
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, commentsResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_CALLBACK_URL}/posts`),
          fetch(`${process.env.REACT_APP_CALLBACK_URL}/comments`)
        ]);

        if (!postsResponse.ok) {
          throw new Error('Failed to fetch posts');
        }
        if (!commentsResponse.ok) {
          throw new Error('Failed to fetch comments');
        }

        const postsData = await postsResponse.json();
        const commentsData = await commentsResponse.json();
        setPosts(postsData);
        setComments(commentsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (posts.length > 0 && comments.length > 0) {
      const avgCommentsPerPost = comments.length / posts.length;
      setAverageCommentsPerPost(avgCommentsPerPost);

      const userIdToComments = {};
      comments.forEach(comment => {
        if (!userIdToComments[comment.postId]) {
          userIdToComments[comment.postId] = [];
        }
        userIdToComments[comment.postId].push(comment);
      });
      const userCommentsCounts = Object.values(userIdToComments).map(comments => comments.length);
      const avgCommentsPerUser = userCommentsCounts.reduce((acc, count) => acc + count, 0) / userCommentsCounts.length;
      setAverageCommentsPerUser(avgCommentsPerUser);
    }
  }, [posts, comments]);

  // Handle adding an item to inventory
  const handleAddItem = (itemName) => {
    if (itemName.trim() !== '') {
      const newItem = {
        name: itemName,
      };
      setInventoryItems([...inventoryItems, newItem]);
    }
  };

  // Handle deleting an item from inventory
  const handleDeleteItem = (index) => {
    const updatedItems = [...inventoryItems];
    updatedItems.splice(index, 1);
    setInventoryItems(updatedItems);
  };

  // Hardcoded sales data
  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 2000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
    { name: 'Jul', sales: 3490 },
  ];

  return (
    <div>
      <div className="page-directory">
        <span className="home-icon">
          <FaHome />
        </span>
        <span className="slash">/</span>
        <a href="/" className="directory-link">
          Dashboard
        </a>
      </div>
      <div className="title">Dashboard</div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div className="dashboard-content">
          <div className="dashboard-section">
            <h3>Inventory Management</h3>

            <AddInventoryItem handleAddItem={handleAddItem} />
            <InventoryList items={inventoryItems} handleDeleteItem={handleDeleteItem} />
          </div>

          <div className="dashboard-section">
            <h3>Total Inventory</h3>
            <TotalInventory count={inventoryItems.length} />
          </div>

          <div className="dashboard-section">
            <h3>Pending Orders</h3>
            <PendingOrders count={5} /> {/* Example count */}
          </div>

          <div className="dashboard-section">
            <h3>Recent Transactions</h3>
            <RecentTransactions transactions={['Transaction 1', 'Transaction 2', 'Transaction 3']} /> {/* Example transactions */}
          </div>

          <div className="dashboard-section">
            <h3>Sales Analytics</h3>
            {salesData && salesData.length > 0 ? (
              <SalesAnalyticsChart data={salesData} />
            ) : (
              <p>No sales data available.</p>
            )}
          </div>

          <div className="dashboard-section">
            <h3>Average Comments</h3>
            <BarChart
              width={300}
              height={300}
              data={[
                { name: 'Average Comments Per Post', value: averageCommentsPerPost.toFixed(2) },
                { name: 'Average Comments Per User', value: averageCommentsPerUser.toFixed(2) },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
