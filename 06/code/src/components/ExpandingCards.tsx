import { useState } from "react";
import { motion } from "framer-motion";

export default function ExpandingCards() {
  const [selected, setSelected] = useState<number | null>(null);

  const items = Array.from({ length: 4 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-2 gap-4 p-8">
      {items.map((id) => (
        <motion.div
          key={id}
          layout
          onClick={() => setSelected(selected === id ? null : id)}
          className={`p-6 rounded-lg cursor-pointer ${
            selected === id ? "bg-sky-600 text-white" : "bg-gray-200"
          }`}
        >
          <motion.h3 layout>Card {id}</motion.h3>
          {selected === id && (
            <motion.p layout className="mt-2 text-sm">
              Detalle expandido de la card {id}.
            </motion.p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
