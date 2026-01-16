import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };

    try {
      const res = await dispatch(loginUser(payload)).unwrap();
      toast.info(res.message);
      navigate("/user/home");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-8">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-10">
        <h1 className="text-3xl font-semibold text-center mb-8">LOGIN</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Email */}
          <div className="col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md
                         text-lg font-medium hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>

          {/* Register Link */}
          <div className="col-span-2 text-center mt-2">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/user/register"
                className="text-blue-600 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
