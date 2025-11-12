import { RocketLaunchIcon } from "@heroicons/react/24/solid";
export default function Go() {
	return (
		<button className="transition-transform flex items-center gap-2 hover:scale-110 active:scale-95">
			<RocketLaunchIcon className="w-6 h-6" /> Lanzar
		</button>
	);
}
