import Input from "../ui/Input";
import Button from "../ui/Button";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  return (
    <div className="flex gap-2">
      <Input placeholder="Buscar por nombre..." value={q} onChange={(e) => setQ(e.target.value)} />
      <Button onClick={() => onSearch(q)}>Buscar</Button>
      <button
        className="h-10 px-3 rounded-xl border border-zinc-300"
        onClick={() => { setQ(""); onSearch(""); }}
      >
        Limpiar
      </button>
    </div>
  );
}
