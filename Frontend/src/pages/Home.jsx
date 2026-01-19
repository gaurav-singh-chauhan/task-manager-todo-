import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../features/taskSlice";
import { toast } from "react-toastify";
import { logoutUser } from "../features/authSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const getUsername = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/getUser", {
          withCredentials: true,
        });
        setUsername(res.data.username);
      } catch (err) {
        console.log(err);
      }
    };
    getUsername();
  }, []);

  const handleDelete = async (taskId) => {
    await dispatch(deleteTask(taskId))
      .unwrap()
      .then(() => {
        toast.success("Task deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutUser()).unwrap();
      toast.success(res.message);
      navigate("/user/login");
    } catch (err) {
      console.log(err);
    }
  };

  function capitalizeFirstLetter(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        {/* Header */}
        {/* Top heading */}
        <div className="py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome{" "}
            <span className="text-blue-600">
              {capitalizeFirstLetter(username)}...
            </span>
          </h1>

          <p className="text-gray-500 mt-1">
            This is what you’re working on today...
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Tasks</h1>

          <div className="flex items-center gap-3">
            <Link to="/user/home/create">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                + Create Task
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Empty state */}
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            You don't have any tasks...
          </p>
        )}


        {/* add task inputs */}
        

        {/* Task list */}
        {tasks.length > 0 && (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-start border border-gray-200 rounded p-4 hover:shadow-sm transition"
              >
                {/* Task info */}
                <div>
                  <h3 className="font-semibold text-gray-700">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link to={`/user/home/edit/${task.id}`}>
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
