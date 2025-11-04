import ProductCard from "./ProductCard";

export default function ProductList({
	products,
	loading,
	onEdit,
	onDuplicate,
	onDelete,
}) {
	if (loading) {
		return <div className="text-center py-8 text-gray-500">Cargando...</div>;
	}
	if (products.lengt === 0) {
		return (
			<div className="text-center py-8 text-gray-500">
				No se encontraron productos
			</div>
		);
	}
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="font-semibold text-xl">Productos ({products.length})</h2>
			</div>
			<div className="space-y-3 max-h-[600px] overflow-y-auto">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						onEdit={onEdit}
						onDuplicate={onDuplicate}
						onDelete={onDelete}
					/>
				))}
			</div>
		</div>
	);
}
