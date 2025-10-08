import { Outlet, Link } from "react-router-dom";
export default function Blog() {
	return (
		<div>
			<h2>Blog</h2>
			<ul>
				<li>
					<Link to="1">Post 1</Link>
				</li>
				<li>
					<Link to="2">Post 2</Link>
				</li>
				<li>
					<Link to="nuevo">Nuevo</Link>
				</li>
			</ul>
            <hr />
			{/* se renderiza la ruta anidada aca  */}
			<Outlet />
		</div>
	);
}
