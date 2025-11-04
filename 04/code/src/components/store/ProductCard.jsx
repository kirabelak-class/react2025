export default function ProductCard({
	product,
	onEdit,
	onDuplicate,
	onDelete,
}) {
	return (
		<div className="border rounded-lg p-4 bg-wite hover:shadow-md transition">
			<div className="flex gap-4">
				{product.thumbnail && (
					<img
						src={product.thumbnail}
						alt={product.title}
						className="w-20 h-20 object-cover rounded"
					/>
				)}
				<div className="flex-1">
					<h3 className="font-semibold">{product.title}</h3>
					<p className="text-sm text-gray-600">{product.category}</p>
					<div className="flex items-center gap-3 mt-2">
						<span className="font-bold text-emerald-600">${product.price}</span>
						<span className="text-sm text-gray-500">
							Stock: {product.stock}
						</span>
					</div>
				</div>
			</div>
			<div className="flex gap-2 mt-3">
				<button
					onClick={() => onEdit(product)}
					className="flex-1 bg-blue-500 text-white py-1 rounded text-sm hover:bg-blue-700"
				>
					Editar
				</button>
				<button
					onClick={() => onDuplicate(product)}
					className="flex-1 bg-purple-500 text-white py-1 rounded text-sm hover:bg-purple-700"
				>
					Duplicar
				</button>
				<button
					onClick={() => onDelete(product.id)}
					className="flex-1 bg-red-500 text-white py-1 rounded text-sm hover:bg-red-700"
				>
					Eliminar
				</button>
			</div>
		</div>
	);
}
