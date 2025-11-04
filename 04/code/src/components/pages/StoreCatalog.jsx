import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductFilters from "../store/ProductFilters";
import ProductForm from "../store/ProductForm";
import ProductList from "../store/ProdocutList";

export default function StoreCatalog() {
	const {
		categories,
		products,
		loading,
		filter,
		setFilter,
		createProduct,
		updateProduct,
		deleteProduct,
	} = useProducts();
	const [selectedProduct, setSelectedProduct] = useState(null);
	const handleCreateOrUpdate = async (data) => {
		const result = selectedProduct
			? await updateProduct(selectedProduct.id, data)
			: await createProduct(data);
		if (result.success) {
			alert(
				selectedProduct
					? "Producto actualizado"
					: "Producto creado exitosamente"
			);
			setSelectedProduct(null);
		} else {
			alert("Error en la operacion");
		}
	};
	const handleEdit = (product) => {
		setSelectedProduct({
			...product,
			price: product.price.toString(),
			stock: product.stock?.toString() || "0",
			images: product.images?.slice(0, 5) || [""],
		});
	};
	const handleDuplicate = (product) => {
		setSelectedProduct({
			title: `${product.title} (Copia)`,
			price: product.price.toString(),
			category: product.category,
			stock: product.stock?.toString() || "0",
			images: product.images?.slice(0, 5) || [""],
		});
	};
	const handleDelete = async (id) => {
		if (!confirm("¿Eliminar este producto?")) return;
		const result = await deleteProduct(id);
		if (result.success) {
			alert("Producto elinado");
		} else {
			alert("Error al eliminar");
		}
	};

	const handleCancel = () => {
		setSelectedProduct(null);
	};
	return (
		<div className="mx-auto p-6 space-y-6">
			<header className="border-b pb-4">
				<h1 className="text-4xl font-bold">Store Catalog</h1>
			</header>
            <ProductFilters filter={filter} setFilter={setFilter} categories={categories}/>
            <div className="grid lg:grid-cols-2 gap-4">
                <ProductForm
                selectedProduct={selectedProduct}
                onSubmit={handleCreateOrUpdate}
                onCancel={handleCancel}
                categories={categories}
                loading={loading}
                />
                <ProductList
                products={products}
                loading={loading}
                onEdit={handleEdit}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
                />
            </div>
		</div>
	);
}
