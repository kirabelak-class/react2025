export default function ProductFilters({ filter, setFilter, categories }) {
	return (
		<div className="bg-gray-50 border rounded-lg p-4 space-y-3">
			<h2 className="font-semibold text-lg">Filtros</h2>
			<div className="drid md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb01">buscar</label>
					<input
						type="text"
						placeholder="Buscar productos..."
						value={filter.search}
						onChange={(e) =>
							setFilter({ category: "", search: e.target.value })
						}
						className="border w-full rounded h-10 px-3"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Categoría</label>
					<select
						value={filter.category}
						onChange={(e) =>
							setFilter({ search: "", category: e.target.value })
						}
						className="border w-full rounded h-10 px-3"
					>
						<option value="">Todas las categorías</option>
						{categories.map((cat) => (
							<option key={cat.slug} value={cat.slug}>
								{cat.name}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}
