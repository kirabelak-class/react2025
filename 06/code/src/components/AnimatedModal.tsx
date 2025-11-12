import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedModal() {
  const [open, setOpen] = useState(false);

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <button
        onClick={() => setOpen(true)}
        className="bg-sky-600 text-white px-4 py-2 rounded"
      >
        Abrir Modal
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold">Modal animado</h2>
              <p className="text-gray-600 mt-2">Se monta y desmonta suavemente</p>
              <button
                onClick={() => setOpen(false)}
                className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
