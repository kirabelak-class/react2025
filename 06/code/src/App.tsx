import "./App.css";
import Liked from "./components/Liked";
import Shimmer from "./components/Shimmer";
import Go from "./components/Go";
import AnimatedRoutes from "./components/Spa";
import Copy from "./components/Copy";
import Primer from "./components/Primer";
import Interactivo from "./components/Interactivo";
import AnimatedModal from "./components/AnimatedModal";
import ExpandingCards from "./components/ExpandingCards";
function App() {
 
  return (
    <main className="p-6 space-y-4 max-w-2xl mx-auto">
     
      {/* <Liked /> */}
      {/* Tailwind Transitions + Animations */}
      {/* <Shimmer /> */}
      {/* <Go /> */}

      {/* emocional */}
      {/* <Copy /> */}

      {/* motion */}
      {/* <Primer /> */}
      {/* <Interactivo /> */}
      {/* <AnimatedModal /> */}
      {/* <ExpandingCards /> */}



      {/* motion + router dom */}
      <AnimatedRoutes />
    </main>
  );
}

export default App;
