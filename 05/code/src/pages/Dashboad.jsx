import { useState, useEffect } from "react";
import { useAuth } from "../providers/AuthContex";
import Navbar from "../components/NavBar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem(`tasks_${user.email}`);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [user.email]);

  useEffect(() => {
    localStorage.setItem(`tasks_${user.email}`, JSON.stringify(tasks));
  }, [tasks, user.email]);

  const handleAddTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setEditingTask(null);
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const handleEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-600">
            Hola, {user.name}
          </h1>
          <p className="text-gray-600 mt-1">
            Tienes {completedCount} de {tasks.length} tareas completadas
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <TaskForm
            onAddTask={handleAddTask}
            editingTask={editingTask}
            onUpdateTask={handleUpdateTask}
            onCancel={() => setEditingTask(null)}
          />
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
}
