import ProductCard from "./ProductCard";
export default function ProductGrid({ products, onDelete }) {
	if (!products?.length) return null;
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			{products.map((p) => (
				<ProductCard key={p.id} product={p} onDelete={onDelete} />
			))}
		</div>
	);
}
