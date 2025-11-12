import { AnimatePresence, motion } from "framer-motion";
import { useLocation, Routes, Route, Link } from "react-router-dom";

export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Page title="Inicio" />} />
        <Route path="/about" element={<Page title="Acerca" />} />
      </Routes>
    </AnimatePresence>
  );
}

function Page({ title }: { title: string }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8 text-center"
    >
      <h1 className="text-4xl font-bold">{title}</h1>
      <Link to="/">Inicio</Link>
      <Link to="/about">Acerca</Link>
    </motion.main>
  );
}
