import { useRef, useState } from "react";

export default function SearchBar({ onSearch, onClear }) {
	const [q, setQ] = useState("");
	const inputRef = useRef();

	const submit = () => onSearch(q);
	const clear = () => {
		setQ("");
		onClear?.();
		inputRef?.current?.focus();
	};

	return (
		<div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
			<input 
                ref={inputRef}
                value={q}
                onChange={(e)=>setQ(e.target.value)}
                placeholder="Bucar por nombre o ID"
            />
            <button onClick={submit}>Buscar</button>
            <button onClick={clear}>Limpiar</button>
		</div>
	);
}
