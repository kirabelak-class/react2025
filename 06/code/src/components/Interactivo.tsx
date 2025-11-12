import { motion } from "framer-motion";

export default function Interactivo() {
  return (
    <div className="flex gap-4 p-8 justify-center">
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "#0ea5e9" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400 }}
        className="px-4 py-2 bg-sky-600 text-white rounded-lg"
      >
        Hover Me
      </motion.button>

      <motion.button
        drag
        dragConstraints={{ left: -50, right: 50, top: -20, bottom: 20 }}
        className="px-4 py-2 bg-emerald-500 text-white rounded-lg"
      >
        Drag Me
      </motion.button>
    </div>
  );
}
