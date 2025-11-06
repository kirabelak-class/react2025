import { toast } from "react-hot-toast";

const priorityColors = {
  low: "bg-green-100 text-green-800 border-green-300",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
  high: "bg-red-100 text-red-800 border-red-300",
};

export default function TaskList({ tasks, onToggleComplete, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500 text-lg">No hay tareas aún</p>
        <p className="text-gray-400 text-sm mt-2">
          Agrega tu primera tarea usando el formulario
        </p>
      </div>
    );
  }

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro de eliminar esta tarea?")) {
      onDelete(id);
      toast.success("Tarea eliminada");
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Mis Tareas ({tasks.length})
      </h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg ${
            task.completed ? "opacity-60" : ""
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              className="mt-1 w-5 h-5 cursor-pointer"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    className={`font-semibold text-lg ${
                      task.completed ? "line-through text-gray-500" : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority === "low"
                    ? "Baja"
                    : task.priority === "medium"
                    ? "Media"
                    : "Alta"}
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onEdit(task)}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}