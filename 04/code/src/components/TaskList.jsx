import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onDuplicate, onDelete }) {
  if (tasks.length === 0) {
    return (
      <section className="rounded-2xl border border-zinc-200 p-5 bg-white">
        <h2 className="text-lg font-semibold mb-4">Tareas</h2>
        <p className="text-zinc-500">No hay tareas aún.</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-200 p-5 bg-white">
      <h2 className="text-lg font-semibold mb-4">Tareas</h2>
      <ul className="space-y-3">
        {tasks.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
