npm i react-router-dom


## en main.jsx 
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


https://thesimpsonsapi.com/api


/api/characters
/api/characters/:id

#app

	{/* <StickyCountdown/> */}
			{/* <h1>Mini Sitio</h1>
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
			</Routes> */}
      {/* <div className="min-h-screen bg-yellow-100 text-zinc-900">
        <header className="bg-yellow-400 p-4 flex justify-between items-center shadow">
          <h1 className="text-2xl font-bold">The simpsons</h1>
            <nav className="flex gap-4">
                <Link to="/characters" className="hover:underline">Personajes</Link>
            </nav>
        </header>

      <main className="p-6">
        <Routes>
          <Route path="/characters" element={<Characters/>}/>
          <Route path="/characters/:id" element={<CharacterDetail/>}/>
        </Routes>
      </main> */}
      {/* </div>

		</> */}