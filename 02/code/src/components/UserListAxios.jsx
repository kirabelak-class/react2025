import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Skeleton from "./loading/Skeleton";
import Shimmer from "./loading/Shimmer";
import Loading from "./loading/Loading";
import axios from "axios"

export default function UserListFetch() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function loadUsers() {
			try {
				const res = await axios.get("https://jsonplaceholder.typicode.com/users");
				setUsers(res.data);
			} catch (error) {
				setError(error.message);
				toast.error("algo ocurrio mal");
			} finally {
				setLoading(false);
			}
		}
		loadUsers(); 
	}, []);
	if (loading) {
		return (
			<div>
				<Loading size="40px" />
				<Skeleton width="80%" height="20px" />
				<Skeleton width="60%" height="20px" />
				<Skeleton width="90%" height="20px" />
			</div>
		);
	}

	if (error) {
		return (
			<ErrorState message={error} onRetry={() => window.location.reload()} />
		);
	}
	if (!users.length) {
		return <p>No hay usuarios disponibles.</p>;
	}
	return (
		<ul>
			{users.map((u) => (
				<li key={u.id}>{u.name}</li>
			))}
		</ul>
	);
}
