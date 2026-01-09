import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [editingTask, setEditingTask] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    // Simulate fetching user profile from backend
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${user.email}`);
        const users = await response.json();
        if (users.length > 0) setProfile(users[0]);
      } catch (error) {
        console.error('Failed to fetch profile');
      }
    };
    fetchProfile();
  }, [user.email]);

  const addTask = () => {
    if (!title.trim()) return;
    setTasks([...tasks, { id: Date.now(), title, completed: false }]);
    setTitle('');
  };

  const editTask = (id, newTitle) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, title: newTitle } : t));
    setEditingTask(null);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || (filter === 'Completed' && t.completed) || (filter === 'Pending' && !t.completed);
    return matchesSearch && matchesFilter;
  });

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h2 className="font-bold text-xl">Dashboard</h2>
        <div className="flex items-center space-x-4">
          {profile && (
            <div className="flex items-center space-x-2">
              <img src={profile.avatar || user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
              <span>{profile.name || user.email}</span>
            </div>
          )}
          <button onClick={() => setShowLogoutConfirm(true)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-6">
        {/* Profile Section */}
        {profile && (
          <div className="bg-white p-6 rounded shadow mb-6 animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4">User Profile</h3>
            <div className="flex items-center space-x-4">
              <img src={profile.avatar || user.avatar} alt="Avatar" className="w-16 h-16 rounded-full" />
              <div>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Phone:</strong> {profile.phone}</p>
              </div>
            </div>
          </div>
        )}

        {/* Task Management */}
        <div className="bg-white p-6 rounded shadow mb-6 animate-fadeIn">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                placeholder="Search tasks..."
                className="border p-2 pl-10 w-full rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select className="border p-2 rounded" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex gap-2">
            <input
              placeholder="Task title"
              className="border p-2 flex-1 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={addTask} className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition">
              Add
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredTasks.map(task => (
            <div key={task.id} className="bg-white p-4 rounded shadow flex justify-between items-center animate-slideUp">
              {editingTask === task.id ? (
                <input
                  defaultValue={task.title}
                  onBlur={(e) => editTask(task.id, e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && editTask(task.id, e.target.value)}
                  className="flex-1 border rounded p-1"
                  autoFocus
                />
              ) : (
                <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.title}</span>
              )}
              <div className="flex space-x-2">
                <button onClick={() => toggleComplete(task.id)} className="text-green-500 hover:text-green-700">
                  <CheckIcon className="h-5 w-5" />
                </button>
                <button onClick={() => setEditingTask(task.id)} className="text-blue-500 hover:text-blue-700">
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow">
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}