// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetail from "./pages/PostDetail";
import MyPosts from "./pages/MyPosts";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDebug from "./components/UserDebug";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Layout wrapper (Navbar + children + Footer)
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="min-h-[80vh]">{children}</div>
    <Footer />
    <UserDebug />
  </>
);

function AppRoutes() {
  return (
    <Routes>
      {/* LandingPage has its own full layout, no navbar/footer */}
      <Route path="/" element={<LandingPage />} />

      {/* Public routes with layout */}
      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout>
            <Register />
          </MainLayout>
        }
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/Home"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/create"
          element={
            <MainLayout>
              <CreatePost />
            </MainLayout>
          }
        />
        <Route
          path="/myposts"
          element={
            <MainLayout>
              <MyPosts />
            </MainLayout>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <MainLayout>
              <EditPost />
            </MainLayout>
          }
        />
      </Route>

      {/* Public Post Detail Route */}
      <Route
        path="/post/:id"
        element={
          <MainLayout>
            <PostDetail />
          </MainLayout>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes />
    </Router>
  );
}

export default App;
