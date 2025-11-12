import { motion } from "framer-motion";

export default function Primer() {
  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        className="w-24 h-24 bg-sky-500 rounded-lg"
        animate={{ x: 100, rotate: 45, scale: 1.5 }}
        transition={{ duration: 5 }}
      />
    </div>
  );
}
