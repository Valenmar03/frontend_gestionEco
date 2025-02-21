import { Link } from "react-router-dom";
import { pages } from "../data";

export default function DashboardView() {
  return (
    <main className="bg-gray-50 mx-10 p-10 shadow rounded">
      <h1 className="text-center text-5xl font-bold text-vida-loca-600">Gestión Ecorganico</h1>
      <h2 className="text-center text-xl mt-2 text-vida-loca-600/90">Gestioná tu negocio</h2>
      {
        pages.map((page) => (
          <div key={page.title} className={`p-5 shadow-xl m-10 w-1/3 rounded-md bg-white border-l-4 border-${page.color}`}>
            <Link to={page.url} className={`text-3xl font-bold text-${page.color} hover:scale-110 duration-150`}>{page.title}</Link>
            <p className="text-lg">{page.description}</p>
          </div>
        ))
      }
    </main>
  )
}
