import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/task", {
          withCredentials: true,
        });

        setTasks(res.data.task);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/task/delete/${taskId}`);
      alert(res.data.message);

      setTasks((prevTasks) => prevTasks.filter((item) => item.id !== taskId ));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Tasks</h1>
          <Link to="/user/home/create">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Create Task
            </button>
          </Link>
        </div>

        {/* Empty state */}
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            You don't have any tasks
          </p>
        )}

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
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                    title="Edit"
                  >
                    <FiEdit2 size={18} />
                  </button>

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
