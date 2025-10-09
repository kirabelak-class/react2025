import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import About from "./routes/About";
import User from "./routes/User";
import Blog from "./routes/Blog";
import Post from "./routes/Posts";
import StickyCountdown from "./components/StickyCountdown";
import CreatePost from "./routes/CreatePost";
import Characters from "./routes/Characters"
import CharacterDetail from "./routes/CharacterDetail"
import { ThemeProvider } from "./contex/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import ThemedCard from "./components/ThemedCard";
function App() {
	return (
		<ThemeProvider>
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center gap-6">
        <h1>Contexto de tema</h1>
        <ThemeToggle/>
        <ThemedCard/>
      </main>
    </ThemeProvider>
		
	);
}

export default App;
