import { useTheme } from "../contex/ThemeContext";
import Button from "./Button"
export default function ThemedCard() {
	const { theme } = useTheme();
	return (
		<div
			className={`
        max-w-md mx-auto mt-8 p-6 rounded-2xl shadow-lg border
        transition-all duration-500 ease-in-out
        ${
					theme === "light"
						? "bg-white border-zinc-200 text-zinc-800"
						: "bg-zinc-800 border-zinc-700 text-zinc-100"
				}
      `}
		>
			<h2 className="text-2xl font-bold mb-2"> Tarjeta de ejemplo</h2>
			<p className="mt-3 text-xs italic text-sky-500">
				Tema actual: {theme.toUpperCase()}
			</p>
			<Button>Hijo</Button>
		</div>
	);
}
