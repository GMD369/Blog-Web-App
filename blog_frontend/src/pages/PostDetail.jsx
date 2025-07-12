import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  Calendar, 
  User, 
  MessageCircle, 
  Send, 
  Trash2, 
  ArrowLeft, 
  Heart,
  Share2,
  BookOpen
} from "lucide-react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`posts/${id}/`);
      setPost(response.data);
    } catch (error) {
      toast.error("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      console.log("Fetching comments for post:", id);
      const response = await api.get(`posts/${id}/comments/`);
      console.log("Comments response:", response);
      const commentsData = response.data.results || response.data || [];
      console.log("Processed comments data:", commentsData);
      setComments(Array.isArray(commentsData) ? commentsData : []);
    } catch (error) {
      console.error("Failed to load comments:", error);
      console.error("Error response:", error.response);
      setComments([]);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!user) {
      toast.error("Please login to add a comment");
      return;
    }

    setSubmittingComment(true);
    try {
      console.log("Submitting comment:", { content: newComment, postId: id });
      const response = await api.post(`posts/${id}/comments/`, {
        content: newComment
      });
      console.log("Comment submission response:", response);
      setNewComment("");
      fetchComments();
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error submitting comment:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        if (typeof errorData === 'object') {
          const errorMessages = Object.entries(errorData)
            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
            .join('; ');
          toast.error(`Validation error: ${errorMessages}`);
        } else {
          toast.error(`Bad request: ${errorData}`);
        }
      } else if (error.response?.status === 401) {
        toast.error("Authentication required. Please login again.");
      } else {
        toast.error(`Failed to add comment: ${error.response?.data?.detail || error.message}`);
      }
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`posts/${id}/comments/${commentId}/`);
      fetchComments();
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete comment");
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
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
        <p className="text-gray-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/Home"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <Link
        to="/Home"
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8 group transition-colors duration-200"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
        Back to Articles
      </Link>

      {/* Enhanced Post Header */}
      <article className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 animate-fadeIn">
        {/* Enhanced Post Image */}
        {post.image && (
          <div className="h-96 overflow-hidden relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>
        )}

        {/* Enhanced Post Content */}
        <div className="p-8">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold">
              {post.category?.name}
            </span>
          </div>

          {/* Enhanced Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Enhanced Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <span className="font-medium">{post.author_username || post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <span>{comments.length} comment{comments.length !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Enhanced Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-200">
                <Heart size={20} />
                <span>Like</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                <Share2 size={20} />
                <span>Share</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <BookOpen size={20} />
              <span>Reading time: {Math.ceil(post.content.length / 200)} min</span>
            </div>
          </div>
        </div>
      </article>

      {/* Enhanced Comments Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MessageCircle size={24} className="text-indigo-600" />
          Comments ({comments.length})
        </h3>

        {/* Enhanced Comment Form */}
        {user && (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 resize-none"
                  rows="3"
                  disabled={submittingComment}
                />
              </div>
              <button
                type="submit"
                disabled={!newComment.trim() || submittingComment}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {submittingComment ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </form>
        )}

        {/* Enhanced Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map((comment, index) => (
              <div
                key={comment.id}
                className="bg-gray-50 rounded-xl p-6 animate-fadeIn"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{comment.author_username || comment.author}</p>
                      <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
                    </div>
                  </div>
                  {user && (comment.author_username === user.username || comment.author === user.username) && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PostDetail; 