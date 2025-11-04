import { useState, useEffect } from "react";

export function useProducts() {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [filter, setFilter] = useState({ category: "", search: "" });

	useEffect(() => {
		fetch("https://dummyjson.com/products/categories")
			.then((res) => res.json())
			.then((data) => setCategories(data))
			.catch((err) => console.error(err));
	}, []);

	const loadProducts = async () => {
		setLoading(true);
		try {
			let url = "https://dummyjson.com/products?limit=10";

			if (filter.category) {
				url = `https://dummyjson.com/products/category/${filter.category}`;
			} else if (filter.search) {
				url = `https://dummyjson.com/products/search?q=${filter.search}`;
			}

			const res = await fetch(url);
			const data = await res.json();
			setProducts(data.products || []);
		} catch (error) {
			console.error("Error cargando productos:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadProducts();
	}, [filter]);

	const createProduct = async (data) => {
		setLoading(true);
		try {
			const productData = {
				title: data.title,
				price: data.price,
				category: data.category,
				stock: data.stock,
				images: data.images?.filter((img) => img) || [],
			};

			const res = await fetch("https://dummyjson.com/products/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(productData),
			});
			const newProduct = await res.json();
			setProducts([newProduct, ...products]);
			return { success: true, data: newProduct };
		} catch (error) {
			return { success: false, error };
		} finally {
			setLoading(false);
		}
	};

	const updateProduct = async (id, data) => {
		setLoading(true);
		try {
			const res = await fetch(`https://dummyjson.com/products/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: data.title,
					price: data.price,
					category: data.category,
					stock: data.stock,
				}),
			});

			const updated = await res.json();
			setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
			return { success: true, data: updated };
		} catch (error) {
			return { success: false, error };
		} finally {
			setLoading(false);
		}
	};
	const deleteProduct = async (id) => {
		setLoading(true);
		try {
			await fetch(`https://dummyjson.com/products/${id}`, {
				method: "DELETE",
			});

			setProducts(products.filter((p) => p.id !== id));
			return { success: true };
		} catch (error) {
			return { success: false, error };
		} finally {
			setLoading(false);
		}
	};

	return {
		categories,
		products,
		loading,
		filter,
		setFilter,
		createProduct,
		updateProduct,
		deleteProduct,
	};
}
