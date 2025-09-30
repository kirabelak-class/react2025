import UserCard from "./UserCard";

export default function UserList({ users, onRemove }) {
	if (!users.length) {
		return <p>No hay usuarios. Agrega uno</p>;
	}

	return (
		<ul style={{ paddingLeft: 0, listStyle: "none" }}>
			{users && users.map((u) => (
				<UserCard key={u.id} user={u} onRemove={onRemove} />
			))}
		</ul>
	);
}
