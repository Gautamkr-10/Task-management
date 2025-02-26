import React, { useState } from 'react';
import { Task, TaskStatus } from '../types/task';
import { MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { useTaskContext } from '../context/TaskContext';

interface TaskListProps {
  status: TaskStatus;
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ status, tasks }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  
  const filteredTasks = tasks.filter(task => task.status === status);

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    await updateTask(taskId, { status: newStatus });
    setActiveMenu(null);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    setActiveMenu(null);
  };
  
  return (
    <div className="bg-gray-50 rounded-lg p-4 min-h-[600px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${
            status === 'To Do' ? 'bg-purple-500' :
            status === 'On Progress' ? 'bg-orange-500' :
            status === 'Done' ? 'bg-green-500' :
            'bg-red-500'
          }`} />
          <h2 className="font-semibold">{status}</h2>
          <span className="text-gray-500 text-sm">({filteredTasks.length})</span>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div key={task._id} className="bg-white rounded-lg p-4 shadow-sm relative">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-8">
                <span className={`text-xs px-2 py-1 rounded ${
                  task.priority === 'Low' ? 'bg-blue-100 text-blue-800' :
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {task.priority}
                </span>
                <h3 className="font-medium mt-2">{task.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{task.description}</p>
              </div>
              <div className="relative">
                <button 
                  className="text-gray-400 hover:text-gray-600 p-1"
                  onClick={() => setActiveMenu(activeMenu === task._id ? null : task._id)}
                >
                  <MoreHorizontal size={20} />
                </button>
                {activeMenu === task._id && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      {status !== 'To Do' && (
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleStatusChange(task._id, 'To Do')}
                        >
                          Move to To Do
                        </button>
                      )}
                      {status !== 'On Progress' && (
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleStatusChange(task._id, 'On Progress')}
                        >
                          Move to On Progress
                        </button>
                      )}
                      {status !== 'Done' && (
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleStatusChange(task._id, 'Done')}
                        >
                          Move to Done
                        </button>
                      )}
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={() => handleDeleteTask(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Deadline: {format(new Date(task.deadline), 'MM/dd/yy')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};