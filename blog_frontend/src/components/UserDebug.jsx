import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { X, Eye, EyeOff } from "lucide-react";

const UserDebug = () => {
  const { user, loading, authTokens } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(true);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded-lg hover:bg-opacity-90"
        title="Show Auth Debug"
      >
        <Eye size={16} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-xs max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold">Auth Debug</h4>
        <div className="flex gap-1">
          <button
            onClick={() => setIsVisible(false)}
            className="hover:bg-white hover:bg-opacity-20 p-1 rounded"
            title="Hide Debug"
          >
            <EyeOff size={12} />
          </button>
          <button
            onClick={() => window.location.reload()}
            className="hover:bg-white hover:bg-opacity-20 p-1 rounded"
            title="Refresh Page"
          >
            <X size={12} />
          </button>
        </div>
      </div>
      <div>Loading: {loading ? 'Yes' : 'No'}</div>
      <div>User: {user ? (user.username || 'No username') : 'None'}</div>
      <div>User ID: {user ? user.user_id : 'None'}</div>
      <div>Tokens: {authTokens ? 'Present' : 'None'}</div>
      <div>Access Token: {authTokens?.access ? 'Yes' : 'No'}</div>
      <div>Refresh Token: {authTokens?.refresh ? 'Yes' : 'No'}</div>
      {user && (
        <div className="mt-2 text-xs opacity-75">
          <div>Exp: {new Date(user.exp * 1000).toLocaleString()}</div>
          {user.email && <div>Email: {user.email}</div>}
        </div>
      )}
    </div>
  );
};

export default UserDebug; 