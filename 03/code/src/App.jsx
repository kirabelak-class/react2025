import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import About from "./routes/About";
import User from "./routes/User";
import Blog from "./routes/Blog";
import Post from "./routes/Posts";
import StickyCountdown from "./components/StickyCountdown";
import CreatePost from "./routes/CreatePost";
function App() {
	return (
		<>
			{/* <StickyCountdown/> */}
			<h1>Mini Sitio</h1>
			<nav>
				<Link to="/">Inicio</Link>
				<Link to="/about">Sobre nosotros</Link>
				<Link to="/user/43">Perfil</Link>
				<Link to="/blog">Blog</Link>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/user/:id" element={<User />} />
				<Route path="/blog" element={<Blog />}>
					<Route path=":id" element={<Post />}/>
					<Route path="nuevo" element={<CreatePost />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
