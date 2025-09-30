import { useState, useRef, useMemo } from "react";

const users = Array.from({ length: 20000000 }, (_, i) => ({
	id: i,
	name: `Usuario ${i + 1}`,
}));

function UserList({ users }) {
	return (
		<ul>
			{users.map((u) => (
				<li key={u.id}>{u.name}</li>
			))}
		</ul>
	);
}

export default function FilerList() {
	const [query, setQuery] = useState("");
	const inputRef = useRef();

	const filtered = useMemo(
		() =>
			users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase())),
		[query]
	);

	return (
		<div>
			<input
				ref={inputRef}
				placeholder="Buscar usuario..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<button onClick={() => inputRef.current.focus()}>Focus</button>
			<UserList users={filtered} />
		</div>
	);
}
