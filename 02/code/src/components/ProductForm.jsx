import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/Card";

export default function ProductForm({ onCreate }) {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("");

	const submit = (e) => {
		e.preventDefault();
		const p = Number(price);
		if (!title.trim() || !p || !category.trim()) return;
		onCreate({ title: title.trim(), price: p, category: category.trim() });
		setTitle("");
		setPrice("");
		setCategory("");
	};

	return (
		<Card>
			<CardHeader>
				<h3 className="font-semibold">Agregar producto</h3>
			</CardHeader>
			<form onSubmit={submit}>
				<CardContent className="grid gap-3">
					<Input
						placeholder="Nombre"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Input
						placeholder="Precio"
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					<Input
						placeholder="Categoría"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					/>
				</CardContent>
				<CardFooter className="flex justify-end">
					<Button type="submit">Crear</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
