const PostSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      {/* Enhanced Image skeleton */}
      <div className="h-56 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
      
      {/* Enhanced Content skeleton */}
      <div className="p-8">
        {/* Category badge skeleton */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gray-200 h-8 w-20 rounded-full"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="space-y-3 mb-4">
          <div className="bg-gray-200 h-7 w-4/5 rounded"></div>
          <div className="bg-gray-200 h-7 w-3/5 rounded"></div>
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-2 mb-6">
          <div className="bg-gray-200 h-4 w-full rounded"></div>
          <div className="bg-gray-200 h-4 w-full rounded"></div>
          <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
        </div>
        
        {/* Meta information skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="bg-gray-200 h-4 w-16 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 h-4 w-20 rounded"></div>
          </div>
        </div>

        {/* Stats and action buttons skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-gray-200 h-4 w-16 rounded"></div>
            <div className="bg-gray-200 h-4 w-20 rounded"></div>
          </div>
          <div className="bg-gray-200 h-5 w-5 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton; 