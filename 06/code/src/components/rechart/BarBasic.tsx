import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { mes: "Enero", clientes: 100 },
  { mes: "Febrero", clientes: 80 },
  { mes: "Marzo", clientes: 150 },
  { mes: "Abril", clientes: 90 },
];

export default function BarExample() {
  return (
    <div className="w-full h-80 p-6">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="clientes" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}