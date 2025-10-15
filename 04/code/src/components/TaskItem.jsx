import { isDueSoon, isOverdue } from "../utils/dates";

export default function TaskItem({ task, onEdit, onDuplicate, onDelete }) {
	const dueSoon = isDueSoon(task.dueDate);
	const overdue = isOverdue(task.dueDate);

	return (
		<li
			className={
				"rounded-xl border p-4 flex flex-col gap-2 " +
				(overdue
					? "border-red-400 bg-red-50"
					: dueSoon
					? "border-amber-400 bg-amber-50"
					: "border-zinc-200 bg-white")
			}
		>
			<div className="flex items-start justify-between gap-4">
				<div>
					<h3 className="font-semibold">{task.title}</h3>
					<p className="text-sm text-zinc-600">
						Vence: <strong>{task.dueDate || "-"}</strong>{" "}
						{overdue && <span className="text-red-600">(vencida)</span>}
						{!overdue && dueSoon && (
							<span className="text-amber-700">(por vencer)</span>
						)}
					</p>
					<p className="text-sm">
						Prioridad:{" "}
						<span className="capitalize font-medium">{task.priority}</span>
					</p>
					{task.tags?.length > 0 && (
						<div className="mt-1 flex flex-wrap gap-2">
							{task.tags.map((tag) => (
								<span
									key={tag}
									className="px-2 py-0.5 text-xs rounded-full bg-zinc-100 border border-zinc-200 capitalize"
								>
									{tag}
								</span>
							))}
						</div>
					)}
					{task.notes && (
						<p className="text-sm text-zinc-700 mt-1 line-clamp-2">
							{task.notes}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<button
						className="h-9 px-3 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
						onClick={() => onEdit(task)}
					>
						Editar
					</button>
					<button
						className="h-9 px-3 rounded-lg bg-zinc-800 text-white hover:bg-zinc-900"
						onClick={() => onDuplicate(task)}
					>
						Duplicar
					</button>
					<button
						className="h-9 px-3 rounded-lg border border-zinc-300 hover:bg-zinc-50"
						onClick={() => onDelete(task.id)}
					>
						Eliminar
					</button>
				</div>
			</div>
		</li>
	);
}
