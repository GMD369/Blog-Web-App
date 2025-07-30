// src/pages/Home.jsx
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Calendar, User, Eye, MessageCircle, ArrowRight } from "lucide-react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Pagination from "../components/Pagination";
import PostSkeleton from "../components/PostSkeleton";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useContext(AuthContext);

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`posts/?search=${search}&page=${page}`);
      
      // Handle paginated response
      if (res.data.results) {
        setPosts(res.data.results);
        setTotalPages(Math.ceil(res.data.count / 5)); // Assuming page size is 5
      } else {
        setPosts(res.data);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchPosts(1);
  }, [search]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchPosts(page);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header with enhanced styling */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Discover Amazing Stories
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Explore insightful articles, creative content, and thought-provoking perspectives from our community of writers
        </p>
      </div>

      {/* Enhanced Search and Create Post */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        {/* Enhanced Search Bar */}
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-200" size={20} />
          <input
            type="text"
            placeholder="Search for articles, topics, or authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 text-lg"
          />
        </div>

        {/* Enhanced Create Post Button */}
        {user && (
          <Link
            to="/create"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg"
          >
            <Plus size={24} />
            Create Article
          </Link>
        )}
      </div>

      {/* Loading State with enhanced skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Enhanced Posts Grid */}
      {!loading && posts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-300 mb-6">
            <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No articles found</h3>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            {search ? "Try adjusting your search terms or browse all articles" : "Be the first to share your story with our community!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ease-out"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Enhanced Post Image */}
              {post.image ? (
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ) : (
                <div className="h-56 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center group-hover:from-indigo-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-300">
                  <svg className="w-16 h-16 text-indigo-400 group-hover:text-indigo-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}

              {/* Enhanced Post Content */}
              <div className="p-8">
                {/* Enhanced Category Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300">
                    {post.category?.name}
                  </span>
                </div>

                {/* Enhanced Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 leading-tight">
                  {post.title}
                </h3>

                {/* Enhanced Content Preview */}
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 text-base">
                  {truncateText(post.content)}
                </p>

                {/* Enhanced Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-medium">{post.author_username || post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>

                {/* Enhanced Stats and Read More */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {post.comments_count > 0 && (
                      <div className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        <span>{post.comments_count} comment{post.comments_count !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      <span>Read more</span>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-indigo-600 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Enhanced Pagination */}
      {!loading && posts.length > 0 && (
        <div className="mt-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
