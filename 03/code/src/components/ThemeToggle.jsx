import { useTheme } from "../contex/ThemeContext";

export default function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	return (
		<button
			onClick={toggleTheme}
			className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
		>
			{theme === "light" ? "Modo oscuro" : "Modo Claro"}
		</button>
	);
}
