import { Link, useNavigate } from "react-router-dom";
import AdvertisementFolderIcon from "../Icons/AdvertisementFolderIcon";
import HomeIcon from "../Icons/HomeIcon";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <aside className="w-64 bg-white h-screen shadow-md flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Chatbot Dashboard</h1>
        <nav className="space-y-2">
          <Link
            to="/"
            className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <span className="mr-3">
              <HomeIcon className="h-5 w-5" />
            </span>
            <span>Home</span>
          </Link>
          <Link
            to="/advertisement"
            className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <span className="mr-3">
              <AdvertisementFolderIcon className="h-5 w-5" />
            </span>
            <span>Advertisement</span>
          </Link>

          <hr className="my-2 border-gray-300" />
          <button
            onClick={handleLogout}
            className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <span className="mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 1v3M8.5 2.5l2 2M1 12h3m16 0h3m-9 7l2 2M6.5 21.5l2-2M21 12l2-2M6 9h12v6H6V9z"
                />
              </svg>
            </span>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <div className="p-4 text-center text-gray-500">
        <p>
          Inspired by{" "}
          <a href="https://galichat.com" className="text-blue-500 underline">
            galichat.com
          </a>
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
