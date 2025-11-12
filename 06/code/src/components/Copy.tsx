import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
export default function Copy() {
	const [copied, setCopied] = useState(false);
	return (
		<button
			onClick={() => {
				navigator.clipboard.writeText("https://rallydemoto.com");
				setCopied(true);
				setTimeout(() => setCopied(false), 1000);
			}}
			className="relative px-4 py-2 bg-sky-600 text-white rounded"
		>
			{copied ? (
				<CheckIcon className="w-6 h-6" />
			) : (
				<ClipboardDocumentIcon className="w-6 h-6" />
			)}
		</button>
	);
}
