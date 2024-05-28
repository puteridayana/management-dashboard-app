import "./App.css";
import SideBar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import './index.css';

import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Users from "./pages/Users";
import PostListing from "./pages/post/Listing";
import PostDetail from './pages/post/Detail';
import IndividualPostDetail from "./pages/post/IndividualDetail";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <SideBar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/users" element={<Users />} />
            <Route path="/post/listing" element={<PostListing />} />
            <Route path="/post/detail" element={<PostDetail />} />
            <Route path="/posts/:id" element={<IndividualPostDetail />} /> {/* Updated route for post detail */}
          </Routes>
        </SideBar>
      </Router>
    </Provider>
  );
}

export default App;
