import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  Edit, 
  Trash2, 
  Eye, 
  Plus, 
  Calendar, 
  User, 
  MessageCircle,
  FileText,
  TrendingUp,
  MoreVertical
} from "lucide-react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const MyPosts = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user) {
      fetchMyPosts();
    }
  }, [user, authLoading]);

  const fetchMyPosts = async () => {
    if (!user) {
      console.log("User not available:", user);
      toast.error("User not found. Please login again.");
      return;
    }

    // Try to get username from different possible sources
    const username = user.username || user.user_id;
    
    if (!username) {
      console.log("Username not available in user object:", user);
      toast.error("User information incomplete. Please login again.");
      return;
    }

    try {
      console.log("Fetching posts for user:", username);
      const response = await api.get(`posts/?author__username=${username}`);
      console.log("My posts response:", response.data);
      // Handle both paginated and non-paginated responses
      const postsData = response.data.results || response.data;
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching my posts:", error);
      toast.error("Failed to fetch your posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      try {
        await api.delete(`posts/${postId}/`);
        toast.success("Article deleted successfully");
        fetchMyPosts();
      } catch (error) {
        toast.error("Failed to delete article");
      }
    }
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

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Enhanced Header */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Articles
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Manage and track your published articles. Create new content, edit existing pieces, and monitor engagement.
            </p>
          </div>
          
          {/* Enhanced Create Button */}
          <Link
            to="/create"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg"
          >
            <Plus size={24} />
            Create New Article
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <FileText size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
                <p className="text-gray-600">Total Articles</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {posts.reduce((total, post) => total + (post.comments_count || 0), 0)}
                </p>
                <p className="text-gray-600">Total Comments</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Eye size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {posts.reduce((total, post) => total + getReadingTime(post.content), 0)}
                </p>
                <p className="text-gray-600">Total Reading Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Posts List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-300 mb-6">
            <FileText size={80} className="mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No articles yet</h3>
          <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
            Start your writing journey by creating your first article. Share your thoughts, experiences, and insights with the community.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg"
          >
            <Plus size={24} />
            Write Your First Article
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ease-out animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Enhanced Post Image */}
              {post.image ? (
                <div className="h-48 overflow-hidden relative group">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
                  <FileText size={48} className="text-indigo-400" />
                </div>
              )}

              {/* Enhanced Post Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category?.name}
                  </span>
                  <div className="relative group">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                      <MoreVertical size={16} className="text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                  {post.title}
                </h3>

                {/* Content Preview */}
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                  {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
                </p>

                {/* Enhanced Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={14} />
                    <span>{post.comments_count || 0} comments</span>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <Link
                    to={`/post/${post.id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                  >
                    <Eye size={16} />
                    View
                  </Link>
                  <Link
                    to={`/edit/${post.id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
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
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MyPosts; 