import { useEffect, useState } from "react";
import "./App.css";

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string; city: string };
}

function UserCard({ user }: { user: User }) {
  return(
  <div className="p-4 border rounded-lg shadow-sm hover:shadow transition-all">
    <h3 className="font-semibold">{user.name}</h3>
    <p className="text-sm text-gray-600">{user.email}</p>
    <p className="text-xs italic text-gray-400">{user.company.name}</p>
  </div>
  )
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);
  return (
    <main className="p-6 space-y-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Usuarios (TS)</h1>
      {loading ? (
        <p className="animate-pulse text-gray-500">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {users.map((u) => (
            <UserCard key={u.id} user={u} />
          ))}
        </div>
      )}
    </main>
  );
}

export default App;
