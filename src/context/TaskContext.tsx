import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Task, TaskStatus } from '../types/task';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const updateTask = async (id: string, task: Partial<Task>) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/tasks/${id}`, task);
      setTasks(tasks.map(t => t._id === id ? response.data : t));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};