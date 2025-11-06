import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";
import { toast } from "react-hot-toast";

const TaskSchema = v.object({
  title: v.pipe(v.string(), v.minLength(3, "Mínimo 3 caracteres")),
  description: v.pipe(v.string(), v.minLength(10, "Mínimo 10 caracteres")),
  priority: v.pipe(v.string(), v.minLength(1, "Selecciona una prioridad")),
});

export default function TaskForm({ onAddTask, editingTask, onUpdateTask, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(TaskSchema),
    defaultValues: editingTask || {
      title: "",
      description: "",
      priority: "",
    },
  });

  const onSubmit = (data) => {
    if (editingTask) {
      onUpdateTask({ ...editingTask, ...data });
      toast.success("Tarea actualizada");
    } else {
      onAddTask({
        ...data,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
      });
      toast.success("Tarea agregada");
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-md p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        {editingTask ? "Editar Tarea" : "Nueva Tarea"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          {...register("title")}
          placeholder="Ej: Terminar proyecto de React"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("description")}
          rows={3}
          placeholder="Describe los detalles de la tarea..."
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Prioridad <span className="text-red-500">*</span>
        </label>
        <select
          {...register("priority")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
            errors.priority ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Seleccionar...</option>
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
        {errors.priority && (
          <p className="text-red-600 text-sm mt-1">
            {errors.priority.message}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {editingTask ? "Actualizar" : "Agregar Tarea"}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}