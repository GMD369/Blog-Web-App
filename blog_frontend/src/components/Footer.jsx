import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t text-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand and Description */}
        <div>
          <h2 className="text-xl font-bold text-indigo-600 mb-2">InkCraft</h2>
          <p className="text-sm leading-relaxed">
            InkCraft is a modern platform empowering writers to share their stories securely and beautifully with the world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-indigo-600">Home</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-indigo-600">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-indigo-600">Register</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-indigo-600">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-indigo-600">Terms of Service</Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Connect</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                GitHub
              </a>
            </li>
            <li>
              <a href="mailto:support@inkcraft.com" className="hover:text-indigo-600">
                support@inkcraft.com
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t mt-8 py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} InkCraft. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
