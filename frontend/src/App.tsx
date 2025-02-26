import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { useTaskContext } from './context/TaskContext';
import { Plus, ClipboardList, CheckCircle, Clock, Search } from 'lucide-react';

function TaskBoard() {
  const { tasks, loading, error } = useTaskContext();
  const [showAddTask, setShowAddTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
            <div className="mt-4 flex gap-6">
              <div className="flex items-center gap-2">
                <Clock className="text-red-500" size={20} />
                <div>
                  <p className="text-2xl font-semibold">{tasks.filter(t => t.status === 'Expired').length}</p>
                  <p className="text-sm text-gray-600">Expired Tasks</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardList className="text-blue-500" size={20} />
                <div>
                  <p className="text-2xl font-semibold">{tasks.length}</p>
                  <p className="text-sm text-gray-600">All Active Tasks</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={20} />
                <div>
                  <p className="text-2xl font-semibold">
                    {tasks.filter(t => t.status === 'Done').length}/{tasks.length}
                  </p>
                  <p className="text-sm text-gray-600">Completed Tasks</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Project"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowAddTask(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <TaskList status="To Do" tasks={filteredTasks} />
          <TaskList status="On Progress" tasks={filteredTasks} />
          <TaskList status="Done" tasks={filteredTasks} />
          <TaskList status="Expired" tasks={filteredTasks} />
        </div>
      </div>

      {showAddTask && <TaskForm onClose={() => setShowAddTask(false)} />}
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <TaskBoard />
    </TaskProvider>
  );
}

export default App;