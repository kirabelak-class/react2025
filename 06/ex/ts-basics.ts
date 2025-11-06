type Role = "admin" | "user";

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

function greetUser(user: User): string {
  return `Hola, ${user.name}! Tu rol es ${user.role}.`;
}

const me: User = { id: 1, name: "Kaleb", email: "kaleb@demo.com", role: "admin" };

console.log(greetUser(me));
