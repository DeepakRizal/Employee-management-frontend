import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/authReducers";

const Navigation = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/"); // Redirect to the login page or home page
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Employee Management</div>
        <div>
          {user && (
            <Link to="/home" className="px-4 py-2 hover:bg-gray-700 rounded">
              Home
            </Link>
          )}
          {user && (
            <Link
              to="/dashboard"
              className="px-4 py-2 hover:bg-gray-700 rounded"
            >
              Dashboard
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-gray-700 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/" className="px-4 py-2 hover:bg-gray-700 rounded">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 hover:bg-gray-700 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
