//loading errir y datos
const { data, error, isLoading } = useQuery(
	["users"], // key
	() => fetchUsers()
);

//   api/users
export async function fetchUsers() {
	const res = await fetch("https://jsonplaceholder.typicode.com/users");
	if (!res.ok) throw new Error("Error al cargar usuarios");
	return res.json();
}

export async function addUser(newUser) {
	const res = await fetch("https://jsonplaceholder.typicode.com/users", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newUser),
	});
	if (!res.ok) throw new Error("Error al agregar usuario");
	return res.json();
}

//api usersQuery
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, addUser } from "./api/users";

export default function UsersQuery() {
	const queryClient = useQueryClient();

	const { data, error, isLoading } = useQuery(["users"], fetchUsers);

	const mutation = useMutation(addUser, {
		onSuccess: () => queryClient.invalidateQueries(["users"]),
	});

	if (isLoading) return <p> Cargando...</p>;
	if (error) return <p>{error.message}</p>;

	return (
		<div>
			<h2>Usuarios</h2>
			<ul>
				{data.map((u) => (
					<li key={u.id}>{u.name}</li>
				))}
			</ul>
			<button onClick={() => mutation.mutate({ name: "Nuevo User" })}>
				Agregar Usuario
			</button>
		</div>
	);

    
}


import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []); 
  	const addproduct=async()=>{
		setAdding(true)
		  const newProduct = { name: "Nuevo producto", price: 200 };
    	await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    setAdding(false);
	const res = await fetch("/api/products");
      const data = await res.json();
	  setProducts(data)
	}
	
}