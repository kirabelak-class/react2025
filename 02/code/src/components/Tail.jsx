export default function Tail(){
    return(
        <div>
           <h1 className="bg-slate-950 text-pink-300 md:flex md:flex-row lg:text-2x hover:bg-yellow-400"> Backgradound + texto</h1> 
           <div className="px-10 ml-8 text-right">
                <h2>padding</h2>
                <p>margin  </p>
                <div className="flex text-center bg-amber-600 w-screen min-h-24 overflow-scroll">
                    gap
                    <p className="hidden">hola</p>
                    <p className="ml-8 text-4xl font-bold">adios</p>
                </div>
           </div>

           <div className="w-24 h-24 bg-cyan-400 text-center border-2 rounded-full border-red-700 shadow-amber-50 shadow-2xl">
                Bordes 
           </div>
        </div>
    )
}