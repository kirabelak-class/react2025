import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "México", value: 400 },
  { name: "EUA", value: 300 },
  { name: "Canadá", value: 200 },
];

const COLORS = ["#0ea5e9", "#f97316", "#10b981"];

export default function PieExample() {
  return (
    <div className="w-full h-80 p-6">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100} label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}