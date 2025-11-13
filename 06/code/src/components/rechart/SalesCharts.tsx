import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

async function fetchSales() {
  const res = await fetch("https://dummyjson.com/products");
  const json = await res.json();
  return json.products.map((p: { title: string, stock: number }): { name: string, sales: number } => ({
    name: p.title.slice(0, 10) + "...",
    sales: p.stock,
  }));
}

export default function SalesChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sales"],
    queryFn: fetchSales,
  });

  if (isLoading) return <p className="p-6 text-gray-500 animate-pulse">⏳ Cargando datos...</p>;
  if (isError) return <p className="p-6 text-red-500">❌ Error al cargar</p>;

  return (
    <div className="w-full h-80 p-6">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}