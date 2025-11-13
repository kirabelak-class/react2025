import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { producto: "A", ventas: 240 },
  { producto: "B", ventas: 120 },
  { producto: "C", ventas: 350 },
];

const CustomTooltip = ({ active, payload }: { active: boolean, payload: { payload: { producto: string }, value: number }[] }) =>
  active && payload.length > 0 ? (
    <div className="bg-white border p-2 shadow rounded text-sm">
      <p>Producto: {payload[0].payload.producto}</p>
      <p className="font-semibold text-sky-600">Ventas: {payload[0].value} unidades</p>
    </div>
  ) : null;

export default function CustomTooltipChart() {
  return (
    <div className="w-full h-80 p-6">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="producto" />
          <YAxis />
          <Tooltip content={<CustomTooltip active={true} payload={[{ payload: { producto: "A" }, value: 240 }]} />} />
          <Bar dataKey="ventas" fill="#0ea5e9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}