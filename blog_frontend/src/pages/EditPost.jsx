import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchPost();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("categories/?page_size=50");
      setCategories(res.data.results || res.data);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  const fetchPost = async () => {
    try {
      const response = await api.get(`posts/${id}/`);
      const post = response.data;
      
      setFormData({
        title: post.title,
        content: post.content,
        category: post.category?.id || "",
        image: null,
      });
      
      if (post.image) {
        setCurrentImage(post.image);
        setImagePreview(post.image);
      }
    } catch (error) {
      toast.error("Failed to load post");
      navigate("/myposts");
    } finally {
      setLoading(false);
    }
  };

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
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("category_id", formData.category);
    
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await api.patch(`posts/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post updated successfully");
      navigate(`/post/${id}`);
    } catch (err) {
      toast.error("Failed to update post");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Edit Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            rows={8}
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Cover Image
          </label>
          
          {/* Current Image */}
          {currentImage && !imagePreview?.startsWith('blob:') && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Current image:</p>
              <img
                src={currentImage}
                alt="Current"
                className="max-h-48 object-contain border rounded-lg"
              />
            </div>
          )}
          
          {/* New Image Upload */}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          
          {/* Image Preview */}
          {imagePreview && imagePreview.startsWith('blob:') && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">New image preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 object-contain border rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Update Post
          </button>
          <button
            type="button"
            onClick={() => navigate(`/post/${id}`)}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost; 