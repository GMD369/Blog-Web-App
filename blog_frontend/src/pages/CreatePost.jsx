import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Upload, 
  X, 
  Save, 
  ArrowLeft, 
  FileText, 
  Image as ImageIcon,
  Tag,
  User
} from "lucide-react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const CreatePost = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Check if user is authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please login to create a post");
      navigate("/login");
      return;
    }
  }, [user, authLoading, navigate]);

  // 🧾 Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        console.log("Fetching categories from:", api.defaults.baseURL + "categories/");
        // Fetch all categories by using a large page size
        const res = await api.get("categories/?page_size=50");
        console.log("Categories response:", res.data);
        // Handle both paginated and non-paginated responses
        const categoriesData = res.data.results || res.data;
        console.log("Total categories found:", categoriesData.length);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching categories:", err);
        console.error("Error details:", err.response?.data);
        toast.error(`Failed to load categories: ${err.response?.data?.detail || err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    if (!authLoading && user) {
      fetchCategories();
    }
  }, [user, authLoading]);

  // 🧠 Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setImagePreview(null);
  };

  // 📤 Submit post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to create a post");
      navigate("/login");
      return;
    }

    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Please enter content");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    setSubmitting(true);

    const data = new FormData();
    data.append("title", formData.title.trim());
    data.append("content", formData.content.trim());
    data.append("category_id", formData.category);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      console.log("Submitting post with data:", {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        hasImage: !!formData.image
      });
      
      const response = await api.post("posts/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("Post created successfully:", response.data);
      toast.success("Article published successfully! 🎉");
      navigate("/Home");
    } catch (err) {
      console.error("Error creating post:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      if (err.response?.status === 400) {
        const errorData = err.response.data;
        if (typeof errorData === 'object') {
          const errorMessages = Object.entries(errorData)
            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
            .join('; ');
          toast.error(`Validation error: ${errorMessages}`);
        } else {
          toast.error(`Bad request: ${errorData}`);
        }
      } else if (err.response?.status === 401) {
        toast.error("Authentication required. Please login again.");
        navigate("/login");
      } else {
        toast.error(`Failed to create article: ${err.response?.data?.detail || err.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const getWordCount = () => {
    return formData.content.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getReadingTime = () => {
    const words = getWordCount();
    return Math.ceil(words / 200); // Average reading speed
  };

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/Home")}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 group transition-colors duration-200"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Articles
          </button>
        </div>
        
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create New Article
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your thoughts, experiences, and insights with the community. Craft compelling content that resonates with your readers.
          </p>
        </div>
      </div>

      {/* Enhanced Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Section */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              <FileText size={20} className="inline mr-2 text-indigo-600" />
              Article Title
            </label>
            <input
              name="title"
              onChange={handleChange}
              value={formData.title}
              required
              maxLength={200}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 text-lg font-medium"
              placeholder="Enter a compelling title for your article..."
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {formData.title.length}/200 characters
              </span>
            </div>
          </div>

          {/* Category Section */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              <Tag size={20} className="inline mr-2 text-indigo-600" />
              Category
            </label>
            {loading ? (
              <div className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ) : (
              <select
                name="category"
                onChange={handleChange}
                value={formData.category}
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 text-lg bg-white"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              <ImageIcon size={20} className="inline mr-2 text-indigo-600" />
              Featured Image (Optional)
            </label>
            
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors duration-300">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-lg text-gray-600 mb-2">Upload a featured image</p>
                <p className="text-sm text-gray-500 mb-4">PNG, JPG, GIF up to 5MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200"
                >
                  <Upload size={20} />
                  Choose Image
                </label>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-lg font-semibold text-gray-900">
                <User size={20} className="inline mr-2 text-indigo-600" />
                Article Content
              </label>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{getWordCount()} words</span>
                <span>•</span>
                <span>{getReadingTime()} min read</span>
              </div>
            </div>
            
            <textarea
              name="content"
              onChange={handleChange}
              value={formData.content}
              required
              rows={12}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 resize-none text-base leading-relaxed"
              placeholder="Write your article content here... Share your thoughts, experiences, and insights with your readers. Make it engaging and valuable!"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={submitting || !formData.title.trim() || !formData.content.trim() || !formData.category}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {submitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Save size={20} />
              )}
              {submitting ? 'Publishing...' : 'Publish Article'}
            </button>
          </div>
        </form>

        {/* Enhanced Preview Section */}
        {showPreview && (
          <div className="mt-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Article Preview
            </h3>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              
              <div className="mb-4">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {categories.find(c => c.id == formData.category)?.name || 'Category'}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {formData.title || 'Your article title will appear here'}
              </h2>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{user.username || 'You'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{getWordCount()} words</span>
                  <span>•</span>
                  <span>{getReadingTime()} min read</span>
                </div>
              </div>
              
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {formData.content || 'Your article content will appear here...'}
              </div>
            </div>
          </div>
        )}
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

export default CreatePost;
