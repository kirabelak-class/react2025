import { useMemo, useState } from "react";
import toast from "react-hot-toast";
export default function BigList({ items }) {
	const [filter, setFilter] = useState("");

	const filteredItems = useMemo(() => {
		toast.loading("Calculando");
		return items.filter((i) => i.includes(filter));
	}, [items, filter]);

	return (
		<div>
			<input value={filter} onChange={(e) => setFilter(e.target.value)} />
			<ul>
				{filteredItems.map((i) => (
					<li key={i}>{i}</li>
				))}
			</ul>
		</div>
	);
}
