const Base = "https://dummyjson.com";

export async function listProducts({
	limit = 12,
	skip = 0,
	q = "",
	category = "",
}) {
	const url = q
		? `${Base}/products/search?q=${encodeURIComponent(
				q
		  )}&limit=${limit}&skip=${skip}`
		: category
		? `${Base}/products/category/${encodeURIComponent(
				category
		  )}?limit=${limit}&skip=${skip}`
		: `${Base}/products?limit=${limit}&skip=${skip}`;

	const res = await fetch(url);
	if (!res.ok) throw new Error("Error al listar productos");
	return res.json();
}

export async function getCategories() {
	const res = await fetch(`${Base}/products/categories`);
	if (!res.ok) throw new Error("Error al cargar categorias");
	return res.json();
}

export async function addProduct(product) {
	//En peticiones como el post es donde se complica la sintaxis y se diferencia de axios
	const res = await fetch(`${Base}/products/add`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(product),
	});
    //axios.post(url,body)
	if (!res.ok) throw new Error("Error al crear el producto");
	return res.json();
}

export async function deleteProduct(id) {
    const res= await fetch(`${Base}/products/${id}`, { method: "DELETE" });
    if(!res.ok) throw new Error("Error al eliminar el producto")
    return res.json()
}
