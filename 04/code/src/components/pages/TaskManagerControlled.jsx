import { useMemo, useState } from "react";
import TaskForm from "../TaskForm";
import TaskList from "../TaskList";
import { todayISO } from "../../utils/dates";

const TAGS = ["trabajo", "personal", "urgente", "opcional"];
const PRIORITIES = ["baja", "media", "alta"];

const init = {
	title: "",
	priority: "media",
	dueDate: "",
	tags: [],
	notes: "",
};

export default function TaskManagerControlled() {
	const [values, setValues] = useState(init);
	const [errors, setErrors] = useState({});
	const [tasks, setTasks] = useState([
		{
			id: crypto.randomUUID(),
			title: "Crear reportes",
			priority: "alta",
			dueDate: todayISO(),
			tags: ["trabajo", "urgente"],
			notas: "Revisarlo",
		},
	]);
	const [editingId, setEditingId] = useState(null);

	const onChange = (e) => {
		const { name, value, type } = e.target;
		setValues((v) => ({
			...v,
			[name]: type === "number" ? Number(value) : value,
		}));
	};
	const onToggleTag = (tag) => {
		setValues((v) => {
			const has = v.tags.includes(tag);
			return {
				...v,
				tags: has ? v.tags.filter((t) => t !== tag) : [...v.tags, tag],
			};
		});
	};

	const validate = () => {
		const e = {};
		if (!values.title.trim()) e.title = "El título es obligatorio";
		if (!values.dueDate) e.dueDate = "La fecha límite es obligatoria";
		if (values.dueDate && values.dueDate < todayISO()) {
			e.dueDate = "La fecha no puede ser anterior a hoy";
		}
		if (values.notes.length > 200) e.notes = "Máximo 200 caracteres";
		setErrors(e);
		return Object.keys(e).length === 0;
	};

	const resetForm = () => {
		setValues(init);
		setErrors({});
		setEditingId(null);
	};

	const onSubmit = (ev) => {
		ev.preventDefault();
		if (!validate()) return;
		if (editingId) {
			setTasks((prev) =>
				prev.map((t) => (t.id === editingId ? { ...t, ...values } : t))
			);
		} else {
			setTasks((prev) => [...prev, { id: crypto.randomUUID(), ...values }]);
		}
		resetForm();
	};

	const onEdit = (task) => {
		setValues({
			title: task.title,
			priority: task.priority,
			dueDate: task.dueDate,
			tags: task.tags,
			notes: task.notes,
		});
		setEditingId(task.id);
		setErrors({});
	};
	const onDuplicate = (task) => {
		const copy = {
			...task,
			id: crypto.randomUUID(),
			title: `${task.title} (copia)`,
		};
		setTasks((prev) => [...prev, copy]);
	};
	const onDelete = (id) => {
		setTasks((prev) => prev.filter((t) => t.id !== id));
		if (editingId === id) resetForm();
	};
	const onDuplicateFromForm = () => {
		const title = values.title || "Sin título (copia)";
		setTasks((prev) => [
			...prev,
			{ id: crypto.randomUUID(), ...values, title },
		]);
	};

	const remaining = 200 - values.notes.length;
	const submitDisabled =
		!values.title.trim() ||
		!values.dueDate ||
		values.dueDate < todayISO() ||
		values.notes.length > 200;
	const sortedTasks = useMemo(
		() => [...tasks].sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1)),
		[tasks]
	);

	return (
		<main className="max-w-3xl mx-auto p-6 grid md:grid-cols-2 gap-6">
			<TaskForm
				values={values}
				errors={errors}
				editingId={editingId}
				onChange={onChange}
				onToggleTag={onToggleTag}
				onSubmit={onSubmit}
				onCancelEdit={resetForm}
				onDuplicateFromForm={onDuplicateFromForm}
				remaining={remaining}
				submitDisabled={submitDisabled}
				TAGS={TAGS}
				PRIORITIES={PRIORITIES}
			/>
			<TaskList
				tasks={sortedTasks}
				onEdit={onEdit}
				onDuplicate={onDuplicate}
				onDelete={onDelete}
			/>
		</main>
	);
}
