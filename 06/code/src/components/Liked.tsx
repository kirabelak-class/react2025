import { useState } from "react";
import { HandThumbUpIcon,HandThumbDownIcon } from "@heroicons/react/24/solid"
export default function Liked() {
	const [liked, setLiked] = useState<boolean>(false);

	return (
		<button
		onClick={() => setLiked(!liked)}
		className={`px-4 py-2 rounded transition-colors ${
			liked ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-900"
		}`}
	>
			{liked ? <HandThumbUpIcon className="w-6 h-6" /> : <HandThumbDownIcon className="w-6 h-6" />}
		</button>
	);
}
