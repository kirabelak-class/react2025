export default function UserCard({ user, onRemove }) {
	return (
		<li
			style={{
				display: "flex",
				gap: "8px",
				alignItems: "center",
				margin: "6px 0",
			}}
		>
			<span>{user.name}</span>
			<button onClick={() => onRemove(user.id)}>Eliminar</button>
		</li>
	);
}
