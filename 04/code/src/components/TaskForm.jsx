import { todayISO } from "../utils/dates";

export default function TaskForm({
	values,
	errors,
	editingId,
	onChange,
	onToggleTag,
	onSubmit,
	onCancelEdit,
	onDuplicateFromForm,
	remaining,
	submitDisabled,
	TAGS,
	PRIORITIES,
}) {
	return (
		<section className="rounded-2xl border border-zinc-200 p-5 bg-white">
			<h1 className="text-xl font-semibold mb-4">
				{editingId ? "Editar tarea" : "Nueva tarea"}
			</h1>
			<form onSubmit={onSubmit} className="space-y-4">
				<label className="block space-y-1">
					<span className="text-sm text-zinc-700">Título de la tarea</span>
					<input
						type="text"
						name="title"
						value={values.title}
						onChange={onChange}
						className={
							"w-full h-10 rounded-xl border px-3 " +
							(errors.title
								? "border-red-500 focus-visible:ring-red-500 "
								: "border-zinc-300 focus-visible:ring-sky-500 ") +
							"bg-white text-zinc-900 placeholder-zinc-400 focus-visible:outline-none focus-visible:ring-2"
						}
						placeholder="Ej. Preparar demo de producto"
					/>
					{errors.title && (
						<p className="text-sm text-red-600">{errors.title}</p>
					)}
				</label>
				<fieldset className="space-y-2">
					<legend className="text-sm text-zinc-700">Prioridad</legend>
					<div className="flex gap-4">
						{PRIORITIES.map((p) => (
							<label key={p} className="inline-flex items-center gap-2">
								<input
									type="radio"
									name="priority"
									value={p}
									checked={values.priority === p}
									onChange={onChange}
								/>
								<span className="capitalize">{p}</span>
							</label>
						))}
					</div>
				</fieldset>
				<label className="block space-y-1">
					<span className="text-sm text-zinc-700">Fecha límite</span>
					<input
						type="date"
						name="dueDate"
						value={values.dueDate}
						min={todayISO()}
						onChange={onChange}
						className={
							"w-full h-10 rounded-xl border px-3 " +
							(errors.dueDate
								? "border-red-500 focus-visible:ring-red-500 "
								: "border-zinc-300 focus-visible:ring-sky-500 ") +
							"bg-white text-zinc-900 placeholder-zinc-400 focus-visible:outline-none focus-visible:ring-2"
						}
					/>
					{errors.dueDate && (
						<p className="text-sm text-red-600">{errors.dueDate}</p>
					)}
				</label>
				<fieldset className="space-y-2">
					<legend className="text-sm text-zinc-700">Etiquetas</legend>
					<div className="flex flex-wrap gap-4">
						{TAGS.map((t) => (
							<label key={t} className="inline-flex items-center gap-2">
								<input
									type="checkbox"
									checked={values.tags.includes(t)}
									onChange={() => onToggleTag(t)}
								/>
								<span className="capitalize">{t}</span>
							</label>
						))}
					</div>
				</fieldset>
				<label className="block space-y-1">
					<span className="text-sm text-zinc-700">Notas adicionales</span>
					<textarea
						name="notes"
						value={values.notes}
						onChange={onChange}
						maxLength={200}
						className={
							"w-full rounded-xl border px-3 py-2 min-h-24 " +
							(errors.notes
								? "border-red-500 focus-visible:ring-red-500 "
								: "border-zinc-300 focus-visible:ring-sky-500 ") +
							"bg-white text-zinc-900 placeholder-zinc-400 focus-visible:outline-none focus-visible:ring-2"
						}
						placeholder="Detalles, links o recordatorios (máx 200 caracteres)"
					/>
					<div className="flex items-center justify-between">
						{errors.notes ? (
							<p className="text-sm text-red-600">{errors.notes}</p>
						) : (
							<span />
						)}
						<span
							className={
								"text-xs " +
								(remaining <= 20 ? "text-orange-600" : "text-zinc-500")
							}
						>
							{values.notes.length}/200 ({remaining} restantes)
						</span>
					</div>
				</label>

				<div className="flex items-center gap-3">
					<button
						type="submit"
						disabled={submitDisabled}
						className="h-10 rounded-xl px-4 bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50"
					>
						{editingId ? "Guardar cambios" : "Crear tarea"}
					</button>
					<button
						type="button"
						onClick={onDuplicateFromForm}
						className="h-10 rounded-xl px-4 bg-zinc-800 text-white hover:bg-zinc-900"
					>
						Duplicar (desde el formulario)
					</button>
					{editingId && (
						<button
							type="button"
							onClick={onCancelEdit}
							className="h-10 rounded-xl px-4 border border-zinc-300 hover:bg-zinc-50"
						>
							Cancelar edición
						</button>
					)}
				</div>
			</form>
		</section>
	);
}
